/* ===== Grille tarifaire du simulateur (d'après le doc « tarifs EPC site ») =====
   Indicatif : chaque prestation = liste de groupes d'options.
   Types de groupe :
     - "radio" : on choisit UNE option (la 1re « Pas concerné » = 0 € si présente)
     - "check" : on coche plusieurs options
     - "step"  : quantité (prix × nombre)
   Unité de chaque ligne : "mois" (récurrent) ou "projet" (ponctuel).
   `from:true` → le total devient « à partir de … ». */

export const PRICING = {
  "Community management": {
    intro: "Composez votre accompagnement mensuel.",
    disclaimer:
      "Estimation mensuelle indicative. Les campagnes publicitaires, rémunérations influenceurs, dotations produits, lots de jeux concours, frais d'envoi et outils payants ne sont pas inclus. Déplacement : 0,50 €/km au-delà de 110 km/mois.",
    groups: [
      {
        name: "Instagram / Facebook", type: "radio",
        options: [
          { label: "Pas concerné", price: 0 },
          { label: "Instagram et/ou Facebook — contenus similaires", price: 475, unit: "mois", note: "3 posts + 3 stories / semaine" },
          { label: "Instagram + Facebook — contenus différents", price: 675, unit: "mois", note: "contenus différenciés par plateforme" },
        ],
      },
      {
        name: "TikTok", type: "radio",
        options: [
          { label: "Pas concerné", price: 0 },
          { label: "Sans création dédiée", price: 320, unit: "mois", note: "3 publications / semaine à partir de contenus fournis" },
          { label: "Avec création adaptée", price: 850, unit: "mois", note: "3 publications / semaine adaptées aux codes TikTok" },
        ],
      },
      {
        name: "Autres canaux & options", type: "check",
        options: [
          { label: "LinkedIn", price: 250, unit: "mois", note: "2 posts / semaine" },
          { label: "Reporting mensuel", price: 150, unit: "mois", note: "une seule fois, même multi-plateformes" },
          { label: "Création de contenus photo & vidéo", price: 400, unit: "mois", note: "≤ 4 vidéos + 20 photos / journée mutualisée" },
          { label: "Groupe privé Facebook", price: 150, unit: "mois" },
          { label: "Canal de diffusion Instagram", price: 200, unit: "mois" },
          { label: "Jeu concours mensuel", price: 100, unit: "mois", note: "hors lots & frais externes" },
        ],
      },
      { name: "Vidéos supplémentaires", type: "step", price: 100, unit: "mois", unitLabel: "vidéo", min: 0, max: 10, note: "100 €/vidéo" },
    ],
  },

  "Stratégie digitale": {
    intro: "Sélectionnez les livrables qui vous intéressent.",
    disclaimer:
      "Cette estimation donne une première enveloppe budgétaire. Le tarif final dépendra du niveau d'analyse, du nombre de canaux étudiés et de la profondeur stratégique souhaitée.",
    groups: [
      {
        name: "Type de stratégie", type: "check",
        options: [
          { label: "Stratégie social media", price: 600, unit: "projet", note: "objectifs, cibles, ligne édito, plan d'action" },
          { label: "Stratégie de communication + audit des comptes", price: 850, unit: "projet" },
        ],
      },
      {
        name: "Calendrier éditorial (optionnel)", type: "check",
        options: [
          { label: "Calendrier éditorial — 1 mois", price: 250, unit: "projet", note: "sujets, formats, angles" },
          { label: "Calendrier éditorial — 3 mois", price: 600, unit: "projet", note: "planification + temps forts" },
        ],
      },
      {
        name: "Accompagnement (optionnel)", type: "check",
        options: [
          { label: "Accompagnement à la mise en œuvre", price: 250, unit: "mois", from: true, note: "suivi, ajustements, pilotage, à partir de 250 €/mois" },
        ],
      },
    ],
  },

  "Formation": {
    intro: "Coaching, formation, ou les deux.",
    disclaimer:
      "Tarifs valables jusqu'à 8 participants. Au-delà, formation sur mesure ou programme complet : sur devis.",
    groups: [
      {
        name: "Coaching", type: "radio",
        options: [
          { label: "Pas de coaching", price: 0 },
          { label: "Coaching individuel", price: 150, unit: "projet", note: "1 session de 1 h 30" },
          { label: "Programme de coaching", price: 390, unit: "projet", note: "3 sessions de 1 h 30" },
        ],
      },
      {
        name: "Formation", type: "radio",
        options: [
          { label: "Pas de formation", price: 0 },
          { label: "Demi-journée", price: 450, unit: "projet", note: "3 à 4 h, support + exercices" },
          { label: "Journée complète", price: 750, unit: "projet", note: "jusqu'à 7 h, + cas pratiques" },
        ],
      },
      {
        name: "Options", type: "check",
        options: [
          { label: "Audit des supports avant la session", price: 150, unit: "projet" },
          { label: "Suivi pendant 1 mois après la formation", price: 200, unit: "projet" },
        ],
      },
    ],
  },

  "Création de sites web": {
    intro: "Tous mes sites sont construits sur un CMS, pour que vous gardiez la main sur vos contenus.",
    disclaimer:
      "Tarifs de départ — le SEO technique de base est inclus dans chaque formule. Sur devis : refonte, e-commerce, réservation/paiement ou click and collect, animations avancées, SEO approfondi, intégrations spécifiques.",
    groups: [
      {
        name: "Formule (sur CMS)", type: "radio",
        options: [
          { label: "Site CMS essentiel", price: 1900, unit: "projet", from: true, note: "jusqu'à 5 pages, CMS pour gérer votre contenu en autonomie" },
          { label: "Site CMS sur mesure", price: 3500, unit: "projet", from: true, note: "design sur-mesure, arborescence étendue, fonctionnalités avancées" },
        ],
      },
      {
        name: "Options", type: "check",
        options: [
          { label: "Rédaction / réécriture des textes", price: 100, unit: "projet", from: true, note: "à partir de 100 €/page" },
          { label: "Blog ou espace actualités", price: 300, unit: "projet" },
          { label: "Formulaire avancé", price: 150, unit: "projet" },
          { label: "Formation à la prise en main", price: 150, unit: "projet" },
        ],
      },
      { name: "Pages supplémentaires", type: "step", price: 200, unit: "projet", unitLabel: "page", min: 0, max: 12, from: true, note: "à partir de 200 €/page" },
      {
        name: "Maintenance", type: "radio",
        options: [
          { label: "Pas de maintenance", price: 0 },
          { label: "Maintenance essentielle", price: 80, unit: "mois", note: "mises à jour & corrections" },
          { label: "Maintenance avec accompagnement", price: 150, unit: "mois", note: "technique + ajustements réguliers" },
        ],
      },
    ],
  },

  "Event Content Creator": {
    intro: "Votre formule de couverture, puis les options.",
    disclaimer:
      "Estimation pour une couverture standard. Mariage, festival, événement sur plusieurs jours, présence de nuit, publication sur vos comptes, hébergement ou gros volume de contenus : sur devis.",
    groups: [
      {
        name: "Formule de couverture", type: "radio",
        options: [
          { label: "Format court", price: 350, unit: "projet", note: "jusqu'à 2 h — photo/vidéo, stories, 1 Reel" },
          { label: "Demi-journée", price: 550, unit: "projet", note: "jusqu'à 4 h — 2 Reels + sélection photos" },
          { label: "Journée complète", price: 890, unit: "projet", note: "jusqu'à 8 h — 3 Reels + sélection enrichie" },
        ],
      },
      {
        name: "Options", type: "check",
        options: [
          { label: "Livraison express sous 48 h", price: 150, unit: "projet" },
        ],
      },
      { name: "Reels supplémentaires", type: "step", price: 150, unit: "projet", unitLabel: "reel", min: 0, max: 8, note: "150 €/reel" },
      { name: "Heures supplémentaires", type: "step", price: 100, unit: "projet", unitLabel: "h", min: 0, max: 8, note: "100 €/h" },
    ],
  },
};

