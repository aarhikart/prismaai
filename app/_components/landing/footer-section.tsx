import Link from "next/link";

import { certifications, productMenu } from "./landing-data";

export function FooterSection() {
  return (
    <footer id="footer" className="bg-white px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-[36px] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_50px_rgba(148,163,184,0.12)] lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#082f49_0%,#06b6d4_100%)] text-lg font-semibold text-white">
                P
              </span>
              <div>
                <p className="text-lg font-semibold tracking-[0.18em] text-slate-950">
                  Prism<span className="text-cyan-700">.ai</span>
                </p>
                <p className="text-sm text-slate-500">Enterprise intelligence, delivered with trust.</p>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
              Prism.ai transforms enterprise workflows into intelligent systems for decisioning, security, verification, and document operations.
            </p>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Certifications</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {certifications.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-slate-950">Quick Links</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <Link href="/about" className="block transition hover:text-cyan-700">
                  About Us
                </Link>
                <Link href="/blog" className="block transition hover:text-cyan-700">
                  Blog
                </Link>
                <Link href="/articles" className="block transition hover:text-cyan-700">
                  Articles
                </Link>
                <Link href="/press-releases" className="block transition hover:text-cyan-700">
                  Press Releases
                </Link>
                <Link href="/contact" className="block transition hover:text-cyan-700">
                  Contact
                </Link>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Our Services</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                {productMenu.map((item) => (
                  <Link key={item.label} href={item.href} className="block transition hover:text-cyan-700">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-950">Contact Us</p>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <p>15 Hudson Yards Avenue</p>
                <p>New York, NY 10001</p>
                <p>contact@prism.ai</p>
                <p>+1 (202) 555-0186</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Prism.ai. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/disclaimer" className="transition hover:text-cyan-700">
              Disclaimer
            </Link>
            <Link href="/important-notice" className="transition hover:text-cyan-700">
              Important Notice
            </Link>
            <Link href="/privacy-policy" className="transition hover:text-cyan-700">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="transition hover:text-cyan-700">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
