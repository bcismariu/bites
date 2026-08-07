import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { SEED_FOODS } from './seed-foods';

// Data lives in ./data/bites.db (gitignored). Override with BITES_DB_PATH,
// e.g. ':memory:' in tests.
const DB_PATH = process.env.BITES_DB_PATH ?? path.join(process.cwd(), 'data', 'bites.db');

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  if (DB_PATH !== ':memory:') {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  }
  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  migrate(db);
  seed(db);
  return db;
}

function migrate(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS foods (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL DEFAULT 'other',
      kcal REAL NOT NULL,
      protein REAL NOT NULL DEFAULT 0,
      carbs REAL NOT NULL DEFAULT 0,
      fat REAL NOT NULL DEFAULT 0,
      fiber REAL NOT NULL DEFAULT 0,
      sugar REAL NOT NULL DEFAULT 0,
      portion_grams REAL NOT NULL DEFAULT 100,
      portion_label TEXT NOT NULL DEFAULT '1 serving',
      is_custom INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS log_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      food_id INTEGER NOT NULL REFERENCES foods(id),
      date TEXT NOT NULL,
      meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast','lunch','dinner','snack')),
      grams REAL NOT NULL CHECK (grams > 0),
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_log_entries_date ON log_entries(date);

    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      kcal_target INTEGER NOT NULL DEFAULT 2200,
      protein_target INTEGER NOT NULL DEFAULT 120,
      carbs_target INTEGER NOT NULL DEFAULT 250,
      fat_target INTEGER NOT NULL DEFAULT 75,
      likes TEXT NOT NULL DEFAULT '[]',
      dislikes TEXT NOT NULL DEFAULT '[]',
      avoid TEXT NOT NULL DEFAULT '[]',
      goal TEXT NOT NULL DEFAULT 'maintain' CHECK (goal IN ('maintain','lose','gain')),
      notes TEXT NOT NULL DEFAULT ''
    );
    INSERT OR IGNORE INTO profile (id) VALUES (1);
  `);
}

function seed(db: Database.Database) {
  const count = db.prepare('SELECT COUNT(*) AS n FROM foods').get() as { n: number };
  if (count.n > 0) return;

  const insert = db.prepare(`
    INSERT INTO foods (name, category, kcal, protein, carbs, fat, fiber, sugar, portion_grams, portion_label, is_custom)
    VALUES (@name, @category, @kcal, @protein, @carbs, @fat, @fiber, @sugar, @portionGrams, @portionLabel, 0)
  `);
  const insertAll = db.transaction(() => {
    for (const food of SEED_FOODS) insert.run(food);
  });
  insertAll();
}

// Test helper: close and drop the cached connection.
export function resetDb() {
  db?.close();
  db = null;
}
