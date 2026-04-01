let sectionHashObserver = null;

function getHeaderNavSections() {
  const links = Array.from(
    document.querySelectorAll('header .header__nav .header__link[href^="#"]')
  );
  return links
    .map((link) => link.getAttribute('href'))
    .filter(Boolean)
    .map((href) => href.slice(1));
}

function getHeaderHeight() {
  const header = document.querySelector('header');
  return header ? header.offsetHeight : 0;
}

function getActiveSectionId(sectionIds) {
  const hash = window.location.hash.slice(1);
  if (hash && sectionIds.includes(hash)) {
    return hash;
  }

  const headerHeight = getHeaderHeight();
  const scrollPosition = window.pageYOffset + headerHeight + 5;
  let activeId = sectionIds[0] || '';

  sectionIds.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    if (section.offsetTop <= scrollPosition) {
      activeId = sectionId;
    }
  });

  return activeId;
}

function getNextSectionId(sectionIds) {
  if (!sectionIds.length) return '';

  const activeId = getActiveSectionId(sectionIds);
  const currentIndex = sectionIds.indexOf(activeId);

  if (currentIndex === -1 || currentIndex === sectionIds.length - 1) {
    return sectionIds[0];
  }

  return sectionIds[currentIndex + 1];
}

function updateLocationHash(hash) {
  const url = hash ? `${window.location.pathname}${window.location.search}#${hash}` : `${window.location.pathname}${window.location.search}`;
  history.replaceState(null, '', url);
}

function setScrollButtonState(sectionId) {
  const scrollButton = document.querySelector('.scroll-to-cta');
  if (!scrollButton) return;

  const isTopState = sectionId === 'contact';
  scrollButton.classList.toggle('scroll-to-cta--top', isTopState);
  scrollButton.setAttribute(
    'aria-label',
    isTopState ? 'Scroll to first section' : 'Scroll to next section'
  );
}

function scrollToSection(section) {
  const headerHeight = getHeaderHeight();
  const nextTop = section.offsetTop - headerHeight;
  window.scrollTo({ top: Math.max(nextTop, 0), behavior: 'smooth' });
}

function observeSectionHash() {
  const sectionIds = getHeaderNavSections();
  if (!sectionIds.length) return;

  const sections = sectionIds
    .map((sectionId) => document.getElementById(sectionId))
    .filter(Boolean);
  if (!sections.length) return;

  if (sectionHashObserver) {
    sectionHashObserver.disconnect();
  }

  const headerHeight = getHeaderHeight();
  sectionHashObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target;
          if (section.id) {
            updateLocationHash(section.id);
            setScrollButtonState(section.id);
          }
        }
      });
    },
    {
      rootMargin: `-${headerHeight}px 0px 0px 0px`,
      threshold: 0.5,
    }
  );

  sections.forEach((section) => {
    sectionHashObserver.observe(section);
  });
}

function initScrollButton() {
  const scrollButton = document.querySelector('.scroll-to-cta');
  if (!scrollButton || scrollButton.dataset.scrollInit) return;

  scrollButton.addEventListener('click', () => {
    const sectionIds = getHeaderNavSections();
    const nextId = getNextSectionId(sectionIds);
    const nextSection = document.getElementById(nextId);

    if (nextSection) {
      scrollToSection(nextSection);
      updateLocationHash(nextId);
      setScrollButtonState(nextId);
    }
  });

  scrollButton.dataset.scrollInit = 'true';
}

function initScrollToCta() {
  initScrollButton();
  observeSectionHash();
  const currentHash = window.location.hash ? window.location.hash.slice(1) : '';
  setScrollButtonState(currentHash);
}

document.body.addEventListener('htmx:afterSwap', initScrollToCta);
initScrollToCta();