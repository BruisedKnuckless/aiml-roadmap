// Roadmap graph: phase bands top→bottom, nodes in dependency rows, curved edges, pan & zoom.
import { NODES, PHASES, byId, nodeStatus, nodeProgress, activeNodes, fmtHours, phaseProgress } from './model.js';
import { S } from './store.js';
import { escapeHtml } from './honor.js';

const NW = 232, NH = 70, GX = 40, RH = 116;
const BAND_TOP = 78, BAND_BOTTOM = 34, BAND_GAP = 18, MARGIN = 90;
const MIN_K = 0.15, MAX_K = 1.8;

let viewport, world, edgeSvg;
const pos = {};
let bands = [];
let W = 0, H = 0;
let view = { x: 0, y: 0, k: 1 };
let expanded = null;
let handlers = {};

function computeLayout() {
  const rows = [];
  for (const ph of PHASES) {
    const nodes = NODES.filter((n) => n.phase === ph.id);
    const depth = {};
    const d = (n) => (depth[n.id] ??= Math.max(0, ...n.prereqs.filter((p) => byId[p].phase === ph.id).map((p) => d(byId[p]) + 1)));
    nodes.forEach(d);
    const maxDepth = Math.max(...nodes.map((n) => depth[n.id]));
    const phaseRows = [];
    for (let i = 0; i <= maxDepth; i++) phaseRows.push(nodes.filter((n) => depth[n.id] === i));
    rows.push({ ph, phaseRows });
  }
  const widest = Math.max(...rows.flatMap((r) => r.phaseRows.map((row) => row.length)));
  W = Math.max(1100, widest * (NW + GX) - GX + MARGIN * 2);
  const cx = W / 2;
  let y = MARGIN + 40;
  bands = [];
  for (const { ph, phaseRows } of rows) {
    const top = y;
    y += BAND_TOP;
    for (const row of phaseRows) {
      // Order by the mean x of already-placed prerequisites to reduce edge crossings.
      const bary = (n) => {
        const xs = n.prereqs.filter((p) => pos[p]).map((p) => pos[p].x);
        return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : cx;
      };
      const sorted = row.map((n, i) => ({ n, b: bary(n), i })).sort((a, b) => a.b - b.b || a.i - b.i).map((o) => o.n);
      const rowW = sorted.length * (NW + GX) - GX;
      sorted.forEach((n, i) => (pos[n.id] = { x: cx - rowW / 2 + i * (NW + GX), y }));
      y += RH;
    }
    y = y - RH + NH + BAND_BOTTOM;
    bands.push({ ph, top, bottom: y });
    y += BAND_GAP;
  }
  H = y + MARGIN;
}

function edgePath(a, b) {
  const x1 = a.x + NW / 2, y1 = a.y + NH, x2 = b.x + NW / 2, y2 = b.y;
  const dy = Math.max(40, (y2 - y1) * 0.5);
  return `M${x1},${y1} C${x1},${y1 + dy} ${x2},${y2 - dy} ${x2},${y2}`;
}

