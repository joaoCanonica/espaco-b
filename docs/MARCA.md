# Marca e design system — "A contraforma"

Sessão 3, 12/10/2026. Componentes em `src/components/{brand,ui}/`, tokens em `src/styles/`, vitrine em `/_sistema/` (dev e `PREVIEW=1`; fora do índice).

## 1. Logo vetorizado — PROVISÓRIO

- **Origem:** `media-originais/marca/logo-b-2048.jpg`, raster de **2000×2000 px** (o arquivo chegou com 2000, não 2048). A vetorização é **provisória**: quando chegar o vetor oficial, basta pôr o arquivo em `media-originais/marca/logo.svg` e rodar `pnpm brand:extract`. O SVG tem precedência sobre o raster e regenera tudo (B, contraformas, favicon).
- **Método (sem IA, sem reamostragem):** cinza → desfoque leve (σ 0,8) só para suavizar a borda JPEG → limiar no ponto médio entre fundo (cinza 82) e letra (241) = **162** → potrace (`turdSize 40`, `optTolerance 0.2`).
- **Fidelidade:** IoU raster × vetor = **99,61%** (`docs/capturas/marca/comparacao.png`: original | vetor | formas extraídas; `diferenca.png` em vermelho onde divergem).
- **Saídas** (`src/assets/brand/`): `logo-b.svg`, `contraforma-alta.svg`, `contraforma-baixa.svg` (viewBox comum `0 0 798 1023`), `cauda-b.svg`, `marca.json` (paths, versões normalizadas 0–1 e medidas) e `public/favicon.svg`.

### Contraformas

| Forma                  | Caixa (px do logo) | Proporção L/A | Área        | Borda esquerda                     |
| ---------------------- | ------------------ | ------------- | ----------- | ---------------------------------- |
| alta (menor, em cima)  | 224 × 378          | 0,591         | 72 051 px²  | reta: desvio 0 px em 80% da altura |
| baixa (maior, embaixo) | 394 × 519          | 0,759         | 173 858 px² | reta: desvio 0 px                  |

- As duas são "D": borda esquerda reta (a face interna da haste) e lado direito arredondado. Não são arco.
- **Achado:** no logo as duas contraformas **se comunicam** por um vão de ~46 px entre a barra do meio e a haste (linhas 908–919 do raster). O script separa as duas cortando exatamente nas linhas do vão: cada contraforma fecha na linha da própria barra. Nada foi desenhado à mão.
- **Cauda:** é a parte do B à esquerda da haste (x < 770) e abaixo do meio da letra (y > 986), traçada separadamente. Uso: marcador fixo de fim de seção.

## 2. Cor

Fonte única: `src/styles/paleta.mjs`. O CSS de cor é gerado dela (inline no `<head>`), e `pnpm audit-contraste` lê o mesmo arquivo.

| Token               | Valor     | Origem                                    |
| ------------------- | --------- | ----------------------------------------- |
| Musgo               | `#52543F` | medido no logo (4 cantos idênticos)       |
| Creme do logo       | `#F4EFE6` | média dos pixels da letra                 |
| Osso                | `#F1ECE1` | CLAUDE.md                                 |
| Tinta               | `#1E211A` | CLAUDE.md                                 |
| Framboesa (amostra) | `#983D33` | flores secas reais, ver abaixo            |
| Framboesa funda     | `#8A3027` | texto/ponto sobre claro: 7,04:1 no osso   |
| Framboesa clara     | `#D27E72` | texto/ponto sobre escuro: 5,41:1 na tinta |

**Amostra da framboesa:** quadro de 25,5 s de `ambiente-clinica`, só a área do capim seco (x 170–520, y 180–520, acima da legenda, sem o buquê), 74 905 pixels saturados entre o vermelho e o magenta. O balanço de branco foi corrigido pelo sofá cinza do mesmo quadro (neutro medido `#959A9F`, ganhos R 1,031 · G 1,001 · B 0,970). Mediana corrigida: **`#983D33`** (OKLCH L 0,48 · C 0,12 · H 29°).

