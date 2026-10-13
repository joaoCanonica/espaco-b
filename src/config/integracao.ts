// Integração Astro: trava de produção no início do build e auditoria de compliance no fim.
// Produção = `astro build` sem PREVIEW=1. Preview nunca falha.
import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';

export function travaEspacoB(): AstroIntegration {
  let producao = false;
  return {
    name: 'espaco-b-trava',
    hooks: {
      'astro:config:setup': async ({ command, logger }) => {
        if (command !== 'build') return;
        producao = process.env['PREVIEW'] !== '1';
        const { listarPendencias, verificarProducao } = await import('./index.ts');
        const pend = listarPendencias();
        logger.info(
          `modo ${producao ? 'PRODUÇÃO' : 'PREVIEW'} · ${pend.length} pendência(s) na config`,
        );
        const erros = verificarProducao();
        if (producao && erros.length) {
          throw new Error(
            `Produção travada pela config:\n- ${erros.join('\n- ')}\n(use PREVIEW=1 para pré-visualizar)`,
          );
        }
        for (const e of erros) logger.warn(`(preview) bloquearia produção: ${e}`);
      },
      'astro:build:done': async ({ dir, logger }) => {
        const { auditar } = await import('../../scripts/audit-compliance.mjs');
        const r = await auditar({ dist: fileURLToPath(dir), producao });
        logger.info(
          `compliance: ${r.bloqueios.length} bloqueio(s), ${r.avisos.length} aviso(s) → docs/COMPLIANCE.md`,
        );
        const linhas = r.bloqueios.map(
          (b: { termo: string; arquivo: string; linha: number; trecho: string }) =>
            `"${b.termo}" em ${b.arquivo}${b.linha ? `:${b.linha}` : ''} → ${b.trecho}`,
        );
        if (producao && linhas.length) {
          throw new Error(
            `Produção travada pela auditoria de compliance:\n- ${linhas.join('\n- ')}`,
          );
        }
        for (const l of linhas) logger.warn(`(preview) bloquearia produção: ${l}`);
      },
    },
  };
}
