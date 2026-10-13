// Protocolos publicáveis: só os confirmados (protocolos `informado` nunca aparecem).
import { protocolos, type Protocolo } from '../../config/protocolos.ts';

export const protocolosPublicos: (Protocolo & { nomeTexto: string })[] = protocolos
  .filter((p) => p.publicar && p.nome.estado === 'confirmado' && p.nome.valor)
  .map((p) => ({ ...p, nomeTexto: p.nome.valor ?? '' }));

export const AREA: Record<string, { rotulo: string; href: string }> = {
  'harmonizacao-orofacial': { rotulo: 'Rosto', href: '/harmonizacao-facial/' },
  'corpo-e-emagrecimento': { rotulo: 'Corpo', href: '/corpo-e-emagrecimento/' },
};

/** Textura de atmosfera por protocolo (só IA de textura; nunca pessoa). */
export const TEXTURA: Record<string, string> = {
  bialifting: 'imagem3',
  bialips: 'imagem10',
  'lipocrio-da-bia': 'imagem1',
};
