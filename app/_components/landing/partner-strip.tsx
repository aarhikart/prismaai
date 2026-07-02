const logos = ["NovaGrid", "HexaTrust", "VectorPoint", "OrionOps", "TrueNorth"];

export function PartnerStrip() {
  return (
    <section className="px-4 pb-18 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-white/10 bg-white/[0.04] px-6 py-6 backdrop-blur sm:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
          Trusted by modern enterprise innovation programs
        </p>
        <div className="mt-5 grid gap-4 text-center text-sm font-semibold text-slate-400 sm:grid-cols-5">
          {logos.map((logo) => (
            <div
              key={logo}
              className="rounded-2xl border border-white/[0.08] bg-slate-950/40 px-4 py-4 transition hover:border-cyan-400/25 hover:text-slate-200"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
