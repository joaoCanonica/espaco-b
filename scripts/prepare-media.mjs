// Gera os derivados de mídia em public/media/ (fora do git) a partir de media-originais/.
// Idempotente: cada saída guarda a chave (hash do original + parâmetros) em public/media/.cache.json.
// Originais nunca são alterados. Uso: pnpm media:prepare  (MEDIA_SKIP=1 pula tudo)
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import sharp from 'sharp';
import { ffmpeg, gerarPoster } from './extract-posters.mjs';
import {
  ORIGINAIS,
  RAIZ,
  intervalosMantidos,
  lerManifesto,
  validarManifesto,
} from './lib/manifesto.mjs';

if (process.env.MEDIA_SKIP === '1') {
  console.log('media:prepare pulado (MEDIA_SKIP=1)');
  process.exit(0);
}

const VERSAO = 1; // mudar refaz todos os derivados
const LARGURAS = [480, 800, 1200, 1600, 2400];
const SAIDA = join(RAIZ, 'public', 'media');
const DIR_IMG = join(SAIDA, 'img');
const DIR_VID = join(SAIDA, 'video');
const CAMINHO_CACHE = join(SAIDA, '.cache.json');

// Orçamentos em bytes (perfil mobile 540×960; 720×1280 tem folga de 1,8×).
const ORCAMENTO = { ambiente: 2.5e6, mudo: 2.5e6, clique: 6e6, clipe: 1e6 };
const FOLGA_720 = 1.8;
const AUDIO = { mp4: 64, webm: 48 }; // kbps

const inicio = Date.now();
mkdirSync(DIR_IMG, { recursive: true });
mkdirSync(DIR_VID, { recursive: true });
const cache = existsSync(CAMINHO_CACHE) ? JSON.parse(readFileSync(CAMINHO_CACHE, 'utf8')) : {};
const relatorio = { geradoEm: new Date().toISOString(), itens: {} };
let refeitos = 0;
let pulados = 0;

const rel = (p) => p.slice(join(RAIZ, 'public').length).replaceAll('\\', '/');
const bytes = (p) => statSync(p).size;
const chave = (...partes) =>
  createHash('sha256')
    .update(JSON.stringify([VERSAO, ...partes]))
    .digest('hex')
    .slice(0, 16);

// Roda fn só se alguma saída faltar ou a chave mudou.
async function talvez(k, saidas, fn) {
  if (saidas.every((s) => existsSync(s) && cache[rel(s)] === k)) {
    pulados++;
    return false;
  }
  await fn();
  for (const s of saidas) cache[rel(s)] = k;
  writeFileSync(CAMINHO_CACHE, JSON.stringify(cache, null, 1));
  refeitos++;
  return true;
}

