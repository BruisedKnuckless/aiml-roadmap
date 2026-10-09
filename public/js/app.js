import { load, bus, commit, S } from './store.js';
import { NODES, itemById, byId, activeNodes, overall, todayStr, addDays } from './model.js';
import { processDays, setFocus, setStartDate } from './plan.js';
import { renderMeter, escapeHtml as h } from './honor.js';
import { initGraph, refresh as refreshGraph, focusNode, expand, select, zoomBy, fit } from './graph.js';
import { initDrawer, openDrawer, closeDrawer, render as renderDrawer, openNodeId } from './drawer.js';
import { initPanels, render as renderPanels } from './panels.js';

function renderTopbar() {
  const o = overall();
  document.getElementById('overall-pct').textContent = `${Math.round(o.pct * 100)}%`;
  document.getElementById('streak').textContent = S.streak.current;
}

/** 'auto' follows macOS appearance; 'light'/'dark' force it. */
function applyTheme() {
  const t = S.settings.theme;
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  else delete document.documentElement.dataset.theme;
}

function renderAll() {
  applyTheme();
  renderMeter();
  renderTopbar();
  refreshGraph();
  renderPanels();
  renderDrawer();
}

function goto(id, tab = 'overview') {
  openDrawer(id, tab);
  select(id);
  requestAnimationFrame(() => focusNode(id));
}

function continueHere() {
  const focus = byId[S.settings.focus] ? S.settings.focus : null;
  const id = focus || activeNodes()[0]?.id || NODES[0].id;
  focusNode(id, { k: 1 });
  expand(id);
}

// ── search palette (⌘K) ──
const INDEX = [
  ...NODES.map((n) => ({ kind: 'node', id: n.id, text: n.title, sub: n.subtopics.join(' · '), hay: `${n.title} ${n.subtopics.join(' ')} ${n.summary}`.toLowerCase() })),
  ...Object.values(itemById).map((it) => ({ kind: 'item', id: it.nodeId, text: it.text, sub: byId[it.nodeId].title, hay: it.text.toLowerCase() })),
  ...NODES.flatMap((n) => [...n.resources, ...n.alternatives].map((r) => ({ kind: 'resource', id: n.id, text: r.title, sub: n.title, hay: r.title.toLowerCase() }))),
];
let results = [];
let cursor = 0;

function openSearch() {
  const p = document.getElementById('palette');
  p.hidden = false;
  const inp = p.querySelector('input');
  inp.value = '';
  runSearch('');
  inp.focus();
}
function closeSearch() {
  document.getElementById('palette').hidden = true;
}
function runSearch(q) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) results = INDEX.filter((e) => e.kind === 'node');
  else {
    // Rank whole-word title matches above substring matches, and nodes above tasks/links.
    const esc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const score = (e) => terms.reduce((a, t) => a + (new RegExp(`\\b${esc(t)}`, 'i').test(e.text) ? 3 : 0), 0) + (e.kind === 'node' ? 1 : 0);
    results = INDEX.filter((e) => terms.every((t) => e.hay.includes(t)))
      .map((e) => ({ e, s: score(e) }))
      .sort((a, b) => b.s - a.s)
      .map((o) => o.e);
  }
  results = results.slice(0, 40);
  cursor = 0;
  paintResults();
}
function paintResults() {
  const list = document.querySelector('#palette ul');
  list.innerHTML = results.map((r, i) => `
    <li class="${i === cursor ? 'active' : ''}" data-i="${i}">
      <span class="kind k-${r.kind}">${{ node: 'Node', item: 'Task', resource: 'Link' }[r.kind]}</span>
      <span class="ptext">${h(r.text)}</span><span class="psub">${h(r.sub)}</span>
    </li>`).join('') || '<li class="empty">No matches</li>';
  list.querySelector('.active')?.scrollIntoView({ block: 'nearest' });
}
function chooseResult(i) {
  const r = results[i];
  if (!r) return;
  closeSearch();
  goto(r.id, r.kind === 'item' ? 'checklist' : r.kind === 'resource' ? 'resources' : 'overview');
}

