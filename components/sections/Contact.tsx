"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { site } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useDeviceTier } from "@/hooks/useDeviceTier";

const Globe = dynamic(() => import("@/components/canvas/Globe").then((m) => m.Globe), { ssr: false });

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const tier = useDeviceTier();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Grab the form now: React clears e.currentTarget once we await
    const form = e.currentTarget;
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  const input = "w-full rounded-2xl border border-line/10 bg-card/40 px-4 py-3 outline-none transition focus:border-accent";

  return (
    <section id="contact" className="section">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Contact</p>
            <h2 className="h2">Let&apos;s build something.</h2>
            <p className="mt-6 max-w-md text-lg text-muted">
              Based in {site.location}. Drop a line about a role, a project, or just to say hi.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="mt-10 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="name" required placeholder="Your name" className={input} aria-label="Your name" />
                <input name="email" type="email" required placeholder="Email" className={input} aria-label="Email" />
              </div>
              <textarea name="message" required rows={4} placeholder="What's on your mind?" className={input} aria-label="Message" />
              <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:shadow-glow disabled:opacity-50"
                >
                  {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send message"}
                </button>
                {status === "error" && <p className="text-sm text-red-400">Something went wrong — email me directly instead.</p>}
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticButton href={`mailto:${site.email}`} variant="ghost">
                Email
              </MagneticButton>
              <MagneticButton href={site.github} variant="ghost" target="_blank" rel="noopener">
                GitHub
              </MagneticButton>
              <MagneticButton href={site.linkedin} variant="ghost" target="_blank" rel="noopener">
                LinkedIn
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        <Reveal className="relative aspect-square w-full max-w-md justify-self-center">
          {tier && tier !== "none" ? (
            <Globe />
          ) : (
            <div className="absolute inset-[15%] rounded-full border border-accent/30" />
          )}
        </Reveal>
      </div>
    </section>
  );
}
