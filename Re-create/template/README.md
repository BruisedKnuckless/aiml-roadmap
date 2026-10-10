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
