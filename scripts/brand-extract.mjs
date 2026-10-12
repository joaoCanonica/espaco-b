// Extrai a marca do logo: B, contraformas (alta/baixa) e cauda, como SVG.
// Fonte: media-originais/marca/logo.svg (vetor oficial, tem precedência) ou logo-b-2048.jpg (raster).
// Raster: só limiar suavizado (sem reamostragem, sem IA) + potrace. Saída em src/assets/brand/
// e comparação visual em docs/capturas/marca/. Uso: pnpm brand:extract
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import potrace from 'potrace';
import sharp from 'sharp';

const RAIZ = join(fileURLToPath(import.meta.url), '..', '..');
const MARCA = join(RAIZ, 'media-originais', 'marca');
const SAIDA = join(RAIZ, 'src', 'assets', 'brand');
const CAPTURAS = join(RAIZ, 'docs', 'capturas', 'marca');
const VETOR = join(MARCA, 'logo.svg');
const RASTER = join(MARCA, 'logo-b-2048.jpg');
mkdirSync(SAIDA, { recursive: true });
mkdirSync(CAPTURAS, { recursive: true });

const MUSGO = '#52543F';
const CREME = '#F4EFE6';

// ---------- caminhos SVG: parse, bbox e transformação ----------
function parsePath(d) {
  const toks = d.match(/[MLCZmlcz]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  const subs = [];
  let atual = null;
  let cmd = null;
  let x = 0;
  let y = 0;
  let i = 0;
  const num = () => parseFloat(toks[i++]);
  while (i < toks.length) {
    if (/[MLCZmlcz]/.test(toks[i])) cmd = toks[i++];
    if (cmd === 'Z' || cmd === 'z') {
      atual?.segs.push({ t: 'Z' });
      cmd = null;
      continue;
    }
    const rel = cmd === cmd.toLowerCase();
    const ox = rel ? x : 0;
    const oy = rel ? y : 0;
    if (cmd === 'M' || cmd === 'm') {
      x = ox + num();
      y = oy + num();
      atual = { segs: [{ t: 'M', p: [[x, y]] }] };
      subs.push(atual);
      cmd = rel ? 'l' : 'L';
    } else if (cmd === 'L' || cmd === 'l') {
      x = ox + num();
      y = oy + num();
      atual.segs.push({ t: 'L', p: [[x, y]] });
    } else if (cmd === 'C' || cmd === 'c') {
      const p1 = [ox + num(), oy + num()];
      const p2 = [ox + num(), oy + num()];
      x = ox + num();
      y = oy + num();
      atual.segs.push({ t: 'C', p: [p1, p2, [x, y]] });
    } else {
      throw new Error(`comando de path não suportado: ${cmd}`);
    }
  }
  return subs;
}

// Pontos amostrados do contorno (para bbox e área).
function amostrar(sub, passos = 24) {
  const pts = [];
  let cur = [0, 0];
  for (const s of sub.segs) {
    if (s.t === 'M' || s.t === 'L') {
      cur = s.p[0];
      pts.push(cur);
    } else if (s.t === 'C') {
      const [a, b, c] = s.p;
      for (let k = 1; k <= passos; k++) {
        const t = k / passos;
        const u = 1 - t;
        pts.push([
          u * u * u * cur[0] + 3 * u * u * t * a[0] + 3 * u * t * t * b[0] + t * t * t * c[0],
          u * u * u * cur[1] + 3 * u * u * t * a[1] + 3 * u * t * t * b[1] + t * t * t * c[1],
        ]);
      }
      cur = c;
    }
  }
  return pts;
}

function bbox(pts) {
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const x0 = Math.min(...xs);
  const y0 = Math.min(...ys);
  return { x: x0, y: y0, w: Math.max(...xs) - x0, h: Math.max(...ys) - y0 };
}

function area(pts) {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    a += x1 * y2 - x2 * y1;
  }
  return Math.abs(a / 2);
}

const fmt = (n) => +n.toFixed(4);

function serializar(subs, f = (p) => p) {
  return subs
    .map((sub) =>
      sub.segs
        .map((s) =>
          s.t === 'Z' ? 'Z' : `${s.t}${s.p.map((p) => f(p).map(fmt).join(' ')).join(' ')}`,
        )
        .join(''),
    )
    .join('');
}

const svg = (viewBox, d, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}"${extra}><path fill="currentColor" fill-rule="evenodd" d="${d}"/></svg>\n`;

