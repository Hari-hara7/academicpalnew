import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Tutor from '@/models/Tutor';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token!);
    const userId = (decoded as any).id;

    const body = await req.json();
    const { name, branch, year, subjects, availability, teachingModes } = body;

    if (!name || !branch || !year || !subjects || !availability || !teachingModes) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Upsert: update if tutor exists, else create new
    const tutor = await Tutor.findOneAndUpdate(
      { userId },
      { name, branch, year, subjects, availability, teachingModes },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, tutor });
  } catch (err) {
    console.error('Tutor create/update error:', err);
    return NextResponse.json({ message: 'Error creating/updating tutor' }, { status: 500 });
  }
}
