import { getPocRequests } from "@/lib/poc-request-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireRoleAccess } from "@/lib/auth";

export const dynamic = "force-dynamic";

function formatDate(value) {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminPocRequestsPage() {
  await requireRoleAccess([ADMIN_ROLES.ADMIN], "/admin/poc-requests");
  const requests = await getPocRequests();

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-[2rem] bg-[linear-gradient(120deg,#0f172a_0%,#1e293b_45%,#0ea5e9_100%)] px-6 py-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-200">
            Admin Panel
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">POC Requests</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-sky-100 sm:text-base">
            Review every submitted proof-of-concept request from the website modal in one secure
            admin queue.
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
                    Company
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Industry
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Message
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((request) => (
                  <tr key={request._id.toString()} className="align-top hover:bg-slate-50">
                    <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                      {request.fullName || [request.firstName, request.lastName].filter(Boolean).join(" ")}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">{request.email}</td>
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {request.company || "—"}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">
                      <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                        {request.industry || request.industries?.[0] || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm leading-6 text-slate-600">
                      <div className="max-w-md whitespace-pre-wrap">{request.message || "—"}</div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {formatDate(request.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {requests.length === 0 ? (
            <div className="px-6 py-14 text-center text-slate-500">
              No POC requests have been submitted yet.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
