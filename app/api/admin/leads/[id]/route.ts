import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT update lead
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    const body = await req.json();
    const { name, email, phone, program, country, education, message } = body;
    const lead = await prisma.consultationLead.update({
      where: { id },
      data: { name, email, phone, program, country, education, message },
    });
    return NextResponse.json(lead);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}

// DELETE lead
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    await prisma.consultationLead.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete lead" }, { status: 500 });
  }
}
