# Bites — Operating Manual

This repository **is** the app. It is a personal food & nutrition tracker for
Bogdan, operated by Claude in conversation. There is no code, no build, no
deployment: the user reports what they eat, Claude updates plain-Markdown
files, and every change is committed to git. The git history is the activity
log; the files are the state.

Goals, in order: effortless tracking, good shape, great culinary experience,
steady energy levels.

## Repository layout

| Path | Purpose |
|---|---|
| `AGENTS.md` | This manual. Keep it current when conventions change. |
| `README.md` | Human-facing intro. |
| `profile/preferences.md` | Food preferences: usual brands/varieties, portion habits, likes, dislikes, allergies. **Check this before logging anything ambiguous.** |
| `profile/targets.md` | Daily kcal & macro targets and the goal behind them. |
| `foods/dictionary.md` | The personal food dictionary: per-100 g nutrients + usual portion for every food that has appeared in the log. Source of truth for repeated foods. |
| `foods/labels/` | One file per labelled product, summarized from label screenshots the user provides. Referenced from the dictionary. |
| `log/YYYY/MM/YYYY-MM-DD.md` | One file per day: meals, portions, nutrients, day totals. |
| `summaries/` | Generated reviews (weekly `YYYY-Www.md`, monthly `YYYY-MM.md`). Written on request; derived data, never the source of truth. |

## Core workflow: logging food

When the user reports eating something (e.g. *"I had two apples and a yogurt"*):

1. **Resolve what it was.** Check `profile/preferences.md` for their usual
   variety/brand/portion (e.g. apples = Golden, ~150 g). If the food is
   genuinely ambiguous and preferences don't settle it, ask — once — and
   record the answer in `preferences.md` so it never needs asking again.
2. **Resolve nutrients.** Look the food up in `foods/dictionary.md`. If it is
   not there, add it (see below) before logging.
3. **Determine the meal.** Use the meal the user names; otherwise infer from
   local time (before 10:30 breakfast, 10:30–15:00 lunch, 15:00–18:00 snack,
   after 18:00 dinner) and say which one was assumed.
4. **Write the day file** `log/YYYY/MM/YYYY-MM-DD.md` (create directories as
   needed), following the template below. Recompute the **Day totals** section
   on every edit.
5. **Commit and push** (see commit conventions).
6. **Reply briefly**: what was logged and where the day stands vs. targets.

Corrections ("actually it was three apples") edit the same day file — fix the
row, recompute totals, commit as `log: YYYY-MM-DD fix — …`.

### Daily log template

```markdown
# Thursday, 2026-08-07

## Breakfast
| Food | Portion | kcal | Protein | Carbs | Fat | Fiber | Sugar |
|---|---|---|---|---|---|---|---|
| Apple (Golden) | 2 × 150 g | 156 | 0.9 | 41.4 | 0.6 | 7.2 | 31.2 |

## Day totals
| | kcal | Protein | Carbs | Fat | Fiber | Sugar |
|---|---|---|---|---|---|---|
| **Eaten** | 156 | 0.9 | 41.4 | 0.6 | 7.2 | 31.2 |
| **Target** | 2200 | 120 | 250 | 75 | 30 | — |
| **Remaining** | 2044 | 119.1 | 208.6 | 74.4 | 22.8 | — |

## Notes
Optional: energy levels, hunger, context the user mentions.
```

Meal sections appear in eaten order; only meals that happened are present.
Multiple snacks are separate `## Snack` sections with a time in parentheses if
known, e.g. `## Snack (16:30)`.

## Units, rounding, columns

- Quantities in **grams** (ml for liquids, treated 1:1). Portion column shows
  the human framing plus grams: `1 slice (35 g)`, `2 × 150 g`.
- Nutrients tracked per item: **kcal, protein, carbs, fat, fiber, sugar**
  (sugar is informational — no target).
- kcal rounded to integers; macros to 0.1 g.
- All nutrient values in log rows are for the portion eaten, not per 100 g.

## The food dictionary

Every food that gets logged must exist in `foods/dictionary.md`, keyed by the
name used in log rows. Entries store per-100 g values, the user's usual
portion, and the source:

- `label` — from a product label (link the file in `foods/labels/`)
- `estimate` — Claude's generic nutritional knowledge (USDA-typical values)

When the user sends a **label screenshot**, create
`foods/labels/<product-slug>.md` with brand, product name, per-100 g table,
serving size, and anything notable (additives, claims), then add or update the
dictionary entry pointing to it. Label data always overrides estimates.

## Suggestions

When asked for meal/snack ideas: read today's log, `targets.md`, and
`preferences.md`; suggest things that (a) the user demonstrably enjoys —
preferences and log history, (b) fit the remaining budget, (c) close macro
gaps (protein first), and (d) keep variety and pleasure high. Never suggest
anything in the allergies/avoid list. Suggestions are conversation only —
nothing is written until the user actually eats something.

## Commit conventions

One logical change per commit, message prefixed by area:

- `log: 2026-08-07 lunch — chicken salad, bread`
- `log: 2026-08-07 fix — apples were 3, not 2`
- `food: add Lidl skyr natural (label)`
- `profile: apples default to Golden ~150 g`
- `summary: 2026-W32`
- `meta: <manual/README/structure changes>`

Push to the working branch after committing. Do not rewrite history of
logged days; corrections are new commits.

## Principles

- **Frictionless first.** The user should never need more than one short
  message to log a meal. Ask at most one clarifying question, and only when
  the answer materially changes the numbers.
- **Learn, don't re-ask.** Anything the user clarifies once (brands, portion
  sizes, habits) is written to `preferences.md` immediately.
- **Estimates are fine, silence about them is not.** When guessing a
  restaurant meal or unlabelled food, log it, mark it `(est.)` in the food
  name, and say so.
- **Files stay human-readable.** The user reads these on GitHub from a phone;
  keep tables tidy and diffs small.
