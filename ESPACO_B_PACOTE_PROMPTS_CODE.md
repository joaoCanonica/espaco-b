# Clínica Espaço B — Pacote de prompts para o Claude Code (Opus)

Versão 2 · 12/10/2026 · WAXLO · Projeto 1 de 3

Complementa: `ESPACO_B_LEITURA_E_DIRECAO` (a leitura e a direção) e `ESPACO_B_PROMPTS_GEMINI` (as imagens, já geradas). As mídias já estão no repositório `joaoCanonica/espaco-b` (`assets/` e `videos/`), então **não há anexos**: o Code lê tudo direto do repositório.

---

## Como usar

1. **Um prompt por vez, cada um em uma sessão nova do Claude Code, na ordem. Nunca cole tudo de uma vez:** cada sessão lê o que a anterior gerou, e cada uma termina com um commit (que é o seu ponto de volta se algo der errado).
2. **Sessão 0:** cole o BLOCO "CONTEXTO DO PROJETO" (seção B) e o Prompt 0 juntos, **sem anexos**. Ela grava o bloco como `CLAUDE.md`, que o Code carrega sozinho nas sessões seguintes. **Sessões 1 a 9:** cole só o prompt (todos começam com "Leia CLAUDE.md"). Se alguma sessão não carregar o arquivo, cole o bloco de novo.
3. **Anexos só na sessão 1** (os 2 retratos e o logo). Faça assim: depois da sessão 0, copie os 3 arquivos para `media-originais/entrada/` com os nomes `retrato-bia-vestido.jpg`, `retrato-bia-colete.jpg` e `logo-b-2048.jpg`, e anexe os mesmos 3 à mensagem do Prompt 1, na ordem da legenda. A pasta garante o original exato; só anexar pode reduzir ou recomprimir a imagem (o Code avisa se isso aconteceu).
4. Ao fim de cada sessão, confira o relatório e as capturas (390 px e 1440 px, claro e escuro). Se algo falhar, me traga o relatório e o link; eu devolvo o prompt de correção.
5. Ordem: 0 Fundação · 1 Mídia · 2 Config e regras · 3 Design system e marca · 4 Entrada e hero · 5 Pesquisa e textos · 6A/6B/6C Páginas · 7 Conversão e LGPD · 8 SEO e GEO · 9 QA, compliance e deploy. Depois, quando necessário: **Prompt L** (novas mídias, em lotes) e **Prompt D** (dados pendentes que chegarem).
6. **Antes da sessão 0**, copie para a raiz do repositório os arquivos `ESPACO_B_LEITURA_E_DIRECAO_v3.md`, `ESPACO_B_PACOTE_PROMPTS_CODE.md` e `ESPACO_B_AVALIACOES_GOOGLE.json` (a sessão 0 move os dois primeiros para `docs/` e o JSON para `docs/dados/avaliacoes-google.json`).

---

## A. Dados fixos do cliente (a sessão 2 transforma em config)

Fonte entre colchetes. Estado: CONFIRMADO (o João disse e confirmou) · INFORMADO (veio do texto do Google/IA que o João colou: pista, não prova) · PENDENTE (não existe; não inventar).

| Campo | Valor | Estado |
|---|---|---|
| Nome fantasia | Espaço B (texto legal: Clínica Espaço B) | CONFIRMADO |
| Razão social | Clinica de Estetica Espaco B Ltda (constituição/reestruturação em jul/2024) | INFORMADO (Google/IA); conferir no cartão CNPJ |
| CNPJ | — | **não aparece no site** (decisão do João); campo opcional com `exibir:false` |
| Origem | "Espaço B Clínica de Fisioterapia", dez/2013 (fisioterapia, pilates, ortopedia, dermato-funcional) | INFORMADO (Google/IA), NÃO VERIFICADO |
| Início da clínica atual / marca | "desde 2024"; presença digital consolidada em 2023 | CONFIRMADO (João); não vira "desde 20XX" no texto |
| Tempo de atuação | texto fixo "há mais de 15 anos" (alinhado ao perfil da Bia, que diz "há 15 anos"; sem "desde 20XX") | CONFIRMADO pelo João; conferir na passada final de onde vem a contagem (a clínica de fisioterapia é de 2013; o texto fica ligado à atuação da Bia) |
| Responsável | Bianca Cardoso ("Bia"; usa "Dra. Bia" na série dela) | CONFIRMADO |
| Profissão / registro | Fisioterapeuta, CREFITO 183149 | CONFIRMADO pelo João (não consultei o registro) |
| "Dermato-funcional" | Google/IA a chama de fisioterapeuta dermato-funcional | INFORMADO; título de especialista exige registro no conselho: só entra com comprovante |
| Tratamento "Dra." | usado por ela na série | **chave `tratamento.dra` desligada por padrão**; liga quando o João confirmar (conferência no final) |
| Responsável técnico | Bianca Cardoso | CONFIRMADO pelo João |
| Equipe | só a Bianca por enquanto (o texto do Google/IA fala em parceiros de HOF, sem nomes: fora até o João mandar) | CONFIRMADO; seção de equipe desligada; **a Bianca é a executora de todos os serviços** (escopo de cada ato conferido na sessão 9) |
| Endereço | Rua Humberto de Campos, 328, Coral, Lages/SC, CEP 88508-190 | CONFIRMADO (ficha do Google que o João colou) |
| WhatsApp | +55 (49) 99911-5351 | CONFIRMADO; de quem é: confirmar |
| Horários | seg–sex 9h–12h e 13h30–18h30; sáb 8h–12h; dom fechado | CONFIRMADO |
| Instagram | @clinica.espacob (≈13,7 mil seguidores) | CONFIRMADO |
| Google | ficha no Maps (link na seção B), coordenadas -27.8074182, -50.3162505, kgmid `/g/11hzyf45d0`; nome na ficha: "Espaço B - Harmonização Corporal e Facial \| Estética em Lages \| FaceLifting, Depilação Definitiva, Emagrecimento e HOF." | CONFIRMADO; nota/avaliações PENDENTES; link direto de avaliação: candidato derivado, NÃO VERIFICADO |
| Domínio | ainda não existe | PENDENTE (preview em URL da Vercel, noindex; sugestões na seção C) |
| Nome descritivo | Clínica Espaço B — Estética e Harmonização Corporal e Facial | CONFIRMADO (uso em título/descritor; a marca continua "Espaço B") |
| Serviços (cliente) | Harmonização orofacial (toxina, preenchimentos, FaceLifting); estética corporal e emagrecimento (protocolos, Lipocrio da Bia, redefinição corporal); depilação definitiva (a LED, tecnologia "Holonyak"); limpeza de pele; rejuvenescimento | CONFIRMADO |
| Protocolos com nome | BiaLifting, BiaLips, Lipocrio da Bia (Instagram, CONFIRMADO); ElevaFace, LiposemCortes, Redefine, "Club do Botox" (Google/IA) | os 3 primeiros CONFIRMADOS; os 4 últimos INFORMADOS: **não entram no site até o João confirmar o nome e o conteúdo** |
| Equipamentos | depilação a LED "Holonyak", laser "Lavieen", aparelho do Lipocrio | marca/modelo/registro ANVISA PENDENTES; marca de equipamento **não aparece no site** sem registro |

**Textos promocionais que o João colou** (preenchimento labial, depilação a LED, Botox, Lipocrio): entram no config como **fonte do cliente** (`claims.ts`), mas o site usa a versão em tom premium escrita na sessão 5. As frases com número, comparação ou promessa ("90% menos desconforto", "a melhor tecnologia do mundo", "1 sessão", "em até 90 dias", "abdome chapado", "adeus", "laser ficou para trás") ficam em `claims.ts` com `publicar: false` e vão para a conferência final com a fonte que as sustente. Motivo: quebram o tom premium e são o tipo de frase que conselho, ANVISA e CDC miram; não é recusa do João.

---

## B. BLOCO "CONTEXTO DO PROJETO" (colar só na sessão 0)

````text
CONTEXTO DO PROJETO — Clínica Espaço B (site premium)
Idioma de tudo (código, comentários curtos, textos, relatórios): português do Brasil.

1. QUEM E O QUÊ
- Cliente: Clínica Espaço B, Lages/SC (estética integrada: rosto, corpo, pele). Fundadora e rosto da marca: Bianca Cardoso ("Bia"), fisioterapeuta, CREFITO 183149 (informado pelo cliente, não verificado por nós).
- Produto: site estático premium de clínica de estética/harmonização/emagrecimento. Meta do João (CEO da WAXLO): "o site mais premium já criado", sem "cara de IA", sem risco jurídico para o cliente nem para a WAXLO.
- Regra do projeto (do João): o principal é o site ficar excelente, com texto e foto certos. A conferência de normas (COFFITO, ANVISA, CDC, LGPD) é feita em UMA passada no final (sessão 9). O que o João manda é tratado como autorizado. Não corte conteúdo por falta de autorização: sinalize o que falta, curto, em docs/PENDENCIAS.md e COMPLIANCE.md.
- Dados do cliente (registro, CNPJ, nomes completos, anos, números, equipamentos) NUNCA são inventados nem inferidos. Faltou: campo pendente. Texto vindo do Google/IA é pista, não fato.
- Decisões do João (12/10/2026): (a) tempo de atuação no texto = "há mais de 15 anos" (alinhado ao perfil da Bia; ligado à atuação dela; nunca "desde 20XX"); (b) equipe = só Bianca Cardoso (responsável, responsável técnica e executora de todos os serviços por ora; seção de equipe desligada); (c) o CNPJ NÃO aparece no site; (d) mídia de paciente: o cliente declara que todas autorizaram o uso, "no decorrer do site, nunca como capa" (nunca no hero, og:image, primeira dobra de qualquer página, thumbnail de compartilhamento); (e) domínio ainda não existe: SITE_URL por variável de ambiente, noindex enquanto for preview; (f) nome: marca "Espaço B"; descritivo "Clínica Espaço B — Estética e Harmonização Corporal e Facial"; (g) os 5 vídeos entram COMO ESTÃO (legenda queimada, 720×1280); não esperar versão limpa; (h) avaliações do Google: nota 4,8 e 32 avaliações (conferido em 12/10/2026) em docs/dados/avaliacoes-google.json; o site mostra a nota e o total reais, mais trechos curtos e literais SÓ dos itens com `usavelNoSite:true` (sem foto, nome e inicial), com link para o Google; sem AggregateRating no schema.
- Links e coordenadas (config/contato): Maps https://www.google.com/maps/place/Espa%C3%A7o+B+-+Harmoniza%C3%A7%C3%A3o+Corporal+e+Facial+%7C+Est%C3%A9tica+em+Lages+%7C+FaceLifting,+Depila%C3%A7%C3%A3o+Definitiva,+Emagrecimento+e+HOF./@-27.8074182,-50.3162505,1006m/data=!3m2!1e3!4b1!4m6!3m5!1s0x94e01f1a3dc60141:0xd167078bfa0fbc32!8m2!3d-27.8074182!4d-50.3162505!16s%2Fg%2F11hzyf45d0 · geo -27.8074182, -50.3162505 · listagem do Google https://www.google.com/search?q=clinica+espa%C3%A7o+b · candidato a link direto de avaliação (NÃO VERIFICADO, derivado do código do Maps): https://search.google.com/local/writereview?placeid=ChIJQQHGPRof4JQRMrwP-osHZ9E.
- Documentos de apoio no repositório: docs/ESPACO_B_LEITURA_E_DIRECAO.md e docs/ESPACO_B_PACOTE_PROMPTS_CODE.md (a sessão 0 cria a pasta e os copia).

