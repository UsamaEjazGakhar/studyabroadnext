"use client";
import React from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      style={{
        padding: "0.5rem 1rem",
        background: "var(--orange)",
        color: "#fff",
        border: "none",
        borderRadius: "var(--r-pill)",
        fontSize: "0.9rem",
        fontWeight: "600",
        cursor: "pointer",
        transition: "opacity 0.2s"
      }}
      onMouseOver={(e) => e.currentTarget.style.opacity = "0.8"}
      onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
    >
      Logout
    </button>
  );
}
