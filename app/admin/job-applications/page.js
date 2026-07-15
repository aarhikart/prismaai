import { getJobApplications } from "@/lib/job-application-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireRoleAccess } from "@/lib/auth";
import AdminJobApplicationsTabs from "./admin-job-applications-tabs";

export const dynamic = "force-dynamic";

export default async function AdminJobApplicationsPage() {
  await requireRoleAccess([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR], "/admin/job-applications");
  const rawApplications = await getJobApplications();

  // FIX: Convert MongoDB complex fields into plain primitives
  const applications = rawApplications.map((app) => ({
    ...app,
    _id: app._id.toString(), // Converts the Buffer/ObjectId into a plain text string
    createdAt: app.createdAt ? new Date(app.createdAt).toISOString() : null, // Fixes date fields if present
    updatedAt: app.updatedAt ? new Date(app.updatedAt).toISOString() : null, // Fixes date fields if present
  }));

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-[2rem] bg-[linear-gradient(120deg,#0f172a_0%,#1e293b_45%,#00aeef_100%)] px-6 py-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-200">
            Admin Panel
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Job Applications</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-sky-100 sm:text-base">
            Review all candidate applications and download submitted resumes directly from the
            admin panel.
          </p>
        </div>

        {/* This will now receive pure, clean JSON-serializable data */}
        <AdminJobApplicationsTabs applications={applications} />

      </div>
    </div>
  );
}
