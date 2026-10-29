"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { experience, site } from "@/data/portfolio";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const HeroScene = dynamic(() => import("@/components/canvas/HeroScene").then((m) => m.HeroScene), { ssr: false });

const current = experience.find((e) => e.current) ?? experience[0];

export function Hero() {
  const tier = useDeviceTier();
  const canvasWrap = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  // Scroll-driven camera: the scene drifts up and fades as the user scrolls into About.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(canvasWrap.current, {
        yPercent: -25,
        scale: 1.25,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(copy.current, {
        yPercent: 30,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "70% top", scrub: true },
      });
      gsap.fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.9, stagger: 0.12 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div ref={canvasWrap} className="absolute inset-0 -z-0">
        {tier && tier !== "none" ? (
          <HeroScene tier={tier} />
        ) : (
          <div className="absolute right-[10%] top-1/2 h-[50vmin] w-[50vmin] -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      <div ref={copy} className="section relative z-10 grid items-center gap-14 pb-16 pt-32 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="hero-sub eyebrow mb-6">{site.location}</p>
          <h1 className="font-display text-[14vw] font-semibold leading-[0.9] tracking-tighter sm:text-[9vw] lg:text-8xl">
            <SplitText text={site.firstName} className="block" />
            {/* Solid accent: the gradient's background-clip:text doesn't paint through the animated letters */}
            <SplitText text="Siddieeq" className="block text-accent" delay={0.25} />
          </h1>
          <p className="hero-sub mt-8 max-w-xl text-lg text-muted sm:text-xl">
            {site.title} — {site.tagline}. {site.summary.split(".")[0]}.
          </p>
          <div className="hero-sub mt-10 flex flex-wrap gap-4">
            <MagneticButton href="#projects">See my work</MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Get in touch
            </MagneticButton>
          </div>
        </div>

        {/* Portrait with a "currently" card overlapping its lower edge */}
        <div className="hero-sub relative mx-auto w-full max-w-sm lg:col-span-5 lg:mr-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line/10 shadow-glow">
            <Image
              src={site.portrait}
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="glass relative mx-4 -mt-20 rounded-2xl p-5 shadow-lg sm:mx-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Currently</p>
            <p className="mt-2 font-display text-lg font-semibold leading-tight">{current.role}</p>
            <p className="mt-1 text-sm text-muted">
              {current.company} · {current.location}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2 border-t border-line/10 pt-4">
              {site.coreStack.map((s) => (
                <li key={s} className="rounded-full border border-line/15 px-3 py-1 font-mono text-[11px] text-muted">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="hero-sub absolute bottom-8 left-1/2 hidden -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted lg:block">
        scroll
      </div>
    </section>
  );
}

export { ScrollTrigger };
