import Image from "next/image";

import { ProductPageShell } from "@/app/_components/products/product-page-shell";

export default function ProductGryFASPage() {
  return (
    <ProductPageShell>
      <section className="relative overflow-hidden px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28">
        <div className="prism-orb prism-orb-left" />
        <div className="prism-orb prism-orb-right" />
        <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.92)_0%,rgba(2,6,23,0.96)_100%)] px-6 py-10 shadow-[0_40px_140px_rgba(2,6,23,0.65)] sm:px-10 lg:px-12 lg:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.2fr_0.9fr]">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="relative w-full max-w-[172px] justify-self-start overflow-hidden rounded-[24px] border border-white/10 shadow-[0_24px_70px_rgba(2,6,23,0.5)] lg:ml-4">
                <Image
                  src="/uploads/1778178225826-download-6.jpg"
                  alt="GryFAS product preview 1"
                  width={400}
                  height={420}
                  className="aspect-[1.08] h-auto w-full object-cover"
                />
              </div>
              <div className="relative w-full max-w-[172px] justify-self-start overflow-hidden rounded-[24px] border border-white/10 shadow-[0_24px_70px_rgba(2,6,23,0.5)] lg:mt-14">
                <Image
                  src="/job/1778185692096-download-6.jpg"
                  alt="GryFAS product preview 2"
                  width={400}
                  height={420}
                  className="aspect-[1.08] h-auto w-full object-cover"
                />
              </div>
            </div>

            <div className="relative z-10 text-center">
              <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-[0.08em] text-cyan-100 shadow-[0_12px_30px_rgba(8,47,73,0.2)]">
                <span className="flex -space-x-2">
                  <span className="h-6 w-6 rounded-full border-2 border-white bg-[linear-gradient(135deg,#082f49_0%,#06b6d4_100%)]" />
                  <span className="h-6 w-6 rounded-full border-2 border-white bg-[linear-gradient(135deg,#164e63_0%,#38bdf8_100%)]" />
                  <span className="h-6 w-6 rounded-full border-2 border-white bg-[linear-gradient(135deg,#0f172a_0%,#0891b2_100%)]" />
                </span>
                <span>100+ Satisfied Clients</span>
              </div>

              <h1 className="mx-auto mt-6 max-w-3xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                Smart solutions that turn ideas into impact GryFAs
              </h1>

              <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                Shop lorem your brand&apos;s potential - embrace strategies that drive real growth.
              </p>

              <a
                href="#contact"
                className="mt-8 inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_rgba(34,211,238,0.18)] transition hover:translate-y-[-2px] hover:bg-white hover:shadow-[0_24px_60px_rgba(34,211,238,0.22)]"
              >
                Schedule a appointment
              </a>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="relative w-full max-w-[172px] justify-self-end overflow-hidden rounded-[24px] border border-white/10 shadow-[0_24px_70px_rgba(2,6,23,0.5)] lg:mr-4">
                <Image
                  src="/uploads/1778181467855-Screenshot-2026-04-21-201347.png"
                  alt="GryFAS product preview 3"
                  width={400}
                  height={420}
                  className="aspect-[1.08] h-auto w-full object-cover"
                />
              </div>
              <div className="relative w-full max-w-[172px] justify-self-end overflow-hidden rounded-[24px] border border-white/10 shadow-[0_24px_70px_rgba(2,6,23,0.5)] lg:mt-14">
                <Image
                  src="/uploads/1778263976774-Importance-of-React-JS-Development-Company-and-Next-JS-Developers.jpg"
                  alt="GryFAS product preview 4"
                  width={400}
                  height={420}
                  className="aspect-[1.08] h-auto w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </ProductPageShell>
  );
}
