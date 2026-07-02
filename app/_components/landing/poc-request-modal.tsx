"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

const INDUSTRY_OPTIONS = [
  "Banking & Financial Services",
  "Insurance",
  "Healthcare",
  "Life Sciences",
  "Retail & Ecommerce",
  "Manufacturing",
  "Logistics & Supply Chain",
  "Telecommunications",
  "Government & Public Sector",
  "Technology & SaaS",
];

const JOURNEY_STEPS = [
  {
    title: "Reach Out",
    description: "Tell us about your needs. We respond within one business day.",
  },
  {
    title: "Understand",
    description: "We schedule a focused call to map your challenges and goals.",
  },
  {
    title: "POC",
    description: "A tailored proof of concept designed for your operations.",
  },
  {
    title: "Validate",
    description: "Live deployment in your environment with measurable outcomes.",
  },
  {
    title: "Go Live",
    description: "Full rollout with ongoing optimization and dedicated support.",
  },
];

const initialForm = {
  fullName: "",
  email: "",
  company: "",
  message: "",
};

type FormState = typeof initialForm;
type FormErrors = Partial<Record<keyof FormState | "industry", string>>;

function validateForm(form: FormState, industry: string) {
  const nextErrors: FormErrors = {};

  if (!form.fullName.trim()) {
    nextErrors.fullName = "Full name is required.";
  }

  if (!form.email.trim()) {
    nextErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!form.company.trim()) {
    nextErrors.company = "Company name is required.";
  }

  if (!industry.trim()) {
    nextErrors.industry = "Select an industry.";
  }

  if (form.message.trim() && form.message.trim().length < 10) {
    nextErrors.message = "Message must be at least 10 characters or left empty.";
  }

  return nextErrors;
}

function FieldError({ error }: { error?: string }) {
  if (!error) {
    return null;
  }

  return <p className="text-xs font-medium text-rose-400">{error}</p>;
}

