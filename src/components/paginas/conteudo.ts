// Textos de /bia, /espaco, /casos, /contato e 404 (COPY_DECK §6–8 e §1.7, ou ordem do João na
// sessão 6C). Dados do cliente vêm da config; o que falta é pendente() e nunca é inventado.
import { contato, type Dia } from '../../config/contato.ts';
import { marca } from '../../config/marca.ts';
import { pessoas } from '../../config/pessoas.ts';
import { pendente } from '../../config/tipos.ts';
import { nomeBia, registroBia, tratamento } from '../home/conteudo.ts';

const bia = pessoas.bianca;

export const biaPagina = {
  legenda: 'A Bia',
  titulo: `${nomeBia}. Fisioterapeuta.`,
  /** "Bianca Cardoso · Fisioterapeuta · CREFITO 183149" (+ tratamento só se ativo). */
  credencial: [tratamento ? `${tratamento} ${nomeBia}` : nomeBia, bia.titulo.valor, registroBia]
    .filter(Boolean)
    .join(' · '),
  abertura: `A Bia trabalha com estética ${marca.tempoDeAtuacao.valor ?? ''}. É a responsável técnica do Espaço B, em Lages, e atende todos os protocolos da clínica.`,
  formacao: pendente<string>('Formação', 'curso, instituição e ano a enviar pelo João'),
  cursos: pendente<string>(
    'Cursos e habilitações',
    'lista com instituição e ano; habilitação de toxina no CREFITO-10 (a1); RQE se houver (a5)',
  ),
  termos: [
    {
      termo: '“Derretimento Facial”',
      texto: 'O nome que ela dá à perda de sustentação do rosto.',
    },
    {
      termo: '“Seu rosto mais jovem”',
      texto:
        'Título que ela usa nos conteúdos. Aqui é só o nome do conteúdo, sem promessa de resultado.',
    },
  ],
  serie: {
    titulo: '“Mulheres transformadas | Espaço B” — episódio 1',
    texto:
      'No primeiro episódio da série que ela grava na clínica, a Bia conta a própria história.',
    rotulo: 'Vídeo: episódio 1 da série, a Bia conta a própria história',
    transcricao: pendente<string>(
      'Transcrição do episódio 1',
      'transcrição revisada a enviar (slot .vtt vazio); legendas em .vtt pendentes',
    ),
  },
  cafe: {
    titulo: '“Café com Bia”',
    texto: 'Conversas curtas sobre o que aparece no consultório.',
    rotulo: 'Vídeo: abertura do Café com Bia',
    nota: 'Trecho liberado: só a abertura. O restante depende de o João ouvir e liberar.',
  },
};

export const espacoPagina = {
  legenda: 'O espaço',
  titulo: 'O Espaço B.',
  texto:
    'Uma clínica no bairro Coral, em Lages. Salas reservadas, luz quente e uma recepção para você chegar com calma.',
  rotuloVideo: 'Vídeo do ambiente da clínica, sem som',
  galeria: pendente<string>(
    'Galeria de fotos do espaço',
    'fotos reais em alta, sem pessoas, a enviar pelo João; quadros do vídeo exigem extensão do prepare-media',
  ),
  acessibilidade: pendente<string>(
    'Acessibilidade',
    'acesso, rampa/escada, estacionamento: a informar pelo João',
  ),
  comoChegar: 'Como chegar',
  verMapa: 'Ver no Google Maps',
};

export const casosPagina = {
  legenda: 'Casos',
  titulo: 'Casos acompanhados na clínica.',
  aviso:
    'Cada pessoa responde de um jeito. Estas imagens mostram casos reais, publicados com autorização, e não indicam o resultado que você vai ter.',
  procedimento: pendente<string>('Procedimento', 'procedimento de cada caso a enviar pelo João'),
  notaFinal:
    'Imagens publicadas com autorização das pacientes. Resultados variam de pessoa para pessoa.',
  executora: nomeBia,
};

const DIAS: Record<Dia, string> = {
  seg: 'segunda',
  ter: 'terça',
  qua: 'quarta',
  qui: 'quinta',
  sex: 'sexta',
  sab: 'sábado',
  dom: 'domingo',
};
const hora = (h: string) => {
  const [hh = '0', mm = '00'] = h.split(':');
  return `${Number(hh)}h${mm === '00' ? '' : mm}`;
};
/** "segunda a sexta, 9h–12h e 13h30–18h30" · "sábado, 8h–12h" · "domingo, fechado" (COPY_DECK §8). */
export const horariosExtenso: string[] = (() => {
  const h = contato.horarios.valor;
  if (!h) return [];
  const ordem: Dia[] = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
  const grupos: { de: Dia; ate: Dia; txt: string }[] = [];
  for (const d of ordem) {
    const txt = h[d].length
      ? h[d].map((f) => `${hora(f.abre)}–${hora(f.fecha)}`).join(' e ')
      : 'fechado';
    const u = grupos[grupos.length - 1];
    if (u && u.txt === txt) u.ate = d;
    else grupos.push({ de: d, ate: d, txt });
  }
  return grupos.map(
    (g) => `${g.de === g.ate ? DIAS[g.de] : `${DIAS[g.de]} a ${DIAS[g.ate]}`}, ${g.txt}`,
  );
})();

export const contatoPagina = {
  legenda: 'Contato',
  titulo: 'Agende a sua avaliação.',
  primeiraConsulta: 'Como é a primeira consulta.',
};

export const pagina404 = {
  titulo: 'Esta página não existe.',
  texto: 'O endereço pode ter mudado ou estar incompleto.',
  link: 'Voltar para o início',
};
