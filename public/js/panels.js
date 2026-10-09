// Left sidebar: Today (to-dos), Path (progress by phase), Stats (honor & activity), Settings.
import { S, commit, exportJSON, replaceState, defaultState } from './store.js';
import { NODES, PHASES, byId, overall, phaseProgress, nodeStatus, todayStr, addDays, dateStr, prettyDate, fmtHours, weekday } from './model.js';
import { ensurePlan, setStartDate, minimumFor, taskDone, taskLabel, taskHours, toggleTask, addCustom, removeTask, pullNext, rebuildToday, completeProject, processDays } from './plan.js';
import { RULES, rankOf, escapeHtml as h } from './honor.js';

let tab = 'today';
let hooks = {};
const root = () => document.getElementById('sidebar');
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function render() {
  const body = root().querySelector('.side-body');
  // Keep typing in the add-task box uninterrupted.
  const typing = document.activeElement?.id === 'new-task' ? document.activeElement.value : null;
  root().querySelectorAll('.side-tab').forEach((b) => b.classList.toggle('active', b.dataset.side === tab));
  body.innerHTML = VIEWS[tab]();
  if (typing != null) {
    const inp = document.getElementById('new-task');
    inp.value = typing;
    inp.focus();
  }
  tick();
}

/** Countdown to midnight, refreshed every 30s. */
export function tick() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const mins = Math.max(0, Math.round((end - now) / 60000));
  el.textContent = `Day ends in ${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m`;
  el.classList.toggle('urgent', mins < 120);
}

function verdictBanner(v) {
  const perfect = v.total > 0 && v.done === v.total;
  const note = perfect ? 'all done' : v.keptMinimum ? 'minimum kept, no penalty' : v.delta < 0 ? `${v.delta.toFixed(1)} honor in penalties` : 'no penalty';
  return `<div class="banner ${v.delta < 0 ? 'bad' : 'good'}">Yesterday: ${v.done}/${v.total} tasks · ${note}</div>`;
}

function taskRow(t) {
  const done = taskDone(t);
  const node = t.kind === 'checklist' ? byId[t.ref.split('.')[0]] : t.kind === 'session' ? byId[t.ref] : null;
  const hrs = taskHours(t);
  return `
    <li class="task ${done ? 'done' : ''}" style="${node ? `--c:${node.color}` : ''}">
      <label><input type="checkbox" data-task="${t.id}" ${done ? 'checked' : ''}><span class="task-text">${h(taskLabel(t))}</span></label>
      <div class="task-meta">
        ${node ? `<button class="node-chip" data-goto="${node.id}">${h(node.title)}</button>` : '<span class="node-chip custom">Personal</span>'}
        ${hrs ? `<span>≈ ${fmtHours(hrs)}</span>` : ''}
        ${t.carried ? '<span class="tag warn">Carried over</span>' : ''}
        ${t.extra && !S.days[todayStr()]?.warmup ? '<span class="tag">Bonus</span>' : ''}
        ${t.kind === 'session' && done ? `<button class="mini" data-project="${t.ref}">Project finished?</button>` : ''}
        <button class="remove" data-remove="${t.id}" title="Remove from today">✕</button>
      </div>
    </li>`;
}

