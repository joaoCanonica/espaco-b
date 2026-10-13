# Final 01 — Executor e conselho de cada serviço

Acesso: 13/10/2026 (WebSearch; o site do COFFITO não abre por fetch neste ambiente).

**Situação: VERIFICADO no repositório / NÃO VERIFICADO no conselho**

## O que o site diz hoje

- Todos os serviços em `src/config/servicos.ts` têm o mesmo executor: Bianca Cardoso, fisioterapeuta, CREFITO 183149, conselho COFFITO/CREFITO.
- Fonte: decisão do João de 12/10/2026 (só a Bia atende).
- O número aparece nas 16 páginas HTML do build.
- Página de cada serviço (componente `Executor`): nome, profissão por extenso e número.

## O que não se sabe

- **Região do CREFITO.** Santa Catarina é atendida pelo CREFITO-10, mas o site escreve "CREFITO 183149", sem a região. Não inferimos a região.
  - Ação: o João confirma o registro completo (ex.: "CREFITO-10 183149-F") e a situação ativa no cadastro público do CREFITO-10.
- **Número informado pelo cliente.** Não foi conferido em consulta pública (o CLAUDE.md já registra isso).

## Como verificar

Consulta de profissionais no site do CREFITO-10, pelo nome ou pelo número.

## Fontes

- Res. COFFITO 09/1978 e cartilhas de publicidade dos CREFITOs 5, 7 e 16: a identificação exige nome, profissão e número de inscrição. crefito5.org.br/faq; crefito7.gov.br/wp-content/uploads/2025/10/CARTILHA-PUBLICIDADE.pdf
