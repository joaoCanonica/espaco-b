import { aviso, confirmado, pendente } from './tipos.ts';
import { marca } from './marca.ts';

export const legal = {
  razaoSocial: marca.razaoSocial,
  cnpj: marca.cnpj, // exibir:false (decisão do João)
  responsavelTecnica: confirmado(
    { pessoa: 'bianca-cardoso', registro: 'CREFITO 183149' },
    'João (WAXLO), 12/10/2026',
  ),
  midiaPacientes: aviso(
    'termos de imagem das pacientes',
    'consentimento declarado pelo cliente; termos não arquivados (não bloqueia)',
    { declaradoPeloCliente: true, termoArquivado: false },
  ),
  privacidade: {
    controlador: pendente<string>('controlador dos dados (LGPD)', 'definir na sessão 7'),
    encarregado: pendente<string>('encarregado/contato LGPD', 'definir na sessão 7'),
    dataPolitica: pendente<string>('data da política de privacidade', 'sessão 7'),
  },
  avisoResultados: pendente<string>(
    'aviso de que resultados variam',
    'texto da sessão 5, conferência na 9',
  ),
} as const;
