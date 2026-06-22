"use client";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "À propos", href: "/#apropos" },
  { label: "Projets", href: "/#realisations" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [atTop, setAtTop] = useState(true);
  const [hover, setHover] = useState(false);
  const [onTerra, setOnTerra] = useState(false); // orbe au-dessus du bas de page terracotta
  const eyeL = useRef(null), eyeR = useRef(null);
  const pupL = useRef(null), pupR = useRef(null);

  // Position du scroll + détection : l'orbe (haut-gauche) survole-t-il l'endband ?
  useEffect(() => {
    const f = () => {
      setAtTop(window.scrollY < 60);
      const eb = document.getElementById("contact");
      if (eb) {
        const r = eb.getBoundingClientRect();
        setOnTerra(r.top < 90 && r.bottom > 90); // le bandeau terracotta passe derrière l'orbe
      }
    };
    f();
    window.addEventListener("scroll", f, { passive: true });
    window.addEventListener("resize", f);
    return () => { window.removeEventListener("scroll", f); window.removeEventListener("resize", f); };
  }, []);

  const expanded = atTop || hover;
  const expandedRef = useRef(expanded);
  expandedRef.current = expanded;

  // remonte tout en haut (utilisé par l'orbe sur mobile hors hero)
  const scrollTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // clic sur l'orbe/barre : sur mobile hors hero → remonte en haut ; sinon (desktop)
  // → bascule l'état déployé comme avant. En haut du hero (mobile) les liens gèrent eux-mêmes.
  const onHeaderClick = () => {
    if (window.matchMedia("(max-width:680px)").matches) {
      if (!atTop) scrollTop();
      return;
    }
    setHover((h) => !h);
  };

  // Yeux : suivent la souris quand ils sont collés (orbe replié) ; bougent tout
  // seuls (+ regard qui se balade) quand le menu est totalement déployé.
  useEffect(() => {
    const coarse = window.matchMedia("(pointer:coarse)").matches;
    const lerp = (a, b, t) => a + (b - a) * t;
    const MAX = 3.2;
    const pos = { l: { x: 0, y: 0 }, r: { x: 0, y: 0 } };
    const tgt = { l: { x: 0, y: 0 }, r: { x: 0, y: 0 } };
    let raf, nextWander = 0;
    const onMove = (e) => {
      if (expandedRef.current) return; // déployé → autonome, on ignore la souris
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
      if (expandedRef.current && now > nextWander) {
        const a = Math.random() * Math.PI * 2, r = MAX * (0.4 + Math.random() * 0.6);
        tgt.l.x = tgt.r.x = Math.cos(a) * r;
        tgt.l.y = tgt.r.y = Math.sin(a) * r;
        nextWander = now + 700 + Math.random() * 1500;
      }
      ["l", "r"].forEach((k) => { pos[k].x = lerp(pos[k].x, tgt[k].x, 0.16); pos[k].y = lerp(pos[k].y, tgt[k].y, 0.16); });
      if (pupL.current) { pupL.current.setAttribute("cx", 18 + pos.l.x); pupL.current.setAttribute("cy", 18 + pos.l.y); }
      if (pupR.current) { pupR.current.setAttribute("cx", 18 + pos.r.x); pupR.current.setAttribute("cy", 18 + pos.r.y); }
      raf = requestAnimationFrame(tick);
    };
    if (!coarse) window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);

  const Eye = ({ svgRef, pupRef }) => (
    <svg ref={svgRef} className="navx-eye" viewBox="0 0 36 36" aria-hidden="true">
      <circle className="eyeball" cx="18" cy="18" r="17" fill="#FBF6EE" />
      <circle ref={pupRef} cx="18" cy="18" r="7" fill="#241C17" />
      <circle cx="14.6" cy="14.6" r="2.3" fill="#fff" />
    </svg>
  );

  return (
    <>
    <header
      className={`navx${atTop ? " attop" : " scrolled"}${expanded ? " open" : ""}${hover ? " tapped" : ""}${onTerra ? " on-terra" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onHeaderClick}
    >
      {/* pétales sable qui éclosent autour de l'orbe au survol (rappel du logo) */}
      <div className="navx-petals" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <span className="navx-petal" key={i} style={{ "--a": `${i * 45}deg` }} />
        ))}
      </div>

      <div className="navx-bar">
        {/* orbe terracotta unique à gauche : les deux yeux y vivent en permanence,
            que le menu soit déployé ou replié (un seul œil, plus d'œil à droite) */}
        <span className="navx-orb">
          <Eye svgRef={eyeL} pupRef={pupL} />
          <Eye svgRef={eyeR} pupRef={pupR} />
        </span>
        <div className="navx-mid">
          <a href="#top" className="navx-home" aria-label="Accueil">
            <img className="navx-wordmark" src="/wordmark.png" alt="EP Communication" />
          </a>
          <nav className="navx-items">
            {links.map((l) => (<a key={l.label} href={l.href} onClick={() => setHover(false)}>{l.label}</a>))}
          </nav>
        </div>
      </div>
    </header>

    {/* Mobile uniquement : barre longue de liens fixée en bas, visible hors hero */}
    <nav className={`navx-mobi${!atTop ? " on" : ""}`} aria-label="Navigation">
      {links.map((l) => (<a key={l.label} href={l.href}>{l.label}</a>))}
    </nav>
    </>
  );
}
