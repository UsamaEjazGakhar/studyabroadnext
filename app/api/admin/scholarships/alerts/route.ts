import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // @ts-ignore
    const alerts = await prisma.scholarshipAlert.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, alerts });
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
