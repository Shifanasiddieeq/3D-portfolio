"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Billboard, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { site, skills } from "@/data/portfolio";
import type { Tier } from "@/hooks/useDeviceTier";

const words = skills.flatMap((g) => g.items);

/** Fibonacci sphere distribution so tags are evenly spread. */
function spherePositions(n: number, radius: number) {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return pts;
}

function Word({ children, position, dark }: { children: string; position: [number, number, number]; dark: boolean }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);
  const accent = useMemo(() => `rgb(${site.accentSoft.split(" ").join(",")})`, []);

  useFrame(() => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    const target = hovered ? new THREE.Color(accent) : new THREE.Color(dark ? "#e2e8f0" : "#0f172a");
    mat.color.lerp(target, 0.15);
  });

  return (
    <Billboard position={position}>
      <Text
        ref={ref}
        fontSize={0.42}
        anchorX="center"
        anchorY="middle"
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {children}
      </Text>
    </Billboard>
  );
}

function Cloud({ dark, tier }: { dark: boolean; tier: Tier }) {
  const group = useRef<THREE.Group>(null);
  const radius = tier === "high" ? 4.2 : 3.4;
  const positions = useMemo(() => spherePositions(words.length, radius), [radius]);

  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.08;
  });

  return (
    <group ref={group}>
      {words.map((w, i) => (
        <Word key={w} position={positions[i]} dark={dark}>
          {w}
        </Word>
      ))}
    </group>
  );
}

export function SkillsSphere({ tier, dark }: { tier: Tier; dark: boolean }) {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 11], fov: 55 }} gl={{ alpha: true }} className="!absolute inset-0">
      <Suspense fallback={null}>
        <Cloud dark={dark} tier={tier} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.6} />
      </Suspense>
    </Canvas>
  );
}
