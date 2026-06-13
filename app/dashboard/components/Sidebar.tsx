import SidebarLogout from "@/app/dashboard/components/SidebarLogout";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
const prisma = new PrismaClient();

export default async function Sidebar() {
  // Get session to identify the logged‑in user
  const session = await (getServerSession as any)(authOptions);
  if (!session?.user?.email) {
    return null; // not logged in
  }

  // Fetch the user's category (if any)
  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
    select: { categoryId: true },
  });

  const categoryId = user?.categoryId;
  if (!categoryId) {
    return null; // user has no category assigned
  }

  // Universities that have at least one scholarship in this category
  const universities: { id: number; name: string }[] = await prisma.university.findMany({
    where: { scholarships: { some: { categoryId } } },
    select: { id: true, name: true },
  });

  // Scholarships belonging to this category
  const scholarships: { id: number; title: string }[] = await prisma.scholarship.findMany({
    where: { categoryId },
    select: { id: true, title: true },
  });

  return (
    <aside className="user-sidebar" style={{ width: "250px", padding: "1rem", background: "#0a1d3c", color: "#fff", height: "100vh", overflowY: "auto", backdropFilter: "blur(8px)" }}>
      <h1 style={{ marginBottom: "1rem", fontSize: "1.5rem", fontWeight: "bold", color: "#fff" }}>UserSidebar</h1>
      <h2 style={{ marginBottom: "0.5rem" }}>Universities</h2>
      <ul style={{ listStyle: "none", padding: 0, marginBottom: "1rem" }}>
        {universities.map((u) => (
          <li key={u.id} style={{ marginBottom: "0.3rem" }}>
            <Link href={`/universities/${u.id}`}>
              {u.name}
            </Link>
          </li>
        ))}
      </ul>
      <h2 style={{ marginBottom: "0.5rem" }}>Scholarships</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {scholarships.map((s) => (
          <li key={s.id} style={{ marginBottom: "0.3rem" }}>
            <Link href={`/scholarships/${s.id}`}>{s.title}</Link>
          </li>
        ))}
      </ul>
      <h2 style={{ marginBottom: "0.5rem" }}>Request Resume</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "0.3rem" }}>
          <Link href="/resume">Request Resume</Link>
        </li>
      </ul>
      <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
        <SidebarLogout />
      </div>
    </aside>
  );
}
