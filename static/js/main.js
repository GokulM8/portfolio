document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = Array.from(document.querySelectorAll('.nav-links .nl'));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const target = link.getAttribute('href')?.slice(1);
      link.classList.toggle('active', target === id);
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // Activate immediately on click instead of waiting for the smooth-scroll
      // animation to finish and the scroll listener to catch up.
      const targetId = link.getAttribute('href')?.slice(1);
      if (targetId) {
        setActiveLink(targetId);
      }

      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        if (menuToggle) {
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  const lastSectionId = sections[sections.length - 1]?.id;
  const isAtBottom = () =>
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

  // Picks the section whose top has most recently crossed the reference line.
  // Using getBoundingClientRect() instead of IntersectionObserver ratios avoids
  // tall sections (e.g. Projects) never reaching the ratio threshold needed to fire.
  const updateActiveSection = () => {
    if (lastSectionId && isAtBottom()) {
      setActiveLink(lastSectionId);
      return;
    }

    const referenceLine = window.innerHeight * 0.3;
    let currentId = sections[0]?.id;

    for (const section of sections) {
      if (section.getBoundingClientRect().top <= referenceLine) {
        currentId = section.id;
      }
    }

    if (currentId) {
      setActiveLink(currentId);
    }
  };

  if (nav) {
    const updateNavState = () => {
      nav.classList.toggle('scrolled', window.scrollY > 24);
      updateActiveSection();
    };

    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState, { passive: true });
  }
});
