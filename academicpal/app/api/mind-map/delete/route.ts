import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import MindMap from '@/models/MindMap';
import { verifyToken } from '@/lib/auth';

export async function DELETE(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const body = await req.json();

    await MindMap.findOneAndDelete({ _id: body.id, userId: (decoded as any).id });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
