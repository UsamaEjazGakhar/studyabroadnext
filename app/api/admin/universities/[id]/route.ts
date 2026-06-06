import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const { name, countryId, description, ranking, tuitionFees, programs, intakeDates, facilities, eligibility } = body;
    const university = await prisma.university.update({
      where: { id },
      data: {
        name,
        countryId: countryId ? parseInt(countryId) : undefined,
        description,
        ranking: ranking ? parseInt(ranking) : null,
        tuitionFees,
        programs,
        intakeDates,
        facilities,
        eligibility,
      },
    });
    return NextResponse.json(university);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update university" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    await prisma.university.update({ where: { id }, data: { deletedAt: new Date() } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete university" }, { status: 500 });
  }
}
