"use client";
import { useEffect, useId, useRef } from "react";

/* Le « rond vert avec les yeux » — version épurée de la mascotte pour la nav.
   Plus de pétales, pas de bulle blanche : juste le disque vert (dégradé logo)
   et deux yeux dont les PUPILLES suivent la souris. L'orbe ne bouge pas tout
   seul ; seuls les yeux vivent (suivi souris + clignement occasionnel). */
export default function EyesOrb({ size = 60, className = "", style }) {
  const id = useId().replace(/:/g, "");
  const svg = useRef(null);
  const pL = useRef(null);
  const pR = useRef(null);
  const eyes = useRef(null);

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.matchMedia("(pointer:coarse)").matches) return;

    let tx = 0, ty = 0, x = 0, y = 0, raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const MAX = 2.4; // amplitude des pupilles (unités viewBox)

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      let dx = e.clientX - cx, dy = e.clientY - cy;
      const d = Math.hypot(dx, dy) || 1;
      const m = Math.min(1, d / 240); // s'oriente fort de près, posé de loin
      tx = (dx / d) * MAX * m;
      ty = (dy / d) * MAX * m;
    };
    const tick = () => {
      x = lerp(x, tx, 0.18); y = lerp(y, ty, 0.18);
      if (pL.current) { pL.current.setAttribute("cx", 25 + x); pL.current.setAttribute("cy", 32 + y); }
      if (pR.current) { pR.current.setAttribute("cx", 39 + x); pR.current.setAttribute("cy", 32 + y); }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    // clignement discret
    let t1;
    const blink = () => {
      if (!eyes.current) return;
      eyes.current.style.transform = "scaleY(0.12)";
      eyes.current.style.transformOrigin = "50% 50%";
      setTimeout(() => { if (eyes.current) eyes.current.style.transform = "scaleY(1)"; }, 110);
      t1 = setTimeout(blink, 2600 + Math.random() * 3200);
    };
    t1 = setTimeout(blink, 2200 + Math.random() * 2000);

    return () => { cancelAnimationFrame(raf); clearTimeout(t1); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <svg ref={svg} viewBox="0 0 64 64" width={size} height={size} className={`eyesorb ${className}`} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-c`} cx="38%" cy="30%" r="74%">
          <stop offset="0%" stopColor="#C2DAC7" /><stop offset="58%" stopColor="#92B29C" /><stop offset="100%" stopColor="#6E9079" />
        </radialGradient>
        <filter id={`${id}-s`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="3.4" floodColor="#1F1A16" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter={`url(#${id}-s)`}>
        <circle cx="32" cy="32" r="27" fill={`url(#${id}-c)`} />
        <g ref={eyes} style={{ transition: "transform .08s linear" }}>
          <ellipse cx="25" cy="32" rx="6.4" ry="8" fill="#FBF6EE" />
          <ellipse cx="39" cy="32" rx="6.4" ry="8" fill="#FBF6EE" />
          <circle ref={pL} cx="25" cy="32" r="3.5" fill="#241C17" />
          <circle ref={pR} cx="39" cy="32" r="3.5" fill="#241C17" />
          <circle cx="23.4" cy="29.8" r="1.2" fill="#fff" />
          <circle cx="37.4" cy="29.8" r="1.2" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}
