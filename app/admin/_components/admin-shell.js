"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavItemsForRole } from "@/lib/admin-access";

function getInitials(label) {
  return label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminShell({ currentUser, children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isLoginPage = pathname === "/admin/login";
  const navItems = currentUser?.role ? getNavItemsForRole(currentUser.role) : [];

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setIsLoggingOut(false);
      window.location.replace("/admin/login");
    }
  }

  if (isLoginPage) {
    return children;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.22),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#eef4ff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-white/60 bg-slate-950/92 p-5 text-slate-100 shadow-2xl backdrop-blur transition-transform duration-300 lg:static lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300/80">
                Admin Flow
              </p>
              <h1 className="mt-3 text-2xl font-semibold">Control Room</h1>
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="rounded-full border border-white/10 px-3 py-2 text-xs text-slate-300 lg:hidden"
            >
              Close
            </button>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Signed In</p>
            <p className="mt-3 text-lg font-semibold capitalize">{currentUser?.username}</p>
            <p className="mt-1 text-sm text-cyan-300">{currentUser?.role}</p>
          </div>

          <nav className="mt-8 grid gap-2">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25"
                      : "text-slate-300 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-semibold ${
                      isActive ? "bg-slate-950/10" : "bg-white/8 text-cyan-200"
                    }`}
                  >
                    {getInitials(item.label)}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/75 px-4 py-4 backdrop-blur lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium shadow-sm lg:hidden"
                >
                  Menu
                </button>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                    Admin Dashboard
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-950">
                    Professional content and hiring operations
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isLoggingOut ? "Signing out..." : "Logout"}
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>

      {isSidebarOpen ? (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          aria-label="Close sidebar overlay"
        />
      ) : null}
    </div>
  );
}
