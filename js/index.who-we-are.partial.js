const animateRoll = (counter) => {
  const target = parseFloat(counter.getAttribute("data-target"));
  const hasComma = counter.hasAttribute("data-comma");
  const decimals = counter.getAttribute("data-decimals") || 0;

  let finalStr = target.toFixed(decimals);
  if (hasComma) {
    finalStr = Number(finalStr).toLocaleString("en-US");
  }

  counter.innerHTML = "";
  const columns = [];

  for (let char of finalStr) {
    if (isNaN(char)) {
      const span = document.createElement("span");
      span.className = "counter-char";
      span.innerText = char;
      counter.appendChild(span);
    } else {
      const col = document.createElement("span");
      col.className = "counter-digit-column";

      let stripHtml = "";
      for (let i = 0; i <= 9; i++) {
        stripHtml += `<span class="counter-char">${i}</span>`;
      }
      stripHtml += `<span class="counter-char">${char}</span>`;

      col.innerHTML = stripHtml;
      counter.appendChild(col);
      columns.push(col);
    }
  }

  setTimeout(() => {
    columns.forEach((col, index) => {
      void col.offsetHeight;

      col.style.transitionDuration = `${1.5 + index * 0.2}s`;
      col.style.transform = `translateY(-10em)`;
    });
  }, 50);
};

const initCounters = () => {
  const counters = document.querySelectorAll(
    ".counter-value:not(.initialized)",
  );
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateRoll(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  counters.forEach((counter) => {
    counter.classList.add("initialized");
    counter.innerText = "";
    observer.observe(counter);
  });
};

document.body.addEventListener("htmx:afterSettle", initCounters);
initCounters();
