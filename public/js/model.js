// Derived roadmap data + selectors over progress state.
import { S } from './store.js';

export const PHASES = window.ROADMAP_PHASES;
const PROJECT_SHARE = 0.2; // share of a node's hours estimated for its project

export const NODES = window.ROADMAP_NODES.map((n) => {
  const itemHours = (n.hours * (1 - PROJECT_SHARE)) / n.checklist.length;
  const items = n.checklist.map((text, i) => ({ id: `${n.id}.${String(i + 1).padStart(2, '0')}`, text, hours: itemHours, nodeId: n.id }));
  items.push({ id: `${n.id}.project`, text: `Project: ${n.project}`, hours: n.hours * PROJECT_SHARE, nodeId: n.id, project: true });
  const alternatives = (window.ROADMAP_ALTERNATIVES || {})[n.id] || [];
  return { ...n, items, alternatives, color: PHASES[n.phase].color };
});

export const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
export const itemById = Object.fromEntries(NODES.flatMap((n) => n.items.map((it) => [it.id, it])));
export const children = Object.fromEntries(NODES.map((n) => [n.id, NODES.filter((m) => m.prereqs.includes(n.id)).map((m) => m.id)]));
export const TOTAL_HOURS = NODES.reduce((a, n) => a + n.hours, 0);

// ── dates (local time) ──
const override = new URLSearchParams(location.search).get('today');
export function todayStr() {
  if (override && /^\d{4}-\d{2}-\d{2}$/.test(override)) return override;
  return dateStr(new Date());
}
export function dateStr(d) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
export function parseDate(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}
export function addDays(s, n) {
  const d = parseDate(s);
  d.setDate(d.getDate() + n);
  return dateStr(d);
}
export function weekday(s) {
  return parseDate(s).getDay();
}
export function prettyDate(s, opts = { weekday: 'long', month: 'short', day: 'numeric' }) {
  return parseDate(s).toLocaleDateString(undefined, opts);
}

// ── progress selectors ──
export const isItemDone = (id) => !!S.checklist[id];

export function nodeProgress(n) {
  const done = n.items.filter((it) => isItemDone(it.id)).length;
  return { done, total: n.items.length, pct: done / n.items.length };
}

export const isNodeDone = (n) => n.items.every((it) => isItemDone(it.id));
export const prereqsDone = (n) => n.prereqs.every((p) => isNodeDone(byId[p]));

export function nodeStatus(n) {
  if (isNodeDone(n)) return 'done';
  if (n.items.some((it) => isItemDone(it.id))) return 'progress';
  return prereqsDone(n) ? 'available' : 'locked';
}

export function overall() {
  const items = NODES.flatMap((n) => n.items);
  const done = items.filter((it) => isItemDone(it.id));
  const hoursDone = done.reduce((a, it) => a + it.hours, 0);
  return {
    itemsDone: done.length,
    itemsTotal: items.length,
    hoursDone,
    hoursTotal: TOTAL_HOURS,
    pct: hoursDone / TOTAL_HOURS,
    nodesDone: NODES.filter(isNodeDone).length,
  };
}

export function phaseProgress(phaseId) {
  const nodes = NODES.filter((n) => n.phase === phaseId);
  const hours = nodes.reduce((a, n) => a + n.hours, 0);
  const done = nodes.reduce((a, n) => a + n.items.filter((it) => isItemDone(it.id)).reduce((b, it) => b + it.hours, 0), 0);
  return { nodes, pct: done / hours, hours };
}

/** Nodes you should be working on now: unfinished, prerequisites complete, in curriculum order. */
export function activeNodes() {
  const open = NODES.filter((n) => !isNodeDone(n) && prereqsDone(n));
  if (open.length) return open;
  return NODES.filter((n) => !isNodeDone(n)).slice(0, 1);
}

export function fmtHours(h) {
  if (h < 1) return `${Math.round(h * 60)}m`;
  return `${Math.round(h * 2) / 2}h`;
}
