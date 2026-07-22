import type { Metadata } from "next";
import Link from "next/link";
import { getPodcasts, podcastSlug, driveImageUrl, type Podcast } from "@/lib/sheets";
import PodcastEpisodeClient from "@/components/PodcastEpisodeClient";

type Props = {
  params: Promise<{ episode: string }>;
};

function episodeNumber(value: string): string {
  return String(value || "").match(/\d+/)?.[0] || "";
}

function sanitizeEpisode(ep: Podcast): Podcast {
  return {
    ...ep,
    transcript_url: String(ep.transcript_url || "").trim(),
  };
}

function findEpisode(episodes: Podcast[], slug: string): Podcast | undefined {
  const targetEpisode = episodeNumber(slug);
  return episodes.find((ep) => podcastSlug(ep) === slug) || episodes.find((ep) => episodeNumber(ep.episode) === targetEpisode);
}

// Fetch the transcript text at BUILD time and bake it into the static page.
// Runtime fetching through the Apps Script proxy takes 20–30s per page view
// (Apps Script cold start + Drive read); baked transcripts render instantly
// AND become crawlable text for SEO. The runtime proxy remains only as the
// fallback path for brand-new episodes rendered via the 404 fallback.
async function fetchTranscriptText(rawUrl: string): Promise<string> {
  const url = (rawUrl || "").trim();
  if (!url) return "";
  try {
    let target = "";
    const docMatch = url.match(/docs\.google\.com\/document\/d\/([\w-]+)/);
    if (docMatch) {
      target = `https://docs.google.com/document/d/${docMatch[1]}/export?format=txt`;
    } else {
      const idMatch = url.match(/\/(?:file\/)?d\/([\w-]+)/) || url.match(/[?&]id=([\w-]+)/);
      if (!idMatch) return "";
      // drive.usercontent.google.com serves the raw file bytes with proper
      // redirects for anonymous access (the classic uc?export=download
      // endpoint 303s into an interstitial for some files).
      target = `https://drive.usercontent.google.com/download?id=${idMatch[1]}&export=download`;
    }
    const res = await fetch(target, { cache: "force-cache", redirect: "follow" });
    if (!res.ok) return "";
    const text = await res.text();
    // Guard against HTML interstitials (permission walls, virus-scan pages)
    if (/^\s*(<!doctype html|<html)/i.test(text)) return "";
    return text;
  } catch {
    return "";
  }
}

export async function generateStaticParams() {
  const episodes = await getPodcasts();
  // Use only the title slug as the canonical URL format; number-only slugs
  // are kept for backwards-compat lookup in findEpisode() but not pre-rendered.
  return episodes
    .map((ep) => ({ episode: podcastSlug(ep) }))
    .filter((p) => p.episode);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { episode: slug } = await params;
  const episodes = await getPodcasts();
  const ep = findEpisode(episodes, slug);

  if (!ep) {
    return { title: "Episode Not Found" };
  }

  const canonicalSlug = podcastSlug(ep);
  const title = `Ep ${ep.episode}: ${ep.title}`;
  const description = ep.description
    ? ep.description.replace(/\\n|\n/g, " ").slice(0, 160)
    : `Listen to Episode ${ep.episode} of Insurance Untangled - ${ep.title}`;

  return {
    title,
    description,
    alternates: { canonical: `https://www.insuranceuntangled.com/podcast/${canonicalSlug}/` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://www.insuranceuntangled.com/podcast/${canonicalSlug}/`,
      images: ep.poster_image ? [{ url: driveImageUrl(ep.poster_image, 1200) }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// Parse "dd-mm-yyyy" → "yyyy-mm-dd" for schema datePublished
function parseEpisodeDate(raw: string): string | undefined {
  if (!raw?.trim()) return undefined;
  const parts = raw.trim().split(/[-/]/);
  if (parts.length === 3 && parts[2].length === 4) {
    // dd-mm-yyyy
    return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
  }
  // Already ISO or unknown — return as-is if it looks like a date
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return raw.slice(0, 10);
  return undefined;
}

// Parse "MM:SS" or "H:MM:SS" → ISO 8601 duration (e.g. "45:23" → "PT45M23S")
function parseDuration(raw: string): string | undefined {
  if (!raw?.trim()) return undefined;
  const parts = raw.trim().split(":").map((p) => parseInt(p, 10));
  if (parts.some(isNaN)) return undefined;
  if (parts.length === 2) {
    const [min, sec] = parts;
    return `PT${min}M${sec > 0 ? `${sec}S` : ""}`;
  }
  if (parts.length === 3) {
    const [hr, min, sec] = parts;
    return `PT${hr > 0 ? `${hr}H` : ""}${min > 0 ? `${min}M` : ""}${sec > 0 ? `${sec}S` : ""}`;
  }
  return undefined;
}

export default async function EpisodePage({ params }: Props) {
  const { episode: slug } = await params;
  const episodes = await getPodcasts();
  const ep = findEpisode(episodes, slug);

  if (!ep) {
    return (
      <div className="container" style={{ padding: "6rem 0", textAlign: "center" }}>
        <h1 className="page-title">Episode Not Found</h1>
        <Link href="/podcast/" className="btn-primary">Back to Podcast</Link>
      </div>
    );
  }

  const canonicalSlug = podcastSlug(ep);
  const description = ep.description
    ? ep.description.replace(/\\n|\n/g, " ").slice(0, 500)
    : `Episode ${ep.episode} of Insurance Untangled — ${ep.title}`;

  const datePublished = parseEpisodeDate(ep.date_iso);
  const durationISO = parseDuration(ep.duration);

  const episodeSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    name: `Ep ${ep.episode}: ${ep.title}`,
    episodeNumber: parseInt(ep.episode) || undefined,
    description,
    url: `https://www.insuranceuntangled.com/podcast/${canonicalSlug}/`,
    ...(datePublished && { datePublished }),
    inLanguage: "en",
    ...(ep.poster_image && { image: driveImageUrl(ep.poster_image, 1200) }),
    partOfSeries: {
      "@type": "PodcastSeries",
      name: "Insurance Untangled",
      url: "https://www.insuranceuntangled.com/podcast/",
    },
    publisher: {
      "@type": "Organization",
      name: "Insurance Untangled",
      url: "https://www.insuranceuntangled.com",
    },
    ...(ep.guest_name && {
      performer: { "@type": "Person", name: ep.guest_name },
    }),
    ...(ep.audio_source && {
      associatedMedia: {
        "@type": "AudioObject",
        contentUrl: ep.audio_source,
        encodingFormat: "audio/mpeg",
        ...(durationISO && { duration: durationISO }),
      },
    }),
  };

  const initialTranscriptText = await fetchTranscriptText(ep.transcript_url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeSchema) }}
      />
      <PodcastEpisodeClient
        slug={slug}
        initialEpisode={sanitizeEpisode(ep)}
        initialEpisodes={episodes.map(sanitizeEpisode)}
        initialTranscriptText={initialTranscriptText}
      />
    </>
  );
}
