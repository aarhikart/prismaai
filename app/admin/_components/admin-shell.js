"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavItemsForRole } from "@/lib/admin-access";

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
};

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
  
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef(null);

  async function fetchNotifications() {
    try {
      const res = await fetch("/api/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.role !== "Marketing") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 15000); // Poll every 15s
      return () => clearInterval(interval);
    }
  }, [currentUser]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleMarkAllAsRead() {
    try {
      const res = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ readAll: true }),
      });
      if (res.ok) {
        setNotifications((current) => current.map((n) => ({ ...n, read: true })));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleMarkAsRead(id) {
    try {
      const res = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setNotifications((current) =>
          current.map((n) => (n._id === id ? { ...n, read: true } : n))
        );
      }
    } catch (err) {
      console.error(err);
    }
  }

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

              <div className="flex items-center gap-4">
                {/* Notifications Bell */}
                {currentUser && currentUser.role !== "Marketing" && mounted && (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                      className="relative rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                      aria-label="Notifications"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                        />
                      </svg>
                      {notifications.filter((n) => !n.read).length > 0 && (
                        <span className="absolute right-2.5 top-2.5 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                      )}
                    </button>

                    {isNotificationsOpen && (
                      <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl ring-1 ring-black/5 z-50">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h3 className="font-bold text-slate-900">Notifications</h3>
                          {notifications.filter((n) => !n.read).length > 0 && (
                            <button
                              type="button"
                              onClick={handleMarkAllAsRead}
                              className="text-xs font-semibold text-sky-600 hover:text-slate-900 transition"
                            >
                              Mark all as read
                            </button>
                          )}
                        </div>

                        <div className="mt-3 max-h-72 overflow-y-auto divide-y divide-slate-100">
                          {notifications.length === 0 ? (
                            <p className="py-4 text-center text-sm text-slate-500">
                              No notifications yet
                            </p>
                          ) : (
                            notifications.map((n) => (
                              <div
                                key={n._id}
                                className={`py-3 transition ${n.read ? "opacity-60" : "font-medium"}`}
                              >
                                <Link
                                  href={n.action === "New Application" ? "/admin/job-applications" : `/admin/jobs/${n.job}`}
                                  onClick={() => {
                                    handleMarkAsRead(n._id);
                                    setIsNotificationsOpen(false);
                                  }}
                                  className="block hover:text-sky-600 text-sm text-slate-800"
                                >
                                  {n.message}
                                </Link>
                                 <span className="text-[10px] text-slate-400 mt-1 block" suppressHydrationWarning>
                                   {formatDate(n.createdAt)}
                                 </span>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isLoggingOut ? "Signing out..." : "Logout"}
                </button>
              </div>
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
