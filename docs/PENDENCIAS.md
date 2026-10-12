# Pendências

Formato: o que falta · quem resolve · desde.

## Ferramentas (sessão 0, 12/10/2026)

- `potrace` (CLI) não está instalado no ambiente. Para `brand:extract`, há o pacote npm `potrace` (devDependency, porta JS). Se preferir o CLI oficial: `sudo apt install potrace` (global; não instalado sem ordem). · Code/João
- Node do ambiente de nuvem é 22; o projeto fixa Node 24 LTS. Build e check foram validados com Node 24.21.0 baixado em pasta temporária. Na máquina local: `nvm install` (lê `.nvmrc`). · João
- Chromium do Playwright: a revisão esperada pelo `playwright@1.64.0` não vem pré-instalada aqui; `scripts/capturar.mjs` cai para o Chromium em `PLAYWRIGHT_BROWSERS_PATH` (ou `CHROMIUM_PATH`). Localmente: `pnpm exec playwright install chromium`. · João

## Mídia (sessão 1, 12/10/2026)

- **Originais dos 3 arquivos novos**: retratos e logo vieram como anexo (possível recompressão). Recebido: retrato colete 1500×2000 (205 KB), retrato vestido 1500×2000 (110 KB), logo 2000×2000 (108 KB, não 2048). Pedir os arquivos do fotógrafo e o logo vetorial. · João
- **Crédito do fotógrafo** do ensaio. · João
- **Fotos do espaço em alta** (estáticas, sem pessoas). Hoje só há o vídeo do ambiente. · João
- **Café com Bia**: ouvir o áudio de 20,7 s a 118,7 s e dizer o que pode entrar. Sem isso o derivado tem só 0–14 s. · João
- **Vídeo de presença**: confirmar se pares diferentes são da mesma paciente (P-001 a P-008; ex.: P-002 e P-007) e liberar ou não os trechos com o membro da equipe de costas (16,6–18,5 s e 22,8–24,5 s). · João
- **Termos das pacientes**: consentimento declarado pelo cliente, termo não arquivado (aviso; não bloqueia). · João

<!-- gerado:inicio (scripts/validate-config.mjs; não editar à mão) -->

## Config (gerado em 2026-10-12)

Trava de produção: livre (registro e WhatsApp confirmados; sem paciente em capa; sem claim publicado sem fonte).

### Bloqueantes (0)

Nenhum.

### Avisos (46)

