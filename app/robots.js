const SITE_URL = "https://ep-communication.fr";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/mentions-legales", "/confidentialite"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
