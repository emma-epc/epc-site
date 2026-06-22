"use client";
import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    const halo = document.getElementById("halo");
    const dot = document.getElementById("cdot");
    if (!halo || !dot) return;
    const lerp = (a, b, t) => a + (b - a) * t;
    let mx = innerWidth / 2, my = innerHeight / 2, hx = mx, hy = my, raf;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; dot.style.left = mx + "px"; dot.style.top = my + "px"; };
    const tick = () => { hx = lerp(hx, mx, 0.16); hy = lerp(hy, my, 0.16); halo.style.left = hx + "px"; halo.style.top = hy + "px"; raf = requestAnimationFrame(tick); };
    addEventListener("mousemove", onMove);
    tick();

    const over = (e) => { if (e.target.closest("a,.magnetic,.ba-handle")) halo.classList.add("big"); };
    const out = (e) => { if (e.target.closest("a,.magnetic,.ba-handle")) halo.classList.remove("big"); };
    const mag = (e) => {
      const b = e.target.closest(".magnetic");
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
    };
    const magReset = (e) => { const b = e.target.closest(".magnetic"); if (b) b.style.transform = ""; };
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mousemove", mag);
    document.addEventListener("mouseout", magReset);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mousemove", mag);
      document.removeEventListener("mouseout", magReset);
    };
  }, []);

  return (
    <>
      <div className="halo" id="halo" />
      <div className="cdot" id="cdot" />
    </>
  );
}
