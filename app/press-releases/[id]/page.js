import Link from "next/link";

import { ContentPageShell } from "@/app/_components/content/content-page-shell";
import { getPressReleaseById, getPressReleases } from "@/lib/press-release-service";

/* eslint-disable @next/next/no-img-element */

export const dynamic = "force-dynamic";

function formatDate(value) {
  if (!value) {
    return "Latest update";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}

export default async function PressReleaseDetailPage({ params }) {
  const { id } = await params;
  const pressRelease = await getPressReleaseById(id);
  const pressReleases = await getPressReleases();

  if (!pressRelease) {
    return (
      <ContentPageShell>
        <section className="px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <div className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/5 px-6 py-14 text-center shadow-[0_20px_70px_rgba(2,6,23,0.32)] sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">Press Release Detail</p>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Press release not found
            </h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              The press release you are trying to open is unavailable right now.
            </p>
            <Link
              href="/press-releases"
              className="mt-8 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-400 hover:text-slate-950"
            >
              Back to Press Releases
            </Link>
          </div>
        </section>
      </ContentPageShell>
    );
  }

  const suggestedPressReleases = pressReleases.filter((item) => String(item._id) !== String(id));

  return (
    <ContentPageShell>
      <section className="relative overflow-hidden px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pb-16 lg:pt-36">
        <div className="prism-orb prism-orb-left" />
        <div className="prism-orb prism-orb-right" />

        <div className="mx-auto max-w-7xl">
         <Link
              href="/press-releases"
              className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200 transition hover:border-cyan-400/30 hover:text-white"
            >
              Back to Press Releases
            </Link>

            {/* <div className="mt-8 max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">Press Release Detail</p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                {pressRelease.title}
              </h1>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 font-semibold text-cyan-200">
                  Prism.ai Company News
                </span>
                <span>{formatDate(pressRelease.createdAt)}</span>
              </div>
            </div> */}
       <section className="mt-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
          <article className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(8,47,73,0.52)_100%)] shadow-[0_20px_70px_rgba(2,6,23,0.32)]">
            <div className="overflow-hidden border-b border-white/10">
              <img
                src={pressRelease.image}
                alt={pressRelease.title || "Press release image"}
                className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[460px]"
              />
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
                <span>Editorial Note</span>
                <span className="text-slate-500">/</span>
                <span className="text-slate-400">{formatDate(pressRelease.createdAt)}</span>
              </div>

              <div className="mt-8 h-px w-full bg-white/10" />

              <div className="mt-8 space-y-6 text-base leading-8 text-slate-300 sm:text-lg">
                {String(pressRelease.description || "")
                  .split(/\n+/)
                  .filter(Boolean)
                  .map((paragraph, index) => (
                    <p key={`${pressRelease._id}-paragraph-${index}`}>{paragraph}</p>
                  ))}
              </div>

              {pressRelease.liveUrl ? (
                <a
                  href={pressRelease.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
                >
                  View Live Press Release
                </a>
              ) : null}
            </div>
          </article>

          <aside className="h-fit rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(2,6,23,0.28)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">Continue Reading</p>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-white">
              Suggested Press Releases
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              More updates and perspectives from the same content library.
            </p>

            <div className="mt-6 space-y-4">
              {suggestedPressReleases.map((item) => (
                <Link
                  key={item._id.toString()}
                  href={`/press-releases/${item._id}`}
                  className="group flex gap-3 rounded-[24px] border border-white/10 bg-slate-950/40 p-3 transition hover:border-cyan-400/30 hover:bg-white/5"
                >
                  <img
                    src={item.image}
                    alt={item.title || "Suggested press release image"}
                    className="h-20 w-20 rounded-[18px] object-cover"
                  />

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-semibold text-white transition group-hover:text-cyan-200">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-400">{item.description}</p>
                  </div>
                </Link>
              ))}
            </div>

            {suggestedPressReleases.length === 0 ? (
              <div className="mt-6 rounded-[24px] border border-dashed border-white/15 px-4 py-8 text-sm text-slate-400">
                No suggested press releases available yet.
              </div>
            ) : null}
          </aside>
        </div>
      </section>
        </div>
      </section>

     
    </ContentPageShell>
  );
}
