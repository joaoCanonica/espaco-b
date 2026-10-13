// Testes da trava de produção e do preview honesto.
// Copia o projeto para uma pasta temporária, aplica cada bloqueio simulado e roda `pnpm build`.
// Prova: (a) preview sobe com todos os pendentes; (b) produção falha em cada bloqueio, com mensagem
// clara, e passa sem ele; (c) a seção da equipe nunca some em preview.
import { spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(fileURLToPath(import.meta.url), '..', '..');
const FORA = new Set([
  'node_modules',
  'dist',
  '.astro',
  '.git',
  'public/media',
  'media-originais/imagens',
  'media-originais/videos',
  'media-originais/marca',
  'docs/capturas',
]);

let falhas = 0;
const ok = (cond, msg) => {
  console.log(`${cond ? '✓' : '✗'} ${msg}`);
  if (!cond) falhas++;
};

function copiar() {
  const dir = mkdtempSync(join(tmpdir(), 'espaco-b-teste-'));
  cpSync(RAIZ, dir, {
    recursive: true,
    filter: (src) => {
      const r = src.slice(RAIZ.length + 1).replaceAll('\\', '/');
      return ![...FORA].some((f) => r === f || r.startsWith(`${f}/`));
    },
  });
  symlinkSync(join(RAIZ, 'node_modules'), join(dir, 'node_modules'), 'dir');
  return dir;
}

function build(dir, { preview }) {
  const env = { ...process.env, MEDIA_SKIP: '1', NODE_ENV: 'production' };
  if (preview) env.PREVIEW = '1';
  else delete env.PREVIEW;
  const r = spawnSync('pnpm', ['build'], { cwd: dir, env, encoding: 'utf8' });
  return { codigo: r.status, saida: `${r.stdout}\n${r.stderr}` };
}

function validar(dir, { preview }) {
  const env = { ...process.env, NODE_ENV: 'production' };
  if (preview) env.PREVIEW = '1';
  else delete env.PREVIEW;
  const r = spawnSync('node', ['scripts/validate-config.mjs'], { cwd: dir, env, encoding: 'utf8' });
  return { codigo: r.status, saida: `${r.stdout}\n${r.stderr}` };
}

const anexar = (arq, texto) => (dir) =>
  writeFileSync(join(dir, arq), readFileSync(join(dir, arq), 'utf8') + `\n${texto}\n`);
// Página de teste criada só na cópia temporária (a home real fica intacta).
const PAGINA_TESTE = 'src/pages/teste-trava.astro';
const paginaDeTeste = (dir, { imports = '', head = '', corpo = '' }) =>
  writeFileSync(
    join(dir, PAGINA_TESTE),
    `---\nimport Base from '../layouts/Base.astro';\n${imports}\n---\n\n<Base titulo="Teste">\n${head}\n<h1>Teste</h1>\n${corpo}\n</Base>\n`,
  );
const naPagina = (html) => (dir) => paginaDeTeste(dir, { corpo: html });

// Cada cenário: o que muda, se a config também trava (validate-config) e a mensagem esperada.
const cenarios = [
  {
    nome: 'registro profissional ausente',
    aplicar: anexar(
      'src/config/pessoas.ts',
      "import { bloqueante as __b } from './tipos.ts';\nObject.assign(bianca, { registro: __b('registro profissional (CREFITO)') });",
    ),
    config: true,
    msg: /registro profissional ausente/,
  },
  {
    nome: 'WhatsApp não confirmado como real',
    aplicar: anexar(
      'src/config/contato.ts',
      "import { informado as __i } from './tipos.ts';\nObject.assign(contato, { whatsapp: __i({ e164: '+5549999115351', exibicao: '', real: false }, 'teste') });",
    ),
    config: true,
    msg: /WhatsApp não confirmado como real/,
  },
  {
    nome: 'mídia de paciente no hero (config)',
    aplicar: anexar(
      'src/config/midia.ts',
      "slots.find((s) => s.id === 'hero.principal')?.cadeia.unshift('video-para-presenca-e-profissionalismo');",
    ),
    config: true,
    msg: /mídia de paciente .*hero\.principal/,
  },
  {
    nome: 'mídia de paciente no og:image (config)',
    aplicar: anexar(
      'src/config/midia.ts',
      "slots.find((s) => s.id === 'og.imagem')?.cadeia.unshift('video-para-presenca-e-profissionalismo');",
    ),
    config: true,
    msg: /mídia de paciente .*og\.imagem/,
  },
  {
    nome: 'claim com publicar:true sem fonte',
    aplicar: anexar(
      'src/config/claims.ts',
      "(claims as unknown as Claim[]).push({ id: 'teste', texto: 'x', tipo: ['promessa'], conferir: ['CDC'], publicar: true, fonte: '' });",
    ),
    config: true,
    msg: /claim "teste" com publicar:true sem fonte/,
  },
  {
    nome: 'termo vetado no HTML (garantido)',
    aplicar: naPagina('<p>resultado garantido</p>'),
    msg: /"garantido" em dist/,
  },
  {
    nome: 'medicamento no HTML (botox)',
    aplicar: naPagina('<p>aplicação de Botox</p>'),
    msg: /"botox" em dist/,
  },
  {
    nome: '"Dra." no HTML com tratamento.dra desligado',
    aplicar: naPagina('<p>Dra. Bia</p>'),
    msg: /"Dra\." em dist/,
  },
  {
    nome: '"antes e depois" fora do módulo de casos',
    aplicar: naPagina('<p>antes e depois</p>'),
    msg: /"antes e depois" em dist/,
  },
  {
    nome: 'marca de equipamento no HTML',
    aplicar: naPagina('<p>Lavieen</p>'),
    msg: /marca de equipamento: Lavieen/,
  },
  {
    nome: 'mídia de paciente no hero (HTML)',
    aplicar: naPagina(
      '<div data-slot="hero.principal"><img src="/media/video/bastidores-ensaio-e-casos-par-p001-poster.avif" alt=""></div>',
    ),
    msg: /mídia de paciente \(bastidores-ensaio-e-casos\)/,
  },
  {
    nome: 'mídia de paciente no og:image (HTML)',
    aplicar: (dir) =>
      paginaDeTeste(dir, {
        head: '<meta slot="head" property="og:image" content="/media/video/bastidores-ensaio-e-casos-poster-720.avif" />',
      }),
    msg: /og:image/,
  },
  {
    nome: 'avaliação publicável com termo vetado/regulado',
    aplicar: (dir) => {
      const p = join(dir, 'docs/dados/avaliacoes-google.json');
      const d = JSON.parse(readFileSync(p, 'utf8'));
      Object.assign(d.avaliacoes[3], {
        usavelNoSite: true,
        trechoPublicavel: 'O melhor botox, ficou perfeita',
      });
      writeFileSync(p, JSON.stringify(d, null, 2));
    },
    msg: /em docs\/dados\/avaliacoes-google\.json/,
  },
];

console.log('== base (config real de hoje) ==');
{
  const dir = copiar();
  try {
    const p = build(dir, { preview: false });
    ok(p.codigo === 0, `produção com a config real PASSA (código ${p.codigo})`);
    if (p.codigo !== 0) console.log(p.saida.slice(-1500));
    ok(!existsSync(join(dir, 'dist/_pendencias')), 'produção não gera /_pendencias/');
    const home = readFileSync(join(dir, 'dist/index.html'), 'utf8');
    ok(
      !home.includes('data-preview-banner') && !home.includes('PROVISÓRIO'),
      'produção sem faixa e sem selo',
    );

    const v = validar(dir, { preview: false });
    ok(v.codigo === 0, 'validate-config em produção passa com a config real');

    const pv = build(dir, { preview: true });
    ok(pv.codigo === 0, `(a) PREVIEW=1 com todos os pendentes PASSA (código ${pv.codigo})`);
    const pend = readFileSync(join(dir, 'dist/_pendencias/index.html'), 'utf8');
    ok(pend.includes('data-preview-banner'), '(a) preview mostra a faixa "em revisão"');
    ok((pend.match(/PROVISÓRIO/g) ?? []).length >= 2, '(a) preview mostra selos PROVISÓRIO');
    ok(pend.includes('a informar'), '(a) preview mostra cartão "a informar"');
    ok(
      /data-secao="?equipe/.test(pend),
      '(c) seção da equipe presente em preview (módulo desligado vira cartão)',
    );
    ok(
      /data-secao="?historias/.test(pend),
      '(c) módulo historias (desligado) também presente em preview',
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

console.log('\n== seção dependente de dado pendente some em produção, com alerta ==');
{
  const dir = copiar();
  try {
    paginaDeTeste(dir, {
      imports:
        "import Provisorio from '../components/Provisorio.astro';\nimport { config } from '../config/index.ts';",
      corpo:
        '<Provisorio campo={config.pessoas.bianca.fotoCredito} rotulo="crédito do fotógrafo"><p id="credito">crédito</p></Provisorio>\n<Provisorio modulo="equipe"><section data-secao="equipe">equipe</section></Provisorio>',
    });
    const prod = build(dir, { preview: false });
    const html = readFileSync(join(dir, 'dist/teste-trava/index.html'), 'utf8');
    ok(
      prod.codigo === 0 && !html.includes('data-secao="equipe"') && !html.includes('a informar'),
      'produção omite a seção pendente e a equipe',
    );
    ok(/omitida em produção/.test(prod.saida), 'o build avisa a omissão (não é silenciosa)');
    const prev = build(dir, { preview: true });
    const htmlPrev = readFileSync(join(dir, 'dist/teste-trava/index.html'), 'utf8');
    ok(
      prev.codigo === 0 && /data-secao="?equipe/.test(htmlPrev) && htmlPrev.includes('a informar'),
      '(c) preview mantém equipe e cartão "a informar"',
    );
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

console.log('\n== exceção: "antes e depois" dentro do módulo de casos ==');
{
  const dir = copiar();
  try {
    naPagina('<section data-modulo="casos"><p>antes e depois</p></section>')(dir);
    const p = build(dir, { preview: false });
    ok(p.codigo === 0, 'produção passa com "antes e depois" dentro de [data-modulo="casos"]');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

console.log('\n== bloqueios simulados ==');
for (const c of cenarios) {
  const dir = copiar();
  try {
    c.aplicar(dir);
    const p = build(dir, { preview: false });
    const linha =
      p.saida
        .split('\n')
        .find((l) => c.msg.test(l))
        ?.trim() ?? '';
    ok(p.codigo !== 0 && c.msg.test(p.saida), `${c.nome}: produção FALHA → ${linha.slice(0, 140)}`);
    if (p.codigo === 0 || !c.msg.test(p.saida)) console.log(p.saida.slice(-1200));
    const pv = build(dir, { preview: true });
    ok(pv.codigo === 0, `${c.nome}: PREVIEW=1 passa`);
    if (c.config) {
      ok(
        validar(dir, { preview: false }).codigo === 1,
        `${c.nome}: validate-config em produção sai com 1`,
      );
      ok(
        validar(dir, { preview: true }).codigo === 0,
        `${c.nome}: validate-config em preview sai com 0`,
      );
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

console.log(`\ntest-config: ${falhas ? `${falhas} falha(s)` : 'tudo verde'}`);
process.exit(falhas ? 1 : 0);
