"use client";

import React, { useEffect, useState } from "react";

export const ScholarshipStyles = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
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
      font-family: Inter, Outfit, sans-serif;
    }

    .scholarship-card {
      background: var(--surface-glass);
      border: 1px solid var(--surface-border);
      border-radius: 16px;
      padding: 2rem;
      backdrop-filter: blur(12px);
      transition: 0.3s;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .scholarship-card:hover {
      transform: translateY(-5px);
    }

    .scholarship-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--text-main);
    }

    .scholarship-university {
      color: #a855f7;
      font-weight: 600;
    }

    .scholarship-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .detail-item {
      color: var(--text-muted);
    }

    .apply-btn {
      margin-top: auto;
      padding: 10px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      background: var(--primary-gradient);
      color: white;
      font-weight: bold;
    }

    .loading-state,
    .empty-state {
      text-align: center;
      padding: 40px;
    }

    .shimmer {
      height: 300px;
      border-radius: 12px;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05) 25%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0.05) 75%
      );
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `,
    }}
  />
);

interface Scholarship {
  id: number;
  title: string;
  description: string;
  deadline: string;
  benefits: string;
  university?: {
    name: string;
  };
}

export function ScholarshipList({
  categoryId,
}: {
  categoryId: number;
}) {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch(
          `/api/scholarships?categoryId=${categoryId}`
        );

        if (!res.ok) {
          throw new Error("Failed to load scholarships");
        }

        // 👇 Explicitly tell TypeScript what the response is
        const data: Scholarship[] = await res.json() as any;

        setScholarships(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
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
          <div key={i} className="shimmer" />
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
        <p>
          There are currently no scholarships available for your selected
          category.
        </p>
      </div>
    );
  }

  return (
    <div className="scholarship-grid">
      {scholarships.map((scholarship) => (
        <div key={scholarship.id} className="scholarship-card">
          <h3 className="scholarship-title">
            {scholarship.title}
          </h3>

          <div className="scholarship-university">
            🎓 {scholarship.university?.name ?? "Global University"}
          </div>

          <div className="scholarship-details">
            {scholarship.benefits && (
              <div className="detail-item">
                💎 {scholarship.benefits}
              </div>
            )}

            {scholarship.deadline && (
              <div className="detail-item">
                ⏳ Deadline:{" "}
                {new Date(
                  scholarship.deadline
                ).toLocaleDateString()}
              </div>
            )}
          </div>

          <button
            className="apply-btn"
            onClick={() => {
              console.log("Application started!");
            }}
          >
            Apply Now
          </button>
        </div>
      ))}
    </div>
  );
}