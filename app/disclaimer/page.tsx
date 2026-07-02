import { ContentPageShell } from "@/app/_components/content/content-page-shell";
import { PageHero } from "@/app/_components/content/page-hero";

export default function DisclaimerPage() {
  return (
    <ContentPageShell surface="light">
      <PageHero
        eyebrow="Legal"
        title="Disclaimer"
        description="Important context on how website content should be interpreted and when direct confirmation is required."
      />

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_16px_50px_rgba(148,163,184,0.12)] sm:p-10">
          <div className="space-y-6 text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              The information published on this website is provided for general informational purposes only and may be updated, changed, or removed without notice.
            </p>
            <p>
              Prisma makes reasonable efforts to keep content accurate and current, but does not guarantee completeness, suitability, or uninterrupted availability of any page, document, or referenced material.
            </p>
            <p>
              Any reliance placed on website content is at the visitor&apos;s own discretion. Formal commercial, legal, technical, and compliance positions should be confirmed directly with Prisma through the appropriate business channel.
            </p>
          </div>
        </div>
      </section>
    </ContentPageShell>
  );
}
