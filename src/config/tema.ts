import { aviso, confirmado, pendente } from './tipos.ts';

// Valores-base da identidade. Variações AA de claro/escuro e tokens CSS saem na sessão 3.
export const tema = {
  cores: {
    musgo: confirmado('#52543F', 'medido no logo (media.manifest.json, musgoOficial)'),
    osso: aviso('Osso', 'valor aproximado do CLAUDE.md; calibrar na sessão 3', '#F1ECE1'),
    tinta: aviso('Tinta', 'valor aproximado do CLAUDE.md; calibrar na sessão 3', '#1E211A'),
    framboesa: aviso(
      'Framboesa seca',
      'amostrada nas flores reais; versões AA clara/funda na sessão 3',
      '#8E2B41',
    ),
    cremeDoLogo: confirmado('#F4EFE6', 'medido no logo (pixels da letra)'),
  },
  tipografia: {
    display: pendente<string>(
      'fonte display',
      'Gloock ou Newsreader Display; decidir na sessão 3 (licença e self-host)',
    ),
    texto: pendente<string>(
      'fonte de texto',
      'Albert Sans ou Schibsted Grotesk; decidir na sessão 3',
    ),
  },
  tons: ['light', 'dark', 'moss'] as const,
} as const;
