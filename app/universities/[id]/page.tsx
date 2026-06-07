import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const uniId = Number(id);
  if (Number.isNaN(uniId)) return { title: "University Not Found" };
  const uni = await prisma.university.findUnique({ where: { id: uniId }, include: { country: true } });
  if (!uni) return { title: "University Not Found" };
  return {
    title: `${uni.name} – Study in ${uni.country.name} | Fees, Rankings & Scholarships`,
    description: `Explore ${uni.name} in ${uni.country.name}. View tuition fees, rankings, programs, eligibility, and available scholarships. Apply now for admissions.`,
  };
}

export default async function UniversityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const uniId = Number(id);
  if (Number.isNaN(uniId)) return notFound();

  const university = await prisma.university.findUnique({
    where: { id: uniId },
    include: { country: true, scholarships: true },
  });
  if (!university) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#dfe9f3] p-8">
      <h1 className="text-4xl font-bold text-center mb-6" style={{ color: 'var(--navy)' }}>{university.name}</h1>
      <section className="bg-glass rounded-lg p-6 mb-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Overview</h2>
        <p>{university.description ?? 'No description available.'}</p>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-glass rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-medium mb-2" style={{ color: 'var(--navy)' }}>Ranking</h3>
          <p>{university.ranking ?? 'N/A'}</p>
        </div>
        <div className="bg-glass rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-medium mb-2" style={{ color: 'var(--navy)' }}>Tuition Fees</h3>
          <p>{university.tuitionFees ?? 'N/A'}</p>
        </div>
        <div className="bg-glass rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-medium mb-2" style={{ color: 'var(--navy)' }}>Programs</h3>
          <p>{university.programs ?? 'N/A'}</p>
        </div>
        <div className="bg-glass rounded-lg p-4 shadow-md">
          <h3 className="text-xl font-medium mb-2" style={{ color: 'var(--navy)' }}>Eligibility</h3>
          <p>{university.eligibility ?? 'N/A'}</p>
        </div>
      </section>
      {/* Scholarship List */}
      <section className="bg-glass rounded-lg p-6 mb-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Available Scholarships</h2>
        {university.scholarships.length === 0 ? (
          <p>No scholarships listed for this university.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {university.scholarships.map((s: any) => (
              <li key={s.id}>
                <a href={s.link ?? '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{s.title}</a>
                <span> – Amount: {s.amount ?? 'N/A'}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* Mock Application Form */}
      <section className="bg-glass rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--teal)' }}>Apply Now</h2>
        <form className="grid grid-cols-1 gap-4">
          <input type="text" placeholder="Full Name" className="p-2 border rounded" />
          <input type="email" placeholder="Email" className="p-2 border rounded" />
          <input type="tel" placeholder="Phone" className="p-2 border rounded" />
          <textarea placeholder="Message / Motivation" className="p-2 border rounded" rows={4} />
          <button type="submit" className="bg-teal text-white py-2 rounded hover:opacity-90 transition-opacity">
            Submit Application
          </button>
        </form>
      </section>
    </div>
  );
}
