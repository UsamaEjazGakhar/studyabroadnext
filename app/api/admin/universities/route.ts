import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const universities = await prisma.university.findMany({
      where: { deletedAt: null },
      include: { country: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(universities);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch universities" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, countryId, description, ranking, tuitionFees, programs, intakeDates, facilities, eligibility } = body;
    const university = await prisma.university.create({
      data: {
        name,
        countryId: parseInt(countryId),
        description,
        ranking: ranking ? parseInt(ranking) : null,
        tuitionFees,
        programs,
        intakeDates,
        facilities,
        eligibility,
      },
    });
    return NextResponse.json(university, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create university" }, { status: 500 });
  }
}
