# 01 · Product spec — "The Long Road"

A **locally-run** single-page web app that takes a learner from absolute zero to mastery in one topic. It combines a **graph roadmap**, **daily auto-assigned tasks**, and an **RDR2-style honor meter** that rewards consistency and punishes skipped days. Progress is saved to a JSON file on the learner's own computer.

The engine described here is **topic-agnostic**. Everything below must behave identically for every topic. (Exact implementation: `06-ENGINE-SOURCE.md`.)

---

## 1. Running it

- Zero npm dependencies. Requires only Node.js (LTS).
- `node server.js` (or `npm start`) serves the app at `http://127.0.0.1:<PORT>` (bound to localhost only).
- Double-click launchers: `start.command` (macOS — opens the browser, checks Node is installed) and `start.bat` (Windows).
- Opening `index.html` directly from disk does **not** work (ES modules + the save API need the server). The README says so.

## 2. Screen layout

```
┌──────────────────────── Top bar (frosted glass, 56px) ────────────────────────┐
│ ☰  Title / subtitle       [ RDR2 honor meter ]       Search ⌘K  % complete  streak  ● Saved │
├──────────── Sidebar 352px ────────────┬──────────── Graph canvas ─────────────────────┤
│ [Today | Path | Stats | Settings]     │  Phase bands (top → bottom), nodes, edges      │
│  …tab content…                        │  Zoom controls + legend (bottom-left)          │
│                                       │  Phase rail 0–7 (right edge)                   │
│                                       │                       ┌── Detail drawer 520px ─┤
│                                       │                       │ (slides in from right) │
└───────────────────────────────────────┴───────────────────────┴────────────────────────┘
```

- Sidebar collapsible via ☰; starts collapsed under 900px width (becomes an overlay).
- Responsive down to phone width.

## 3. The roadmap graph

- **Phases** are horizontal bands stacked top→bottom: "ABSOLUTE ZERO" label above phase 0, "MASTER" below the last phase.
- Each band shows a centred eyebrow ("Phase N", in the phase colour), a large title, and a thin phase-progress bar.
- **Nodes** inside a band are arranged in rows by *intra-phase dependency depth*; each row is centred; nodes ordered by the average x of their prerequisites (fewer crossings).
- **Edges**: smooth cubic Bézier from the bottom-centre of a prerequisite to the top-centre of the dependent node. Edges from a mastered node are tinted green; edges touching the hovered/expanded node are highlighted in the accent blue.
- **Node card**: progress ring (phase colour; green + check when mastered; lock icon when locked), title, meta line `Status · Nh · done/total`, and a pulsing blue dot on "current" nodes.
- **Statuses**: `locked` (prerequisites not mastered — dimmed but still clickable/usable), `available` ("Ready"), `progress` ("In progress"), `done` ("Mastered" — all checklist items + project done).
- **Current** = the first two available/in-progress nodes in curriculum order, plus the focused node (badge "Focus").
- **Click** a node → it **expands in place** (wider card, summary, subtopic chips, progress bar, buttons: *Open guide*, *Checklist*, *Focus/Unfocus*). Click again collapses. **Double-click** opens the drawer.
- **Pan**: drag, or two-finger/wheel scroll. **Zoom**: ⌘/Ctrl + wheel/pinch, +/− buttons, keys `+`/`-`; `0` = fit whole map; `C` / "Continue ↓" = jump to the current node.
- **Phase rail** (right edge): circular buttons 0–7 with a conic progress ring in the phase colour; hover shows the phase name; click scrolls to that band.
- On load the view centres on the current node at 100% zoom and expands it.

## 4. Detail drawer (per node)

Header: phase eyebrow, big title, status pill, `≈ N hours`, `done/total tasks`, progress bar, close ✕, and a segmented tab control:

