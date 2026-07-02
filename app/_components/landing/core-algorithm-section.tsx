import { algorithmPillars } from "./landing-data";

export function CoreAlgorithmSection() {
  return (
    <section id="core-algorithm" className="bg-white px-4 pb-20 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">Core Algorithm</p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            A trusted AI engine for decision-heavy enterprise workflows.
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600">
            Prism.ai combines contextual reasoning, structured governance, and adaptive automation so every recommendation remains useful, reviewable, and business-safe.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[36px] border border-slate-200 bg-[linear-gradient(180deg,#082f49_0%,#0f172a_50%,#111827_100%)] p-6 shadow-[0_18px_50px_rgba(148,163,184,0.16)]">
            <div className="flex h-full min-h-[520px] flex-col justify-between rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),_transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_100%)] p-6 text-white">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Input Layer", "Documents, telemetry, transactions, identities"],
                  ["AI Routing", "Model, rule, and human review orchestration"],
                  ["Controls", "Policies, explainability, and security checks"],
                  ["Outcome", "Actionable recommendations with confidence traces"],
                ].map(([title, description]) => (
                  <div key={title} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-cyan-200">{title}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-[28px] border border-cyan-400/15 bg-cyan-400/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">Prism Intelligence Graph</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {["Observe", "Reason", "Act"].map((item) => (
                    <div key={item} className="rounded-[20px] border border-white/10 bg-slate-950/40 px-4 py-5 text-center">
                      <span className="font-display text-2xl font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {algorithmPillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="rounded-[30px] border border-slate-200 bg-slate-50 p-6 transition hover:border-cyan-200 hover:bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/[0.12] text-cyan-700">
                    <span className="font-display text-lg font-semibold">0{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-slate-950">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{pillar.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
