import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  const countries = await prisma.country.findMany();
  return NextResponse.json(countries);
}

export async function POST(request: Request) {
  const { name, code } = await request.json();
  if (!name) {
    return new NextResponse('Name is required', { status: 400 });
  }
  const country = await prisma.country.create({
    data: { name, code },
  });
  return NextResponse.json(country, { status: 201 });
}
