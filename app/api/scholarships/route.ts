import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const categoryId = url.searchParams.get("categoryId");
  const where = categoryId ? { categoryId: Number(categoryId) } : {};
  const scholarships = await prisma.scholarship.findMany({
    where,
    include: {
      category: true,
      university: true,
    },
  });
  return NextResponse.json(scholarships);
}
