// Fonte única da verdade. Tudo que é dado do cliente sai daqui.
import { avaliacoes } from './avaliacoes.ts';
import { claims } from './claims.ts';
import { contato } from './contato.ts';
import { equipe } from './equipe.ts';
import { legal } from './legal.ts';
import { marca } from './marca.ts';
import { midia, pacientesEmCapa, resolverSlot, slots } from './midia.ts';
import { modulos } from './modulos.ts';
import { pessoas } from './pessoas.ts';
import { protocolos } from './protocolos.ts';
import { seo } from './seo.ts';
import { servicos } from './servicos.ts';
import { tema } from './tema.ts';
import { ehCampo, type Campo, type Estado, type Severidade } from './tipos.ts';

export const config = {
  marca,
  pessoas,
  equipe,
  contato,
  servicos,
  protocolos,
  midia,
  avaliacoes,
  legal,
  tema,
  seo,
  modulos,
  claims,
} as const;

export type Modo = 'dev' | 'preview' | 'producao';

/** PREVIEW=1 → preview; NODE_ENV=production (ou `astro build`) → produção; senão dev. */
export function modo(forcarBuild = false): Modo {
  const env = typeof process !== 'undefined' ? process.env : {};
  if (env['PREVIEW'] === '1') return 'preview';
  if (forcarBuild || env['NODE_ENV'] === 'production') return 'producao';
  return 'dev';
}

export interface Pendencia {
  caminho: string;
  estado: Estado;
  severidade: Severidade;
  rotulo: string;
  motivo: string;
  fonte: string;
  valor: string;
}

function texto(v: unknown): string {
  if (v === null || v === undefined) return '';
  return typeof v === 'string' ? v : JSON.stringify(v);
}

/** Percorre a config e lista todo campo que não está confirmado (ou que é confirmado com ressalva). */
export function listarPendencias(): Pendencia[] {
  const lista: Pendencia[] = [];
  const vistos = new Set<unknown>(); // o mesmo campo pode ser referenciado em dois lugares
  const visitar = (no: unknown, caminho: string) => {
    if (ehCampo(no)) {
      if (vistos.has(no)) return;
      vistos.add(no);
      const c = no as Campo<unknown>;
      const ressalva =
        c.verificado === false || (c.estado === 'confirmado' && !!c.motivo && c.exibir !== false);
      if (c.estado !== 'confirmado' || ressalva) {
        lista.push({
          caminho,
          estado: c.estado,
          severidade: c.estado === 'confirmado' ? 'info' : c.severidade,
          rotulo: c.rotulo ?? caminho,
          motivo: c.motivo ?? (c.estado === 'informado' ? 'texto não verificado' : ''),
          fonte: c.fonte ?? '',
          valor: c.exibir === false ? `${texto(c.valor)} (nunca exibido)` : texto(c.valor),
        });
      }
      return;
    }
    if (Array.isArray(no)) {
      no.forEach((v, i) => visitar(v, `${caminho}[${i}]`));
      return;
    }
    if (typeof no === 'object' && no !== null) {
      for (const [k, v] of Object.entries(no)) visitar(v, caminho ? `${caminho}.${k}` : k);
    }
  };
  visitar(config, '');

  for (const c of claims) {
    lista.push({
      caminho: `claims.${c.id}`,
      estado: 'aviso',
      severidade: 'aviso',
      rotulo: `claim do cliente (${c.tipo.join(', ')})`,
      motivo: `publicar:${c.publicar}; conferir: ${c.conferir.join(', ')}`,
      fonte: c.fonte,
      valor: c.texto,
    });
  }
  for (const s of slots) {
    const r = resolverSlot(s, true);
    for (const p of r.pulados) {
      lista.push({
        caminho: `midia.slots.${s.id}`,
        estado: 'aviso',
        severidade: 'aviso',
        rotulo: `fallback "${p.id}" pulado`,
        motivo: p.motivo,
        fonte: 'media.manifest.json',
        valor: r.item?.id ?? '(nenhum)',
      });
    }
  }
  for (const [nome, m] of Object.entries(modulos)) {
    if (!m.ativo) {
      lista.push({
        caminho: `modulos.${nome}`,
        estado: 'aviso',
        severidade: 'info',
        rotulo: `módulo ${nome} desligado`,
        motivo: m.motivo,
        fonte: 'modulos.ts',
        valor: 'false',
      });
    }
  }
  return lista;
}

/** Trava de produção. Retorna as mensagens de bloqueio (vazio = pode publicar). */
export function verificarProducao(): string[] {
  const erros: string[] = [];
  const reg = pessoas.bianca.registro;
  if (reg.estado !== 'confirmado' || !reg.valor?.numero) {
    erros.push('registro profissional ausente ou não confirmado (pessoas.bianca.registro)');
  }
  const wa = contato.whatsapp as Campo<{ e164: string; real: boolean }>;
  if (wa.estado !== 'confirmado' || !wa.valor?.real || !/^\+55\d{10,11}$/.test(wa.valor.e164)) {
    erros.push('WhatsApp não confirmado como real (contato.whatsapp)');
  }
  erros.push(...pacientesEmCapa());
  for (const c of claims as readonly { id: string; publicar: boolean; fonte: string }[]) {
    if (c.publicar && !c.fonte?.trim()) erros.push(`claim "${c.id}" com publicar:true sem fonte`);
  }
  // Qualquer outro campo marcado com bloqueante() também trava.
  for (const p of listarPendencias()) {
    if (p.severidade === 'bloqueante' && p.estado !== 'confirmado')
      erros.push(`${p.rotulo}: ${p.motivo} (${p.caminho})`);
  }
  return [...new Set(erros)];
}
