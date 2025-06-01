import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Blog } from '@/models/Blog';

export async function GET() {
  await connectDB();

  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs });
  } catch (err) {
    return NextResponse.json({ message: 'Error fetching blogs' }, { status: 500 });
  }
}