function build() {
  world.style.width = W + 'px';
  world.style.height = H + 'px';
  const bandHtml = bands
    .map(({ ph, top, bottom }) => `
      <div class="band" style="top:${top}px;height:${bottom - top}px;--c:${ph.color}">
        <div class="band-label"><span class="band-num">Phase ${ph.id}</span><span class="band-title">${ph.title}</span><span class="band-tag">${ph.tag}</span></div>
        <div class="band-progress"><span data-phase-pct="${ph.id}"></span></div>
      </div>`)
    .join('');
  const edges = NODES.flatMap((n) => n.prereqs.map((p) => `<path class="edge" data-from="${p}" data-to="${n.id}" d="${edgePath(pos[p], pos[n.id])}"/>`)).join('');
  const nodeHtml = NODES.map((n) => {
    const p = pos[n.id];
    return `
      <div class="node" data-id="${n.id}" style="left:${p.x}px;top:${p.y}px;--c:${n.color}">
        <div class="node-main">
          <svg class="ring" viewBox="0 0 36 36" aria-hidden="true">
            <circle class="ring-bg" cx="18" cy="18" r="15"/>
            <circle class="ring-fg" cx="18" cy="18" r="15" pathLength="100"/>
            <path class="ring-check" d="M12 18.5l4 4 8-9"/>
            <path class="ring-lock" d="M14 17v-2.5a4 4 0 0 1 8 0V17M13 17h10v7H13z"/>
          </svg>
          <div class="node-text">
            <div class="node-title">${escapeHtml(n.title)}</div>
            <div class="node-meta"><span class="node-status"></span><span>${n.hours}h</span><span class="node-count"></span></div>
          </div>
          <span class="here" title="You are here">●</span>
        </div>
        <div class="node-more">
          <p class="node-summary">${escapeHtml(n.summary)}</p>
          <div class="chips">${n.subtopics.map((s) => `<span class="chip">${escapeHtml(s)}</span>`).join('')}</div>
          <div class="node-bar"><span></span></div>
          <div class="node-actions">
            <button class="btn primary" data-act="open">Open guide</button>
            <button class="btn" data-act="checklist">Checklist</button>
            <button class="btn ghost" data-act="focus" title="Prioritise this node in your daily plan">Focus</button>
          </div>
        </div>
      </div>`;
  }).join('');
  world.innerHTML = `
    ${bandHtml}
    <svg class="edges" width="${W}" height="${H}">${edges}</svg>
    <div class="terminus start" style="top:${MARGIN - 30}px">Absolute Zero</div>
    <div class="terminus end" style="top:${H - MARGIN + 10}px">Master</div>
    ${nodeHtml}`;
  edgeSvg = world.querySelector('.edges');
  const rail = document.getElementById('phase-rail');
  rail.innerHTML = PHASES.map((ph) => `<button data-band="${ph.id}" style="--c:${ph.color}" title="Phase ${ph.id} · ${ph.title}"><span>${ph.id}</span><em>${ph.title}</em></button>`).join('');
  rail.addEventListener('click', (e) => {
    const b = e.target.closest('[data-band]');
    if (b) focusBand(Number(b.dataset.band));
  });
}

/** Update node statuses, progress rings, and edge highlighting from current state. */
export function refresh() {
  const active = new Set(activeNodes().slice(0, 2).map((n) => n.id));
  if (S.settings.focus) active.add(S.settings.focus);
  for (const n of NODES) {
    const el = world.querySelector(`.node[data-id="${n.id}"]`);
    const st = nodeStatus(n);
    const pr = nodeProgress(n);
    el.dataset.status = st;
    el.classList.toggle('current', active.has(n.id) && st !== 'done');
    el.classList.toggle('focused', S.settings.focus === n.id);
    el.querySelector('.ring-fg').style.strokeDasharray = `${pr.pct * 100} 100`;
    el.querySelector('.node-status').textContent = { done: 'Mastered', progress: 'In progress', available: 'Ready', locked: 'Locked' }[st];
    el.querySelector('.node-count').textContent = `${pr.done}/${pr.total}`;
    el.querySelector('.node-bar span').style.width = `${pr.pct * 100}%`;
    el.querySelector('[data-act="focus"]').textContent = S.settings.focus === n.id ? 'Unfocus' : 'Focus';
  }
  for (const path of edgeSvg.querySelectorAll('.edge')) {
    path.classList.toggle('lit', nodeStatus(byId[path.dataset.from]) === 'done');
  }
  for (const ph of PHASES) {
    const el = world.querySelector(`[data-phase-pct="${ph.id}"]`);
    const pct = phaseProgress(ph.id).pct;
    el.style.width = `${pct * 100}%`;
    document.querySelector(`#phase-rail [data-band="${ph.id}"]`)?.style.setProperty('--p', pct);
  }
}

function highlight(id) {
  for (const path of edgeSvg.querySelectorAll('.edge')) {
    path.classList.toggle('hl', !!id && (path.dataset.from === id || path.dataset.to === id));
  }
}

export function expand(id) {
  if (expanded) world.querySelector(`.node[data-id="${expanded}"]`)?.classList.remove('expanded');
  expanded = expanded === id ? null : id;
  if (expanded) world.querySelector(`.node[data-id="${expanded}"]`).classList.add('expanded');
  highlight(expanded);
}

