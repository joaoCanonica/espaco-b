import { opcional } from './tipos.ts';

// Domínio ainda não existe: SITE_URL vem do ambiente. Sem ele (ou em preview) = noindex.
const siteUrl = typeof process !== 'undefined' ? process.env['SITE_URL'] : undefined;

export interface MetaRota {
  /** ≤ 60 caracteres (audit-seo confere) */
  titulo: string;
  /** ≤ 155 caracteres; frases do COPY_DECK, sem promessa nem superlativo */
  descricao: string;
  /** trilha (sem "Início"); o último item é a página */
  trilha: string[];
  /** fora do sitemap e com noindex */
  indexar?: boolean;
}

/**
 * Metadados por rota (sessão 8). Fonte única: Seo.astro, sitemap.xml e audit-seo leem daqui.
 * Rotas dinâmicas usam "*" (ex.: protocolo) e são resolvidas em metaDaRota().
 */
export const rotas: Record<string, MetaRota> = {
  '/': {
    titulo: 'Espaço B · Estética e harmonização em Lages, SC',
    descricao:
      'Clínica Espaço B, em Lages (SC): rosto, corpo e pele com a fisioterapeuta Bianca Cardoso, CREFITO 183149. Primeiro a avaliação, depois o plano.',
    trilha: [],
  },
  '/harmonizacao-facial/': {
    titulo: 'Harmonização facial em Lages · Espaço B',
    descricao:
      'Harmonização facial com método em Lages (SC): expressão, contorno e qualidade da pele avaliados juntos, com a fisioterapeuta Bianca Cardoso.',
    trilha: ['Harmonização facial'],
  },
  '/corpo-e-emagrecimento/': {
    titulo: 'Flacidez depois de emagrecer · Espaço B, Lages',
    descricao:
      'Flacidez e gordura localizada depois de emagrecer, em Lages (SC). Avaliação primeiro, protocolo depois, com a fisioterapeuta Bianca Cardoso.',
    trilha: ['Corpo e emagrecimento'],
  },
  '/pele-e-tecnologia/': {
    titulo: 'Pele e depilação em Lages · Espaço B',
    descricao:
      'Depilação com luz, limpeza de pele e tecnologias para textura e manchas em Lages (SC). A avaliação define o plano e o intervalo entre sessões.',
    trilha: ['Pele e tecnologia'],
  },
  '/protocolos-bia/': {
    titulo: 'Protocolos da Bia · Espaço B, Lages',
    descricao:
      'BiaLifting, BiaLips e Lipocrio da Bia: protocolos com o nome de quem os criou e aplica, no Espaço B, em Lages (SC). A indicação vem da avaliação.',
    trilha: ['Protocolos da Bia'],
  },
  '/protocolos-bia/*/': {
    titulo: '{nome} · Protocolos da Bia · Espaço B',
    descricao:
      '{nome}: protocolo do Espaço B, em Lages (SC), aplicado pela fisioterapeuta Bianca Cardoso. A indicação é definida na avaliação.',
    trilha: ['Protocolos da Bia', '{nome}'],
  },
  '/bia/': {
    titulo: 'Bianca Cardoso, fisioterapeuta · Espaço B, Lages',
    descricao:
      'Bianca Cardoso, fisioterapeuta (CREFITO 183149), responsável técnica do Espaço B, em Lages (SC). Atende todos os protocolos da clínica.',
    trilha: ['A Bia'],
  },
  '/espaco/': {
    titulo: 'O espaço · Clínica Espaço B, Coral, Lages',
    descricao:
      'Uma clínica no bairro Coral, em Lages (SC): salas reservadas, luz quente e uma recepção para você chegar com calma. Rua Humberto de Campos, 328.',
    trilha: ['O espaço'],
  },
  '/casos/': {
    titulo: 'Casos acompanhados · Espaço B, Lages',
    descricao:
      'Casos reais acompanhados no Espaço B, publicados com autorização. Cada pessoa responde de um jeito: as imagens não indicam o resultado que você vai ter.',
    trilha: ['Casos'],
  },
  '/contato/': {
    titulo: 'Contato e horários · Espaço B, Lages',
    descricao:
      'Agende a sua avaliação pelo WhatsApp. Espaço B: Rua Humberto de Campos, 328, Coral, Lages (SC). Horários, endereço e como chegar.',
    trilha: ['Contato'],
  },
  '/privacidade/': {
    titulo: 'Política de privacidade · Espaço B',
    descricao:
      'Como o site do Espaço B trata dados: WhatsApp, armazenamento no navegador, mapa do Google, direitos da LGPD e como mudar as suas preferências.',
    trilha: ['Privacidade'],
  },
  '/avaliar/': {
    titulo: 'Avaliar no Google · Espaço B',
    descricao:
      'Deixe a sua avaliação do Espaço B no Google. Vale qualquer experiência, boa ou ruim; não há brinde nem desconto por avaliação.',
    trilha: ['Avaliar'],
  },
  '/pele-e-laser/': {
    titulo: 'Pele e tecnologia · Espaço B',
    descricao: 'Esta página mudou de endereço: Pele e tecnologia, no Espaço B, em Lages (SC).',
    trilha: ['Pele e tecnologia'],
    indexar: false,
  },
  '/404.html': {
    titulo: 'Página não encontrada · Espaço B',
    descricao: 'Esta página não existe. Volte para o início do site do Espaço B, em Lages (SC).',
    trilha: [],
    indexar: false,
  },
};

