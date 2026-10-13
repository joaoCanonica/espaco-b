// Chromium do Playwright; sem a revisão esperada, usa a pré-instalada em PLAYWRIGHT_BROWSERS_PATH.
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { chromium } from 'playwright';

export async function abrirChromium() {
  try {
    return await chromium.launch();
  } catch (erro) {
    const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
    const dir = existsSync(base)
      ? readdirSync(base)
          .filter((n) => /^chromium-\d+$/.test(n))
          .sort()
          .reverse()[0]
      : null;
    const exe = dir ? join(base, dir, 'chrome-linux', 'chrome') : null;
    if (!exe || !existsSync(exe)) throw erro;
    return chromium.launch({ executablePath: exe });
  }
}

export function caminhoChromium() {
  const base = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  const dir = existsSync(base)
    ? readdirSync(base)
        .filter((n) => /^chromium-\d+$/.test(n))
        .sort()
        .reverse()[0]
    : null;
  return dir ? join(base, dir, 'chrome-linux', 'chrome') : undefined;
}
