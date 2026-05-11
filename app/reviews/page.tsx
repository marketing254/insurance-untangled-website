import type { Metadata } from "next";
import Link from "next/link";
import { getReviews } from "@/lib/sheets";
import ReviewGrid from "@/components/ReviewGrid";

export const metadata: Metadata = {
  title: "Reviews & Testimonials",
  description:
    "See what dentists say about Insurance Untangled's PPO negotiation services and dental marketing. 500+ practices served with a 4.9/5 average rating.",
  alternates: { canonical: "https://www.insuranceuntangled.com/reviews/" },
  openGraph: {
    title: "Reviews & Testimonials | Insurance Untangled",
    description: "500+ practices served. See what dentists say about our PPO negotiation and marketing services.",
    url: "https://www.insuranceuntangled.com/reviews/",
  },
};


export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Testimonials</div>
          <h1 className="page-title">What our partners say</h1>
          <p className="page-sub">
            Real feedback from dental professionals who have worked with our team.
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1rem",
              marginTop: "1.5rem",
              background: "rgba(255,255,255,.08)",
              border: "1px solid rgba(255,255,255,.12)",
              borderRadius: "var(--r-lg)",
              padding: ".85rem 1.5rem",
            }}
          >
            <div style={{ display: "flex", gap: "2px" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--gold-lt)">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span style={{ color: "rgba(255,255,255,.7)", fontSize: "14px" }}>
              4.9/5 average &bull; 500+ practices served
            </span>
          </div>
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "4rem 0" }}>
        <div className="container">
          <ReviewGrid initialReviews={reviews} />

          {/* CTA */}
          <div
            style={{
              marginTop: "3rem",
              padding: "2.5rem",
              background: "var(--paper-2)",
              border: "1px solid var(--paper-3)",
              borderRadius: "var(--r-lg)",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", fontWeight: 700, marginBottom: ".75rem" }}>
              Ready to add your own review?
            </h3>
            <p style={{ fontSize: "14px", color: "var(--ink-3)", marginBottom: "1.5rem" }}>
              Join 500+ dentists who trust Insurance Untangled for PPO strategy and practice growth.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact/" className="btn-primary">
                Book a Free Strategy Call
              </Link>
              <Link href="/ppo-scorecard/" className="btn-outline">
                Take the PPO Scorecard
              </Link>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Insurance Untangled",
            url: "https://www.insuranceuntangled.com",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              bestRating: "5",
              ratingCount: reviews.length.toString(),
              reviewCount: reviews.length.toString(),
            },
            review: reviews.slice(0, 10).map((r) => ({
              "@type": "Review",
              reviewRating: {
                "@type": "Rating",
                ratingValue: r.rating || "5",
                bestRating: "5",
              },
              author: { "@type": "Person", name: r.reviewer_name },
              reviewBody: r.review_text,
              ...(r.date && { datePublished: r.date }),
              publisher: { "@type": "Organization", name: r.platform || "Google" },
            })),
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
              { "@type": "ListItem", position: 2, name: "Reviews & Testimonials", item: "https://www.insuranceuntangled.com/reviews/" },
            ],
          }),
        }}
      />
    </>
  );
}
