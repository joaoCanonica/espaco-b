// Textos promocionais do cliente, guardados como FONTE (copiados literalmente).
// Nenhum é publicado: o site usa a versão escrita na sessão 5. A sessão 9 confere quem sustenta cada um.

export type TipoClaim = 'numero' | 'comparacao' | 'promessa' | 'superlativo' | 'prazo' | 'preco';
export type Conferir = 'ANVISA' | 'COFFITO' | 'CDC' | 'estudo';

export interface Claim {
  id: string;
  texto: string;
  tipo: TipoClaim[];
  conferir: Conferir[];
  publicar: boolean;
  fonte: string;
}

const FONTE = 'cliente (texto colado pelo João)';

const c = (id: string, texto: string, tipo: TipoClaim[], conferir: Conferir[]): Claim => ({
  id,
  texto,
  tipo,
  conferir,
  publicar: false,
  fonte: FONTE,
});

export const claims = [
  c(
    'labios-adeus',
    'Dê adeus às preocupações com lábios finos e ao incômodo do bigode chinês',
    ['promessa'],
    ['COFFITO', 'CDC'],
  ),
  c(
    'transformacao-completa',
    'Experimente a transformação completa',
    ['promessa'],
    ['COFFITO', 'CDC'],
  ),
  c(
    'melhor-tecnologia-depilacao',
    'a melhor tecnologia do mundo para depilação definitiva',
    ['superlativo'],
    ['ANVISA', 'CDC', 'estudo'],
  ),
  c(
    'laser-ficou-para-tras',
    'Depilação a laser ficou para trás',
    ['comparacao'],
    ['CDC', 'estudo'],
  ),
  c(
    'efetividade-90',
    'Maior efetividade com 90% menos desconforto que a depilação a laser',
    ['numero', 'comparacao'],
    ['ANVISA', 'CDC', 'estudo'],
  ),
  c(
    'pacotes-descontos',
    'pacotes com incríveis descontos e brindes exclusivos',
    ['preco', 'superlativo'],
    ['CDC', 'COFFITO'],
  ),
  c(
    'rugas-rapida-segura',
    'Suavize rugas e linhas de expressão de forma rápida e segura',
    ['promessa'],
    ['COFFITO', 'ANVISA', 'CDC'],
  ),
  c(
    'gordura-1-sessao',
    'o melhor tratamento para redução de gordura localizada em apenas 1 sessão',
    ['superlativo', 'numero', 'promessa'],
    ['ANVISA', 'COFFITO', 'CDC', 'estudo'],
  ),
  c(
    'resultados-90-dias',
    'resultados efetivos em até 90 dias com apenas 1 sessão',
    ['prazo', 'numero', 'promessa'],
    ['ANVISA', 'COFFITO', 'CDC', 'estudo'],
  ),
  c('pochete', 'pochete que não sai por nada', ['promessa'], ['COFFITO', 'CDC']),
  c('abdome-chapado', 'abdome chapado', ['promessa'], ['COFFITO', 'CDC']),
  c(
    '15-anos-resultados',
    'Há 15 anos entregando resultados duradouros',
    ['numero', 'promessa'],
    ['COFFITO', 'CDC'],
  ),
  c(
    'protocolos-internacionais',
    'Protocolos internacionais sofisticados',
    ['superlativo'],
    ['CDC', 'estudo'],
  ),
  c('ninguem-vai-saber', 'Ninguém vai saber o segredo', ['promessa'], ['COFFITO', 'CDC']),
  c(
    'rostos-mais-lindos',
    'esculpe os rostos mais lindos da Serra Catarinense',
    ['superlativo'],
    ['COFFITO', 'CDC'],
  ),
] as const satisfies readonly Claim[];

export type ClaimId = (typeof claims)[number]['id'];
