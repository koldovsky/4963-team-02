function initTeamVideos() {
  const ourTeamSection = document.getElementById('team');
  const teamImages = document.querySelectorAll('.our-team__card-image');

  if (!ourTeamSection || teamImages.length === 0) return;

  if (ourTeamSection.dataset.videosInitialized) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          replaceImagesToVideos();
          observer.unobserve(ourTeamSection);
          ourTeamSection.dataset.videosInitialized = 'true';
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(ourTeamSection);

  function replaceImagesToVideos() {
    teamImages.forEach((img) => {
      const videoSrc = img.getAttribute('data-video-src');

      if (!videoSrc) return;

      const video = document.createElement('video');
      video.className = 'our-team__card-image';
      video.width = img.width;
      video.height = img.height;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';
      video.playsinline = true;

      const source = document.createElement('source');
      source.src = videoSrc;
      source.type = 'video/mp4';

      video.appendChild(source);

      img.replaceWith(video);
    });
  }
}

let checkCount = 0;
const checkInterval = setInterval(() => {
  checkCount++;

  const ourTeamSection = document.getElementById('team');
  if (ourTeamSection) {
    clearInterval(checkInterval);
    initTeamVideos();
  }

  if (checkCount >= 20) {
    clearInterval(checkInterval);
  }
}, 500);
