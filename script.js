document.addEventListener('DOMContentLoaded', () => {

  // ── AI WORKFLOW STEP SEQUENCER ──
  (function () {
    const section = document.querySelector('.ai-workflow');
    if (!section) return;

    const steps = Array.from(section.querySelectorAll('.workflow-step'));
    if (!steps.length) return;

    let current = 0;
    let timer = null;

    function activate(index) {
      steps.forEach(function (step, i) {
        step.classList.toggle('is-active', i === index);
        step.classList.toggle('is-inactive', i !== index);
      });
      current = index;
    }

    function advance() {
      activate((current + 1) % steps.length);
    }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(advance, 1400);
    }

    function stopTimer() {
      clearInterval(timer);
    }

    // Pause while the user's mouse is anywhere in the section
    section.addEventListener('mouseenter', stopTimer);
    section.addEventListener('mouseleave', startTimer);

    // Click a step to jump to it, then resume auto-advance
    steps.forEach(function (step, i) {
      step.addEventListener('click', function () {
        activate(i);
        startTimer();
      });
    });

    // Kick off
    activate(0);
    startTimer();
  })();

  // ── HERO MOUSE TRACKING ──
  (function () {
    const hero = document.getElementById('hero');
    if (!hero) return;

    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let initialized = false;

    hero.addEventListener('mousemove', function (e) {
      const rect = hero.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (!initialized) {
        currentX = targetX;
        currentY = targetY;
        initialized = true;
      }
    });

    function animate() {
      if (initialized) {
        // Lerp for a snappy but smooth catch-up transition
        currentX += (targetX - currentX) * 0.2;
        currentY += (targetY - currentY) * 0.2;

        hero.style.setProperty('--mouse-x', `${currentX}px`);
        hero.style.setProperty('--mouse-y', `${currentY}px`);
      }
      requestAnimationFrame(animate);
    }

    animate();
  })();

  // ── DRAGGABLE CARDS ──
  (function () {
    const cards = document.querySelectorAll('.floating-card');
    let activeCard = null;
    let startX = 0, startY = 0;

    cards.forEach(card => {
      card._tx = 0;
      card._ty = 0;
      card._rotation = parseFloat(card.getAttribute('data-rotation')) || 0;

      card.addEventListener('pointerdown', (e) => {
        activeCard = card;
        startX = e.clientX - card._tx;
        startY = e.clientY - card._ty;
        card.classList.add('is-dragging');

        card.setPointerCapture(e.pointerId);

        // Preserve opacity so dragging doesn't fade if scroll triggers happen
        card.style.opacity = '1';

        // Apply initial transform to ensure it doesn't snap back
        card.style.transform = `translate(${card._tx}px, ${card._ty}px) rotate(${card._rotation}deg) scale(1.05)`;

        // Bring to front
        cards.forEach(c => c.style.zIndex = '10');
        card.style.zIndex = '12';

        const coordX = activeCard.querySelector('.coord-x');
        const coordY = activeCard.querySelector('.coord-y');
        if (coordX && coordY) {
          coordX.textContent = `X: ${Math.round(e.clientX)}`;
          coordY.textContent = `Y: ${Math.round(e.clientY)}`;
        }

        e.preventDefault();
      });
    });

    document.addEventListener('pointermove', (e) => {
      if (!activeCard) return;

      activeCard._tx = e.clientX - startX;
      activeCard._ty = e.clientY - startY;

      activeCard.style.transform = `translate(${activeCard._tx}px, ${activeCard._ty}px) rotate(${activeCard._rotation}deg) scale(1.05)`;

      const coordX = activeCard.querySelector('.coord-x');
      const coordY = activeCard.querySelector('.coord-y');
      if (coordX && coordY) {
        coordX.textContent = `X: ${Math.round(e.clientX)}`;
        coordY.textContent = `Y: ${Math.round(e.clientY)}`;
      }
    });

    document.addEventListener('pointerup', () => {
      if (!activeCard) return;
      activeCard.classList.remove('is-dragging');
      activeCard.style.transform = `translate(${activeCard._tx}px, ${activeCard._ty}px) rotate(${activeCard._rotation}deg) scale(1)`;
      activeCard = null;
    });
  })();

  // ── SCROLL TRIGGER FOR HERO CARDS ──
  (function () {
    const hero = document.getElementById('hero');
    const cards = document.querySelectorAll('.floating-card');
    if (!hero) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
          hero.classList.add('cards-visible');
        } else {
          hero.classList.remove('cards-visible');
          // Clear inline drag transforms so they retreat correctly via CSS
          cards.forEach(card => {
            card.style.transform = '';
            card.style.opacity = '';
            card._tx = 0;
            card._ty = 0;
          });
        }
      });
    }, {
      threshold: [0, 0.15, 1.0]
    });

    observer.observe(hero);
  })();

  // ── MOBILE SCROLL PARALLAX ──
  (function () {
    const cards = document.querySelectorAll('.floating-card');
    let ticking = false;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      if (window.innerWidth <= 1024) {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const scrollDiff = currentScrollY - lastScrollY;

            cards.forEach((card) => {
              if (!card.classList.contains('is-dragging')) {
                const rect = card.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const baseRotation = 0; // Forced straight for mobile/tablet

                // Calculate how much is visible from the bottom
                const visibleAmount = viewportHeight - rect.top;

                if (visibleAmount > -200 && visibleAmount < viewportHeight + 400) {
                  // Gentle parallax Y calculation
                  let yOffset = 20 - (visibleAmount * 0.05);

                  // Optional slight momentum
                  const speedOffset = scrollDiff * 0.05;
                  yOffset += speedOffset;

                  // Clamp it to a very small range to prevent overlap
                  if (yOffset < -10) yOffset = -10;
                  if (yOffset > 20) yOffset = 20;

                  // Just purely translate and naturally rotate
                  card.style.transform = `translateY(${yOffset}px) rotate(${baseRotation}deg)`;

                  // Fade in gracefully
                  let opacity = (visibleAmount - 50) / 250;
                  if (opacity < 0) opacity = 0;
                  if (opacity > 1) opacity = 1;
                  card.style.opacity = opacity;
                }
              }
            });

            lastScrollY = currentScrollY;
            ticking = false;
          });
          ticking = true;
        }
      }
    });

    // Cleanup inline styles if resized back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        cards.forEach(card => {
          if (!card.classList.contains('is-dragging')) {
            card.style.transform = '';
            card.style.opacity = '';
          }
        });
      }
    });

    // Trigger initial calculation
    window.dispatchEvent(new Event('scroll'));
  })();
});
