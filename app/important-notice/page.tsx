import { ContentPageShell } from "@/app/_components/content/content-page-shell";
import { PageHero } from "@/app/_components/content/page-hero";

export default function ImportantNoticePage() {
  return (
    <ContentPageShell surface="light">
      <PageHero
        eyebrow="Legal"
        title="Important Notice"
        description="Read this page before relying on regional, commercial, legal, or operational information published on the site."
      />

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_16px_50px_rgba(148,163,184,0.12)] sm:p-10">
          <div className="space-y-6 text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              Materials available through this website may include forward-looking business information, product direction statements, and region-specific operational details that are subject to change.
            </p>
            <p>
              Nothing on this website should be interpreted as a binding commitment, offer, warranty, or guaranteed service scope unless explicitly confirmed in executed contractual documentation.
            </p>
            <p>
              If you require authoritative confirmation relating to legal terms, regulatory scope, commercial capability, or office information, contact Prisma directly before acting on website content.
            </p>
          </div>
        </div>
      </section>
    </ContentPageShell>
  );
}
