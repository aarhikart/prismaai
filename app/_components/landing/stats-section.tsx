import { metrics } from "./landing-data";

export function StatsSection() {
  return (
    <section className="bg-white px-4 pb-20 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_30%_35%,rgba(34,211,238,0.4),transparent_26%),linear-gradient(180deg,#e0f2fe_0%,#ffffff_100%)] p-8 shadow-[0_18px_50px_rgba(148,163,184,0.16)]">
          <div className="absolute inset-10 rounded-full border border-cyan-200/80" />
          <div className="absolute inset-[22%] rounded-full border border-sky-100" />
          <div className="relative flex h-72 w-72 items-center justify-center rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.32),rgba(255,255,255,0.98)_58%,rgba(224,242,254,0.8)_100%)] text-center shadow-[0_25px_80px_rgba(34,211,238,0.2)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">Global AI Reach</p>
              <p className="mt-3 font-display text-5xl font-semibold tracking-[-0.04em] text-slate-950">22</p>
              <p className="mt-3 text-sm text-slate-600">Countries across deployment and partner operations</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">Operational impact</p>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Discover why enterprise teams build decision infrastructure with Prism.ai.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
            The platform is built for large-volume environments where signal quality, workflow speed, and governance fidelity all matter at the same time.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 transition hover:border-cyan-200 hover:bg-cyan-50/40"
              >
                <p className="font-display text-4xl font-semibold tracking-[-0.04em] text-slate-950">{metric.value}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
