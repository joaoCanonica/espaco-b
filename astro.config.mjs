// @ts-check
import { defineConfig } from 'astro/config';
import { travaEspacoB } from './src/config/integracao.ts';

// Domínio ainda não existe: SITE_URL vem do ambiente (ver .env.exemplo).
const site = process.env.SITE_URL;

export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  integrations: [travaEspacoB()],
});
