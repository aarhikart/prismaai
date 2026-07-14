"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const statusColors = {
  "Draft": "bg-slate-100 text-slate-700 border-slate-200",
  "Pending Review": "bg-amber-100 text-amber-700 border-amber-200",
  "Changes Requested": "bg-orange-100 text-orange-700 border-orange-200",
  "Approved": "bg-green-100 text-green-700 border-green-200",
  "Rejected": "bg-red-100 text-red-700 border-red-200",
  "Published": "bg-blue-100 text-blue-700 border-blue-200"
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
};

export default function JobDetailClient({ currentUser, initialJob }) {
  const router = useRouter();
  const [job, setJob] = useState(initialJob);
  const [reviewers, setReviewers] = useState([]);
  const [selectedReviewerId, setSelectedReviewerId] = useState(job.reviewerId || "");
  const [reviewComment, setReviewComment] = useState("");
  const [chatComment, setChatComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [actionSuccess, setActionSuccess] = useState("");

  async function reloadJob() {
    try {
      const res = await fetch(`/api/jobs/${job._id}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setJob(data);
        setSelectedReviewerId(data.reviewerId || "");
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    let active = true;
    async function loadReviewers() {
      try {
        const res = await fetch("/api/admin/users");
        if (res.ok && active) {
          const data = await res.json();
          const list = (data.users || []).filter((u) => u.role !== "Marketing");
          setReviewers(list);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadReviewers();
    return () => {
      active = false;
    };
  }, []);

  async function handleReviewAction(action) {
    setIsSubmitting(true);
    setActionError("");
    setActionSuccess("");

    if ((action === "reject" || action === "request_changes") && !reviewComment.trim()) {
      setActionError("Please provide an explanatory comment for this action.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`/api/jobs/${job._id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, comment: reviewComment }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to complete review action.");
      }

      setReviewComment("");
      setActionSuccess(`Job review state updated successfully: ${action}`);
      setJob(data);
      router.refresh();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleReassignReviewer() {
    setIsSubmitting(true);
    setActionError("");
    setActionSuccess("");

    if (!selectedReviewerId) {
      setActionError("Please select a new reviewer.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`/api/jobs/${job._id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reassign", reviewerId: selectedReviewerId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to reassign reviewer.");
      }

      setActionSuccess("Reviewer reassigned successfully.");
      setJob(data);
      router.refresh();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSendForReview() {
    setIsSubmitting(true);
    setActionError("");
    setActionSuccess("");

    if (!selectedReviewerId) {
      setActionError("Please select a reviewer before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`/api/jobs/${job._id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_for_review", reviewerId: selectedReviewerId, comment: "Resubmitted for review" }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to submit job for review.");
      }

      setActionSuccess("Job successfully submitted for review.");
      setJob(data);
      router.refresh();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handlePostComment(e) {
    e.preventDefault();
    if (!chatComment.trim()) return;

    setIsSubmitting(true);
    setActionError("");

    try {
      const res = await fetch(`/api/jobs/${job._id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatComment }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to post comment.");
      }

      setChatComment("");
      setJob(data);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const currentStatus = job.status || "Published";
  const statusBadge = (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold border ${statusColors[currentStatus] || "bg-slate-100 text-slate-700 border-slate-200"}`}>
      {currentStatus}
    </span>
  );

  const isAssignedReviewer = job.reviewerId && String(job.reviewerId) === String(currentUser?.id);
  const isAdmin = currentUser?.role === "Admin";
  const isCreator = String(job.creatorId) === String(currentUser?.id);

  const showReviewPanel = currentStatus === "Pending Review" && (isAssignedReviewer || isAdmin);
  const showAdminPanel = isAdmin;
  const showResubmitPanel = (isCreator || isAdmin) && (currentStatus === "Draft" || currentStatus === "Changes Requested");

  return (
    <div className="grid gap-8">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/jobs"
          className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-slate-900 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Jobs List
        </Link>
        <button
          type="button"
          onClick={reloadJob}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition shadow-sm"
        >
          Refresh Data
        </button>
      </div>

      {/* Header Info */}
      <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900">{job.title || "Untitled Job"}</h1>
            {statusBadge}
          </div>
          <p className="mt-2 text-slate-600 font-medium">{job.address || "No location specified"}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-500">
            <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1">
              Type: {job.jobType || "Full Time"}
            </span>
            <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1">
              Experience: {job.experienceYears || "N/A"}
            </span>
            <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1">
              Creator: {job.creatorName || "legacy user"}
            </span>
            {job.reviewerName && (
              <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1">
                Assigned Reviewer: {job.reviewerName}
              </span>
            )}
          </div>
        </div>

        {job.image && (
          <img
            src={job.image}
            alt={job.title || "Job logo"}
            className="h-24 w-40 object-cover rounded-2xl shadow-sm ring-1 ring-slate-200"
          />
        )}
      </div>

      {/* Feedback alerts */}
      {actionError && (
        <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700 border border-red-200 animate-fade-in">
          {actionError}
        </div>
      )}
      {actionSuccess && (
        <div className="rounded-2xl bg-green-50 p-4 text-sm font-semibold text-green-700 border border-green-200 animate-fade-in">
          {actionSuccess}
        </div>
      )}

      {/* Primary Split View */}
      <div className="grid gap-8 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-8">
          {/* Workflow Action Panels */}
          {showReviewPanel && (
            <div className="rounded-[2rem] bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm ring-1 ring-amber-200/50">
              <h2 className="text-xl font-bold text-slate-900">Assigned Review Action Panel</h2>
              <p className="mt-1 text-sm text-slate-500">
                You are assigned to review this posting. Review details, check timeline history, and make a decision below.
              </p>

              <div className="mt-4">
                <label className="block text-sm font-semibold text-slate-700">Reviewer Comment / Explanation</label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Explain why you are approving, requesting changes, or rejecting this job posting..."
                  rows="4"
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white p-4 outline-none transition focus:border-amber-500 shadow-sm"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleReviewAction("approve")}
                  className="rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                >
                  Approve Posting
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleReviewAction("request_changes")}
                  className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
                >
                  Request Changes
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleReviewAction("reject")}
                  className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  Reject Posting
                </button>
              </div>
            </div>
          )}

          {showResubmitPanel && (
            <div className="rounded-[2rem] bg-gradient-to-br from-sky-50 to-white p-6 shadow-sm ring-1 ring-sky-200/50">
              <h2 className="text-xl font-bold text-slate-900">Submit for Review Panel</h2>
              <p className="mt-1 text-sm text-slate-500">
                Submit this posting for administrative or peer review to begin the workflow progression.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 items-end">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Select Reviewer</span>
                  <select
                    value={selectedReviewerId}
                    onChange={(e) => setSelectedReviewerId(e.target.value)}
                    className="rounded-2xl border border-slate-300 p-3 outline-none transition focus:border-sky-500 bg-white shadow-sm text-sm"
                  >
                    <option value="">-- Choose Reviewer --</option>
                    {reviewers
                      .filter((r) => r.id !== currentUser?.id)
                      .map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.username} ({r.role})
                        </option>
                      ))}
                  </select>
                </label>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSendForReview}
                  className="rounded-2xl bg-sky-500 py-3.5 px-6 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:opacity-50"
                >
                  Submit for Approval
                </button>
              </div>
            </div>
          )}

          {showAdminPanel && (
            <div className="rounded-[2rem] bg-slate-50 p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Administrator Console</h2>
              <p className="mt-1 text-sm text-slate-500">
                Force reassign the reviewer to another HR or Admin user if needed.
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 items-end">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">Reassign Reviewer</span>
                  <select
                    value={selectedReviewerId}
                    onChange={(e) => setSelectedReviewerId(e.target.value)}
                    className="rounded-2xl border border-slate-300 p-3 outline-none transition focus:border-sky-500 bg-white shadow-sm text-sm"
                  >
                    <option value="">-- Select Reviewer --</option>
                    {reviewers.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.username} ({r.role})
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleReassignReviewer}
                  className="rounded-2xl bg-slate-950 py-3.5 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
                >
                  Reassign Reviewer
                </button>
              </div>
            </div>
          )}

          {/* Job Details Blocks */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">Job Description Preview</h2>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {[
                ["Salary Range", job.salary],
                ["Qualifications Required", job.qualification],
                ["CTC Offered", job.ctc],
                ["Requirements Count", job.requirementsCount],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{label}</p>
                  <p className="mt-1.5 font-bold text-slate-900">{value || "Not listed"}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6 pt-4">
              {job.sections?.map((section, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900">{section.title || `Section ${idx + 1}`}</h3>
                  <div className="my-3 h-px bg-slate-100" />
                  <p className="text-sm leading-7 text-slate-700 whitespace-pre-wrap">{section.description || "Empty description content."}</p>
                </div>
              ))}
              {(!job.sections || job.sections.length === 0) && (
                <p className="text-center text-slate-400 py-6 text-sm italic">No description sections added for this job.</p>
              )}
            </div>
          </div>
        </div>

        {/* Side panels (Timeline and Collaborative discussion) */}
        <div className="space-y-8">
          {/* Vertical timeline */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Activity Log Timeline</h2>

            <div className="mt-6 flow-root">
              <ul className="-mb-8">
                {(job.timeline || []).map((event, eventIdx) => (
                  <li key={eventIdx}>
                    <div className="relative pb-8">
                      {eventIdx !== (job.timeline.length - 1) ? (
                        <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true" />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 border border-sky-200 text-sky-700 text-xs font-bold ring-8 ring-white">
                            {eventIdx + 1}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900">{event.action}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            By {event.user} ({event.role})
                          </p>
                          {event.comment && (
                            <div className="mt-2 rounded-xl bg-slate-50 p-2 text-xs border border-slate-100 text-slate-600">
                              {event.comment}
                            </div>
                          )}
                          <p className="mt-1.5 text-[10px] text-slate-400" suppressHydrationWarning>
                            {formatDate(event.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {(!job.timeline || job.timeline.length === 0) && (
                  <p className="text-slate-400 py-4 text-sm text-center italic">No timeline logs found.</p>
                )}
              </ul>
            </div>
          </div>

          {/* Comments Discussion thread */}
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 flex flex-col h-[500px]">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Discussion Thread</h2>

            {/* Scrollable comments listing */}
            <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1 scrollbar-thin">
              {(job.comments || []).map((cmt, idx) => {
                const isMe = cmt.user === currentUser?.username;
                return (
                  <div key={idx} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm border ${
                      isMe 
                        ? "bg-slate-900 text-white border-slate-900" 
                        : "bg-slate-100 text-slate-800 border-slate-200"
                    }`}>
                      <p className="text-[10px] font-bold opacity-60 mb-1">
                        {cmt.user} ({cmt.role})
                      </p>
                      <p className="whitespace-pre-wrap leading-5">{cmt.message}</p>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 block px-1" suppressHydrationWarning>
                      {formatDate(cmt.date)}
                    </span>
                  </div>
                );
              })}
              {(!job.comments || job.comments.length === 0) && (
                <div className="flex h-full flex-col justify-center items-center text-slate-400 py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2 text-slate-300">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 18.09a5.967 5.967 0 01-.073-2.73c-.153-.517-.235-1.06-.235-1.62 0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  <p className="text-xs italic text-center">No comments yet. Start the conversation!</p>
                </div>
              )}
            </div>

            {/* Comment submission form */}
            <form onSubmit={handlePostComment} className="border-t border-slate-100 pt-4 mt-auto">
              <div className="flex gap-2">
                <textarea
                  value={chatComment}
                  onChange={(e) => setChatComment(e.target.value)}
                  placeholder="Post a message..."
                  rows="2"
                  required
                  className="flex-1 rounded-2xl border border-slate-300 bg-slate-50 px-4 py-2.5 outline-none transition focus:border-sky-500 shadow-inner text-sm resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-2xl bg-slate-900 px-4 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:opacity-50 h-auto self-end flex items-center justify-center p-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.437 6.4a.75.75 0 00.596.492l10.466 1.753a.75.75 0 010 1.416L5.585 15.158a.75.75 0 00-.596.492l-2.437 6.4a.75.75 0 00.926.94l18-9a.75.75 0 000-1.34L3.478 2.405z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
