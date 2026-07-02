import Link from "next/link";

import { ContentPageShell } from "@/app/_components/content/content-page-shell";
import { PageHero } from "@/app/_components/content/page-hero";
import { getPressReleases } from "@/lib/press-release-service";

/* eslint-disable @next/next/no-img-element */

export const dynamic = "force-dynamic";

export default async function PressReleasesPage() {
  const pressReleases = await getPressReleases();

  return (
    <ContentPageShell surface="light">
      <PageHero
        eyebrow="Company News"
        title="Press Releases"
        description="Official company announcements, milestones, and public statements presented in a simple professional format."
      />

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {pressReleases.length === 0 ? (
            <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-14 text-center text-slate-500 shadow-[0_16px_50px_rgba(148,163,184,0.12)]">
              No press releases are available yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pressReleases.map((pressRelease) => (
                <Link
                  key={pressRelease._id.toString()}
                  href={`/press-releases/${pressRelease._id}`}
                  className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_16px_50px_rgba(148,163,184,0.12)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300"
                >
                  <div className="overflow-hidden border-b border-slate-200">
                    <img
                      src={pressRelease.image}
                      alt={pressRelease.title}
                      className="h-60 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-700">Press Release</p>
                    <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-slate-950 transition group-hover:text-cyan-800">
                      {pressRelease.title}
                    </h2>
                    <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">{pressRelease.description}</p>
                    <div className="mt-6 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition group-hover:border-cyan-300 group-hover:text-cyan-800">
                      Open details
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </ContentPageShell>
  );
}
