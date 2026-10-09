// Daily plans, day rollover (honor penalties), and all progress-changing actions.
import { S, commit } from './store.js';
import { RULES, award, reverse, adjust } from './honor.js';
import { byId, itemById, activeNodes, isItemDone, isNodeDone, todayStr, addDays, weekday, prettyDate, fmtHours } from './model.js';

const uid = () => Math.random().toString(36).slice(2, 10);
const MAX_SESSION_HOURS = 3;
const MAX_TASKS = 10;

export const isRest = (date) => S.settings.restDays.includes(weekday(date));
/** Days before the challenge start date are warm-up: tasks are optional and nothing costs honor. */
/** Tasks needed to "keep the minimum" on a day: the setting, capped at how many were allotted. */
export function minimumFor(day) {
  const required = day.tasks.filter((t) => !t.extra).length;
  return required ? Math.min(S.settings.minTasks, required) : 0;
}
export const isWarmup = (date) => !!S.settings.startDate && date < S.settings.startDate;

function makeWarmup(day) {
  day.warmup = true;
  for (const t of day.tasks) t.extra = true;
}
export const taskDone = (t) => (t.kind === 'checklist' ? isItemDone(t.ref) : !!t.done);

export function taskLabel(t) {
  if (t.kind === 'checklist') return itemById[t.ref]?.text ?? t.ref;
  if (t.kind === 'session') return `Project session (${fmtHours(t.hours)}) — ${byId[t.ref]?.title}`;
  return t.text;
}
export const taskHours = (t) => (t.kind === 'checklist' ? itemById[t.ref]?.hours ?? 0 : t.kind === 'session' ? t.hours : 0);

/** Pick the next unfinished items from the active nodes (round-robin across two) to fill an hours budget. */
function pickTasks(budget, exclude, limit = MAX_TASKS) {
  let nodes = activeNodes();
  const focus = S.settings.focus && byId[S.settings.focus];
  if (focus && !isNodeDone(focus)) nodes = [focus, ...nodes.filter((n) => n !== focus)];
  const queues = nodes.slice(0, 2).map((n) => n.items.filter((it) => !isItemDone(it.id) && !exclude.has(it.id)));
  const tasks = [];
  let hours = 0;
  const slack = budget * 1.15;
  let progressed = true;
  while (progressed && tasks.length < limit) {
    progressed = false;
    for (const q of queues) {
      if (!q.length || tasks.length >= limit) continue;
      const it = q[0];
      if (it.project) {
        // Projects are too big for one day: schedule a work session instead.
        const h = Math.min(MAX_SESSION_HOURS, it.hours, Math.max(1, budget - hours));
        if (tasks.length && hours + h > slack) { q.length = 0; continue; }
        tasks.push({ id: uid(), kind: 'session', ref: it.nodeId, hours: h, done: false });
        hours += h;
        q.length = 0;
        progressed = true;
        continue;
      }
      if (tasks.length && hours + it.hours > slack) { q.length = 0; continue; }
      tasks.push({ id: uid(), kind: 'checklist', ref: it.id });
      hours += it.hours;
      q.shift();
      progressed = true;
    }
  }
  return tasks;
}

function previousDay(date) {
  const keys = Object.keys(S.days).filter((k) => k < date).sort();
  return keys.length ? S.days[keys[keys.length - 1]] : null;
}

export function ensurePlan(date = todayStr()) {
  if (S.days[date]) return S.days[date];
  const rest = isRest(date);
  const prev = previousDay(date);
  const carried = (prev?.tasks ?? [])
    .filter((t) => t.kind === 'custom' && !t.done && (!t.extra || prev.warmup))
    .map((t) => ({ id: uid(), kind: 'custom', text: t.text, done: false, carried: true }));
  const tasks = [...carried, ...(rest ? [] : pickTasks(S.settings.dailyHours, new Set()))];
  S.days[date] = { tasks, rest, evaluated: false, log: [], createdAt: new Date().toISOString() };
  if (isWarmup(date)) makeWarmup(S.days[date]);
  return S.days[date];
}

