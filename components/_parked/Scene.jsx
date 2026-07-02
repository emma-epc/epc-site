"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Lightformer } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const ptr = { x: 0, y: 0 };
// gamme pastel « couture » — corail, lavande, ciel, pistache, miel
const stops = ["#F6B5A4", "#CAC3EF", "#A9C9EE", "#B7DCC2", "#F4D193"].map((c) => new THREE.Color(c));
function colorAt(p) {
  const n = stops.length - 1;
  const f = Math.min(Math.max(p, 0), 0.999) * n;
  const i = Math.floor(f);
  return stops[i].clone().lerp(stops[i + 1], f - i);
}

function Blob() {
  const ref = useRef();
  const mat = useRef();
  const tmp = new THREE.Color();
  useFrame((state, delta) => {
    const m = ref.current;
    if (!m) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;

    m.rotation.y += delta * 0.22;
    m.rotation.z += delta * 0.05;
    m.rotation.x = THREE.MathUtils.lerp(m.rotation.x, 0.25 + ptr.y * 0.4, 0.04);

    // petit accent joueur en marge droite (dégage le texte) + flottement/curseur
    const tx = 3.35 + Math.sin(p * Math.PI * 2.2) * 0.25 + ptr.x * 0.25;
    const ty = -0.35 + Math.sin(state.clock.elapsedTime * 0.5) * 0.16 + ptr.y * 0.16;
    const ts = 1.35 - Math.sin(p * Math.PI) * 0.12;
    m.position.x = THREE.MathUtils.lerp(m.position.x, tx, 0.045);
    m.position.y = THREE.MathUtils.lerp(m.position.y, ty, 0.045);
    m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, ts, 0.05));

    if (mat.current) {
      tmp.copy(colorAt(p));
      mat.current.color.lerp(tmp, 0.06);
      mat.current.distort = 0.34 + Math.sin(state.clock.elapsedTime * 0.6) * 0.1; // gelée vivante
    }
  });
  return (
    <mesh ref={ref} position={[3.35, -0.35, 0]} scale={1.35}>
      <icosahedronGeometry args={[1, 48]} />
      <MeshDistortMaterial ref={mat} color="#F6B5A4" distort={0.4} speed={1.4} roughness={0.34} metalness={0.16} clearcoat={0.6} clearcoatRoughness={0.4} envMapIntensity={0.9} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
      onCreated={() => {
        window.addEventListener("mousemove", (e) => {
          ptr.x = (e.clientX / window.innerWidth) * 2 - 1;
          ptr.y = -((e.clientY / window.innerHeight) * 2 - 1);
        });
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 4]} intensity={1.7} />
      <directionalLight position={[-6, -1, 2]} intensity={0.7} color="#CAC3EF" />
      <Blob />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={2.0} position={[4, 4, 4]} scale={9} color="#ffffff" />
        <Lightformer form="rect" intensity={1.2} position={[-5, 2, 3]} scale={7} color="#F6D7CC" />
        <Lightformer form="circle" intensity={1.4} position={[2, -3, 4]} scale={5} color="#CAC3EF" />
        <Lightformer form="rect" intensity={0.8} position={[0, 4, -3]} scale={8} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}
