import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPartners, partnerSlug, driveImageUrl, type Partner } from "@/lib/sheets";

export const dynamicParams = false;

export async function generateStaticParams() {
  const partners = await getPartners();
  return partners.map((p) => ({ slug: partnerSlug(p) }));
}

function findPartner(partners: Partner[], slug: string): Partner | undefined {
  return partners.find((p) => partnerSlug(p) === slug);
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

function paragraphs(bio: string): string[] {
  return (bio || "")
    .split(/\r?\n\s*\r?\n|\\n\\n/)
    .map((p) => p.replace(/\\n|\r?\n/g, " ").trim())
    .filter(Boolean);
}

function cleanUrl(url: string): string {
  return (url || "").trim();
}

function urlDisplay(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "") + (u.pathname && u.pathname !== "/" ? u.pathname : "");
  } catch {
    return url;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const partners = await getPartners();
  const partner = findPartner(partners, slug);
  if (!partner) {
    return { title: { absolute: "Partner not found | Insurance Untangled" } };
  }
  const firstPara = paragraphs(partner.bio)[0] || "";
  const description =
    firstPara.length > 0
      ? firstPara.slice(0, 160)
      : `${partner.name} — ${partner.title} — Insurance Untangled partner.`;
  const canonical = `https://www.insuranceuntangled.com/partners/${slug}/`;
  const ogImage = driveImageUrl(partner.image_url, 1200);
  return {
    title: { absolute: `${partner.name} — ${partner.title} | Insurance Untangled Partner` },
    description,
    alternates: { canonical },
    openGraph: {
      title: `${partner.name} | Insurance Untangled Partner`,
      description,
      url: canonical,
      type: "profile",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 1200, alt: partner.name }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: partner.name,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export default async function PartnerProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partners = await getPartners();
  const partner = findPartner(partners, slug);
  if (!partner) notFound();

  const bioParagraphs = paragraphs(partner.bio);
  const externalUrl = cleanUrl(partner.more_info);
  const photo = driveImageUrl(partner.image_url, 800);
  const canonical = `https://www.insuranceuntangled.com/partners/${slug}/`;

  // Suggest a few other partners (max 3) for the bottom rail
  const others = partners.filter((p) => partnerSlug(p) !== slug).slice(0, 3);

  return (
    <>
      <div className="page-banner partner-profile-banner">
        <div className="container page-banner-inner">
          <Link
            href="/partners/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".4rem",
              color: "rgba(168,196,228,.65)",
              fontSize: "12px",
              fontWeight: 500,
              textDecoration: "none",
              marginBottom: "1.25rem",
              fontFamily: "var(--mono)",
              letterSpacing: ".06em",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            All Partners
          </Link>

          <div className="partner-profile-header">
            <div className="partner-profile-photo-wrap">
              {photo ? (
                <img
                  src={photo}
                  alt={partner.name}
                  className="partner-profile-photo"
                  loading="eager"
                />
              ) : (
                <div className="partner-profile-photo partner-profile-photo-fallback">
                  {initials(partner.name)}
                </div>
              )}
            </div>
            <div className="partner-profile-intro">
              <div className="page-eyebrow" style={{ marginBottom: ".5rem" }}>
                Partner Profile
              </div>
              <h1 className="page-title" style={{ marginBottom: ".5rem" }}>
                {partner.name}
              </h1>
              {partner.title && (
                <div className="partner-profile-title">{partner.title}</div>
              )}
              {externalUrl && (
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="partner-profile-website"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span>{urlDisplay(externalUrl)}</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <section style={{ background: "var(--paper)", padding: "3.5rem 0" }}>
        <div className="container" style={{ maxWidth: "1040px" }}>
          <div className="partner-profile-grid">
            <article className="partner-profile-body">
              <div className="sec-eyebrow" style={{ marginBottom: ".5rem" }}>
                About {partner.name.split(" ")[0]}
              </div>
              <h2
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.55rem",
                  fontWeight: 800,
                  color: "var(--ink)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.25,
                }}
              >
                Bio &amp; expertise
              </h2>
              {bioParagraphs.length > 0 ? (
                bioParagraphs.map((p, i) => (
                  <p key={i} className="partner-profile-paragraph">
                    {p}
                  </p>
                ))
              ) : (
                <p className="partner-profile-paragraph">
                  Full bio coming soon. In the meantime, reach out via the link to learn more.
                </p>
              )}
            </article>

            <aside className="partner-profile-aside">
              <div className="partner-profile-card">
                <div className="partner-profile-card-eyebrow">Connect</div>
                <h3 className="partner-profile-card-title">Work with {partner.name.split(" ")[0]}</h3>
                <p className="partner-profile-card-sub">
                  {externalUrl
                    ? "Visit their website to learn more about services and engagement options."
                    : `${partner.name.split(" ")[0]} works with practices in the Insurance Untangled network.`}
                </p>
                {externalUrl && (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Visit Website &rarr;
                  </a>
                )}
                <Link
                  href="/contact/"
                  className="btn-outline-light"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    marginTop: externalUrl ? ".6rem" : 0,
                  }}
                >
                  Ask Insurance Untangled
                </Link>
              </div>

              <div className="partner-profile-card partner-profile-card-quiet">
                <div className="partner-profile-card-eyebrow">At a glance</div>
                <ul className="partner-profile-facts">
                  <li>
                    <span>Name</span>
                    <strong>{partner.name}</strong>
                  </li>
                  {partner.title && (
                    <li>
                      <span>Role</span>
                      <strong>{partner.title}</strong>
                    </li>
                  )}
                  {externalUrl && (
                    <li>
                      <span>Website</span>
                      <strong>{urlDisplay(externalUrl)}</strong>
                    </li>
                  )}
                  <li>
                    <span>Network</span>
                    <strong>Insurance Untangled Partners</strong>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          {others.length > 0 && (
            <div className="partner-profile-related">
              <div className="sec-eyebrow" style={{ marginBottom: ".5rem" }}>
                More partners
              </div>
              <h3
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.35rem",
                  fontWeight: 800,
                  color: "var(--ink)",
                  marginBottom: "1.25rem",
                }}
              >
                Other experts in the network
              </h3>
              <div className="partner-profile-related-grid">
                {others.map((p) => {
                  const oSlug = partnerSlug(p);
                  const oPhoto = driveImageUrl(p.image_url, 240);
                  return (
                    <Link key={oSlug} href={`/partners/${oSlug}/`} className="partner-profile-related-card">
                      {oPhoto ? (
                        <div
                          className="partner-profile-related-avatar"
                          style={{
                            backgroundImage: `url('${oPhoto}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                          role="img"
                          aria-label={p.name}
                        />
                      ) : (
                        <div className="partner-profile-related-avatar partner-profile-related-avatar-fallback">
                          {initials(p.name)}
                        </div>
                      )}
                      <div>
                        <div className="partner-profile-related-name">{p.name}</div>
                        {p.title && <div className="partner-profile-related-title">{p.title}</div>}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                <Link href="/partners/" className="btn-outline">
                  See all partners
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": canonical + "#person",
            name: partner.name,
            jobTitle: partner.title || undefined,
            description: bioParagraphs[0] || undefined,
            url: canonical,
            ...(photo ? { image: photo } : {}),
            ...(externalUrl ? { sameAs: [externalUrl] } : {}),
            affiliation: {
              "@type": "Organization",
              name: "Insurance Untangled",
              url: "https://www.insuranceuntangled.com/",
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
              { "@type": "ListItem", position: 2, name: "Partners", item: "https://www.insuranceuntangled.com/partners/" },
              { "@type": "ListItem", position: 3, name: partner.name, item: canonical },
            ],
          }),
        }}
      />
    </>
  );
}
