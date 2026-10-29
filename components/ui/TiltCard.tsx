"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = React.ComponentPropsWithoutRef<"div"> & { max?: number };

export function TiltCard({ children, className = "", max = 8, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, {
      rotateY: px * max,
      rotateX: -py * max,
      transformPerspective: 900,
      duration: 0.4,
      ease: "power2",
    });
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  const onLeave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3" });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-hover
      className={`relative [transform-style:preserve-3d] will-change-transform ${className}`}
      {...rest}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgb(var(--accent) / 0.18), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
