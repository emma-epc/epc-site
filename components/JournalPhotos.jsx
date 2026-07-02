"use client";
import { useEffect, useRef } from "react";

/* Galerie photos des articles du Journal — s'active uniquement quand un
   article contient un bloc { t: "photos" }. Dans l'esprit du site :
   tuiles arrondies, entrée « pop » au scroll (IntersectionObserver + easing
   rebond maison), légère rotation alternée façon photos posées sur une
   table, redressement au survol. Respecte prefers-reduced-motion. */
export default function JournalPhotos({ images = [] }) {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const items = [...el.querySelectorAll(".jp-item")];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((it) => it.classList.add("on"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          // stagger : chaque tuile surgit un cran après la précédente
          const i = items.indexOf(e.target);
          setTimeout(() => e.target.classList.add("on"), (i % 4) * 110);
          io.unobserve(e.target);
        });
      },
      { threshold: 0.18 }
    );
    items.forEach((it) => io.observe(it));
    return () => io.disconnect();
  }, [images]);

  if (!images.length) return null;

  return (
    <figure className={`jp-grid${images.length === 1 ? " jp-solo" : ""}`} ref={root}>
      {images.map((im, i) => (
        <div className="jp-item" key={i}>
          <img src={im.src} alt={im.alt || ""} loading="lazy" decoding="async" />
          {im.caption && <figcaption className="jp-cap">{im.caption}</figcaption>}
        </div>
      ))}
    </figure>
  );
}