function IndustrySelect({
  value,
  error,
  onChange,
}: {
  value: string;
  error?: string;
  onChange: (nextIndustry: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-13 rounded-xl border border-cyan-400/15 bg-[#141920] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
      >
        <option value="" className="bg-slate-900 text-slate-400">
          Select your industry
        </option>
        {INDUSTRY_OPTIONS.map((industry) => (
          <option key={industry} value={industry} className="bg-slate-900 text-white">
            {industry}
          </option>
        ))}
      </select>
      <FieldError error={error} />
    </div>
  );
}

export function PocRequestModal({
  buttonLabel = "Book POC",
  buttonClassName = "",
  onOpen,
}: {
  buttonLabel?: string;
  buttonClassName?: string;
  onOpen?: () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [industry, setIndustry] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
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
    setIndustry("");
    setErrors({});
    setError("");
    setSuccess("");
  }

  function handleClose() {
    setOpen(false);
    resetForm();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(form, industry);
    setErrors(nextErrors);
    setError("");
    setSuccess("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/poc-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          industry,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit POC request.");
      }

      setSuccess("Your POC request has been submitted successfully.");
      setForm(initialForm);
      setIndustry("");
      setErrors({});
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Unable to submit POC request.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onOpen?.();
          setOpen(true);
        }}
        className={buttonClassName}
      >
        {buttonLabel}
      </button>

      {open && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-sm"
              onClick={handleClose}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className="relative max-h-[92vh] w-full max-w-[1020px] overflow-y-auto rounded-[18px] border border-cyan-400/10 bg-[#0b1120] shadow-[0_40px_140px_rgba(2,6,23,0.78)]"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-5 top-4 z-10 text-xl text-slate-500 transition hover:text-cyan-200"
                  aria-label="Close POC request modal"
                >
                  ×
                </button>

                <div className="grid lg:grid-cols-[0.47fr_0.53fr]">
                  <section className="border-b border-cyan-400/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_28%),linear-gradient(180deg,#111827_0%,#0f172a_100%)] px-7 py-8 text-white lg:border-b-0 lg:border-r lg:border-cyan-400/10 lg:px-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-cyan-300">
                      Journey to smart surveillance
                    </p>

                    <div className="mt-8 space-y-0">
                      {JOURNEY_STEPS.map((step, index) => (
                        <div key={step.title} className="grid grid-cols-[20px_1fr] gap-4">
                          <div className="flex flex-col items-center">
                            <span className="h-4 w-4 rotate-45 border border-cyan-400/70 bg-transparent" />
                            {index < JOURNEY_STEPS.length - 1 ? (
                              <span className="my-1 h-16 w-px bg-cyan-400/35" />
                            ) : null}
                          </div>

                          <div className={index < JOURNEY_STEPS.length - 1 ? "pb-5" : ""}>
                            <p className="text-[1.08rem] font-semibold text-cyan-300">
                              {step.title}
                            </p>
                            <p className="mt-1 max-w-xs text-sm leading-7 text-slate-400">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="px-7 py-8 sm:px-8">
                    {success ? (
                      <div className="flex min-h-[560px] flex-col items-center justify-center rounded-[18px] border border-emerald-500/25 bg-emerald-500/8 px-6 text-center">
                        <h3 className="text-3xl font-semibold text-white">Request submitted</h3>
                        <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                          Your POC request is saved and visible only inside the admin POC Requests
                          page.
                        </p>
                        <button
                          type="button"
                          onClick={handleClose}
                          className="mt-8 inline-flex rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
                        >
                          Close
                        </button>
                      </div>
                    ) : (
                      <>
                        <h2
                          id={titleId}
                          className="text-[2.05rem] font-semibold tracking-[-0.04em] text-white"
                        >
                          Request a POC
                        </h2>
                        <p
                          id={descriptionId}
                          className="mt-3 max-w-lg text-[1.02rem] leading-8 text-slate-400"
                        >
                          See how AI-powered video intelligence can transform your operations.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
                          <label className="grid gap-2">
                            <span className="text-sm font-semibold text-white">Full Name</span>
                            <input
                              type="text"
                              name="fullName"
                              value={form.fullName}
                              onChange={handleChange}
                              placeholder="Your Name"
                              className="min-h-13 rounded-xl border border-cyan-400/15 bg-[#141920] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50"
                            />
                            <FieldError error={errors.fullName} />
                          </label>

                          <label className="grid gap-2">
                            <span className="text-sm font-semibold text-white">Email</span>
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="name@example.com"
                              className="min-h-13 rounded-xl border border-cyan-400/15 bg-[#141920] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50"
                            />
                            <FieldError error={errors.email} />
                          </label>

                          <label className="grid gap-2">
                            <span className="text-sm font-semibold text-white">Company</span>
                            <input
                              type="text"
                              name="company"
                              value={form.company}
                              onChange={handleChange}
                              placeholder="Company Name"
                              className="min-h-13 rounded-xl border border-cyan-400/15 bg-[#141920] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50"
                            />
                            <FieldError error={errors.company} />
                          </label>

                          <div className="grid gap-2">
                            <span className="text-sm font-semibold text-white">Industry</span>
                            <IndustrySelect
                              value={industry}
                              error={errors.industry}
                              onChange={(nextIndustry) => {
                                setIndustry(nextIndustry);
                                setErrors((current) => ({ ...current, industry: undefined }));
                              }}
                            />
                          </div>

                          <label className="grid gap-2">
                            <span className="text-sm font-semibold text-white">
                              Message <span className="font-normal text-slate-400">(optional)</span>
                            </span>
                            <textarea
                              rows={4}
                              name="message"
                              value={form.message}
                              onChange={handleChange}
                              placeholder="Tell us briefly about your use case or requirements..."
                              className="rounded-xl border border-cyan-400/15 bg-[#141920] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50"
                            />
                            <FieldError error={errors.message} />
                          </label>

                          {error ? (
                            <p className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
                              {error}
                            </p>
                          ) : null}

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <span>{isSubmitting ? "Submitting..." : "Get Your POC"}</span>
                            <span aria-hidden="true">→</span>
                          </button>
                        </form>
                      </>
                    )}
                  </section>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
