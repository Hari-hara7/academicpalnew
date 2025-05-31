import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Flashcard } from '@/models/Flashcard';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  try {
    const decoded = verifyToken(token);
    const flashcards = await Flashcard.find({ userId: (decoded as any).id }).sort({ createdAt: -1 });
    return NextResponse.json(flashcards);
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
