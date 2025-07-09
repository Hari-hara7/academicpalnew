import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Tutor from '@/models/Tutor';

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.url);
    const subject = url.searchParams.get('subject');      // optional filter
    const year = url.searchParams.get('year');            // optional filter
    const availability = url.searchParams.get('availability');  // optional filter

    // Build query object dynamically
    const query: any = {};

    if (subject) {
      query.subjects = subject;
    }
    if (year) {
      query.year = Number(year);
    }
    if (availability) {
      query.availability = availability;
    }

    const tutors = await Tutor.find(query).sort({ rating: -1 }).lean();

    return NextResponse.json({ success: true, tutors });
  } catch (err) {
    console.error('Tutor list error:', err);
    return NextResponse.json({ message: 'Failed to fetch tutors' }, { status: 500 });
  }
}
