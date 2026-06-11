import React from "react";
import Sidebar from "@/app/dashboard/components/Sidebar";

export default async function UniversitiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}
