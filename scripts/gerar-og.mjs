// Imagens Open Graph 1200×630 (pós-build). Lê cada HTML de dist/, pega o og:image (/og/<slug>.png)
// e o og:title, e desenha: título em display + retrato da Bia na contraforma baixa do B (janela em
// D, path extraído do logo). Nunca mídia de paciente (slot og.imagem). Fontes self-hosted.
// Cache por hash (título + modelo) em node_modules/.cache/espaco-b-og.
// Uso: node scripts/gerar-og.mjs   (roda no "postbuild", antes da CSP)
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
const cache = join(raiz, 'node_modules', '.cache', 'espaco-b-og');
mkdirSync(cache, { recursive: true });
const MODELO = 'og-v1';

const marca = JSON.parse(readFileSync(join(raiz, 'src/assets/brand/marca.json'), 'utf8'));
const dD = marca.contraformas.baixa.dNormalizado;
const fonte = (a) => readFileSync(join(raiz, 'src/styles/fonts', a)).toString('base64');
const retratoArq = join(dist, 'media/img/bia-retrato-colete-800.webp');
const retrato = existsSync(retratoArq)
  ? `data:image/webp;base64,${readFileSync(retratoArq).toString('base64')}`
  : null;

const decod = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

function html(dir) {
  return readdirSync(dir).flatMap((n) => {
    const c = join(dir, n);
    return statSync(c).isDirectory() ? html(c) : n.endsWith('.html') ? [c] : [];
  });
}

// og:image → título
const pedidos = new Map();
for (const arq of html(dist)) {
  const t = readFileSync(arq, 'utf8');
  const img = t.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  const titulo = t.match(/<meta property="og:title" content="([^"]+)"/)?.[1];
  if (!img || !titulo) continue;
  const caminho = new URL(img, 'http://x').pathname;
  if (!caminho.startsWith('/og/')) continue;
  pedidos.set(caminho, decod(titulo));
}

const pagina = (titulo) => `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:N;src:url(data:font/woff2;base64,${fonte('newsreader-display.woff2')}) format('woff2');font-weight:300 600}
@font-face{font-family:A;src:url(data:font/woff2;base64,${fonte('albert-sans.woff2')}) format('woff2');font-weight:300 700}
html,body{margin:0;width:1200px;height:630px;background:#52543F;color:#F1ECE1;overflow:hidden}
.l{position:absolute;left:72px;top:64px;font:600 18px/1 A;letter-spacing:.16em;text-transform:uppercase;opacity:.85}
.t{position:absolute;left:72px;top:150px;width:620px;font:350 68px/1.02 N;letter-spacing:-.02em}
.r{position:absolute;left:72px;bottom:60px;display:flex;align-items:center;gap:18px;font:500 22px/1 A}
.r svg{height:46px;width:auto}
.j{position:absolute;right:96px;top:60px;width:390px;height:${Math.round(390 / marca.contraformas.baixa.proporcao)}px;clip-path:url(#d);background:#1E211A}
.j img{width:100%;height:100%;object-fit:cover;object-position:40% 18%;filter:sepia(.14) saturate(.9)}
</style>
<svg width="0" height="0" style="position:absolute"><clipPath id="d" clipPathUnits="objectBoundingBox"><path d="${dD}"/></clipPath></svg>
<div class="l">Espaço B · Lages, SC</div>
<div class="t">${titulo.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</div>
<div class="r"><svg viewBox="${marca.viewBox}"><path fill="#F1ECE1" d="${marca.b.d}"/></svg>Clínica Espaço B</div>
<div class="j">${retrato ? `<img src="${retrato}" alt="">` : ''}</div>`;

let b;
async function navegador() {
  if (b) return b;
  try {
    b = await chromium.launch();
  } catch {
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
    const d = readdirSync(base)
      .filter((x) => /^chromium-\d+$/.test(x))
      .sort()
      .reverse()[0];
    b = await chromium.launch({ executablePath: join(base, d, 'chrome-linux', 'chrome') });
  }
  return b;
}

// Plano B sem Chromium (ex.: build na Vercel): sharp compõe retrato no D + B vetorial + título em
// SVG (fonte do sistema; se não houver fonte, sai sem texto). Avisado no log; não quebra o build.
async function semNavegador(titulo, destino) {
  const W = 390;
  const H = Math.round(W / marca.contraformas.baixa.proporcao);
  const mascara = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><path transform="scale(${W} ${H})" d="${dD}" fill="#fff"/></svg>`,
  );
  const camadas = [];
  if (existsSync(retratoArq)) {
    const janela = await sharp(retratoArq)
      .resize(W, H, { fit: 'cover', position: 'north' })
      .composite([{ input: mascara, blend: 'dest-in' }])
      .png()
      .toBuffer();
    camadas.push({ input: janela, left: 1200 - 96 - W, top: 60 });
  }
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const linhas = [];
  let atual = '';
  for (const pal of titulo.split(' ')) {
    if ((atual + ' ' + pal).trim().length > 17) {
      linhas.push(atual.trim());
      atual = pal;
    } else atual += ` ${pal}`;
  }
  linhas.push(atual.trim());
  const [, , vw, vh] = marca.viewBox.split(' ').map(Number);
  const texto = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
      ${linhas.map((l, i) => `<text x="72" y="${200 + i * 64}" font-family="serif" font-size="56" fill="#F1ECE1">${esc(l)}</text>`).join('')}
      <svg x="72" y="${630 - 106}" width="${(46 * vw) / vh}" height="46" viewBox="${marca.viewBox}"><path fill="#F1ECE1" d="${marca.b.d}"/></svg>
    </svg>`,
  );
  camadas.push({ input: texto, left: 0, top: 0 });
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#52543F' } })
    .composite(camadas)
    .png()
    .toFile(destino);
}

let semChromium = false;
let feitas = 0;
let cacheadas = 0;
for (const [caminho, titulo] of pedidos) {
  const destino = join(dist, caminho);
  mkdirSync(dirname(destino), { recursive: true });
  const h = createHash('sha256')
    .update(`${MODELO}|${titulo}|${!!retrato}`)
    .digest('hex')
    .slice(0, 16);
  const emCache = join(cache, `${h}.png`);
  if (!existsSync(emCache) && !semChromium) {
    try {
      await navegador();
    } catch (e) {
      semChromium = true;
      console.warn(
        `gerar-og: Chromium indisponível (${String(e).split('\n')[0]}); usando o plano B (sharp)`,
      );
    }
  }
  if (!existsSync(emCache) && semChromium) {
    await semNavegador(titulo, destino);
    feitas++;
    continue;
  }
  if (!existsSync(emCache)) {
    const p = await (await navegador()).newPage({ viewport: { width: 1200, height: 630 } });
    await p.setContent(pagina(titulo));
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: emCache, type: 'png' });
    await p.close();
    feitas++;
  } else cacheadas++;
  copyFileSync(emCache, destino);
}
await b?.close();
console.log(
  `gerar-og: ${pedidos.size} imagem(ns) 1200×630 (${feitas} nova(s), ${cacheadas} do cache)${retrato ? '' : ' · sem retrato (media ausente)'}`,
);
