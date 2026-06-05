"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { University } from "../types";

const fetchUniversities = async (params: URLSearchParams): Promise<University[]> => {
  const res = await fetch(`/api/public/universities?${params.toString()}`);
  const data = await res.json();
  return data.universities ?? [];
};

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    country: "",
    degree: "",
    minBudget: "",
    maxBudget: "",
    scholarship: false,
  });

  const loadData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.country) params.append("country", filters.country);
    if (filters.degree) params.append("degree", filters.degree);
    if (filters.minBudget) params.append("minBudget", filters.minBudget);
    if (filters.maxBudget) params.append("maxBudget", filters.maxBudget);
    if (filters.scholarship) params.append("hasScholarship", "true");
    const data = await fetchUniversities(params);
    setUniversities(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const target = e.target;
    const name = target.name;
    const type = target.type;
    const value = type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const applyFilters = async () => {
    await loadData();
  };

  return (
    <div>
      <Header />
      <main className="container" style={{ padding: "2rem", minHeight: "100vh", background: "var(--surface-1)" }}>
        <h1 style={{ fontFamily: "var(--font-head)", color: "var(--navy)", marginBottom: "1.5rem" }}>University Directory</h1>
        {/* Filters */}
        <section className="filters" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <select name="country" value={filters.country} onChange={handleFilterChange} style={filterStyle}>
            <option value="">All Countries</option>
            <option value="Germany">Germany</option>
            <option value="Canada">Canada</option>
            <option value="Russia">Russia</option>
            <option value="China">China</option>
          </select>
          <select name="degree" value={filters.degree} onChange={handleFilterChange} style={filterStyle}>
            <option value="">All Degrees</option>
            <option value="MBBS">MBBS</option>
            <option value="BDS">BDS</option>
            <option value="PhD">PhD</option>
          </select>
          <input type="number" name="minBudget" placeholder="Min Budget" value={filters.minBudget} onChange={handleFilterChange} style={filterStyle} />
          <input type="number" name="maxBudget" placeholder="Max Budget" value={filters.maxBudget} onChange={handleFilterChange} style={filterStyle} />
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input type="checkbox" name="scholarship" checked={filters.scholarship} onChange={handleFilterChange} />
            Scholarships Only
          </label>
          <button onClick={applyFilters} disabled={loading} style={buttonStyle}>Apply</button>
        </section>
        {loading ? (
          <p>Loading universities...</p>
        ) : (
          <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {universities.map(u => (
              <div key={u.id} style={cardStyle}>
                <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--navy)" }}>{u.name}</h3>
                <p style={{ margin: "0 0 0.3rem 0", color: "var(--text-muted)" }}>Country: {u.country.name}</p>
                {u.ranking && <p style={{ margin: "0 0 0.3rem 0", color: "var(--text-muted)" }}>Ranking: #{u.ranking}</p>}
                {u.tuitionFees && <p style={{ margin: "0 0 0.3rem 0", color: "var(--text-muted)" }}>Tuition: {u.tuitionFees}</p>}
                {u.programs && <p style={{ margin: "0 0 0.3rem 0", color: "var(--text-muted)" }}>Programs: {u.programs}</p>}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

const filterStyle: React.CSSProperties = {
  padding: "0.5rem",
  borderRadius: "var(--r-sm)",
  border: "1px solid var(--border)",
  background: "#fff",
};

const buttonStyle: React.CSSProperties = {
  padding: "0.6rem 1.2rem",
  background: "var(--teal)",
  color: "#fff",
  border: "none",
  borderRadius: "var(--r-sm)",
  cursor: "pointer",
};

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(8px)",
  borderRadius: "var(--r-md)",
  padding: "1rem",
  boxShadow: "var(--sh-sm)",
};
