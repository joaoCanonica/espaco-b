# Performance

## Home (entrada + hero) — sessão 4, 13/10/2026

Lighthouse 13.5.0 (devDependency fixada), perfil **mobile padrão**: Moto G emulado, 4G lento simulado, CPU 4×. Build de produção (`pnpm build`) servido por `astro preview`, Chromium 141 (Playwright 1194). Cinco rodadas, primeira visita da sessão, **com a entrada rodando** (perfil limpo, sessionStorage vazio).

| Métrica        | Mediana (5 rodadas) | Meta    | Situação                                                                                        |
| -------------- | ------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| LCP            | **1,88 s**          | < 2,0 s | ok                                                                                              |
| FCP            | 1,51 s              | —       | —                                                                                               |
| CLS            | **0,0002**          | ≈ 0     | ok (troca da fonte itálica em "um projeto só.")                                                 |
| TBT            | **0 ms**            | —       | ok                                                                                              |
| Speed Index    | 3,39 s              | —       | inclui os ~3 s da entrada (esperado)                                                            |
| Performance    | 98                  | ≥ 95    | ok                                                                                              |
| Acessibilidade | 100 (5/5)           | 100     | ok                                                                                              |
| Boas práticas  | 100                 | ≥ 95    | ok                                                                                              |
| SEO            | 63                  | ≥ 95    | **esperado agora**: `noindex` (preview, sem SITE_URL). Sobe quando o domínio existir (sessão 8) |

- **Elemento do LCP:** o retrato `bia-retrato-colete-800.avif` (11 KB, `fetchpriority="high"`, `loading="eager"`, largura/altura declaradas), dentro da janela em "D". A entrada não atrasa o LCP: o hero é pintado por baixo da camada musgo desde o primeiro quadro, e a camada só usa transform e opacity.
- **JS da home:** nenhum arquivo `.js`; 6 scripts inline (tema, entrada, header, seletor) somando 2,4 KB, **0,98 KB gzip**. O orçamento é 35 KB.
- **CSS:** 9,8 KB (3,1 KB gzip) externo, mais as cores inline no `<head>`. **HTML:** 24,8 KB (6,7 KB gzip).
- **Fontes:** a display tem preload (55 KB); a itálica (61 KB) e a Albert Sans (31 KB) entram por `font-display: swap`. O CLS de 0,0002 é essa troca. Dar preload à itálica custaria 61 KB a mais no caminho crítico, para um ganho desprezível.
- **Correção feita durante a medição:** a acessibilidade dava 95 numa rodada porque o axe media o botão "Pular" no meio do fade de saída (contraste 1,68–3,89). O botão saiu do contêiner que faz fade e tem fundo opaco próprio. Resultado: 5/5 rodadas com 100.

### Entrada (medida no Chromium, Playwright)

| Viewport   | Entrada invisível em |
| ---------- | -------------------- |
| 390 × 844  | 2,93 s               |
| 1440 × 900 | 3,01 s               |

- Meta ≤ 3,5 s: ok. A rede de segurança remove a entrada aos 5 s.
- "Pular" testado por mouse, toque (`tap`), teclado (Tab até "Pular a abertura" + Enter) e Esc: a entrada sai em menos de 80 ms e o foco vai para o `<main>`.
- Não repete na mesma sessão. Não aparece com `prefers-reduced-motion` nem sem JS.
- O h1 está no DOM e acessível desde o primeiro quadro.
- Console sem erros e sem avisos.

Capturas: `docs/capturas/entrada/` (0, 0,8, 1,6 e 2,6 s em 390 e 1440 px, mais o estado final, reduced-motion e sem JS).
