// Avaliações do Google (dados conferidos em docs/dados/avaliacoes-google.json).
// Só itens com usavelNoSite:true saem; nome = nome + inicial; sem foto; sem AggregateRating.
import dados from '../../docs/dados/avaliacoes-google.json' with { type: 'json' };
import { aviso, confirmado, type Campo } from './tipos.ts';

export const LIMITE_DIAS = 60;

export interface Trecho {
  id: string;
  nome: string;
  trecho: string;
  estrelas: number;
}

interface Bruta {
  id: string;
  nomeExibicao: string;
  estrelas: number;
  trechoPublicavel: string | null;
  usavelNoSite: boolean;
}

export function diasDesde(iso: string, hoje = new Date()): number {
  return Math.floor((hoje.getTime() - new Date(`${iso}T00:00:00Z`).getTime()) / 86_400_000);
}

const conferidoEm = dados.meta.conferidoEm;
const idade = diasDesde(conferidoEm);
const fonte = `docs/dados/avaliacoes-google.json (${dados.meta.fonte})`;

export const avaliacoes = {
  nota: confirmado(dados.meta.notaMedia, fonte),
  total: confirmado(dados.meta.totalAvaliacoes, fonte),
  conferidoEm: (idade > LIMITE_DIAS
    ? aviso(
        'avaliações do Google desatualizadas',
        `conferidas há ${idade} dias (limite ${LIMITE_DIAS}); pedir print novo`,
        conferidoEm,
      )
    : confirmado(conferidoEm, fonte)) as Campo<string>,
  schemaAggregateRating: false,
  trechos: (dados.avaliacoes as Bruta[])
    .filter((a) => a.usavelNoSite && a.trechoPublicavel)
    .map<Trecho>((a) => ({
      id: a.id,
      nome: a.nomeExibicao,
      trecho: a.trechoPublicavel ?? '',
      estrelas: a.estrelas,
    })),
} as const;
