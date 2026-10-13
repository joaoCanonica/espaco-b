# Final 10 — LGPD: política, banner, mapa/embeds, termos de imagem

Acesso: 13/10/2026. Base: docs/pesquisa/lgpd-privacidade.md (sessão 7).

**Situação: VERIFICADO (técnico, por script) / DECISÃO HUMANA (jurídico)**

## Técnico (testar-privacidade e audit-a11y)

- Nada de terceiros carrega antes do aceite. O mapa do Google só carrega depois do consentimento.
- Fontes self-hosted. Sem pixel nem analytics, só o gancho `registrarConversao`.
- O banner tem "aceitar", "recusar" e "preferências". A escolha fica no localStorage, com validade de 365 dias.
- Nenhum formulário coleta dado de saúde: não existe formulário, o contato é pelo WhatsApp.

## Jurídico

- **/privacidade:** precisa de revisão por advogado (bloco de decisões, sessão 7).
  - Ainda faltam: encarregado (art. 41), prazos de guarda e transferência internacional (WhatsApp/Meta, Google).
- **Controlador sem CNPJ:** ver final-15.
- **Termos de imagem das pacientes:** imagem que identifica pode revelar dado de saúde, que é dado sensível pelo art. 11.
  - Os termos não estão arquivados (`termoArquivado:false`).