| Tab | Content |
|---|---|
| **Overview** | Lead summary, "Why it matters", subtopic chips, *Requires* / *Unlocks* (clickable links to other nodes, ✓ if mastered), self-test questions, buttons "Start the guide →" and "Focus in daily plan" |
| **Guide** | Numbered vertical step path (ordered study steps) |
| **Resources** | Grouped list: icon tile by type (video ▶, course ◆, book ❖, docs §, practice ✎, article ¶, tool ⚙), title, `type · note · domain`, ↗. Then an **Alternatives** section (same format, muted icons) |
| **Checklist** | Round checkboxes; each item shows "Today" tag if in today's plan, or a "+ Today" button to add it as a bonus task. Note shows est. time per task |
| **Project** | Capstone card with "Mark project complete" checkbox, "Definition of done" bullets, self-test questions |
| **Notes** | Free textarea, autosaved (500 ms debounce); re-renders never steal focus while typing. Below it: **Export as** → *Markdown (.md)* / *Text (.txt)* for this node (file named after the node title, `:` etc. replaced with ` - `; contains title, phase, export date, notes) and *All notes (.md)* (every node with notes, in roadmap order). Exports the live textarea text; empty → inline "No notes for this node yet." |

Esc closes the drawer. Opening a node from anywhere (search, Today chips, Path list, Requires/Unlocks) pans the graph to it, selects it, and opens the drawer.

## 5. Sidebar tabs

### Today
- Date headline, "Day ends in Xh Ym" countdown (turns orange under 2h; refreshed every 30 s).
- Banners (only when relevant): **Warm-up day** (before the challenge start date), **Rest day**, **Yesterday: d/t tasks · all done | minimum kept, no penalty | −X honor in penalties**, **minimum kept** ("You're safe for today…"), **all done**.
- Day progress: "d of t allotted done · ≈ Xh planned · Yh goal", progress bar with a **white tick at the daily-minimum position**, and a minimum row with diamond pips ("Daily minimum: 1/2 tasks to stay penalty-free" → green "Minimum kept — no penalties today").
- Task list (grouped list): round checkbox, task text, meta (coloured dot + node name link, ≈ hours, tags *Carried over* / *Bonus*), hover ✕ to remove. Project-session tasks show "Project finished?" after being ticked.
- "Add your own to-do…" input (Enter adds), **+ Pull next task** (adds a bonus task), **Rebuild plan** (re-picks unfinished auto tasks).
- Collapsible "How honor works" with the exact rules table.

### Path
- Big conic progress ring (% of total hours), hours done/total, nodes mastered, **estimated finish date** (remaining hours ÷ daily hours, skipping rest days).
- Per-phase cards: number chip in phase colour, title, %, progress bar, list of nodes with status dots — click to open.

### Stats
- Honor card: big value, rank name, rank blurb, 30-day **sparkline** (dashed 50 line).
- 4 stat tiles: current streak, best streak, tasks done, active days.
- 16-week activity **heatmap** (GitHub-style, accent-colour intensity by completions/day).
- **Honor ledger**: last 60 changes (`+1.5  reason  date`).

### Settings
- **Appearance**: segmented Auto / Light / Dark (Auto follows the OS).
- **Challenge start**: date picker (min = today) + "Start today" button + explanation. Postponing asks for confirmation.
- **Daily study goal**: slider 1–10 h (0.5 steps).
- **Daily minimum**: slider 1–5 tasks.
- **Rest days**: 7 weekday toggles.
- **Your data**: file location text, Export JSON, Import JSON.
- **Danger zone**: Reset all progress (double confirm).

## 6. Top bar
- ☰, title + subtitle (topic-specific), **honor meter** (centre), search pill "Search ⌘K", "% complete", "streak", save status dot (green Saved / orange Saving… / red Offline — retrying).
- Clicking the honor meter opens the Stats tab. Hover shows `Rank — blurb / Honor X / 100`.

## 7. Search (⌘K or `/`)
Spotlight-style overlay. Searches node titles/subtopics/summaries, every checklist item, and every resource + alternative. Whole-word title matches rank first, nodes above tasks/links. ↑/↓ move, Enter opens (task → Checklist tab, link → Resources tab), Esc closes.

## 8. Daily plan (the "allotted tasks")

- Each node's checklist items get an estimated duration: `0.8 × node.hours / checklist.length`; the project gets `0.2 × node.hours`.
- A plan is created the first time a date is seen. It contains:
  1. **Carried-over** unfinished *custom* to-dos from the previous plan.
  2. Auto tasks (unless rest day): next unfinished items from the **first two active nodes** (focused node first), **round-robin**, until the day's hour budget is filled (allow up to 115% of budget; always at least one task; max 10 tasks).
  3. When a node's next item is its **project**, schedule a **project session** instead (≤ 3 h, never the whole project). The project itself is ticked on the Project tab or via "Project finished?".
