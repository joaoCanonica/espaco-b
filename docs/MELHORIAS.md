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
