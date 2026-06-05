// File: app/api/public/fee-comparison/route.ts
import { NextResponse } from 'next/server';

// Using the free public APIs directory; we query the Education category as a placeholder for tuition/fees data.
const EXTERNAL_ENDPOINT = `${process.env.EXTERNAL_API_BASE_URL}/entries?category=Education&https=true`;

export async function GET() {
  try {
    const res = await fetch(EXTERNAL_ENDPOINT, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch fee data' }, { status: res.status });
    }
    const data = await res.json();
    // Transform the generic entries into a simple fee comparison shape.
    const feeInfo = (data.entries ?? []).slice(0, 5).map((e: any) => ({
      university: e.API,
      tuition: e.Auth || 'N/A', // placeholder – publicapis does not provide tuition; using Auth field as demo
      link: e.Link,
    }));
    return NextResponse.json({ feeInfo });
  } catch (err) {
    console.error('Fee comparison API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