// ---------- raster → path ----------
function tracar(buffer, opcoes) {
  return new Promise((resolve, reject) => {
    potrace.trace(buffer, opcoes, (err, out) => {
      if (err) return reject(err);
      const d = [...out.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join('');
      resolve(d);
    });
  });
}

const OPCOES = { threshold: 128, turdSize: 40, optTolerance: 0.2, alphaMax: 1, optCurve: true };

async function mascaraDoRaster() {
  const img = sharp(RASTER).greyscale();
  const { width: W, height: H } = await img.metadata();
  // Limiar no ponto médio entre fundo e letra, com desfoque leve para suavizar a borda JPEG.
  const { data } = await img.clone().blur(0.8).raw().toBuffer({ resolveWithObject: true });
  const ordenado = Uint8Array.from(data).sort();
  const fundo = ordenado[Math.floor(ordenado.length * 0.25)];
  const letra = ordenado[Math.floor(ordenado.length * 0.995)];
  const limiar = Math.round((fundo + letra) / 2);
  const mask = new Uint8Array(W * H);
  for (let i = 0; i < data.length; i++) mask[i] = data[i] >= limiar ? 1 : 0;
  return { W, H, mask, limiar, fundo, letra };
}

// Máscara binária → PNG (letra preta em fundo branco, para o potrace).
const pngDaMascara = (mask, W, H) =>
  sharp(Buffer.from(mask.map((v) => (v ? 0 : 255))), { raw: { width: W, height: H, channels: 1 } })
    .png()
    .toBuffer();

// ---------- execução ----------
let dB;
let origem;
let medidas = {};
let W = 2000;
let H = 2000;
let mask = null;
let escalaVetor = 1;

if (existsSync(VETOR)) {
  origem = 'vetor oficial (media-originais/marca/logo.svg)';
  const conteudo = readFileSync(VETOR, 'utf8');
  dB = [...conteudo.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join('');
  const vbo = conteudo
    .match(/viewBox="([^"]+)"/)?.[1]
    .split(/[\s,]+/)
    .map(Number);
  if (vbo) [, , W, H] = vbo;
  // As contraformas saem da mesma rotina do raster: rasteriza o vetor em alta resolução.
  const px = await sharp(Buffer.from(conteudo))
    .resize(2000)
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  mask = new Uint8Array(px.data.length);
  const escuroLetra = px.data[0] > 127; // fundo claro → letra escura
  for (let i = 0; i < px.data.length; i++) mask[i] = px.data[i] > 127 !== escuroLetra ? 1 : 0;
  escalaVetor = W / px.info.width;
  [W, H] = [px.info.width, px.info.height];
} else {
  origem = `raster ${RASTER.slice(RAIZ.length + 1)} (PROVISÓRIO)`;
  const r = await mascaraDoRaster();
  ({ W, H, mask } = r);
  medidas = { limiar: r.limiar, cinzaFundo: r.fundo, cinzaLetra: r.letra };
  dB = await tracar(await pngDaMascara(mask, W, H), OPCOES);
}

const subs = parsePath(dB).map((s) => {
  const pts = amostrar(s);
  return { ...s, pts, bb: bbox(pts), area: area(pts) };
});
subs.sort((a, b) => b.area - a.area);
const contorno = subs[0];

// Furos do B: fundo que não alcança a borda da imagem (flood fill a partir das bordas).
function furosDaMascara() {
  const fora = new Uint8Array(W * H);
  const fila = new Int32Array(W * H);
  let ini = 0;
  let fim = 0;
  const empurra = (i) => {
    if (!mask[i] && !fora[i]) {
      fora[i] = 1;
      fila[fim++] = i;
    }
  };
  for (let x = 0; x < W; x++) {
    empurra(x);
    empurra((H - 1) * W + x);
  }
  for (let y = 0; y < H; y++) {
    empurra(y * W);
    empurra(y * W + W - 1);
  }
  while (ini < fim) {
    const i = fila[ini++];
    const x = i % W;
    if (x > 0) empurra(i - 1);
    if (x < W - 1) empurra(i + 1);
    if (i >= W) empurra(i - W);
    if (i < W * (H - 1)) empurra(i + W);
  }
  const furo = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) furo[i] = !mask[i] && !fora[i] ? 1 : 0;
  return furo;
}

