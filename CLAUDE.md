# Bites — Claude quick reference

This repository **is** the app: a personal food, nutrition & activity tracker
operated by Claude through conversation and git commits. The full operating
manual is `AGENTS.md` (imported below) — read it before changing anything.

The always-do checklist:

1. Work directly on **`main`**. Commit every logical change, push after
   committing. No feature branches.
2. Before logging food, check `profile/preferences.md` and
   `foods/dictionary.md` — "two apples" means *his* apples.
3. Every new food gets a dictionary entry first; label data beats estimates.
4. After any edit to a day file, recompute its **Day totals**.
5. Anything the user clarifies once (brand, portion, habit) is written to
   `profile/preferences.md` immediately — never ask twice.
6. Keep files tidy and phone-readable; keep diffs small.

@AGENTS.md
