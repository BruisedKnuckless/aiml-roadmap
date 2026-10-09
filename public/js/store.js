// Progress state: loaded from / saved to data/progress.json via the local server.
const API = '/api/progress';

export let S = null;
export const bus = new EventTarget();

export function defaultState() {
  return {
    version: 1,
    createdAt: new Date().toISOString(),
    settings: { dailyHours: 5, restDays: [], minTasks: 2, theme: 'auto', onboarded: false },
    honor: { value: 50, history: [] },
    awards: {}, // key -> honor delta that was granted, so it can be reversed exactly
    checklist: {}, // itemId -> ISO timestamp completed
    nodes: {}, // nodeId -> { notes }
    days: {}, // 'YYYY-MM-DD' -> { tasks: [...], rest, evaluated, verdict }
    lastProcessed: null,
    streak: { current: 0, best: 0 },
  };
}

function migrate(s) {
  const d = defaultState();
  // Progress files from before the welcome screen existed belong to people who already started.
  if (s.settings && s.settings.onboarded == null) s.settings.onboarded = true;
  for (const k of Object.keys(d)) if (s[k] == null) s[k] = d[k];
  s.settings = { ...d.settings, ...s.settings };
  s.streak = { ...d.streak, ...s.streak };
  return s;
}

export async function load() {
  try {
    const res = await fetch(API, { cache: 'no-store' });
    const json = await res.json();
    S = json ? migrate(json) : defaultState();
    setStatus('saved');
  } catch {
    S = defaultState();
    setStatus('offline');
  }
  return S;
}

export function replaceState(next) {
  S = migrate(next);
}

let timer = null;
let dirty = false;

export function save() {
  dirty = true;
  setStatus('saving');
  clearTimeout(timer);
  timer = setTimeout(flush, 400);
}

async function flush() {
  try {
    const res = await fetch(API, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(S) });
    if (!res.ok) throw new Error(res.status);
    dirty = false;
    setStatus('saved');
  } catch {
    setStatus('offline');
    timer = setTimeout(flush, 5000);
  }
}

/** Persist and notify all views to re-render. */
export function commit() {
  save();
  bus.dispatchEvent(new Event('change'));
}

addEventListener('pagehide', () => {
  if (dirty && S) navigator.sendBeacon(API, new Blob([JSON.stringify(S)], { type: 'application/json' }));
});

function setStatus(s) {
  const el = document.getElementById('save-status');
  if (!el) return;
  el.dataset.state = s;
  el.textContent = { saved: 'Saved', saving: 'Saving…', offline: 'Offline — retrying' }[s];
  el.title = s === 'offline' ? 'Cannot reach the local server. Is start.command running?' : 'Progress is saved to data/progress.json';
}

export function exportJSON() {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `aiml-progress-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}
