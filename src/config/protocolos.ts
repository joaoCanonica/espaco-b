import { confirmado, informado, type Campo } from './tipos.ts';

export interface Protocolo {
  id: string;
  nome: Campo<string>;
  servico: string;
  publicar: boolean;
}

const INSTAGRAM = 'Instagram da clínica, confirmado pelo João';
const GOOGLE = 'texto do Google/IA';
const naoConfirmado = { motivo: 'não entra no site até o João confirmar nome e conteúdo' };

export const protocolos: Protocolo[] = [
  {
    id: 'bialifting',
    nome: confirmado('BiaLifting', INSTAGRAM),
    servico: 'harmonizacao-orofacial',
    publicar: true,
  },
  {
    id: 'bialips',
    nome: confirmado('BiaLips', INSTAGRAM),
    servico: 'harmonizacao-orofacial',
    publicar: true,
  },
  {
    id: 'lipocrio-da-bia',
    nome: confirmado('Lipocrio da Bia', INSTAGRAM),
    servico: 'corpo-e-emagrecimento',
    publicar: true,
  },
  {
    id: 'elevaface',
    nome: informado('ElevaFace', GOOGLE, naoConfirmado),
    servico: 'harmonizacao-orofacial',
    publicar: false,
  },
  {
    id: 'liposemcortes',
    nome: informado('LiposemCortes', GOOGLE, naoConfirmado),
    servico: 'corpo-e-emagrecimento',
    publicar: false,
  },
  {
    id: 'redefine',
    nome: informado('Redefine', GOOGLE, naoConfirmado),
    servico: 'corpo-e-emagrecimento',
    publicar: false,
  },
  // Nome cita marca de medicamento: além de não confirmado, a auditoria barraria.
  {
    id: 'club-do-toxina',
    nome: informado('Club do Botox', GOOGLE, naoConfirmado),
    servico: 'harmonizacao-orofacial',
    publicar: false,
  },
];
