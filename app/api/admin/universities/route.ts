"use server";

import { NextResponse } from "next/server";

import type { University } from "./store";
import { universities } from "./store";

export async function GET() {
  return NextResponse.json(universities);
}

export async function POST(request: Request) {
  try {
    const { name, country, website } = await request.json();
    if (!name || !country) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    const newUni: University = {
      id: Date.now(),
      name,
      country,
      website: website || "",
      createdAt: new Date().toISOString(),
    };
    universities.push(newUni);
    return NextResponse.json(newUni, { status: 201 });
  } catch (e) {
    console.error(e);
    return new NextResponse("Invalid JSON", { status: 400 });
  }
}