- **Diferença com a direção:** o `#8E2B41` do documento de direção é mais frio (H 11°). A amostra real é um vermelho mais quente, entre tijolo e framboesa.
- **Calibração:** mesmo matiz em OKLCH, só variando a luminosidade (funda L 0,44; clara L 0,68, com croma ×0,85).
- **Regra:** framboesa **nunca sobre musgo**, porque nenhuma variante passa 3:1 ali. No tom musgo, o acento é o osso.
- **Uso:** só como ponto raro (um ponto, um sublinhado ao passar o mouse, o selo). Nunca bloco grande. A vitrine mostra isso na seção 06.

**Tons:** toda `<section>` declara `data-tone` (`light`, `dark`, `moss`). No tema escuro, `light` vira a superfície `#262A21`, `dark` vira `#15170F` e `moss` vira `#474936`. O header lê o tom da seção que está logo abaixo dele (IntersectionObserver numa faixa de 1 px).

**Contraste:** 36 pares (2 temas × 3 tons × 6 usos), todos AA. Tabela completa em `docs/CONTRASTE.md`.

## 3. Tipografia — Newsreader Display + Albert Sans

Espécime lado a lado com o logo: `docs/capturas/tipografia/especime-{390,1440}.png` (Gloock e Newsreader Display, cada uma com Albert Sans e com Schibsted Grotesk).

**Por que esta combinação (5 linhas):**

1. O B do logo é um serifado de alto contraste com traços finos; o Newsreader Display (corpo óptico 72) tem o mesmo contraste fino e fica ao lado do logo sem disputar com ele.
2. O Gloock é pesado e escuro demais ao lado do B: num título grande ele vira um bloco preto, e a marca, que é leve, perde.
3. O Newsreader tem itálico de verdade, o que dá o acento editorial sem precisar de outra cor (a framboesa continua rara).
4. O Albert Sans é mais aberto e mais calmo que o Schibsted Grotesk, que tem cara de jornal. Em texto pequeno e em legenda com espaçamento ele fica mais limpo sobre o musgo.
5. Nenhuma das quatro está na lista proibida. A dupla serifa display + sans geométrica dá a escala "display enorme contra legenda pequena" pedida no CLAUDE.md.

**Licença e fonte das famílias:**

| Família           | Licença                         | Fonte                                      |
| ----------------- | ------------------------------- | ------------------------------------------ |
| Newsreader        | SIL OFL 1.1 (Production Type)   | repositório google/fonts, `ofl/newsreader` |
| Albert Sans       | SIL OFL 1.1 (Andreas Rasmussen) | `ofl/albertsans`                           |
| Gloock            | OFL (testada, não usada)        | `ofl/gloock`                               |
| Schibsted Grotesk | OFL (testada, não usada)        | `ofl/schibstedgrotesk`                     |

As licenças vão junto em `src/styles/fonts/licencas/`. Nenhuma das famílias usadas declara "Reserved Font Name", então o subset é permitido.

**Self-host:** subset latim + pt-BR (U+0000–00FF, pontuação geral, €, ™…), woff2, `font-display: swap`. Preload só da display.

| Arquivo                            | Eixos                      | Peso              |
| ---------------------------------- | -------------------------- | ----------------- |
| `newsreader-display.woff2`         | opsz 72 fixo, wght 300–600 | 55,0 KB (preload) |
| `newsreader-display-italico.woff2` | opsz 72, wght 300–600      | 60,7 KB           |
| `albert-sans.woff2`                | wght 300–700               | 30,8 KB           |

**Escala** (`tokens.css`): `--t-mega` clamp(4,5→15 rem) · `--t-1` clamp(3→7,5 rem) · `--t-2` · `--t-3` · `--t-4` · `--t-corpo` 1–1,125 rem · `--t-pequeno` 0,875 rem · `--t-legenda` 0,75 rem em caixa alta, espaçado.

## 4. Componentes

