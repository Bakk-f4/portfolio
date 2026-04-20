# Career Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/career` route with a warm-minimal vertical timeline and animated split-panel detail view.

**Architecture:** Static JSON import feeds a `Timeline` component that manages `selectedId` state. On desktop, clicking a `TimelineItem` shrinks the timeline column to 38% and animates a `CareerDetailPanel` in from the right via Framer Motion. On mobile, a MUI Drawer slides up from the bottom instead.

**Tech Stack:** React 18, Framer Motion, MUI Drawer (already installed), React Router v6, custom CSS.

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Create | `src/data/career.json` | Career entries data |
| Create | `src/my-css/career.css` | Warm minimal styles |
| Create | `src/components/career/TimelineItem.js` | Single timeline card |
| Create | `src/components/career/CareerDetailPanel.js` | Animated detail panel |
| Create | `src/components/career/Timeline.js` | Layout + state orchestrator |
| Create | `src/pages/Career.js` | Page wrapper |
| Create | `src/components/career/Timeline.test.js` | Behavior tests |
| Modify | `src/Routes.js` | Migrate to RR v6 syntax + add /career |
| Modify | `src/components/navbar.js` | Add Career nav link |
| Modify | `.gitignore` | Add `.superpowers/` |

---

## Task 1: Setup

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Install framer-motion**

```bash
npm install framer-motion
```

Expected: `framer-motion` appears in `package.json` dependencies. No errors.

- [ ] **Step 2: Add `.superpowers/` to `.gitignore`**

Open `.gitignore` and add at the end:

```
# superpowers brainstorm files
.superpowers/
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore package.json package-lock.json
git commit -m "chore: install framer-motion"
```

---

## Task 2: Career Data

**Files:**
- Create: `src/data/career.json`

- [ ] **Step 1: Create data directory and career.json**

Create `src/data/career.json` with this content:

```json
[
  {
    "id": "3",
    "role": "Full Stack .NET Developer",
    "company": "Acme Solutions Srl",
    "period": "2023 – present",
    "location": "Genova, IT",
    "description": "Lead development of enterprise web applications using ASP.NET Core and React. Designed RESTful APIs consumed by internal tools and third-party integrations. Introduced Docker-based deployment pipeline that cut staging environment setup from 2 hours to 10 minutes.",
    "tech": ["C#", ".NET 8", "ASP.NET Core", "React", "TypeScript", "SQL Server", "Azure", "Docker", "Entity Framework"],
    "achievements": [
      "Reduced API response time by 40% through query optimization and Redis caching",
      "Led migration of legacy WebForms app to React + .NET 6, cutting bundle size by 55%",
      "Implemented CI/CD pipeline on Azure DevOps for 3 production services"
    ],
    "links": [
      { "label": "Company", "url": "https://example.com" }
    ]
  },
  {
    "id": "2",
    "role": ".NET Developer",
    "company": "Digital Factory SpA",
    "period": "2021 – 2023",
    "location": "Milan, IT",
    "description": "Developed and maintained B2B SaaS platform features. Built backend services in ASP.NET Core and contributed to the React frontend. Collaborated with a cross-functional team of 6 to ship bi-weekly releases.",
    "tech": ["C#", ".NET 6", "ASP.NET Core", "React", "SQL Server", "SignalR", "Azure Service Bus"],
    "achievements": [
      "Built real-time notification system using SignalR serving 2,000+ concurrent users",
      "Refactored authentication layer to use JWT + refresh tokens, eliminating session storage issues",
      "Mentored two junior developers on .NET best practices and code review culture"
    ],
    "links": []
  },
  {
    "id": "1",
    "role": "Junior .NET Developer",
    "company": "WebAgency Srl",
    "period": "2019 – 2021",
    "location": "Genova, IT",
    "description": "First professional role. Maintained and extended ASP.NET MVC web applications for local business clients. Introduced Git workflows to a team that was using FTP deployments. Graduated from internal code review process within 3 months.",
    "tech": ["C#", ".NET Framework 4.8", "ASP.NET MVC", "JavaScript", "jQuery", "SQL Server", "Bootstrap"],
    "achievements": [
      "Delivered 8 client websites across retail and hospitality verticals",
      "Introduced Git branching strategy that eliminated deployment conflicts",
      "Reduced page load times 30% by lazy-loading images and minifying assets"
    ],
    "links": []
  }
]
```

- [ ] **Step 2: Commit**

```bash
git add src/data/career.json
git commit -m "feat: add career data"
```

---

## Task 3: Styles

