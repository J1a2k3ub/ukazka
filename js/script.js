document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  const mainContent = document.getElementById('main');
  const showCenikBtn = document.getElementById('show-cenik-btn');
  const cenikSection = document.getElementById('cenik-section');
  const navBackdrop = document.getElementById('navBackdrop');

  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  const openMenu = () => {
    if (!navLinks || !hamburger) return;

    if (!navLinks.classList.contains('active')) {
      navLinks.classList.add('active');
      hamburger.classList.add('active');

      if (!isMobile()) {
        if (mainContent) mainContent.classList.add('menu-open');
        document.body.classList.add('menu-open');

        if (navBackdrop) {
          navBackdrop.style.opacity = '1';
          navBackdrop.style.visibility = 'visible';
        }
      }
    }
  };

  const closeMenu = () => {
    if (!navLinks || !hamburger) return;

    navLinks.classList.remove('active');
    hamburger.classList.remove('active');

    if (!isMobile()) {
      if (mainContent) mainContent.classList.remove('menu-open');
      document.body.classList.remove('menu-open');

      if (navBackdrop) {
        navBackdrop.style.opacity = '0';
        navBackdrop.style.visibility = 'hidden';
      }
    }
  };

  const toggleMenu = () =>
    (navLinks && navLinks.classList.contains('active')) ? closeMenu() : openMenu();

  if (hamburger && navLinks)
    hamburger.addEventListener('click', toggleMenu, { passive: true });

  if (navBackdrop)
    navBackdrop.addEventListener('click', closeMenu, { passive: true });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !isMobile()) closeMenu();
  });

  window.addEventListener(
    'resize',
    () => {
      if (isMobile()) {
        document.body.classList.remove('menu-open');
        if (mainContent) mainContent.classList.remove('menu-open');

        if (navBackdrop) {
          navBackdrop.style.opacity = '0';
          navBackdrop.style.visibility = 'hidden';
        }
      } else {
        if (navLinks && navLinks.classList.contains('active')) {
          document.body.classList.add('menu-open');
          if (mainContent) mainContent.classList.add('menu-open');

          if (navBackdrop) {
            navBackdrop.style.opacity = '1';
            navBackdrop.style.visibility = 'visible';
          }
        }
      }
    },
    { passive: true }
  );

  window.addEventListener('orientationchange', closeMenu, { passive: true });

  if (showCenikBtn && cenikSection) {
    showCenikBtn.addEventListener('click', () => {
      const isActive = cenikSection.classList.toggle('active');
      showCenikBtn.textContent = isActive ? 'Skrýt ceník' : 'Zobrazit ceník';

      if (isActive) {
        setTimeout(() => {
          cenikSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 250);
      }
    });
  }


  const fadeElements = document.querySelectorAll('.fade-in');

  if (isMobile()) {
    fadeElements.forEach(el => {
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  } else {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
  }

  window.initGallery = function (galleryId) {
    const gallery = document.getElementById(galleryId);
    if (!gallery) return;

    let isDown = false, startX, scrollLeft;

    const start = (x) => {
      isDown = true;
      gallery.classList.add('active');
      startX = x - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    };

    const move = (x, e) => {
      if (!isDown) return;
      e && e.preventDefault();
      const walk = (x - startX) * 2;
      gallery.scrollLeft = scrollLeft - walk;
    };

    const end = () => {
      isDown = false;
      gallery.classList.remove('active');
    };

    gallery.addEventListener('mousedown', (e) => start(e.pageX));
    gallery.addEventListener('mousemove', (e) => move(e.pageX, e));
    gallery.addEventListener('mouseleave', end);
    gallery.addEventListener('mouseup', end);

    gallery.addEventListener('touchstart', (e) => start(e.touches[0].pageX), { passive: true });
    gallery.addEventListener('touchmove', (e) => move(e.touches[0].pageX), { passive: false });
    gallery.addEventListener('touchend', end, { passive: true });
  };
});
