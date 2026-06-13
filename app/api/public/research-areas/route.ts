// File: app/api/public/research-areas/route.ts

import { NextResponse } from "next/server";

// Using the free public APIs directory; we query the Education category as a placeholder for research areas.
const EXTERNAL_ENDPOINT = `${process.env.EXTERNAL_API_BASE_URL}/entries?category=Education&https=true`;

export async function GET() {
  try {
    const res = await fetch(EXTERNAL_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch research areas" },
        { status: res.status }
      );
    }

    // Type the JSON response to avoid TypeScript "unknown" errors
    const data = (await res.json()) as {
      entries?: {
        ID?: string;
        API: string;
      }[];
    };

    // Derive a simple list of research area titles from the entry titles.
    const areas = (data.entries ?? []).slice(0, 10).map((e) => ({
      id: e.ID ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: e.API,
    }));

    return NextResponse.json({ areas });
  } catch (err) {
    console.error("Research areas API error:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}