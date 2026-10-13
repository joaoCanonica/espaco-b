// Liga/desliga de seções. Em preview um módulo desligado aparece como cartão (nunca some);
// em produção ele some com alerta no build.
export interface Modulo {
  ativo: boolean;
  motivo: string;
}

export const modulos = {
  casos: {
    ativo: true,
    motivo: 'mídia de paciente declarada autorizada pelo cliente; nunca na primeira dobra',
  },
  equipe: {
    ativo: false,
    motivo: 'só a Bianca atende por ora; o Prompt D liga quando houver equipe',
  },
  avaliacoesGoogle: { ativo: true, motivo: 'nota e total reais + trechos usavelNoSite' },
  historias: { ativo: false, motivo: 'desligado por decisão do João (12/10/2026)' },
} as const satisfies Record<string, Modulo>;

export type NomeModulo = keyof typeof modulos;
