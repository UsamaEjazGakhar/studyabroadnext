import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scholarshipId = Number(id);
  if (Number.isNaN(scholarshipId)) return { title: "Scholarship Not Found" };
  const scholarship = await prisma.scholarship.findUnique({
    where: { id: scholarshipId },
    include: { university: { select: { name: true } }, category: { select: { name: true } } },
  });
  if (!scholarship) return { title: "Scholarship Not Found" };
  return {
    title: `${scholarship.title} – ${scholarship.university?.name}`,
    description: scholarship.description ?? "Scholarship details",
  };
}

export default async function ScholarshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scholarshipId = Number(id);
  if (Number.isNaN(scholarshipId)) return notFound();

  const scholarship = await prisma.scholarship.findUnique({
    where: { id: scholarshipId },
    include: { university: true, category: true },
  });
  if (!scholarship) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#dfe9f3] p-8">
      <h1 className="text-4xl font-bold text-center mb-6" style={{ color: "var(--navy)" }}>{scholarship.title}</h1>
      <section className="bg-glass rounded-lg p-6 mb-8 shadow-md">
        <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--teal)" }}>Details</h2>
        <p><strong>University:</strong> {scholarship.university?.name ?? "N/A"}</p>
        <p><strong>Category:</strong> {scholarship.category?.name ?? "N/A"}</p>
        <p><strong>Benefits:</strong> {scholarship.benefits ?? "N/A"}</p>
        <p><strong>Eligibility:</strong> {scholarship.eligibility ?? "N/A"}</p>
        <p><strong>Required Documents:</strong> {scholarship.requiredDocuments ?? "N/A"}</p>
        
      </section>
    </div>
  );
}
