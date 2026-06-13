"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<"calculator" | "finder" | "gpa" | "ielts" | "chances">("calculator");
  const [calcResult, setCalcResult] = useState<string | null>(null);

  const calculateCost = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new (globalThis as any).FormData(e.target as HTMLFormElement);
    const country = fd.get("country");
    const program = fd.get("program");
    
    let base = 10000;
    if (country === "USA" || country === "UK") base += 20000;
    if (program === "MBBS") base += 15000;
    
    setCalcResult(`Estimated Tuition + Living: $${base.toLocaleString()} USD / year`);
  };

  return (
    <div>
      <Header />
      <div style={{ padding: "4rem 2rem", fontFamily: "var(--font-body)", background: "var(--surface-1)", minHeight: "80vh" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h1 style={{ fontFamily: "var(--font-head)", color: "var(--navy)", fontSize: "3rem", marginBottom: "1rem" }}>
              Free Tools & Lead Magnets
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", maxWidth: "700px", margin: "0 auto" }}>
              Calculate costs, check your eligibility, convert your GPA, and find the best scholarships and universities using our advanced AI-powered tools.
            </p>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginBottom: "3rem" }}>
            {[
              { id: "calculator", label: "MBBS/BDS Cost Calculator" },
              { id: "finder", label: "AI University/Scholarship Finder" },
              { id: "gpa", label: "GPA Converter" },
              { id: "ielts", label: "IELTS Requirement Checker" },
              { id: "chances", label: "Admission Chances Calculator" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: "0.75rem 1.5rem",
                  borderRadius: "var(--r-full)",
                  border: "none",
                  fontWeight: "600",
                  cursor: "pointer",
                  background: activeTab === tab.id ? "var(--teal)" : "#fff",
                  color: activeTab === tab.id ? "#fff" : "var(--text-muted)",
                  boxShadow: activeTab === tab.id ? "var(--sh-md)" : "var(--sh-sm)",
                  transition: "all 0.3s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ background: "#fff", padding: "3rem", borderRadius: "var(--r-lg)", boxShadow: "var(--sh-lg)" }}>
            {activeTab === "calculator" && (
              <div>
                <h2 style={{ color: "var(--navy)", marginBottom: "1.5rem" }}>Cost Calculator</h2>
                <form onSubmit={calculateCost} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Select Program</label>
                    <select name="program" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "var(--r-md)" }}>
                      <option value="MBBS">MBBS</option>
                      <option value="BDS">BDS</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>Select Destination Country</label>
                    <select name="country" style={{ width: "100%", padding: "0.75rem", border: "1px solid var(--border)", borderRadius: "var(--r-md)" }}>
                      <option value="China">China</option>
                      <option value="Russia">Russia</option>
                      <option value="Germany">Germany</option>
                      <option value="Canada">Canada</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ padding: "1rem", background: "var(--orange)", color: "#fff", border: "none", borderRadius: "var(--r-md)", fontWeight: "600", fontSize: "1.1rem", cursor: "pointer", marginTop: "1rem" }}>
                    Calculate Costs
                  </button>
                </form>
                {calcResult && (
                  <div style={{ marginTop: "2rem", padding: "1.5rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid #10b981", borderRadius: "var(--r-md)", textAlign: "center", color: "var(--navy)", fontSize: "1.2rem", fontWeight: "bold" }}>
                    {calcResult}
                  </div>
                )}
              </div>
            )}

            {activeTab === "finder" && (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <h2 style={{ color: "var(--navy)", marginBottom: "1.5rem" }}>AI Finder Engine</h2>
                <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
                  Our AI scans your profile and matches you with the best universities and scholarships available right now.
                </p>
                <button className="btn btn-primary" style={{ padding: "1rem 2rem", background: "var(--teal)", color: "#fff", border: "none", borderRadius: "var(--r-md)", fontWeight: "600", fontSize: "1.1rem", cursor: "pointer" }}>
                  Start Free AI Assessment
                </button>
              </div>
            )}

            {(activeTab === "gpa" || activeTab === "ielts" || activeTab === "chances") && (
              <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
                <h2 style={{ color: "var(--navy)", marginBottom: "1rem" }}>Feature Coming Soon!</h2>
                <p>We are integrating the latest data models for this tool. Stay tuned.</p>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
