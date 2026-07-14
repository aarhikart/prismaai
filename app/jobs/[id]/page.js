import Link from "next/link";
import { getJobById, getPublicJobs } from "@/lib/job-service";
import JobApplyModal from "../_components/job-apply-modal";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

function detailItems(job) {
  return [
    { label: "Address", value: job.address },
    { label: "Job Type", value: job.jobType },
    { label: "Requirements Count", value: job.requirementsCount },
    { label: "Experience Years", value: job.experienceYears },
    { label: "Salary", value: job.salary },
    { label: "Qualification", value: job.qualification },
    { label: "CTC", value: job.ctc },
  ].filter((item) => item.value);
}

export default async function JobDetailPage({ params }) {
  const { id } = await params;
  const job = await getJobById(id);
  const jobs = await getPublicJobs();
  const currentUser = await getCurrentUser();

  const isAuthorized = currentUser && ["Admin", "HR"].includes(currentUser.role);
  const isPublic = !job?.status || ["Approved", "Published"].includes(job.status);

  if (!job || (!isPublic && !isAuthorized)) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-16 text-center text-slate-900">
        <div className="mx-auto max-w-xl rounded-[2rem] bg-white px-6 py-12 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-bold">Job not found</h2>
          <p className="mt-3 text-sm text-slate-500">
            The job you are trying to open does not exist.
          </p>
          <Link
            href="/jobs"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const suggestedJobs = jobs.filter((item) => String(item._id) !== String(id));

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_35%,#e2e8f0_100%)] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
            {job.image ? (
              <img
                src={job.image}
                alt={job.title || "Job image"}
                className="h-72 w-full object-cover sm:h-96"
              />
            ) : (
              <div className="flex h-72 items-center justify-center bg-slate-200 text-slate-500 sm:h-96">
                No image
              </div>
            )}

            <div className="p-6 sm:p-8">
              <Link
                href="/jobs"
                className="inline-flex text-sm font-semibold text-sky-600 transition hover:text-slate-900"
              >
                Back to Jobs
              </Link>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">
                Career Opportunity
              </p>
              <h1 className="mt-3 text-3xl font-bold sm:text-5xl">
                {job.title || "Untitled Job"}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                {job.address || "Location details will be updated soon."}
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {detailItems(job).map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <JobApplyModal
                  jobId={job._id.toString()}
                  jobTitle={job.title || "Untitled Job"}
                  buttonLabel="Apply For This Job"
                  buttonClassName="inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-900"
                />
              </div>

              <div className="mt-8 grid gap-6">
                {job.sections?.map((section, index) => (
                  <div
                    key={`${section.title}-${index}`}
                    className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <h2 className="text-2xl font-bold text-slate-900">
                      {section.title || `Section ${index + 1}`}
                    </h2>
                    <div className="mt-4 h-px w-full bg-slate-200" />
                    <p className="mt-5 whitespace-pre-wrap text-base leading-8 text-slate-700">
                      {section.description || "No description added."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <aside className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold">Suggested Jobs</h2>
            <p className="mt-2 text-sm text-slate-500">
              Explore similar openings and apply to the role that fits you best.
            </p>

            <div className="mt-6 space-y-4">
              {suggestedJobs.map((item) => (
                <Link
                  key={item._id.toString()}
                  href={`/jobs/${item._id}`}
                  className="flex gap-3 rounded-[1.5rem] border border-slate-200 p-3 transition hover:border-sky-300 hover:bg-sky-50"
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title || "Suggested job"}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-200 text-xs text-slate-500">
                      No image
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 font-semibold text-slate-900">
                      {item.title || "Untitled Job"}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {item.address || "Address pending"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {suggestedJobs.length === 0 ? (
              <div className="mt-6 rounded-[1.5rem] border border-dashed border-slate-300 px-4 py-8 text-sm text-slate-500">
                No suggested jobs available yet.
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </div>
  );
}
