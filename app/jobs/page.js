import Link from "next/link";
import { getPublicJobs } from "@/lib/job-service";
import { FooterSection } from "@/app/_components/landing/footer-section";
import { Header } from "@/app/_components/landing/header";
import JobApplyModal from "./_components/job-apply-modal";
import CultureEventsGallery from "./_components/culture-events-gallery";
import JobsAwardsSection from "./_components/jobs-awards-section";
import JobsImageCarousel from "./_components/jobs-image-carousel";
import JobsPerksBenefits from "./_components/jobs-perks-benefits";
import JobsTechnologyStack from "./_components/jobs-technology-stack";
import JobsUsersMarquee from "./_components/jobs-users-marquee";
import JobsVideoPreview from "./_components/jobs-video-preview";

export const dynamic = "force-dynamic";

const heroStats = [
  { label: "Location", value: "Mumbai, India" },
  { label: "Employee Strength", value: "100+" },
  { label: "Year Founded", value: "2013" },
];

const showcaseImages = [
  {
    src: "/uploads/1778263976774-Importance-of-React-JS-Development-Company-and-Next-JS-Developers.jpg",
    alt: "Team collaboration workspace",
    title: "2025",
  },
  {
    src: "/job/1778191149445-Career-growth-or-career-development-improvement-or-progress-to-success-in-work-job-promotion-and-salary-increase-concept-cheerful-businessman-and-woman-running-on-growing-arrow-on-the-word-Career_.jpg",
    alt: "Career growth concept illustration",
    title: "2025",
  },
  {
    src: "/job/1778185692096-download-6.jpg",
    alt: "Professional team portrait",
    title: "2024",
  },
];

const cultureEventImages = [
  {
    src: "/uploads/1778167951073WhatsApp Image 2026-03-24 at 6.02.45 PM - Copy.jpeg",
    alt: "Leadership portrait",
    title: "Leadership moments",
  },
  {
    src: "/uploads/1778263976774-Importance-of-React-JS-Development-Company-and-Next-JS-Developers.jpg",
    alt: "Technology themed visual",
    title: "AI-first thinking",
  },
  {
    src: "/job/1778191149445-Career-growth-or-career-development-improvement-or-progress-to-success-in-work-job-promotion-and-salary-increase-concept-cheerful-businessman-and-woman-running-on-growing-arrow-on-the-word-Career_.jpg",
    alt: "Career event illustration",
    title: "Growth mindset",
  },
  {
    src: "/job/1778185692096-download-6.jpg",
    alt: "Professional portrait",
    title: "People first",
  },
  {
    src: "/uploads/1778167951073WhatsApp Image 2026-03-24 at 6.02.45 PM - Copy.jpeg",
    alt: "Executive team portrait",
    title: "Milestones & moments",
  },
];

const userImages = [
  {
    src: "/uploads/1778167951073WhatsApp Image 2026-03-24 at 6.02.45 PM - Copy.jpeg",
    alt: "User portrait one",
    title: "Leadership Circle",
  },
  {
    src: "/job/1778185692096-download-6.jpg",
    alt: "User portrait two",
    title: "Creative Team",
  },
  {
    src: "/uploads/1778263976774-Importance-of-React-JS-Development-Company-and-Next-JS-Developers.jpg",
    alt: "User visual three",
    title: "Engineering Partners",
  },
  {
    src: "/job/1778191149445-Career-growth-or-career-development-improvement-or-progress-to-success-in-work-job-promotion-and-salary-increase-concept-cheerful-businessman-and-woman-running-on-growing-arrow-on-the-word-Career_.jpg",
    alt: "User visual four",
    title: "Career Builders",
  },
  {
    src: "/uploads/1778191260008-Learn-how-to-write-a-press-release-that-will-catch-the-attention-of-media-outlets_-Weve-compiled-successful-press-release-examples-to-help-you-get-started_.jpg",
    alt: "User visual five",
    title: "Business Teams",
  },
  {
    src: "/uploads/1778190936260-📝 Guest Blogging Strategy That Actually Works__Want to build high-quality backlinks and establish.jpg",
    alt: "User visual six",
    title: "Product Networks",
  },
];

const awardItems = [
  {
    year: "2021",
    title: "Breakthrough Recognition",
    description: "Recognized for early execution across intelligent workflow and applied AI delivery.",
    image: "/uploads/1778263976774-Importance-of-React-JS-Development-Company-and-Next-JS-Developers.jpg",
    alt: "Award image 2021",
  },
  {
    year: "2022",
    title: "Growth Excellence",
    description: "Marked by stronger platform capabilities, sharper delivery operations, and visible momentum.",
    image: "/uploads/1778191260008-Learn-how-to-write-a-press-release-that-will-catch-the-attention-of-media-outlets_-Weve-compiled-successful-press-release-examples-to-help-you-get-started_.jpg",
    alt: "Award image 2022",
  },
  {
    year: "2023",
    title: "Industry Trust",
    description: "A year defined by stronger partnerships, better outcomes, and growing market confidence.",
    image: "/uploads/1778190936260-📝 Guest Blogging Strategy That Actually Works__Want to build high-quality backlinks and establish.jpg",
    alt: "Award image 2023",
  },
];

