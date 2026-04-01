document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const toggle = document.querySelector(".header__toggle, #burger");
  const nav = document.querySelector("#projects-mobile-nav, #nav-menu, .header__nav");
  const navLinks = document.querySelectorAll(".header__menu .header__link");
  const isProjectsToggle = toggle?.classList.contains("header__toggle");

  if (!header || !toggle) {
    return;
  }

  const setMenuState = (isOpen) => {
    header.classList.toggle("header--open", isOpen);
    toggle.classList.toggle("active", isOpen);

    if (nav && !isProjectsToggle) {
      nav.classList.toggle("active", isOpen);
    }

    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("body--menu-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    document.documentElement.classList.toggle("menu-open", isOpen);
  };

  toggle.addEventListener("click", () => {
    const isOpen = !header.classList.contains("header--open");
    setMenuState(isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 767) {
        setMenuState(false);
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      setMenuState(false);
    }
  });
});

