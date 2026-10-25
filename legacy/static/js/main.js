document.addEventListener('DOMContentLoaded', () => {
  // Typing animation in hero
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    const roles = ['Software Developer', 'ML Engineer', 'Full Stack Dev', 'AI Builder', 'Hackathon Finalist'];
    let roleIndex = 0, charIndex = 0, deleting = false;

    const tick = () => {
      const current = roles[roleIndex];
      if (deleting) {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 40);
      } else {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 80);
      }
    };
    setTimeout(tick, 600);
  }

  // Section nav scroll-spy
  const snLinks = Array.from(document.querySelectorAll('.sn-link'));
  const snSections = snLinks
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  if (snLinks.length && snSections.length) {
    const setSnActive = (id) => {
      snLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    };

    snLinks.forEach(l => {
      l.addEventListener('click', () => setSnActive(l.getAttribute('href').slice(1)));
    });

    const isAtBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    const updateSn = () => {
      if (isAtBottom()) { setSnActive(snSections[snSections.length - 1].id); return; }
      const ref = window.innerHeight * 0.3;
      let cur = snSections[0]?.id;
      for (const s of snSections) {
        if (s.getBoundingClientRect().top <= ref) cur = s.id;
      }
      if (cur) setSnActive(cur);
    };

    window.addEventListener('scroll', updateSn, { passive: true });
    updateSn();
  }

  // Nav copy email button
  const navCopyBtn = document.getElementById('navCopyEmail');
  if (navCopyBtn) {
    navCopyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('gokulmallabathula@gmail.com').then(() => {
        navCopyBtn.classList.add('copied');
        const icon = navCopyBtn.querySelector('i');
        if (icon) icon.className = 'ti ti-check';
        navCopyBtn.childNodes.forEach(n => { if (n.nodeType === 3) n.textContent = ' Copied'; });
        setTimeout(() => {
          navCopyBtn.classList.remove('copied');
          if (icon) icon.className = 'ti ti-copy';
          navCopyBtn.childNodes.forEach(n => { if (n.nodeType === 3) n.textContent = ' Copy'; });
        }, 2000);
      });
    });
  }

  // Contact form → mailto
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const msg = document.getElementById('cf-msg').value.trim();
      if (!name || !email || !msg) return;
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`);
      window.location.href = `mailto:gokulmallabathula@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Scroll progress bar
  const scrollProgress = document.getElementById('scrollProgress');
  if (scrollProgress) {
    const updateProgress = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // Skill bar animation — triggers when each card scrolls into view
  const skillCards = document.querySelectorAll('.skill-card');
  if (skillCards.length) {
    skillCards.forEach((card) => {
      card.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        bar.style.transitionDelay = `${i * 65}ms`;
      });
    });

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
            bar.style.width = bar.dataset.width + '%';
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    skillCards.forEach((card) => skillObserver.observe(card));
  }

  // Entrance animations — sections fade + slide up on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07 });
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  // Animated number counters for About stats
  const statsRow = document.querySelector('.stats-row');
  if (statsRow) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-num[data-count]').forEach((el) => {
            const target = parseInt(el.dataset.count, 10);
            const suffix = el.dataset.suffix ?? '';
            let current = 0;
            const duration = 900;
            const start = performance.now();
            const animate = (now) => {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              current = Math.round(progress * target);
              el.textContent = current + suffix;
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counterObserver.observe(statsRow);
  }

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