**Files:**
- Create: `src/my-css/career.css`

- [ ] **Step 1: Create `src/my-css/career.css`**

```css
.career-page {
  min-height: 100vh;
  background: #f8f7f4;
  padding: 2em 0;
}

.career-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2em 2.5em;
}

.career-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 2em;
  letter-spacing: -0.01em;
}

/* ── Timeline split layout ── */

.timeline-container {
  min-height: 60vh;
}

.timeline-split {
  display: flex;
  align-items: flex-start;
  gap: 0;
}

.timeline-list-col {
  flex-shrink: 0;
  padding-right: 1.5em;
  overflow: hidden;
}

.timeline-list-col.has-selection {
  border-right: 1px solid #e8e4dc;
}

/* ── Timeline item ── */

.timeline-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 12px 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 4px;
  transition: background 0.15s ease;
  user-select: none;
}

.timeline-item:hover,
.timeline-item.active {
  background: #eee9e0;
}

.tl-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #c8b89a;
  margin-top: 6px;
  flex-shrink: 0;
  transition: background 0.2s ease;
}

.timeline-item.active .tl-dot {
  background: #8b6f47;
}

.tl-period {
  display: block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #999;
  margin-bottom: 3px;
}

.tl-role {
  font-size: 15px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 2px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tl-company {
  font-size: 13px;
  color: #777;
}

/* ── Detail panel ── */

.career-detail-panel {
  flex: 1;
  padding: 0 0 2em 2em;
  min-width: 0;
}

.detail-role {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 4px 0;
}

.detail-meta {
  font-size: 13px;
  color: #888;
  margin-bottom: 1.5em;
}

.detail-desc {
  font-size: 14px;
  color: #444;
  line-height: 1.75;
  margin-bottom: 1.5em;
}

.detail-section-label {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #aaa;
  margin-bottom: 8px;
}

.tech-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 1.5em;
}

.tech-chip {
  background: #e8e4dc;
  color: #6b5a45;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5em 0;
}

.achievements-list li {
  font-size: 13px;
  color: #555;
  padding: 6px 0 6px 12px;
  border-left: 2px solid #e8e4dc;
  margin-bottom: 4px;
  line-height: 1.5;
}

.detail-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.detail-link {
  font-size: 13px;
  color: #8b6f47;
  text-decoration: none;
  border-bottom: 1px solid #c8b89a;
  padding-bottom: 1px;
  transition: color 0.15s ease;
}

.detail-link:hover {
  color: #5c4a30;
}

/* ── Mobile drawer content ── */

.drawer-content {
  padding: 1.5em 1.5em 2em;
  max-height: 78vh;
  overflow-y: auto;
}

.drawer-close-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5em;
}

.drawer-close-btn {
  background: none;
  border: none;
  font-size: 22px;
  color: #999;
  cursor: pointer;
  padding: 4px 8px;
  line-height: 1;
}

.drawer-close-btn:hover {
  color: #444;
}

/* ── Mobile: full-width timeline ── */

@media (max-width: 767px) {
  .career-container {
    padding: 1.5em 1em;
  }

  .career-title {
    font-size: 2rem;
    margin-bottom: 1.5em;
  }

  .timeline-split {
    flex-direction: column;
  }

  .timeline-list-col {
    width: 100% !important;
    padding-right: 0;
    border-right: none !important;
  }

  .timeline-item {
    padding: 14px 10px;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/my-css/career.css
git commit -m "feat: add career page styles"
```

---

## Task 4: TimelineItem Component

**Files:**
- Create: `src/components/career/TimelineItem.js`

- [ ] **Step 1: Create `src/components/career/TimelineItem.js`**

```jsx
import { motion } from 'framer-motion';

const TimelineItem = ({ item, isActive, onClick }) => (
  <motion.div
    className={`timeline-item${isActive ? ' active' : ''}`}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
  >
    <div className="tl-dot" />
    <div>
      <span className="tl-period">{item.period}</span>
      <h3 className="tl-role">{item.role}</h3>
      <span className="tl-company">{item.company}</span>
    </div>
  </motion.div>
);

export default TimelineItem;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/career/TimelineItem.js
git commit -m "feat: add TimelineItem component"
```

---

## Task 5: CareerDetailPanel Component

**Files:**
- Create: `src/components/career/CareerDetailPanel.js`

- [ ] **Step 1: Create `src/components/career/CareerDetailPanel.js`**

