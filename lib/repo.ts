import { getDb } from './db';
import {
  DaySummary,
  EntryNutrients,
  Food,
  LogEntry,
  MEAL_TYPES,
  MealType,
  Profile,
  ZERO_NUTRIENTS,
  addNutrients,
  nutrientsFor,
} from './types';

interface FoodRow {
  id: number;
  name: string;
  category: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  portion_grams: number;
  portion_label: string;
  is_custom: number;
}

function toFood(row: FoodRow): Food {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    kcal: row.kcal,
    protein: row.protein,
    carbs: row.carbs,
    fat: row.fat,
    fiber: row.fiber,
    sugar: row.sugar,
    portionGrams: row.portion_grams,
    portionLabel: row.portion_label,
    isCustom: row.is_custom === 1,
  };
}

export function searchFoods(query: string, limit = 30): Food[] {
  const db = getDb();
  const rows = query.trim()
    ? (db
        .prepare('SELECT * FROM foods WHERE name LIKE ? ORDER BY name LIMIT ?')
        .all(`%${query.trim()}%`, limit) as FoodRow[])
    : (db.prepare('SELECT * FROM foods ORDER BY name LIMIT ?').all(limit) as FoodRow[]);
  return rows.map(toFood);
}

export function listFoods(): Food[] {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM foods ORDER BY category, name').all() as FoodRow[];
  return rows.map(toFood);
}

export function getFood(id: number): Food | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM foods WHERE id = ?').get(id) as FoodRow | undefined;
  return row ? toFood(row) : null;
}

export function createFood(input: Omit<Food, 'id' | 'isCustom'>): Food {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO foods (name, category, kcal, protein, carbs, fat, fiber, sugar, portion_grams, portion_label, is_custom)
       VALUES (@name, @category, @kcal, @protein, @carbs, @fat, @fiber, @sugar, @portionGrams, @portionLabel, 1)`
    )
    .run(input);
  return getFood(Number(result.lastInsertRowid))!;
}

interface LogRow {
  id: number;
  food_id: number;
  date: string;
  meal_type: MealType;
  grams: number;
  created_at: string;
}

export function addLogEntry(input: {
  foodId: number;
  date: string;
  mealType: MealType;
  grams: number;
}): LogEntry {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO log_entries (food_id, date, meal_type, grams)
       VALUES (@foodId, @date, @mealType, @grams)`
    )
    .run(input);
  const row = db
    .prepare('SELECT * FROM log_entries WHERE id = ?')
    .get(Number(result.lastInsertRowid)) as LogRow;
  return { ...toLogEntry(row), food: getFood(row.food_id)! };
}

export function deleteLogEntry(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM log_entries WHERE id = ?').run(id);
  return result.changes > 0;
}

function toLogEntry(row: LogRow): Omit<LogEntry, 'food'> {
  return {
    id: row.id,
    foodId: row.food_id,
    date: row.date,
    mealType: row.meal_type,
    grams: row.grams,
    createdAt: row.created_at,
  };
}

export function getDaySummary(date: string): DaySummary {
  const db = getDb();
  const rows = db
    .prepare('SELECT * FROM log_entries WHERE date = ? ORDER BY created_at')
    .all(date) as LogRow[];

  const entries: LogEntry[] = rows.map((row) => ({
    ...toLogEntry(row),
    food: getFood(row.food_id)!,
  }));

  let totals: EntryNutrients = ZERO_NUTRIENTS;
  const byMeal = Object.fromEntries(
    MEAL_TYPES.map((m) => [m, ZERO_NUTRIENTS])
  ) as Record<MealType, EntryNutrients>;

  for (const entry of entries) {
    const n = nutrientsFor(entry.food, entry.grams);
    totals = addNutrients(totals, n);
    byMeal[entry.mealType] = addNutrients(byMeal[entry.mealType], n);
  }

  return { date, totals, byMeal, entries };
}

// Foods logged most often in the last 30 days — the app's memory of what
// the user actually likes eating.
export function getFrequentFoods(limit = 12): { food: Food; count: number }[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT food_id, COUNT(*) AS n FROM log_entries
       WHERE date >= date('now', '-30 days')
       GROUP BY food_id ORDER BY n DESC LIMIT ?`
    )
    .all(limit) as { food_id: number; n: number }[];
  return rows
    .map((r) => ({ food: getFood(r.food_id), count: r.n }))
    .filter((r): r is { food: Food; count: number } => r.food !== null);
}

interface ProfileRow {
  kcal_target: number;
  protein_target: number;
  carbs_target: number;
  fat_target: number;
  likes: string;
  dislikes: string;
  avoid: string;
  goal: Profile['goal'];
  notes: string;
}

export function getProfile(): Profile {
  const db = getDb();
  const row = db.prepare('SELECT * FROM profile WHERE id = 1').get() as ProfileRow;
  return {
    kcalTarget: row.kcal_target,
    proteinTarget: row.protein_target,
    carbsTarget: row.carbs_target,
    fatTarget: row.fat_target,
    likes: JSON.parse(row.likes),
    dislikes: JSON.parse(row.dislikes),
    avoid: JSON.parse(row.avoid),
    goal: row.goal,
    notes: row.notes,
  };
}

export function updateProfile(profile: Profile): Profile {
  const db = getDb();
  db.prepare(
    `UPDATE profile SET
       kcal_target = @kcalTarget,
       protein_target = @proteinTarget,
       carbs_target = @carbsTarget,
       fat_target = @fatTarget,
       likes = @likes,
       dislikes = @dislikes,
       avoid = @avoid,
       goal = @goal,
       notes = @notes
     WHERE id = 1`
  ).run({
    ...profile,
    likes: JSON.stringify(profile.likes),
    dislikes: JSON.stringify(profile.dislikes),
    avoid: JSON.stringify(profile.avoid),
  });
  return getProfile();
}
