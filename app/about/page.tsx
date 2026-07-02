import Link from "next/link";

import { FooterSection } from "@/app/_components/landing/footer-section";
import { Header } from "@/app/_components/landing/header";

/* eslint-disable @next/next/no-img-element */

const aboutMetrics = [
  { value: "15.2K", label: "Active workflows" },
  { value: "4.5K", label: "Enterprise users" },
  { value: "99.4%", label: "Review accuracy" },
];

const valueCards = [
  {
    eyebrow: "Who we are",
    title: "Enterprise AI built for teams that need speed without losing trust.",
    description:
      "Prism.ai connects automation, review intelligence, and explainable controls into one operating layer for regulated, high-volume teams.",
  },
  {
    eyebrow: "How we work",
    title: "Modern product thinking with deployment discipline.",
    description:
      "We design systems that are measurable, auditable, and production-ready from day one, with product UX shaped around real operator workflows.",
  },
  {
    eyebrow: "What matters",
    title: "Clear outcomes, lower friction, stronger decision quality.",
    description:
      "Every implementation is tuned to reduce manual effort while preserving governance, accountability, and operational confidence.",
  },
];

const aboutAnchors = [
  {
    id: "executive-team",
    eyebrow: "Executive Team",
    title: "Operators, architects, and product leaders shaping practical AI delivery.",
    description:
      "Our teams balance product speed with enterprise accountability, aligning implementation decisions to real operating constraints and measurable outcomes.",
  },
  {
    id: "alliance-partners",
    eyebrow: "Alliance Partners",
    title: "A delivery ecosystem built for scale, security, and transformation support.",
    description:
      "We work alongside technology, cloud, and advisory partners to keep deployments resilient across business, compliance, and integration layers.",
  },
  {
    id: "history",
    eyebrow: "History",
    title: "Built from applied workflow modernization, not speculative AI theater.",
    description:
      "Prism.ai grew from practical enterprise programs where document complexity, review volume, and security pressure demanded systems that could perform reliably.",
  },
  {
    id: "users",
    eyebrow: "Users",
    title: "Designed for operations, compliance, security, and customer-facing teams.",
    description:
      "The platform supports the people closest to business risk, helping them move faster without losing visibility, control, or review quality.",
  },
  {
    id: "awards",
    eyebrow: "Awards",
    title: "Recognition follows consistent delivery, trusted outcomes, and usable systems.",
    description:
      "What matters most is that teams can adopt the workflows quickly, trust the outputs, and prove value across critical enterprise decisions.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden bg-slate-950">
      <Header />

      <section id="about" className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
        <div className="prism-orb prism-orb-left" />
        <div className="prism-orb prism-orb-right" />

        <div className="mx-auto grid max-w-7xl gap-12 rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.96)_100%)] px-6 py-10 shadow-[0_40px_140px_rgba(2,6,23,0.65)] sm:px-10 sm:py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-14">
          <div className="relative z-10 flex flex-col justify-center">
            <span className="inline-flex w-fit rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200">
              About Prism.ai
            </span>
            <h1 className="mt-8 max-w-3xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              A sharper way to build trust into enterprise AI operations.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              We help organizations turn fragmented review, security, and decisioning workflows into responsive AI systems that stay controlled, explainable, and ready for scale.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:translate-y-[-2px] hover:bg-white"
              >
                Talk to Us
              </Link>
              <Link
                href="/#products"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Explore Products
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
              {aboutMetrics.map((metric) => (
                <div key={metric.label} className="sm:border-r sm:border-white/10 sm:pr-4 last:sm:border-r-0">
                  <p className="font-display text-3xl font-semibold text-white sm:text-4xl">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 min-h-[540px]">
            <div className="absolute left-1/2 top-4 h-20 w-20 rounded-full border border-cyan-300/20 bg-cyan-400/10 blur-sm" />
            <div className="absolute right-6 top-16 h-4 w-4 rounded-full bg-cyan-300/70" />
            <div className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 rotate-45 rounded-sm border border-cyan-300/50 bg-cyan-300/10" />
            <div className="absolute bottom-12 right-10 h-6 w-6 rounded-full bg-white/10" />

            <div className="relative mx-auto grid h-full max-w-[38rem] grid-cols-12 grid-rows-12 gap-4">
              <div className="col-span-6 row-span-6 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(34,211,238,0.18)_0%,rgba(8,47,73,0.3)_100%)] p-3 shadow-[0_20px_60px_rgba(8,47,73,0.3)]">
                <div className="h-full overflow-hidden rounded-[24px] bg-cyan-300/10">
                  <img
                    src="/uploads/1778172524896download (6).jpg"
                    alt="Portrait representing the Prism.ai team"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="col-span-5 col-start-8 row-span-5 row-start-2 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(125,211,252,0.1)_0%,rgba(15,23,42,0.42)_100%)] p-3 shadow-[0_20px_60px_rgba(15,23,42,0.35)]">
                <div className="h-full overflow-hidden rounded-[24px] bg-slate-900/60">
                  <img
                    src="/uploads/1778167951073WhatsApp Image 2026-03-24 at 6.02.45 PM - Copy.jpeg"
                    alt="Leadership portrait for the About page"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>

              <div className="col-span-7 row-span-5 row-start-8 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(34,197,94,0.12)_0%,rgba(15,23,42,0.5)_100%)] p-3 shadow-[0_20px_60px_rgba(8,47,73,0.3)]">
                <div className="h-full overflow-hidden rounded-[24px] bg-slate-900/60">
                  <img
                    src="/uploads/1778190936260-📝 Guest Blogging Strategy That Actually Works__Want to build high-quality backlinks and establish.jpg"
                    alt="Workspace image representing research and execution"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="col-span-3 col-start-8 row-span-2 row-start-7 flex items-center justify-center rounded-full border border-cyan-300/15 bg-cyan-400/10 px-4">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full border border-cyan-200/80" />
                  <span className="h-3 w-3 rounded-full border border-cyan-200/80" />
                  <span className="h-3 w-3 rounded-full border border-cyan-200/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="company" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,47,73,0.35)_0%,rgba(15,23,42,0.92)_100%)] px-6 py-12 shadow-[0_24px_80px_rgba(2,6,23,0.45)] sm:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">Company</p>
              <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                The same product discipline behind the website now shapes the About experience too.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {valueCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-[28px] border border-white/10 bg-slate-950/55 p-5 transition duration-300 hover:translate-y-[-4px] hover:border-cyan-400/25 hover:bg-slate-950/70"
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

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {aboutAnchors.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88)_0%,rgba(8,47,73,0.55)_100%)] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.35)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">{item.eyebrow}</p>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
