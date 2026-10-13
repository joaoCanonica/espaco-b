# Copy deck — Espaço B

Sessão 5 · 13/10/2026 · texto de todas as páginas, para aprovação do João antes da implementação (sessões 6A–6C).

## Como ler

- **Marcadores de fonte:** `[a.1]` = achado 1 de `docs/pesquisa/coffito-toxina-botulinica-e-harmonizacao.md`. Do mesmo jeito: `[b.n]` flacidez · `[c.n]` criolipólise · `[d.n]` depilação · `[e.n]` bioestimulador/fios/toxina · `[f.n]` âncora regional.
- **`[CONFIG]`:** dado confirmado em `src/config/` (endereço, horários, registro…).
- **`[SEM FONTE: genérico e não clínico]`:** frase de tom, sem afirmação clínica.
- **`[PENDENTE]`:** dado do cliente que falta; o bloco não sai sem ele.
- **`[CONDICIONAL]`:** só publicar se a condição for cumprida.
- **Variáveis do config:** `{{tratamento}}` (vazio enquanto `tratamento.dra = false`; nunca escrever a abreviação à mão) · `{{tempoDeAtuacao}}` = "há mais de 15 anos" · `{{nome}}` = Bianca Cardoso · `{{registro}}` = CREFITO 183149 · `{{whatsapp}}`.
- **Regras aplicadas:** "toxina botulínica" e nunca o nome comercial; nenhum medicamento de prescrição; nenhum preço, prazo, número de sessões ou promessa; nenhum superlativo; nenhuma marca de equipamento; nenhuma frase de `claims.ts` reaproveitada.

## Decisão registrada para a conferência final (sessão 9)

**Tempo de atuação.** O texto usa só `{{tempoDeAtuacao}}` = "há mais de 15 anos", **ligado à atuação da Bia**, nunca à clínica e nunca "desde 20XX".

- A clínica de fisioterapia é de dez/2013 (informado, não verificado), o que daria menos de 13 anos em 2026. Então a contagem só se sustenta se vier da formação ou do início da atuação profissional da Bia.
- **Pedir ao João o ano de formação ou registro** para documentar. Se não houver comprovante, trocar por uma frase sem número.

---

## 1. Home

### 1.1 Hero (sessão 4; opções em `src/content/hero.ts`)

- **Legenda:** 01 — Estética integrada · Lages, SC [CONFIG]
- **Título (o João escolhe uma):**
  1. "Rosto e corpo, _um projeto só._" ← em uso
  2. "Rejuvenescimento com método, _não com moda._"
  3. "Aqui cada protocolo tem o nome _de quem o executa._"
- **Assinatura:** Fisioterapeuta {{tratamento}} {{nome}} · {{registro}} [CONFIG]
- **Botões:** "Agendar avaliação pelo WhatsApp" (mensagem: "Olá! Gostaria de agendar uma avaliação.") · "Conhecer os protocolos"

### 1.2 Manifesto (tom osso, imagem2)

> **Frase grande:** Primeiro a gente entende o seu rosto e o seu corpo. Depois decide o que fazer.

> **Parágrafo:** A Bia trabalha com estética {{tempoDeAtuacao}}. Cada atendimento começa por uma avaliação: o que incomoda você, o que a sua pele mostra, o que faz sentido agora e o que pode esperar. Rosto, corpo e pele entram no mesmo plano.

Fontes: tempo de atuação [CONFIG, ver a decisão acima]; avaliação antes do protocolo [SEM FONTE: genérico e não clínico].

### 1.3 Três eixos (tom musgo)

- **01 Rosto.** Harmonização com método: expressão, contorno e qualidade da pele, em doses que respeitam o seu rosto. [SEM FONTE: genérico e não clínico]
- **02 Corpo.** Gordura localizada e flacidez, inclusive depois de emagrecer. Avaliação primeiro, protocolo depois. [b.1]
- **03 Pele e depilação.** Tecnologias para textura, manchas e redução duradoura dos pelos. [d.2] [PENDENTE: lista de tecnologias da pele]

### 1.4 Protocolos da Bia (tom tinta)

