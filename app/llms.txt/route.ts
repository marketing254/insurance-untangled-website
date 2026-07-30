import { getPodcasts, getWebinars, podcastSlug, totalEpisodeCount } from "@/lib/sheets";

export const dynamic = "force-static";

// llms.txt — machine-readable site overview for AI systems (llmstxt.org).
// Generated at build time from the live Google Sheet so the episode count,
// replay count, latest-episode links, and Updated date never go stale.
// (Previously a hand-edited file in /public that froze at "137+ episodes".)
export async function GET() {
  const [podcasts, webinars] = await Promise.all([getPodcasts(), getWebinars()]);
  const epCount = totalEpisodeCount(podcasts);
  const replayCount = webinars.length;
  const today = new Date().toISOString().slice(0, 10);

  const latest = podcasts.slice(0, 5).map((ep) =>
    `- https://www.insuranceuntangled.com/podcast/${podcastSlug(ep)}/ — Ep ${ep.episode}: ${ep.title}`
  ).join("\n");

  const body = `# Insurance Untangled
> Ben Tuinei and Naren Arulrajah's dental insurance education platform — $3B+ in PPO reimbursements recovered, 20 years of fee negotiation expertise, ${epCount}+ podcast episodes, free CE webinars, and expert practice growth services.
> Updated: ${today}
> License: CC BY 4.0

Insurance Untangled helps independent dental practices understand, negotiate, and navigate the dental PPO insurance system with confidence. The site offers a free weekly podcast (${epCount}+ episodes), live CE-eligible webinars with a ${replayCount}-replay archive, expert PPO fee negotiation services via Veritas Dental Resources, and dental marketing services via Ekwa Marketing.

## Founders & Experts

- **Ben Tuinei** — President, Veritas Dental Resources. 20 years specialising in PPO contract negotiations, fee schedules, and insurance strategy. Has recovered over $3 billion in dental reimbursements for clients nationwide.
- **Naren Arulrajah** — CEO & Founder, Ekwa Marketing. 15+ years helping dental practices grow through digital marketing. Serves 200+ dental practices.

## Core Pages

- https://www.insuranceuntangled.com/ — Home: overview of all services
- https://www.insuranceuntangled.com/podcast/ — Full podcast episode index (${epCount}+ episodes on dental PPO strategy)
- https://www.insuranceuntangled.com/ppo-negotiation/ — PPO fee negotiation services by Veritas Dental Resources
- https://www.insuranceuntangled.com/msm/ — Dental marketing services by Ekwa Marketing
- https://www.insuranceuntangled.com/events/ — Live CE webinars and full replay archive (${replayCount} replays)
- https://www.insuranceuntangled.com/ppo-scorecard/ — Free 2-minute PPO Readiness Assessment tool
- https://www.insuranceuntangled.com/case-studies/ — Real dental practice outcomes and recovery numbers
- https://www.insuranceuntangled.com/blog/ — Expert articles on dental insurance strategy
- https://www.insuranceuntangled.com/resources/ — Resource library for dental professionals
- https://www.insuranceuntangled.com/faq/ — Frequently asked questions (PPO negotiation, fee schedules, umbrella networks)
- https://www.insuranceuntangled.com/glossary/ — Dental insurance glossary: 15 plain-English definitions (PPO, fee schedule, UCR, write-off, umbrella network, LEAT clause, downgrade, credentialing, and more)
- https://www.insuranceuntangled.com/services.md — Machine-readable summary of services and pricing model
- https://www.insuranceuntangled.com/about/ — About the founders and team
- https://www.insuranceuntangled.com/reviews/ — Client reviews and testimonials
- https://www.insuranceuntangled.com/partners/ — Partner directory
- https://www.insuranceuntangled.com/contact/ — Contact page (email, phone, contact form)
- https://www.insuranceuntangled.com/be-a-guest/ — Application to appear as a podcast guest

## Latest Episodes

${latest}

## Legal & Privacy

- https://www.insuranceuntangled.com/privacy-policy/ — Privacy Policy
- https://www.insuranceuntangled.com/terms/ — Terms of Service
- https://www.insuranceuntangled.com/cookies/ — Cookie Policy
- https://www.insuranceuntangled.com/data-request/ — GDPR/CCPA data deletion request

## Podcast

The Insurance Untangled podcast covers: PPO contract negotiation, dental fee schedules, umbrella networks, claim denials and downgrades, out-of-network strategy, dental marketing and patient acquisition, practice profitability, and insurance company tactics. Full transcripts are published on every episode page.

RSS Feed: https://feeds.libsyn.com/insurance-untangled
Apple Podcasts: https://podcasts.apple.com/us/podcast/insurance-untangled/id1697118974
Spotify: https://open.spotify.com/show/2rzbZTBgqMYElL5xkZy1Bq
YouTube: https://www.youtube.com/playlist?list=PLYzuqhbyVkuApRBUvkXkr5Dalm_F6BYUf

## Key Facts for Citation

- $3 billion+ recovered in dental reimbursements for clients (Veritas Dental Resources, 2006–2026, ~20 years)
- ${epCount}+ podcast episodes published since 2023, new episodes weekly
- ${replayCount}+ CE-eligible webinar replays available
- PPO fee negotiation clients recover an average of 15–30% more on their top PPO plans
- Insurance Untangled founded 2023; podcast launched on Libsyn with Apple Podcasts and Spotify distribution
- Ben Tuinei has spoken at dental study clubs and conventions nationwide
- 4.9/5 average Google review rating

## Contact

- Email: support@insuranceuntangled.com
- Phone: +1 (315) 743-5373
- Address: 303 Pinetree Way, Mississauga, Ontario L5G 2R4, Canada
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
