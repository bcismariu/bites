import { NextRequest, NextResponse } from 'next/server';
import { createFood, searchFoods } from '@/lib/repo';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q') ?? '';
  return NextResponse.json(searchFoods(query));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, category, kcal, protein, carbs, fat, fiber, sugar, portionGrams, portionLabel } = body;
  if (!name || typeof kcal !== 'number' || kcal < 0) {
    return NextResponse.json({ error: 'name and a non-negative kcal are required' }, { status: 400 });
  }
  try {
    const food = createFood({
      name: String(name).trim(),
      category: category || 'other',
      kcal,
      protein: protein ?? 0,
      carbs: carbs ?? 0,
      fat: fat ?? 0,
      fiber: fiber ?? 0,
      sugar: sugar ?? 0,
      portionGrams: portionGrams > 0 ? portionGrams : 100,
      portionLabel: portionLabel || '1 serving',
    });
    return NextResponse.json(food, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message.includes('UNIQUE')) {
      return NextResponse.json({ error: 'A food with this name already exists' }, { status: 409 });
    }
    throw e;
  }
}
