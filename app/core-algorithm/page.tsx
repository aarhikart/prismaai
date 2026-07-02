import Link from "next/link";

import { FooterSection } from "@/app/_components/landing/footer-section";
import { Header } from "@/app/_components/landing/header";

/* eslint-disable @next/next/no-img-element */

const algorithmPillars = [
  {
    eyebrow: "Signal Fusion",
    title: "Structured records, live events, and document inputs move through one intelligence layer.",
    description:
      "Prism.ai unifies fragmented operational signals so teams can review faster, act with context, and keep decision quality measurable.",
  },
  {
    eyebrow: "Reasoning Controls",
    title: "Models, rules, and review checkpoints stay aligned to policy-sensitive workflows.",
    description:
      "Each path is tuned for explainability and operational discipline, so automation remains usable in environments where trust matters.",
  },
  {
    eyebrow: "Continuous Trust",
    title: "Feedback loops improve outcomes without losing visibility, auditability, or governance.",
    description:
      "The platform is designed to evolve safely as business conditions, regulations, and workload patterns change over time.",
  },
];

const logoCards = [
  { src: "/next.svg", alt: "Next.js placeholder logo", label: "Next.js" },
  { src: "/vercel.svg", alt: "Vercel placeholder logo", label: "Vercel" },
  { src: "/globe.svg", alt: "Global systems placeholder logo", label: "Globe" },
  { src: "/window.svg", alt: "Windows placeholder logo", label: "Window" },
  { src: "/file.svg", alt: "Document systems placeholder logo", label: "Docs" },
  { src: "/uploads/1778172599223Group 427319718.png", alt: "Abstract placeholder brand mark", label: "Studio" },
];

const duplicatedLogos = [...logoCards, ...logoCards];

export default function CoreAlgorithmPage() {
  return (
    <main className="overflow-x-hidden bg-slate-950">
      <Header />

      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
        <div className="prism-orb prism-orb-left" />
        <div className="prism-orb prism-orb-right" />

        <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.94)_0%,rgba(2,6,23,0.98)_100%)] px-6 py-12 text-center shadow-[0_40px_140px_rgba(2,6,23,0.65)] sm:px-10 lg:px-14 lg:py-16">
          <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200">
            Core Algorithm
          </span>

          <h1 className="mx-auto mt-8 max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Turning Complex
            {" "}
            <span className="text-cyan-300">Enterprise Signals</span>
            {" "}
            Into Trusted Decisions
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Prism.ai increases operational clarity and decision confidence by combining structured reasoning, policy-aware controls, and enterprise-grade orchestration in one AI layer.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:translate-y-[-2px] hover:bg-white"
            >
              Book a Meeting
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-14">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-cyan-400/35" />
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">
                Trusted by modern product and operations teams
              </p>
              <span className="h-px w-12 bg-cyan-400/35" />
            </div>

            <div className="mt-6 overflow-hidden rounded-[30px] border border-white/10 bg-white/5 p-4 shadow-[0_24px_80px_rgba(2,6,23,0.4)] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="prism-marquee-track prism-marquee-left">
                {duplicatedLogos.map((logo, index) => (
                  <div
                    key={`${logo.label}-${index}`}
                    className="flex h-20 w-44 shrink-0 items-center justify-center gap-3 rounded-[24px] border border-white/8 bg-slate-900/70 px-5"
                  >
                    <img src={logo.src} alt={logo.alt} className="h-8 w-8 object-contain" />
                    <span className="text-sm font-semibold text-slate-200">{logo.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="core-algorithm" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">How It Works</p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              A controlled intelligence stack built for real business workflows.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {algorithmPillars.map((pillar) => (
              <article
                key={pillar.eyebrow}
                className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94)_0%,rgba(8,47,73,0.55)_100%)] p-6 shadow-[0_20px_70px_rgba(2,6,23,0.35)] transition duration-300 hover:translate-y-[-4px] hover:border-cyan-400/25"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">{pillar.eyebrow}</p>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
