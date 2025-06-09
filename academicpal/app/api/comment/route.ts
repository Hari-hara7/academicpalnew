
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const roadmapId = url.searchParams.get('roadmapId')
  if (!roadmapId) {
    return NextResponse.json({ error: 'Missing roadmapId' }, { status: 400 })
  }

  const comments = await prisma.comment.findMany({
    where: { roadmapId },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(comments)
}

export async function POST(req: Request) {
  const { roadmapId, sessionId, content } = await req.json()
  if (!roadmapId || !sessionId || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const comment = await prisma.comment.create({
    data: { roadmapId, sessionId, content },
  })

  return NextResponse.json(comment)
}
