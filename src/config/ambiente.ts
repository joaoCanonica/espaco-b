// Modo de renderização para componentes Astro.
// Produção = `astro build` sem PREVIEW=1. Dev e preview mostram faixa, selos e cartões "a informar".
export function emProducao(): boolean {
  return import.meta.env.PROD && process.env['PREVIEW'] !== '1';
}

export function emPreview(): boolean {
  return !emProducao();
}

/** Alerta de build quando uma seção some em produção (nunca em silêncio). */
export function alertarOmissao(oQue: string, motivo: string): void {
  console.warn(`[espaco-b] ${oQue} omitida em produção: ${motivo}`);
}
