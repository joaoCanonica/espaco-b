// Teste de privacidade e CSP sobre dist/ (rode depois do build).
// Sobe um servidor estático que aplica public/_headers, abre cada rota no Chromium (Playwright)
// com armazenamento limpo e verifica:
//  1. antes do aceite: zero requisições fora da origem; banner visível; nenhum iframe;
//  2. CSP: nenhuma violação (evento securitypolicyviolation + console);
//  3. Aceitar / Recusar / Personalizar: mesmo tamanho e mesmo estilo;
//  4. Recusar: nada de terceiros; tema não é gravado;
//  5. Aceitar: o mapa (Google) carrega em /contato; rastreio local registra clique;
//  6. Revogação pelo rodapé: o mapa sai, o estado muda;
//  7. Sem localStorage (acesso lança erro): o banner funciona e o site não quebra.
// Saída: docs/capturas/<data>/privacidade/requests.md + capturas do banner.
// Uso: node scripts/testar-privacidade.mjs [--sem-capturas]
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(raiz, 'dist');
const data = new Date().toISOString().slice(0, 10);
const saida = join(raiz, 'docs', 'capturas', data, 'privacidade');
mkdirSync(saida, { recursive: true });
const capturas = !process.argv.includes('--sem-capturas');

// _headers: só o bloco "/*" (o único que o site usa).
const cabecalhos = {};
if (existsSync(join(dist, '_headers'))) {
  let dentro = false;
  for (const l of readFileSync(join(dist, '_headers'), 'utf8').split('\n')) {
    if (/^\S/.test(l) && !l.startsWith('#')) dentro = l.trim() === '/*';
    else if (dentro && /^\s+\S+:/.test(l)) {
      const [k, ...v] = l.trim().split(':');
      cabecalhos[k] = v.join(':').trim();
    }
  }
}
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.json': 'application/json',
  '.png': 'image/png',
};
const servidor = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  let arq = join(dist, p);
  if (!existsSync(arq) && existsSync(join(arq, 'index.html'))) arq = join(arq, 'index.html');
  let status = 200;
  if (!existsSync(arq) || statSync(arq).isDirectory()) {
    arq = join(dist, '404.html');
    status = 404;
  }
  res.writeHead(status, {
    ...cabecalhos,
    'Content-Type': TIPOS[extname(arq)] ?? 'application/octet-stream',
  });
  res.end(readFileSync(arq));
});
await new Promise((r) => servidor.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${servidor.address().port}`;

async function navegador() {
  try {
    return await chromium.launch();
  } catch {
    const b = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
    const d = readdirSync(b)
      .filter((n) => /^chromium-\d+$/.test(n))
      .sort()
      .reverse()[0];
    return chromium.launch({ executablePath: join(b, d, 'chrome-linux', 'chrome') });
  }
}
const b = await navegador();
const falhas = [];
const ok = (cond, msg) => {
  console.log(`${cond ? '✓' : '✗'} ${msg}`);
  if (!cond) falhas.push(msg);
};

const VIGIA_CSP = () => {
  window.__csp = [];
  document.addEventListener('securitypolicyviolation', (e) =>
    window.__csp.push(
      `${e.violatedDirective} ← ${e.blockedURI || 'inline'} (${e.sourceFile}:${e.lineNumber})`,
    ),
  );
};
async function contexto(opcoes = {}) {
  const ctx = await b.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
    ...opcoes,
  });
  await ctx.addInitScript(VIGIA_CSP);
  // Saídas externas por clique (wa.me, Google) não são seguidas no teste; a tentativa fica registrada.
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  return ctx;
}
async function abrir(ctx, rota) {
  const p = await ctx.newPage();
  const reqs = [];
  const consola = [];
  p.on('request', (r) => reqs.push(r.url()));
  p.on(
    'console',
    (m) => /Content.Security.Policy|Refused to/i.test(m.text()) && consola.push(m.text()),
  );
  await p.goto(base + rota, { waitUntil: 'networkidle' });
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });
  await p.waitForLoadState('networkidle');
  return { p, reqs, consola };
}
const externas = (reqs) => reqs.filter((u) => !u.startsWith(base) && !u.startsWith('data:'));

const ROTAS = [
  '/',
  '/harmonizacao-facial/',
  '/corpo-e-emagrecimento/',
  '/pele-e-tecnologia/',
  '/protocolos-bia/',
  '/protocolos-bia/bialifting/',
  '/bia/',
  '/espaco/',
  '/casos/',
  '/contato/',
  '/privacidade/',
  '/avaliar/',
  '/nao-existe/',
];
const linhas = ['| Rota | Requisições | Externas | Violações CSP |', '| --- | --- | --- | --- |'];
const detalhe = [];

// 1 e 2. Antes do aceite, em todas as rotas.
for (const rota of ROTAS) {
  const ctx = await contexto();
  const { p, reqs, consola } = await abrir(ctx, rota);
  const ext = externas(reqs);
  const csp = [...(await p.evaluate(() => window.__csp)), ...consola];
  const banner = await p.isVisible('[data-consentimento]');
  const iframes = await p.locator('iframe').count();
  ok(
    ext.length === 0,
    `${rota}: zero requisições externas antes do aceite (${reqs.length} no total)`,
  );
  ok(csp.length === 0, `${rota}: CSP sem violações${csp.length ? `: ${csp.join(' | ')}` : ''}`);
  ok(banner && iframes === 0, `${rota}: banner visível e nenhum iframe`);
  linhas.push(`| \`${rota}\` | ${reqs.length} | ${ext.length} | ${csp.length} |`);
  detalhe.push(`### ${rota}`, '', ...reqs.map((u) => `- ${u.replace(base, '')}`), '');
  await ctx.close();
}

