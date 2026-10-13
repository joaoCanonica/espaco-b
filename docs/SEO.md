# SEO local e GEO — Espaço B

Sessão 8 · 13/10/2026. Código em `src/config/seo.ts` (metadados por rota, robôs de IA), `src/components/seo/` (head, JSON-LD), `src/pages/{sitemap.xml,robots.txt,llms.txt}.ts`, `scripts/gerar-og.mjs` e `scripts/audit-seo.mjs`.

**Limite deste ambiente:** `validator.schema.org`, `schema.org` e `developers.google.com` não abriram (sem rota de rede; só o registro do npm responde). A pesquisa abaixo vem de buscador (trechos) e do pacote `schema-dts` 2.1.0 (02/10/2026), gerado do vocabulário oficial do schema.org. Onde isso importa, está escrito "conferir".

## 1. Decisões

| Tema                 | Decisão                                                                                                                                | Quem decide depois                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Tipo da entidade     | `HealthAndBeautyBusiness`                                                                                                              | João + jurídico (se quiser `MedicalBusiness`) |
| Nome no schema       | `name` "Clínica Espaço B"; `alternateName` "Clínica Espaço B — Estética e Harmonização Corporal e Facial"                              | —                                             |
| Bairro               | Coral (config). "Sagrado Coração de Jesus" não aparece em lugar nenhum (o audit bloqueia)                                              | João confirma no Perfil do Google             |
| Avaliações no schema | Sem `AggregateRating` e sem `Review`                                                                                                   | —                                             |
| FAQ                  | `FAQPage` só com as perguntas visíveis da página                                                                                       | —                                             |
| Domínio              | `SITE_URL` por variável de ambiente; sem ela: noindex, URLs relativas, sitemap com domínio marcador `.invalid`, robots bloqueando tudo | João (domínio)                                |
| Robôs de IA          | Liberados: GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended. Bloqueado: CCBot                        | João (`robosIA` em `seo.ts`)                  |
| llms.txt             | Publicado, sem prometer efeito                                                                                                         | —                                             |

### 1.1 Tipo da entidade: por que `HealthAndBeautyBusiness`

No schema.org (conferido em `schema-dts` 2.1.0, gerado do vocabulário oficial):

- `HealthAndBeautyBusiness` ("Health and beauty") é subtipo de `LocalBusiness`, com filhos `BeautySalon`, `DaySpa`, `HairSalon`, `HealthClub`, `NailSalon` e `TattooParlor`.
- `MedicalBusiness` é descrito como "a particular physical or virtual business of an organization for medical purposes", com filhos `Physician`, `Physiotherapy`, `Dermatology`, `PlasticSurgery`, `MedicalClinic` e outros.

Escolha:

- **Não `Physician`**: a Bia não é médica.
- **Não `MedicalBusiness`/`Physiotherapy`**: o que o site oferece é estética. Marcar como "finalidade médica" ou "fisioterapia" sugere tratamento de saúde e pode ser lido como alegação, o que é sensível para o COFFITO/CREFITO.
- **Não `BeautySalon`**: é estreito demais para protocolos corporais, depilação com luz e procedimentos feitos por profissional de saúde.
- **`HealthAndBeautyBusiness`**: é o tipo exato que cobre "saúde e beleza" sem afirmar finalidade médica.
- A credencial aparece onde é fato: em `Person` (Bianca Cardoso, `jobTitle` "Fisioterapeuta"), sem `hasCredential`, porque o registro foi informado pelo cliente e não consultado por nós.

Se o João e o jurídico preferirem `MedicalBusiness`, basta trocar `seo.tipoEntidade` e o `@type` em `src/components/seo/jsonld.ts`. O audit valida qualquer tipo do vocabulário.

### 1.2 NAP (nome, endereço, telefone)

Tudo vem da config, e o `audit-seo` compara o schema com ela.

