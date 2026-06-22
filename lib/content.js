// Contenus de la page d'accueil — placeholders à remplacer par les vrais éléments d'Emma.

export const nav = [
  { label: "Ce que je fais", href: "#services" },
  { label: "Réalisations", href: "#cas" },
  { label: "Le Journal", href: "#journal" },
  { label: "Moi c'est…", href: "#apropos" },
];

export const roles = [
  { word: "Community Manager", color: "var(--terra)" },
  { word: "stratège digitale", color: "var(--brique)" },
  { word: "créatrice de contenus", color: "var(--terra)" },
  { word: "web designer", color: "var(--brique)" },
  { word: "formatrice", color: "var(--terra)" },
];

export const stats = [
  { n: "6", unit: "ans", label: "à façonner des présences digitales" },
  { n: "30", unit: "+", label: "marques accompagnées" },
  { n: "50", unit: "+", label: "projets livrés" },
  { n: "3", unit: "écoles", label: "où j'interviens" },
  { n: "100", unit: "%", label: "de clients qui recommandent" },
];

export const services = [
  {
    k: "CM",
    title: "Community Management",
    desc: "Je fais vivre vos réseaux au quotidien : ligne éditoriale, calendrier, animation et réponses. Vous gardez votre métier, je garde votre communauté.",
    shape: "flower",
  },
  {
    k: "Stratégie",
    title: "Stratégie digitale",
    desc: "Avant de poster, on réfléchit. Positionnement, cibles, messages, plan d'action : une boussole claire pour arrêter de communiquer au feeling.",
    shape: "arc",
  },
  {
    k: "Contenus",
    title: "Création de contenus",
    desc: "Photos, vidéos, textes, visuels : des contenus qui vous ressemblent et qui donnent envie. Tout ce qui nous touche commence par des mots — et de belles images.",
    shape: "spark",
  },
  {
    k: "Web",
    title: "Création de sites web",
    desc: "Un site à votre image, beau, rapide et bien référencé. De la vitrine simple au site complet, pensé pour convertir vos visiteurs en clients.",
    shape: "leaf",
  },
];

export const brands = [
  ["Maison de Cognac", "var(--terra)"],
  ["La Rochelle Tourisme", "var(--sauge)"],
  ["Studio Lilas", "var(--lilas)"],
  ["Café des Halles", "var(--moutarde)"],
  ["Angoulême BD", "var(--rose)"],
  ["Vignobles Charente", "var(--brique)"],
  ["École Sup'Com", "var(--terra)"],
  ["Gers Saveurs", "var(--moutarde)"],
  ["Atelier Rose", "var(--rose)"],
  ["Saintes Mode", "var(--sauge)"],
];

export const caseStudy = {
  client: "@lamaison.cognac",
  beforeStats: "1 040 abonnés · 47 publications",
  afterStats: "4 218 abonnés · 312 publications",
  results: [
    { to: 180, prefix: "", suffix: "%", label: "d'engagement en plus", bar: "86%" },
    { to: 4, prefix: "×", suffix: "", label: "de portée moyenne par post", bar: "72%" },
    { to: 3178, prefix: "+", suffix: "", label: "abonnés qualifiés en 6 semaines", bar: "64%" },
  ],
};

export const testimonial = {
  quote:
    "Emma a transformé notre image en quelques semaines. On a enfin une communication qui nous ressemble, et les résultats ont suivi.",
  author: "Marie L.",
  role: "Maison de Cognac",
};

export const journal = [
  {
    cat: "News réseaux",
    color: "var(--rose)",
    title: "Ce que le nouvel algo d'Instagram change pour les TPE",
    excerpt: "Moins de hashtags, plus de régularité : décryptage de ce qui marche vraiment en 2026.",
    date: "3 juin 2026",
    read: "4 min",
  },
  {
    cat: "Retour client",
    color: "var(--sauge)",
    title: "Coulisses : la refonte des réseaux d'une maison de cognac",
    excerpt: "Comment on a pensé la stratégie, le avant/après, et ce qu'on en retient.",
    date: "27 mai 2026",
    read: "6 min",
  },
  {
    cat: "Conseils",
    color: "var(--moutarde)",
    title: "5 erreurs de com locale (et comment les éviter)",
    excerpt: "De Cognac à La Rochelle : les pièges classiques quand on communique sur son territoire.",
    date: "19 mai 2026",
    read: "5 min",
  },
];

export const zones = "Charente · Charente-Maritime · Nouvelle-Aquitaine · Gers · Paris";
