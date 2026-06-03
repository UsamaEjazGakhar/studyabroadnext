import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    // Assign Student role, pending approval
    const studentRole = await prisma.role.upsert({
      where: { name: "Student" },
      update: {},
      create: { name: "Student" },
    });
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        roleId: studentRole.id,
        // new field isApproved will default to false (handled in schema)
      },
    });
    return NextResponse.json({ success: true, message: "Registration received, waiting for admin approval" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
