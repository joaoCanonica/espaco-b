// audit-seo (sessão 8): confere em dist/ títulos, descriptions, robots/noindex, canonical, Open
// Graph/Twitter (com a imagem 1200×630), JSON-LD (sintaxe, vocabulário schema.org, NAP, sem
// AggregateRating/Review, FAQ = perguntas visíveis), links internos e sitemap/robots/llms.
// O vocabulário vem de node_modules/schema-dts (gerado do schema.org oficial).
// Uso: node scripts/audit-seo.mjs   (sai com 1 se houver erro)
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
if (!existsSync(dist)) {
  console.error('audit-seo: dist/ não existe (rode o build)');
  process.exit(2);
}
const imp = (p) => import(pathToFileURL(join(raiz, p)).href);
const { contato } = await imp('src/config/contato.ts');

const SITE_URL = process.env.SITE_URL?.replace(/\/$/, '') ?? null;
const erros = [];
const avisos = [];
const erro = (pag, msg) => erros.push(`${pag}: ${msg}`);

// Vocabulário schema.org (tipos e propriedades) a partir do schema-dts.
const dts = readFileSync(join(raiz, 'node_modules/schema-dts/dist/schema.d.ts'), 'utf8');
const TIPOS = new Set([...dts.matchAll(/^export type (\w+) =/gm)].map((m) => m[1]));
const PROPS = new Set([...dts.matchAll(/"(\w+)"\?:/g)].map((m) => m[1]));
const versaoDts = JSON.parse(
  readFileSync(join(raiz, 'node_modules/schema-dts/package.json'), 'utf8'),
).version;

const decod = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
const meta = (t, attr, nome) =>
  t.match(new RegExp(`<meta ${attr}="${nome}" content="([^"]*)"`))?.[1] ?? null;

