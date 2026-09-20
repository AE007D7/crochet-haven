import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPatternSummaries } from "@/lib/patterns";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return [{ slug: AUTHOR.slug }];
}

export async function generateMetadata(
  props: PageProps<"/authors/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  if (slug !== AUTHOR.slug) return {};
  return {
    title: { absolute: `Patterns by ${AUTHOR.name}` },
    description: `Free crochet patterns published under the name ${AUTHOR.name} on ${SITE_NAME}.`,
    alternates: { canonical: `/authors/${AUTHOR.slug}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function AuthorPage(props: PageProps<"/authors/[slug]">) {
  const { slug } = await props.params;
  if (slug !== AUTHOR.slug) notFound();

  const patterns = getAllPatternSummaries();
  const url = `${SITE_URL}/authors/${AUTHOR.slug}`;
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    url,
    ...(AUTHOR.photo ? { image: `${SITE_URL}${AUTHOR.photo.src}` } : {}),
    worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-muted mb-4">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span aria-current="page">{AUTHOR.name}</span>
      </nav>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {AUTHOR.photo && (
          <Image
            src={AUTHOR.photo.src}
            alt={AUTHOR.photo.alt}
            width={200}
            height={200}
            className="h-40 w-40 shrink-0 rounded-2xl border border-border object-cover"
          />
        )}
        <div>
          <h1 className="font-display text-3xl mb-3">{AUTHOR.name}</h1>
          {AUTHOR.bio?.length ? (
            AUTHOR.bio.map((p) => (
              <p key={p} className="text-muted leading-relaxed mb-3">
                {p}
              </p>
            ))
          ) : (
            <p className="text-muted leading-relaxed mb-3">
              Patterns on {SITE_NAME} are published under the name {AUTHOR.name}.
            </p>
          )}
          <p className="text-sm text-muted">
            Questions or corrections? Read{" "}
            <Link href="/about" className="text-accent underline">
              how our patterns and images are made
            </Link>{" "}
            or use the{" "}
            <Link href="/contact" className="text-accent underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </div>

      <h2 className="font-display text-2xl mt-12 mb-4">
        Patterns by {AUTHOR.name} ({patterns.length})
      </h2>
      <ul className="divide-y divide-border rounded-2xl border border-border bg-surface">
        {patterns.map((p) => (
          <li key={p.slug} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3">
            <Link href={`/patterns/${p.slug}`} className="hover:text-accent">
              {p.title}
            </Link>
            <span className="text-xs text-muted">{formatDate(p.date)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
