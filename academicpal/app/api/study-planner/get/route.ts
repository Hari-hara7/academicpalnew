import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import StudyTask from '@/models/StudyTask';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const tasks = await StudyTask.find({ userId: (decoded as any).id }).sort({ dueDate: 1 });

    return NextResponse.json({ success: true, tasks });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
