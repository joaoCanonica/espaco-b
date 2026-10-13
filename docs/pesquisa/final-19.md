# Final 19 — Avaliações do Google no site

Acesso: 13/10/2026.

**Situação: DECISÃO HUMANA (bloqueante na prática, ver proposta)**

## O que o site mostra (módulo `avaliacoesGoogle`, home e /contato)

- Nota 4,8 e 32 avaliações, conferidas em 12/10/2026, com a data.
- Trechos curtos e literais de 5 avaliações `usavelNoSite:true`, sem nome, foto ou inicial, com link para o Google.
- Sem AggregateRating nem Review no JSON-LD.

## Normas e políticas

- **Google (Brand Resource Center, "User reviews"):** "as avaliações pertencem a quem as escreveu"; para usar em marketing próprio, **inclusive no site, é preciso o consentimento do autor**. Sugere pedir pela resposta à avaliação.
  - Fonte: about.google/brand-resource-center/guidance/user-reviews (busca de 13/10/2026).
  - Usar marca ou logo do Google exige permissão à parte. O site usa só o texto "Google", sem logo.
- **COFFITO:** a Res. 532/2021, pelo trecho citado em prova da UFRJ de 2025, veda divulgar para autopromoção "declaração, atestado, imagem ou carta de agradecimento" de paciente.
  - Trecho de avaliação elogiosa pode ser enquadrado como depoimento. NÃO VERIFICADO no texto integral.
  - A cartilha do CREFITO-7 de 2025 trata depoimento com cautela.
- **LGPD:** o trecho sem nome é de baixo risco de identificação, mas o texto pode identificar quem escreveu.

## Proposta (não aplicada; o Code não muda o texto por conta própria)

- **Opção A:** manter só a nota e o total, com a data e o link para ler no Google, e retirar os trechos até haver consentimento de cada autor. Sugestão desta auditoria.
- **Opção B:** manter os trechos e pedir o consentimento de cada autor pela resposta no Google, registrando a data em `docs/dados/avaliacoes-google.json`.
- **Atualização da nota:** rever a cada publicação. O site já mostra a data da conferência.

Quem decide: João (decisão (h) do CLAUDE.md).
