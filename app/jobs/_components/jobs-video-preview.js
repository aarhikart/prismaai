"use client";

import { useEffect, useRef } from "react";

export default function JobsVideoPreview({ src, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const attemptPlay = () => {
      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
    };

    attemptPlay();
    return undefined;
  }, []);

  return (
    <div
      className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/70 p-3 shadow-[0_30px_100px_rgba(8,47,73,0.35)]"
      onMouseEnter={() => videoRef.current?.pause()}
      onMouseLeave={() => {
        const video = videoRef.current;

        if (!video) {
          return;
        }

        const playPromise = video.play();

        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_34%)]" />
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        className="relative h-[280px] w-full rounded-[24px] object-cover sm:h-[360px] lg:h-[430px]"
      />
      <div className="pointer-events-none absolute inset-x-8 bottom-8 rounded-[24px] border border-white/10 bg-slate-950/70 px-5 py-4 backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
          Culture Preview
        </p>
        <p className="mt-2 text-sm text-slate-200">
          Hover to pause. Replace this dummy reel with your final office video later.
        </p>
      </div>
    </div>
  );
}
