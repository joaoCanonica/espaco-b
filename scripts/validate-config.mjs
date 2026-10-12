// Lista as pendências da config em docs/PENDENCIAS.md (bloco gerado) e aplica a trava de produção.
// NODE_ENV=production (sem PREVIEW=1): sai com código 1 se houver bloqueio. Dev/preview nunca falham.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RAIZ = join(fileURLToPath(import.meta.url), '..', '..');
const ARQ = join(RAIZ, 'docs', 'PENDENCIAS.md');
const INICIO = '<!-- gerado:inicio (scripts/validate-config.mjs; não editar à mão) -->';
const FIM = '<!-- gerado:fim -->';

const { listarPendencias, verificarProducao } = await import(
  pathToFileURL(join(RAIZ, 'src/config/index.ts')).href
);

const producao = process.env.NODE_ENV === 'production' && process.env.PREVIEW !== '1';
const ordem = { bloqueante: 0, aviso: 1, info: 2 };
const pend = listarPendencias().sort(
  (a, b) => ordem[a.severidade] - ordem[b.severidade] || a.caminho.localeCompare(b.caminho),
);
const bloqueios = verificarProducao();
const hoje = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
const porSeveridade = (sev) => pend.filter((p) => p.severidade === sev);
const tabela = (lista) =>
  lista.length
    ? [
        '| Estado | Campo | Rótulo | Valor | Motivo | Fonte |',
        '| --- | --- | --- | --- | --- | --- |',
        ...lista.map(
          (p) =>
            `| ${p.estado} | \`${p.caminho}\` | ${esc(p.rotulo)} | ${esc(p.valor) || '—'} | ${esc(p.motivo) || '—'} | ${esc(p.fonte) || '—'} |`,
        ),
      ].join('\n')
    : 'Nenhum.';

const bloco = [
  INICIO,
  '',
  `## Config (gerado em ${hoje})`,
  '',
  `Trava de produção: ${bloqueios.length ? `**${bloqueios.length} bloqueio(s)**` : 'livre (registro e WhatsApp confirmados; sem paciente em capa; sem claim publicado sem fonte)'}.`,
  ...(bloqueios.length ? ['', ...bloqueios.map((b) => `- ${b}`)] : []),
  '',
  `### Bloqueantes (${porSeveridade('bloqueante').length})`,
  '',
  tabela(porSeveridade('bloqueante')),
  '',
  `### Avisos (${porSeveridade('aviso').length})`,
  '',
  tabela(porSeveridade('aviso')),
  '',
  `### Informativos (${porSeveridade('info').length})`,
  '',
  tabela(porSeveridade('info')),
  '',
  FIM,
].join('\n');

let atual = existsSync(ARQ) ? readFileSync(ARQ, 'utf8') : '# Pendências\n';
if (atual.includes(INICIO) && atual.includes(FIM)) {
  atual =
    atual.slice(0, atual.indexOf(INICIO)) + bloco + atual.slice(atual.indexOf(FIM) + FIM.length);
} else {
  atual = atual.replace(/\n*$/, '\n\n') + bloco + '\n';
}
writeFileSync(ARQ, atual);

const cont = (sev) => porSeveridade(sev).length;
console.log(
  `validate-config: ${pend.length} pendência(s) · ${cont('bloqueante')} bloqueante(s) · ${cont('aviso')} aviso(s) · ${cont('info')} info → docs/PENDENCIAS.md`,
);
for (const b of bloqueios) console.error(`BLOQUEIO: ${b}`);
if (producao && bloqueios.length) {
  console.error('validate-config: produção travada.');
  process.exit(1);
}
