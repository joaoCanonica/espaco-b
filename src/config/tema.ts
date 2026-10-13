import { aviso, confirmado } from './tipos.ts';
import { primitivas } from '../styles/paleta.mjs';

// Valores da identidade. As cores vêm de src/styles/paleta.mjs (fonte única; ver docs/MARCA.md).
const SESSAO3 = 'src/styles/paleta.mjs (sessão 3, medições em docs/MARCA.md)';

export const tema = {
  cores: {
    musgo: confirmado(primitivas.musgo, 'medido no logo (media.manifest.json, musgoOficial)'),
    osso: confirmado(primitivas.osso, SESSAO3),
    tinta: confirmado(primitivas.tinta, SESSAO3),
    framboesa: confirmado(
      {
        amostra: primitivas.framboesaAmostra,
        funda: primitivas.framboesaFunda,
        clara: primitivas.framboesaClara,
      },
      'amostrada nas flores reais (ambiente-clinica, 25,5 s); variantes AA calibradas na sessão 3',
    ),
    cremeDoLogo: confirmado(primitivas.creme, 'medido no logo (pixels da letra)'),
  },
  tipografia: {
    display: aviso(
      'fonte display',
      'escolhida na sessão 3 (espécime em docs/capturas/tipografia); aprovar com o João',
      'Newsreader Display',
    ),
    texto: aviso('fonte de texto', 'escolhida na sessão 3; aprovar com o João', 'Albert Sans'),
  },
  marca: aviso(
    'vetor do logo',
    'vetorização PROVISÓRIA a partir de raster de 2000 px; pedir o vetor oficial',
    'src/assets/brand/logo-b.svg',
  ),
  tons: ['light', 'dark', 'moss'] as const,
} as const;
