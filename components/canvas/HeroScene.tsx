"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { CanvasLoader } from "./CanvasLoader";
import type { Tier } from "@/hooks/useDeviceTier";
import { site } from "@/data/portfolio";

function accentColor() {
  const [r, g, b] = site.accent.split(" ").map(Number);
  return new THREE.Color(r / 255, g / 255, b / 255);
}

/**
 * Glossy liquid blob that drifts toward the mouse and spins slowly.
 * Sits to the right of the hero text on wide screens and tucks into the top-right corner on phones.
 */
function Blob({ tier }: { tier: Tier }) {
  const mesh = useRef<THREE.Mesh>(null);
  const target = useRef(new THREE.Vector2());
  const color = useMemo(accentColor, []);
  const { viewport } = useThree();

  const wide = viewport.aspect > 1.1;
  const baseX = viewport.width * (wide ? 0.24 : 0.32);
  const baseY = wide ? 0 : viewport.height * 0.24;
  const scale = wide ? 1.15 : 0.7;

  useFrame((state, dt) => {
    const m = mesh.current;
    if (!m) return;
    target.current.lerp(state.pointer, 0.05);
    m.rotation.y += dt * 0.15;
    m.rotation.x = target.current.y * 0.35;
    m.rotation.z = target.current.x * 0.35;
    m.position.x = THREE.MathUtils.lerp(m.position.x, baseX + target.current.x * 0.3, 0.05);
    m.position.y = THREE.MathUtils.lerp(m.position.y, baseY + target.current.y * 0.2, 0.05);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh} scale={scale} position={[baseX, baseY, 0]}>
        <icosahedronGeometry args={[1, tier === "high" ? 64 : 24]} />
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={1.6}
          roughness={0.08}
          // Low tier has no environment map, and metal with nothing to reflect renders muddy
          metalness={tier === "high" ? 0.25 : 0}
          envMapIntensity={0.9}
        />
      </mesh>
    </Float>
  );
}

/** Slowly rotating particle field behind the blob. */
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
        {/* Low tier skips the studio environment, so it needs more fill light to match */}
        <ambientLight intensity={tier === "high" ? 0.4 : 1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -3, -5]} intensity={2} color={accentColor()} />
        <Blob tier={tier} />
        <Particles count={tier === "high" ? 1400 : 500} />
        {/* Soft studio reflections; "city" made the blob look like dark glass on the light theme */}
        {tier === "high" && <Environment preset="studio" />}
        <Rig />
      </Suspense>
    </Canvas>
  );
}
