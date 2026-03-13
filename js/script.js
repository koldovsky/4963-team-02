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

function initCtaButtonRipple() {
  const ctaButton = document.querySelector('.index-cta__button');
  if (!ctaButton || ctaButton.dataset.rippleInit) return;

  ctaButton.addEventListener('click', (event) => {
    const rect = ctaButton.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'index-cta__ripple';

    const size = Math.max(rect.width, rect.height) * 1.8;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    ctaButton.appendChild(ripple);
    requestAnimationFrame(() => ripple.classList.add('animate'));

    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });

  ctaButton.dataset.rippleInit = 'true';
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollButton();
  initCtaButtonRipple();
});

document.addEventListener('htmx:afterSwap', () => {
  initScrollButton();
  initCtaButtonRipple();
});