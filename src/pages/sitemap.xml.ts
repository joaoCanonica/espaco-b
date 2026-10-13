// sitemap.xml (sessão 8): todas as rotas públicas. Sem SITE_URL, usa um domínio marcador
// (.invalid) e o robots.txt bloqueia tudo: nada é indexado antes do domínio existir.
import type { APIRoute } from 'astro';
import { BASE_PENDENTE, rotasPublicas } from '../components/seo/rotasPublicas.ts';
import { seo } from '../config/seo.ts';

export const GET: APIRoute = () => {
  const base = (seo.siteUrl.valor ?? BASE_PENDENTE).replace(/\/$/, '');
  const urls = rotasPublicas()
    .map((r) => `  <url><loc>${base}${r}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
