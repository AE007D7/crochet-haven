"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface HeroSlide {
  slug: string;
  title: string;
  image: string;
  alt: string;
}

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [slides.length]);

  function goTo(i: number) {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      goTo(delta < 0 ? index + 1 : index - 1);
    }
    touchStartX.current = null;
  }

  if (slides.length === 0) return null;

  return (
    <div
      className="relative aspect-square rounded-3xl overflow-hidden border border-border bg-surface select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((slide, i) => (
        <Link
          key={slide.slug}
          href={`/patterns/${slide.slug}`}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden={i !== index}
          tabIndex={i === index ? 0 : -1}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={i === 0}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
            <p className="text-white font-display text-lg drop-shadow-sm">
              {slide.title}
            </p>
          </div>
        </Link>
      ))}

      {/* Prev / Next controls */}
      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous pattern"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/80 hover:bg-white text-foreground flex items-center justify-center shadow-sm transition-colors"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next pattern"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/80 hover:bg-white text-foreground flex items-center justify-center shadow-sm transition-colors"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {slides.map((slide, i) => (
          <button
            key={slide.slug}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to ${slide.title}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-5 bg-white" : "w-1.5 bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
