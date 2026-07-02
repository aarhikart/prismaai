import { getContactMessages } from "@/lib/contact-message-service";
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

export default async function AdminContactMessagesPage() {
  await requireRoleAccess([ADMIN_ROLES.ADMIN], "/admin/contact-messages");
  const messages = await getContactMessages();

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-[2rem] bg-[linear-gradient(120deg,#0f172a_0%,#1e293b_45%,#0ea5e9_100%)] px-6 py-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-200">
            Admin Panel
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Contact Messages</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-sky-100 sm:text-base">
            Review all submitted contact requests from the landing page in one secure admin queue.
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
                    Phone
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
                {messages.map((message) => (
                  <tr key={message._id.toString()} className="align-top hover:bg-slate-50">
                    <td className="px-6 py-5 text-sm font-semibold text-slate-900">
                      {message.name}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">{message.email}</td>
                    <td className="px-6 py-5 text-sm text-slate-600">{message.company || "—"}</td>
                    <td className="px-6 py-5 text-sm text-slate-600">{message.phone || "—"}</td>
                    <td className="px-6 py-5 text-sm leading-6 text-slate-600">
                      <div className="max-w-md whitespace-pre-wrap">{message.message}</div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600">
                      {formatDate(message.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {messages.length === 0 ? (
            <div className="px-6 py-14 text-center text-slate-500">
              No contact messages have been submitted yet.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
