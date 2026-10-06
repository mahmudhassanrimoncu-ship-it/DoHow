const guides = [
  {id:1,title:'Build a gaming PC',domain:'technology',label:'Technology',time:'45 min',desc:'Choose compatible parts, assemble them safely, install an OS, and get your first game running.',prereqs:['Computer basics','Hardware']},
  {id:2,title:'Learn calculus',domain:'math',label:'Mathematics',time:'12 min',desc:'Start with the ideas that make limits, derivatives, and integrals feel inevitable instead of arbitrary.',prereqs:['Algebra','Functions','Geometry']},
  {id:3,title:'Fix a dripping tap',domain:'home',label:'Home & repair',time:'20 min',desc:'Diagnose the cause, isolate the water supply, replace the right part, and check the seal.',prereqs:['Basic tools','Water shutoff']},
  {id:4,title:'Host a website',domain:'technology',label:'Technology',time:'35 min',desc:'Turn a folder of HTML, CSS, and JavaScript into a public website with a real URL.',prereqs:['HTML & CSS','Git basics']},
  {id:5,title:'Grow tomatoes from seed',domain:'life',label:'Life skills',time:'25 min',desc:'Build a simple seed-starting setup and transplant healthy seedlings without shocking them.',prereqs:['Plant basics','Light']},
  {id:6,title:'Understand sound waves',domain:'science',label:'Science',time:'18 min',desc:'Build the physical intuition behind frequency, wavelength, pressure variation, and wave speed.',prereqs:['Motion','Energy']},
  {id:7,title:'Set up a home Linux server',domain:'technology',label:'Technology',time:'55 min',desc:'Install Linux, create a secure user, enable SSH, and deploy a simple service.',prereqs:['Linux basics','Networking']},
  {id:8,title:'Read a scientific paper',domain:'science',label:'Science',time:'30 min',desc:'Find the question, method, evidence, limitations, and actual conclusion without getting lost in jargon.',prereqs:['Scientific method','Statistics']},
  {id:9,title:'Make a study system',domain:'life',label:'Life skills',time:'22 min',desc:'Turn a vague subject into a concrete sequence of learning, retrieval, practice, and feedback.',prereqs:['Goal setting','Recall']},
  {id:10,title:'Make an animated educational video',domain:'media',label:'Media & video',time:'4–6 wks',desc:'Teach yourself Canvas Commons (formerly Motion Canvas) and go from an empty folder to a narrated, published lesson animated entirely in code.',prereqs:['JavaScript basics','Node.js','A topic you know'],phase:0},
  {id:11,title:'Animate with Canvas Commons',domain:'media',label:'Media & video',time:'40 min',desc:'Scenes, refs, signals, tweens, easing, and the flow helpers (all, chain, sequence, waitFor) that every animated explainer is built from.',prereqs:['TypeScript generators','Project setup'],phase:3},
  {id:12,title:'Sync animation to a voiceover',domain:'media',label:'Media & video',time:'30 min',desc:'Record clean narration, add it to your project, and use timeline events so every visual lands on the exact word.',prereqs:['Scripting a lesson','Canvas Commons basics'],phase:6}
];

const grid = document.getElementById('guideGrid');
const domainFilter = document.getElementById('domainFilter');
const showAllBtn = document.getElementById('showAllBtn');
const searchOverlay = document.getElementById('searchOverlay');
const overlaySearch = document.getElementById('overlaySearch');
const searchResults = document.getElementById('searchResults');
const heroSearch = document.getElementById('heroSearch');
const heroSearchBtn = document.getElementById('heroSearchBtn');
const modal = document.getElementById('guideModal');

let showAll = false;
let currentGuide = null;

function renderGuides(){
  const domain = domainFilter.value;
  let items = guides.filter(g => domain === 'all' || g.domain === domain);
  if(!showAll) items = items.slice(0,6);
  grid.innerHTML = items.map(g => `
    <article class="guide-card" data-domain="${g.domain}">
      <div class="guide-top"><span class="domain-label">${g.label}</span><span class="time-badge">${g.time}</span></div>
      <div><h3>${g.title}</h3><p>${g.desc}</p></div>
      <div class="guide-foot"><div class="guide-prereqs">${g.prereqs.slice(0,2).map(p=>`<span>${p}</span>`).join('')}</div><button class="guide-open" data-guide="${g.id}" aria-label="Open ${g.title}">↗</button></div>
    </article>
  `).join('');
  showAllBtn.innerHTML = showAll ? 'Show featured guides <span>↑</span>' : 'Browse all guides <span>→</span>';
  if(items.length === 0) grid.innerHTML = '<div style="grid-column:1/-1;padding:36px;text-align:center;color:var(--muted)">No guides in this domain yet.</div>';
}

