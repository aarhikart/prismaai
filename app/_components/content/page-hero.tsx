type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  variant?: "dark" | "light";
};

export function PageHero({
  eyebrow,
  title,
  description,
  variant = "dark",
}: PageHeroProps) {
  const isDark = variant === "dark";

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pb-16 lg:pt-36">
      {isDark ? (
        <>
          <div className="prism-orb prism-orb-left" />
          <div className="prism-orb prism-orb-right" />
        </>
      ) : null}

      <div
        className={[
          "mx-auto max-w-7xl rounded-[40px] border px-6 py-10 shadow-[0_40px_140px_rgba(2,6,23,0.22)] sm:px-10 sm:py-12 lg:px-14",
          isDark
            ? "border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.94)_0%,rgba(2,6,23,0.98)_100%)]"
            : "border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.10),_transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(241,245,249,0.96)_100%)]",
        ].join(" ")}
      >
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow ? (
            <span
              className={[
                "inline-flex rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em]",
                isDark
                  ? "border-cyan-400/25 bg-cyan-400/10 text-cyan-200"
                  : "border-cyan-200 bg-cyan-50 text-cyan-800",
              ].join(" ")}
            >
              {eyebrow}
            </span>
          ) : null}

          <h1
            className={[
              "mt-7 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-5xl lg:text-6xl",
              isDark ? "text-white" : "text-slate-950",
            ].join(" ")}
          >
            {title}
          </h1>

          {description ? (
            <p
              className={[
                "mx-auto mt-5 max-w-2xl text-sm leading-7 sm:text-base",
                isDark ? "text-slate-300" : "text-slate-600",
              ].join(" ")}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
