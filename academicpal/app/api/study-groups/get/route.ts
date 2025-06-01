import { NextResponse } from 'next/server';
import { StudyGroup } from '@/models/StudyGroup';
import { connectDB } from '@/lib/db';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    // Filters from query params
    const subject = searchParams.get('subject') || '';
    const location = searchParams.get('location') || '';
    const isOpen = searchParams.get('isOpen'); // can be 'true' or 'false'
    const minSize = searchParams.get('minSize'); // min members
    const maxSize = searchParams.get('maxSize'); // max members

    // Build query object
    const query: Record<string, any> = {};

    if (subject) {
      query.subject = { $regex: subject, $options: 'i' };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (isOpen !== null) {
      query.isOpen = isOpen === 'true';
    }

    if (minSize || maxSize) {
      query.maxMembers = {};
      if (minSize) query.maxMembers.$gte = parseInt(minSize);
      if (maxSize) query.maxMembers.$lte = parseInt(maxSize);
    }

    const groups = await StudyGroup.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, groups });
  } catch (error) {
    console.error('Error fetching study groups:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
