// Textos da home (seções 2–9), copiados de docs/COPY_DECK.md. Dados do cliente vêm da config.
import { contato, type Dia, type Faixa } from '../../config/contato.ts';
import { marca } from '../../config/marca.ts';
import { pessoas } from '../../config/pessoas.ts';
import { pendente, type Campo } from '../../config/tipos.ts';
import { hero } from '../../content/hero.ts';

const bia = pessoas.bianca;
export const nomeBia = bia.nome.valor ?? '';
export const registroBia = `${bia.registro.valor?.conselho} ${bia.registro.valor?.numero}`;
/** {{tratamento}}: vazio enquanto tratamento.dra estiver desligado. */
export const tratamento = bia.tratamento.dra.ativo ? 'Dra.' : '';

const wa = contato.whatsapp.valor;
export const linkWhatsapp = wa
  ? `https://wa.me/${wa.e164.replace(/\D/g, '')}?text=${encodeURIComponent(hero.mensagemWhatsapp)}`
  : undefined;

const end = contato.endereco.valor;
export const enderecoLinhas = end
  ? [
      `${end.logradouro}, ${end.numero}`,
      `${end.bairro} · ${end.cidade}/${end.uf}`,
      `CEP ${end.cep}`,
    ]
  : [];

// "09:00" → "9h"; "13:30" → "13h30"
const hora = (h: string) => {
  const [hh = '0', mm = '00'] = h.split(':');
  return `${Number(hh)}h${mm === '00' ? '' : mm}`;
};
const faixas = (f: Faixa[]) => f.map((x) => `${hora(x.abre)}–${hora(x.fecha)}`).join(' e ');
const NOMES: Record<Dia, string> = {
  seg: 'seg',
  ter: 'ter',
  qua: 'qua',
  qui: 'qui',
  sex: 'sex',
  sab: 'sáb',
  dom: 'dom',
};
/** Dias consecutivos com o mesmo horário viram um intervalo ("seg–sex"). Domingo fechado some. */
export const horarios: { dias: string; horas: string }[] = (() => {
  const h = contato.horarios.valor;
  if (!h) return [];
  const ordem: Dia[] = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
  const grupos: { de: Dia; ate: Dia; horas: string }[] = [];
  for (const d of ordem) {
    const lista = h[d];
    if (!lista.length) continue;
    const horas = faixas(lista);
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.horas === horas) ultimo.ate = d;
    else grupos.push({ de: d, ate: d, horas });
  }
  return grupos.map((g) => ({
    dias: g.de === g.ate ? NOMES[g.de] : `${NOMES[g.de]}–${NOMES[g.ate]}`,
    horas: g.horas,
  }));
})();

export const manifesto = {
  legenda: 'Manifesto',
  frase: 'Primeiro a gente entende o seu rosto e o seu corpo. Depois decide o que fazer.',
  paragrafo: `A Bia trabalha com estética ${marca.tempoDeAtuacao.valor ?? ''}. Cada atendimento começa por uma avaliação: o que incomoda você, o que a sua pele mostra, o que faz sentido agora e o que pode esperar. Rosto, corpo e pele entram no mesmo plano.`,
};

export const eixos = {
  legenda: 'Três eixos',
  titulo: 'Três eixos',
  itens: [
    {
      numero: '01',
      nome: 'Rosto',
      texto:
        'Harmonização com método: expressão, contorno e qualidade da pele, em doses que respeitam o seu rosto.',
      href: '/harmonizacao-facial/',
      imagem: 'imagem3',
    },
    {
      numero: '02',
      nome: 'Corpo',
      texto:
        'Gordura localizada e flacidez, inclusive depois de emagrecer. Avaliação primeiro, protocolo depois.',
      href: '/corpo-e-emagrecimento/',
      imagem: 'imagem6',
    },
    {
      numero: '03',
      nome: 'Pele e depilação',
      texto: 'Tecnologias para textura, manchas e redução duradoura dos pelos.',
      href: '/pele-e-laser/',
      imagem: 'imagem5',
    },
  ],
};

