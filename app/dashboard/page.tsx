"use client";
// app/dashboard/page.tsx
import React from "react";

/**
 * Simple user dashboard – displayed after a successful login for non‑admin users.
 * It uses a clean glass‑morphism card with a modern gradient background and
 * subtle hover animations to match the premium look of the rest of the app.
 */
export default function Dashboard() {
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
        <h1
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "2rem",
            marginBottom: "1rem",
          }}
        >
          🎉 Welcome to Your Dashboard!
        </h1>
        <p style={{ marginBottom: "2rem", lineHeight: 1.5 }}>
          You have successfully logged in. From here you can explore the
          features available to regular users—view your profile, manage
          applications, and more.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "0.5rem",
            background:
              "linear-gradient(90deg, hsl(200, 70%, 45%), hsl(200, 70%, 55%))",
            color: "#fff",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          Go to Home
        </button>
      </section>
    </main>
  );
}
