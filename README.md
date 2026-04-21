# Portfolio

> Personal portfolio built with React. Live at **[bakk-f4.github.io/portfolio](https://bakk-f4.github.io/portfolio)**

---

## Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, React Router v6 (HashRouter) |
| UI | React Bootstrap, MUI Joy, Framer Motion |
| Background FX | Canvas (Matrix rain) |
| Data | Firebase Realtime Database |
| Deployment | GitHub Pages via `gh-pages` |

---

## Pages

**`/`** — Home. Brief intro with photo.

**`/Projects`** — Pulls public repos from GitHub API via Octokit. Icon grid of languages/tools.

**`/career`** — Interactive timeline. Click a job to see details with animated panel transition.

**`/Contacts`** — Contact form + Snake minigame with a shared leaderboard (scores saved to Firebase, visible to all visitors).

---

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy

```bash
npm run deploy
```

Builds and pushes to the `gh-pages` branch. GitHub Pages serves from there.

---

## Firebase setup

The leaderboard uses Firebase Realtime Database. To run with a working leaderboard:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Realtime Database** (europe-west1)
3. Set rules:
```json
{
  "rules": {
    "snakeScores": {
      ".indexOn": "score",
      ".read": true,
      ".write": true
    }
  }
}
```
4. Update `src/firebase.js` with your project config