- **Nome:** Clínica Espaço B (marca "Espaço B").
- **Endereço:** Rua Humberto de Campos, 328, Coral, Lages/SC, CEP 88508-190. O bairro vai dentro de `streetAddress`, porque `PostalAddress` não tem campo de bairro.
- **Telefone:** +55 49 99911-5351.
- **Geo:** -27.8074182, -50.3162505, do link do Maps enviado pelo cliente.
- **Divergência de bairro:** diretórios listam "Sagrado Coração de Jesus" para o mesmo CEP. O bairro confirmado pelo cliente é **Coral**, e o divergente não é usado em lugar nenhum. O `audit-seo` reprova o build se "Sagrado Coração" aparecer no HTML. O João deve conferir o bairro do Perfil da Empresa no Google e corrigir os diretórios que ele controla.

### 1.3 Nome do Perfil da Empresa no Google

A ficha hoje se chama "Espaço B - Harmonização Corporal e Facial | Estética em Lages | FaceLifting, Depilação Definitiva, Emagrecimento e HOF.", um descritivo longo com serviços e cidade.

- **O que dizem as diretrizes:** o Google pede o nome real, como aparece na fachada, no site e nos impressos. Guias de terceiros listam como proibidos no nome: serviços, produtos, localização e taglines. Página oficial: https://support.google.com/business/answer/3038177 (conferir a versão vigente; não encontrei mudança datada de 2026).
- **Risco:** guias citam suspensão da ficha por nome com palavras-chave.
- **O schema usa o nome real** ("Clínica Espaço B"). **O João decide** se alinha o nome da ficha. Se alinhar, pode levar algumas semanas para o Google refletir.

### 1.4 Por que não há estrelas (AggregateRating/Review) no schema

