// File: app/api/public/license-info/route.ts
import { NextResponse } from 'next/server';

const EXTERNAL_ENDPOINT = `${process.env.EXTERNAL_API_BASE_URL}/entries?category=Education&https=true`;

export async function GET() {
  try {
    const res = await fetch(EXTERNAL_ENDPOINT, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch licensing data' }, { status: res.status });
    }
    const data = await res.json();
    // Filter entries that mention licensing or visa in the description
    const licenseEntries = (data.entries ?? []).filter((e: any) =>
      /license|visa/i.test(e.Description || '')
    );
    const licenseInfo = licenseEntries.map((e: any) => ({
      title: e.API,
      description: e.Description,
      link: e.Link,
    }));
    return NextResponse.json({ licenseInfo }, { headers: { 'Cache-Control': 'public, max-age=3600' } });
  } catch (err) {
    console.error('License API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
