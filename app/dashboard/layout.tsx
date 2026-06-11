// app/dashboard/layout.tsx
import React from "react";
import Sidebar from "@/app/dashboard/components/Sidebar";

/**
 * Layout for the Dashboard route. Renders a sidebar for registered users
 * showing universities and scholarships based on the user's category, alongside
 * the main content.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}
