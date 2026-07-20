import { getJobs } from "@/lib/job-service";
import JobListClient from "./jobListClient";
import { Header } from "@/app/_components/landing/header";
import { FooterSection } from "@/app/_components/landing/footer-section";

export const dynamic = "force-dynamic";

export default async function JobsList() {
  const rawJobs = await getJobs();
  
  // Explicitly map and serialize all MongoDB/Mongoose objects to avoid Next.js serialization errors
  const jobs = rawJobs.map((job: any) => ({
    _id: job._id ? job._id.toString() : "",
    title: job.title || "",
    address: job.address || "",
    jobType: job.jobType || "",
    requirementsCount: job.requirementsCount || 0,
    experienceYears: job.experienceYears || "",
    salary: job.salary || "",
    qualification: job.qualification || "",
    ctc: job.ctc || "",
    image: job.image || "",
    sections: job.sections ? JSON.parse(JSON.stringify(job.sections)) : [],
    status: job.status || "",
    creatorId: job.creatorId ? job.creatorId.toString() : "",
    creatorName: job.creatorName || "",
    reviewerId: job.reviewerId ? job.reviewerId.toString() : "",
    reviewerName: job.reviewerName || "",
    timeline: job.timeline ? JSON.parse(JSON.stringify(job.timeline)) : [],
    comments: job.comments ? JSON.parse(JSON.stringify(job.comments)) : [],
    createdAt: job.createdAt ? new Date(job.createdAt).toISOString() : null,
    updatedAt: job.updatedAt ? new Date(job.updatedAt).toISOString() : null,
  }));
 
  return (
    <main className="bg-slate-950 overflow-x-hidden">
      <Header />
      
      <section id="open-roles" className="min-h-screen text-slate-100 font-sans">
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          
          <section className="my-10">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10 border-b border-slate-800 pb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Open Positions
                </h2>
                <p className="mt-2 text-slate-400 text-sm sm:text-base">
                  Find your role in the AI revolution.
                </p>
              </div>
              <div className="self-start sm:self-center flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-xs text-slate-300 font-medium shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Hiring Now
              </div>
            </div>
            
            <JobListClient jobs={jobs} />
          </section>
      
        </div>
      </section>
      
      <FooterSection />
    </main>
  );
}

