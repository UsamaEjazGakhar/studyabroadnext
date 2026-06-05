import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Sidebar from "../../components/Sidebar";
import LogoutButton from "../../LogoutButton";

const prisma = new PrismaClient();

const UNI_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "tuition", label: "Tuition Fees" },
  { id: "ranking", label: "University Ranking" },
  { id: "facilities", label: "Facilities" },
  { id: "eligibility", label: "Eligibility" },
  { id: "application", label: "Application Form" },
  { id: "mbbs-calculator", label: "MBBS Cost Calculator" },
  { id: "bds", label: "BDS Abroad Section" },
  { id: "fee-comparison", label: "Fee Comparison" },
  { id: "licensing", label: "Licensing Information" },
  { id: "phd-admissions", label: "PhD Admissions" },
  { id: "phd-opportunities", label: "PhD Opportunities" },
  { id: "research", label: "Research Areas" },
  { id: "supervisors", label: "Supervisor Search" },
  { id: "proposal", label: "Research Proposal" },
  { id: "publication", label: "Publication Support" },
  { id: "matching", label: "PhD Matching Tool" },
  { id: "destinations", label: "Study Destinations" },
];

export default async function UniversityDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { section?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const uniId = parseInt(params.id, 10);
  if (isNaN(uniId)) {
    return <div>Invalid University ID</div>;
  }

  const currentSection = searchParams.section || "overview";

  const university = await prisma.university.findUnique({
    where: { id: uniId },
    include: {
      country: true,
      details: {
        where: { section: currentSection },
      },
    },
  });

  if (!university) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>University Not Found</h1>
        <Link href="/admin/universities">← Back to Directory</Link>
      </div>
    );
  }

  const activeDetail = university.details?.[0]?.content || "Content pending for this section.";

  return (
    <>
      <Head>
        <title>{university.name} – Admin</title>
      </Head>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: "2rem", background: "var(--surface-1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <div>
              <h1 style={{ fontSize: "2rem", margin: 0 }}>{university.name}</h1>
              <p style={{ margin: "0.5rem 0 0 0", color: "var(--text-muted)" }}>{university.country.name} – Ranking: {university.ranking || "N/A"}</p>
            </div>
            <LogoutButton />
          </div>

          <Link href="/admin/universities" style={{ display: "inline-block", marginBottom: "2rem", color: "var(--link)" }}>
            &larr; Back to Directory
          </Link>

          {/* Horizontal Tabs for Sections */}
          <nav style={{ marginBottom: "2rem" }}>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
              {UNI_SECTIONS.map((sec) => (
                <li key={sec.id}>
                  <Link
                    href={`/admin/universities/${university.id}?section=${sec.id}`}
                    style={{
                      display: "inline-block",
                      padding: "0.5rem 1rem",
                      background: currentSection === sec.id ? "var(--primary)" : "var(--surface-2)",
                      color: currentSection === sec.id ? "#fff" : "var(--text-head)",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    {sec.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Section Content Area */}
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "12px",
              boxShadow: "var(--sh-sm)",
              border: "1px solid var(--surface-3)",
            }}
          >
            <h2 style={{ marginTop: 0, borderBottom: "1px solid var(--surface-2)", paddingBottom: "1rem" }}>
              {UNI_SECTIONS.find((s) => s.id === currentSection)?.label}
            </h2>
            
            {/* Editor placeholder */}
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ background: "var(--surface-2)", padding: "1rem", borderRadius: "8px", minHeight: "200px" }}>
                {activeDetail}
              </div>
            </div>

            <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
              <button
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "var(--primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Save Content
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
