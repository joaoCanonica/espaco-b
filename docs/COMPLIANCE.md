# Compliance (gerado)

Gerado por `scripts/audit-compliance.mjs` em 2026-10-13 · modo preview/dev · HTML de `dist/`.
Não editar à mão: rode `pnpm audit-compliance` (ou o build). Termos em `src/config/termos.ts`.

**Bloqueios: 0** · avisos: 90 · exceções: 0

## Decisões humanas (manual; preservado pelo gerador)

<!-- decisoes:inicio -->

- **[DECISÃO HUMANA: revisão jurídica] Política de privacidade** (`/privacidade`, sessão 7, 13/10/2026).
  - O texto foi escrito em linguagem simples a partir de `docs/pesquisa/lgpd-privacidade.md`. Os artigos da LGPD vieram de trechos e de cópias, não do texto integral do Planalto.
  - Precisa de revisão por advogado antes de produção. Pontos a revisar:
    - bases legais (art. 7º, V e IX; art. 8º, § 2º; art. 11, II, "f");
    - transferência internacional (art. 33);
    - incisos do art. 18;
    - prazos de guarda (WhatsApp e logs: a informar);
    - encarregado (art. 41: a informar).
- **[DECISÃO HUMANA] Identificação do controlador sem CNPJ.**
  - O João decidiu que o CNPJ não aparece no site.
  - A política identifica o controlador pelo nome descritivo e pelo endereço. A razão social ("Clinica de Estetica Espaco B Ltda") ainda é `informado`: aparece com selo no preview e some em produção com alerta.
  - Decidir com o jurídico se a LGPD (art. 9º, III: identificação do controlador) e o CDC exigem a identificação completa (razão social + CNPJ) na política. Se exigirem, a decisão do João precisa ser revista ou ter uma exceção só para a política.
- **[DECISÃO HUMANA] Link direto de avaliação do Google.**
  - `avaliacaoDiretaUrl` é candidato (`informado`). Enquanto não for testado e confirmado, `/avaliar` e a plaquinha QR levam à ficha no Google Maps, e a plaquinha sai marcada PROVISÓRIO.
- **Hospedagem e cabeçalhos (resolvido na sessão 9).**
  - Deploy na Vercel. Os cabeçalhos de `public/_headers` foram portados para `vercel.json`: CSP de `frame-ancestors`/`base-uri`/`object-src`/`form-action`, HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options e COOP.
  - A CSP por hash segue no `<meta>` de cada página.

### Conferência de normas — passada única (sessão 9, 13/10/2026)

Detalhe e fontes em `docs/pesquisa/final-01.md` … `final-19.md`.
- Pesquisa feita por busca na web; os sites oficiais (coffito.gov.br, planalto, Google) não abrem por fetch neste ambiente.
- Onde o texto integral não foi lido, a situação diz NÃO VERIFICADO ou FONTES DIVERGEM.
- **Nenhum texto do site foi alterado nesta passada.**

