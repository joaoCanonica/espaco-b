// Valida media.manifest.json. Sai com código 1 se houver erro.
import { validarManifesto } from './lib/manifesto.mjs';

const { erros, avisos } = await validarManifesto();
for (const a of avisos) console.warn(`aviso: ${a}`);
for (const e of erros) console.error(`erro: ${e}`);
console.log(`manifesto: ${erros.length} erro(s), ${avisos.length} aviso(s)`);
process.exit(erros.length ? 1 : 0);
