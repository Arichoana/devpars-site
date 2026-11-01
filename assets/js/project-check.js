/* Local, rule-based project brief. No network requests, storage or automatic sending. */
(function (root) {
  'use strict';
  function recommend(type, extra) {
    const kinds = ['landing','website','fix','ai','automation','unsure'];
    const safeType = kinds.includes(type) ? type : 'unsure';
    const custom = extra !== 'standard' || !['landing','website','fix'].includes(safeType);
    return {type:safeType, price:custom?'custom':safeType, scope:extra!=='standard'?'custom':safeType};
  }
  function makeBrief(c, type, extra, goal) {
    const r = recommend(type, extra);
    const safeExtra = extra === 'standard' ? 'standard' : 'custom';
    const cleanGoal = String(goal || '').replace(/\r/g,'').trim().slice(0,600);
    const scope = c.scopes[r.scope];
    const price = c.prices[r.price];
    const text = [c.briefTitle,'',c.typeLabel+' '+c.types[r.type],c.extraLabel+' '+c.extras[safeExtra],c.priceLabel+': '+price,'',scope,'',c.goalLabel,cleanGoal || c.goalFallback,'',c.note].join('\n');
    return {...r, priceText:price, scopeText:scope, text};
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {recommend,makeBrief};
  if (!root.document) return;
  function start() {
    const section = document.querySelector('[data-project-check]');
    if (!section) return;
    const c = JSON.parse(document.getElementById('project-check-copy').textContent);
    const get = id => document.getElementById(id);
    const type=get('project-type'),extra=get('project-extra'),goal=get('project-goal');
    const result=get('check-result'),initial=get('check-initial'),brief=get('check-brief'),status=get('check-status');
    section.querySelector('[data-check-ui]').hidden=false;
    function reset() {result.hidden=true;initial.hidden=false;status.textContent='';get('check-mail').removeAttribute('href');}
    [type,extra,goal].forEach(e=>e.addEventListener('input',reset));
    get('check-generate').addEventListener('click',()=>{
      const r=makeBrief(c,type.value,extra.value,goal.value);
      get('check-heading').textContent=c.types[r.type];
      get('check-price').textContent=r.priceText;
      get('check-scope').textContent=r.scopeText;
      brief.value=r.text;
      get('check-mail').href='mailto:nakhaie.arman@gmail.com?subject='+encodeURIComponent(c.briefTitle)+'&body='+encodeURIComponent(r.text);
      result.hidden=false;initial.hidden=true;status.textContent='';get('check-heading').focus({preventScroll:true});
      if (root.matchMedia('(max-width: 760px)').matches) result.scrollIntoView({behavior:'auto',block:'start'});
    });
    get('check-copy').addEventListener('click',async()=>{
      try {await navigator.clipboard.writeText(brief.value);status.textContent=c.copied;}
      catch (_) {brief.focus();brief.select();status.textContent=c.copyFallback;}
    });
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',start);
  else start();
})(typeof window!=='undefined'?window:globalThis);
