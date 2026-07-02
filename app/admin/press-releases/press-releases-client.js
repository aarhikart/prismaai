"use client";

import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  liveUrl: "",
};

export default function PressReleasesClient() {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [pressReleases, setPressReleases] = useState([]);
  const [editId, setEditId] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadPressReleases() {
    const res = await fetch("/api/press-releases", { cache: "no-store" });
    const data = await res.json();
    setPressReleases(data);
  }

  useEffect(() => {
    async function fetchPressReleases() {
      await loadPressReleases();
    }

    fetchPressReleases();
  }, []);

  function resetForm() {
    setForm(initialForm);
    setImage(null);
    setEditId(null);
    setExistingImage("");
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("liveUrl", form.liveUrl);

      if (image) {
        formData.append("image", image);
      }

      const endpoint = editId ? `/api/press-releases/${editId}` : "/api/press-releases";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed.");
      }

      await loadPressReleases();
      resetForm();
      setSuccess(
        editId
          ? "Press release updated successfully."
          : "Press release created successfully."
      );
    } catch (submitError) {
      setError(submitError.message || "Unable to save press release.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(pressRelease) {
    setForm({
      title: pressRelease.title || "",
      description: pressRelease.description || "",
      liveUrl: pressRelease.liveUrl || "",
    });
    setEditId(pressRelease._id);
    setExistingImage(pressRelease.image || "");
    setImage(null);
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    setError("");
    setSuccess("");

    const res = await fetch(`/api/press-releases/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unable to delete press release.");
      return;
    }

    if (editId === id) {
      resetForm();
    }

    await loadPressReleases();
    setSuccess("Press release deleted successfully.");
  }

  return (
    <div className="grid gap-8">
      <div className="rounded-3xl bg-gradient-to-r from-sky-500 via-cyan-300 to-emerald-300 px-6 py-8 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-900/75">
          Brand Communications
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Press Release Management</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-900/80 sm:text-base">
          Add, edit, and remove press releases while preserving your current MongoDB-backed flow.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">
                {editId ? "Edit Press Release" : "Create Press Release"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Fill the form and save to update the press releases collection.
              </p>
            </div>
            {editId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
              >
                Cancel Edit
              </button>
            ) : null}
          </div>

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium">Press Release Title</span>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter press release title"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Press Release Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write a short press release description"
                rows="5"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Live Press Release URL</span>
              <input
                type="url"
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                placeholder="https://example.com/press-release"
                className="rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">
                {editId ? "Replace Image (optional)" : "Upload Image"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm"
                required={!editId}
              />
            </label>

            {existingImage ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-sm text-slate-500">Current image</p>
                <img
                  src={existingImage}
                  alt={form.title || "Current press release"}
                  className="h-40 w-full rounded-2xl object-cover"
                />
              </div>
            ) : null}

            {error ? (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            ) : null}

            {success ? (
              <p className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">{success}</p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting
                ? "Saving..."
                : editId
                  ? "Update Press Release"
                  : "Add Press Release"}
            </button>
          </div>
        </form>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-semibold">Quick Stats</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                Total Press Releases
              </p>
              <p className="mt-3 text-4xl font-bold">{pressReleases.length}</p>
            </div>
            <div className="rounded-3xl bg-sky-100 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Mode</p>
              <p className="mt-3 text-2xl font-bold text-slate-900">
                {editId ? "Editing" : "Creating"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Saved Press Releases</h2>
            <p className="mt-1 text-sm text-slate-500">
              Newly created or updated press releases appear here immediately.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {pressReleases.map((pressRelease) => (
            <article
              key={pressRelease._id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50"
            >
              <img
                src={pressRelease.image}
                alt={pressRelease.title}
                className="h-52 w-full object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold">{pressRelease.title}</h3>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">
                  {pressRelease.description}
                </p>
                <a
                  href={pressRelease.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full border border-sky-500 px-4 py-2 text-sm font-semibold text-sky-600 transition hover:bg-sky-500 hover:text-white"
                >
                  View Live Press Release
                </a>
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(pressRelease)}
                    className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(pressRelease._id)}
                    className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {pressReleases.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-slate-300 px-6 py-12 text-center text-slate-500">
            No press releases found yet. Add your first press release from the form above.
          </div>
        ) : null}
      </section>
    </div>
  );
}
