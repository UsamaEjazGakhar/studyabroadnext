import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

import LogoutButton from "../../../LogoutButton";

const prisma = new PrismaClient();

const SECTION_LABELS: Record<string, string> = {
  cost: "Cost Breakdown",
  fees: "Fees Information",
  duration: "Duration",
  recognition: "Recognition",
  living_costs: "Living Costs",
  hostel_details: "Hostel Details",
  scholarships: "Scholarships",
  universities: "Universities",
  visa: "Visa Process",
  work: "Work Rights",
  pr: "PR Opportunities",
  living: "Living Guide",
  life: "Student Life",
};

export default async function CountrySectionPage({
  params,
}: {
  params: Promise<{ country: string; section: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const resolvedParams = await params;
  const countryName = decodeURIComponent(resolvedParams.country);
  const sectionKey = decodeURIComponent(resolvedParams.section).toLowerCase();
  const sectionLabel = SECTION_LABELS[sectionKey] || "Section";

  // If section is 'scholarships', redirect back to main country page
  if (sectionKey === "scholarships") {
    redirect(`/admin/countries/${encodeURIComponent(countryName)}`);
  }

  const country = await prisma.country.findFirst({
    where: { name: { equals: countryName } },
    include: {
      details: {
        where: { section: sectionKey },
      },
    },
  });

  if (!country) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Country Not Found</h1>
        <p>No data available for "{countryName}".</p>
        <Link href="/admin">← Back to Dashboard</Link>
      </div>
    );
  }

  const detailContent = country.details?.[0]?.content || "Content pending for this section.";

  return (
    <>
      <Head>
        <title>
          {country.name} – {sectionLabel}
        </title>
      </Head>
      <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h1 style={{ fontSize: "2rem", margin: 0 }}>
              {country.name} – {sectionLabel}
            </h1>
            <LogoutButton />
          </div>

          <nav style={{ marginBottom: "2rem" }}>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "1rem", listStyle: "none", padding: 0, margin: 0 }}>
              {Object.entries(SECTION_LABELS).map(([key, label]) => (
                <li key={key}>
                  <Link
                    href={
                      key === "scholarships"
                        ? `/admin/countries/${encodeURIComponent(country.name)}`
                        : `/admin/countries/${encodeURIComponent(country.name)}/${key}`
                    }
                    style={{
                      padding: "0.5rem 1rem",
                      background: key === sectionKey ? "var(--primary)" : "var(--surface-2)",
                      color: key === sectionKey ? "#fff" : "var(--text-head)",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "var(--sh-sm)",
              border: "1px solid var(--surface-3)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Manage {sectionLabel}</h2>
            <div style={{ marginTop: "1rem", color: "var(--text-body)", lineHeight: "1.6" }}>
              {detailContent}
            </div>
            <div style={{ marginTop: "2rem" }}>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "var(--primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Edit Content (Coming Soon)
              </button>
            </div>
          </div>
      </>
    </>
  );
}
