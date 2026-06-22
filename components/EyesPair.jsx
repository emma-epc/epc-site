"use client";
import { useEffect, useRef } from "react";

/* Paire d'yeux identique à celle du menu (orbe replié).
   - mode "auto"   : les pupilles se baladent toutes seules (+ clignements)
   - mode "follow" : les pupilles suivent la souris
   Réutilisée dans le badge « à partir de » des fiches prestation. */
export default function EyesPair({ follow = false, className = "" }) {
  const eyeL = useRef(null), eyeR = useRef(null);
  const pupL = useRef(null), pupR = useRef(null);

  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const MAX = 3.2;
    const pos = { l: { x: 0, y: 0 }, r: { x: 0, y: 0 } };
    const tgt = { l: { x: 0, y: 0 }, r: { x: 0, y: 0 } };
    const coarse = window.matchMedia("(pointer:coarse)").matches;
    let raf, nextWander = 0;

    const onMove = (e) => {
      [["l", eyeL], ["r", eyeR]].forEach(([k, ref]) => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const m = Math.min(1, d / 260);
        tgt[k].x = (dx / d) * MAX * m; tgt[k].y = (dy / d) * MAX * m;
      });
    };

    const tick = (now) => {
      if (!follow && now > nextWander) {
        const a = Math.random() * Math.PI * 2, r = MAX * (0.4 + Math.random() * 0.6);
        tgt.l.x = tgt.r.x = Math.cos(a) * r;
        tgt.l.y = tgt.r.y = Math.sin(a) * r;
        nextWander = now + 700 + Math.random() * 1500;
      }
      ["l", "r"].forEach((k) => { pos[k].x = lerp(pos[k].x, tgt[k].x, 0.12); pos[k].y = lerp(pos[k].y, tgt[k].y, 0.12); });
      if (pupL.current) { pupL.current.setAttribute("cx", 18 + pos.l.x); pupL.current.setAttribute("cy", 18 + pos.l.y); }
      if (pupR.current) { pupR.current.setAttribute("cx", 18 + pos.r.x); pupR.current.setAttribute("cy", 18 + pos.r.y); }
      raf = requestAnimationFrame(tick);
    };

    if (follow && !coarse) window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, [follow]);

  const Eye = ({ sref, pref }) => (
    <svg ref={sref} className="ep-eye" viewBox="0 0 36 36" aria-hidden="true">
      <circle className="eyeball" cx="18" cy="18" r="17" />
      <circle ref={pref} cx="18" cy="18" r="7" fill="#241C17" />
      <circle cx="14.6" cy="14.6" r="2.3" fill="#fff" />
    </svg>
  );

  return (
    <span className={`ep-eyes ${className}`} aria-hidden="true">
      <Eye sref={eyeL} pref={pupL} />
      <Eye sref={eyeR} pref={pupR} />
    </span>
  );
}
