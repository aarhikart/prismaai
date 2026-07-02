import { getJobApplications } from "@/lib/job-application-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireRoleAccess } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminJobApplicationsPage() {
  await requireRoleAccess([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR], "/admin/job-applications");
  const applications = await getJobApplications();

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-[2rem] bg-[linear-gradient(120deg,#0f172a_0%,#1e293b_45%,#0ea5e9_100%)] px-6 py-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-200">
            Admin Panel
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Job Applications</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-sky-100 sm:text-base">
            Review all candidate applications and download submitted resumes directly from the
            admin panel.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Applied Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Resume
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((application) => (
                  <tr key={application._id.toString()} className="hover:bg-slate-50">
                    <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                      {application.firstName} {application.lastName}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">{application.email}</td>
                    <td className="px-6 py-5 text-sm text-slate-600">{application.phone}</td>
                    <td className="px-6 py-5 text-sm text-slate-600">{application.roleTitle}</td>
                    <td className="px-6 py-5">
                      <a
                        href={application.resumeUrl}
                        download={application.resumeFileName}
                        className="inline-flex rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                      >
                        Download Resume
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {applications.length === 0 ? (
            <div className="px-6 py-14 text-center text-slate-500">
              No job applications have been submitted yet.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
