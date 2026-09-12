import Link from "next/link";
import { CATEGORIES } from "@/lib/patterns";

export default function Header() {
  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl" aria-hidden>
            🧶
          </span>
          <span className="font-display text-xl text-foreground tracking-tight">
            Crochet Haven
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="hover:text-accent transition-colors"
            >
              {c.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/patterns"
          className="shrink-0 rounded-full bg-accent text-white text-sm font-medium px-4 py-2 hover:bg-accent-hover transition-colors"
        >
          Browse Patterns
        </Link>
      </div>
    </header>
  );
}
