import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPatternSlugs,
  getPatternBySlug,
  getAllPatternSummaries,
} from "@/lib/patterns";
import PatternCard from "@/components/PatternCard";
import AdSlot from "@/components/AdSlot";
import ArticleActions from "@/components/ArticleActions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function generateStaticParams() {
  return getAllPatternSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/patterns/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const pattern = await getPatternBySlug(slug);
  if (!pattern) return {};

  return {
    title: pattern.title,
    description: pattern.description,
    alternates: {
      canonical: `/patterns/${slug}`,
    },
    openGraph: {
      title: pattern.title,
      description: pattern.description,
      images: [{ url: pattern.image }],
    },
  };
}

const SITE_URL = "https://chtatou.com";

export default async function PatternPage(
  props: PageProps<"/patterns/[slug]">
) {
  const { slug } = await props.params;
  const pattern = await getPatternBySlug(slug);
  if (!pattern) notFound();

  const related = getAllPatternSummaries()
    .filter((p) => p.category === pattern.category && p.slug !== pattern.slug)
    .slice(0, 3);

  const pageUrl = `${SITE_URL}/patterns/${slug}`;
  const imageUrl = pattern.image.startsWith("http")
    ? pattern.image
    : `${SITE_URL}${pattern.image}`;

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: pattern.title,
    description: pattern.description,
    image: imageUrl,
    totalTime: undefined,
    estimatedCost: undefined,
    supply: [
      pattern.yarnWeight ? { "@type": "HowToSupply", name: pattern.yarnWeight } : null,
    ].filter(Boolean),
    tool: [
      pattern.hookSize ? { "@type": "HowToTool", name: pattern.hookSize } : null,
    ].filter(Boolean),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Patterns", item: `${SITE_URL}/patterns` },
      {
        "@type": "ListItem",
        position: 2,
        name: pattern.category,
        item: `${SITE_URL}/categories/${pattern.category}`,
      },
      { "@type": "ListItem", position: 3, name: pattern.title, item: pageUrl },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="text-sm text-muted mb-6">
        <Link href="/patterns" className="hover:text-accent">
          Patterns
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/categories/${pattern.category}`}
          className="hover:text-accent capitalize"
        >
          {pattern.category}
        </Link>
      </nav>

      <h1 className="font-display text-3xl sm:text-4xl mb-3">
        {pattern.title}
      </h1>
      <p className="text-sm text-muted mb-4">
        By Chtatou &middot; {formatDate(pattern.date)} &middot; in{" "}
        <Link
          href={`/categories/${pattern.category}`}
          className="hover:text-accent capitalize"
        >
          {pattern.category}
        </Link>
      </p>
      <p className="text-muted text-lg mb-6">{pattern.description}</p>

      <ArticleActions
        pageUrl={pageUrl}
        imageUrl={imageUrl}
        title={pattern.title}
      />

      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-accent-soft mb-2">
        <Image
          src={pattern.image}
          alt={pattern.title}
          fill
          className="object-cover"
          priority
        />
      </div>
      <p className="mb-8 text-xs text-muted">
        AI-generated illustration. Your finished project may look different.
      </p>

      <div className="flex flex-wrap gap-3 mb-10 text-sm">
        <span className="rounded-full bg-accent-soft text-accent-hover px-3 py-1 font-medium">
          {pattern.difficulty}
        </span>
        {pattern.yarnWeight && (
          <span className="rounded-full border border-border px-3 py-1 text-muted">
            Yarn: {pattern.yarnWeight}
          </span>
        )}
        {pattern.hookSize && (
          <span className="rounded-full border border-border px-3 py-1 text-muted">
            Hook: {pattern.hookSize}
          </span>
        )}
        {pattern.estimatedTime && (
          <span className="rounded-full border border-border px-3 py-1 text-muted">
            Time: {pattern.estimatedTime}
          </span>
        )}
        <span className="rounded-full border border-border px-3 py-1 text-muted">
          {pattern.readingTime}
        </span>
      </div>

      {pattern.toc.length > 2 && (
        <nav
          aria-label="Jump to section"
          className="mb-10 rounded-2xl border border-border bg-surface p-5 print:hidden"
        >
          <p className="font-display text-lg mb-3">Jump to</p>
          <ul className="grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
            {pattern.toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-muted hover:text-accent transition-colors"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <AdSlot variant="in-content" className="mb-10" />

      <div
        className="prose-crochet"
        dangerouslySetInnerHTML={{ __html: pattern.contentHtml }}
      />

      <AdSlot variant="in-content" className="mt-10" />

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl mb-5">
            More {pattern.category} patterns
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <PatternCard key={p.slug} pattern={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
