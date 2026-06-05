// File: app/destinations/[country]/page.tsx
import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }) {
  const resolvedParams = await params;
  const countrySlug = resolvedParams.country.toLowerCase();
  const country = await prisma.country.findFirst({
    where: { name: countrySlug },
  });
  if (!country) return { title: "Destination Not Found" };
  return {
    title: `Study in ${country.name} – Universities, Scholarships, Visa Guide & Living Costs`,
    description: `Complete guide to studying in ${country.name}. Explore top universities, scholarships, cost breakdown, visa process, work rights, PR opportunities, and student life.`,
  };
}


export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const resolvedParams = await params;
  const countrySlug = resolvedParams.country.toLowerCase();

  // Fetch country record
  const country = await prisma.country.findUnique({
    where: { name: countrySlug },
    include: { universities: true },
  });
  if (!country) return notFound();

  // Fetch scholarships for this country
  const scholarships = await prisma.scholarship.findMany({
    where: { countryId: country.id },
    select: { id: true, title: true, benefits: true, deadline: true },
  });

  // Fetch live PhD programs from external API
  const apiBase = process.env.EXTERNAL_API_BASE_URL || '';
  const phdRes = await fetch(`${apiBase}/entries?category=Education&https=true`);
  const phdJson = await phdRes.json();
  const livePrograms = phdJson.programs ?? [];

  // Mock data for other sections
  const costBreakdown = {
    tuition: '$15,000 per year',
    living: '$800 per month',
    other: '$1,200 per year for books, transport',
  };
  const visaProcess = 'Apply online via the official embassy portal, submit documents, attend interview.';
  const workRights = 'International students can work up to 20 hours/week during term.';
  const prOpportunities = 'Path to permanent residency after 2 years of post‑study work.';
  const livingGuide = 'Safe campuses, multicultural city life, affordable housing near universities.';
  const studentLife = 'Clubs, societies, sports facilities, student discounts.';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#dfe9f3] p-8">
      <h1 className="text-4xl font-bold text-center mb-8" style={{ color: 'var(--navy)' }}>{country.name} Study Destination</h1>

      {/* Cost Breakdown */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Cost Breakdown</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Tuition: {costBreakdown.tuition}</li>
          <li>Living: {costBreakdown.living}</li>
          <li>Other expenses: {costBreakdown.other}</li>
        </ul>
      </section>

      {/* Scholarships */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Scholarships</h2>
        {scholarships.length === 0 ? (
          <p>No scholarships listed for this country.</p>
        ) : (
          <ul className="space-y-3">
            {scholarships.map((s: any, idx: number) => (
              <li key={idx} className="border-b pb-2">
                <a href={`/scholarships/${s.id}`} className="text-lg font-medium text-blue-600 hover:underline">{s.title}</a>
                <p>Benefits: {s.benefits || 'N/A'}</p>
                <p>Deadline: {s.deadline ? new Date(s.deadline).toLocaleDateString() : 'N/A'}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Universities */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Top Universities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {country.universities.map((u: any) => (
            <a key={u.id} href={`/universities/${u.id}`} className="block p-4 bg-white rounded-lg hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-medium" style={{ color: 'var(--navy)' }}>{u.name}</h3>
              <p>Ranking: {u.ranking ?? 'N/A'}</p>
              <p>Tuition Fees: {u.tuitionFees ?? 'N/A'}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Visa Process */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Visa Process</h2>
        <p>{visaProcess}</p>
      </section>

      {/* Work Rights */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Work Rights</h2>
        <p>{workRights}</p>
      </section>

      {/* PR Opportunities */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>PR Opportunities</h2>
        <p>{prOpportunities}</p>
      </section>

      {/* Living Guide */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Living Guide</h2>
        <p>{livingGuide}</p>
      </section>

      {/* Student Life */}
      <section className="bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Student Life</h2>
        <p>{studentLife}</p>
      </section>

      {/* PhD Opportunities */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>PhD Opportunities</h2>
        {livePrograms && livePrograms.length > 0 ? (
          <ul className="list-disc pl-5 space-y-2">
            {livePrograms.map((prog: any, idx: number) => (
              <li key={idx}>
                <a href={prog.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{prog.title}</a> – {prog.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No PhD program data available at the moment.</p>
        )}
      </section>

      {/* Licensing Information */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Licensing Information</h2>
        <p>Details about professional licensing after graduation.</p>
      </section>

      {/* Fee Comparison */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Fee Comparison</h2>
        <p>Compare tuition and living costs across selected universities.</p>
      </section>

      {/* Research Areas */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Research Areas</h2>
        <p>Filter PhD programs by research discipline.</p>
      </section>

      {/* Supervisor Search Service */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Supervisor Search Service</h2>
        <p>Find potential supervisors for your research.</p>
      </section>

      {/* Research Proposal Assistance */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Research Proposal Assistance</h2>
        <p>Get help drafting a strong research proposal.</p>
      </section>

      {/* Publication Support */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Publication Support</h2>
        <p>Guidance on publishing your research in reputable journals.</p>
      </section>

      {/* PhD Matching Tool */}
      <section className="mb-12 bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>PhD Matching Tool</h2>
        <p>Match your profile with suitable PhD programs.</p>
      </section>
    </div>
  );
}
