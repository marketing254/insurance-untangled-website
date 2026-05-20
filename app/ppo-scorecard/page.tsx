import type { Metadata } from "next";
import ScorecardClient from "./ScorecardClient";

export const metadata: Metadata = {
  title: { absolute: "Free PPO Readiness Scorecard for Dental Practices | Insurance Untangled" },
  description:
    "Take our free 2-minute PPO Readiness Scorecard and discover exactly where your dental practice stands with insurance management. Get personalized recommendations.",
  alternates: { canonical: "https://www.insuranceuntangled.com/ppo-scorecard/" },
  openGraph: {
    title: "PPO Readiness Scorecard | Insurance Untangled",
    description: "Free 2-minute assessment — discover where your practice stands with PPO management.",
    url: "https://www.insuranceuntangled.com/ppo-scorecard/",
  },
};

export default function PPOScorecardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PPO Readiness Scorecard",
            description: "Free 2-minute assessment for dental practices. Answer 10 yes/no questions and receive a personalised score across 6 PPO readiness dimensions plus episode recommendations.",
            url: "https://www.insuranceuntangled.com/ppo-scorecard/",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            provider: {
              "@type": "Organization",
              name: "Insurance Untangled",
              url: "https://www.insuranceuntangled.com",
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
              { "@type": "ListItem", position: 2, name: "PPO Readiness Scorecard", item: "https://www.insuranceuntangled.com/ppo-scorecard/" },
            ],
          }),
        }}
      />
      <ScorecardClient />
    </>
  );
}
