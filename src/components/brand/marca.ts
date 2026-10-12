// Geometria da marca extraída por scripts/brand-extract.mjs (src/assets/brand/marca.json).
import marca from '../../assets/brand/marca.json' with { type: 'json' };

export type Forma = 'alta' | 'baixa';

export const viewBoxB = marca.viewBox;
export const pathB = marca.b.d;
export const cauda = marca.cauda as { d: string; viewBox: string } | null;
export const provisorio = marca.provisorio;

export function contraforma(f: Forma) {
  const c = marca.contraformas[f];
  return { d: c.d, dNormalizado: c.dNormalizado, proporcao: c.proporcao, caixa: c.caixa };
}

export interface Zona {
  topo: number;
  base: number;
  esquerda?: number;
  direita?: number;
}

// Amostra o contorno normalizado (0–1) e devolve, para cada faixa de y, o x mínimo e máximo.
function limites(d: string, faixas = 200): { min: number; max: number }[] {
  const toks = d.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  const pts: [number, number][] = [];
  let i = 0;
  let cmd = '';
  let cur: [number, number] = [0, 0];
  const n = () => parseFloat(toks[i++] ?? '0');
  while (i < toks.length) {
    const t = toks[i] ?? '';
    if (/[MLCZ]/.test(t)) {
      cmd = t;
      i++;
      if (cmd === 'Z') continue;
    }
    if (cmd === 'M' || cmd === 'L') {
      cur = [n(), n()];
      pts.push(cur);
    } else if (cmd === 'C') {
      const a: [number, number] = [n(), n()];
      const b: [number, number] = [n(), n()];
      const c: [number, number] = [n(), n()];
      for (let k = 1; k <= 30; k++) {
        const s = k / 30;
        const u = 1 - s;
        pts.push([
          u ** 3 * cur[0] + 3 * u * u * s * a[0] + 3 * u * s * s * b[0] + s ** 3 * c[0],
          u ** 3 * cur[1] + 3 * u * u * s * a[1] + 3 * u * s * s * b[1] + s ** 3 * c[1],
        ]);
      }
      cur = c;
    }
  }
  const out = Array.from({ length: faixas }, () => ({ min: 1, max: 0 }));
  // interpola arestas para cobrir todas as faixas
  for (let k = 0; k < pts.length; k++) {
    const [x1, y1] = pts[k] ?? [0, 0];
    const [x2, y2] = pts[(k + 1) % pts.length] ?? [0, 0];
    const passos = Math.max(1, Math.ceil(Math.abs(y2 - y1) * faixas * 2));
    for (let s = 0; s <= passos; s++) {
      const x = x1 + ((x2 - x1) * s) / passos;
      const y = y1 + ((y2 - y1) * s) / passos;
      const f = out[Math.min(faixas - 1, Math.max(0, Math.floor(y * faixas)))];
      if (f) {
        f.min = Math.min(f.min, x);
        f.max = Math.max(f.max, x);
      }
    }
  }
  return out;
}

/** A curva do D corta a zona? (true = a zona fica inteira dentro da forma). */
export function zonaLivre(f: Forma, z: Zona): boolean {
  const lim = limites(contraforma(f).dNormalizado);
  const esq = z.esquerda ?? 0.15;
  const dir = z.direita ?? 0.85;
  const n = lim.length;
  for (let k = Math.floor(z.topo * n); k <= Math.min(n - 1, Math.ceil(z.base * n)); k++) {
    const l = lim[k];
    if (!l || l.min > esq || l.max < dir) return false;
  }
  return true;
}
