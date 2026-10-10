# 04 · Curriculum authoring guide

The engine is reused as-is. **The curriculum is the product.** A learner will follow it for months and their career depends on it, so it must be *accurate, free, verified, and specific*. This is the quality bar the AI/ML roadmap was held to (see `07-EXAMPLE-CURRICULUM.md`).

---

## 1. Shape of the roadmap

- **~35–50 nodes** across **~7–9 phases**, from absolute zero (installing tools) to mastery (original work, open source, specialisation).
- Phase 0 always covers environment setup + the core programming language(s) + Git. Assume a total beginner.
- Final phase is always "Mastery": deep specialisation, reading primary sources, contributing to real projects, portfolio + interview prep, teaching others.
- Each phase has 3–7 nodes. Inside a phase, use prerequisites to create 2–4 rows (a small DAG), not one long chain.
- Every node except the first must have ≥1 prerequisite; prerequisites must be in the **same or an earlier** phase; no cycles; one root node.
- Total hours: realistic for the topic (AI/ML ≈ 1,250 h). Node hours 10–80; include the project (the engine allots 20% of node hours to it).

### Starting-point phase skeletons (adapt after research — don't copy blindly)

| Topic | Possible phases |
|---|---|
| Backend Engineering | Setup & Programming · CS Fundamentals (DSA, networking, OS) · Databases & SQL · HTTP & APIs · Backend Frameworks & Testing · Architecture & Scale (caching, queues, distributed systems) · DevOps for Backend (Docker, CI/CD, cloud, observability) · Mastery |
| JavaScript / Frontend | Setup & Web Basics (HTML/CSS) · JavaScript Core · Browser & DOM · Tooling (npm, bundlers, TS) · Frameworks (React…) · Testing & Performance · Full-stack & Deployment · Mastery |
| DevOps / SRE | Linux & Shell · Networking · Programming & Git · Containers · CI/CD · Cloud & IaC · Kubernetes & Observability · Reliability & Mastery |

## 2. Research process (do this before writing)

1. Survey 3–5 respected curricula for the topic (university courses, official docs learning paths, well-known open roadmaps) to decide nodes and order.
2. For each node pick resources **in this priority**: official docs/tutorials → university courses (MIT OCW, Stanford, Harvard CS50…) → renowned free books → well-known creators/blogs → interactive practice sites.
3. Open each course's **syllabus/table of contents** and write guide steps and checklist items against the real structure (exact lecture/chapter/unit names and numbers).
4. Prefer **current editions**. Courses get re-run with different numbering (e.g. Missing Semester 2026 changed lecture names). Say "2026 edition" when it matters.

## 3. Node rules

| Field | Rules |
|---|---|
| `id` | kebab-case, unique, permanent |
| `title` | ≤ 40 chars, noun phrase |
| `summary` / `why` | 1–2 sentences each; `why` ties the node to real jobs/work |
| `subtopics` | 4–6 short chips |
| `guide` | 4–6 ordered, actionable steps naming the exact resource and sections ("Do X course units 1–3", "Read chapter 4 of Y") |
| `resources` | 4–7, **all free** (free to audit is OK if stated in the note), mixed formats (video + text + practice); note field for "Start here", chapters, caveats like "PDF (downloads)" or "Free to audit; certificate paid" |
| `checklist` | 6–12 concrete, checkable tasks of ~45–120 min, mostly mapped to specific lessons/chapters/exercises, plus 1–3 hands-on "build/implement X" items. Never vague ("learn databases") |
| `project` | One portfolio-worthy deliverable with clear scope and success criteria |
| `mastery` | 3 self-test questions that probe understanding (why/compare/explain), not trivia |

## 4. Alternatives (`alternatives.js`)

- 2–4 per node, **every node**.
- Must be a **different format or teaching style** from the main picks (if main is video → give a free book/notes; if main is a course → give a written guide or interactive tool). Learners who prefer reading must always have a text option.
- Never duplicate a main resource URL. Same verification rules.

## 5. Verification rules (non-negotiable)

1. **Never invent** a URL, video ID, playlist, lecture number, chapter title, or course unit. If you can't confirm it, drop it.
2. Every URL must load **the page its title claims** (not just HTTP 200): compare the page `<title>`.
3. **YouTube**: YouTube returns 200 for missing videos. Verify via `https://www.youtube.com/oembed?format=json&url=<video-or-playlist-url>` and check the returned title matches. (401 = exists but embedding disabled → OK.) Playlist contents need a real browser.
4. **Bot-protected sites** (Kaggle, Khan Academy, LeetCode, Real Python, Runestone, Coursera…) return 403/"Just a moment" to scripts — verify them in a real browser before keeping.
5. Watch for **soft 404s / redirects**: a deep link that silently redirects to a homepage, a domain that changed owners (e.g. a docs site now redirecting to an unrelated product), or a course that moved. Update to the canonical final URL.
6. **Case-sensitive paths** exist (`r4ds.hadley.nz/EDA.html` works, `/eda.html` 404s).
7. Sites that shut down or changed (e.g. *Papers with Code* is gone) — don't use them.
8. **PDF links** often download instead of opening — say "PDF" in the note.
9. Free-ness: state the truth (e.g. Coursera: "Free to audit (videos & readings); certificate is paid; financial aid available").
10. Run `npm run check-links` (covers resources + alternatives) until it prints **All links OK**; manually confirm everything it lists as "Blocked by bot protection".

### Real mistakes caught in the AI/ML audit — don't repeat them
- Checklist said 3Blue1Brown linear algebra "Ch. 8–11 … change of basis" — change of basis is **Ch. 13**. → Always check chapter numbers against the playlist.
- MIT 18.06SC unit contents were wrong (eigenvalues are in **Unit II**, not III). → Read the OCW unit pages.
- fast.ai "Part 1 lessons 1–9" — Part 1 is **1–8**; 9 starts Part 2.
- Cited a CS224n "seq2seq lecture" that no longer exists in the current offering.
- CS229 notes described as "Part I–II" — current PDF uses different structure; describe sections by **topic** when numbering can't be verified.
- `skills.github.com` redirected to a hub; the actual course lives at `github.com/skills/introduction-to-github`.
- A docs domain started redirecting to an unrelated company page → replaced the resource.
- A Hugging Face doc page changed into a different topic → replaced.

## 6. Writing style
- Plain, direct, encouraging but not fluffy. Second person ("you").
- Concrete numbers ("solve 6+ problems", ">85% accuracy").
- Projects should build on each other where natural and end in a public portfolio.

## 7. Topic-specific strings (outside the data files)
See `05-BUILD-AND-VERIFY.md → Rename checklist` (title, subtitle, package name, export filename, server log, launcher comments, settings text, README, port).
