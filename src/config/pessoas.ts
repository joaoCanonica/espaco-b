import { aviso, confirmado, informado } from './tipos.ts';

export const bianca = {
  id: 'bianca-cardoso',
  nome: confirmado('Bianca Cardoso', 'João (WAXLO), 12/10/2026'),
  apelido: confirmado('Bia', 'João (WAXLO), 12/10/2026'),
  titulo: confirmado('Fisioterapeuta', 'João (WAXLO), 12/10/2026'),
  registro: confirmado(
    { conselho: 'CREFITO', numero: '183149' },
    'cliente, confirmado pelo João em 12/10/2026',
    { verificado: false, motivo: 'não consultado no CREFITO por nós; conferência na sessão 9' },
  ),
  // Ela usa "Dra. Bia" na série; fica desligado até a conferência final.
  tratamento: {
    dra: {
      ativo: false,
      motivo:
        'título "Dra." para fisioterapeuta depende de conferência (COFFITO); desligado por padrão',
    },
  },
  especialidade: informado('dermato-funcional', 'texto do Google/IA', {
    exibir: false,
    motivo: 'título de especialista exige registro no conselho; só entra com comprovante',
  }),
  responsavelTecnica: confirmado(true, 'João (WAXLO), 12/10/2026'),
  fotoCredito: aviso<string>('crédito do fotógrafo do ensaio', 'a informar pelo João'),
} as const;

export const pessoas = { bianca } as const;
