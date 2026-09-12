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

const SITE_URL = "https://example-crochet-haven.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Crochet Haven — Free Crochet Patterns & Tutorials",
    template: "%s | Crochet Haven",
  },
  description:
    "Free, tested crochet patterns for amigurumi, blankets, clothing, and accessories, plus beginner-friendly tutorials.",
  openGraph: {
    type: "website",
    siteName: "Crochet Haven",
    title: "Crochet Haven — Free Crochet Patterns & Tutorials",
    description:
      "Free, tested crochet patterns for amigurumi, blankets, clothing, and accessories, plus beginner-friendly tutorials.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
