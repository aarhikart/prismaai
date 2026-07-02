"use client";

import { useEffect, useState } from "react";

const initialSection = { title: "", description: "" };
const initialForm = {
  title: "",
  address: "",
  jobType: "Full Time",
  requirementsCount: "",
  experienceYears: "",
  salary: "",
  qualification: "",
  ctc: "",
};

export default function JobsClient() {
  const [form, setForm] = useState(initialForm);
  const [sections, setSections] = useState([{ ...initialSection }]);
  const [image, setImage] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadJobs() {
    const res = await fetch("/api/jobs", { cache: "no-store" });
    const data = await res.json();
    setJobs(data);
  }

  useEffect(() => {
    async function fetchJobs() {
      await loadJobs();
    }

    fetchJobs();
  }, []);

  function resetForm() {
    setForm(initialForm);
    setSections([{ ...initialSection }]);
    setImage(null);
    setEditId(null);
    setExistingImage("");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSectionChange(index, field, value) {
    setSections((current) =>
      current.map((section, sectionIndex) =>
        sectionIndex === index ? { ...section, [field]: value } : section
      )
    );
  }

  function addSection() {
    setSections((current) => [...current, { ...initialSection }]);
  }

  function removeSection(index) {
    setSections((current) => {
      if (current.length === 1) {
        return [{ ...initialSection }];
      }

      return current.filter((_, sectionIndex) => sectionIndex !== index);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("address", form.address);
      formData.append("jobType", form.jobType);
      formData.append("requirementsCount", form.requirementsCount);
      formData.append("experienceYears", form.experienceYears);
      formData.append("salary", form.salary);
      formData.append("qualification", form.qualification);
      formData.append("ctc", form.ctc);
      formData.append("sections", JSON.stringify(sections));

      if (image) {
        formData.append("image", image);
      }

      const endpoint = editId ? `/api/jobs/${editId}` : "/api/jobs";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to save job.");
      }

      await loadJobs();
      resetForm();
      setSuccess(editId ? "Job updated successfully." : "Job created successfully.");
    } catch (submitError) {
      setError(submitError.message || "Unable to save job.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(job) {
    setForm({
      title: job.title || "",
      address: job.address || "",
      jobType: job.jobType || "Full Time",
      requirementsCount: job.requirementsCount || "",
      experienceYears: job.experienceYears || "",
      salary: job.salary || "",
      qualification: job.qualification || "",
      ctc: job.ctc || "",
    });
    setSections(job.sections?.length ? job.sections : [{ ...initialSection }]);
    setEditId(job._id);
    setExistingImage(job.image || "");
    setImage(null);
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    setError("");
    setSuccess("");

    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unable to delete job.");
      return;
    }

    if (editId === id) {
      resetForm();
    }

    await loadJobs();
    setSuccess("Job deleted successfully.");
  }

  return (
    <div className="grid gap-8">
      <div className="rounded-[2rem] bg-[linear-gradient(120deg,#0f172a_0%,#1d4ed8_45%,#38bdf8_100%)] px-6 py-8 text-white shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-200">
          Hiring Operations
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Jobs Management</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-sky-100 sm:text-base">
          Create, edit, and publish jobs with multiple structured description blocks using the
          current API and database flow.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">{editId ? "Edit Job" : "Create Job"}</h2>
              <p className="mt-1 text-sm text-slate-500">
                Build a complete role profile with dynamic title and description sections.
              </p>
            </div>
            {editId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                Cancel Edit
              </button>
            ) : null}
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              ["title", "Job Title"],
              ["address", "Address"],
              ["requirementsCount", "Requirements Count"],
              ["experienceYears", "Experience Years"],
              ["salary", "Salary"],
              ["qualification", "Qualification"],
              ["ctc", "CTC"],
            ].map(([name, label]) => (
              <label key={name} className="grid gap-2">
                <span className="text-sm font-medium">{label}</span>
                <input
                  type="text"
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                />
              </label>
            ))}

            <label className="grid gap-2">
              <span className="text-sm font-medium">Job Type</span>
              <select
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
              >
                <option>Full Time</option>
                <option>Part Time</option>
              </select>
            </label>
          </div>

          <label className="mt-5 grid gap-2">
            <span className="text-sm font-medium">Image Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files?.[0] || null)}
              className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm"
            />
          </label>

          {existingImage ? (
            <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-3">
              <p className="mb-2 text-sm text-slate-500">Current image</p>
              <img
                src={existingImage}
                alt={form.title || "Current job"}
                className="h-48 w-full rounded-[1.5rem] object-cover"
              />
            </div>
          ) : null}

          <div className="mt-8 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold">Dynamic Sections</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Add multiple title and description blocks for responsibilities, benefits, and
                  requirements.
                </p>
              </div>
              <button
                type="button"
                onClick={addSection}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 text-2xl font-light text-white transition hover:bg-slate-900"
                aria-label="Add section"
              >
                +
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="rounded-[1.5rem] bg-white p-4 ring-1 ring-slate-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-500">
                      Section {index + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-xl text-red-600 transition hover:bg-red-500 hover:text-white"
                      aria-label={`Remove section ${index + 1}`}
                    >
                      -
                    </button>
                  </div>

                  <div className="mt-4 grid gap-4">
                    <label className="grid gap-2">
                      <span className="text-sm font-medium">Section Title</span>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(event) =>
                          handleSectionChange(index, "title", event.target.value)
                        }
                        className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm font-medium">Section Description</span>
                      <textarea
                        value={section.description}
                        onChange={(event) =>
                          handleSectionChange(index, "description", event.target.value)
                        }
                        rows="5"
                        className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error ? (
            <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          ) : null}

          {success ? (
            <p className="mt-5 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Saving..." : editId ? "Update Job" : "Add Job"}
          </button>
        </form>

        <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold">Quick Stats</h2>
          <div className="mt-6 grid gap-4">
            <div className="rounded-[1.75rem] bg-slate-900 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Total Jobs</p>
              <p className="mt-3 text-4xl font-bold">{jobs.length}</p>
            </div>
            <div className="rounded-[1.75rem] bg-sky-100 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Mode</p>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {editId ? "Editing" : "Creating"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Saved Jobs</h2>
            <p className="mt-1 text-sm text-slate-500">Added jobs appear here instantly after submit.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <article
              key={job._id}
              className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50"
            >
              {job.image ? (
                <img src={job.image} alt={job.title || "Job image"} className="h-56 w-full object-cover" />
              ) : (
                <div className="flex h-56 items-center justify-center bg-slate-200 text-slate-500">
                  No image
                </div>
              )}
              <div className="p-5">
                <h3 className="text-xl font-bold">{job.title || "Untitled Job"}</h3>
                <p className="mt-2 text-sm text-slate-500">{job.address || "No address added"}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                    {job.jobType || "Job Type"}
                  </span>
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                    {job.experienceYears || "Experience"}
                  </span>
                </div>
                <p className="mt-4 text-sm text-slate-600">{job.sections?.length || 0} detail sections</p>
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(job)}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(job._id)}
                    className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {jobs.length === 0 ? (
          <div className="mt-6 rounded-[1.75rem] border border-dashed border-slate-300 px-6 py-12 text-center text-slate-500">
            No jobs found yet. Add your first job from the form above.
          </div>
        ) : null}
      </section>
    </div>
  );
}
