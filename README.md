# Bites 🍽️

A personal food & nutrition tracker where **the git repo is the app**.

Meals are logged by talking to Claude, which maintains plain-Markdown files
and commits every change. The commit history is the activity feed; the files
are the database. No build, no server, no lock-in — just readable text.

- **What I eat** → `log/YYYY/MM/YYYY-MM-DD.md`, one file per day, with
  nutrients and running totals.
- **What I like** → `profile/preferences.md`, so "two apples" always means
  *my* apples.
- **What I aim for** → `profile/targets.md`.
- **What things contain** → `foods/dictionary.md`, a personal food database
  that grows with every new food, backed by label summaries in
  `foods/labels/`.
- **How it all works** → [`AGENTS.md`](AGENTS.md), the operating manual.

Aims: stay in good shape, keep a great culinary experience, and hold steady
energy levels.
