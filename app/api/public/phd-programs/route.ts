// File: app/api/public/phd-programs/route.ts

import { NextResponse } from "next/server";

// Example external API endpoint – replace with a real provider as needed
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
        { error: "Failed to fetch data" },
        { status: res.status }
      );
    }

    // Type the JSON response to avoid "unknown" errors
    const data = (await res.json()) as {
      entries?: {
        API: string;
        Description: string;
        Link: string;
      }[];
    };

    // Map the entries to a simplified shape
    const programs =
      data.entries?.map((e) => ({
        title: e.API,
        description: e.Description,
        link: e.Link,
      })) ?? [];

    return NextResponse.json({ programs });
  } catch (error) {
    console.error("Error fetching PhD programs:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}