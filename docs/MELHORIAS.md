# Melhorias

Coisas que deixariam o site melhor, mas não bloqueiam nada.

## Mídia (sessão 1, 12/10/2026)

- **Legendas .vtt** dos vídeos de clique (`corpo-flacidez-pos-emagrecimento`, `historia-da-bia`, `cafe-com-bia`): os vídeos já têm legenda queimada; `.vtt` é ganho de acessibilidade. Slots vazios em `media-originais/legendas/`. Sem whisper local nesta sessão (o download do modelo foi bloqueado pelo proxy, 403). Quando houver transcrição, marcar "transcrição automática, revisar"; não inventar texto.
- **Originais limpos dos vídeos** (1080×1920, sem legenda queimada): entram pelo Prompt L se um dia chegarem.
- **Textura de papel (imagem8)** não é ladrilhável; para o grão global, gerar ruído em CSS/SVG na sessão 3.

## Conversão e privacidade (sessão 7, 13/10/2026)

- **Biblioteca nova: `qrcode` 1.5.4 (devDependency, só no build).**
  - Gera o QR da plaquinha `print/avaliar.{svg,pdf}` (`pnpm plaquinha`).
  - Peso no site: **0 KB**, porque não vai para o navegador.
  - Justificativa: escrever um codificador de QR à mão é mais código e mais risco do que uma biblioteca madura, fixada e sem dependências de runtime no site.
- **LCP da home:** passou de 2,04 s para 2,13–2,19 s com o banner, o painel, o rodapé e a CSP no HTML (+5 KB gzip) e um módulo de script a mais. O caminho para voltar abaixo de 2,0 s:
  - CSS crítico inline (`build.inlineStylesheets`);
  - um `<clipPath>` por forma;
  - painel de preferências montado só quando aberto.

## Futuras (sessão 9, 13/10/2026)

- **/historias:** página da série de vídeos ("Mulheres com a Bia" e outras), hoje desligada (`modulos.historias`). Precisa de: autorização de cada participante, corte de terceiros, decisão sobre o título queimado "transformadas".
- **/avaliar com QR:**
  - a página e a plaquinha já existem;
  - falta confirmar o link direto de avaliação (`avaliacaoDiretaUrl`) e imprimir a plaquinha sem o selo PROVISÓRIO;
  - sem incentivo nem brinde para quem avaliar (política do Google e CDC).
- **GA4 com consentimento:**
  - o gancho existe (`registrarConversao` → fila `window.espacoB.eventos`);
  - para ligar: script do GA4 só após `permite('medicao')`, Consent Mode v2, CSP com o host e atualização da /privacidade;
  - medir antes o peso (meta: JS da home ≤ 35 KB gzip).
- **Blog técnico:** textos curtos, com fonte em `docs/pesquisa/`, revisados pela Bia. Um assunto por texto (flacidez, criolipólise, LED). Nada de promessa.
- **Schema de reviews:** só quando houver avaliações próprias coletadas com consentimento, nunca as do Google (diretriz de dados estruturados). Hoje: sem AggregateRating.
- **Medição de bibliotecas:** toda biblioteca nova entra com o peso medido aqui. Hoje, no navegador: 0 biblioteca de terceiros. Só no build: `qrcode`, `ffmpeg-static`, `sharp`, `schema-dts` (tipos), `lighthouse` e `@axe-core/playwright` (auditoria).
- **OG com a fonte da marca na Vercel:** gerar os PNG localmente (com Chromium) e versionar, ou trocar o plano B por fonte embutida no SVG.
- **Legendas .vtt:** ver a seção Mídia acima.
- **LCP da home no mobile:** ver docs/auditoria/lighthouse.md. Próximos passos: CSS crítico inline e pôster do hero em AVIF menor.
