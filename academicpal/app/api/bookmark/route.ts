
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { roadmapId, sessionId } = await req.json()

  if (!roadmapId || !sessionId) {
    return NextResponse.json({ error: 'Missing roadmapId or sessionId' }, { status: 400 })
  }

  const existing = await prisma.bookmark.findFirst({ where: { roadmapId, sessionId } })

  if (existing) {
    await prisma.bookmark.delete({ where: { id: existing.id } })
  } else {
    await prisma.bookmark.create({ data: { roadmapId, sessionId } })
  }

  return NextResponse.json({ success: true })
}
