import { FooterSection } from "@/app/_components/landing/footer-section";
import { Header } from "@/app/_components/landing/header";
import type { ReactNode } from "react";

type ProductPageShellProps = {
  children: ReactNode;
};

export function ProductPageShell({
  children,
}: ProductPageShellProps) {
  return (
    <main className="overflow-x-hidden bg-slate-950">
      <Header />
      {children}
      <FooterSection />
    </main>
  );
}
