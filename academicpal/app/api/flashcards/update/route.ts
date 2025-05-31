import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Flashcard } from '@/models/Flashcard';
import { verifyToken } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = verifyToken(token);
    const { id, question, answer } = await req.json();

    const updated = await Flashcard.findOneAndUpdate(
      { _id: id, userId: (decoded as any).id },
      { question, answer },
      { new: true }
    );

    if (!updated) return NextResponse.json({ message: 'Not found or unauthorized' }, { status: 404 });

    return NextResponse.json({ success: true, flashcard: updated });
  } catch {
    return NextResponse.json({ message: 'Unauthorized or error' }, { status: 401 });
  }
}
