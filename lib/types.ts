// Shared domain types for Bites.

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export const MEAL_TYPES: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

// Nutrients are stored per 100g of the food.
export interface Food {
  id: number;
  name: string;
  category: string;
  // per 100 g
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  // a sensible default single-portion size in grams (e.g. 1 egg = 60)
  portionGrams: number;
  portionLabel: string;
  isCustom: boolean;
}

export interface LogEntry {
  id: number;
  foodId: number;
  date: string; // YYYY-MM-DD
  mealType: MealType;
  grams: number;
  createdAt: string;
  // joined from food
  food: Food;
}

export interface EntryNutrients {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface Profile {
  kcalTarget: number;
  proteinTarget: number;
  carbsTarget: number;
  fatTarget: number;
  // free-text lists, stored as JSON arrays
  likes: string[];
  dislikes: string[];
  avoid: string[]; // allergies / hard exclusions
  goal: 'maintain' | 'lose' | 'gain';
  notes: string;
}

export interface DaySummary {
  date: string;
  totals: EntryNutrients;
  byMeal: Record<MealType, EntryNutrients>;
  entries: LogEntry[];
}

export function nutrientsFor(food: Food, grams: number): EntryNutrients {
  const f = grams / 100;
  return {
    kcal: Math.round(food.kcal * f),
    protein: round1(food.protein * f),
    carbs: round1(food.carbs * f),
    fat: round1(food.fat * f),
    fiber: round1(food.fiber * f),
    sugar: round1(food.sugar * f),
  };
}

export function addNutrients(a: EntryNutrients, b: EntryNutrients): EntryNutrients {
  return {
    kcal: a.kcal + b.kcal,
    protein: round1(a.protein + b.protein),
    carbs: round1(a.carbs + b.carbs),
    fat: round1(a.fat + b.fat),
    fiber: round1(a.fiber + b.fiber),
    sugar: round1(a.sugar + b.sugar),
  };
}

export const ZERO_NUTRIENTS: EntryNutrients = {
  kcal: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
  fiber: 0,
  sugar: 0,
};

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
