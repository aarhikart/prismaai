"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

const initialForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

type ContactMessageFormProps = {
  eyebrow?: string;
  title: string;
  description: string;
  buttonLabel?: string;
  className?: string;
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function ContactMessageForm({
  eyebrow = "Contact us",
  title,
  description,
  buttonLabel = "Send Message",
  className = "",
}: ContactMessageFormProps) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof initialForm, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function validateForm() {
    const nextErrors: Partial<Record<keyof typeof initialForm, string>> = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!validateEmail(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Message is required.";
    } else if (form.message.trim().length < 20) {
      nextErrors.message = "Message must be at least 20 characters.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);
    setError("");
    setSuccess("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send message.");
      }

      setSuccess("Your message has been sent successfully.");
      setForm(initialForm);
      setErrors({});
    } catch (submitError) {
      const message = submitError instanceof Error ? submitError.message : "Unable to send message.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <article className={`rounded-[32px] border border-white/10 bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.3)] sm:p-8 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-700">{eyebrow}</p>
      <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-slate-950">{title}</h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
          />
          {errors.name ? <p className="text-xs font-medium text-rose-600">{errors.name}</p> : null}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Company name</span>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Enter your company name"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Email Address</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
          />
          {errors.email ? <p className="text-xs font-medium text-rose-600">{errors.email}</p> : null}
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Phone Number</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 000 000 0000"
            className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
          />
        </label>
        <label className="grid gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-slate-700">Message</span>
          <textarea
            rows={6}
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your workflow, team, and what you want to validate."
            className="rounded-[24px] border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500"
          />
          {errors.message ? <p className="text-xs font-medium text-rose-600">{errors.message}</p> : null}
        </label>

        {error ? (
          <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:col-span-2">{error}</p>
        ) : null}

        {success ? (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 sm:col-span-2">
            {success}
          </p>
        ) : null}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(90deg,#06b6d4_0%,#2563eb_100%)] px-6 py-3.5 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : buttonLabel}
          </button>
        </div>
      </form>
    </article>
  );
}