- `<Logo variante="monograma|completo">`: SVG inline com `currentColor`. A variante "completo" é o B + o nome em texto (Newsreader). **Não é um logotipo novo**; se o cliente tiver uma assinatura oficial, ela substitui.
- `<BGigante lado altura corte topo intensidade>`: o B cortado pela borda, decorativo (`aria-hidden`).
- `<Janela forma="alta|baixa" imagem|video>`: recorte pelo path real da contraforma (`clipPathUnits=objectBoundingBox`).
  - Imagem: mantém a proporção da contraforma, com `object-fit: cover`.
  - Vídeo: 9:16 inteiro (`object-fit: contain`). No build, `zonaLivre()` confere se a curva do D corta a zona da legenda queimada; se cortar, cai para cantos arredondados só fora da zona e avisa no log.
  - Vídeo do ambiente (zona 0,40–0,56 × 0,19–0,80, medida nos quadros): a curva **não** corta.
  - Sem mídia: placeholder com selo PROVISÓRIO.
- `<MarcadorCauda>`: a cauda estática no fim da seção.
- `<Legenda numero>`: numeração editorial 01/02/03.
- `<Selo>`: o PROVISÓRIO da sessão 2 (o Provisorio.astro usa este).
- `<Header>` (sticky, lê o tom) e `<SeletorTema>`: o rótulo vem do CSS, então não há troca tardia de texto.
- Base (`base.css`):
  - botões com canto reto à esquerda e pleno à direita (o "D");
  - links com sublinhado fino que vira acento ao passar o mouse;
  - foco visível de 2 px;
  - campos de linha única;
  - grão SVG.

**Grão:** ruído SVG (feTurbulence) inline no CSS, cerca de 0,4 KB e nenhum pedido extra. A alternativa, a `imagem8` (papel), custaria 5,6 KB (480 px AVIF) mais um pedido, e não é ladrilhável.

**Tema sem flash:** um script inline no `<head>`, antes do CSS, aplica `data-theme` a partir do `localStorage` (com try/catch) ou do `prefers-color-scheme`. Sem JS, o CSS segue o sistema. Prova em `docs/capturas/tema/`: com tema escuro salvo, sistema claro e CPU 6× mais lenta, o primeiro quadro pintado já é escuro (o quadro 0 é o `about:blank` antes da navegação).

**Movimento:** tokens de duração e curva. Com `prefers-reduced-motion`, tudo cai para 0,01 ms. Não há biblioteca de animação.

## 5. Retratos de estúdio sobre a Tinta (sessão 4)

Os dois retratos têm fundo frio: o do colete é azul-escuro (`#272532` no canto) e o do vestido é cinza. O site é Tinta quente (`#1E211A`). Testei cinco tratamentos **globais e idênticos** nos dois retratos, aplicados só na exibição (nunca no original, nunca localizados em rosto ou pele). Medição no canto superior direito (fundo) e num recorte do rosto:

| Variante                                                   | Fundo colete | Distância à Tinta | Rosto                                   |
| ---------------------------------------------------------- | ------------ | ----------------- | --------------------------------------- |
| A · original                                               | `#272532`    | 26                | `#AB7772`                               |
| B · sépia 0,18 + saturação 0,88                            | `#29262E`    | 23                | `#A47D74`                               |
| C · musgo soft-light 55%                                   | `#211F27`    | 13                | `#A16D62` (pele mais vermelha e escura) |
| D · musgo "color" 22%                                      | `#27262C`    | 21                | `#A47C73`                               |
| **E · sépia 0,14 + saturação 0,90 + musgo soft-light 45%** | `#242226`    | **13**            | `#A2776A`                               |

- **Escolha: E.** Leva o fundo azulado até a mesma distância da Tinta que C, sem avermelhar a pele (o rosto muda pouco em relação ao original). É uma curva só, aplicada na imagem inteira.
- **Implementação:** classe `.tratamento-retrato` em `src/styles/base.css`, usada no hero via `<Janela classeMidia="tratamento-retrato">`. O mesmo filtro e a mesma camada valem para o retrato do vestido quando ele entrar na seção "A Bia".
