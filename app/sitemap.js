const SITE_URL = "https://ep-communication.fr";

export default function sitemap() {
  const now = new Date();
  // Seule la page d'accueil est listée : les pages légales sont en noindex
  // (un sitemap ne doit référencer que des pages destinées à l'index).
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
  ];
}
