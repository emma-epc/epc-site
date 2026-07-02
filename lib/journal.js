/* Le Journal — articles du blog EpC.
   Chaque article est un objet JS : pas de CMS, cohérent avec le site
   (contenu versionné dans Git, build statique, zéro dépendance).
   Pour publier : ajouter un objet en tête de ARTICLES, npm run build, push.

   Champs :
   - slug        : URL de l'article (/journal/<slug>) — kebab-case, sans accents
   - title       : titre affiché (H1) — viser ~50-60 caractères, mot-clé local dedans
   - metaTitle   : (optionnel) title SEO si différent du titre affiché
   - description : meta description (~150 caractères)
   - category    : une des CATEGORIES ci-dessous
   - service     : une des 5 prestations (clé de SERVICE_COLOR) → donne la couleur
                   de la carte, cohérente avec les cartes Prestations de l'accueil
   - color       : (optionnel) force une couleur si besoin — sinon dérivée du service
   - date        : "AAAA-MM-JJ" (date de publication)
   - excerpt     : accroche affichée sur la carte (1-2 phrases)
   - body        : blocs { t: "p" | "h2" | "ul" | "quote" | "photos", c: ... }
                   • "photos" : c = tableau [{ src, alt, caption? }] → active le
                     module photos animé (galerie qui surgit au scroll). Déposer
                     les fichiers dans /public/journal/<slug>/ (JPEG ~1200px max).
                     Sans bloc "photos", l'article reste 100 % texte. */

export const CATEGORIES = [
  "Réseaux sociaux & contenus",
  "Sites web & visibilité locale",
  "Études de cas & coulisses",
  "Événementiel & mariage",
];

/* Couleur de carte par prestation — MÊME logique que les cartes de l'accueil :
   rose = community management, lilas = stratégie, sauge = formation,
   moutarde (jaune) = sites internet, sable = event content creator. */
export const SERVICE_COLOR = {
  "Community management": "rose",
  "Stratégie digitale": "lilas",
  "Formation": "sauge",
  "Création de sites web": "moutarde",
  "Event Content Creator": "sable",
};

export const articleColor = (a) => a.color || SERVICE_COLOR[a.service] || "sable";

export const ARTICLES = [
  {
    slug: "creation-site-internet-sur-mesure-coulisses-epc",
    title: "Coulisses : comment j'ai créé le site d'EpC, codé sur-mesure",
    metaTitle: "Création d'un site internet sur-mesure : les coulisses du site EpC",
    description:
      "Pourquoi j'ai codé mon site sur-mesure, sans CMS ni template : identité, rapidité, sécurité et SEO local. Les coulisses du site EpC, depuis la Charente.",
    category: "Sites web & visibilité locale",
    service: "Création de sites web",
    date: "2026-07-02",
    excerpt:
      "Exit l'ancien WordPress : mon site est désormais codé sur-mesure, sans CMS ni template. Je vous ouvre les coulisses, du logo en papiers découpés jusqu'à la mise en ligne.",
    body: [
      {
        t: "p",
        c: "Parce que les cordonniers sont souvent les plus mal chaussés, communiquer en mon propre nom reste un sacré défi. Et pourtant, il y a quelques semaines, j'ai mis en ligne le nouveau site d'EpC. Exit l'ancien WordPress : cette fois, j'ai développé un site sur-mesure, sans CMS, sans template. Juste du code pensé jusqu'au moindre pixel, avec JavaScript, React et Next.js.",
      },
      { t: "h2", c: "Pourquoi coder son site internet sur-mesure ?" },
      {
        t: "p",
        c: "Un template impose son cadre : on choisit un thème, puis on essaie d'y faire rentrer son identité. Ici, c'est l'inverse. Tout est parti de mon logo en papiers découpés, de ses fleurs, ses vagues et ses étoiles colorées. C'est lui qui a donné la palette du site, ses formes rondes et son ton. Sur la page d'accueil, il ne s'affiche pas : il s'assemble sous vos yeux, calque par calque, pendant que les petites formes éclosent autour des lettres.",
      },
      {
        t: "p",
        c: "La navigation aux yeux qui suivent votre souris, les vidéos de projets qui s'agrandissent au fil du scroll, le simulateur de budget, la prise de rendez-vous en deux étapes : rien de tout cela ne sort d'une bibliothèque de thèmes. Chaque élément a été conçu pour cette identité précise, et rien d'autre.",
      },
      { t: "h2", c: "Sans CMS : plus rapide, plus sûr, plus simple" },
      {
        t: "p",
        c: "Concrètement, le site est publié sous forme de pages statiques : pas de base de données, pas d'espace d'administration, pas d'extensions à mettre à jour tous les quinze jours. Et ça change trois choses très concrètes :",
      },
      {
        t: "ul",
        c: [
          "La vitesse : le premier affichage se fait en 0,7 seconde, avec un score de performance de 95/100. Vos visiteurs le sentent, et Google le récompense.",
          "La sécurité : pas de base de données ni de plugins, c'est autant de portes d'entrée en moins pour les mauvaises surprises.",
          "La sérénité : rien ne casse tout seul après une mise à jour d'extension, et l'hébergement coûte une fraction de celui d'un site dynamique.",
        ],
      },
      { t: "h2", c: "Le SEO local, pensé dès la conception" },
      {
        t: "p",
        c: "Parce qu'un beau site que personne ne trouve ne sert à rien, le référencement a été traité comme un matériau de construction, pas comme une couche de peinture. Métadonnées travaillées, données structurées qui décrivent mon activité et mes zones d'intervention (Charente, Charente-Maritime, Nouvelle-Aquitaine, Gers, Île-de-France), textes pensés pour les recherches locales : résultat, un score SEO de 100/100 avec une vraie logique locale derrière.",
      },
      {
        t: "quote",
        c: "Un site sur-mesure, ce n'est pas un caprice de graphiste : c'est un outil de travail taillé pour votre activité.",
      },
      { t: "h2", c: "Et pour votre projet ?" },
      {
        t: "p",
        c: "C'est exactement cette approche que je propose à mes clients : partir de votre identité et de vos objectifs, concevoir une maquette qui vous ressemble, puis coder un site rapide, sécurisé et simple à faire vivre. Du site essentiel au site sur-mesure complet, chaque projet commence par un échange pour cerner ce dont vous avez vraiment besoin.",
      },
      {
        t: "p",
        c: "Envie de retravailler votre présence en ligne ? Le simulateur de budget sur la page d'accueil vous donne une première idée, et pour le reste, écrivez-moi : je serai ravie d'en discuter, autour d'un café virtuel ou charentais.",
      },
    ],
  },
];

export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug);

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
