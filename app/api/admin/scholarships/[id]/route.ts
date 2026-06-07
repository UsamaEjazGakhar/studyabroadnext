import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    const scholarship = await prisma.scholarship.findUnique({
      where: { id },
      include: {
        category: true,
        university: true,
        country: true,
      },
    });

    if (!scholarship) {
      return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });
    }

    return NextResponse.json(scholarship);
  } catch (error) {
    console.error("GET Scholarship ID Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);
    const body = await request.json();

    const {
      title,
      description,
      deadline,
      benefits,
      eligibility,
      requiredDocuments,
      countryId,
      categoryId,
      universityId,
    } = body;

    // Check if scholarship exists first
    const existing = await prisma.scholarship.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });
    }

    // Ensure category exists if changed
    let finalCategoryId = categoryId;
    if (finalCategoryId === undefined) {
      finalCategoryId = existing.categoryId;
    } else if (!finalCategoryId) {
      const defaultCategory = await prisma.scholarshipCategory.upsert({
        where: { name: "General" },
        update: {},
        create: { name: "General" },
      });
      finalCategoryId = defaultCategory.id;
    }

    // Ensure university exists if changed
    let finalUniversityId = universityId;
    if (finalUniversityId === undefined) {
      finalUniversityId = existing.universityId;
    } else if (!finalUniversityId) {
      const finalCountryId = countryId ? parseInt(countryId) : existing.countryId;
      const country = await prisma.country.findUnique({
        where: { id: finalCountryId },
      });
      const countryName = country?.name || `Country-${finalCountryId}`;
      const defaultUniName = `Default University (${countryName})`;
      
      const defaultUniversity = await prisma.university.upsert({
        where: { name: defaultUniName },
        update: {},
        create: {
          name: defaultUniName,
          countryId: finalCountryId,
        },
      });
      finalUniversityId = defaultUniversity.id;
    }

    const updated = await prisma.scholarship.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        description: description !== undefined ? description : existing.description,
        deadline: deadline !== undefined ? (deadline ? new Date(deadline) : null) : existing.deadline,
        benefits: benefits !== undefined ? benefits : existing.benefits,
        eligibility: eligibility !== undefined ? eligibility : existing.eligibility,
        requiredDocuments: requiredDocuments !== undefined ? requiredDocuments : existing.requiredDocuments,
        countryId: countryId !== undefined ? parseInt(countryId) : existing.countryId,
        categoryId: parseInt(finalCategoryId),
        universityId: parseInt(finalUniversityId),
      },
      include: {
        category: true,
        university: true,
        country: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT Scholarship ID Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id);

    const existing = await prisma.scholarship.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });
    }

    await prisma.scholarship.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE Scholarship ID Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
