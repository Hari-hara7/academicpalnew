// app/api/timetable/delete/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Timetable } from '@/models/Timetable';
import { verifyToken } from '@/lib/auth';

export async function DELETE(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const { id } = await req.json();

    const deleted = await Timetable.findOneAndDelete({
      _id: id,
      userId: (decoded as any).id,
    });

    if (!deleted) {
      return NextResponse.json({ message: 'Not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
