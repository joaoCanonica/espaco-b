// Decide como um bloco (texto fixo ou Campo) aparece: em produção, Campo não confirmado
// some inteiro (título incluso) com alerta de build; em preview aparece com selo ou cartão.
import { alertarOmissao, emProducao } from '../../config/ambiente.ts';
import { ehCampo, type Campo } from '../../config/tipos.ts';

export interface Visao {
  mostrar: boolean;
  texto: string | null;
  campo?: Campo<string>;
}

export function visao(texto: Campo<string> | string, onde: string): Visao {
  if (!ehCampo(texto)) return { mostrar: true, texto };
  if (texto.estado === 'confirmado') return { mostrar: true, texto: texto.valor };
  if (emProducao()) {
    alertarOmissao(
      `"${texto.rotulo ?? onde}" (${onde})`,
      `dado ${texto.estado}: ${texto.motivo ?? ''}`,
    );
    return { mostrar: false, texto: null };
  }
  return { mostrar: true, texto: texto.valor, campo: texto };
}
