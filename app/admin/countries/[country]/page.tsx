import React from "react";
import Link from "next/link";
import Head from "next/head";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { prisma } from "../../../../lib/prisma";

import CountryScholarshipsClient from "./CountryScholarshipsClient";

export default async function CountryDashboard({ params }: { params: Promise<{ country: string }> }) {
  // Authentication guard – only Admins can view
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const resolvedParams = await params;
  const countryName = decodeURIComponent(resolvedParams.country);
  
  // Try to find the country (case-insensitive by default in many databases, but using equals here)
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

  // If not found, try capitalized name (e.g. "europe" -> "Europe")
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

  if (!country) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Country Not Found</h1>
        <p>No data available for "{countryName}".</p>
        <Link href="/admin" style={{ color: "var(--link)" }}>← Back to Dashboard</Link>
      </div>
    );
  }

  const categories = await prisma.scholarshipCategory.findMany();
  const universities = await prisma.university.findMany({
    where: { countryId: country.id },
  });

  return (
    <>
      <Head>
        <title>{country.name} Scholarships – Admin Panel</title>
        <meta name="description" content={`Manage scholarships for ${country.name} in the admin dashboard.`} />
      </Head>
      <div style={{ display: "flex" }}>
        <main style={{ flexGrow: 1, padding: "2rem" }}>
          <nav style={{ marginBottom: "2rem" }}>
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