export function select(id) {
  world.querySelectorAll('.node.selected').forEach((el) => el.classList.remove('selected'));
  if (id) world.querySelector(`.node[data-id="${id}"]`)?.classList.add('selected');
}

// ── view transform ──
function apply(animate = false) {
  world.style.transition = animate ? 'transform .55s cubic-bezier(.2,.8,.2,1)' : 'none';
  world.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.k})`;
  document.getElementById('zoom-level').textContent = `${Math.round(view.k * 100)}%`;
}

function visibleRect() {
  const r = viewport.getBoundingClientRect();
  const drawer = document.getElementById('drawer');
  const right = drawer.classList.contains('open') && innerWidth > 900 ? drawer.offsetWidth : 0;
  return { w: r.width - right, h: r.height };
}

export function zoomBy(f, cx, cy) {
  const r = viewport.getBoundingClientRect();
  cx ??= r.width / 2;
  cy ??= r.height / 2;
  const k = Math.min(MAX_K, Math.max(MIN_K, view.k * f));
  view.x = cx - ((cx - view.x) * k) / view.k;
  view.y = cy - ((cy - view.y) * k) / view.k;
  view.k = k;
  apply(false);
}

export function focusNode(id, { animate = true, k } = {}) {
  const p = pos[id];
  if (!p) return;
  const { w, h } = visibleRect();
  view.k = k ?? Math.max(view.k, 0.85);
  view.x = w / 2 - (p.x + NW / 2) * view.k;
  view.y = h * 0.38 - (p.y + NH / 2) * view.k;
  apply(animate);
}

export function focusBand(phaseId) {
  const b = bands.find((x) => x.ph.id === phaseId);
  const { w } = visibleRect();
  view.k = Math.max(view.k, 0.7);
  view.x = w / 2 - (W / 2) * view.k;
  view.y = 20 - b.top * view.k;
  apply(true);
}

export function fit() {
  const { w, h } = visibleRect();
  view.k = Math.max(MIN_K, Math.min(w / W, h / H) * 0.98);
  view.x = (w - W * view.k) / 2;
  view.y = (h - H * view.k) / 2;
  apply(true);
}

function bindInteractions() {
  // Focusing a button inside a node makes the browser scroll this overflow:hidden box; undo that.
  viewport.addEventListener('scroll', () => { viewport.scrollTop = 0; viewport.scrollLeft = 0; });
  let drag = null;
  viewport.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || e.target.closest('button')) return;
    drag = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false };
  });
  addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) > 4) {
      drag.moved = true;
      viewport.classList.add('dragging');
    }
    if (drag.moved) {
      view.x = drag.vx + dx;
      view.y = drag.vy + dy;
      apply(false);
    }
  });
  addEventListener('pointerup', () => {
    if (drag?.moved) {
      viewport.classList.remove('dragging');
      // swallow the click that follows a drag
      addEventListener('click', (ev) => ev.stopPropagation(), { capture: true, once: true });
    }
    drag = null;
  });
  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    const r = viewport.getBoundingClientRect();
    if (e.ctrlKey || e.metaKey) zoomBy(Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
    else {
      view.x -= e.deltaX;
      view.y -= e.deltaY;
      apply(false);
    }
  }, { passive: false });

  world.addEventListener('click', (e) => {
    const nodeEl = e.target.closest('.node');
    if (!nodeEl) return;
    const id = nodeEl.dataset.id;
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'open') return handlers.onOpen(id, 'overview');
    if (act === 'checklist') return handlers.onOpen(id, 'checklist');
    if (act === 'focus') return handlers.onFocus(id);
    if (e.target.closest('.node-more')) return;
    expand(id);
  });
  world.addEventListener('dblclick', (e) => {
    const nodeEl = e.target.closest('.node');
    if (nodeEl && !e.target.closest('button')) handlers.onOpen(nodeEl.dataset.id, 'overview');
  });
  world.addEventListener('mouseover', (e) => {
    const id = e.target.closest('.node')?.dataset.id;
    if (!expanded) highlight(id);
  });
}

export function initGraph(opts) {
  handlers = opts;
  viewport = document.getElementById('viewport');
  world = document.getElementById('world');
  computeLayout();
  build();
  bindInteractions();
  refresh();
}
