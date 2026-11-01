/* The estimate stays local. A configured external form loads only after an explicit click. */
(function (root) {
  'use strict';
  function recommend(type, extra) {
    const kinds = ['landing','website','fix','ai','automation','unsure'];
    const safeType = kinds.includes(type) ? type : 'unsure';
    const custom = extra !== 'standard' || !['landing','website','fix'].includes(safeType);
    return {type:safeType, price:custom?'custom':safeType, scope:extra!=='standard'?'custom':safeType};
  }
  function makeBrief(c, type, extra, goal, details={}) {
    const r = recommend(type, extra);
    const safeExtra = extra === 'standard' ? 'standard' : 'custom';
    const cleanGoal = String(goal || '').replace(/\r/g,'').trim().slice(0,2000);
    const scope = c.scopes[r.scope];
    const price = c.prices[r.price];
    const context=[];
    if(c.inquiry){const q=c.inquiry;if(details.url)context.push(q.website+': '+String(details.url).trim().slice(0,300));if(q.budgets[details.budget])context.push(q.budget+': '+q.budgets[details.budget]);if(q.timings[details.timing])context.push(q.timing+': '+q.timings[details.timing]);}
    const text = [c.briefTitle,'',c.typeLabel+' '+c.types[r.type],c.extraLabel+' '+c.extras[safeExtra],c.priceLabel+': '+price,'',scope,'',c.goalLabel,cleanGoal || c.goalFallback,...context,'',c.note].join('\n');
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
    function reset() {result.hidden=true;initial.hidden=false;status.textContent='';get('check-mail').removeAttribute('href');get('goal-count').textContent=goal.value.length+' / 2000';}
    [type,extra,goal,get('project-url'),get('project-budget'),get('project-timing')].forEach(e=>e.addEventListener('input',reset));
    get('check-generate').addEventListener('click',()=>{
      if(!get('project-url').reportValidity())return;
      const r=makeBrief(c,type.value,extra.value,goal.value,{url:get('project-url').value,budget:get('project-budget').value,timing:get('project-timing').value});
      get('check-heading').textContent=c.types[r.type];
      get('check-price').textContent=r.priceText;
      get('check-scope').textContent=r.scopeText;
      brief.value=r.text;
      get('check-mail').href='mailto:nakhaie@hotmail.com?subject='+encodeURIComponent(c.briefTitle)+'&body='+encodeURIComponent(r.text);
      result.hidden=false;initial.hidden=true;status.textContent='';get('check-heading').focus({preventScroll:true});
      if (root.matchMedia('(max-width: 760px)').matches) result.scrollIntoView({behavior:'auto',block:'start'});
    });
    get('check-copy').addEventListener('click',async()=>{
      try {await navigator.clipboard.writeText(brief.value);status.textContent=c.copied;}
      catch (_) {brief.focus();brief.select();status.textContent=c.copyFallback;}
    });
    get('request-open')?.addEventListener('click',()=>{
      const button=get('request-open'),container=get('inquiry-container'),mount=get('inquiry-mount');
      const url=new URL('https://tally.so/embed/'+button.dataset.formId);
      url.searchParams.set('alignLeft','1');url.searchParams.set('hideTitle','1');url.searchParams.set('transparentBackground','1');url.searchParams.set('dynamicHeight','1');url.searchParams.set('brief',brief.value);
      const external=new URL('https://tally.so/r/'+button.dataset.formId);external.searchParams.set('brief',brief.value);get('inquiry-external').href=external.href;
      const frame=document.createElement('iframe');frame.title=c.inquiry.frameTitle;frame.dataset.tallySrc=url.href;frame.loading='lazy';frame.height='1150';frame.width='100%';frame.frameBorder='0';frame.referrerPolicy='no-referrer';
      frame.addEventListener('load',()=>{get('inquiry-load-status').textContent='';});
      mount.replaceChildren(frame);container.hidden=false;get('inquiry-load-status').textContent=c.inquiry.loading;
      if(root.Tally)root.Tally.loadEmbeds();else{let script=document.getElementById('tally-widget');if(!script){script=document.createElement('script');script.id='tally-widget';script.src='https://tally.so/widgets/embed.js';script.async=true;script.onload=()=>root.Tally?.loadEmbeds();script.onerror=()=>{get('inquiry-load-status').textContent=c.inquiry.fallback;};document.body.append(script);}}
      container.scrollIntoView({behavior:'auto',block:'start'});
    });
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',start);
  else start();
})(typeof window!=='undefined'?window:globalThis);
