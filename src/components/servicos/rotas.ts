// Quais páginas de serviço existem: produção gera só as publicáveis e avisa no build das outras.
import { alertarOmissao, emProducao } from '../../config/ambiente.ts';
import { servicos } from '../../config/servicos.ts';
import { paginas, type PaginaServico } from './conteudo.ts';

/** Motivo pelo qual a página não pode ir para produção (null = pode). */
export function bloqueioDaPagina(p: PaginaServico): string | null {
  const lista = servicos.filter((s) => p.servicos.includes(s.slug));
  if (lista.length !== p.servicos.length) return 'serviço ausente na config';
  for (const s of lista) {
    if (s.status.estado !== 'confirmado') return `serviço "${s.rotulo}" ${s.status.estado}`;
    if (!s.executor.registro) return `executor de "${s.rotulo}" a informar`;
    if (!s.conselho) return `conselho de "${s.rotulo}" a informar`;
  }
  return null;
}

export function paginasGeradas(): PaginaServico[] {
  const producao = emProducao();
  return paginas.filter((p) => {
    const motivo = bloqueioDaPagina(p);
    if (motivo && producao) {
      alertarOmissao(`página /${p.slug}/`, motivo);
      return false;
    }
    return true;
  });
}
