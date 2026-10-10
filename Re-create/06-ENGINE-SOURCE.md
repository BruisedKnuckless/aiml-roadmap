# 06 · Engine source (verbatim)

This is the complete source of the engine, identical to the files in `template/`. **If you can use the `template/` folder directly, do that** — this file exists for chats where uploading a folder is awkward.

Recreate every file below byte-for-byte at the path shown. Only the items in `05-BUILD-AND-VERIFY.md → Rename checklist` may change, plus `public/js/data/*` (placeholder curriculum — replace it).

Notes: `start.command` must be executable (`chmod +x start.command`). `start.bat` must be saved with Windows (CRLF) line endings.

## Files

- `server.js`
- `package.json`
- `start.command`
- `start.bat`
- `.gitignore`
- `README.md`
- `scripts/check-links.js`
- `public/index.html`
- `public/css/styles.css`
- `public/js/store.js`
- `public/js/model.js`
- `public/js/honor.js`
- `public/js/plan.js`
- `public/js/graph.js`
- `public/js/drawer.js`
- `public/js/panels.js`
- `public/js/app.js`
- `public/js/data/phases.js`
- `public/js/data/nodes-foundations.js`
- `public/js/data/nodes-core.js`
- `public/js/data/nodes-advanced.js`
- `public/js/data/alternatives.js`


---

## `server.js`

````js
// Zero-dependency local server for The Long Road roadmap app.
// Serves ./public and persists progress to ./data/progress.json
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT) || 4747;
const HOST = '127.0.0.1';
const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');
const DATA_DIR = path.join(ROOT, 'data');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const PROGRESS = path.join(DATA_DIR, 'progress.json');
const MAX_BACKUPS = 30;
const MAX_BODY = 20 * 1024 * 1024;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
};

fs.mkdirSync(BACKUP_DIR, { recursive: true });

function localDate(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function backupIfNeeded() {
  if (!fs.existsSync(PROGRESS)) return;
  const target = path.join(BACKUP_DIR, `progress-${localDate()}.json`);
  if (fs.existsSync(target)) return;
  fs.copyFileSync(PROGRESS, target);
  const files = fs.readdirSync(BACKUP_DIR).filter((f) => f.startsWith('progress-')).sort();
  while (files.length > MAX_BACKUPS) fs.unlinkSync(path.join(BACKUP_DIR, files.shift()));
}

function writeProgress(json) {
  backupIfNeeded();
  const tmp = PROGRESS + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(json, null, 2));
  fs.renameSync(tmp, PROGRESS);
}

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
}

function handleApi(req, res) {
  if (req.method === 'GET') {
    if (!fs.existsSync(PROGRESS)) return send(res, 200, 'null');
    return send(res, 200, fs.readFileSync(PROGRESS));
  }
  if (req.method === 'PUT' || req.method === 'POST') {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try {
        const json = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        if (!json || typeof json !== 'object' || json.version == null) throw new Error('invalid progress');
        writeProgress(json);
        send(res, 200, JSON.stringify({ ok: true, savedAt: new Date().toISOString() }));
      } catch (e) {
        send(res, 400, JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }
  send(res, 405, JSON.stringify({ error: 'method not allowed' }));
}

function handleStatic(req, res) {
  let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (urlPath === '/') urlPath = '/index.html';
  const file = path.normalize(path.join(PUBLIC, urlPath));
  if (!file.startsWith(PUBLIC)) return send(res, 403, 'forbidden', 'text/plain');
  fs.readFile(file, (err, data) => {
    if (err) return send(res, 404, 'not found', 'text/plain');
    send(res, 200, data, MIME[path.extname(file)] || 'application/octet-stream');
  });
}

http
  .createServer((req, res) => {
    if (req.url.startsWith('/api/progress')) return handleApi(req, res);
    handleStatic(req, res);
  })
  .listen(PORT, HOST, () => {
    console.log(`\n  Roadmap running at http://${HOST}:${PORT}`);
    console.log(`  Progress file: ${PROGRESS}\n  Press Ctrl+C to stop.\n`);
  })
  .on('error', (e) => {
    if (e.code === 'EADDRINUSE') console.log(`Port ${PORT} already in use — the app is probably already running: http://${HOST}:${PORT}`);
    else console.error(e);
    process.exit(1);
  });
````


---

## `package.json`

````json
{
  "name": "new-topic-roadmap",
  "version": "1.0.0",
  "private": true,
  "description": "Interactive zero-to-master learning roadmap with an honor meter",
  "scripts": {
    "start": "node server.js",
    "check-links": "node scripts/check-links.js"
  }
}
````


---

## `start.command`

````zsh
#!/bin/zsh
# Double-click to launch the roadmap (macOS)
cd "$(dirname "$0")"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH:$(ls -d /opt/homebrew/opt/node@*/bin 2>/dev/null | tr '\n' ':')"
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Download the LTS version from https://nodejs.org, install it, then double-click start.command again."
  read -k1 "?Press any key to close…"
  exit 1
fi
(sleep 1; open "http://127.0.0.1:4747") &
node server.js
````


---

## `start.bat`

````bat
@echo off
rem Double-click to launch the roadmap (Windows)
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Download the LTS version from https://nodejs.org, install it, then run start.bat again.
  pause
  exit /b 1
)
start "" cmd /c "timeout /t 2 >nul & start http://127.0.0.1:4747"
node server.js
pause
````


---

## `.gitignore`

````text
# Personal progress, notes and backups stay on each person's own machine
/data/
node_modules/
.DS_Store
*.tmp
````


---

## `README.md`

````markdown
# The Long Road — {{TOPIC}}, Zero → Master

An interactive, local study app that takes you from absolute zero to mastery in {{TOPIC}}:

- **{{NODE_COUNT}}-node roadmap** across {{PHASE_COUNT}} phases. Each node has a step-by-step guide, free resources (plus alternatives), a checklist, a capstone project, notes and self-test questions.
- **Daily plan**: tasks are auto-assigned each morning from where you are on the roadmap. You can add your own to-dos.
- **Honor meter** in the style of Red Dead Redemption 2. Everyone starts at 50. Finishing the day's tasks raises it; skipping days lowers it. A **daily minimum** (default 2 tasks) keeps busy days penalty-free.
- Progress is saved **only on your own computer**, in `data/progress.json`.

All {{LINK_COUNT}} resource links are free and were checked when this was published.

## Setup (one time)

1. Install **Node.js** (LTS) from <https://nodejs.org>.
2. Download this project: click the green **Code** button → **Download ZIP**, then unzip it. If you use git, you can clone it instead.

## Start the app

| Computer | How |
|---|---|
| **Mac** | Double-click `start.command`. The first time, macOS may block it: right-click → **Open** → **Open**. |
| **Windows** | Double-click `start.bat`. |
| **Any** | In a terminal inside the folder, run `node server.js`, then open <http://127.0.0.1:{{PORT}}>. |

Keep the terminal window open while you use the app. Close it (or press `Ctrl+C`) to stop.

> Opening `public/index.html` directly will **not** work. The app needs its small local server to save your progress.

## How honor works

| Event | Honor |
|---|---|
| Finish a task assigned for today | +1.5 |
| Finish any other checklist item | +0.5 |
| Finish the whole day's plan | +2 (and your streak grows) |
| Hit the daily minimum only | +0.5, no penalties that day |
| Master a node | +5 |
| Every 7-day perfect streak | +3 |
| Each unfinished task at midnight, if under the minimum | −2 (max −6 per day) |
| A day with nothing done, or the app never opened | −6 |

Your first day is a warm-up: nothing counts against you. Rest days can be set in **Settings**. Gains slow down near 100 and losses slow down near 0.

## Your data

- Progress: `data/progress.json`, saved automatically.
- Backups: `data/backups/`, one per day, last 30 kept.
- Export or import a backup: **Settings** tab.

`data/` is ignored by git, so your progress is never uploaded.

## Updating the curriculum

The roadmap lives in `public/js/data/`. After editing it, run `npm run check-links` to verify every resource URL still works.

---

The honor badges are original artwork inspired by Red Dead Redemption 2. This is a fan-made study tool and is not affiliated with Rockstar Games.
````


---

## `scripts/check-links.js`

````js
// Verifies every resource URL in the roadmap responds. Usage: node scripts/check-links.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dataDir = path.join(__dirname, '..', 'public', 'js', 'data');
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ['phases.js', 'nodes-foundations.js', 'nodes-core.js', 'nodes-advanced.js', 'alternatives.js']) {
  // Data files reference globals both as window.X and bare X
  const src = fs.readFileSync(path.join(dataDir, f), 'utf8');
  vm.runInContext(src + '\n;Object.assign(this, window);', ctx);
}
const nodes = ctx.window.ROADMAP_NODES;
const links = [];
const alts = ctx.window.ROADMAP_ALTERNATIVES || {};
for (const n of nodes) for (const res of n.resources) links.push({ node: n.id, ...res });
for (const [id, list] of Object.entries(alts)) {
  if (!nodes.some((n) => n.id === id)) console.log(`Unknown node in alternatives.js: ${id}`);
  for (const res of list) links.push({ node: `${id} (alt)`, ...res });
}
const unique = [...new Map(links.map((l) => [l.url, l])).values()];

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36';

