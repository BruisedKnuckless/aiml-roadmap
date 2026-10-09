// RDR2-style honor: value 0–100, starts at 50. Gains/losses are logged and reversible.
import { S } from './store.js';

export const RULES = {
  task: 1.5, // completing a task allotted for today
  extra: 0.5, // completing a checklist item that wasn't on today's plan
  allDone: 2, // finishing every task allotted for today
  minimum: 0.5, // meeting the daily minimum: a smaller reward, and the day is penalty-free
  node: 5, // completing a whole roadmap node
  streak7: 3, // every 7 consecutive perfect days
  missedTask: -2, // per allotted task left unfinished at day end…
  missedTaskCap: -6, // …but a partial day never costs more than this
  skippedDay: -6, // a non-rest day with zero completions (or the app was never opened)
};

export const RANKS = [
  { min: 90, name: 'Legend', blurb: 'The kind of discipline people write songs about.' },
  { min: 70, name: 'Honorable', blurb: 'You keep your word to yourself.' },
  { min: 55, name: 'Respectable', blurb: 'Reliable, and getting stronger.' },
  { min: 45, name: 'Neutral', blurb: 'The trail can go either way.' },
  { min: 30, name: 'Wavering', blurb: 'Promises are slipping. Get back in the saddle.' },
  { min: 10, name: 'Drifter', blurb: 'Days pass and the path waits.' },
  { min: 0, name: 'Outlaw', blurb: 'Every journey can be redeemed. Start with one task.' },
];

export const rankOf = (v) => RANKS.find((r) => v >= r.min);

/** Gains shrink as you approach 100 and losses shrink as you approach 0, so the extremes are earned. */
function scale(raw, v) {
  if (raw > 0 && v > 50) return raw * Math.max(0.25, (100 - v) / 50);
  if (raw < 0 && v < 50) return raw * Math.max(0.25, v / 50);
  return raw;
}

function apply(delta, reason) {
  const before = S.honor.value;
  const after = Math.min(100, Math.max(0, before + delta));
  const actual = Math.round((after - before) * 100) / 100;
  S.honor.value = Math.round(after * 100) / 100;
  if (actual !== 0) {
    S.honor.history.push({ t: new Date().toISOString(), d: actual, r: reason, v: S.honor.value });
    if (S.honor.history.length > 3000) S.honor.history.splice(0, S.honor.history.length - 3000);
    queueToast(actual, reason);
  }
  return actual;
}

/** One-off change (penalties, streaks). */
export function adjust(raw, reason) {
  return apply(scale(raw, S.honor.value), reason);
}

/** Keyed gain that can later be reversed exactly (e.g., unchecking an item). */
export function award(key, raw, reason) {
  if (S.awards[key] != null) return 0;
  const got = apply(scale(raw, S.honor.value), reason);
  S.awards[key] = got;
  return got;
}

export function reverse(key, reason) {
  const got = S.awards[key];
  if (got == null) return 0;
  delete S.awards[key];
  return apply(-got, reason);
}

// ── meter UI ──
export function renderMeter() {
  const v = S.honor.value;
  const meter = document.getElementById('honor');
  meter.style.setProperty('--honor', v);
  meter.querySelector('.honor-value').textContent = v.toFixed(1);
  const rank = rankOf(v);
  meter.querySelector('.honor-rank').textContent = rank.name;
  meter.title = `${rank.name} — ${rank.blurb}\nHonor ${v.toFixed(1)} / 100`;
  meter.setAttribute('aria-valuenow', v.toFixed(1));
  meter.dataset.side = v > 52 ? 'good' : v < 48 ? 'bad' : 'neutral';
}

// Toasts are batched so a burst of changes (e.g., day rollover) shows as one stacked notice.
let pending = [];
let flushTimer = null;
function queueToast(delta, reason) {
  pending.push({ delta, reason });
  clearTimeout(flushTimer);
  flushTimer = setTimeout(showToasts, 60);
}

function showToasts() {
  const items = pending;
  pending = [];
  if (!items.length) return;
  const net = items.reduce((a, b) => a + b.delta, 0);
  const host = document.getElementById('toasts');
  const el = document.createElement('div');
  el.className = `toast ${net >= 0 ? 'up' : 'down'}`;
  const lines = items.slice(-4).map((i) => `<li><b>${i.delta > 0 ? '+' : ''}${i.delta.toFixed(1)}</b> ${escapeHtml(i.reason)}</li>`).join('');
  el.innerHTML = `
    <div class="toast-head"><span class="toast-icon">${net >= 0 ? '▲' : '▼'}</span>Honor ${net >= 0 ? 'Increased' : 'Decreased'}</div>
    <ul>${lines}${items.length > 4 ? `<li class="more">and ${items.length - 4} more…</li>` : ''}</ul>`;
  host.prepend(el);
  document.getElementById('honor').classList.add(net >= 0 ? 'pulse-up' : 'pulse-down');
  setTimeout(() => document.getElementById('honor').classList.remove('pulse-up', 'pulse-down'), 900);
  setTimeout(() => el.classList.add('out'), 3800);
  setTimeout(() => el.remove(), 4400);
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
