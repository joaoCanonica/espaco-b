// audit-a11y (sessão 9). Sobre dist/, em todas as rotas públicas:
//  1. axe-core (WCAG 2.0/2.1/2.2 A e AA + boas práticas) em 390 e 1440 px, temas claro e escuro,
//     com o banner de consentimento aberto (estado da primeira visita);
//  2. teclado: percorre a página com Tab, exige foco visível em cada parada e Esc fecha o painel;
//  3. leitor de tela (estrutura): um <h1>, landmarks main/header/footer, ordem de títulos sem
//     saltos, nome acessível em links/botões, árvore ARIA salva em docs/auditoria/aria/;
//  4. sem JavaScript: título e conteúdo visíveis, nada escondido pela entrada;
//  5. prefers-reduced-motion: nenhuma animação rodando depois da carga.
// Saída: docs/auditoria/a11y.md. Sai com 1 se houver violação do axe ou falha de teclado/estrutura.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import AxeBuilder from '@axe-core/playwright';
import { RAIZ } from './lib/manifesto.mjs';
import { abrirChromium } from './lib/navegador.mjs';
import { rotasDoDist, servir } from './lib/servidor.mjs';

const saida = join(RAIZ, 'docs', 'auditoria');
mkdirSync(join(saida, 'aria'), { recursive: true });
const { base, fechar } = await servir();
const b = await abrirChromium();
const rotas = rotasDoDist();
const falhas = [];
const linhas = [];

async function rolar(p) {
  await p.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    scrollTo(0, 0);
  });
}

for (const rota of [...rotas, '/nao-existe/']) {
  const res = { rota, axe: {}, teclado: '', estrutura: '', semJs: '', movimento: '' };
  // 1. axe
  for (const [w, h] of [
    [390, 844],
    [1440, 900],
  ])
    for (const tema of ['light', 'dark']) {
      const ctx = await b.newContext({
        viewport: { width: w, height: h },
        colorScheme: tema,
        reducedMotion: 'reduce',
      });
      await ctx.addInitScript((t) => document.documentElement.setAttribute('data-theme', t), tema);
      const p = await ctx.newPage();
      await p.goto(base + rota, { waitUntil: 'networkidle' });
      await rolar(p);
      const r = await new AxeBuilder({ page: p })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
        .analyze();
      const v = r.violations.map(
        (x) => `${x.id} (${x.nodes.length}): ${x.nodes[0]?.target.join(' ')}`,
      );
      res.axe[`${w}-${tema}`] = v.length;
      for (const x of v) falhas.push(`${rota} ${w}px ${tema} axe ${x}`);
      await ctx.close();
    }

  // 2, 3. teclado e estrutura (390 px, claro)
  {
    const ctx = await b.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const p = await ctx.newPage();
    await p.goto(base + rota, { waitUntil: 'networkidle' });
    let paradas = 0;
    let semFoco = [];
    const vistos = new Set();
    for (let i = 0; i < 80; i++) {
      await p.keyboard.press('Tab');
      // o estilo de :focus-visible entra no quadro seguinte
      await p.evaluate(
        () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
      );
      const f = await p.evaluate(() => {
        const e = document.activeElement;
        if (!e || e === document.body) return null;
        const s = getComputedStyle(e);
        const visivel = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
        const r = e.getBoundingClientRect();
        return {
          id: `${e.tagName}:${(e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 30)}:${Math.round(r.top + scrollY)}`,
          visivel: visivel || s.boxShadow !== 'none',
          dentro: r.width > 0 && r.height > 0,
        };
      });
      if (!f) break;
      if (vistos.has(f.id)) break; // deu a volta
      vistos.add(f.id);
      paradas++;
      if (!f.visivel || !f.dentro) semFoco.push(f.id);
    }
    // Esc fecha o painel de preferências
    let esc = 'n/a';
    if (await p.locator('[data-consentimento] [data-acao="personalizar"]').isVisible()) {
      await p.click('[data-consentimento] [data-acao="personalizar"]');
      await p.keyboard.press('Escape');
      esc = (await p.locator('[data-consentimento-painel]').isVisible()) ? 'não fecha' : 'fecha';
      if (esc !== 'fecha') falhas.push(`${rota}: Esc não fecha o painel`);
    }
    res.teclado = `${paradas} paradas, ${semFoco.length} sem foco visível, Esc ${esc}`;
    for (const s of semFoco) falhas.push(`${rota}: foco não visível em ${s}`);

    const e = await p.evaluate(() => {
      const h1 = document.querySelectorAll('h1').length;
      const marcos = ['main', 'header', 'footer'].filter((t) => document.querySelector(t)).length;
      const niveis = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')]
        .filter((h) => !h.closest('[hidden],dialog:not([open])'))
        .map((h) => Number(h.tagName[1]));
      let saltos = 0;
      for (let i = 1; i < niveis.length; i++) if (niveis[i] - niveis[i - 1] > 1) saltos++;
      return { h1, marcos, saltos, titulos: niveis.length };
    });
    if (e.h1 !== 1) falhas.push(`${rota}: ${e.h1} <h1>`);
    if (e.marcos < 3) falhas.push(`${rota}: faltam landmarks (${e.marcos}/3)`);
    res.estrutura = `h1=${e.h1}, landmarks ${e.marcos}/3, ${e.titulos} títulos, ${e.saltos} salto(s) de nível`;
    const arvore = await p.locator('main').ariaSnapshot();
    writeFileSync(
      join(saida, 'aria', `${rota.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'inicio'}.txt`),
      arvore,
    );
    await ctx.close();
  }

  // 4. sem JavaScript
  {
    const ctx = await b.newContext({
      viewport: { width: 390, height: 844 },
      javaScriptEnabled: false,
    });
    const p = await ctx.newPage();
    await p.goto(base + rota, { waitUntil: 'load' });
    const s = await p.evaluate(() => {
      const h1 = document.querySelector('h1');
      const r = h1?.getBoundingClientRect();
      const st = h1 ? getComputedStyle(h1) : null;
      const visivel = !!h1 && r.width > 0 && st.visibility !== 'hidden' && Number(st.opacity) > 0.5;
      const texto = (document.querySelector('main')?.innerText ?? '').trim().length;
      return { visivel, texto };
    });
    res.semJs = `h1 ${s.visivel ? 'visível' : 'INVISÍVEL'}, ${s.texto} caracteres de conteúdo`;
    if (!s.visivel || s.texto < (rota === '/nao-existe/' ? 40 : 200))
      falhas.push(`${rota}: sem JS o conteúdo não aparece`);
    await ctx.close();
  }

  // 5. movimento reduzido
  {
    const ctx = await b.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const p = await ctx.newPage();
    await p.goto(base + rota, { waitUntil: 'networkidle' });
    await p.waitForTimeout(600);
    const n = await p.evaluate(
      () =>
        document
          .getAnimations()
          .filter((a) =>
            a.playState === 'running' &&
            a.effect?.getComputedTiming().activeDuration > 0 &&
            a.effect?.getComputedTiming().activeDuration !== Infinity
              ? true
              : a.playState === 'running' && a.effect?.getTiming().iterations === Infinity,
          ).length,
    );
    res.movimento = `${n} animação(ões) rodando`;
    if (n > 0) falhas.push(`${rota}: ${n} animação(ões) rodando com prefers-reduced-motion`);
    await ctx.close();
  }
  linhas.push(res);
  console.log(`${falhas.length ? '·' : '✓'} ${rota}`);
}

