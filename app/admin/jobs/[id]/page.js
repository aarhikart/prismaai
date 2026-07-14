import JobDetailClient from "./job-detail-client";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireRoleAccess } from "@/lib/auth";
import { getJobById } from "@/lib/job-service";
import Link from "next/link";

export default async function AdminJobDetailPage({ params }) {
  const { id } = await params;
  const currentUser = await requireRoleAccess([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR], "/admin/jobs");
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-100 px-4 py-16 text-center text-slate-900">
        <div className="mx-auto max-w-xl rounded-[2rem] bg-white px-6 py-12 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-bold">Job not found</h2>
          <p className="mt-3 text-sm text-slate-500">
            The job you are trying to view does not exist.
          </p>
          <Link
            href="/admin/jobs"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  // Parse fields for security (e.g. serialize MongoDB objects so Next.js doesn't complain about passing object trees)
  const serializedJob = JSON.parse(JSON.stringify(job));

  return <JobDetailClient currentUser={currentUser} initialJob={serializedJob} />;
}