```jsx
import { motion } from 'framer-motion';

const CareerDetailPanel = ({ item, onClose }) => (
  <motion.div
    className="career-detail-panel"
    initial={{ x: 40, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 40, opacity: 0 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
  >
    {onClose && (
      <div className="drawer-close-row">
        <button className="drawer-close-btn" onClick={onClose} aria-label="Close">×</button>
      </div>
    )}

    <h2 className="detail-role">{item.role}</h2>
    <p className="detail-meta">{item.company} · {item.period} · {item.location}</p>
    <p className="detail-desc">{item.description}</p>

    {item.tech.length > 0 && (
      <>
        <div className="detail-section-label">Tech Stack</div>
        <div className="tech-chips">
          {item.tech.map(t => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>
      </>
    )}

    {item.achievements.length > 0 && (
      <>
        <div className="detail-section-label">Achievements</div>
        <ul className="achievements-list">
          {item.achievements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </>
    )}

    {item.links.length > 0 && (
      <div className="detail-links">
        {item.links.map(link => (
          <a
            key={link.label}
            href={link.url}
            className="detail-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    )}
  </motion.div>
);

export default CareerDetailPanel;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/career/CareerDetailPanel.js
git commit -m "feat: add CareerDetailPanel component"
```

---

## Task 6: Timeline Component

**Files:**
- Create: `src/components/career/Timeline.js`

- [ ] **Step 1: Create `src/components/career/Timeline.js`**

```jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import TimelineItem from './TimelineItem';
import CareerDetailPanel from './CareerDetailPanel';

const Timeline = ({ items }) => {
  const [selectedId, setSelectedId] = useState(null);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const selected = items.find(i => i.id === selectedId) ?? null;

  const handleSelect = (id) => {
    setSelectedId(prev => prev === id ? null : id);
  };

  return (
    <div className="timeline-container">
      {isMobile ? (
        <>
          <div className="timeline-list-col">
            {items.map(item => (
              <TimelineItem
                key={item.id}
                item={item}
                isActive={selectedId === item.id}
                onClick={() => handleSelect(item.id)}
              />
            ))}
          </div>
          <Drawer
            anchor="bottom"
            open={!!selected}
            onClose={() => setSelectedId(null)}
            PaperProps={{ style: { borderRadius: '12px 12px 0 0' } }}
          >
            <div className="drawer-content">
              {selected && (
                <CareerDetailPanel item={selected} onClose={() => setSelectedId(null)} />
              )}
            </div>
          </Drawer>
        </>
      ) : (
        <div className="timeline-split">
          <motion.div
            className={`timeline-list-col${selected ? ' has-selection' : ''}`}
            animate={{ width: selected ? '38%' : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {items.map(item => (
              <TimelineItem
                key={item.id}
                item={item}
                isActive={selectedId === item.id}
                onClick={() => handleSelect(item.id)}
              />
            ))}
          </motion.div>
          <AnimatePresence mode="wait">
            {selected && (
              <CareerDetailPanel key={selected.id} item={selected} />
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Timeline;
```

- [ ] **Step 2: Commit**

```bash
git add src/components/career/Timeline.js
git commit -m "feat: add Timeline component"
```

---

## Task 7: Tests

**Files:**
- Create: `src/components/career/Timeline.test.js`

- [ ] **Step 1: Write failing test**

Create `src/components/career/Timeline.test.js`:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Timeline from './Timeline';

const mockItems = [
  {
    id: '1',
    role: 'Junior Developer',
    company: 'Corp A',
    period: '2019 – 2021',
    location: 'Milan, IT',
    description: 'Did stuff.',
    tech: ['C#', 'React'],
    achievements: ['Built things'],
    links: []
  },
  {
    id: '2',
    role: 'Senior Developer',
    company: 'Corp B',
    period: '2021 – present',
    location: 'Rome, IT',
    description: 'Did more stuff.',
    tech: ['.NET 8'],
    achievements: ['Built more things'],
    links: [{ label: 'Site', url: 'https://example.com' }]
  }
];

jest.mock('@mui/material/useMediaQuery', () => () => false);

test('renders all timeline items', () => {
  render(<Timeline items={mockItems} />);
  expect(screen.getByText('Junior Developer')).toBeInTheDocument();
  expect(screen.getByText('Senior Developer')).toBeInTheDocument();
});

test('detail panel hidden before any click', () => {
  render(<Timeline items={mockItems} />);
  expect(screen.queryByText('Did stuff.')).not.toBeInTheDocument();
});

test('detail panel shows on item click', () => {
  render(<Timeline items={mockItems} />);
  fireEvent.click(screen.getByText('Junior Developer'));
  expect(screen.getByText('Did stuff.')).toBeInTheDocument();
});

