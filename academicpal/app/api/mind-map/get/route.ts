import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import MindMap from '@/models/MindMap';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const decoded = verifyToken(token!);
    const mindMaps = await MindMap.find({ userId: (decoded as any).id }).sort({ updatedAt: -1 });

    return NextResponse.json({ success: true, mindMaps });
  } catch (err) {
    return NextResponse.json({ message: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
