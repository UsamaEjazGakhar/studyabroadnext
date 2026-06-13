import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const leads = await prisma.consultationLead.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  const data = (await request.json()) as any;
  const lead = await prisma.consultationLead.create({
    data,
  });
  return NextResponse.json(lead);
}
