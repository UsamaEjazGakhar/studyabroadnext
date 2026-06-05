import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Sidebar from "../components/Sidebar";
import LogoutButton from "../LogoutButton";

const prisma = new PrismaClient();

export default async function AdminLeads() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const leads = await prisma.consultationLead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem", background: "var(--surface-1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontFamily: "var(--font-head)", color: "var(--navy)", fontSize: "2rem" }}>Leads</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Logged in as Admin</span>
              <LogoutButton />
            </div>
          </div>
          {/* Leads Table */}
          <div style={{ background: "#fff", borderRadius: "var(--r-md)", padding: "1.5rem", boxShadow: "var(--sh-sm)" }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--text-head)" }}>Consultation Leads ({leads.length})</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--surface-2)" }}>
                    <th style={{ padding: "1rem", color: "var(--text-muted)" }}>Date</th>
                    <th style={{ padding: "1rem", color: "var(--text-muted)" }}>Name</th>
                    <th style={{ padding: "1rem", color: "var(--text-muted)" }}>Contact</th>
                    <th style={{ padding: "1rem", color: "var(--text-muted)" }}>Program & Country</th>
                    <th style={{ padding: "1rem", color: "var(--text-muted)" }}>Education</th>
                    <th style={{ padding: "1rem", color: "var(--text-muted)" }}>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)" }}>No leads found.</td>
                    </tr>
                  ) : (
                    leads.map((lead) => (
                      <tr key={lead.id} style={{ borderBottom: "1px solid var(--surface-2)" }}>
                        <td style={{ padding: "1rem" }}>{new Date(lead.createdAt).toLocaleDateString()}</td>
                        <td style={{ padding: "1rem", fontWeight: "600", color: "var(--text-head)" }}>{lead.name}</td>
                        <td style={{ padding: "1rem" }}>
                          <div>{lead.email}</div>
                          <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{lead.phone}</div>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <div><span className="badge badge-teal" style={{ marginBottom: "0.2rem" }}>{lead.program}</span></div>
                          <div><span className="badge badge-orange">{lead.country}</span></div>
                        </td>
                        <td style={{ padding: "1rem" }}>{lead.education}</td>
                        <td style={{ padding: "1rem", maxWidth: "300px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lead.message || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