function bindChrome() {
  document.getElementById('btn-search').addEventListener('click', openSearch);
  document.getElementById('btn-continue').addEventListener('click', continueHere);
  document.getElementById('zoom-in').addEventListener('click', () => zoomBy(1.2));
  document.getElementById('zoom-out').addEventListener('click', () => zoomBy(1 / 1.2));
  document.getElementById('zoom-fit').addEventListener('click', fit);
  document.getElementById('btn-sidebar').addEventListener('click', () => document.body.classList.toggle('side-collapsed'));
  document.getElementById('honor').addEventListener('click', () => {
    document.body.classList.remove('side-collapsed');
    document.querySelector('[data-side="stats"]').click();
  });

  const pal = document.getElementById('palette');
  pal.addEventListener('click', (e) => {
    if (e.target === pal) return closeSearch();
    const li = e.target.closest('li[data-i]');
    if (li) chooseResult(Number(li.dataset.i));
  });
  pal.querySelector('input').addEventListener('input', (e) => runSearch(e.target.value));
  pal.querySelector('input').addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { cursor = Math.min(results.length - 1, cursor + 1); paintResults(); e.preventDefault(); }
    if (e.key === 'ArrowUp') { cursor = Math.max(0, cursor - 1); paintResults(); e.preventDefault(); }
    if (e.key === 'Enter') chooseResult(cursor);
  });

  addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      return openSearch();
    }
    if (e.key === 'Escape') {
      if (!document.getElementById('palette').hidden) return closeSearch();
      if (openNodeId()) return closeDrawer();
    }
    const typing = /INPUT|TEXTAREA/.test(document.activeElement?.tagName);
    if (typing) return;
    if (e.key === '/') { e.preventDefault(); openSearch(); }
    if (e.key === '=' || e.key === '+') zoomBy(1.2);
    if (e.key === '-') zoomBy(1 / 1.2);
    if (e.key === '0') fit();
    if (e.key.toLowerCase() === 'c') continueHere();
  });
}

/** Detect midnight (or returning to the tab on a new day) and roll the day over. */
function watchDayChange() {
  let day = todayStr();
  const check = () => {
    if (todayStr() === day) return;
    day = todayStr();
    processDays();
    commit();
  };
  setInterval(check, 30000);
  document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && check());
}

/** First launch only: ask when the honor challenge should start. */
function showOnboarding() {
  const el = document.getElementById('onboard');
  const date = document.getElementById('onboard-date');
  const today = todayStr();
  date.min = today;
  date.value = addDays(today, 7);
  date.addEventListener('focus', () => (el.querySelector('input[value="pick"]').checked = true));
  el.hidden = false;
  document.getElementById('onboard-go').addEventListener('click', () => {
    const choice = el.querySelector('input[name="start"]:checked').value;
    const start = choice === 'today' ? today : choice === 'pick' && date.value ? date.value : addDays(today, 1);
    S.settings.onboarded = true;
    setStartDate(start); // also commits
    el.classList.add('closing');
    setTimeout(() => (el.hidden = true), 250);
  }, { once: true });
}

async function main() {
  if (innerWidth < 900) document.body.classList.add('side-collapsed');
  await load();
  applyTheme();
  const rolled = processDays();
  commit();

  initGraph({ onOpen: goto, onFocus: (id) => setFocus(id) });
  initDrawer({ onGoto: goto, onClose: () => select(null) });
  initPanels({ onGoto: goto });
  bindChrome();
  bus.addEventListener('change', renderAll);
  renderAll();
  watchDayChange();
  continueHere();
  document.body.classList.add('ready');
  if (!S.settings.onboarded) showOnboarding();

  if (rolled && rolled.delta < 0) {
    document.getElementById('welcome').innerHTML = `While you were away (${rolled.days} day${rolled.days > 1 ? 's' : ''}), your honor changed by <b>${rolled.delta.toFixed(1)}</b>. Today's plan is ready.`;
    document.getElementById('welcome').hidden = false;
    setTimeout(() => (document.getElementById('welcome').hidden = true), 9000);
  }
}

main();
