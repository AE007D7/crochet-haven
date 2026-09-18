"use client";

export default function ArticleActions({
  pageUrl,
  imageUrl,
  title,
}: {
  pageUrl: string;
  imageUrl: string;
  title: string;
}) {
  const pinterestHref =
    "https://www.pinterest.com/pin/create/button/" +
    `?url=${encodeURIComponent(pageUrl)}` +
    `&media=${encodeURIComponent(imageUrl)}` +
    `&description=${encodeURIComponent(title)}`;

  const buttonClass =
    "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground hover:border-accent hover:text-accent transition-colors print:hidden";

  return (
    <div className="flex flex-wrap gap-3 mb-8 print:hidden">
      <a
        href={pinterestHref}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        <span aria-hidden>📌</span> Save to Pinterest
      </a>
      <button type="button" onClick={() => window.print()} className={buttonClass}>
        <span aria-hidden>🖨️</span> Print pattern
      </button>
    </div>
  );
}
