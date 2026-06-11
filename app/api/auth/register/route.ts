import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }
    // Ensure a default role exists
    const userRole = await prisma.role.upsert({
      where: { name: 'User' },
      update: {},
      create: { name: 'User' },
    });
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        roleId: userRole.id,
        isApproved: false,
      },
    });
    return NextResponse.json({ message: 'User registered', userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
