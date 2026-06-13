import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Prisma client

  export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
      const { id: idStr } = await params;
      const id = parseInt(idStr);
      const { name, country, website } = await request.json() as { name: string; country: string; website?: string };
      if (!name || !country) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }
      // Determine country connection (create if not exists)
      let countryConnect: { id: number } | { name: string };
      const existing = await prisma.country.findUnique({ where: { name: country } });
      if (existing) {
        countryConnect = { id: existing.id };
      } else {
        const created = await prisma.country.create({ data: { name: country } });
        countryConnect = { id: created.id };
      }
      const updated = await prisma.university.update({
        where: { id },
        data: {
          name,
          ...(website !== undefined && { website }),
          country: { connect: countryConnect },
        },
      });
      return NextResponse.json(updated);
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
  }

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    await prisma.university.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
