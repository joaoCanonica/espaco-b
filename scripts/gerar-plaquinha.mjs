// Plaquinha "Avalie no Google" com QR (A6, 105 × 148 mm): print/avaliar.svg e print/avaliar.pdf.
// O QR aponta para o link DIRETO de avaliação só quando ele estiver `confirmado` na config.
// Enquanto for candidato (`informado`), o QR leva à ficha no Google Maps e a peça sai marcada
// PROVISÓRIO (não imprimir). Texto neutro: sem brinde, sem filtro de satisfação.
// Uso: node scripts/gerar-plaquinha.mjs
import { mkdirSync, readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import QRCode from 'qrcode';
import { chromium } from 'playwright';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const imp = (p) => import(pathToFileURL(join(raiz, p)).href);
const { contato } = await imp('src/config/contato.ts');
const marca = JSON.parse(readFileSync(join(raiz, 'src/assets/brand/marca.json'), 'utf8'));

const direta = contato.google.avaliacaoDiretaUrl;
const confirmado = direta.estado === 'confirmado' && !!direta.valor;
const url = confirmado ? direta.valor : contato.google.mapsUrl.valor;
if (!confirmado)
  console.warn(
    `[espaco-b] plaquinha PROVISÓRIA: link direto ${direta.estado}; QR leva à ficha no Google Maps.`,
  );

const C = { musgo: '#52543F', osso: '#F1ECE1', tinta: '#1E211A', framboesa: '#8A3027' };
const W = 105;
const H = 148;
// QR em módulos (correção M), desenhado como um único path.
const qr = QRCode.create(url, { errorCorrectionLevel: 'M' });
const n = qr.modules.size;
const lado = 54; // mm (módulo ≥ 0,7 mm mesmo com a URL longa do Maps)
const m = lado / n;
let d = '';
for (let y = 0; y < n; y++)
  for (let x = 0; x < n; x++)
    if (qr.modules.get(y, x))
      d += `M${(x * m).toFixed(3)} ${(y * m).toFixed(3)}h${m.toFixed(3)}v${m.toFixed(3)}h-${m.toFixed(3)}z`;
const qx = (W - lado) / 2;
const qy = 61;
const [, , vbw, vbh] = marca.viewBox.split(' ').map(Number);
const alturaB = 22;
const larguraB = (alturaB * vbw) / vbh;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}">
  <title>Avalie o Espaço B no Google</title>
  <rect width="${W}" height="${H}" fill="${C.osso}"/>
  <svg x="10" y="10" width="${larguraB.toFixed(2)}" height="${alturaB}" viewBox="${marca.viewBox}"><path d="${marca.b.d}" fill="${C.musgo}"/></svg>
  <text x="10" y="44" font-family="'Newsreader Display', Georgia, serif" font-size="9.5" fill="${C.tinta}">Conte como foi</text>
  <text x="10" y="53" font-family="'Newsreader Display', Georgia, serif" font-size="9.5" fill="${C.tinta}">no Google.</text>
  <rect x="${qx - 3}" y="${qy - 3}" width="${lado + 6}" height="${lado + 6}" fill="#FFFFFF"/>
  <path transform="translate(${qx} ${qy})" d="${d}" fill="${C.tinta}"/>
  <text x="10" y="${qy + lado + 10}" font-family="'Albert Sans', Arial, sans-serif" font-size="3.6" fill="${C.tinta}">Aponte a câmera do celular para o código.</text>
  <text x="10" y="${qy + lado + 15.5}" font-family="'Albert Sans', Arial, sans-serif" font-size="3.6" fill="${C.tinta}">Vale qualquer experiência, boa ou ruim.</text>
  <text x="10" y="${qy + lado + 21}" font-family="'Albert Sans', Arial, sans-serif" font-size="3.6" fill="${C.tinta}">Não há brinde nem desconto por avaliação.</text>
  <text x="${W - 10}" y="16" text-anchor="end" font-family="'Albert Sans', Arial, sans-serif" font-size="3" letter-spacing="0.4" fill="${C.musgo}">ESPAÇO B · LAGES, SC</text>
  ${
    confirmado
      ? ''
      : `<g transform="rotate(-28 ${W / 2} ${H / 2})"><rect x="-20" y="${H / 2 - 7}" width="${W + 40}" height="14" fill="${C.framboesa}" opacity="0.92"/><text x="${W / 2}" y="${H / 2 + 2.6}" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="7" fill="${C.osso}">PROVISÓRIO · NÃO IMPRIMIR</text></g>
  <text x="${W / 2}" y="${H - 3}" text-anchor="middle" font-family="Arial, sans-serif" font-size="2.4" fill="${C.framboesa}">QR leva à ficha no Google Maps: link direto de avaliação ainda não confirmado.</text>`
  }
</svg>
`;
const pasta = join(raiz, 'print');
mkdirSync(pasta, { recursive: true });
writeFileSync(join(pasta, 'avaliar.svg'), svg);

// PDF: renderiza o SVG com as fontes self-hosted embutidas.
const fonte = (arq) => readFileSync(join(raiz, 'src/styles/fonts', arq)).toString('base64');
const html = `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:'Newsreader Display';src:url(data:font/woff2;base64,${fonte('newsreader-display.woff2')}) format('woff2');font-weight:300 600}
@font-face{font-family:'Albert Sans';src:url(data:font/woff2;base64,${fonte('albert-sans.woff2')}) format('woff2');font-weight:300 700}
@page{size:${W}mm ${H}mm;margin:0}html,body{margin:0}svg{display:block}</style>${svg}`;
let b;
try {
  b = await chromium.launch();
} catch {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  const dir = readdirSync(base)
    .filter((x) => /^chromium-\d+$/.test(x))
    .sort()
    .reverse()[0];
  b = await chromium.launch({ executablePath: join(base, dir, 'chrome-linux', 'chrome') });
}
const p = await b.newPage();
await p.setContent(html);
await p.evaluate(() => document.fonts.ready);
await p.pdf({
  path: join(pasta, 'avaliar.pdf'),
  width: `${W}mm`,
  height: `${H}mm`,
  printBackground: true,
});
await p.setViewportSize({ width: 420, height: 592 });
await p.screenshot({ path: join(pasta, 'avaliar-previa.png'), fullPage: true });
await b.close();
console.log(
  `plaquinha: print/avaliar.svg e print/avaliar.pdf · QR v${qr.version} (${n}×${n}) → ${confirmado ? 'link direto' : 'ficha no Maps (PROVISÓRIO)'}`,
);
if (!existsSync(join(pasta, 'avaliar.pdf'))) process.exit(1);
