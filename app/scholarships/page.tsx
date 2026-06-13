"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ScholarshipList, ScholarshipStyles } from "@/components/ScholarshipList";

// Simple fetch of current user (placeholder). Adjust according to your auth implementation.
async function fetchCurrentUser() {
  const res = await fetch("/api/user/me");
  if (!res.ok) return null;
  return (await res.json()) as any;
}

export default function ScholarshipsPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const u = await fetchCurrentUser();
        if (!u) {
          // Not logged in, redirect to login
          router.push("/login");
          return;
        }
        setUser(u);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!user) return null; // redirect handled above

  const categoryId = user.categoryId;

  return (
    <div style={{ padding: "2rem", background: "var(--surface-1)" }}>
      <ScholarshipStyles />
      <h2>Scholarships for {user.category?.name || "your selected category"}</h2>
      {categoryId ? (
        <ScholarshipList categoryId={categoryId} />
      ) : (
        <p>Please select a category in your profile to view scholarships.</p>
      )}
    </div>
  );
}
