import { Anonymous_Pro } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";
import ScrollHalo from "@/components/ScrollHalo";
import CookieNotice from "@/components/CookieNotice";

/* Corps de texte : Anonymous Pro (Google).
   Titres : Gulfs Display — chargée en local via @font-face dans globals.css
   (déposer le fichier dans /public/fonts/, cf. public/fonts/README.txt).
   Tant que le fichier n'est pas présent, un fallback serif élégant prend le relais. */
const anon = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-anon",
  display: "swap",
});

const SITE_URL = "https://ep-communication.fr";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Community manager & création de site internet en Charente — Emma Pouget (EpC)",
    template: "%s | EpC — Emma Pouget Communication",
  },
  description:
    "Emma Pouget (EpC), freelance en communication & community manager à Cognac (Charente) : réseaux sociaux, création de contenus photo/vidéo et reels, sites internet sur-mesure, formation et contenus événementiels. Charente, Charente-Maritime, Nouvelle-Aquitaine, Gers, Île-de-France — et bientôt les Landes.",
  keywords: [
    "freelance communication Charente",
    "community manager Cognac",
    "community manager Saintes",
    "community manager Angoulême",
    "community manager La Rochelle",
    "community manager Charente-Maritime",
    "community manager Bordeaux",
    "community manager Gers",
    "community manager Landes",
    "community manager Mont-de-Marsan",
    "community manager Auch",
    "community manager Paris",
    "freelance communication Île-de-France",
    "gestion réseaux sociaux Charente",
    "création de site internet Cognac",
    "création de site internet Charente",
    "création de contenus photo et vidéo",
    "création de reels",
    "création de contenus événementiels",
    "création de contenus mariage",
    "couverture événement Charente",
    "formation communication Cognac",
    "formation réseaux sociaux",
    "intervention communication école",
    "stratégie digitale Nouvelle-Aquitaine",
    "communication digitale Charente",
    "freelance communication Bordeaux",
    "freelance communication Gers",
    "freelance communication Mont-de-Marsan",
    "Emma Pouget communication",
  ],
  authors: [{ name: "Emma Pouget" }],
  creator: "Emma Pouget",
  publisher: "Emma Pouget Communication",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Community manager & création de site internet en Charente — Emma Pouget",
    description:
      "Une présence digitale qui vous ressemble. Réseaux sociaux, création de contenus photo/vidéo, sites internet, formation et événementiel — Charente, Charente-Maritime, Nouvelle-Aquitaine, Gers, Île-de-France, et bientôt les Landes.",
    url: SITE_URL,
    siteName: "EpC — Emma Pouget Communication",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/logo-epc.png", width: 1000, height: 1000, alt: "EpC — Emma Pouget Communication" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Community manager & création de site internet en Charente — Emma Pouget",
    description: "Réseaux sociaux, contenus photo/vidéo & reels, sites internet sur-mesure, formation, événementiel. Charente, Charente-Maritime, Nouvelle-Aquitaine, Gers, Île-de-France — bientôt les Landes.",
    images: ["/logo-epc.png"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
};

/* Données structurées (JSON-LD) — référencement local Charente / Nouvelle-Aquitaine / Gers */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: "EpC — Emma Pouget Communication",
  alternateName: "Emma Pouget Communication",
  url: SITE_URL,
  image: `${SITE_URL}/logo-epc.png`,
  logo: `${SITE_URL}/logo-epc.png`,
  email: "emma.pouget@ep-communication.fr",
  description:
    "Freelance en communication & community manager en Charente. Community management et réseaux sociaux, stratégie digitale, création de contenus photo et vidéo (reels), couverture d'événements (dont mariages), création de sites internet sur-mesure, formation et interventions en école.",
  priceRange: "€€",
  founder: {
    "@type": "Person",
    name: "Emma Pouget",
    jobTitle: "Consultante en communication digitale & community manager",
    worksFor: { "@id": `${SITE_URL}/#business` },
    sameAs: ["https://www.instagram.com/emmapouget.communication/", "https://www.linkedin.com/in/emmapougetcommunication/"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "10 rue du Commerce",
    postalCode: "17800",
    addressLocality: "Montils",
    addressRegion: "Nouvelle-Aquitaine",
    addressCountry: "FR",
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Charente (16)" },
    { "@type": "AdministrativeArea", name: "Charente-Maritime (17)" },
    { "@type": "AdministrativeArea", name: "Nouvelle-Aquitaine" },
    { "@type": "AdministrativeArea", name: "Gironde (33)" },
    { "@type": "AdministrativeArea", name: "Gers (32)" },
    { "@type": "AdministrativeArea", name: "Landes (40)" },
    { "@type": "AdministrativeArea", name: "Occitanie" },
    { "@type": "AdministrativeArea", name: "Île-de-France" },
    { "@type": "City", name: "Cognac" },
    { "@type": "City", name: "Saintes" },
    { "@type": "City", name: "Angoulême" },
    { "@type": "City", name: "Bordeaux" },
    { "@type": "City", name: "La Rochelle" },
    { "@type": "City", name: "Royan" },
    { "@type": "City", name: "Jonzac" },
    { "@type": "City", name: "Mont-de-Marsan" },
    { "@type": "City", name: "Auch" },
    { "@type": "City", name: "Pavie" },
    { "@type": "City", name: "Paris" },
  ],
  knowsAbout: [
    "Community management", "Gestion des réseaux sociaux", "Stratégie digitale", "Communication digitale",
    "Création de contenus", "Création de contenus photo et vidéo", "Reels", "Création de contenus événementiels",
    "Création de contenus de mariage", "Couverture d'événements", "Création de sites internet sur-mesure",
    "Formation en communication", "Formation aux réseaux sociaux", "Interventions en école de communication",
  ],
  sameAs: ["https://www.instagram.com/emmapouget.communication/", "https://www.linkedin.com/in/emmapougetcommunication/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations",
    itemListElement: [
      "Community management & réseaux sociaux", "Stratégie digitale", "Création de contenus photo et vidéo",
      "Création de sites internet", "Event Content Creator", "Formation en communication & réseaux sociaux",
    ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={anon.variable}>
      <body>
        {/* Préchargement prioritaire des images : le wordmark du loader + les 3
            calques du hero se téléchargent pendant l'écran de chargement, et sont
            donc déjà prêts au moment où le hero apparaît → meilleur LCP sur mobile.
            Aucun impact visuel : on ne change que l'ordre/priorité de chargement. */}
        <link rel="preload" as="image" href="/wordmark.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/logo-letters.png" fetchPriority="high" />
        <link rel="preload" as="image" href="/logo-ring.png" />
        <link rel="preload" as="image" href="/logo-shapes.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        <ScrollHalo />
        <Grain />
        {children}
        <CookieNotice />
      </body>
    </html>
  );
}
