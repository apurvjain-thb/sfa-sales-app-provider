/* ════════════════════════════════════════
   Page shell: status bar, bottom nav, snack,
   bottom sheets, intra-bucket router
   ════════════════════════════════════════ */

const STATUS_BAR_HTML=`
<div class="statusbar">
  <span>9:41</span>
  <span class="right">
    <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="4.5" y="5.5" width="3" height="6.5" rx="1"/><rect x="9" y="3" width="3" height="9" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1"/></svg>
    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 11.5l2.2-2.7C9.1 7.9 6.9 7.9 5.8 8.8L8 11.5zM3.3 6.1l1.7 2C6.7 6.7 9.3 6.7 11 8.1l1.7-2C9.9 3.7 6.1 3.7 3.3 6.1zM.8 3l1.7 2.1C5.6 2.5 10.4 2.5 13.5 5.1L15.2 3C11.1-.4 4.9-.4.8 3z"/></svg>
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="1" y="1" width="20" height="10" rx="2.5" stroke="currentColor" stroke-width="1.2"/><rect x="2.5" y="2.5" width="15" height="7" rx="1.2" fill="currentColor"/><rect x="22" y="4" width="1.6" height="4" rx=".8" fill="currentColor"/></svg>
  </span>
</div>`;

const BOTTOM_NAV_HTML=`
<div class="navwrap">
  <div class="bottomnav">
    <a class="navitem" data-tab="dashboard" href="/dashboards">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
      Dashboard
    </a>
    <a class="navitem" data-tab="plan" href="/beat-plan">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4M9 14l2 2 4-4"/></svg>
      Today's Plan
    </a>
    <a class="navitem" data-tab="contacts" href="/contacts">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.6"/><path d="M16 14.5a4.5 4.5 0 0 1 5 4"/></svg>
      Contacts
    </a>
    <a class="navitem" data-tab="tasks" href="/tasks">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3 8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/></svg>
      Tasks
    </a>
  </div>
  <div class="home-ind"></div>
</div>`;

const SNACKBAR_HTML=`<div class="snackbar" id="snackbar"></div>`;

/* Initializes status bar / bottom nav / snackbar inside the .device wrapper.
   Page HTML should provide:
   <div class="device" id="device">
     <!-- shell-status-bar -->
     <div class="stage">…page content…</div>
     <!-- shell-bottom-nav -->
   </div>
   The shell injects status bar before .stage and bottom nav after .stage. */
function initShell(activeTab){
  const device=document.getElementById('device');
  if(!device) return;
  const stage=device.querySelector('.stage');
  stage.insertAdjacentHTML('beforebegin',STATUS_BAR_HTML);
  stage.insertAdjacentHTML('afterend',BOTTOM_NAV_HTML);
  device.insertAdjacentHTML('beforeend',SNACKBAR_HTML);
  document.querySelectorAll('.navitem').forEach(a=>{
    if(a.dataset.tab===activeTab) a.classList.add('active');
  });
}

/* Snackbar */
let __snackTimer;
function snack(msg){
  const el=document.getElementById('snackbar');
  if(!el) return;
  el.textContent=msg; el.classList.add('show');
  clearTimeout(__snackTimer);
  __snackTimer=setTimeout(()=>el.classList.remove('show'),2400);
}

/* Sheet helpers */
function openSheet(id){
  document.getElementById(id+'-backdrop')?.classList.add('open');
  document.getElementById(id+'-sheet')?.classList.add('open');
}
function closeSheet(id){
  document.getElementById(id+'-backdrop')?.classList.remove('open');
  document.getElementById(id+'-sheet')?.classList.remove('open');
}

/* URL helpers */
function getQueryParam(name){
  const u=new URL(location.href);
  return u.searchParams.get(name);
}

/* Intra-bucket router.
   Each bucket page calls bucketRoute(prefix, handlers)
   - prefix: "/beat-plan", "/contacts", "/tasks"
   - handlers: { list: fn(), detail: fn(slug) }
   Reads location.pathname, decides which view to render.
   Also listens to popstate so back/forward works. */
function bucketRoute(prefix,handlers){
  const run=()=>{
    const path=location.pathname.replace(/\/$/,'')||'/';
    const remainder=path.startsWith(prefix)?path.slice(prefix.length):'';
    const trimmed=remainder.replace(/^\//,'');
    if(!trimmed) handlers.list();
    else handlers.detail(decodeURIComponent(trimmed));
  };
  window.addEventListener('popstate',run);
  run();
}

/* Navigate within a bucket without a page reload */
function bucketGo(url){
  history.pushState({},'',url);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