// ── day rollover ──
/** Evaluate every finished day since the last visit, applying honor penalties/bonuses. Returns summary. */
export function processDays() {
  const today = todayStr();
  // The honor challenge begins the day after you first open the app, so day one is never a partial-day ambush.
  if (!S.settings.startDate) S.settings.startDate = addDays(today, 1);
  if (S.days[today] && isWarmup(today)) makeWarmup(S.days[today]);
  if (!S.lastProcessed) {
    S.lastProcessed = today;
    ensurePlan(today);
    return null;
  }
  const summary = { days: 0, delta: 0 };
  const start = S.honor.value;
  for (let d = S.lastProcessed; d < today; d = addDays(d, 1)) {
    evaluateDay(d);
    summary.days++;
  }
  S.lastProcessed = today > S.lastProcessed ? today : S.lastProcessed;
  ensurePlan(today);
  summary.delta = S.honor.value - start;
  return summary.days ? summary : null;
}

function evaluateDay(d) {
  const day = S.days[d];
  const label = prettyDate(d, { weekday: 'short', month: 'short', day: 'numeric' });
  const rest = day ? day.rest : isRest(d);
  if (isWarmup(d)) {
    if (day) day.evaluated = true;
    return;
  }
  if (!day) {
    if (!rest) {
      adjust(RULES.skippedDay, `${label}: skipped — app never opened`);
      S.streak.current = 0;
    }
    return;
  }
  if (day.evaluated) return;
  const before = S.honor.value;
  const required = day.tasks.filter((t) => !t.extra);
  const unfinished = required.filter((t) => !taskDone(t));
  const completions = day.log.length;
  const keptMinimum = minimumFor(day) > 0 && completions >= minimumFor(day);
  if (!rest && !keptMinimum) {
    if (completions === 0) {
      adjust(RULES.skippedDay, `${label}: skipped — nothing completed`);
    } else {
      let lost = 0;
      for (const t of unfinished) {
        if (lost <= RULES.missedTaskCap) break;
        const raw = Math.max(RULES.missedTask, RULES.missedTaskCap - lost);
        lost += adjust(raw, `${label} missed: ${truncate(taskLabel(t), 60)}`);
      }
    }
  }
  const perfect = required.length > 0 && unfinished.length === 0;
  if (perfect) {
    S.streak.current++;
    S.streak.best = Math.max(S.streak.best, S.streak.current);
    if (S.streak.current % 7 === 0) adjust(RULES.streak7, `${S.streak.current}-day streak`);
  } else if (!rest && !keptMinimum) {
    // A minimum day protects the streak but doesn't grow it.
    S.streak.current = 0;
  }
  day.evaluated = true;
  day.verdict = { done: required.length - unfinished.length, total: required.length, completions, keptMinimum, delta: Math.round((S.honor.value - before) * 100) / 100 };
}

const truncate = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

// ── actions ──
function logCompletion(key, on) {
  const day = ensurePlan(todayStr());
  if (on) day.log.push(key);
  else for (const d of Object.values(S.days)) d.log = d.log.filter((k) => k !== key);
}

/** Award or take back today's minimum / full-day bonuses to match current completions. */
function checkDayGoals() {
  const date = todayStr();
  const day = S.days[date];
  const required = day.tasks.filter((t) => !t.extra);
  const min = minimumFor(day);
  if (min && day.log.length >= min) award(`minimum:${date}`, RULES.minimum, `Daily minimum kept (${min} tasks)`);
  else reverse(`minimum:${date}`, 'Daily minimum no longer met');
  if (required.length && required.every(taskDone)) award(`allDone:${date}`, RULES.allDone, "All of today's tasks complete");
  else reverse(`allDone:${date}`, "Today's plan no longer complete");
}

