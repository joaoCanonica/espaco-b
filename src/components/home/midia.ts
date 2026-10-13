// Vídeos da home a partir de public/media/indice.json (gerado por prepare-media; fora do git).
// Sem índice, devolve null e a seção usa placeholder (preview) ou some com alerta (produção).
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { itemDoManifesto } from '../../config/midia.ts';
import type { Zona } from '../brand/marca.ts';
import type { ImagemResolvida } from '../hero/midia.ts';

interface FonteVideo {
  largura?: number;
  formato?: string;
  src: string;
}
interface Clipe {
  id: string;
  pacienteRef: string;
  naoUsarComoCapa: boolean;
  duracao: number;
  poster: string;
  fontes: FonteVideo[];
}
interface EntradaVideo {
  tipo: string;
  legendaZona?: Zona;
  poster?: Record<string, string>;
  fontes?: FonteVideo[];
  clipes?: Clipe[];
}

let cache: Record<string, EntradaVideo> | null | undefined;
function indice(): Record<string, EntradaVideo> | null {
  if (cache !== undefined) return cache;
  const arq = join(process.cwd(), 'public', 'media', 'indice.json');
  const valor: Record<string, EntradaVideo> | null = existsSync(arq)
    ? (JSON.parse(readFileSync(arq, 'utf8')).itens ?? null)
    : null;
  cache = valor;
  return valor;
}

function entrada(id: string): EntradaVideo | undefined {
  const item = itemDoManifesto(id);
  if (!item || !item.publicavel) return undefined;
  const e = indice()?.[item.slug];
  return e?.tipo === 'video' ? e : undefined;
}

export interface VideoResolvido {
  mp4: string;
  webm?: string;
  poster: string;
  zonaLegenda?: Zona;
}

/** Vídeo inteiro (540 px: a janela nunca passa disso na tela). */
export function videoDoItem(id: string): VideoResolvido | null {
  const e = entrada(id);
  const mp4 = e?.fontes?.find((f) => f.largura === 540 && f.formato === 'mp4');
  const poster = e?.poster?.['540.webp'] ?? e?.poster?.['720.webp'];
  if (!e || !mp4 || !poster) return null;
  const webm = e.fontes?.find((f) => f.largura === 540 && f.formato === 'webm');
  return {
    mp4: mp4.src,
    ...(webm ? { webm: webm.src } : {}),
    poster,
    ...(e.legendaZona ? { zonaLegenda: e.legendaZona } : {}),
  };
}

export interface ClipeResolvido extends VideoResolvido {
  id: string;
  pacienteRef: string;
}

/** Clipes curtos de caso (segmentos com pacienteRef), já cortados pelo prepare-media. */
export function clipesDoItem(id: string): ClipeResolvido[] {
  const e = entrada(id);
  return (e?.clipes ?? []).flatMap((c) => {
    const mp4 = c.fontes.find((f) => f.src.endsWith('.mp4'));
    const webm = c.fontes.find((f) => f.src.endsWith('.webm'));
    if (!mp4) return [];
    return [
      {
        id: c.id,
        pacienteRef: c.pacienteRef,
        mp4: mp4.src,
        ...(webm ? { webm: webm.src } : {}),
        poster: c.poster,
      },
    ];
  });
}

/** Converte a imagem resolvida (hero/midia.ts) nas props de imagem da Janela. */
export function imagemJanela(img: ImagemResolvida, sizes: string, alt = '') {
  return {
    src: img.src,
    srcset: img.srcset,
    avifSrcset: img.avifSrcset,
    sizes,
    alt,
    largura: img.largura,
    altura: img.altura,
    objectPosition: img.objectPosition,
  };
}
