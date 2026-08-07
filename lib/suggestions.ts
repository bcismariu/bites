import { Food, MealType, Profile, DaySummary, nutrientsFor } from './types';

export interface Suggestion {
  food: Food;
  grams: number;
  kcal: number;
  protein: number;
  reasons: string[];
  score: number;
}

export interface SuggestionContext {
  profile: Profile;
  today: DaySummary;
  mealType: MealType;
  foods: Food[];
  frequentFoodIds: Map<number, number>; // foodId -> times logged recently
}

const MEAL_CATEGORY_FIT: Record<MealType, Record<string, number>> = {
  breakfast: { dairy: 2, fruit: 2, grains: 2, 'nuts & seeds': 1, snacks: 0.5, protein: 1, drinks: 1, meals: 0.5, vegetables: 0.5, extras: 0.5 },
  lunch: { protein: 2, grains: 1.5, vegetables: 2, meals: 2, dairy: 0.5, fruit: 1, 'nuts & seeds': 0.5, snacks: 0.3, drinks: 0.5, extras: 0.5 },
  dinner: { protein: 2, vegetables: 2, grains: 1, meals: 2, dairy: 0.5, fruit: 0.5, 'nuts & seeds': 0.5, snacks: 0.3, drinks: 0.5, extras: 0.5 },
  snack: { fruit: 2, 'nuts & seeds': 2, dairy: 1.5, snacks: 1.5, drinks: 1, vegetables: 1, protein: 0.5, grains: 0.5, meals: 0.2, extras: 0.2 },
};

function matchesAny(name: string, terms: string[]): string | null {
  const lower = name.toLowerCase();
  for (const term of terms) {
    const t = term.trim().toLowerCase();
    if (t && lower.includes(t)) return term.trim();
  }
  return null;
}

export function suggest(ctx: SuggestionContext, limit = 6): Suggestion[] {
  const { profile, today, mealType, foods, frequentFoodIds } = ctx;

  const remainingKcal = profile.kcalTarget - today.totals.kcal;
  const remainingProtein = profile.proteinTarget - today.totals.protein;
  // Rough per-meal budget: a snack gets ~15% of the day, a meal ~30%.
  const mealBudget = Math.max(
    120,
    Math.min(remainingKcal, profile.kcalTarget * (mealType === 'snack' ? 0.15 : 0.35))
  );
  const proteinBehind = remainingProtein > profile.proteinTarget * 0.4;

  const suggestions: Suggestion[] = [];

  for (const food of foods) {
    // Hard exclusions first.
    if (matchesAny(food.name, profile.avoid)) continue;

    const portion = nutrientsFor(food, food.portionGrams);
    const reasons: string[] = [];
    let score = MEAL_CATEGORY_FIT[mealType][food.category] ?? 0.5;

    const disliked = matchesAny(food.name, profile.dislikes);
    if (disliked) score -= 3;

    const liked = matchesAny(food.name, profile.likes);
    if (liked) {
      score += 2;
      reasons.push(`matches your taste for ${liked.toLowerCase()}`);
    }

    const timesLogged = frequentFoodIds.get(food.id) ?? 0;
    if (timesLogged >= 2) {
      score += 1.5;
      reasons.push('one of your regulars');
    }

    // Fit within the remaining calorie budget for this meal.
    if (portion.kcal <= mealBudget) {
      score += 1;
    } else if (portion.kcal > mealBudget * 1.6) {
      score -= 1.5;
    }
    if (remainingKcal < 300 && portion.kcal <= 200) {
      reasons.push('light — fits what you have left today');
      score += 1;
    }

    // Nudge toward closing the protein gap.
    if (proteinBehind && portion.protein >= 10) {
      score += 1.5;
      reasons.push(`${portion.protein} g protein to close today's gap`);
    }

    // Steady energy: favor fiber, flag sugar bombs outside of treats.
    if (portion.fiber >= 4) {
      score += 0.5;
      reasons.push('high fiber for steady energy');
    }
    if (portion.sugar > 25) score -= 1;

    if (reasons.length === 0) {
      reasons.push(`a good ${mealType} fit`);
    }

    suggestions.push({
      food,
      grams: food.portionGrams,
      kcal: portion.kcal,
      protein: portion.protein,
      reasons,
      score: Math.round(score * 10) / 10,
    });
  }

  return suggestions.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function defaultMealTypeForNow(hour: number): MealType {
  if (hour < 10) return 'breakfast';
  if (hour < 15) return 'lunch';
  if (hour < 18) return 'snack';
  return 'dinner';
}
