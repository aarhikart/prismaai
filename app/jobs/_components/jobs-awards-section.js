export default function JobsAwardsSection({ awards }) {
  return (
    <section className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-700">
              Awards
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Milestones that reflect consistency, trust, and sustained product execution.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            The layout follows the stacked-badge reference structure, translated into Prism.ai&apos;s
            cleaner spacing and premium card treatment.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {awards.map((award) => (
            <article
              key={award.year}
              className="overflow-hidden rounded-[34px] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_20px_70px_rgba(148,163,184,0.16)]"
            >
              <div className="bg-[linear-gradient(180deg,#f8fafc_0%,#eef6ff_100%)] px-6 pb-4 pt-6">
                <div className="mx-auto max-w-[220px] overflow-hidden rounded-[28px] border border-slate-200 bg-white p-3 shadow-[0_12px_40px_rgba(148,163,184,0.16)]">
                  <img
                    src={award.image}
                    alt={award.alt}
                    className="h-[220px] w-full rounded-[22px] object-cover"
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 px-6 py-6 text-center">
                <p className="font-display text-5xl font-semibold tracking-[-0.04em] text-slate-950">
                  {award.year}
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
                  {award.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{award.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
