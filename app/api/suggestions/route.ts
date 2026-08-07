import { NextRequest, NextResponse } from 'next/server';
import { getDaySummary, getFrequentFoods, getProfile, listFoods } from '@/lib/repo';
import { suggest } from '@/lib/suggestions';
import { MEAL_TYPES, MealType } from '@/lib/types';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const date = params.get('date') ?? '';
  const mealType = params.get('mealType') as MealType;

  if (!DATE_RE.test(date)) {
    return NextResponse.json({ error: 'date=YYYY-MM-DD is required' }, { status: 400 });
  }
  if (!MEAL_TYPES.includes(mealType)) {
    return NextResponse.json({ error: `mealType must be one of ${MEAL_TYPES.join(', ')}` }, { status: 400 });
  }

  const frequentFoodIds = new Map(getFrequentFoods(50).map((f) => [f.food.id, f.count]));
  const suggestions = suggest({
    profile: getProfile(),
    today: getDaySummary(date),
    mealType,
    foods: listFoods(),
    frequentFoodIds,
  });

  return NextResponse.json(suggestions);
}