async function check(url) {
  // YouTube always returns 200, so use oEmbed to verify videos/playlists exist
  const isYT = /youtube\.com\/(watch|playlist)/.test(url);
  const target = isYT ? `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}` : url;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 20000);
  try {
    const res = await fetch(target, { redirect: 'follow', signal: ctrl.signal, headers: { 'User-Agent': UA, Accept: 'text/html,*/*' } });
    // oEmbed 401 = video exists but embedding is disabled
    if (isYT && res.status === 401) return { status: 200, final: url };
    const title = isYT && res.ok ? (await res.json()).title : undefined;
    return { status: res.status, final: res.url, title };
  } catch (e) {
    return { status: 0, error: e.cause?.code || e.name };
  } finally {
    clearTimeout(t);
  }
}

(async () => {
  const results = [];
  const queue = [...unique];
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const l = queue.shift();
      results.push({ ...l, ...(await check(l.url)) });
    }
  }));
  // 403/429 are usually bot protection (Coursera, Kaggle, Medium) rather than dead links
  const bad = results.filter((r) => r.status === 0 || (r.status >= 400 && ![403, 429].includes(r.status)));
  const soft = results.filter((r) => [403, 429].includes(r.status));
  // --titles: show what each YouTube link actually points to, to catch right-ID-wrong-video mistakes
  if (process.argv.includes('--titles')) for (const r of results.filter((r) => r.title)) console.log(`  ${r.title.padEnd(60)} ← listed as "${r.title === undefined ? '' : r.node + ': ' + links.find((l) => l.url === r.url).title}"`);
  console.log(`Checked ${results.length} unique URLs across ${nodes.length} nodes.`);
  if (soft.length) console.log(`\nBlocked by bot protection (verify manually):\n` + soft.map((r) => `  ${r.status}  ${r.url}`).join('\n'));
  if (bad.length) {
    console.log(`\nBROKEN:\n` + bad.map((r) => `  ${r.status || r.error}  [${r.node}] ${r.url}`).join('\n'));
    process.exit(1);
  }
  console.log('\nAll links OK.');
})();
````


---

## `public/index.html`

````html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>The Long Road — {{TOPIC}} Roadmap</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='13' fill='none' stroke='%23007aff' stroke-width='3'/><circle cx='16' cy='16' r='4' fill='%23007aff'/></svg>">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header id="topbar">
    <div class="brand">
      <button id="btn-sidebar" class="icon-btn" aria-label="Toggle sidebar">
        <svg viewBox="0 0 20 20"><path d="M3 5h14M3 10h14M3 15h14"/></svg>
      </button>
      <div>
        <div class="brand-title">The Long Road</div>
        <div class="brand-sub">{{TOPIC}} · Zero → Master</div>
      </div>
    </div>

    <div id="honor" class="honor" role="meter" aria-label="Honor" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
      <!-- Brush-stroke roughness for the RDR2-style frame and badge -->
      <svg class="rdr-defs" width="0" height="0" aria-hidden="true">
        <filter id="rdr-rough" x="-10%" y="-30%" width="120%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4.5" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
        <filter id="rdr-grain">
          <feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="1" seed="3" result="g"/>
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.25" result="mask"/>
          <feComposite in="SourceGraphic" in2="mask" operator="in"/>
        </filter>
      </svg>
      <div class="rdr-meter">
        <div class="rdr-frame"></div>
        <div class="rdr-bar"></div>
        <div class="rdr-track">
          <div class="rdr-badge">
            <div class="rdr-badge-bg"></div>
            <svg class="rdr-icon good" viewBox="0 0 64 64" aria-hidden="true">
              <!-- Honorable: a coder in a hoodie behind a laptop -->
              <g filter="url(#rdr-grain)" fill="#e2e2df">
                <path d="M20.5 24c0-11 5-17 11.5-17s11.5 6 11.5 17c0 5-2 8.5-5 10h-13c-3-1.5-5-5-5-10z"/>
                <path d="M9 56c1-11.5 8-17.5 16-19l7 3.5 7-3.5c8 1.5 15 7.5 16 19z"/>
              </g>
              <g fill="#0b0b0b">
                <ellipse cx="32" cy="22.5" rx="8.6" ry="10"/>
              </g>
              <g filter="url(#rdr-grain)" fill="#e2e2df">
                <ellipse cx="32" cy="23.5" rx="7" ry="8.3"/>
              </g>
              <g fill="#0b0b0b">
                <rect x="25.6" y="20.4" width="5.4" height="3.6" rx="1.2"/>
                <rect x="33" y="20.4" width="5.4" height="3.6" rx="1.2"/>
                <rect x="30.6" y="21.4" width="2.8" height="1"/>
                <path d="M29.6 38.5v6M34.4 38.5v6" stroke="#0b0b0b" stroke-width="1.2"/>
                <rect x="12.5" y="38.5" width="39" height="19" rx="2.5"/>
                <rect x="7.5" y="56.8" width="49" height="5.6" rx="2"/>
              </g>
              <g filter="url(#rdr-grain)" fill="#e2e2df">
                <rect x="14.5" y="40.5" width="35" height="15" rx="1.5"/>
                <rect x="9" y="58.2" width="46" height="2.8" rx="1.2"/>
              </g>
              <g fill="none" stroke="#0b0b0b" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                <path d="M26.8 44.8 23.4 48l3.4 3.2M37.2 44.8l3.4 3.2-3.4 3.2M33.4 43.8l-2.8 8.4"/>
              </g>
            </svg>
            <svg class="rdr-icon bad" viewBox="0 0 64 64" aria-hidden="true">
              <!-- Dishonorable: a skull-faced coder in a red hoodie -->
              <g fill="none" stroke="#b5303a" stroke-width="1.9" stroke-linejoin="round">
                <path d="M20.5 24c0-11 5-17 11.5-17s11.5 6 11.5 17c0 5-2 8.5-5 10h-13c-3-1.5-5-5-5-10z"/>
                <path d="M9 56c1-11.5 8-17.5 16-19l7 3.5 7-3.5c8 1.5 15 7.5 16 19"/>
              </g>
              <g fill="#b5303a">
                <path d="M24.8 22.2c0-5 3.2-8.4 7.2-8.4s7.2 3.4 7.2 8.4c0 3-1.2 5.3-3.1 6.5l-.4 3H28.3l-.4-3c-1.9-1.2-3.1-3.5-3.1-6.5z"/>
                <rect x="12.5" y="38.5" width="39" height="19" rx="2.5"/>
                <rect x="7.5" y="57.6" width="49" height="3.8" rx="1.6"/>
              </g>
              <g fill="#0b0b0b">
                <circle cx="29" cy="22.4" r="2.6"/>
                <circle cx="35" cy="22.4" r="2.6"/>
                <path d="M32 25.4l-1.4 2.6h2.8z"/>
                <path d="M29.4 29.6h1v1.8h-1zM31.5 29.6h1v1.8h-1zM33.6 29.6h1v1.8h-1z"/>
              </g>
              <g fill="none" stroke="#0b0b0b" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
                <path d="M26.8 44.8 23.4 48l3.4 3.2M37.2 44.8l3.4 3.2-3.4 3.2M33.4 43.8l-2.8 8.4"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <span class="sr-only"><span class="honor-rank">Neutral</span> <span class="honor-value">50.0</span></span>
    </div>

    <div class="top-right">
      <button id="btn-search" class="search-btn"><svg viewBox="0 0 20 20"><circle cx="9" cy="9" r="5.5"/><path d="M13 13l4 4"/></svg><span>Search</span><kbd>⌘K</kbd></button>
      <div class="top-stat" title="Overall progress"><b id="overall-pct">0%</b><span>complete</span></div>
      <div class="top-stat" title="Consecutive days with every allotted task done"><b id="streak">0</b><span>streak</span></div>
      <span id="save-status" class="save-status" data-state="saving">Loading…</span>
    </div>
  </header>

  <div id="layout">
    <aside id="sidebar">
      <nav class="side-tabs segmented">
        <button class="side-tab active" data-side="today">Today</button>
        <button class="side-tab" data-side="path">Path</button>
        <button class="side-tab" data-side="stats">Stats</button>
        <button class="side-tab" data-side="settings">Settings</button>
      </nav>
      <div class="side-body"></div>
    </aside>

    <main id="viewport">
      <div id="world"></div>
      <nav id="phase-rail" aria-label="Jump to phase"></nav>
      <div class="graph-controls">
        <button id="zoom-out" class="icon-btn" title="Zoom out (−)">−</button>
        <span id="zoom-level">100%</span>
        <button id="zoom-in" class="icon-btn" title="Zoom in (+)">+</button>
        <button id="zoom-fit" class="icon-btn" title="Show whole map (0)">
          <svg viewBox="0 0 20 20"><path d="M3 7V3h4M13 3h4v4M17 13v4h-4M7 17H3v-4"/></svg>
        </button>
        <button id="btn-continue" class="btn primary small" title="Jump to where you are (C)">Continue ↓</button>
      </div>
      <div class="legend">
        <span><i class="lg locked"></i>Locked</span>
        <span><i class="lg available"></i>Ready</span>
        <span><i class="lg progress"></i>In progress</span>
        <span><i class="lg done"></i>Mastered</span>
        <span class="hint">Drag to pan · ⌘+scroll to zoom · click a node</span>
      </div>
    </main>
    <aside id="drawer" aria-label="Node details"></aside>
  </div>

  <div id="toasts" aria-live="polite"></div>
  <div id="welcome" class="welcome" hidden></div>

  <div id="onboard" hidden>
    <div class="onboard-card" role="dialog" aria-modal="true" aria-labelledby="onboard-title">
      <div class="kicker">Welcome to The Long Road</div>
      <h2 id="onboard-title">When do you want to start?</h2>
      <p class="muted">Each day you get a short plan of study tasks. Finish them and your honor rises; skip days and it falls. Before your start date, days are warm-ups: tasks are optional and nothing costs honor.</p>
      <div class="onboard-options" role="radiogroup">
        <label class="onboard-option"><input type="radio" name="start" value="today"><span><b>Today</b><small>Today's tasks count right away.</small></span></label>
        <label class="onboard-option"><input type="radio" name="start" value="tomorrow" checked><span><b>Tomorrow <em>Recommended</em></b><small>Use today to look around and settle in.</small></span></label>
        <label class="onboard-option"><input type="radio" name="start" value="pick"><span><b>Pick a date</b><small><input type="date" id="onboard-date"></small></span></label>
      </div>
      <button class="btn primary onboard-go" id="onboard-go">Start the journey</button>
      <p class="onboard-foot">You can change this anytime in <b>Settings → Challenge start</b>.</p>
    </div>
  </div>

  <div id="palette" hidden>
    <div class="palette-card">
      <input placeholder="Search nodes, tasks, resources…" autocomplete="off" spellcheck="false">
      <ul></ul>
      <div class="palette-foot"><kbd>↑</kbd><kbd>↓</kbd> move · <kbd>↵</kbd> open · <kbd>esc</kbd> close</div>
    </div>
  </div>

  <script src="js/data/phases.js"></script>
  <script src="js/data/nodes-foundations.js"></script>
  <script src="js/data/nodes-core.js"></script>
  <script src="js/data/nodes-advanced.js"></script>
  <script src="js/data/alternatives.js"></script>
  <script type="module" src="js/app.js"></script>
