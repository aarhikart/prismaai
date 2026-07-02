import { serviceCards } from "./landing-data";

export function AboutSection() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9)_0%,rgba(8,47,73,0.62)_100%)] px-6 py-12 shadow-[0_24px_80px_rgba(2,6,23,0.5)] sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">About Prism.ai</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              What we do for teams that cannot afford uncertain decisions.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              Prism.ai creates enterprise AI products that reduce operational friction, improve review quality, and modernize high-stakes workflows without losing control, traceability, or trust.
            </p>
            <a
              href="#company"
              className="mt-8 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/45 hover:bg-cyan-400/[0.18]"
            >
              View Company
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {serviceCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[28px] border border-white/10 bg-slate-950/50 p-5 transition duration-300 hover:translate-y-[-4px] hover:border-cyan-400/25 hover:bg-slate-950/70"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300/80">{card.eyebrow}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-white">{card.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
