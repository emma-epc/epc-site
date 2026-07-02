const SITE_URL = "https://ep-communication.fr";

export default function robots() {
  return {
    // Pas de disallow : les pages légales portent une meta noindex, et Google
    // doit pouvoir les crawler pour la voir (un disallow l'en empêcherait et
    // risquerait une indexation « URL seule » sans contenu).
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
