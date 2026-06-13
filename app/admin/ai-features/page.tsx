import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import LogoutButton from "../LogoutButton";

export default async function AIFeaturesPage() {
// @ts-ignore
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  // Static mock data for admin dashboard
  const aiStats = {
    totalQueries: 12450,
    scholarshipMatches: 8432,
    universityMatches: 4018,
    averageLatencyMs: 850
  };

  const recentQueries = [
    { id: 1, user: "Student from India", query: "Looking for fully funded MBBS in Europe with 70% in high school.", type: "University Recommender", date: "2 hours ago" },
    { id: 2, user: "Student from Nigeria", query: "Masters in Data Science scholarships in UK without IELTS.", type: "Scholarship Finder", date: "5 hours ago" },
    { id: 3, user: "Student from Pakistan", query: "Low tuition fee engineering universities in Germany or Italy.", type: "University Recommender", date: "1 day ago" },
  ];

  return (
    <>
      <Head>
        <title>AI Features & Recommenders – Admin</title>
      </Head>
      <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <h1 style={{ fontSize: "2rem", margin: 0, color: "var(--navy)" }}>AI Recommender Engines</h1>
              <p style={{ margin: "0.5rem 0 0 0", color: "var(--text-muted)" }}>Manage AI Scholarship Finder and University Recommender models.</p>
            </div>
            <LogoutButton />
          </div>

          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", flex: 1, border: "1px solid var(--surface-3)" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>Total AI Queries</h3>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700, color: "var(--primary)" }}>{aiStats.totalQueries.toLocaleString()}</p>
            </div>
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", flex: 1, border: "1px solid var(--surface-3)" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>Scholarship Matches</h3>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700, color: "var(--success)" }}>{aiStats.scholarshipMatches.toLocaleString()}</p>
            </div>
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", flex: 1, border: "1px solid var(--surface-3)" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>Avg Response Time</h3>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700, color: "var(--text-head)" }}>{aiStats.averageLatencyMs} ms</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "2rem" }}>
            {/* AI Settings */}
            <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", border: "1px solid var(--surface-3)" }}>
              <h2 style={{ marginTop: 0, borderBottom: "1px solid var(--surface-2)", paddingBottom: "1rem" }}>Configuration</h2>
              
              <div style={{ marginTop: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-head)" }}>Active Model API Engine</label>
                <select style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--surface-3)", background: "var(--surface-1)" }}>
                  <option>OpenAI GPT-4o (Recommended)</option>
                  <option>OpenAI GPT-4o-mini (Faster)</option>
                  <option>Google Gemini 1.5 Pro</option>
                  <option>Anthropic Claude 3.5 Sonnet</option>
                </select>
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-head)" }}>University Recommender System Prompt</label>
                <textarea 
                  rows={5}
                  defaultValue="You are an expert study abroad counselor. Based on the user's academic profile, budget, and desired destination, recommend 3 suitable universities from the database."
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--surface-3)", resize: "vertical" }}
                />
              </div>

              <div style={{ marginTop: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-head)" }}>Scholarship Finder System Prompt</label>
                <textarea 
                  rows={5}
                  defaultValue="Match the user's demographic and academic background with active scholarships. Prioritize fully funded and merit-based opportunities in Europe and Asia."
                  style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--surface-3)", resize: "vertical" }}
                />
              </div>

              <button style={{ marginTop: "1.5rem", padding: "0.75rem 1.5rem", background: "var(--primary)", color: "white", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}>
                Save AI Configuration
              </button>
            </div>

            {/* Recent Queries */}
            <div style={{ background: "white", padding: "2rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", border: "1px solid var(--surface-3)" }}>
              <h2 style={{ marginTop: 0, borderBottom: "1px solid var(--surface-2)", paddingBottom: "1rem" }}>Recent AI Queries</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
                {recentQueries.map((q) => (
                  <div key={q.id} style={{ background: "var(--surface-1)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--surface-2)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontWeight: 600, color: "var(--primary)", fontSize: "0.85rem" }}>{q.type}</span>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{q.date}</span>
                    </div>
                    <p style={{ margin: "0 0 0.5rem 0", color: "var(--text-head)", fontStyle: "italic" }}>"{q.query}"</p>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>From: {q.user}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </>
    </>
  );
}