| Estado | Campo | Rótulo | Valor | Motivo | Fonte |
| --- | --- | --- | --- | --- | --- |
| aviso | `claims.15-anos-resultados` | claim do cliente (numero, promessa) | Há 15 anos entregando resultados duradouros | publicar:false; conferir: COFFITO, CDC | cliente (texto colado pelo João) |
| aviso | `claims.abdome-chapado` | claim do cliente (promessa) | abdome chapado | publicar:false; conferir: COFFITO, CDC | cliente (texto colado pelo João) |
| aviso | `claims.efetividade-90` | claim do cliente (numero, comparacao) | Maior efetividade com 90% menos desconforto que a depilação a laser | publicar:false; conferir: ANVISA, CDC, estudo | cliente (texto colado pelo João) |
| aviso | `claims.gordura-1-sessao` | claim do cliente (superlativo, numero, promessa) | o melhor tratamento para redução de gordura localizada em apenas 1 sessão | publicar:false; conferir: ANVISA, COFFITO, CDC, estudo | cliente (texto colado pelo João) |
| aviso | `claims.labios-adeus` | claim do cliente (promessa) | Dê adeus às preocupações com lábios finos e ao incômodo do bigode chinês | publicar:false; conferir: COFFITO, CDC | cliente (texto colado pelo João) |
| aviso | `claims.laser-ficou-para-tras` | claim do cliente (comparacao) | Depilação a laser ficou para trás | publicar:false; conferir: CDC, estudo | cliente (texto colado pelo João) |
| aviso | `claims.melhor-tecnologia-depilacao` | claim do cliente (superlativo) | a melhor tecnologia do mundo para depilação definitiva | publicar:false; conferir: ANVISA, CDC, estudo | cliente (texto colado pelo João) |
| aviso | `claims.ninguem-vai-saber` | claim do cliente (promessa) | Ninguém vai saber o segredo | publicar:false; conferir: COFFITO, CDC | cliente (texto colado pelo João) |
| aviso | `claims.pacotes-descontos` | claim do cliente (preco, superlativo) | pacotes com incríveis descontos e brindes exclusivos | publicar:false; conferir: CDC, COFFITO | cliente (texto colado pelo João) |
| aviso | `claims.pochete` | claim do cliente (promessa) | pochete que não sai por nada | publicar:false; conferir: COFFITO, CDC | cliente (texto colado pelo João) |
| aviso | `claims.protocolos-internacionais` | claim do cliente (superlativo) | Protocolos internacionais sofisticados | publicar:false; conferir: CDC, estudo | cliente (texto colado pelo João) |
| aviso | `claims.resultados-90-dias` | claim do cliente (prazo, numero, promessa) | resultados efetivos em até 90 dias com apenas 1 sessão | publicar:false; conferir: ANVISA, COFFITO, CDC, estudo | cliente (texto colado pelo João) |
| aviso | `claims.rostos-mais-lindos` | claim do cliente (superlativo) | esculpe os rostos mais lindos da Serra Catarinense | publicar:false; conferir: COFFITO, CDC | cliente (texto colado pelo João) |
| aviso | `claims.rugas-rapida-segura` | claim do cliente (promessa) | Suavize rugas e linhas de expressão de forma rápida e segura | publicar:false; conferir: COFFITO, ANVISA, CDC | cliente (texto colado pelo João) |
| aviso | `claims.transformacao-completa` | claim do cliente (promessa) | Experimente a transformação completa | publicar:false; conferir: COFFITO, CDC | cliente (texto colado pelo João) |
| informado | `contato.google.avaliacaoDiretaUrl` | contato.google.avaliacaoDiretaUrl | https://search.google.com/local/writereview?placeid=ChIJQQHGPRof4JQRMrwP-osHZ9E | candidato NÃO VERIFICADO; testar antes de publicar | derivado do código do Maps |
| aviso | `contato.whatsappTitular` | de quem é o WhatsApp | — | confirmar se é da clínica ou pessoal da Bia | — |
| pendente | `legal.avisoResultados` | aviso de que resultados variam | — | texto da sessão 5, conferência na 9 | — |
| aviso | `legal.midiaPacientes` | termos de imagem das pacientes | {"declaradoPeloCliente":true,"termoArquivado":false} | consentimento declarado pelo cliente; termos não arquivados (não bloqueia) | — |
| pendente | `legal.privacidade.controlador` | controlador dos dados (LGPD) | — | definir na sessão 7 | — |
| pendente | `legal.privacidade.dataPolitica` | data da política de privacidade | — | sessão 7 | — |
| pendente | `legal.privacidade.encarregado` | encarregado/contato LGPD | — | definir na sessão 7 | — |
| informado | `marca.origem` | marca.origem | Espaço B Clínica de Fisioterapia, dez/2013 (nunca exibido) | histórico; não vira texto do site | texto do Google/IA |
| informado | `marca.razaoSocial` | marca.razaoSocial | Clinica de Estetica Espaco B Ltda | conferir no cartão CNPJ | texto do Google/IA colado pelo João |
| informado | `pessoas.bianca.especialidade` | pessoas.bianca.especialidade | dermato-funcional (nunca exibido) | título de especialista exige registro no conselho; só entra com comprovante | texto do Google/IA |
| aviso | `pessoas.bianca.fotoCredito` | crédito do fotógrafo do ensaio | — | a informar pelo João | — |
| informado | `protocolos[3].nome` | protocolos[3].nome | ElevaFace | não entra no site até o João confirmar nome e conteúdo | texto do Google/IA |
| informado | `protocolos[4].nome` | protocolos[4].nome | LiposemCortes | não entra no site até o João confirmar nome e conteúdo | texto do Google/IA |
| informado | `protocolos[5].nome` | protocolos[5].nome | Redefine | não entra no site até o João confirmar nome e conteúdo | texto do Google/IA |
| informado | `protocolos[6].nome` | protocolos[6].nome | Club do Botox | não entra no site até o João confirmar nome e conteúdo | texto do Google/IA |
| aviso | `servicos[0].escopoConferido` | escopo do ato pelo COFFITO | false | o João confirmou que só a Bia atende; o escopo de cada ato é conferido na sessão 9 | — |
| informado | `servicos[1].equipamento[0].marca` | servicos[1].equipamento[0].marca | Medical San (nunca exibido) | leitura do rótulo no quadro; confirmar marca/modelo | visto no vídeo corpo-flacidez-pos-emagrecimento (77,5–88,3 s) |
| pendente | `servicos[1].equipamento[0].registroAnvisa` | registro ANVISA do equipamento | — | a informar pelo João | — |
| aviso | `servicos[1].escopoConferido` | escopo do ato pelo COFFITO | false | o João confirmou que só a Bia atende; o escopo de cada ato é conferido na sessão 9 | — |
| informado | `servicos[2].equipamento[0].marca` | servicos[2].equipamento[0].marca | Holonyak (nunca exibido) | texto não verificado | cliente ("tecnologia Holonyak") |
| pendente | `servicos[2].equipamento[0].registroAnvisa` | registro ANVISA do equipamento | — | a informar pelo João | — |
| aviso | `servicos[2].escopoConferido` | escopo do ato pelo COFFITO | false | o João confirmou que só a Bia atende; o escopo de cada ato é conferido na sessão 9 | — |
| aviso | `servicos[3].escopoConferido` | escopo do ato pelo COFFITO | false | o João confirmou que só a Bia atende; o escopo de cada ato é conferido na sessão 9 | — |
| informado | `servicos[4].equipamento[0].marca` | servicos[4].equipamento[0].marca | Lavieen (nunca exibido) | texto não verificado | cliente |
| pendente | `servicos[4].equipamento[0].registroAnvisa` | registro ANVISA do equipamento | — | a informar pelo João | — |
| aviso | `servicos[4].escopoConferido` | escopo do ato pelo COFFITO | false | o João confirmou que só a Bia atende; o escopo de cada ato é conferido na sessão 9 | — |
| aviso | `tema.cores.framboesa` | Framboesa seca | #8E2B41 | amostrada nas flores reais; versões AA clara/funda na sessão 3 | — |
| aviso | `tema.cores.osso` | Osso | #F1ECE1 | valor aproximado do CLAUDE.md; calibrar na sessão 3 | — |
| aviso | `tema.cores.tinta` | Tinta | #1E211A | valor aproximado do CLAUDE.md; calibrar na sessão 3 | — |
| pendente | `tema.tipografia.display` | fonte display | — | Gloock ou Newsreader Display; decidir na sessão 3 (licença e self-host) | — |
| pendente | `tema.tipografia.texto` | fonte de texto | — | Albert Sans ou Schibsted Grotesk; decidir na sessão 3 | — |

