// Mídia utilizável para /casos: item publicável, consentimento registrado (nunca "nenhum" nem
// "terceiros") e clipes curtos já gerados. Sem isso a rota não existe (getStaticPaths vazio).
import { alertarOmissao, emProducao } from '../../config/ambiente.ts';
import { itemDoManifesto } from '../../config/midia.ts';
import { modulos } from '../../config/modulos.ts';
import { clipesDoItem, type ClipeResolvido } from '../home/midia.ts';

const ITEM = 'video-para-presenca-e-profissionalismo';
const CONSENTIMENTOS_OK = ['titular', 'paciente-termo', 'declarado-pelo-cliente'];

interface Consentimento {
  consentimento?: string;
  termoArquivado?: boolean;
  dataRegistro?: string | null;
  menorDeIdade?: boolean;
}

export interface Casos {
  clipes: ClipeResolvido[];
  termoArquivado: boolean;
  dataRegistro: string | null;
}

export function casosUtilizaveis(): Casos | null {
  const item = itemDoManifesto(ITEM) as
    (ReturnType<typeof itemDoManifesto> & Consentimento) | undefined;
  const motivo = !modulos.casos.ativo
    ? `módulo casos desligado (${modulos.casos.motivo})`
    : !item || !item.publicavel
      ? 'item de casos não publicável'
      : !CONSENTIMENTOS_OK.includes(item.consentimento ?? '')
        ? `consentimento "${item.consentimento}"`
        : item.menorDeIdade
          ? 'mídia de menor de idade'
          : null;
  const clipes = motivo ? [] : clipesDoItem(ITEM);
  if (motivo || clipes.length === 0) {
    if (emProducao()) alertarOmissao('rota /casos/', motivo ?? 'nenhum clipe no índice de mídia');
    return null;
  }
  return {
    clipes,
    termoArquivado: item?.termoArquivado === true,
    dataRegistro: item?.dataRegistro ?? null,
  };
}
