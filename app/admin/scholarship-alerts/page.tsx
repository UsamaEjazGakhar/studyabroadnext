import React from "react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

import LogoutButton from "../LogoutButton";
import TriggerButton from "./TriggerButton";

const prisma = new PrismaClient();

export default async function ScholarshipAlertsPage({
  searchParams,
}: {
  searchParams: { region?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const selectedRegion = searchParams.region || "All";

  const whereClause: any = {};
  const selectedRegions = (searchParams.region ?? "").split(',').filter(Boolean);
  if (selectedRegions.length > 0) {
    whereClause.region = { in: selectedRegions };
  }

  // Fetch scholarship alerts
  // Fetch scholarship alerts with relational data
  const alerts = await prisma.scholarshipAlert.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      region: true,
      amount: true,
      deadline: true,
      isNotified: true,

      description: true,
      university: { select: { name: true } },
      country: { select: { name: true } },
      createdAt: true,
    },
  });


  // Also fetch scholarships (non‑alert records) matching the same region
  const scholarshipWhere: any = {};
  if (selectedRegion !== "All") {
    scholarshipWhere.region = { equals: selectedRegion };
  }
  const scholarships = await prisma.scholarship.findMany({
    where: scholarshipWhere,
    orderBy: { createdAt: "desc" },
    include: { country: true, university: true },
  });

  // Normalize scholarship records to the alert shape for unified rendering
  const normalizedScholarships = scholarships.map((s) => ({
    id: s.id,
    createdAt: s.createdAt,
    region: s.country?.name || "",
    title: s.title,
    university: s.university?.name ?? "",
    amount: s.benefits ?? "",
    isNotified: false,
  }));

  // Combine alerts and normalized scholarships, newest first
  const combinedAlerts = [...alerts, ...normalizedScholarships].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Calculate stats
  const totalPending = alerts.filter(a => !a.isNotified).length;
  const totalSent = alerts.filter(a => a.isNotified).length;

  return (
    <>
      <Head>
        <title>Scholarship Alerts – Admin</title>
      </Head>
      <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <h1 style={{ fontSize: "2rem", margin: 0, color: "var(--navy)" }}>Live Scholarship Alerts</h1>
              <p style={{ margin: "0.5rem 0 0 0", color: "var(--text-muted)" }}>Monitor incoming scholarships and manage SMTP email notifications.</p>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <TriggerButton />
              <LogoutButton />
            </div>
          </div>

          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", flex: 1, border: "1px solid var(--surface-3)" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>Pending Notifications</h3>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700, color: "var(--primary)" }}>{totalPending}</p>
            </div>
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", flex: 1, border: "1px solid var(--surface-3)" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>Total Sent</h3>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700, color: "var(--success)" }}>{totalSent}</p>
            </div>
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", flex: 1, border: "1px solid var(--surface-3)" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>SMTP Status</h3>
              <p style={{ margin: 0, fontSize: "1.2rem", fontWeight: 600, color: "var(--success)", marginTop: "0.5rem" }}>Connected</p>
            </div>
          </div>

          {/* Region Tabs */}
          <nav style={{ marginBottom: "2rem" }}>
            <ul style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, margin: 0 }}>
              {["All", "Europe", "Russia", "China"].map((region) => {
                const currentList = (searchParams.region ?? "").split(',').filter(Boolean);
                const isSelected = region !== "All" && currentList.includes(region);
                const newList = region === "All"
                  ? []
                  : isSelected
                    ? currentList.filter((r) => r !== region)
                    : [...currentList, region];
                const href = `/admin/scholarship-alerts?region=${encodeURIComponent(newList.join(','))}`;
                return (
                  <li key={region}>
                    <Link
                      href={href}
                      style={{
                        display: "inline-block",
                        padding: "0.5rem 1.5rem",
                        background: isSelected || (region === "All" && currentList.length === 0) ? "var(--primary)" : "var(--surface-2)",
                        color: isSelected || (region === "All" && currentList.length === 0) ? "#fff" : "var(--text-head)",
                        borderRadius: "20px",
                        textDecoration: "none",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                      }}
                    >
                      {region}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div style={{ background: "white", borderRadius: "12px", boxShadow: "var(--sh-sm)", overflow: "hidden", border: "1px solid var(--surface-3)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "var(--surface-2)", textAlign: "left" }}>
                <tr>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.9rem" }}>Date Added</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.9rem" }}>Region</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.9rem" }}>Scholarship Title</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.9rem" }}>Amount</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.9rem" }}>Status</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.9rem" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {combinedAlerts.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                      No incoming scholarships found for {selectedRegion}.
                    </td>
                  </tr>
                ) : (
                  combinedAlerts.map((alert) => (
                    <tr key={alert.id} style={{ borderBottom: "1px solid var(--surface-3)" }}>
                      <td style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                        {new Date(alert.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span style={{ background: "var(--surface-2)", padding: "0.2rem 0.6rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 600, color: "var(--navy)" }}>
                          {alert.region}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", fontWeight: 500 }}>
                        {alert.title}
                        {alert.university && (
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>
                          {typeof alert.university === "object" ? alert.university.name : alert.university}
                        </div>
                      )}
                      </td>
                      <td style={{ padding: "1rem", color: "var(--text-body)" }}>{alert.amount || "N/A"}</td>
                        <td style={{ padding: "1rem" }}>
                          {alert.isNotified ? (
                            <span style={{ color: "var(--success)", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                              <span style={{ width: "8px", height: "8px", background: "var(--success)", borderRadius: "50%", display: "inline-block" }}></span>
                              Sent
                            </span>
                          ) : (
                            <span style={{ color: "var(--warning)", fontWeight: 600, fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                              <span style={{ width: "8px", height: "8px", background: "var(--warning)", borderRadius: "50%", display: "inline-block" }}></span>
                              Pending
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          {/* Action buttons */}
                          <Link
                            href={`/admin/scholarship-alerts/view/${alert.id}`}
                            style={{
                              padding: "0.3rem 0.6rem",
                              marginRight: "0.4rem",
                              background: "var(--primary)",
                              color: "#000",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                              textDecoration: "none",
                            }}
                          >
                            View
                          </Link>
                          {/* Edit button */}
                          <Link
                            href={`/admin/scholarship-alerts/edit/${alert.id}`}
                            style={{
                              padding: "0.3rem 0.6rem",
                              marginRight: "0.4rem",
                              background: "var(--surface-2)",
                              color: "var(--text-head)",
                              border: "1px solid var(--surface-3)",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                              textDecoration: "none",
                            }}
                          >
                            Edit
                          </Link>
                          {/* Delete button */}
                          <DeleteButton alertId={alert.id} />
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
