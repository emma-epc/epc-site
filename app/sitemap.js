import { ARTICLES } from "@/lib/journal";

const SITE_URL = "https://ep-communication.fr";

export default function sitemap() {
  const now = new Date();
  // Les pages légales (noindex) ne sont pas listées : un sitemap ne doit
  // référencer que des pages destinées à l'index.
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...ARTICLES.map((a) => ({
      url: `${SITE_URL}/journal/${a.slug}`,
      lastModified: new Date(`${a.date}T12:00:00`),
      changeFrequency: "yearly",
      priority: 0.7,
    })),
  ];
}
