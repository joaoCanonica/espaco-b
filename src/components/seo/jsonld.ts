// JSON-LD (schema.org) tipado com schema-dts (gerado do vocabulário oficial): nome de tipo ou de
// propriedade errado não compila. Sem AggregateRating e sem Review (auto-avaliação não é
// elegível a rich result; ver docs/SEO.md). Tudo vem da config; nada é inventado.
import type {
  BreadcrumbList,
  DayOfWeek,
  FAQPage,
  Graph,
  HealthAndBeautyBusiness,
  OpeningHoursSpecification,
  Person,
  Thing,
  WebPage,
  WebSite,
} from 'schema-dts';
import { contato, type Dia } from '../../config/contato.ts';
import { marca } from '../../config/marca.ts';
import { pessoas } from '../../config/pessoas.ts';
import { seo, urlDe } from '../../config/seo.ts';

type Folha<T> = Exclude<T, string>;

const DIA_SCHEMA: Record<Dia, DayOfWeek> = {
  seg: 'https://schema.org/Monday',
  ter: 'https://schema.org/Tuesday',
  qua: 'https://schema.org/Wednesday',
  qui: 'https://schema.org/Thursday',
  sex: 'https://schema.org/Friday',
  sab: 'https://schema.org/Saturday',
  dom: 'https://schema.org/Sunday',
};

export const ID_NEGOCIO = () => urlDe('/#negocio');
export const ID_SITE = () => urlDe('/#site');
export const ID_BIA = () => urlDe('/bia/#bianca-cardoso');

/** NAP exatamente como na config (bairro Coral; nunca o bairro divergente dos diretórios). */
export function nap() {
  const e = contato.endereco.valor;
  const w = contato.whatsapp.valor;
  return {
    nome: seo.nomeEntidade,
    rua: e ? `${e.logradouro}, ${e.numero}` : '',
    bairro: e?.bairro ?? '',
    cidade: e?.cidade ?? '',
    uf: e?.uf ?? '',
    cep: e?.cep ?? '',
    pais: e?.pais ?? 'BR',
    // +5549999115351 → +55 49 99911-5351
    telefone: w ? w.e164.replace(/^\+(\d{2})(\d{2})(\d{5})(\d{4})$/, '+$1 $2 $3-$4') : '',
  };
}

function horarios(): Folha<OpeningHoursSpecification>[] {
  const h = contato.horarios.valor;
  if (!h) return [];
  const porFaixa = new Map<string, Dia[]>();
  for (const [dia, faixas] of Object.entries(h) as [Dia, { abre: string; fecha: string }[]][])
    for (const f of faixas) {
      const k = `${f.abre}-${f.fecha}`;
      porFaixa.set(k, [...(porFaixa.get(k) ?? []), dia]);
    }
  return [...porFaixa].map(([k, dias]) => {
    const [abre = '', fecha = ''] = k.split('-');
    return {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: dias.map((d) => DIA_SCHEMA[d]),
      opens: abre,
      closes: fecha,
    };
  });
}

export function bianca(): Person {
  const b = pessoas.bianca;
  // Só o que está confirmado: nome e cargo. Sem credencial não verificada, sem "Dra.".
  return {
    '@type': 'Person',
    '@id': ID_BIA(),
    name: b.nome.valor ?? '',
    jobTitle: b.titulo.valor ?? '',
    worksFor: { '@id': ID_NEGOCIO() },
    url: urlDe('/bia/'),
  };
}

export function negocio(imagem?: string): Folha<HealthAndBeautyBusiness> {
  const n = nap();
  const geo = contato.google.geo.valor;
  const insta = contato.instagram.valor?.url;
  const maps = contato.google.mapsUrl.valor;
  const descritivo = marca.nomeDescritivo.valor;
  return {
    '@type': 'HealthAndBeautyBusiness',
    '@id': ID_NEGOCIO(),
    name: n.nome,
    ...(descritivo && { alternateName: descritivo }),
    url: urlDe('/'),
    telephone: n.telefone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${n.rua}, ${n.bairro}`,
      addressLocality: n.cidade,
      addressRegion: n.uf,
      postalCode: n.cep,
      addressCountry: n.pais,
    },
    openingHoursSpecification: horarios(),
    areaServed: { '@type': 'City', name: `${n.cidade}, ${n.uf}` },
    founder: { '@id': ID_BIA() },
    employee: { '@id': ID_BIA() },
    sameAs: [insta, maps].filter((x): x is string => !!x),
    ...(geo && { geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng } }),
    ...(maps && { hasMap: maps }),
    ...(imagem && { image: imagem }),
  };
}

export function site(): WebSite {
  return {
    '@type': 'WebSite',
    '@id': ID_SITE(),
    url: urlDe('/'),
    name: seo.nomeEntidade,
    inLanguage: seo.idioma,
    publisher: { '@id': ID_NEGOCIO() },
  };
}

export function pagina(caminho: string, titulo: string, descricao: string): WebPage {
  return {
    '@type': 'WebPage',
    '@id': urlDe(`${caminho}#pagina`),
    url: urlDe(caminho),
    name: titulo,
    description: descricao,
    inLanguage: seo.idioma,
    isPartOf: { '@id': ID_SITE() },
    about: { '@id': ID_NEGOCIO() },
  };
}

export function trilha(itens: { nome: string; caminho: string }[]): BreadcrumbList {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: itens.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nome,
      item: urlDe(it.caminho),
    })),
  };
}

export function faq(perguntas: { pergunta: string; resposta: string }[]): FAQPage {
  return {
    '@type': 'FAQPage',
    mainEntity: perguntas.map((p) => ({
      '@type': 'Question',
      name: p.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: p.resposta },
    })),
  };
}

export function grafo(nos: Thing[]): Graph {
  return { '@context': 'https://schema.org', '@graph': nos as Graph['@graph'] };
}
