"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* Perso EpC original (style designer-toy). Entrée après le logo, depuis l'angle,
   puis les bras se lèvent. Repos : tête suit la souris + clignement.
   Survol : 1 main à la taille + 1 main devant les yeux (regard au loin),
   expression qui change. Pas de rotation sur soi.
   Bras « élastiques » : la main vise une cible, le bras se tend jusqu'à elle. */

const ptr = { x: 0, y: 0 };
const lerp = THREE.MathUtils.lerp;
const UP = new THREE.Vector3(0, 1, 0);
const _d = new THREE.Vector3();
const _m = new THREE.Vector3();
const _q = new THREE.Quaternion();

const SH = { L: new THREE.Vector3(-0.5, 0.55, 0.12), R: new THREE.Vector3(0.5, 0.55, 0.12) };
const V = (x, y, z) => new THREE.Vector3(x, y, z);
const TGT = {
  down: { L: V(-0.58, -0.15, 0.22), R: V(0.58, -0.15, 0.22) },
  idle: { L: V(-1.02, 1.05, 0.28), R: V(1.02, 1.05, 0.28) },
  hover: { L: V(-0.44, 0.3, 0.52), R: V(0.16, 0.92, 0.98) }, // L = main à la taille · R = main devant les yeux
};

function gradTex(stops) {
  const c = document.createElement("canvas");
  c.width = 8; c.height = 256;
  const ctx = c.getContext("2d");
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  stops.forEach(([o, col]) => g.addColorStop(o, col));
  ctx.fillStyle = g; ctx.fillRect(0, 0, 8, 256);
  const t = new THREE.CanvasTexture(c);
  t.flipY = false; t.needsUpdate = true;
  return t;
}

