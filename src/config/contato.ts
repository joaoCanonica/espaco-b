import { aviso, confirmado, informado } from './tipos.ts';

const FICHA = 'ficha do Google colada pelo João, 12/10/2026';
const JOAO = 'João (WAXLO), 12/10/2026';

export type Dia = 'seg' | 'ter' | 'qua' | 'qui' | 'sex' | 'sab' | 'dom';
export interface Faixa {
  abre: string;
  fecha: string;
}

const util: Faixa[] = [
  { abre: '09:00', fecha: '12:00' },
  { abre: '13:30', fecha: '18:30' },
];

export const contato = {
  endereco: confirmado(
    {
      logradouro: 'Rua Humberto de Campos',
      numero: '328',
      bairro: 'Coral',
      cidade: 'Lages',
      uf: 'SC',
      cep: '88508-190',
      pais: 'BR',
    },
    FICHA,
  ),
  whatsapp: confirmado({ e164: '+5549999115351', exibicao: '(49) 99911-5351', real: true }, JOAO),
  whatsappTitular: aviso<string>(
    'de quem é o WhatsApp',
    'confirmar se é da clínica ou pessoal da Bia',
  ),
  horarios: confirmado<Record<Dia, Faixa[]>>(
    {
      seg: util,
      ter: util,
      qua: util,
      qui: util,
      sex: util,
      sab: [{ abre: '08:00', fecha: '12:00' }],
      dom: [],
    },
    JOAO,
  ),
  instagram: confirmado(
    { usuario: 'clinica.espacob', url: 'https://www.instagram.com/clinica.espacob/' },
    JOAO,
  ),
  google: {
    kgmid: confirmado('/g/11hzyf45d0', FICHA),
    nomeNoGoogle: confirmado(
      'Espaço B - Harmonização Corporal e Facial | Estética em Lages | FaceLifting, Depilação Definitiva, Emagrecimento e HOF.',
      FICHA,
      { exibir: false, motivo: 'referência; não é texto do site' },
    ),
    mapsUrl: confirmado(
      'https://www.google.com/maps/place/Espa%C3%A7o+B+-+Harmoniza%C3%A7%C3%A3o+Corporal+e+Facial+%7C+Est%C3%A9tica+em+Lages+%7C+FaceLifting,+Depila%C3%A7%C3%A3o+Definitiva,+Emagrecimento+e+HOF./@-27.8074182,-50.3162505,1006m/data=!3m2!1e3!4b1!4m6!3m5!1s0x94e01f1a3dc60141:0xd167078bfa0fbc32!8m2!3d-27.8074182!4d-50.3162505!16s%2Fg%2F11hzyf45d0',
      FICHA,
    ),
    geo: confirmado({ lat: -27.8074182, lng: -50.3162505 }, FICHA),
    listagemUrl: confirmado('https://www.google.com/search?q=clinica+espa%C3%A7o+b', JOAO),
    avaliacaoDiretaUrl: informado(
      'https://search.google.com/local/writereview?placeid=ChIJQQHGPRof4JQRMrwP-osHZ9E',
      'derivado do código do Maps',
      { motivo: 'candidato NÃO VERIFICADO; testar antes de publicar' },
    ),
  },
} as const;
