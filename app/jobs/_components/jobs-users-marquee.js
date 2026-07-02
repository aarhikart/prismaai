"use client";

const splitInHalf = (items) => {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
};

const expandRow = (items, minimumItems = 8) => {
  if (items.length === 0) {
    return [];
  }

  const expanded = [];

  while (expanded.length < minimumItems) {
    expanded.push(...items);
  }

  return expanded.slice(0, minimumItems);
};

function MarqueeRow({ items, direction }) {
  const baseItems = expandRow(items);
  const repeatedItems = [...baseItems, ...baseItems];

  return (
    <div className="overflow-hidden">
      <div
        className={`prism-marquee-track ${direction === "left" ? "prism-marquee-left" : "prism-marquee-right"} group-hover:[animation-play-state:paused]`}
      >
        {repeatedItems.map((image, index) => (
          <article
            key={`${image.src}-${index}`}
            className="w-[220px] flex-none rounded-[26px] border border-white/10 bg-white/[0.04] p-3 shadow-[0_18px_60px_rgba(2,6,23,0.28)] backdrop-blur"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-[220px] w-full sliderimage rounded-[20px] object-cover"
            />
            {/* <div className="px-2 pb-1 pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
                Users
              </p>
              <p className="mt-2 font-display text-xl font-semibold tracking-[-0.03em] text-white">
                {image.title}
              </p>
            </div> */}
          </article>
        ))}
      </div>
    </div>
  );
}

export default function JobsUsersMarquee({ images }) {
  const [firstRow, secondRow] = splitInHalf(images);

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(2,6,23,0.98)_100%)] p-6 shadow-[0_30px_120px_rgba(2,6,23,0.52)] sm:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">
              Users
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Built with people, trust, and visible customer-facing momentum.
            </h2>
          </div>

          <div className="group mt-10 space-y-5">
            <MarqueeRow items={firstRow} direction="left" />
            <MarqueeRow items={secondRow.length > 0 ? secondRow : firstRow} direction="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
