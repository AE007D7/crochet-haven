import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getPatternsByCategory, type Category } from "@/lib/patterns";
import PatternCard from "@/components/PatternCard";
import AdSlot from "@/components/AdSlot";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

function findCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export async function generateMetadata(
  props: PageProps<"/categories/[category]">
): Promise<Metadata> {
  const { category } = await props.params;
  const meta = findCategory(category);
  if (!meta) return {};

  return {
    title: meta.label,
    description: meta.description,
    alternates: {
      canonical: `/categories/${category}`,
    },
  };
}

export default async function CategoryPage(
  props: PageProps<"/categories/[category]">
) {
  const { category } = await props.params;
  const meta = findCategory(category);
  if (!meta) notFound();

  const patterns = getPatternsByCategory(category as Category);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl mb-2">{meta.label}</h1>
      <p className="text-muted mb-8 max-w-xl">{meta.description}</p>

      {patterns.length === 0 ? (
        <p className="text-muted">
          No patterns in this category yet — check back soon!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {patterns.map((p) => (
            <PatternCard key={p.slug} pattern={p} />
          ))}
        </div>
      )}

      <AdSlot variant="leaderboard" className="mt-12" />
    </div>
  );
}
