"use client";
import { useEffect } from "react";

/* Halo de lumière douce.
   - Vertical : épouse la progression du scroll (descend en scrollant vers le bas,
     remonte vers le haut).
   - Horizontal : suit la souris (gauche/droite).
   Rendu léger : radial-gradient qui s'éteint en transparence (aucun bord visible,
   pas de « forme »), mix-blend soft-light, opacité contenue. */
export default function ScrollHalo() {
  useEffect(() => {
    const el = document.getElementById("scrollhalo");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cx = 50, cy = 28, o = 0, raf;
    let mx = 50, my = 50; // position souris en vw/vh
    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth) * 100;
      my = (e.clientY / window.innerHeight) * 100;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const target = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, (window.scrollY || window.pageYOffset || 0) / max));
      const ty = 10 + p * 80;                 // Y piloté par le scroll (10vh → 90vh)
      const tx = 50 + (mx - 50) * 0.9;        // X piloté par la souris
      return { tx, ty };
    };

    const apply = (x, y, op) => {
      el.style.setProperty("--halo-x", x.toFixed(2) + "vw");
      el.style.setProperty("--halo-y", y.toFixed(2) + "vh");
      el.style.setProperty("--halo-x2", (100 - x).toFixed(2) + "vw");
      el.style.setProperty("--halo-y2", Math.min(98, y + 10).toFixed(2) + "vh");
      el.style.setProperty("--halo-o", op.toFixed(3));
    };

    if (reduce) { const { tx, ty } = target(); apply(tx, ty, 0.7); return; }

    const tick = () => {
      const { tx, ty } = target();
      cx = lerp(cx, tx, 0.07);
      cy = lerp(cy, ty, 0.09);
      o = lerp(o, 1, 0.04);
      apply(cx, cy, o);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div className="scrollhalo" id="scrollhalo" aria-hidden="true">
      <div className="sh-blob" />
      <div className="sh-blob b2" />
    </div>
  );
}