// 3. Peso visual dos três botões, nas duas larguras e nos dois temas.
for (const [w, h] of [
  [390, 844],
  [1440, 900],
]) {
  for (const tema of ['light', 'dark']) {
    const ctx = await contexto({ viewport: { width: w, height: h }, colorScheme: tema });
    await ctx.addInitScript((t) => document.documentElement.setAttribute('data-theme', t), tema);
    const { p } = await abrir(ctx, '/contato/');
    await p.evaluate(() => scrollTo(0, 0));
    const medidas = await p.$$eval('[data-consentimento] [data-acao]', (bs) =>
      bs.map((x) => {
        const r = x.getBoundingClientRect();
        const s = getComputedStyle(x);
        return {
          t: x.textContent.trim(),
          w: Math.round(r.width),
          h: Math.round(r.height),
          estilo: [
            s.backgroundColor,
            s.color,
            s.borderColor,
            s.borderWidth,
            s.fontWeight,
            s.fontSize,
          ].join(','),
        };
      }),
    );
    const iguais = medidas.every(
      (m) => m.w === medidas[0].w && m.h === medidas[0].h && m.estilo === medidas[0].estilo,
    );
    ok(
      medidas.length === 3 && iguais,
      `${w}px ${tema}: Aceitar/Recusar/Personalizar com o mesmo tamanho e estilo (${medidas.map((m) => `${m.t} ${m.w}×${m.h}`).join(', ')})`,
    );
    if (capturas) {
      await p.screenshot({ path: join(saida, `banner-${w}-${tema}.png`) });
      await p.click('[data-consentimento] [data-acao="personalizar"]');
      await p.screenshot({ path: join(saida, `painel-${w}-${tema}.png`) });
    }
    await ctx.close();
  }
}

// 4. Recusar.
{
  const ctx = await contexto();
  const { p, reqs } = await abrir(ctx, '/contato/');
  await p.click('[data-consentimento] [data-acao="recusar"]');
  const estado = await p.evaluate(() =>
    JSON.parse(localStorage.getItem('espacob-consentimento') ?? 'null'),
  );
  ok(
    estado && !estado.preferencias && !estado.mapas && !estado.estatistica,
    'Recusar: grava tudo desligado',
  );
  ok(await p.isHidden('[data-consentimento]'), 'Recusar: banner some');
  await p.click('[data-seletor-tema]');
  ok(
    (await p.evaluate(() => localStorage.getItem('tema'))) === null,
    'Recusar: o tema não é gravado no navegador',
  );
  await p.locator('[data-mapa]').scrollIntoViewIfNeeded();
  await p.waitForTimeout(500);
  ok(
    externas(reqs).length === 0 && (await p.locator('iframe').count()) === 0,
    'Recusar: nenhum mapa e nenhuma requisição externa',
  );
  await p.reload({ waitUntil: 'networkidle' });
  ok(await p.isHidden('[data-consentimento]'), 'Recusar: a escolha persiste na recarga');
  await ctx.close();
}

