const perks = [
  "Education policy",
  "Leave benefits from preventing burnout",
  "Company sponsored family events",
  "Flexible work schedule",
  "Team lunch",
  "Employee awards",
  "Onsite gym",
  "Recreational room",
  "Company sponsored activities",
];

const accentStyles = [
  "bg-cyan-400/12 text-cyan-200 border-cyan-300/25",
  "bg-white/8 text-white border-white/10",
  "bg-emerald-400/12 text-emerald-200 border-emerald-300/25",
  "bg-sky-400/12 text-sky-200 border-sky-300/25",
  "bg-white/8 text-white border-white/10",
  "bg-cyan-400/12 text-cyan-200 border-cyan-300/25",
  "bg-white/8 text-white border-white/10",
  "bg-emerald-400/12 text-emerald-200 border-emerald-300/25",
  "bg-sky-400/12 text-sky-200 border-sky-300/25",
];

export default function JobsPerksBenefits() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">
              Perks & Benefits
            </p>
            {/* <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Real benefits designed to support consistency, growth, and team energy.
            </h2> */}
          </div>
          {/* <p className="max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            The structure follows the reference card-strip layout, adapted into Prism.ai&apos;s darker
            premium system with responsive spacing and elevated surfaces.
          </p> */}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {perks.map((perk, index) => (
            <article
              key={perk}
              className={`group flex min-h-[190px] flex-col justify-between rounded-[28px] border p-5 shadow-[0_18px_60px_rgba(2,6,23,0.28)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(8,47,73,0.38)] ${accentStyles[index]}`}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-current/15 bg-slate-950/35 font-display text-lg font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.03em]">
                  {perk}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-300/85">
                  Built to make high-performance work more sustainable and more human.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
