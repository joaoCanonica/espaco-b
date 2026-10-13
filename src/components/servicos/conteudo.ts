// Textos das páginas de serviço e de protocolos, copiados de docs/COPY_DECK.md (seções 2–5 e 9).
// Resumo "citável" (40–60 palavras) = frases aprovadas do deck, juntadas sem reescrita.
// Falta de texto → pendente() (preview: "a informar" + selo; produção: some com alerta).
// Bloco [CONDICIONAL] → aviso() com o texto (preview: selo; produção: some com alerta).
import { aviso, pendente, type Campo } from '../../config/tipos.ts';
import { perguntas as faqHome, type Fonte, type Pergunta } from '../home/conteudo.ts';

export type { Fonte, Pergunta };

/** Bloco de texto que pode estar pendente ou condicionado. */
export interface Bloco {
  titulo: string;
  texto: Campo<string> | string;
  fontes?: Fonte[];
}

/** Pergunta que pode estar condicionada (FAQ 4 e 5 do deck). */
export interface PerguntaCampo extends Pergunta {
  condicao?: Campo<string>;
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
  e1: {
    rotulo: 'Aesthetic Plastic Surgery, 2025 (revisão sistemática)',
    url: 'https://link.springer.com/article/10.1007/s00266-025-05412-8',
  },
  e2: {
    rotulo: 'Dermatologic Surgery, 2025 (revisão sistemática)',
    url: 'https://www.ovid.com/journals/dersu/fulltext/10.1097/dss.0000000000004521',
  },
  e3: {
    rotulo: 'Revisão sobre duração do efeito (PubMed 20369902)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20369902/',
  },
  e5: {
    rotulo: 'Metrópoles, 2026 (imprensa)',
    url: 'https://www.metropoles.com/vida-e-estilo/sindrome-da-face-hiperpreenchida-gera-alerta-sobre-excessos-na-beleza',
  },
} satisfies Record<string, Fonte>;

// FAQ do deck (seção 9): as da home são reaproveitadas pelo número do deck.
const NUMERO_HOME = [1, 2, 3, 6, 7, 8, 9];
function faq(n: number): Pergunta {
  const p = faqHome[NUMERO_HOME.indexOf(n)];
  if (!p) throw new Error(`FAQ ${n} não está na lista da home`);
  return p;
}
const habilitacao = (motivo: string) =>
  aviso<string>('condição de publicação', motivo, 'condicional');
const faq4: PerguntaCampo = {
  pergunta: 'Bioestimulador ou fios: qual a diferença?',
  resposta:
    'O bioestimulador é uma substância injetada que estimula o colágeno da própria pele; o efeito aparece aos poucos e dura meses, conforme o produto. Os fios absorvíveis dão sustentação logo depois da aplicação, mas a duração no longo prazo ainda é pouco estudada. A escolha depende do que a avaliação mostrar.',
  fontes: [F.e1, F.e2],
  condicao: habilitacao(
    'só publicar se a Bia oferece esses procedimentos com habilitação conferida',
  ),
};
const faq5: PerguntaCampo = {
  pergunta: 'Quanto tempo dura a toxina botulínica?',
  resposta:
    'O efeito é temporário. Os estudos descrevem, em geral, de 3 a 5 meses para as rugas de expressão da testa e entre as sobrancelhas, variando com a área e a dose. Depois disso o músculo volta a trabalhar, e a aplicação pode ser repetida.',
  fontes: [F.e3],
  condicao: habilitacao('apostilamento de toxina botulínica deferido no CREFITO-10 (a1)'),
};

/** Passos do atendimento (deck 1.9) + o que o deck diz das sessões de cada serviço. */
export const passosAvaliacao = [
  'Você conta o que incomoda.',
  'A Bia avalia pele, contorno e histórico.',
  'Vocês combinam um plano, ou a conclusão de que não é a hora.',
];
export const semCompromisso = 'Sem compromisso de fechar nada na avaliação.';
export const avisoGeral =
  'As informações deste site são educativas e não substituem a avaliação individual. Cada pessoa responde de um jeito aos procedimentos.';
export const ctaWhatsapp = 'Agendar avaliação pelo WhatsApp';

const contraindicacoes = pendente<string>(
  'Contraindicações gerais',
  'o deck não traz contraindicações; a Bia/o João devem enviar a lista revisada',
);

export interface PaginaServico {
  slug: 'harmonizacao-facial' | 'corpo-e-emagrecimento' | 'pele-e-tecnologia';
  /** slugs de src/config/servicos.ts que a página cobre */
  servicos: string[];
  rotuloCurto: string;
  legenda: string;
  titulo: string;
  abertura: string;
  resumo: string;
  paraQuem: Bloco[];
  sessoes: Bloco;
  blocos: Bloco[];
  importante: Bloco[];
  faq: PerguntaCampo[];
}