// As duas contraformas do logo se comunicam por um vão estreito entre a barra do meio e a haste.
// Separação: linhas em que o furo fica estreito (< 25% da largura mediana) são o vão; acima dele,
// contraforma alta; abaixo, baixa. Cada uma fecha seguindo a linha da própria barra (sem desenho à mão).
const furo = furosDaMascara();
const larguraLinha = [];
for (let y = 0; y < H; y++) {
  let n = 0;
  for (let x = 0; x < W; x++) n += furo[y * W + x];
  larguraLinha.push(n);
}
const linhasFuro = larguraLinha.map((n, y) => [n, y]).filter(([n]) => n > 0);
const yFuro0 = linhasFuro[0][1];
const yFuro1 = linhasFuro.at(-1)[1];
const mediana = [...linhasFuro.map(([n]) => n)].sort((a, b) => a - b)[
  Math.floor(linhasFuro.length / 2)
];
const vao = linhasFuro
  .filter(
    ([n, y]) =>
      n < mediana * 0.25 &&
      y > yFuro0 + (yFuro1 - yFuro0) * 0.25 &&
      y < yFuro0 + (yFuro1 - yFuro0) * 0.75,
  )
  .map(([, y]) => y);
if (!vao.length) throw new Error('não achei o vão entre as contraformas');
const vaoY0 = Math.min(...vao);
const vaoY1 = Math.max(...vao);
const mAlta = new Uint8Array(W * H);
const mBaixa = new Uint8Array(W * H);
for (let y = 0; y < H; y++) {
  if (y >= vaoY0 && y <= vaoY1) continue;
  const alvo = y < vaoY0 ? mAlta : mBaixa;
  for (let x = 0; x < W; x++) alvo[y * W + x] = furo[y * W + x];
}
medidas.vao = {
  y0: vaoY0,
  y1: vaoY1,
  larguraPx: Math.round(vao.reduce((a, y) => a + larguraLinha[y], 0) / vao.length),
};

async function formaDe(m) {
  const d = await tracar(await pngDaMascara(m, W, H), OPCOES);
  const s = parsePath(d)
    .map((sub) => {
      const pts = amostrar(sub);
      return { ...sub, pts, bb: bbox(pts), area: area(pts) };
    })
    .sort((a, b) => b.area - a.area)[0];
  if (escalaVetor !== 1) {
    const f = (p) => [p[0] * escalaVetor, p[1] * escalaVetor];
    for (const seg of s.segs) if (seg.p) seg.p = seg.p.map(f);
    s.pts = amostrar(s);
    s.bb = bbox(s.pts);
    s.area = area(s.pts);
  }
  return s;
}
const alta = await formaDe(mAlta);
const baixa = await formaDe(mBaixa);
if (alta.area >= baixa.area) throw new Error('a contraforma de cima deveria ser a menor');

// viewBox comum: caixa do B com folga de 1%.
const pad = Math.round(contorno.bb.w * 0.01);
const vb = {
  x: Math.floor(contorno.bb.x - pad),
  y: Math.floor(contorno.bb.y - pad),
  w: Math.ceil(contorno.bb.w + 2 * pad),
  h: Math.ceil(contorno.bb.h + 2 * pad),
};
const viewBox = `${vb.x} ${vb.y} ${vb.w} ${vb.h}`;
const desloca = (p) => [p[0] - vb.x, p[1] - vb.y];
const viewBox0 = `0 0 ${vb.w} ${vb.h}`;

// Borda esquerda reta: x do primeiro pixel da contraforma em cada linha (10%–90% da altura).
function bordaEsquerda(m, f) {
  const xs = [];
  const y0 = Math.round(f.bb.y / escalaVetor + (f.bb.h / escalaVetor) * 0.1);
  const y1 = Math.round(f.bb.y / escalaVetor + (f.bb.h / escalaVetor) * 0.9);
  for (let y = y0; y <= y1; y++) {
    for (let x = 0; x < W; x++) {
      if (m[y * W + x]) {
        xs.push(x);
        break;
      }
    }
  }
  const media = xs.reduce((a, v) => a + v, 0) / xs.length;
  const desvio = Math.sqrt(xs.reduce((a, v) => a + (v - media) ** 2, 0) / xs.length);
  const amplitude = Math.max(...xs) - Math.min(...xs);
  return {
    xMedio: +(media * escalaVetor).toFixed(1),
    desvioPx: +desvio.toFixed(2),
    amplitudePx: amplitude,
    reta: desvio < 2,
  };
}
const bordaAlta = bordaEsquerda(mAlta, alta);
const bordaBaixa = bordaEsquerda(mBaixa, baixa);

