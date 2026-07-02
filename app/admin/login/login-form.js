"use client";

import { useState, useTransition } from "react";

const initialState = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "Unable to log in.");
      return;
    }

    startTransition(() => {
      window.location.replace("/admin");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Username</span>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-cyan-500"
          placeholder="Enter your username"
          suppressHydrationWarning
          required
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Password</span>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 placeholder:text-slate-400 outline-none transition focus:border-cyan-500"
          placeholder="Enter your password"
          suppressHydrationWarning
          required
        />
      </label>

      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-slate-400"
        suppressHydrationWarning
      >
        {isPending ? "Redirecting..." : "Login to Dashboard"}
      </button>
    </form>
  );
}
