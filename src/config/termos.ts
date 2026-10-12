// Termos da auditoria (scripts/audit-compliance.mjs). Listas editáveis pelo João.
// O Code NUNCA afrouxa estas listas nem a trava sem ordem expressa.
// vetados: bloqueiam produção · avisos: termos regulados que exigem conferência (não bloqueiam no HTML).

export interface Termo {
  id: string;
  /** Expressão regular (fonte), sempre aplicada sem diferenciar maiúsculas, salvo `sensivel`. */
  padrao: string;
  sensivel?: boolean;
  /** Exceção de contexto: o termo é permitido dentro de [data-modulo="casos"]. */
  permitidoEmModulo?: 'casos';
  /** Só vale quando tratamento.dra.ativo=false. */
  soSemDra?: boolean;
}

const MEDICAMENTOS = [
  'botox',
  'dysport',
  'xeomin',
  'mounjaro',
  'monjaro',
  'ozempic',
  'wegovy',
  'saxenda',
  'tirzepatida',
  'semaglutida',
];

export const vetados: Termo[] = [
  { id: 'garantido', padrao: '\\bgarantid\\w*' },
  { id: 'milagre', padrao: '\\bmilagr\\w*' },
  { id: 'sem dor', padrao: '\\bsem\\s+dor\\b' },
  { id: 'resultado definitivo', padrao: '\\bresultados?\\s+definitiv\\w*' },
  { id: '100%', padrao: '\\b100\\s?%' },
  { id: 'o melhor', padrao: '\\bo\\s+melhor\\b' },
  { id: 'a melhor', padrao: '\\ba\\s+melhor\\b' },
  { id: 'número 1', padrao: '\\bn(ú|u)mero\\s+(1|um)\\b|\\bn[º°o]\\.?\\s?1\\b' },
  { id: 'queima de gordura', padrao: '\\bqueima\\s+de\\s+gordura\\b' },
  { id: 'emagreça', padrao: '\\bemagre(ç|c)a\\b' },
  { id: 'abdome chapado', padrao: '\\babd(o|ô)men?\\s+chapado\\b' },
  { id: 'pochete', padrao: '\\bpochete\\b' },
  { id: 'antes e depois', padrao: '\\bantes\\s+e\\s+depois\\b', permitidoEmModulo: 'casos' },
  ...MEDICAMENTOS.map((m) => ({ id: m, padrao: `\\b${m}\\b` })),
  { id: 'Dra.', padrao: '\\bDra\\b\\.?', sensivel: true, soSemDra: true },
];

export const avisos: Termo[] = [
  { id: 'depilação definitiva', padrao: '\\bdepila(ç|c)(ã|a)o\\s+definitiva\\b' },
  { id: 'toxina botulínica', padrao: '\\btoxina\\s+botul(í|i)nica\\b' },
  { id: 'preenchimento', padrao: '\\bpreenchimentos?\\b' },
  { id: 'bioestimulador', padrao: '\\bbioestimulador\\w*' },
  { id: 'laser', padrao: '\\blaser\\b' },
  { id: 'LED', padrao: '\\bLED\\b', sensivel: true },
  { id: 'fisioterapeuta', padrao: '\\bfisioterapeuta\\b' },
  { id: 'especialista', padrao: '\\bespecialista\\w*' },
  { id: 'preço', padrao: 'R\\$|\\bpre(ç|c)os?\\b' },
  { id: 'desconto', padrao: '\\bdescontos?\\b' },
  { id: 'promoção', padrao: '\\bpromo(ç|c)(ã|a|õ|o)\\w*' },
];

/** Extra só para trechos de avaliação publicáveis (qualquer um bloqueia). */
export const vetadosEmAvaliacao: Termo[] = [
  { id: 'perfeito', padrao: '\\bperfeit\\w*' },
  { id: 'resultado', padrao: '\\bresultados?\\b' },
];
