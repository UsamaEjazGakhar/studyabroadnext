// app/api/public/university/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));
  const baseUrl = process.env.UNIVERSITY_API_URL;
  if (!baseUrl) {
    return NextResponse.json({ error: 'University API URL not configured' }, { status: 500 });
  }
  try {
    const res = await fetch(`${baseUrl}/${id}`);
    if (!res.ok) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 });
    }
    const data = (await res.json()) as any;
    return NextResponse.json({ university: data }, {
      headers: { 'Cache-Control': 'public, max-age=3600' },
    });
  } catch (error) {
    console.error('University fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}



