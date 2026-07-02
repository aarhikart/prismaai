import { OfficeLocationsSection } from "@/app/_components/content/office-locations-section";
import { ContactMessageForm } from "@/app/_components/landing/contact-message-form";
import { FooterSection } from "@/app/_components/landing/footer-section";
import { Header } from "@/app/_components/landing/header";

const contactCards = [
  {
    title: "+1 (202) 555-0186",
    body: "Speak with our team about product discovery, workflow design, and enterprise deployment planning.",
    chip: "Phone Number",
    action: "Call Us Now",
  },
  {
    title: "contact@prism.ai",
    body: "Send project details, product requirements, or implementation questions and we will route them securely.",
    chip: "Email Address",
    action: "Write to Us",
  },
  {
    title: "Global Presence",
    body: "Connect with Prisma offices across Asia, Europe, the Middle East, and India for local coordination.",
    chip: "Regional Offices",
    action: "View Locations",
  },
];

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden bg-slate-950">
      <Header />

      <section className="relative overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="prism-orb prism-orb-left" />
        <div className="prism-orb prism-orb-right" />

        <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.14),_transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.94)_0%,rgba(2,6,23,0.98)_100%)] px-6 py-12 shadow-[0_40px_140px_rgba(2,6,23,0.65)] sm:px-10 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200">
              Contact Us
            </span>
            <h1 className="mt-8 font-display text-5xl font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Contact{" "}
              <span className="text-cyan-300">Prism.ai</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Start the conversation with a team that designs enterprise AI systems around trust, execution quality, and measurable operational value.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {contactCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_20px_60px_rgba(2,6,23,0.35)] backdrop-blur"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10 text-lg text-cyan-200">
                  ●
                </div>
                <h2 className="mt-5 font-display text-2xl font-semibold tracking-[-0.03em] text-white">{card.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">{card.body}</p>
                <div className="mt-6 flex items-center justify-between rounded-full border border-white/10 bg-slate-950/45 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
                  <span>{card.chip}</span>
                  <span className="text-cyan-200">{card.action}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#e2e8f0_0%,#f8fafc_100%)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[40px] border border-slate-200 bg-white/90 p-6 shadow-[0_24px_80px_rgba(148,163,184,0.18)] backdrop-blur sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">We&apos;re Here To Help You</p>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Discuss your enterprise AI workflow needs.
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-600">
              Reuse the same secure contact flow from the landing page to reach Prism.ai. Every submission is stored in the admin contact messages queue exactly the same way.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">E-mail</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">contact@prism.ai</p>
              </div>
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Phone number</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">+1 (202) 555-0186</p>
              </div>
            </div>
          </div>

          <ContactMessageForm
            eyebrow="Contact Form"
            title="Request a tailored conversation."
            description="Use the same fields and secure admin flow already active on the landing page."
            buttonLabel="Get a Solution"
            className="rounded-[34px] border-slate-200 shadow-[0_18px_60px_rgba(148,163,184,0.22)]"
          />
        </div>
      </section>

      <section className="bg-slate-950 pt-2">
        <OfficeLocationsSection />
      </section>

      <FooterSection />
    </main>
  );
}
