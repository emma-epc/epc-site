"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import PriceSimulator from "@/components/PriceSimulator";
import EyesPair from "@/components/EyesPair";

/* Carte de prestation agrandie au centre, fond visible mais flouté.
   On feuillette les pages comme un livre (même animation que la section
   « événements passés » d'ALVA) : flèches ‹ ›, molette latérale et swipe.
   La dernière page propose de réserver un échange (→ Calendly via le module). */
export default function ServiceModal({ service, onClose, startSim = false }) {
  const open = !!service;
  const cardRef = useRef(null);
  const flipRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const [simEstimate, setSimEstimate] = useState(null);
  const busy = useRef(false);

  // pages : contenu de la prestation + page finale « simulateur de prix »
  const pages = service
    ? [...service.pages, { type: "sim" }]
    : [];
  const tot = pages.length;
  const simIdx = service ? service.pages.length : 0;

  // déclenche le module RDV en transmettant l'estimation calculée
  const bookWithEstimate = useCallback((estimate) => {
    onClose();
    window.dispatchEvent(new CustomEvent("epc:book", {
      detail: {
        prestation: service.bookLabel || service.title,
        estimate: estimate?.label || null,
        breakdown: estimate?.lines || null,
        locked: true, // l'estimation fige le type de prestation
      },
    }));
  }, [service, onClose]);

  // ouverture : page 0 normalement, directement sur le simulateur si startSim
  useEffect(() => { if (open) { setIdx(startSim ? simIdx : 0); setSimEstimate(null); } }, [open, service, startSim]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();              // gèle le scroll smooth → le swipe ne bouge que la carte
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.__lenis?.start(); document.removeEventListener("keydown", onKey); };
  }, [open, idx, tot]);

  const go = useCallback((dir) => {
    const card = cardRef.current;
    const n = idx + dir;
    if (busy.current || n < 0 || n >= tot || !card) return;
    busy.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setIdx(n); busy.current = false; return; }
    const out = dir > 0 ? -90 : 90;
    const inn = dir > 0 ? 90 : -90;
    gsap.to(card, {
      rotationY: out, duration: 0.42, ease: "power2.in",
      onComplete: () => {
        setIdx(n);
        gsap.set(card, { rotationY: inn });
        gsap.to(card, { rotationY: 0, duration: 0.42, ease: "power2.out", onComplete: () => { busy.current = false; } });
      },
    });
  }, [idx, tot]);

  // molette latérale → tourne (n'affecte pas le scroll vertical de la page,
  // de toute façon verrouillé quand le module est ouvert)
  useEffect(() => {
    if (!open) return;
    const flip = flipRef.current;
    if (!flip) return;
    let lock = false;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 6) {
        e.preventDefault();
        if (lock) return; lock = true; setTimeout(() => (lock = false), 520);
        go(e.deltaX > 0 ? 1 : -1);
      }
    };
    flip.addEventListener("wheel", onWheel, { passive: false });
    return () => flip.removeEventListener("wheel", onWheel);
  }, [open, go]);

  // swipe tactile
  const sx = useRef(null);
  const onTouchStart = (e) => { sx.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (sx.current == null) return;
    const dx = e.changedTouches[0].clientX - sx.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    sx.current = null;
  };

  if (!open) return null;
  const p = pages[idx];

  return (
    <div className="sm-overlay" role="dialog" aria-modal="true" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sm-stage">
        <button className="sm-arrow sm-prev" onClick={() => go(-1)} disabled={idx <= 0} aria-label="Page précédente">‹</button>

        <div className="sm-flip" ref={flipRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <article ref={cardRef} className={`sm-card ${service.c}${p.type === "sim" ? " is-sim" : ""}`}>
            <button className="sm-close" onClick={onClose} aria-label="Fermer">✕</button>

            {/* badge haut-droite : « à partir de … » (ou l'estimation live sur le simulateur),
                forme pleine plus pastel + paire d'yeux autonomes (comme l'orbe du menu) */}
            <div className="sm-badge">
              <span className="sm-badge-orb"><EyesPair className="sm-badge-eyes" /></span>
              {p.type === "sim" ? (
                <span className="sm-badge-txt sm-badge-est">{simEstimate && simEstimate !== "Sélectionnez des options" ? simEstimate : "Votre estimation"}</span>
              ) : (
                <span className="sm-badge-txt"><i>à partir de</i><b>{service.fromPrice?.toLocaleString("fr-FR")} €</b></span>
              )}
            </div>

            <div className="sm-scroll" data-lenis-prevent>
              {p.type === "sim" ? (
                <div className="sm-page sm-simpage">
                  <h3 className="sm-title">Estimer mon budget</h3>
                  <PriceSimulator service={service} onBook={bookWithEstimate} onEstimate={setSimEstimate} />
                </div>
              ) : (
                <div className="sm-page">
                  <h3 className="sm-title">{p.title}</h3>
                  {p.body && (Array.isArray(p.body)
                    ? p.body.map((para, k) => <p className="sm-body" key={k}>{para}</p>)
                    : <p className="sm-body">{p.body}</p>)}
                  {p.list && (
                    <ol className="sm-list">
                      {p.list.map((it, i) => <li key={i}><span className="sm-li-n">{String(i + 1).padStart(2, "0")}</span><span>{it}</span></li>)}
                    </ol>
                  )}
                </div>
              )}
            </div>

            <div className="sm-pageno">{idx + 1} / {tot}</div>
          </article>
        </div>

        <button className="sm-arrow sm-next" onClick={() => go(1)} disabled={idx >= tot - 1} aria-label="Page suivante">›</button>
      </div>

      <div className="sm-dots">
        {pages.map((_, i) => <span key={i} className={`sm-d${i === idx ? " on" : ""}`} onClick={() => go(i - idx)} />)}
      </div>
    </div>
  );
}
