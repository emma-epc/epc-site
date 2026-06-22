"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { CALENDLY_URL, CONTACT_EMAIL, HAS_CALENDLY } from "@/lib/config";
import { SERVICE_ACCENT } from "@/lib/pricing";

const PRESTATIONS = [
  "Community management",
  "Stratégie digitale",
  "Création de sites web",
  "Event Content Creator",
  "Formation",
  "Autre / je ne sais pas encore",
];

const EMPTY = { prestation: PRESTATIONS[0], prenom: "", nom: "", email: "", societe: "", localisation: "" };

export default function Booking() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false); // bouton visible (hors Hero)
  const [step, setStep] = useState(1);
  const [f, setF] = useState(EMPTY);
  const [estimate, setEstimate] = useState(null); // estimation transmise par le simulateur
  const [breakdown, setBreakdown] = useState(null); // détail des options estimées
  const [locked, setLocked] = useState(false); // prestation figée (vient d'une estimation)
  const [chosen, setChosen] = useState(false); // une prestation a été choisie (sinon trait noir)
  const [zone, setZone] = useState(""); // section survolée par l'onglet : "" | "dark" | "terra"
  const calRef = useRef(null);

  // Couleur d'accent du module = couleur de la prestation choisie (sinon encre/noir).
  const accent = chosen ? (SERVICE_ACCENT[f.prestation] || "var(--ink)") : "var(--ink)";

  // Le bouton apparaît dès qu'on quitte le Hero ; sa couleur s'inverse en blanc
  // au-dessus de la section vidéos (texte encre) et du bas de page (texte terracotta).
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.72);
      const mid = window.innerHeight / 2;
      const inside = (id) => { const el = document.getElementById(id); if (!el) return false; const r = el.getBoundingClientRect(); return r.top < mid && r.bottom > mid; };
      setZone(inside("contact") ? "terra" : inside("realisations") ? "dark" : "");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  // Ouverture depuis l'extérieur (dernière page d'une fiche prestation).
  useEffect(() => {
    const onBook = (e) => {
      const p = e.detail?.prestation;
      const known = PRESTATIONS.includes(p);
      setF((s) => ({ ...s, prestation: known ? p : s.prestation }));
      setEstimate(e.detail?.estimate || null);
      setBreakdown(e.detail?.breakdown || null);
      setLocked(!!e.detail?.locked && known);
      setChosen(known);
      setStep(1);
      setOpen(true);
    };
    window.addEventListener("epc:book", onBook);
    return () => window.removeEventListener("epc:book", onBook);
  }, []);

  // Verrou du scroll quand le module est ouvert + fermeture Échap.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.__lenis?.stop();
    const onKey = (e) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.__lenis?.start(); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const close = useCallback(() => { setOpen(false); setTimeout(() => setStep(1), 350); }, []);
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  // Injecte le widget Calendly à l'étape 2 (prérempli nom + email).
  useEffect(() => {
    if (!open || step !== 2 || !HAS_CALENDLY || !calRef.current) return;
    const node = calRef.current;
    node.innerHTML = "";
    const mount = () => {
      if (!window.Calendly || !node) return;
      window.Calendly.initInlineWidget({
        url: `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=fbf6ee&primary_color=b85c4a&text_color=1f1a16`,
        parentElement: node,
        prefill: {
          name: `${f.prenom} ${f.nom}`.trim(),
          email: f.email,
          customAnswers: { a1: f.prestation, a2: f.societe, a3: f.localisation },
        },
      });
    };
    if (window.Calendly) { mount(); return; }
    const s = document.createElement("script");
    s.src = "https://assets.calendly.com/assets/external/widget.js";
    s.async = true; s.onload = mount;
    document.body.appendChild(s);
  }, [open, step, f]);

  const mailtoFallback = () => {
    const detail = breakdown?.length ? breakdown.map((l) => `  - ${l.label} : ${l.price}`).join("%0D%0A").replace(/ /g, "%20") : "";
    const estLine = estimate ? `Estimation simulateur : ${encodeURIComponent(estimate)}%0D%0A${detail ? detail + "%0D%0A" : ""}` : "";
    const body = `Bonjour Emma,%0D%0A%0D%0AJe souhaite échanger autour de : ${encodeURIComponent(f.prestation)}.%0D%0A${estLine}%0D%0APrénom : ${encodeURIComponent(f.prenom)}%0D%0ANom : ${encodeURIComponent(f.nom)}%0D%0AEmail : ${encodeURIComponent(f.email)}%0D%0ASociété : ${encodeURIComponent(f.societe)}%0D%0ALocalisation : ${encodeURIComponent(f.localisation)}%0D%0A%0D%0AÀ bientôt !`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Premier échange — " + f.prestation)}&body=${body}`;
  };

  const next = (e) => { e.preventDefault(); setStep(2); };

  return (
    <>
      <button
        className={`bk-tab${visible || open ? " on" : ""}${zone ? " on-" + zone : ""}`}
        onClick={() => { setEstimate(null); setBreakdown(null); setLocked(false); setChosen(false); setOpen(true); }}
        aria-label="Prendre rendez-vous pour un premier échange"
      >
        <span className="bk-tab-dot" />
        <span className="bk-tab-label">Prendre rendez-vous</span>
      </button>

      <div className={`bk-overlay${open ? " open" : ""}`} role="dialog" aria-modal="true" aria-hidden={!open} onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
        <div className="bk-card" data-lenis-prevent style={{ "--bkc": accent }}>
          <span className="bk-top" />
          <button className="bk-close" onClick={close} aria-label="Fermer">✕</button>

          <div className="bk-steps">
            <span className={`bk-dot${step >= 1 ? " on" : ""}`}>1 · Votre projet</span>
            <span className={`bk-dot${step >= 2 ? " on" : ""}`}>2 · Le créneau</span>
          </div>

          {step === 1 && (
            <form className="bk-pane" onSubmit={next}>
              <h3 className="bk-title">Parlez-moi de vous.</h3>
              {estimate && (
                <div className="bk-estimate">
                  <div className="bk-estimate-head">
                    <span>Votre estimation</span>
                    <b>{estimate}</b>
                  </div>
                  {breakdown?.length > 0 && (
                    <ul className="bk-estimate-detail">
                      {breakdown.map((l, i) => (
                        <li key={i}><span>{l.label}</span><b>{l.price}</b></li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className="bk-fg">
                <label className="bk-fl">Type de prestation{locked && <em> · figée par votre estimation</em>}</label>
                <select className="bk-fi" value={f.prestation} disabled={locked}
                  onChange={(e) => { setF((s) => ({ ...s, prestation: e.target.value })); setChosen(true); }}>
                  {PRESTATIONS.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="bk-row">
                <div className="bk-fg"><label className="bk-fl">Prénom</label><input className="bk-fi" value={f.prenom} onChange={set("prenom")} required /></div>
                <div className="bk-fg"><label className="bk-fl">Nom</label><input className="bk-fi" value={f.nom} onChange={set("nom")} required /></div>
              </div>
              <div className="bk-fg"><label className="bk-fl">Adresse e-mail</label><input className="bk-fi" type="email" value={f.email} onChange={set("email")} required /></div>
              <div className="bk-row">
                <div className="bk-fg"><label className="bk-fl">Société <em>(optionnel)</em></label><input className="bk-fi" value={f.societe} onChange={set("societe")} /></div>
                <div className="bk-fg"><label className="bk-fl">Localisation</label><input className="bk-fi" value={f.localisation} onChange={set("localisation")} placeholder="Charente, Paris…" /></div>
              </div>

              <div className="bk-actions">
                <button type="submit" className="pill pill-glass terra-glass"><span>Choisir un créneau</span><span className="arw">→</span></button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="bk-pane">
              <h3 className="bk-title">Choisissez votre créneau.</h3>
              {HAS_CALENDLY ? (
                <div className="bk-cal" ref={calRef} />
              ) : (
                <div className="bk-cal-fallback">
                  <p className="bk-desc">L'agenda en ligne n'est pas encore connecté. Pas de souci&nbsp;: cliquez ci-dessous, votre demande part par e-mail avec toutes vos infos, et je vous propose un créneau en retour — très vite.</p>
                  <div className="bk-recap">
                    <div><span>Prestation</span><b>{f.prestation}</b></div>
                    {estimate && <div><span>Estimation</span><b>{estimate}</b></div>}
                    <div><span>Vous</span><b>{f.prenom} {f.nom}</b></div>
                    <div><span>E-mail</span><b>{f.email || "—"}</b></div>
                    <div><span>Où</span><b>{f.localisation || "—"}</b></div>
                  </div>
                  <button className="pill moutarde" onClick={mailtoFallback}><span>Envoyer ma demande</span><span className="arw">↗</span></button>
                </div>
              )}
              <div className="bk-actions">
                <button type="button" className="bk-back" onClick={() => setStep(1)}>← Modifier mes infos</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
