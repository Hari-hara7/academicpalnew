import { NextResponse } from 'next/server';
import { StudyGroup } from '@/models/StudyGroup';
import { connectDB } from '@/lib/db';

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      subject,
      groupName,
      description,
      meetingTime,
      location,
      platform,
      maxMembers,
      isOpen,
    } = body;

    // Basic validation
    if (
      !subject ||
      !groupName ||
      !description ||
      !meetingTime ||
      !location ||
      !maxMembers
    ) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // TODO: Replace with actual user ID from auth/session
    const creatorId = 'sampleUserId123'; // This should come from user session/auth

    const newGroup = new StudyGroup({
      creatorId,
      subject,
      groupName,
      description,
      meetingTime,
      location,
      platform: platform || '',
      maxMembers,
      isOpen,
      members: [creatorId], // creator is first member
      joinRequests: [],
    });

    await newGroup.save();

    return NextResponse.json({ success: true, group: newGroup });
  } catch (error) {
    console.error('Error creating study group:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