function html(dir) {
  return readdirSync(dir).flatMap((n) => {
    const c = join(dir, n);
    return statSync(c).isDirectory() ? html(c) : n.endsWith('.html') ? [c] : [];
  });
}
function pngTamanho(arq) {
  const b = readFileSync(arq);
  return b.toString('ascii', 12, 16) === 'IHDR' ? [b.readUInt32BE(16), b.readUInt32BE(20)] : null;
}
function nos(v, fn, caminho = '') {
  if (Array.isArray(v)) v.forEach((x, i) => nos(x, fn, `${caminho}[${i}]`));
  else if (v && typeof v === 'object') {
    fn(v, caminho);
    for (const [k, x] of Object.entries(v)) nos(x, fn, `${caminho}.${k}`);
  }
}
const textoVisivel = (t) =>
  decod(
    t
      .replace(/<script[\s\S]*?<\/script>/g, ' ')
      .replace(/<style[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  );

const VETADOS_META = [
  /\bmelhor\b/i,
  /\bn[ºo°]\.?\s?1\b/i,
  /\bn[úu]mero\s+(1|um)\b/i,
  /\bgarantid/i,
];
const ROTA_ANTIGA = '/pele-e-laser/';

const titulos = new Map();
const publicas = [];
let linhasTabela = [];
for (const arq of html(dist).sort()) {
  const rota = '/' + relative(dist, arq).replace(/index\.html$/, '');
  if (rota.startsWith('/_')) continue; // rotas internas (só preview)
  const t = readFileSync(arq, 'utf8');
  const e404 = rota === '/404.html';
  if (!/<html lang="pt-BR"/.test(t)) erro(rota, 'html sem lang="pt-BR"');

  const titulo = decod(t.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  const desc = decod(meta(t, 'name', 'description') ?? '');
  if (!titulo) erro(rota, 'sem <title>');
  else if (titulo.length > 60) erro(rota, `title com ${titulo.length} caracteres (> 60)`);
  if (!desc) erro(rota, 'sem meta description');
  else if (desc.length > 155) erro(rota, `description com ${desc.length} caracteres (> 155)`);
  for (const re of VETADOS_META)
    if (re.test(titulo) || re.test(desc)) erro(rota, `termo vetado em title/description (${re})`);

  const robots = meta(t, 'name', 'robots') ?? '';
  const preview = t.includes('data-preview-banner');
  if ((preview || !SITE_URL || e404 || rota === ROTA_ANTIGA) && !/noindex/.test(robots))
    erro(rota, `deveria ter noindex (preview=${preview}, SITE_URL=${!!SITE_URL})`);

  const canonical = t.match(/<link rel="canonical" href="([^"]+)"/)?.[1] ?? null;
  if (!e404) {
    if (!canonical) erro(rota, 'sem canonical');
    else {
      const esperado = rota === ROTA_ANTIGA ? '/pele-e-tecnologia/' : rota;
      const caminho = SITE_URL ? canonical.replace(SITE_URL, '') : canonical;
      if (SITE_URL && !canonical.startsWith(SITE_URL))
        erro(rota, `canonical não absoluto em SITE_URL: ${canonical}`);
      if (caminho !== esperado) erro(rota, `canonical ${canonical} ≠ ${esperado}`);
    }
  }

  for (const [a, n] of [
    ['property', 'og:title'],
    ['property', 'og:description'],
    ['property', 'og:image'],
    ['property', 'og:locale'],
    ['name', 'twitter:card'],
    ['name', 'twitter:image'],
  ])
    if (!meta(t, a, n)) erro(rota, `sem ${n}`);
  const og = meta(t, 'property', 'og:image');
  if (og) {
    const arqOg = join(dist, new URL(og, 'http://x').pathname);
    const tam = existsSync(arqOg) ? pngTamanho(arqOg) : null;
    if (!tam) erro(rota, `og:image não existe em dist (${og})`);
    else if (tam[0] !== 1200 || tam[1] !== 630)
      erro(rota, `og:image ${tam.join('×')} (≠ 1200×630)`);
    if (SITE_URL && !og.startsWith(SITE_URL)) erro(rota, 'og:image não absoluto');
  }

  // JSON-LD
  const blocos = [...t.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => m[1],
  );
  const tipos = new Set();
  let faqNomes = [];
  if (!e404) {
    if (!blocos.length) erro(rota, 'sem JSON-LD');
    for (const b of blocos) {
      let j;
      try {
        j = JSON.parse(b);
      } catch (x) {
        erro(rota, `JSON-LD inválido: ${x.message}`);
        continue;
      }
      if (j['@context'] !== 'https://schema.org')
        erro(rota, 'JSON-LD sem @context https://schema.org');
      nos(j, (o, c) => {
        for (const ty of [o['@type']].flat().filter(Boolean)) {
          tipos.add(ty);
          if (!TIPOS.has(ty)) erro(rota, `tipo desconhecido no schema.org: ${ty} (${c})`);
          if (ty === 'AggregateRating' || ty === 'Review') erro(rota, `${ty} no schema (proibido)`);
        }
        for (const k of Object.keys(o))
          if (!k.startsWith('@') && !PROPS.has(k))
            erro(rota, `propriedade desconhecida no schema.org: ${k} (${c})`);
        if ('aggregateRating' in o || 'review' in o)
          erro(rota, 'aggregateRating/review no schema (proibido)');
        if (o['@type'] === 'HealthAndBeautyBusiness') {
          const end = contato.endereco.valor;
          const w = contato.whatsapp.valor;
          const geo = contato.google.geo.valor;
          if (o.name !== 'Clínica Espaço B') erro(rota, `name da entidade: ${o.name}`);
          if (!o.alternateName) erro(rota, 'entidade sem alternateName');
          if (!o.address?.streetAddress?.includes(end.bairro))
            erro(rota, 'endereço sem o bairro da config');
          if (o.address?.postalCode !== end.cep || o.address?.addressLocality !== end.cidade)
            erro(rota, 'CEP/cidade ≠ config');
          if (o.telephone?.replace(/\D/g, '') !== w.e164.replace(/\D/g, ''))
            erro(rota, 'telefone ≠ config');
          if (o.geo?.latitude !== geo.lat || o.geo?.longitude !== geo.lng)
            erro(rota, 'geo ≠ config');
        }
        if (o['@type'] === 'FAQPage') faqNomes = o.mainEntity.map((q) => q.name);
      });
    }
    for (const req of ['HealthAndBeautyBusiness', 'WebSite', 'WebPage', 'Person'])
      if (!tipos.has(req)) erro(rota, `JSON-LD sem ${req}`);
    if (rota !== '/' && !tipos.has('BreadcrumbList')) erro(rota, 'sem BreadcrumbList');
    // FAQ: o schema tem de ser igual às perguntas visíveis (<details>/<summary>).
    const summaries = [...t.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map((m) =>
      textoVisivel(m[1]).replace(/\s+/g, ' ').trim(),
    );
    const faqVisiveis = summaries.filter((s) => /\?/.test(s));
    if (faqVisiveis.length && !faqNomes.length)
      erro(rota, 'página tem FAQ visível e não tem FAQPage');
    if (faqNomes.length && faqNomes.length !== faqVisiveis.length)
      erro(rota, `FAQPage com ${faqNomes.length} perguntas; ${faqVisiveis.length} visíveis`);
    for (const n of faqNomes)
      if (!faqVisiveis.some((s) => s.includes(n)))
        erro(rota, `pergunta do schema não visível: ${n}`);
  }
  if (/Sagrado Cora/i.test(t)) erro(rota, 'bairro divergente ("Sagrado Coração") no HTML');

  if (!e404 && rota !== ROTA_ANTIGA) {
    publicas.push(rota);
    if (titulos.has(titulo)) erro(rota, `title duplicado com ${titulos.get(titulo)}`);
    titulos.set(titulo, rota);
  }
  linhasTabela.push(
    `${rota.padEnd(36)} ${String(titulo.length).padStart(3)} ${String(desc.length).padStart(4)}  ${/noindex/.test(robots) ? 'noindex' : 'index  '}  ${[...tipos].filter((x) => /Business|FAQ|Breadcrumb|WebSite/.test(x)).join(',')}`,
  );
}

// GEO (aviso, não erro): resumo citável de 40–60 palavras no topo e autor/credencial perto do
// topo nas páginas de serviço e de protocolo.
const geo = [];
for (const rota of publicas.filter((r) =>
  /^\/(harmonizacao-facial|corpo-e-emagrecimento|pele-e-tecnologia|protocolos-bia)\//.test(r),
)) {
  const t = readFileSync(join(dist, rota, 'index.html'), 'utf8');
  const main = t.slice(t.indexOf('<main'), t.indexOf('</main>'));
  const resumo = main.match(/<p[^>]*data-resumo[^>]*>([\s\S]*?)<\/p>/)?.[1];
  const palavras = resumo ? textoVisivel(resumo).trim().split(/\s+/).length : 0;
  const texto = textoVisivel(main).replace(/\s+/g, ' ');
  const pos = texto.indexOf('CREFITO');
  const pct = pos < 0 ? null : Math.round((pos / texto.length) * 100);
  const okResumo = palavras >= 40 && palavras <= 60;
  const okAutor = pct !== null && pct <= 25;
  geo.push(
    `${rota.padEnd(36)} resumo ${palavras ? `${palavras} palavras` : 'ausente'}${okResumo ? '' : ' ✗'} · credencial ${pct === null ? 'ausente' : `a ${pct}% do texto`}${okAutor ? '' : ' ✗'}`,
  );
  if (!okResumo)
    avisos.push(
      `GEO ${rota}: resumo citável ${palavras ? `com ${palavras} palavras` : 'ausente'} (meta 40–60)`,
    );
  if (!okAutor)
    avisos.push(
      `GEO ${rota}: autor/credencial ${pct === null ? 'ausente' : `só a ${pct}% da página`} (meta: perto do topo)`,
    );
}

// sitemap
const sm = join(dist, 'sitemap.xml');
if (!existsSync(sm)) erro('sitemap.xml', 'não existe');
else {
  const locs = [...readFileSync(sm, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname,
  );
  const a = new Set(locs);
  const b = new Set(publicas);
  for (const r of b) if (!a.has(r)) erro('sitemap.xml', `rota pública fora do sitemap: ${r}`);
  for (const r of a) if (!b.has(r)) erro('sitemap.xml', `rota no sitemap sem página: ${r}`);
  if (!SITE_URL) avisos.push('sitemap.xml usa o domínio marcador .invalid (SITE_URL não definido)');
}
const rb = join(dist, 'robots.txt');
if (!existsSync(rb)) erro('robots.txt', 'não existe');
else {
  const r = readFileSync(rb, 'utf8');
  if (!SITE_URL && !/Disallow: \/\s*$/m.test(r))
    erro('robots.txt', 'sem SITE_URL deveria bloquear tudo');
  if (SITE_URL && !r.includes(`Sitemap: ${SITE_URL}/sitemap.xml`))
    erro('robots.txt', 'sem a linha Sitemap');
}
if (!existsSync(join(dist, 'llms.txt'))) avisos.push('llms.txt ausente (opcional)');

// links internos
const links = spawnSync(process.execPath, [join(raiz, 'scripts/verificar-links.mjs')], {
  encoding: 'utf8',
});
if (links.status !== 0) erro('links', links.stdout.trim().split('\n').slice(-3).join(' | '));

console.log(
  `audit-seo · vocabulário schema.org via schema-dts ${versaoDts} (${TIPOS.size} tipos, ${PROPS.size} propriedades) · SITE_URL=${SITE_URL ?? '(não definido)'}`,
);
console.log(`${'rota'.padEnd(36)} tít desc  robots   schema`);
for (const l of linhasTabela) console.log(l);
console.log(
  `sitemap: ${publicas.length} rota(s) pública(s) · links: ${links.stdout.trim().split('\n').pop()}`,
);
console.log('GEO (resumo citável e credencial):');
for (const g of geo) console.log(`  ${g}`);
for (const a of avisos) console.log(`aviso: ${a}`);
for (const e of erros) console.log(`✗ ${e}`);
console.log(erros.length ? `✗ audit-seo: ${erros.length} erro(s)` : '✓ audit-seo: tudo verde');
process.exit(erros.length ? 1 : 0);
