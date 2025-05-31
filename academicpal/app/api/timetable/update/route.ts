// app/api/timetable/update/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Timetable } from '@/models/Timetable';
import { verifyToken } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const body = await req.json();

    const updated = await Timetable.findOneAndUpdate(
      { _id: body.id, userId: (decoded as any).id },
      { title: body.title, days: body.days },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: 'Not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true, timetable: updated });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
