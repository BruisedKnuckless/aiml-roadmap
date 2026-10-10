# 03 · Architecture

Vanilla HTML/CSS/JS (ES modules) + a zero-dependency Node server. No build step, no frameworks, no npm packages.

## Folder layout

```
<topic>-roadmap/
├── server.js                 # Node http server: static files + /api/progress
├── package.json              # "start": "node server.js", "check-links": "node scripts/check-links.js"
├── start.command             # macOS double-click launcher (chmod +x)
├── start.bat                 # Windows double-click launcher (CRLF line endings)
├── README.md                 # setup + honor rules for friends
├── .gitignore                # /data/  node_modules/  .DS_Store  *.tmp   ← note the leading slash!
├── scripts/
│   └── check-links.js        # verifies every resource + alternative URL
├── data/                     # created at runtime, git-ignored
│   ├── progress.json
│   └── backups/progress-YYYY-MM-DD.json
└── public/
    ├── index.html            # shell: top bar + honor meter SVGs, sidebar, viewport, drawer, toasts, welcome sheet, palette
    ├── css/styles.css        # whole design system
    └── js/
        ├── app.js            # bootstrap, theme, top bar, search palette, shortcuts, day watcher, onboarding
        ├── store.js          # state S, load/save/migrate, event bus, export
        ├── model.js          # derived curriculum (items, hours), selectors, date helpers
        ├── plan.js           # daily plans, rollover/evaluation, all progress actions, start date
        ├── honor.js          # rules, award/reverse/adjust, ranks, meter render, toasts
        ├── graph.js          # layout, SVG edges, nodes, pan/zoom, phase rail
        ├── drawer.js         # node detail drawer (6 tabs)
        ├── panels.js         # sidebar tabs: Today, Path, Stats, Settings
        └── data/             # ← THE ONLY TOPIC-SPECIFIC CODE
            ├── phases.js         # window.ROADMAP_PHASES, window.ROADMAP_NODES = [], window.r()
            ├── nodes-*.js        # ROADMAP_NODES.push({...}, ...) — split into 3–4 files by phase
            └── alternatives.js   # window.ROADMAP_ALTERNATIVES = { nodeId: [r(...), ...] }
```

`index.html` loads the data files as classic scripts **in order** (`phases.js` first, `alternatives.js` last), then `js/app.js` as a module. If you change the number/names of `nodes-*.js` files, update both `index.html` and the file list at the top of `scripts/check-links.js`.

## Curriculum data format

```js
// phases.js
window.ROADMAP_PHASES = [
  { id: 0, title: 'Setup & Programming', tag: 'Foundations', color: '#007aff' },
  // … one per phase, ids 0..N-1, colours from 02-DESIGN-SYSTEM.md
];
window.ROADMAP_NODES = [];
window.r = (title, url, type, note) => ({ title, url, type, note: note || '' });
// types: video | course | book | docs | practice | article | tool

// nodes-xxx.js
ROADMAP_NODES.push({
  id: 'kebab-id',            // unique, stable forever (progress is keyed by it)
  phase: 0,                  // phase id
  title: 'Short Title',
  hours: 25,                 // realistic total study hours incl. project
  prereqs: ['other-id'],     // must reference nodes in the same or earlier phase; no cycles
  summary: '1–2 sentences: what this node covers.',
  why: '1–2 sentences: why it matters for the career.',
  subtopics: ['4–6', 'short', 'chips'],
  guide: ['Ordered study step 1 naming the exact resource + sections', '…'],          // 4–6 steps
  resources: [r('Title', 'https://…', 'course', 'optional note'), …],                // 4–7, all free
  checklist: ['Concrete task (45–120 min)', …],                                        // 6–12
  project: 'One build-it deliverable with clear scope.',
  mastery: ['Self-test question?', '…', '…'],                                           // 3
});

// alternatives.js
window.ROADMAP_ALTERNATIVES = { 'kebab-id': [r(...), r(...)], … };  // 2–4 per node
```

Checklist item ids are derived: `${node.id}.01`, `.02`, … and `${node.id}.project`. **Never reorder or insert items in the middle of a published checklist** — progress is stored by these ids. Append new items at the end.

