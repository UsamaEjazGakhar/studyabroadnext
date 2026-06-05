import Link from "next/link";
import React from "react";

/**
 * Sidebar navigation for the Admin Dashboard.
 * Includes placeholder links for admin functionalities.
 */
const Sidebar = () => {
  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/leads", label: "Leads" },
    { href: "/admin/universities", label: "Universities" },
    { href: "/admin/resources", label: "Resources" },
    { href: "/admin/events", label: "Events & Webinars" },
    { href: "/admin/tools", label: "Free Tools" },
    { href: "/admin/scholarship-alerts", label: "Scholarship Alerts" },
    { href: "/admin/ai-features", label: "AI Features" },
    { href: "/admin/blog", label: "Blog & SEO" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <aside
      style={{
        width: "240px",
        background: "var(--surface-2)",
        padding: "1.5rem",
        borderRight: "1px solid var(--surface-3)",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <nav>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((link) => (
            <li key={link.href} style={{ marginBottom: "1rem" }}>
              <Link
                href={link.href}
                style={{
                  textDecoration: "none",
                  color: "var(--text-head)",
                  fontWeight: 500,
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* Country specific dashboards */}
          <li style={{ marginBottom: "1rem" }}>
            <Link href="/admin/countries/europe" style={{ textDecoration: "none", color: "var(--text-head)", fontWeight: 500 }}>
              Europe Scholarships
            </Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link href="/admin/countries/russia" style={{ textDecoration: "none", color: "var(--text-head)", fontWeight: 500 }}>
              Russia Scholarships
            </Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link href="/admin/countries/china" style={{ textDecoration: "none", color: "var(--text-head)", fontWeight: 500 }}>
              China Scholarships
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
