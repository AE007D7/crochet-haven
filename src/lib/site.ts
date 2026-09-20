// Single source of truth for the site's public address. `www` is the host
// Vercel serves the site from (the bare domain redirects to it), so canonical
// URLs, the sitemap, robots.txt and structured data must all use it.
export const SITE_URL = "https://www.chtatou.com";
export const SITE_NAME = "Chtatou";
// The name patterns are published under. Change it here and every byline,
// the structured data, the author page and the About page follow.
export const AUTHOR: {
  name: string;
  slug: string;
  /** Optional. Only add text that is true for the person behind the site. */
  bio?: string[];
  /** Optional. Only add a real photo of the person named above. */
  photo?: { src: string; alt: string };
} = {
  name: "Lara Yanki",
  slug: "lara-yanki",
};
export const AUTHOR_NAME = AUTHOR.name;
