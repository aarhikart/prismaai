"use client";

import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  liveUrl: "",
};

export default function ArticlesClient() {
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState(null);
  const [articles, setArticles] = useState([]);
  const [editId, setEditId] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadArticles() {
    const res = await fetch("/api/articles", { cache: "no-store" });
    const data = await res.json();
    setArticles(data);
  }

  useEffect(() => {
    async function fetchArticles() {
      await loadArticles();
    }

    fetchArticles();
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

      const endpoint = editId ? `/api/articles/${editId}` : "/api/articles";
      const method = editId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Request failed.");
      }

      await loadArticles();
      resetForm();
      setSuccess(editId ? "Article updated successfully." : "Article created successfully.");
    } catch (submitError) {
      setError(submitError.message || "Unable to save article.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleEdit(article) {
    setForm({
      title: article.title || "",
      description: article.description || "",
      liveUrl: article.liveUrl || "",
    });
    setEditId(article._id);
    setExistingImage(article.image || "");
    setImage(null);
    setError("");
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    setError("");
    setSuccess("");

    const res = await fetch(`/api/articles/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Unable to delete article.");
      return;
    }

    if (editId === id) {
      resetForm();
    }

    await loadArticles();
    setSuccess("Article deleted successfully.");
  }

  return (
    <div className="grid gap-8">
      <div className="rounded-3xl bg-gradient-to-r from-orange-500 via-amber-400 to-lime-300 px-6 py-8 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-900/75">
          Content Operations
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Articles Management</h1>
        <p className="mt-2 max-w-2xl text-sm text-stone-900/80 sm:text-base">
          Add, edit, and remove articles while keeping the existing database structure and CRUD
          flow intact.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">
                {editId ? "Edit Article" : "Create Article"}
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                Fill the form and save to update the articles collection.
              </p>
            </div>
            {editId ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-900 hover:text-stone-900"
              >
                Cancel Edit
              </button>
            ) : null}
          </div>

          <div className="mt-6 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-medium">Article Title</span>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter article title"
                className="rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-orange-500"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Article Description</span>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Write a short article description"
                rows="5"
                className="rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-orange-500"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Live Article URL</span>
              <input
                type="url"
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                placeholder="https://example.com/article"
                className="rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-orange-500"
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
                className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-sm"
                required={!editId}
              />
            </label>

            {existingImage ? (
              <div className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
                <p className="mb-2 text-sm text-stone-500">Current image</p>
                <img
                  src={existingImage}
                  alt={form.title || "Current article"}
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
              className="rounded-2xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-stone-400"
            >
              {isSubmitting ? "Saving..." : editId ? "Update Article" : "Add Article"}
            </button>
          </div>
        </form>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-2xl font-semibold">Quick Stats</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-stone-900 p-5 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">Total Articles</p>
              <p className="mt-3 text-4xl font-bold">{articles.length}</p>
            </div>
            <div className="rounded-3xl bg-orange-100 p-5">
              <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Mode</p>
              <p className="mt-3 text-2xl font-bold text-stone-900">
                {editId ? "Editing" : "Creating"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Saved Articles</h2>
            <p className="mt-1 text-sm text-stone-500">
              Newly created or updated articles appear here immediately.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article._id}
              className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-50"
            >
              <img src={article.image} alt={article.title} className="h-52 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="mt-3 line-clamp-4 text-sm leading-6 text-stone-600">
                  {article.description}
                </p>
                <a
                  href={article.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full border border-orange-500 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-500 hover:text-white"
                >
                  View Live Article
                </a>
                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleEdit(article)}
                    className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(article._id)}
                    className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {articles.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-stone-300 px-6 py-12 text-center text-stone-500">
            No articles found yet. Add your first article from the form above.
          </div>
        ) : null}
      </section>
    </div>
  );
}