// 5 e 6. Aceitar, rastreio local e revogação pelo rodapé.
{
  const ctx = await contexto();
  const { p, reqs } = await abrir(ctx, '/contato/');
  ok(
    (await p.evaluate(() => window.espacoB?.eventos?.length ?? 0)) === 0,
    'Antes do aceite: nenhum evento de conversão registrado',
  );
  await p.click('[data-consentimento] [data-acao="aceitar"]');
  await p.waitForSelector('[data-mapa] iframe', { state: 'attached' });
  await p.waitForTimeout(800);
  const google = reqs.filter((u) => u.startsWith('https://www.google.com/maps'));
  ok(
    google.length > 0,
    `Aceitar: o mapa do Google é pedido só agora (${google[0]?.slice(0, 70)}…)`,
  );
  const [aba] = await Promise.all([
    ctx.waitForEvent('page').catch(() => null),
    p.click('.ct-ab__acoes a[href^="https://wa.me/"]'),
  ]);
  await aba?.close();
  const ev = await p.evaluate(() => window.espacoB?.eventos ?? []);
  ok(
    ev.length === 1 && ev[0].tipo === 'whatsapp',
    'Aceitar: clique no WhatsApp entra só na fila local de estatística',
  );
  await p.click('footer [data-abrir-consentimento]');
  ok(
    await p.isVisible('[data-consentimento-painel]'),
    'Revogação: o link do rodapé abre as preferências',
  );
  await p.uncheck('[data-consentimento-painel] input[name="mapas"]');
  await p.click('[data-consentimento-painel] [data-acao="salvar"]');
  // o evento "close" do <dialog> chega numa tarefa seguinte: espera (até 2 s) em vez de contar na hora
  const saiu = await p
    .waitForSelector('[data-mapa] iframe', { state: 'detached', timeout: 2000 })
    .then(() => true)
    .catch(() => false);
  ok(saiu, 'Revogação: o mapa sai da página');
  const estado = await p.evaluate(() => JSON.parse(localStorage.getItem('espacob-consentimento')));
  ok(
    estado.mapas === false && estado.preferencias === true,
    'Revogação: só a categoria desmarcada muda',
  );
  const csp = await p.evaluate(() => window.__csp);
  ok(
    csp.length === 0,
    `Com o mapa carregado: CSP sem violações${csp.length ? `: ${csp.join(' | ')}` : ''}`,
  );
  await ctx.close();
}

// Personalizar: nada pré-marcado.
{
  const ctx = await contexto();
  const { p } = await abrir(ctx, '/');
  await p.evaluate(() => scrollTo(0, 0));
  await p.click('[data-consentimento] [data-acao="personalizar"]');
  const marcadas = await p.$$eval(
    '[data-consentimento-painel] input[name]',
    (xs) => xs.filter((x) => x.checked).length,
  );
  ok(marcadas === 0, 'Personalizar: nenhuma categoria opcional vem marcada');
  await p.keyboard.press('Escape');
  ok(await p.isVisible('[data-consentimento]'), 'Personalizar + Esc: nada muda, o banner continua');
  await ctx.close();
}

// 7. Sem localStorage.
{
  const ctx = await contexto();
  await ctx.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new Error('bloqueado');
      },
    });
  });
  const erros = [];
  const { p } = await abrir(ctx, '/contato/');
  p.on('pageerror', (e) => erros.push(e.message));
  ok(await p.isVisible('[data-consentimento]'), 'Sem localStorage: o banner aparece');
  await p.click('[data-consentimento] [data-acao="aceitar"]');
  ok(
    await p.isHidden('[data-consentimento]'),
    'Sem localStorage: aceitar funciona (vale nesta visita)',
  );
  await p.waitForSelector('[data-mapa] iframe', { state: 'attached' });
  ok(erros.length === 0, 'Sem localStorage: nenhum erro de script');
  await ctx.close();
}

await b.close();
servidor.close();
writeFileSync(
  join(saida, 'requests.md'),
  [
    `# Requisições antes do aceite (${data})`,
    '',
    'Gerado por `scripts/testar-privacidade.mjs`: navegador limpo, rolagem até o fim de cada página, sem clicar no banner. Servidor estático local com os cabeçalhos de `public/_headers`.',
    '',
    ...linhas,
    '',
    `Resultado: ${falhas.length ? `${falhas.length} falha(s)` : 'todas as verificações passaram'}.`,
    '',
    '## Lista completa',
    '',
    ...detalhe,
  ].join('\n'),
);
console.log(falhas.length ? `\n✗ ${falhas.length} falha(s)` : '\n✓ privacidade e CSP: tudo verde');
process.exit(falhas.length ? 1 : 0);