- The plan is fixed for the day once created (finishing tasks doesn't reshuffle it). "Rebuild plan" replaces only unfinished auto tasks. "Pull next task" and "+ Today" add **bonus** tasks (`extra`) that earn honor but are never penalised.
- Ticking a checklist item anywhere (drawer or Today) updates both.

## 9. Honor system (RDR2-style)

- Value 0–100, starts at **50**, clamped.
- **Gains** (applied immediately):
  | Event | Raw |
  |---|---|
  | Complete a task allotted for today | +1.5 |
  | Complete any other checklist item | +0.5 |
  | Reach the daily minimum | +0.5 |
  | Finish every allotted task | +2 |
  | Master a node | +5 |
  | Every 7th consecutive perfect day | +3 |
- **Losses** (applied at day rollover for days on/after the start date, non-rest):
  | Situation | Raw |
  |---|---|
  | Completions ≥ daily minimum | **no penalty** |
  | Some completions but below minimum | −2 per unfinished allotted task, capped at −6 total for the day |
  | Zero completions, or the app was never opened that day | −6 |
- **Diminishing returns**: above 50, gains × max(0.25, (100−v)/50); below 50, losses × max(0.25, v/50).
- **Reversible**: every gain is stored under a key; unchecking reverses exactly that amount (no farming). Falling back below the minimum or un-finishing the plan takes back those bonuses.
- **Streak** = consecutive perfect days (all allotted tasks done). A minimum-only day protects the streak but doesn't grow it; any other non-rest, non-warm-up day resets it.
- **Ranks**: ≥90 Legend · ≥70 Honorable · ≥55 Respectable · ≥45 Neutral · ≥30 Wavering · ≥10 Drifter · else Outlaw (each with a one-line blurb).
- Meter side: `good` if > 52, `bad` if < 48, else `neutral` → controls badge (honorable coder vs. skull coder).
- **Toasts**: honor changes within 60 ms are batched into one macOS-style notification ("▲ Honor Increased" / "▼ Honor Decreased", up to 4 lines + "and N more…"), auto-dismiss after ~4 s; the meter badge "pops".

## 10. Days, warm-up, start date

- **Day rollover** runs on load, every 30 s, and when the tab becomes visible: every date from `lastProcessed` up to yesterday is evaluated once, then today's plan is ensured.
- **Start date**: on first launch defaults to *tomorrow*. Days before it are **warm-up** days — all tasks are optional (`extra`), nothing is penalised, completions still earn honor, and a blue banner says so.
- **First-run welcome sheet** (only when no progress file exists): "When do you want to start?" — Today / Tomorrow (Recommended, preselected) / Pick a date (defaults to +7 days) → "Start the journey". Footer: change anytime in Settings → Challenge start.
- **Changing the start date** (Settings): future date → today becomes warm-up (tasks made optional, remembered via `warmupExtra`); "Start today" → reverses that. Past dates are not allowed.
- **Rest days**: no auto tasks, no penalties, carried custom to-dos still appear.
- After returning from absence with a net honor loss, a bottom notice says "While you were away (N days), your honor changed by −X."
- Debug: `?today=YYYY-MM-DD` overrides "today" (used for testing rollover; real timestamps are unaffected).

## 11. Persistence

- State is loaded once from `GET /api/progress` (null → fresh default state).
- Every change: debounced `PUT` (400 ms) of the whole state; on failure shows "Offline — retrying" and retries every 5 s; on page hide, unsaved state is sent with `navigator.sendBeacon` (POST).
- Server writes atomically (tmp + rename) and copies a once-per-day backup into `data/backups/` (keeps 30).
- Export/Import JSON from Settings. Old progress files are migrated (missing keys filled with defaults).

## 12. Non-goals
No accounts, no cloud sync, no analytics, no external JS/CSS dependencies (system font, inline SVG), nothing leaves the machine except the learner clicking resource links.
