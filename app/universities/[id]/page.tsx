import React from 'react';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ScholarshipList from './ScholarshipList';

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
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#dfe9f3] p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--navy)' }}>{university.name}</h1>
      {/* Website link */}
      {university.website && (
        <span className="mb-1"><strong>Visit Official University Website :</strong> <a href={university.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{university.website}</a></span>
      )}
      {/* Scholarships */}
      <section className="bg-glass rounded-lg p-6 mb-8 shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-black">Available Scholarships</h2>
        <ScholarshipList scholarships={university.scholarships} />
      </section>

    </div>
  );
}
