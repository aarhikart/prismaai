"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useState } from "react";

import { aboutMenu, moreMenu, productMenu } from "./landing-data";
import { PocRequestModal } from "./poc-request-modal";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_40px_rgba(34,211,238,0.18)]">
        <span className="font-display text-lg font-semibold text-cyan-200">P</span>
      </span>
      <span className="text-lg font-semibold tracking-[0.18em] text-white">
        Prism<span className="text-cyan-300">.ai</span>
      </span>
    </Link>
  );
}

function NavItem({
  href,
  className,
  onClick,
  children,
}: {
  href: string;
  className: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (href.startsWith("/") && !href.includes("#")) {
    return (
      <Link href={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

function DesktopDropdown({
  label,
  items,
  panelClassName,
  itemsClassName,
}: {
  label: string;
  items: { label: string; href: string }[];
  panelClassName?: string;
  itemsClassName?: string;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-2 text-sm font-medium text-slate-200 transition hover:text-white"
      >
        {label}
        <span className="text-[10px] text-cyan-300">▼</span>
      </button>
      <div className="pointer-events-none absolute left-0 top-full pt-4 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
        <div
          className={`rounded-3xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl ${panelClassName ?? "w-56"}`}
        >
          <div className={itemsClassName}>
            {items.map((item) => (
              <NavItem
                key={item.label}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </NavItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const toggleGroup = (group: string) => {
    setOpenGroup((current) => (current === group ? null : group));
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenGroup(null);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[28px] border border-white/10 bg-slate-950/70 px-5 py-4 shadow-[0_20px_90px_rgba(2,6,23,0.48)] backdrop-blur-xl sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          <DesktopDropdown label="About" items={aboutMenu} />
          <Link href="/core-algorithm" className="text-sm font-medium text-slate-200 transition hover:text-white">
            Core Algorithm
          </Link>
          <Link href="/industries" className="text-sm font-medium text-slate-200 transition hover:text-white">
            Industries
          </Link>
          <DesktopDropdown label="Products" items={productMenu} />
          <Link href="/contact" className="text-sm font-medium text-slate-200 transition hover:text-white">
            Contact
          </Link>
          <DesktopDropdown
            label="More"
            items={moreMenu}
            panelClassName="w-[29rem]"
            itemsClassName="grid grid-cols-2 gap-1"
          />
        </nav>

        <div className="flex items-center gap-3">
          <PocRequestModal buttonClassName="hidden rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white lg:inline-flex" />
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span className="text-lg">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mx-auto mt-3 max-w-7xl rounded-[28px] border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => toggleGroup("about")}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
            >
              About
              <span className="text-xs text-cyan-300">{openGroup === "about" ? "−" : "+"}</span>
            </button>
            {openGroup === "about" ? (
              <div className="space-y-1 px-3 pb-2">
                {aboutMenu.map((item) => (
                  <NavItem
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-2xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </NavItem>
                ))}
              </div>
            ) : null}

            <Link
              href="/core-algorithm"
              onClick={closeMenu}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
            >
              Core Algorithm ha
            </Link>

            <Link
              href="/industries"
              onClick={closeMenu}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
            >
              Industries
            </Link>

            <button
              type="button"
              onClick={() => toggleGroup("products")}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
            >
              Products
              <span className="text-xs text-cyan-300">{openGroup === "products" ? "−" : "+"}</span>
            </button>
            {openGroup === "products" ? (
              <div className="space-y-1 px-3 pb-2">
                {productMenu.map((item) => (
                  <NavItem
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-2xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </NavItem>
                ))}
              </div>
            ) : null}

            <Link
              href="/contact"
              onClick={closeMenu}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
            >
              Contact
            </Link>

            <button
              type="button"
              onClick={() => toggleGroup("more")}
              className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-white/5 hover:text-white"
            >
              More
              <span className="text-xs text-cyan-300">{openGroup === "more" ? "−" : "+"}</span>
            </button>
            {openGroup === "more" ? (
              <div className="grid grid-cols-2 gap-1 px-3 pb-2">
                {moreMenu.map((item) => (
                  <NavItem
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-2xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </NavItem>
                ))}
              </div>
            ) : null}

            <PocRequestModal
              onOpen={closeMenu}
              buttonClassName="mt-3 inline-flex w-full justify-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
