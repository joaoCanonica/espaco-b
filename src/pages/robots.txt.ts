// robots.txt (sessão 8). Preview ou sem SITE_URL: bloqueia tudo. Produção com domínio: libera o
// site, bloqueia rotas internas (/_*) e aplica a decisão sobre robôs de IA (seo.ts → robosIA).
import type { APIRoute } from 'astro';
import { emPreview } from '../config/ambiente.ts';
import { robosIA, seo } from '../config/seo.ts';

export const GET: APIRoute = () => {
  const base = seo.siteUrl.valor?.replace(/\/$/, '');
  let txt: string;
  if (!base || emPreview()) {
    txt = [
      '# Preview ou domínio ainda não definido: nada deve ser indexado.',
      'User-agent: *',
      'Disallow: /',
      '',
    ].join('\n');
  } else {
    const ia = Object.entries(robosIA).flatMap(([bot, ok]) => [
      `User-agent: ${bot}`,
      ok ? 'Allow: /' : 'Disallow: /',
      ...(ok ? ['Disallow: /_'] : []),
      '',
    ]);
    txt = [
      '# Espaço B · robots.txt (decisões em docs/SEO.md)',
      'User-agent: *',
      'Allow: /',
      'Disallow: /_',
      '',
      '# Robôs de IA (o respeito ao robots.txt é voluntário de cada empresa)',
      ...ia,
      `Sitemap: ${base}/sitemap.xml`,
      '',
    ].join('\n');
  }
  return new Response(txt, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
