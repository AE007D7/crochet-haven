/**
 * Placeholder ad slot.
 *
 * Once your AdSense account is approved, replace the contents of this
 * component with your actual <ins class="adsbygoogle"> unit, or render
 * the real AdSense script from src/app/layout.tsx and drop the matching
 * <ins> tag with your ad-slot ID here. Keeping all ad placements behind
 * this one component means you only need to wire up AdSense in one place.
 */
export default function AdSlot({
  variant = "in-content",
  className = "",
}: {
  variant?: "leaderboard" | "in-content" | "sidebar";
  className?: string;
}) {
  const sizing =
    variant === "leaderboard"
      ? "h-24 sm:h-28"
      : variant === "sidebar"
        ? "h-64"
        : "h-32";

  return (
    <div
      className={`flex items-center justify-center rounded-xl border border-dashed border-border bg-accent-soft/40 text-muted text-xs tracking-wide uppercase ${sizing} ${className}`}
      aria-hidden="true"
    >
      Ad space
    </div>
  );
}
