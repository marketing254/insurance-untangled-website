import type { Metadata } from "next";
import Link from "next/link";
import { getPartners, partnerSlug, driveImageUrl } from "@/lib/sheets";

export const metadata: Metadata = {
  title: { absolute: "Dental Industry Partner Directory | Insurance Untangled" },
  description:
    "The Insurance Untangled partner network brings together vetted dental industry professionals who share our belief that dentists deserve to navigate insurance with confidence.",
  alternates: { canonical: "https://www.insuranceuntangled.com/partners/" },
  openGraph: {
    title: "Partners | Insurance Untangled",
    description:
      "Meet the vetted dental industry experts in the Insurance Untangled partner network.",
    url: "https://www.insuranceuntangled.com/partners/",
  },
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

export default async function Partners() {
  const partners = await getPartners();

  return (
    <>
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Partners</div>
          <h1 className="page-title">Trusted experts in your corner.</h1>
          <p className="page-sub">
            The Insurance Untangled partner network brings together vetted dental industry
            professionals who share our belief that dentists deserve to understand and navigate
            insurance with confidence.
          </p>
        </div>
      </div>

      <section style={{ background: "var(--paper)" }}>
        <div className="container">
          <div className="sec-eyebrow reveal">Our partners</div>
          <h2 className="sec-title">Meet the network.</h2>
          <p className="sec-sub">
            Each partner is handpicked for their expertise and alignment with our mission.
          </p>

          {partners.length === 0 ? (
            <div
              style={{
                marginTop: "2rem",
                padding: "3rem 2rem",
                background: "var(--paper-2)",
                border: "1px solid var(--paper-3)",
                borderRadius: "var(--r-lg)",
                textAlign: "center",
                color: "var(--ink-3)",
              }}
            >
              Our partner directory is being updated. Please check back soon.
            </div>
          ) : (
            <div className="partners-grid reveal">
              {partners.map((p, i) => {
                const slug = partnerSlug(p);
                const photo = driveImageUrl(p.image_url, 400);
                const delayCls = i < 6 ? ` reveal-d${i + 1}` : "";
                return (
                  <Link
                    key={slug}
                    href={`/partners/${slug}/`}
                    className={`partner-card${delayCls}`}
                  >
                    {photo ? (
                      <div
                        className="partner-avatar partner-avatar-img"
                        style={{
                          backgroundImage: `url('${photo}')`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        role="img"
                        aria-label={p.name}
                      />
                    ) : (
                      <div className="partner-avatar">{initials(p.name)}</div>
                    )}
                    <div className="partner-name">{p.name}</div>
                    {p.title && <div className="partner-title">{p.title}</div>}
                    <div className="partner-link-lbl">
                      View profile{" "}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <div className="partner-cta-band">
        <div className="container" style={{ textAlign: "center" }}>
          <div className="partner-cta-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <line x1="19" y1="8" x2="19" y2="14" />
              <line x1="22" y1="11" x2="16" y2="11" />
            </svg>
          </div>
          <div className="sec-eyebrow reveal">Join us</div>
          <h2 className="sec-title">Want to be a partner?</h2>
          <p style={{ fontSize: "16px", color: "var(--ink-3)", lineHeight: 1.7, margin: ".75rem 0 0" }}>
            If you&apos;re a dental industry professional who helps practices navigate the
            insurance system, grow their patient base, or run a stronger business &mdash; we&apos;d
            love to talk.
          </p>
          <div className="perks-row">
            <div className="perk-item">
              <span className="perk-dot"></span>Featured profile in the directory
            </div>
            <div className="perk-item">
              <span className="perk-dot"></span>Podcast guest opportunities
            </div>
            <div className="perk-item">
              <span className="perk-dot"></span>Access to our dental audience
            </div>
          </div>
          <Link href="/be-a-guest/" className="btn-primary btn-primary-lg">
            Apply to Become a Partner &rarr;
          </Link>
        </div>
      </div>

      {/* Structured data for the directory itself */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Insurance Untangled Partner Directory",
            url: "https://www.insuranceuntangled.com/partners/",
            itemListElement: partners.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://www.insuranceuntangled.com/partners/${partnerSlug(p)}/`,
              name: p.name,
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
              { "@type": "ListItem", position: 2, name: "Partners", item: "https://www.insuranceuntangled.com/partners/" },
            ],
          }),
        }}
      />
    </>
  );
}
