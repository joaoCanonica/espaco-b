// audit-lighthouse (sessão 9): Lighthouse (mobile e desktop) em todas as rotas públicas de dist/,
// servido com os cabeçalhos de public/_headers. Registra as quatro notas, LCP/CLS/TBT e, por rota,
// o JS e a mídia (imagem/vídeo) baixados na carga, mais o peso dos vídeos que só baixam no clique.
// Saída: docs/auditoria/lighthouse.md. Metas: Perf ≥ 95, A11y 100, BP ≥ 95, SEO ≥ 95 (o SEO cai
// para ~60 enquanto houver noindex: preview/sem SITE_URL, o que é esperado).
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { RAIZ } from './lib/manifesto.mjs';
import { caminhoChromium } from './lib/navegador.mjs';
import { DIST, rotasDoDist, servir } from './lib/servidor.mjs';

const saida = join(RAIZ, 'docs', 'auditoria');
const tmp = join(RAIZ, 'node_modules', '.cache', 'espaco-b-lh');
mkdirSync(tmp, { recursive: true });
mkdirSync(saida, { recursive: true });
const { base, fechar } = await servir();
const lh = join(RAIZ, 'node_modules', '.bin', 'lighthouse');
const env = { ...process.env, CHROME_PATH: process.env.CHROME_PATH ?? caminhoChromium() };
const kb = (b) => `${(b / 1024).toFixed(0)} KB`;

// vídeos referenciados na página (só baixam no clique): soma o maior arquivo de cada <video>
function videosNoClique(rota) {
  const t = readFileSync(join(DIST, rota, 'index.html'), 'utf8');
  const fontes = [...t.matchAll(/<source src="([^"]+\.(?:mp4|webm))"/g)].map((m) => m[1]);
  const mp4 = [...new Set(fontes.filter((f) => f.endsWith('.mp4')))];
  const total = mp4.reduce(
    (s, f) => s + (existsSync(join(DIST, f)) ? statSync(join(DIST, f)).size : 0),
    0,
  );
  return { n: mp4.length, total };
}

