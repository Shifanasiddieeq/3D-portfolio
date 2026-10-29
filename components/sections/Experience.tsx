"use client";

import { useEffect, useRef } from "react";
import { experience } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { gsap } from "@/lib/gsap";

export function Experience() {
  const line = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: wrap.current, start: "top 70%", end: "bottom 70%", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="section">
      <Reveal>
        <p className="eyebrow mb-4">Experience</p>
        <h2 className="h2">Where I&apos;ve worked.</h2>
      </Reveal>

      <div ref={wrap} className="relative mt-16 pl-8 md:pl-0">
        <div className="absolute left-[7px] top-0 h-full w-px bg-line/10 md:left-1/2" />
        <div ref={line} className="absolute left-[7px] top-0 h-full w-px bg-accent md:left-1/2" />

        <ol className="space-y-16">
          {experience.map((job, i) => (
            <li key={job.company} className="relative md:grid md:grid-cols-2 md:gap-16">
              <span className="absolute -left-8 top-2 h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg md:left-1/2 md:-translate-x-1/2">
                {job.current && <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />}
              </span>

              <Reveal className={i % 2 === 0 ? "md:text-right" : "md:col-start-2"}>
                <p className="font-mono text-xs uppercase tracking-widest text-muted">{job.period}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{job.role}</h3>
                <p className="text-accent">
                  {job.company} · <span className="text-muted">{job.location}</span>
                </p>
                <ul className={`mt-4 space-y-2 text-muted ${i % 2 === 0 ? "md:ml-auto" : ""} max-w-md`}>
                  {job.bullets.map((b) => (
                    <li key={b} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
