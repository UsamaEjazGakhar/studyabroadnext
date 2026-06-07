"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const handleLogout = async () => {
    // Direct redirect after sign out for instant navigation
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <button 
      onClick={handleLogout}
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