2. STACK
- Astro (versão estável atual; confira em docs.astro.build e no npm, e fixe), TypeScript strict, estático, ilhas mínimas. pnpm. Node LTS atual. `engines` e `packageManager` fixados no package.json. Sem backend.
- Sem GSAP, Lenis, Motion, Framer, jQuery. Movimento com CSS (scroll-driven animations e View Transitions só como melhoria progressiva sob @supports; o conteúdo SEMPRE visível sem elas) e IntersectionObserver. Qualquer biblioteca nova exige medição de peso e justificativa em MELHORIAS.md.
- Orçamento (proposta a medir): JS da home ≤ 35 KB gzip; LCP < 2,0 s no mobile (emulado); CLS ≈ 0; Lighthouse mobile ≥ 95 em Performance, Best Practices e SEO, 100 em Acessibilidade. Vídeo NUNCA no caminho crítico do LCP.
- Fontes self-hosted (nada de CDN de fonte). Conferir licença antes de usar.

3. IDENTIDADE (própria; não reaproveitar nada de outros sites da WAXLO)
- Assinatura única "A CONTRAFORMA": o B do logo tem dois espaços vazios (contraformas; a de cima menor, a de baixo maior; borda esquerda reta, lado direito arredondado, formato de "D", NÃO é arco). O site trata o B como conjunto de janelas: fotos e vídeos aparecem dentro dessas duas formas, em escalas diferentes por seção. As formas são EXTRAÍDAS do logo vetorizado, nunca desenhadas de cabeça. O B gigante cortado pela borda da tela é elemento de arquitetura. A cauda do B é um marcador FIXO de fim de seção (não é linha que se desenha no scroll).
- Paleta (tokens em CSS custom properties; claro e escuro): Musgo ≈ #52543F (medido no logo de 2048 px), Osso ≈ #F1ECE1, Tinta ≈ #1E211A, Framboesa seca ≈ #8E2B41 (amostrada das flores secas reais da clínica; calibrar uma versão mais clara para texto sobre escuro e uma mais funda para o claro, ambas AA). A framboesa é acento RARO (um ponto por tela). Sem dourado na interface. Contraste AA validado por script nos dois temas.
- Tipografia (candidatas; testar ao lado do logo e decidir): display serifado de alto contraste Gloock ou Newsreader Display; texto Albert Sans ou Schibsted Grotesk. Confirmar licença/disponibilidade e fazer self-host. PROIBIDAS (já usadas): Cormorant, Bodoni Moda, Marcellus, Instrument Serif, Hanken Grotesk, Fraunces, Lato, Figtree.
- Já usadas e PROIBIDAS de repetir: vinho + coluna de pontos, linha da vida, curva dourada, oval verde, arco, navy + areia.
- Tom do texto: direto, adulto, sem hype; segunda pessoa; frases curtas; termo técnico explicado em uma linha. Nada de "transformação", "garantido", "queima de gordura", "emagreça X kg", superlativos, "resultados duradouros" como adjetivo, nem texto genérico ("excelência", "cuidado personalizado", "sem pressa e sem complicação").

4. ANTI "CARA DE IA" (reprovado pelo João)
Proibido: grade de cartões brancos arredondados com borda fina; ícone em círculo; pílulas e etiquetas por toda parte; bonecos de palito e ícones de biblioteca como ilustração; hero centralizado com blob/degradê ou só com logo; retângulo vazio de vídeo; todas as seções com a mesma altura e estrutura; gradiente roxo/azul, brilhos, 3D plástico.
Usar: assimetria; escala tipográfica display muito grande contra texto pequeno; numeração e legendas editoriais; linhas finas; blocos de cor de ponta a ponta alternando musgo, osso e tinta; sobreposição na borda das imagens; grão global sutil; fotografia/vídeo REAIS em destaque; cada seção com um gesto visual próprio.
Cada seção declara data-tone (light, dark, moss) e o header lê o tom da seção abaixo.

5. MÍDIA
- Originais imutáveis em media-originais/ (a sessão 1 move assets/ e videos/ para lá com git mv). Derivados gerados no build em public/media (fora do git): AVIF/WebP com srcset, poster por vídeo, WebM+MP4, legendas .vtt.
- Manifesto media.manifest.json por arquivo: id, tipo, origem ("real" | "gerada-por-ia"), autoria, consentimento ("titular" | "paciente-termo" | "nenhum" | "terceiros"), publicavel, previewOk, dataRegistro, pacienteRef (P-001; nunca nome), menorDeIdade, edicoes, trim, problemas.
- Imagens geradas por IA (imagem1–10) são SÓ atmosfera/textura. Nunca gerar nem retocar com IA: pessoas, rostos, mãos, corpos, a Bia, pacientes, resultados, o espaço real. Sem super-resolução por IA em rosto. Edição só por recorte/cobertura de identificadores; jamais retoque.
- Mídia de PACIENTE: o cliente declara autorização de todas; entra com consentimento "declarado-pelo-cliente", `termoArquivado:false` (aviso, não bloqueia) e `naoUsarComoCapa:true`; só dentro das seções, nunca em hero, og:image ou primeira dobra (audit-compliance bloqueia isso). Mídia de TERCEIROS sem autorização (ex.: recorte de jornal): fora; em preview só com selo "PROVISÓRIO". Vídeos longos só carregam no clique (preload="none", poster).
- Vídeos do cliente são 9:16, 720×1280, com legenda queimada, e entram COMO ESTÃO (decisão do João): em janelas verticais 9:16 inteiras, NUNCA recortar a zona da legenda (verifique nos quadros); a curva do D só arredonda cantos fora da zona de legenda. Se um dia chegarem originais limpos 1080×1920, entram pelo Prompt L.

6. CONFIG E TRAVAS
- Fonte única em src/config/ tipada. Estados: confirmado(), opcional() (some sozinho se vazio), bloqueante(), aviso(). Dev e preview SEMPRE funcionam, com faixa "em revisão", selo PROVISÓRIO onde faltar dado e noindex. Dado ausente NUNCA derruba uma seção em silêncio: em preview mostra cartão com "a informar" + selo.
- Produção trava só em: registro profissional ausente, WhatsApp real ausente, termo vetado no HTML final, mídia sem consentimento referenciada, mídia de paciente em hero/og:image/primeira dobra. O CNPJ NÃO trava e NÃO aparece. Todo o resto é aviso.
- Termos vetados e avisos vivem em src/config/termos.ts: vetados (bloqueiam produção) = promessa/garantia/superlativo/marca de medicamento de prescrição como oferta; avisos = termos regulados que exigem conferência. As listas são editáveis, e o Code NUNCA afrouxa uma lista nem a trava sem ordem expressa.

7. REGRAS DE CONDUTA DO CODE
- Um prompt = uma sessão = um commit (mensagem curta em português).
- Mostre um plano curto antes de implementar quando a tarefa for grande.
- Entregue capturas e métricas, não declarações de sucesso. Se não conseguir fazer algo (fonte inacessível, ferramenta ausente), diga; não preencha.
- Pesquisa antes de texto: registre em docs/pesquisa/<tema>.md (fonte, data de acesso, nível de evidência, o que NÃO se sabe). Sem fonte, sem afirmação clínica ou técnica.
- Nunca citar marca de equipamento ou de medicamento de prescrição como oferta no site. Nunca usar "Dra." (veja tratamento.dra no config).
- Capturas sempre em 390 px e 1440 px, tema claro e escuro, com prefers-reduced-motion testado.
- Relatório final de cada sessão (curto): o que mudou · o que falhou · o que depende do João · números medidos.
````

---

## PROMPT 0 — Fundação

````text
[COLAR AQUI O BLOCO "CONTEXTO DO PROJETO" INTEIRO]

Tarefa: criar a fundação do projeto Astro no repositório espaco-b e gravar o contexto como CLAUDE.md.
Escopo: pode criar e mover arquivos de configuração e estrutura. NÃO escreva nenhuma página, copy ou componente visual nesta sessão. NÃO apague mídia.
Leia primeiro: o conteúdo do repositório (git ls-files), o bloco de contexto acima.

