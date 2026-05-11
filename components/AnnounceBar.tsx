import Link from "next/link";
import { getPodcasts, getUpcomingEvents, podcastSlug } from "@/lib/sheets";

export default async function AnnounceBar() {
  const [podcasts, events] = await Promise.all([
    getPodcasts().catch(() => []),
    getUpcomingEvents().catch(() => []),
  ]);

  const latestEp = podcasts[0] ?? null;
  const today = new Date().toISOString().split("T")[0];
  const nextEvent = events.find((e) => e.date_iso >= today) ?? null;

  if (!latestEp && !nextEvent) return null;

  return (
    <div className="announce-bar-v2">
      <div className="announce-bar-v2-inner">
        {latestEp && (
          <Link href={`/podcast/${podcastSlug(latestEp)}/`} className="ab-col" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="ab-label">Latest Podcast</div>
            <div className="ab-text">
              Episode {latestEp.episode.replace(/\D/g, "")}: {latestEp.title} &rarr;
            </div>
          </Link>
        )}
        {latestEp && nextEvent && <div className="ab-divider"></div>}
        {nextEvent && (
          <Link href="/events/" className="ab-col" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="ab-label">Upcoming Event</div>
            <div className="ab-text">
              {nextEvent.month_year ? `${nextEvent.month_year}: ` : ""}{nextEvent.title} &rarr;
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
