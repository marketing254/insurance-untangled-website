"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchSheetClient } from "@/lib/sheets-client";

interface BlogPost {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
  image_url: string;
  published: string;
}

function getCategoryStyle(category: string): { bg: string; color: string } {
  const cat = category?.toLowerCase() || "";
  if (cat.includes("marketing")) return { bg: "var(--gold-pale)", color: "#8a6010" };
  if (cat.includes("financial") || cat.includes("awareness")) return { bg: "var(--green-pale)", color: "var(--green)" };
  return { bg: "var(--sky-pale)", color: "var(--steel)" };
}

export default function BlogGrid({ initialBlogs }: { initialBlogs: BlogPost[] }) {
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);

  useEffect(() => {
    fetchSheetClient('blogs').then((rows) => {
      const parsed = rows
        .filter((r) => r.title && r.slug && r.published?.toLowerCase() === 'true')
        .sort((a, b) => (b.date || '').localeCompare(a.date || '')) as unknown as BlogPost[];
      setBlogs(parsed);
    }).catch(() => {});
  }, []);

  if (blogs.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--paper-2)", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)" }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--ink-4)" strokeWidth="1.5" style={{ marginBottom: "1rem", opacity: 0.5 }}>
          <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
        </svg>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: 700, color: "var(--ink-2)", marginBottom: ".5rem" }}>Blog Coming Soon</h3>
        <p style={{ fontSize: "14px", color: "var(--ink-4)", lineHeight: 1.65, maxWidth: "440px", margin: "0 auto 1.5rem" }}>
          We&rsquo;re working on in-depth articles adapted from our podcast episodes. Check back soon!
        </p>
        <Link href="/podcast/" className="btn-primary">Listen to the Podcast</Link>
      </div>
    );
  }

  return (
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
              {/* Dot pattern overlay */}
              <div style={{ position: "absolute", inset: 0, opacity: 0.18, backgroundImage: "radial-gradient(circle at 20% 30%,rgba(255,255,255,.5) 1.5px,transparent 2px),radial-gradient(circle at 70% 70%,rgba(255,255,255,.4) 1px,transparent 1.5px)", backgroundSize: "32px 32px,18px 18px" }}></div>
              {/* Category badge on thumb */}
              {isFirst && (
                <div style={{ position: "absolute", top: ".85rem", left: ".95rem", background: "rgba(232,176,64,.92)", color: "#1b2a4a", fontFamily: "var(--mono)", fontSize: "9.5px", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", padding: ".3rem .7rem", borderRadius: "4px", zIndex: 2 }}>
                  New post
                </div>
              )}
              {/* Gradient overlay for text */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(11,37,69,0) 40%,rgba(11,37,69,.85) 100%)", zIndex: 1 }}></div>
              {/* Short title on thumb */}
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem", color: "#fff", fontFamily: "var(--serif)", fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.25, zIndex: 2, textShadow: "0 2px 8px rgba(0,0,0,.3)" }}>
                {post.title.length > 40 ? post.title.slice(0, 40).trim() + "..." : post.title}
              </div>
            </div>
            <div className="blog-card-body">
              <span className="blog-cat" style={{ background: catStyle.bg, color: catStyle.color }}>{post.category || "Article"}</span>
              <div className="blog-card-title">{post.title}</div>
              {post.excerpt && <p className="blog-card-excerpt">{post.excerpt}</p>}
              <div className="blog-card-footer">
                <span style={{ fontFamily: "var(--mono)", fontSize: "10.5px", letterSpacing: ".06em", color: "var(--ink-4)" }}>
                  {post.date}{post.author ? ` \u00b7 ${post.author}` : ""}
                </span>
                <span style={{ color: "var(--steel)", fontSize: "13px", fontWeight: 600 }}>Read article &rarr;</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
