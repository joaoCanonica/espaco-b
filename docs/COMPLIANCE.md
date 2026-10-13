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
- **[DECISÃO HUMANA] Hospedagem e cabeçalhos.**
  - `public/_headers` segue o formato Netlify / Cloudflare Pages.
  - Se o deploy for em outro provedor, os cabeçalhos (inclusive HSTS e `frame-ancestors`) precisam ser portados.
  - A CSP por hash vai no `<meta>` de cada página e funciona em qualquer host.

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
