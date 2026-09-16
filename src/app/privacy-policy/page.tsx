import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Chtatou.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-14">
      <h1 className="font-display text-3xl mb-6">Privacy Policy</h1>
      <div className="prose-crochet">
        <p>
          <em>Last updated: September 14, 2026.</em>
        </p>

        <h2>Overview</h2>
        <p>
          Chtatou ("we", "us") respects your privacy. This policy
          explains what information is collected when you visit this site and
          how it is used.
        </p>

        <h2>Cookies and Advertising</h2>
        <p>
          This site may use cookies and similar technologies, including from
          third-party vendors such as Google, to serve ads based on your
          visits to this site and other sites on the internet. Google's use
          of advertising cookies enables it and its partners to serve ads
          based on your visit to this site and/or other sites.
        </p>
        <p>
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Ads Settings
          </a>
          . Alternatively, you can opt out of some third-party vendors' use of
          cookies for personalized advertising by visiting{" "}
          <a
            href="https://www.aboutads.info"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.aboutads.info
          </a>
          .
        </p>

        <h2>Analytics</h2>
        <p>
          We may use analytics services (such as Google Analytics) to
          understand how visitors use this site. These services may collect
          information such as your IP address, browser type, and pages
          visited.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          This site may contain links to external sites that are not operated
          by us. We are not responsible for the content or privacy practices
          of any third-party sites.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          This site is not directed at children under 13, and we do not
          knowingly collect personal information from children under 13.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy, please reach out
          via our <a href="/contact">contact page</a>.
        </p>
      </div>
    </div>
  );
}
