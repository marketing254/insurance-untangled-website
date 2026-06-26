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
            "@type": "HowTo",
            name: "How to assess your dental practice's PPO readiness",
            description: "A free 2-minute self-assessment that scores your dental practice across 6 PPO readiness dimensions and returns personalised next steps and podcast recommendations.",
            totalTime: "PT2M",
            tool: { "@type": "HowToTool", name: "PPO Readiness Scorecard" },
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Answer 10 yes/no questions",
                text: "Respond to 10 quick yes/no questions covering your finances, marketing, operations, insurance strategy, financial resilience, and strategic planning.",
                url: "https://www.insuranceuntangled.com/ppo-scorecard/",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Receive your score and tier",
                text: "Get an instant score out of 10 mapped to a readiness tier — from Not Ready Yet to Ready to Accelerate — with a breakdown across all 6 dimensions.",
                url: "https://www.insuranceuntangled.com/ppo-scorecard/",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Get personalised next steps",
                text: "Review prioritised next steps and recommended podcast episodes tailored to your score, plus an optional free strategy meeting.",
                url: "https://www.insuranceuntangled.com/ppo-scorecard/",
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
