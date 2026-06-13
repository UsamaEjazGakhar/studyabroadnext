import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const resources = await prisma.resource.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(resources);
  } catch {
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, type, fileUrl, description } = body as { title: string; type: string; fileUrl: string; description?: string };
    const resource = await prisma.resource.create({ data: { title, type, fileUrl, description } });
    return NextResponse.json(resource, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}
