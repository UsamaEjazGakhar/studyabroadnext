import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Sidebar from "../components/Sidebar";
import LogoutButton from "../LogoutButton";

const prisma = new PrismaClient();

export default async function UniversityDirectory({
  searchParams,
}: {
  searchParams: { q?: string; country?: string; hasScholarship?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  // Build filter criteria
  const query = searchParams?.q || "";
  const countryFilter = searchParams?.country || "";
  const hasScholarship = searchParams?.hasScholarship === "true";

  const whereClause: any = {};
  
  if (query) {
    whereClause.name = { contains: query }; // Case-insensitive handled by MySQL by default typically
  }
  
  if (countryFilter) {
    whereClause.country = {
      name: { equals: countryFilter },
    };
  }
  
  if (hasScholarship) {
    whereClause.scholarships = {
      some: {}, // Only universities that have at least one scholarship
    };
  }

  const universities = await prisma.university.findMany({
    where: whereClause,
    include: {
      country: true,
      scholarships: true,
    },
    orderBy: { ranking: "asc" },
  });

  const allCountries = await prisma.country.findMany({
    select: { name: true },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <Head>
        <title>University Directory – Admin Panel</title>
      </Head>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: "2rem", background: "var(--surface-1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "2rem", margin: 0, color: "var(--navy)" }}>University Directory</h1>
            <LogoutButton />
          </div>

          {/* Filters Bar */}
          <div
            style={{
              background: "white",
              padding: "1.5rem",
              borderRadius: "12px",
              boxShadow: "var(--sh-sm)",
              marginBottom: "2rem",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <form method="GET" action="/admin/universities" style={{ display: "flex", gap: "1rem", width: "100%", flexWrap: "wrap" }}>
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search university name..."
                style={{
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid var(--surface-3)",
                  flexGrow: 1,
                  minWidth: "200px",
                }}
              />
              <select
                name="country"
                defaultValue={countryFilter}
                style={{
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid var(--surface-3)",
                  minWidth: "150px",
                }}
              >
                <option value="">All Countries</option>
                {allCountries.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <input
                  type="checkbox"
                  name="hasScholarship"
                  value="true"
                  defaultChecked={hasScholarship}
                />
                Has Scholarships
              </label>
              <button
                type="submit"
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Search
              </button>
              <Link
                href="/admin/universities"
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "var(--surface-2)",
                  color: "var(--text-head)",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                }}
              >
                Clear
              </Link>
            </form>
          </div>

          {/* Universities Table */}
          <div style={{ background: "white", borderRadius: "12px", boxShadow: "var(--sh-sm)", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "var(--surface-2)", textAlign: "left" }}>
                <tr>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)" }}>Ranking</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)" }}>University Name</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)" }}>Country</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)" }}>Tuition Fees</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)" }}>Scholarships</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {universities.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>
                      No universities found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  universities.map((uni) => (
                    <tr key={uni.id} style={{ borderBottom: "1px solid var(--surface-3)" }}>
                      <td style={{ padding: "1rem" }}>{uni.ranking || "N/A"}</td>
                      <td style={{ padding: "1rem", fontWeight: 500 }}>{uni.name}</td>
                      <td style={{ padding: "1rem" }}>{uni.country.name}</td>
                      <td style={{ padding: "1rem" }}>{uni.tuitionFees || "Not specified"}</td>
                      <td style={{ padding: "1rem" }}>
                        {uni.scholarships.length > 0 ? (
                          <span style={{ color: "var(--success)", fontWeight: 500 }}>
                            {uni.scholarships.length} Available
                          </span>
                        ) : (
                          <span style={{ color: "var(--text-muted)" }}>None</span>
                        )}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <Link
                          href={`/admin/universities/${uni.id}`}
                          style={{
                            padding: "0.4rem 0.8rem",
                            background: "var(--surface-2)",
                            color: "var(--primary)",
                            textDecoration: "none",
                            borderRadius: "6px",
                            fontSize: "0.9rem",
                            fontWeight: 500,
                          }}
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
