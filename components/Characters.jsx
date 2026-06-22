"use client";
import { useEffect, useId, useRef } from "react";
import gsap from "gsap";

/* ============================================================
   La troupe « Papiers » — personnages de dessin animé.
   VRAIE animation : cycle de marche (jambes en opposition,
   corps qui rebondit, balancement), yeux qui se baladent +
   clignent, et déambulation (les flottants se promènent).
   ============================================================ */

const PETALS7 = [0, 51.4, 102.8, 154.3, 205.7, 257.1, 308.6];
const PETALS6 = [0, 60, 120, 180, 240, 300];
const rnd = (a, b) => a + Math.random() * (b - a);

function useClayMotion({ walk = false } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const sway = root.querySelector(".ch-sway");
      const pupils = root.querySelectorAll(".ch-pupil");
      const eyes = root.querySelectorAll(".ch-eye-g");
      const arms = root.querySelectorAll(".ch-arm");
      const legs = root.querySelectorAll(".ch-leg");
      const body = root.querySelector(".ch-body");

      /* --- regard : pupilles qui se baladent + clignements --- */
      if (pupils.length) {
        const dart = () => gsap.to(pupils, { x: rnd(-2.4, 2.4), y: rnd(-1.8, 1.8), duration: 0.28, ease: "power2.out",
          onComplete: () => gsap.delayedCall(rnd(0.6, 1.9), dart) });
        gsap.delayedCall(rnd(0.2, 1), dart);
      }
      if (eyes.length) {
        const blink = () => gsap.to(eyes, { scaleY: 0.1, transformOrigin: "50% 50%", duration: 0.07, yoyo: true, repeat: 1, ease: "power1.inOut",
          onComplete: () => gsap.delayedCall(rnd(2.2, 5), blink) });
        gsap.delayedCall(rnd(1.2, 3), blink);
      }

      /* --- CYCLE DE MARCHE --- */
      const step = rnd(0.42, 0.56);
      legs.forEach((l, i) => gsap.fromTo(l, { rotation: i % 2 ? 26 : -26 }, { rotation: i % 2 ? -26 : 26,
        transformOrigin: "50% 0%", duration: step, ease: "sine.inOut", yoyo: true, repeat: -1 }));
      arms.forEach((a, i) => gsap.fromTo(a, { rotation: i % 2 ? -22 : 22 }, { rotation: i % 2 ? 22 : -22,
        transformOrigin: "50% 0%", duration: step, ease: "sine.inOut", yoyo: true, repeat: -1 }));
      if (body) {
        gsap.to(body, { y: -7, duration: step, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.to(body, { scaleY: 1.05, scaleX: 0.96, transformOrigin: "50% 100%", duration: step, ease: "sine.inOut", yoyo: true, repeat: -1 });
      }
      if (sway) gsap.to(sway, { rotation: 3, transformOrigin: "50% 92%", duration: step * 2, ease: "sine.inOut", yoyo: true, repeat: -1 });

      /* --- déambulation (flottants) : va-et-vient + retournement --- */
      if (walk) {
        const range = rnd(38, 92);
        let toggle = Math.random() < 0.5;
        const wander = () => {
          toggle = !toggle;
          const tx = toggle ? range : -range;
          gsap.to(root, { scaleX: tx < 0 ? -1 : 1, duration: 0.25, ease: "power1.inOut" });
          gsap.to(root, { x: tx, duration: rnd(2.4, 4.2), ease: "sine.inOut",
            onComplete: () => gsap.delayedCall(rnd(0.4, 1.3), wander) });
        };
        gsap.delayedCall(rnd(0.4, 1.8), wander);
      }
    }, ref);
    return () => ctx.revert();
  }, []);
  return ref;
}

