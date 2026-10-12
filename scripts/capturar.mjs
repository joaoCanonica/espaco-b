// Capturas de tela: sobe `astro preview`, abre cada rota no Chromium (Playwright)
// em 390 e 1440 px, tema claro e escuro, com prefers-reduced-motion: reduce.
// Uso: pnpm capturar [/rota ...]   (padrão: "/")
// Saída: docs/capturas/<AAAA-MM-DD>/*.png + indice.md (só o índice vai para o git).
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const rotas = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];
const larguras = [
  { largura: 390, altura: 844 },
  { largura: 1440, altura: 900 },
];
const temas = ['light', 'dark'];

const data = new Date().toISOString().slice(0, 10);
const destino = join(raiz, 'docs', 'capturas', data);
mkdirSync(destino, { recursive: true });

function portaLivre() {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, '127.0.0.1', () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

function rodar(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { cwd: raiz, stdio: 'inherit' });
    p.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} saiu com ${code}`))));
  });
}

async function esperar(url, ms = 30000) {
  const fim = Date.now() + ms;
  while (Date.now() < fim) {
    try {
      const r = await fetch(url);
      if (r.ok || r.status === 404) return;
    } catch {
      // ainda subindo
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`preview não respondeu em ${ms} ms: ${url}`);
}

// Chromium do Playwright; se a revisão esperada não estiver instalada,
// usa a pré-instalada em PLAYWRIGHT_BROWSERS_PATH (ou CHROMIUM_PATH).
async function abrirNavegador() {
  try {
    return await chromium.launch();
  } catch (erro) {
    const candidatos = [];
    if (process.env.CHROMIUM_PATH) candidatos.push(process.env.CHROMIUM_PATH);
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
    if (existsSync(base)) {
      for (const d of readdirSync(base)
        .filter((n) => /^chromium-\d+$/.test(n))
        .sort()
        .reverse()) {
        candidatos.push(join(base, d, 'chrome-linux', 'chrome'));
      }
    }
    const executavel = candidatos.find((c) => existsSync(c));
    if (!executavel) throw erro;
    console.warn(`capturar: usando Chromium em ${executavel}`);
    return chromium.launch({ executablePath: executavel });
  }
}

const bin = join(raiz, 'node_modules', '.bin', 'astro');
if (!existsSync(join(raiz, 'dist'))) await rodar(bin, ['build']);

const porta = await portaLivre();
const base = `http://127.0.0.1:${porta}`;
const preview = spawn(
  bin,
  ['preview', '--ignore-lock', '--host', '127.0.0.1', '--port', String(porta)],
  {
    cwd: raiz,
    stdio: ['ignore', 'ignore', 'inherit'],
    detached: true, // grupo próprio: o kill alcança o node por trás do wrapper .bin
  },
);

const arquivos = [];
let navegador;
try {
  await esperar(base + '/');
  navegador = await abrirNavegador();
  for (const tema of temas) {
    for (const { largura, altura } of larguras) {
      const ctx = await navegador.newContext({
        viewport: { width: largura, height: altura },
        deviceScaleFactor: 1,
        colorScheme: tema,
        reducedMotion: 'reduce',
      });
      await ctx.addInitScript((t) => {
        document.documentElement.setAttribute('data-theme', t);
      }, tema);
      const pagina = await ctx.newPage();
      for (const rota of rotas) {
        const resp = await pagina.goto(base + rota, { waitUntil: 'networkidle' });
        await pagina.evaluate((t) => document.documentElement.setAttribute('data-theme', t), tema);
        const nomeRota = rota === '/' ? 'home' : rota.replace(/^\/|\/$/g, '').replace(/\//g, '_');
        const nome = `${nomeRota}-${largura}-${tema}.png`;
        await pagina.screenshot({ path: join(destino, nome), fullPage: true });
        arquivos.push({ rota, largura, tema, nome, status: resp?.status() ?? 0 });
        console.log(`✓ ${rota} ${largura}px ${tema} → ${nome}`);
      }
      await ctx.close();
    }
  }
} finally {
  await navegador?.close();
  try {
    process.kill(-preview.pid, 'SIGTERM');
  } catch {
    preview.kill();
  }
}

const linhas = [
  `# Capturas — ${data}`,
  '',
  'Geradas por `pnpm capturar` (prefers-reduced-motion: reduce). Os PNG ficam fora do git.',
  '',
  '| Rota | Largura | Tema | HTTP | Arquivo |',
  '| --- | --- | --- | --- | --- |',
  ...arquivos.map((a) => `| ${a.rota} | ${a.largura} | ${a.tema} | ${a.status} | ${a.nome} |`),
  '',
];
writeFileSync(join(destino, 'indice.md'), linhas.join('\n'));
console.log(`${arquivos.length} capturas em ${destino}`);
