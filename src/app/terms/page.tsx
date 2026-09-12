import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for Crochet Haven.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-14">
      <h1 className="font-display text-3xl mb-6">Terms of Use</h1>
      <div className="prose-crochet">
        <p>
          <em>
            Placeholder text — review before publishing.
          </em>
        </p>

        <h2>Use of Patterns</h2>
        <p>
          Patterns published on Crochet Haven are provided for personal,
          non-commercial use. You may sell finished items made from our
          patterns, but you may not resell, redistribute, or republish the
          written patterns themselves without permission.
        </p>

        <h2>No Warranty</h2>
        <p>
          Patterns are provided "as is." While we test our patterns, we make
          no guarantees about fit, accuracy, or suitability for a particular
          purpose.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          site after changes constitutes acceptance of the updated terms.
        </p>
      </div>
    </div>
  );
}
