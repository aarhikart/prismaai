import Link from "next/link";

import { FooterSection } from "@/app/_components/landing/footer-section";
import { Header } from "@/app/_components/landing/header";

/* eslint-disable @next/next/no-img-element */

const topRailImages = [
  {
    src: "/uploads/1778191260008-Learn-how-to-write-a-press-release-that-will-catch-the-attention-of-media-outlets_-Weve-compiled-successful-press-release-examples-to-help-you-get-started_.jpg",
    alt: "Team reviewing reports and dashboards",
  },
  {
    src: "/uploads/1778172524896download (6).jpg",
    alt: "Portrait representing customer-facing industry workflows",
  },
  {
    src: "/uploads/1778167951073WhatsApp Image 2026-03-24 at 6.02.45 PM - Copy.jpeg",
    alt: "Leadership portrait representing enterprise transformation",
  },
  {
    src: "/job/1778191149445-Career-growth-or-career-development-improvement-or-progress-to-success-in-work-job-promotion-and-salary-increase-concept-cheerful-businessman-and-woman-running-on-growing-arrow-on-the-word-Career_.jpg",
    alt: "Illustration representing growth and momentum",
  },
];

const bottomRailImages = [
  {
    src: "/uploads/1778190936260-📝 Guest Blogging Strategy That Actually Works__Want to build high-quality backlinks and establish.jpg",
    alt: "Workspace representing digital execution and publishing",
  },
  {
    src: "/uploads/1778191260008-Learn-how-to-write-a-press-release-that-will-catch-the-attention-of-media-outlets_-Weve-compiled-successful-press-release-examples-to-help-you-get-started_.jpg",
    alt: "Analytics and communication planning workspace",
  },
  {
    src: "/uploads/1778172524896download (6).jpg",
    alt: "Portrait representing service experience and trust",
  },
  {
    src: "/job/1778191149445-Career-growth-or-career-development-improvement-or-progress-to-success-in-work-job-promotion-and-salary-increase-concept-cheerful-businessman-and-woman-running-on-growing-arrow-on-the-word-Career_.jpg",
    alt: "Industry growth illustration",
  },
];

const industryCards = [
  {
    id: "banking",
    eyebrow: "Banking",
    title: "Decisioning, verification, and case review for high-volume financial operations.",
    description:
      "Prism.ai helps banking teams reduce friction across onboarding, exception handling, fraud review, and policy-sensitive workflows where speed cannot compromise control.",
  },
  {
    id: "healthcare",
    eyebrow: "Healthcare",
    title: "Document-heavy care operations with stronger accuracy and workflow visibility.",
    description:
      "From intake to compliance-sensitive review queues, healthcare teams can structure complex information flows without losing traceability or operational confidence.",
  },
  {
    id: "retail",
    eyebrow: "Retail",
    title: "Faster customer operations, risk monitoring, and service response across channels.",
    description:
      "Retail environments need AI that can support real-time decisions while remaining usable for customer-facing teams and resilient under shifting demand patterns.",
  },
  {
    id: "manufacturing",
    eyebrow: "Manufacturing",
    title: "Operational intelligence for multi-step workflows, controls, and exception routing.",
    description:
      "Manufacturing teams can connect signals, documents, and review actions into one practical system that improves throughput without diluting accountability.",
  },
  {
    id: "government",
    eyebrow: "Government",
    title: "Trusted automation for structured reviews, citizen workflows, and governance controls.",
    description:
      "Public-sector programs need explainable systems, clear escalation paths, and durable oversight. Prism.ai is designed around those operating realities.",
  },
  {
    id: "energy",
    eyebrow: "Energy",
    title: "Secure, auditable workflows for field operations, compliance, and critical response.",
    description:
      "Energy organizations can modernize review-heavy processes while keeping security, documentation quality, and operational continuity tightly aligned.",
  },
];

function Rail({
  images,
  directionClassName,
  imageClassName,
}: {
  images: { src: string; alt: string }[];
  directionClassName: string;
  imageClassName: string;
}) {
  const duplicated = [...images, ...images];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`prism-marquee-track ${directionClassName}`}>
        {duplicated.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="group relative h-48 w-[19rem] shrink-0 overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/70 shadow-[0_20px_60px_rgba(2,6,23,0.4)]"
          >
            <img src={image.src} alt={image.alt} className={imageClassName} />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,47,73,0.02)_0%,rgba(2,6,23,0.44)_100%)] transition duration-500 group-hover:bg-[linear-gradient(180deg,rgba(34,211,238,0.08)_0%,rgba(2,6,23,0.28)_100%)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IndustriesPage() {
  return (
    <main className="overflow-x-hidden bg-slate-950">
      <Header />

      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36">
        <div className="prism-orb prism-orb-left" />
        <div className="prism-orb prism-orb-right" />

        <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.98)_100%)] px-4 py-10 shadow-[0_40px_140px_rgba(2,6,23,0.65)] sm:px-8 lg:px-12 lg:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200">
              Industries
            </span>
            <h1 className="mt-8 font-display text-5xl font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              AI systems designed for industries where every decision carries weight.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Explore the sectors where Prism.ai helps teams modernize review, verification, and operational workflows with precision, control, and measurable business confidence.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:translate-y-[-2px] hover:bg-white"
              >
                Let&apos;s Work Together
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                Discover Prism.ai
              </Link>
            </div>
          </div>

          <div className="mt-12 space-y-6">
            <Rail
              images={topRailImages}
              directionClassName="prism-marquee-left"
              imageClassName="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <Rail
              images={bottomRailImages}
              directionClassName="prism-marquee-right"
              imageClassName="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </section>

      <section id="industries" className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">Sector Focus</p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Modern industry workflows need more than automation. They need trust.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {industryCards.map((card) => (
              <article
                key={card.id}
                id={card.id}
                className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94)_0%,rgba(8,47,73,0.58)_100%)] p-6 shadow-[0_20px_70px_rgba(2,6,23,0.35)] transition duration-300 hover:translate-y-[-4px] hover:border-cyan-400/25"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300/80">{card.eyebrow}</p>
                <h3 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
