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

    if (!title || !countryId) {
      return NextResponse.json({ error: "Missing required fields (title, countryId)" }, { status: 400 });
    }

    // Ensure category exists
    let finalCategoryId = categoryId;
    if (!finalCategoryId) {
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
        where: { id: parseInt(countryId) },
      });
      const countryName = country?.name || `Country-${countryId}`;
      const defaultUniName = `Default University (${countryName})`;
      
      const defaultUniversity = await prisma.university.upsert({
        where: { name: defaultUniName },
        update: {},
        create: {
          name: defaultUniName,
          countryId: parseInt(countryId),
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
        countryId: parseInt(countryId),
        categoryId: parseInt(finalCategoryId),
        universityId: parseInt(finalUniversityId),
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