## Progress state (`data/progress.json`)

```jsonc
{
  "version": 1,
  "createdAt": "ISO",
  "settings": {
    "dailyHours": 5, "restDays": [0..6], "minTasks": 2,
    "theme": "auto|light|dark", "onboarded": true,
    "startDate": "YYYY-MM-DD", "focus": "node-id|null"
  },
  "honor": { "value": 50, "history": [{ "t": "ISO", "d": 1.5, "r": "reason", "v": 51.5 }] },  // capped at 3000
  "awards": { "item:<itemId>": 1.5, "node:<id>": 5, "task:<taskId>": 1.5,
              "allDone:<date>": 2, "minimum:<date>": 0.5 },   // exact amounts, for reversal
  "checklist": { "<itemId>": "ISO completed" },
  "nodes": { "<id>": { "notes": "…" } },
  "days": {
    "YYYY-MM-DD": {
      "tasks": [
        { "id": "rand", "kind": "checklist", "ref": "<itemId>", "extra?": true, "warmupExtra?": true },
        { "id": "rand", "kind": "session", "ref": "<nodeId>", "hours": 3, "done": false },
        { "id": "rand", "kind": "custom", "text": "…", "done": false, "carried?": true }
      ],
      "rest": false, "warmup?": true, "evaluated": false,
      "log": ["<itemId>", "task:<taskId>"],          // completions made ON this day
      "verdict?": { "done": 3, "total": 5, "completions": 3, "keptMinimum": true, "delta": 0 },
      "createdAt": "ISO"
    }
  },
  "lastProcessed": "YYYY-MM-DD",
  "streak": { "current": 0, "best": 0 }
}
```

`migrate()` fills missing keys from `defaultState()`; files that predate `onboarded` are treated as onboarded.

## Key algorithms (see source for exact code)

**Layout (`graph.js`)** — constants `NW=232 NH=70 GX=40 RH=116 BAND_TOP=78 BAND_BOTTOM=34 BAND_GAP=18 MARGIN=90`.
For each phase: depth(n) = 0 if no same-phase prereqs else 1 + max(depth(prereq in same phase)); group by depth into rows; order each row by mean x of already-placed prereqs; centre rows on the world's centre line. World width = max(1100, widest row). Zoom range 0.15–1.8; transform `translate(x,y) scale(k)` on `#world`; the viewport's own scroll is forced to 0 (focus would otherwise scroll it).

**Task picking (`plan.js › pickTasks`)** — active nodes = not mastered with all prereqs mastered (fallback: first unmastered); focused node first; take first 2; round-robin their unfinished items; add while `hours + item.hours ≤ 1.15 × budget` (first task always added); project → session of `min(3h, project hours, max(1, remaining))`; max 10 tasks.

**Rollover (`processDays` / `evaluateDay`)** — for each date in `[lastProcessed, today)`:
warm-up → mark evaluated, nothing else · no plan & non-rest → −6 + reset streak · otherwise, if completions ≥ min(minTasks, required count) → no penalty; else if 0 completions → −6; else −2 per unfinished required task capped at −6 · perfect → streak++ (+3 every 7) · non-rest & not minimum → streak = 0 · store verdict.

**Honor (`honor.js`)** — `adjust(raw)` for one-off changes, `award(key, raw)` / `reverse(key)` for reversible ones; scaling by distance from 50 (see spec); history + toast queue on every change.

**Day goals (`checkDayGoals`)** — after every toggle: award/reverse `minimum:<date>` and `allDone:<date>`.

## Server API (`server.js`)
- `GET /api/progress` → file contents, or `null` if missing.
- `PUT|POST /api/progress` → JSON body (must have `version`), ≤ 20 MB; backup first write of the day; write `progress.json.tmp` then rename.
- Everything else → static file from `public/` (path-traversal guarded), `Cache-Control: no-store`.
- Binds `127.0.0.1:${PORT || <default>}`; on `EADDRINUSE` prints "already running" and exits.

## Events & rendering
`store.commit()` = save + dispatch `change` on `bus` → `app.renderAll()` re-renders theme, meter, top bar, graph statuses, sidebar, drawer. Renders preserve focus in the add-task input and notes textarea and keep drawer scroll position.
