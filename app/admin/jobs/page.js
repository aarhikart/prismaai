import JobsClient from "@/app/admin/jobs/jobs-client";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireRoleAccess } from "@/lib/auth";

export default async function AdminJobsPage() {
  await requireRoleAccess([ADMIN_ROLES.ADMIN, ADMIN_ROLES.HR], "/admin/jobs");

  return <JobsClient />;
}
