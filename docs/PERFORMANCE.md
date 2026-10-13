# Performance

## /bia, /espaco, /casos, /contato e 404 — sessão 6C, 13/10/2026

Lighthouse 13.5.0 mobile padrão, build de produção, uma rodada por página. A 404 foi medida em `/404.html`, porque com status 404 o Lighthouse não roda.

| Página    | Perf. | Acess. | Boas prát. | SEO | LCP      | CLS | TBT  | Peso    |
| --------- | ----- | ------ | ---------- | --- | -------- | --- | ---- | ------- |
| /bia/     | 99    | 100    | 100        | 63  | 1.810 ms | 0   | 0 ms | 169 KiB |
| /espaco/  | 100   | 100    | 100        | 63  | 1.729 ms | 0   | 0 ms | 155 KiB |
| /casos/   | 100   | 100    | 100        | 63  | 1.806 ms | 0   | 0 ms | 152 KiB |
| /contato/ | 99    | 100    | 100        | 60  | 1.656 ms | 0   | 0 ms | 156 KiB |
| 404       | 100   | 100    | 100        | 50  | 1.505 ms | 0   | 0 ms | 93 KiB  |

- **SEO:** a auditoria reprovada é `is-crawlable` (o `noindex` proposital). A 404 também é `noindex` e não tem descrição, de propósito.

## Páginas de serviço e protocolos — sessão 6B, 13/10/2026

Lighthouse 13.5.0 mobile padrão, build de produção, `astro preview`, uma rodada por página.

| Página                           | Perf. | Acess. | Boas prát. | SEO | LCP      | CLS | TBT  | Peso    |
| -------------------------------- | ----- | ------ | ---------- | --- | -------- | --- | ---- | ------- |
| /harmonizacao-facial/            | 98    | 100    | 100        | 60  | 1.961 ms | 0   | 0 ms | 171 KiB |
| /corpo-e-emagrecimento/          | 98    | 100    | 100        | 63  | 1.958 ms | 0   | 0 ms | 168 KiB |
| /pele-e-tecnologia/              | 98    | 100    | 100        | 60  | 1.958 ms | 0   | 0 ms | 169 KiB |
| /protocolos-bia/                 | 99    | 100    | 100        | 60  | 1.962 ms | 0   | 0 ms | 179 KiB |
| /protocolos-bia/bialifting/      | 100   | 100    | 100        | 60  | 1.654 ms | 0   | 0 ms | 109 KiB |
| /protocolos-bia/bialips/         | 100   | 100    | 100        | 60  | 1.506 ms | 0   | 0 ms | 103 KiB |
| /protocolos-bia/lipocrio-da-bia/ | 100   | 100    | 100        | 60  | 1.506 ms | 0   | 0 ms | 103 KiB |

- **SEO:** a única auditoria reprovada é `is-crawlable` (o `noindex` proposital, sem SITE_URL). A variação entre 60 e 63 vem de quais auditorias se aplicam a cada página.
- **Vídeo do corpo:** fica fora da primeira dobra e só baixa no clique. O pôster é um `<img>` lazy.
- **View Transitions entre documentos:** é CSS puro (`@view-transition`), sob `@supports` e `prefers-reduced-motion: no-preference`. A navegação funciona igual sem ele. A home não tem a regra, então a transição só acontece entre as páginas de serviço.

## Home completa (entrada + hero + seções 2–9) — sessão 6A, 13/10/2026

Lighthouse 13.5.0 mobile padrão, build de produção (`MEDIA_SKIP=1 pnpm build`), `astro preview`, Chromium 141, três rodadas.

| Métrica             | Rodadas                  | Orçamento                                                              |
| ------------------- | ------------------------ | ---------------------------------------------------------------------- |
| Performance         | 97 · 97 · 97             | ≥ 95 ✓                                                                 |
| Acessibilidade      | 100 · 100 · 100          | 100 ✓                                                                  |
| Boas práticas       | 100 · 100 · 100          | ≥ 95 ✓                                                                 |
| SEO                 | 63 · 63 · 63             | ≥ 95 ✗: `noindex` proposital (sem SITE_URL); sai quando houver domínio |
| FCP                 | 1,7 s                    | —                                                                      |
| LCP                 | 2.036 · 2.042 · 2.032 ms | < 2,0 s ✗ (32–42 ms acima; na sessão 4 era 1,88 s)                     |
| CLS                 | 0,0002                   | ≈ 0 ✓                                                                  |
| TBT                 | 0 ms                     | —                                                                      |
| Peso total na carga | 191 KiB                  | —                                                                      |
| JS da home (gzip)   | 1,2 KB (só inline)       | ≤ 35 KB ✓                                                              |
| HTML (gzip)         | 14,1 KB (77 KB bruto)    | —                                                                      |
| CSS (gzip)          | 4,4 KB + 3,2 KB          | —                                                                      |

- **Pôsteres de vídeo** passaram do atributo `poster` para um `<img loading="lazy">` dentro da Janela. Com o atributo, os 10 pôsteres (≈ 360 KB) baixavam junto com o retrato do LCP: Performance 93, LCP 2,9 s. Com o `<img>` lazy: 97 e 2,0 s.
- **Vídeo** só baixa no clique (`preload="none"`). Conferido: nenhum `.mp4`/`.webm` na carga; só o `.webm` do vídeo clicado.
- **O que ainda pesa no LCP**: HTML maior (19 `clipPath` e 26 SVGs inline) e dois CSS bloqueantes. Caminho para voltar abaixo de 2,0 s: CSS inline (`build.inlineStylesheets`) e um único `<clipPath>` por forma na página. Isso fica para a sessão 8 (fora do escopo da 6A).

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
