document.addEventListener('DOMContentLoaded', () => {

  // ── MOBILE NAV ──
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav-close');

  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-nav-backdrop';
  document.body.appendChild(backdrop);

  function openNav() {
    mobileNav?.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    toggle?.classList.add('open');
  }
  function closeNav() {
    mobileNav?.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    toggle?.classList.remove('open');
  }

  toggle?.addEventListener('click', openNav);
  closeBtn?.addEventListener('click', closeNav);
  backdrop.addEventListener('click', closeNav);
  mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  // ── ANIMATE ON SCROLL ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.anim').forEach(el => observer.observe(el));

  // ── ACTIVE NAV — works with clean Netlify URLs ──
  const pathname = window.location.pathname; // e.g. "/about/" or "/"
  document.querySelectorAll('nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    // Exact match OR pathname starts with href (for nested dropdown links)
    if (href === pathname || (href !== '/' && pathname.startsWith(href))) {
      a.classList.add('active');
    }
    // Home
    if (href === '/' && pathname === '/') {
      a.classList.add('active');
    }
  });

  // ── FILTER TABS ──
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.product-card[data-cat]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      cards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

});
