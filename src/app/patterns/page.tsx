import type { Metadata } from "next";
import { getAllPatternSummaries } from "@/lib/patterns";
import PatternCard from "@/components/PatternCard";

export const metadata: Metadata = {
  title: "All Patterns",
  description:
    "Browse every free crochet pattern on Chtatou — amigurumi, wearables, bags, blankets, and home decor.",
  alternates: {
    canonical: "/patterns",
  },
};

export default function PatternsPage() {
  const patterns = getAllPatternSummaries();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="font-display text-3xl mb-2">All Patterns</h1>
      <p className="text-muted mb-8">
        {patterns.length} free patterns and counting.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {patterns.map((p) => (
          <PatternCard key={p.slug} pattern={p} />
        ))}
      </div>
    </div>
  );
}