- **Abertura:** Três protocolos com o nome de quem os criou e aplica.
- Para cada protocolo: **nome** · "Para quem é" [PENDENTE] · "Como é a sessão" [PENDENTE].
  - BiaLifting [CONFIG: nome confirmado; conteúdo PENDENTE]
  - BiaLips [CONFIG: nome confirmado; conteúdo PENDENTE]
  - Lipocrio da Bia [CONFIG: nome confirmado; **o que é: NÃO SE SABE**; c, Lipocrio]
- Sem descrição técnica até o João mandar o conteúdo de cada um.

### 1.5 A Bia (tom osso)

- **Título:** Fisioterapeuta. Há anos olhando para o mesmo detalhe que você.
  - "Há anos" é genérico, sem número; o número aparece só no manifesto e em /bia.
- **Texto:** {{nome}} é fisioterapeuta ({{registro}}) e responsável técnica do Espaço B. Atende todos os protocolos da clínica. Explica o que funciona, o que não funciona e por quê. [CONFIG]
- **Link:** "Consultar o registro no CREFITO-10" [PENDENTE: URL de consulta pública do CREFITO-10]
- **Botão:** "Conhecer a Bia" → /bia

### 1.6 O espaço (tom musgo, vídeo do ambiente)

- **Título:** O ambiente faz parte do atendimento.
  - Ecoa a legenda do vídeo, que já diz "faz parte do tratamento"; aqui "atendimento", para não prometer efeito.
- **Texto:** Luz quente, sala reservada e tempo para conversar antes de qualquer procedimento. [SEM FONTE: genérico e não clínico]
- **Dados:** Rua Humberto de Campos, 328 · Coral · Lages/SC · seg–sex 9h–12h e 13h30–18h30 · sáb 8h–12h [CONFIG]

### 1.7 Casos (tom osso; módulo `casos`; nunca na primeira dobra)

- **Título:** Casos acompanhados na clínica.
- **Aviso fixo:** Cada pessoa responde de um jeito. Estas imagens mostram casos reais, publicados com autorização, e não indicam o resultado que você vai ter. [a.3]
- **Legenda por caso:** área tratada · protocolo · intervalo entre as imagens [PENDENTE: dados de cada par P-001…P-008]
- A expressão comparativa usual **não** aparece no texto [a.3, FONTES DIVERGEM].

### 1.8 Perguntas (tom tinta)

As FAQs da seção 9 (seleção de 4 na home).

### 1.9 Primeira consulta e contato (tom musgo)

- **Título:** Como é a primeira consulta.
- **Texto:**
  1. Você conta o que incomoda.
  2. A Bia avalia pele, contorno e histórico.
  3. Vocês combinam um plano, ou a conclusão de que não é a hora.
  - Sem compromisso de fechar nada na avaliação. [SEM FONTE: genérico e não clínico] [PENDENTE: confirmar com o João se a avaliação é gratuita ou paga; não citar valor]
- **Botão:** "Agendar avaliação pelo WhatsApp"
- **Mapa:** carregado só depois do consentimento [sessão 7].

---

## 2. /harmonizacao-facial

- **Título:** Harmonização facial com método.
- **Abertura:** Expressão, contorno e qualidade da pele, avaliados juntos. O objetivo é o seu rosto descansado, não um rosto diferente. [SEM FONTE: genérico e não clínico]
- **Bloco "Toxina botulínica"** [CONDICIONAL: só publicar com o **apostilamento de toxina botulínica deferido no CREFITO-10** e o comprovante no config; a1]
  > A toxina botulínica relaxa os músculos que formam as rugas de expressão, como as da testa e entre as sobrancelhas. O efeito é temporário: os estudos descrevem em geral de 3 a 5 meses, e depois o músculo volta a trabalhar. [e.3] [mecanismo: e.3 marcado "para verificar" na bula]
- **Bloco "Preenchimentos"** [CONDICIONAL: base COFFITO para preenchimento por fisioterapeuta **não pesquisada nesta sessão**; verificar antes de publicar]
  > Texto só depois da verificação.
- **Bloco "BiaLifting" e "BiaLips"** → ver /protocolos-bia.
- **"Derretimento facial"** (subtítulo explicado):
  > A Bia chama de "Derretimento Facial" a sensação de que o rosto perdeu sustentação. Isso pode acontecer, por exemplo, depois de emagrecer muito, quando o rosto perde volume e a pele fica mais flácida. A avaliação mostra o que está por trás em cada caso. [b.1] [e.5]
- **Fecho:** Fisioterapeuta {{nome}} · {{registro}} · responsável técnica [CONFIG]

