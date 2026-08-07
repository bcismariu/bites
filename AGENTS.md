# Bites — Operating Manual

This repository **is** the app. It is a personal food, nutrition & activity
tracker for Bogdan, operated by Claude in conversation. There is no code, no
build, no deployment: the user reports what they eat (and how they move),
Claude updates plain-Markdown files, and every change is committed to git.
The git history is the activity log; the files are the state.

Goals, in order: effortless tracking, good shape, great culinary experience,
steady energy levels.

## Repository layout

| Path | Purpose |
|---|---|
| `AGENTS.md` | This manual. Keep it current when conventions change. |
| `CLAUDE.md` | Quick-reference checklist; imports this manual. |
| `README.md` | Human-facing intro. |
| `profile/preferences.md` | Food preferences: usual brands/varieties, portion habits, likes, dislikes, allergies. **Check this before logging anything ambiguous.** |
| `profile/targets.md` | Daily kcal & macro targets and the goal behind them. |
| `foods/dictionary.md` | The personal food dictionary: per-100 g nutrients, usual portion and key-micro tags for every food that has appeared in the log. Source of truth for repeated foods. |
| `foods/micronutrients.md` | The tracked micronutrient list: tags, daily needs, rhythms, best sources. Micros are tracked as **coverage, not counts**. |
| `foods/labels/` | One file per labelled product, summarized from label screenshots the user provides. Referenced from the dictionary. |
| `log/YYYY/MM/YYYY-MM-DD.md` | One file per day: meals, portions, nutrients, day totals — plus workouts and notable activity. |
| `summaries/` | Generated reviews (weekly `YYYY-Www.md`, monthly `YYYY-MM.md`). Written on request; derived data, never the source of truth. |

## What gets stored — facts only

Conversation is chatty; the repo is not. Questions, suggestions, hypotheticals
and planning ("what should I eat tonight?", "thinking of ordering pizza")
leave **no trace** in the files. The only things ever committed are confirmed
facts:

- food the user confirms they **ate** (or drank)
- activity the user confirms they **did**
- clarified preferences and habits
- product label data, weight/stats updates, target changes
- notes the user explicitly asks to have recorded

**Photos are never committed.** When the user sends a photo — a meal to
estimate or a product label to read — extract the information (into the log,
`foods/dictionary.md`, or `foods/labels/`) and discard the image. The
extracted text is the record.

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
| Food | Portion | kcal | Protein | Carbs | Fat | Fiber | Sugar | Added |
|---|---|---|---|---|---|---|---|---|
| Apple (Golden) | 2 × 150 g | 156 | 0.9 | 41.4 | 0.6 | 7.2 | 31.2 | 0 |

## Activity
| Activity | Duration | Intensity | ~kcal |
|---|---|---|---|
| Run, easy pace | 40 min | moderate | ~420 (est.) |

## Day totals
| | kcal | Protein | Carbs | Fat | Fiber | Sugar | Added |
|---|---|---|---|---|---|---|---|
| **Eaten** | 156 | 0.9 | 41.4 | 0.6 | 7.2 | 31.2 | 0 |
| **Target** | 2450 | 140 | 290 | 80 | 35 | — | <35 |
| **Remaining** | 2294 | 139.1 | 248.6 | 79.4 | 27.8 | — | 35.0 |

Micros covered: vitC, k

## Notes
Optional: energy levels, hunger, context the user mentions.
```

Meal sections appear in eaten order; only meals that happened are present.
Multiple snacks are separate `## Snack` sections with a time in parentheses if
known, e.g. `## Snack (16:30)`.

## Units, rounding, columns

- Quantities in **grams** (ml for liquids, treated 1:1). Portion column shows
  the human framing plus grams: `1 slice (35 g)`, `2 × 150 g`.
- Nutrients tracked per item: **kcal, protein, carbs, fat, fiber, sugar,
  added sugar**.
- **Sugar** is total sugar; **Added** is the free-sugar part (WHO definition:
  sugars added in production or preparation, plus honey, syrups and fruit
  **juice**). Sugar naturally present in whole fruit, vegetables and milk
  (lactose) is *not* added sugar and stays out of that column.
  - Whole foods → `Added` is 0.
  - Labelled products → read the ingredients: no sugar/syrup listed means the
    declared sugars are intrinsic, so `Added` is 0.
  - Sweetened drinks, sauces, dressings, baked goods → estimate the added
    part; for a drink sweetened with sugar it is effectively all of it.
- Total sugar has no target; **added sugar does: < 35 g/day** (see
  `profile/targets.md`). Only the Added row gets a Remaining value.
