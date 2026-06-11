
import React from "react";
import Sidebar from "./components/Sidebar";

/**
 * Layout for all admin pages. It keeps the Sidebar visible across
 * any nested route (e.g., /admin/countries/europe, /admin/countries/russia,
 * /admin/countries/china). The layout simply renders the Sidebar on the
 * left and the page content on the right.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
  <Sidebar />
  <main style={{ flex: 1, padding: "2rem", background: "var(--surface-1)", overflowY: "auto", height: "100vh" }}>
    {children}
  </main>
</div>
  );
}