/** Campos de conteúdo dos protocolos: ainda não existem na config (COPY_DECK 1.4 [PENDENTE]). */
export const conteudoProtocolo: { paraQuem: Campo<string>; sessao: Campo<string> } = {
  paraQuem: pendente('Para quem é', 'conteúdo do protocolo a enviar pelo João'),
  sessao: pendente('Como é a sessão', 'conteúdo do protocolo a enviar pelo João'),
};

export const protocolosTexto = {
  legenda: 'Protocolos da Bia',
  abertura: 'Três protocolos com o nome de quem os criou e aplica.',
  rotulos: {
    'harmonizacao-orofacial': 'Rosto',
    'corpo-e-emagrecimento': 'Corpo',
  } as Record<string, string>,
  todos: { rotulo: 'Ver os protocolos', href: '/protocolos-bia/' },
};

export const biaTexto = {
  legenda: 'A Bia',
  titulo: 'Fisioterapeuta. Há anos olhando para o mesmo detalhe que você.',
  texto: `${tratamento ? `${tratamento} ` : ''}${nomeBia} é fisioterapeuta (${registroBia}) e responsável técnica do Espaço B. Atende todos os protocolos da clínica. Explica o que funciona, o que não funciona e por quê.`,
  credencial: `Fisioterapeuta · ${registroBia}`,
  consulta: pendente<string>(
    'Consultar o registro no CREFITO-10',
    'URL de consulta pública do CREFITO-10 não encontrada',
  ),
  botao: { rotulo: 'Conhecer a Bia', href: '/bia/' },
  rotuloVideo: 'Vídeo da série com a Bia',
};

export const espacoTexto = {
  legenda: 'O espaço',
  titulo: 'O ambiente faz parte do atendimento.',
  texto: 'Luz quente, sala reservada e tempo para conversar antes de qualquer procedimento.',
  rotuloVideo: 'Vídeo do ambiente da clínica',
};

export const casosTexto = {
  legenda: 'Casos',
  titulo: 'Casos acompanhados na clínica.',
  aviso:
    'Cada pessoa responde de um jeito. Estas imagens mostram casos reais, publicados com autorização, e não indicam o resultado que você vai ter.',
  legendaCaso: pendente<string>(
    'área tratada · protocolo · data do registro',
    'dados de cada caso P-001…P-008 a enviar pelo João',
  ),
};

export const googleTexto = {
  legenda: 'No Google',
  link: 'Ver todas no Google',
  preferidos: ['G-003', 'G-007', 'G-006'],
};

export interface Fonte {
  rotulo: string;
  url: string;
}
export interface Pergunta {
  pergunta: string;
  resposta: string;
  fontes: Fonte[];
}

const F = {
  b1: {
    rotulo: 'Aesthetic Surgery Journal Open Forum, 2024 (revisão de escopo)',
    url: 'https://academic.oup.com/asjopenforum/article/doi/10.1093/asjof/ojae069/7739023',
  },
  b3: {
    rotulo: 'Revisão sistemática de ultrassom microfocado, 2023',
    url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9861614/',
  },
  b4: {
    rotulo: 'Aesthetic Surgery Journal 45(3), meta-análise',
    url: 'https://academic.oup.com/asj/article/45/3/NP86/7900203',
  },
  c1: {
    rotulo: 'Obesity Reviews, 2025 (meta-análise)',
    url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/obr.13925',
  },
  c2: {
    rotulo: 'ASJ Open Forum, 2025 (meta-análise)',
    url: 'https://academic.oup.com/asjopenforum/article/doi/10.1093/asjof/ojaf142/8307545',
  },
  d2: {
    rotulo: 'Journal of Cosmetic and Laser Therapy, 2022 (revisão sistemática)',
    url: 'https://www.tandfonline.com/doi/full/10.1080/14764172.2022.2075899',
  },
  d3: {
    rotulo: 'Revisão Cochrane',
    url: 'https://cochrane.org/pt/CD004684/SKIN_remocao-de-pelos-indesejados-por-sistemas-de-laser-e-fonte-de-luz-intensa-pulsada',
  },
  e5: {
    rotulo: 'Metrópoles, 2026 (imprensa)',
    url: 'https://www.metropoles.com/vida-e-estilo/sindrome-da-face-hiperpreenchida-gera-alerta-sobre-excessos-na-beleza',
  },
  a1: {
    rotulo: 'Acórdão COFFITO nº 609/2023',
    url: 'https://abmes.org.br/legislacoes/detalhe/4296/acordao-coffito-n-609-2023',
  },
} satisfies Record<string, Fonte>;

