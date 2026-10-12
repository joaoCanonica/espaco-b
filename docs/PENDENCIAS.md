# Pendências

Formato: o que falta · quem resolve · desde.

## Ferramentas (sessão 0, 12/10/2026)

- `potrace` (CLI) não está instalado no ambiente. Para `brand:extract`, há o pacote npm `potrace` (devDependency, porta JS). Se preferir o CLI oficial: `sudo apt install potrace` (global; não instalado sem ordem). · Code/João
- Node do ambiente de nuvem é 22; o projeto fixa Node 24 LTS. Build e check foram validados com Node 24.21.0 baixado em pasta temporária. Na máquina local: `nvm install` (lê `.nvmrc`). · João
- Chromium do Playwright: a revisão esperada pelo `playwright@1.64.0` não vem pré-instalada aqui; `scripts/capturar.mjs` cai para o Chromium em `PLAYWRIGHT_BROWSERS_PATH` (ou `CHROMIUM_PATH`). Localmente: `pnpm exec playwright install chromium`. · João
