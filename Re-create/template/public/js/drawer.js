// Right-side drawer with full node details.
import { S } from './store.js';
import { NODES, byId, children, PHASES, nodeStatus, nodeProgress, isItemDone, fmtHours, todayStr, prettyDate } from './model.js';
import { toggleItem, addItemToToday, setFocus, setNotes, ensurePlan } from './plan.js';
import { escapeHtml as h } from './honor.js';

const TABS = [
  ['overview', 'Overview'],
  ['guide', 'Guide'],
  ['resources', 'Resources'],
  ['checklist', 'Checklist'],
  ['project', 'Project'],
  ['notes', 'Notes'],
];
const TYPE_ICON = { video: '▶', course: '◆', book: '❖', docs: '§', practice: '✎', article: '¶', tool: '⚙' };

let current = null;
let tab = 'overview';
let hooks = {};
const el = () => document.getElementById('drawer');

export const openNodeId = () => current;

export function openDrawer(id, t = 'overview') {
  current = id;
  tab = t;
  el().classList.add('open');
  render();
  el().querySelector('.drawer-body').scrollTop = 0;
}

export function closeDrawer() {
  current = null;
  el().classList.remove('open');
  hooks.onClose?.();
}

export function render() {
  if (!current) return;
  // Don't clobber the notes textarea while the user is typing in it.
  if (tab === 'notes' && document.activeElement?.dataset?.notes === current) return;
  const scroll = el().querySelector('.drawer-body')?.scrollTop ?? 0;
  const n = byId[current];
  const st = nodeStatus(n);
  const pr = nodeProgress(n);
  const ph = PHASES[n.phase];
  el().style.setProperty('--c', n.color);
  el().innerHTML = `
    <header class="drawer-head">
      <div class="drawer-kicker">Phase ${ph.id} · ${h(ph.title)}</div>
      <h2>${h(n.title)}</h2>
      <div class="drawer-stats">
        <span class="pill status-${st}">${{ done: 'Mastered', progress: 'In progress', available: 'Ready to start', locked: 'Prerequisites pending' }[st]}</span>
        <span>≈ ${n.hours} hours</span>
        <span>${pr.done}/${pr.total} tasks</span>
      </div>
      <div class="progress"><span style="width:${pr.pct * 100}%"></span></div>
      <button class="icon-btn drawer-close" data-act="close" aria-label="Close">✕</button>
      <nav class="tabs">${TABS.map(([k, label]) => `<button class="tab ${k === tab ? 'active' : ''}" data-tab="${k}">${label}${k === 'checklist' ? ` <small>${pr.done}/${pr.total}</small>` : ''}</button>`).join('')}</nav>
    </header>
    <div class="drawer-body">${BODY[tab](n)}</div>`;
  el().querySelector('.drawer-body').scrollTop = scroll;
}

const resourceItem = (r) => `
  <li><a href="${h(r.url)}" target="_blank" rel="noopener noreferrer">
    <span class="res-icon" title="${r.type}">${TYPE_ICON[r.type] ?? '•'}</span>
    <span class="res-text"><span class="res-title">${h(r.title)}</span>
    <span class="res-meta">${r.type}${r.note ? ` · ${h(r.note)}` : ''} · ${h(new URL(r.url).hostname.replace('www.', ''))}</span></span>
    <span class="res-go">↗</span></a></li>`;

