// Pôsteres e folhas de contato dos vídeos do manifesto.
// Uso: node scripts/extract-posters.mjs            → pôsteres em public/media/video/
//      node scripts/extract-posters.mjs --folhas   → também folhas de contato em docs/capturas/midia/
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import { ORIGINAIS, RAIZ, lerManifesto } from './lib/manifesto.mjs';

export function ffmpeg(args) {
  const r = spawnSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], {
    maxBuffer: 1 << 28,
  });
  if (r.status !== 0) throw new Error(`ffmpeg falhou: ${r.stderr?.toString() || r.error}`);
  return r.stdout;
}

// Quadro do original no tempo t, como PNG em memória.
export function quadro(item, t) {
  return ffmpeg([
    '-ss',
    String(t),
    '-i',
    join(ORIGINAIS, item.arquivo),
    '-frames:v',
    '1',
    '-f',
    'image2pipe',
    '-vcodec',
    'png',
    '-',
  ]);
}

// Pôster AVIF + WebP em 720×1280 e 540×960.
export async function gerarPoster(item, destino) {
  const png = quadro(item, item.poster.t);
  const saidas = [];
  for (const largura of [720, 540]) {
    const base = sharp(png).resize({ width: largura });
    const avif = join(destino, `${item.slug}-poster-${largura}.avif`);
    const webp = join(destino, `${item.slug}-poster-${largura}.webp`);
    await base.clone().avif({ quality: 55, effort: 4 }).toFile(avif);
    await base.clone().webp({ quality: 78 }).toFile(webp);
    saidas.push(avif, webp);
  }
  return saidas;
}

// Folha de contato: 1 quadro a cada 2 s, borda vermelha nos trechos usar:false.
export function gerarFolha(item, destino) {
  const fora = item.segmentos.filter((s) => !s.usar);
  const caixas = fora
    .map((s) => `drawbox=color=red@0.9:t=10:enable='between(t,${s.ini},${s.fim})'`)
    .join(',');
  const n = Math.ceil(item.tecnico.duracao / 2);
  const cols = 10;
  const linhas = Math.ceil(n / cols);
  // Marcas e rótulos antes da amostragem: refletem o tempo real do quadro escolhido.
  const filtros = [
    'scale=180:320',
    ...(caixas ? [caixas] : []),
    "drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='%{pts\\:hms}':x=4:y=4:fontsize=14:fontcolor=yellow:box=1:boxcolor=black@0.7",
    'fps=1/2',
    `tile=${cols}x${linhas}:padding=3:margin=3`,
  ].join(',');
  const saida = join(destino, `${item.slug}.png`);
  ffmpeg(['-i', join(ORIGINAIS, item.arquivo), '-vf', filtros, '-frames:v', '1', saida]);
  return saida;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const videos = lerManifesto().itens.filter((i) => i.tipo === 'video');
  const destinoPoster = join(RAIZ, 'public', 'media', 'video');
  mkdirSync(destinoPoster, { recursive: true });
  for (const v of videos) {
    await gerarPoster(v, destinoPoster);
    console.log(`pôster: ${v.slug} (t=${v.poster.t} s)`);
  }
  if (process.argv.includes('--folhas')) {
    const destinoFolha = join(RAIZ, 'docs', 'capturas', 'midia');
    mkdirSync(destinoFolha, { recursive: true });
    for (const v of videos) console.log(`folha: ${gerarFolha(v, destinoFolha)}`);
  }
}
