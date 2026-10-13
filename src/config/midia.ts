// Slots de mídia: cada slot aponta para ids do media.manifest.json, com cadeia de fallback.
// Posições de capa (hero, og, primeira dobra) NUNCA aceitam mídia com pacienteRef.
import manifesto from '../../media.manifest.json' with { type: 'json' };

export type Posicao = 'hero' | 'og' | 'primeiraDobra' | 'secao';
export const POSICOES_CAPA: readonly Posicao[] = ['hero', 'og', 'primeiraDobra'];

export interface Slot {
  id: string;
  posicao: Posicao;
  /** ids do manifesto, em ordem de preferência. */
  cadeia: string[];
  clipe?: string;
}

export const slots: Slot[] = [
  {
    id: 'hero.principal',
    posicao: 'hero',
    cadeia: ['retrato-bia-colete', 'ambiente-clinica', 'imagem9'],
  },
  { id: 'og.imagem', posicao: 'og', cadeia: ['retrato-bia-colete', 'imagem9'] },
  { id: 'sobre.retrato', posicao: 'secao', cadeia: ['retrato-bia-vestido'] },
  { id: 'bia.retrato', posicao: 'secao', cadeia: ['retrato-bia-colete', 'retrato-bia-vestido'] },
  { id: 'espaco.video', posicao: 'secao', cadeia: ['ambiente-clinica'] },
  { id: 'casos.bastidores', posicao: 'secao', cadeia: ['video-para-presenca-e-profissionalismo'] },
  { id: 'corpo.video', posicao: 'secao', cadeia: ['usou-monjauro-corpo-flacido'] },
  { id: 'bia.historia', posicao: 'secao', cadeia: ['mulheres-transformadas-com-bia'] },
  { id: 'bia.cafe', posicao: 'secao', cadeia: ['cafe-com-bia'] },
];

export interface ItemManifesto {
  id: string;
  slug: string;
  tipo: string;
  publicavel: boolean;
  previewOk: boolean;
  naoUsarComoCapa: boolean;
  pacienteRef: string | null;
  pacienteRefs?: string[];
  substituida?: boolean;
}

export const itensManifesto = manifesto.itens as unknown as ItemManifesto[];

export function itemDoManifesto(id: string): ItemManifesto | undefined {
  return itensManifesto.find((i) => i.id === id);
}

export function temPaciente(i: ItemManifesto): boolean {
  return !!i.pacienteRef || (i.pacienteRefs?.length ?? 0) > 0;
}

export interface Resolucao {
  slot: Slot;
  item: ItemManifesto | null;
  pulados: { id: string; motivo: string }[];
}

/** Resolve a cadeia de fallback. Em capa, pula naoUsarComoCapa (registrando o motivo). */
export function resolverSlot(slot: Slot, preview: boolean): Resolucao {
  const pulados: Resolucao['pulados'] = [];
  for (const id of slot.cadeia) {
    const it = itemDoManifesto(id);
    if (!it) {
      pulados.push({ id, motivo: 'ausente do manifesto' });
      continue;
    }
    const ok = preview ? it.previewOk || it.publicavel : it.publicavel;
    if (!ok || it.substituida) {
      pulados.push({ id, motivo: 'não publicável' });
      continue;
    }
    if (POSICOES_CAPA.includes(slot.posicao) && it.naoUsarComoCapa && !temPaciente(it)) {
      pulados.push({ id, motivo: 'naoUsarComoCapa no manifesto' });
      continue;
    }
    return { slot, item: it, pulados };
  }
  return { slot, item: null, pulados };
}

/** Bloqueios: mídia com paciente em qualquer posição de capa (na cadeia inteira, não só no resolvido). */
export function pacientesEmCapa(): string[] {
  const erros: string[] = [];
  for (const s of slots) {
    if (!POSICOES_CAPA.includes(s.posicao)) continue;
    for (const id of s.cadeia) {
      const it = itemDoManifesto(id);
      if (it && temPaciente(it)) {
        erros.push(
          `mídia de paciente "${id}" no slot ${s.id} (${s.posicao}): proibido em hero/og:image/primeira dobra`,
        );
      }
    }
  }
  return erros;
}

export const midia = { slots };
