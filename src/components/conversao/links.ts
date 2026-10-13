// Links de contato, montados SÓ da config. A mensagem é neutra: sem sintoma, foto ou dado clínico.
import { contato } from '../../config/contato.ts';

export const MENSAGEM_WHATSAPP = 'Olá! Gostaria de agendar uma avaliação.';

const wa = contato.whatsapp.valor;
export const numeroExibicao = wa?.exibicao ?? null;
export const linkWhatsapp = wa
  ? `https://wa.me/${wa.e164.replace(/\D/g, '')}?text=${encodeURIComponent(MENSAGEM_WHATSAPP)}`
  : null;
export const linkTelefone = wa ? `tel:${wa.e164}` : null;
