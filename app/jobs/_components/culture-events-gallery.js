"use client";

import { useEffect, useState } from "react";

function GalleryModal({ images, activeIndex, onClose, onPrevious, onNext, onSelect }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  const activeImage = images[activeIndex];

  if (!activeImage) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/88 px-4 py-6 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(2,6,23,0.98)_100%)] p-4 shadow-[0_40px_140px_rgba(2,6,23,0.7)]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close gallery"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xl text-white transition hover:bg-white/20"
        >
          ×
        </button>

        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/60">
          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="h-[360px] w-full object-cover sm:h-[480px] lg:h-[640px]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.92)_100%)] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">
              Prisma AI Culture & Events
            </p>
            <p className="mt-3 font-display text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">
              {activeImage.title}
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous image"
          onClick={onPrevious}
          className="absolute left-6 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-2xl text-white transition hover:border-cyan-300/40 hover:bg-slate-900"
        >
          ‹
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={onNext}
          className="absolute right-6 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/70 text-2xl text-white transition hover:border-cyan-300/40 hover:bg-slate-900"
        >
          ›
        </button>

        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => onSelect(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? "w-9 bg-cyan-300" : "w-2.5 bg-white/30"
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CultureEventsGallery({ images }) {
  const [modalIndex, setModalIndex] = useState(null);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {images.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setModalIndex(index)}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9)_0%,rgba(2,6,23,0.95)_100%)] p-3 text-left shadow-[0_20px_70px_rgba(2,6,23,0.32)] transition duration-500 hover:-translate-y-1"
          >
            <div className="overflow-hidden rounded-[22px]">
              <img
                src={item.src}
                alt={item.alt}
                className="h-[200px] w-full object-cover transition duration-700 group-hover:scale-[1.08]"
              />
            </div>
            <div className="mt-4 px-2 pb-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                Event Highlight
              </p>
              <p className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-white">
                {item.title}
              </p>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-transparent transition duration-500 group-hover:ring-cyan-300/35" />
          </button>
        ))}
      </div>

      {modalIndex !== null ? (
        <GalleryModal
          images={images}
          activeIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onPrevious={() => setModalIndex((current) => (current - 1 + images.length) % images.length)}
          onNext={() => setModalIndex((current) => (current + 1) % images.length)}
          onSelect={(index) => setModalIndex(index)}
        />
      ) : null}
    </>
  );
}
