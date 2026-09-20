import type { Metadata } from "next";
import { AUTHOR, AUTHOR_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "About Chtatou — free patterns and tutorials for makers of every skill level.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-14">
      <h1 className="font-display text-3xl mb-6">About Chtatou</h1>
      <div className="prose-crochet">
        <p>
          Chtatou is a home for free, clearly written crochet patterns —
          from your very first amigurumi to more involved wearable pieces.
          Every pattern is written out in full, with stitch counts, materials
          lists, and beginner-friendly notes so you never feel lost partway
          through a project.
        </p>
        <p>
          Whether you picked up a hook for the first time last week or you&apos;ve
          been crocheting for years, our goal is the same: patterns that are
          honest about difficulty, clear about materials, and genuinely fun to
          make.
        </p>
        <h2>What you&apos;ll find here</h2>
        <ul>
          <li>Amigurumi toys and characters</li>
          <li>Wearables: hats, scarves, and baby clothes</li>
          <li>Bags and purses</li>
          <li>Blankets, seasonal decorations, and home decor</li>
          <li>A beginner&apos;s guide to reading crochet patterns</li>
        </ul>
        <h2>Who publishes Chtatou</h2>
        <p>
          Patterns on Chtatou are published under the name{" "}
          <a href={`/authors/${AUTHOR.slug}`}>{AUTHOR_NAME}</a>. For
          questions, corrections or requests, contact the site owner at{" "}
          <a href="mailto:chtatoucochet@gmail.com">chtatoucochet@gmail.com</a>.
        </p>
        <h2>About our patterns and images</h2>
        <p>
          The written patterns on Chtatou are drafted with the help of AI, and
          not every pattern has been test-crocheted yet. Treat each one as a
          starting point: make a gauge swatch and adjust as needed.
        </p>
        <p>
          The images are AI-generated illustrations of the finished projects,
          not photographs of items we crocheted, so your own result may look a
          little different.
        </p>
        <p>
          New patterns are added from time to time. If there&apos;s something
          you&apos;d love to see a pattern for, or you spot a mistake, contact
          the site owner through the <a href="/contact">contact page</a> or at{" "}
          <a href="mailto:chtatoucochet@gmail.com">chtatoucochet@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}
