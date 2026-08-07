# Tracked micronutrients

The commonly-neglected nutrients this system watches, beyond macros. They are
tracked as **coverage, not counts**: a food "covers" a micronutrient when a
usual portion provides a meaningful share (roughly ≥15–20 %) of the daily
need. Dictionary entries carry the tags; day files list what was covered;
weekly summaries expose the gaps.

Reference needs are for a man in his 40s.

| Tag | Nutrient | Daily need | Rhythm to aim for | Best sources |
|---|---|---|---|---|
| `vitD` | Vitamin D | 15–20 µg (600–800 IU) | most days (sun counts in summer) | oily fish, eggs, fortified dairy |
| `ω3` | Omega-3 (EPA/DHA) | ~250–500 mg | oily fish ~2×/week | salmon, sardines, mackerel; ALA: walnuts, chia |
| `vitC` | Vitamin C | 90 mg | daily | citrus, peppers, berries, kiwi, broccoli |
| `iron` | Iron | 8 mg | most days | red meat, legumes, spinach (pair with vitC) |
| `ca` | Calcium | ~1000 mg | daily | dairy, canned fish with bones, leafy greens |
| `mg` | Magnesium | 400–420 mg | daily | nuts, seeds, legumes, whole grains, dark chocolate |
| `k` | Potassium | ~3400 mg | daily | fruit, vegetables, potatoes, beans, dairy |
| `b12` | Vitamin B12 | 2.4 µg | most days | meat, fish, eggs, dairy |
| `zn` | Zinc | 11 mg | most days | meat, shellfish, seeds, legumes |

Fiber is also in this "neglected" family but is tracked numerically with the
macros (target 35 g/day).

## How it flows

- `foods/dictionary.md` → **Key micros** column: tags a usual portion
  meaningfully provides.
- Day file → one `Micros covered:` line under Day totals, the union of the
  day's tags.
- Weekly summary → per-micro coverage table (days with a good source /
  rhythm met?) and what to add next week.
- Suggestions weigh open micro gaps alongside macro gaps — e.g. sardines when
  omega-3 is overdue, not just anything with protein.
