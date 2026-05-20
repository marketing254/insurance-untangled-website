import type { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import {
  getStaticBlog,
  getStaticBlogs,
  type ContentBlock,
  type StaticBlogPost,
} from "@/data/static-blogs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = getStaticBlogs();
  if (blogs.length === 0) {
    return [{ slug: "_placeholder" }];
  }
  return blogs.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getStaticBlog(slug);

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://www.insuranceuntangled.com/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://www.insuranceuntangled.com/blog/${slug}/`,
      images: post.image_url ? [{ url: post.image_url }] : undefined,
      publishedTime: post.date || undefined,
      authors: post.author ? [post.author] : undefined,
    },
  };
}

// Helpers ─────────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function splitAuthors(author: string): string[] {
  if (!author) return [];
  const parts = author.split(/\s+(?:&|and)\s+/i).map((p) => p.trim()).filter(Boolean);
  return parts.length > 0 ? parts : [author];
}

function shortenTitle(title: string, max = 60): string {
  if (title.length <= max) return title;
  return title.slice(0, max).trimEnd() + "…";
}

function renderBlock(block: ContentBlock, key: number) {
  switch (block.type) {
    case "lead":
      return (
        <p key={key} className="lead" dangerouslySetInnerHTML={{ __html: block.html }} />
      );
    case "p":
      return <p key={key} dangerouslySetInnerHTML={{ __html: block.html }} />;
    case "h2":
      return <h2 key={key}>{block.text}</h2>;
    case "h3":
      return <h3 key={key}>{block.text}</h3>;
    case "ul":
      return (
        <ul key={key}>
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key}>
          {block.items.map((item, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ol>
      );
    case "pullquote":
      return (
        <div key={key} className="pullquote">
          {block.quote}
          {block.attr && <span className="pullquote-attr">— {block.attr}</span>}
        </div>
      );
    case "dialogue":
      return (
        <div key={key} className="dialogue">
          <div className="speaker">{block.speaker}</div>
          <p dangerouslySetInnerHTML={{ __html: block.html }} />
        </div>
      );
    case "takeaways":
      return (
        <div key={key} className="takeaways">
          <div className="takeaways-label">{block.label}</div>
          <h4>{block.title}</h4>
          <ol>
            {block.items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ol>
        </div>
      );
    case "cta":
      return (
        <div key={key} className="cta-block">
          <h3>{block.title}</h3>
          <p>{block.description}</p>
          <Link href={block.href} className="btn">
            {block.label}
          </Link>
        </div>
      );
    default:
      return null;
  }
}

// Page ────────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getStaticBlog(slug);

  if (!post) {
    return (
      <div className="container" style={{ padding: "6rem 0", textAlign: "center" }}>
        <h1 className="page-title">Post Not Found</h1>
        <Link href="/blog/" className="btn-primary">Back to Blog</Link>
      </div>
    );
  }

  const authors = splitAuthors(post.author || "");

  // Related: up to 3 other posts (excluding current)
  const related: StaticBlogPost[] = getStaticBlogs()
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  const authorSchema =
    authors.length > 0
      ? authors.map((a) => ({ "@type": "Person", name: a }))
      : [{ "@type": "Organization", name: "Insurance Untangled" }];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            image: post.image_url || undefined,
            datePublished: post.date || undefined,
            dateModified: post.date || undefined,
            author: authorSchema.map((a: { "@type": string; name: string }) => ({
              ...a,
              url: a.name === "Ben Tuinei" || a.name === "Benjamin Tuinei"
                ? "https://veritasdentalresources.com/about"
                : a.name === "Naren Arulrajah"
                ? "https://www.ekwa.com/"
                : undefined,
            })),
            publisher: {
              "@type": "Organization",
              name: "Insurance Untangled",
              url: "https://www.insuranceuntangled.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.insuranceuntangled.com/images/logo.png",
                width: 200,
                height: 60,
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.insuranceuntangled.com/blog/${slug}/`,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.insuranceuntangled.com/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.insuranceuntangled.com/blog/" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://www.insuranceuntangled.com/blog/${slug}/` },
            ],
          }),
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="article-hero">
        <div className="container">
          <div className="crumbs">
            <Link href="/">Home</Link>
            &nbsp;/&nbsp;
            <Link href="/blog/">Blog</Link>
            &nbsp;/&nbsp;
            <span>{shortenTitle(post.title, 60)}</span>
          </div>

          {post.category && <span className="article-cat">{post.category}</span>}

          <h1 className="article-title">{post.title}</h1>

          {post.excerpt && <p className="article-deck">{post.excerpt}</p>}

          <div className="article-meta">
            <div className="article-byline">
              <div className="byline-avatars">
                {authors.length > 0 ? (
                  authors.slice(0, 2).map((a, i) => (
                    <div
                      key={i}
                      className="byline-avatar"
                      style={
                        i === 1
                          ? { background: "linear-gradient(135deg,#c8921a 0%,#e8b040 100%)" }
                          : undefined
                      }
                      aria-hidden="true"
                    >
                      {getInitials(a)}
                    </div>
                  ))
                ) : (
                  <div className="byline-avatar" aria-hidden="true">IU</div>
                )}
              </div>
              <div>
                <div className="byline-text">
                  {authors.length > 1 ? (
                    <>
                      <strong>{authors[0]}</strong>
                      {" & "}
                      <strong>{authors[1]}</strong>
                    </>
                  ) : (
                    <strong>{post.author || "Insurance Untangled"}</strong>
                  )}
                </div>
                <div className="byline-meta">
                  {post.dateLabel} &middot; {post.readTime} min read
                  {post.episodeNote ? ` · ${post.episodeNote}` : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────────────────── */}
      <article className="article-body">
        <div className="container" style={{ maxWidth: "760px", padding: "0 1.5rem" }}>
          {post.blocks.map((block, i) => renderBlock(block, i))}

          {/* Email capture */}
          <div className="ck-box">
            <h4>Get next week&apos;s article in your inbox</h4>
            <p>
              One short email each Tuesday. The new article, three takeaways, and the latest
              podcast episode. No funnels.
            </p>
            <NewsletterForm source="blog" formClassName="ck-form" inputClassName="" buttonClassName="" />
            <div style={{ fontFamily: "var(--mono)", fontSize: "10.5px", color: "var(--ink-4)", letterSpacing: ".06em", marginTop: ".65rem" }}>
              No spam. Unsubscribe anytime.
            </div>
          </div>
        </div>
      </article>

      {/* ── RELATED ──────────────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="related">
          <div className="container">
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: "11px",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: "var(--steel)",
                fontWeight: 600,
                marginBottom: ".45rem",
              }}
            >
              Keep reading
            </div>
            <h2
              style={{
                fontFamily: "var(--serif)",
                fontSize: "1.7rem",
                fontWeight: 900,
                color: "var(--ink)",
                marginBottom: ".4rem",
              }}
            >
              Related from the blog
            </h2>
            <div className="related-grid">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}/`} className="related-card">
                  {r.category && <span className="related-cat">{r.category}</span>}
                  <div className="related-title">{r.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
