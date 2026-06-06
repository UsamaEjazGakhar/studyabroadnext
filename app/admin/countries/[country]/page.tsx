import React from "react";
import Link from "next/link";
import Head from "next/head";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Sidebar from "../../components/Sidebar";
import LogoutButton from "../../LogoutButton";

const prisma = new PrismaClient();

export default async function CountryDashboard({ params }: { params: Promise<{ country: string }> }) {
  // Authentication guard – only Admins can view
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const resolvedParams = await params;
  const countryName = decodeURIComponent(resolvedParams.country);
  const country = await prisma.country.findFirst({
    where: { name: { equals: countryName } },
    include: { scholarships: true },
  });

  if (!country) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Country Not Found</h1>
        <p>No data available for "{countryName}".</p>
        <Link href="/admin" style={{ color: "var(--link)" }}>← Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{country.name} Scholarships – Admin Panel</title>
        <meta name="description" content={`Manage scholarships for ${country.name} in the admin dashboard.`} />
      </Head>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <h1 style={{ fontSize: "2rem", margin: 0 }}>{country.name} Scholarships</h1>
            <LogoutButton />
          </div>
          <nav style={{ marginBottom: "2rem" }}>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "1rem", listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { id: "cost", label: "Cost Breakdown" },
                { id: "fees", label: "Fees Information" },
                { id: "duration", label: "Duration" },
                { id: "recognition", label: "Recognition" },
                { id: "living_costs", label: "Living Costs" },
                { id: "hostel_details", label: "Hostel Details" },
                { id: "scholarships", label: "Scholarships" },
                { id: "universities", label: "Universities" },
                { id: "visa", label: "Visa Process" },
                { id: "work", label: "Work Rights" },
                { id: "pr", label: "PR Opportunities" },
                { id: "living", label: "Living Guide" },
                { id: "life", label: "Student Life" },
              ].map((sec) => (
                <li key={sec.id}>
                  <Link
                    href={`/admin/countries/${encodeURIComponent(country.name)}/${sec.id}`}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "var(--surface-2)",
                      borderRadius: "8px",
                      color: "var(--text-head)",
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
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{country.name} Scholarships</h1>
        {country.scholarships.length === 0 ? (
          <p>No scholarships available for this country at the moment.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {country.scholarships.map((sch) => (
              <div
                key={sch.id}
                style={{
                  border: "1px solid var(--surface-3)",
                  borderRadius: "8px",
                  padding: "1rem",
                  background: "var(--surface-1)",
                }}
              >
                <h2 style={{ margin: "0 0 0.5rem 0" }}>{sch.title}</h2>
                {sch.deadline && (
                  <p style={{ margin: "0 0 0.5rem 0" }}>
                    <strong>Deadline:</strong> {new Date(sch.deadline).toLocaleDateString()}
                  </p>
                )}
                {sch.benefits && (
                  <p style={{ margin: "0 0 0.5rem 0" }}>
                    <strong>Benefits:</strong> {sch.benefits}
                  </p>
                )}
                {sch.description && (
                  <p style={{ margin: "0 0 0.5rem 0" }}>{sch.description}</p>
                )}
                <Link
                  href={sch.link ?? "#"}
                  style={{ color: "var(--link)", textDecoration: "underline" }}
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}

        </main>
      </div>
    </>
  );
}
