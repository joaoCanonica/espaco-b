// Auditoria de compliance (versão inicial).
// Varre o HTML final (dist/), as legendas .vtt, o manifesto e os trechos de avaliação.
// Gera docs/COMPLIANCE.md. Em produção, qualquer bloqueio sai com código 1.
// Uso: pnpm audit-compliance   (NODE_ENV=production para modo produção; PREVIEW=1 nunca falha)
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RAIZ = join(fileURLToPath(import.meta.url), '..', '..');
const VOID = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
]);
const ATRIBUTOS_TEXTO = ['alt', 'title', 'aria-label', 'placeholder', 'content', 'value'];
const ATRIBUTOS_MIDIA = ['src', 'srcset', 'poster', 'href', 'content', 'data-src'];
const LETRA = '[\\p{L}\\p{N}_]';
const BORDA = `(?:(?<=${LETRA})(?!${LETRA})|(?<!${LETRA})(?=${LETRA}))`;

function compilar(t) {
  return new RegExp(t.padrao.replaceAll('\\b', BORDA), t.sensivel ? 'gu' : 'giu');
}

function decodificar(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
    .replace(/&amp;/g, '&');
}

function linhaDe(texto, pos) {
  let n = 1;
  for (let i = 0; i < pos; i++) if (texto.charCodeAt(i) === 10) n++;
  return n;
}

