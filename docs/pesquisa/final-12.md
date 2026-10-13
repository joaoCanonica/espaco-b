# Final 12 — Coerência de NAP (site × Google × Instagram); marca e razão social

Acesso: 13/10/2026.

**Situação: VERIFICADO (site) / NÃO VERIFICADO (Google e Instagram ao vivo)**

## Site (src/config/contato.ts, JSON-LD e rodapé)

- **Nome:** "Espaço B". Descritivo: "Clínica Espaço B — Estética e Harmonização Corporal e Facial".
- **Endereço:** Rua Humberto de Campos, 328, Coral, Lages/SC, 88508-190 (ficha do Google).
- **Telefone/WhatsApp:** (49) 99911-5351.
- **Instagram:** @clinica.espacob.
- O audit-seo confere que o NAP é igual em todas as páginas e no JSON-LD (docs/seo/audit-seo-saida.txt).

## Não verificado

- **Ficha do Google e perfil do Instagram ao vivo:** este ambiente não abre google.com nem instagram.com.
  - Ação: o João abre os dois e compara campo a campo com o rodapé do preview.
- **Razão social:** "Clinica de Estetica Espaco B Ltda" é `informado` (texto do Google/IA) e não confirmado.
  - Em produção, some com alerta.
  - Ação: conferir no cartão CNPJ (sem publicar o CNPJ).
- **Nome do Perfil do Google:** ver final-17.
