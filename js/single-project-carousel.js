const recentProjectsCarousel = document.querySelector("[data-recent-projects-carousel]");

if (recentProjectsCarousel) {
  const track = recentProjectsCarousel.querySelector("[data-carousel-track]");
  const prevButton = recentProjectsCarousel.querySelector("[data-carousel-prev]");
  const nextButton = recentProjectsCarousel.querySelector("[data-carousel-next]");

  let isAnimating = false;
  let autoplayId = null;

  const getGap = () => {
    const styles = window.getComputedStyle(track);
    return parseFloat(styles.gap || styles.columnGap || "0");
  };

  const getStepWidth = () => {
    const firstCard = track.querySelector(".recent-projects-card");

    if (!firstCard) {
      return 0;
    }

    return firstCard.getBoundingClientRect().width + getGap();
  };

  const resetTrack = () => {
    track.style.transition = "none";
    track.style.transform = "translateX(0)";
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayId = window.setInterval(() => {
      moveNext();
    }, 4200);
  };

  const stopAutoplay = () => {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  };

  const moveNext = () => {
    if (isAnimating || track.children.length < 2) {
      return;
    }

    isAnimating = true;
    const stepWidth = getStepWidth();

    track.style.transition = "transform 480ms ease";
    track.style.transform = `translateX(-${stepWidth}px)`;

    const handleTransitionEnd = () => {
      track.appendChild(track.firstElementChild);
      resetTrack();
      isAnimating = false;
      track.removeEventListener("transitionend", handleTransitionEnd);
    };

    track.addEventListener("transitionend", handleTransitionEnd, { once: true });
  };

  const movePrev = () => {
    if (isAnimating || track.children.length < 2) {
      return;
    }

    isAnimating = true;
    const stepWidth = getStepWidth();

    track.prepend(track.lastElementChild);
    track.style.transition = "none";
    track.style.transform = `translateX(-${stepWidth}px)`;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        track.style.transition = "transform 480ms ease";
        track.style.transform = "translateX(0)";
      });
    });

    const handleTransitionEnd = () => {
      resetTrack();
      isAnimating = false;
      track.removeEventListener("transitionend", handleTransitionEnd);
    };

    track.addEventListener("transitionend", handleTransitionEnd, { once: true });
  };

  prevButton?.addEventListener("click", () => {
    movePrev();
    startAutoplay();
  });

  nextButton?.addEventListener("click", () => {
    moveNext();
    startAutoplay();
  });

  recentProjectsCarousel.addEventListener("mouseenter", stopAutoplay);
  recentProjectsCarousel.addEventListener("mouseleave", startAutoplay);

  window.addEventListener("resize", resetTrack);

  resetTrack();
  startAutoplay();
}