
  const header = document.getElementById("header");
  const toggle = document.querySelector(".header__toggle");
  const navLinks = document.querySelectorAll(".header__menu .header__link");

  if (!header || !toggle) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("header--open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("body--menu-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 767) {
        header.classList.remove("header--open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("body--menu-open");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      header.classList.remove("header--open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("body--menu-open");
    }
  });

