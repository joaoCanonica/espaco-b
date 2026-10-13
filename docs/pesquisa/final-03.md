# Final 03 — Medicamentos de prescrição nos vídeos e arquivos; "Club do Botox" e "botox"

Acesso: 13/10/2026.

**Situação: DECISÃO HUMANA**

## Fatos (manifesto e build)

- **Vídeo `usou-monjauro-corpo-flacido`** (na página /corpo-e-emagrecimento, VideoCorpo):
  - a **legenda queimada cita um medicamento de prescrição de 0 a 2 s**;
  - não tem corte (`trim: []`);
  - o nome do arquivo também cita o medicamento, mas não sai no site: o derivado usa o slug `corpo-flacidez-pos-emagrecimento`.
- **Vídeo `cafe-com-bia`:** o tema é o caso de um influenciador com medicamento de prescrição. O derivado tem só 0–14 s até o João ouvir o áudio.
- **"Club do Botox":** é nome de protocolo vindo do Google (`informado`) e não sai no site. "botox" está na lista de vetados de `termos.ts`.

## Normas

- **RDC ANVISA 96/2008:** propaganda de medicamento de venda sob prescrição só para profissionais prescritores. Há casos de autuação por publicação em Instagram (bibliotecadigital.anvisa.gov.br).
  - Uma legenda que só cita o nome num relato não é necessariamente "propaganda", mas o risco existe e o CLAUDE.md proíbe o nome "como oferta".
- **"Botox" é marca registrada (Allergan/AbbVie):** o TRF3 manteve o registro no INPI em 2020 e entendeu que o termo não designa a substância (trf3.jus.br, notícia 397419).
  - Usar "botox" para toxina de outra marca tem risco de marca, além do problema regulatório.
- **SEO × norma:** buscam "botox", mas o site não pode usar o termo. Alternativa: "toxina botulínica" somente se final-02 for resolvido.

## Proposta (não aplicada)

1. Cortar 0–2 s de `usou-monjauro-corpo-flacido`, via `trim` no manifesto. O corte respeita a decisão (g), pois não recorta a zona de legenda e só encurta o vídeo. Quem decide: João.
2. Manter "Club do Botox" fora; se o protocolo existir, renomear.
