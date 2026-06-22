"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/* ============================================================
   Logo EpC reconstruit en SVG animable.
   - L'anneau (baseline + formes Matisse) tourne en continu.
   - Les formes « éclosent » : grossissent / prennent l'espace
     puis reviennent (intro + pulsation idle), en GSAP.
   - Le cœur « EpC » reste fixe et lisible.
   ============================================================ */

const C = { terra: "#B85C4A", moutarde: "#E9A92E", rose: "#EF7BA9", lilas: "#BCA9DE", sauge: "#92B29C", sable: "#E2C9A6", cream: "#FBF6EE" };
const FL = [0, 72, 144, 216, 288];

function MiniFlower({ c1, c2 }) {
  return (<g>{FL.map((a) => (<ellipse key={a} cx="0" cy="-11" rx="5" ry="11" fill={c1} transform={`rotate(${a})`} />))}<circle r="6" fill={c2} /></g>);
}
function MiniStar({ c1 }) {
  return <path d="M0 -16 L5 -5 L16 0 L5 5 L0 16 L-5 5 L-16 0 L-5 -5 Z" fill={c1} />;
}
function MiniSquiggle({ c1 }) {
  return <path d="M-16 5 C-8 -10 -3 12 5 -2 C9 -9 14 -6 17 1" stroke={c1} strokeWidth="7" fill="none" strokeLinecap="round" />;
}
function MiniDot({ c1 }) {
  return (<g><circle r="9" fill={c1} /><circle cx="-2.5" cy="-2.5" r="2.4" fill={C.cream} opacity=".55" /></g>);
}

const DECO = [
  { x: 468, y: 300, t: "flower", c1: C.moutarde, c2: C.sauge },
  { x: 445, y: 384, t: "dot", c1: C.rose },
  { x: 384, y: 446, t: "star", c1: C.sable },
  { x: 300, y: 468, t: "squiggle", c1: C.lilas },
  { x: 216, y: 446, t: "flower", c1: C.rose, c2: C.cream },
  { x: 155, y: 384, t: "dot", c1: C.sauge },
  { x: 132, y: 300, t: "star", c1: C.moutarde },
  { x: 155, y: 216, t: "squiggle", c1: C.terra },
  { x: 216, y: 154, t: "flower", c1: C.lilas, c2: C.moutarde },
  { x: 300, y: 132, t: "dot", c1: C.terra },
  { x: 384, y: 154, t: "star", c1: C.sauge },
  { x: 445, y: 216, t: "squiggle", c1: C.moutarde },
];

function Shape({ t, c1, c2 }) {
  if (t === "flower") return <MiniFlower c1={c1} c2={c2} />;
  if (t === "star") return <MiniStar c1={c1} />;
  if (t === "squiggle") return <MiniSquiggle c1={c1} />;
  return <MiniDot c1={c1} />;
}

export default function LogoHero({ className = "" }) {
  const ring = useRef(null);
  const root = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const blooms = root.current.querySelectorAll(".bloom");
    if (reduce) { gsap.set(blooms, { scale: 1, opacity: 1 }); return; }

    const ctx = gsap.context(() => {
      gsap.to(ring.current, { rotation: 360, svgOrigin: "300 300", duration: 52, ease: "none", repeat: -1 });
      gsap.set(blooms, { transformOrigin: "50% 50%" });
      const tl = gsap.timeline({ delay: 0.35 });
      tl.from(blooms, { scale: 0, opacity: 0, duration: 0.85, ease: "back.out(2.2)", stagger: { each: 0.045, from: "random" } })
        .to(blooms, { scale: 1.24, duration: 1.5, ease: "sine.inOut", stagger: { each: 0.11, from: "center", repeat: -1, yoyo: true } }, "+=0.25");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={`logohero ${className}`}>
      <svg viewBox="0 0 600 600" className="logo-svg" role="img" aria-label="Logo EpC — Une présence digitale qui vous ressemble">
        <defs>
          <path id="ringpath" d="M300 60 a240 240 0 1 1 -0.1 0" fill="none" />
        </defs>

        <g ref={ring} className="logo-ring">
          <circle cx="300" cy="300" r="250" fill="none" stroke="rgba(184,92,74,.28)" strokeWidth="1.4" />
          <text className="ring-text">
            <textPath href="#ringpath" startOffset="0">
              Une présence digitale qui vous ressemble&nbsp;&nbsp;·&nbsp;&nbsp;Une présence digitale qui vous ressemble&nbsp;&nbsp;·&nbsp;&nbsp;
            </textPath>
          </text>
          {DECO.map((d, i) => (
            <g key={i} className="bloom" transform={`translate(${d.x} ${d.y})`}>
              <Shape t={d.t} c1={d.c1} c2={d.c2} />
            </g>
          ))}
        </g>

        <g className="logo-core">
          <circle cx="300" cy="300" r="118" fill={C.cream} />
          <text x="300" y="352" textAnchor="middle" className="core-text">EpC</text>
        </g>
      </svg>
    </div>
  );
}
