"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const mockResources = [
  { id: 1, title: "Standard SOP Template", type: "SOP Template", desc: "A customizable template for your Statement of Purpose.", fileUrl: "#" },
  { id: 2, title: "Academic LOR Format", type: "LOR Sample", desc: "Sample Letter of Recommendation format for academic references.", fileUrl: "#" },
  { id: 3, title: "Professional CV Builder Guide", type: "CV Template", desc: "Learn how to build a winning CV for university applications.", fileUrl: "#" },
  { id: 4, title: "Canada Visa Checklist", type: "Checklist", desc: "Complete checklist of documents required for Canada study visa.", fileUrl: "#" },
  { id: 5, title: "Germany Blocked Account Guide", type: "Study Guide", desc: "Step-by-step guide to opening a blocked account in Germany.", fileUrl: "#" },
  { id: 6, title: "MBBS Admission Checklist", type: "Checklist", desc: "Everything you need before applying for MBBS abroad.", fileUrl: "#" },
];

export default function ResourcesPage() {
  const [filterType, setFilterType] = useState("All");

  const types = ["All", "SOP Template", "LOR Sample", "CV Template", "Checklist", "Study Guide"];

  const filtered = filterType === "All" ? mockResources : mockResources.filter(r => r.type === filterType);

  return (
    <div>
      <Header />
      <div style={{ padding: "4rem 2rem", fontFamily: "var(--font-body)", background: "var(--surface-1)", minHeight: "80vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h1 style={{ fontFamily: "var(--font-head)", color: "var(--navy)", fontSize: "3rem", marginBottom: "1rem" }}>
              Student Resources Hub
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto" }}>
              Download our free SOP samples, LOR formats, CV templates, checklists, and comprehensive study guides to boost your admission chances.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            {types.map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                style={{
                  padding: "0.5rem 1.5rem",
                  borderRadius: "var(--r-full)",
                  border: "1px solid var(--border)",
                  background: filterType === type ? "var(--teal)" : "#fff",
                  color: filterType === type ? "#fff" : "var(--text-muted)",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {type}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
            {filtered.map(r => (
              <div key={r.id} style={{
                background: "#fff",
                borderRadius: "var(--r-md)",
                padding: "2rem",
                boxShadow: "var(--sh-sm)",
                display: "flex",
                flexDirection: "column",
                borderTop: "4px solid var(--orange)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(el) => el.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={(el) => el.currentTarget.style.transform = "none"}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <span className="badge badge-orange">{r.type}</span>
                </div>
                <h3 style={{ margin: "0 0 1rem 0", color: "var(--navy)", fontSize: "1.3rem" }}>{r.title}</h3>
                <p style={{ margin: "0 0 2rem 0", color: "var(--text-muted)", flexGrow: 1 }}>{r.desc}</p>
                <button className="btn" style={{ background: "transparent", color: "var(--teal)", border: "2px solid var(--teal)", padding: "0.75rem", borderRadius: "var(--r-sm)", fontWeight: "600", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Download Resource
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
