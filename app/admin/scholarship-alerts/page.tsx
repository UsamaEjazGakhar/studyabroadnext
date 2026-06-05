import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Sidebar from "../components/Sidebar";
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
  if (selectedRegion !== "All") {
    whereClause.region = { equals: selectedRegion };
  }

  const alerts = await prisma.scholarshipAlert.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  // Calculate stats
  const totalPending = alerts.filter(a => !a.isNotified).length;
  const totalSent = alerts.filter(a => a.isNotified).length;

  return (
    <>
      <Head>
        <title>Scholarship Alerts – Admin</title>
      </Head>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: "2rem", background: "var(--surface-1)" }}>
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
              {["All", "Europe", "Russia", "China"].map((region) => (
                <li key={region}>
                  <Link
                    href={`/admin/scholarship-alerts?region=${encodeURIComponent(region)}`}
                    style={{
                      display: "inline-block",
                      padding: "0.5rem 1.5rem",
                      background: selectedRegion === region ? "var(--primary)" : "var(--surface-2)",
                      color: selectedRegion === region ? "#fff" : "var(--text-head)",
                      borderRadius: "20px",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "0.9rem"
                    }}
                  >
                    {region}
                  </Link>
                </li>
              ))}
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
                {alerts.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                      No incoming scholarships found for {selectedRegion}.
                    </td>
                  </tr>
                ) : (
                  alerts.map((alert) => (
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
                        {alert.university && <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{alert.university}</div>}
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
                        {!alert.isNotified && (
                          <button
                            style={{
                              padding: "0.4rem 0.8rem",
                              background: "var(--primary)",
                              color: "white",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "0.8rem",
                              fontWeight: 500,
                            }}
                          >
                            Send Now
                          </button>
                        )}
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
