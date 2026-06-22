"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { PRICING, computeEstimate, initState, describeSelection } from "@/lib/pricing";

/* Simulateur contextuel : dernière page de chaque fiche prestation.
   Révélation progressive — chaque groupe d'options apparaît une fois le
   précédent renseigné (ou via « Continuer »). Le montant est remonté au
   header (haut-droite du titre) via onEstimate. */
export default function PriceSimulator({ service, onBook, onEstimate }) {
  const cfg = PRICING[service.title];
  const [state, setState] = useState(() => (cfg ? initState(cfg) : []));
  const [revealed, setRevealed] = useState(1); // nb de groupes affichés

  useEffect(() => { if (cfg) { setState(initState(cfg)); setRevealed(1); } }, [service.title]);

  const est = useMemo(() => (cfg ? computeEstimate(cfg, state) : null), [cfg, state]);
  useEffect(() => { onEstimate?.(est ? est.label : null); }, [est, onEstimate]);

  if (!cfg) {
    return (
      <div className="sim">
        <p className="sim-empty">Estimation sur devis pour cette prestation — parlons-en directement.</p>
        <button className="pill pill-glass svc-cta" onClick={() => onBook(null)}><span>Prendre rendez-vous</span><span className="arw">→</span></button>
      </div>
    );
  }

  const total = cfg.groups.length;
  const reveal = () => setRevealed((r) => Math.min(total, r + 1));
  const bump = (gi) => { if (gi === revealed - 1) reveal(); }; // l'interaction sur le dernier groupe ouvre le suivant
  const setRadio = (gi, oi) => { setState((s) => s.map((v, i) => (i === gi ? oi : v))); bump(gi); };
  const toggle = (gi, oi) => { setState((s) => s.map((v, i) => (i === gi ? v.map((b, j) => (j === oi ? !b : b)) : v))); };
  const step = (gi, d, g) => { setState((s) => s.map((v, i) => (i === gi ? Math.max(g.min || 0, Math.min(g.max ?? 99, v + d)) : v))); };

  return (
    <div className="sim">
      {cfg.intro && <p className="sim-intro">{cfg.intro}</p>}

      <div className="sim-groups">
        {cfg.groups.slice(0, revealed).map((g, gi) => (
          <fieldset className="sim-group" key={gi}>
            <legend className="sim-legend">{g.name}</legend>

            {g.type === "radio" && (
              <div className="sim-opts">
                {g.options.map((o, oi) => (
                  <label className={`sim-opt${state[gi] === oi ? " on" : ""}`} key={oi}>
                    <input type="radio" name={`g${gi}`} checked={state[gi] === oi} onChange={() => setRadio(gi, oi)} />
                    <span className="sim-mark sim-mark-radio" aria-hidden="true" />
                    <span className="sim-opt-txt">
                      <span className="sim-opt-label">{o.label}</span>
                      {o.note && <span className="sim-opt-note">{o.note}</span>}
                    </span>
                    {o.price > 0 && <span className="sim-opt-price">{o.from ? "dès " : ""}{o.price.toLocaleString("fr-FR")} €{o.unit === "mois" ? "/mois" : ""}</span>}
                  </label>
                ))}
              </div>
            )}

            {g.type === "check" && (
              <div className="sim-opts">
                {g.options.map((o, oi) => (
                  <label className={`sim-opt${state[gi][oi] ? " on" : ""}`} key={oi}>
                    <input type="checkbox" checked={state[gi][oi]} onChange={() => toggle(gi, oi)} />
                    <span className="sim-mark sim-mark-check" aria-hidden="true" />
                    <span className="sim-opt-txt">
                      <span className="sim-opt-label">{o.label}</span>
                      {o.note && <span className="sim-opt-note">{o.note}</span>}
                    </span>
                    <span className="sim-opt-price">{o.from ? "dès " : ""}{o.price.toLocaleString("fr-FR")} €{o.unit === "mois" ? "/mois" : ""}</span>
                  </label>
                ))}
              </div>
            )}

            {g.type === "step" && (
              <div className="sim-step">
                <div className="sim-step-txt"><span className="sim-opt-label">{g.note || `${g.price.toLocaleString("fr-FR")} €/${g.unitLabel}`}</span></div>
                <div className="sim-stepper">
                  <button type="button" onClick={() => step(gi, -1, g)} aria-label="Moins" disabled={state[gi] <= (g.min || 0)}>−</button>
                  <span className="sim-qty">{state[gi]}</span>
                  <button type="button" onClick={() => step(gi, 1, g)} aria-label="Plus" disabled={state[gi] >= (g.max ?? 99)}>+</button>
                </div>
              </div>
            )}
          </fieldset>
        ))}
      </div>

      {revealed < total && (
        <button type="button" className="sim-more" onClick={reveal}>Continuer&nbsp;<span aria-hidden="true">↓</span></button>
      )}

      <button className="pill pill-glass svc-cta sim-cta" onClick={() => onBook(est.label !== "Sélectionnez des options" ? { label: est.label, lines: describeSelection(cfg, state) } : null)}>
        <span>Prendre rendez-vous avec cette estimation</span><span className="arw">→</span>
      </button>

      <p className="sim-note">{cfg.disclaimer}</p>
    </div>
  );
}
