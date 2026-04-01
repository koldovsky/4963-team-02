const ctaButton = document.querySelector(".index-cta__button");
const ctaButtonText = document.querySelector(".index-cta__button-text");

if (ctaButton && ctaButtonText) {
  const greetings = [
    { text: "Hello!", lang: "English", bg: "rgba(31, 75, 139, 0.18)" },
    { text: "Привіт!", lang: "Ukrainian", bg: "rgba(0, 87, 183, 0.18)" },
    { text: "Hola!", lang: "Español", bg: "rgba(198, 11, 30, 0.18)" },
    { text: "Bonjour!", lang: "Français", bg: "rgba(0, 85, 164, 0.18)" },
    { text: "Ciao!", lang: "Italiano", bg: "rgba(0, 146, 70, 0.18)" },
    { text: "Hallo!", lang: "Deutsch", bg: "rgba(255, 206, 0, 0.18)" },
  ];

  let currentIndex = greetings.findIndex(
    (item) => item.text === ctaButtonText.textContent.trim(),
  );

  if (currentIndex === -1) {
    currentIndex = 0;
  }

  const updateButton = (index) => {
    const next = greetings[index];
    ctaButtonText.textContent = next.text;
    ctaButton.style.setProperty("--flag-bg", next.bg);
    ctaButton.setAttribute(
      "aria-label",
      `Say ${next.text} in ${next.lang}`,
    );
  };

  ctaButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % greetings.length;
    updateButton(currentIndex);
  });

  updateButton(currentIndex);
}
