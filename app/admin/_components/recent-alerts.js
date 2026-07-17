"use client";

import { useEffect, useState } from "react";

function getRelativeTime(dateStr) {
  if (!dateStr) return "";
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;

  if (isNaN(diffMs)) return "";

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export default function RecentAlerts({ initialAlerts }) {
  const [alerts, setAlerts] = useState(initialAlerts || []);
  const [timeLabels, setTimeLabels] = useState({});

  useEffect(() => {
    // Update relative time labels on mount and every 30 seconds
    const updateTimes = () => {
      const newLabels = {};
      alerts.forEach((alert, idx) => {
        newLabels[idx] = getRelativeTime(alert.createdAt);
      });
      setTimeLabels(newLabels);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 30000);
    return () => clearInterval(interval);
  }, [alerts]);

  return (
    <article className="rounded-[2.5rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-2xl font-bold text-slate-950">Live Operations Feed</h2>
      <p className="mt-1 text-sm text-slate-500">
        Real-time alerts of recent incoming submissions.
      </p>

      <div className="mt-6 space-y-4">
        {alerts.length === 0 ? (
          <p className="text-center py-6 text-sm text-slate-400">No recent submissions found.</p>
        ) : (
          alerts.map((alert, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 rounded-[1.5rem] border border-slate-100 bg-slate-50/50 p-4 transition hover:bg-slate-50"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-lg shadow-sm border border-slate-100">
                {alert.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-950 truncate">
                    {alert.title}
                  </p>
                  <span className="text-[11px] font-medium text-slate-400 shrink-0">
                    {timeLabels[idx] || "..."}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold text-sky-600 truncate">{alert.name}</p>
                <p className="mt-0.5 text-xs text-slate-500 truncate">{alert.detail}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}
