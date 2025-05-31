// app/api/timetable/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Timetable } from '@/models/Timetable';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const body = await req.json();

    const newTimetable = await Timetable.create({
      userId: (decoded as any).id,
      title: body.title,
      days: body.days,
    });

    return NextResponse.json({ success: true, timetable: newTimetable });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
