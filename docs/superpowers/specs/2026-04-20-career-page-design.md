# Career Page Design Spec
**Date:** 2026-04-20
**Status:** Approved

## Overview

Add a `/career` route to the portfolio. Clean warm-minimal aesthetic (off-white/cream, warm neutrals — intentionally different from the existing dark `#212529` style). Vertical timeline with split-panel interaction driven by Framer Motion.

---

## Visual Design

**Aesthetic:** Warm Minimal
- Background: `#f8f7f4` (off-white / cream)
- Text: `#1a1a1a` (near-black)
- Muted text: `#777` / `#999`
- Accent: `#8b6f47` (warm amber-brown) — active states, dots, chip text
- Chip background: `#e8e4dc`
- Border/divider: `#e8e4dc`
- Active item hover background: `#eee9e0`

**Typography:** System UI sans-serif. Small uppercase labels with `letter-spacing: 0.06em`.

---

## Route & Navigation

- Route: `/career` — added to `src/Routes.js`. **Note:** current `Routes.js` uses React Router v5 syntax; migrate to v6 `<Routes>` + `<Route element={<Career />}>` when adding new route.
- Navbar: add "Career" `Nav.Link` to `src/components/navbar.js`

---

## Data

**File:** `src/data/career.json`

**Schema:**
```json
[
  {
    "id": "string",
    "role": "string",
    "company": "string",
    "period": "string",
    "location": "string",
    "description": "string",
    "tech": ["string"],
    "achievements": ["string"],
    "links": [{ "label": "string", "url": "string" }]
  }
]
```

**Content:** 3 realistic .NET full stack developer entries (intern → junior → mid/senior arc). Statically imported — no `fetch`, no async, no loading state.

---

## Component Architecture

```
src/
  data/
    career.json
  pages/
    Career.js                  ← page wrapper, imports JSON, passes to Timeline
  components/
    career/
      Timeline.js              ← layout container, manages selectedId state
      TimelineItem.js          ← single timeline card
      CareerDetailPanel.js     ← animated detail panel
  my-css/
    career.css                 ← warm minimal styles
```

### `Career.js` (page)
- Imports `career.json` statically
- Renders full-page warm container with page title
- Renders `<Timeline items={data} />`

### `Timeline.js`
- State: `selectedId` (string | null)
- Layout: `motion.div` with `layout` prop — two child columns
  - Left col (`motion.div layout`): timeline list, `width: selectedId ? '38%' : '100%'`
  - Right col: `AnimatePresence` wrapping `CareerDetailPanel`
- `min-height: 60vh` on container — prevents layout shift on load
- On desktop: side-by-side split. On mobile (`< 768px`): timeline full width, MUI `Drawer` from bottom.

### `TimelineItem.js`
Props: `item`, `isActive`, `onClick`
- Dot (circle), year range, role title, company name
- `motion.div` with `whileHover={{ scale: 1.02 }}` and `whileTap={{ scale: 0.98 }}`
- Active: warm amber dot + `#eee9e0` background

### `CareerDetailPanel.js`
Props: `item`, `onClose` (mobile only)
- `motion.div` mount animation: `x: 40 → 0`, `opacity: 0 → 1`, `duration: 0.25`
- Content switches via `key={item.id}` → cross-fade on item change
- Sections: role title, company + period, description, tech chips, achievements list, links
- Chips: warm `#e8e4dc` bg, `#8b6f47` text, `border-radius: 20px`
- Achievements: left border `2px solid #e8e4dc`, small muted text

---

## Animations (Framer Motion)

| Trigger | Animation |
|---------|-----------|
| First item click | Timeline col shrinks via `layout`, panel slides in (`x: 40→0, opacity: 0→1`) |
| Switch item | Panel content cross-fades via `key` change + `AnimatePresence` |
| Close / deselect | Panel exits (`x: 40, opacity: 0`), timeline expands back via `layout` |
| Item hover | `scale: 1.02` |
| Item tap | `scale: 0.98` |

Transition: `spring` with `stiffness: 300, damping: 30` for layout shifts. `duration: 0.25` for panel fade.

---

## Mobile Behavior (`< 768px`)

- Timeline: full width, vertical list
- On item click: MUI `Drawer` opens from bottom (`anchor="bottom"`)
- Drawer contains full `CareerDetailPanel` content
- Drawer has close handle / close button
- No split layout on mobile

---

## Performance / No Layout Shift

- JSON statically imported → synchronous, no loading state, no flash
- Container `min-height: 60vh` → stable dimensions from first render
- Framer `layout` prop handles resize without reflow jumps
- Fonts already loaded via existing `src/my-css/fonts/fonts.css`
- No new font loads on this page

---

## Dependencies

- `framer-motion` — add via `npm install framer-motion`
- MUI `Drawer` — already available (`@mui/material` in package.json)

---

## Out of Scope

- No server-side data fetching
- No edit/admin UI
- No animations on page enter (just the panel interaction)
- No pagination (career.json expected ≤ 10 entries)
