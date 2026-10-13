# Auditoria final — sessão 9 (13/10/2026)

Tudo rodado neste ambiente sobre `dist/`. Os arquivos ao lado são as saídas completas.

| Auditoria             | Comando                                     | Build                             | Resultado                                                                                                                                          | Saída                                               |
| --------------------- | ------------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Config (preview)      | `pnpm validate-config`                      | —                                 | 50 pendências · **0 bloqueantes** · 44 avisos · 6 info                                                                                             | `validate-config.txt`                               |
| Config (produção)     | `NODE_ENV=production pnpm validate-config`  | —                                 | 0 bloqueantes, saída 0                                                                                                                             | `validate-config-producao.txt`                      |
| Travas                | `pnpm test-config`                          | —                                 | tudo verde                                                                                                                                         | `test-config.txt`                                   |
| Compliance (produção) | `NODE_ENV=production pnpm audit-compliance` | produção                          | **0 bloqueios** · 78 avisos (termos regulados)                                                                                                     | `audit-compliance-producao.txt`, `../COMPLIANCE.md` |
| Acessibilidade        | `pnpm audit-a11y`                           | preview                           | 15 rotas (inclui a 404) × 390/1440 × claro/escuro: **0 violações axe**; teclado, foco visível e Esc ok; estrutura ok; sem JS ok; reduced-motion ok | `a11y.md`, `audit-a11y.txt`, `aria/`                |
| Lighthouse            | `pnpm audit-lighthouse`                     | produção (sem SITE_URL → noindex) | Mobile Perf 96–100, A11y 100, BP 100; Desktop 99–100/100/100; SEO 58–61 (noindex, esperado)                                                        | `lighthouse.md`                                     |
| SEO                   | `pnpm audit-seo`                            | produção                          | verde; 2 avisos (GEO no Lipocrio; sitemap com domínio `.invalid` sem SITE_URL)                                                                     | `audit-seo.txt`                                     |
| Contraste             | `pnpm audit-contraste`                      | —                                 | 36 pares, 0 falhas (AA, claro e escuro)                                                                                                            | `audit-contraste.txt`                               |
| Links                 | `pnpm verificar-links`                      | produção                          | 16 páginas, 618 links internos, 0 quebrados                                                                                                        | `verificar-links.txt`                               |
| Privacidade e CSP     | `pnpm testar-privacidade`                   | preview                           | todos os itens ok (zero terceiros antes do aceite; CSP sem violações; revogação tira o mapa)                                                       | `testar-privacidade.txt`                            |
| Manifesto de mídia    | `pnpm media:validar`                        | —                                 | 0 erros, 5 avisos (trechos a verificar; termo não arquivado)                                                                                       | `media-validar.txt`                                 |
| Tipos, lint, formato  | `pnpm check`                                | —                                 | 0 erros, 0 avisos                                                                                                                                  | `check.txt`                                         |

## Bugs corrigidos nesta passada

- `audit-lighthouse` travava: o `spawnSync` bloqueava o servidor que roda no mesmo processo. Trocado por spawn assíncrono, com nova tentativa quando o Lighthouse não dá nota (NO_NAVSTART).
- O servidor de auditoria não comprimia. Agora usa gzip, como o host: o LCP mobile da home caiu de 2,63 s para 2,18 s na medição (o site não mudou).
- `testar-privacidade` contava o iframe antes do evento `close` do `<dialog>` (assíncrono). Agora espera até 2 s; o site estava certo.
- axe `landmark-unique` em /corpo-e-emagrecimento: o VideoCorpo ganhou um aria-label próprio.

## Fora da meta (relatado, não corrigido)

- **LCP mobile > 2,0 s** em `/` (2,18 s), `/corpo-e-emagrecimento/` (2,11 s) e `/protocolos-bia/` (2,03 s). Nas outras 11 rotas, LCP < 2,0 s. A nota de Performance segue ≥ 96. Caminho: CSS crítico inline (economia estimada pelo Lighthouse: até ~860 ms de recursos bloqueantes sem compressão; com gzip, bem menos). Ver MELHORIAS.md.
- **Leitor de tela real** (VoiceOver/TalkBack) [NÃO VERIFICADO]: testar na URL do preview.
- **Lighthouse na URL da Vercel** [NÃO VERIFICADO]: a proteção de deploy pede login. Medir com `npx lighthouse <url>` depois de liberar o acesso.