/* Couleur d'accent « flashy » de chaque prestation (dérivée de la couleur de
   sa carte), utilisée pour la bulle des yeux, les marques du simulateur, les
   boutons, le bandeau du module RDV, etc. Clés = libellés exacts (= bookLabel
   et options du sélecteur RDV). "Autre" / non choisi → encre (noir). */
export const SERVICE_ACCENT = {
  "Community management": "#EF7BA9", // c1 — rose vif
  "Stratégie digitale": "#8E78B8",   // c2 — lilas profond
  "Formation": "#5F9E78",            // c3 — sauge vive
  "Création de sites web": "#E9A92E",// c4 — moutarde
  "Event Content Creator": "#D98E3D",// c5 — ambre
};

const eur = (n) => n.toLocaleString("fr-FR");

/* Détail lisible des options sélectionnées → pour récupérer l'estimation au
   moment de la prise de rendez-vous (affiché dans le module RDV). */
export function describeSelection(cfg, state) {
  const lines = [];
  cfg.groups.forEach((g, gi) => {
    const s = state[gi];
    if (g.type === "radio") {
      const opt = g.options[s ?? 0];
      if (opt && opt.price > 0) lines.push({ label: opt.label, price: `${opt.from ? "dès " : ""}${eur(opt.price)} €${opt.unit === "mois" ? "/mois" : ""}` });
    } else if (g.type === "check") {
      g.options.forEach((opt, oi) => {
        if (s && s[oi]) lines.push({ label: opt.label, price: `${opt.from ? "dès " : ""}${eur(opt.price)} €${opt.unit === "mois" ? "/mois" : ""}` });
      });
    } else if (g.type === "step") {
      const q = s || 0;
      if (q > 0) lines.push({ label: `${g.name} × ${q}`, price: `${eur(g.price * q)} €${g.unit === "mois" ? "/mois" : ""}` });
    }
  });
  return lines;
}

