import Image from "next/image";
import Link from "next/link";

const jobs = ["AI Engineer", "Dot Net", "Software Tester"];

export default function Career() {
  return (
    <section className=" pt-25">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 md:px-0 lg:grid-cols-2">
        {/* Featured Card */}
        <div className="flex items-center rounded-lg bg-[#1b1d2b] p-6 shadow-lg">
          <div className="flex h-28 w-28 items-center justify-center rounded-xl border border-cyan-500/30 bg-[#161827]">
            <Image
              src="/logo/job-logo.png"
              alt="AI Engineer"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          <div className="ml-6 flex-1">
            <h3 className="text-2xl font-semibold text-[#00AEEF]">
              AI Engineer
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-gray-400">
              Discover the amazing tales of our business and keep up with the
              noteworthy occasions that define our vibrant community.
            </p>

            <button className="mt-5 border-b border-white pb-1 text-sm font-semibold text-white transition hover:text-[#00AEEF] hover:border-[#00AEEF]">
              <Link  href="/jobs-list">View more</Link>
            </button>
          </div>
        </div>

        {/* Jobs List Card */}
        <div className="flex items-center justify-between rounded-2xl bg-[#1b1d2b] p-8 shadow-lg">
          <div className="space-y-4">
            {jobs.map((job) => (
              <h4
                key={job}
                className="text-xl font-semibold text-[#00AEEF] hover:text-[#00AEEF] cursor-pointer transition"
              >
                {job}
              </h4>
            ))}
          </div>

          <Link
            href="/jobs-list"
            className="rounded-lg bg-[#00AEEF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00AEEF]"
          >
            View all Job
          </Link>
        </div>
      </div>
    </section>
  );
}