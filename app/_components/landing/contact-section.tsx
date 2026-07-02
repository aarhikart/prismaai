"use client";

import { ContactMessageForm } from "./contact-message-form";

export function ContactSection() {
  return (
    <section id="contact" className="bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
          Customer confidence starts with intelligent execution.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-6">
            <article className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,#082f49_0%,#7c3aed_120%)] p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.48)]">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-100">Client perspective</p>
              <p className="mt-5 text-base leading-8 text-slate-100">
                Prism.ai gave our analysts a governed AI layer that improved speed without reducing trust. The platform fit enterprise rigor from day one.
              </p>
              <div className="mt-6">
                <p className="font-semibold">Matthew Lambergh</p>
                <p className="text-sm text-cyan-100/80">Chief Transformation Officer</p>
              </div>
            </article>

            <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 text-white backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Contact Information</p>
              <div className="mt-6 space-y-4 text-sm text-slate-300">
                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/35 px-4 py-4">
                  <p className="text-slate-500">Email Us</p>
                  <p className="mt-1 font-semibold text-white">contact@prism.ai</p>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/35 px-4 py-4">
                  <p className="text-slate-500">Call Us</p>
                  <p className="mt-1 font-semibold text-white">+1 (202) 555-0186</p>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-slate-950/35 px-4 py-4">
                  <p className="text-slate-500">Office</p>
                  <p className="mt-1 font-semibold text-white">15 Hudson Yards, New York, NY</p>
                </div>
              </div>
            </article>
          </div>

          <ContactMessageForm
            title="Start a premium product conversation with Prism.ai."
            description="Share your requirement and the team can review it securely from the admin contact messages queue."
          />
        </div>
      </div>
    </section>
  );
}
