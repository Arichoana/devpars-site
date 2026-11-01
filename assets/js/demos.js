/* Fictional interactive previews. Local state only; no requests or storage. */
(() => {
  const dishes={pasta:[['Pappardelle al pomodoro','Tomate · Basilikum · Parmesan','16 €'],['Ravioli verde','Ricotta · Spinat · Salbeibutter','19 €'],['Rigatoni al forno','Ofentomate · Mozzarella · Kräuter','17 €']],small:[['Burrata','Tomate · Basilikum · Olivenöl','12 €'],['Pane & olive','Warmes Brot · Oliven · Kräuter','7 €'],['Carciofi','Artischocke · Zitrone · Petersilie','11 €']],sweet:[['Tiramisù','Espresso · Mascarpone · Kakao','8 €'],['Panna cotta','Vanille · Beeren','8 €'],['Affogato','Espresso · Vanilleeis','6 €']]};
  document.querySelectorAll('[data-menu]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-menu]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    const list=document.querySelector('#menu-list');list.replaceChildren();
    dishes[button.dataset.menu].forEach(([name,detail,price],i)=>{const row=document.createElement('article');const number=document.createElement('span');number.textContent='0'+(i+1);const info=document.createElement('div');const h=document.createElement('h3');h.textContent=name;const p=document.createElement('p');p.textContent=detail;info.append(h,p);const cost=document.createElement('b');cost.textContent=price;row.append(number,info,cost);list.append(row);});
  }));
  document.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelector('.demo-status').textContent=document.querySelector('#party').value+' · '+button.dataset.choice+' ausgewählt. Nur eine Demo, keine Reservierung.';
  }));
  document.querySelector('#party')?.addEventListener('change',()=>{document.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed','false'));document.querySelector('.demo-status').textContent='Bitte die Beispiel-Uhrzeit neu auswählen. Keine Reservierung wird gesendet.';});
  const plans={solar:'Als Nächstes: Dachfläche, vorhandene Anlage und gewünschtes Ergebnis klären.',renovate:'Als Nächstes: betroffene Räume und die wichtigste Veränderung festhalten.',space:'Als Nächstes: vorhandenen Grundriss und die gewünschte Nutzung besprechen.'};
  document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-project]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelector('.demo-status').textContent=plans[button.dataset.project]+' Lokale Demo – keine Anfrage übermittelt.';
  }));
  document.querySelectorAll('[data-treatment]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-treatment]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    document.querySelector('.treatment-status').textContent=button.dataset.treatment+' ausgewählt. In einer fertigen Website könnte hier die abgestimmte Terminbuchung folgen. Diese Vorschau bucht keinen Termin.';
  }));
  let flowStep=0;
  document.querySelector('[data-flow]')?.addEventListener('click',e=>{
    flowStep=(flowStep%3)+1;document.querySelectorAll('[data-flow-step]').forEach((s,i)=>s.classList.toggle('complete',i<flowStep));
    document.querySelector('.demo-status').textContent=['Beispielanfrage erfasst. Nächster Schritt: Inhalt ordnen.','Beispielentwurf vorbereitet. Nächster Schritt: menschliche Prüfung.','Der Entwurf wartet auf deine Freigabe. Es wurde keine Nachricht gesendet.'][flowStep-1];
    e.currentTarget.textContent=flowStep===3?'Demo neu starten ↗':'Nächsten Schritt zeigen ↗';
  });
  const filter=document.querySelector('#admin-filter');
  function applyFilter(){if(!filter)return;let count=0;document.querySelectorAll('tbody tr[data-status]').forEach(row=>{row.hidden=filter.value!=='all'&&row.dataset.status!==filter.value;if(!row.hidden)count++;});document.querySelector('#admin-table-status').textContent=count+' beispielhafte Vorgänge sichtbar. Keine echten Kundendaten.';}
  filter?.addEventListener('change',applyFilter);
  document.querySelectorAll('[data-review]').forEach(button=>button.addEventListener('click',()=>{
    const row=button.closest('tr'),status=row.querySelector('.status-badge');row.dataset.status='In Prüfung';status.textContent='In Prüfung';status.className='status-badge review';button.textContent='In Prüfung';
    if(filter?.value!=='all'&&filter?.value!=='In Prüfung')applyFilter();else document.querySelector('#admin-table-status').textContent='Status lokal auf „In Prüfung“ geändert. Keine Speicherung oder Nachricht.';
  }));
  document.querySelector('#admin-preview')?.addEventListener('click',()=>{
    document.querySelector('#preview-title').textContent=document.querySelector('#admin-title').value.trim()||'Titelvorschau';
    document.querySelector('#preview-description').textContent=document.querySelector('#admin-description').value.trim();
    document.querySelector('#admin-editor-status').textContent='Lokale Vorschau aktualisiert. Nicht gespeichert und nicht veröffentlicht.';
  });
})();