Passos:
1. Salve o bloco de contexto acima, sem alterações, como CLAUDE.md na raiz e como docs/CONTEXTO.md.
2. Crie docs/ e docs/dados/. Mova para docs/dados/avaliacoes-google.json o arquivo ESPACO_B_AVALIACOES_GOOGLE.json, se estiver na raiz. Copie para docs/, se eu tiver colocado na raiz do repositório, os arquivos ESPACO_B_LEITURA_E_DIRECAO*.md (renomeie para ESPACO_B_LEITURA_E_DIRECAO.md) e ESPACO_B_PACOTE_PROMPTS_CODE.md. Se não estiverem, crie docs/PENDENCIAS.md avisando que faltam e siga.
3. Verifique ferramentas: node, pnpm, git, ffmpeg, ffprobe, potrace (ou alternativa instalável por pnpm), chromium do Playwright. Liste o que falta e como instalar; instale o que for seguro via pnpm. Não instale nada global sem me dizer.
4. Inicialize Astro (estável atual, TypeScript strict, estático, sem framework de UI) na raiz, preservando assets/ e videos/ por ora. package.json com name "espaco-b", `engines` (Node LTS atual), `packageManager` (versão exata do pnpm), scripts: dev, build, preview, check, validate-config, audit-compliance, audit-a11y, audit-lighthouse, audit-seo, media:prepare, brand:extract, capturar. Os scripts de auditoria podem ser stubs que imprimem "não implementado" e saem com código 0; serão feitos nas sessões seguintes.
5. Estrutura: src/{config,components,layouts,pages,styles,scripts,assets/brand,content}, scripts/, docs/{pesquisa,capturas}, media-originais/, media-originais/entrada/ e media-originais/marca/ (vazias, com .gitkeep), public/. .gitignore: node_modules, dist, .astro, public/media, docs/capturas/*.png (guardar só o índice), .env*.
6. tsconfig strict; ESLint + Prettier mínimos; .editorconfig; .nvmrc.
7. Crie scripts/capturar.mjs: sobe `astro preview`, usa Playwright com Chromium e tira capturas de uma lista de rotas em 390 e 1440 px, tema claro e escuro (atributo data-theme no <html>), salvando em docs/capturas/<data>/. Deve funcionar mesmo só com a rota "/".
8. Página temporária src/pages/index.astro com <h1>Espaço B</h1> e noindex, só para provar o pipeline.
9. README.md curto: como rodar, as sessões, onde está o contexto.

Regras: não adicione dependências de animação. Fixe versões exatas no lockfile. Não commit de arquivos de mídia derivados.
Entrega: relatório curto (versões fixadas, ferramentas que faltam, saída de `pnpm build` e `pnpm check`) e a confirmação de que media-originais/entrada/ existe para eu colar os 3 arquivos da sessão 1.
Critério de aceite: `pnpm install && pnpm build && pnpm check` verdes; `pnpm capturar` gera 4 capturas da home; CLAUDE.md existe e é idêntico ao bloco; git limpo após commit "fundação".
````

---

## PROMPT 1 — Ingestão e catálogo de mídia (COM 3 ANEXOS)

**Antes de rodar:** copie os 3 arquivos que você me mandou para `media-originais/entrada/` do repositório (a sessão 0 cria a pasta), com estes nomes, e **anexe os mesmos 3 arquivos** à mensagem, na ordem da legenda. Copiar para a pasta preserva o original exato; o anexo serve para o Code ver e identificar (anexar sozinho pode recomprimir ou reduzir a imagem, e o Code avisa se for o caso).
Legenda numerada (cole junto com o prompt): `1 = retrato-bia-vestido.jpg · 2 = retrato-bia-colete.jpg · 3 = logo-b-2048.jpg`

````text
Leia CLAUDE.md. Esta sessão só cataloga, move, prepara e trava mídia. NADA vai para páginas.

Entrada desta sessão, além do que já está no repositório (assets/ e videos/): 3 arquivos novos.
  1 = retrato-bia-vestido: retrato de estúdio, corpo inteiro, vestido longo preto, fundo cinza em degradê, 3:4.
  2 = retrato-bia-colete: retrato de estúdio, meio corpo, colete preto, fundo escuro azulado, olhar para a esquerda, mão perto do queixo, 3:4.
  3 = logo-b-2048: logo "B" creme sobre musgo, 2048×2048, raster.
Salvamento: confira se os 3 já estão em media-originais/entrada/ (preferido). Se não estiverem, salve os anexos lá com esses nomes e registre em `problemas`: "veio como anexo; pode ter sido recomprimido ou reduzido; pedir o original", informando dimensões e peso recebidos. Nunca recomprima nem converta os originais.

Tarefa: mover os originais para media-originais/, criar o manifesto e o pipeline de derivados, e catalogar cada arquivo com decisão de uso.
Escopo: pode criar scripts/prepare-media.mjs, scripts/extract-posters.mjs, media.manifest.json e docs/MIDIA_CATALOGO.md. NÃO altere nenhum original (apenas `git mv`). NÃO use IA para melhorar, gerar ou ampliar imagem.
Leia primeiro: git ls-files, media-originais após o mv, ffprobe de cada vídeo.

Passos:
1. `git mv assets media-originais/imagens` e `git mv videos media-originais/videos`. Mova os retratos de media-originais/entrada/ para media-originais/imagens/ e o logo para media-originais/marca/ (git mv). Slugs neutros SÓ no manifesto (campo `slug`), sem nome de medicamento (ex.: o vídeo "usou-monjauro-corpo-flacido" tem slug `corpo-flacidez-pos-emagrecimento`).
2. Para cada arquivo: ffprobe/identify e registre dimensões, duração, peso, codec, fps, áudio. Para os 3 novos, registre também a cor média dos fundos (o fundo do logo deve dar ≈ #52543F: registre o valor medido; esse é o Musgo oficial).
3. Manifesto com os campos do CLAUDE.md (seção 5). Decisões já tomadas:
   - retrato-bia-colete: origem "real", autoria "fotógrafo do ensaio: a informar", consentimento "titular", publicavel true. USO: hero.principal (janela grande da home) e /bia. Observação: fundo azulado frio; o Tinta do site é verde-escuro quente: planejar um ajuste GLOBAL e idêntico de curva/temperatura aplicado igual nos dois retratos (nunca no original, nunca localizado em rosto ou pele). Registrar.
   - retrato-bia-vestido: origem "real", mesma autoria e consentimento. USO: seção "A Bia" da home e /bia (janela alta, corpo inteiro). Rosto na parte superior: planejar `object-position` para nunca cortar o rosto.
   - logo-b-2048: tipo "marca", publicavel true. USO: extração das contraformas (sessão 3) e favicon. Registrar que é raster (não vetor) e que o vetor oficial, se vier, substitui.
   - foto-dra.png (print 678×900 com ícone do Instagram): `substituida:true`, publicavel false, NÃO usar (os retratos novos substituem).
   - logo.jpg (150×150): `substituida:true`, publicavel false.
   - imagem1 (linho musgo): gerada-por-ia, fundo escuro/entrada. OBS: tom diverge do Musgo (#52543F): registrar em `problemas` e planejar ajuste de cor no build.
   - imagem2 (gesso + sombras de ripas): gerada-por-ia, fundos claros/manifesto.
   - imagem3 (flores secas rosa-poeira): gerada-por-ia, textura; OBS: as flores reais da clínica são framboesa; priorizar foto real quando existir.
   - imagem4 (frascos âmbar): gerada-por-ia, PRIORIDADE BAIXA, não usar até haver lugar claro.
   - imagem5 (luz sobre água): gerada-por-ia, /pele-e-tecnologia.
   - imagem6 (tecido osso): gerada-por-ia, transição de seção.
   - imagem7 (bronze + carvalho): gerada-por-ia, detalhe.
   - imagem8 (papel): gerada-por-ia, textura de grão (1:1; testar se é ladrilhável e registrar).
   - imagem9 (calcário): gerada-por-ia, fundo de seção.
   - imagem10 (pampas em traço): gerada-por-ia, ornamento a VETORIZAR; tom diverge do logo.
   - Todas as geradas: consentimento "nenhum-necessario", autoria "gerada por IA (Gemini/Nano Banana)".
4. Vídeos (todos 9:16 720×1280, legenda queimada; Bia = consentimento "titular"). Para cada um, extraia 1 quadro a cada 2 s em scratch (fora do git), LEIA os quadros e registre em `segmentos` os intervalos com: o que aparece, `usar: true|false`, motivo. Mídia de PACIENTE: o cliente declarou que todas as pacientes autorizaram o uso, desde que NÃO seja capa: marque `consentimento:"declarado-pelo-cliente"`, `termoArquivado:false`, `naoUsarComoCapa:true`, `pacienteRef` (P-001, P-002…; um por pessoa; nunca nome). Decisões:
   - ambiente-clinica (27 s): USAR em /espaco, na seção "O espaço" (com a legenda queimada "O ambiente também faz parte do tratamento", que faz parte da mensagem). NÃO usar no hero. Excluir (`trim`) o trecho com a recepcionista de costas ao computador. A placa antiga na porta (logo antigo) fica em `problemas` (fase anterior da marca; informativo).
   - video-para-presenca-e-profissionalismo (33 s): USAR os bastidores do ensaio (Bia posando) E os pares antes/depois (pacientes, declarados autorizados), cada par com seu pacienteRef; os pares vão para /casos e para dentro das seções, nunca para capa. Excluir os trechos em que aparece a legenda queimada com superlativo ("…os rostos mais lindos da Serra Catarinense"): marcar `usar:false` com esse motivo. Extrair clipes de cada par SEM a legenda; se a legenda cobrir um par inteiro, `usar:false, problemas:"legenda queimada"`.
   - corpo-flacidez-pos-emagrecimento (88 s, arquivo "usou-monjauro-corpo-flacido"): USAR em /corpo-e-emagrecimento, clique para tocar. Intervalos com corpo de paciente: `usar:true` com pacienteRef e `naoUsarComoCapa`. `flagFinal`: "cita medicamento de prescrição".
   - mulheres-transformadas-com-bia (142 s): é a própria Bia contando a história dela (série "Mulheres transformadas | Espaço B", episódio 1). USAR em /bia, clique para tocar. Sem terceiros. Legenda palavra a palavra queimada: fica como está.
   - cafe-com-bia (119 s): USAR em /bia ("Café com Bia"), clique para tocar. EXCLUIR o trecho com recorte de terceiros ("Caxias Online", foto de dois homens) e qualquer menção a influenciador; registrar os intervalos. `flagFinal`: cita medicamento de prescrição.
   Se não tiver certeza de um intervalo, marque `usar:false, problemas:"verificar"` em vez de supor.
5. scripts/prepare-media.mjs (roda em predev/prebuild, idempotente, cache por hash): imagens → AVIF e WebP em larguras 480/800/1200/1600/2400 (nunca acima do original); placeholder de cor média; os retratos também em 3:4 recortados por `object-position` declarado no manifesto; vídeos → MP4 H.264 e WebM, 720×1280 (e 540×960 no perfil mobile), com `trim` aplicado via ffmpeg, áudio só nos vídeos de clique (o ambiente é mudo); poster AVIF por vídeo (quadro limpo, sem legenda se possível). Saída em public/media/. Orçamento: ambiente ≤ 2,5 MB; cada vídeo de clique ≤ ~6 MB no perfil mobile (meça; se não couber, ajuste CRF e diga). Clipes dos pares antes/depois: curtos (≤ 6 s), ≤ 1 MB cada.
6. Gere docs/MIDIA_CATALOGO.md: tabela por arquivo (uso, decisão, problemas, peso original → derivado), intervalos excluídos e o que preciso pedir ao João (fotos do espaço em alta, crédito do fotógrafo; originais limpos dos vídeos só como melhoria futura).
7. Legendas: os vídeos já têm legenda queimada, então .vtt é opcional (melhoria de acessibilidade). Se houver whisper local, gere .vtt em media-originais/legendas/ marcando "transcrição automática, revisar"; se não, crie slots .vtt vazios e anote em MELHORIAS (não em PENDENCIAS). NÃO invente texto de legenda.

Regras: nenhum original é modificado nem recomprimido; derivados fora do git; nenhum nome de paciente em arquivo, nome de arquivo ou manifesto.
Entrega: relatório com tabela de pesos e tempos de build, intervalos por vídeo, 1 contact sheet por vídeo em docs/capturas/midia/ (fora do git), e se os 3 arquivos novos vieram da pasta ou do anexo (com dimensões).
Critério de aceite: `pnpm media:prepare` roda do zero e é idempotente; manifesto valida em JSON Schema; cada vídeo tem poster e `segmentos`; nenhum arquivo com consentimento "nenhum" marcado publicável; mídia com pacienteRef tem `naoUsarComoCapa:true`; build verde.
````

---

## PROMPT 2 — Config tipada, estados e travas

````text
Leia CLAUDE.md e docs/MIDIA_CATALOGO.md.

Tarefa: criar a config tipada como fonte única da verdade, com estados, trava de produção e preview honesto.
Escopo: src/config/**, scripts/validate-config.mjs, scripts/audit-compliance.mjs (versão inicial), docs/PENDENCIAS.md, src/components/PreviewBanner.astro e Provisorio.astro (somente funcionalidade, estilo mínimo; o design vem na sessão 3). NÃO escreva copy final.

Passos:
1. src/config/tipos.ts: helpers `confirmado(v, fonte)`, `opcional(v)`, `bloqueante(rotulo)`, `aviso(rotulo, motivo)` e o tipo Campo<T> com estado {confirmado|informado|pendente|aviso}, fonte e data. `informado` = veio de texto não verificado (Google/IA) e aparece no preview com selo.
2. Arquivos: marca.ts (nome curto "Espaço B", nome descritivo "Clínica Espaço B — Estética e Harmonização Corporal e Facial", razão social "Clinica de Estetica Espaco B Ltda" como `informado`, CNPJ `opcional` com `exibir:false`, `tempoDeAtuacao = confirmado("há mais de 15 anos", fonte: João, escopo: atuação da Bia)`; sem anoInicio no texto), pessoas.ts (Bianca Cardoso; título "Fisioterapeuta"; registro CREFITO 183149 confirmado pelo cliente com `verificado:false`; `tratamento.dra = { ativo:false, motivo }`; "dermato-funcional" como informado, desligado), equipe.ts (só Bianca Cardoso, responsável técnica; seção de equipe desligada em modulos.ts; quando houver mais gente o Prompt D liga), contato.ts (endereço com bairro Coral confirmado, WhatsApp, horários estruturados, Instagram, google.kgmid "/g/11hzyf45d0", mapsUrl, geo, listagemUrl e avaliacaoDiretaUrl com os valores do CLAUDE.md; a avaliacaoDiretaUrl é `informado` (candidato derivado, não verificado); nomeNoGoogle "Espaço B - Harmonização Corporal e Facial | Estética em Lages | FaceLifting, Depilação Definitiva, Emagrecimento e HOF."), servicos.ts (cada serviço com: slug, rótulo, executor = Bianca Cardoso (CREFITO 183149) e conselho = COFFITO/CREFITO (o João confirmou que só ela atende; o escopo de cada ato é conferido na sessão 9), `status`, `equipamento` (marca e registro ANVISA pendentes, marca NÃO publicável), `claims[]`), protocolos.ts (BiaLifting, BiaLips, Lipocrio da Bia = confirmados; ElevaFace, LiposemCortes, Redefine, Club do Botox = `informado`, `publicar:false`), midia.ts (slots que apontam para ids do manifesto, com cadeia de fallback: hero.principal → retrato-bia-colete; se ausente → clipe ambiente; se ausente → imagem9; sobre.retrato → retrato-bia-vestido), avaliacoes.ts (lê docs/dados/avaliacoes-google.json; `nota`, `total`, `conferidoEm`; aviso se `conferidoEm` tiver mais de 60 dias; só `usavelNoSite:true` pode ser publicado; nome exibido = nome + inicial; sem foto), legal.ts, tema.ts, seo.ts, modulos.ts (liga/desliga: casos=true com mídia de paciente declarada autorizada e nunca na primeira dobra, equipe=false, avaliacoesGoogle=true, historias=false), termos.ts (listas de vetados e avisos), claims.ts.
2b. claims.ts: guarde os textos promocionais do cliente como fonte, com `publicar:false` e `fonte:"cliente (texto colado pelo João)"`. Cada claim com `tipo`: numero | comparacao | promessa | superlativo | prazo | preco, e `conferir:` quem sustenta (ANVISA, COFFITO, CDC, estudo). Lista (copiar literalmente): "Dê adeus às preocupações com lábios finos e ao incômodo do bigode chinês", "Experimente a transformação completa", "a melhor tecnologia do mundo para depilação definitiva", "Depilação a laser ficou para trás", "Maior efetividade com 90% menos desconforto que a depilação a laser", "pacotes com incríveis descontos e brindes exclusivos", "Suavize rugas e linhas de expressão de forma rápida e segura", "o melhor tratamento para redução de gordura localizada em apenas 1 sessão", "resultados efetivos em até 90 dias com apenas 1 sessão", "pochete que não sai por nada", "abdome chapado", "Há 15 anos entregando resultados duradouros", "Protocolos internacionais sofisticados", "Ninguém vai saber o segredo", "esculpe os rostos mais lindos da Serra Catarinense".
3. scripts/validate-config.mjs: lê a config, lista pendências por estado e severidade em docs/PENDENCIAS.md (gerado, com data). Em `NODE_ENV=production` falha (código 1) SOMENTE em: registro profissional ausente, WhatsApp não confirmado como real, mídia com pacienteRef referenciada em hero/og:image/primeira dobra, e `claims` com `publicar:true` sem fonte. Em dev/preview, nunca falha.
4. scripts/audit-compliance.mjs (inicial): varre o HTML final em dist/ procurando termos de src/config/termos.ts. Vetados (bloqueiam produção): garantid*, milagre, sem dor, definitiv* quando precedido de "resultado", "100%", "o melhor", "a melhor", "número 1", "queima de gordura", "emagreça", "abdome chapado", "pochete", "antes e depois" fora do módulo de casos, marcas de medicamento de prescrição (botox, dysport, xeomin, mounjaro, monjaro, ozempic, wegovy, saxenda, tirzepatida, semaglutida) e "Dra." quando tratamento.dra.ativo=false. Avisos: "depilação definitiva", "toxina botulínica", "preenchimento", "bioestimulador", "laser", "LED", "fisioterapeuta", "especialista", preço/R$, "desconto", "promoção". Saída: docs/COMPLIANCE.md (gerado) com termo, arquivo, linha e status. Também varre as legendas .vtt e o manifesto, e bloqueia mídia com pacienteRef usada em hero, og:image ou primeira dobra. Também varre os trechos de avaliações: termo vetado ou regulado num trecho publicável (ex.: "botox", "o melhor", "antes e depois", "perfeita") bloqueia produção.
5. PreviewBanner (faixa "em revisão") e <Provisorio> (selo) funcionam por variável de build (PREVIEW=1). Em produção ambos somem e as seções dependentes de dado pendente SOMEM com alerta no build, nunca em silêncio.
6. Em dev, uma rota src/pages/_pendencias.astro (noindex, fora do sitemap) lista tudo que está pendente/informado/aviso.
7. Testes: scripts/test-config.mjs que prova (a) preview sobe com todos os pendentes, (b) production falha com cada bloqueio e passa quando simulados, (c) seção da equipe NUNCA some em preview.

Regras: não preencher nenhum dado pendente. Não afrouxar listas. Marca de equipamento nunca é saída pública.
Entrega: relatório + saída dos testes + captura da rota _pendencias (390/1440).
Critério de aceite: `pnpm validate-config` lista as pendências; test-config prova que cada bloqueio simulado derruba `NODE_ENV=production pnpm build` com mensagem clara; com a config real de hoje (registro e WhatsApp confirmados) a produção só falha se houver termo vetado ou mídia de paciente em hero/og:image; `PREVIEW=1 pnpm build` PASSA; test-config verde; PENDENCIAS.md e COMPLIANCE.md gerados.
````

---

## PROMPT 3 — Design system e marca (logo vetorizado, contraformas, tokens)

````text
Leia CLAUDE.md e docs/ESPACO_B_LEITURA_E_DIRECAO.md (seções 4.1 a 4.3).

Tarefa: construir o design system da identidade "A contraforma": logo vetorizado provisório, extração das contraformas, tokens claro/escuro, tipografia e componentes-base.
Escopo: src/styles/**, src/assets/brand/**, src/components/{brand,ui}/**, src/layouts/Base.astro, scripts/brand-extract.mjs, scripts/audit-contraste.mjs, uma rota src/pages/_sistema.astro (noindex) que mostra tudo. NÃO construa seções de página.
Leia primeiro: media-originais/marca/logo-b-2048.jpg (2048×2048, B creme sobre musgo), src/config/tema.ts.

Passos:
1. scripts/brand-extract.mjs: a partir de media-originais/marca/logo-b-2048.jpg (ou, quando existir, um SVG em media-originais/marca/logo.svg, que tem precedência), sem reamostragem por IA (2048 px já basta; só suavize o limiar), limiarize, vetorize (potrace) e produza em src/assets/brand/: logo-b.svg (o B), contraforma-alta.svg e contraforma-baixa.svg (as duas contraformas, a menor em cima e a maior embaixo, como paths fechados normalizados num viewBox comum), cauda-b.svg. Registre em docs/MARCA.md que esta vetorização é PROVISÓRIA (origem raster de 2048 px; o vetor oficial, se vier, substitui) e que, quando o vetor real chegar, basta pôr o arquivo em media-originais/marca/ e rodar `pnpm brand:extract`. Gere docs/capturas/marca/ com comparação lado a lado do logo original e do vetor.
2. Componentes: <Logo/> (SVG inline, fill currentColor, variantes completo/monograma), <BGigante/> (o B cortado pela borda, parametrizável), <Janela/> (moldura em "D" usando o path real da contraforma, via clip-path/mask com `clipPathUnits=objectBoundingBox`, em duas escalas "alta" e "baixa", aceita imagem ou vídeo, mantém proporção, com placeholder), <MarcadorCauda/> (a cauda do B, estática, fim de seção), <Legenda/> (numeração e legenda editorial 01/02/03), <Selo/> (PROVISÓRIO reutilizando o da sessão 2).
3. Tokens (src/styles/tokens.css): cores Musgo/Osso/Tinta/Framboesa nos dois temas, escala de espaçamento, raios (cantos mistos: reto e muito arredondado), linhas finas, grão global sutil (imagem8 pode ser a textura; ou ruído SVG se pesar demais; meça), z-index, durações e curvas de movimento. Seletor de tema claro/escuro SEM flash (script inline mínimo no <head>, localStorage em try/catch, respeita prefers-color-scheme, atributo data-theme).
4. Tipografia: teste Gloock e Newsreader Display ao lado do logo em docs/capturas/tipografia/ (390 e 1440) com Albert Sans e Schibsted Grotesk; escolha a melhor combinação e justifique em 5 linhas em docs/MARCA.md. Confirme licença e fonte de cada família (Google Fonts/OFL) e faça self-host (woff2, subset latino + pt-BR, font-display: swap, preload só da display). Escala tipográfica nomeada com `clamp()` (display muito grande contra legenda pequena). Nunca use as famílias proibidas.
5. Sistema de tons: toda <section> declara `data-tone` (light, dark, moss) e o header (sticky, mínimo) lê o tom da seção abaixo (IntersectionObserver) e troca cor/fundo.
6. Acento framboesa: amostre as flores secas reais em media-originais/videos/ambiente-clinica (um quadro) e calibre duas variantes AA; documente a escolha. Framboesa só como ponto raro (testar no _sistema que não vira "site vinho": nunca como cor de bloco grande).
7. scripts/audit-contraste.mjs: calcula contraste WCAG AA de todos os pares de tokens usados em texto, nos dois temas; falha se algum par < 4.5 (texto) ou 3 (grande/UI).
8. A rota _sistema mostra: cores, tipografia, escala, <Logo>, <BGigante>, <Janela> nas duas escalas com a imagem2 e, na variante de vídeo, o clipe do ambiente em 9:16 inteiro (a legenda queimada nunca pode ser cortada pela curva do D), <MarcadorCauda>, botões, links, foco visível, formulários, estados.

Regras: formas extraídas do logo, nunca à mão; sem arco, oval, coluna de pontos, linha que se desenha no scroll; sem cartão branco com borda fina; sem ícone em círculo; prefers-reduced-motion respeitado.
Entrega: relatório + capturas (_sistema em 390/1440, claro/escuro) + tabela de contraste + peso das fontes e do CSS.
Critério de aceite: build verde; audit-contraste verde; _sistema renderiza sem erro de console; 2 contraformas visíveis e identificáveis como D (borda esquerda reta); fontes self-hosted; sem flash de tema (gravar vídeo curto ou 3 capturas sequenciais do carregamento).
````

---

## PROMPT 4 — Entrada e hero

````text
Leia CLAUDE.md e docs/MARCA.md.

Tarefa: construir a entrada animada (as contraformas se abrem) e o hero da home.
Escopo: src/components/{entrada,hero}/**, src/pages/index.astro (somente a entrada + hero; as outras seções são da sessão 6A), src/scripts/entrada.ts. NÃO escreva as demais seções.
Leia primeiro: src/config/midia.ts (cadeia de fallback do retrato), componentes <Janela>, <BGigante>.

Passos:
1. Entrada (≤ 3,5 s até o hero legível; botão "Pular" visível desde o primeiro quadro; rede de segurança que remove a entrada em 5 s mesmo se algo falhar; hero JÁ presente no DOM e legível por leitor de tela desde o início): tela musgo; o B (creme) surge; as duas contraformas se abrem (scale + clip) até cobrir a tela e revelam o hero. Implementação por máscara SVG/clip-path com os paths reais de contraforma-*.svg e transformações no compositor (transform/opacity), sem layout. Mostrar a entrada só na primeira visita da sessão (sessionStorage em try/catch). `prefers-reduced-motion`: sem entrada, hero direto. Sem JavaScript: hero direto.
2. Hero: janela grande em "D" (contraforma baixa) com a mídia do slot `hero.principal` (retrato-bia-colete; fallback: imagem9), janela pequena (contraforma alta) com imagem2 (sem vídeo no hero), B gigante cortado pela borda como arquitetura, título em escala display contra texto pequeno, legenda editorial ("Estética integrada · Lages, SC"), CTA primário WhatsApp (mensagem neutra: "Olá! Gostaria de agendar uma avaliação."), CTA secundário "Conhecer os protocolos". Título provisório (o João escolhe; deixar as 3 opções em src/content/hero.ts e usar a 1): "Rosto e corpo, um projeto só." / "Rejuvenescimento com método, não com moda." / "Aqui cada protocolo tem o nome de quem o executa."
3. Mobile 390: janela única empilhada com o título sobreposto à borda; nenhum vídeo no hero; só imagens AVIF com dimensões declaradas.
4. O elemento do LCP deve ser o texto do título ou o poster AVIF com `fetchpriority="high"` e dimensões declaradas; vídeo só inicia depois do LCP (após `requestIdleCallback`/evento load).
5. Retrato do hero: `retrato-bia-colete` (3:4, fundo escuro azulado, olhar para a esquerda, em direção ao texto) na janela grande (contraforma baixa), com `object-position` que nunca corta o rosto; `retrato-bia-vestido` (corpo inteiro) fica para a seção "A Bia" e /bia. A janela pequena usa imagem2. Sem retoque; unifique a temperatura dos dois retratos só com um ajuste GLOBAL e idêntico de curva/temperatura (CSS filter ou derivado de build; nunca no original, nunca localizado em rosto/pele). O fundo azul-escuro das fotos precisa conversar com o Tinta (#1E211A): teste overlay/mix-blend do musgo e documente a escolha em docs/MARCA.md.
6. Medição: rode Lighthouse mobile na home e registre LCP, CLS, TBT e JS gzip em docs/PERFORMANCE.md. Se a entrada comprometer o LCP, simplifique a entrada, não o hero.

Regras: sem GSAP/Lenis/Motion; conteúdo nunca depende de scroll-driven (apenas melhoria sob @supports); foco e teclado funcionam durante a entrada (Esc pula); nada de blob/degradê.
Entrega: relatório + capturas em 4 momentos da entrada (0 s, 0,8 s, 1,6 s, 2,6 s) e do hero final em 390/1440, claro/escuro + números do Lighthouse.
Critério de aceite: entrada ≤ 3,5 s medida; "Pular" funciona com mouse, toque e teclado; sem erro de console; LCP mobile < 2,0 s ou o relatório diz por que não e propõe a correção; CLS ≈ 0; JS gzip da home dentro do orçamento (ou relatório diz quanto estourou).
````

---

## PROMPT 5 — Pesquisa e textos (sem copy sem fonte)

````text
Leia CLAUDE.md, docs/ESPACO_B_LEITURA_E_DIRECAO.md e src/config/claims.ts.

Tarefa: pesquisar os temas do site e escrever o COPY_DECK.md.
Escopo: docs/pesquisa/*.md e docs/COPY_DECK.md. NÃO implemente páginas nesta sessão. NÃO afirme nada clínico ou técnico sem fonte registrada.

Passos:
1. Pesquise na web (fonte primária primeiro: DOU, COFFITO, ANVISA, CFM/CFN quando cabível, PubMed/revisões, documentação do fabricante só como pista) e registre em docs/pesquisa/<tema>.md: fonte, data de acesso (hoje), nível de evidência e "o que NÃO se sabe". Temas:
   a) coffito-toxina-botulinica-e-harmonizacao: Acórdão COFFITO nº 609 (11/05/2023, DOU 17/05/2023) e atos posteriores; condições de habilitação; regras de publicidade do COFFITO (Res. 424/2013 e 532/2021, normas do CREFITO-10/Santa Catarina); uso de "Dr./Dra." e de "especialista/dermato-funcional" por fisioterapeuta (título de especialista, RQE equivalente); atual situação judicial. Pontos já levantados pelo chat de estratégia (conferir, não aceitar): a decisão do TRF1 de 19/08/2026 sobre a Res. CFO 198/2019 não cita fisioterapeutas.
   b) flacidez-pos-emagrecimento: o que a literatura diz sobre flacidez de pele após perda de peso (inclusive após agonistas de GLP-1), o que se sabe de protocolos de rejuvenescimento/tonificação (radiofrequência, ultrassom micro/macrofocado, bioestimuladores, fios), nível de evidência de cada um, e o que NÃO se sabe. Sem citar marca de medicamento no texto de saída.
   c) criolipolise-e-gordura-localizada: evidência e limites de redução de gordura localizada por frio; efeitos adversos; quantas sessões a literatura descreve (para o João validar o que a clínica chama de "Lipocrio da Bia"). NÃO afirme que o Lipocrio da Bia é isso: ele é apenas hipótese; registre "o que é o Lipocrio da Bia: NÃO SE SABE; perguntar".
   d) depilacao-a-led-vs-laser: o que existe de evidência para depilação "definitiva" por LED/luz, a posição regulatória (ANVISA, vigilância sanitária) sobre o termo "definitiva"/"permanente", e o que o fabricante afirma (como pista).
   e) bioestimulador-vs-lifting-vs-fios: diferença técnica e indicação, para as FAQs que a Bia já aborda nos vídeos.
   f) ancora-regional: o que se pode afirmar sobre Lages/Serra Catarinense sem inventar; concorrência local: liste o que achar de clínicas de estética/HOF em Lages, sem comparar nem criticar ninguém no site (uso interno só).
2. Escreva docs/COPY_DECK.md com todo o texto do site em blocos (home, três páginas de serviço, protocolos, /bia, /espaco, /contato, FAQ, rodapé), no tom do CLAUDE.md: direto, adulto, sem hype, frases curtas, 40–60 palavras por resposta de FAQ, termo técnico explicado em uma linha, cada afirmação com fonte do tema correspondente ou marcada [SEM FONTE: genérico e não clínico]. Regras de redação:
   - "toxina botulínica" (não a marca), nenhum nome de medicamento de prescrição, nenhum preço, nenhuma promessa/prazo/número de sessões como garantia, nenhum "antes e depois" no texto, nenhum superlativo, nenhuma marca de equipamento.
   - Reescreva em tom premium o que o cliente disse (claims.ts), SEM reaproveitar as frases promocionais; cada ideia sustentada deve apontar a fonte.
   - Use "Fisioterapeuta" antes do nome; não use "Dra." (o texto vem com o marcador {{tratamento}} para o config decidir).
   - Tempo de atuação: use exatamente "há mais de 15 anos" ({{tempoDeAtuacao}}), ligado à atuação da Bia, no manifesto e em /bia; nunca "desde 20XX". Registre no COPY_DECK, como decisão para a conferência final, de onde vem a contagem (a clínica de fisioterapia é de 2013).
   - Hero: 3 opções (já listadas em src/content/hero.ts).
   - /bia: a história dela em fatos verificáveis: formação (PENDENTE), cursos (PENDENTE), série "Mulheres transformadas" ep. 1 (a transcrição entra quando existir), "Derretimento Facial" e "Seu rosto mais jovem" como termos DELA entre aspas, nunca como promessa.
   - /corpo-e-emagrecimento: eixo "flacidez depois de emagrecer"; sem medicamento por nome; "avaliação" e "acompanhamento".
3. No fim do COPY_DECK, uma lista de NO MÁXIMO 10 decisões objetivas para o João aprovar de uma vez (título do hero, uso de "Dra.", ano de início, nomes de protocolos a publicar, o que é o Lipocrio, "toxina botulínica" vs termo popular em SEO, etc.), cada uma com a recomendação.

Regras: se a fonte não for acessível, escreva "não consegui verificar" e diga como verificar. Nada inventado. Divergência entre fontes: [FONTES DIVERGEM] com o documento que resolve.
Entrega: lista dos arquivos de pesquisa com 3 linhas cada (principal achado, nível de evidência, lacuna) + o COPY_DECK.
Critério de aceite: nenhuma frase clínica no COPY_DECK sem fonte referenciada; audit-compliance (modo texto) roda sobre o COPY_DECK sem termo vetado; ≤ 10 decisões no fim; nenhuma página alterada.
````

---

## PROMPT 6A — Home (seções 2 a 9)

````text
Leia CLAUDE.md, docs/COPY_DECK.md e docs/MARCA.md. Depois dê um plano curto (10 linhas) e implemente.

Tarefa: construir as seções da home após o hero, usando o COPY_DECK e a config.
Escopo: src/pages/index.astro, src/components/home/**. NÃO altere a entrada/hero (sessão 4), as páginas internas (6B/6C) nem a config, exceto leitura.
Estrutura (cada seção com um gesto visual PRÓPRIO; nunca duas seções com a mesma construção):
2. Manifesto (osso, data-tone light): uma frase enorme em display + parágrafo curto, imagem2 numa janela pequena, o tempo de atuação ({{tempoDeAtuacao}} = "há mais de 15 anos", ligado à Bia).
3. Três eixos (musgo): três faixas verticais assimétricas, numeradas 01 Rosto · 02 Corpo · 03 Pele e tecnologia, largura diferente em cada uma, cada faixa revela a mídia correspondente (hover/toque; sem hover = sempre visível) dentro de uma janela em D; link para a página de serviço.
4. Protocolos da Bia (tinta): carrossel horizontal por scroll-snap (CSS puro; setas com botões acessíveis), um painel por protocolo CONFIRMADO (BiaLifting, BiaLips, Lipocrio da Bia), nome em tamanho gigante, "para quem é" e "como é a sessão" lidos do config; campos pendentes viram "a informar" + selo no preview e SOMEM em produção com alerta no build. Protocolos `informado` não aparecem.
5. A Bia (osso): `retrato-bia-vestido` (corpo inteiro) em janela alta, "Fisioterapeuta · CREFITO 183149", {{tratamento}} só se ativo, link para /bia e o vídeo da série em janela vertical (clique para tocar, poster, legendas .vtt se existirem). Link de consulta ao registro (CREFITO/COFFITO) como link externo com rel="noopener".
6. O espaço (musgo): `ambiente-clinica` na janela grande, duas fotos reais/atmosfera nas pequenas, endereço e horário, <MarcadorCauda/> no final.
7. Casos (módulo ligado; mídia de paciente declarada autorizada): mostra pares antes/depois e clipes curtos do manifesto (extraídos de `video-para-presenca-e-profissionalismo` e `corpo-flacidez-pos-emagrecimento` conforme `segmentos`), legenda técnica neutra (procedimento, data do registro quando existir, senão "a informar"), sem promessa nem "resultado garantido", cursor de comparação quando houver par estático. NUNCA na primeira dobra nem como capa. Se não houver mídia utilizável, a seção não existe.
7b. No Google (faixa fina, tom osso ou musgo; gesto próprio, não um carrossel de cartões): a nota em display enorme ("4,8", de avaliacoes.ts), "32 avaliações no Google, conferido em 12/10/2026" em legenda pequena, 3 trechos curtos e literais (só `usavelNoSite:true`; nome + inicial; sem foto, sem estrelas decorativas repetidas) em linhas editoriais, e link "Ver todas no Google" para a ficha do Maps. Sem AggregateRating no schema. Em produção a faixa só existe se a nota estiver conferida há menos de 60 dias (senão aviso de build, não bloqueio).
8. Perguntas (tinta): 6 a 8 perguntas do COPY_DECK, `<details>` nativo, respostas de 40–60 palavras, cada uma com fonte quando clínica; marcação FAQPage fica para a sessão 8.
9. Primeira consulta + contato (musgo): como é a avaliação, botão WhatsApp, horários, endereço, mapa NÃO carregado (só após consentimento, sessão 7: aqui um bloco "Ver no mapa" que leva ao link do Google).
Ritmo geral: alternar claro/escuro/musgo; alturas diferentes; pelo menos uma seção com sobreposição na borda da imagem; legenda editorial em cada seção; nenhum cartão branco com borda fina; nenhum ícone em círculo.

Regras: textos só do COPY_DECK (sem inventar); imagens pelo manifesto; vídeo só no clique; scroll-driven só como melhoria sob @supports; `prefers-reduced-motion` desliga; todos os links e botões com foco visível; âncoras com `scroll-margin`.
Entrega: relatório + capturas das 8 seções em 390/1440 claro/escuro + Lighthouse mobile + JS gzip.
Critério de aceite: build verde (preview); validate-config e audit-compliance rodam sem novos vetados; Lighthouse mobile ≥ 95 em Performance/BP/SEO e 100 em A11y, ou o relatório diz o que falta; nenhuma seção com altura/estrutura repetida; as janelas em D continuam identificáveis em todas as seções que as usam.
````

---

## PROMPT 6B — Páginas de serviço e protocolos

````text
Leia CLAUDE.md, docs/COPY_DECK.md e os componentes de src/components/home.

Tarefa: construir /harmonizacao-facial, /corpo-e-emagrecimento, /pele-e-tecnologia e /protocolos-bia (e uma subpágina por protocolo CONFIRMADO).
Escopo: src/pages/**, src/components/servicos/**. NÃO altere a home, a config nem o COPY_DECK (se faltar texto, escreva em docs/PENDENCIAS.md o que falta).
Cada página tem:
- Abertura editorial própria (cada uma com uma composição diferente de janelas em D), título em display, resumo de 40–60 palavras citável, "Para quem é", "Como é o atendimento" (avaliação → plano → sessões), "O que é importante saber" (limites, contraindicações gerais, sem promessa), FAQ de 3 a 5 perguntas com fonte, CTA WhatsApp neutro, e <MarcadorCauda/>.
- Executor e conselho do serviço lidos do config: se pendentes, cartão "a informar" + selo no preview; em produção a página/serviço some com alerta de build (nunca em silêncio).
Específicas:
- /corpo-e-emagrecimento: eixo "flacidez depois de emagrecer"; o vídeo `corpo-flacidez-pos-emagrecimento` em janela vertical grande, clique para tocar, poster, legendas, e a transcrição em texto abaixo (quando houver; senão slot vazio com aviso). Sem medicamento por nome fora do vídeo. A página não promete número de sessões, prazo ou perda.
- /pele-e-tecnologia: depilação definitiva (aviso de termo regulado no COMPLIANCE), limpeza de pele, rejuvenescimento; imagem5 como atmosfera; tecnologia descrita pela função, nunca por marca.
- /harmonizacao-facial: toxina botulínica, preenchimentos (lábios, sulco nasogeniano), FaceLifting, protocolos BiaLifting e BiaLips; "Derretimento Facial" e "Seu rosto mais jovem" só entre aspas, como termos dela.
- /protocolos-bia: índice dos protocolos confirmados em composição assimétrica (nome gigante, numeração), com link para cada subpágina; protocolos `informado` não aparecem.

Regras: navegação entre páginas com View Transitions apenas como melhoria sob @supports; sem navegação que dependa dela; breadcrumbs reais (HTML); tudo do COPY_DECK; mídia do manifesto.
Entrega: relatório + capturas de cada página em 390/1440 claro/escuro + Lighthouse mobile por página.
Critério de aceite: todas as rotas geram build; nenhum link quebrado (script de verificação de links internos); audit-compliance sem novos vetados; páginas distintas entre si (comparar as capturas); Lighthouse conforme meta ou relatório do que falta.
````

---

## PROMPT 6C — /bia, /espaco, /casos, /contato

````text
Leia CLAUDE.md, docs/COPY_DECK.md e docs/MIDIA_CATALOGO.md.

Tarefa: construir /bia, /espaco, /casos (módulo), /contato e a 404.
Escopo: src/pages/{bia,espaco,casos,contato,404}.astro e src/components correspondentes. NÃO altere a config.
- /bia: abertura editorial com `retrato-bia-vestido` (corpo inteiro) e `retrato-bia-colete` em contraforma menor, "Bianca Cardoso · Fisioterapeuta · CREFITO 183149" (+{{tratamento}} só se ativo), trajetória SÓ com fatos confirmados (formação e cursos pendentes viram "a informar" no preview e somem em produção com alerta), a série "Mulheres transformadas | Espaço B — episódio 1" com o vídeo `mulheres-transformadas-com-bia` em janela vertical (clique, poster, legendas), "Café com Bia" com o vídeo `cafe-com-bia` nas mesmas condições, trechos excluídos aplicados (ver manifesto), e o link de consulta do registro. NÃO use "Dra." nem "especialista" nem "dermato-funcional" se desligados.
- /espaco: o vídeo `ambiente-clinica` em janela grande; galeria de fotos reais (quando existirem; hoje, o clipe e quadros do clipe como poster); atmosfera das imagens geradas rotuladas internamente no manifesto como IA (nunca como foto do espaço); endereço, horário, como chegar (link ao Google, sem mapa carregado), acessibilidade (a informar).
- /casos: galeria de casos com pares antes/depois e clipes curtos do manifesto, legenda técnica neutra (procedimento, data do registro quando existir, executora: Bianca Cardoso), sem promessa; mídia de paciente declarada autorizada (consentimento "declarado-pelo-cliente", `termoArquivado:false` = aviso). NUNCA como capa, og:image ou na primeira dobra da página (a abertura da página usa o texto e uma janela com imagem não-paciente). Nota discreta no fim: "Imagens publicadas com autorização das pacientes. Resultados variam de pessoa para pessoa." (texto a validar na conferência final). A rota só existe se houver mídia utilizável.
- /contato: WhatsApp, horários, endereço, Instagram; formulário NÃO (só WhatsApp e telefone); mensagem pré-preenchida neutra; texto de "como é a primeira consulta"; ver sessão 7 para mapa.
- 404 própria, no estilo do site, com o B e link para a home.
Regras: todo dado de config; nada inventado; vídeo só no clique; foco, teclado e legenda funcionando.
Entrega: relatório + capturas 390/1440 claro/escuro + Lighthouse.
Critério de aceite: build preview verde; `/casos` só existe no dist se houver mídia utilizável e nenhuma imagem de paciente na primeira dobra; audit-compliance sem novos vetados; as páginas usam composições diferentes entre si.
````

---

## PROMPT 7 — Conversão e LGPD

````text
Leia CLAUDE.md.

Tarefa: implementar conversão (WhatsApp, telefone, avaliação), consentimento e privacidade.
Escopo: src/components/{conversao,consentimento}/**, src/pages/{privacidade,avaliar}.astro, src/scripts/consentimento.ts, public/_headers (ou equivalente do deploy), scripts/gerar-csp.mjs. NÃO adicione analytics de terceiros ainda (apenas o gancho).
Passos:
1. WhatsApp: link wa.me/5549999115351 com mensagem neutra "Olá! Gostaria de agendar uma avaliação." (sem sintoma, foto ou dado clínico). Botão fixo no mobile que não cobre conteúdo e some perto do rodapé; rastreio de clique só após consentimento. Telefone com tel:.
2. Banner de consentimento real: Aceitar / Recusar / Personalizar em pé de igualdade; categorias: essenciais (sempre), preferências (tema), mapas/terceiros, estatística; revogável por link permanente no rodapé; estado em localStorage com try/catch e funcionando sem ele. Nenhum script de terceiro, mapa, embed ou fonte externa carrega antes do aceite da categoria.
3. Mapa: iframe do Google Maps (coordenadas -27.8074182, -50.3162505; ficha da Espaço B) só após aceite da categoria "mapas" (senão, link para o Maps). Instagram: link simples, sem embed.
4. /privacidade: política REAL: controlador (razão social; o CNPJ NÃO é exibido por decisão do cliente: registre em COMPLIANCE.md como [DECISÃO HUMANA] se a política de privacidade exige identificação completa do controlador), dados tratados (mensagens WhatsApp, cookies conforme as categorias, logs), finalidades, bases legais, retenção, direitos do titular (LGPD art. 18), canal de contato, encarregado (a informar), terceiros (WhatsApp/Meta, Google Maps), transferência internacional, atualização com data. Termos em linguagem simples. Marcar [DECISÃO HUMANA: revisão jurídica] no COMPLIANCE.md.
5. /avaliar: leva ao Perfil do Google, sem filtro de satisfação, sem brinde, sem incentivo; texto neutro. Use `avaliacaoDiretaUrl` só quando estiver `confirmado`; enquanto for candidato (`informado`), o botão leva à ficha no Maps (`mapsUrl`) e o build avisa. Gerar a plaquinha com QR (print/avaliar.svg e PDF) apontando para o link direto quando ele for confirmado.
6. CSP: gere por hash em build (scripts/gerar-csp.mjs), sem 'unsafe-inline' onde possível; cabeçalhos de segurança (Referrer-Policy, Permissions-Policy, X-Content-Type-Options, HSTS no deploy). Teste que nada quebra com o CSP.
7. Rodapé: nome, endereço, responsável e registro (CREFITO 183149), sem CNPJ, links de privacidade e revogação.

Regras: nenhum formulário coleta dado de saúde; sem pixel antes do aceite; fontes continuam self-hosted.
Entrega: relatório + capturas do banner (390/1440, claro/escuro) + teste mostrando que sem aceite não há requisição de terceiros (lista de requests do Playwright).
Critério de aceite: zero requisições externas antes do aceite; Aceitar/Recusar/Personalizar equivalentes em peso visual; revogação funciona; CSP sem violações no console; build verde.
````

---

## PROMPT 8 — SEO e GEO

````text
Leia CLAUDE.md e docs/ESPACO_B_LEITURA_E_DIRECAO.md (seção 5).

Tarefa: SEO local e GEO.
Escopo: src/components/seo/**, src/config/seo.ts, src/pages/{sitemap,robots,llms}.*, scripts/audit-seo.mjs. NÃO altere copy (se faltar texto citável, anote em PENDENCIAS.md).
Passos:
1. Metadados por página: title (≤ 60), description (≤ 155), canonical, Open Graph e Twitter com imagem OG 1200×630 gerada no build (janela em D + título), lang pt-BR, `hreflang` não necessário.
2. JSON-LD: entidade correta (não usar Physician; usar `BeautySalon`/`MedicalBusiness`/`HealthAndBeautyBusiness` conforme documentação schema.org verificada hoje; justificar em docs/SEO.md), com nome, endereço (Coral), telefone, horários, `geo` -27.8074182, -50.3162505 (confirmado pelo link do Maps do cliente), `name` "Clínica Espaço B" e `alternateName` o descritivo "Clínica Espaço B — Estética e Harmonização Corporal e Facial", `sameAs` (Instagram, URL do Maps), `founder`/`employee` (Person: Bianca Cardoso, jobTitle "Fisioterapeuta", sem credenciais não confirmadas), `areaServed` só Lages e o que for real. NÃO use AggregateRating nem Review no schema (avaliação do próprio negócio não é elegível a rich result e a política do Google deve ser conferida hoje; registre em docs/SEO.md). FAQPage nas páginas com FAQ; BreadcrumbList; WebSite. Valide com o validador do schema.org e registre.
3. NAP idêntico ao do config (nome, endereço com bairro Coral, telefone). O bairro Coral é o confirmado pelo cliente; diretórios listam Sagrado Coração de Jesus para o mesmo CEP: registre em docs/SEO.md e não use o bairro divergente em lugar nenhum. O nome na ficha do Google ("Espaço B - Harmonização Corporal e Facial | Estética em Lages | FaceLifting, Depilação Definitiva, Emagrecimento e HOF.") é um descritivo longo: o schema usa o nome real; registre em docs/SEO.md que o nome do Perfil deve ser o nome real do negócio (as diretrizes do Google costumam vedar palavras-chave no nome; verificar a política vigente) e que o João decide se alinha. Canonical e sitemap usam a variável SITE_URL (domínio ainda não existe); em preview, noindex.
4. sitemap.xml e robots.txt (permitir crawlers de IA que respeitem o site: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot a decidir e documentar), noindex em preview e em rotas `_*`.
5. GEO: cada página de serviço já tem resumo citável de 40–60 palavras no topo e autor/credencial perto do topo; verifique e relate o que falta. llms.txt opcional por custo baixo, SEM prometer efeito (documentar que não é fator de ranking comprovado).
6. docs/SEO.md: consultas-alvo reais por página (ex.: "harmonização facial em Lages", "fisioterapeuta harmonização facial Lages", "flacidez depois de emagrecer", "depilação em Lages"); NÃO crie páginas por bairro/cidade sem conteúdo real. Checklist do Perfil da Empresa no Google (categorias, serviços, fotos reais, link, avaliações reais) para o João executar. Roteiro mensal de teste de presença em ChatGPT, Perplexity e Gemini.
7. scripts/audit-seo.mjs: verifica títulos/descriptions/canonical/OG/JSON-LD/links internos/sitemap em dist/.
Regras: nada de "melhor", "nº 1"; sem avaliações inventadas nem estrelas no schema sem avaliações reais e coletáveis conforme as diretrizes do Google (verificar a política atual).
Entrega: relatório + saída do audit-seo + resultado do validador de schema.
Critério de aceite: audit-seo verde; JSON-LD válido; sitemap com todas as rotas públicas (sem /casos se desligado); noindex presente em preview; build verde.
````

---

## PROMPT 9 — QA, conferência final de compliance e deploy

````text
Leia CLAUDE.md, docs/COMPLIANCE.md, docs/PENDENCIAS.md e docs/pesquisa/*.

Tarefa: auditoria completa, passada ÚNICA de conferência de normas e deploy de preview.
Escopo: scripts/audit-*.mjs, docs/COMPLIANCE.md, docs/MELHORIAS.md, README.md, ajustes de bug. NÃO afrouxe listas, travas ou termos vetados; se algo bloquear, relate e proponha.
Passos:
1. Auditorias: audit-a11y (axe, claro/escuro, 390/1440, teclado e leitor), audit-lighthouse (mobile e desktop, todas as rotas), audit-seo, audit-compliance, audit-contraste, verificação de links, tamanho de JS e de mídia por rota, teste com `prefers-reduced-motion` e sem JavaScript. Corrija o que for bug; relate o que for decisão.
2. Conferência de normas (a passada final do João): para cada item abaixo, pesquise a fonte primária vigente HOJE, registre em docs/pesquisa/final-<n>.md e marque VERIFICADO (data, fonte) / FONTES DIVERGEM / NÃO VERIFICADO / DECISÃO HUMANA. Não altere texto por conta própria: gere em COMPLIANCE.md a tabela "item → situação → o que mudar → quem decide":
   1. Quem executa cada serviço e qual conselho rege (COFFITO para a Bianca; demais conforme equipe).
   2. Fisioterapeuta e toxina botulínica (Acórdão 609/2023: texto oficial, condições, atos posteriores) e a regra de publicidade do COFFITO (preço, promoção, antes/depois, termos, "Dra.", "especialista", "dermato-funcional").
   3. Nomes de medicamentos de prescrição (toxina, agonistas de GLP-1) nos vídeos e nos arquivos; "Club do Botox" e o termo popular "botox" (SEO × norma).
   4. Antes/depois e mídia de paciente (o cliente declara autorização de todas): termos assinados arquivados? data do registro, regras de publicidade do COFFITO sobre antes/depois, módulo /casos, e se a regra "nunca como capa" está cumprida em todas as páginas e no og:image.
   5. Emagrecimento: nutricionista na equipe? medicamento de prescrição? (CFN 856/2026, vigência a verificar).
   6. Preço e promoção; textos de `claims.ts` (cada claim: sustentar com fonte ou deixar fora).
   7. Promessas/superlativos: "resultados duradouros", "ninguém vai saber o segredo", "os rostos mais lindos da Serra Catarinense", "a melhor tecnologia do mundo".
   8. Equipamentos (depilação a LED, laser, aparelho do Lipocrio): marca, modelo, registro ANVISA; "depilação definitiva" como termo.
   9. Imagem de terceiros e de funcionários nos vídeos.
   10. LGPD: política, banner, mapa/embeds, termos de imagem (modelo precisa de revisão jurídica).
   11. CDC (publicidade enganosa) sobre o conjunto.
   12. Coerência de nome/endereço/telefone entre site, Google e Instagram; marca e razão social.
   13. Imagens geradas por IA: confirmar uso só como textura; norma de nutrição se houver nutricionista.
   14. "Há mais de 15 anos": de onde vem a contagem (a clínica de fisioterapia é de 2013; o texto está ligado à atuação da Bia) e se há documento que a sustente (inscrição no CREFITO, diploma).
   15. CNPJ oculto: o COFFITO costuma exigir, para pessoa jurídica, o número do registro da empresa e do responsável técnico na publicidade (norma a verificar no texto vigente), e a LGPD pede identificação do controlador na política de privacidade: [DECISÃO HUMANA].
   16. Crédito e licença das fotos do ensaio (fotógrafo) e dos vídeos.
   17. Nome do Perfil do Google (palavras-chave no nome) e coerência com o nome do site.
   18. Escopo profissional: a Bianca como executora de todos os serviços (toxina, preenchedores, depilação a LED, aparelhos): cada ato dentro das resoluções do COFFITO, com título de especialista se o site disser "dermato-funcional".
   19. Avaliações do Google no site (nota, total e trechos literais com nome e inicial): regra do COFFITO sobre depoimentos na publicidade, consentimento de quem escreveu, política do Google, e atualização periódica da nota (a nota exibida é a de 12/10/2026).
3. Gere docs/COMPLIANCE.md final, docs/MELHORIAS.md (melhorias futuras, fora do caminho da publicação: /historias da série, /avaliar com QR, GA4 com consentimento, blog técnico, schema de reviews quando houver, medições de bibliotecas), README "como criar o próximo site" e docs/DEPLOY.md.
4. Deploy: configure para Vercel (ou Cloudflare Pages) com `engines`/`packageManager` fixados; faça o deploy de PREVIEW (com PREVIEW=1, noindex) na URL gerada pela plataforma, sem domínio próprio (o domínio ainda não existe; deixe docs/DEPLOY.md com o passo a passo para plugar o domínio e trocar SITE_URL), e relate a URL; produção só quando validate-config e audit-compliance passarem sem bloqueio.
5. Capturas finais de TODAS as rotas em 390/1440, claro/escuro, em docs/capturas/final/.

Regras: dizer o que realmente foi executado e visto; nunca declarar sucesso sem número; o que não deu para verificar vira [NÃO VERIFICADO] com instrução de como verificar.
Entrega: relatório curto com: notas de Lighthouse por rota, JS e mídia por rota, lista de bloqueios de produção, tabela de conferência de normas, URL do preview.
Critério de aceite: preview no ar; todas as auditorias rodaram (resultado anexado); COMPLIANCE.md completo; nenhum bloqueio escondido; produção bloqueada somente pelos itens esperados.
````

---

## PROMPT L — Novas mídias (reutilizável; lotes de 4 a 6, vídeos sozinhos ou até 3)

Anexe os arquivos **com uma legenda numerada** ("1 = ensaio-bia-01.jpg …"), ou coloque-os em `media-originais/entrada/` e liste os nomes. Esta sessão só salva, cataloga e trava.

````text
Leia CLAUDE.md e docs/MIDIA_CATALOGO.md.

Tarefa: ingerir o lote de mídia abaixo no repositório. Esta sessão NÃO altera páginas.
Lote (legenda numerada): <1 = nome — o que é — quem aparece — data do registro — termo de imagem (sim/não) — menor de idade (sim/não)>, <2 = ...>
Passos:
1. Salvar cada original em media-originais/ (imagens/ ou videos/ ou marca/) sem modificação; nomes seguros sem dados pessoais.
2. Registrar no media.manifest.json com todos os campos do contexto; paciente → `pacienteRef` (P-NNN), `consentimento` conforme informado; sem termo → `publicavel:false`, `previewOk:true`.
3. Verificar qualidade (resolução vs. uso: o retrato do hero precisa de pelo menos 1600 px no lado maior; vídeo 1080×1920; legenda queimada? identificadores @/nome de paciente? marca de terceiros?) e registrar em `problemas`. Cobertura de identificadores só por recorte/tarja, nunca retoque.
4. Se for o logo vetorial: colocar em media-originais/marca/ e rodar `pnpm brand:extract`; comparar com o provisório e relatar diferenças.
5. Rodar pnpm media:prepare e relatar pesos.
6. Atualizar docs/MIDIA_CATALOGO.md; NÃO publicar em lugar nenhum (o slot em src/config/midia.ts só é trocado se eu pedir).
Entrega: tabela do lote + problemas + o que preciso fornecer.
Critério de aceite: originais intactos (hash igual), manifesto válido, derivados gerados, nenhuma mídia sem termo marcada como publicável.
````

---

## PROMPT D — Chegada de dado pendente (reutilizável)

````text
Leia CLAUDE.md, src/config e docs/PENDENCIAS.md.

Tarefa: aplicar os dados abaixo na config e fechar as pendências correspondentes.
Dados: <campo = valor — fonte (cliente/documento) — estado (confirmado/informado)>
Passos: (1) atualizar src/config com `confirmado()` e a fonte; (2) rodar validate-config e mostrar o antes/depois de PENDENCIAS.md; (3) refazer capturas das páginas afetadas em 390/1440; (4) se o dado altera texto (nome de protocolo, ano, título), atualizar docs/COPY_DECK.md e as páginas SÓ onde houver o marcador; (5) não preencher nenhum outro campo.
Entrega: relatório + diff da config + pendências restantes.
Critério de aceite: build preview verde; as pendências citadas saíram da lista; nenhuma outra mudou sem explicação.
````

Exemplos de uso do Prompt D:
- "avaliacaoDiretaUrl = <link curto do Perfil da Empresa> — João — confirmado"
- "dominio = <domínio> e SITE_URL — João — confirmado"
- "tratamento.dra.ativo = true — João, <data> — confirmado após conferência no COFFITO"
- "protocolos: ElevaFace e LiposemCortes passam a publicar — descrição: <texto do João> — confirmado"
- "equipe: adicionar <nome completo>, <profissão>, <conselho e registro>, <serviços que executa> — João — confirmado; ligar modulos.equipe"

---

## C. Checklist para o João (o que ainda falta, por prioridade)

Já resolvidos: retratos de estúdio e logo em alta (sessão 1), CREFITO, bairro, "há mais de 15 anos", equipe (só a Bianca), CNPJ oculto, vídeos como estão, nota 4,8 e 32 avaliações do Google (transcritas).

1. **Fotos do espaço em alta, com luz de dia** (fachada, recepção, o hall de pé-direito alto com lustre que aparece numa avaliação do Google, salas, sancas, flores). Hoje o espaço só existe como vídeo de 720×1280. Os vídeos entram como estão; versão limpa 1080×1920 e transcrição ficam como melhoria futura.
2. **Link direto de avaliação do Google**: você não conseguiu pegar, então `/avaliar` leva à ficha no Maps. Para pegar: no Perfil da Empresa, "Obter mais avaliações" → copiar o link curto. Candidato derivado do código do Maps, NÃO VERIFICADO: `https://search.google.com/local/writereview?placeid=ChIJQQHGPRof4JQRMrwP-osHZ9E` (se clicar e abrir a caixa de avaliação da Espaço B, está certo).
3. **O que são BiaLifting, BiaLips e Lipocrio da Bia** (técnica, indicação, nº de sessões típico, para quem não serve), e se ElevaFace, LiposemCortes, Redefine e Club do Botox (que vieram do texto do Google/IA) são nomes reais para publicar.
4. **Formação e cursos da Bia** (inclusive toxina) e o papel dela no evento "Euro Science 2026" em Portugal.
5. **"Dra."**: ela usa na série; está desligado por padrão (uma chave só). Liga depois da conferência no COFFITO.
6. **Domínio.** Ainda não existe. Sugestões (disponibilidade NÃO verificada, confira no registro.br): `clinicaespacob.com.br`, `espacob.com.br`, `espacobestetica.com.br`. Enquanto isso o site sobe em URL de preview, com noindex.
7. **Crédito e uso das fotos do ensaio** (quem foi o fotógrafo e se o contrato permite uso no site).
8. **Termos assinados das pacientes** (você disse que todas autorizaram): guarde os termos; o site publica com a declaração do cliente e a conferência final pede os termos arquivados.
