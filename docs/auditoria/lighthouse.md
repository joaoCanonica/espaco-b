# Lighthouse por rota (gerado)

Gerado por `scripts/audit-lighthouse.mjs` em 2026-10-13 sobre `dist/` (build de produção), servido localmente com gzip e os cabeçalhos de `_headers`, Lighthouse 13 em Chromium local, uma rodada por rota e perfil (sem SITE_URL o build sai com noindex, e o SEO cai para ~60 por is-crawlable e canonical). Notas: Desempenho / Acessibilidade / Boas práticas / SEO.

| Rota                               | Mobile               | LCP mobile | CLS   | TBT  | Desktop              | LCP desktop |
| ---------------------------------- | -------------------- | ---------- | ----- | ---- | -------------------- | ----------- |
| `/`                                | 96 / 100 / 100 / 61  | 2179 ms    | 0.000 | 0 ms | 99 / 100 / 100 / 61  | 486 ms      |
| `/avaliar/`                        | 100 / 100 / 100 / 58 | 1652 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 58 | 364 ms      |
| `/bia/`                            | 99 / 100 / 100 / 61  | 1878 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 61 | 443 ms      |
| `/casos/`                          | 99 / 100 / 100 / 61  | 1803 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 61 | 424 ms      |
| `/contato/`                        | 98 / 100 / 100 / 58  | 1952 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 58 | 442 ms      |
| `/corpo-e-emagrecimento/`          | 97 / 100 / 100 / 61  | 2109 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 61 | 483 ms      |
| `/espaco/`                         | 99 / 100 / 100 / 61  | 1878 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 61 | 428 ms      |
| `/harmonizacao-facial/`            | 98 / 100 / 100 / 58  | 1955 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 58 | 444 ms      |
| `/pele-e-tecnologia/`              | 98 / 100 / 100 / 58  | 1953 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 58 | 449 ms      |
| `/privacidade/`                    | 100 / 100 / 100 / 58 | 1652 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 58 | 362 ms      |
| `/protocolos-bia/`                 | 99 / 100 / 100 / 58  | 2027 ms    | 0.001 | 0 ms | 100 / 100 / 100 / 58 | 445 ms      |
| `/protocolos-bia/bialifting/`      | 100 / 100 / 100 / 58 | 1651 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 58 | 364 ms      |
| `/protocolos-bia/bialips/`         | 100 / 100 / 100 / 58 | 1653 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 58 | 370 ms      |
| `/protocolos-bia/lipocrio-da-bia/` | 100 / 100 / 100 / 58 | 1652 ms    | 0.000 | 0 ms | 100 / 100 / 100 / 58 | 362 ms      |

## Peso por rota (mobile, carga inicial)

| Rota                               | JS (arquivos, transferido) | JS inline (gzip) | Imagens | Vídeo na carga | Total  | Vídeos só no clique (MP4) |
| ---------------------------------- | -------------------------- | ---------------- | ------- | -------------- | ------ | ------------------------- |
| `/`                                | 3 KB                       | 1 KB             | 24 KB   | 0 KB           | 204 KB | 10 vídeo(s), 9350 KB      |
| `/avaliar/`                        | 3 KB                       | 1 KB             | 0 KB    | 0 KB           | 102 KB | 0 vídeo(s), 0 KB          |
| `/bia/`                            | 3 KB                       | 1 KB             | 13 KB   | 0 KB           | 178 KB | 2 vídeo(s), 7128 KB       |
| `/casos/`                          | 3 KB                       | 1 KB             | 56 KB   | 0 KB           | 161 KB | 8 vídeo(s), 1358 KB       |
| `/contato/`                        | 4 KB                       | 1 KB             | 0 KB    | 0 KB           | 165 KB | 0 vídeo(s), 0 KB          |
| `/corpo-e-emagrecimento/`          | 3 KB                       | 1 KB             | 8 KB    | 0 KB           | 177 KB | 1 vídeo(s), 5630 KB       |
| `/espaco/`                         | 3 KB                       | 1 KB             | 60 KB   | 0 KB           | 165 KB | 1 vídeo(s), 2323 KB       |
| `/harmonizacao-facial/`            | 3 KB                       | 1 KB             | 11 KB   | 0 KB           | 180 KB | 0 vídeo(s), 0 KB          |
| `/pele-e-tecnologia/`              | 3 KB                       | 1 KB             | 9 KB    | 0 KB           | 178 KB | 0 vídeo(s), 0 KB          |
| `/privacidade/`                    | 3 KB                       | 1 KB             | 0 KB    | 0 KB           | 104 KB | 0 vídeo(s), 0 KB          |
| `/protocolos-bia/`                 | 3 KB                       | 1 KB             | 21 KB   | 0 KB           | 188 KB | 0 vídeo(s), 0 KB          |
| `/protocolos-bia/bialifting/`      | 3 KB                       | 1 KB             | 11 KB   | 0 KB           | 117 KB | 0 vídeo(s), 0 KB          |
| `/protocolos-bia/bialips/`         | 3 KB                       | 1 KB             | 5 KB    | 0 KB           | 111 KB | 0 vídeo(s), 0 KB          |
| `/protocolos-bia/lipocrio-da-bia/` | 3 KB                       | 1 KB             | 5 KB    | 0 KB           | 111 KB | 0 vídeo(s), 0 KB          |

SEO: auditorias reprovadas na home (mobile): is-crawlable, canonical.

**Todas as rotas na meta de Desempenho, Acessibilidade e Boas práticas.**
