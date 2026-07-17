import { getPocRequests } from "@/lib/poc-request-service";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireRoleAccess } from "@/lib/auth";
import AdminPocRequestsTabs from "./admin-poc-requests-tabs";

export const dynamic = "force-dynamic";

export default async function AdminPocRequestsPage() {
  await requireRoleAccess([ADMIN_ROLES.ADMIN], "/admin/poc-requests");
  const rawRequests = await getPocRequests();

  // Convert MongoDB complex fields into plain primitives
  const requests = rawRequests.map((req) => {
    const plain = JSON.parse(JSON.stringify(req));
    plain._id = req._id.toString();
    return plain;
  });

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

        <AdminPocRequestsTabs requests={requests} />
      </div>
    </div>
  );
}
