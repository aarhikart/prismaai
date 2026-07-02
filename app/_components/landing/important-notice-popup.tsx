"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __prismHomeNoticeShown?: boolean;
  }
}

const STORAGE_KEY = "prism-home-notice-dismissed";

export function ImportantNoticePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [dontAskAgain, setDontAskAgain] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem(STORAGE_KEY) === "true";
  });

  useEffect(() => {
    if (dontAskAgain || window.__prismHomeNoticeShown) {
      return undefined;
    }

    window.__prismHomeNoticeShown = true;
    const frame = window.requestAnimationFrame(() => {
      setIsOpen(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [dontAskAgain]);

  const handleToggle = () => {
    setDontAskAgain((current) => {
      const next = !current;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center bg-slate-950/72 px-4 py-6 backdrop-blur-md">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.96)_0%,rgba(2,6,23,0.98)_100%)] p-6 shadow-[0_40px_160px_rgba(2,6,23,0.7)] sm:p-8">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(34,211,238,0.7),transparent)]" />

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close notice"
          className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/10 hover:text-white"
        >
          &times;
        </button>

        <div className="pr-14">
          <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200">
            Important Notice
          </span>
          {/* <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Important Notice
          </h2> */}
        </div>

        <div className="mt-6 rounded-[24px] border border-white/10 bg-slate-950/35 p-5 text-sm leading-7 text-slate-300 sm:p-6 sm:text-base">
          <p>
            It has come to the management&apos;s attention that certain third-party websites
            and online platforms are displaying unverified, unsolicited or unauthorised
            share prices, market data, analyst commentary and/or other financial information
            relating to the Company. Such information has not been supplied, authorised, or
            endorsed by the Company in any manner, and the Company expressly disclaims all
            liability for the accuracy, completeness, timeliness, reliability, or suitability
            of any such information.
          </p>
          <p className="mt-5">
            The Company is not responsible for and disclaims any liability arising from
            transactions, agreements, or dealings between third parties in relation to the
            Company&apos;s shares or securities, and any reliance on or use of financial
            information published by unauthorised third parties is at the reader&apos;s sole risk.
            For authoritative information, refer only to the Company&apos;s official disclosures
            and filings or contact the Company directly.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex items-center gap-3 text-sm text-slate-300">
            <button
              type="button"
              role="switch"
              aria-checked={dontAskAgain}
              onClick={handleToggle}
              className={`relative inline-flex h-7 w-12 items-center rounded-full border transition ${
                dontAskAgain
                  ? "border-cyan-300/40 bg-cyan-400/25"
                  : "border-white/10 bg-white/8"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow-[0_6px_18px_rgba(2,6,23,0.35)] transition ${
                  dontAskAgain ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
            <span>Don&apos;t ask again</span>
          </label>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
          >
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
}
