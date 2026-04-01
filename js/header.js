document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav-menu");
  const links = document.querySelectorAll(".header__link");

  if (!burger || !nav) return;
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("active");

    document.body.classList.toggle("menu-open");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      nav.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
});
