import type { MetadataRoute } from "next";
import { getAllPatternSlugs, CATEGORIES } from "@/lib/patterns";

const SITE_URL = "https://chtatou.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/patterns",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/categories/${c.slug}`,
    lastModified: new Date(),
  }));

  const patternRoutes = getAllPatternSlugs().map((slug) => ({
    url: `${SITE_URL}/patterns/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...patternRoutes];
}
