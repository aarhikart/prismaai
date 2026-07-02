import Link from "next/link";

import { ContentPageShell } from "@/app/_components/content/content-page-shell";
import { PageHero } from "@/app/_components/content/page-hero";
import { getPosts } from "@/lib/post-service";

/* eslint-disable @next/next/no-img-element */

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <ContentPageShell>
      <PageHero
        eyebrow="Insights"
        title="Blog"
        description="Updates, product thinking, and practical enterprise AI perspectives from the Prism.ai team."
      />

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <div className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-14 text-center text-slate-300">
              No blog posts are available yet.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post._id.toString()}
                  href={`/blog/${post._id}`}
                  className="group overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(8,47,73,0.52)_100%)] shadow-[0_20px_70px_rgba(2,6,23,0.32)] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
                >
                  <div className="overflow-hidden border-b border-white/10">
                    <img
                      src={post.image}
                      alt={post.title || "Blog post image"}
                      className="h-60 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">Blog Post</p>
                      <span className="text-xs text-slate-400">{post.date || "Latest update"}</span>
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-white transition group-hover:text-cyan-200">
                      {post.title}
                    </h2>
                    {post.subTitle ? (
                      <p className="mt-3 text-sm font-medium text-slate-300">{post.subTitle}</p>
                    ) : null}
                    {post.description ? (
                      <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-400">{post.description}</p>
                    ) : null}
                    <div className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition group-hover:border-cyan-400/30 group-hover:text-cyan-200">
                      Read article
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
