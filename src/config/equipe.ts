import { bianca } from './pessoas.ts';

// Só a Bianca por enquanto. A seção de equipe fica desligada em modulos.ts;
// quando chegar mais gente, o Prompt D acrescenta aqui e liga o módulo.
export const equipe = {
  membros: [
    {
      pessoa: bianca.id,
      papel: 'responsável e responsável técnica; executora de todos os serviços',
    },
  ],
  responsavelTecnica: bianca.id,
} as const;
