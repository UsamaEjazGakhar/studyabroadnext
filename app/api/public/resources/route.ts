// app/api/public/resources/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const resources = await prisma.resource.findMany();
    return NextResponse.json({ success: true, resources });
  } catch (error) {
    console.error('Resources fetch error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
