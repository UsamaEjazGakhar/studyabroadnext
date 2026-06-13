import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { BlogCategory } from "@prisma/client";


const prisma = new PrismaClient();

export const metadata = {
  title: "Study Abroad Blog – Expert Guides, Tips & Scholarship Updates",
  description: "Read the latest articles on studying abroad, scholarships, university rankings, visa guides, and student life. Your one-stop resource for international education.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const perPage = 12;
  const categoryFilter = searchParams.category || "";

  const whereClause: any = {
    publishedAt: { not: null },
    deletedAt: null,
  };
  if (categoryFilter) {
    whereClause.category = { name: categoryFilter };
  }

  const [blogs, totalCount, categories]: [
    any[],
    number,
    BlogCategory[]
  ] = await Promise.all([
    prisma.blog.findMany({
      where: whereClause,
      include: { category: true },
      orderBy: { publishedAt: "desc" },
      skip: (currentPage - 1) * perPage,
      take: perPage,
    }),
    prisma.blog.count({ where: whereClause }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
  ]);

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f4ff 0%, #e8eef8 100%)" }}>
        {/* Hero */}
        <section
          style={{
            padding: "5rem 2rem 3rem",
            textAlign: "center",
            background: "linear-gradient(135deg, var(--navy) 0%, #1a365d 100%)",
            color: "white",
          }}
        >
          <h1 style={{ fontSize: "2.8rem", fontWeight: 800, marginBottom: "1rem" }}>Study Abroad Blog</h1>
          <p style={{ fontSize: "1.2rem", opacity: 0.85, maxWidth: "600px", margin: "0 auto" }}>
            Expert guides, scholarship updates, and insider tips for your international education journey.
          </p>
        </section>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}>
          {/* Category Filter */}
          <nav style={{ marginBottom: "2.5rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
            <Link
              href="/blog"
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: "20px",
                background: categoryFilter === "" ? "var(--navy)" : "white",
                color: categoryFilter === "" ? "#fff" : "var(--navy)",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
                border: "1px solid var(--navy)",
                transition: "all 0.2s ease",
              }}
            >
              All
            </Link>
            {categories.map((cat: BlogCategory) => (
              <Link
                key={cat.id}
                href={`/blog?category=${encodeURIComponent(cat.name)}`}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "20px",
                  background: categoryFilter === cat.name ? "var(--navy)" : "white",
                  color: categoryFilter === cat.name ? "#fff" : "var(--navy)",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  border: "1px solid var(--navy)",
                  transition: "all 0.2s ease",
                }}
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Blog Grid */}
          {blogs.length === 0 ? (
            <p style={{ textAlign: "center", color: "#64748b", fontSize: "1.1rem", padding: "3rem 0" }}>
              No articles found. Check back soon!
            </p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2rem" }}>
              {blogs.map((blog: (typeof blogs)[number]) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article
                    style={{
                      background: "white",
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    {blog.featuredImage && (
                      <div style={{ height: "200px", background: `url(${blog.featuredImage}) center/cover no-repeat`, borderBottom: "1px solid #e2e8f0" }} />
                    )}
                    {!blog.featuredImage && (
                      <div style={{ height: "200px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "3rem" }}>📝</span>
                      </div>
                    )}
                    <div style={{ padding: "1.5rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--teal)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>
                        {blog.category.name}
                      </span>
                      <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--navy)", margin: "0 0 0.75rem 0", lineHeight: "1.4" }}>
                        {blog.title}
                      </h3>
                      <p style={{ fontSize: "0.9rem", color: "#64748b", lineHeight: "1.6", flexGrow: 1, margin: "0 0 1rem 0" }}>
                        {blog.excerpt || blog.content.substring(0, 150) + "..."}
                      </p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                          {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "Draft"}
                        </span>
                        <span style={{ color: "var(--teal)", fontWeight: 600, fontSize: "0.9rem" }}>Read More →</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "3rem" }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                <Link
                  key={pg}
                  href={`/blog?page=${pg}${categoryFilter ? `&category=${encodeURIComponent(categoryFilter)}` : ""}`}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "8px",
                    background: pg === currentPage ? "var(--navy)" : "white",
                    color: pg === currentPage ? "#fff" : "var(--navy)",
                    textDecoration: "none",
                    fontWeight: 600,
                    border: "1px solid var(--navy)",
                  }}
                >
                  {pg}
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
