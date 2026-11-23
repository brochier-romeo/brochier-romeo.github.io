(() => {
  // Shuffle the ticker once per visit, then mirror it for a seamless loop.
  const tickerTrack = document.querySelector(".ticker-track");
  if (tickerTrack) {
    const groups = Array.from(tickerTrack.children);
    if (groups.length > 1) {
      const first = groups[0];
      const items = Array.from(first.children);
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
      items.forEach((item) => first.appendChild(item));
      groups[1].replaceChildren(...items.map((item) => item.cloneNode(true)));
    }
  }

  const canvas = document.getElementById("birds-canvas");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let birds = [];
  let animationId = 0;
  let lastFrame = 0;

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function makeBird(initial = false) {
    return {
      x: initial ? Math.random() * width : -30 - Math.random() * 100,
      y: Math.random() * height * 0.82 + height * 0.04,
      speed: 0.32 + Math.random() * 0.65,
      scale: 0.38 + Math.random() * 0.72,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.28 + Math.random() * 0.42,
      drift: (Math.random() - 0.5) * 0.12
    };
  }

  function drawBird(bird, time) {
    const flap = Math.sin(time * 0.004 + bird.phase) * 3.5;
    ctx.save();
    ctx.translate(bird.x, bird.y);
    ctx.scale(bird.scale, bird.scale);
    ctx.strokeStyle = `rgba(48, 37, 25, ${bird.opacity})`;
    ctx.lineWidth = 1.8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-10, 1);
    ctx.quadraticCurveTo(-5, -7 - flap, 0, 0);
    ctx.quadraticCurveTo(5, -7 + flap, 10, 1);
    ctx.stroke();
    ctx.restore();
  }

  function animate(time) {
    if (time - lastFrame < 28) {
      animationId = requestAnimationFrame(animate);
      return;
    }
    lastFrame = time;
    ctx.clearRect(0, 0, width, height);
    for (const bird of birds) {
      bird.x += bird.speed;
      bird.y += bird.drift;
      drawBird(bird, time);
      if (bird.x > width + 35) Object.assign(bird, makeBird(false));
    }
    animationId = requestAnimationFrame(animate);
  }

  resize();
  birds = Array.from({ length: Math.min(13, Math.max(7, Math.round(window.innerWidth / 115))) }, () => makeBird(true));
  window.addEventListener("resize", resize, { passive: true });
  animationId = requestAnimationFrame(animate);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationId);
    } else {
      lastFrame = 0;
      animationId = requestAnimationFrame(animate);
    }
  });
  window.addEventListener("pagehide", () => cancelAnimationFrame(animationId), { once: true });
})();
