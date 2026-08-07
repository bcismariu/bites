import { NextRequest, NextResponse } from 'next/server';
import { addLogEntry, getDaySummary, getFood } from '@/lib/repo';
import { MEAL_TYPES, MealType } from '@/lib/types';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date') ?? '';
  if (!DATE_RE.test(date)) {
    return NextResponse.json({ error: 'date=YYYY-MM-DD is required' }, { status: 400 });
  }
  return NextResponse.json(getDaySummary(date));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { foodId, date, mealType, grams } = body;

  if (!DATE_RE.test(date ?? '')) {
    return NextResponse.json({ error: 'date must be YYYY-MM-DD' }, { status: 400 });
  }
  if (!MEAL_TYPES.includes(mealType as MealType)) {
    return NextResponse.json({ error: `mealType must be one of ${MEAL_TYPES.join(', ')}` }, { status: 400 });
  }
  if (typeof grams !== 'number' || grams <= 0) {
    return NextResponse.json({ error: 'grams must be a positive number' }, { status: 400 });
  }
  if (!getFood(Number(foodId))) {
    return NextResponse.json({ error: 'unknown foodId' }, { status: 404 });
  }

  const entry = addLogEntry({ foodId: Number(foodId), date, mealType, grams });
  return NextResponse.json(entry, { status: 201 });
}
