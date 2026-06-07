import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

// GET: list pending registrations
export async function GET(request: NextRequest) {
  const pendingUsers = await prisma.user.findMany({
    where: { status: "Pending" },
    select: {
      id: true,
      email: true,
      profilePicture: true,
      createdAt: true,
    },
  });
  return NextResponse.json(pendingUsers);
}

// POST: approve or reject a registration
export async function POST(request: NextRequest) {
  const { userId, action } = await request.json(); // action: "approve" | "reject"
  if (!userId || !action) {
    return NextResponse.json({ error: "Missing userId or action" }, { status: 400 });
  }
  const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const newStatus = action === "approve" ? "Active" : "Rejected";
  await prisma.user.update({
    where: { id: Number(userId) },
    data: { status: newStatus },
  });

  // log audit
  try {
    await prisma.auditLog.create({
      data: {
        adminId: Number(request.headers.get("x-admin-id") || 0), // placeholder, replace with real admin ID extraction
        action: action === "approve" ? "APPROVE_REGISTRATION" : "REJECT_REGISTRATION",
        targetId: Number(userId),
      },
    });
  } catch (auditErr) {
    console.error("Audit log error:", auditErr);
    // Continue without breaking the request
  }

  return NextResponse.json({ success: true, newStatus });
}