</body>
</html>
````


---

## `public/css/styles.css`

````css
/* ─────────────────────────────────────────────
   Apple-inspired theme: calm neutrals, system font, soft depth.
   Light by default, dark follows macOS (or Settings → Appearance).
   ───────────────────────────────────────────── */
:root {
  --bg: #f5f5f7;
  --surface: #ffffff;
  --surface-2: #fbfbfd;
  --fill: #e8e8ed;
  --fill-2: #f2f2f5;
  --line: rgba(0, 0, 0, .08);
  --line-strong: rgba(0, 0, 0, .14);
  --text: #1d1d1f;
  --text-2: #6e6e73;
  --text-3: #86868b;
  --accent: #0071e3;
  --accent-hover: #0077ed;
  --link: #0066cc;
  --accent-soft: rgba(0, 113, 227, .1);
  --good: #34c759;
  --good-text: #248a3d;
  --good-soft: rgba(52, 199, 89, .12);
  --bad: #ff3b30;
  --bad-text: #d70015;
  --bad-soft: rgba(255, 59, 48, .1);
  --info-soft: rgba(0, 113, 227, .08);
  --glass: rgba(255, 255, 255, .72);
  --glass-border: rgba(0, 0, 0, .06);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, .04), 0 2px 8px rgba(0, 0, 0, .04);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, .06), 0 12px 40px rgba(0, 0, 0, .08);
  --shadow-lg: 0 20px 70px rgba(0, 0, 0, .18);
  --thumb: #ffffff;
  --edge: #d2d2d7;

  --font: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --top: 56px;
  --side: 352px;
  --radius: 14px;
  --ease: cubic-bezier(.25, .1, .25, 1);
  color-scheme: light;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #000000; --surface: #1c1c1e; --surface-2: #232325; --fill: #2c2c2e; --fill-2: #242426;
    --line: rgba(255, 255, 255, .1); --line-strong: rgba(255, 255, 255, .18);
    --text: #f5f5f7; --text-2: #a1a1a6; --text-3: #7c7c80;
    --accent: #0a84ff; --accent-hover: #409cff; --link: #2997ff; --accent-soft: rgba(10, 132, 255, .18);
    --good: #30d158; --good-text: #30d158; --good-soft: rgba(48, 209, 88, .16);
    --bad: #ff453a; --bad-text: #ff6961; --bad-soft: rgba(255, 69, 58, .16); --info-soft: rgba(10, 132, 255, .14);
    --glass: rgba(28, 28, 30, .72); --glass-border: rgba(255, 255, 255, .08);
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, .3); --shadow-md: 0 8px 30px rgba(0, 0, 0, .45); --shadow-lg: 0 20px 70px rgba(0, 0, 0, .6);
    --thumb: #f5f5f7; --edge: #3a3a3c;
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: #000000; --surface: #1c1c1e; --surface-2: #232325; --fill: #2c2c2e; --fill-2: #242426;
  --line: rgba(255, 255, 255, .1); --line-strong: rgba(255, 255, 255, .18);
  --text: #f5f5f7; --text-2: #a1a1a6; --text-3: #7c7c80;
  --accent: #0a84ff; --accent-hover: #409cff; --link: #2997ff; --accent-soft: rgba(10, 132, 255, .18);
  --good: #30d158; --good-text: #30d158; --good-soft: rgba(48, 209, 88, .16);
  --bad: #ff453a; --bad-text: #ff6961; --bad-soft: rgba(255, 69, 58, .16); --info-soft: rgba(10, 132, 255, .14);
  --glass: rgba(28, 28, 30, .72); --glass-border: rgba(255, 255, 255, .08);
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, .3); --shadow-md: 0 8px 30px rgba(0, 0, 0, .45); --shadow-lg: 0 20px 70px rgba(0, 0, 0, .6);
  --thumb: #f5f5f7; --edge: #3a3a3c;
  color-scheme: dark;
}

* { box-sizing: border-box; }
html, body { height: 100%; margin: 0; }
body {
  background: var(--bg);
  color: var(--text);
  font: 400 14px/1.47 var(--font);
  letter-spacing: -.01em;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}
button, input, textarea { font-family: var(--font); color: inherit; letter-spacing: inherit; }
a { color: var(--link); text-decoration: none; }
a:hover { text-decoration: underline; }
b, strong { font-weight: 600; }
code { font: 500 12px ui-monospace, 'SF Mono', Menlo, monospace; background: var(--fill-2); padding: 1px 6px; border-radius: 5px; }
kbd { font: 500 11px var(--font); background: var(--fill-2); border: 1px solid var(--line); border-radius: 5px; padding: 1px 5px; color: var(--text-2); }
h4 { font: 600 13px/1.3 var(--font); color: var(--text); margin: 28px 0 10px; letter-spacing: -.01em; }
.muted { color: var(--text-2); }
.kicker { font-size: 12px; font-weight: 600; color: var(--text-3); }
:focus-visible { outline: 3px solid var(--accent-soft); outline-offset: 1px; }