const hex = (r, g, b) =>
  '#' +
  [r, g, b]
    .map((v) => Math.round(v).toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();

// Retângulo de recorte para uma proporção e um object-position ("x% y%").
function recorte(W, H, proporcao, posicao) {
  const [pw, ph] = proporcao.split(':').map(Number);
  const [px, py] = posicao.split(' ').map((v) => parseFloat(v) / 100);
  let w = W;
  let h = Math.round((W * ph) / pw);
  if (h > H) {
    h = H;
    w = Math.round((H * pw) / ph);
  }
  return { left: Math.round((W - w) * px), top: Math.round((H - h) * py), width: w, height: h };
}

// ---------- imagens ----------
async function prepararImagem(item) {
  const orig = join(ORIGINAIS, item.arquivo);
  const { width: W, height: H } = await sharp(orig).metadata();
  const { channels } = await sharp(orig).stats();
  const placeholder = hex(channels[0].mean, channels[1].mean, channels[2].mean);
  const entrada = { tipo: item.tipo, placeholder, largura: W, altura: H, variantes: {} };

  const variantes = [{ nome: 'original', rect: null }];
  for (const r of item.recortes ?? []) {
    const rect = recorte(W, H, r.proporcao, r.objectPosition);
    const igual = rect.width === W && rect.height === H;
    variantes.push({
      nome: r.nome,
      rect: igual ? null : rect,
      aliasDe: igual ? 'original' : null,
      ...r,
    });
  }

  for (const v of variantes) {
    if (v.aliasDe) {
      entrada.variantes[v.nome] = { aliasDe: v.aliasDe, objectPosition: v.objectPosition };
      continue;
    }
    const w0 = v.rect?.width ?? W;
    const h0 = v.rect?.height ?? H;
    const larguras = LARGURAS.filter((l) => l <= w0);
    // inclui a largura do original quando ela fica entre dois degraus (ex.: 1500)
    if (w0 < LARGURAS.at(-1) && !larguras.includes(w0)) larguras.push(w0);
    const fontes = [];
    for (const l of larguras) {
      const sufixo = v.nome === 'original' ? '' : `-${v.nome}`;
      const avif = join(DIR_IMG, `${item.slug}${sufixo}-${l}.avif`);
      const webp = join(DIR_IMG, `${item.slug}${sufixo}-${l}.webp`);
      await talvez(chave(item.tecnico.sha256, v.rect, l, 'img'), [avif, webp], async () => {
        let base = sharp(orig);
        if (v.rect) base = base.extract(v.rect);
        base = base.resize({ width: l, withoutEnlargement: true });
        await base.clone().avif({ quality: 50, effort: 4 }).toFile(avif);
        await base.clone().webp({ quality: 78 }).toFile(webp);
      });
      fontes.push({
        largura: l,
        avif: rel(avif),
        webp: rel(webp),
        bytesAvif: bytes(avif),
        bytesWebp: bytes(webp),
      });
    }
    entrada.variantes[v.nome] = {
      largura: w0,
      altura: h0,
      objectPosition: v.objectPosition ?? item.objectPosition ?? '50% 50%',
      fontes,
    };
  }
  return entrada;
}

// ---------- vídeos ----------
function filtroCortes(intervalos, comAudio, escala) {
  const partes = [];
  const rotulos = [];
  intervalos.forEach((iv, i) => {
    partes.push(`[0:v]trim=start=${iv.ini}:end=${iv.fim},setpts=PTS-STARTPTS[v${i}]`);
    if (comAudio)
      partes.push(`[0:a]atrim=start=${iv.ini}:end=${iv.fim},asetpts=PTS-STARTPTS[a${i}]`);
    rotulos.push(`[v${i}]` + (comAudio ? `[a${i}]` : ''));
  });
  partes.push(
    `${rotulos.join('')}concat=n=${intervalos.length}:v=1:a=${comAudio ? 1 : 0}[vc]${comAudio ? '[ac]' : ''}`,
  );
  partes.push(`[vc]scale=${escala}:flags=lanczos,format=yuv420p[vo]`);
  return partes.join(';');
}

function codificar({ origem, intervalos, comAudio, largura, altura, formato, orcamento, saida }) {
  const dur = intervalos.reduce((s, iv) => s + iv.fim - iv.ini, 0);
  const audioK = comAudio ? AUDIO[formato] : 0;
  let videoK = Math.floor((orcamento * 8 * 0.94) / 1000 / dur - audioK);
  videoK = Math.max(150, Math.min(videoK, largura >= 720 ? 2600 : 1800));
  const crf = formato === 'mp4' ? (largura >= 720 ? 23 : 25) : largura >= 720 ? 32 : 34;
  const tentativas = [];
  for (let n = 0; n < 4; n++) {
    const args = [
      '-i',
      origem,
      '-filter_complex',
      filtroCortes(intervalos, comAudio, `${largura}:${altura}`),
      '-map',
      '[vo]',
    ];
    if (comAudio) args.push('-map', '[ac]');
    if (formato === 'mp4') {
      args.push('-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-crf', String(crf));
      args.push('-maxrate', `${videoK}k`, '-bufsize', `${videoK * 2}k`, '-movflags', '+faststart');
      args.push(...(comAudio ? ['-c:a', 'aac', '-b:a', `${audioK}k`] : ['-an']));
    } else {
      args.push('-c:v', 'libvpx-vp9', '-crf', String(crf), '-b:v', `${videoK}k`);
      args.push('-row-mt', '1', '-deadline', 'good', '-cpu-used', '4');
      args.push(...(comAudio ? ['-c:a', 'libopus', '-b:a', `${audioK}k`] : ['-an']));
    }
    ffmpeg([...args, saida]);
    const b = bytes(saida);
    tentativas.push({ crf, videoK, bytes: b });
    if (b <= orcamento) break;
    videoK = Math.floor(videoK * 0.82);
  }
  return { duracao: +dur.toFixed(2), tentativas, dentroDoOrcamento: bytes(saida) <= orcamento };
}

async function prepararVideo(item) {
  const origem = join(ORIGINAIS, item.arquivo);
  const intervalos = intervalosMantidos(item);
  const comAudio = item.perfil === 'clique' && item.audio;
  const orc = ORCAMENTO[item.perfil];
  const entrada = {
    tipo: 'video',
    perfil: item.perfil,
    audio: comAudio,
    naoUsarComoCapa: item.naoUsarComoCapa,
    pacienteRefs: item.pacienteRefs ?? [],
    intervalos,
    legendaZona: item.legendaQueimada.zona,
    poster: {},
    fontes: [],
    clipes: [],
  };

  const posters = ['720', '540'].flatMap((l) =>
    ['avif', 'webp'].map((f) => join(DIR_VID, `${item.slug}-poster-${l}.${f}`)),
  );
  await talvez(chave(item.tecnico.sha256, item.poster.t, 'poster'), posters, () =>
    gerarPoster(item, DIR_VID),
  );
  for (const p of posters) entrada.poster[p.split('-poster-')[1]] = rel(p);

  for (const [largura, altura, fator] of [
    [540, 960, 1],
    [720, 1280, FOLGA_720],
  ]) {
    for (const formato of ['mp4', 'webm']) {
      const saida = join(DIR_VID, `${item.slug}-${largura}.${formato}`);
      let info = cache[`info:${rel(saida)}`];
      const k = chave(item.tecnico.sha256, intervalos, comAudio, largura, formato, orc * fator);
      const t0 = Date.now();
      const feito = await talvez(k, [saida], () => {
        info = codificar({
          origem,
          intervalos,
          comAudio,
          largura,
          altura,
          formato,
          orcamento: orc * fator,
          saida,
        });
      });
      if (feito) {
        info.segundos = +((Date.now() - t0) / 1000).toFixed(1);
        cache[`info:${rel(saida)}`] = info;
        writeFileSync(CAMINHO_CACHE, JSON.stringify(cache, null, 1));
      }
      entrada.fontes.push({
        largura,
        altura,
        formato,
        src: rel(saida),
        bytes: bytes(saida),
        orcamento: orc * fator,
        ...info,
      });
    }
  }

  for (const c of item.clipes ?? []) {
    const nomeBase = `${item.slug}-${c.id}`;
    const saidas = ['mp4', 'webm'].map((f) => join(DIR_VID, `${nomeBase}.${f}`));
    const posterClipe = join(DIR_VID, `${nomeBase}-poster.avif`);
    const k = chave(item.tecnico.sha256, c, 'clipe');
    await talvez(k, [...saidas, posterClipe], async () => {
      for (const [i, f] of ['mp4', 'webm'].entries()) {
        codificar({
          origem,
          intervalos: [{ ini: c.ini, fim: c.fim }],
          comAudio: false,
          largura: 720,
          altura: 1280,
          formato: f,
          orcamento: ORCAMENTO.clipe,
          saida: saidas[i],
        });
      }
      const png = ffmpeg([
        '-ss',
        String((c.ini + c.fim) / 2),
        '-i',
        origem,
        '-frames:v',
        '1',
        '-f',
        'image2pipe',
        '-vcodec',
        'png',
        '-',
      ]);
      await sharp(png).resize({ width: 540 }).avif({ quality: 55 }).toFile(posterClipe);
    });
    entrada.clipes.push({
      id: c.id,
      pacienteRef: c.pacienteRef,
      naoUsarComoCapa: true,
      duracao: +(c.fim - c.ini).toFixed(2),
      poster: rel(posterClipe),
      fontes: saidas.map((s) => ({
        src: rel(s),
        bytes: bytes(s),
        dentroDoOrcamento: bytes(s) <= ORCAMENTO.clipe,
      })),
    });
  }
  return entrada;
}

// ---------- execução ----------
const manifesto = lerManifesto();
const { erros, avisos } = await validarManifesto(manifesto);
for (const a of avisos) console.warn(`aviso: ${a}`);
if (erros.length) {
  for (const e of erros) console.error(`erro: ${e}`);
  process.exit(1);
}

for (const item of manifesto.itens) {
  if (!item.publicavel && !item.previewOk) continue;
  if (item.substituida) continue;
  const t0 = Date.now();
  const entrada = item.tipo === 'video' ? await prepararVideo(item) : await prepararImagem(item);
  entrada.publicavel = item.publicavel;
  entrada.naoUsarComoCapa = item.naoUsarComoCapa;
  relatorio.itens[item.slug] = entrada;
  console.log(`✓ ${item.slug} (${((Date.now() - t0) / 1000).toFixed(1)} s)`);
}

relatorio.segundos = +((Date.now() - inicio) / 1000).toFixed(1);
writeFileSync(join(SAIDA, 'indice.json'), JSON.stringify(relatorio, null, 1));
console.log(`media:prepare: ${refeitos} refeito(s), ${pulados} em cache, ${relatorio.segundos} s`);