export const paginas: PaginaServico[] = [
  {
    slug: 'harmonizacao-facial',
    servicos: ['harmonizacao-orofacial'],
    rotuloCurto: 'Rosto',
    legenda: 'Harmonização facial',
    titulo: 'Harmonização facial com método.',
    abertura:
      'Expressão, contorno e qualidade da pele, avaliados juntos. O objetivo é o seu rosto descansado, não um rosto diferente.',
    resumo:
      'Expressão, contorno e qualidade da pele, avaliados juntos. O objetivo é o seu rosto descansado, não um rosto diferente. Na avaliação, a Bia ouve o que incomoda você, examina pele, contorno e histórico e explica o que faz sentido agora. Às vezes a conclusão é esperar ou procurar outro profissional.',
    paraQuem: [
      {
        titulo: 'O que entra',
        texto:
          'Harmonização com método: expressão, contorno e qualidade da pele, em doses que respeitam o seu rosto.',
      },
      {
        titulo: 'Indicações detalhadas',
        texto: pendente('Para quem é (rosto)', 'indicações por procedimento a enviar pelo João'),
      },
    ],
    sessoes: {
      titulo: 'Sessões',
      texto: pendente(
        'Como são as sessões (rosto)',
        'duração, intervalo e retorno a enviar pelo João',
      ),
    },
    blocos: [
      {
        titulo: 'Toxina botulínica',
        texto: aviso(
          'Bloco "Toxina botulínica"',
          'CONDICIONAL: só publicar com o apostilamento de toxina botulínica deferido no CREFITO-10 (a1)',
          'A toxina botulínica relaxa os músculos que formam as rugas de expressão, como as da testa e entre as sobrancelhas. O efeito é temporário: os estudos descrevem em geral de 3 a 5 meses, e depois o músculo volta a trabalhar.',
        ),
        fontes: [F.e3],
      },
      {
        titulo: 'Preenchimentos: lábios e sulco nasogeniano',
        texto: pendente(
          'Bloco "Preenchimentos"',
          'CONDICIONAL: base COFFITO para preenchimento por fisioterapeuta não pesquisada; texto só depois da verificação',
        ),
      },
      {
        titulo: '“FaceLifting”',
        texto: pendente('Bloco "FaceLifting"', 'o que é o serviço FaceLifting: a enviar pelo João'),
      },
      {
        titulo: '“Derretimento Facial”',
        texto:
          'A Bia chama de “Derretimento Facial” a sensação de que o rosto perdeu sustentação. Isso pode acontecer, por exemplo, depois de emagrecer muito, quando o rosto perde volume e a pele fica mais flácida. A avaliação mostra o que está por trás em cada caso.',
        fontes: [F.b1, F.e5],
      },
      {
        titulo: '“Seu rosto mais jovem”',
        texto:
          'Título que ela usa nos conteúdos. Aqui é só o nome do conteúdo, sem promessa de resultado.',
      },
    ],
    importante: [
      {
        titulo: 'Não é um diagnóstico',
        texto:
          '“Derretimento Facial” não é um diagnóstico: é o ponto de partida para a avaliação entender o que mudou.',
        fontes: [F.b1],
      },
      {
        titulo: 'Às vezes a resposta é esperar',
        texto: 'Às vezes a conclusão é esperar ou procurar outro profissional.',
      },
      { titulo: 'Contraindicações', texto: contraindicacoes },
    ],
    faq: [faq(1), faq(8), faq5, faq4, faq(9)],
  },
  {
    slug: 'corpo-e-emagrecimento',
    servicos: ['corpo-e-emagrecimento'],
    rotuloCurto: 'Corpo',
    legenda: 'Corpo e emagrecimento',
    titulo: 'Flacidez depois de emagrecer.',
    abertura:
      'Emagrecer muito pode deixar a pele com menos sustentação, no rosto e no corpo. Não é falta de cuidado: é a pele se adaptando a um volume menor.',
    resumo:
      'Emagrecer muito pode deixar a pele com menos sustentação, no rosto e no corpo. Não é falta de cuidado: é a pele se adaptando a um volume menor. Quem está emagrecendo com acompanhamento médico continua com o seu médico. A Bia cuida da pele e do contorno, em conversa com o tratamento que você já faz.',
    paraQuem: [
      {
        titulo: 'O que entra',
        texto:
          'Gordura localizada e flacidez, inclusive depois de emagrecer. Avaliação primeiro, protocolo depois.',
        fontes: [F.b1],
      },
      {
        titulo: 'O que a avaliação define',
        texto:
          'Quanto da flacidez é pele, quanto é gordura localizada e quanto é músculo. Flacidez acentuada costuma ser caso cirúrgico; nesse caso a Bia diz isso na avaliação e orienta você a procurar um cirurgião plástico.',
        fontes: [F.b1],
      },
    ],
    sessoes: {
      titulo: 'Sessões',
      texto: 'A indicação é individual e o acompanhamento mostra se vale continuar.',
    },
    blocos: [
      {
        titulo: 'Tecnologias para firmeza',
        texto:
          'Há tecnologias que aquecem camadas da pele para estimular firmeza. Elas têm mais estudos no rosto e no pescoço do que no corpo. Por isso a indicação é individual e o acompanhamento mostra se vale continuar.',
        fontes: [F.b3, F.b4],
      },
      {
        titulo: 'Quais tecnologias a clínica usa',
        texto: pendente(
          'Tecnologias de firmeza da clínica',
          'lista (pela função, sem marca) a enviar pelo João',
        ),
      },
      {
        titulo: 'Gordura localizada',
        texto:
          'O frio controlado é uma das técnicas estudadas para reduzir gordura localizada, com medições feitas cerca de três meses depois. Não substitui a perda de peso. Pode ter efeitos colaterais, a maioria leves e passageiros, e existe um efeito raro em que a gordura aumenta na área tratada.',
        fontes: [F.c1, F.c2],
      },
      {
        titulo: 'Acompanhamento',
        texto:
          'Quem está emagrecendo com acompanhamento médico continua com o seu médico. A Bia cuida da pele e do contorno, em conversa com o tratamento que você já faz.',
      },
    ],
    importante: [
      {
        titulo: 'Flacidez acentuada',
        texto: 'Flacidez acentuada costuma ser caso cirúrgico.',
        fontes: [F.b1],
      },
      {
        titulo: 'Frio controlado',
        texto:
          'Não substitui a perda de peso. Pode ter efeitos colaterais, a maioria leves e passageiros, e existe um efeito raro em que a gordura aumenta na área tratada.',
        fontes: [F.c1, F.c2],
      },
      { titulo: 'Contraindicações', texto: contraindicacoes },
    ],
    faq: [faq(2), faq(3), faq(6), faq(1)],
  },
  {
    slug: 'pele-e-tecnologia',
    servicos: ['depilacao', 'limpeza-de-pele', 'pele-e-tecnologia'],
    rotuloCurto: 'Pele',
    legenda: 'Pele e tecnologia',
    titulo: 'Pele e depilação.',
    abertura: 'Tecnologias para textura, manchas e redução duradoura dos pelos.',
    resumo:
      'A depilação com luz reduz a quantidade de pelos ao longo das sessões. A redução varia com a área, a cor e a espessura do pelo e com o seu ciclo de crescimento. Por isso a avaliação vem antes da primeira sessão. Limpeza profunda, com extração e cuidado com a barreira da pele.',
    paraQuem: [
      {
        titulo: 'O que entra',
        texto: 'Tecnologias para textura, manchas e redução duradoura dos pelos.',
      },
      {
        titulo: 'Indicações de pele',
        texto: pendente(
          'Para quem é (pele)',
          'tecnologias e indicações de pele (limpeza, rejuvenescimento) a enviar pelo João',
        ),
      },
    ],
    sessoes: {
      titulo: 'Sessões',
      texto: 'A avaliação define o plano e o intervalo entre sessões.',
      fontes: [F.d2, F.d3],
    },
    blocos: [
      {
        titulo: 'Depilação com luz: redução duradoura dos pelos',
        texto:
          'A depilação com luz reduz a quantidade de pelos ao longo das sessões. A redução varia com a área, a cor e a espessura do pelo e com o seu ciclo de crescimento. Por isso a avaliação vem antes da primeira sessão.',
        fontes: [F.d2, F.d3],
      },
      {
        titulo: 'Limpeza de pele',
        texto: 'Limpeza profunda, com extração e cuidado com a barreira da pele.',
      },
      {
        titulo: 'Rejuvenescimento',
        texto: pendente(
          'Bloco "Rejuvenescimento"',
          'tecnologia descrita pela função (sem marca) e indicações a enviar pelo João',
        ),
      },
    ],
    importante: [
      {
        titulo: 'Não elimina todos os pelos',
        texto:
          'Ela reduz bastante a quantidade de pelos, e essa redução costuma durar, mas não elimina todos os pelos de forma permanente. Algumas pessoas precisam de manutenção.',
        fontes: [F.d2, F.d3],
      },
      { titulo: 'Contraindicações', texto: contraindicacoes },
    ],
    faq: [faq(7), faq(1), faq(9)],
  },
];

