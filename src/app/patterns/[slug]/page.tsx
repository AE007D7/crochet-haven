import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryLabel,
  getAllPatternSlugs,
  getPatternBySlug,
  getAllPatternSummaries,
} from "@/lib/patterns";
import PatternCard from "@/components/PatternCard";
import ArticleActions from "@/components/ArticleActions";
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from "@/lib/site";

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
    title: { absolute: pattern.title },
    description: pattern.description,
    alternates: {
      canonical: `/patterns/${slug}`,
    },
    openGraph: {
      title: pattern.title,
      description: pattern.description,
      ...(pattern.image ?? pattern.pinImage
        ? { images: [{ url: (pattern.image ?? pattern.pinImage) as string }] }
        : {}),
    },
  };
}

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
  const imageUrl = pattern.image
    ? pattern.image.startsWith("http")
      ? pattern.image
      : `${SITE_URL}${pattern.image}`
    : undefined;
  const pinUrl = pattern.pinImage ? `${SITE_URL}${pattern.pinImage}` : undefined;

  const publisher = {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pattern.title,
    description: pattern.description,
    ...(imageUrl || pinUrl
      ? { image: [...new Set([imageUrl, pinUrl].filter(Boolean))] }
      : {}),
    datePublished: pattern.date,
    dateModified: pattern.updated ?? pattern.date,
    author: { "@type": "Person", name: AUTHOR_NAME, url: `${SITE_URL}/about` },
    publisher,
    mainEntityOfPage: pageUrl,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: getCategoryLabel(pattern.category),
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
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted mb-6">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/categories/${pattern.category}`}
          className="hover:text-accent"
        >
          {getCategoryLabel(pattern.category)}
        </Link>
        <span className="mx-2">/</span>
        <span aria-current="page">{pattern.title}</span>
      </nav>

      <h1 className="font-display text-3xl sm:text-4xl mb-3">
        {pattern.title}
      </h1>
      <p className="text-sm text-muted mb-4">
        By{" "}
        <Link href="/about" className="hover:text-accent hover:underline">
          {AUTHOR_NAME}
        </Link>{" "}
        &middot; {formatDate(pattern.date)}
        {pattern.updated && <> &middot; Updated {formatDate(pattern.updated)}</>}{" "}
        &middot; in{" "}
        <Link
          href={`/categories/${pattern.category}`}
          className="hover:text-accent"
        >
          {getCategoryLabel(pattern.category)}
        </Link>
      </p>
      <p className="text-muted text-lg mb-6">{pattern.description}</p>

      <ArticleActions
        pageUrl={pageUrl}
        imageUrl={imageUrl}
        pinImageUrl={pinUrl}
        title={pattern.title}
      />

      {pattern.image && pattern.imageFit !== "contain" ? (
        <>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-accent-soft mb-2">
            <Image
              src={pattern.image}
              alt={pattern.imageAlt ?? pattern.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="mb-8 text-xs text-muted">
            AI-generated illustration. Your finished project may look different.
          </p>
        </>
      ) : (
        (pattern.pinImage ?? pattern.image) && (
          <>
            {/* No plain photo yet: show the pin at its own shape so its text is not cropped. */}
            <div
              className="relative mx-auto mb-2 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-accent-soft"
              style={{ aspectRatio: pattern.pinAspect ?? "2 / 3" }}
            >
              <Image
                src={(pattern.image ?? pattern.pinImage) as string}
                alt={pattern.imageAlt ?? pattern.title}
                fill
                sizes="(min-width: 768px) 576px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <p className="mb-8 text-xs text-muted">
              AI-generated illustration. Your finished project may look different.
            </p>
          </>
        )
      )}

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

      <div
        className="prose-crochet"
        dangerouslySetInnerHTML={{ __html: pattern.contentHtml }}
      />

      {pattern.pinImage && pattern.image && pattern.imageFit !== "contain" && (
        <section
          aria-label="Save this pattern"
          className="mt-10 rounded-2xl border border-border bg-surface p-5 text-center print:hidden"
        >
          <p className="font-display text-lg mb-3">Save this pattern for later</p>
          <div
            className="relative mx-auto w-full max-w-xs overflow-hidden rounded-xl border border-border"
            style={{ aspectRatio: pattern.pinAspect ?? "2 / 3" }}
          >
            <Image
              src={pattern.pinImage}
              alt={`Pinterest pin for ${pattern.title}`}
              fill
              sizes="320px"
              className="object-cover"
            />
          </div>
        </section>
      )}

      <aside
        aria-label="About the publisher"
        className="mt-10 rounded-2xl border border-border bg-surface p-5 print:hidden"
      >
        <p className="font-display text-lg mb-1">About {AUTHOR_NAME}</p>
        <p className="text-sm text-muted leading-relaxed">
          Patterns on {SITE_NAME} are published under the name {AUTHOR_NAME}. Read{" "}
          <Link href="/about" className="text-accent underline">
            how our patterns and images are made
          </Link>
          , or{" "}
          <Link href="/contact" className="text-accent underline">
            get in touch
          </Link>{" "}
          if you spot a mistake.
        </p>
      </aside>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl mb-5">
            More in {getCategoryLabel(pattern.category)}
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
