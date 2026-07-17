"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import JobApplyModal from "@/app/jobs/_components/job-apply-modal";

interface Job {
  _id: string;
  title: string;
  address: string;
  jobType: string;
  requirementsCount: number;
  experienceYears: string;
  salary: string;
  qualification: string;
  ctc: string;
  image: string;
  sections: any[];
  status: string;
  creatorId: string;
  creatorName: string;
  reviewerId: string;
  reviewerName: string;
  timeline: any[];
  comments: any[];
  createdAt: string | null;
  updatedAt: string | null;
}

interface JobListClientProps {
  jobs: Job[];
}

export default function JobListClient({ jobs }: JobListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // Get unique job types for the filter pills
  const jobTypes = useMemo(() => {
    const types = new Set<string>();
    jobs.forEach((job) => {
      // Only include types from public jobs
      const isPublic = !job.status || ["Approved", "Published"].includes(job.status);
      if (isPublic && job.jobType) {
        types.add(job.jobType);
      }
    });
    return ["All", ...Array.from(types)];
  }, [jobs]);

  // Filter jobs based on search term, selected type, and public status
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Status check (Public only)
      const isPublic = !job.status || ["Approved", "Published"].includes(job.status);
      if (!isPublic) return false;

      // 2. Search term check (title, address/location, qualification)
      const matchesSearch =
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.qualification?.toLowerCase().includes(searchTerm.toLowerCase());

      // 3. Job type check
      const matchesType = selectedType === "All" || job.jobType === selectedType;

      return matchesSearch && matchesType;
    });
  }, [jobs, searchTerm, selectedType]);

  return (
    <div>
      {/* Search and Filters */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-12">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search roles, locations, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-800 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 items-center">
          {jobTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                selectedType === type
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900/40 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Job Cards */}
      {filteredJobs.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <article
              key={job._id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-slate-900/30 border border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/40 hover:shadow-[0_20px_50px_rgba(6,182,212,0.1)]"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Job Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
                  {job.image ? (
                    <img
                      src={job.image}
                      alt={job.title || "Job image"}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-600">
                      <svg
                        className="h-12 w-12 opacity-40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  {/* Job Type Badge */}
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md">
                    {job.jobType || "Opportunity"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white transition duration-300 group-hover:text-cyan-400 line-clamp-1">
                    {job.title || "Untitled Job"}
                  </h3>

                  {/* Location */}
                  <div className="flex items-center gap-2 mt-3 text-slate-400 text-sm">
                    <svg
                      className="h-4 w-4 text-cyan-500 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="line-clamp-1">{job.address || "Remote / Office"}</span>
                  </div>

                  {/* Details Quick View Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800/80">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                        Experience
                      </span>
                      <span className="text-sm font-semibold text-slate-300 block mt-1">
                        {job.experienceYears || "Not specified"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                        Salary / CTC
                      </span>
                      <span className="text-sm font-semibold text-slate-300 block mt-1">
                        {job.ctc || job.salary || "Best in Industry"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-4 mt-auto">
                <Link
                  href={`/jobs/${job._id}`}
                  className="flex-1 text-center py-2.5 rounded-xl border border-slate-800 text-sm font-medium text-slate-300 transition duration-300 hover:bg-slate-800 hover:text-white"
                >
                  View Details
                </Link>
                <JobApplyModal
                  jobId={job._id}
                  jobTitle={job.title || "Untitled Job"}
                  buttonLabel="Apply"
                  buttonClassName="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-white shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 text-center"
                />
              </div>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mt-12 rounded-[2rem] border border-dashed border-slate-800 bg-slate-900/10 px-6 py-20 text-center backdrop-blur-sm">
          <svg
            className="mx-auto h-16 w-16 text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-bold text-slate-300">No positions found</h3>
          <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
            We couldn't find any job openings matching your search criteria. Try adjusting your filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedType("All");
            }}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-800 text-sm font-medium text-slate-300 hover:bg-slate-900 transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
