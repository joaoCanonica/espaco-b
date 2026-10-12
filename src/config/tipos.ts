// Tipos e helpers de estado da config. Todo dado do cliente passa por um destes helpers.
// confirmado: o João confirmou · informado: veio de texto não verificado (Google/IA), aparece com selo no preview
// pendente: não existe ainda · aviso: existe, mas precisa de conferência.
// bloqueante(): use SÓ nos itens da trava de produção (registro profissional, WhatsApp real).

export type Estado = 'confirmado' | 'informado' | 'pendente' | 'aviso';
export type Severidade = 'bloqueante' | 'aviso' | 'info';

export interface Campo<T> {
  readonly __campo: true;
  readonly estado: Estado;
  readonly valor: T | null;
  readonly severidade: Severidade;
  readonly rotulo?: string;
  readonly fonte?: string;
  readonly data?: string;
  readonly motivo?: string;
  readonly escopo?: string;
  readonly verificado?: boolean;
  /** false = nunca sai no HTML público (ex.: CNPJ, marca de equipamento). */
  readonly exibir?: boolean;
  readonly opcional?: boolean;
}

export interface Extra {
  rotulo?: string;
  data?: string;
  motivo?: string;
  escopo?: string;
  verificado?: boolean;
  exibir?: boolean;
}

/** Data das decisões do João registradas nesta config. */
export const DATA_DECISOES = '2026-10-12';

export function confirmado<T>(valor: T, fonte: string, extra: Extra = {}): Campo<T> {
  return {
    __campo: true,
    estado: 'confirmado',
    valor,
    severidade: 'info',
    fonte,
    data: DATA_DECISOES,
    ...extra,
  };
}

export function informado<T>(valor: T, fonte: string, extra: Extra = {}): Campo<T> {
  return {
    __campo: true,
    estado: 'informado',
    valor,
    severidade: 'aviso',
    fonte,
    verificado: false,
    data: DATA_DECISOES,
    ...extra,
  };
}

/** Some sozinho se vazio (estado pendente, severidade info). */
export function opcional<T>(
  valor: T | null | undefined,
  extra: Extra & { fonte?: string } = {},
): Campo<T> {
  const vazio =
    valor === null || valor === undefined || (typeof valor === 'string' && valor.trim() === '');
  if (vazio)
    return {
      __campo: true,
      estado: 'pendente',
      valor: null,
      severidade: 'info',
      opcional: true,
      ...extra,
    };
  return {
    __campo: true,
    estado: 'confirmado',
    valor,
    severidade: 'info',
    opcional: true,
    ...extra,
  };
}

/** Dado que falta e trava produção. */
export function bloqueante<T = never>(
  rotulo: string,
  motivo = 'obrigatório para produção',
): Campo<T> {
  return {
    __campo: true,
    estado: 'pendente',
    valor: null,
    severidade: 'bloqueante',
    rotulo,
    motivo,
  };
}

/** Dado que falta e não trava (preview mostra "a informar" + selo; produção omite com alerta). */
export function pendente<T = never>(rotulo: string, motivo: string): Campo<T> {
  return { __campo: true, estado: 'pendente', valor: null, severidade: 'aviso', rotulo, motivo };
}

/** Dado presente (ou não) que precisa de conferência. */
export function aviso<T>(
  rotulo: string,
  motivo: string,
  valor: T | null = null,
  extra: Extra = {},
): Campo<T> {
  return { __campo: true, estado: 'aviso', valor, severidade: 'aviso', rotulo, motivo, ...extra };
}

export function ehCampo(v: unknown): v is Campo<unknown> {
  return typeof v === 'object' && v !== null && (v as { __campo?: unknown }).__campo === true;
}

/** Pode sair no HTML público agora? */
export function publicavel<T>(c: Campo<T>): c is Campo<T> & { valor: T } {
  return c.valor !== null && c.exibir !== false && c.estado === 'confirmado';
}
