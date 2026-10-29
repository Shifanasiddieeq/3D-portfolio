"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.documentElement.classList.add("has-cursor");

    const d = dot.current!;
    const r = ring.current!;
    const xTo = gsap.quickTo(r, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(r, "y", { duration: 0.35, ease: "power3" });

    const move = (e: MouseEvent) => {
      gsap.set(d, { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("a, button, [data-hover]");
      gsap.to(r, { scale: t ? 2.2 : 1, opacity: t ? 0.5 : 1, duration: 0.3 });
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dot} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent [.has-cursor_&]:block" />
      <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/70 mix-blend-difference [.has-cursor_&]:block" />
    </>
  );
}