function Eye({ x, pupils }) {
  return (
    <group position={[x, 0, 0]}>
      <mesh position={[0, 0, 0.02]} scale={[0.78, 1, 0.6]}><sphereGeometry args={[0.12, 24, 24]} /><meshStandardMaterial color="#ffffff" roughness={0.4} /></mesh>
      <group ref={pupils}>
        <mesh position={[0, -0.01, 0.09]} scale={[0.82, 1, 0.6]}><sphereGeometry args={[0.082, 22, 22]} /><meshStandardMaterial color="#3A2A22" roughness={0.3} /></mesh>
        <mesh position={[-0.03, 0.045, 0.16]}><sphereGeometry args={[0.032, 12, 12]} /><meshStandardMaterial color="#fff" roughness={0.2} /></mesh>
      </group>
      {[-0.5, -0.1, 0.3].map((a, i) => (
        <mesh key={i} position={[Math.sin(a) * 0.14, 0.12, 0.05]} rotation={[0, 0, -a]}>
          <capsuleGeometry args={[0.011, 0.1, 4, 8]} /><meshStandardMaterial color="#3A2A22" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Character({ activeRef, enteredRef }) {
  const grp = useRef();
  const head = useRef();
  const eyes = useRef();
  const pupL = useRef(); const pupR = useRef();
  const mSmile = useRef(); const mO = useRef();
  const boneL = useRef(); const boneR = useRef();
  const handL = useRef(); const handR = useRef();
  const curL = useRef(TGT.idle.L.clone());
  const curR = useRef(TGT.idle.R.clone());

  const capTex = useMemo(() => gradTex([[0, "#F8D27E"], [1, "#E39A2C"]]), []);
  const bodyTex = useMemo(() => gradTex([[0, "#EADBF6"], [0.5, "#C9B4EC"], [1, "#A38FCB"]]), []);
  const legTex = useMemo(() => gradTex([[0, "#EFB94A"], [0.5, "#F08DB4"], [1, "#BE96DC"]]), []);
  const skirtGeo = useMemo(() => {
    const pts = [[0.001, 0.86], [0.3, 0.7], [0.5, 0.44], [0.64, 0.14], [0.74, -0.18], [0.82, -0.44], [0.87, -0.58]]
      .map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(pts, 56);
  }, []);

  const arm = (boneRef, handRef, cur, sh, tgt) => {
    cur.lerp(tgt, 0.12);
    if (handRef.current) handRef.current.position.copy(cur);
    if (boneRef.current) {
      _d.subVectors(cur, sh);
      const dist = _d.length();
      _m.addVectors(sh, cur).multiplyScalar(0.5);
      boneRef.current.position.copy(_m);
      _q.setFromUnitVectors(UP, _d.normalize());
      boneRef.current.quaternion.copy(_q);
      boneRef.current.scale.set(1, dist, 1);
    }
  };

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const on = activeRef.current;
    const ent = enteredRef.current;
    const g = grp.current; if (!g) return;
    const pose = !ent ? TGT.down : (on ? TGT.hover : TGT.idle);
    arm(boneL, handL, curL.current, SH.L, pose.L);
    arm(boneR, handR, curR.current, SH.R, pose.R);

    g.position.y = -0.1 + Math.sin(t * 1.2) * 0.03;
    if (head.current) {
      head.current.rotation.y = lerp(head.current.rotation.y, on ? -0.13 : ptr.x * 0.55, 0.06);
      head.current.rotation.x = lerp(head.current.rotation.x, on ? 0.13 : -ptr.y * 0.3, 0.06);
    }
    if (eyes.current) eyes.current.scale.y = Math.sin(t * 1.6) > 0.985 ? 0.12 : 1;
    const px = on ? 0.045 : 0;
    [pupL, pupR].forEach((r) => { if (r.current) r.current.position.x = lerp(r.current.position.x, px, 0.1); });
    if (mSmile.current) mSmile.current.scale.setScalar(lerp(mSmile.current.scale.x, on ? 0.01 : 1, 0.2));
    if (mO.current) mO.current.scale.setScalar(lerp(mO.current.scale.x, on ? 1 : 0.01, 0.2));
  });

  const gold = <meshStandardMaterial color="#EBC25A" roughness={0.3} metalness={0.18} />;

  return (
    <group ref={grp} position={[0, -0.1, 0]} scale={0.82}>
      {/* jambes */}
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.32, -1.55, 0]} rotation={[0, 0, s * 0.04]}>
          <mesh><cylinderGeometry args={[0.15, 0.095, 2.7, 24, 1]} /><meshStandardMaterial map={legTex} roughness={0.32} /></mesh>
          <mesh position={[s * 0.05, -1.42, 0.12]} rotation={[0.5, 0, 0]} scale={[1, 1, 1.7]}><sphereGeometry args={[0.12, 18, 18]} /><meshStandardMaterial map={legTex} roughness={0.32} /></mesh>
        </group>
      ))}

      {/* bras élastiques (os + main) */}
      <mesh ref={boneL}><cylinderGeometry args={[0.075, 0.075, 1, 16]} />{gold}</mesh>
      <mesh ref={boneR}><cylinderGeometry args={[0.075, 0.075, 1, 16]} />{gold}</mesh>
      <mesh ref={handL}><sphereGeometry args={[0.145, 22, 22]} />{gold}</mesh>
      <mesh ref={handR}><sphereGeometry args={[0.145, 22, 22]} />{gold}</mesh>

      {/* jupe festonnée + ceinture */}
      <mesh geometry={skirtGeo}><meshStandardMaterial map={bodyTex} roughness={0.3} side={THREE.DoubleSide} /></mesh>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <mesh key={i} position={[Math.cos(a) * 0.84, -0.5, Math.sin(a) * 0.84]}><sphereGeometry args={[0.14, 16, 16]} /><meshStandardMaterial color="#A992D2" roughness={0.34} /></mesh>;
      })}
      <mesh position={[0, 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.44, 0.05, 14, 40]} /><meshStandardMaterial color="#E7D6F2" roughness={0.4} /></mesh>

      {/* tête */}
      <group ref={head} position={[0, 0.96, 0]}>
        <mesh scale={[1.06, 0.94, 0.96]}><sphereGeometry args={[0.62, 40, 40]} /><meshStandardMaterial map={capTex} roughness={0.34} /></mesh>
        {[-0.62, -0.2, 0.2, 0.62].map((a, i) => (
          <mesh key={i} position={[Math.sin(a) * 0.5, 0.4 + Math.cos(a) * 0.12, 0.18]} rotation={[0.3, 0, -a * 0.6]} scale={[0.5, 0.9, 0.5]}><sphereGeometry args={[0.16, 16, 16]} /><meshStandardMaterial color="#F2C461" roughness={0.34} /></mesh>
        ))}
        <mesh position={[0.06, 0.66, 0]} rotation={[0, 0, -0.4]} scale={[0.55, 1, 0.5]}><sphereGeometry args={[0.12, 18, 18]} /><meshStandardMaterial color="#BCA9DE" roughness={0.35} /></mesh>
        <mesh position={[0, -0.13, 0.4]} scale={[1.02, 0.66, 0.26]}><sphereGeometry args={[0.62, 36, 36]} /><meshStandardMaterial color="#F8E6CF" roughness={0.55} /></mesh>
        <mesh position={[-0.38, -0.17, 0.56]} scale={[1, 0.7, 0.45]}><sphereGeometry args={[0.13, 18, 18]} /><meshStandardMaterial color="#F4A6A6" roughness={0.7} /></mesh>
        <mesh position={[0.38, -0.17, 0.56]} scale={[1, 0.7, 0.45]}><sphereGeometry args={[0.13, 18, 18]} /><meshStandardMaterial color="#F4A6A6" roughness={0.7} /></mesh>
        <group ref={eyes} position={[0, -0.08, 0.62]}><Eye x={-0.19} pupils={pupL} /><Eye x={0.19} pupils={pupR} /></group>
        <mesh ref={mSmile} position={[0, -0.28, 0.64]} rotation={[0, 0, Math.PI]}><torusGeometry args={[0.06, 0.016, 12, 24, Math.PI]} /><meshStandardMaterial color="#9A4F3C" roughness={0.5} /></mesh>
        <mesh ref={mO} position={[0, -0.28, 0.64]} scale={0.01}><sphereGeometry args={[0.05, 18, 18]} /><meshStandardMaterial color="#8E4536" roughness={0.5} /></mesh>
      </group>
    </group>
  );
}

export default function FlowerMascot3D({ active = false, className = "" }) {
  const activeRef = useRef(active);
  activeRef.current = active;
  const enteredRef = useRef(false);
  useEffect(() => {
    const t = setTimeout(() => { enteredRef.current = true; }, 5000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`fm3d ${className}`}>
      <Canvas dpr={[1, 1.8]} camera={{ position: [0, 0, 6.6], fov: 38 }} gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none" }}
        onCreated={() => {
          window.addEventListener("mousemove", (e) => {
            ptr.x = (e.clientX / window.innerWidth) * 2 - 1;
            ptr.y = -((e.clientY / window.innerHeight) * 2 - 1);
          });
        }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 5]} intensity={1.7} />
        <directionalLight position={[-5, 1, 2]} intensity={0.6} color="#F2D8C2" />
        <Character activeRef={activeRef} enteredRef={enteredRef} />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={2} position={[4, 4, 4]} scale={9} color="#ffffff" />
          <Lightformer form="rect" intensity={1.1} position={[-5, 2, 3]} scale={7} color="#F6E4CC" />
          <Lightformer form="circle" intensity={1.2} position={[2, -3, 4]} scale={5} color="#F2D8C2" />
        </Environment>
      </Canvas>
    </div>
  );
}
