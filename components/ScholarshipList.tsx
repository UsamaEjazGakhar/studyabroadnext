"use client";

import React, { useEffect, useState } from "react";

export const ScholarshipStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    :root {
      --primary-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
      --surface-glass: rgba(255, 255, 255, 0.05);
      --surface-border: rgba(255, 255, 255, 0.1);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
    }

    .scholarship-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
      padding: 2rem 0;
      font-family: 'Inter', 'Outfit', sans-serif;
    }

    .scholarship-card {
      background: var(--surface-glass);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 2rem;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .scholarship-card::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: var(--primary-gradient);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .scholarship-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      border-color: rgba(168, 85, 247, 0.3);
    }

    .scholarship-card:hover::before {
      opacity: 1;
    }

    .scholarship-title {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.3;
      margin: 0;
    }

    .scholarship-university {
      font-size: 1rem;
      color: var(--primary-gradient);
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .scholarship-university span {
      background: var(--primary-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .scholarship-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.95rem;
      color: var(--text-muted);
    }

    .detail-icon {
      color: #a855f7;
      font-size: 1.1rem;
    }

    .apply-btn {
      margin-top: auto;
      padding: 0.8rem 1.5rem;
      border-radius: 8px;
      background: var(--primary-gradient);
      color: white;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      text-align: center;
      text-decoration: none;
      display: inline-block;
    }

    .apply-btn:hover {
      transform: scale(1.02);
      box-shadow: 0 10px 20px rgba(168, 85, 247, 0.3);
    }

    .loading-state, .empty-state {
      text-align: center;
      padding: 4rem;
      color: var(--text-muted);
      font-size: 1.2rem;
    }

    .shimmer {
      background: linear-gradient(90deg, var(--surface-glass) 25%, rgba(255,255,255,0.1) 50%, var(--surface-glass) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 8px;
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `}} />
);

interface Scholarship {
  id: number;
  title: string;
  description: string;
  deadline: string;
  benefits: string;
  university: {
    name: string;
  };
}

export function ScholarshipList({ categoryId }: { categoryId: number }) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch(`/api/scholarships?categoryId=${categoryId}`);
        if (!res.ok) throw new Error("Failed to load scholarships");
        const data = await res.json();
        setScholarships(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="scholarship-grid">
        {[1, 2, 3].map((i) => (
          <div key={i} className="scholarship-card shimmer" style={{ height: "300px" }} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="empty-state">Error: {error}</div>;
  }

  if (scholarships.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Scholarships Found</h3>
        <p>There are currently no scholarships available for your selected category.</p>
      </div>
    );
  }

  return (
    <div className="scholarship-grid">
      {scholarships.map((scholarship) => (
        <div key={scholarship.id} className="scholarship-card">
          <h3 className="scholarship-title">{scholarship.title}</h3>
          
          <div className="scholarship-university">
            <span>🎓</span>
            <span>{scholarship.university?.name || "Global University"}</span>
          </div>

          <div className="scholarship-details">
            {scholarship.benefits && (
              <div className="detail-item">
                <span className="detail-icon">💎</span>
                <span>{scholarship.benefits}</span>
              </div>
            )}
            {scholarship.deadline && (
              <div className="detail-item">
                <span className="detail-icon">⏳</span>
                <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <button className="apply-btn" onClick={() => alert("Application started!")}>
            Apply Now
          </button>
        </div>
      ))}
    </div>
  );
}
