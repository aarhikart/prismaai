import { redirect } from "next/navigation";
import LoginForm from "@/app/admin/login/login-form";
import { DEFAULT_ADMIN, getCurrentUser } from "@/lib/auth";

export default async function AdminLoginPage() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/admin");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.24),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(14,116,144,0.18),_transparent_24%),linear-gradient(145deg,#020617_0%,#0f172a_42%,#e2e8f0_160%)] px-4 py-10">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />

      <div className="relative grid w-full max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] border border-white/10 bg-white/8 p-8 text-white shadow-2xl backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300">
            Protected Admin Flow
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
            Manage blogs, hiring, articles, and press operations from one admin system.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200">
            The new dashboard wraps your existing CRUD routes with role-based access control,
            protected sessions, and a cleaner control panel structure.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              "Role-aware sidebar",
              "Protected admin routes",
              "Login management",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-slate-950/30 px-5 py-6 text-sm text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-8 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">
            Login Access
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-950">Admin Sign In</h2>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            Use your assigned username, password, and role-based access to enter the dashboard.
          </p>

          <LoginForm />

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Default First Login
            </p>
            <div className="mt-4 grid gap-2 text-sm text-slate-700">
              <p>
                <span className="font-semibold">Username:</span> {DEFAULT_ADMIN.username}
              </p>
              <p>
                <span className="font-semibold">Password:</span> {DEFAULT_ADMIN.password}
              </p>
              <p>
                <span className="font-semibold">Role:</span> {DEFAULT_ADMIN.role}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
