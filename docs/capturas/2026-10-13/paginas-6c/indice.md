# Capturas — /bia, /espaco, /casos, /contato e 404 (sessão 6C, 13/10/2026)

Build de preview (`PREVIEW=1`), página inteira, Chromium 141 com `prefers-reduced-motion: reduce`, 390 e 1440 px, temas claro e escuro. Os PNGs ficam fora do git. A 404 foi capturada em `/nao-existe/`.

| Rota | Abertura (composição) | Tom | Altura 1440 (claro) |
| --- | --- | --- | --- |
| /bia/ | nome gigante à esquerda; vestido (corpo inteiro) na baixa grande; colete na alta sobreposta à borda | light | 4270 |
| /espaco/ | vídeo do ambiente na baixa no centro, entre "O Espaço" e "B."; faixa de atmosfera IA (`data-origem="gerada-por-ia"`) | moss | 3256 |
| /casos/ | 100svh só com texto + uma alta de atmosfera (não-paciente); fichas com clipe + legenda técnica abaixo da dobra | light → dark | 3775 |
| /contato/ | tipográfica: número do WhatsApp em display gigante + B cortado; sem foto, sem formulário | dark | 2552 |
| 404 | B gigante cortado + título | moss | 932 |

**Primeira dobra de /casos:** a primeira mídia de paciente fica no topo em 1180 px (390×844), 1284 (1440×900), 1476 (1920×1080), 1160 (360×640) e 1716 (1024×1366). Está sempre abaixo da altura da janela, em todos os casos. A seção de abertura tem `data-dobra="primeira"`, então o `audit-compliance` bloquearia mídia de paciente ali.

**Rota condicional:** com `public/media/indice.json` ausente, o build de produção não gera `dist/casos/` e avisa ("rota /casos/ omitida em produção").

**Teclado:** em /bia, o botão "Assistir" do episódio 1 recebe foco no 5º Tab, e Enter toca o vídeo.
