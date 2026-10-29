"use client";

import { useEffect, useState } from "react";

export type Tier = "high" | "low" | "none";

/**
 * Decides how heavy the 3D scenes can be.
 * - "high": desktop with decent hardware
 * - "low":  mobile / weak GPU → simplified scenes
 * - "none": reduced-motion or no WebGL → static fallback
 */
export function useDeviceTier(): Tier | null {
  const [tier, setTier] = useState<Tier | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return setTier("none");

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return setTier("none");

    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency ?? 4;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

    setTier(isMobile || cores <= 4 || mem <= 4 ? "low" : "high");
  }, []);

  return tier;
}
