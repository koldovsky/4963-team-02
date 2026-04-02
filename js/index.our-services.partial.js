const initServicesActiveItem = () => {
  const items = document.querySelectorAll(".services__item");
  if (!items.length) return;

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((el) => el.classList.remove("services__item--active"));
      item.classList.add("services__item--active");
    });
  });
};

document.body.addEventListener("htmx:afterSettle", initServicesActiveItem);
initServicesActiveItem();
