import LoginManagementClient from "@/app/admin/login-management/login-management-client";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { listAdminUsers, requireRoleAccess } from "@/lib/auth";

export default async function LoginManagementPage() {
  const currentUser = await requireRoleAccess([ADMIN_ROLES.ADMIN], "/admin/login-management");
  const users = await listAdminUsers();

  return <LoginManagementClient initialUsers={users} currentUserId={currentUser.id} />;
}
