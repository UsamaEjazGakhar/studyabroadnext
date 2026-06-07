import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

import LogoutButton from "../LogoutButton";

const prisma = new PrismaClient();

const RESOURCE_TYPES = [
  "Education Loan Assistance",
  "SOP Sample",
  "LOR Sample",
  "CV Template",
  "Admission Checklist",
  "Scholarship Checklist",
  "Visa Checklist",
  "Study Guide"
];

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const selectedType = searchParams.type || "";
  
  const whereClause = selectedType ? { type: selectedType } : {};

  const resources = await prisma.resource.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Head>
        <title>Resources & Services – Admin</title>
      </Head>
      <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "2rem", margin: 0, color: "var(--navy)" }}>Resources & Services</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  background: "var(--primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                + Add Resource
              </button>
              <LogoutButton />
            </div>
          </div>

          {/* Filter Bar */}
          <div style={{ marginBottom: "2rem" }}>
            <ul style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <Link
                  href="/admin/resources"
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1rem",
                    background: selectedType === "" ? "var(--primary)" : "var(--surface-2)",
                    color: selectedType === "" ? "#fff" : "var(--text-head)",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  All
                </Link>
              </li>
              {RESOURCE_TYPES.map((type) => (
                <li key={type}>
                  <Link
                    href={`/admin/resources?type=${encodeURIComponent(type)}`}
                    style={{
                      display: "inline-block",
                      padding: "0.5rem 1rem",
                      background: selectedType === type ? "var(--primary)" : "var(--surface-2)",
                      color: selectedType === type ? "#fff" : "var(--text-head)",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {resources.length === 0 ? (
              <p style={{ color: "var(--text-muted)" }}>No resources found for this category.</p>
            ) : (
              resources.map((res) => (
                <div
                  key={res.id}
                  style={{
                    background: "white",
                    padding: "1.5rem",
                    borderRadius: "12px",
                    border: "1px solid var(--surface-3)",
                    boxShadow: "var(--sh-sm)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.25rem 0.5rem",
                      background: "var(--surface-2)",
                      color: "var(--primary)",
                      borderRadius: "4px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                      alignSelf: "flex-start",
                    }}
                  >
                    {res.type}
                  </span>
                  <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-head)" }}>{res.title}</h3>
                  <p style={{ margin: "0 0 1rem 0", color: "var(--text-body)", fontSize: "0.9rem", flexGrow: 1 }}>
                    {res.description || "No description provided."}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <a
                      href={res.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--link)", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem" }}
                    >
                      View / Download
                    </a>
                    <button
                      style={{
                        padding: "0.4rem 0.8rem",
                        background: "transparent",
                        border: "1px solid var(--surface-3)",
                        borderRadius: "6px",
                        cursor: "pointer",
                        color: "var(--text-muted)",
                        fontSize: "0.8rem",
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
      </>
    </>
  );
}
