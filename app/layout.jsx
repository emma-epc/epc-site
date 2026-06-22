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
    default: "Emma Pouget Communication — Community manager & freelance en Charente (Cognac, Saintes) | EpC",
    template: "%s | EpC — Emma Pouget Communication",
  },
  description:
    "Emma Pouget (EpC), freelance et community manager en Charente, entre Cognac et Saintes. Community management, stratégie digitale, création de contenus, sites web et formation en Nouvelle-Aquitaine, en Île-de-France et dans le Gers.",
  keywords: [
    "community manager Charente",
    "community manager Cognac",
    "community manager Saintes",
    "freelance communication Charente",
    "freelance communication Nouvelle-Aquitaine",
    "stratégie digitale Cognac",
    "création de contenus Charente",
    "création site web Cognac",
    "community manager Gers",
    "agence communication Nouvelle-Aquitaine",
    "Emma Pouget communication",
  ],
  authors: [{ name: "Emma Pouget" }],
  creator: "Emma Pouget",
  publisher: "Emma Pouget Communication",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Emma Pouget Communication — Community manager & freelance en Charente",
    description:
      "Une présence digitale qui vous ressemble. Community management, stratégie, contenus, sites web et formation — Nouvelle-Aquitaine, Île-de-France et Gers.",
    url: SITE_URL,
    siteName: "EpC — Emma Pouget Communication",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/logo-epc.png", width: 1000, height: 1000, alt: "EpC — Emma Pouget Communication" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emma Pouget Communication — Community manager freelance en Charente",
    description: "CM, stratégie digitale, contenus, sites web et formation. Charente, Nouvelle-Aquitaine, Île-de-France, Gers.",
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
    "Freelance et community manager en Charente. Community management, stratégie digitale, création de contenus, création de sites web et formation.",
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
    { "@type": "AdministrativeArea", name: "Gers (32)" },
    { "@type": "AdministrativeArea", name: "Île-de-France" },
    { "@type": "City", name: "Cognac" },
    { "@type": "City", name: "Saintes" },
    { "@type": "City", name: "Angoulême" },
    { "@type": "City", name: "La Rochelle" },
    { "@type": "City", name: "Royan" },
    { "@type": "City", name: "Jonzac" },
    { "@type": "City", name: "Auch" },
  ],
  knowsAbout: ["Community management", "Stratégie digitale", "Création de contenus", "Création de sites web", "Formation", "Réseaux sociaux"],
  sameAs: ["https://www.instagram.com/emmapouget.communication/", "https://www.linkedin.com/in/emmapougetcommunication/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Prestations",
    itemListElement: [
      "Community management", "Stratégie digitale", "Formation", "Création de sites web", "Event Content Creator",
    ].map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s } })),
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={anon.variable}>
      <body>
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