/* ── buttons ── */
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--fill); border: 0; border-radius: 980px;
  padding: 7px 15px; cursor: pointer; font-size: 13px; font-weight: 500; color: var(--text);
  transition: background .2s var(--ease), transform .1s;
}
.btn:hover { background: var(--line-strong); }
.btn:active { transform: scale(.98); }
.btn.primary { background: var(--accent); color: #fff; }
.btn.primary:hover { background: var(--accent-hover); }
.btn.ghost { background: transparent; color: var(--link); padding-left: 8px; padding-right: 8px; }
.btn.ghost:hover { text-decoration: underline; }
.btn.danger { background: var(--bad-soft); color: var(--bad-text); }
.btn.small { padding: 6px 13px; font-size: 12.5px; }
.icon-btn {
  width: 32px; height: 32px; display: inline-grid; place-items: center;
  background: transparent; border: 0; border-radius: 50%; cursor: pointer; color: var(--text-2); transition: background .2s;
}
.icon-btn:hover { background: var(--fill); color: var(--text); }
.icon-btn svg, .search-btn svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; }
.mini { background: var(--fill-2); border: 0; border-radius: 980px; font-size: 11.5px; font-weight: 500; padding: 3px 9px; cursor: pointer; color: var(--link); white-space: nowrap; }
.mini:hover { background: var(--accent-soft); }
.tag { font-size: 11px; font-weight: 600; color: var(--accent); background: var(--accent-soft); border-radius: 980px; padding: 2px 8px; white-space: nowrap; }
.tag.warn { color: #c93400; background: rgba(255, 149, 0, .14); }
.actions-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }

.segmented { display: flex; background: var(--fill); border-radius: 9px; padding: 2px; gap: 0; }
.segmented button {
  flex: 1; border: 0; background: transparent; border-radius: 7px; padding: 6px 4px; font-size: 13px; font-weight: 500;
  color: var(--text); cursor: pointer; transition: background .2s var(--ease), box-shadow .2s;
}
.segmented button:hover { color: var(--text); }
.segmented button.on, .segmented button.active { background: var(--surface); box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 1px rgba(0, 0, 0, .04); }

.progress { height: 6px; background: var(--fill); border-radius: 99px; overflow: hidden; }
.progress span { display: block; height: 100%; background: var(--accent); border-radius: inherit; transition: width .6s var(--ease); }
.progress.thin { height: 4px; }
.progress.has-marker { position: relative; overflow: visible; }
.progress.has-marker span { border-radius: 99px; }
.progress.has-marker[style*="--min"]::after { content: ''; position: absolute; left: var(--min); top: -3px; bottom: -3px; width: 2px; margin-left: -1px; background: var(--text-3); border-radius: 2px; }
.minimum { display: flex; align-items: center; gap: 8px; margin-top: 10px; font-size: 12.5px; color: var(--text-2); }
.minimum b { color: var(--text); }
.minimum.kept b { color: var(--good-text); }
.pips { display: flex; gap: 4px; }
.pips i { width: 8px; height: 8px; border-radius: 50%; background: var(--fill); }
.pips i.on { background: var(--text-2); }
.minimum.kept .pips i.on { background: var(--good); }

