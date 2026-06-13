import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const country = await prisma.country.findUnique({
    where: { id: parseInt(resolvedParams.id) },
    include: { scholarships: true },
  });
  if (!country) return NextResponse.json({ error: 'Country not found' }, { status: 404 });
  return NextResponse.json(country);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { name, code } = (await request.json()) as { name: string; code: string };
  const updated = await prisma.country.update({
    where: { id: parseInt(resolvedParams.id) },
    data: { name, code },
  });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await prisma.country.delete({ where: { id: parseInt(resolvedParams.id) } });
  return NextResponse.json({ success: true });
}