// FAQ 1, 2, 3, 6, 7, 8, 9 do COPY_DECK (4 e 5 são condicionais e ficam fora).
export const perguntas: Pergunta[] = [
  {
    pergunta: 'O que é a avaliação e por que ela vem antes de tudo?',
    resposta:
      'Na avaliação, a Bia ouve o que incomoda você, examina pele, contorno e histórico e explica o que faz sentido agora. Às vezes a conclusão é esperar ou procurar outro profissional. Só depois disso vocês combinam um plano, sem compromisso de fechar nada na hora.',
    fontes: [],
  },
  {
    pergunta: 'Por que a pele fica flácida depois de emagrecer?',
    resposta:
      'Quando o volume diminui rápido, a pele precisa se adaptar a uma área menor, e nem sempre recupera a firmeza. No rosto, os estudos mostram perda de volume no meio da bochecha e flacidez no pescoço. O quanto isso acontece varia de pessoa para pessoa.',
    fontes: [F.b1],
  },
  {
    pergunta: 'Tecnologia para firmeza funciona no corpo?',
    resposta:
      'Há tecnologias que aquecem camadas da pele para estimular firmeza. Os estudos são mais numerosos no rosto e no pescoço; no corpo, a evidência ainda é menor. Flacidez acentuada costuma ser caso cirúrgico. Na avaliação, a Bia diz com franqueza se vale tentar ou se o caminho é outro.',
    fontes: [F.b1, F.b3, F.b4],
  },
  {
    pergunta: 'A redução de gordura por frio substitui a perda de peso?',
    resposta:
      'Não. Ela é estudada para gordura localizada, em quem já está perto do peso que deseja, com medições feitas cerca de três meses depois. Pode ter efeitos colaterais, quase sempre leves, e existe um efeito raro em que a gordura aumenta. Por isso a indicação é individual.',
    fontes: [F.c1, F.c2],
  },
  {
    pergunta: 'A depilação com luz é para sempre?',
    resposta:
      'Ela reduz bastante a quantidade de pelos, e essa redução costuma durar, mas não elimina todos os pelos de forma permanente. O resultado varia com a área, a cor e a espessura do pelo. Algumas pessoas precisam de manutenção. A avaliação define o plano e o intervalo entre sessões.',
    fontes: [F.d2, F.d3],
  },
  {
    pergunta: 'O que a Bia chama de “Derretimento Facial”?',
    resposta:
      'É o nome que ela dá à sensação de que o rosto perdeu sustentação: contorno menos marcado, bochechas mais baixas, pescoço mais flácido. Pode aparecer com a idade ou depois de emagrecer muito. Não é um diagnóstico: é o ponto de partida para a avaliação entender o que mudou.',
    fontes: [F.b1, F.e5],
  },
  {
    pergunta: 'Quem faz os procedimentos?',
    resposta: `Todos os atendimentos são feitos pela fisioterapeuta ${nomeBia}, ${registroBia}, responsável técnica do Espaço B. Cada procedimento segue a habilitação reconhecida pelo conselho da profissão, e você pode consultar o registro dela no site do CREFITO. Se tiver dúvida, pergunte na avaliação.`,
    fontes: [F.a1],
  },
];

export const perguntasTexto = { legenda: 'Perguntas', titulo: 'Perguntas' };

export const contatoTexto = {
  legenda: 'Primeira consulta',
  titulo: 'Como é a primeira consulta.',
  passos: [
    'Você conta o que incomoda.',
    'A Bia avalia pele, contorno e histórico.',
    'Vocês combinam um plano, ou a conclusão de que não é a hora.',
  ],
  complemento: 'Sem compromisso de fechar nada na avaliação.',
  botao: 'Agendar avaliação pelo WhatsApp',
  mapa: 'Ver no mapa',
};