function openGuide(id){
  const g = guides.find(x => x.id === Number(id));
  if(!g) return;
  currentGuide = g;
  document.getElementById('modalKicker').textContent = `${g.label} / ${g.time}`;
  document.getElementById('modalTitle').textContent = g.title;
  document.getElementById('modalDescription').textContent = g.desc;
  document.getElementById('modalMeta').innerHTML = [`${g.time} read`,`Atomic guide`,`Action-first`].map(x => `<span>${x}</span>`).join('');
  document.getElementById('modalPrereqs').innerHTML = `<div class="prereq-tags">${g.prereqs.map(p=>`<span>${p}</span>`).join('')}</div>`;
  modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll');
}
function closeModal(){ modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); }
function openSearch(query=''){
  searchOverlay.classList.add('show'); searchOverlay.setAttribute('aria-hidden','false'); document.body.classList.add('no-scroll');
  overlaySearch.value = query; renderSearchResults(query); setTimeout(()=>overlaySearch.focus(),20);
}
function closeSearch(){ searchOverlay.classList.remove('show'); searchOverlay.setAttribute('aria-hidden','true'); document.body.classList.remove('no-scroll'); }
function renderSearchResults(q=''){
  const term = q.trim().toLowerCase();
  const matches = term ? guides.filter(g => `${g.title} ${g.label} ${g.desc} ${g.prereqs.join(' ')}`.toLowerCase().includes(term)) : guides.slice(0,6);
  searchResults.innerHTML = matches.length ? matches.map(g => `
    <button class="result-item" data-guide="${g.id}"><span><strong>${g.title}</strong><small>${g.label} · ${g.time} · prerequisites: ${g.prereqs.join(', ')}</small></span><span class="result-arrow">↗</span></button>
  `).join('') : `<div style="padding:28px 20px;color:var(--muted);font-size:13px">No exact match. Try a broader goal, like “website”, “calculus”, or “repair”.</div>`;
}

renderGuides();
domainFilter.addEventListener('change', ()=>{showAll=false;renderGuides()});
showAllBtn.addEventListener('click', ()=>{showAll=!showAll;renderGuides()});

grid.addEventListener('click', e=>{ const btn=e.target.closest('[data-guide]'); if(btn) openGuide(btn.dataset.guide); });
searchResults.addEventListener('click', e=>{ const btn=e.target.closest('[data-guide]'); if(btn){ closeSearch(); openGuide(btn.dataset.guide); } });

document.querySelectorAll('[data-open-search]').forEach(btn=>btn.addEventListener('click',()=>openSearch()));
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeModal));
document.getElementById('closeSearch').addEventListener('click',closeSearch);
overlaySearch.addEventListener('input',e=>renderSearchResults(e.target.value));
heroSearchBtn.addEventListener('click',()=>openSearch(heroSearch.value));
heroSearch.addEventListener('keydown',e=>{if(e.key==='Enter') openSearch(heroSearch.value)});
document.querySelectorAll('.text-chip').forEach(b=>b.addEventListener('click',()=>openSearch(b.dataset.query)));
document.getElementById('contributeBtn').addEventListener('click',()=>alert('Prototype action: contribution flow would open here.'));
document.getElementById('startGuideBtn').addEventListener('click',()=>{
  if(currentGuide && currentGuide.phase !== undefined){ closeModal(); selectPhase(currentGuide.phase); document.getElementById('track').scrollIntoView({behavior:'smooth'}); return; }
  alert('Prototype action: the full interactive guide would open here.');
});

window.addEventListener('keydown',e=>{
  if(e.key==='Escape'){ closeSearch(); closeModal(); }
  if((e.metaKey || e.ctrlKey) && e.key.toLowerCase()==='k'){ e.preventDefault(); openSearch(); }
});

const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('dohow-theme');
if(savedTheme) document.documentElement.setAttribute('data-theme',savedTheme);
themeBtn.addEventListener('click',()=>{
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme',next); localStorage.setItem('dohow-theme',next);
});

const reveal = new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting) entry.target.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)',fill:'forwards'})}),{threshold:.09});
document.querySelectorAll('.problem-card,.guide-card,.method-step,.track-stage,.selfteach-card,.contribute-card,.map-stage').forEach(el=>{el.style.opacity='0'; reveal.observe(el)});
