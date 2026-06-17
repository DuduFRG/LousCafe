/* ============================================
   LOU'S CAFE — JAVASCRIPT
   Agência NOOMA
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- NAV SCROLL ---- */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- PARALLAX HERO ---- */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      const max    = window.innerHeight;
      if (offset <= max) {
        heroBg.style.transform = `scale(1.08) translateY(${offset * 0.22}px)`;
      }
    }, { passive: true });
  }

  /* ---- MOBILE MENU ---- */
  const hamburger   = document.querySelector('.nav__hamburger');
  const mobileMenu  = document.querySelector('.nav__mobile');
  const closeBtn    = document.querySelector('.nav__close');
  const mobileLinks = document.querySelectorAll('.nav__mobile a');

  const openMenu  = () => { mobileMenu.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; };

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (closeBtn)  closeBtn.addEventListener('click', closeMenu);
  mobileLinks.forEach(l => l.addEventListener('click', closeMenu));

  /* ---- SCROLL REVEAL ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ---- SMOOTH NAV LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- HOURS: HIGHLIGHT TODAY ---- */
  const days = ['domingo','segunda','terca','quarta','quinta','sexta','sabado'];
  const today = days[new Date().getDay()];
  const dayEl = document.querySelector(`.hours-list [data-day="${today}"]`);
  if (dayEl) {
    dayEl.style.color = '#C9B99A';
    dayEl.style.fontWeight = '700';
  }

  /* ---- COUNTER ANIMATION ---- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el     = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dec    = target % 1 !== 0 ? 1 : 0;
        const dur    = 1600;
        const step   = 16;
        const steps  = dur / step;
        let cur      = 0;
        const inc    = target / steps;
        const timer  = setInterval(() => {
          cur += inc;
          if (cur >= target) { cur = target; clearInterval(timer); }
          el.textContent = cur.toFixed(dec) + suffix;
        }, step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

});