## 3. /corpo-e-emagrecimento

- **Título:** Flacidez depois de emagrecer.
- **Abertura:** Emagrecer muito pode deixar a pele com menos sustentação, no rosto e no corpo. Não é falta de cuidado: é a pele se adaptando a um volume menor. [b.1]
- **Bloco "O que a avaliação define":**
  > Quanto da flacidez é pele, quanto é gordura localizada e quanto é músculo. Flacidez acentuada costuma ser caso cirúrgico; nesse caso a Bia diz isso na avaliação e orienta você a procurar um cirurgião plástico. [b.2]
- **Bloco "Tecnologias para firmeza":**
  > Há tecnologias que aquecem camadas da pele para estimular firmeza. Elas têm mais estudos no rosto e no pescoço do que no corpo. Por isso a indicação é individual e o acompanhamento mostra se vale continuar. [b.3] [b.4] [PENDENTE: quais tecnologias a clínica usa]
- **Bloco "Gordura localizada":**
  > O frio controlado é uma das técnicas estudadas para reduzir gordura localizada, com medições feitas cerca de três meses depois. Não substitui a perda de peso. Pode ter efeitos colaterais, a maioria leves e passageiros, e existe um efeito raro em que a gordura aumenta na área tratada. [c.1] [c.2]
  - [CONDICIONAL: só publicar ligado ao Lipocrio da Bia **depois** que o João confirmar a tecnologia; c, Lipocrio]
- **Bloco "Acompanhamento":**
  > Quem está emagrecendo com acompanhamento médico continua com o seu médico. A Bia cuida da pele e do contorno, em conversa com o tratamento que você já faz. [SEM FONTE: genérico e não clínico]
- **Vídeo:** "corpo-flacidez-pos-emagrecimento" (clique para tocar) [flagFinal no manifesto: o vídeo cita medicamento na legenda; decidir na sessão 9].

## 4. /pele-e-laser (pele e depilação)

- **Título:** Pele e depilação.
- **Depilação:**
  > A depilação com luz reduz a quantidade de pelos ao longo das sessões. A redução varia com a área, a cor e a espessura do pelo e com o seu ciclo de crescimento. Por isso a avaliação vem antes da primeira sessão. [d.2] [d.3]
  - **Rótulo do serviço:** "Depilação com luz: redução duradoura dos pelos" [d.1] [d.5]. Ver a decisão 6.
- **Pele:** [PENDENTE: tecnologias e indicações de pele (limpeza de pele, laser de rejuvenescimento); sem texto até o João mandar a lista]
  - Limpeza de pele: "Limpeza profunda, com extração e cuidado com a barreira da pele." [SEM FONTE: genérico e não clínico]

## 5. /protocolos-bia

- **Título:** Protocolos com nome.
- **Abertura:** Cada protocolo junta técnicas que a Bia escolheu e ordena do mesmo jeito para quem tem a mesma indicação. O nome é dela; a indicação é sua, definida na avaliação. [SEM FONTE: genérico e não clínico]
- **Estrutura de cada protocolo** (BiaLifting, BiaLips, Lipocrio da Bia): Para quem é [PENDENTE] · Como é a sessão [PENDENTE] · O que esperar [PENDENTE, sem prazo nem número] · Quem aplica: Fisioterapeuta {{nome}} [CONFIG].
- **Não publicar:** ElevaFace, LiposemCortes, Redefine e o "Club" (nomes informados, não confirmados) [CONFIG].

## 6. /bia

- **Título:** {{nome}}. Fisioterapeuta.
- **Abertura:** A Bia trabalha com estética {{tempoDeAtuacao}}. É a responsável técnica do Espaço B, em Lages, e atende todos os protocolos da clínica. [CONFIG] [ver a decisão do tempo de atuação]
- **Formação:** [PENDENTE: curso, instituição, ano]
- **Cursos e habilitações:** [PENDENTE: lista com instituição e ano; habilitação para toxina botulínica no CREFITO-10 (a1); título de especialista/RQE se houver (a5)]
- **Registro:** {{registro}} · "Consultar no CREFITO-10" [PENDENTE: link]
- **Como ela fala do trabalho** (termos dela, entre aspas, nunca como promessa):
  - "Derretimento Facial": o nome que ela dá à perda de sustentação do rosto. [e.5]
  - "Seu rosto mais jovem": título que ela usa nos conteúdos. Aqui é só o nome do conteúdo, sem promessa de resultado.
