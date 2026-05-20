import type { Metadata } from "next";
import Nav from "@/components/Nav";
import AnnounceBar from "@/components/AnnounceBar";
import Footer from "@/components/Footer";
import ClientPopups from "@/components/ClientPopups";
import Analytics, { GTMNoScript } from "@/components/Analytics";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.insuranceuntangled.com"),
  title: {
    default: "Insurance Untangled | Decoding Dental Insurance for Dentists",
    template: "%s | Insurance Untangled",
  },
  description:
    "Insurance Untangled helps dentists understand, negotiate, and navigate dental PPOs with confidence. Free weekly podcast, live CE webinars, and expert fee negotiation services.",
  authors: [{ name: "Insurance Untangled" }],
  // Favicons are now generated automatically by Next.js from app/icon.png + app/apple-icon.png
  openGraph: {
    type: "website",
    siteName: "Insurance Untangled",
    title: "Insurance Untangled | Decoding Dental Insurance for Dentists",
    description:
      "Helping dentists understand, negotiate, and navigate the dental insurance system with confidence — since 2023.",
    url: "https://www.insuranceuntangled.com/",
    locale: "en_US",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Insurance Untangled | Decoding Dental Insurance for Dentists" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@InsuranceUntangled",
    title: "Insurance Untangled | Decoding Dental Insurance for Dentists",
    description:
      "Helping dentists understand, negotiate, and navigate the dental insurance system with confidence — since 2023.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.insuranceuntangled.com/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Manrope:wght@400;500;600;700&family=DM+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Insurance Untangled Podcast"
          href="https://feeds.libsyn.com/insurance-untangled"
        />
        {/* Preload LCP image — hero yarn is the painted LCP element on homepage */}
        <link rel="preload" as="image" href="/images/hero-yarn.png" fetchPriority="high" />
        {/* Preconnect for Unsplash CDN used in CSS background-images */}
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* ── Security meta tags — production only ──────────────────────────────
             CSP meta tag is omitted in `next dev` because React requires eval()
             for dev-mode stack trace reconstruction (Turbopack / RSC).
             In `next build` (NODE_ENV=production) the tag is baked into the
             static HTML and enforced by the browser on every page load.
             HTTP-header equivalents live in next.config.ts for server mode.     */}
        {process.env.NODE_ENV === "production" && (
          <meta
            httpEquiv="Content-Security-Policy"
            content={[
              "default-src 'self'",
              // Apps Script JSONP redirects through script.googleusercontent.com
              "script-src 'self' 'unsafe-inline' https://script.google.com https://script.googleusercontent.com https://*.googleusercontent.com https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://i.vimeocdn.com https://www.google-analytics.com https://www.googletagmanager.com https://lh3.googleusercontent.com https://*.googleusercontent.com https://drive.google.com",
              // Podcast audio served from Libsyn
              "media-src 'self' https://traffic.libsyn.com https://*.libsyn.com https://*.libsynpro.com",
              "frame-src https://player.vimeo.com https://ekwasales-withoutceo-insuranceuntangled.youcanbook.me https://www.google.com https://us02web.zoom.us https://www.googletagmanager.com",
              // Apps Script doGet returns 302 redirect to script.googleusercontent.com — must allow both
              "connect-src 'self' https://script.google.com https://script.googleusercontent.com https://*.googleusercontent.com https://docs.google.com https://app.kit.com https://www.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.youcanbook.me",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://script.google.com https://app.kit.com",
            ].join("; ")}
          />
        )}
        {/* Prevent MIME-type sniffing */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        {/* Referrer — send origin only on cross-origin requests */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        {/* Skip-link — first focusable element for keyboard / screen-reader users */}
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {/* GTM noscript fallback for users with JS disabled (must be first in body) */}
        <GTMNoScript />
        {/* GA4 / GTM script tags (production only, controlled by env vars) */}
        <Analytics />
        <Nav />
        <AnnounceBar />
        <main id="main-content">{children}</main>
        <Footer />
        <ClientPopups />

        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Insurance Untangled",
              url: "https://www.insuranceuntangled.com",
              logo: {
                "@type": "ImageObject",
                url: "https://www.insuranceuntangled.com/images/logo.png",
                width: 462,
                height: 340,
              },
              description:
                "Helping dentists understand, negotiate, and navigate dental PPOs with confidence — through the podcast, live webinars, and expert resources.",
              foundingDate: "2023-01-01",
              address: {
                "@type": "PostalAddress",
                streetAddress: "303 Pinetree Way",
                addressLocality: "Mississauga",
                addressRegion: "Ontario",
                postalCode: "L5G 2R4",
                addressCountry: "CA",
              },
              contactPoint: [{
                "@type": "ContactPoint",
                telephone: "+1-315-743-5373",
                contactType: "customer service",
                email: "support@insuranceuntangled.com",
              }],
              sameAs: [
                "https://podcasts.apple.com/us/podcast/insurance-untangled/id1697118974",
                "https://open.spotify.com/show/2rzbZTBgqMYElL5xkZy1Bq",
                "https://www.youtube.com/playlist?list=PLYzuqhbyVkuApRBUvkXkr5Dalm_F6BYUf",
                "https://www.linkedin.com/company/insurance-untangled",
              ],
              founder: [
                {
                  "@type": "Person",
                  name: "Naren Arulrajah",
                  jobTitle: "CEO & Founder, Ekwa Marketing",
                  url: "https://www.ekwa.com/",
                  sameAs: ["https://www.ekwa.com/", "https://www.linkedin.com/in/narenarulrajah/"],
                },
                {
                  "@type": "Person",
                  name: "Benjamin Tuinei",
                  jobTitle: "President, Veritas Dental Resources",
                  url: "https://veritasdentalresources.com/about",
                  sameAs: ["https://veritasdentalresources.com/about"],
                },
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PodcastSeries",
              name: "Insurance Untangled",
              description: "Expert conversations on PPO strategy, dental marketing, fee negotiation, and building a practice with less insurance dependency.",
              url: "https://www.insuranceuntangled.com/podcast/",
              image: {
                "@type": "ImageObject",
                url: "https://www.insuranceuntangled.com/images/logo.png",
                width: 462,
                height: 340,
              },
              webFeed: "https://feeds.libsyn.com/insurance-untangled",
              author: { "@type": "Organization", name: "Insurance Untangled" },
              publisher: { "@type": "Organization", name: "Insurance Untangled" },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Insurance Untangled",
              url: "https://www.insuranceuntangled.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.insuranceuntangled.com/podcast/?s={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
