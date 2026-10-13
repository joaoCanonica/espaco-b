// Controle da entrada: "Pular" (mouse, toque e teclado), Esc, foco no conteúdo e limpeza no fim.
// A animação é só CSS; isto aqui nunca é necessário para o hero aparecer.
const raiz = document.documentElement;
const entrada = document.querySelector<HTMLElement>('[data-entrada]');

function terminar(focarConteudo: boolean) {
  if (!raiz.classList.contains('com-entrada')) return;
  raiz.classList.remove('com-entrada');
  document.removeEventListener('keydown', aoTeclar);
  if (focarConteudo) {
    const main = document.getElementById('conteudo');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
  }
}

function aoTeclar(e: KeyboardEvent) {
  if (e.key === 'Escape') terminar(true);
}

if (entrada && raiz.classList.contains('com-entrada')) {
  // "click" cobre mouse, toque (tap) e teclado (Enter/Espaço no botão).
  document.querySelector('[data-pular]')?.addEventListener('click', () => terminar(true));
  document.addEventListener('keydown', aoTeclar);
  // Tab para dentro do hero durante a entrada: sai da frente imediatamente.
  document
    .getElementById('conteudo')
    ?.addEventListener('focusin', () => terminar(false), { once: true });
  entrada.addEventListener('animationend', (e) => {
    if (e.animationName.includes('entrada-sai')) terminar(false);
  });
}