/* ── top bar (frosted) ── */
#topbar {
  position: fixed; inset: 0 0 auto 0; height: var(--top); z-index: 40;
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 16px; padding: 0 14px;
  background: var(--glass); backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid var(--glass-border);
}
.brand { display: flex; align-items: center; gap: 8px; min-width: 0; }
.brand-title { font-size: 15px; font-weight: 600; letter-spacing: -.02em; line-height: 1.15; }
.brand-sub { font-size: 11.5px; color: var(--text-3); }
.top-right { display: flex; justify-content: flex-end; align-items: center; gap: 18px; min-width: 0; }
.search-btn {
  display: flex; align-items: center; gap: 8px; background: var(--fill); border: 0;
  border-radius: 980px; padding: 6px 8px 6px 12px; color: var(--text-2); cursor: pointer; font-size: 13px;
}
.search-btn:hover { color: var(--text); }
.search-btn kbd { background: var(--surface); border: 0; }
.top-stat { display: flex; flex-direction: column; align-items: center; line-height: 1.15; }
.top-stat b { font-size: 15px; font-weight: 600; font-variant-numeric: tabular-nums; }
.top-stat span { font-size: 10.5px; color: var(--text-3); }
.save-status { font-size: 11.5px; color: var(--text-3); min-width: 60px; text-align: right; }
.save-status::before { content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 50%; margin-right: 6px; vertical-align: 1px; background: var(--good); }
.save-status[data-state="saving"]::before { background: #ff9500; }
.save-status[data-state="offline"] { color: var(--bad-text); }
.save-status[data-state="offline"]::before { background: var(--bad); }

/* ── honor meter (Red Dead Redemption 2 style) ── */
.honor { --honor: 50; cursor: pointer; padding: 4px 6px; }
.rdr-defs { position: absolute; }
.rdr-meter { position: relative; width: clamp(260px, 32vw, 460px); height: 52px; }
/* rough black brush-stroke plate behind the bar */
.rdr-frame {
  position: absolute; left: 0; right: 0; top: 50%; height: 28px; margin-top: -14px;
  background: #0a0a0a; border-radius: 3px; filter: url(#rdr-rough);
  box-shadow: 0 0 0 2px #0a0a0a;
}
/* red → grey → white, always fully drawn like the in-game meter */
.rdr-bar {
  position: absolute; left: 12px; right: 12px; top: 50%; height: 13px; margin-top: -6.5px;
  background: linear-gradient(90deg, #c1434b 0%, #ad464c 18%, #7d4a4d 38%, #5a5658 50%, #747776 60%, #a8aaa9 80%, #e3e4e3 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), inset 0 -1px 0 rgba(0, 0, 0, .35);
}
.rdr-track { position: absolute; left: 12px; right: 12px; top: 0; bottom: 0; }
.rdr-badge {
  position: absolute; top: 50%; left: calc(var(--honor) * 1%); width: 52px; height: 52px; margin: -26px 0 0 -26px;
  transition: left .9s cubic-bezier(.25, .1, .25, 1);
}
.rdr-badge-bg { position: absolute; inset: 0; border-radius: 50%; background: #0a0a0a; filter: url(#rdr-rough); }
.rdr-icon { position: absolute; inset: 1px; width: 50px; height: 50px; border-radius: 50%; overflow: hidden; transition: opacity .5s; }
.rdr-icon.bad { opacity: 0; }
.honor[data-side="bad"] .rdr-icon.good { opacity: 0; }
.honor[data-side="bad"] .rdr-icon.bad { opacity: 1; }
.honor.pulse-up .rdr-badge { animation: rdrPop .6s ease; }
.honor.pulse-down .rdr-badge { animation: rdrPop .6s ease; }
@keyframes rdrPop { 40% { transform: scale(1.12); } }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

/* toasts — notification style */
#toasts { position: fixed; top: calc(var(--top) + 12px); left: 50%; transform: translateX(-50%); z-index: 60; display: flex; flex-direction: column; gap: 8px; pointer-events: none; width: min(380px, 92vw); }
.toast {
  background: var(--glass); backdrop-filter: saturate(180%) blur(24px); -webkit-backdrop-filter: saturate(180%) blur(24px);
  border: 1px solid var(--glass-border); border-radius: 18px; padding: 12px 16px; box-shadow: var(--shadow-md);
  animation: toastIn .45s var(--ease);
}
.toast.out { opacity: 0; transform: translateY(-10px) scale(.98); transition: .45s var(--ease); }
.toast-head { font-size: 13.5px; font-weight: 600; display: flex; align-items: center; gap: 9px; }
.toast-icon { width: 20px; height: 20px; border-radius: 50%; display: grid; place-items: center; font-size: 9px; color: #fff; background: var(--good); }
.toast.down .toast-icon { background: var(--bad); }
.toast ul { list-style: none; margin: 6px 0 0 29px; padding: 0; font-size: 12.5px; color: var(--text-2); }
.toast li b { font-weight: 600; color: var(--good-text); margin-right: 4px; font-variant-numeric: tabular-nums; }
.toast.down li b { color: var(--bad-text); }
@keyframes toastIn { from { opacity: 0; transform: translateY(-14px) scale(.97); } }

.welcome {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 55;
  background: var(--glass); backdrop-filter: saturate(180%) blur(24px); -webkit-backdrop-filter: saturate(180%) blur(24px);
  border: 1px solid var(--glass-border); border-radius: 16px; padding: 12px 18px; box-shadow: var(--shadow-md); font-size: 13.5px;
}
.welcome b { color: var(--bad-text); }

/* ── layout ── */
#layout { position: fixed; inset: var(--top) 0 0 0; display: flex; }
#sidebar { width: var(--side); flex: none; display: flex; flex-direction: column; background: var(--surface); border-right: 1px solid var(--line); transition: margin-left .35s var(--ease); z-index: 20; }
body.side-collapsed #sidebar { margin-left: calc(-1 * var(--side)); }
.side-tabs { margin: 14px 16px 4px; }
.side-tab { color: var(--text); }
.side-body { flex: 1; overflow-y: auto; padding: 14px 18px 40px; }

/* Today */
.today-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 8px; margin-top: 4px; }
.today-date { font-size: 24px; font-weight: 700; letter-spacing: -.025em; line-height: 1.15; }
.countdown { font-size: 12px; color: var(--text-3); white-space: nowrap; font-variant-numeric: tabular-nums; }
.countdown.urgent { color: #c93400; }
.banner { margin-top: 12px; padding: 11px 14px; border-radius: 12px; font-size: 13px; line-height: 1.45; background: var(--fill-2); color: var(--text); }
.banner.good { background: var(--good-soft); }
.banner.bad { background: var(--bad-soft); }
.banner.rest { background: var(--info-soft); }
.day-progress { margin: 18px 0 16px; }
.day-progress-top { display: flex; justify-content: space-between; font-size: 12.5px; color: var(--text-2); margin-bottom: 8px; gap: 8px; }
.day-progress-top b { color: var(--text); }
.tasks { list-style: none; margin: 0; padding: 4px 0; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius); }
.task { --c: var(--text-3); position: relative; padding: 11px 14px 10px; transition: opacity .3s; }
.task + .task::before { content: ''; position: absolute; top: 0; left: 46px; right: 0; height: 1px; background: var(--line); }
.task label { display: flex; gap: 12px; align-items: flex-start; cursor: pointer; padding-right: 18px; }
.task-text { font-size: 13.5px; }
.task.done .task-text { color: var(--text-3); }
.task-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; margin: 4px 0 0 30px; font-size: 12px; color: var(--text-3); }
.node-chip { background: none; border: 0; padding: 0; color: var(--text-2); cursor: pointer; font-size: 12px; max-width: 180px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-flex; align-items: center; gap: 5px; }
.node-chip::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--c); flex: none; }
.node-chip:hover { color: var(--link); }
.node-chip.custom { cursor: default; }
.node-chip.custom::before { background: var(--text-3); }
.task .remove { position: absolute; top: 10px; right: 10px; background: none; border: 0; color: var(--text-3); cursor: pointer; opacity: 0; transition: opacity .15s; font-size: 12px; }
.task:hover .remove { opacity: 1; }
.task .remove:hover { color: var(--bad); }
.empty { color: var(--text-3); font-size: 13px; padding: 14px; list-style: none; }
.add-task { display: flex; gap: 8px; margin-top: 12px; }
.add-task input, .notes, #palette input {
  flex: 1; background: var(--fill-2); border: 1px solid transparent; border-radius: 10px; padding: 9px 12px;
  color: var(--text); font: 400 14px var(--font); outline: none; transition: border-color .2s, background .2s, box-shadow .2s;
}
.add-task input::placeholder, .notes::placeholder, #palette input::placeholder { color: var(--text-3); }
.add-task input:focus, .notes:focus { background: var(--surface); border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
/* Reminders-style round checkbox */
input[type="checkbox"] {
  appearance: none; width: 20px; height: 20px; flex: none; margin: 0; border: 1.5px solid #c7c7cc; border-radius: 50%; cursor: pointer;
  display: grid; place-items: center; transition: background .2s var(--ease), border-color .2s;
}
input[type="checkbox"]:hover { border-color: var(--accent); }
input[type="checkbox"]:checked { background: var(--accent); border-color: var(--accent); }
input[type="checkbox"]:checked::after { content: ''; width: 8px; height: 4px; border: solid #fff; border-width: 0 0 2px 2px; transform: rotate(-45deg) translate(1px, -1px); }
.rules { margin-top: 26px; font-size: 12.5px; color: var(--text-2); }
.rules summary { cursor: pointer; color: var(--link); font-weight: 500; }
.rules ul { padding-left: 16px; margin: 10px 0 0; display: grid; gap: 6px; }
.up { color: var(--good-text); font-weight: 600; font-variant-numeric: tabular-nums; }
.down { color: var(--bad-text); font-weight: 600; font-variant-numeric: tabular-nums; }

/* Path */
.overall { display: flex; gap: 18px; align-items: center; padding: 8px 0 4px; }
.overall > div:last-child { flex: 1; }
.overall-ring { --p: 0; position: relative; width: 86px; height: 86px; flex: none; border-radius: 50%; display: grid; place-items: center; background: conic-gradient(var(--accent) calc(var(--p) * 1%), var(--fill) 0); }
.overall-ring::before { content: ''; position: absolute; inset: 9px; border-radius: 50%; background: var(--surface); }
.overall-ring span { position: relative; font-size: 20px; font-weight: 700; letter-spacing: -.02em; }
.overall-line { font-size: 13px; color: var(--text-2); margin-top: 3px; }
.overall-line b { color: var(--text); }
.phases { list-style: none; padding: 0; margin: 22px 0 0; display: grid; gap: 12px; }
.phases > li { background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius); padding: 12px 12px 8px; }
.phase-head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 8px; }
.phase-num { font-size: 11px; font-weight: 600; color: #fff; background: var(--c); border-radius: 6px; padding: 1px 6px; }
.phase-title { font-size: 14.5px; font-weight: 600; flex: 1; }
.phase-pct { font-size: 12px; color: var(--text-3); font-variant-numeric: tabular-nums; }
.phases .progress span { background: var(--c); }
.phase-nodes { list-style: none; padding: 6px 0 0; margin: 0; }
.phase-nodes button { width: 100%; display: flex; align-items: center; gap: 9px; background: none; border: 0; padding: 6px 4px; border-radius: 8px; cursor: pointer; text-align: left; font-size: 13px; }
.phase-nodes button:hover { background: var(--fill-2); }
.phase-nodes small { margin-left: auto; color: var(--text-3); font-variant-numeric: tabular-nums; }
.phase-nodes i { width: 9px; height: 9px; border-radius: 50%; flex: none; border: 1.5px solid var(--text-3); }
.phase-nodes .status-available i { border-color: var(--accent); }
.phase-nodes .status-progress i { border-color: var(--accent); background: linear-gradient(90deg, var(--accent) 50%, transparent 50%); }
.phase-nodes .status-done i { border-color: var(--good); background: var(--good); }
.phase-nodes .status-locked { color: var(--text-3); }

/* Stats */
.honor-card { background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius); padding: 16px; }
.honor-big { font-size: 38px; font-weight: 700; letter-spacing: -.03em; line-height: 1.1; margin-top: 4px; font-variant-numeric: tabular-nums; }
.honor-big span { font-size: 16px; font-weight: 600; letter-spacing: -.01em; color: var(--accent); margin-left: 6px; }
.honor-card p { margin: 4px 0 12px; font-size: 13px; }
.spark { width: 100%; height: 64px; display: block; }
.spark-mid { stroke: var(--line-strong); stroke-dasharray: 3 4; }
.spark-line { fill: none; stroke: var(--accent); stroke-width: 2; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
.spark-axis { display: flex; justify-content: space-between; font-size: 11px; color: var(--text-3); margin-top: 4px; }
.stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 12px; }
.stat-grid div { background: var(--surface-2); border: 1px solid var(--line); border-radius: 12px; padding: 12px 6px; text-align: center; }
.stat-grid b { display: block; font-size: 21px; font-weight: 700; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.stat-grid span { font-size: 11px; color: var(--text-3); }
.heatmap { display: grid; grid-auto-flow: column; grid-template-rows: repeat(7, 1fr); gap: 3px; }
.heatmap i { aspect-ratio: 1; border-radius: 3px; background: var(--fill); }
.heatmap .l1 { background: rgba(0, 113, 227, .25); } .heatmap .l2 { background: rgba(0, 113, 227, .45); } .heatmap .l3 { background: rgba(0, 113, 227, .7); } .heatmap .l4 { background: var(--accent); }
.ledger { list-style: none; padding: 0; margin: 0; font-size: 12.5px; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius); }
.ledger li { display: flex; gap: 10px; padding: 9px 12px; align-items: baseline; }
.ledger li + li { border-top: 1px solid var(--line); }
.ledger-d { width: 40px; flex: none; text-align: right; }
.ledger-r { flex: 1; min-width: 0; }
.ledger-t { color: var(--text-3); font-size: 11.5px; white-space: nowrap; }

