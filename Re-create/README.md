# Re-create kit: build "The Long Road" for any topic

This folder lets any Claude rebuild this app — same look, same graph of nodes, same RDR2-style honor meter, same daily tasks — for a **different learning topic** (Backend Engineering, JavaScript, DevOps, Cybersecurity, Data Engineering, iOS, …).

The app has two halves:

| Half | What it is | What changes for a new topic |
|---|---|---|
| **Engine** | Local server, graph, honor system, daily planner, design, settings | **Nothing** — reuse it verbatim (only a few names/strings change) |
| **Curriculum** | Phases, nodes, guides, resources, checklists, projects, alternatives | **Everything** — written fresh, researched and link-verified |

## Files

| File / folder | Purpose |
|---|---|
| **`template/`** | **The complete, runnable engine** — copy this folder to start a new roadmap. Topic-neutral, with a tiny placeholder curriculum. Guarantees identical design everywhere. |
| **`assets/`** | Official honor badges as standalone SVGs (`honor-badge-coder.svg`, `honor-badge-skull.svg`) + `honor-meter-preview.html` (open in a browser to see the reference meter) |
| **`example-curriculum/`** | The full, verified AI/ML curriculum data files — the quality reference |
| `README.md` | This page + the prompt to paste |
| `01-PRODUCT-SPEC.md` | Every feature and behaviour, precisely |
| `02-DESIGN-SYSTEM.md` | Apple-style theme, colours, typography, the RDR2 honor meter |
| `03-ARCHITECTURE.md` | Files, data model, algorithms, server API |
| `04-CURRICULUM-AUTHORING.md` | How to research and write a new topic's curriculum to the same quality bar |
| `05-BUILD-AND-VERIFY.md` | Build order, the full test checklist, and every pitfall we already hit |
| `06-ENGINE-SOURCE.md` | Same engine as `template/`, as one Markdown file (for chat uploads) |
| `07-EXAMPLE-CURRICULUM.md` | Real curriculum excerpt (AI/ML) showing the expected depth and format |

## How to use it

### Best: Claude Code (desktop app or terminal)
Claude Code can create the files on your computer, run the server, check every link and take screenshots — exactly how the original was built.

1. Open Claude Code in an empty folder (e.g. `~/Desktop`).
2. Put this whole `Re-create` folder in that directory.
3. Paste the prompt below, replacing the topic.

### Also works: claude.ai chat
Upload the 8 Markdown files (plus the two SVGs from `assets/` if you like), then paste the prompt. Claude will produce the files for you to download and arrange into the folder structure from `03-ARCHITECTURE.md`. It cannot run the link checker or test for you, so after downloading run `npm run check-links` yourself and paste any failures back to Claude.

## The prompt (copy, edit the first line, paste)

```text
TOPIC: Backend Engineering            <- change this
MY LEVEL: absolute beginner           <- or: "I know basic Python", etc.
DAILY STUDY TIME: 3 hours             <- optional
PORT: 4748                            <- any free port; must differ from other roadmaps you run

I've uploaded the "Re-create" kit. Build me a complete, locally-run learning
roadmap app for the TOPIC above, exactly like the one described in the kit.

Rules:
1. Copy the engine from the template/ folder (or 06-ENGINE-SOURCE.md if you
   only have the Markdown) VERBATIM. Do not redesign, restyle, simplify or
   "improve" it — the design, honor meter and badges must stay identical.
   Only change what 05-BUILD-AND-VERIFY.md → "Rename checklist" lists.
2. Write a brand-new curriculum for the TOPIC following
   04-CURRICULUM-AUTHORING.md exactly: ~35–50 nodes across ~8 phases from
   absolute zero to mastery, every node with summary, why, subtopics, guide,
   resources (free only), checklist, project, mastery questions, plus
   alternatives for every node. Match the depth of 07-EXAMPLE-CURRICULUM.md.
3. Every resource must be real, free and verified. Never invent URLs,
   lecture numbers, chapter titles or course units — check them against the
   source. If you cannot verify something, leave it out.
4. Follow 05-BUILD-AND-VERIFY.md: build in that order, run every test,
   run the link checker until it reports "All links OK", and fix anything
   that fails before telling me you're done.
5. Put the project in a new folder named "<topic>-roadmap" and give me the
   exact command to start it.
```

## Notes
- Progress for each roadmap lives in its own `data/progress.json`; separate roadmaps never interfere (as long as they use different ports).
- Your friends' copies start fresh: honor 50, first-run start-date popup, warm-up day.
- The honor badges (coder at a laptop / skull-faced coder) are original SVG art inspired by Red Dead Redemption 2 — safe to publish.
