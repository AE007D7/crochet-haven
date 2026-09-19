import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const SITE_URL = "https://chtatou.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Chtatou — Free Crochet Patterns & Tutorials",
    template: "%s | Chtatou",
  },
  description:
    "Free crochet patterns for amigurumi, blankets, clothing, and accessories, plus beginner-friendly tutorials.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Chtatou",
    title: "Chtatou — Free Crochet Patterns & Tutorials",
    description:
      "Free crochet patterns for amigurumi, blankets, clothing, and accessories, plus beginner-friendly tutorials.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Chtatou",
  url: SITE_URL,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <head>
        {/* Google AdSense: must be a literal script tag in the page HTML so
            Google's crawler can detect it without running JavaScript. */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6016810252610288"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
