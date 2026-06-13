import React from "react";
import Link from "next/link";
import Head from "next/head";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { prisma } from "../../../../lib/prisma";

import CountryScholarshipsClient from "./CountryScholarshipsClient";
import { AddScholarshipModal } from "./index";

export default async function CountryDashboard({ params }: { params: Promise<{ country: string }> }) {
  // Authentication guard – only Admins can view
// @ts-ignore
// @ts-ignore
  const session = await (getServerSession as any)(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const resolvedParams = await params;
  const countryName = decodeURIComponent(resolvedParams.country);

  // Try to find the country (exact match)
  let country = await prisma.country.findFirst({
    where: { name: { equals: countryName } },
    include: {
      scholarships: {
        include: {
          category: true,
          university: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  // If not found, try capitalized version
  if (!country) {
    const capitalized = countryName.charAt(0).toUpperCase() + countryName.slice(1).toLowerCase();
    country = await prisma.country.findFirst({
      where: { name: { equals: capitalized } },
      include: {
        scholarships: {
          include: {
            category: true,
            university: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  }

  // If still not found, render fallback with Add Scholarship button
  if (!country) {
    return (
      <div style={{ padding: "2rem" }}>
        <AddScholarshipModal countryId={0} universitiesJSON={JSON.stringify([])} />
        <Link href="/admin" style={{ color: "var(--link)" }}>
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  // Debug country ID
  console.log('Country ID:', country?.id);
  // Hardcoded category list as per user request
  const categories = [
    { id: 1, name: 'MBBS' },
    { id: 2, name: 'BDS' },
    { id: 3, name: 'PHD' },
  ];
  // Fetch only universities belonging to the current country
  const universities = await prisma.university.findMany({
    where: { countryId: country.id },
    select: { id: true, name: true },
  });
  console.log('Fetched country:', country?.name);
  console.log('Fetched universities count:', universities.length);
  console.log('Universities fetched:', universities);
  // If no universities for this country, fetch all (debug fallback)
  let finalUniversities = universities;
  if (universities.length === 0) {
    console.warn('No universities found for country ID', country?.id, '- fetching all universities as fallback');
    finalUniversities = await prisma.university.findMany({
      select: { id: true, name: true },
    });
  }
  console.log('Universities used for modal:', finalUniversities.length);
  const universitiesJSON = JSON.stringify(finalUniversities);


  return (
    <>
      <Head>
        <title>{country.name} Scholarships – Admin Panel</title>
        <meta name="description" content={`Manage scholarships for ${country.name} in the admin dashboard.`} />
      </Head>
      <div style={{ display: "flex" }}>
        <main style={{ flexGrow: 1, padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <nav style={{ marginBottom: 0 }}>
              <ul style={{ display: "flex", flexWrap: "wrap", gap: "1rem", listStyle: "none", padding: 0, margin: 0 }}>
                {[].map((sec: any) => (
                  <li key={sec.id}>
                    <Link
                      href={`/admin/countries/${encodeURIComponent(country.name)}/${sec.id}`}
                      style={{
                        padding: "0.5rem 1rem",
                        background: sec.id === "scholarships" ? "var(--primary)" : "var(--surface-2)",
                        borderRadius: "8px",
                        color: sec.id === "scholarships" ? "#fff" : "var(--text-head)",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {sec.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          {/* Debug info */}
          <p style={{fontSize:'0.9rem',color:'var(--text-muted)'}}>
            Country: {country?.name ?? 'N/A'} | Universities: {universities.length}
          </p>
          <AddScholarshipModal countryId={country.id} universitiesJSON={universitiesJSON} />
          </div>

          <CountryScholarshipsClient
            countryName={country.name}
            countryId={country.id}
            initialScholarships={country.scholarships as any}
            universities={universities}
            categories={categories}
          />
        </main>
      </div>
    </>
  );
}
