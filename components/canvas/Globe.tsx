"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { site } from "@/data/portfolio";

// Dubai: 25.2°N, 55.3°E
const LAT = 25.2;
const LON = 55.3;

function latLonToVec3(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

function Sphere() {
  const group = useRef<THREE.Group>(null);
  const [r, g, b] = site.accent.split(" ").map((n) => Number(n) / 255);
  const accent = useMemo(() => new THREE.Color(r, g, b), [r, g, b]);
  const marker = useMemo(() => latLonToVec3(LAT, LON, 1.52), []);
  const ringQuat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), marker.clone().normalize()),
    [marker],
  );
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.12;
    if (ring.current) {
      const s = 1 + (Math.sin(state.clock.elapsedTime * 3) + 1) * 0.6;
      ring.current.scale.setScalar(s);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = 1.2 - s * 0.5;
    }
  });

  // Face Dubai toward the camera at start
  const initialRot = useMemo(() => -((LON + 180) * Math.PI) / 180 + Math.PI / 2, []);

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={group} rotation={[0.3, initialRot, 0]}>
        <mesh>
          <sphereGeometry args={[1.5, 48, 48]} />
          <meshStandardMaterial color={accent} wireframe transparent opacity={0.18} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.47, 32, 32]} />
          <meshStandardMaterial color="#000" transparent opacity={0.35} roughness={1} />
        </mesh>
        <group position={marker}>
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={accent} />
          </mesh>
          <mesh ref={ring} quaternion={ringQuat}>
            <ringGeometry args={[0.07, 0.09, 32]} />
            <meshBasicMaterial color={accent} transparent side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

export function Globe() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.2], fov: 45 }} gl={{ alpha: true }} className="!absolute inset-0">
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1} />
        <Sphere />
      </Suspense>
    </Canvas>
  );
}
