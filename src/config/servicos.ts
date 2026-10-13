import { aviso, confirmado, informado, pendente, type Campo } from './tipos.ts';
import type { ClaimId } from './claims.ts';

const JOAO = 'João (WAXLO), 12/10/2026';

export interface Equipamento {
  descricao: string;
  /** Marca/modelo: NUNCA sai no HTML (audit-compliance bloqueia se aparecer). */
  marca: Campo<string>;
  registroAnvisa: Campo<string>;
}

export interface Servico {
  slug: string;
  rotulo: string;
  status: Campo<'ativo'>;
  executor: { pessoa: 'bianca-cardoso'; registro: 'CREFITO 183149' };
  conselho: 'COFFITO/CREFITO';
  escopoConferido: Campo<boolean>;
  itens: string[];
  equipamento: Equipamento[];
  claims: ClaimId[];
}

const executor = { pessoa: 'bianca-cardoso', registro: 'CREFITO 183149' } as const;
const escopo = () =>
  aviso<boolean>(
    'escopo do ato pelo COFFITO',
    'o João confirmou que só a Bia atende; o escopo de cada ato é conferido na sessão 9',
    false,
  );
const equip = (descricao: string, marca: Campo<string>): Equipamento => ({
  descricao,
  marca,
  registroAnvisa: pendente('registro ANVISA do equipamento', 'a informar pelo João'),
});

export const servicos: Servico[] = [
  {
    slug: 'harmonizacao-orofacial',
    rotulo: 'Harmonização orofacial',
    status: confirmado('ativo', JOAO),
    executor,
    conselho: 'COFFITO/CREFITO',
    escopoConferido: escopo(),
    itens: ['toxina botulínica', 'preenchimentos', 'FaceLifting'],
    equipamento: [],
    claims: ['labios-adeus', 'rugas-rapida-segura', 'ninguem-vai-saber', 'rostos-mais-lindos'],
  },
  {
    slug: 'corpo-e-emagrecimento',
    rotulo: 'Corpo e emagrecimento',
    status: confirmado('ativo', JOAO),
    executor,
    conselho: 'COFFITO/CREFITO',
    escopoConferido: escopo(),
    itens: ['protocolos corporais', 'Lipocrio da Bia', 'redefinição corporal'],
    equipamento: [
      equip(
        'aparelho do Lipocrio',
        informado('Medical San', 'visto no vídeo corpo-flacidez-pos-emagrecimento (77,5–88,3 s)', {
          exibir: false,
          motivo: 'leitura do rótulo no quadro; confirmar marca/modelo',
        }),
      ),
    ],
    claims: ['gordura-1-sessao', 'resultados-90-dias', 'pochete', 'abdome-chapado'],
  },
  {
    slug: 'depilacao',
    rotulo: 'Depilação definitiva',
    status: confirmado('ativo', JOAO),
    executor,
    conselho: 'COFFITO/CREFITO',
    escopoConferido: escopo(),
    itens: ['depilação a LED'],
    equipamento: [
      equip(
        'depilação a LED',
        informado('Holonyak', 'cliente ("tecnologia Holonyak")', { exibir: false }),
      ),
    ],
    claims: ['melhor-tecnologia-depilacao', 'laser-ficou-para-tras', 'efetividade-90'],
  },
  {
    slug: 'limpeza-de-pele',
    rotulo: 'Limpeza de pele',
    status: confirmado('ativo', JOAO),
    executor,
    conselho: 'COFFITO/CREFITO',
    escopoConferido: escopo(),
    itens: [],
    equipamento: [],
    claims: [],
  },
  {
    slug: 'pele-e-tecnologia',
    rotulo: 'Rejuvenescimento',
    status: confirmado('ativo', JOAO),
    executor,
    conselho: 'COFFITO/CREFITO',
    escopoConferido: escopo(),
    itens: ['laser'],
    equipamento: [equip('laser', informado('Lavieen', 'cliente', { exibir: false }))],
    claims: ['transformacao-completa', 'protocolos-internacionais'],
  },
];

/** Nomes de marca de equipamento conhecidos (para a auditoria barrar no HTML). */
export function marcasDeEquipamento(): string[] {
  return servicos.flatMap((s) =>
    s.equipamento.map((e) => e.marca.valor).filter((m): m is string => !!m),
  );
}
