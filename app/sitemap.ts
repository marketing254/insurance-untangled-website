import type { MetadataRoute } from "next";
import { getPodcasts, getWebinars, podcastSlug, webinarSlug } from "@/lib/sheets";
import { getStaticBlogs } from "@/data/static-blogs";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.insuranceuntangled.com";

  // Static pages
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/podcast/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/events/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/ppo-negotiation/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/dental-marketing/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog/`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${baseUrl}/reviews/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/resources/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/about/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/be-a-guest/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/ppo-scorecard/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/contact/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/partners/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/faq/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/case-studies/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/privacy-policy/`, lastModified: new Date("2026-05-07"), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/cookies/`, lastModified: new Date("2026-05-07"), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms/`, lastModified: new Date("2026-05-08"), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/data-request/`, lastModified: new Date("2026-05-08"), changeFrequency: "yearly" as const, priority: 0.2 },
    // /thank-you/ intentionally excluded — noindex page, post-conversion only
  ];

  // Dynamic podcast episode pages
  const podcasts = await getPodcasts();
  const podcastPages = podcasts.filter((ep) => ep.episode).map((ep) => ({
    url: `${baseUrl}/podcast/${podcastSlug(ep)}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic webinar replay pages
  const webinars = await getWebinars();
  const webinarPages = webinars.map((w) => ({
    url: `${baseUrl}/events/replay/${webinarSlug(w)}/`,
    lastModified: w.date_iso ? new Date(w.date_iso) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Blog post pages — sourced from static-blogs to match generateStaticParams
  const blogs = getStaticBlogs();
  const blogPages = blogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...podcastPages, ...webinarPages, ...blogPages];
}
