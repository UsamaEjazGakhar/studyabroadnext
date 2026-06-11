"use server";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Get all universities
export async function GET() {
  const data = await prisma.university.findMany({
    include: {
      country: true,
    },
  });
  return NextResponse.json(data);
}

// Create a new university (accepts country name or countryId)
export async function POST(request: Request) {
  try {
    const { name, country, countryId, website } = await request.json();
    if (!name) {
      return new NextResponse("Missing required fields", { status: 400 });
    }
    // Determine how to connect the country (must be a unique identifier)
    let countryConnect: { id: number } | { name: string };
    if (countryId) {
      countryConnect = { id: Number(countryId) };
    } else if (country) {
      // Try to find existing country by name
      const existing = await prisma.country.findUnique({ where: { name: country } });
      if (existing) {
        countryConnect = { id: existing.id };
      } else {
        // Create the country if it doesn't exist
        const created = await prisma.country.create({ data: { name: country } });
        countryConnect = { id: created.id };
      }
    } else {
      return new NextResponse("Missing country information", { status: 400 });
    }

    const newUni = await prisma.university.create({
      data: {
        name,
        country: { connect: countryConnect },
        website: website || "",
      },
    });
    return NextResponse.json(newUni, { status: 201 });
  } catch (e) {
    console.error(e);
    return new NextResponse("Invalid JSON", { status: 400 });
  }
}
