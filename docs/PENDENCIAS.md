# Pendências

Formato: o que falta · quem resolve · desde.

## Ferramentas (sessão 0, 12/10/2026)

- `potrace` (CLI) não está instalado no ambiente. Para `brand:extract`, há o pacote npm `potrace` (devDependency, porta JS). Se preferir o CLI oficial: `sudo apt install potrace` (global; não instalado sem ordem). · Code/João
- Node do ambiente de nuvem é 22; o projeto fixa Node 24 LTS. Build e check foram validados com Node 24.21.0 baixado em pasta temporária. Na máquina local: `nvm install` (lê `.nvmrc`). · João
- Chromium do Playwright: a revisão esperada pelo `playwright@1.64.0` não vem pré-instalada aqui; `scripts/capturar.mjs` cai para o Chromium em `PLAYWRIGHT_BROWSERS_PATH` (ou `CHROMIUM_PATH`). Localmente: `pnpm exec playwright install chromium`. · João

## Mídia (sessão 1, 12/10/2026)

- **Originais dos 3 arquivos novos**: retratos e logo vieram como anexo (possível recompressão). Recebido: retrato colete 1500×2000 (205 KB), retrato vestido 1500×2000 (110 KB), logo 2000×2000 (108 KB, não 2048). Pedir os arquivos do fotógrafo e o logo vetorial. · João
- **Crédito do fotógrafo** do ensaio. · João
- **Fotos do espaço em alta** (estáticas, sem pessoas). Hoje só há o vídeo do ambiente. · João
- **Café com Bia**: ouvir o áudio de 20,7 s a 118,7 s e dizer o que pode entrar. Sem isso o derivado tem só 0–14 s. · João
- **Vídeo de presença**: confirmar se pares diferentes são da mesma paciente (P-001 a P-008; ex.: P-002 e P-007) e liberar ou não os trechos com o membro da equipe de costas (16,6–18,5 s e 22,8–24,5 s). · João
- **Termos das pacientes**: consentimento declarado pelo cliente, termo não arquivado (aviso; não bloqueia). · João
