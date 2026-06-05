import React from "react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const prisma = new PrismaClient();

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({ where: { slug: params.slug } });
  if (!blog) return { title: "Article Not Found" };
  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDesc || blog.excerpt || blog.content.substring(0, 160),
  };
}

export default async function BlogArticlePage({ params }: { params: { slug: string } }) {
  const blog = await prisma.blog.findUnique({
    where: { slug: params.slug },
    include: { category: true },
  });

  if (!blog || blog.deletedAt) return notFound();

  // Fetch related articles from same category
  const relatedArticles = await prisma.blog.findMany({
    where: {
      categoryId: blog.categoryId,
      id: { not: blog.id },
      publishedAt: { not: null },
      deletedAt: null,
    },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)" }}>
        {/* Article Header */}
        <section
          style={{
            padding: "5rem 2rem 3rem",
            background: "linear-gradient(135deg, var(--navy) 0%, #1a365d 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", color: "var(--teal)" }}>
            {blog.category.name}
          </span>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginTop: "0.75rem", maxWidth: "800px", margin: "0.75rem auto 0", lineHeight: "1.3" }}>
            {blog.title}
          </h1>
          {blog.publishedAt && (
            <p style={{ marginTop: "1rem", opacity: 0.7, fontSize: "0.95rem" }}>
              Published on {new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
        </section>

        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 2rem" }}>
          {/* Tags */}
          {blog.tags && (
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {blog.tags.split(",").map((tag, i) => (
                <span
                  key={i}
                  style={{
                    padding: "0.3rem 0.75rem",
                    background: "var(--navy)",
                    color: "white",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Article Body */}
          <article
            style={{
              background: "white",
              padding: "3rem",
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              lineHeight: "1.8",
              fontSize: "1.05rem",
              color: "#334155",
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Back to Blog */}
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link
              href="/blog"
              style={{
                display: "inline-block",
                padding: "0.75rem 2rem",
                background: "var(--navy)",
                color: "white",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              ← Back to All Articles
            </Link>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section style={{ marginTop: "4rem" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--navy)", marginBottom: "1.5rem" }}>Related Articles</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem" }}>
                {relatedArticles.map((article) => (
                  <Link key={article.id} href={`/blog/${article.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <div
                      style={{
                        background: "white",
                        padding: "1.5rem",
                        borderRadius: "12px",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <h4 style={{ margin: "0 0 0.5rem 0", color: "var(--navy)", fontSize: "1rem", lineHeight: "1.4" }}>{article.title}</h4>
                      <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : ""}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
