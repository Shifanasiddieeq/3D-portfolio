"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { skills } from "@/data/portfolio";
import { Reveal } from "@/components/ui/Reveal";
import { useDeviceTier } from "@/hooks/useDeviceTier";

const SkillsSphere = dynamic(() => import("@/components/canvas/SkillsSphere").then((m) => m.SkillsSphere), { ssr: false });

export function Skills() {
  const tier = useDeviceTier();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted ? resolvedTheme !== "light" : true;

  return (
    <section id="skills" className="section">
      <Reveal>
        <p className="eyebrow mb-4">Skills</p>
        <h2 className="h2">Tools I reach for.</h2>
      </Reveal>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <Reveal className="relative aspect-square w-full max-w-[560px] justify-self-center">
          {tier && tier !== "none" ? (
            <SkillsSphere tier={tier} dark={dark} />
          ) : (
            <div className="flex h-full w-full flex-wrap content-center justify-center gap-2">
              {skills.flatMap((g) => g.items).map((s) => (
                <span key={s} className="glass rounded-full px-3 py-1 text-sm">
                  {s}
                </span>
              ))}
            </div>
          )}
          <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
            drag to rotate
          </p>
        </Reveal>

        <div className="space-y-6">
          {skills.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.06}>
              <div className="flex flex-col gap-2 border-b border-line/10 pb-5 sm:flex-row sm:items-baseline sm:gap-8">
                <h3 className="w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-accent">{g.name}</h3>
                <p className="text-muted">{g.items.join(" · ")}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
