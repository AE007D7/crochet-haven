import Link from "next/link";
import { getAllPatternSummaries, CATEGORIES } from "@/lib/patterns";
import PatternCard from "@/components/PatternCard";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  const patterns = getAllPatternSummaries();
  const featured = patterns.slice(0, 3);
  const rest = patterns.slice(3);
  const heroSlides = patterns.slice(0, 6).map((p) => ({
    slug: p.slug,
    title: p.title,
    image: p.image,
    alt: p.imageAlt ?? p.title,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-accent-soft/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="text-accent font-medium text-sm mb-3 tracking-wide uppercase">
              Free crochet patterns
            </p>
            <h1 className="font-display text-4xl sm:text-5xl leading-tight text-foreground mb-5">
              Cozy patterns, made for every skill level.
            </h1>
            <p className="text-muted text-lg leading-relaxed mb-8 max-w-md">
              From your first amigurumi to a full wardrobe cardigan —
              written-out patterns with stitch counts, materials lists, and
              beginner-friendly tips.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/patterns"
                className="rounded-full bg-accent text-white font-medium px-6 py-3 hover:bg-accent-hover transition-colors"
              >
                Browse all patterns
              </Link>
              <Link
                href="/patterns/reading-a-pattern"
                className="rounded-full border border-border bg-surface font-medium px-6 py-3 hover:border-accent hover:text-accent transition-colors"
              >
                New to crochet? Start here
              </Link>
            </div>
          </div>
          <HeroSlider slides={heroSlides} />
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-4">
        <h2 className="font-display text-2xl mb-5">Browse by category</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.filter((c) => c.core).map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="rounded-xl border border-border bg-surface p-4 hover:border-accent hover:shadow-sm transition-all"
            >
              <h3 className="font-display text-base mb-1">{c.label}</h3>
              <p className="text-xs text-muted leading-relaxed">
                {c.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured patterns */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <h2 className="font-display text-2xl mb-5">Featured patterns</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PatternCard key={p.slug} pattern={p} />
          ))}
        </div>
      </section>

      {rest.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
          <h2 className="font-display text-2xl mb-5">More patterns</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <PatternCard key={p.slug} pattern={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
