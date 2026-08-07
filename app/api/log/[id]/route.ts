import { NextRequest, NextResponse } from 'next/server';
import { deleteLogEntry } from '@/lib/repo';

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const deleted = deleteLogEntry(Number(id));
  if (!deleted) {
    return NextResponse.json({ error: 'entry not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