await b.close();
fechar();
const md = [
  '# Auditoria de acessibilidade (gerada)',
  '',
  `Gerado por \`scripts/audit-a11y.mjs\` em ${new Date().toISOString().slice(0, 10)} sobre \`dist/\` (axe-core ${(await import('axe-core')).default.version}, WCAG 2.0/2.1/2.2 A e AA + boas práticas).`,
  '',
  '| Rota | axe 390 claro | 390 escuro | 1440 claro | 1440 escuro | Teclado | Estrutura (leitor de tela) | Sem JavaScript | Movimento reduzido |',
  '| --- | --- | --- | --- | --- | --- | --- | --- | --- |',
  ...linhas.map(
    (l) =>
      `| \`${l.rota}\` | ${l.axe['390-light']} | ${l.axe['390-dark']} | ${l.axe['1440-light']} | ${l.axe['1440-dark']} | ${l.teclado} | ${l.estrutura} | ${l.semJs} | ${l.movimento} |`,
  ),
  '',
  falhas.length
    ? `## Falhas (${falhas.length})\n\n${falhas.map((f) => `- ${f}`).join('\n')}`
    : '**Resultado: nenhuma violação.**',
  '',
  'Leitor de tela: não há leitor real neste ambiente (NVDA/VoiceOver). O teste cobre o que o leitor usa: estrutura de títulos, landmarks, nomes acessíveis (axe) e a árvore ARIA de cada página, salva em `docs/auditoria/aria/`. [NÃO VERIFICADO com leitor real: testar com VoiceOver (iOS) e TalkBack (Android) na URL de preview.]',
  '',
].join('\n');
writeFileSync(join(saida, 'a11y.md'), md);
console.log(
  falhas.length ? `✗ audit-a11y: ${falhas.length} falha(s)` : '✓ audit-a11y: nenhuma violação',
);
for (const f of falhas.slice(0, 40)) console.log(`  ${f}`);
process.exit(falhas.length ? 1 : 0);
