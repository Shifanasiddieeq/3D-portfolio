"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = React.ComponentPropsWithoutRef<"a"> & { variant?: "solid" | "ghost" };

export function MagneticButton({ children, className = "", variant = "solid", ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * 0.35, y: y * 0.35, duration: 0.4, ease: "power3" });
  };
  const onLeave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });

  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300";
  const styles =
    variant === "solid"
      ? "bg-accent text-white hover:shadow-glow"
      : "border border-line/20 hover:border-accent hover:text-accent";

  return (
    <a ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </a>
  );
}
