// Resolve a mídia de um slot (src/config/midia.ts) para os derivados de public/media/indice.json.
// Se o índice não existir (build sem media:prepare), devolve null e o hero usa placeholder.
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { emPreview } from '../../config/ambiente.ts';
import { itemDoManifesto, resolverSlot, slots } from '../../config/midia.ts';

interface Fonte {
  largura: number;
  avif: string;
  webp: string;
}
interface Variante {
  largura?: number;
  altura?: number;
  objectPosition?: string;
  fontes?: Fonte[];
  aliasDe?: string;
}
interface EntradaIndice {
  tipo: string;
  placeholder?: string;
  largura?: number;
  altura?: number;
  variantes?: Record<string, Variante>;
}

let cache: Record<string, EntradaIndice> | null | undefined;
function indice(): Record<string, EntradaIndice> | null {
  if (cache !== undefined) return cache;
  const arq = join(process.cwd(), 'public', 'media', 'indice.json');
  const valor: Record<string, EntradaIndice> | null = existsSync(arq)
    ? (JSON.parse(readFileSync(arq, 'utf8')).itens ?? null)
    : null;
  cache = valor;
  return valor;
}

export interface ImagemResolvida {
  id: string;
  src: string;
  srcset: string;
  avifSrcset: string;
  largura: number;
  altura: number;
  objectPosition: string;
  placeholder: string;
}

export function imagemDoItem(id: string, objectPosition?: string): ImagemResolvida | null {
  const item = itemDoManifesto(id);
  const entrada = item ? indice()?.[item.slug] : undefined;
  const v = entrada?.variantes?.['original'];
  const fontes = v?.fontes;
  if (!item || !entrada || !v || !fontes?.length) return null;
  const media = fontes.find((f) => f.largura >= 800) ?? fontes[fontes.length - 1];
  return {
    id,
    src: media?.webp ?? '',
    srcset: fontes.map((f) => `${f.webp} ${f.largura}w`).join(', '),
    avifSrcset: fontes.map((f) => `${f.avif} ${f.largura}w`).join(', '),
    largura: v.largura ?? entrada.largura ?? 0,
    altura: v.altura ?? entrada.altura ?? 0,
    objectPosition: objectPosition ?? v.objectPosition ?? '50% 50%',
    placeholder: entrada.placeholder ?? 'transparent',
  };
}

/** Primeira imagem disponível da cadeia de fallback do slot (respeitando as regras do resolvedor). */
export function imagemDoSlot(slotId: string): ImagemResolvida | null {
  const slot = slots.find((s) => s.id === slotId);
  if (!slot) return null;
  let resto = [...slot.cadeia];
  while (resto.length) {
    const r = resolverSlot({ ...slot, cadeia: resto }, emPreview());
    if (!r.item) return null;
    const img = imagemDoItem(r.item.id);
    if (img) return img;
    resto = resto.slice(resto.indexOf(r.item.id) + 1);
  }
  return null;
}
