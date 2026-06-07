import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Header from "../components/Header";
import Footer from "../components/Footer";

const prisma = new PrismaClient();

export const metadata = {
  title: "Latest Opportunities – Scholarships, Universities & More",
  description: "Browse the latest study abroad opportunities including fully funded scholarships, university openings, and exclusive deals from around the world.",
};

export default async function OpportunitiesPage() {
  const [scholarships, universities, alerts] = await Promise.all([
    prisma.scholarship.findMany({
      take: 12,
      include: { country: true, university: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.university.findMany({
      take: 8,
      include: { country: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.scholarshipAlert.findMany({
      take: 6,
      where: { isNotified: false },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh" }}>
        {/* Hero */}
        <section
          style={{
            padding: "5rem 2rem 3rem",
            background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <span style={{ display: "inline-block", padding: "0.4rem 1rem", background: "rgba(56,189,248,0.15)", color: "#38bdf8", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1rem" }}>
            Live Opportunities
          </span>
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "1rem" }}>Latest Study Abroad Opportunities</h1>
          <p style={{ fontSize: "1.15rem", opacity: 0.8, maxWidth: "650px", margin: "0 auto" }}>
            Discover fresh scholarships, university openings, and exclusive programs — updated daily.
          </p>
        </section>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
          {/* Breaking Alerts */}
          {alerts.length > 0 && (
            <section style={{ marginBottom: "3rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1.5rem" }}>🔥 Just Added</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
                {alerts.map((a) => (
                  <div key={a.id} style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fff7ed 100%)", padding: "1.5rem", borderRadius: "12px", border: "2px solid #f59e0b" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#d97706" }}>New • {a.region}</span>
                    <h3 style={{ margin: "0.5rem 0", fontSize: "1.1rem", fontWeight: 600, color: "var(--navy)" }}>{a.title}</h3>
                    {a.amount && <p style={{ color: "#059669", fontWeight: 700, margin: "0 0 0.5rem 0" }}>{a.amount}</p>}
                    <a href={a.link || "#"} target="_blank" rel="noopener noreferrer" style={{ color: "#d97706", fontWeight: 600, textDecoration: "none" }}>
                      Apply Now →
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Scholarships */}
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1.5rem" }}>🎓 Available Scholarships</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {scholarships.map((s) => (
                <div key={s.id} style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--teal)", textTransform: "uppercase" }}>{s.country.name}</span>
                    {s.deadline && <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Due: {new Date(s.deadline).toLocaleDateString()}</span>}
                  </div>
                  <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1rem", fontWeight: 600, color: "var(--navy)" }}>{s.title}</h3>
                  <a href="#" target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal)", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}>
                    View Details →
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Universities */}
          <section style={{ marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1.5rem" }}>🏛️ Featured Universities</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {universities.map((u) => (
                <Link key={u.id} href={`/universities/${u.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "0 2px 16px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0", transition: "transform 0.2s ease" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--teal)", textTransform: "uppercase" }}>{u.country.name}</span>
                    <h3 style={{ margin: "0.5rem 0", fontSize: "1.1rem", fontWeight: 600, color: "var(--navy)" }}>{u.name}</h3>
                    <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.9rem", color: "#64748b" }}>Ranking: {u.ranking || "N/A"}</p>
                    <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>Tuition: {u.tuitionFees || "N/A"}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ textAlign: "center", padding: "3rem 2rem", background: "linear-gradient(135deg, var(--navy) 0%, #1e3a5f 100%)", borderRadius: "16px", color: "white" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>Don't Miss Out!</h2>
            <p style={{ fontSize: "1.1rem", opacity: 0.8, maxWidth: "500px", margin: "0 auto 2rem" }}>
              Subscribe to get real-time scholarship alerts delivered to your inbox.
            </p>
            <Link
              href="/register"
              style={{ display: "inline-block", padding: "0.75rem 2rem", background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}
            >
              Subscribe Now — It's Free
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
