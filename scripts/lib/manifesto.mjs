// Leitura e validação do media.manifest.json (JSON Schema + regras que o schema não expressa).
import { createHash } from 'node:crypto';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';

export const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const ORIGINAIS = join(RAIZ, 'media-originais');
export const CAMINHO_MANIFESTO = join(RAIZ, 'media.manifest.json');
const CAMINHO_SCHEMA = join(RAIZ, 'media.manifest.schema.json');

export function lerManifesto() {
  return JSON.parse(readFileSync(CAMINHO_MANIFESTO, 'utf8'));
}

export function hashArquivo(caminho) {
  return new Promise((resolve, reject) => {
    const h = createHash('sha256');
    createReadStream(caminho)
      .on('data', (d) => h.update(d))
      .on('end', () => resolve(h.digest('hex')))
      .on('error', reject);
  });
}

// Junta segmentos usar:true contíguos em intervalos de corte.
export function intervalosMantidos(item) {
  const fora = (item.segmentos ?? []).filter((s) => !s.usar);
  const dur = item.tecnico.duracao;
  const mantidos = [];
  let ini = 0;
  const cortes = [...fora, ...(item.trim ?? [])].sort((a, b) => a.ini - b.ini);
  for (const c of cortes) {
    if (c.ini > ini) mantidos.push({ ini, fim: c.ini });
    ini = Math.max(ini, c.fim);
  }
  if (ini < dur) mantidos.push({ ini, fim: dur });
  return mantidos.filter((m) => m.fim - m.ini >= 0.2);
}

export async function validarManifesto(manifesto = lerManifesto(), { conferirHash = true } = {}) {
  const erros = [];
  const avisos = [];
  const ajv = new Ajv({ allErrors: true, strict: false });
  const schema = JSON.parse(readFileSync(CAMINHO_SCHEMA, 'utf8'));
  if (!ajv.validate(schema, manifesto)) {
    for (const e of ajv.errors ?? []) erros.push(`schema ${e.instancePath || '/'}: ${e.message}`);
    return { erros, avisos };
  }

  const ids = new Set();
  const slugs = new Set();
  for (const it of manifesto.itens) {
    const ref = `[${it.id}]`;
    if (ids.has(it.id)) erros.push(`${ref} id duplicado`);
    if (slugs.has(it.slug)) erros.push(`${ref} slug duplicado`);
    ids.add(it.id);
    slugs.add(it.slug);

    const caminho = join(ORIGINAIS, it.arquivo);
    if (!existsSync(caminho)) {
      erros.push(`${ref} original ausente: ${it.arquivo}`);
      continue;
    }
    if (conferirHash) {
      const h = await hashArquivo(caminho);
      if (h !== it.tecnico.sha256)
        erros.push(`${ref} original alterado (sha256 difere do manifesto)`);
    }
    if (it.publicavel && ['nenhum', 'terceiros'].includes(it.consentimento)) {
      erros.push(`${ref} consentimento "${it.consentimento}" não pode ser publicável`);
    }
    if (it.consentimento === 'declarado-pelo-cliente' && it.termoArquivado === false) {
      avisos.push(`${ref} consentimento declarado pelo cliente; termo não arquivado`);
    }

    if (it.tipo !== 'video') continue;
    const dur = it.tecnico.duracao;
    const segs = it.segmentos;
    if (!segs.length) erros.push(`${ref} vídeo sem segmentos`);
    let fimAnterior = 0;
    for (const s of segs) {
      if (s.fim <= s.ini) erros.push(`${ref} segmento ${s.ini}–${s.fim} inválido`);
      if (Math.abs(s.ini - fimAnterior) > 0.01)
        erros.push(`${ref} buraco ou sobreposição em ${fimAnterior}–${s.ini}`);
      fimAnterior = s.fim;
      if (s.pacienteRef && !(it.pacienteRefs ?? []).includes(s.pacienteRef)) {
        erros.push(`${ref} ${s.pacienteRef} não está em pacienteRefs`);
      }
      if (s.problemas === 'verificar' || s.problemas?.startsWith('verificar')) {
        avisos.push(`${ref} ${s.ini}–${s.fim} s marcado para verificar`);
      }
    }
    if (Math.abs(fimAnterior - dur) > 0.05)
      erros.push(`${ref} segmentos terminam em ${fimAnterior}, duração ${dur}`);

    const posterSeg = segs.find((s) => it.poster.t >= s.ini && it.poster.t < s.fim);
    if (!posterSeg?.usar) erros.push(`${ref} poster em trecho usar:false`);
    if (posterSeg?.pacienteRef) erros.push(`${ref} poster mostra paciente (proibido como capa)`);

    for (const c of it.clipes ?? []) {
      if (c.fim - c.ini > 6) erros.push(`${ref} clipe ${c.id} passa de 6 s`);
      const seg = segs.find((s) => c.ini >= s.ini && c.fim <= s.fim);
      if (!seg?.usar) erros.push(`${ref} clipe ${c.id} fora de um segmento usar:true`);
      if (seg && seg.pacienteRef !== c.pacienteRef)
        erros.push(`${ref} clipe ${c.id} com pacienteRef diferente do segmento`);
    }
  }
  return { erros, avisos };
}
