"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Logo réel d'Emma, séparé en 3 calques (depuis son PNG, par teinte) :
   - formes Matisse (éclosent / respirent)
   - anneau baseline + cercle (apparaît, tourne lentement)
   - lettres EpC (projetées → s'entrechoquent → font éclater les formes)  */

export default function HeroLogo({ className = "" }) {
  const shapes = useRef(null);
  const ring = useRef(null);
  const letters = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const S = shapes.current, R = ring.current, L = letters.current;
      gsap.set([S, R, L], { transformOrigin: "50% 50%" });
      gsap.set(S, { scale: 0.35, opacity: 0 });
      gsap.set(R, { scale: 0.85, opacity: 0, rotation: -12 });
      gsap.set(L, { scale: 1.9, opacity: 0, y: -26, filter: "blur(12px)" });

      const tl = gsap.timeline({ delay: 1.25 });
      /* l'anneau se pose */
      tl.to(R, { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "power3.out" }, 0)
        /* les lettres EpC sont projetées et s'entrechoquent au centre */
        .to(L, { opacity: 1, duration: 0.35, ease: "power1.out" }, 0.2)
        .to(L, { scale: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "back.out(2.6)" }, 0.2)
        .to(L, { rotation: 2.5, duration: 0.07, yoyo: true, repeat: 5, ease: "power1.inOut" }, 0.62)
        /* l'impact fait éclater les formes, qui prennent l'espace puis reviennent */
        .to(S, { opacity: 1, duration: 0.3 }, 0.6)
        .fromTo(S, { scale: 0.35 }, { scale: 1.16, duration: 0.4, ease: "power3.out" }, 0.62)
        .to(S, { scale: 1, duration: 0.9, ease: "elastic.out(1, 0.5)" }, 0.98);

      /* idle : formes qui respirent + anneau qui tourne très lentement */
      gsap.to(S, { scale: 1.045, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.4 });
      gsap.to(R, { rotation: "+=360", duration: 90, ease: "none", repeat: -1, delay: 2.4 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={`herologo ${className}`}>
      <div className="hl-stack">
        <img ref={shapes} className="hl-layer" src="/logo-shapes.png" alt="" aria-hidden="true" />
        <img ref={ring} className="hl-layer" src="/logo-ring.png" alt="" aria-hidden="true" />
        <img ref={letters} className="hl-layer hl-letters" src="/logo-letters.png" alt="EpC — Une présence digitale qui vous ressemble" />
      </div>
    </div>
  );
}
