function init() {
  import("./index.our-team.partial.photo-animation.js");
  import("./index.section-news.partial.js");
  import("./index.who-we-are.partial.js");
  import("./index.cta.partial.js");
  import("./index.scroll-to-cta.partial.js");
  import("./index.our-services.partial.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]',
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
