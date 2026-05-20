import type { Metadata } from "next";
import Link from "next/link";
import { getStaticBlogs } from "@/data/static-blogs";

export const metadata: Metadata = {
  title: { absolute: "Dental PPO Insurance Blog | Insurance Untangled" },
  description:
    "Practical guides, plain-English explainers, and strategy breakdowns for dentists who want to understand and work confidently within the insurance system.",
  alternates: { canonical: "https://www.insuranceuntangled.com/blog/" },
};

function getCategoryStyle(category: string): { bg: string; color: string } {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("marketing")) return { bg: "var(--gold-pale)", color: "#8a6010" };
  if (cat.includes("financial") || cat.includes("awareness")) return { bg: "var(--green-pale)", color: "var(--green)" };
  return { bg: "var(--sky-pale)", color: "var(--steel)" };
}

export default function BlogPage() {
  const blogs = getStaticBlogs();

  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Insights &amp; Resources</div>
          <h1 className="page-title">The Insurance Untangled Blog</h1>
          <p className="page-sub">
            Practical guides, plain-English explainers, and strategy breakdowns for dentists who want to
            understand &mdash; and work confidently within &mdash; the insurance system.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          {blogs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--paper-2)", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)" }}>
              <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: 700, color: "var(--ink-2)", marginBottom: ".5rem" }}>Blog Coming Soon</h3>
              <p style={{ fontSize: "14px", color: "var(--ink-4)", lineHeight: 1.65, maxWidth: "440px", margin: "0 auto" }}>
                We&rsquo;re working on in-depth articles adapted from our podcast episodes. Check back soon!
              </p>
            </div>
          ) : (
            <div className="blog-grid">
              {blogs.map((post, i) => {
                const catStyle = getCategoryStyle(post.category);
                const isFirst = i === 0;
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className={`blog-card reveal-d${Math.min(i + 1, 6)}`}
                    style={{ textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", cursor: "pointer" }}
                  >
                    <div className="blog-card-thumb" style={{
                      background: post.image_url
                        ? `url('${post.image_url}') center/cover no-repeat`
                        : "linear-gradient(135deg,#1b2a4a 0%,#3d65a8 60%,#5b87c8 100%)",
                      position: "relative",
                      overflow: "hidden",
                    }}>
                      <div style={{ position: "absolute", inset: 0, opacity: 0.18, backgroundImage: "radial-gradient(circle at 20% 30%,rgba(255,255,255,.5) 1.5px,transparent 2px),radial-gradient(circle at 70% 70%,rgba(255,255,255,.4) 1px,transparent 1.5px)", backgroundSize: "32px 32px,18px 18px" }}></div>
                      {isFirst && (
                        <div style={{ position: "absolute", top: ".85rem", left: ".95rem", background: "rgba(232,176,64,.92)", color: "#1b2a4a", fontFamily: "var(--mono)", fontSize: "9.5px", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: ".3rem .7rem", borderRadius: "4px", zIndex: 2 }}>
                          New post
                        </div>
                      )}
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(11,37,69,0) 40%,rgba(11,37,69,.85) 100%)", zIndex: 1 }}></div>
                      <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem", color: "#fff", fontFamily: "var(--serif)", fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.25, zIndex: 2, textShadow: "0 2px 8px rgba(0,0,0,.3)" }}>
                        {post.title.length > 40 ? post.title.slice(0, 40).trim() + "..." : post.title}
                      </div>
                    </div>
                    <div className="blog-card-body">
                      <span className="blog-cat" style={{ background: catStyle.bg, color: catStyle.color }}>{post.category}</span>
                      <div className="blog-card-title">{post.title}</div>
                      {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
                      <div className="blog-card-footer">
                        <span style={{ fontFamily: "var(--mono)", fontSize: "10.5px", letterSpacing: ".06em", color: "var(--ink-4)" }}>
                          {post.dateLabel}{post.author ? ` · ${post.author}` : ""}
                        </span>
                        <span style={{ color: "var(--steel)", fontSize: "13px", fontWeight: 600 }}>Read article &rarr;</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
