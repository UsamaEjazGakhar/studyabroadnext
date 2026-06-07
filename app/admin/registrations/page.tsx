// app/admin/registrations/page.tsx
"use client";
import React, { useEffect, useState } from "react";



interface PendingUser {
  id: number;
  email: string;
  profilePicture: string | null;
  createdAt: string;
}

export default function AdminRegistrations() {
  const [users, setUsers] = useState<PendingUser[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPending = async () => {
    try {
      const res = await fetch("/api/admin/registrations");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setUsers(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (userId: number, action: "approve" | "reject") => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-id": "1" }, // placeholder admin ID
        body: JSON.stringify({ userId, action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");
      // refresh list
      await fetchPending();
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <>

    <main style={{ flex: 1, padding: "2rem", background: "var(--surface-1)" }}>
          <h2 style={{ marginBottom: "1rem" }}>Pending Registrations</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "1px solid #444", padding: "0.5rem" }}>Email</th>
                <th style={{ borderBottom: "1px solid #444", padding: "0.5rem" }}>Profile</th>
                <th style={{ borderBottom: "1px solid #444", padding: "0.5rem" }}>Created</th>
                <th style={{ borderBottom: "1px solid #444", padding: "0.5rem" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td style={{ padding: "0.5rem" }}>{u.email}</td>
                  <td style={{ padding: "0.5rem" }}>
                    {u.profilePicture ? (
                      <img src={u.profilePicture} alt="profile" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td style={{ padding: "0.5rem" }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: "0.5rem" }}>
                    <button
                      disabled={loading}
                      onClick={() => handleAction(u.id, "approve")}
                      style={{ marginRight: "0.5rem" }}
                    >
                      Approve
                    </button>
                    <button disabled={loading} onClick={() => handleAction(u.id, "reject")}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

    </>
  );
}
