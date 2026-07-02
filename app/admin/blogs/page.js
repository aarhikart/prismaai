import BlogsClient from "@/app/admin/blogs/blogs-client";
import { ADMIN_ROLES } from "@/lib/admin-access";
import { requireRoleAccess } from "@/lib/auth";

export default async function AdminBlogsPage() {
  await requireRoleAccess([ADMIN_ROLES.ADMIN, ADMIN_ROLES.MARKETING], "/admin/blogs");

  return <BlogsClient />;
}
