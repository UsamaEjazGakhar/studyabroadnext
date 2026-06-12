import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { NextRequest } from "next/server";

// GET: fetch all resume requests ordered by newest first
export async function GET(request: NextRequest) {
  try {
    const requests = await prisma.resumeRequest.findMany({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(requests);
  } catch (error) {
    console.error("Fetch resume requests error:", error);
    return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
  }
}

// POST: approve or reject a resume request
export async function POST(request: NextRequest) {
  try {
    const { requestId, status } = await request.json(); // status: "Approved" | "Rejected"
    
    if (!requestId || !status) {
      return NextResponse.json({ error: "Missing requestId or status" }, { status: 400 });
    }

    const updated = await prisma.resumeRequest.update({
      where: { id: Number(requestId) },
      data: { status }
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("Update resume request status error:", error);
    return NextResponse.json({ error: "Failed to update request status" }, { status: 500 });
  }
}
