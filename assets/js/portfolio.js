/* Only the visible preview changes. No tracking, API calls or stored preferences. */
(() => {
  const section=document.querySelector('#work');if(!section)return;
  const filters=section.querySelector('[data-portfolio-filters]');if(filters)filters.hidden=false;
  section.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    section.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    section.querySelectorAll('[data-portfolio-card]').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.group!==button.dataset.filter);
  }));
  section.querySelectorAll('[data-portfolio-view]').forEach(button=>button.addEventListener('click',()=>{
    const card=button.closest('[data-portfolio-card]'),img=card.querySelector('img'),view=button.dataset.portfolioView;
    card.querySelectorAll('[data-portfolio-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    img.src=img.src.replace(/-(?:site|admin)\.webp$/, '-'+view+'.webp');
    img.alt=view==='admin'?img.dataset.adminAlt:img.dataset.siteAlt;
    const target=card.querySelectorAll('.portfolio-actions a')[view==='admin'?1:0];
    card.querySelector('[data-demo-view-link]').href=target.href;
  }));
})();
