# Targets

## Stats

| | |
|---|---|
| Born | 1984-09-09 (41) |
| Height | 187 cm |
| Weight | **80.8 kg** _(measured 2026-08-09, morning, after the toilet, naked)_ |
| BMI | 23.1 — healthy range |
| Body fat | **~22.6 %** _(bioimpedance scale, 2026-08-09)_ → fat ~18.3 kg, lean ~62.7 kg |
| Muscle mass | **59.5 kg** _(2026-08-09)_ — the number to protect during the cut |
| Visceral fat | 11 (scale index; 1–9 normal, 10–14 elevated) — baseline to watch |
| Goal | **lose fat** — visible abs. Phase 1 target ~12 % body fat (~71–73 kg), then reassess. |

The 86 kg in the first version of this file was the user's own rough guess;
the scale says 80.8 kg. All targets below are recomputed from the real
number.

Estimated BMR (Mifflin-St Jeor): ~1780 kcal. Activity level: **light** —
desk job, ~45 min of walking on weekdays (commute + lunch), gym restarted
2026-08-08 aiming for 2×/week. Factor ~1.35 → estimated TDEE ~2400 kcal.
Revisit once the gym habit has a few weeks of history.

## Daily targets

Cutting phase from 2026-08-08: TDEE ~2400 minus a ~500 kcal deficit, i.e.
about **0.5 kg of fat per week**. Protein goes *up*, not down — in a deficit
it is what protects muscle from being burned alongside the fat.

| Daily target | Value |
|---|---|
| Calories | 1900 kcal |
| Protein | 160 g (~2.0 g/kg) |
| Carbs | 170 g |
| Fat | 65 g |
| Fiber | 35 g |
| Added sugar | < 35 g (limit) |

Stated precisely, the whole plan is one sentence:

> **Fat: 18.3 kg → ~8.5 kg. Muscle: 59.5 kg → 59.5 kg.**

That lands at ~71–72 kg and ~12 % body fat, roughly **4–5 months** at this
pace. Fat loss is not linear — weeks where the scale stalls are normal and
not a reason to cut further. If muscle mass falls with the fat, the deficit
is too aggressive or protein is too low.

## Weight log

| Date | Weight | Body fat | Muscle | Visceral | Note |
|---|---|---|---|---|---|
| 2026-08-09 | 80.8 kg | — | — | — | first real measurement; morning, after toilet, naked |
| 2026-08-09 | 81.00 kg | 22.6 % | 59.46 kg | 11 | bioimpedance, 08:33 |
| 2026-08-15 | **80.85 kg** | 22.6 % | 59.34 kg | 11 | bioimpedance, 07:02 — **−0.15 kg in 6 days** |

**The scale confirmed the food log.** Average intake over 10–14 Aug was
2177 kcal against an estimated TDEE of ~2400, i.e. a deficit of ~225 kcal/day
≈ 1100 kcal over the period ≈ **0.14 kg of fat**. The scale moved 0.15 kg.
The arithmetic and the measurement agree, which means both the logging and
the TDEE estimate are close to right.

It also confirms the rate is **~0.17 kg/week, roughly a third of the 0.5 kg
planned**. At this pace phase 1 would take about a year rather than 4–5
months.

Body fat %, muscle and visceral did not move — as expected. A 0.15 kg change
is far below what bioimpedance can resolve (its error on body fat is ±3–5
percentage points), and visceral fat responds over 8–12 weeks, not six days.
**At this magnitude only the weight number carries information.**

## On the bioimpedance scale

Useful for **trends under identical conditions**, not for absolute truth.
Read it this way:

- **Body fat %** — believe the direction, not the decimal. BIA error is
  typically ±3–5 points, and hydration moves it. Always measure at the same
  time of day, before eating or drinking.
- **Visceral fat 11** — the most meaningful number on that screen if roughly
  right, since visceral fat is the metabolically risky kind. It is also the
  crudest estimate BIA makes. Worth watching as it falls; not worth alarm.
- **Basal metabolism 1582 kcal** — ignore. Mifflin-St Jeor gives ~1780 and
  Katch-McArdle on the scale's own lean-mass figure gives ~1720; the scale's
  number is an outlier from a proprietary formula. Targets stay based on
  ~2400 TDEE.
- **Water 53 %** — not a problem. 50–65 % is the normal male range, and a
  higher body-fat percentage mechanically lowers it. The "insufficient" tag
  is the app's own threshold.
- **Muscle 59.46 kg, protein 20.3 %** — genuinely good for this height and
  weight, and internally consistent (62.7 kg lean − 3.19 kg "bone" = 59.5).
  Track muscle mass alongside fat: holding it while fat falls is the whole
  point of the cut.
- **Bone mass 3.19 kg, "body type", "body score"** — ignore entirely. BIA
  cannot measure bone, and the scores are gamification.

The screen shows nine figures, but the device only measured **two**: body
weight and electrical impedance. Everything else — fat %, muscle, water,
protein, visceral, bone, BMR — is computed from those two by proprietary
formulas. They agree with each other by construction, so their consistency
is not evidence that any of them is right.

## Notes

- **Added sugar** is the only sugar with a target. 35 g ≈ 6 % of daily
  calories, between the WHO ideal (<5 %, ~30 g) and its upper limit
  (<10 %, ~61 g), and in line with the AHA's 36 g for men. Counted as free
  sugars: anything added in production or preparation, plus honey, syrups and
  fruit juice.
- **Total sugar** stays informational, with no target. Sugar from whole
  fruit, vegetables and milk comes with fiber, water and micronutrients, and
  no guideline limits it — a 110 g total sugar day is fine if most of it is
  fruit.
- Weight updates go in the **Weight log** table above and in the Stats row,
  so trends stay visible in git history.
- Calibrate against reality: weigh weekly, same conditions (morning, after
  the toilet, before eating). Judge the **weekly average**, not single days —
  daily swings are water, not fat. If the average has not moved in 3 weeks,
  trim ~150 kcal.
- **Waist at the navel is the better progress metric than the scale** during
  a cut — muscle gained from the new gym routine can mask fat lost. Measure
  it monthly alongside the weigh-in.
- Strength training is now part of the plan, not optional: in a deficit it is
  what decides whether the lost weight comes off as fat or as muscle.