export function toggleItem(itemId) {
  const it = itemById[itemId];
  const node = byId[it.nodeId];
  const date = todayStr();
  const day = ensurePlan(date);
  if (S.checklist[itemId]) {
    delete S.checklist[itemId];
    logCompletion(itemId, false);
    reverse(`item:${itemId}`, `Unchecked: ${truncate(it.text, 50)}`);
    reverse(`node:${node.id}`, `${node.title} no longer complete`);
    checkDayGoals();
  } else {
    S.checklist[itemId] = new Date().toISOString();
    logCompletion(itemId, true);
    const planned = day.tasks.some((t) => t.kind === 'checklist' && t.ref === itemId);
    award(`item:${itemId}`, planned ? RULES.task : RULES.extra, truncate(it.text, 60));
    if (isNodeDone(node)) award(`node:${node.id}`, RULES.node, `Mastered: ${node.title}`);
    checkDayGoals();
  }
  commit();
}

export function toggleTask(taskId) {
  const date = todayStr();
  const day = ensurePlan(date);
  const t = day.tasks.find((x) => x.id === taskId);
  if (!t) return;
  if (t.kind === 'checklist') return toggleItem(t.ref);
  t.done = !t.done;
  t.doneAt = t.done ? new Date().toISOString() : null;
  logCompletion(`task:${t.id}`, t.done);
  if (t.done) {
    award(`task:${t.id}`, RULES.task, truncate(taskLabel(t), 60));
    checkDayGoals();
  } else {
    reverse(`task:${t.id}`, `Unchecked: ${truncate(taskLabel(t), 50)}`);
    checkDayGoals();
  }
  commit();
}

export function addCustom(text) {
  text = text.trim();
  if (!text) return;
  ensurePlan().tasks.push({ id: uid(), kind: 'custom', text, done: false });
  commit();
}

export function removeTask(taskId) {
  const day = ensurePlan();
  const t = day.tasks.find((x) => x.id === taskId);
  if (!t) return;
  if (t.kind !== 'checklist' && t.done) reverse(`task:${t.id}`, `Removed: ${truncate(taskLabel(t), 50)}`);
  day.tasks = day.tasks.filter((x) => x.id !== taskId);
  commit();
}

export function addItemToToday(itemId) {
  const day = ensurePlan();
  if (day.tasks.some((t) => t.ref === itemId)) return;
  day.tasks.push({ id: uid(), kind: 'checklist', ref: itemId, extra: true });
  commit();
}

/** Pull one more task after finishing the plan. Extra tasks are rewarded but never penalised. */
export function pullNext() {
  const day = ensurePlan();
  const exclude = new Set(day.tasks.filter((t) => t.kind === 'checklist').map((t) => t.ref));
  const [t] = pickTasks(Infinity, exclude, 1);
  if (!t) return;
  if (t.kind === 'session' && day.tasks.some((x) => x.kind === 'session' && x.ref === t.ref)) return;
  day.tasks.push({ ...t, extra: true });
  commit();
}

/** Replace today's unfinished auto-assigned tasks with a fresh pick (e.g., after changing focus). */
export function rebuildToday() {
  const day = ensurePlan();
  const keep = day.tasks.filter((t) => t.kind === 'custom' || taskDone(t));
  const used = keep.reduce((a, t) => a + taskHours(t), 0);
  const exclude = new Set(keep.filter((t) => t.kind === 'checklist').map((t) => t.ref));
  day.tasks = [...keep, ...(day.rest ? [] : pickTasks(Math.max(0.5, S.settings.dailyHours - used), exclude))];
  commit();
}

export function setFocus(nodeId) {
  S.settings.focus = S.settings.focus === nodeId ? null : nodeId;
  rebuildToday();
}

export function setNotes(nodeId, notes) {
  S.nodes[nodeId] = { ...(S.nodes[nodeId] || {}), notes };
  commit();
}

export function completeProject(nodeId) {
  const id = `${nodeId}.project`;
  if (!isItemDone(id)) toggleItem(id);
}

