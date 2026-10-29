"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { site } from "@/data/portfolio";
import { SplitText } from "@/components/ui/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const HeroScene = dynamic(() => import("@/components/canvas/HeroScene").then((m) => m.HeroScene), { ssr: false });

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
          <div className="absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-3xl" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
      </div>

      <div ref={copy} className="section relative z-10 pb-16 pt-32">
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
        </div>
      </div>

      <div className="hero-sub absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
        scroll
      </div>
    </section>
  );
}

export { ScrollTrigger };