// Cauda: parte do B à esquerda da haste e abaixo do meio (exclui a serifa do topo).
const hasteEsq = Math.min(bordaAlta.xMedio, bordaBaixa.xMedio);
let dCauda;
let caudaBB;
if (mask) {
  // largura da haste = distância da borda esquerda do B (na faixa do meio) até a contraforma
  let xHaste = W;
  for (let y = Math.round(alta.bb.y + alta.bb.h * 0.5); y < alta.bb.y + alta.bb.h * 0.6; y++) {
    for (let x = 0; x < hasteEsq; x++) {
      if (mask[y * W + x]) {
        xHaste = Math.min(xHaste, x);
        break;
      }
    }
  }
  const corteX = xHaste - 2;
  const corteY = contorno.bb.y + contorno.bb.h * 0.5;
  const mCauda = new Uint8Array(W * H);
  for (let y = Math.ceil(corteY); y < H; y++) {
    for (let x = 0; x < corteX; x++) mCauda[y * W + x] = mask[y * W + x];
  }
  dCauda = await tracar(await pngDaMascara(mCauda, W, H), { ...OPCOES, turdSize: 20 });
  medidas.cauda = { corteX, corteY: Math.round(corteY), hasteEsquerdaX: xHaste };
} else {
  dCauda = null; // com vetor oficial, extrair a cauda manualmente não é permitido: avisar
}
const caudaSubs = dCauda ? parsePath(dCauda) : [];
if (caudaSubs.length) caudaBB = bbox(caudaSubs.flatMap((s) => amostrar(s)));

// Normalização 0–1 (clipPathUnits=objectBoundingBox) de cada contraforma.
function normalizado(f) {
  return serializar([f], (p) => [(p[0] - f.bb.x) / f.bb.w, (p[1] - f.bb.y) / f.bb.h]);
}

const dados = {
  origem,
  provisorio: !existsSync(VETOR),
  geradoEm: new Date().toISOString().slice(0, 10),
  fonte: { largura: W, altura: H },
  viewBox: viewBox0,
  b: {
    d: serializar(
      subs.filter((s) => s.area > contorno.area * 0.001),
      desloca,
    ),
  },
  contraformas: Object.fromEntries(
    [
      ['alta', alta],
      ['baixa', baixa],
    ].map(([nome, f]) => [
      nome,
      {
        d: serializar([f], desloca),
        dNormalizado: normalizado(f),
        caixa: { x: fmt(f.bb.x - vb.x), y: fmt(f.bb.y - vb.y), w: fmt(f.bb.w), h: fmt(f.bb.h) },
        proporcao: fmt(f.bb.w / f.bb.h),
        areaPx: Math.round(f.area),
        bordaEsquerda: nome === 'alta' ? bordaAlta : bordaBaixa,
      },
    ]),
  ),
  cauda: caudaBB
    ? {
        d: serializar(caudaSubs, (p) => [p[0] - caudaBB.x, p[1] - caudaBB.y]),
        viewBox: `0 0 ${Math.ceil(caudaBB.w)} ${Math.ceil(caudaBB.h)}`,
        dNoB: serializar(caudaSubs, desloca),
      }
    : null,
  medidas,
};

writeFileSync(join(SAIDA, 'marca.json'), JSON.stringify(dados, null, 2) + '\n');
writeFileSync(join(SAIDA, 'logo-b.svg'), svg(viewBox0, dados.b.d));
writeFileSync(join(SAIDA, 'contraforma-alta.svg'), svg(viewBox0, dados.contraformas.alta.d));
writeFileSync(join(SAIDA, 'contraforma-baixa.svg'), svg(viewBox0, dados.contraformas.baixa.d));
if (dados.cauda) writeFileSync(join(SAIDA, 'cauda-b.svg'), svg(dados.cauda.viewBox, dados.cauda.d));

