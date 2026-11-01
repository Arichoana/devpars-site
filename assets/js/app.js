/* DevPars: progressive enhancement; no cookies or analytics requests. */
(function () {
  'use strict';
  function start() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (toggle && menu) {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', String(menu.classList.toggle('open')));
      });
      menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }));
    }
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
