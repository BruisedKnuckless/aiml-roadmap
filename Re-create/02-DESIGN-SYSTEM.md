# 02 · Design system

Two visual languages, deliberately combined:

1. **The app** — calm, minimal, Apple-website style (apple.com / macOS / iOS Settings, Reminders, Spotlight).
2. **The honor meter** — a gritty Red Dead Redemption 2–style HUD element: rough black brush-stroke frame, red→grey→white bar, round black badge.

The full stylesheet is in `06-ENGINE-SOURCE.md` (`public/css/styles.css`). Reuse it verbatim; this file explains the intent so nothing gets "improved" away.

---

## Principles
- Light by default, true dark mode via `prefers-color-scheme`, plus a manual override (`html[data-theme="light|dark"]`).
- One typeface: the **system font** (San Francisco on Mac). No web fonts, no icon fonts.
- Hierarchy through **weight and size**, not colour: big bold headlines with tight negative letter-spacing, secondary text in grey.
- Soft depth (subtle shadows, hairline separators), generous whitespace, 14–22 px rounded corners, pill buttons.
- Colour only where it means something: accent blue for actions/progress, green for success/honor gain, red for loss, phase colours as small accents.
- No glow, no neon, no heavy borders, no gradients except the honor bar and progress rings.

## Tokens

| Token | Light | Dark |
|---|---|---|
| `--bg` (page/canvas) | `#f5f5f7` | `#000000` |
| `--surface` (cards, sidebar, drawer) | `#ffffff` | `#1c1c1e` |
| `--surface-2` (grouped lists) | `#fbfbfd` | `#232325` |
| `--fill` (tracks, segmented bg, gray buttons) | `#e8e8ed` | `#2c2c2e` |
| `--fill-2` (inputs, hover) | `#f2f2f5` | `#242426` |
| `--line` (hairlines) | `rgba(0,0,0,.08)` | `rgba(255,255,255,.1)` |
| `--text` | `#1d1d1f` | `#f5f5f7` |
| `--text-2` | `#6e6e73` | `#a1a1a6` |
| `--text-3` | `#86868b` | `#7c7c80` |
| `--accent` | `#0071e3` | `#0a84ff` |
| `--link` | `#0066cc` | `#2997ff` |
| `--good` / `--good-text` | `#34c759` / `#248a3d` | `#30d158` |
| `--bad` / `--bad-text` | `#ff3b30` / `#d70015` | `#ff453a` / `#ff6961` |
| `--glass` (frosted) | `rgba(255,255,255,.72)` | `rgba(28,28,30,.72)` |

Frosted glass = `background: var(--glass); backdrop-filter: saturate(180%) blur(20px);` (top bar, toasts, graph controls, phase rail, search).

**Phase colours** (Apple system palette, one per phase, in order):
`#007aff` blue · `#5856d6` indigo · `#30b0c7` teal · `#34c759` green · `#ff9500` orange · `#ff2d55` pink · `#af52de` purple · `#a2845e` brown (Mastery).
Used for: progress rings, band eyebrow, phase chips, node-chip dots, resource icon tiles, guide step circles. Never for large backgrounds or body text. If a topic needs more than 8 phases, extend with `#64d2ff` (cyan) and `#ffcc00` (yellow — avoid for text).

## Typography
- Base: 14 px / 1.47, letter-spacing −0.01em, antialiased.
- Drawer title 30 px/700 (−0.03em) · band title 26 px/700 · Today date 24 px/700 · stat numbers 21–38 px/700 tabular-nums · section labels (h4) 13 px/600 · meta 11.5–12.5 px in `--text-3`.

## Components (Apple patterns)
- **Segmented control**: grey track (`--fill`, radius 9), selected segment white with a tiny shadow. Used for sidebar tabs, drawer tabs, Appearance, weekdays.
- **Grouped list** (iOS Settings): `--surface-2` container, radius 14, hairline separators inset from the left. Used for tasks, checklists, resources, ledger, phase cards.
- **Round checkbox** (Reminders): 20 px circle, grey ring, fills accent with white check.
- **Buttons**: pill (`border-radius: 980px`). Primary = accent fill + white text; secondary = `--fill`; ghost = link-coloured text; danger = red tint.
- **Banners**: 12 px radius, tinted background (`--good-soft`, `--bad-soft`, `--info-soft`), no border.
- **Toasts**: frosted card, radius 18, coloured circle icon (green ▲ / red ▼).
- **Search**: Spotlight — frosted card, 20 px input, selected row filled accent with white text.
- **Node cards**: white, radius 18, `--shadow-sm`, lift on hover; locked = 55% opacity; selected = 2 px accent ring; expanded = 320 px wide, `--shadow-lg`.
- **Phase bands**: `color-mix(surface 50%, transparent)`, radius 28, centred label with a background patch so edges never run through the title.
- **Welcome sheet**: centred modal card radius 22, radio "option cards" that highlight with accent border + tint when selected, full-width primary button.

## The honor meter (RDR2 style) — keep exactly

```
   ███████████████████████████(◉)███████████████████████████
   ▕ red ▓▓▓▓▓▓▓▓▓▓▓▒▒▒ grey ░░░░░░░░░░░░░░░░░░ white ▏
```

- Container `.rdr-meter`: width `clamp(260px, 32vw, 460px)`, height 52 px (under 900 px wide: `clamp(190px, 46vw, 300px)` — never a % of its parent, which collapses to 0).
- **Frame**: `#0a0a0a`, 28 px tall, radius 3, plus `filter: url(#rdr-rough)` — an SVG `feTurbulence` (fractalNoise, baseFrequency .85, 2 octaves) + `feDisplacementMap` (scale 4.5) that turns straight edges into a ragged brush stroke.
- **Bar**: inset 12 px, 13 px tall, always fully drawn:
  `linear-gradient(90deg, #c1434b 0%, #ad464c 18%, #7d4a4d 38%, #5a5658 50%, #747776 60%, #a8aaa9 80%, #e3e4e3 100%)`.
- **Badge**: 52 px black circle (also rough-filtered), centred at `left: calc(var(--honor) * 1%)` of the bar track, transitions `left .9s`. Pops (scale 1.12) on change.
- **Badge art** (original inline SVG, 64×64 viewBox, clipped to a circle):
  - *Honorable* (side ≠ bad): a hooded coder with glasses behind a laptop whose lid shows `</>`; light grey `#e2e2df` with a grain filter (`#rdr-grain`), black `#0b0b0b` details.
  - *Dishonorable* (side = bad, honor < 48): same composition — red `#b5303a` hood outline, skull face, red laptop with black `</>`.
  - Cross-fade between them (opacity .5 s).
- No visible text under the meter (like the game). Rank/value are in a `sr-only` span, the hover tooltip and the Stats tab.
- Don't use Rockstar's actual artwork (copyright) — the SVGs in the source are original.

## Motion
- Easing `cubic-bezier(.25,.1,.25,1)`. Drawer slide .45 s, node expand .35 s, meter .9 s, toast in .45 s, sheet in .4 s.
- Graph fades in on load; "current" dot pulses slowly (2 s).

## Accessibility
- Honor meter is `role="meter"` with `aria-valuenow`. Focus rings: 3 px accent-soft outline. Keyboard: ⌘K, `/`, Esc, `+`, `-`, `0`, `C`, arrows/Enter in search.
