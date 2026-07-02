import { ContentPageShell } from "@/app/_components/content/content-page-shell";
import { PageHero } from "@/app/_components/content/page-hero";

export default function TermsAndConditionsPage() {
  return (
    <ContentPageShell surface="light">
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The baseline terms governing use of this website, its content, and general informational materials."
      />

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_16px_50px_rgba(148,163,184,0.12)] sm:p-10">
          <div className="space-y-6 text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              By accessing this website, visitors agree to use its content lawfully, responsibly, and only for legitimate informational or business engagement purposes.
            </p>
            <p>
              All website content, branding, layouts, text, and supporting materials remain the property of Prisma or its licensors unless stated otherwise, and may not be copied or redistributed without permission.
            </p>
            <p>
              Separate commercial agreements, product contracts, and service schedules will govern any purchased offering or formal engagement with Prisma and will take precedence over general website content where applicable.
            </p>
          </div>
        </div>
      </section>
    </ContentPageShell>
  );
}
