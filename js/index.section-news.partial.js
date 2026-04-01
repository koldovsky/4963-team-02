const text = document.querySelector(".news__title--main");
const colors = ["white", "black", "red"];

let i = 0;
setInterval(() => {
  text.style.color = colors[i];
  i = (i + 1) % colors.length;
}, 2000);