export default async function JobsPage() {
  const jobs = await getPublicJobs();

  return (
    <main className="overflow-x-hidden bg-slate-950">
      <Header />

      <section className="relative overflow-hidden px-4 pb-16 pt-30 sm:px-6 lg:px-8">
        <div className="prism-orb prism-orb-left" />
        <div className="prism-orb prism-orb-right" />
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.94)_0%,rgba(2,6,23,0.98)_100%)] px-6 py-12 shadow-[0_40px_140px_rgba(2,6,23,0.65)] sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-16">
          <div className="relative z-10">
            <span className="inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-200">
              Careers At Prism.ai
            </span>
            <h1 className="mt-8 max-w-4xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Unlock Your Next Career Move With A Team Built For Serious Work.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Build products that matter, work with high-accountability teams, and grow inside a company that values depth, ownership, and long-term execution.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {heroStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[24px] border border-white/[0.08] bg-slate-950/45 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    {item.label}
                  </p>
                  <p className="mt-3 font-display text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#open-roles"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:translate-y-[-2px] hover:bg-white"
              >
                Explore Open Roles
              </a>
              <a
                href="#culture"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.08]"
              >
                View Culture Preview
              </a>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center">
            <div className="relative w-full max-w-xl rounded-[34px] border border-white/10 bg-white/5 p-4 shadow-[0_30px_90px_rgba(8,47,73,0.35)] backdrop-blur">
              <div className="absolute -left-4 top-8 hidden rounded-[22px] border border-cyan-300/20 bg-slate-950/80 px-4 py-3 shadow-[0_20px_60px_rgba(8,47,73,0.3)] backdrop-blur sm:block">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
                  Hiring Focus
                </p>
                <p className="mt-2 text-sm font-semibold text-white">Builders who value execution.</p>
              </div>
              <div className="absolute -right-4 bottom-10 hidden rounded-[22px] border border-white/10 bg-white/10 px-4 py-3 text-right shadow-[0_20px_60px_rgba(8,47,73,0.3)] backdrop-blur sm:block">
                <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">
                  Work Style
                </p>
                <p className="mt-2 text-sm font-semibold text-white">Fast feedback, clear ownership.</p>
              </div>
              <div className="overflow-hidden rounded-[28px] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,47,73,0.45)_0%,rgba(15,23,42,0.78)_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.2),transparent_26%)]" />
                <img
                  src="/job/1778191149445-Career-growth-or-career-development-improvement-or-progress-to-success-in-work-job-promotion-and-salary-increase-concept-cheerful-businessman-and-woman-running-on-growing-arrow-on-the-word-Career_.jpg"
                  alt="Career growth illustration"
                  className="relative h-full min-h-[420px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">
                Workplace Snapshot
              </p>
              {/* <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                A workplace built around momentum, craft, and visible team energy.
              </h2> */}
            </div>
            {/* <p className="max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              This section follows the wide visual structure from your reference, but keeps the Prism.ai look with darker surfaces, premium spacing, and smooth interactions.
            </p> */}
          </div>

          <JobsImageCarousel images={showcaseImages} />
        </div>
      </section>

      <JobsPerksBenefits />

      <JobsTechnologyStack />

   

      <section id="culture" className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(248,250,252,0.95)_0%,rgba(224,242,254,0.92)_100%)] p-6 text-slate-950 shadow-[0_30px_120px_rgba(2,6,23,0.35)] lg:grid-cols-[0.92fr_1.08fr] lg:p-8">
          <div className="flex flex-col justify-center rounded-[28px] border border-cyan-100 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f0f9ff_100%)] p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-700">
              Why Join Us
            </p>
            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Serious opportunities for people who want to do meaningful, high-trust work.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              We invest in ownership, clear communication, and long-view product building. The structure follows your reference layout, while the UI is tuned to your current landing page system.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Cross-functional collaboration with direct visibility.",
                "A delivery culture shaped by accountability and speed.",
                "Career paths backed by real project ownership.",
                "A modern work environment with premium team experience.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[22px] border border-slate-200 bg-white/90 p-4 text-sm leading-6 text-slate-700 shadow-[0_12px_30px_rgba(148,163,184,0.12)]"
                >
                  {item}
                </div>
              ))}
            </div>

            <a
              href="#open-roles"
              className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:translate-y-[-2px] hover:bg-slate-950 hover:text-white"
            >
              Browse Open Positions
            </a>
          </div>

          <JobsVideoPreview
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            poster="/uploads/1778263976774-Importance-of-React-JS-Development-Company-and-Next-JS-Developers.jpg"
          />
        </div>
      </section>

      <JobsUsersMarquee images={userImages} />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[40px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.14),transparent_34%),linear-gradient(180deg,rgba(15,23,42,0.94)_0%,rgba(2,6,23,0.98)_100%)] p-6 shadow-[0_40px_140px_rgba(2,6,23,0.55)] lg:grid-cols-[1.08fr_0.92fr] lg:p-8">
          <div className="flex flex-col justify-center rounded-[30px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">
              CEO Message
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["WE ARE", "Family", "Innovation", "Vision"].map((item, index) => (
                <span
                  key={item}
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    index === 0
                      ? "border border-cyan-400/30 bg-cyan-400/10 text-cyan-200"
                      : "border border-white/10 bg-white/5 text-slate-200"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
            <h2 className="mt-8 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Dr. Shreeram Iyer
            </h2>
            <p className="mt-4 max-w-3xl font-display text-2xl font-semibold tracking-[-0.03em] text-cyan-200 sm:text-3xl">
              &quot;We Aim to Elevate the Scope of AI with Intelligent Cameras&quot;
            </p>
            <p className="mt-6 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
              Prisma AI envisages being one of the leaders in vision-based AI, wherein Prisma&apos;s Gryphos will change the perspective of visual recognition along with cognitive-based solutions globally.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-4 shadow-[0_30px_90px_rgba(8,47,73,0.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_36%)]" />
            <div className="relative overflow-hidden rounded-[26px] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(8,47,73,0.35)_0%,rgba(15,23,42,0.78)_100%)]">
              <img
                src="/uploads/1778167951073WhatsApp Image 2026-03-24 at 6.02.45 PM - Copy.jpeg"
                alt="Dr. Shreeram Iyer portrait"
                className="h-[420px] w-full object-cover object-center transition duration-700 hover:scale-[1.04] sm:h-[520px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(2,6,23,0.9)_100%)] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">
                  Founder&apos;s Vision
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-200">
                  Vision-led leadership with a focus on applied intelligence, real-world computer vision, and global-scale product direction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <JobsAwardsSection awards={awardItems} />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300">
                Prisma AI Culture & Events
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                A culture shaped by ambition, shared wins, and visible momentum.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Large-feature image on the left, four supporting cards on the right, with subtle motion and premium surfaces aligned to the landing page theme.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="group relative overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-4 shadow-[0_30px_110px_rgba(2,6,23,0.42)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_36%)]" />
              <div className="relative overflow-hidden rounded-[28px]">
                <img
                  src={cultureEventImages[0].src}
                  alt={cultureEventImages[0].alt}
                  className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-[1.05] sm:h-[420px] lg:h-[520px]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.02)_0%,rgba(2,6,23,0.72)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">
                    Featured Moment
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                    Leadership, recognition, and high-visibility milestones.
                  </h3>
                </div>
              </div>
            </article>

            <CultureEventsGallery images={cultureEventImages.slice(1)} />
          </div>
        </div>
      </section>

      <section
        id="open-roles"
        className="bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_35%,#e2e8f0_100%)] px-4 py-16 text-slate-900 sm:px-6 lg:px-8"
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="rounded-[2rem] bg-[linear-gradient(120deg,#020617_0%,#1d4ed8_40%,#38bdf8_100%)] px-6 py-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-200">
              Careers
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Explore Open Roles
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-sky-100 sm:text-base">
              Discover current opportunities, review role details, and apply with the existing candidate flow already wired into this page.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <article
                key={job._id.toString()}
                className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Link href={`/jobs/${job._id}`} className="block">
                  {job.image ? (
                    <img
                      src={job.image}
                      alt={job.title || "Job image"}
                      className="h-56 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-56 items-center justify-center bg-slate-200 text-slate-500">
                      No image
                    </div>
                  )}
                </Link>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-500">
                    {job.jobType || "Opportunity"}
                  </p>
                  <Link href={`/jobs/${job._id}`} className="block">
                    <h3 className="mt-3 text-2xl font-bold transition hover:text-sky-600">
                      {job.title || "Untitled Job"}
                    </h3>
                  </Link>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {job.address || "Address will be updated soon."}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/jobs/${job._id}`}
                      className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-sky-500 hover:text-sky-600"
                    >
                      View Details
                    </Link>
                    <JobApplyModal
                      jobId={job._id.toString()}
                      jobTitle={job.title || "Untitled Job"}
                      buttonLabel="Apply"
                      buttonClassName="inline-flex rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-900"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {jobs.length === 0 ? (
            <div className="mt-8 rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-14 text-center text-slate-500">
              No jobs are available yet.
            </div>
          ) : null}
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
