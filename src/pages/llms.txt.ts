// llms.txt (sessão 8): resumo do site em Markdown para agentes de IA. Custo baixo e efeito NÃO
// comprovado: o Google diz que não usa o arquivo para ranking nem para AI Overviews (docs/SEO.md).
// Só dados da config e frases do COPY_DECK.
import type { APIRoute } from 'astro';
import { rotasPublicas } from '../components/seo/rotasPublicas.ts';
import { nap } from '../components/seo/jsonld.ts';
import { contato } from '../config/contato.ts';
import { marca } from '../config/marca.ts';
import { pessoas } from '../config/pessoas.ts';
import { metaDaRota, seo, urlDe } from '../config/seo.ts';
import { protocolosPublicos } from '../components/servicos/protocolos.ts';

export const GET: APIRoute = () => {
  const n = nap();
  const b = pessoas.bianca;
  const linhas = rotasPublicas().map((r) => {
    const id = r.match(/^\/protocolos-bia\/([^/]+)\/$/)?.[1];
    const nome = protocolosPublicos.find((p) => p.id === id)?.nomeTexto;
    const m = metaDaRota(r, nome);
    return `- [${m?.titulo ?? r}](${urlDe(r)}): ${m?.descricao ?? ''}`;
  });
  const md = [
    `# ${seo.nomeEntidade}`,
    '',
    `> ${marca.nomeDescritivo.valor}, em ${n.cidade} (${n.uf}). Atendimento com a ${b.titulo.valor?.toLowerCase()} ${b.nome.valor}, responsável técnica. Cada atendimento começa por uma avaliação.`,
    '',
    `- Endereço: ${n.rua}, ${n.bairro}, ${n.cidade}/${n.uf}, CEP ${n.cep}`,
    `- WhatsApp e telefone: ${n.telefone}`,
    `- Instagram: ${contato.instagram.valor?.url ?? ''}`,
    `- Google Maps: ${contato.google.mapsUrl.valor ?? ''}`,
    '',
    '## Páginas',
    '',
    ...linhas,
    '',
  ].join('\n');
  return new Response(md, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