- **Série "Mulheres transformadas", ep. 1:**
  - Texto: No primeiro episódio da série que ela grava na clínica, a Bia conta a própria história.
  - [PENDENTE: transcrição revisada do vídeo; o nome da série é título queimado, e o texto do site não usa "transformação"]
- **"Café com Bia":** Conversas curtas sobre o que aparece no consultório. [CONDICIONAL: só o trecho liberado pelo João; manifesto, sessão 1]

## 7. /espaco

- **Título:** O Espaço B.
- **Texto:** Uma clínica no bairro Coral, em Lages. Salas reservadas, luz quente e uma recepção para você chegar com calma. [CONFIG] [SEM FONTE: genérico e não clínico]
- **Vídeo:** "o-espaco" (janela baixa do B).
- **Lages:** Lages é a principal cidade da Serra Catarinense, com cerca de 165 mil habitantes (Censo 2022). [f.1] [f.2]
  - **Opcional**; só se o João quiser âncora regional; sem "referência" nem ranking.

## 8. /contato

- **Título:** Agende a sua avaliação.
- **Dados:** WhatsApp {{whatsapp}} · Rua Humberto de Campos, 328 · Coral · Lages/SC · CEP 88508-190 · Instagram @clinica.espacob [CONFIG]
- **Horários:** segunda a sexta, 9h–12h e 13h30–18h30 · sábado, 8h–12h · domingo, fechado [CONFIG]
- **Mapa:** "Ver no mapa" (carrega só depois do consentimento; sessão 7).
- **Avaliações:** "Nota 4,8 no Google, em 32 avaliações (conferido em 12/10/2026)." + trechos `usavelNoSite` + "Ver no Google" [CONFIG: avaliações]

## 9. FAQ (40–60 palavras cada)

1. **O que é a avaliação e por que ela vem antes de tudo?** (45 palavras)
   > Na avaliação, a Bia ouve o que incomoda você, examina pele, contorno e histórico e explica o que faz sentido agora. Às vezes a conclusão é esperar ou procurar outro profissional. Só depois disso vocês combinam um plano, sem compromisso de fechar nada na hora.
   - [SEM FONTE: genérico e não clínico]
2. **Por que a pele fica flácida depois de emagrecer?** (45 palavras)
   > Quando o volume diminui rápido, a pele precisa se adaptar a uma área menor, e nem sempre recupera a firmeza. No rosto, os estudos mostram perda de volume no meio da bochecha e flacidez no pescoço. O quanto isso acontece varia de pessoa para pessoa.
   - [b.1]
3. **Tecnologia para firmeza funciona no corpo?** (49 palavras)
   > Há tecnologias que aquecem camadas da pele para estimular firmeza. Os estudos são mais numerosos no rosto e no pescoço; no corpo, a evidência ainda é menor. Flacidez acentuada costuma ser caso cirúrgico. Na avaliação, a Bia diz com franqueza se vale tentar ou se o caminho é outro.
   - [b.2] [b.3] [b.4]
4. **Bioestimulador ou fios: qual a diferença?** (51 palavras)
   > O bioestimulador é uma substância injetada que estimula o colágeno da própria pele; o efeito aparece aos poucos e dura meses, conforme o produto. Os fios absorvíveis dão sustentação logo depois da aplicação, mas a duração no longo prazo ainda é pouco estudada. A escolha depende do que a avaliação mostrar.
   - [e.1] [e.2]
   - [CONDICIONAL: só publicar se a Bia oferece esses procedimentos com habilitação conferida]
5. **Quanto tempo dura a toxina botulínica?** (45 palavras)
   > O efeito é temporário. Os estudos descrevem, em geral, de 3 a 5 meses para as rugas de expressão da testa e entre as sobrancelhas, variando com a área e a dose. Depois disso o músculo volta a trabalhar, e a aplicação pode ser repetida.
   - [e.3]
   - [CONDICIONAL: apostilamento no CREFITO-10, a1]
6. **A redução de gordura por frio substitui a perda de peso?** (47 palavras)
   > Não. Ela é estudada para gordura localizada, em quem já está perto do peso que deseja, com medições feitas cerca de três meses depois. Pode ter efeitos colaterais, quase sempre leves, e existe um efeito raro em que a gordura aumenta. Por isso a indicação é individual.
   - [c.1] [c.2]
