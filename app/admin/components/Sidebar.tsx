"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Sidebar navigation for the Admin Dashboard.
 * Includes placeholder links for admin functionalities.
 */
const Sidebar = () => {
  const router = useRouter();
  const handleLogout = () => {
    signOut({ redirect: false });
    router.replace('/login');
  };
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
        background: "#020620ff",
        padding: "2rem 1.5rem 1.5rem 1.5rem",
        borderRight: "1px solid var(--surface-3)",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h2 style={{ color: "#ffffff", marginBottom: "1rem", fontSize: "1.5rem" }}>AdminSidebar</h2>
      <nav>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {links.map((link) => (
            <li key={link.href} style={{ marginBottom: "1rem" }}>
              <Link
                href={link.href}
                style={{
                  textDecoration: "none",
                  color: "#ffffff",
                  fontWeight: 500,
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* Country specific dashboards */}
          <li style={{ marginBottom: "1rem" }}>
            <Link href="/admin/countries/europe" style={{ textDecoration: "none", color: "#ffffff", fontWeight: 500 }}>
              Europe Scholarships
            </Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link href="/admin/countries/russia" style={{ textDecoration: "none", color: "#ffffff", fontWeight: 500 }}>
              Russia Scholarships
            </Link>
          </li>
          <li style={{ marginBottom: "1rem" }}>
            <Link href="/admin/countries/china" style={{ textDecoration: "none", color: "#ffffff", fontWeight: 500 }}>
              China Scholarships
            </Link>
          </li>
        </ul>
        {/* Logout button */}
        <li style={{ marginTop: "1rem", listStyle: "none" }}>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#ffffff",
              fontWeight: 500,
              cursor: "pointer",
              textDecoration: "none",
              padding: 0,
              fontSize: "1rem",
            }}
          >
            Logout
          </button>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;

