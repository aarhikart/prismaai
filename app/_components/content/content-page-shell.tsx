import type { ReactNode } from "react";

import { FooterSection } from "@/app/_components/landing/footer-section";
import { Header } from "@/app/_components/landing/header";

type ContentPageShellProps = {
  children: ReactNode;
  surface?: "dark" | "light";
};

export function ContentPageShell({
  children,
  surface = "dark",
}: ContentPageShellProps) {
  return (
    <main
      className={[
        "overflow-x-hidden",
        surface === "dark"
          ? "bg-slate-950"
          : "bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_35%,#eef6ff_100%)] text-slate-950",
      ].join(" ")}
    >
      <Header />
      {children}
      <FooterSection />
    </main>
  );
}
