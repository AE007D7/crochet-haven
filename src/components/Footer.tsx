import Link from "next/link";
import { CATEGORIES } from "@/lib/patterns";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl" aria-hidden>
              🧶
            </span>
            <span className="font-display text-lg">Chtatou</span>
          </div>
          <p className="text-sm text-muted leading-relaxed">
            Free crochet patterns, tutorials, and inspiration for makers of
            every skill level.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Categories
          </h3>
          <ul className="space-y-2 text-sm text-muted">
            {CATEGORIES.filter((c) => c.core).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="hover:text-accent transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Site</h3>
          <ul className="space-y-2 text-sm text-muted">
            <li>
              <Link href="/about" className="hover:text-accent transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-accent transition-colors">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 sm:px-6 py-4 text-xs text-muted">
          &copy; {new Date().getFullYear()} Chtatou. All patterns are
          for personal use unless stated otherwise.
        </p>
      </div>
    </footer>
  );
}
