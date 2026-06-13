import React, { useEffect, useState } from "react";

interface Scholarship {
  id: number;
  title: string;
  description?: string;
  benefits?: string;
  eligibility?: string;
  university: { name: string };
  category: { name: string };
}

export const ScholarshipList: React.FC<{ categoryId: number }> = ({ categoryId }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/scholarships?categoryId=${categoryId}`);
        if (!res.ok) throw new Error("Failed to load scholarships");
        const data = (await res.json()) as Scholarship[];
        setScholarships(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);

  if (loading) return <p className="loading">Loading scholarships…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!scholarships.length) return <p>No scholarships found for this category.</p>;

  return (
    <div className="scholarship-grid">
      {scholarships.map((s) => (
        <div key={s.id} className="scholarship-card">
          <h3>{s.title}</h3>
          <p className="category">{s.category.name}</p>
          <p className="university">{s.university.name}</p>
          {s.description && <p className="desc">{s.description}</p>}
        </div>
      ))}
    </div>
  );
};

// Styles (inline for brevity – can be moved to CSS)
const style = `
.scholarship-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}
.scholarship-card {
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 4px 30px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid rgba(255,255,255,0.2);
}
.scholarship-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 40px rgba(0,0,0,0.15);
}
.category, .university { font-weight: 500; color: var(--primary-dark); }
.loading, .error { text-align: center; margin-top: 2rem; }
`;

export const ScholarshipStyles = () => <style>{style}</style>;