// Favicon: B creme sobre musgo, quadrado (o B centrado com folga de 14%).
{
  const lado = Math.max(vb.w, vb.h) * 1.28;
  const ox = (lado - vb.w) / 2;
  const oy = (lado - vb.h) / 2;
  writeFileSync(
    join(RAIZ, 'public', 'favicon.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${fmt(lado)} ${fmt(lado)}"><rect width="100%" height="100%" fill="${MUSGO}"/><path transform="translate(${fmt(ox)} ${fmt(oy)})" fill="${CREME}" fill-rule="evenodd" d="${dados.b.d}"/></svg>\n`,
  );
}

// ---------- comparação visual e IoU (raster x vetor) ----------
const LADO = 800;
const desenho = (d, cor, fundo, vbox = viewBox) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${LADO}" height="${LADO}" viewBox="${vbox}"><rect x="-99999" y="-99999" width="999999" height="999999" fill="${fundo}"/><path fill="${cor}" fill-rule="evenodd" d="${d}"/></svg>`,
  );
const original = await sharp(RASTER)
  .extract({ left: vb.x, top: vb.y, width: vb.w, height: vb.h })
  .resize(LADO, LADO, { fit: 'contain', background: MUSGO })
  .png()
  .toBuffer();
const vetor = await sharp(desenho(serializar(subs), CREME, MUSGO))
  .png()
  .toBuffer();
const formas = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${LADO}" height="${LADO}" viewBox="${viewBox}"><rect x="-99999" y="-99999" width="999999" height="999999" fill="${MUSGO}"/><path fill="${CREME}" fill-opacity="0.25" fill-rule="evenodd" d="${serializar(subs)}"/><path fill="#8E2B41" d="${serializar([alta])}"/><path fill="#C9707F" d="${serializar([baixa])}"/>${dCauda ? `<path fill="${CREME}" d="${dCauda}"/>` : ''}<line x1="${hasteEsq}" x2="${hasteEsq}" y1="${vb.y}" y2="${vb.y + vb.h}" stroke="#F4EFE6" stroke-width="3" stroke-dasharray="12 10"/></svg>`,
);
const formasPng = await sharp(formas).png().toBuffer();
await sharp({ create: { width: LADO * 3 + 40, height: LADO, channels: 3, background: '#1E211A' } })
  .composite([
    { input: original, left: 0, top: 0 },
    { input: vetor, left: LADO + 20, top: 0 },
    { input: formasPng, left: 2 * LADO + 40, top: 0 },
  ])
  .png()
  .toFile(join(CAPTURAS, 'comparacao.png'));

let iou = null;
if (mask) {
  const rasterVetor = await sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#000"/><path fill="#fff" fill-rule="evenodd" d="${serializar(subs)}"/></svg>`,
    ),
  )
    .greyscale()
    .raw()
    .toBuffer();
  let inter = 0;
  let uniao = 0;
  const diff = Buffer.alloc(W * H * 3);
  for (let i = 0; i < W * H; i++) {
    const a = mask[i] === 1;
    const b = rasterVetor[i] > 127;
    if (a && b) inter++;
    if (a || b) uniao++;
    if (a !== b) diff[i * 3] = 255;
    else if (a) diff.fill(90, i * 3, i * 3 + 3);
  }
  iou = inter / uniao;
  await sharp(diff, { raw: { width: W, height: H, channels: 3 } })
    .extract({ left: vb.x, top: vb.y, width: vb.w, height: vb.h })
    .resize(LADO)
    .png()
    .toFile(join(CAPTURAS, 'diferenca.png'));
  dados.medidas.iou = +iou.toFixed(5);
  writeFileSync(join(SAIDA, 'marca.json'), JSON.stringify(dados, null, 2) + '\n');
}

console.log(`brand:extract · origem: ${origem}`);
console.log(`  B: ${subs.length} contornos · viewBox ${viewBox0}`);
for (const nome of ['alta', 'baixa']) {
  const c = dados.contraformas[nome];
  console.log(
    `  contraforma ${nome}: ${c.caixa.w.toFixed(0)}×${c.caixa.h.toFixed(0)} px · proporção ${c.proporcao} · borda esquerda: desvio ${c.bordaEsquerda.desvioPx} px (${c.bordaEsquerda.reta ? 'reta' : 'NÃO reta'})`,
  );
}
console.log(
  `  cauda: ${dados.cauda ? dados.cauda.viewBox : 'não extraída (vetor oficial: extrair à parte)'}`,
);
if (iou !== null) console.log(`  IoU raster × vetor: ${(iou * 100).toFixed(2)}%`);
console.log('  → src/assets/brand/, docs/capturas/marca/');
