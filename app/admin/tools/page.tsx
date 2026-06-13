import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

import LogoutButton from "../LogoutButton";

const prisma = new PrismaClient();

const FREE_TOOLS = [
  { id: "scholarship-finder", name: "Scholarship Finder", icon: "🎓", description: "Search and filter scholarships globally." },
  { id: "university-finder", name: "University Finder", icon: "🏛️", description: "Discover universities matching student profiles." },
  { id: "eligibility-checker", name: "Eligibility Checker", icon: "✅", description: "Check basic criteria for specific programs." },
  { id: "admission-chances", name: "Admission Chances Calculator", icon: "📊", description: "AI-based probability score for university admission." },
  { id: "cost-calculator", name: "Cost Calculator", icon: "💰", description: "Estimate tuition and living expenses by country." },
  { id: "gpa-converter", name: "GPA Converter", icon: "🔄", description: "Convert international grades to standard GPA." },
  { id: "ielts-checker", name: "IELTS Requirement Checker", icon: "🗣️", description: "Check English proficiency requirements." },
  { id: "visa-readiness", name: "Visa Readiness Checker", icon: "✈️", description: "Assess documents and requirements for student visa." },
  { id: "cv-builder", name: "CV Builder", icon: "📄", description: "Create professional CVs for university applications." }
];

export default async function FreeToolsPage() {
  const session = await (getServerSession as any)(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  // Fetch recent leads generated from these tools (source is the tool name)
  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { status: true },
    where: {
      source: {
        in: FREE_TOOLS.map(t => t.name)
      }
    }
  });

  return (
    <>
      <Head>
        <title>Free Tools & Lead Magnets – Admin</title>
      </Head>
      <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <h1 style={{ fontSize: "2rem", margin: 0, color: "var(--navy)" }}>Free Tools & Lead Magnets</h1>
              <p style={{ margin: "0.5rem 0 0 0", color: "var(--text-muted)" }}>Manage student tools and monitor generated leads</p>
            </div>
            <LogoutButton />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
            {FREE_TOOLS.map((tool) => (
              <div
                key={tool.id}
                style={{
                  background: "white",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  border: "1px solid var(--surface-3)",
                  boxShadow: "var(--sh-sm)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                  <div style={{ fontSize: "2rem", background: "var(--surface-2)", padding: "0.5rem", borderRadius: "8px" }}>
                    {tool.icon}
                  </div>
                  <h3 style={{ margin: 0, color: "var(--text-head)" }}>{tool.name}</h3>
                </div>
                <p style={{ margin: "0 0 1.5rem 0", color: "var(--text-body)", fontSize: "0.9rem", flexGrow: 1 }}>
                  {tool.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--surface-2)", paddingTop: "1rem" }}>
                  <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Status: <span style={{ color: "var(--success)", fontWeight: 600 }}>Active</span></span>
                  <Link
                    href={`/admin/tools/${tool.id}`}
                    style={{
                      padding: "0.4rem 1rem",
                      background: "var(--surface-2)",
                      color: "var(--primary)",
                      textDecoration: "none",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                    }}
                  >
                    Configure
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", border: "1px solid var(--surface-3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ margin: 0, color: "var(--text-head)" }}>Recent Tool Leads</h2>
              <Link href="/admin/leads" style={{ color: "var(--link)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 500 }}>
                View All Leads &rarr;
              </Link>
            </div>
            
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "var(--surface-2)", textAlign: "left" }}>
                <tr>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.9rem" }}>Name</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.9rem" }}>Email</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.9rem" }}>Source Tool</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.9rem" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                      No recent leads generated from free tools.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead: any) => (
                    <tr key={lead.id} style={{ borderBottom: "1px solid var(--surface-3)" }}>
                      <td style={{ padding: "1rem", fontWeight: 500 }}>{lead.name}</td>
                      <td style={{ padding: "1rem", color: "var(--text-muted)" }}>{lead.email}</td>
                      <td style={{ padding: "1rem" }}>
                        <span style={{ background: "var(--surface-2)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem", color: "var(--primary)" }}>
                          {lead.source}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
      </>
    </>
  );
}
