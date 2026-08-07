import { NextRequest, NextResponse } from 'next/server';
import { getProfile, updateProfile } from '@/lib/repo';
import { Profile } from '@/lib/types';

export async function GET() {
  return NextResponse.json(getProfile());
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const current = getProfile();

  const asList = (v: unknown, fallback: string[]): string[] =>
    Array.isArray(v) ? v.map((s) => String(s).trim()).filter(Boolean) : fallback;
  const asTarget = (v: unknown, fallback: number): number =>
    typeof v === 'number' && v > 0 ? Math.round(v) : fallback;

  const next: Profile = {
    kcalTarget: asTarget(body.kcalTarget, current.kcalTarget),
    proteinTarget: asTarget(body.proteinTarget, current.proteinTarget),
    carbsTarget: asTarget(body.carbsTarget, current.carbsTarget),
    fatTarget: asTarget(body.fatTarget, current.fatTarget),
    likes: asList(body.likes, current.likes),
    dislikes: asList(body.dislikes, current.dislikes),
    avoid: asList(body.avoid, current.avoid),
    goal: ['maintain', 'lose', 'gain'].includes(body.goal) ? body.goal : current.goal,
    notes: typeof body.notes === 'string' ? body.notes : current.notes,
  };

  return NextResponse.json(updateProfile(next));
}
