import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const roadmaps = await prisma.roadmap.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(roadmaps);
}

export async function POST(req: Request) {
  const { title, link, description } = await req.json();  // Add description here
  const roadmap = await prisma.roadmap.create({
    data: { title, link, description },  // Now description is defined
  });
  return NextResponse.json(roadmap);
}
