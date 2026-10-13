// Servidor estático de dist/ para as auditorias: aplica os cabeçalhos de public/_headers
// (bloco "/*"), serve 404.html com status 404 e entende /rota/ → /rota/index.html.
// Comprime texto com gzip, como o host faz (a Vercel usa brotli/gzip): sem isso o LCP medido sai pior.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, relative } from 'node:path';
import { gzipSync } from 'node:zlib';
import { RAIZ } from './manifesto.mjs';

export const DIST = join(RAIZ, 'dist');

const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

function cabecalhos() {
  const h = {};
  const arq = join(DIST, '_headers');
  if (!existsSync(arq)) return h;
  let dentro = false;
  for (const l of readFileSync(arq, 'utf8').split('\n')) {
    if (/^\S/.test(l) && !l.startsWith('#')) dentro = l.trim() === '/*';
    else if (dentro && /^\s+\S+:/.test(l)) {
      const [k, ...v] = l.trim().split(':');
      h[k] = v.join(':').trim();
    }
  }
  return h;
}

export async function servir() {
  const h = cabecalhos();
  const srv = createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    let arq = join(DIST, p);
    if (!existsSync(arq) && existsSync(join(arq, 'index.html'))) arq = join(arq, 'index.html');
    let status = 200;
    if (!existsSync(arq) || statSync(arq).isDirectory()) {
      arq = join(DIST, '404.html');
      status = 404;
    }
    const tipo = TIPOS[extname(arq)] ?? 'application/octet-stream';
    let corpo = readFileSync(arq);
    const extra = {};
    if (
      /text|javascript|json|xml|svg/.test(tipo) &&
      /gzip/.test(req.headers['accept-encoding'] ?? '')
    ) {
      corpo = gzipSync(corpo);
      extra['Content-Encoding'] = 'gzip';
      extra['Vary'] = 'Accept-Encoding';
    }
    res.writeHead(status, { ...h, ...extra, 'Content-Type': tipo });
    res.end(corpo);
  });
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  return { base: `http://127.0.0.1:${srv.address().port}`, fechar: () => srv.close() };
}

/** Rotas públicas de dist/ (sem rotas internas /_* e sem o endereço antigo /pele-e-laser/). */
export function rotasDoDist() {
  const html = (d) =>
    readdirSync(d).flatMap((n) => {
      const c = join(d, n);
      return statSync(c).isDirectory() ? html(c) : n.endsWith('.html') ? [c] : [];
    });
  return html(DIST)
    .map((a) => '/' + relative(DIST, a).replace(/index\.html$/, ''))
    .filter((r) => !r.startsWith('/_') && r !== '/pele-e-laser/' && r !== '/404.html')
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
}