export const protocolosPagina = {
  legenda: 'Protocolos da Bia',
  titulo: 'Protocolos com nome.',
  abertura:
    'Cada protocolo junta técnicas que a Bia escolheu e ordena do mesmo jeito para quem tem a mesma indicação. O nome é dela; a indicação é sua, definida na avaliação.',
  resumo:
    'Três protocolos com o nome de quem os criou e aplica. Cada protocolo junta técnicas que a Bia escolheu e ordena do mesmo jeito para quem tem a mesma indicação. O nome é dela; a indicação é sua, definida na avaliação.',
  faq: [faq(1), faq(9), faq(8)],
};

/** Estrutura de cada protocolo (deck 5): tudo pendente até o João mandar o conteúdo. */
export const conteudoDoProtocolo = (nome: string) => ({
  paraQuem: pendente<string>(`Para quem é (${nome})`, 'conteúdo do protocolo a enviar pelo João'),
  sessao: pendente<string>(`Como é a sessão (${nome})`, 'conteúdo do protocolo a enviar pelo João'),
  esperar: pendente<string>(
    `O que esperar (${nome})`,
    'conteúdo do protocolo a enviar pelo João; sem prazo nem número',
  ),
  resumo: pendente<string>(`Resumo citável (${nome})`, 'depende do conteúdo do protocolo'),
});
