"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-transparent border-0 text-red-600 hover:underline font-bold text-2xl py-3 px-6 cursor-pointer"
    >
      Logout
    </button>
  );
}
