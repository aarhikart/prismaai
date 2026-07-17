import { getContactMessages } from "@/lib/contact-message-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireRoleAccess } from "@/lib/auth";
import AdminContactMessagesTabs from "./admin-contact-messages-tabs";

export const dynamic = "force-dynamic";

export default async function AdminContactMessagesPage() {
  await requireRoleAccess([ADMIN_ROLES.ADMIN], "/admin/contact-messages");
  const rawMessages = await getContactMessages();

  // Convert MongoDB complex fields into plain primitives
  const messages = rawMessages.map((msg) => {
    const plain = JSON.parse(JSON.stringify(msg));
    plain._id = msg._id.toString();
    return plain;
  });

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

        <AdminContactMessagesTabs messages={messages} />
      </div>
    </div>
  );
}
