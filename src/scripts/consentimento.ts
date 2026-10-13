// Consentimento (LGPD / guia de cookies da ANPD): categorias opcionais desligadas por padrão,
// recusa tão simples quanto aceitar, revogável a qualquer momento.
// Estado no localStorage (com try/catch); sem armazenamento, vale só em memória nesta visita.
// Nada de terceiros carrega antes do aceite: cada recurso chama aoPermitir(categoria, fn).

export type Categoria = 'preferencias' | 'mapas' | 'estatistica';
export const CATEGORIAS: readonly Categoria[] = ['preferencias', 'mapas', 'estatistica'];

export interface Estado {
  versao: number;
  data: string;
  preferencias: boolean;
  mapas: boolean;
  estatistica: boolean;
}

/** Sobe quando a política ou as categorias mudarem: pede de novo. */
export const VERSAO = 1;
const CHAVE = 'espacob-consentimento';
const VALIDADE_DIAS = 365;
const EVENTO = 'consentimento:mudou';

let memoria: Estado | null = null;

function valido(e: unknown): e is Estado {
  if (!e || typeof e !== 'object') return false;
  const o = e as Record<string, unknown>;
  if (o['versao'] !== VERSAO || typeof o['data'] !== 'string') return false;
  const idade = (Date.now() - new Date(o['data']).getTime()) / 86_400_000;
  return idade >= 0 && idade <= VALIDADE_DIAS && CATEGORIAS.every((c) => typeof o[c] === 'boolean');
}

/** Estado salvo, ou null se a pessoa ainda não escolheu (ou a escolha venceu). */
export function ler(): Estado | null {
  if (memoria) return memoria;
  try {
    const bruto = localStorage.getItem(CHAVE);
    const e: unknown = bruto ? JSON.parse(bruto) : null;
    if (valido(e)) return (memoria = e);
  } catch {
    /* sem armazenamento: segue sem estado salvo */
  }
  return null;
}

export function permite(c: Categoria): boolean {
  return ler()?.[c] === true;
}

export function salvar(escolha: Record<Categoria, boolean>): Estado {
  const e: Estado = { versao: VERSAO, data: new Date().toISOString(), ...escolha };
  memoria = e;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(e));
    // Preferências recusadas: apaga o tema guardado (o tema vale só nesta visita).
    if (!e.preferencias) localStorage.removeItem('tema');
  } catch {
    /* sem armazenamento: vale só nesta visita */
  }
  document.dispatchEvent(new CustomEvent<Estado>(EVENTO, { detail: e }));
  return e;
}

export const aceitarTudo = () => salvar({ preferencias: true, mapas: true, estatistica: true });
export const recusarTudo = () => salvar({ preferencias: false, mapas: false, estatistica: false });

/** Roda fn agora se a categoria já foi aceita, ou quando for aceita. Devolve o cancelamento. */
export function aoPermitir(c: Categoria, fn: () => void): () => void {
  let feito = false;
  const tentar = () => {
    if (!feito && permite(c)) {
      feito = true;
      fn();
    }
  };
  tentar();
  document.addEventListener(EVENTO, tentar);
  return () => document.removeEventListener(EVENTO, tentar);
}

/** Avisa a cada mudança (inclusive revogação). */
export function aoMudar(fn: (e: Estado) => void): void {
  document.addEventListener(EVENTO, (ev) => fn((ev as CustomEvent<Estado>).detail));
}

/** Abre o painel de preferências (o componente Banner registra a função). */
export function abrirPreferencias(): void {
  document.dispatchEvent(new CustomEvent('consentimento:abrir'));
}

// Gancho de estatística: hoje NÃO há analytics de terceiros. Eventos de conversão só entram
// nesta fila local, e só com a categoria "estatistica" aceita. Um provedor futuro lê daqui.
export interface EventoConversao {
  tipo: 'whatsapp' | 'telefone' | 'avaliar';
  pagina: string;
  data: string;
}
declare global {
  interface Window {
    espacoB?: { eventos: EventoConversao[] };
  }
}
export function registrarConversao(tipo: EventoConversao['tipo']): boolean {
  if (!permite('estatistica')) return false;
  window.espacoB ??= { eventos: [] };
  const ev = { tipo, pagina: location.pathname, data: new Date().toISOString() };
  window.espacoB.eventos.push(ev);
  document.dispatchEvent(new CustomEvent('conversao', { detail: ev }));
  return true;
}
