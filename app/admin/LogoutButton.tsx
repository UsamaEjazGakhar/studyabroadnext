"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false });
    router.replace('/login');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: 0,
        background: "transparent",
        color: "#fff",
        border: "none",
        fontSize: "1.5rem",
        fontWeight: "bold",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      Logout
    </button>
  );
}
