import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Chtatou.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-14">
      <h1 className="font-display text-3xl mb-6">Contact Us</h1>
      <div className="prose-crochet">
        <p>
          Have a question about a pattern, found a mistake, or want to suggest
          a new project? We'd love to hear from you.
        </p>
        <p>
          Email us at{" "}
          <a href="mailto:chtatoucochet@gmail.com">
            chtatoucochet@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
