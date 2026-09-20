import type { MetadataRoute } from "next";
import {
  getAllPatternSummaries,
  CATEGORIES,
  MIN_INDEXABLE_CATEGORY,
} from "@/lib/patterns";
import { AUTHOR, SITE_URL } from "@/lib/site";

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
  const staticRoutes = [
    "/about",
    "/contact",
    `/authors/${AUTHOR.slug}`,
    "/privacy-policy",
    "/terms",
  ].map(
    (route) => ({ url: `${SITE_URL}${route}` })
  );

  // Thin category pages are noindexed, so they are left out of the sitemap too.
  const categoryRoutes = CATEGORIES.flatMap((c) => {
    const dates = patterns.filter((p) => p.category === c.slug).map((p) => p.date);
    if (dates.length < MIN_INDEXABLE_CATEGORY) return [];
    return [{ url: `${SITE_URL}/categories/${c.slug}`, lastModified: newest(dates) }];
  });

  const patternRoutes = patterns.map((p) => ({
    url: `${SITE_URL}/patterns/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...listingRoutes, ...staticRoutes, ...categoryRoutes, ...patternRoutes];
}