function ClayDefs({ id, base, light, dark }) {
  return (
    <defs>
      <radialGradient id={`${id}-g`} cx="35%" cy="30%" r="75%">
        <stop offset="0%" stopColor={light} /><stop offset="55%" stopColor={base} /><stop offset="100%" stopColor={dark} />
      </radialGradient>
      <filter id={`${id}-s`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="3.5" stdDeviation="4" floodColor="#1F1A16" floodOpacity="0.20" />
      </filter>
    </defs>
  );
}
const Eye = ({ cx, cy, rx = 4.4, ry = 5.4 }) => (
  <g className="ch-eye-g">
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#FBF6EE" />
    <circle className="ch-pupil" cx={cx} cy={cy} r="2.4" fill="#241C17" />
    <circle cx={cx - 1} cy={cy - 1.5} r="0.9" fill="#fff" />
  </g>
);
const Brow = ({ x1, y1, x2, y2 }) => (
  <path d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 2.5} ${x2} ${y2}`} stroke="#9A4736" strokeWidth="1.7" fill="none" strokeLinecap="round" />
);

/* ---------- Pivoine — la fleur ---------- */
export function Pivoine({ size = 120, className = "", style, walk = false }) {
  const id = useId().replace(/:/g, "");
  const ref = useClayMotion({ walk });
  return (
    <svg ref={ref} viewBox="0 0 120 124" width={size} height={(size * 124) / 120} className={`ch ${className}`} style={style} aria-hidden="true">
      <ClayDefs id={id} base="#E9A92E" light="#F8D283" dark="#C2851B" />
      <radialGradient id={`${id}-c`} cx="38%" cy="32%" r="72%"><stop offset="0%" stopColor="#C2DAC7" /><stop offset="60%" stopColor="#92B29C" /><stop offset="100%" stopColor="#6E9079" /></radialGradient>
      <g className="ch-sway" filter={`url(#${id}-s)`}>
        <path className="ch-leg" d="M52 88 C48 104 46 112 47 120" stroke="#B85C4A" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path className="ch-leg" d="M68 88 C72 104 74 112 73 120" stroke="#B85C4A" strokeWidth="6" fill="none" strokeLinecap="round" />
        <g className="ch-body">
          {PETALS7.map((a) => (<ellipse key={a} cx="60" cy="29" rx="15" ry="26" fill={`url(#${id}-g)`} transform={`rotate(${a} 60 60)`} />))}
          <circle cx="60" cy="60" r="22" fill={`url(#${id}-c)`} />
        </g>
        <Brow x1="48.5" y1="51" x2="57" y2="50.5" /><Brow x1="63" y1="50.5" x2="71.5" y2="51" />
        <Eye cx="53" cy="59" /><Eye cx="67" cy="59" />
      </g>
    </svg>
  );
}

