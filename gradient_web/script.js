/* ============================================================
   GRADIENT · INTERACTIONS
   ============================================================ */

/* ----- Custom cursor ------------------------------------- */
(() => {
  if (matchMedia('(pointer: coarse)').matches) return;

  const cursor = document.getElementById('cursor');
  const dot    = document.getElementById('cursorDot');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });

  const animate = () => {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  };
  animate();

  // hover state on interactive elements
  const hoverables = 'a, button, .program-card, .about-card, .contact-card, .name-block, input';
  document.querySelectorAll(hoverables).forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });
})();

/* ----- Nav: hide on scroll-down, show on scroll-up ------- */
(() => {
  const nav = document.getElementById('nav');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastY && y > 200) {
      nav.classList.add('is-hidden');
    } else {
      nav.classList.remove('is-hidden');
    }
    lastY = y;
  }, { passive: true });
})();

/* ----- Active section indicator in nav ------------------- */
(() => {
  const links    = document.querySelectorAll('.nav-links a');
  const sections = [...document.querySelectorAll('section[id]')];

  const setActive = () => {
    const y = window.scrollY + window.innerHeight / 3;
    let current = null;
    for (const sec of sections) {
      if (sec.offsetTop <= y) current = sec;
    }
    links.forEach((a) => {
      const href = a.getAttribute('href').slice(1);
      a.classList.toggle('is-active', current && current.id === href);
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

/* ----- Parallax for hero + decorative assets ------------- */
(() => {
  const items = [
    ...document.querySelectorAll('.float-asset[data-speed]'),
    ...document.querySelectorAll('.parallax[data-speed]'),
  ];
  if (!items.length) return;

  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    items.forEach((el) => {
      const speed = parseFloat(el.dataset.speed);
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();

/* ----- Scroll reveal ------------------------------------- */
(() => {
  const targets = document.querySelectorAll(
    '.section-head, .program-card, .about-card, .teacher-card, .contact-card, .social-strip'
  );
  targets.forEach((el) => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

  targets.forEach((el) => io.observe(el));
})();

/* ----- Count-up stats ------------------------------------ */
(() => {
  const stats = document.querySelectorAll('.stat-num[data-count]');
  if (!stats.length) return;

  const format = (n) => n.toLocaleString('es-MX');
  const run = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const dur = 1800;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.floor(target * eased));
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = format(target);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        run(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach((s) => io.observe(s));
})();

/* ----- Program card magnetic hover (subtle tilt) --------- */
(() => {
  if (matchMedia('(pointer: coarse)').matches) return;
  const cards = document.querySelectorAll('.program-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
      card.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