test('switching items updates panel content', () => {
  render(<Timeline items={mockItems} />);
  fireEvent.click(screen.getByText('Junior Developer'));
  expect(screen.getByText('Did stuff.')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Senior Developer'));
  expect(screen.getByText('Did more stuff.')).toBeInTheDocument();
});

test('clicking active item closes panel', () => {
  render(<Timeline items={mockItems} />);
  fireEvent.click(screen.getByText('Junior Developer'));
  expect(screen.getByText('Did stuff.')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Junior Developer'));
  expect(screen.queryByText('Did stuff.')).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests — expect failure**

```bash
npm test -- --watchAll=false --testPathPattern=Timeline.test
```

Expected: FAIL — `Timeline` component doesn't exist yet. (Already created in Task 6, so tests should pass — run to confirm.)

- [ ] **Step 3: Run tests — confirm pass**

```bash
npm test -- --watchAll=false --testPathPattern=Timeline.test
```

Expected: All 5 tests PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/career/Timeline.test.js
git commit -m "test: add Timeline behavior tests"
```

---

## Task 8: Career Page

**Files:**
- Create: `src/pages/Career.js`

- [ ] **Step 1: Create `src/pages/Career.js`**

```jsx
import careerData from '../data/career.json';
import Timeline from '../components/career/Timeline';
import '../my-css/career.css';

const Career = () => (
  <div className="career-page">
    <div className="career-container">
      <h1 className="career-title">career</h1>
      <Timeline items={careerData} />
    </div>
  </div>
);

export default Career;
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Career.js
git commit -m "feat: add Career page"
```

---

## Task 9: Routes Migration + /career

**Files:**
- Modify: `src/Routes.js`

Current `Routes.js` uses React Router v5 API. React Router v6 is installed. Migrate and add `/career`.

**Warning:** `Routes` is both the local component name and a named export from `react-router-dom`. Use the alias `RouterRoutes` for the import.

- [ ] **Step 1: Replace `src/Routes.js` entirely**

```jsx
import { BrowserRouter as Router, Routes as RouterRoutes, Route } from 'react-router-dom';
import { Projects } from './pages/Project';
import { Contacts } from './pages/Contacts';
import Career from './pages/Career';

export const Routes = () => (
  <Router>
    <RouterRoutes>
      <Route path="/" element={<Projects />} />
      <Route path="/Contacts" element={<Contacts />} />
      <Route path="/career" element={<Career />} />
    </RouterRoutes>
  </Router>
);
```

- [ ] **Step 2: Verify app still starts**

```bash
npm start
```

Open `http://localhost:3000` — home page loads. Open `http://localhost:3000/career` — Career page loads with warm cream background and timeline.

- [ ] **Step 3: Commit**

```bash
git add src/Routes.js
git commit -m "feat: migrate router to v6 and add /career route"
```

---

## Task 10: Navbar

**Files:**
- Modify: `src/components/navbar.js`

- [ ] **Step 1: Add Career link to navbar**

In `src/components/navbar.js`, find the `<Nav>` block containing the Home, Projects, and Contact links. Add `Career` between `Projects` and `Contact`:

```jsx
<Nav.Link eventKey={3} href="/career">
  Career
</Nav.Link>
```

The full `<Nav>` block after the change:

```jsx
<Nav>
  <Nav.Link href="/">Home</Nav.Link>
  <Nav.Link eventKey={2} href="Projects">
    Projects
  </Nav.Link>
  <Nav.Link eventKey={3} href="/career">
    Career
  </Nav.Link>
  <Nav.Link eventKey={4} href="Contacts">
    Contact
  </Nav.Link>
</Nav>
```

- [ ] **Step 2: Verify in browser**

```bash
npm start
```

Check: navbar shows Home, Projects, Career, Contact. Clicking Career loads `/career` page.

- [ ] **Step 3: Commit**

```bash
git add src/components/navbar.js
git commit -m "feat: add Career link to navbar"
```

---

## Verification Checklist

After all tasks complete:

- [ ] `npm test -- --watchAll=false` — all tests pass
- [ ] `http://localhost:3000/career` loads with cream background, no dark flash
- [ ] Timeline items visible, clicking one shrinks list to 38% and panel slides in
- [ ] Switching items cross-fades panel content
- [ ] Clicking active item again collapses panel
- [ ] Resize to `< 768px` — timeline full width, click opens bottom drawer
- [ ] Navbar Career link works from all pages
- [ ] No console errors