- Desde setembro de 2019, o Google não mostra estrelas para `LocalBusiness`/`Organization` quando o próprio negócio marca avaliações sobre si ("self-serving reviews"), seja direto no markup ou via widget de terceiros. Só sites que avaliam outros negócios são elegíveis. Fontes: resumos do anúncio do Google (https://www.practicalecommerce.com/google-muzzles-self-serving-review-snippets, https://www.brightlocal.com/learn/review-schema/); documentação oficial em https://developers.google.com/search/docs/appearance/structured-data/review-snippet (conferir).
- O site mostra a nota e o total reais do Google em texto, com data e link para o Google. No schema não há nota.

### 1.5 FAQPage

- O `FAQPage` está nas páginas com FAQ visível (home, serviços e protocolos), com as mesmas perguntas e respostas da página. Em produção saem as perguntas condicionais, como na página. O `audit-seo` confere que o schema bate com o `<summary>` visível.
- Desde agosto de 2023, o rich result de FAQ só aparece para sites governamentais e de saúde "conhecidos e com autoridade". Fonte: https://developers.google.com/search/blog/2023/08/howto-faq-changes (conferir). Então **não se espera rich result de FAQ**: o markup fica pela estrutura do conteúdo (motores de busca e IAs leem pergunta e resposta), sem promessa.

### 1.6 Robôs de IA (robots.txt)

| Robô             | Empresa / uso (segundo guias; conferir nas páginas oficiais)                            | Decisão                   |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------- |
| GPTBot           | OpenAI, treino de modelos                                                               | permitido                 |
| OAI-SearchBot    | OpenAI, busca do ChatGPT                                                                | permitido                 |
| ClaudeBot        | Anthropic, treino                                                                       | permitido                 |
| Claude-SearchBot | Anthropic, busca                                                                        | permitido                 |
| PerplexityBot    | Perplexity, índice de busca                                                             | permitido                 |
| Google-Extended  | token do Google para Gemini (treino e grounding); não afeta a Busca nem os AI Overviews | permitido                 |
| CCBot            | Common Crawl: base aberta reaproveitada em muitos treinos                               | **bloqueado (a decidir)** |

- **Por que bloquear o CCBot:** ele não traz citação nem tráfego. Ele só alimenta bases de terceiros, e liberá-lo não ajuda o objetivo (aparecer em respostas de busca). O João pode liberar trocando `CCBot: true` em `src/config/seo.ts`.
- **Agentes iniciados pelo usuário** (ChatGPT-User, Claude-User, Perplexity-User): podem ignorar o robots.txt, segundo a própria Perplexity.
- **Respeito ao robots.txt é voluntário.**
- **Em preview ou sem domínio:** `Disallow: /` para todos.
- Fontes: guias de terceiros (https://growthmk.com/en/ai-crawler-robots-txt-guide, https://superblog.ai/blog/ai-crawlers-guide).

### 1.7 llms.txt

- Publicado em `/llms.txt`, com resumo, NAP e páginas. O custo é baixo.
- **Não é fator de ranking comprovado:** o Google diz que o arquivo não ajuda nem atrapalha a Busca, os AI Overviews e o AI Mode (nota no guia de otimização para IA, junho/2026). John Mueller o comparou à meta keywords.
- Um estudo da Ahrefs (maio/2026) mediu que 97% dos arquivos não recebem nenhuma requisição.
- Fontes: https://searchengineland.com/google-says-normal-seo-works-for-ranking-in-ai-overviews-and-llms-txt-wont-be-used-459422, https://www.webpronews.com/google-draws-a-firm-line-on-llms-txt-no-ranking-boost-no-penalty/.
- Fica sem promessa de efeito.

### 1.8 Open Graph

- A imagem tem 1200×630 por página, gerada no pós-build (`scripts/gerar-og.mjs`, Playwright): título em Newsreader + o retrato de estúdio da Bia na contraforma baixa do B.
- Nunca usa mídia de paciente (slot `og.imagem`).
- Cache por hash em `node_modules/.cache/espaco-b-og`.
- **No deploy:** o build precisa de Chromium (Playwright) para gerar as imagens.

## 2. Validação do JSON-LD

- **Sintaxe e vocabulário:**
  - o JSON-LD é tipado com `schema-dts` 2.1.0, então tipo ou propriedade inexistente não compila (`pnpm check`);
  - o `audit-seo` valida cada nó publicado contra os 1.034 tipos e as 1.539 propriedades do vocabulário;
  - resultado: **0 erros nas 15 páginas**.
- **Teste negativo:** com um `aggregateRating`, uma propriedade inventada, "Sagrado Coração" e "melhor" plantados no HTML, o `audit-seo` acusou os 5 erros.
- **validator.schema.org e Rich Results Test:** **não consegui rodar daqui** (sem rede para esses domínios). Exemplos prontos para colar estão em `docs/seo/jsonld-inicio.json` e `docs/seo/jsonld-harmonizacao-facial.json`, gerados com `SITE_URL=https://espacob.example`. Depois do deploy, rodar os dois validadores na URL real e registrar aqui.

## 3. Consultas-alvo por página

Consultas reais de quem procura em Lages. **Nenhuma página por bairro ou cidade sem conteúdo real.**

| Página                          | Consultas-alvo                                                                                             |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `/`                             | "clínica de estética em Lages", "Espaço B Lages", "estética Coral Lages"                                   |
| `/harmonizacao-facial/`         | "harmonização facial em Lages", "fisioterapeuta harmonização facial Lages", "harmonização facial Lages SC" |
| `/corpo-e-emagrecimento/`       | "flacidez depois de emagrecer", "flacidez após emagrecimento Lages", "gordura localizada Lages"            |
| `/pele-e-tecnologia/`           | "depilação em Lages", "depilação com luz Lages", "limpeza de pele Lages"                                   |
| `/protocolos-bia/` e subpáginas | "BiaLifting", "BiaLips", "Lipocrio da Bia" (busca de marca)                                                |
| `/bia/`                         | "Bianca Cardoso fisioterapeuta", "Bianca Cardoso Lages"                                                    |
| `/espaco/`, `/contato/`         | "Espaço B endereço", "Espaço B telefone", "Rua Humberto de Campos 328 Lages"                               |

O direcionamento original citava "depilação a laser em Lages". O site usa "depilação com luz" (o termo da clínica, sem afirmar o tipo de aparelho) e "redução duradoura dos pelos". "Laser" só entra quando o João confirmar a tecnologia.

## 4. GEO (respostas de buscadores com IA)

Saída do `audit-seo` (seção GEO):

| Página                                                  | Resumo citável (40–60)        | Autor/credencial perto do topo           |
| ------------------------------------------------------- | ----------------------------- | ---------------------------------------- |
| /harmonizacao-facial/                                   | 50 palavras ✓                 | ✗ (CREFITO só a 81% da página, no fecho) |
| /corpo-e-emagrecimento/                                 | 56 ✓                          | ✗ (97%)                                  |
| /pele-e-tecnologia/                                     | 53 ✓                          | ✗ (81%)                                  |
| /protocolos-bia/                                        | 41 ✓                          | ✗ (52%)                                  |
| /protocolos-bia/{bialifting, bialips, lipocrio-da-bia}/ | ✗ ausente (conteúdo pendente) | ✗ (50%)                                  |

**O que falta (não alterei copy nem componentes de outras sessões):**

1. Uma linha de autoria logo abaixo do resumo das páginas de serviço, com o texto que já está no deck: "Fisioterapeuta {{nome}} · {{registro}} · responsável técnica" (COPY_DECK §2, "Fecho"). Hoje ela só aparece no fecho e no rodapé.
2. O resumo citável de cada protocolo, que depende do conteúdo do João.

## 5. Checklist do Perfil da Empresa no Google (para o João)

- [ ] **Nome:** o nome real do negócio, sem serviços nem cidade (ver 1.3).
- [ ] **Endereço:** igual ao site, bairro **Coral**. Conferir se a ficha não diz "Sagrado Coração de Jesus".
- [ ] **Telefone:** (49) 99911-5351, o mesmo do site.
- [ ] **Horários:** seg–sex 9h–12h e 13h30–18h30; sáb 8h–12h; dom fechado. Feriados avisados com antecedência.
- [ ] **Categoria principal:** a mais próxima de "clínica de estética". Categorias secundárias só do que a clínica faz.
- [ ] **Serviços:** os mesmos nomes do site (harmonização facial; corpo e flacidez depois de emagrecer; depilação com luz; limpeza de pele; protocolos BiaLifting, BiaLips, Lipocrio da Bia). Sem marca de equipamento ou de medicamento, sem preço que não seja real e sem promessa.
- [ ] **Fotos reais:** fachada, recepção, salas e a Bia. Nada de imagem gerada por IA na ficha. Fotos de paciente só com termo.
- [ ] **Site:** a URL do domínio quando existir (página inicial).
- [ ] **Link de avaliação:** testar o link direto (`avaliacaoDiretaUrl`) e só então trocar em `src/config/contato.ts`.
- [ ] **Avaliações reais:** pedir a todas as pacientes, sem filtro de satisfação, sem brinde e sem desconto. Responder às avaliações, inclusive as negativas, sem dado de saúde na resposta.
- [ ] **Descrição da ficha:** reaproveitar o resumo da home, sem superlativo.

## 6. Roteiro mensal de presença em IA (ChatGPT, Perplexity, Gemini)

Uma vez por mês, em janela anônima e sem login quando possível, mesmas perguntas e mesma ordem:

1. "Qual clínica faz harmonização facial em Lages, SC?"
2. "Fisioterapeuta que faz harmonização facial em Lages"
3. "Onde tratar flacidez depois de emagrecer em Lages?"
4. "Depilação em Lages SC: onde fazer?"
5. "O que é o Espaço B em Lages?" / "Quem é Bianca Cardoso, fisioterapeuta em Lages?"

Para cada resposta, anotar numa planilha:

- data e ferramenta;
- se o Espaço B aparece e em que posição;
- se o NAP está correto (nome, endereço com bairro Coral, telefone);
- quais fontes a resposta cita (site, Google, Instagram, diretórios);
- se há informação errada (bairro divergente, serviço que a clínica não faz, credencial não confirmada).

Erro de dado se corrige na fonte citada (ficha do Google, diretório, site), nunca com texto de promessa. Comparar mês a mês, sem esperar efeito de um arquivo isolado como o llms.txt.

## 7. O que NÃO fazer

- Páginas por bairro ou cidade sem conteúdo real ("harmonização no bairro X").
- "Melhor", "nº 1", "garantido" em título, descrição ou schema (o `audit-seo` reprova).
- Estrelas no schema, avaliação inventada ou trechos editados.
- Marca de equipamento ou de medicamento em título, descrição ou schema.
