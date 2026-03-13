(() => {
  const togglePopup = (popup, isOpen) => {
    if (!popup) {
      return;
    }

    popup.hidden = !isOpen;
    popup.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("popup-open", isOpen);

    if (isOpen) {
      const firstField = popup.querySelector("input, textarea, button");
      firstField?.focus();
    }
  };

  document.addEventListener("click", (event) => {
    const openTrigger = event.target.closest("[data-popup-open]");
    if (openTrigger) {
      const popup = document.getElementById(openTrigger.dataset.popupOpen);
      togglePopup(popup, true);
      return;
    }

    const closeTrigger = event.target.closest("[data-popup-close]");
    if (closeTrigger) {
      const popup = closeTrigger.closest(".popup-brief");
      togglePopup(popup, false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    const popup = document.querySelector(".popup-brief:not([hidden])");
    if (popup) {
      togglePopup(popup, false);
    }
  });
})();