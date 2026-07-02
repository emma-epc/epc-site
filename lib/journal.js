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
   - color       : teinte de la carte — "rose" | "lilas" | "sauge" | "moutarde" | "sable"
   - date        : "AAAA-MM-JJ" (date de publication)
   - excerpt     : accroche affichée sur la carte (1-2 phrases)
   - body        : blocs { t: "p" | "h2" | "ul" | "quote", c: texte ou tableau }
*/

export const CATEGORIES = [
  "Réseaux sociaux & contenus",
  "Sites web & visibilité locale",
  "Études de cas & coulisses",
  "Événementiel & mariage",
];

export const ARTICLES = [
  {
    slug: "creation-site-internet-sur-mesure-coulisses-epc",
    title: "Coulisses : comment j'ai créé le site d'EpC, codé sur-mesure",
    metaTitle: "Création d'un site internet sur-mesure : les coulisses du site EpC",
    description:
      "Pourquoi j'ai codé mon site sur-mesure, sans CMS ni template : identité Matisse, rapidité, sécurité, SEO local. Les coulisses du site EpC, en Charente.",
    category: "Sites web & visibilité locale",
    color: "moutarde",
    date: "2026-07-02",
    excerpt:
      "Ni CMS, ni template : mon site est entièrement codé sur-mesure. Je vous ouvre les coulisses, du logo en papiers découpés jusqu'à la mise en ligne.",
    body: [
      {
        t: "p",
        c: "Quand j'ai voulu refaire le site d'EpC, j'avais une certitude : il devait me ressembler. Pas un thème acheté, pas un template rempli à la va-vite, pas une usine à gaz avec quarante extensions. Un site pensé pour mon activité, dessiné autour de mon identité, et codé sur-mesure de la première à la dernière ligne.",
      },
      { t: "h2", c: "Tout part de l'identité, pas de la technique" },
      {
        t: "p",
        c: "Avant d'écrire le moindre code, il y a eu le logo : un badge circulaire inspiré des papiers découpés de Matisse, avec ses fleurs, ses vagues et ses étoiles colorées. C'est lui qui a donné la palette du site (terracotta, moutarde, rose, lilas, sauge), ses formes rondes et son ton chaleureux. Sur le site, ce logo n'est pas une simple image : il s'assemble sous vos yeux à l'arrivée, calque par calque, et les petites formes éclosent autour des lettres.",
      },
      {
        t: "p",
        c: "C'est exactement ce que permet le sur-mesure : le design n'est pas contraint par un thème existant. La navigation aux yeux qui suivent votre souris, les vidéos de projets qui s'agrandissent au fil du scroll, le simulateur de budget, le module de prise de rendez-vous... tout a été conçu pour cette identité précise, et rien d'autre.",
      },
      { t: "h2", c: "Sans CMS : plus rapide, plus sûr, plus léger" },
      {
        t: "p",
        c: "Le site est construit avec React et Next.js, puis publié sous forme de pages statiques : concrètement, il n'y a ni base de données, ni espace d'administration, ni extensions à mettre à jour tous les quinze jours. Ce choix a trois conséquences très concrètes.",
      },
      {
        t: "ul",
        c: [
          "La vitesse : des pages statiques se chargent quasi instantanément, ce que Google récompense et que vos visiteurs sentent immédiatement.",
          "La sécurité : pas de base de données ni de plugins, c'est autant de portes d'entrée en moins. Un site statique n'a pratiquement pas de surface d'attaque.",
          "La sérénité : rien ne casse tout seul après une mise à jour d'extension, et l'hébergement coûte une fraction de celui d'un site dynamique.",
        ],
      },
      { t: "h2", c: "Le SEO local, intégré dès la conception" },
      {
        t: "p",
        c: "Un beau site que personne ne trouve ne sert à rien. Le référencement a donc été traité comme un matériau de construction, pas comme une couche de peinture : métadonnées travaillées, données structurées qui décrivent mon activité et mes zones d'intervention (Charente, Charente-Maritime, Nouvelle-Aquitaine, Gers, Île-de-France), images optimisées, textes pensés pour les recherches locales.",
      },
      {
        t: "quote",
        c: "Un site sur-mesure, ce n'est pas un luxe de graphiste : c'est un outil de travail taillé pour votre activité.",
      },
      { t: "h2", c: "Et pour votre projet ?" },
      {
        t: "p",
        c: "C'est exactement cette approche que je propose à mes clients : partir de votre identité et de vos objectifs, concevoir une maquette qui vous ressemble, puis coder un site rapide, sécurisé et simple à faire vivre. Du site essentiel d'une page au site sur-mesure complet, chaque projet commence par un échange pour cerner ce dont vous avez vraiment besoin.",
      },
      {
        t: "p",
        c: "Envie d'en parler ? Utilisez le simulateur de budget sur la page d'accueil pour vous faire une idée, ou prenez directement rendez-vous pour un premier échange : c'est gratuit, sans engagement, et ça se passe autour d'un café (virtuel ou charentais).",
      },
    ],
  },
];

export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug);

export const formatDate = (iso) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
