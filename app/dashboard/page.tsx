// app/dashboard/page.tsx
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * Simple user dashboard – displayed after a successful login for non‑admin users.
 * It uses a clean glass‑morphism card with a modern gradient background and
 * subtle hover animations to match the premium look of the rest of the app.
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
        background:
          "linear-gradient(135deg, hsl(210, 30%, 12%), hsl(210, 30%, 18%))",
        padding: "2rem",
      }}
    >
      <section
        style={{
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: "var(--r-md)",
          boxShadow: "var(--sh-lg)",
          padding: "2rem 3rem",
          maxWidth: "600px",
          width: "100%",
          color: "#fff",
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
