"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

export default function JobApplyModal({
  jobId,
  jobTitle,
  buttonLabel = "Apply Now",
  buttonClassName = "",
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  function resetForm() {
    setForm(initialForm);
    setResume(null);
    setError("");
    setSuccess("");
  }

  function handleClose() {
    setOpen(false);
    resetForm();
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("roleTitle", jobTitle);

      if (resume) {
        formData.append("resume", resume);
      }

      const res = await fetch("/api/job-applications", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to submit application.");
      }

      setSuccess("Application submitted successfully.");
      setForm(initialForm);
      setResume(null);
    } catch (submitError) {
      setError(submitError.message || "Unable to submit application.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonClassName}
      >
        {buttonLabel}
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 px-4 py-8"
              onClick={handleClose}
            >
              <div
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">
                      Apply Now
                    </p>
                    <h2 className="mt-3 text-3xl font-bold text-slate-900">Join the team</h2>
                    <p className="mt-2 text-sm text-slate-500">
                      Submit your application for <span className="font-semibold">{jobTitle}</span>.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
                  >
                    Close
                  </button>
                </div>

                {success ? (
                  <div className="mt-8 rounded-[1.5rem] bg-emerald-50 px-6 py-8 text-center">
                    <h3 className="text-2xl font-bold text-emerald-700">Application submitted</h3>
                    <p className="mt-3 text-sm text-emerald-700/80">
                      Your application for {jobTitle} has been received successfully.
                    </p>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="mt-6 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-slate-700">First Name</span>
                        <input
                          type="text"
                          name="firstName"
                          value={form.firstName}
                          onChange={handleChange}
                          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                          required
                        />
                      </label>

                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-slate-700">Last Name</span>
                        <input
                          type="text"
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                          required
                        />
                      </label>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-slate-700">Email</span>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                          required
                        />
                      </label>

                      <label className="grid gap-2">
                        <span className="text-sm font-medium text-slate-700">Phone Number</span>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                          required
                        />
                      </label>
                    </div>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-slate-700">Role Title</span>
                      <input
                        type="text"
                        value={jobTitle}
                        readOnly
                        className="rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-500 outline-none"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium text-slate-700">Resume Upload</span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(event) => setResume(event.target.files?.[0] || null)}
                        className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                        required
                      />
                    </label>

                    {error ? (
                      <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
                    ) : null}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-400"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </button>
                  </form>
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
