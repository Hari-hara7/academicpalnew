import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  // get sessionId from query (if provided)
  const { searchParams } = new URL(req.url)
  const sessionId = searchParams.get('sessionId')

  // fetch all roadmaps ordered by createdAt descending
  const roadmaps = await prisma.roadmap.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      comments: {
        select: { id: true }, // only id to count comments
      },
      bookmarks: sessionId
        ? {
            where: { sessionId },
            select: { id: true },
          }
        : false,
      upvotes: sessionId
        ? {
            where: { sessionId },
            select: { id: true },
          }
        : false,
    },
  })

  // transform data to include counts and boolean flags
  const result = roadmaps.map((roadmap) => {
    const bookmarkCount = roadmap.bookmarks.length ?? 0
    const upvoteCount = roadmap.upvotes.length ?? 0
    const commentsCount = roadmap.comments.length ?? 0

    const hasBookmarked = sessionId
      ? roadmap.bookmarks.length > 0
      : false
    const hasUpvoted = sessionId ? roadmap.upvotes.length > 0 : false

    return {
      id: roadmap.id,
      title: roadmap.title,
      description: roadmap.description,
      link: roadmap.link,
      createdAt: roadmap.createdAt,
      bookmarks: bookmarkCount,
      upvotes: upvoteCount,
      commentsCount,
      hasBookmarked,
      hasUpvoted,
    }
  })

  return NextResponse.json(result)
}
