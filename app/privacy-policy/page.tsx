import { ContentPageShell } from "@/app/_components/content/content-page-shell";
import { PageHero } from "@/app/_components/content/page-hero";

export default function PrivacyPolicyPage() {
  return (
    <ContentPageShell surface="light">
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Prism.ai handles information shared through this website and related communication channels."
      />

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_16px_50px_rgba(148,163,184,0.12)] sm:p-10">
          <div className="space-y-6 text-sm leading-7 text-slate-600 sm:text-base">
            <p>
              Prisma handles personal information submitted through this website with appropriate care and uses it only for legitimate business purposes such as responding to inquiries, managing requests, and maintaining service communications.
            </p>
            <p>
              Information provided through contact forms or similar channels may be stored securely, reviewed by authorized internal teams, and retained only for operational, legal, or compliance purposes where necessary.
            </p>
            <p>
              Visitors who need additional detail regarding data handling, retention, or regional privacy rights should contact Prisma directly using the contact information published on this website.
            </p>
          </div>
        </div>
      </section>
    </ContentPageShell>
  );
}
