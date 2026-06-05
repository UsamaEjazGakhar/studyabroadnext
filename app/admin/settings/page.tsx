import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import Sidebar from "../components/Sidebar";
import LogoutButton from "../LogoutButton";

const prisma = new PrismaClient();

export default async function AdminSettings() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem", background: "var(--surface-1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontFamily: "var(--font-head)", color: "var(--navy)", fontSize: "2rem" }}>Settings</h1>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Logged in as Admin</span>
              <LogoutButton />
            </div>
          </div>
          <p style={{ color: "var(--text-head)" }}>
            This is a placeholder for future admin settings. Add configuration options here.
          </p>
        </div>
      </main>
    </div>
  );
}
