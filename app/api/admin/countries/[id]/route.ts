import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const country = await prisma.country.findUnique({
    where: { id: parseInt(params.id) },
    include: { scholarships: true },
  });
  if (!country) return NextResponse.json({ error: 'Country not found' }, { status: 404 });
  return NextResponse.json(country);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { name, code } = await request.json();
  const updated = await prisma.country.update({
    where: { id: parseInt(params.id) },
    data: { name, code },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.country.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ success: true });
}
