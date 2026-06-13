import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const countryName = searchParams.get("countryName");
    const countryIdStr = searchParams.get("countryId");

    let whereClause: any = {};

    if (countryIdStr) {
      whereClause.countryId = parseInt(countryIdStr);
    } else if (countryName) {
      whereClause.country = {
        name: {
          equals: countryName,
        },
      };
    }

    const scholarships = await prisma.scholarship.findMany({
      where: whereClause,
      include: {
        category: true,
        university: true,
        country: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(scholarships);
  } catch (error) {
    console.error("GET Scholarships Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
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
  console.log('POST /api/admin/scholarships body:', body);
  // Normalize IDs to numbers (if they exist)
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


    if (!title || !countryId) {
      return NextResponse.json({ error: "Missing required fields (title, countryId)" }, { status: 400 });
    }

    // Ensure category exists (create if missing)
    let finalCategoryId = categoryId;
    if (finalCategoryId) {
      // Try to find the category by ID
      const existing = await prisma.scholarshipCategory.findUnique({
        where: { id: Number(finalCategoryId) },
      });
      if (!existing) {
        // Map known IDs to names or fallback
        const nameMap: { [key: string]: string } = {
          "1": "MBBS",
          "2": "BDS",
          "3": "PHD",
        };
        const catName = nameMap[finalCategoryId] || `Category-${finalCategoryId}`;
        const created = await prisma.scholarshipCategory.create({
          data: { name: catName },
        });
        finalCategoryId = created.id;
      }
    } else {
      const defaultCategory = await prisma.scholarshipCategory.upsert({
        where: { name: "General" },
        update: {},
        create: { name: "General" },
      });
      finalCategoryId = defaultCategory.id;
    }

    // Ensure university exists
    let finalUniversityId = universityId;
    if (!finalUniversityId) {
      const country = await prisma.country.findUnique({
        where: { id: Number(countryId) },
      });
      const countryName = country?.name || `Country-${countryId}`;
      const defaultUniName = `Default University (${countryName})`;
      
      const defaultUniversity = await prisma.university.upsert({
        where: { name: defaultUniName },
        update: {},
        create: {
          name: defaultUniName,
          countryId: Number(countryId),
        },
      });
      finalUniversityId = defaultUniversity.id;
    }

    const newScholarship = await prisma.scholarship.create({
      data: {
        title,
        description: description || null,
        deadline: deadline ? new Date(deadline) : null,
        benefits: benefits || null,
        eligibility: eligibility || null,
        requiredDocuments: requiredDocuments || null,
        countryId: Number(countryId),
        categoryId: Number(finalCategoryId),
        universityId: Number(finalUniversityId),
      },
      include: {
        category: true,
        university: true,
        country: true,
      },
    });

    return NextResponse.json(newScholarship, { status: 201 });
  } catch (error) {
    console.error("POST Scholarship Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