### Informativos (6)

| Estado | Campo | Rótulo | Valor | Motivo | Fonte |
| --- | --- | --- | --- | --- | --- |
| pendente | `marca.cnpj` | marca.cnpj |  (nunca exibido) | decisão do João: o CNPJ não aparece no site | — |
| confirmado | `marca.tempoDeAtuacao` | marca.tempoDeAtuacao | há mais de 15 anos | conferir na passada final de onde vem a contagem | João (WAXLO), 12/10/2026 |
| aviso | `modulos.equipe` | módulo equipe desligado | false | só a Bianca atende por ora; o Prompt D liga quando houver equipe | modulos.ts |
| aviso | `modulos.historias` | módulo historias desligado | false | desligado por decisão do João (12/10/2026) | modulos.ts |
| confirmado | `pessoas.bianca.registro` | pessoas.bianca.registro | {"conselho":"CREFITO","numero":"183149"} | não consultado no CREFITO por nós; conferência na sessão 9 | cliente, confirmado pelo João em 12/10/2026 |
| pendente | `seo.siteUrl` | SITE_URL (domínio) | — | domínio ainda não existe; noindex até existir | — |

<!-- gerado:fim -->

## Config (sessão 2, 12/10/2026)

- **Fallback do hero**: a cadeia pedida é retrato colete → vídeo do ambiente → imagem9, mas na sessão 1 o ambiente ficou "nunca no hero" (`naoUsarComoCapa`). O resolvedor pula o ambiente em capa e cai na imagem9. Decidir se o ambiente pode ser capa de emergência. · João
- **Rota de pendências**: o Astro ignora páginas com "_" no nome; `/_pendencias/` é gerada por `src/pages/[interna].astro` (só em dev e PREVIEW=1). · informativo
