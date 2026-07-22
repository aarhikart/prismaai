import Link from "next/link";

import { ContentPageShell } from "@/app/_components/content/content-page-shell";
import { PageHero } from "@/app/_components/content/page-hero";
import { getArticles } from "@/lib/article-service";

/* eslint-disable @next/next/no-img-element */

export const dynamic = "force-dynamic";

function isValidLiveUrl(value) {
  try {
    const url = new URL(String(value || "").trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <ContentPageShell surface="light">
      <PageHero
        eyebrow="Knowledge Base"
        title="Articles"
        description="A clean, searchable view of published article content across Prism.ai topics and product narratives."
      />

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {articles.length === 0 ? (
            <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-14 text-center text-slate-500 shadow-[0_16px_50px_rgba(148,163,184,0.12)]">
              No articles are available yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {articles.map((article) => {
                const liveUrl = String(article.liveUrl || "").trim();
                const hasLiveUrl = isValidLiveUrl(liveUrl);

                return (
                  <article
                    key={article._id.toString()}
                    className="group overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_16px_50px_rgba(148,163,184,0.12)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300"
                  >
                    <div className="overflow-hidden border-b border-slate-200">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-60 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>

                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-700">Article</p>
                      <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-slate-950 transition group-hover:text-cyan-800">
                        {article.title}
                      </h2>
                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">{article.description}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        <Link
                          href={`/articles/${article._id}`}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-800 transition group-hover:border-cyan-300 group-hover:text-cyan-800"
                        >
                          Open details
                        </Link>
                        {hasLiveUrl ? (
                          <a
                            href={liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-white"
                          >
                            View Live Article
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </ContentPageShell>
  );
}
