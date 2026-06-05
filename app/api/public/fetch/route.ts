// File: app/api/public/fetch/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get('category') ?? '';
  const externalBase = process.env.EXTERNAL_API_BASE_URL || 'https://api.publicapis.org';
  const externalUrl = `${externalBase}/entries?category=${encodeURIComponent(category)}&https=true`;
  try {
    const resp = await fetch(externalUrl);
    if (!resp.ok) {
      return NextResponse.json({ error: 'Failed to fetch external data' }, { status: resp.status });
    }
    const data = await resp.json();
    // Return raw entries for simplicity; UI can map as needed
    return NextResponse.json({ entries: data.entries ?? [] });
  } catch (err) {
    console.error('Error in generic fetch API:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
