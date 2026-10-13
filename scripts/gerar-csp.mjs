// CSP por hash (pós-build). Para cada HTML de dist/:
// - script-src: 'self' + sha256 de cada <script> inline (sem 'unsafe-inline');
// - style-src-elem: 'self' + sha256 de cada <style>;
// - style-src-attr: 'unsafe-hashes' + sha256 de cada valor de atributo style="";
// - frame-src: só o Google Maps (o iframe só é criado após o consentimento "mapas").
// A política entra num <meta http-equiv> logo após o <meta charset> (o resto dos cabeçalhos, e
// frame-ancestors, vão em public/_headers). Atributos de evento (onclick=…) reprovam o build.
// Uso: node scripts/gerar-csp.mjs   (roda sozinho no "postbuild")
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
if (!existsSync(dist)) {
  console.error('gerar-csp: dist/ não existe (rode o build)');
  process.exit(2);
}

const FRAME = ['https://www.google.com', 'https://maps.google.com'];

const hash = (s) => `'sha256-${createHash('sha256').update(s, 'utf8').digest('base64')}'`;
const decodificar = (v) =>
  v
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&#x0*27;|&apos;/gi, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&amp;/g, '&');

function html(dir) {
  return readdirSync(dir).flatMap((n) => {
    const c = join(dir, n);
    return statSync(c).isDirectory() ? html(c) : n.endsWith('.html') ? [c] : [];
  });
}

let maior = 0;
let erros = 0;
const resumo = [];
for (const arq of html(dist)) {
  let doc = readFileSync(arq, 'utf8').replace(
    /<meta http-equiv="Content-Security-Policy"[^>]*>/g,
    '',
  );
  const scripts = new Set();
  const estilos = new Set();
  const atributos = new Set();
  for (const m of doc.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (/\bsrc\s*=/.test(m[1])) continue;
    if (/type\s*=\s*["']?application\/(ld\+)?json/i.test(m[1])) continue;
    scripts.add(hash(m[2]));
  }
  for (const m of doc.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) estilos.add(hash(m[1]));
  for (const m of doc.matchAll(/<[a-z][^>]*?\sstyle=(?:"([^"]*)"|'([^']*)')/gi))
    atributos.add(hash(decodificar(m[1] ?? m[2] ?? '')));
  const eventos = [...doc.matchAll(/<[a-z][^>]*?\s(on[a-z]+)=["']/gi)].map((m) => m[1]);
  if (eventos.length) {
    // Rotas internas (/_pendencias, /_sistema) só existem em dev/preview: aviso, não erro.
    const interna = relative(dist, arq).startsWith('_');
    if (!interna) erros++;
    console[interna ? 'warn' : 'error'](
      `gerar-csp: ${relative(dist, arq)} tem atributo de evento (${eventos.join(', ')})${interna ? ' — rota interna, bloqueado pela CSP' : ''}`,
    );
  }
  const politica = [
    "default-src 'self'",
    `script-src 'self' ${[...scripts].join(' ')}`.trim(),
    `style-src 'self' ${[...estilos].join(' ')}`.trim(),
    `style-src-elem 'self' ${[...estilos].join(' ')}`.trim(),
    atributos.size
      ? `style-src-attr 'unsafe-hashes' ${[...atributos].join(' ')}`
      : "style-src-attr 'none'",
    "img-src 'self' data:",
    "font-src 'self'",
    "media-src 'self'",
    "connect-src 'self'",
    `frame-src ${FRAME.join(' ')}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
  const meta = `<meta http-equiv="Content-Security-Policy" content="${politica.replace(/"/g, '&quot;')}">`;
  const antes = doc;
  doc = doc.replace(/(<meta charset="?utf-8"?\s*\/?>)/i, `$1${meta}`);
  if (doc === antes) {
    erros++;
    console.error(`gerar-csp: ${relative(dist, arq)} sem <meta charset>; CSP não inserida`);
    continue;
  }
  writeFileSync(arq, doc);
  maior = Math.max(maior, politica.length);
  resumo.push(
    `${relative(dist, arq)}: ${scripts.size} script(s), ${estilos.size} <style>, ${atributos.size} style=""`,
  );
}
console.log(
  `gerar-csp: ${resumo.length} página(s) com CSP por hash; maior política ${maior} caracteres`,
);
if (process.argv.includes('--detalhe')) for (const r of resumo) console.log(`  ${r}`);
if (!existsSync(join(dist, '_headers')))
  console.warn('gerar-csp: dist/_headers ausente (public/_headers)');
process.exit(erros ? 1 : 0);
