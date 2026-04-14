// =============================================================================
// THE FIRST CONSPIRACY — Site Scripts
// =============================================================================

// --- Reading Progress Bar ---
(function () {
  const bar = document.querySelector('.reading-progress__bar');
  if (!bar) return;

  function updateProgress() {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

// --- Mobile Nav Toggle ---
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.site-nav__mobile-toggle');
  const links = document.getElementById('nav-links') || document.querySelector('.site-nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // --- Fade-in on scroll (Intersection Observer) ---
  const fadeEls = document.querySelectorAll('.article-card, .book-toc__item, .callout, blockquote');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: just show them
    document.querySelectorAll('.article-card, .book-toc__item').forEach(function (el) {
      el.classList.add('visible');
    });
  }
});

// --- Active nav link highlighting ---
(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav__links a, .nav__links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();