// Verifica links internos do build (dist/): href/src que começam com "/" ou "#".
// Cada alvo precisa existir como arquivo (ou pasta com index.html); âncoras "#id" precisam
// existir na página de destino. Rotas de sessões futuras ficam listadas à parte (não somem em
// silêncio) e não reprovam; qualquer outro link quebrado sai com código 1.
// Uso: node scripts/verificar-links.mjs [--estrito]   (--estrito reprova também as futuras)
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
const estrito = process.argv.includes('--estrito');

/** Páginas previstas em sessões seguintes (docs/ESPACO_B_PACOTE_PROMPTS_CODE.md). */
const FUTURAS = { '/bia/': 'sessão 6C', '/espaco/': 'sessão 6C', '/contato/': 'sessão 6C' };

if (!existsSync(dist)) {
  console.error('verificar-links: rode o build antes (dist/ não existe)');
  process.exit(2);
}

function html(dir) {
  return readdirSync(dir).flatMap((n) => {
    const c = join(dir, n);
    if (statSync(c).isDirectory()) return html(c);
    return n.endsWith('.html') ? [c] : [];
  });
}

function arquivoDe(caminho) {
  const limpo = decodeURIComponent(caminho);
  const alvo = join(dist, limpo);
  if (limpo.endsWith('/')) return join(alvo, 'index.html');
  if (existsSync(alvo) && statSync(alvo).isFile()) return alvo;
  if (existsSync(join(alvo, 'index.html'))) return join(alvo, 'index.html');
  return alvo;
}

const ids = new Map();
function idsDe(arquivo) {
  if (!ids.has(arquivo)) {
    const t = existsSync(arquivo) ? readFileSync(arquivo, 'utf8') : '';
    ids.set(arquivo, new Set([...t.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
  }
  return ids.get(arquivo);
}

const paginas = html(dist);
const quebrados = [];
const futuros = [];
let total = 0;
for (const pagina of paginas) {
  const texto = readFileSync(pagina, 'utf8');
  const rota = '/' + relative(dist, pagina).replace(/index\.html$/, '');
  const refs = [...texto.matchAll(/\s(?:href|src|poster)="([^"]+)"/g)].map((m) => m[1]);
  const srcsets = [...texto.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) =>
    m[1].split(',').map((p) => p.trim().split(/\s+/)[0]),
  );
  for (const ref of [...refs, ...srcsets]) {
    if (!ref || /^(https?:|mailto:|tel:|data:|javascript:)/.test(ref) || ref.startsWith('//'))
      continue;
    if (!ref.startsWith('/') && !ref.startsWith('#')) continue;
    total++;
    const [caminho, ancora] = ref.split('#');
    const destino = caminho ? arquivoDe(caminho.split('?')[0]) : pagina;
    const existe = existsSync(destino);
    let erro = null;
    if (!existe) erro = 'destino não existe';
    else if (ancora && destino.endsWith('.html') && !idsDe(destino).has(ancora))
      erro = `âncora #${ancora} não existe`;
    if (!erro) continue;
    const item = { pagina: rota, ref, erro };
    if (caminho && FUTURAS[caminho] && !estrito)
      futuros.push({ ...item, sessao: FUTURAS[caminho] });
    else quebrados.push(item);
  }
}

console.log(
  `verificar-links: ${paginas.length} página(s), ${total} link(s) interno(s) conferido(s)`,
);
for (const f of futuros) console.log(`  · pendente (${f.sessao}): ${f.pagina} → ${f.ref}`);
for (const q of quebrados) console.log(`  ✗ ${q.pagina} → ${q.ref}: ${q.erro}`);
console.log(
  quebrados.length
    ? `✗ ${quebrados.length} link(s) quebrado(s)`
    : `✓ nenhum link quebrado${futuros.length ? ` (${futuros.length} para páginas de sessões futuras)` : ''}`,
);
process.exit(quebrados.length ? 1 : 0);
