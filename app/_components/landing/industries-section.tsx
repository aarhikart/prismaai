import { industries } from "./landing-data";

export function IndustriesSection() {
  return (
    <section id="industries" className="bg-[linear-gradient(180deg,#f0f9ff_0%,#ffffff_100%)] px-4 py-20 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">Industries</p>
          <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Solutions built for regulated and operationally complex sectors.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {industries.map((industry) => (
            <article
              key={industry}
              className="clip-hexagon relative flex min-h-[140px] items-center justify-center overflow-hidden border border-cyan-200/70 bg-white px-4 py-6 text-center shadow-[0_18px_40px_rgba(148,163,184,0.14)] transition duration-300 hover:translate-y-[-4px] hover:border-cyan-400/65"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_42%)]" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-700">
                  <span className="font-display text-xl font-semibold">{industry.slice(0, 1)}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-slate-950">{industry}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