function atributos(bruto) {
  const out = {};
  for (const m of bruto.matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    out[m[1].toLowerCase()] = decodificar(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return out;
}

// Percorre o HTML e entrega pedaços de texto com o contexto (módulo e capa) dos ancestrais.
function* pedacos(html) {
  const pilha = [];
  const re =
    /<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<(\/?)([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g;
  let ultimo = 0;
  const contexto = () => ({
    modulo: [...pilha].reverse().find((e) => e.modulo)?.modulo ?? null,
    capa: pilha.some((e) => e.capa),
  });
  for (const m of html.matchAll(re)) {
    if (m.index > ultimo)
      yield {
        tipo: 'texto',
        texto: decodificar(html.slice(ultimo, m.index)),
        pos: ultimo,
        ...contexto(),
      };
    ultimo = m.index + m[0].length;
    if (!m[3]) continue; // comentário, script ou style
    const tag = m[3].toLowerCase();
    if (m[2] === '/') {
      const i = pilha.map((e) => e.tag).lastIndexOf(tag);
      if (i >= 0) pilha.length = i;
      continue;
    }
    const attrs = atributos(m[4] ?? '');
    const capa = /^(hero|og)/.test(attrs['data-slot'] ?? '') || attrs['data-dobra'] === 'primeira';
    const el = { tag, modulo: attrs['data-modulo'] ?? null, capa };
    const ctx = {
      ...contexto(),
      capa: contexto().capa || capa,
      modulo: el.modulo ?? contexto().modulo,
    };
    yield { tipo: 'tag', tag, attrs, pos: m.index, ...ctx };
    if (!VOID.has(tag) && !/\/\s*$/.test(m[4] ?? '')) pilha.push(el);
  }
  if (ultimo < html.length)
    yield { tipo: 'texto', texto: decodificar(html.slice(ultimo)), pos: ultimo, ...contexto() };
}

function listarHtml(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = join(dir, e.name);
    if (e.isDirectory()) return listarHtml(p);
    return e.name.endsWith('.html') ? [p] : [];
  });
}

export async function auditar({
  dist = join(RAIZ, 'dist'),
  producao = false,
  escrever = true,
} = {}) {
  const imp = (p) => import(pathToFileURL(join(RAIZ, p)).href);
  const { vetados, avisos, vetadosEmAvaliacao } = await imp('src/config/termos.ts');
  const { bianca } = await imp('src/config/pessoas.ts');
  const { marcasDeEquipamento } = await imp('src/config/servicos.ts');
  const { avaliacoes } = await imp('src/config/avaliacoes.ts');
  const { pacientesEmCapa, itensManifesto, temPaciente } = await imp('src/config/midia.ts');

  const draAtivo = bianca.tratamento.dra.ativo;
  const listaVetados = [
    ...vetados.filter((t) => !(t.soSemDra && draAtivo)),
    ...marcasDeEquipamento().map((m) => ({
      id: `marca de equipamento: ${m}`,
      padrao: `\\b${m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
    })),
  ].map((t) => ({ ...t, re: compilar(t) }));
  const listaAvisos = avisos.map((t) => ({ ...t, re: compilar(t) }));
  const extraAvaliacao = vetadosEmAvaliacao.map((t) => ({ ...t, re: compilar(t) }));
  const slugsPaciente = itensManifesto.filter(temPaciente).map((i) => i.slug);

  const achados = [];
  const add = (a) => achados.push(a);
  const rel = (p) => relative(RAIZ, p);

  // 1. HTML final
  const ignorados = [];
  for (const arq of listarHtml(dist)) {
    if (/[\\/]_pendencias[\\/]/.test(arq)) {
      ignorados.push(rel(arq));
      continue;
    }
    const html = readFileSync(arq, 'utf8');
    for (const p of pedacos(html)) {
      const textos =
        p.tipo === 'texto'
          ? [p.texto]
          : ATRIBUTOS_TEXTO.filter(
              (a) => p.attrs[a] && !(a === 'content' && /^(https?:|\/)/.test(p.attrs[a])),
            ).map((a) => p.attrs[a]);
      for (const t of textos) {
        for (const termo of listaVetados) {
          for (const m of t.matchAll(termo.re)) {
            const excecao = termo.permitidoEmModulo && p.modulo === termo.permitidoEmModulo;
            add({
              origem: 'html',
              termo: termo.id,
              arquivo: rel(arq),
              linha: linhaDe(html, p.pos),
              trecho: t.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30).trim(),
              status: excecao ? 'exceção (módulo casos)' : 'bloqueia',
            });
          }
        }
        for (const termo of listaAvisos) {
          for (const m of t.matchAll(termo.re)) {
            add({
              origem: 'html',
              termo: termo.id,
              arquivo: rel(arq),
              linha: linhaDe(html, p.pos),
              trecho: t.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30).trim(),
              status: 'aviso',
            });
          }
        }
      }
      if (p.tipo === 'tag') {
        const ogImage =
          p.tag === 'meta' && /og:image|twitter:image/.test(p.attrs.property ?? p.attrs.name ?? '');
        for (const a of ATRIBUTOS_MIDIA) {
          const v = p.attrs[a];
          if (!v) continue;
          const slug = slugsPaciente.find((s) => v.includes(s));
          if (slug && (p.capa || ogImage)) {
            add({
              origem: 'html',
              termo: `mídia de paciente (${slug})`,
              arquivo: rel(arq),
              linha: linhaDe(html, p.pos),
              trecho: `<${p.tag} ${a}="${v.slice(0, 80)}">${ogImage ? ' (og:image)' : ' (hero/primeira dobra)'}`,
              status: 'bloqueia',
            });
          }
        }
      }
    }
  }

  // 2. Legendas .vtt (blocos NOTE não são exibidos)
  const dirVtt = join(RAIZ, 'media-originais', 'legendas');
  if (existsSync(dirVtt)) {
    for (const nome of readdirSync(dirVtt).filter((n) => n.endsWith('.vtt'))) {
      const arq = join(dirVtt, nome);
      const blocos = readFileSync(arq, 'utf8').split(/\n\s*\n/);
      let linha = 1;
      for (const b of blocos) {
        if (!/^(WEBVTT|NOTE)/.test(b.trim())) {
          for (const termo of [...listaVetados, ...listaAvisos]) {
            for (const m of b.matchAll(termo.re)) {
              add({
                origem: 'legenda',
                termo: termo.id,
                arquivo: rel(arq),
                linha,
                trecho: b.slice(Math.max(0, m.index - 30), m.index + 40).replace(/\n/g, ' '),
                status: listaVetados.includes(termo) ? 'bloqueia' : 'aviso',
              });
            }
          }
        }
        linha += b.split('\n').length + 1;
      }
    }
  }

  // 3. Manifesto: paciente em capa e slug publicado com termo vetado
  for (const e of pacientesEmCapa()) {
    add({
      origem: 'manifesto',
      termo: 'mídia de paciente em capa',
      arquivo: 'src/config/midia.ts',
      linha: 0,
      trecho: e,
      status: 'bloqueia',
    });
  }
  for (const it of itensManifesto.filter((i) => i.publicavel)) {
    for (const termo of listaVetados) {
      if (it.slug.replace(/-/g, ' ').match(termo.re)) {
        add({
          origem: 'manifesto',
          termo: termo.id,
          arquivo: 'media.manifest.json',
          linha: 0,
          trecho: `slug ${it.slug}`,
          status: 'bloqueia',
        });
      }
    }
  }

  // 4. Trechos de avaliação publicáveis: termo vetado OU regulado bloqueia
  for (const t of avaliacoes.trechos) {
    for (const termo of [...listaVetados, ...listaAvisos, ...extraAvaliacao]) {
      for (const m of t.trecho.matchAll(termo.re)) {
        add({
          origem: 'avaliação',
          termo: termo.id,
          arquivo: 'docs/dados/avaliacoes-google.json',
          linha: 0,
          trecho: `${t.id}: ${t.trecho.slice(Math.max(0, m.index - 30), m.index + 40)}`,
          status: 'bloqueia',
        });
      }
    }
  }

  const bloqueios = achados.filter((a) => a.status === 'bloqueia');
  const avisosAchados = achados.filter((a) => a.status === 'aviso');
  if (escrever)
    escreverRelatorio({ achados, bloqueios, avisosAchados, producao, ignorados, dist: rel(dist) });
  return { achados, bloqueios, avisos: avisosAchados, ignorados };
}

function escreverRelatorio({ achados, bloqueios, avisosAchados, producao, ignorados, dist }) {
  const hoje = new Date().toISOString().slice(0, 10);
  const linhaTabela = (a) =>
    `| ${a.termo} | ${a.origem} | \`${a.arquivo}\` | ${a.linha || '—'} | ${a.trecho.replace(/\|/g, '\\|')} | ${a.status} |`;
  const tabela = (lista) =>
    lista.length
      ? [
          '| Termo | Origem | Arquivo | Linha | Trecho | Status |',
          '| --- | --- | --- | --- | --- | --- |',
          ...lista.map(linhaTabela),
        ].join('\n')
      : 'Nenhum.';
  const outros = achados.filter((a) => a.status !== 'bloqueia' && a.status !== 'aviso');
  const md = [
    '# Compliance (gerado)',
    '',
    `Gerado por \`scripts/audit-compliance.mjs\` em ${hoje} · modo ${producao ? 'produção' : 'preview/dev'} · HTML de \`${dist}/\`.`,
    'Não editar à mão: rode `pnpm audit-compliance` (ou o build). Termos em `src/config/termos.ts`.',
    '',
    `**Bloqueios: ${bloqueios.length}** · avisos: ${avisosAchados.length} · exceções: ${outros.length}`,
    '',
    '## Bloqueios (travam produção)',
    '',
    tabela(bloqueios),
    '',
    '## Avisos (termos regulados: conferir na sessão 9)',
    '',
    tabela(avisosAchados),
    '',
    '## Exceções aceitas',
    '',
    tabela(outros),
    '',
    '## Fora da varredura',
    '',
    ignorados.length
      ? ignorados.map((i) => `- \`${i}\` (rota interna, não existe em produção)`).join('\n')
      : 'Nada.',
    '',
  ].join('\n');
  writeFileSync(join(RAIZ, 'docs', 'COMPLIANCE.md'), md);
}

// Modo texto: audita um arquivo de texto (ex.: docs/COPY_DECK.md) linha a linha, com as mesmas listas.
// Termo vetado sai com código 1. Avisos (termos regulados) só são listados.
export async function auditarTexto(caminho) {
  const imp = (p) => import(pathToFileURL(join(RAIZ, p)).href);
  const { vetados, avisos } = await imp('src/config/termos.ts');
  const { bianca } = await imp('src/config/pessoas.ts');
  const { marcasDeEquipamento } = await imp('src/config/servicos.ts');
  const draAtivo = bianca.tratamento.dra.ativo;
  const listaVetados = [
    ...vetados.filter((t) => !(t.soSemDra && draAtivo)),
    ...marcasDeEquipamento().map((m) => ({
      id: `marca de equipamento: ${m}`,
      padrao: `\\b${m.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
    })),
  ].map((t) => ({ ...t, re: compilar(t) }));
  const listaAvisos = avisos.map((t) => ({ ...t, re: compilar(t) }));
  const linhas = readFileSync(caminho, 'utf8').split('\n');
  const bloqueios = [];
  const avisosAchados = [];
  linhas.forEach((linha, i) => {
    for (const t of listaVetados)
      for (const m of linha.matchAll(t.re))
        bloqueios.push({
          termo: t.id,
          linha: i + 1,
          trecho: linha.slice(Math.max(0, m.index - 30), m.index + 40).trim(),
        });
    for (const t of listaAvisos)
      for (const m of linha.matchAll(t.re))
        avisosAchados.push({
          termo: t.id,
          linha: i + 1,
          trecho: linha.slice(Math.max(0, m.index - 30), m.index + 40).trim(),
        });
  });
  return { bloqueios, avisos: avisosAchados };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const iTexto = process.argv.indexOf('--texto');
  if (iTexto > -1) {
    const arquivo = process.argv[iTexto + 1];
    if (!arquivo) throw new Error('uso: audit-compliance --texto <arquivo>');
    const t = await auditarTexto(arquivo);
    for (const b of t.bloqueios)
      console.error(`VETADO: "${b.termo}" linha ${b.linha} → ${b.trecho}`);
    const porTermo = {};
    for (const a of t.avisos) porTermo[a.termo] = (porTermo[a.termo] ?? 0) + 1;
    console.log(`avisos (termos regulados, conferir na sessão 9): ${JSON.stringify(porTermo)}`);
    console.log(
      `audit-compliance --texto ${arquivo}: ${t.bloqueios.length} vetado(s), ${t.avisos.length} aviso(s)`,
    );
    process.exit(t.bloqueios.length ? 1 : 0);
  }
  const producao = process.env.NODE_ENV === 'production' && process.env.PREVIEW !== '1';
  const r = await auditar({ producao });
  for (const b of r.bloqueios)
    console.error(`BLOQUEIO: "${b.termo}" em ${b.arquivo}:${b.linha} → ${b.trecho}`);
  console.log(
    `audit-compliance: ${r.bloqueios.length} bloqueio(s), ${r.avisos.length} aviso(s) → docs/COMPLIANCE.md`,
  );
  process.exit(producao && r.bloqueios.length ? 1 : 0);
}
