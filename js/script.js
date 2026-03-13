function initScrollButton() {
  const scrollButton = document.querySelector('.scroll-to-cta');
  if (!scrollButton || scrollButton.dataset.scrollInit) return;

  scrollButton.addEventListener('click', () => {
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  scrollButton.dataset.scrollInit = 'true';
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollButton();
});

document.addEventListener('htmx:afterSwap', () => {
  initScrollButton();
});