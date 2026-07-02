import AdminShell from "@/app/admin/_components/admin-shell";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminLayout({ children }) {
  const currentUser = await getCurrentUser();

  return <AdminShell currentUser={currentUser}>{children}</AdminShell>;
}
