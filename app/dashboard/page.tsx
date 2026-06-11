// app/dashboard/page.tsx
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Simple user dashboard – displayed after a successful login for non‑admin users.
 * Uses a clean white background with minimal styling.
 */
export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "User";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
        padding: "2rem",
      }}
    >
      <section
        style={{
          background: "#ffffff",
          borderRadius: "var(--r-md)",
          boxShadow: "var(--sh-lg)",
          padding: "2rem 3rem",
          maxWidth: "600px",
          width: "100%",
          color: "#000000",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontFamily: "'Inter', sans-serif", fontSize: "2rem", marginBottom: "1rem" }}>
          🎉 Welcome, {userName}!
        </h1>
        <p style={{ marginBottom: "2rem", lineHeight: 1.5 }}>
          Explore the features available to registered users.
        </p>
      </section>
    </main>
  );
}
