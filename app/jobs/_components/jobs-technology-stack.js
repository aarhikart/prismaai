const technologies = [
  ["Amazon Web Services", "Services"],
  ["Dotnet", "Framework"],
  ["Python", "Language"],
  ["JQuery", "Library"],
  ["c#", "Language"],
  ["Javascript", "Language"],
  ["Swift", "Language"],
  ["SQL", "Language"],
  ["Kotlin", "Language"],
  ["Unity", "Technology"],
  ["C++", "Language"],
  ["OpenCV", "Library"],
];

export default function JobsTechnologyStack() {
  return (
    <section className="bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_35%,#e2e8f0_100%)] px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[34px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(148,163,184,0.18)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-700">
              Technology We Use
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Tools, languages, and frameworks behind our day-to-day delivery.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              This section follows the reference composition: a strong descriptive block paired with
              category cards, but adapted to your landing page typography and spacing system.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {technologies.map(([name, type], index) => (
              <article
                key={name}
                className={`rounded-[28px] border p-5 shadow-[0_16px_50px_rgba(148,163,184,0.16)] transition duration-500 hover:-translate-y-1 ${
                  index === 1
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-950"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border font-display text-lg font-semibold ${
                      index === 1
                        ? "border-cyan-300/25 bg-cyan-400/10 text-cyan-200"
                        : "border-cyan-100 bg-cyan-50 text-cyan-700"
                    }`}
                  >
                    {name.slice(0, 2).toUpperCase()}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${
                      index === 1 ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {type}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold tracking-[-0.03em]">
                  {name}
                </h3>
                <p className={`mt-3 text-sm ${index === 1 ? "text-slate-300" : "text-slate-600"}`}>
                  {type} used across product engineering, AI workflows, and platform delivery.
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
