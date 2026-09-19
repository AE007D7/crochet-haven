import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import readingTime from "reading-time";

const PATTERNS_DIR = path.join(process.cwd(), "src/content/patterns");

export type Category =
  | "amigurumi"
  | "wearables"
  | "bags"
  | "home-decor"
  | "tutorials";

/** A category page is only indexed/listed once it has at least this many articles. */
export const MIN_INDEXABLE_CATEGORY = 3;

export const CATEGORIES: {
  slug: Category;
  label: string;
  description: string;
  /** Core categories appear in the main menu and footer. */
  core: boolean;
}[] = [
  {
    slug: "amigurumi",
    label: "Amigurumi",
    description: "Cute crocheted toys, animals, and characters.",
    core: true,
  },
  {
    slug: "wearables",
    label: "Wearables",
    description: "Beanies, scarves, baby clothes, and other things to wear.",
    core: true,
  },
  {
    slug: "bags",
    label: "Bags & Purses",
    description: "Totes, crossbody bags, clutches, pouches, and backpacks.",
    core: true,
  },
  {
    slug: "home-decor",
    label: "Blankets & Home Decor",
    description: "Blankets, seasonal decorations, ornaments, and table pieces.",
    core: true,
  },
  {
    slug: "tutorials",
    label: "Tutorials & Tips",
    description: "Stitch guides, techniques, and beginner help.",
    core: false,
  },
];

export function getCategoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export interface PatternFrontmatter {
  title: string;
  description: string;
  category: Category;
  difficulty: "Beginner" | "Easy" | "Intermediate" | "Advanced";
  date: string;
  /** Only set when an article is materially revised; never auto-generated. */
  updated?: string;
  image: string;
  /** Describes what the picture shows (not a keyword title). */
  imageAlt?: string;
  yarnWeight?: string;
  hookSize?: string;
  estimatedTime?: string;
}

export interface TocItem {
  id: string;
  text: string;
}

export interface Pattern extends PatternFrontmatter {
  slug: string;
  contentHtml: string;
  toc: TocItem[];
  readingTime: string;
}

export interface PatternSummary extends PatternFrontmatter {
  slug: string;
  readingTime: string;
}

function getPatternSlugs(): string[] {
  if (!fs.existsSync(PATTERNS_DIR)) return [];
  return fs
    .readdirSync(PATTERNS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPatternSummaries(): PatternSummary[] {
  const slugs = getPatternSlugs();
  const patterns = slugs.map((slug) => {
    const fullPath = path.join(PATTERNS_DIR, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      ...(data as PatternFrontmatter),
      readingTime: readingTime(content).text,
    };
  });

  return patterns.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPatternsByCategory(category: Category): PatternSummary[] {
  return getAllPatternSummaries().filter((p) => p.category === category);
}

export async function getPatternBySlug(slug: string): Promise<Pattern | null> {
  const fullPath = path.join(PATTERNS_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);
  const { html: contentHtml, toc } = addHeadingIds(processed.toString());

  return {
    slug,
    ...(data as PatternFrontmatter),
    contentHtml,
    toc,
    readingTime: readingTime(content).text,
  };
}

/**
 * Adds id attributes to every <h2> so the article can link to its sections,
 * and returns those h2s as a table of contents. remark-html leaves headings
 * without ids, so this post-processes the generated HTML.
 */
function addHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();

  const withIds = html.replace(
    /<h2>([\s\S]*?)<\/h2>/g,
    (_match, inner: string) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      let id =
        text
          .toLowerCase()
          .replace(/&[a-z#0-9]+;/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "") || "section";
      let n = 2;
      const base = id;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);
      toc.push({ id, text });
      return `<h2 id="${id}">${inner}</h2>`;
    }
  );

  return { html: withIds, toc };
}

export function getAllPatternSlugs(): string[] {
  return getPatternSlugs();
}