/* Settings */
.setting-row { display: flex; align-items: center; gap: 12px; }
.setting-row b { font-variant-numeric: tabular-nums; font-weight: 600; }
.setting-row input[type="range"] { flex: 1; accent-color: var(--accent); }
.setting-row input[type="date"] {
  flex: 1; background: var(--fill-2); border: 1px solid transparent; border-radius: 10px; padding: 7px 10px;
  color: var(--text); font: 400 14px var(--font); outline: none; color-scheme: inherit;
}
.setting-row input[type="date"]:focus { background: var(--surface); border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
.weekdays button { font-size: 12px; padding: 6px 0; }

/* ── graph ── */
#viewport { position: relative; flex: 1; overflow: hidden; cursor: grab; touch-action: none; background: var(--bg); }
#viewport.dragging { cursor: grabbing; }
#viewport.dragging .node { pointer-events: none; }
#world { position: absolute; top: 0; left: 0; transform-origin: 0 0; opacity: 0; transition: opacity .5s var(--ease); }
body.ready #world { opacity: 1; }
.edges { position: absolute; inset: 0; pointer-events: none; overflow: visible; }
.edge { fill: none; stroke: var(--edge); stroke-width: 1.5; transition: stroke .3s, stroke-width .3s; }
.edge.lit { stroke: var(--good); stroke-opacity: .55; }
.edge.hl { stroke: var(--accent); stroke-width: 2.2; stroke-opacity: 1; }

.band { position: absolute; left: 28px; right: 28px; border-radius: 28px; background: color-mix(in srgb, var(--surface) 50%, transparent); }
.band-label { position: absolute; top: 14px; left: 0; right: 0; display: flex; flex-direction: column; align-items: center; gap: 1px; text-align: center; z-index: 1; pointer-events: none; }
.band-label > span { padding: 0 14px; background: color-mix(in srgb, var(--surface) 50%, var(--bg)); border-radius: 8px; }
.band-num { font-size: 12px; font-weight: 600; color: var(--c); }
.band-title { font-size: 26px; font-weight: 700; letter-spacing: -.03em; color: var(--text); line-height: 1.15; }
.band-tag { display: none; }
.band-progress { z-index: 1; position: absolute; top: 62px; left: 50%; width: 120px; margin-left: -60px; height: 3px; background: var(--fill); border-radius: 9px; overflow: hidden; }
.band-progress span { display: block; height: 100%; background: var(--c); transition: width .6s var(--ease); }
.terminus { position: absolute; left: 0; right: 0; text-align: center; font-size: 13px; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; color: var(--text-3); }
.terminus.end { color: var(--text); }

.node {
  --c: #8e8e93;
  position: absolute; width: 232px; z-index: 2;
  background: var(--surface); border: 1px solid var(--line); border-radius: 18px;
  box-shadow: var(--shadow-sm); cursor: pointer; user-select: none;
  transition: width .35s var(--ease), margin .35s var(--ease), box-shadow .25s var(--ease), transform .25s var(--ease), opacity .2s;
}
.node:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); z-index: 5; }
.node-main { display: flex; align-items: center; gap: 11px; padding: 12px 14px; min-height: 68px; }
.ring { width: 34px; height: 34px; flex: none; transform: rotate(-90deg); }
.ring-bg { fill: none; stroke: var(--fill); stroke-width: 3.5; }
.ring-fg { fill: none; stroke: var(--c); stroke-width: 3.5; stroke-linecap: round; stroke-dasharray: 0 100; transition: stroke-dasharray .7s var(--ease); }
.ring-check, .ring-lock { fill: none; stroke: var(--good); stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transform: rotate(90deg); transform-origin: 18px 18px; opacity: 0; }
.ring-lock { stroke: var(--text-3); stroke-width: 1.6; }
.node-text { min-width: 0; flex: 1; }
.node-title { font-size: 14px; font-weight: 600; line-height: 1.25; letter-spacing: -.015em; }
.node-meta { display: flex; gap: 6px; font-size: 11.5px; color: var(--text-3); margin-top: 3px; font-variant-numeric: tabular-nums; }
.node-meta span + span::before { content: '·'; margin-right: 6px; }
.node-status { color: var(--text-2); }
.here { display: none; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); font-size: 0; align-self: flex-start; margin-top: 2px; animation: here 2s ease-in-out infinite; }
@keyframes here { 50% { opacity: .35; } }
.node.current .here { display: block; }
.node.focused::after { content: 'Focus'; position: absolute; top: -9px; right: 14px; font-size: 10px; font-weight: 600; background: var(--accent); color: #fff; border-radius: 980px; padding: 2px 8px; }

.node[data-status="locked"] { opacity: .55; box-shadow: none; }
.node[data-status="locked"]:hover { opacity: .9; }
.node[data-status="locked"] .ring-lock { opacity: 1; }
.node[data-status="available"] .node-status { color: var(--accent); }
.node[data-status="progress"] .node-status { color: var(--accent); }
.node[data-status="done"] .ring-fg { stroke: var(--good); }
.node[data-status="done"] .ring-check { opacity: 1; }
.node[data-status="done"] .node-status { color: var(--good-text); }
.node.selected { box-shadow: 0 0 0 2px var(--accent), var(--shadow-md); }

.node-more { max-height: 0; overflow: hidden; opacity: 0; transition: max-height .4s var(--ease), opacity .3s; padding: 0 16px; cursor: default; }
.node.expanded { width: 320px; margin-left: -44px; z-index: 12; box-shadow: var(--shadow-lg); opacity: 1; transform: none; }
.node:not(.expanded) .node-more { visibility: hidden; }
.node.expanded .node-more { max-height: 440px; opacity: 1; padding-bottom: 16px; }
.node-summary { margin: 0 0 12px; font-size: 13px; color: var(--text-2); line-height: 1.5; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip { font-size: 11.5px; padding: 3px 9px; border-radius: 980px; background: var(--fill-2); color: var(--text-2); }
.node-bar { height: 4px; background: var(--fill); border-radius: 9px; margin: 14px 0; overflow: hidden; }
.node-bar span { display: block; height: 100%; background: var(--c); transition: width .5s var(--ease); }
.node-actions { display: flex; gap: 6px; }
.node-actions .btn { padding: 6px 12px; font-size: 12.5px; }

.graph-controls, .legend, #phase-rail {
  background: var(--glass); backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px);
  border: 1px solid var(--glass-border); box-shadow: var(--shadow-sm);
}
.graph-controls { position: absolute; left: 16px; bottom: 16px; display: flex; align-items: center; gap: 2px; z-index: 15; border-radius: 980px; padding: 4px; }
.graph-controls .icon-btn { font-size: 18px; width: 30px; height: 30px; color: var(--text); }
#zoom-level { font-size: 12px; color: var(--text-2); width: 42px; text-align: center; font-variant-numeric: tabular-nums; }
.graph-controls .btn { margin-left: 4px; }
.legend { position: absolute; left: 16px; bottom: 64px; display: flex; flex-wrap: wrap; gap: 14px; font-size: 11.5px; color: var(--text-2); z-index: 15; border-radius: 12px; padding: 7px 12px; }
.legend span { display: flex; align-items: center; gap: 6px; }
.legend .hint { color: var(--text-3); }
.lg { width: 9px; height: 9px; border-radius: 50%; border: 1.5px solid var(--text-3); }
.lg.available { border-color: var(--accent); }
.lg.progress { border-color: var(--accent); background: linear-gradient(90deg, var(--accent) 50%, transparent 50%); }
.lg.done { border-color: var(--good); background: var(--good); }