/* ---------- Onde — la vague ---------- */
export function Onde({ size = 130, className = "", style, walk = false }) {
  const id = useId().replace(/:/g, "");
  const ref = useClayMotion({ walk });
  const d = "M14 60 C30 22 52 22 62 58 C70 86 92 90 108 54";
  return (
    <svg ref={ref} viewBox="0 0 122 120" width={size} height={(size * 120) / 122} className={`ch ${className}`} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#F8B9CF" /><stop offset="50%" stopColor="#EF7BA9" /><stop offset="100%" stopColor="#D85F92" /></linearGradient>
        <filter id={`${id}-s`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="3.5" stdDeviation="4" floodColor="#1F1A16" floodOpacity="0.20" /></filter>
      </defs>
      <g className="ch-sway" filter={`url(#${id}-s)`}>
        <path className="ch-leg" d="M50 84 C48 100 47 108 48 116" stroke="#B85C4A" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <path className="ch-leg" d="M66 84 C68 100 69 108 68 116" stroke="#B85C4A" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <path className="ch-arm" d="M96 60 C108 66 116 70 119 78" stroke="#B85C4A" strokeWidth="5.5" fill="none" strokeLinecap="round" />
        <g className="ch-body">
          <path d={d} stroke={`url(#${id}-g)`} strokeWidth="27" fill="none" strokeLinecap="round" />
          <path d={d} stroke="#FBC9DC" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.5" transform="translate(0 -5)" />
        </g>
        <Eye cx="40" cy="44" /><Eye cx="52" cy="44" />
      </g>
    </svg>
  );
}

/* ---------- Astre — l'étoile ---------- */
export function Astre({ size = 116, className = "", style, walk = false }) {
  const id = useId().replace(/:/g, "");
  const ref = useClayMotion({ walk });
  const star = "M60 16 L71 40.95 L98.1 38 L82 60 L98.1 82 L71 79.05 L60 104 L49 79.05 L21.9 82 L38 60 L21.9 38 L49 40.95 Z";
  return (
    <svg ref={ref} viewBox="0 0 120 122" width={size} height={(size * 122) / 120} className={`ch ${className}`} style={style} aria-hidden="true">
      <ClayDefs id={id} base="#E2C9A6" light="#F6E7CC" dark="#C9A878" />
      <g className="ch-sway" filter={`url(#${id}-s)`}>
        <path className="ch-leg" d="M50 92 C46 104 44 112 45 119" stroke="#B85C4A" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path className="ch-leg" d="M70 92 C74 104 76 112 75 119" stroke="#B85C4A" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path className="ch-body" d={star} fill={`url(#${id}-g)`} stroke="#C99A63" strokeWidth="2" strokeLinejoin="round" />
        <Brow x1="48.5" y1="50" x2="57" y2="49.5" /><Brow x1="63" y1="49.5" x2="71.5" y2="50" />
        <Eye cx="53" cy="58" /><Eye cx="67" cy="58" />
      </g>
    </svg>
  );
}

/* ---------- Galet — le galet ---------- */
export function Galet({ size = 118, className = "", style, walk = false }) {
  const id = useId().replace(/:/g, "");
  const ref = useClayMotion({ walk });
  const blob = "M60 12 C88 12 106 30 106 58 C106 90 86 108 60 108 C34 108 16 88 16 58 C16 30 32 12 60 12 Z";
  return (
    <svg ref={ref} viewBox="0 0 120 124" width={size} height={(size * 124) / 120} className={`ch ${className}`} style={style} aria-hidden="true">
      <ClayDefs id={id} base="#BCA9DE" light="#E0D5F2" dark="#9A86C2" />
      <g className="ch-sway" filter={`url(#${id}-s)`}>
        <path className="ch-leg" d="M48 100 C44 110 42 116 43 122" stroke="#B85C4A" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path className="ch-leg" d="M72 100 C76 110 78 116 77 122" stroke="#B85C4A" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path className="ch-body" d={blob} fill={`url(#${id}-g)`} />
        <Brow x1="44.5" y1="48" x2="55" y2="47.5" /><Brow x1="65" y1="47.5" x2="75.5" y2="48" />
        <Eye cx="52" cy="56" /><Eye cx="68" cy="56" />
      </g>
    </svg>
  );
}

/* ---------- PivoineFace — fleur compacte (nav fermée) ---------- */
export function PivoineFace({ size = 40, className = "", style }) {
  const id = useId().replace(/:/g, "");
  const ref = useClayMotion();
  return (
    <svg ref={ref} viewBox="0 0 64 64" width={size} height={size} className={`ch ${className}`} style={style} aria-hidden="true">
      <ClayDefs id={id} base="#E9A92E" light="#F8D283" dark="#C2851B" />
      <radialGradient id={`${id}-c`} cx="38%" cy="32%" r="72%"><stop offset="0%" stopColor="#C2DAC7" /><stop offset="60%" stopColor="#92B29C" /><stop offset="100%" stopColor="#6E9079" /></radialGradient>
      <g className="ch-sway" filter={`url(#${id}-s)`}>
        <g className="ch-body">{PETALS6.map((a) => (<ellipse key={a} cx="32" cy="16" rx="7.5" ry="13" fill={`url(#${id}-g)`} transform={`rotate(${a} 32 32)`} />))}
          <circle cx="32" cy="32" r="13" fill={`url(#${id}-c)`} /></g>
        <g className="ch-eye-g"><ellipse cx="27.5" cy="32" rx="2.9" ry="3.6" fill="#FBF6EE" /><circle className="ch-pupil" cx="27.5" cy="32" r="1.7" fill="#241C17" /></g>
        <g className="ch-eye-g"><ellipse cx="36.5" cy="32" rx="2.9" ry="3.6" fill="#FBF6EE" /><circle className="ch-pupil" cx="36.5" cy="32" r="1.7" fill="#241C17" /></g>
      </g>
    </svg>
  );
}

/* ---------- NavEye — visage vert + 1 œil (nav ouverte) ---------- */
export function NavEye({ size = 34, flip = false, className = "", style }) {
  const id = useId().replace(/:/g, "");
  const ref = useClayMotion();
  return (
    <svg ref={ref} viewBox="0 0 44 44" width={size} height={size} className={`ch ${className}`} style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }} aria-hidden="true">
      <radialGradient id={`${id}-c`} cx="38%" cy="30%" r="74%"><stop offset="0%" stopColor="#C2DAC7" /><stop offset="58%" stopColor="#92B29C" /><stop offset="100%" stopColor="#6E9079" /></radialGradient>
      <filter id={`${id}-s`} x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#1F1A16" floodOpacity="0.18" /></filter>
      <g filter={`url(#${id}-s)`}>
        <circle cx="22" cy="22" r="18" fill={`url(#${id}-c)`} />
        <g className="ch-eye-g">
          <ellipse cx="22" cy="22" rx="7" ry="8.5" fill="#FBF6EE" />
          <circle className="ch-pupil" cx="22" cy="22" r="3.8" fill="#241C17" />
          <circle cx="20" cy="19.5" r="1.4" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}
