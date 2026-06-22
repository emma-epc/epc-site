"use client";
import { useEffect, useState } from "react";

/* Bandeau d'information cookies — discret, non bloquant.
   Le site ne dépose que des cookies strictement nécessaires ; Calendly (cookies
   fonctionnels) n'est chargé que sur action explicite de l'internaute. Aucun
   consentement préalable n'est donc requis : ce bandeau informe simplement et
   se ferme d'un clic (mémorisé en localStorage). */
export default function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try { if (!localStorage.getItem("epc-cookie-ok")) setShow(true); } catch { setShow(true); }
  }, []);

  const accept = () => {
    try { localStorage.setItem("epc-cookie-ok", "1"); } catch {}
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="ck-notice" role="region" aria-label="Information cookies">
      <p className="ck-txt">
        Ce site n'utilise que des cookies strictement nécessaires. L'agenda de rendez-vous (Calendly)
        n'est chargé que si vous l'ouvrez. <a href="/confidentialite">En savoir plus</a>.
      </p>
      <button className="ck-btn" onClick={accept}>J'ai compris</button>
    </div>
  );
}
