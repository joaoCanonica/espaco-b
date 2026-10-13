// Contraste WCAG de todos os pares de tokens usados em texto/UI, nos dois temas e três tons.
// Falha (código 1) se algum par ficar abaixo do mínimo (4,5 texto; 3 UI/grande).
// Gera docs/CONTRASTE.md. Uso: pnpm audit-contraste
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pares, temas } from '../src/styles/paleta.mjs';

const RAIZ = join(fileURLToPath(import.meta.url), '..', '..');

function rgba(hex) {
  const h = hex.replace('#', '');
  const n = (i) => parseInt(h.slice(i, i + 2), 16);
  return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
}

// Cor com alfa composta sobre o fundo (bordas translúcidas).
function compor(fg, bg) {
  const a = rgba(fg);
  const b = rgba(bg);
  return {
    r: a.r * a.a + b.r * (1 - a.a),
    g: a.g * a.a + b.g * (1 - a.a),
    b: a.b * a.a + b.b * (1 - a.a),
  };
}

const lin = (c) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = ({ r, g, b }) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);

export function contraste(fg, bg) {
  const l1 = lum(compor(fg, bg));
  const l2 = lum(rgba(bg));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const linhas = [];
let falhas = 0;
for (const [tema, tons] of Object.entries(temas)) {
  for (const [tom, t] of Object.entries(tons)) {
    for (const [a, b, min, uso] of pares) {
      const c = contraste(t[a], t[b]);
      const ok = c >= min;
      if (!ok) falhas++;
      linhas.push({ tema, tom, par: `${a} / ${b}`, cores: `${t[a]} / ${t[b]}`, c, min, uso, ok });
    }
  }
}

const md = [
  '# Contraste (gerado)',
  '',
  `Gerado por \`scripts/audit-contraste.mjs\` a partir de \`src/styles/paleta.mjs\`. Mínimos WCAG 2.2 AA: 4,5 (texto), 3 (UI e texto grande).`,
  '',
  `**${linhas.length} pares · ${falhas} abaixo do mínimo.**`,
  '',
  '| Tema | Tom | Par | Cores | Contraste | Mínimo | Uso | OK |',
  '| --- | --- | --- | --- | --- | --- | --- | --- |',
  ...linhas.map(
    (l) =>
      `| ${l.tema} | ${l.tom} | ${l.par} | \`${l.cores}\` | ${l.c.toFixed(2)} | ${l.min} | ${l.uso} | ${l.ok ? 'sim' : '**NÃO**'} |`,
  ),
  '',
  'Framboesa sobre musgo não aparece de propósito: nenhuma variante passa 3:1 (regra: nunca usar framboesa sobre musgo).',
  '',
].join('\n');
writeFileSync(join(RAIZ, 'docs', 'CONTRASTE.md'), md);

for (const l of linhas) {
  console.log(
    `${l.ok ? '✓' : '✗'} ${l.tema.padEnd(5)} ${l.tom.padEnd(5)} ${l.par.padEnd(20)} ${l.c.toFixed(2).padStart(5)} (mín ${l.min})`,
  );
}
console.log(`audit-contraste: ${linhas.length} pares, ${falhas} falha(s) → docs/CONTRASTE.md`);
process.exit(falhas ? 1 : 0);