- kcal rounded to integers; macros to 0.1 g.
- All nutrient values in log rows are for the portion eaten, not per 100 g.
- Micronutrients are never counted numerically. The `Micros covered:` line
  under Day totals is the union of the day's dictionary tags
  (see `foods/micronutrients.md`); update it with every logged meal.

## The food dictionary

Every food that gets logged must exist in `foods/dictionary.md`, keyed by the
name used in log rows. Entries store per-100 g values (including the
`Added` split), the user's usual portion, and the source:

- `label` — from a product label (link the file in `foods/labels/`)
- `estimate` — Claude's generic nutritional knowledge (USDA-typical values)

When the user sends a **label screenshot**, create
`foods/labels/<product-slug>.md` with brand, product name, per-100 g table,
serving size, and anything notable (additives, claims), then add or update the
dictionary entry pointing to it. Label data always overrides estimates.

## Estimating meals from photos

When the user sends a meal photo, identify **what** is on the plate and
estimate **how much** of each item — quantity matters as much as identity
(100 g vs. 250 g of chicken breast is a different day). Method:

1. **Scale first.** Anchor portion sizes to references in frame: plate
   diameter (~26–27 cm for a dinner plate), cutlery, glasses, hands, product
   packaging. Judge food height/thickness, not just coverage area.
2. **Estimate per item, in grams**, rounded to sensible steps — 10 g for
   small/dense items (cheese, nuts, dressing), 25 g for mains and sides. No
   pharmacy precision, no hedging into uselessness either.
3. **Count the invisible.** Cooking fat on pan-fried or roasted food
   (~5–10 g oil/butter), dressings, sauces, sugar in drinks — unless the
   preparation is known to be lean.
4. **State assumptions with the numbers** in the reply: "chicken breast
   ~200 g (covers a third of the plate, thick fillet), rice ~180 g, ~7 g oil
   assumed for the pan." The user corrects what's off; corrections about
   *their* usual portions go to `preferences.md`.
5. **Ask at most one question**, only when the answer swings the meal
   materially (fried or grilled? regular or zero cola?). Otherwise estimate
   and flag.
6. Log rows from photos are marked `(est.)` as usual. When the same dish
   recurs, reuse its established portion from `preferences.md` /
   `dictionary.md` and just sanity-check against the photo.

If a photo is ambiguous but low-stakes (a side salad), estimate silently;
if it is ambiguous and calorie-dense (a creamy pasta, a burger), lean toward
the **higher** plausible estimate — under-logging is the systematic risk in
food tracking.

## Activity & workouts

Workouts and any significant physical activity go in the same day file, under
an `## Activity` section (after the meals, before Day totals). One row per
activity: what, duration, perceived intensity, and an estimated kcal burn
marked `(est.)`.

- Activity is **informational**: it does not change the day's food targets or
  the Remaining row. The fixed targets already assume a moderately active
  life (`profile/targets.md`); if training volume changes durably, revisit
  the targets themselves rather than adjusting day by day.
- Recurring workout habits (usual routes, class schedules, gym routine)
  belong in `profile/preferences.md` like any other habit, so "my usual run"
  resolves without questions.

## Suggestions

When asked for meal/snack ideas: read today's log, `targets.md`,
`preferences.md`, and the recent days' `Micros covered:` lines; suggest
things that (a) the user demonstrably enjoys — preferences and log history,
(b) fit the remaining budget, (c) close macro gaps (protein first), and
(d) close **micro gaps on the week's rhythm** — e.g. oily fish when omega-3
is overdue, not just anything with protein — while (e) keeping variety and
pleasure high. Never suggest anything in the allergies/avoid list.
Suggestions are conversation only — nothing is written until the user
actually eats something.

## Weekly & monthly summaries

On request (`summaries/YYYY-Www.md` or `YYYY-MM.md`): averages vs. targets
for macros, notable days, and a **micro coverage table** — for each tracked
micronutrient, on how many days a good source appeared and whether its rhythm
was met, ending with 2–3 concrete additions for the coming week. Summaries
are derived from day files; regenerate rather than hand-edit.

## Commit conventions

One logical change per commit, message prefixed by area:

- `log: 2026-08-07 lunch — chicken salad, bread`
- `log: 2026-08-07 fix — apples were 3, not 2`
- `activity: 2026-08-07 — 40 min easy run`
- `food: add Lidl skyr natural (label)`
- `profile: apples default to Golden ~150 g`
- `summary: 2026-W32`
- `meta: <manual/README/structure changes>`

Work directly on **`main`** — no feature branches — and push after
committing. Do not rewrite history of logged days; corrections are new
commits.

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
