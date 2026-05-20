import type { Metadata } from "next";
import { getUpcomingEvents, getWebinars } from "@/lib/sheets";
import { UpcomingEvents, WebinarReplays } from "@/components/EventsList";

export const metadata: Metadata = {
  title: { absolute: "Dental Insurance Webinars & CE Events | Insurance Untangled" },
  description:
    "Live answers to the questions your insurance rep won't answer. Free CE webinars, expert panels, and full replay archive for dental professionals.",
  alternates: { canonical: "https://www.insuranceuntangled.com/events/" },
  openGraph: {
    title: "Events & Webinar Replays | Insurance Untangled",
    description: "Free live CE webinars and expert panels for dentists. Watch replays anytime.",
    url: "https://www.insuranceuntangled.com/events/",
  },
};

export default async function EventsPage() {
  const [upcomingEvents, webinars] = await Promise.all([getUpcomingEvents(), getWebinars()]);

  const today = new Date().toISOString().split("T")[0];
  const futureEvents = upcomingEvents.filter((e) => e.date_iso >= today);

  const eventSchema = futureEvents.length > 0
    ? futureEvents.map((e) => ({
        "@context": "https://schema.org",
        "@type": "Event",
        name: e.title,
        startDate: e.date_iso,
        // endDate omitted intentionally — same-day event, no exact end time stored.
        // Schema.org rejects endDate === startDate as zero-duration.
        description: e.description || "Free live CE-eligible dental insurance webinar with expert panel and Q&A.",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
        image: e.banner_url || e.image_urls || "https://www.insuranceuntangled.com/images/logo.png",
        location: {
          "@type": "VirtualLocation",
          url: e.register_url || "https://www.insuranceuntangled.com/events/",
        },
        organizer: {
          "@type": "Organization",
          name: "Insurance Untangled",
          url: "https://www.insuranceuntangled.com",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          url: e.register_url || "https://www.insuranceuntangled.com/events/",
        },
        ...(e.Panelists && {
          performer: e.Panelists.split(",").map((p: string) => ({
            "@type": "Person",
            name: p.trim(),
          })),
        }),
        ...(e.register_url && { url: e.register_url }),
      }))
    : null;

  return (
    <>
      {eventSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
      )}
      <div className="page-banner">
        <div className="container page-banner-inner">
          <div className="page-eyebrow">Live &amp; On-Demand</div>
          <h1 className="page-title">Live answers to the questions your insurance rep won&rsquo;t answer.</h1>
          <p className="page-sub">
            Free monthly panels with dental insurance experts, marketing strategists, and practice consultants.
            Earn CE credits. Every session recorded for replay.
          </p>
        </div>
      </div>

      <UpcomingEvents initialEvents={upcomingEvents} />
      <WebinarReplays initialWebinars={webinars} />
    </>
  );
}
