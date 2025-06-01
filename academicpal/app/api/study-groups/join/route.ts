import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { StudyGroup } from '@/models/StudyGroup';

// Helper to get user ID from auth (mock here, replace with real auth)
function getUserIdFromRequest(req: Request): string | null {
  // TODO: Replace this with your real auth logic to get current user ID
  // For example, parse JWT token or session
  return 'currentUserId'; // Placeholder
}

export async function POST(req: Request) {
  try {
    const userId = getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { groupId } = body;
    if (!groupId) {
      return NextResponse.json({ success: false, message: 'Group ID is required' }, { status: 400 });
    }

    await connectDB();

    const group = await StudyGroup.findById(groupId);
    if (!group) {
      return NextResponse.json({ success: false, message: 'Group not found' }, { status: 404 });
    }

    // Check if user is already a member
    if (group.members.includes(userId)) {
      return NextResponse.json({ success: false, message: 'Already a member of the group' });
    }

    // Check if user already requested join
    if (group.joinRequests.includes(userId)) {
      return NextResponse.json({ success: false, message: 'Join request already sent' });
    }

    if (group.isOpen) {
      // Open group - add user directly to members if space available
      if (group.members.length >= group.maxMembers) {
        return NextResponse.json({ success: false, message: 'Group is full' });
      }
      group.members.push(userId);
      await group.save();

      return NextResponse.json({ success: true, message: 'Joined group successfully' });
    } else {
      // Closed group - add to joinRequests
      group.joinRequests.push(userId);
      await group.save();

      return NextResponse.json({ success: true, message: 'Join request sent for approval' });
    }
  } catch (error) {
    console.error('Join group error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
