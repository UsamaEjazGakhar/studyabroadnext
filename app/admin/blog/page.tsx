import React from "react";
import Link from "next/link";
import Head from "next/head";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Sidebar from "../components/Sidebar";
import LogoutButton from "../LogoutButton";

const prisma = new PrismaClient();

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "Admin") {
    redirect("/login");
  }

  const statusFilter = searchParams.status || "all";

  const whereClause: any = { deletedAt: null };
  if (statusFilter === "published") {
    whereClause.publishedAt = { not: null };
  } else if (statusFilter === "draft") {
    whereClause.publishedAt = null;
  }

  const [blogs, totalCount, publishedCount, draftCount, categories] = await Promise.all([
    prisma.blog.findMany({
      where: whereClause,
      include: { category: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.blog.count({ where: { deletedAt: null } }),
    prisma.blog.count({ where: { deletedAt: null, publishedAt: { not: null } } }),
    prisma.blog.count({ where: { deletedAt: null, publishedAt: null } }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <>
      <Head>
        <title>Blog & SEO Content – Admin</title>
      </Head>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: "2rem", background: "var(--surface-1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <div>
              <h1 style={{ fontSize: "2rem", margin: 0, color: "var(--navy)" }}>Blog & SEO Articles</h1>
              <p style={{ margin: "0.5rem 0 0 0", color: "var(--text-muted)" }}>Manage your content strategy — target 300‑500 articles for SEO dominance.</p>
            </div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button
                style={{
                  padding: "0.5rem 1.25rem",
                  background: "var(--primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                + New Article
              </button>
              <LogoutButton />
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", flex: 1, border: "1px solid var(--surface-3)" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>Total Articles</h3>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700, color: "var(--navy)" }}>{totalCount}</p>
              <p style={{ margin: "0.25rem 0 0 0", fontSize: "0.8rem", color: "var(--text-muted)" }}>Target: 300–500</p>
            </div>
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", flex: 1, border: "1px solid var(--surface-3)" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>Published</h3>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700, color: "var(--success)" }}>{publishedCount}</p>
            </div>
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", flex: 1, border: "1px solid var(--surface-3)" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>Drafts</h3>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700, color: "var(--warning)" }}>{draftCount}</p>
            </div>
            <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", flex: 1, border: "1px solid var(--surface-3)" }}>
              <h3 style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>Categories</h3>
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700, color: "var(--primary)" }}>{categories.length}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", boxShadow: "var(--sh-sm)", marginBottom: "2rem", border: "1px solid var(--surface-3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ fontWeight: 600, color: "var(--text-head)" }}>SEO Content Progress</span>
              <span style={{ fontWeight: 600, color: "var(--primary)" }}>{totalCount} / 500 articles</span>
            </div>
            <div style={{ height: "12px", background: "var(--surface-2)", borderRadius: "6px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${Math.min((totalCount / 500) * 100, 100)}%`,
                  background: "linear-gradient(90deg, var(--primary), var(--teal))",
                  borderRadius: "6px",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>

          {/* Status Tabs */}
          <nav style={{ marginBottom: "1.5rem" }}>
            <ul style={{ display: "flex", gap: "0.5rem", listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { key: "all", label: `All (${totalCount})` },
                { key: "published", label: `Published (${publishedCount})` },
                { key: "draft", label: `Drafts (${draftCount})` },
              ].map((tab) => (
                <li key={tab.key}>
                  <Link
                    href={`/admin/blog?status=${tab.key}`}
                    style={{
                      display: "inline-block",
                      padding: "0.5rem 1.25rem",
                      background: statusFilter === tab.key ? "var(--primary)" : "var(--surface-2)",
                      color: statusFilter === tab.key ? "#fff" : "var(--text-head)",
                      borderRadius: "8px",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "0.9rem",
                    }}
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Blog Table */}
          <div style={{ background: "white", borderRadius: "12px", boxShadow: "var(--sh-sm)", overflow: "hidden", border: "1px solid var(--surface-3)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "var(--surface-2)", textAlign: "left" }}>
                <tr>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.85rem" }}>Title</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.85rem" }}>Category</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.85rem" }}>Status</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.85rem" }}>SEO Meta</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.85rem" }}>Date</th>
                  <th style={{ padding: "1rem", borderBottom: "1px solid var(--surface-3)", fontSize: "0.85rem" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
                      No articles found. Start creating content to boost your SEO!
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr key={blog.id} style={{ borderBottom: "1px solid var(--surface-3)" }}>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ fontWeight: 600, color: "var(--text-head)" }}>{blog.title}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>/blog/{blog.slug}</div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span style={{ background: "var(--surface-2)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontSize: "0.8rem", fontWeight: 600 }}>
                          {blog.category.name}
                        </span>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {blog.publishedAt ? (
                          <span style={{ color: "var(--success)", fontWeight: 600, fontSize: "0.85rem" }}>Published</span>
                        ) : (
                          <span style={{ color: "var(--warning)", fontWeight: 600, fontSize: "0.85rem" }}>Draft</span>
                        )}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        {blog.metaTitle && blog.metaDesc ? (
                          <span style={{ color: "var(--success)", fontSize: "0.85rem" }}>✓ Set</span>
                        ) : (
                          <span style={{ color: "var(--warning)", fontSize: "0.85rem" }}>⚠ Missing</span>
                        )}
                      </td>
                      <td style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                        {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            style={{ padding: "0.35rem 0.7rem", background: "var(--surface-2)", borderRadius: "6px", color: "var(--primary)", textDecoration: "none", fontSize: "0.8rem", fontWeight: 500 }}
                          >
                            View
                          </Link>
                          <button style={{ padding: "0.35rem 0.7rem", background: "var(--surface-2)", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 500, color: "var(--text-head)" }}>
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