| # | Item | Situação | O que mudar | Quem decide |
|---|---|---|---|---|
| 1 | Executor e conselho de cada serviço | VERIFICADO no repositório (13/10/2026): Bianca Cardoso, fisioterapeuta, CREFITO 183149, em todas as páginas · NÃO VERIFICADO no CREFITO | Confirmar o registro completo com a região (SC = CREFITO-10?) e a situação ativa na consulta pública; não inferir | João |
| 2 | Toxina (609/2023 → 837/2025) e publicidade do COFFITO | FONTES DIVERGEM / NÃO VERIFICADO (texto integral do 837/2025) | O site não cita toxina (conferido). Antes de citar: certificado da Bia conforme os incisos VII e VIII novos. Preço e promoção: o site não tem. "Dra.", "especialista" e "dermato-funcional": ausentes | João + Bia |
| 3 | Medicamento de prescrição em vídeo/arquivo; "Club do Botox"; "botox" | DECISÃO HUMANA | **A legenda queimada de `usou-monjauro-corpo-flacido` cita medicamento de prescrição (0–2 s), e o vídeo está em /corpo-e-emagrecimento.** Proposta: `trim` de 0–2 s. "Botox" é marca registrada (TRF3/INPI) e segue vetado; "Club do Botox" fora | João |
| 4 | Antes/depois e mídia de paciente | FONTES DIVERGEM (Res. 424/2013 × cartilha CREFITO-7 2025) · "nunca como capa" VERIFICADO por script em todas as páginas e no og:image | Arquivar os termos assinados, com data, por pacienteRef; decidir se /casos fica no ar | João + jurídico |
| 5 | Emagrecimento: nutricionista? medicamento? | VERIFICADO: não há nutricionista; o site não oferta dieta nem medicamento · CFN 856/2026 existe; vigência NÃO VERIFICADA | Avaliar o nome "Corpo e emagrecimento" × "Corpo e contorno" | João |
| 6 | Preço, promoção, claims.ts | VERIFICADO: 0 de 15 claims publicados; nenhum tem fonte | Manter todos fora | João |
| 7 | Promessas e superlativos | VERIFICADO por script: nenhum no HTML | Títulos queimados em vídeo ("transformadas") ficam fora do script: aceitar ou cortar | João |
| 8 | Equipamentos (marca/modelo/ANVISA); "depilação definitiva" | NÃO VERIFICADO: `registroAnvisa` pendente nos 3 aparelhos · "definitiva" só na URL do Maps | Enviar marca, modelo e nº ANVISA (foto da etiqueta). Marca nunca no site | João |
| 9 | Terceiros e funcionários nos vídeos | DECISÃO HUMANA | Autorização de imagem da pessoa da equipe (de costas no vídeo de bastidores); ouvir `cafe-com-bia` | João |
| 10 | LGPD | VERIFICADO (técnico, testar-privacidade) · DECISÃO HUMANA (jurídico) | Revisão da /privacidade por advogado; encarregado; prazos | João + advogado |
| 11 | CDC no conjunto | VERIFICADO com ressalvas | Clipes de 1,3 s, data da nota do Google, escopo do BiaLips | João |
| 12 | NAP e razão social | VERIFICADO no site (audit-seo) · NÃO VERIFICADO no Google e no Instagram ao vivo | Comparar a ficha e o perfil com o rodapé; confirmar a razão social no cartão CNPJ | João |
| 13 | Imagens de IA e norma de nutrição | VERIFICADO: IA só como textura (manifesto) | Nada; `imagem4` (frascos) só como textura | — |
| 14 | "Há mais de 15 anos" | DECISÃO HUMANA: sem documento | Comprovar pela data de inscrição no CREFITO ou da formatura | João |
| 15 | CNPJ oculto × registro da PJ no CREFITO e controlador LGPD | DECISÃO HUMANA | Levantar o registro da empresa no CREFITO-10 (campo novo, não é o CNPJ); o jurídico decide a política | João + jurídico |
| 16 | Crédito e licença de fotos e vídeos | DECISÃO HUMANA: dados ausentes | Crédito do fotógrafo e cessão de direitos; trilhas sem licença seguem mudas | João |
| 17 | Nome do Perfil do Google | VERIFICADO (diretriz do Google: nome real, sem palavras-chave) | Renomear para "Espaço B" (risco de suspensão; "Definitiva" e "HOF") | João |
| 18 | Escopo da Bianca por ato; título de especialista | NÃO VERIFICADO (criolipólise, LED, laser, preenchimento, FaceLifting) | Certificados e descrição de cada ato; "especialista" só com título no CREFITO | João + Bia |
| 19 | Avaliações do Google no site | DECISÃO HUMANA | **A diretriz do Google pede o consentimento do autor para usar a avaliação no site.** Opção A (sugerida): só nota e total + link. Opção B: pedir consentimento a cada autor | João |

### Bloqueios de produção

