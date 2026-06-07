import { NextResponse } from "next/server";
import { universities } from "../store";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const { name, country, website } = await request.json();
    if (!name || !country) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const index = universities.findIndex(u => u.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }
    const updated = { ...universities[index], name, country, website: website || "" };
    universities[index] = updated;
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
    const index = universities.findIndex(u => u.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "University not found" }, { status: 404 });
    }
    universities.splice(index, 1);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
