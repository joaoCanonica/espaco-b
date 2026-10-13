// Rotas públicas indexáveis (sitemap.xml e audit-seo): as mapeadas em seo.ts com indexar ≠ false,
// os protocolos confirmados e /casos só se a rota existir (mídia utilizável e módulo ligado).
import { rotas } from '../../config/seo.ts';
import { casosUtilizaveis } from '../paginas/casos.ts';
import { protocolosPublicos } from '../servicos/protocolos.ts';

export function rotasPublicas(): string[] {
  const fixas = Object.entries(rotas)
    .filter(([k, m]) => m.indexar !== false && !k.includes('*'))
    .map(([k]) => k)
    .filter((k) => k !== '/casos/' || casosUtilizaveis() !== null);
  return [...fixas, ...protocolosPublicos.map((p) => `/protocolos-bia/${p.id}/`)];
}

/** Base absoluta do sitemap/robots: SITE_URL, ou um marcador que nunca resolve (preview). */
export const BASE_PENDENTE = 'https://site-url-pendente.invalid';