#phase-rail { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); z-index: 15; display: flex; flex-direction: column; gap: 4px; padding: 6px; border-radius: 980px; }
#phase-rail button { --p: 0; position: relative; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; padding: 0; border: 0; background: conic-gradient(var(--c) calc(var(--p) * 360deg), var(--fill) 0); display: grid; place-items: center; }
#phase-rail button span { width: 22px; height: 22px; border-radius: 50%; background: var(--surface); display: grid; place-items: center; font-size: 11px; font-weight: 600; color: var(--text-2); }
#phase-rail button:hover span { color: var(--c); }
#phase-rail button em { position: absolute; right: 40px; white-space: nowrap; font-size: 12px; font-style: normal; font-weight: 500; color: var(--text); background: var(--surface); border-radius: 8px; padding: 4px 9px; box-shadow: var(--shadow-md); opacity: 0; pointer-events: none; transform: translateX(4px); transition: .2s var(--ease); }
#phase-rail button:hover em { opacity: 1; transform: none; }

/* ── drawer (sheet) ── */
#drawer {
  --c: var(--accent);
  position: absolute; top: 0; right: 0; bottom: 0; width: min(520px, 100%); z-index: 30;
  background: var(--surface); border-left: 1px solid var(--line); box-shadow: -10px 0 40px rgba(0, 0, 0, .06);
  display: flex; flex-direction: column; transform: translateX(105%); transition: transform .45s var(--ease); cursor: default;
}
#drawer.open { transform: none; }
.drawer-head { position: relative; padding: 24px 26px 0; }
.drawer-kicker { font-size: 12px; font-weight: 600; color: var(--c); }
.drawer-head h2 { font-size: 30px; font-weight: 700; letter-spacing: -.03em; line-height: 1.12; margin: 6px 40px 12px 0; }
.drawer-stats { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; font-size: 12.5px; color: var(--text-2); margin-bottom: 14px; }
.pill { padding: 3px 10px; border-radius: 980px; background: var(--fill-2); color: var(--text-2); font-size: 12px; font-weight: 500; }
.pill.status-done { background: var(--good-soft); color: var(--good-text); }
.pill.status-progress, .pill.status-available { background: var(--accent-soft); color: var(--accent); }
.drawer-head .progress span { background: var(--c); }
.drawer-close { position: absolute; top: 18px; right: 18px; background: var(--fill); font-size: 11px; width: 28px; height: 28px; }
.tabs { display: flex; gap: 0; margin: 18px 0 0; background: var(--fill); border-radius: 9px; padding: 2px; overflow-x: auto; scrollbar-width: none; }
.tab { flex: 1; background: none; border: 0; border-radius: 7px; padding: 6px 8px; color: var(--text); cursor: pointer; font-size: 12.5px; font-weight: 500; white-space: nowrap; transition: background .2s; }
.tab.active { background: var(--surface); box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 1px rgba(0, 0, 0, .04); }
.tab small { font-size: 11px; color: var(--text-3); }
.drawer-body { flex: 1; overflow-y: auto; padding: 22px 26px 48px; }
.drawer-body .lead { font-size: 19px; line-height: 1.45; letter-spacing: -.02em; margin-top: 0; font-weight: 500; }
.drawer-body p { line-height: 1.6; color: var(--text-2); }
.drawer-body p.lead { color: var(--text); }
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.two-col h4 { margin-top: 24px; }
.link-chip { display: block; width: 100%; text-align: left; background: var(--fill-2); border: 0; border-radius: 10px; padding: 8px 11px; margin-bottom: 6px; cursor: pointer; font-size: 13px; color: var(--link); }
.link-chip:hover { background: var(--accent-soft); }
.link-chip.status-done::before { content: '✓ '; color: var(--good-text); font-weight: 600; }
.link-chip.status-locked { color: var(--text-2); }
.mastery { padding-left: 20px; margin: 0; display: grid; gap: 8px; color: var(--text); }
.mastery li::marker { color: var(--text-3); font-size: 12px; }
.path { list-style: none; padding: 0; margin: 16px 0 0; position: relative; }
.path::before { content: ''; position: absolute; left: 13px; top: 14px; bottom: 14px; width: 2px; background: var(--fill); }
.path li { display: flex; gap: 14px; margin-bottom: 20px; position: relative; line-height: 1.55; }
.step { width: 28px; height: 28px; flex: none; border-radius: 50%; display: grid; place-items: center; background: var(--c); font-size: 12px; font-weight: 600; color: #fff; }
.path li div { padding-top: 3px; }
.resources { list-style: none; padding: 0; margin: 0; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; }
.resources li + li { border-top: 1px solid var(--line); }
.resources a { display: flex; align-items: center; gap: 12px; padding: 11px 14px; color: var(--text); text-decoration: none; transition: background .15s; }
.resources a:hover { background: var(--fill-2); text-decoration: none; }
.res-icon { width: 30px; height: 30px; flex: none; display: grid; place-items: center; border-radius: 8px; background: var(--c); color: #fff; font-size: 13px; }
.resources.alt .res-icon { background: var(--fill); color: var(--text-2); }
.res-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.res-title { font-size: 13.5px; font-weight: 500; }
.res-meta { font-size: 12px; color: var(--text-3); }
.res-go { color: var(--text-3); font-size: 13px; }
.checklist { list-style: none; padding: 0; margin: 0; background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius); }
.checklist li { display: flex; align-items: flex-start; gap: 8px; padding: 11px 14px; }
.checklist li + li { border-top: 1px solid var(--line); }
.checklist label { flex: 1; display: flex; gap: 11px; align-items: flex-start; cursor: pointer; }
.check-num { display: none; }
.check-text { padding-top: 1px; }
.checklist li.done .check-text { color: var(--text-3); }
.project-card { background: var(--surface-2); border: 1px solid var(--line); border-radius: var(--radius); padding: 18px; }
.project-card.done { background: var(--good-soft); border-color: transparent; }
.project-kicker { font-size: 12px; font-weight: 600; color: var(--c); }
.project-card p { font-size: 16px; line-height: 1.5; color: var(--text); margin: 8px 0 16px; letter-spacing: -.015em; }
.project-check { display: flex; gap: 10px; align-items: center; cursor: pointer; font-weight: 500; }
.bullets { padding-left: 18px; margin: 0; display: grid; gap: 7px; color: var(--text-2); }
.notes { width: 100%; min-height: 380px; resize: vertical; line-height: 1.6; }
.notes-export { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 12px; }
.notes-export > .muted { font-size: 12.5px; margin-right: 2px; }
.notes-export-msg { font-size: 12.5px; margin: 8px 0 0; }

/* ── first-run welcome sheet ── */
#onboard { position: fixed; inset: 0; z-index: 90; display: grid; place-items: center; padding: 20px; background: rgba(0, 0, 0, .28); animation: fade .25s; }
#onboard[hidden] { display: none; }
#onboard.closing { opacity: 0; transition: opacity .25s; }
.onboard-card {
  width: min(460px, 100%); background: var(--surface); border-radius: 22px; padding: 30px 28px 22px; box-shadow: var(--shadow-lg);
  animation: sheetIn .4s var(--ease);
}
@keyframes sheetIn { from { opacity: 0; transform: translateY(16px) scale(.98); } }
.onboard-card h2 { font-size: 26px; font-weight: 700; letter-spacing: -.03em; line-height: 1.15; margin: 6px 0 10px; }
.onboard-card > .muted { font-size: 14px; line-height: 1.5; margin: 0 0 18px; }
.onboard-options { display: grid; gap: 8px; }
.onboard-option {
  display: flex; gap: 12px; align-items: flex-start; padding: 12px 14px; border-radius: 14px; cursor: pointer;
  background: var(--fill-2); border: 1.5px solid transparent; transition: border-color .2s, background .2s;
}
.onboard-option:has(input[type="radio"]:checked) { border-color: var(--accent); background: var(--accent-soft); }
.onboard-option input[type="radio"] { margin: 2px 0 0; accent-color: var(--accent); width: 17px; height: 17px; flex: none; }
.onboard-option span { display: flex; flex-direction: column; gap: 2px; flex: 1; }
.onboard-option b { font-size: 14.5px; font-weight: 600; }
.onboard-option em { font-style: normal; font-size: 11px; font-weight: 600; color: var(--accent); margin-left: 6px; }
.onboard-option small { font-size: 12.5px; color: var(--text-2); }
.onboard-option input[type="date"] { margin-top: 4px; background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 5px 8px; font: 400 13px var(--font); color: var(--text); }
.onboard-go { width: 100%; justify-content: center; margin-top: 18px; padding: 11px; font-size: 15px; }
.onboard-foot { text-align: center; font-size: 12px; color: var(--text-3); margin: 12px 0 0; }

/* ── search (Spotlight-style) ── */
#palette { position: fixed; inset: 0; z-index: 80; background: rgba(0, 0, 0, .2); display: flex; justify-content: center; align-items: flex-start; padding-top: 14vh; animation: fade .2s; }
@keyframes fade { from { opacity: 0; } }
#palette[hidden] { display: none; }
.palette-card {
  width: min(640px, 92vw); border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-lg);
  background: var(--glass); backdrop-filter: saturate(180%) blur(30px); -webkit-backdrop-filter: saturate(180%) blur(30px); border: 1px solid var(--glass-border);
}
#palette input { width: 100%; border: 0; border-bottom: 1px solid var(--line); border-radius: 0; padding: 16px 20px; font-size: 20px; background: transparent; box-shadow: none; }
#palette ul { list-style: none; margin: 0; padding: 6px; max-height: 50vh; overflow-y: auto; }
#palette li { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px; cursor: pointer; }
#palette li.active { background: var(--accent); color: #fff; }
#palette li.active .psub, #palette li.active .kind { color: rgba(255, 255, 255, .8); }
.kind { font-size: 11px; font-weight: 500; width: 36px; flex: none; color: var(--text-3); }
.ptext { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.psub { color: var(--text-3); font-size: 12px; white-space: nowrap; max-width: 40%; overflow: hidden; text-overflow: ellipsis; }
.palette-foot { border-top: 1px solid var(--line); padding: 8px 16px; font-size: 11.5px; color: var(--text-3); display: flex; gap: 6px; align-items: center; }

/* scrollbars */
::-webkit-scrollbar { width: 11px; height: 11px; }
::-webkit-scrollbar-thumb { background: rgba(128, 128, 128, .35); border-radius: 10px; border: 3px solid transparent; background-clip: padding-box; }
::-webkit-scrollbar-track { background: transparent; }

/* ── responsive ── */
@media (max-width: 1180px) {
  .top-stat, .save-status { display: none; }
  .search-btn span, .search-btn kbd { display: none; }
}
@media (max-width: 900px) {
  :root { --side: 320px; }
  #sidebar { position: absolute; top: 0; bottom: 0; left: 0; box-shadow: var(--shadow-lg); }
  .brand-sub { display: none; }
  .legend { display: none; }
  #topbar { grid-template-columns: auto 1fr auto; }
  .rdr-meter { width: clamp(190px, 46vw, 300px); }
}
@media (max-width: 600px) {
  .brand-title { display: none; }
  #topbar { padding: 0 8px; gap: 8px; }
  #phase-rail { display: none; }
}
````


---

## `public/js/store.js`

````js
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
  a.download = `roadmap-progress-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}
````


---

## `public/js/model.js`

````js
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
````


---

## `public/js/honor.js`

````js
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
````


---

## `public/js/plan.js`

````js
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
  for (const t of day.tasks) {
    if (!t.extra) {
      t.extra = true;
      t.warmupExtra = true; // remember which tasks were made optional, so a start-date change can undo it
    }
  }
}

function endWarmup(day) {
  day.warmup = false;
  for (const t of day.tasks) {
    if (t.warmupExtra) {
      delete t.extra;
      delete t.warmupExtra;
    }
  }
}

/** Move the challenge start. Today or later only — past days were never planned, so they can't be judged. */
export function setStartDate(date) {
  const today = todayStr();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
  S.settings.startDate = date < today ? today : date;
  const day = ensurePlan(today);
  if (isWarmup(today)) makeWarmup(day);
  else if (day.warmup) endWarmup(day);
  checkDayGoals();
  commit();
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
````


---

## `public/js/graph.js`

````js
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
````


---

## `public/js/drawer.js`

````js
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
````


---

## `public/js/panels.js`

````js
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
      <p class="muted">Saved automatically to <code>data/progress.json</code> inside this app's folder, with a daily backup in <code>data/backups/</code> (last 30 days).</p>
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
````


---

## `public/js/app.js`

````js
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
````


---

## `public/js/data/phases.js`

````js
// PLACEHOLDER CURRICULUM — replace everything in public/js/data/ with the real topic.
// Format and quality rules: Re-create/03-ARCHITECTURE.md and 04-CURRICULUM-AUTHORING.md.
// Phase colours (keep this order): #007aff #5856d6 #30b0c7 #34c759 #ff9500 #ff2d55 #af52de #a2845e
window.ROADMAP_PHASES = [
  { id: 0, title: 'Setup & Foundations', tag: 'Foundations', color: '#007aff' },
  { id: 1, title: 'Core Skills', tag: 'Core', color: '#5856d6' },
];
window.ROADMAP_NODES = [];
// r(title, url, type, note) -> resource. Types: video, course, book, docs, practice, article, tool
window.r = (title, url, type, note) => ({ title, url, type, note: note || '' });
````


---

## `public/js/data/nodes-foundations.js`

````js
// PLACEHOLDER — sample nodes showing the format. Replace with the real curriculum.
ROADMAP_NODES.push(
  {
    id: 'example-setup', phase: 0, title: 'Example: Dev Setup', hours: 10, prereqs: [],
    summary: 'Sample node. Replace with the first real node of your topic (environment setup).',
    why: 'Explains why this node matters for the learner\'s career.',
    subtopics: ['Terminal', 'Package manager', 'Editor'],
    guide: [
      'Step 1: name the exact resource and the sections to do.',
      'Step 2: a hands-on step.',
      'Step 3: a consolidation step.',
    ],
    resources: [
      r('The Missing Semester of Your CS Education (MIT)', 'https://missing.csail.mit.edu/', 'course', 'Example resource'),
      r('Pro Git book (free)', 'https://git-scm.com/book/en/v2', 'book'),
    ],
    checklist: [
      'A concrete task of ~45–120 minutes',
      'Another concrete, checkable task',
      'A small hands-on build task',
    ],
    project: 'One portfolio-worthy deliverable with clear scope.',
    mastery: ['A self-test question?', 'Another one?', 'A third one?'],
  },
  {
    id: 'example-language', phase: 0, title: 'Example: Core Language', hours: 20, prereqs: ['example-setup'],
    summary: 'Sample node.', why: 'Sample why.',
    subtopics: ['Syntax', 'Functions', 'Data structures'],
    guide: ['Sample step.'],
    resources: [r('The Python Tutorial (official)', 'https://docs.python.org/3/tutorial/', 'docs')],
    checklist: ['Sample task 1', 'Sample task 2'],
    project: 'Sample project.',
    mastery: ['Sample question?'],
  },
);
````


---

## `public/js/data/nodes-core.js`

````js
// PLACEHOLDER — sample node. Replace with the real curriculum.
ROADMAP_NODES.push({
  id: 'example-core', phase: 1, title: 'Example: Core Skill', hours: 15, prereqs: ['example-language'],
  summary: 'Sample node.', why: 'Sample why.',
  subtopics: ['Topic A', 'Topic B'],
  guide: ['Sample step.'],
  resources: [r('GitHub Docs: Getting started with Git', 'https://docs.github.com/en/get-started/getting-started-with-git', 'docs')],
  checklist: ['Sample task 1', 'Sample task 2'],
  project: 'Sample project.',
  mastery: ['Sample question?'],
});
````


---

## `public/js/data/nodes-advanced.js`

````js
// PLACEHOLDER — later phases go here (e.g. phases 5–7). Replace with the real curriculum.
ROADMAP_NODES.push();
````


---

## `public/js/data/alternatives.js`

````js
// PLACEHOLDER — 2–4 alternative free resources per node, in a different format from the main picks.
window.ROADMAP_ALTERNATIVES = {
  'example-setup': [r('Apple: Terminal User Guide', 'https://support.apple.com/guide/terminal/welcome/mac', 'docs')],
  'example-language': [r('Think Python, 3rd ed. (Allen Downey)', 'https://allendowney.github.io/ThinkPython/', 'book')],
  'example-core': [r('Atlassian Git tutorials', 'https://www.atlassian.com/git/tutorials', 'article')],
};
````
