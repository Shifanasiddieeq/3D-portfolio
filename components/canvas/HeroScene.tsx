"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { CanvasLoader } from "./CanvasLoader";
import type { Tier } from "@/hooks/useDeviceTier";
import { site } from "@/data/portfolio";

function accentColor() {
  const [r, g, b] = site.accent.split(" ").map(Number);
  return new THREE.Color(r / 255, g / 255, b / 255);
}

/** Slowly rotating particle field behind the hero. */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.02;
    ref.current.rotation.x = state.pointer.y * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      {/* Accent-coloured so the particles show on both light and dark backgrounds */}
      <PointMaterial transparent color={accentColor()} size={0.025} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  );
}

function Rig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.5, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.3, 0.03);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene({ tier }: { tier: Tier }) {
  return (
    <Canvas
      dpr={tier === "high" ? [1, 2] : [1, 1.25]}
      camera={{ position: [0, 0, 6], fov: 40 }}
      gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <Suspense fallback={<CanvasLoader />}>
        <Particles count={tier === "high" ? 1400 : 500} />
        <Rig />
      </Suspense>
    </Canvas>
  );
}
