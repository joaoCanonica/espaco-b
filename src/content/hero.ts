// Textos do hero. O título é PROVISÓRIO: o João escolhe entre as três opções da direção (seção 4.0).
import { aviso } from '../config/tipos.ts';

export const opcoesDeTitulo = [
  { principal: 'Rosto e corpo,', enfase: 'um projeto só.' },
  { principal: 'Rejuvenescimento com método,', enfase: 'não com moda.' },
  { principal: 'Aqui cada protocolo tem o nome', enfase: 'de quem o executa.' },
] as const;

export const ESCOLHA = 0;

export const hero = {
  titulo: aviso('título do hero', 'opção 1 de 3 em uso; o João escolhe', opcoesDeTitulo[ESCOLHA]),
  legenda: 'Estética integrada · Lages, SC',
  ctaPrimario: 'Agendar avaliação pelo WhatsApp',
  mensagemWhatsapp: 'Olá! Gostaria de agendar uma avaliação.',
  ctaSecundario: { rotulo: 'Conhecer os protocolos', href: '/protocolos-bia/' },
} as const;
