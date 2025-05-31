// app/api/timetable/get/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Timetable } from '@/models/Timetable';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const timetables = await Timetable.find({ userId: (decoded as any).id });
    return NextResponse.json(timetables);
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
