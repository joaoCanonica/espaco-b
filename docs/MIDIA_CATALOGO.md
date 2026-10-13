# Catálogo de mídia

Gerado em 2026-10-12 a partir de `media.manifest.json` e `public/media/indice.json`. Originais em `media-originais/` (imutáveis, conferidos por sha256). Derivados em `public/media/` (fora do git; `pnpm media:prepare`).

**Musgo oficial medido no logo:** `#52543F` (média dos 4 cantos 300×300 px e da moldura de 200 px do logo (2000×2000); os 4 cantos deram #52543F idênticos).

## Arquivos

| Arquivo | Slug | Origem · consentimento | Uso | Decisão | Original → derivado | Problemas |
| --- | --- | --- | --- | --- | --- | --- |
| `imagens/retrato-bia-colete.jpg` | `bia-retrato-colete` | real · titular | hero.principal (janela grande da home); /bia | usar | 1500×2000, 205 KB → 4 larguras; maior (1500) avif 28 KB / webp 40 KB | veio como anexo; pode ter sido recomprimido ou reduzido; pedir o original (recebido: 1500×2000, 204.756 bytes, JPEG q90, sem EXIF); crédito do fotógrafo a informar; dataRegistro desconhecida (sem EXIF) |
| `imagens/retrato-bia-vestido.jpg` | `bia-retrato-vestido` | real · titular | home: seção "A Bia" (janela alta, corpo inteiro); /bia | usar | 1500×2000, 110 KB → 4 larguras; maior (1500) avif 14 KB / webp 23 KB | veio como anexo; pode ter sido recomprimido ou reduzido; pedir o original (recebido: 1500×2000, 110.394 bytes, JPEG q90, sem EXIF); rosto no topo (≈12% da altura): object-position nunca pode cortar o rosto em janelas largas; crédito do fotógrafo a informar |
| `marca/logo-b-2048.jpg` | `logo-b` | real · titular | extração das contraformas (sessão 3); favicon | usar | 2000×2000, 108 KB → 5 larguras; maior (2000) avif 9 KB / webp 20 KB | veio como anexo; pode ter sido recomprimido ou reduzido; pedir o original (recebido: 2000×2000, não 2048×2048; 107.818 bytes, JPEG q90); é raster, não vetor; o vetor oficial, se vier, substitui este arquivo |
| `imagens/foto-dra.png` | `bia-print-antigo` | real · titular | — | não usar (não publicável) | 678×900, 129 KB → — | print 678×900 com ícone do Instagram; substituído pelos retratos de estúdio |
| `imagens/logo.jpg` | `logo-pequeno-antigo` | real · titular | — | não usar (não publicável) | 150×150, 2 KB → — | 150×150, baixa qualidade; substituído pelo logo-b-2048 |
| `imagens/imagem1.jpeg` | `textura-linho-musgo` | gerada-por-ia · nenhum-necessario | fundo escuro; entrada | usar como atmosfera | 2752×1536, 2.99 MB → 5 larguras; maior (2400) avif 86 KB / webp 211 KB | tom diverge do Musgo: média #373821 (mais escura e mais amarela que #52543F); planejar ajuste de cor no build |
| `imagens/imagem2.jpeg` | `textura-gesso-ripas` | gerada-por-ia · nenhum-necessario | fundos claros; manifesto | usar como atmosfera | 2752×1536, 3.01 MB → 5 larguras; maior (2400) avif 59 KB / webp 145 KB | — |
| `imagens/imagem3.jpeg` | `textura-flores-secas` | gerada-por-ia · nenhum-necessario | textura | usar como atmosfera (provisória) | 1856×2304, 2.85 MB → 5 larguras; maior (1856) avif 86 KB / webp 179 KB | flores rosa-poeira; as flores reais da clínica são framboesa: priorizar foto real quando existir |
| `imagens/imagem4.jpeg` | `textura-frascos-ambar` | gerada-por-ia · nenhum-necessario | — | não usar até haver lugar claro | 1856×2304, 2.66 MB → 5 larguras; maior (1856) avif 74 KB / webp 136 KB | prioridade baixa; frascos podem sugerir produto/medicamento: conferir contexto antes de usar |
| `imagens/imagem5.jpeg` | `textura-luz-agua` | gerada-por-ia · nenhum-necessario | /pele-e-tecnologia | usar como atmosfera | 2752×1536, 2.35 MB → 5 larguras; maior (2400) avif 25 KB / webp 42 KB | — |
| `imagens/imagem6.jpeg` | `textura-tecido-osso` | gerada-por-ia · nenhum-necessario | transição de seção | usar como atmosfera | 2752×1536, 2.54 MB → 5 larguras; maior (2400) avif 29 KB / webp 54 KB | — |
| `imagens/imagem7.jpeg` | `textura-bronze-carvalho` | gerada-por-ia · nenhum-necessario | detalhe | usar como atmosfera | 1856×2304, 2.54 MB → 5 larguras; maior (1856) avif 47 KB / webp 80 KB | — |
| `imagens/imagem8.jpeg` | `textura-papel` | gerada-por-ia · nenhum-necessario | textura de grão | usar como textura única (não ladrilhar) | 2048×2048, 3.04 MB → 5 larguras; maior (2048) avif 110 KB / webp 223 KB | não é ladrilhável sem tratamento; para grão global preferir ruído gerado por CSS/SVG (sessão 3) |
| `imagens/imagem9.jpeg` | `textura-calcario` | gerada-por-ia · nenhum-necessario | fundo de seção | usar como atmosfera | 2752×1536, 2.29 MB → 5 larguras; maior (2400) avif 35 KB / webp 39 KB | — |
| `imagens/imagem10.jpeg` | `ornamento-pampas-traco` | gerada-por-ia · nenhum-necessario | ornamento a VETORIZAR (sessão 3) | vetorizar; não usar o raster | 2048×2048, 2.36 MB → 5 larguras; maior (2048) avif 34 KB / webp 70 KB | tom do fundo diverge do logo (média #54523E vs Musgo #52543F); some ao vetorizar |
| `videos/ambiente-clinica.mp4` | `o-espaco` | real · titular · nunca capa | /espaco: seção "O espaço" | usar (nunca no hero) | 720×1280, 27,5 s, 5.86 MB → 540 mp4 2.38 MB · 540 webm 2.19 MB · 720 mp4 4.27 MB | placa antiga na porta (logo da fase anterior da marca; informativo); vídeo mudo no site (loop); áudio original descartado no derivado |
| `videos/video-para-presenca-e-profissionalismo.mp4` | `bastidores-ensaio-e-casos` | real · declarado-pelo-cliente · nunca capa | /casos (pares antes/depois); dentro das seções (bastidores e pares); nunca capa, hero, og:image ou primeira dobra | usar bastidores e pares; excluir a legenda com superlativo | 720×1280, 32,8 s, 4.32 MB → 540 mp4 1.76 MB · 540 webm 1.63 MB · 720 mp4 3.43 MB | cada par antes/depois dura ~1,3 s no original: os clipes ficam curtos (≈1,2–1,4 s); um pacienteRef por par; não dá para confirmar só pelos quadros se pares diferentes são da mesma pessoa (ex.: P-002 e P-007): verificar com o João; trilha sonora do reels não verificada (licença): derivado sem áudio; membro da equipe do ensaio aparece de costas em vários trechos |
| `videos/usou-monjauro-corpo-flacido.mp4` | `corpo-flacidez-pos-emagrecimento` | real · titular · nunca capa | /corpo-e-emagrecimento (clique para tocar) | usar | 720×1280, 88,3 s, 22.18 MB → 540 mp4 5.77 MB · 540 webm 5.08 MB · 720 mp4 10.31 MB | nenhum intervalo com corpo de paciente encontrado nos quadros a cada 2 s: o vídeo é só a Bia falando; nome do arquivo cita medicamento de prescrição: no site usar só o slug; legenda cita medicamento de prescrição (0–2 s) |
| `videos/mulheres-transformadas-com-bia.mp4` | `historia-da-bia` | real · titular · nunca capa | /bia (clique para tocar) | usar | 720×1280, 141,7 s, 26.29 MB → 540 mp4 5.81 MB · 540 webm 5.28 MB · 720 mp4 10.33 MB | abertura com terceiros (0–1,65 s) cortada; nome da série usa "transformadas" (termo evitado no texto do site; aqui é título queimado) |
| `videos/cafe-com-bia.mp4` | `cafe-com-bia` | real · titular · nunca capa | /bia: "Café com Bia" (clique para tocar) | usar só o que estiver liberado; o resto depende de ouvir o áudio | 720×1280, 118,7 s, 23.33 MB → 540 mp4 1.49 MB · 540 webm 1.92 MB · 720 mp4 2.61 MB | sem transcrição local: não foi possível ouvir o áudio; até o João ouvir e liberar, o derivado tem só 0–14 s; tema do vídeo é o caso de um influenciador com medicamento de prescrição |

## Vídeos: intervalos

### o-espaco (`videos/ambiente-clinica.mp4`)

Perfil **ambiente**, áudio não. Poster em 25,5 s (flores framboesa e sofá; a legenda queimada aparece em todos os quadros: não há quadro limpo). Mantido: 25,4 s de 27,5 s. Legenda queimada: O ambiente também faz parte do tratamento (zona 0.4–0.56 da altura).

| Intervalo (s) | O que aparece | Usar | Motivo / problemas |
| --- | --- | --- | --- |
| 0,0–2,0 | porta de vidro com a placa antiga (emblema azul, "Espaço Emagrecimento e Est…"), rua e carro | sim | abertura do espaço; placa antiga = fase anterior da marca (informativo) |
| 2,0–9,3 | consultório: quadro pintado da Bia, divisória dourada, maca | sim | espaço real |
| 9,3–11,1 | sala com equipamento corporal | sim | espaço real; equipamento visível: conferir marca legível na sessão 9 (não é oferta) |
| 11,1–18,6 | luminária, recepção vista de cima, sala com aparelho e manta framboesa | sim | espaço real |
| 18,6–22,7 | cafeteira, cápsulas e xícaras | sim | acolhimento; marcas de cafeteira/cápsulas legíveis (informativo) |
| 22,7–24,8 | recepcionista de costas ao computador, tela visível | **não** | decisão do João: excluir a recepcionista (terceiro) e a tela |
| 24,8–27,5 | flores framboesa e sofá | sim | espaço real |

### bastidores-ensaio-e-casos (`videos/video-para-presenca-e-profissionalismo.mp4`)

Perfil **mudo**, áudio não. Poster em 30,5 s (Bia sentada posando, sem legenda e sem paciente). Mantido: 24,5 s de 32,8 s. Legenda queimada: Você finalmente encontrou a doutora que esculpe os rostos mais lindos da Serra Catarinense (zona 0.37–0.58 da altura).

| Intervalo (s) | O que aparece | Usar | Motivo / problemas |
| --- | --- | --- | --- |
| 0,0–4,8 | Bia posando no banco + legenda queimada "…a doutora que esculpe os rostos mais lindos da Serra Catarinense" | **não** | legenda queimada com superlativo (e "doutora") |
| 4,8–6,4 | bastidores: Bia posando no banco | sim | bastidores do ensaio |
| 6,4–7,7 | par antes/depois, rosto (**P-001**) | sim | caso declarado autorizado |
| 7,7–9,3 | bastidores: Bia posando | sim | bastidores do ensaio |
| 9,3–10,6 | par antes/depois, rosto de perfil (**P-002**) | sim | caso declarado autorizado |
| 10,6–12,2 | bastidores: Bia (transição em fusão) | sim | bastidores do ensaio |
| 12,2–13,6 | par antes/depois, rosto e pescoço (**P-003**) | sim | caso declarado autorizado |
| 13,6–15,2 | bastidores: Bia sentada posando | sim | bastidores do ensaio |
| 15,2–16,6 | par antes/depois, rosto; ao fundo, membro da equipe de costas (**P-004**) | sim | caso declarado autorizado; terceiro (equipe do ensaio) ao fundo, de costas, sem rosto |
| 16,6–18,5 | Bia sentada; membro da equipe (camisa mostarda) de costas em primeiro plano | **não** | terceiro em destaque; verificar |
| 18,5–19,8 | par antes/depois, rosto (**P-005**) | sim | caso declarado autorizado |
| 19,8–21,5 | bastidores: Bia em pé, vestido vinho | sim | bastidores do ensaio |
| 21,5–22,8 | par antes/depois, rosto (**P-006**) | sim | caso declarado autorizado |
| 22,8–24,5 | membro da equipe ajustando a roupa da Bia (braço e costas em primeiro plano) | **não** | terceiro em destaque; verificar |
| 24,5–26,0 | par antes/depois, rosto (**P-007**) | sim | caso declarado autorizado |
| 26,0–27,9 | bastidores: Bia de perfil, vestido preto com costas abertas | sim | bastidores do ensaio |
| 27,9–29,3 | par antes/depois, rosto de perfil (**P-008**) | sim | caso declarado autorizado |
| 29,3–32,8 | bastidores: Bia sentada posando | sim | bastidores do ensaio |

Clipes dos pares (mudos, nunca capa):

- `par-p001` P-001: 1,2 s, mp4 172 KB · webm 160 KB
- `par-p002` P-002: 1,2 s, mp4 171 KB · webm 163 KB
- `par-p003` P-003: 1,2 s, mp4 165 KB · webm 149 KB
- `par-p004` P-004: 1,3 s, mp4 174 KB · webm 152 KB
- `par-p005` P-005: 1,2 s, mp4 183 KB · webm 166 KB
- `par-p006` P-006: 1,3 s, mp4 205 KB · webm 183 KB
- `par-p007` P-007: 1,4 s, mp4 164 KB · webm 140 KB
- `par-p008` P-008: 1,3 s, mp4 157 KB · webm 124 KB

### corpo-flacidez-pos-emagrecimento (`videos/usou-monjauro-corpo-flacido.mp4`)

Perfil **clique**, áudio sim. Poster em 21,0 s (Bia falando, sem legenda (conferido no quadro exato)). Mantido: 88,3 s de 88,3 s. Legenda queimada: legenda de fala, uma frase por vez, no topo do quadro (zona 0.07–0.17 da altura).

| Intervalo (s) | O que aparece | Usar | Motivo / problemas |
| --- | --- | --- | --- |
| 0,0–2,0 | Bia falando; legenda cita o nome de um medicamento de prescrição | sim | decisão do João (usar); flagFinal: cita medicamento de prescrição |
| 2,0–17,8 | Bia falando sobre emagrecimento e flacidez | sim | conteúdo da responsável |
| 17,8–77,5 | Bia falando (novo plano); cita "canetinhas", relatos de pacientes em fala e o nome de um protocolo | sim | conteúdo da responsável; texto para a conferência final: "resultado especial", relatos citados, nome de protocolo |
| 77,5–88,3 | Bia segura o aplicador de um equipamento; marca legível na base do aparelho | sim | conteúdo da responsável; marca de equipamento legível no quadro (conferir na sessão 9; nunca citar como oferta) |

flagFinal: cita medicamento de prescrição

### historia-da-bia (`videos/mulheres-transformadas-com-bia.mp4`)

Perfil **clique**, áudio sim. Poster em 108,2 s (Bia sentada, entre palavras da legenda (conferido no quadro exato)). Mantido: 140,0 s de 141,7 s. Legenda queimada: legenda palavra a palavra, centro do quadro (zona 0.6–0.7 da altura).

| Intervalo (s) | O que aparece | Usar | Motivo / problemas |
| --- | --- | --- | --- |
| 0,0–1,6 | abertura da série: montagem rápida com cerca de 9 outras mulheres (entrevistadas de outros episódios) | **não** | terceiros sem autorização registrada |
| 1,6–4,0 | tela preta e revelação da Bia | sim | abertura |
| 4,0–6,4 | título "Mulheres transformadas | Espaço B" sobre a Bia | sim | título da série |
| 6,4–141,7 | Bia conta a própria história (carreira, família, investimento, primeira clínica) | sim | história da responsável; legenda contém "garantido" em contexto narrativo (26–28 s) e o nome da série usa "transformadas": conferência final |

### cafe-com-bia (`videos/cafe-com-bia.mp4`)

Perfil **clique**, áudio sim. Poster em 11,0 s (Bia com a xícara, sem legenda). Mantido: 14,0 s de 118,7 s. Legenda queimada: títulos de abertura e uma legenda de tema; sem legenda de fala (zona 0.4–0.72 da altura).

| Intervalo (s) | O que aparece | Usar | Motivo / problemas |
| --- | --- | --- | --- |
| 0,0–9,9 | cafeteira preparando café; títulos "Está começando mais um…" e "Café com a Bia!" | sim | abertura do quadro; cafeteira de marca visível (informativo) |
| 9,9–14,0 | Bia com a xícara, abrindo o tema | sim | abertura |
| 14,0–20,7 | legenda queimada com o nome de um medicamento de prescrição e de um influenciador | **não** | menção a influenciador (terceiro) |
| 20,7–24,8 | Bia falando entre a legenda do influenciador e o recorte | **não** | provável menção falada ao influenciador; verificar |
| 24,8–35,5 | recorte de terceiros ("Caxias Online", foto de dois homens) | **não** | mídia de terceiros sem autorização |
| 35,5–118,7 | Bia falando com a xícara, sem legenda | **não** | áudio não transcrito; o vídeo trata do caso do influenciador e pode citá-lo na fala; verificar |

flagFinal: cita medicamento de prescrição

## Build de mídia

- Primeira rodada do zero (`rm -rf public/media && pnpm media:prepare`): **21 min 22 s** neste ambiente (4 CPUs). O VP9 é o grosso (historia-da-bia: 607 s).
- Rodada seguinte sem mudanças: 0 refeitos, 96 em cache, **2,5 s** (idempotente; cache por hash do original + parâmetros em `public/media/.cache.json`). Mudar um parâmetro refaz só o afetado (ex.: incluir a largura 1500 dos retratos refez 8 arquivos em 49 s).
- `public/media/`: 97 MB (fora do git).
- Todos os vídeos dentro do orçamento (ambiente/mudo ≤ 2,5 MB e clique ≤ 6 MB no perfil 540×960; clipes ≤ 1 MB). Onde estourou, o script baixou o bitrate em 18% e refez (ver `tentativas` em `public/media/indice.json`). `historia-da-bia` 540 ficou com ~260 kbps de vídeo: conferir a qualidade na sessão 4.

## O que pedir ao João

- Originais dos retratos (arquivo do fotógrafo) e o logo vetorial; os três chegaram como anexo.
- Crédito do fotógrafo do ensaio.
- Fotos do espaço em alta resolução (estáticas, sem pessoas).
- Ouvir o "Café com Bia" (20,7–118,7 s) e liberar o que não cita o influenciador.
- Confirmar se pares diferentes do vídeo de presença são da mesma paciente; liberar ou não os trechos com o membro da equipe de costas.
- Melhoria futura (não urgente): originais limpos dos vídeos, 1080×1920, sem legenda.