7. **A depilação com luz é para sempre?** (49 palavras)
   > Ela reduz bastante a quantidade de pelos, e essa redução costuma durar, mas não elimina todos os pelos de forma permanente. O resultado varia com a área, a cor e a espessura do pelo. Algumas pessoas precisam de manutenção. A avaliação define o plano e o intervalo entre sessões.
   - [d.1] [d.2] [d.3]
8. **O que a Bia chama de "Derretimento Facial"?** (49 palavras)
   > É o nome que ela dá à sensação de que o rosto perdeu sustentação: contorno menos marcado, bochechas mais baixas, pescoço mais flácido. Pode aparecer com a idade ou depois de emagrecer muito. Não é um diagnóstico: é o ponto de partida para a avaliação entender o que mudou.
   - [b.1] [e.5]
9. **Quem faz os procedimentos?** (43 palavras)
   > Todos os atendimentos são feitos pela fisioterapeuta Bianca Cardoso, CREFITO 183149, responsável técnica do Espaço B. Cada procedimento segue a habilitação reconhecida pelo conselho da profissão, e você pode consultar o registro dela no site do CREFITO. Se tiver dúvida, pergunte na avaliação.
   - [CONFIG] [a.1] [a.5]

## 10. Rodapé

- Espaço B · Clínica Espaço B — Estética e Harmonização Corporal e Facial [CONFIG]
- Responsável técnica: Fisioterapeuta {{nome}} · {{registro}} [CONFIG]
- Rua Humberto de Campos, 328 · Coral · Lages/SC · CEP 88508-190 [CONFIG]
- WhatsApp {{whatsapp}} · Instagram @clinica.espacob [CONFIG]
- **Aviso:** As informações deste site são educativas e não substituem a avaliação individual. Cada pessoa responde de um jeito aos procedimentos. [a.3]
- Política de privacidade (sessão 7) · Seletor de tema
- **Sem CNPJ** (decisão do João).

---

## Decisões para o João (aprovar de uma vez)

1. **Título do hero.** Recomendo a opção 1, "Rosto e corpo, um projeto só." É a mais curta e a única que fala do posicionamento integrado.
2. **Forma de tratamento abreviada de doutora antes do nome** (`{{tratamento}}`). Recomendo **manter desligada** até uma resposta escrita do CREFITO-10. As fontes divergem e o Código de Ética veda títulos não reconhecidos [a.4].
3. **Tempo de atuação.** Recomendo manter "há mais de 15 anos" **só se o João mandar o ano de formação ou registro da Bia** que sustente a conta. Sem isso, trocar por uma frase sem número.
4. **Habilitação para toxina botulínica.** Recomendo **não publicar** o bloco de toxina até o João mandar o comprovante de **apostilamento deferido no CREFITO-10**. O próprio sistema COFFITO condiciona a divulgação a ele [a.1].
5. **O que é o Lipocrio da Bia.** Recomendo que o João confirme a tecnologia, o aparelho e o registro ANVISA. Até lá, o protocolo aparece só pelo nome, sem descrição.
6. **"Depilação definitiva."** Recomendo usar no site "depilação com luz: redução duradoura dos pelos" e manter "definitiva" fora dos títulos [d.1, d.5]. A ficha do Google pode ficar como está até a conferência final.
7. **Termo de busca da toxina.** Recomendo **"toxina botulínica" no texto visível** e nunca o nome comercial popular. O termo popular só pode entrar, se entrar, na conferência de SEO da sessão 8, com parecer.
8. **Protocolos publicados.** Recomendo publicar só **BiaLifting, BiaLips e Lipocrio da Bia** (confirmados) e deixar ElevaFace, LiposemCortes, Redefine e o "Club" fora até confirmação.
9. **Preenchimentos e bioestimuladores.** Recomendo **não publicar** até conferir a base COFFITO para esses atos por fisioterapeuta. Não foi pesquisado nesta sessão, só a toxina [a.1].
10. **Casos (módulo).** Recomendo publicar os pares **com o aviso fixo de variação de resultado** e o termo de consentimento arquivado. Além disso, pedir ao CREFITO-10 a leitura atual sobre comparação de imagens [a.3, FONTES DIVERGEM].
