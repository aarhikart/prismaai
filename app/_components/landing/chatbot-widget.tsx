"use client";

import { FormEvent, useMemo, useState } from "react";

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const quickPrompts = [
  "Tell me about Prism.ai",
  "Which products do you offer?",
  "I need a proof of concept",
  "How can I contact sales?",
];

const productLinks = [
  { label: "Gryscan", href: "/gryscan" },
  { label: "GrySec", href: "/grysec" },
  { label: "Gryfas", href: "/gryfas" },
  { label: "Verifive", href: "/verifive" },
];

function buildBotReply(message: string) {
  const value = message.toLowerCase();

  if (value.includes("product") || value.includes("offer") || value.includes("solution")) {
    return "Prism.ai builds enterprise AI systems across security, verification, analytics, and automation. You can explore Gryscan, GrySec, Gryfas, and Verifive from the product links below.";
  }

  if (value.includes("poc") || value.includes("proof") || value.includes("demo")) {
    return "For a proof of concept, share your use case, expected users, data sources, and timeline. The team can scope a focused pilot from there.";
  }

  if (value.includes("contact") || value.includes("sales") || value.includes("call")) {
    return "You can reach the team through the contact page or use the site contact form. Include your company, role, and the outcome you want to achieve.";
  }

  if (value.includes("price") || value.includes("cost") || value.includes("pricing")) {
    return "Pricing depends on product scope, deployment model, integrations, and support needs. A short discovery call is the best way to estimate it accurately.";
  }

  if (value.includes("job") || value.includes("career") || value.includes("hiring")) {
    return "Open roles and company culture details are available on the jobs page. You can review positions and apply directly there.";
  }

  return "I can help you find Prism.ai products, request a proof of concept, contact the team, or point you to careers and company information.";
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: "bot",
      text: "Hi, I am Prism Assistant. Ask about products, POCs, pricing, careers, or how to contact the team.",
    },
  ]);

  const latestBotMessage = useMemo(
    () => [...messages].reverse().find((message) => message.role === "bot")?.text,
    [messages],
  );

  const sendMessage = (text: string) => {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => {
      const nextId = current.length + 1;

      return [
        ...current,
        { id: nextId, role: "user", text: trimmed },
        { id: nextId + 1, role: "bot", text: buildBotReply(trimmed) },
      ];
    });
    setInput("");
    setOpen(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open ? (
        <section
          aria-label="Prism assistant chat"
          className="w-[calc(100vw-2rem)] max-w-[23rem] overflow-hidden rounded-[24px] border border-cyan-300/20 bg-slate-950/95 shadow-[0_24px_90px_rgba(2,6,23,0.62)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 text-sm font-semibold text-cyan-100">
                AI
              </span>
              <div>
                <h2 className="font-display text-sm font-semibold text-white">Prism Assistant</h2>
                <p className="text-xs text-cyan-100/70">Online now</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-lg leading-none text-slate-200 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="max-h-[23rem] space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-cyan-300 text-slate-950"
                      : "border border-white/10 bg-white/[0.04] text-slate-200"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2 pt-1">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-xs leading-5 text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {latestBotMessage?.includes("product links") ? (
              <div className="flex flex-wrap gap-2">
                {productLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-2 text-xs font-medium text-cyan-100 transition hover:bg-cyan-300 hover:text-slate-950"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-white/10 p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question"
              className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50"
            />
            <button
              type="submit"
              className="rounded-2xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white"
            >
              Send
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="group flex items-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_70px_rgba(34,211,238,0.28)] transition hover:bg-white"
        aria-label={open ? "Close Prism assistant" : "Open Prism assistant"}
        aria-expanded={open}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs text-cyan-100 transition group-hover:bg-cyan-950">
          AI
        </span>
        <span>Chat</span>
      </button>
    </div>
  );
}
