function closeBurgerMenu() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav-menu");

  if (!burger || !nav) return;

  burger.classList.remove("active");
  nav.classList.remove("active");
  document.body.classList.remove("menu-open");
}

function toggleBurgerMenu() {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav-menu");

  if (!burger || !nav) return;

  burger.classList.toggle("active");
  nav.classList.toggle("active");
  document.body.classList.toggle("menu-open");
}

function onHeaderClick(event) {
  if (event.target.closest("#burger")) {
    toggleBurgerMenu();
    return;
  }

  if (event.target.closest(".header__link")) {
    closeBurgerMenu();
  }
}

function onDocumentClick(event) {
  const nav = document.getElementById("nav-menu");
  const burger = document.getElementById("burger");

  if (!nav || !burger || !nav.classList.contains("active")) return;

  if (!event.target.closest(".header")) {
    closeBurgerMenu();
  }
}

function initBurgerMenu() {
  document.body.addEventListener("click", onHeaderClick);
  document.body.addEventListener("click", onDocumentClick);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeBurgerMenu();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBurgerMenu);
} else {
  initBurgerMenu();
}

