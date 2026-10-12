import { confirmado, informado, opcional } from './tipos.ts';

const JOAO = 'João (WAXLO), 12/10/2026';

export const marca = {
  nomeCurto: confirmado('Espaço B', JOAO),
  nomeDescritivo: confirmado('Clínica Espaço B — Estética e Harmonização Corporal e Facial', JOAO, {
    escopo: 'título/descritor; a marca continua "Espaço B"',
  }),
  razaoSocial: informado(
    'Clinica de Estetica Espaco B Ltda',
    'texto do Google/IA colado pelo João',
    {
      motivo: 'conferir no cartão CNPJ',
    },
  ),
  cnpj: opcional<string>(null, {
    exibir: false,
    motivo: 'decisão do João: o CNPJ não aparece no site',
  }),
  // Sem ano de início no texto (nunca "desde 20XX").
  tempoDeAtuacao: confirmado('há mais de 15 anos', JOAO, {
    escopo: 'atuação da Bia (não da clínica)',
    motivo: 'conferir na passada final de onde vem a contagem',
  }),
  origem: informado('Espaço B Clínica de Fisioterapia, dez/2013', 'texto do Google/IA', {
    exibir: false,
    motivo: 'histórico; não vira texto do site',
  }),
} as const;
