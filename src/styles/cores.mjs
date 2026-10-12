// Gera o CSS de cor a partir de paleta.mjs (usado inline no <head> por Base.astro).
import { TOM_PAGINA, primitivas, temas } from './paleta.mjs';

const kebab = (s) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
const decl = (obj, prefixo) =>
  Object.entries(obj)
    .map(([k, v]) => `${prefixo}${kebab(k)}:${v};`)
    .join('');

export function cssDasCores() {
  const out = [];
  out.push(`:root{${decl(primitivas, '--c-')}}`);
  const bloco = (tema, seletorRaiz) => {
    const t = temas[tema];
    out.push(`${seletorRaiz}{${decl(t[TOM_PAGINA], '--')}color-scheme:${tema};}`);
    for (const tom of Object.keys(t)) {
      out.push(`${seletorRaiz} [data-tone="${tom}"]{${decl(t[tom], '--')}}`);
    }
  };
  bloco('light', ':root');
  bloco('dark', ':root[data-theme="dark"]');
  // Sem JS: segue o sistema.
  out.push('@media (prefers-color-scheme: dark){');
  bloco('dark', ':root:not([data-theme])');
  out.push('}');
  return out.join('\n');
}
