import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { StudyGroup } from '@/models/StudyGroup';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Missing group ID' }, { status: 400 });
    }

    const group = await StudyGroup.findById(id).lean();

    if (!group) {
      return NextResponse.json({ success: false, message: 'Group not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, group });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error fetching group', error: error.message }, { status: 500 });
  }
}
