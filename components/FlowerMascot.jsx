"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Mascotte fleur — cartoon « fun & soigné » (esprit Ribbit), pas flippant.
   Yeux brillants simples, sourire doux, mains moufles à pouce.
   Sort de derrière le logo héros, statique au repos ; au survol : se redresse,
   salue, et TOURNE la tête en 3/4 à droite puis à gauche (plusieurs sens). */

const rnd = (a, b) => a + Math.random() * (b - a);
const PETALS = Array.from({ length: 9 }, (_, i) => i * 40);

export default function FlowerMascot({ active = false, className = "" }) {
  const root = useRef(null);
  const pose = useRef(null);
  const loop = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const g = el.querySelector(".fm-all");
      const head = el.querySelector(".fm-head");
      const armW = el.querySelector(".fm-arm-wave");
      const armR = el.querySelector(".fm-arm-rest");
      const body = el.querySelector(".fm-body");
      const eyes = el.querySelectorAll(".fm-eye-g");

      const blink = () => gsap.to(eyes, { scaleY: 0.14, transformOrigin: "50% 50%", duration: 0.09, yoyo: true, repeat: 1,
        onComplete: () => gsap.delayedCall(rnd(2.8, 5.5), blink) });
      gsap.delayedCall(rnd(2, 4), blink);

      pose.current = gsap.timeline({ paused: true })
        .to(g, { y: -14, duration: 0.5, ease: "back.out(1.5)" }, 0)
        .to(armW, { rotation: -14, transformOrigin: "230px 250px", duration: 0.4, ease: "power2.out" }, 0)
        .to(armR, { rotation: 12, transformOrigin: "150px 250px", duration: 0.4, ease: "power2.out" }, 0);

      loop.current = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: "sine.inOut" } })
        .to(armW, { rotation: -34, transformOrigin: "230px 250px", duration: 0.32 }, 0)
        .to(armW, { rotation: -6, transformOrigin: "230px 250px", duration: 0.32 }, 0.32)
        .to(head, { scaleX: 0.9, rotation: 5, x: 7, transformOrigin: "190px 212px", duration: 0.75 }, 0)
        .to(head, { scaleX: 0.9, rotation: -5, x: -7, transformOrigin: "190px 212px", duration: 0.85 }, 0.85)
        .to(head, { scaleX: 1, rotation: 0, x: 0, transformOrigin: "190px 212px", duration: 0.55 }, 1.7)
        .to(body, { y: -6, duration: 0.45 }, 0)
        .to(body, { y: 0, duration: 0.45 }, 0.45);
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const p = pose.current, l = loop.current, el = root.current;
    if (!p || !l) return;
    if (active) { p.play(); l.play(); }
    else {
      l.pause();
      gsap.to(el.querySelector(".fm-head"), { scaleX: 1, rotation: 0, x: 0, duration: 0.35, ease: "power2.out" });
      gsap.to([el.querySelector(".fm-arm-wave"), el.querySelector(".fm-arm-rest")], { rotation: 0, duration: 0.35 });
      p.reverse();
    }
  }, [active]);

  return (
    <svg ref={root} viewBox="0 0 380 470" className={`fm ${className}`} aria-hidden="true">
      <defs>
        <radialGradient id="fm-petal" cx="36%" cy="28%" r="75%"><stop offset="0%" stopColor="#F9D589" /><stop offset="55%" stopColor="#E9A92E" /><stop offset="100%" stopColor="#C2851B" /></radialGradient>
        <radialGradient id="fm-face" cx="42%" cy="34%" r="74%"><stop offset="0%" stopColor="#FCEEDA" /><stop offset="62%" stopColor="#F2D9B6" /><stop offset="100%" stopColor="#E2C091" /></radialGradient>
        <radialGradient id="fm-body" cx="38%" cy="26%" r="82%"><stop offset="0%" stopColor="#B4D0BA" /><stop offset="55%" stopColor="#8BAF95" /><stop offset="100%" stopColor="#62856D" /></radialGradient>
        <linearGradient id="fm-limb" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0%" stopColor="#A6C8AE" /><stop offset="100%" stopColor="#7AA084" /></linearGradient>
        <radialGradient id="fm-hand" cx="36%" cy="30%" r="78%"><stop offset="0%" stopColor="#C2DAC8" /><stop offset="100%" stopColor="#7AA084" /></radialGradient>
        <filter id="fm-sh" x="-25%" y="-25%" width="150%" height="150%"><feDropShadow dx="0" dy="7" stdDeviation="9" floodColor="#1F1A16" floodOpacity="0.16" /></filter>
      </defs>

      <g className="fm-all" filter="url(#fm-sh)">
        {/* bras gauche levé */}
        <g className="fm-arm-rest">
          <path d="M152 250 Q106 196 90 124" stroke="url(#fm-limb)" strokeWidth="26" fill="none" strokeLinecap="round" />
          <circle cx="88" cy="116" r="22" fill="url(#fm-hand)" />
          <circle cx="68" cy="118" r="11" fill="url(#fm-hand)" />
        </g>

        {/* corps */}
        <path className="fm-body" d="M190 200 C142 206 128 254 138 306 C146 346 172 364 190 364 C208 364 234 346 242 306 C252 254 238 206 190 200 Z" fill="url(#fm-body)" />
        <ellipse cx="170" cy="252" rx="20" ry="28" fill="#C2DAC8" opacity="0.45" />

        {/* bras droit levé (salue) */}
        <g className="fm-arm-wave">
          <path d="M228 250 Q274 196 290 124" stroke="url(#fm-limb)" strokeWidth="26" fill="none" strokeLinecap="round" />
          <circle cx="292" cy="116" r="22" fill="url(#fm-hand)" />
          <circle cx="312" cy="118" r="11" fill="url(#fm-hand)" />
        </g>

        {/* tête fleur */}
        <g className="fm-head">
          {PETALS.map((a) => (<ellipse key={a} cx="190" cy="80" rx="23" ry="43" fill="url(#fm-petal)" transform={`rotate(${a} 190 152)`} />))}
          <circle cx="190" cy="152" r="62" fill="url(#fm-face)" />

          {/* joues */}
          <ellipse cx="156" cy="168" rx="12" ry="7.5" fill="#EF7BA9" opacity="0.42" />
          <ellipse cx="224" cy="168" rx="12" ry="7.5" fill="#EF7BA9" opacity="0.42" />
          {/* yeux brillants (simples, pas flippants) */}
          <g className="fm-eye-g">
            <ellipse cx="172" cy="150" rx="9" ry="11.5" fill="#2C2118" />
            <circle cx="169" cy="145.5" r="3.4" fill="#FFFFFF" />
            <circle cx="175" cy="153" r="1.5" fill="#FFFFFF" opacity="0.7" />
          </g>
          <g className="fm-eye-g">
            <ellipse cx="208" cy="150" rx="9" ry="11.5" fill="#2C2118" />
            <circle cx="205" cy="145.5" r="3.4" fill="#FFFFFF" />
            <circle cx="211" cy="153" r="1.5" fill="#FFFFFF" opacity="0.7" />
          </g>
          {/* sourire doux */}
          <path d="M173 171 Q190 185 207 171" stroke="#B85C4A" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
