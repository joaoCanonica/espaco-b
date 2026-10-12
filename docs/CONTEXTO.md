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
