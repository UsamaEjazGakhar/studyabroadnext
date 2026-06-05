// File: app/api/public/research-areas/route.ts
import { NextResponse } from 'next/server';

// Using the free public APIs directory; we query the Education category as a placeholder for research areas.
const EXTERNAL_ENDPOINT = `${process.env.EXTERNAL_API_BASE_URL}/entries?category=Education&https=true`;

export async function GET() {
  try {
    const res = await fetch(EXTERNAL_ENDPOINT, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch research areas' }, { status: res.status });
    }
    const data = await res.json();
    // Derive a simple list of research area titles from the entry titles.
    const areas = (data.entries ?? []).slice(0, 10).map((e: any) => ({
      id: e.ID || Math.random().toString(36).substr(2, 9),
      name: e.API,
    }));
    return NextResponse.json({ areas });
  } catch (err) {
    console.error('Research areas API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
