"use client";

import { useEffect, useState } from "react";

export default function JobsImageCarousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const slides = images.length > 0 ? [...images, images[0]] : [];

  useEffect(() => {
    if (slides.length <= 1 || isPaused) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setIsAnimating(true);
      setActiveIndex((current) => current + 1);
    }, 3800);

    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div
      className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/50 shadow-[0_30px_90px_rgba(2,6,23,0.45)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex"
        style={{
          transform: `translate3d(-${activeIndex * 100}%, 0, 0)`,
          transition: isAnimating ? "transform 900ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
        onTransitionEnd={() => {
          if (activeIndex === images.length) {
            setIsAnimating(false);
            setActiveIndex(0);
          }
        }}
      >
        {slides.map((image, index) => (
          <div key={`${image.src}-${index}`} className="relative min-w-full">
            <img
              src={image.src}
              alt={image.alt}
              className="h-[360px] w-full object-cover sm:h-[440px] lg:h-[520px]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.1)_0%,rgba(2,6,23,0.45)_100%)]" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-200/80">
                  Team Moments
                </p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                  {image.title}
                </p>
              </div>
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
                {isPaused ? "Paused" : "Auto"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 right-5 flex gap-2">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Show slide ${index + 1}`}
            onClick={() => {
              setIsAnimating(true);
              setActiveIndex(index);
            }}
            className={`h-2.5 rounded-full transition-all ${
              activeIndex % images.length === index ? "w-8 bg-cyan-300" : "w-2.5 bg-white/35"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
