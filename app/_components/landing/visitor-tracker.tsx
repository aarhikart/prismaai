"use client";

import { useEffect } from "react";

const STORAGE_KEY = "prisma_landing_visitor_tracked_until";
const VISITOR_TTL_MS = 24 * 60 * 60 * 1000;

export function VisitorTracker() {
  useEffect(() => {
    try {
      const now = Date.now();
      const trackedUntil = Number(window.localStorage.getItem(STORAGE_KEY) || 0);

      if (trackedUntil > now) {
        return;
      }

      window.localStorage.setItem(STORAGE_KEY, String(now + VISITOR_TTL_MS));

      fetch("/api/visitors", { method: "POST" }).catch(() => {
        window.localStorage.removeItem(STORAGE_KEY);
      });
    } catch {
      fetch("/api/visitors", { method: "POST" }).catch(() => {});
    }
  }, []);

  return null;
}
