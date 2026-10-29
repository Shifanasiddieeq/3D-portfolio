"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
};

/** Splits text into characters and reveals them from below on mount. */
export function SplitText({ text, as: Tag = "span", className = "", delay = 0, stagger = 0.03 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const chars = ref.current?.querySelectorAll(".split-char");
    if (!chars?.length) return;
    gsap.to(chars, { y: 0, opacity: 1, duration: 1, delay, stagger, ease: "power4.out" });
  }, [delay, stagger]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden align-bottom">
          {word.split("").map((ch, ci) => (
            <span key={ci} className="split-char" aria-hidden>
              {ch}
            </span>
          ))}
          {wi < text.split(" ").length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
