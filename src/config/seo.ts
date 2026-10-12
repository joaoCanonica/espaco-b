import { opcional } from './tipos.ts';

// Domínio ainda não existe: SITE_URL vem do ambiente. Sem ele (ou em preview) = noindex.
const siteUrl = typeof process !== 'undefined' ? process.env['SITE_URL'] : undefined;

export const seo = {
  siteUrl: opcional<string>(siteUrl ?? null, {
    rotulo: 'SITE_URL (domínio)',
    motivo: 'domínio ainda não existe; noindex até existir',
  }),
  idioma: 'pt-BR',
  tituloPadrao: 'Clínica Espaço B — Estética e Harmonização Corporal e Facial',
  ogImagemSlot: 'og.imagem',
  aggregateRating: false,
} as const;