const VIEWS = {
  today() {
    const date = todayStr();
    const day = ensurePlan(date);
    const required = day.tasks.filter((t) => !t.extra);
    const doneN = required.filter(taskDone).length;
    const planned = day.tasks.reduce((a, t) => a + taskHours(t), 0);
    const yesterday = S.days[addDays(date, -1)];
    const allDone = required.length > 0 && doneN === required.length;
    const min = minimumFor(day);
    const counted = day.log.length;
    const minKept = min > 0 && counted >= min;
    return `
      <div class="today-head">
        <div><div class="kicker">Today</div><div class="today-date">${prettyDate(date)}</div></div>
        <div id="countdown" class="countdown"></div>
      </div>
      ${day.warmup ? `<div class="banner rest"><b>Warm-up day.</b> The honor challenge starts <b>${prettyDate(S.settings.startDate)}</b>. Nothing today can cost you honor, but every task you finish still earns it.</div>` : ''}
      ${day.rest ? '<div class="banner rest">Rest day — nothing is required and nothing is lost. Optional tasks still earn honor.</div>' : ''}
      ${yesterday?.verdict ? verdictBanner(yesterday.verdict) : ''}
      <div class="day-progress">
        <div class="day-progress-top"><span>${day.warmup ? `<b>${day.tasks.filter(taskDone).length}</b> of ${day.tasks.length} optional done` : `<b>${doneN}</b> of ${required.length} allotted done`}</span><span>≈ ${fmtHours(planned)} planned · ${S.settings.dailyHours}h goal</span></div>
        <div class="progress has-marker"${min && required.length ? ` style="--min:${(min / required.length) * 100}%"` : ''}><span style="width:${day.warmup ? (day.tasks.length ? (day.tasks.filter(taskDone).length / day.tasks.length) * 100 : 0) : required.length ? (doneN / required.length) * 100 : 0}%"></span></div>
        ${min ? `
        <div class="minimum ${minKept ? 'kept' : ''}">
          <span class="pips">${Array.from({ length: min }, (_, i) => `<i class="${i < counted ? 'on' : ''}"></i>`).join('')}</span>
          <span>${minKept ? '<b>Minimum kept</b> — no penalties today' : `<b>Daily minimum:</b> ${Math.min(counted, min)}/${min} tasks to stay penalty-free`}</span>
        </div>` : ''}
      </div>
      ${minKept && !allDone ? `<div class="banner good">You're safe for today (+${RULES.minimum}). Finish all ${required.length} tasks for the full reward: +${RULES.allDone} bonus and a growing streak.</div>` : ''}
      ${allDone ? '<div class="banner good">All allotted tasks done. Honor earned — pull a bonus task or rest easy.</div>' : ''}
      <ul class="tasks">${day.tasks.map(taskRow).join('') || '<li class="empty">No tasks yet.</li>'}</ul>
      <form class="add-task" data-form="add">
        <input id="new-task" placeholder="Add your own to-do…" autocomplete="off" maxlength="200">
        <button class="btn" type="submit">Add</button>
      </form>
      <div class="actions-row">
        <button class="btn" data-act="pull" title="Add the next roadmap task. Bonus tasks earn honor but are never penalised.">+ Pull next task</button>
        <button class="btn ghost" data-act="rebuild" title="Replace unfinished auto-assigned tasks with a fresh pick">Rebuild plan</button>
      </div>
      <details class="rules">
        <summary>How honor works</summary>
        <ul>
          <li><b class="up">+${RULES.task}</b> each allotted task completed</li>
          <li><b class="up">+${RULES.extra}</b> any other checklist item</li>
          <li><b class="up">+${RULES.allDone}</b> finishing the whole day's plan (and the streak grows)</li>
          <li><b class="up">+${RULES.minimum}</b> keeping the daily minimum (${S.settings.minTasks} tasks): no penalties that day and the streak is protected, but it doesn't grow</li>
          <li><b class="up">+${RULES.node}</b> mastering a node · <b class="up">+${RULES.streak7}</b> per 7-day perfect streak</li>
          <li><b class="down">${RULES.missedTask}</b> per allotted task unfinished at midnight, only if you missed the minimum (max ${RULES.missedTaskCap}/day)</li>
          <li><b class="down">${RULES.skippedDay}</b> a day with nothing done, or the app never opened</li>
          <li>Rest days (Settings) are never penalised. Unchecking reverses the honor you got.</li>
          <li>Gains slow down above 50 and losses slow down below 50, so Legend and Outlaw take sustained effort.</li>
        </ul>
      </details>`;
  },

  path() {
    const o = overall();
    const remaining = o.hoursTotal - o.hoursDone;
    let d = todayStr(), left = remaining, guard = 0;
    while (left > 0 && guard++ < 3650) {
      if (!S.settings.restDays.includes(weekday(d))) left -= S.settings.dailyHours;
      d = addDays(d, 1);
    }
    return `
      <div class="overall">
        <div class="overall-ring" style="--p:${o.pct * 100}"><span>${Math.round(o.pct * 100)}%</span></div>
        <div>
          <div class="kicker">Zero → Master</div>
          <div class="overall-line"><b>${Math.round(o.hoursDone)}</b> / ${o.hoursTotal} hours</div>
          <div class="overall-line"><b>${o.nodesDone}</b> / ${NODES.length} nodes mastered</div>
          <div class="overall-line muted">At ${S.settings.dailyHours}h/day → finish ≈ <b>${prettyDate(d, { month: 'short', day: 'numeric', year: 'numeric' })}</b></div>
        </div>
      </div>
      <ol class="phases">${PHASES.map((ph) => {
        const pp = phaseProgress(ph.id);
        return `
          <li style="--c:${ph.color}">
            <div class="phase-head"><span class="phase-num">${ph.id}</span><span class="phase-title">${h(ph.title)}</span><span class="phase-pct">${Math.round(pp.pct * 100)}%</span></div>
            <div class="progress thin"><span style="width:${pp.pct * 100}%"></span></div>
            <ul class="phase-nodes">${pp.nodes.map((n) => `<li><button data-goto="${n.id}" class="status-${nodeStatus(n)}"><i></i>${h(n.title)}<small>${n.hours}h</small></button></li>`).join('')}</ul>
          </li>`;
      }).join('')}</ol>`;
  },

  stats() {
    const v = S.honor.value;
    const rank = rankOf(v);
    const activeDays = Object.values(S.days).filter((d) => d.log.length).length;
    const o = overall();
    return `
      <div class="honor-card">
        <div class="kicker">Honor</div>
        <div class="honor-big">${v.toFixed(1)} <span>${rank.name}</span></div>
        <p class="muted">${rank.blurb}</p>
        ${sparkline()}
      </div>
      <div class="stat-grid">
        <div><b>${S.streak.current}</b><span>day streak</span></div>
        <div><b>${S.streak.best}</b><span>best streak</span></div>
        <div><b>${o.itemsDone}</b><span>tasks done</span></div>
        <div><b>${activeDays}</b><span>active days</span></div>
      </div>
      <h4>Activity · last 16 weeks</h4>
      ${heatmap()}
      <h4>Honor ledger</h4>
      <ul class="ledger">${S.honor.history.slice(-60).reverse().map((e) => `
        <li><span class="ledger-d ${e.d >= 0 ? 'up' : 'down'}">${e.d >= 0 ? '+' : ''}${e.d.toFixed(1)}</span>
        <span class="ledger-r">${h(e.r)}</span><span class="ledger-t">${new Date(e.t).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span></li>`).join('') || '<li class="empty">No honor changes yet. Complete a task.</li>'}</ul>`;
  },

  settings() {
    return `
      <h4>Appearance</h4>
      <div class="segmented" role="radiogroup">${['auto', 'light', 'dark'].map((t) => `<button class="${(S.settings.theme || 'auto') === t ? 'on' : ''}" data-theme-set="${t}">${t[0].toUpperCase() + t.slice(1)}</button>`).join('')}</div>
      <p class="muted">Auto follows your Mac's Light/Dark setting.</p>
      <h4>Challenge start</h4>
      <div class="setting-row start-row">
        <input type="date" data-setting="startDate" value="${S.settings.startDate}" min="${todayStr()}">
        ${S.settings.startDate !== todayStr() ? '<button class="btn small" data-act="start-today">Start today</button>' : ''}
      </div>
      <p class="muted">${S.settings.startDate > todayStr()
        ? `The honor challenge starts <b>${prettyDate(S.settings.startDate)}</b>. Until then every day is a warm-up: tasks are optional and nothing costs honor, but finished tasks still earn it.`
        : `The challenge is on${S.settings.startDate === todayStr() ? ' from today' : ` since <b>${prettyDate(S.settings.startDate)}</b>`}. Pick a future date to postpone it, e.g. before a busy week. Days before the new date become warm-up days.`}</p>
      <h4>Daily study goal</h4>
      <div class="setting-row">
        <input type="range" min="1" max="10" step="0.5" value="${S.settings.dailyHours}" data-setting="dailyHours">
        <b id="hours-out">${S.settings.dailyHours}h / day</b>
      </div>
      <p class="muted">Sets how much work is auto-assigned each day. Applies from tomorrow's plan (or press "Rebuild plan").</p>
      <h4>Daily minimum</h4>
      <div class="setting-row">
        <input type="range" min="1" max="5" step="1" value="${S.settings.minTasks}" data-setting="minTasks">
        <b id="min-out">${S.settings.minTasks} task${S.settings.minTasks > 1 ? 's' : ''}</b>
      </div>
      <p class="muted">For busy days: complete at least this many tasks and the day costs no honor. You get +${RULES.minimum} instead of the full +${RULES.allDone} bonus, and your streak is protected but doesn't grow.</p>
      <h4>Rest days</h4>
      <div class="weekdays segmented">${DAYS.map((d, i) => `<button class="${S.settings.restDays.includes(i) ? 'on' : ''}" data-rest="${i}">${d}</button>`).join('')}</div>
      <p class="muted">No tasks are assigned and no honor is lost on rest days.</p>
      <h4>Your data</h4>
      <p class="muted">Saved automatically to <code>aiml-roadmap/data/progress.json</code> on your Mac, with a daily backup in <code>data/backups/</code> (last 30 days).</p>
      <div class="actions-row">
        <button class="btn" data-act="export">Export JSON</button>
        <label class="btn">Import JSON<input type="file" accept="application/json" data-act="import" hidden></label>
      </div>
      <h4>Danger zone</h4>
      <button class="btn danger" data-act="reset">Reset all progress</button>`;
  },
};

function sparkline() {
  const hist = S.honor.history;
  const today = todayStr();
  const days = 30;
  const pts = [];
  let idx = 0, val = 50;
  const sorted = hist.map((e) => ({ day: dateStr(new Date(e.t)), v: e.v }));
  const startDay = addDays(today, -(days - 1));
  while (idx < sorted.length && sorted[idx].day < startDay) val = sorted[idx++].v;
  for (let i = 0; i < days; i++) {
    const d = addDays(startDay, i);
    while (idx < sorted.length && sorted[idx].day <= d) val = sorted[idx++].v;
    pts.push(d > today ? null : val);
  }
  const W = 280, H = 64;
  const xy = pts.map((v, i) => `${(i / (days - 1)) * W},${H - (v / 100) * H}`).join(' ');
  return `
    <svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-label="Honor over the last 30 days">
      <line x1="0" x2="${W}" y1="${H / 2}" y2="${H / 2}" class="spark-mid"/>
      <polyline points="${xy}" class="spark-line"/>
    </svg>
    <div class="spark-axis"><span>30 days ago</span><span>today</span></div>`;
}

function heatmap() {
  const today = todayStr();
  const weeks = 16;
  let start = addDays(today, -(weeks * 7 - 1));
  start = addDays(start, -weekday(start)); // align to Sunday
  const cells = [];
  for (let d = start; d <= today; d = addDays(d, 1)) {
    const n = S.days[d]?.log.length ?? 0;
    const lvl = n === 0 ? 0 : n < 2 ? 1 : n < 4 ? 2 : n < 6 ? 3 : 4;
    cells.push(`<i class="l${lvl}" title="${prettyDate(d, { month: 'short', day: 'numeric' })}: ${n} completed"></i>`);
  }
  return `<div class="heatmap">${cells.join('')}</div>`;
}

export function initPanels(opts) {
  hooks = opts;
  const r = root();
  r.addEventListener('click', (e) => {
    const t = e.target;
    const sideTab = t.closest('[data-side]');
    if (sideTab) {
      tab = sideTab.dataset.side;
      return render();
    }
    const go = t.closest('[data-goto]');
    if (go) return hooks.onGoto(go.dataset.goto);
    const rm = t.closest('[data-remove]');
    if (rm) return removeTask(rm.dataset.remove);
    const pj = t.closest('[data-project]');
    if (pj) return completeProject(pj.dataset.project);
    const th = t.closest('[data-theme-set]');
    if (th) {
      S.settings.theme = th.dataset.themeSet;
      return commit();
    }
    const rest = t.closest('[data-rest]');
    if (rest) {
      const i = Number(rest.dataset.rest);
      const set = new Set(S.settings.restDays);
      set.has(i) ? set.delete(i) : set.add(i);
      S.settings.restDays = [...set].sort();
      return commit();
    }
    const act = t.closest('[data-act]')?.dataset.act;
    if (act === 'pull') pullNext();
    if (act === 'rebuild') rebuildToday();
    if (act === 'export') exportJSON();
    if (act === 'start-today') setStartDate(todayStr());
    if (act === 'reset' && confirm('Reset ALL progress, notes and honor back to 50? A backup of today stays in data/backups/.') && confirm('Really reset? This cannot be undone from the app.')) {
      replaceState(defaultState());
      processDays();
      commit();
    }
  });
  r.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.task) return toggleTask(t.dataset.task);
    if (t.dataset.setting === 'startDate') {
      if (!t.value) return;
      const today = todayStr();
      if (t.value > today && S.settings.startDate <= today && !confirm(`Postpone the challenge to ${prettyDate(t.value)}? Until then, days are warm-ups with no penalties.`)) {
        t.value = S.settings.startDate;
        return;
      }
      return setStartDate(t.value);
    }
    if (t.dataset.setting === 'dailyHours' || t.dataset.setting === 'minTasks') {
      S.settings[t.dataset.setting] = Number(t.value);
      return commit();
    }
    if (t.dataset.act === 'import' && t.files[0]) {
      t.files[0].text().then((txt) => {
        try {
          const json = JSON.parse(txt);
          if (json.version == null || !json.honor) throw new Error('Not a roadmap progress file');
          replaceState(json);
          processDays();
          commit();
        } catch (err) {
          alert(`Import failed: ${err.message}`);
        }
      });
    }
  });
  r.addEventListener('input', (e) => {
    if (e.target.dataset.setting === 'dailyHours') document.getElementById('hours-out').textContent = `${e.target.value}h / day`;
    if (e.target.dataset.setting === 'minTasks') document.getElementById('min-out').textContent = `${e.target.value} task${e.target.value > 1 ? 's' : ''}`;
  });
  r.addEventListener('submit', (e) => {
    e.preventDefault();
    const inp = document.getElementById('new-task');
    const text = inp.value;
    inp.value = '';
    addCustom(text);
    document.getElementById('new-task')?.focus();
  });
  setInterval(tick, 30000);
}