/** Metadados de uma rota (com "{nome}" preenchido nas dinâmicas); null se não mapeada. */
export function metaDaRota(caminho: string, nome?: string): MetaRota | null {
  const c = caminho.endsWith('/') || caminho.endsWith('.html') ? caminho : `${caminho}/`;
  const exato = rotas[c];
  const dinamica = Object.entries(rotas).find(
    ([k]) => k.includes('*') && new RegExp(`^${k.replace('*', '[^/]+')}$`).test(c),
  )?.[1];
  const m = exato ?? dinamica ?? (c === '/404/' ? rotas['/404.html'] : undefined);
  if (!m) return null;
  const f = (s: string) => s.replace('{nome}', nome ?? '');
  return { ...m, titulo: f(m.titulo), descricao: f(m.descricao), trilha: m.trilha.map(f) };
}

/**
 * Robôs de IA (robots.txt). Decisão registrada em docs/SEO.md; o João pode mudar aqui.
 * true = permitido no site público; false = bloqueado. Respeito ao robots.txt é voluntário.
 */
export const robosIA: Record<string, boolean> = {
  GPTBot: true,
  'OAI-SearchBot': true,
  ClaudeBot: true,
  'Claude-SearchBot': true,
  PerplexityBot: true,
  'Google-Extended': true,
  CCBot: false,
};

export const seo = {
  siteUrl: opcional<string>(siteUrl ?? null, {
    rotulo: 'SITE_URL (domínio)',
    motivo: 'domínio ainda não existe; noindex até existir',
  }),
  idioma: 'pt-BR',
  locale: 'pt_BR',
  tituloPadrao: 'Clínica Espaço B — Estética e Harmonização Corporal e Facial',
  ogImagemSlot: 'og.imagem',
  /** schema.org: tipo da entidade (justificativa em docs/SEO.md) */
  tipoEntidade: 'HealthAndBeautyBusiness',
  /** nome real do negócio no schema (a ficha do Google usa um descritivo longo) */
  nomeEntidade: 'Clínica Espaço B',
  aggregateRating: false,
} as const;

/** URL absoluta quando houver SITE_URL; senão, caminho relativo (preview, sempre noindex). */
export function urlDe(caminho: string): string {
  const base = seo.siteUrl.valor?.replace(/\/$/, '');
  return base ? `${base}${caminho}` : caminho;
}
