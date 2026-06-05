"use client";

import React from "react";
import Link from "next/link";

interface Opportunity {
  id: number;
  title: string;
  type: "scholarship" | "university";
  region?: string;
  amount?: string;
  link?: string;
}

// This component will receive server-fetched data as props
export default function LatestOpportunities({ opportunities }: { opportunities: Opportunity[] }) {
  return (
    <section
      style={{
        padding: "5rem 2rem",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        color: "white",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.4rem 1rem",
              background: "rgba(56, 189, 248, 0.15)",
              color: "#38bdf8",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "2px",
              marginBottom: "1rem",
            }}
          >
            🔥 Just Added
          </span>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 800, margin: "0 0 0.75rem 0" }}>Latest Opportunities</h2>
          <p style={{ fontSize: "1.1rem", opacity: 0.7, maxWidth: "500px", margin: "0 auto" }}>
            Fresh scholarships and university spots — don't miss out!
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {opportunities.length === 0 ? (
            <p style={{ gridColumn: "1 / -1", textAlign: "center", opacity: 0.5 }}>No new opportunities at the moment. Check back soon!</p>
          ) : (
            opportunities.map((opp) => (
              <div
                key={`${opp.type}-${opp.id}`}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  transition: "transform 0.2s ease, background 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.6rem",
                      borderRadius: "4px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      background: opp.type === "scholarship" ? "rgba(52, 211, 153, 0.2)" : "rgba(96, 165, 250, 0.2)",
                      color: opp.type === "scholarship" ? "#34d399" : "#60a5fa",
                    }}
                  >
                    {opp.type === "scholarship" ? "🎓 Scholarship" : "🏛️ University"}
                  </span>
                  {opp.region && (
                    <span style={{ fontSize: "0.75rem", opacity: 0.6 }}>{opp.region}</span>
                  )}
                </div>
                <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", fontWeight: 600, lineHeight: "1.4" }}>{opp.title}</h3>
                {opp.amount && (
                  <p style={{ margin: "0 0 0.75rem 0", color: "#34d399", fontWeight: 700, fontSize: "1rem" }}>{opp.amount}</p>
                )}
                <a
                  href={opp.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#38bdf8", fontSize: "0.9rem", fontWeight: 600, textDecoration: "none" }}
                >
                  Learn More →
                </a>
              </div>
            ))
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link
            href="/blog"
            style={{
              display: "inline-block",
              padding: "0.75rem 2rem",
              background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            Browse All Opportunities
          </Link>
        </div>
      </div>
    </section>
  );
}
