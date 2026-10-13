# Final 04 — Antes/depois e mídia de paciente

Acesso: 13/10/2026.

**Situação: FONTES DIVERGEM (antes/depois) + DECISÃO HUMANA (termos)**

## Normas

- **Res. COFFITO 424/2013, art. 15, V:** veda divulgar resultado de forma sensacionalista ou com promessa. Leitura conservadora: veda o antes/depois.
- **Cartilha de publicidade do CREFITO-7 (10/2025):** aceita antes/depois com consentimento escrito e o aviso "o resultado não é garantido nem igual para todos".
- **Res. COFFITO 532/2021:** imagem de paciente só com consentimento prévio por escrito.
- **Conclusão:** as fontes divergem. Seguir a regra mais restritiva, ou a do CREFITO-10 se existir (NÃO VERIFICADO: não achei cartilha do CREFITO-10).

## Estado do site

- **Módulo /casos ativo:** clipes do vídeo `video-para-presenca-e-profissionalismo`, com pares de ~1,3 s.
  - Nota "Imagens publicadas com autorização das pacientes. Resultados variam de pessoa para pessoa."
- **Consentimento:** `declarado-pelo-cliente`, `termoArquivado:false`. É um aviso e não bloqueia, por decisão do João.
  - A data de registro das imagens é desconhecida (sem EXIF).
- **"Nunca como capa":**
  - o audit-compliance verifica hero, primeira dobra (`data-dobra="primeira"`) e og:image em todas as páginas; resultado em docs/auditoria/compliance.txt;
  - os OG são gerados do retrato da Bia (titular), não de paciente.
- **Ambiguidade:** não se sabe se pares diferentes são da mesma paciente (ex.: P-002 e P-007).

## O que falta

- Termos de imagem assinados e arquivados, com data, para cada pacienteRef. Quem decide: João, com a clínica.
- Decidir se /casos fica no ar enquanto as fontes divergem. Quem decide: João, com o jurídico.
