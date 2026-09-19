import type { MetadataRoute } from "next";
import { getAllPatternSummaries, CATEGORIES } from "@/lib/patterns";

const SITE_URL = "https://chtatou.com";

// lastModified is taken from each article's real publication date rather than
// the build time, so the sitemap never claims content changed when it did not.
export default function sitemap(): MetadataRoute.Sitemap {
  const patterns = getAllPatternSummaries();
  const newest = (dates: string[]) =>
    new Date(dates.reduce((a, b) => (a > b ? a : b)));

  const listingRoutes = ["", "/patterns"].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: newest(patterns.map((p) => p.date)),
  }));

  // Policy pages: no lastModified rather than a made-up one.
  const staticRoutes = ["/about", "/contact", "/privacy-policy", "/terms"].map(
    (route) => ({ url: `${SITE_URL}${route}` })
  );

  const categoryRoutes = CATEGORIES.map((c) => {
    const dates = patterns.filter((p) => p.category === c.slug).map((p) => p.date);
    return {
      url: `${SITE_URL}/categories/${c.slug}`,
      ...(dates.length ? { lastModified: newest(dates) } : {}),
    };
  });

  const patternRoutes = patterns.map((p) => ({
    url: `${SITE_URL}/patterns/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...listingRoutes, ...staticRoutes, ...categoryRoutes, ...patternRoutes];
}
