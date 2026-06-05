// app/api/public/universities/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country');
  const degree = searchParams.get('degree'); // we treat degree as a substring in programs
  const minBudget = searchParams.get('minBudget');
  const maxBudget = searchParams.get('maxBudget');
  const hasScholarship = searchParams.get('hasScholarship');

  const where: any = {};

  if (country) {
    where.country = { name: { contains: country } };
  }
  if (degree) {
    where.programs = { contains: degree };
  }
  if (minBudget || maxBudget) {
    // tuitionFees stored as string; attempt simple numeric extraction
    where.tuitionFees = {} as any;
    if (minBudget) {
      // naive: check if string includes a number >= minBudget
      where.tuitionFees.gte = minBudget;
    }
    if (maxBudget) {
      where.tuitionFees.lte = maxBudget;
    }
  }
  if (hasScholarship === 'true') {
    where.scholarships = { some: {} }; // any scholarship linked
  }

  try {
    const universities = await prisma.university.findMany({
      where,
      include: { country: true },
    });
    return NextResponse.json({ success: true, universities });
  } catch (error) {
    console.error('University fetch error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