const linhas = [];
const abaixo = [];
for (const rota of rotasDoDist()) {
  const r = { rota };
  for (const perfil of ['mobile', 'desktop']) {
    const arq = join(tmp, `${rota.replace(/\//g, '_') || 'raiz'}-${perfil}.json`);
    const args = [
      `${base}${rota}`,
      '--quiet',
      '--output=json',
      `--output-path=${arq}`,
      '--chrome-flags=--headless=new --no-sandbox',
      '--only-categories=performance,accessibility,best-practices,seo',
    ];
    if (perfil === 'desktop') args.push('--preset=desktop');
    // LH_REUSAR=1 reaproveita medições válidas já salvas (só refaz as que falharam)
    const valido = () => {
      try {
        const j = JSON.parse(readFileSync(arq, 'utf8'));
        return !j.runtimeError && typeof j.categories.performance?.score === 'number';
      } catch {
        return false;
      }
    };
    // assíncrono: o servidor de dist/ roda neste mesmo processo (spawnSync o travaria)
    const medir = () =>
      new Promise((ok) => {
        const p = spawn(lh, args, { env, stdio: 'ignore' });
        const t = setTimeout(() => p.kill('SIGKILL'), 180000);
        p.on('exit', () => (clearTimeout(t), ok()));
      });
    if (!(process.env.LH_REUSAR === '1' && valido())) {
      await medir();
      if (!valido()) await medir(); // uma nova tentativa quando o Lighthouse não dá nota (erro de execução)
    }
    if (!valido()) {
      r[perfil] = null;
      abaixo.push(`${rota} ${perfil}: Lighthouse sem nota (erro de execução)`);
      continue;
    }
    const j = JSON.parse(readFileSync(arq, 'utf8'));
    const c = (k) => Math.round((j.categories[k]?.score ?? 0) * 100);
    const a = j.audits;
    const reqs = a['network-requests']?.details?.items ?? [];
    const soma = (f) => reqs.filter(f).reduce((s, q) => s + (q.transferSize ?? 0), 0);
    r[perfil] = {
      perf: c('performance'),
      a11y: c('accessibility'),
      bp: c('best-practices'),
      seo: c('seo'),
      lcp: Math.round(a['largest-contentful-paint'].numericValue),
      cls: a['cumulative-layout-shift'].numericValue,
      tbt: Math.round(a['total-blocking-time'].numericValue),
      js: soma((q) => q.resourceType === 'Script') + 0,
      img: soma((q) => q.resourceType === 'Image'),
      video: soma((q) => q.resourceType === 'Media'),
      total: soma(() => true),
      seoFalhas: j.categories.seo.auditRefs
        .map((x) => a[x.id])
        .filter((x) => x && x.score !== null && x.score < 1)
        .map((x) => x.id),
    };
    const m = r[perfil];
    if (m.perf < 95 || m.a11y < 100 || m.bp < 95)
      abaixo.push(`${rota} ${perfil}: perf ${m.perf}, a11y ${m.a11y}, bp ${m.bp}`);
  }
  // JS inline (não aparece como requisição): gzip estimado do HTML
  const t = readFileSync(join(DIST, rota, 'index.html'), 'utf8');
  const inline = [...t.matchAll(/<script(?![^>]*src=)(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g)]
    .map((x) => x[1])
    .join('');
  r.jsInline = (await import('node:zlib')).gzipSync(inline).length;
  r.clique = videosNoClique(rota);
  linhas.push(r);
  const mo = r.mobile;
  console.log(
    `${rota.padEnd(36)} mobile ${mo ? `${mo.perf}/${mo.a11y}/${mo.bp}/${mo.seo} LCP ${mo.lcp}` : 'falhou'} · desktop ${r.desktop ? `${r.desktop.perf}/${r.desktop.a11y}/${r.desktop.bp}/${r.desktop.seo}` : 'falhou'}`,
  );
}
fechar();

const cel = (m) => (m ? `${m.perf} / ${m.a11y} / ${m.bp} / ${m.seo}` : 'falhou');
const md = [
  '# Lighthouse por rota (gerado)',
  '',
  `Gerado por \`scripts/audit-lighthouse.mjs\` em ${new Date().toISOString().slice(0, 10)} sobre \`dist/\` (${existsSync(join(DIST, 'index.html')) && readFileSync(join(DIST, 'index.html'), 'utf8').includes('data-preview-banner') ? 'build de PREVIEW' : 'build de produção'}), servido localmente com gzip e os cabeçalhos de \`_headers\`, Lighthouse 13 em Chromium local, uma rodada por rota e perfil (sem SITE_URL o build sai com noindex, e o SEO cai para ~60 por is-crawlable e canonical). Notas: Desempenho / Acessibilidade / Boas práticas / SEO.`,
  '',
  '| Rota | Mobile | LCP mobile | CLS | TBT | Desktop | LCP desktop |',
  '| --- | --- | --- | --- | --- | --- | --- |',
  ...linhas.map(
    (r) =>
      `| \`${r.rota}\` | ${cel(r.mobile)} | ${r.mobile ? `${r.mobile.lcp} ms` : '—'} | ${r.mobile ? r.mobile.cls.toFixed(3) : '—'} | ${r.mobile ? `${r.mobile.tbt} ms` : '—'} | ${cel(r.desktop)} | ${r.desktop ? `${r.desktop.lcp} ms` : '—'} |`,
  ),
  '',
  '## Peso por rota (mobile, carga inicial)',
  '',
  '| Rota | JS (arquivos, transferido) | JS inline (gzip) | Imagens | Vídeo na carga | Total | Vídeos só no clique (MP4) |',
  '| --- | --- | --- | --- | --- | --- | --- |',
  ...linhas.map(
    (r) =>
      `| \`${r.rota}\` | ${r.mobile ? kb(r.mobile.js) : '—'} | ${kb(r.jsInline)} | ${r.mobile ? kb(r.mobile.img) : '—'} | ${r.mobile ? kb(r.mobile.video) : '—'} | ${r.mobile ? kb(r.mobile.total) : '—'} | ${r.clique.n} vídeo(s), ${kb(r.clique.total)} |`,
  ),
  '',
  `SEO: auditorias reprovadas na home (mobile): ${linhas[0]?.mobile?.seoFalhas.join(', ') || 'nenhuma'}.`,
  '',
  abaixo.length
    ? `## Abaixo da meta (${abaixo.length})\n\n${abaixo.map((x) => `- ${x}`).join('\n')}`
    : '**Todas as rotas na meta de Desempenho, Acessibilidade e Boas práticas.**',
  '',
].join('\n');
writeFileSync(join(saida, 'lighthouse.md'), md);
console.log(
  abaixo.length
    ? `audit-lighthouse: ${abaixo.length} medição(ões) abaixo da meta`
    : '✓ audit-lighthouse: tudo na meta',
);
