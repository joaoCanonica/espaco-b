// Paleta: fonte única das cores. Gera o CSS de cor (src/styles/cores.mjs → Base.astro)
// e alimenta scripts/audit-contraste.mjs. Medições em docs/MARCA.md.

export const primitivas = {
  musgo: '#52543F', // medido no logo (cantos, 2000 px)
  creme: '#F4EFE6', // letra do logo
  osso: '#F1ECE1',
  tinta: '#1E211A',
  tintaFunda: '#15170F',
  tintaSuperficie: '#262A21',
  // Framboesa: amostra das flores secas reais (ambiente-clinica, 25,5 s), balanço de branco pelo sofá.
  framboesaAmostra: '#983D33',
  framboesaFunda: '#8A3027', // texto/ponto sobre claro
  framboesaClara: '#D27E72', // texto/ponto sobre escuro
};

const p = primitivas;

// Tokens semânticos por tema × tom. Framboesa NUNCA sobre musgo (não passa AA): lá o acento é o osso.
export const temas = {
  light: {
    light: {
      bg: p.osso,
      fg: p.tinta,
      fgSuave: '#4F5242',
      linha: '#1E211A26',
      linhaForte: '#6E715E',
      acento: p.framboesaFunda,
      foco: p.framboesaFunda,
    },
    dark: {
      bg: p.tinta,
      fg: p.osso,
      fgSuave: '#B8B5A8',
      linha: '#F1ECE126',
      linhaForte: '#8C8F7B',
      acento: p.framboesaClara,
      foco: p.framboesaClara,
    },
    moss: {
      bg: p.musgo,
      fg: p.osso,
      fgSuave: '#E0DBCD',
      linha: '#F1ECE133',
      linhaForte: '#C9C5B6',
      acento: p.osso,
      foco: p.osso,
    },
  },
  dark: {
    light: {
      bg: p.tintaSuperficie,
      fg: p.osso,
      fgSuave: '#BDBAAD',
      linha: '#F1ECE126',
      linhaForte: '#8E917D',
      acento: p.framboesaClara,
      foco: p.framboesaClara,
    },
    dark: {
      bg: p.tintaFunda,
      fg: p.osso,
      fgSuave: '#B3B0A3',
      linha: '#F1ECE11F',
      linhaForte: '#868975',
      acento: p.framboesaClara,
      foco: p.framboesaClara,
    },
    moss: {
      bg: '#474936',
      fg: p.osso,
      fgSuave: '#DCD7C9',
      linha: '#F1ECE133',
      linhaForte: '#C4C0B1',
      acento: p.osso,
      foco: p.osso,
    },
  },
};

/** Pares auditados: [primeiro plano, fundo, mínimo, uso]. */
export const pares = [
  ['fg', 'bg', 4.5, 'texto'],
  ['fgSuave', 'bg', 4.5, 'texto secundário'],
  ['acento', 'bg', 4.5, 'texto/ponto de acento'],
  ['linhaForte', 'bg', 3, 'borda de campo/UI'],
  ['foco', 'bg', 3, 'anel de foco'],
  ['bg', 'fg', 4.5, 'botão primário (texto bg sobre fundo fg)'],
];

/** Tom da página (fora de seções) = tom light do tema. */
export const TOM_PAGINA = 'light';
