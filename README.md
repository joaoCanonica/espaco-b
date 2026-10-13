# Espaço B — site

Site estático da Clínica Espaço B (Lages/SC). Astro + TypeScript strict, sem backend.

## Contexto

Leia antes de mexer: [`CLAUDE.md`](CLAUDE.md) (cópia em [`docs/CONTEXTO.md`](docs/CONTEXTO.md)).
Direção: [`docs/ESPACO_B_LEITURA_E_DIRECAO.md`](docs/ESPACO_B_LEITURA_E_DIRECAO.md).
Prompts das sessões: [`docs/ESPACO_B_PACOTE_PROMPTS_CODE.md`](docs/ESPACO_B_PACOTE_PROMPTS_CODE.md).
Pendências: [`docs/PENDENCIAS.md`](docs/PENDENCIAS.md).

## Como rodar

Requer Node 24 LTS (`.nvmrc`) e pnpm na versão de `packageManager` (o Corepack ou o próprio pnpm baixam a versão certa).

```sh
pnpm install
pnpm dev        # desenvolvimento
pnpm build      # gera dist/
pnpm preview    # serve dist/
pnpm check      # astro check + ESLint + Prettier
pnpm capturar   # capturas 390/1440 px, claro/escuro → docs/capturas/<data>/ (rotas como argumento)
pnpm media:prepare     # derivados de mídia em public/media/ (roda sozinho em predev/prebuild)
pnpm validate-config   # pendências da config → docs/PENDENCIAS.md
pnpm audit-compliance  # termos vetados/avisos no dist/ → docs/COMPLIANCE.md
pnpm test-config       # prova as travas de produção e o preview
```

`SITE_URL` (ver `.env.exemplo`) define o domínio. Sem ele, o site é preview e fica com noindex.

## Sessões

| #     | Sessão                                  |
| ----- | --------------------------------------- |
| 0     | Fundação (esta)                         |
| 1     | Ingestão e catálogo de mídia            |
| 2     | Config tipada, estados e travas         |
| 3     | Design system e marca                   |
| 4     | Entrada e hero                          |
| 5     | Pesquisa e textos                       |
| 6A–6C | Home, serviços, páginas internas        |
| 7     | Conversão e LGPD                        |
| 8     | SEO e GEO                               |
| 9     | QA, conferência de compliance e deploy  |
| L / D | Novas mídias / chegada de dado pendente |

**Produção x preview:** `pnpm build` é produção e trava em registro profissional ausente, WhatsApp não confirmado, paciente em hero/og:image/primeira dobra, claim publicado sem fonte e termo vetado no HTML. `PREVIEW=1 pnpm build` nunca trava: mostra a faixa "em revisão", os selos PROVISÓRIO e a rota `/_pendencias/`.

Scripts `audit-a11y`, `audit-lighthouse`, `audit-seo` e `brand:extract` ainda são stubs.

## Pastas

- `media-originais/` — originais imutáveis (`entrada/` recebe arquivos novos; `marca/` o logo).
- `public/media/` — derivados gerados no build (fora do git).
- `docs/dados/` — dados conferidos (avaliações do Google).
- `docs/pesquisa/` — fontes antes de qualquer texto.
