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
      const body = await request.json() as {
        title?: string;
        description?: string;
        deadline?: string;
        benefits?: string;
        eligibility?: string;
        requiredDocuments?: string;
        countryId?: string | number;
        categoryId?: string | number;
        universityId?: string | number;
      };

      // Parse IDs to numbers if they exist
      const parsedCategoryId = body.categoryId ? parseInt(body.categoryId as any, 10) : undefined;
      const parsedUniversityId = body.universityId ? parseInt(body.universityId as any, 10) : undefined;
      const parsedCountryId = body.countryId ? parseInt(body.countryId as any, 10) : undefined;

      const {
        title,
        description,
        deadline,
        benefits,
        eligibility,
        requiredDocuments,
        countryId = parsedCountryId,
        categoryId = parsedCategoryId,
        universityId = parsedUniversityId,
      } = { ...body, countryId: parsedCountryId, categoryId: parsedCategoryId, universityId: parsedUniversityId };

      // Fetch existing scholarship
      const existing = await prisma.scholarship.findUnique({ where: { id } });
      if (!existing) return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });

      // Resolve final IDs, falling back to existing values when undefined
      const finalCountryId = (countryId !== undefined ? countryId : existing.countryId) as number;
      let finalCategoryId = (categoryId !== undefined ? categoryId : existing.categoryId) as number;
      let finalUniversityId = (universityId !== undefined ? universityId : existing.universityId) as number;

      // Ensure category exists (create if missing)
      if (!finalCategoryId) {
        const defaultCategory = await prisma.scholarshipCategory.upsert({
          where: { name: "General" },
          update: {},
          create: { name: "General" },
        });
        finalCategoryId = defaultCategory.id;
      } else {
        const catExists = await prisma.scholarshipCategory.findUnique({ where: { id: finalCategoryId } });
        if (!catExists) {
          const nameMap: { [key: string]: string } = { "1": "MBBS", "2": "BDS", "3": "PHD" };
          const catName = nameMap[finalCategoryId] || `Category-${finalCategoryId}`;
          const created = await prisma.scholarshipCategory.create({ data: { name: catName } });
          finalCategoryId = created.id;
        }
      }

      // Ensure university exists (create if missing)
      if (!finalUniversityId) {
        const country = await prisma.country.findUnique({ where: { id: finalCountryId } });
        const countryName = country?.name || `Country-${finalCountryId}`;
        const defaultUniName = `Default University (${countryName})`;
        const defaultUniversity = await prisma.university.upsert({
          where: { name: defaultUniName },
          update: {},
          create: { name: defaultUniName, countryId: finalCountryId },
        });
        finalUniversityId = defaultUniversity.id;
      }

      // Debug log
      console.log('PUT update payload:', {
        title,
        finalCountryId,
        finalCategoryId,
        finalUniversityId,
        deadline,
        benefits,
        eligibility,
        requiredDocuments,
      });

      const updated = await prisma.scholarship.update({
        where: { id },
        data: {
          title,
          description: description || null,
          deadline: deadline ? new Date(deadline) : null,
          benefits: benefits || null,
          eligibility: eligibility || null,
          requiredDocuments: requiredDocuments || null,
          countryId: finalCountryId,
          categoryId: finalCategoryId,
          universityId: finalUniversityId,
        },
        include: { category: true, university: true, country: true },
      });

      return NextResponse.json(updated, { status: 200 });
    } catch (error) {
      console.error("PUT Scholarship Error:", error);
      return NextResponse.json({ error: "Internal server error", details: (error as any)?.message }, { status: 500 });
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
