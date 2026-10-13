# Deploy

Hospedagem: **Vercel**.

- Equipe "Joao Canonica's projects", plano hobby.
- Projeto `espaco-b` (`prj_VxyLxB3Rj3mv6Ci0vfbu9gW2Pu1T`), ligado ao repositório `joaoCanonica/espaco-b`.
- Cada push gera um deploy automático.

## Como o build roda na Vercel

- Arquivo `vercel.json`:
  - `pnpm install --frozen-lockfile`, depois `pnpm build`, saída em `dist/`;
  - `trailingSlash: true`;
  - cabeçalhos de segurança (cópia de `public/_headers`, que a Vercel não lê).
- **Node e pnpm:**
  - Node 24.x, definido no projeto e em `engines`;
  - pnpm na versão de `packageManager`, via Corepack (`ENABLE_EXPERIMENTAL_COREPACK=1`).
- **Mídia** (`prebuild` → `scripts/prepare-media.mjs`):
  - o ffmpeg vem do pacote `ffmpeg-static`, cujo script de instalação é liberado em `pnpm-workspace.yaml` (`allowBuilds`);
  - os derivados ficam fora do git;
  - na Vercel, `prepare-media` restaura e salva os derivados em `node_modules/.cache/espaco-b-media`, que entra no cache de build. Só o primeiro build codifica tudo: ~35 min, dos quais ~5 min por vídeo em VP9. Os seguintes refazem só o que mudou.
  - Se o cache for limpo ("Redeploy" sem cache), o build volta a levar ~35 min. O limite do plano hobby é 45 min.
- **Imagens OG** (`postbuild` → `gerar-og.mjs`): na Vercel não há Chromium, então entra o plano B com sharp. O título sai em serifa genérica; com Chromium (local), sai em Newsreader. Para o OG final com a fonte da marca, gerar localmente e versionar (decisão do João).

## Variáveis de ambiente (Vercel → Settings → Environment Variables)

| Variável                       | Preview | Production                                       | Para quê                             |
| ------------------------------ | ------- | ------------------------------------------------ | ------------------------------------ |
| `PREVIEW`                      | `1`     | `1` (**até a publicação real**)                  | faixa "em revisão", selos, `noindex` |
| `ENABLE_EXPERIMENTAL_COREPACK` | `1`     | `1`                                              | pnpm fixado                          |
| `SITE_URL`                     | —       | domínio real (ex.: `https://www.espacob.com.br`) | canonical, sitemap, OG absolutos     |

O deploy de produção também sai com noindex enquanto `PREVIEW=1` estiver no alvo production.

## Proteção de acesso

O projeto nasceu com **Vercel Authentication** ligada (Settings → Deployment Protection), então a URL do preview pede login na Vercel.

- Para mostrar ao cliente sem login, escolha uma opção:
  - desligar a proteção em "Preview";
  - gerar um link de compartilhamento ("Share" no deploy);
  - usar "Protection Bypass".
- Mesmo sem proteção, o preview segue com `noindex`.

## Plugar o domínio (quando existir)

1. Vercel → projeto → Settings → Domains → **Add** → `espacob.com.br` e `www.espacob.com.br`. O nome é exemplo: usar o domínio registrado.
2. No registrador (Registro.br), criar os registros que a Vercel mostrar: `A` do apex para o IP indicado e `CNAME` de `www` para `cname.vercel-dns.com`. Esperar a verificação (minutos a horas).
3. Escolher o domínio principal (com ou sem www); o outro redireciona.
4. Em Environment Variables (Production), definir `SITE_URL=https://<domínio principal>`.
5. Ainda **com** `PREVIEW=1`, fazer redeploy e conferir canonical, sitemap e og:image com o domínio novo (`pnpm audit-seo` local com `SITE_URL`).

## Ir para produção (tirar o noindex)

Só quando, nesta ordem:

1. `NODE_ENV=production pnpm validate-config` e `NODE_ENV=production pnpm audit-compliance` saírem com código 0 (0 bloqueios);
2. os itens "resolver antes" de `docs/COMPLIANCE.md` (Bloqueios de produção) estiverem decididos pelo João;
3. o João aprovar por escrito.

Aí: remover `PREVIEW` do alvo **Production** → Redeploy da branch de produção → conferir `robots.txt` (sem `Disallow: /`), ausência de `noindex` no HTML e o sitemap com o domínio.

Branch de produção: por padrão, a padrão do repositório. Se for outra, ajustar em Settings → Git.

## Alternativa: Cloudflare Pages

- O `public/_headers` já está no formato do Pages.
- Build command `pnpm build`, saída `dist`, variáveis iguais às de cima.
- O ffmpeg-static também funciona lá. O limite de build é 20 min no plano grátis, o que exige o cache de mídia ou mídia pré-gerada.
