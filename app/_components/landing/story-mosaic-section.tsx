import { mosaicCards } from "./landing-data";

export function StoryMosaicSection() {
  return (
    <section className="bg-white px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-5 sm:grid-cols-2">
            {mosaicCards.slice(0, 4).map((card, index) => (
              <article
                key={card.id}
                id={card.id}
                className={`overflow-hidden rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#edf7ff_100%)] p-5 shadow-[0_18px_50px_rgba(148,163,184,0.16)] ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="flex min-h-[160px] flex-col justify-between rounded-[22px] border border-cyan-100 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(240,249,255,1)_100%)] p-5">
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
                    Prism.ai
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                      {card.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">{card.subtitle}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="grid gap-5">
            <article className="rounded-[28px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f1f5f9_100%)] p-5 shadow-[0_18px_50px_rgba(148,163,184,0.16)]">
              <div className="grid h-full gap-4 rounded-[22px] border border-slate-200 bg-white p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  {mosaicCards.slice(4).map((card) => (
                    <div
                      key={card.id}
                      id={card.id}
                      className="rounded-[20px] border border-slate-200 bg-slate-50 p-5"
                    >
                      <h3 className="font-display text-xl font-semibold text-slate-950">{card.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{card.subtitle}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-[24px] bg-[linear-gradient(135deg,#082f49_0%,#0f172a_55%,#164e63_100%)] p-6 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Enterprise snapshot</p>
                  <p className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em]">
                    Cross-functional AI programs designed for board-level trust.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