// ── notes export ──
/** File-safe version of a node title, e.g. "Python: OOP, Testing & Packaging" → "Python - OOP, Testing & Packaging". */
const fileName = (title) => title.replace(/[\\/:*?"<>|]+/g, ' - ').replace(/\s+/g, ' ').trim();

function download(name, text, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

function noteText(n) {
  // Prefer the live textarea so text typed in the last moment (before autosave) is included.
  const live = document.querySelector(`textarea[data-notes="${n.id}"]`);
  return (live ? live.value : S.nodes[n.id]?.notes ?? '').trim();
}

function exportNotes(kind) {
  const exported = prettyDate(todayStr(), { year: 'numeric', month: 'long', day: 'numeric' });
  const msg = el().querySelector('.notes-export-msg');
  const say = (text) => { msg.textContent = text; msg.hidden = false; };
  if (kind === 'all') {
    const withNotes = NODES.filter((n) => noteText(n));
    if (!withNotes.length) return say('No notes yet — write some first.');
    const body = withNotes.map((n) => `## ${n.title}\n\n*Phase ${n.phase} · ${PHASES[n.phase].title}*\n\n${noteText(n)}\n`).join('\n---\n\n');
    download(`All notes ${todayStr()}.md`, `# My study notes\n\nExported ${exported} · ${withNotes.length} node${withNotes.length > 1 ? 's' : ''}\n\n---\n\n${body}`, 'text/markdown');
    return say(`Exported notes from ${withNotes.length} node${withNotes.length > 1 ? 's' : ''}.`);
  }
  const n = byId[current];
  const text = noteText(n);
  if (!text) return say('No notes for this node yet.');
  const phase = `Phase ${n.phase} · ${PHASES[n.phase].title}`;
  if (kind === 'md') download(`${fileName(n.title)}.md`, `# ${n.title}\n\n*${phase} · exported ${exported}*\n\n${text}\n`, 'text/markdown');
  else download(`${fileName(n.title)}.txt`, `${n.title}\n${'='.repeat(n.title.length)}\n${phase} · exported ${exported}\n\n${text}\n`, 'text/plain');
  say(`Saved as "${fileName(n.title)}.${kind}" to your Downloads folder.`);
}

const nodeLink = (id) => `<button class="link-chip status-${nodeStatus(byId[id])}" data-goto="${id}">${h(byId[id].title)}</button>`;

const BODY = {
  overview: (n) => `
    <p class="lead">${h(n.summary)}</p>
    <h4>Why it matters</h4>
    <p>${h(n.why)}</p>
    <h4>What you'll cover</h4>
    <div class="chips">${n.subtopics.map((s) => `<span class="chip">${h(s)}</span>`).join('')}</div>
    <div class="two-col">
      <div><h4>Requires</h4>${n.prereqs.length ? n.prereqs.map(nodeLink).join('') : '<p class="muted">Nothing — start here.</p>'}</div>
      <div><h4>Unlocks</h4>${children[n.id].length ? children[n.id].map(nodeLink).join('') : '<p class="muted">The frontier.</p>'}</div>
    </div>
    <h4>Self-test — you've mastered this when you can answer</h4>
    <ol class="mastery">${n.mastery.map((q) => `<li>${h(q)}</li>`).join('')}</ol>
    <div class="actions-row">
      <button class="btn primary" data-tab="guide">Start the guide →</button>
      <button class="btn" data-act="focus">${S.settings.focus === n.id ? 'Remove focus' : 'Focus in daily plan'}</button>
    </div>`,

  guide: (n) => `
    <p class="muted">Follow these steps in order. Use the Resources tab for links and tick off progress in the Checklist.</p>
    <ol class="path">${n.guide.map((g, i) => `<li><span class="step">${i + 1}</span><div>${h(g)}</div></li>`).join('')}</ol>
    <div class="actions-row"><button class="btn primary" data-tab="resources">Open resources →</button></div>`,

  resources: (n) => `
    <p class="muted">All free. Links open in your browser.</p>
    <ul class="resources">${n.resources.map(resourceItem).join('')}</ul>
    ${n.alternatives.length ? `
      <h4>Alternatives</h4>
      <p class="muted">Different formats or teaching styles covering the same ground. Use one if a main resource doesn't click for you.</p>
      <ul class="resources alt">${n.alternatives.map(resourceItem).join('')}</ul>` : ''}`,

  checklist: (n) => {
    const today = new Set(ensurePlan(todayStr()).tasks.map((t) => t.ref));
    const items = n.items.filter((it) => !it.project);
    return `
      <p class="muted">Each task ≈ ${fmtHours(items[0].hours)}. Ticking a task from today's plan earns more honor than an unplanned one.</p>
      <ul class="checklist">${items.map((it, i) => `
        <li class="${isItemDone(it.id) ? 'done' : ''}">
          <label><input type="checkbox" data-item="${it.id}" ${isItemDone(it.id) ? 'checked' : ''}>
          <span class="check-num">${String(i + 1).padStart(2, '0')}</span><span class="check-text">${h(it.text)}</span></label>
          ${isItemDone(it.id) ? '' : today.has(it.id) ? '<span class="tag">Today</span>' : `<button class="mini" data-today="${it.id}" title="Add to today's plan">+ Today</button>`}
        </li>`).join('')}</ul>
      <div class="actions-row"><button class="btn" data-tab="project">Then: the project →</button></div>`;
  },

  project: (n) => {
    const id = `${n.id}.project`;
    const done = isItemDone(id);
    return `
      <div class="project-card ${done ? 'done' : ''}">
        <div class="project-kicker">Capstone · ≈ ${fmtHours(byId[n.id].items.at(-1).hours)}</div>
        <p>${h(n.project)}</p>
        <label class="project-check"><input type="checkbox" data-item="${id}" ${done ? 'checked' : ''}> ${done ? 'Project complete' : 'Mark project complete'}</label>
      </div>
      <h4>Definition of done</h4>
      <ul class="bullets">
        <li>Code is in a public GitHub repo with a README (problem, approach, results, how to run).</li>
        <li>Results are reproducible from a clean environment.</li>
        <li>You can explain every design decision without notes.</li>
      </ul>
      <h4>Self-test</h4>
      <ol class="mastery">${n.mastery.map((q) => `<li>${h(q)}</li>`).join('')}</ol>`;
  },

  notes: (n) => `
    <p class="muted">Your notes for this node. Saved automatically to your progress file.</p>
    <textarea class="notes" data-notes="${n.id}" placeholder="Key ideas, links, questions, mistakes you made…">${h(S.nodes[n.id]?.notes ?? '')}</textarea>
    <div class="notes-export">
      <span class="muted">Export as</span>
      <button class="btn small" data-export="md">Markdown (.md)</button>
      <button class="btn small" data-export="txt">Text (.txt)</button>
      <button class="btn small ghost" data-export="all">All notes (.md)</button>
    </div>
    <p class="notes-export-msg muted" hidden></p>`,
};

export function initDrawer(opts) {
  hooks = opts;
  const d = el();
  d.addEventListener('click', (e) => {
    const t = e.target;
    if (t.closest('[data-act="close"]')) return closeDrawer();
    const tb = t.closest('[data-tab]');
    if (tb) {
      tab = tb.dataset.tab;
      render();
      d.querySelector('.drawer-body').scrollTop = 0;
      return;
    }
    const go = t.closest('[data-goto]');
    if (go) return hooks.onGoto(go.dataset.goto);
    const ex = t.closest('[data-export]');
    if (ex) return exportNotes(ex.dataset.export);
    const td = t.closest('[data-today]');
    if (td) return addItemToToday(td.dataset.today);
    if (t.closest('[data-act="focus"]')) return setFocus(current);
  });
  d.addEventListener('change', (e) => {
    const id = e.target.dataset.item;
    if (id) toggleItem(id);
  });
  let noteTimer;
  d.addEventListener('input', (e) => {
    const id = e.target.dataset.notes;
    if (!id) return;
    clearTimeout(noteTimer);
    noteTimer = setTimeout(() => setNotes(id, e.target.value), 500);
  });
}
