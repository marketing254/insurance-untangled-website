import type { Metadata } from "next";
import CommunityClient from "@/components/CommunityClient";

export const metadata: Metadata = {
  title: { absolute: "Dental Member Network — Member Network | Insurance Untangled" },
  description:
    "The Dental Member Network, from the team behind Insurance Untangled. Bring any practice problem and get a written plan back in 2 to 3 business days, plus a growing library of done-for-you resources.",
  alternates: { canonical: "https://www.insuranceuntangled.com/community/" },
  openGraph: {
    title: "Dental Member Network | Insurance Untangled",
    description:
      "Bring any practice problem and get a written plan back in 2 to 3 business days, plus vetted experts, SOPs, templates, and member-only events.",
    url: "https://www.insuranceuntangled.com/community/",
  },
};

export default function CommunityPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Dental Member Network",
    serviceType: "Dental practice membership community",
    description:
      "A membership community for dental practices: expert hotline with written plans in 2–3 business days, vetted expert network, resource library, SOPs, templates, tools, partner directory, and member-only podcasts and events.",
    url: "https://www.insuranceuntangled.com/community/",
    provider: { "@type": "Organization", name: "Thriving Dentist Inc." },
    audience: { "@type": "Audience", audienceType: "Dental practice owners" },
    offers: {
      "@type": "Offer",
      price: "49",
      priceCurrency: "USD",
      description: "Founding rate of $49/month, locked for the first 100 members. 30-day money-back guarantee. Cancel anytime.",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.insuranceuntangled.com/" },
      { "@type": "ListItem", position: 2, name: "Community", item: "https://www.insuranceuntangled.com/community/" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CommunityClient />
    </>
  );
}
