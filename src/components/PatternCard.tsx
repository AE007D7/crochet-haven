import Link from "next/link";
import Image from "next/image";
import type { PatternSummary } from "@/lib/patterns";

const difficultyColor: Record<string, string> = {
  Beginner: "bg-sage/20 text-sage",
  Easy: "bg-sage/20 text-sage",
  Intermediate: "bg-accent-soft text-accent-hover",
  Advanced: "bg-accent/15 text-accent-hover",
};

export default function PatternCard({ pattern }: { pattern: PatternSummary }) {
  return (
    <Link
      href={`/patterns/${pattern.slug}`}
      className="group block rounded-2xl border border-border bg-surface overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className="aspect-[4/3] relative bg-accent-soft overflow-hidden">
        <Image
          src={pattern.image}
          alt={pattern.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 90vw"
        />
      </div>
      <div className="p-4">
        <span
          className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${
            difficultyColor[pattern.difficulty] ?? "bg-accent-soft text-accent-hover"
          }`}
        >
          {pattern.difficulty}
        </span>
        <h3 className="font-display text-lg leading-snug mb-1 text-foreground group-hover:text-accent transition-colors">
          {pattern.title}
        </h3>
        <p className="text-sm text-muted line-clamp-2">{pattern.description}</p>
        <p className="text-xs text-muted mt-3">{pattern.readingTime}</p>
      </div>
    </Link>
  );
}
