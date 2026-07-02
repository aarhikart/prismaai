import { getArticles } from "@/lib/article-service";
import { getJobs } from "@/lib/job-service";
import { getPressReleases } from "@/lib/press-release-service";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { requireAdminUser } from "@/lib/auth";

function formatCount(value) {
  return value.toLocaleString("en-IN");
}

export default async function AdminDashboardPage() {
  const currentUser = await requireAdminUser();
  await connectDB();

  const [jobs, articles, pressReleases, totalBlogs] = await Promise.all([
    getJobs(),
    getArticles(),
    getPressReleases(),
    Post.countDocuments(),
  ]);

  const stats = [
    {
      label: "Total Running Jobs",
      value: jobs.length,
      tone: "from-sky-500 via-cyan-400 to-teal-300",
    },
    {
      label: "Total Blogs",
      value: totalBlogs,
      tone: "from-emerald-500 via-teal-400 to-lime-300",
    },
    {
      label: "Total Articles",
      value: articles.length,
      tone: "from-amber-500 via-orange-400 to-yellow-300",
    },
    {
      label: "Total Press Releases",
      value: pressReleases.length,
      tone: "from-fuchsia-500 via-pink-400 to-rose-300",
    },
  ];

  return (
    <div className="grid gap-8">
      <section className="rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.28),_transparent_30%),linear-gradient(145deg,#020617_0%,#0f172a_38%,#155e75_120%)] px-6 py-8 text-white shadow-xl sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/90">
          Executive Overview
        </p>
        <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
              Welcome back, {currentUser.username}. Your admin operations hub is live.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
              This dashboard sits on top of the existing blog, article, jobs, press release, and
              job application flows without changing their current CRUD behavior.
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">Current Role</p>
            <p className="mt-2 text-2xl font-semibold">{currentUser.role}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className={`rounded-[1.75rem] bg-gradient-to-br ${stat.tone} p-[1px] shadow-lg`}
          >
            <div className="h-full rounded-[1.7rem] bg-white/92 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                {stat.label}
              </p>
              <p className="mt-5 text-5xl font-semibold text-slate-950">
                {formatCount(stat.value)}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <article className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold text-slate-950">Admin Coverage</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            The dashboard exposes modules according to role-based access and keeps all current data
            operations behind protected sessions.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Protected admin routes with session cookies",
              "Role-aware sidebar and navigation states",
              "Admin-only login access management",
              "Existing CRUD routes preserved underneath",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5 text-sm text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold text-slate-950">Modules Snapshot</h2>
          <div className="mt-6 space-y-4">
            {[
              ["Jobs", `${jobs.length} roles currently available`],
              ["Blogs", `${formatCount(totalBlogs)} editorial posts managed`],
              ["Articles", `${articles.length} article entries in the system`],
              ["Press Releases", `${pressReleases.length} communication assets tracked`],
            ].map(([label, detail]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 px-5 py-4"
              >
                <div>
                  <p className="text-lg font-semibold text-slate-950">{label}</p>
                  <p className="mt-1 text-sm text-slate-500">{detail}</p>
                </div>
                <div className="h-3 w-3 rounded-full bg-cyan-500" />
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
