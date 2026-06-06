"use server";

import { NextResponse } from "next/server";

type University = {
  id: number;
  name: string;
  country: string;
  website?: string;
  createdAt: string;
};

let universities: University[] = [];
let nextId = 1;

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
      id: nextId++,
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