/* Calcule l'état (sélections) → totaux mensuel & ponctuel + libellé d'estimation. */
export function computeEstimate(cfg, state) {
  let monthly = 0, oneoff = 0, from = false;
  cfg.groups.forEach((g, gi) => {
    const s = state[gi];
    if (g.type === "radio") {
      const opt = g.options[s ?? 0];
      if (opt && opt.price > 0) {
        if (opt.unit === "mois") monthly += opt.price; else oneoff += opt.price;
        if (opt.from) from = true;
      }
    } else if (g.type === "check") {
      g.options.forEach((opt, oi) => {
        if (s && s[oi]) {
          if (opt.unit === "mois") monthly += opt.price; else oneoff += opt.price;
          if (opt.from) from = true;
        }
      });
    } else if (g.type === "step") {
      const q = s || 0;
      if (q > 0) {
        if (g.unit === "mois") monthly += g.price * q; else oneoff += g.price * q;
        if (g.from) from = true;
      }
    }
  });
  const pre = from ? "à partir de " : "≈ ";
  const parts = [];
  if (oneoff > 0) parts.push(`${pre}${eur(oneoff)} €`);
  if (monthly > 0) parts.push(`${oneoff > 0 ? "" : pre}${eur(monthly)} €/mois`);
  const label = parts.length ? parts.join(" + ") : "Sélectionnez des options";
  return { monthly, oneoff, from, label, eur };
}

/* État initial : radios sur l'option 0, cases décochées, steps à min. */
export function initState(cfg) {
  return cfg.groups.map((g) => {
    if (g.type === "check") return g.options.map(() => false);
    if (g.type === "step") return g.min || 0;
    return 0;
  });
}
