# 05 · Build order, rename checklist, tests, pitfalls

## A. Build order

1. **Ask nothing you can decide.** Topic, level and port come from the user's prompt. Default port: pick one not used by other roadmaps (the AI/ML one uses **4747**; use 4748, 4749, …).
2. **Create the folder** `<topic-slug>-roadmap/` with the exact layout in `03-ARCHITECTURE.md`.
3. **Copy the engine verbatim**: `cp -R Re-create/template <topic-slug>-roadmap` (or, with only the Markdown, recreate every file from `06-ENGINE-SOURCE.md` byte-for-byte). `start.command` must be executable (`chmod +x`), `start.bat` must keep CRLF line endings. The honor badges live inline in `public/index.html`; the canonical standalone copies are in `Re-create/assets/` — they must match.
4. **Apply the rename checklist** (section B).
5. **Research + write the curriculum** following `04-CURRICULUM-AUTHORING.md`:
   `phases.js` → nodes files (split by phase, e.g. `nodes-foundations.js`, `nodes-core.js`, `nodes-advanced.js`) → `alternatives.js`. If you use different file names, update `index.html` script tags **and** the list at the top of `scripts/check-links.js`.
6. **Validate structure** (section C1), **verify links** (C2), **run the app tests** (C3–C5).
7. Fill in the placeholders in `README.md` (it already has the full structure).
8. Report to the user: folder path, start command, node/phase/hours counts, anything you couldn't verify.

## B. Rename checklist (the ONLY engine edits allowed)

The `template/` is already topic-neutral; only these need changing:

| File | Change |
|---|---|
| `public/index.html` | replace both `{{TOPIC}}` markers (`<title>` and `.brand-sub`) with the topic name, e.g. `Backend Engineering` |
| `package.json` | `"name": "new-topic-roadmap"` → `"<topic-slug>-roadmap"` |
| `server.js` | **default port** in `const PORT = Number(process.env.PORT) \|\| 4747;` |
| `start.command` | port in `open "http://127.0.0.1:4747"` |
| `start.bat` | port in `start http://127.0.0.1:4747` |
| `README.md` | replace `{{TOPIC}}`, `{{NODE_COUNT}}`, `{{PHASE_COUNT}}`, `{{LINK_COUNT}}`, `{{PORT}}` |
| `public/js/data/*` | delete the placeholder content; write the real curriculum |

Afterwards `grep -rn "{{" .` must return nothing.

Do **not** touch CSS, layout constants, honor rules, badge SVGs, planner logic, or component markup.

## C. Verification

### C1. Structure check (run with node)
Load the data files in a `vm` context (see `scripts/check-links.js` for the pattern) and assert:
- unique node ids; exactly one root; all prereqs exist, are in the same/earlier phase; no cycles
- every node has non-empty summary, why, subtopics, guide, resources, checklist, project, mastery
- resource types ∈ {video, course, book, docs, practice, article, tool}; no duplicate URLs within a node
- every node has alternatives; no alternative duplicates a main resource; no unknown keys in alternatives
- print: nodes, phases, total hours, days at the default daily hours, checklist items, alternatives count

### C2. Links
- `npm run check-links` → must end with **All links OK**. Use `--titles` to print what every YouTube link actually points to and compare.
- Additionally fetch every page `<title>` and compare to the resource title (catches soft 404s and wrong pages).
- Open every "Blocked by bot protection" URL in a real browser.
- Spot-check every lecture/chapter/unit number used in guides and checklists against the source syllabus.

### C3. App smoke test
`node server.js` → open `http://127.0.0.1:<PORT>`:
- no console errors; graph renders; bands centred; first node expanded and centred
- welcome sheet appears on a fresh `data/` (delete `data/` first) → choose Today → it never reappears
- click node → expands; Open guide → drawer; all 6 tabs render; Resources shows Alternatives
- ⌘K search finds a node, a task and a link
- Settings: theme switch (Auto/Light/Dark), start-date picker, sliders, rest days, export

### C4. Honor & day-logic tests (use a throwaway copy of `data/`, restore after)
Use `?today=YYYY-MM-DD` to simulate dates:
1. Tick an allotted task → +1.5 toast, ring updates, `data/progress.json` changes. Untick → exact reversal.
2. Tick 2 tasks → "Minimum kept" + 0.5. Next day (`?today=+1`) → **no** penalty, streak not reset.
3. Tick 1 task → next day → −6 total (−2 per task, capped).
4. Skip a day entirely (jump 2 days) → −6 for the unopened day.
5. Postpone start date to +3 days → today becomes warm-up; jump forward → warm-up days cost nothing; the start day counts.
6. "Start today" → today's tasks become required again.

### C5. Visual check
Screenshot at 1440×900 in light and dark (headless Chrome works: `--headless=new --screenshot --window-size=1440,900`; `--blink-settings=preferredColorScheme=1` forces light). Check honor meter at low/neutral/high values (badge swaps to the skull coder below 48).

## D. Pitfalls already hit (avoid)

- **`.gitignore` must use `/data/`, not `data/`** — the latter also ignores `public/js/data/` (the whole curriculum!).
- The graph viewport is `overflow:hidden` but focusing a button inside a node still scrolls it → the source resets `scrollTop/Left` on scroll. Keep the drawer **outside** `#viewport`.
- Don't name classes `.node` outside the graph (search badges once inherited node card styles).
- Never size `.rdr-meter` with a % of its parent (shrink-to-fit parent → width 0).
- Re-rendering the drawer while typing in Notes kills focus → the source skips re-render when the textarea is focused.
- `localStorage`-only or `file://` versions don't work with ES modules; keep the server.
- macOS: there's no `timeout` command; Python may lack SSL certs (use `curl`); headless Chrome may hang on intervals → use `--timeout=4000` and a Perl `alarm`.
- Two roadmaps on one machine need **different ports**.
- Never reorder checklist items after people start using it (ids are positional) — append instead.
- Don't include personal `data/` when sharing; commit with a GitHub noreply email if publishing.