- **Trava automática (validate-config + audit-compliance em modo produção):** 0 bloqueios. Ela só cobre os 5 itens do CLAUDE.md (registro profissional, WhatsApp real, termo vetado, mídia sem consentimento, paciente em capa), e os 5 estão satisfeitos.
- **Trava operacional:** na Vercel, `PREVIEW=1` também está definido no alvo *production*. Nada sai sem noindex até o João removê-lo (ver `docs/DEPLOY.md`). Sem `SITE_URL`, o build também fica noindex.
- **Itens que esta auditoria recomenda resolver ANTES de remover o `PREVIEW=1`** (não estão na trava de código, porque o CLAUDE.md manda tratar como aviso e o Code não muda a trava sem ordem):
  1. legenda com medicamento de prescrição em `usou-monjauro-corpo-flacido` (#3);
  2. trechos de avaliações sem consentimento dos autores (#19);
  3. registro da PJ no CREFITO / RT na publicidade (#15);
  4. revisão jurídica da /privacidade (#10);
  5. termos de imagem das pacientes arquivados (#4);
  6. domínio e `SITE_URL`.

<!-- decisoes:fim -->

## Bloqueios (travam produção)

Nenhum.

## Avisos (termos regulados: conferir na sessão 9)

| Termo | Origem | Arquivo | Linha | Trecho | Status |
| --- | --- | --- | --- | --- | --- |
| fisioterapeuta | html | `dist/404.html` | 18 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/_sistema/index.html` | 34 | Fisioterapeuta Bianca Cardoso | aviso |
| desconto | html | `dist/avaliar/index.html` | 1 | oa ou ruim; não há brinde nem desconto por avaliação. | aviso |
| desconto | html | `dist/avaliar/index.html` | 1 | oa ou ruim; não há brinde nem desconto por avaliação. | aviso |
| desconto | html | `dist/avaliar/index.html` | 1 | oa ou ruim; não há brinde nem desconto por avaliação. | aviso |
| desconto | html | `dist/avaliar/index.html` | 19 | A clínica não oferece brinde, desconto nem qualquer vantagem em troc | aviso |
| fisioterapeuta | html | `dist/avaliar/index.html` | 19 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/bia/index.html` | 1 | Bianca Cardoso, fisioterapeuta · Espaço B, Lages | aviso |
| fisioterapeuta | html | `dist/bia/index.html` | 1 | Bianca Cardoso, fisioterapeuta (CREFITO 183149), responsável | aviso |
| fisioterapeuta | html | `dist/bia/index.html` | 1 | Bianca Cardoso, fisioterapeuta · Espaço B, Lages | aviso |
| fisioterapeuta | html | `dist/bia/index.html` | 1 | Bianca Cardoso, fisioterapeuta (CREFITO 183149), responsável | aviso |
| fisioterapeuta | html | `dist/bia/index.html` | 1 | Bianca Cardoso, fisioterapeuta · Espaço B, Lages: imagem com | aviso |
| fisioterapeuta | html | `dist/bia/index.html` | 1 | Bianca Cardoso, fisioterapeuta · Espaço B, Lages | aviso |
| fisioterapeuta | html | `dist/bia/index.html` | 1 | Bianca Cardoso, fisioterapeuta (CREFITO 183149), responsável | aviso |
| fisioterapeuta | html | `dist/bia/index.html` | 24 | Bianca Cardoso. Fisioterapeuta. | aviso |
| fisioterapeuta | html | `dist/bia/index.html` | 24 | Bianca Cardoso · Fisioterapeuta · CREFITO 183149 | aviso |
| fisioterapeuta | html | `dist/bia/index.html` | 24 | Bianca Cardoso, fisioterapeuta, retrato de corpo inteiro | aviso |
| fisioterapeuta | html | `dist/bia/index.html` | 24 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/casos/index.html` | 23 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/contato/index.html` | 24 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/corpo-e-emagrecimento/index.html` | 1 | eiro, protocolo depois, com a fisioterapeuta Bianca Cardoso. | aviso |
| fisioterapeuta | html | `dist/corpo-e-emagrecimento/index.html` | 1 | eiro, protocolo depois, com a fisioterapeuta Bianca Cardoso. | aviso |
| fisioterapeuta | html | `dist/corpo-e-emagrecimento/index.html` | 1 | eiro, protocolo depois, com a fisioterapeuta Bianca Cardoso. | aviso |
| fisioterapeuta | html | `dist/corpo-e-emagrecimento/index.html` | 24 | Fisioterapeuta Bianca Cardoso · CREFITO 1831 | aviso |
| fisioterapeuta | html | `dist/corpo-e-emagrecimento/index.html` | 24 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/espaco/index.html` | 24 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/harmonizacao-facial/index.html` | 1 | pele avaliados juntos, com a fisioterapeuta Bianca Cardoso. | aviso |
| fisioterapeuta | html | `dist/harmonizacao-facial/index.html` | 1 | pele avaliados juntos, com a fisioterapeuta Bianca Cardoso. | aviso |
| fisioterapeuta | html | `dist/harmonizacao-facial/index.html` | 1 | pele avaliados juntos, com a fisioterapeuta Bianca Cardoso. | aviso |
| fisioterapeuta | html | `dist/harmonizacao-facial/index.html` | 24 | Bianca Cardoso, fisioterapeuta | aviso |
| toxina botulínica | html | `dist/harmonizacao-facial/index.html` | 24 | Toxina botulínica | aviso |
| toxina botulínica | html | `dist/harmonizacao-facial/index.html` | 24 | A toxina botulínica relaxa os músculos que formam | aviso |
| toxina botulínica | html | `dist/harmonizacao-facial/index.html` | 24 | blicar com o apostilamento de toxina botulínica deferido no CREFITO-10 (a1) | aviso |
| preenchimento | html | `dist/harmonizacao-facial/index.html` | 24 | Preenchimentos: lábios e sulco nasogeniano | aviso |
| preenchimento | html | `dist/harmonizacao-facial/index.html` | 24 | Bloco "Preenchimentos" | aviso |
| preenchimento | html | `dist/harmonizacao-facial/index.html` | 24 | ONDICIONAL: base COFFITO para preenchimento por fisioterapeuta não pesqui | aviso |
| fisioterapeuta | html | `dist/harmonizacao-facial/index.html` | 24 | OFFITO para preenchimento por fisioterapeuta não pesquisada; texto só depo | aviso |
| toxina botulínica | html | `dist/harmonizacao-facial/index.html` | 24 | Quanto tempo dura a toxina botulínica? | aviso |
| toxina botulínica | html | `dist/harmonizacao-facial/index.html` | 24 | apostilamento de toxina botulínica deferido no CREFITO-10 (a1) | aviso |
| bioestimulador | html | `dist/harmonizacao-facial/index.html` | 24 | Bioestimulador ou fios: qual a diferença? | aviso |
| bioestimulador | html | `dist/harmonizacao-facial/index.html` | 24 | O bioestimulador é uma substância injetada que | aviso |
| fisioterapeuta | html | `dist/harmonizacao-facial/index.html` | 24 | atendimentos são feitos pela fisioterapeuta Bianca Cardoso, CREFITO 18314 | aviso |
| fisioterapeuta | html | `dist/harmonizacao-facial/index.html` | 24 | Fisioterapeuta Bianca Cardoso · CREFITO 1831 | aviso |
| fisioterapeuta | html | `dist/harmonizacao-facial/index.html` | 24 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/index.html` | 1 | C): rosto, corpo e pele com a fisioterapeuta Bianca Cardoso, CREFITO 18314 | aviso |
| fisioterapeuta | html | `dist/index.html` | 1 | C): rosto, corpo e pele com a fisioterapeuta Bianca Cardoso, CREFITO 18314 | aviso |
| fisioterapeuta | html | `dist/index.html` | 1 | C): rosto, corpo e pele com a fisioterapeuta Bianca Cardoso, CREFITO 18314 | aviso |
| fisioterapeuta | html | `dist/index.html` | 22 | Fisioterapeuta Bianca Cardoso · CREFITO 1831 | aviso |
| fisioterapeuta | html | `dist/index.html` | 22 | Bianca Cardoso, fisioterapeuta, em retrato de estúdio | aviso |
| fisioterapeuta | html | `dist/index.html` | 22 | Bianca Cardoso, fisioterapeuta, em retrato de estúdio | aviso |
| fisioterapeuta | html | `dist/index.html` | 22 | Fisioterapeuta. Há anos olhando para o mesmo | aviso |
| fisioterapeuta | html | `dist/index.html` | 22 | Fisioterapeuta · CREFITO 183149 | aviso |
| fisioterapeuta | html | `dist/index.html` | 22 | Bianca Cardoso é fisioterapeuta (CREFITO 183149) e responsáve | aviso |
| laser | html | `dist/index.html` | 22 | Journal of Cosmetic and Laser Therapy, 2022 (revisão sistem | aviso |
| fisioterapeuta | html | `dist/index.html` | 22 | atendimentos são feitos pela fisioterapeuta Bianca Cardoso, CREFITO 18314 | aviso |
| fisioterapeuta | html | `dist/index.html` | 22 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/pele-e-laser/index.html` | 15 | Fisioterapeuta Bianca Cardoso | aviso |
| laser | html | `dist/pele-e-tecnologia/index.html` | 24 | Journal of Cosmetic and Laser Therapy, 2022 (revisão sistem | aviso |
| laser | html | `dist/pele-e-tecnologia/index.html` | 24 | Journal of Cosmetic and Laser Therapy, 2022 (revisão sistem | aviso |
| laser | html | `dist/pele-e-tecnologia/index.html` | 24 | Journal of Cosmetic and Laser Therapy, 2022 (revisão sistem | aviso |
| laser | html | `dist/pele-e-tecnologia/index.html` | 24 | Journal of Cosmetic and Laser Therapy, 2022 (revisão sistem | aviso |
| fisioterapeuta | html | `dist/pele-e-tecnologia/index.html` | 24 | atendimentos são feitos pela fisioterapeuta Bianca Cardoso, CREFITO 18314 | aviso |
| depilação definitiva | html | `dist/pele-e-tecnologia/index.html` | 24 | Depilação definitiva · Limpeza de pele · Rejuvenes | aviso |
| fisioterapeuta | html | `dist/pele-e-tecnologia/index.html` | 24 | Fisioterapeuta Bianca Cardoso · CREFITO 1831 | aviso |
| fisioterapeuta | html | `dist/pele-e-tecnologia/index.html` | 24 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/privacidade/index.html` | 20 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialifting/index.html` | 1 | em Lages (SC), aplicado pela fisioterapeuta Bianca Cardoso. A indicação é | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialifting/index.html` | 1 | em Lages (SC), aplicado pela fisioterapeuta Bianca Cardoso. A indicação é | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialifting/index.html` | 1 | em Lages (SC), aplicado pela fisioterapeuta Bianca Cardoso. A indicação é | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialifting/index.html` | 26 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialifting/index.html` | 26 | atendimentos são feitos pela fisioterapeuta Bianca Cardoso, CREFITO 18314 | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialifting/index.html` | 26 | Fisioterapeuta Bianca Cardoso · CREFITO 1831 | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialifting/index.html` | 26 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialips/index.html` | 1 | em Lages (SC), aplicado pela fisioterapeuta Bianca Cardoso. A indicação é | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialips/index.html` | 1 | em Lages (SC), aplicado pela fisioterapeuta Bianca Cardoso. A indicação é | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialips/index.html` | 1 | em Lages (SC), aplicado pela fisioterapeuta Bianca Cardoso. A indicação é | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialips/index.html` | 26 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialips/index.html` | 26 | atendimentos são feitos pela fisioterapeuta Bianca Cardoso, CREFITO 18314 | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialips/index.html` | 26 | Fisioterapeuta Bianca Cardoso · CREFITO 1831 | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/bialips/index.html` | 26 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/index.html` | 24 | atendimentos são feitos pela fisioterapeuta Bianca Cardoso, CREFITO 18314 | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/index.html` | 24 | Fisioterapeuta Bianca Cardoso · CREFITO 1831 | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/index.html` | 24 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/lipocrio-da-bia/index.html` | 1 | em Lages (SC), aplicado pela fisioterapeuta Bianca Cardoso. A indicação é | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/lipocrio-da-bia/index.html` | 1 | em Lages (SC), aplicado pela fisioterapeuta Bianca Cardoso. A indicação é | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/lipocrio-da-bia/index.html` | 1 | em Lages (SC), aplicado pela fisioterapeuta Bianca Cardoso. A indicação é | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/lipocrio-da-bia/index.html` | 26 | Fisioterapeuta Bianca Cardoso | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/lipocrio-da-bia/index.html` | 26 | atendimentos são feitos pela fisioterapeuta Bianca Cardoso, CREFITO 18314 | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/lipocrio-da-bia/index.html` | 26 | Fisioterapeuta Bianca Cardoso · CREFITO 1831 | aviso |
| fisioterapeuta | html | `dist/protocolos-bia/lipocrio-da-bia/index.html` | 26 | Fisioterapeuta Bianca Cardoso | aviso |

## Exceções aceitas

Nenhum.

## Fora da varredura

- `dist/_pendencias/index.html` (rota interna, não existe em produção)
