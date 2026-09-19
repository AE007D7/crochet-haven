import Link from "next/link";
import { CATEGORIES } from "@/lib/patterns";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const navLinks = [
    ...CATEGORIES.filter((c) => c.core).map((c) => ({
      href: `/categories/${c.slug}`,
      label: c.label,
    })),
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
  const mobileLinks = [
    { href: "/", label: "Home" },
    { href: "/patterns", label: "All patterns" },
    ...navLinks,
  ];

  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-2xl" aria-hidden>
            🧶
          </span>
          <span className="font-display text-xl text-foreground tracking-tight">
            Chtatou
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden lg:flex items-center gap-6 text-sm text-muted"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/patterns"
            className="hidden sm:inline-flex shrink-0 rounded-full bg-accent text-white text-sm font-medium px-4 py-2 hover:bg-accent-hover transition-colors"
          >
            Browse Patterns
          </Link>
          <MobileMenu links={mobileLinks} />
        </div>
      </div>
    </header>
  );
}
