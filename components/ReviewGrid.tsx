"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { fetchSheetClient } from "@/lib/sheets-client";

interface Review {
  reviewer_name: string;
  firm_name: string;
  rating: string;
  review_text: string;
  platform: string;
  photo_url: string;
  date: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px", marginBottom: ".75rem" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < rating ? "var(--gold)" : "var(--paper-3)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewGrid({ initialReviews }: { initialReviews: Review[] }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetchSheetClient('reviews').then((rows) => {
      const parsed = rows.filter((r) => r.reviewer_name && r.review_text) as unknown as Review[];
      if (parsed.length > 0) setReviews(parsed);
    }).catch(() => {});
  }, []);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [reviews, checkScroll]);

  // Auto-scroll
  useEffect(() => {
    if (isPaused || reviews.length === 0) return;
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 340, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, reviews]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 340;
    el.scrollBy({ left: dir === "right" ? cardWidth : -cardWidth, behavior: "smooth" });
  };

  if (reviews.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--paper-2)", border: "1px solid var(--paper-3)", borderRadius: "var(--r-lg)" }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--ink-4)" strokeWidth="1.5" style={{ marginBottom: "1rem", opacity: 0.5 }}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.3rem", fontWeight: 700, color: "var(--ink-2)", marginBottom: ".5rem" }}>
          Reviews Coming Soon
        </h3>
        <p style={{ fontSize: "14px", color: "var(--ink-4)", lineHeight: 1.65, maxWidth: "400px", margin: "0 auto" }}>
          We&rsquo;re collecting testimonials from the dental professionals we&rsquo;ve worked with. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Navigation arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          aria-label="Previous reviews"
          style={{
            position: "absolute", left: "-20px", top: "50%", transform: "translateY(-50%)", zIndex: 10,
            width: "42px", height: "42px", borderRadius: "50%", border: "1px solid var(--paper-3)",
            background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,.1)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          aria-label="Next reviews"
          style={{
            position: "absolute", right: "-20px", top: "50%", transform: "translateY(-50%)", zIndex: 10,
            width: "42px", height: "42px", borderRadius: "50%", border: "1px solid var(--paper-3)",
            background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,.1)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      )}

      {/* Carousel track */}
      <div
        ref={scrollRef}
        className="review-carousel-track"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {reviews.map((review, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 320px",
              maxWidth: "320px",
              scrollSnapAlign: "start",
              background: "#fff",
              border: "1px solid var(--paper-3)",
              borderRadius: "var(--r-lg)",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StarRating rating={parseInt(review.rating) || 5} />
            <blockquote style={{ fontSize: "14px", color: "var(--ink-2)", lineHeight: 1.7, fontStyle: "italic", flex: 1, margin: 0, marginBottom: "1.25rem" }}>
              &ldquo;{review.review_text}&rdquo;
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
              {review.photo_url ? (
                <img src={review.photo_url} alt={review.reviewer_name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} loading="lazy" />
              ) : (
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, var(--navy-lt), var(--steel))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--serif)", fontSize: "1rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {review.reviewer_name.charAt(0)}
                </div>
              )}
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{review.reviewer_name}</div>
                {review.firm_name && <div style={{ fontSize: "12px", color: "var(--ink-4)" }}>{review.firm_name}</div>}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: ".75rem", paddingTop: ".65rem", borderTop: "1px solid var(--paper-3)" }}>
              {review.platform && (
                <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".08em", color: "var(--ink-4)", textTransform: "uppercase" }}>
                  via {review.platform}
                </span>
              )}
              {review.date && (
                <span style={{ fontFamily: "var(--mono)", fontSize: "10px", letterSpacing: ".06em", color: "var(--ink-4)" }}>
                  {review.date}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
