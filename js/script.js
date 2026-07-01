  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Accessible large-text toggle (in-memory only, no storage)
  const textToggle = document.getElementById('textToggle');
  textToggle.addEventListener('click', () => {
    const active = document.documentElement.classList.toggle('text-grande');
    textToggle.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  // Reveal-on-scroll, respects reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

// ---------- Tabs (used for Diagramas and Arquitectura) ----------
document.querySelectorAll('.tabs').forEach(tabGroup => {
  const targetId = tabGroup.dataset.tabs;
  const panelGroup = document.querySelector('[data-panels="' + targetId + '"]');
  if (!panelGroup) return;
  const buttons = tabGroup.querySelectorAll('.tab-btn');
  const panels = panelGroup.querySelectorAll('.tab-panel');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = panelGroup.querySelector('[data-panel="' + btn.dataset.tab + '"]');
      if (panel) panel.classList.add('active');
    });
  });
});

// ---------- Lightbox for diagram images ----------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
if (lightbox && lightboxImg) {
  document.querySelectorAll('.diagram-card img, .phone-logo img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });
}
