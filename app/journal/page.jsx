import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ARTICLES, formatDate } from "@/lib/journal";

export const metadata = {
  title: "Le Journal — conseils réseaux sociaux, contenus & visibilité locale",
  description:
    "Conseils réseaux sociaux, coulisses de projets, visibilité locale et événementiel : le journal d'Emma Pouget, freelance en communication en Charente.",
  alternates: { canonical: "/journal" },
  openGraph: {
    title: "Le Journal — EpC, Emma Pouget Communication",
    description:
      "Conseils réseaux sociaux, coulisses de projets, visibilité locale et événementiel, depuis la Charente.",
    url: "https://ep-communication.fr/journal",
    type: "website",
  },
};

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://ep-communication.fr/journal#blog",
  name: "Le Journal — EpC, Emma Pouget Communication",
  url: "https://ep-communication.fr/journal",
  inLanguage: "fr-FR",
  publisher: { "@id": "https://ep-communication.fr/#business" },
  blogPost: ARTICLES.map((a) => ({
    "@type": "BlogPosting",
    headline: a.title,
    url: `https://ep-communication.fr/journal/${a.slug}`,
    datePublished: a.date,
    author: { "@type": "Person", name: "Emma Pouget" },
  })),
};

export default function Journal() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <Nav />
      <main className="wrap jr-page">
        <a className="back" href="/">← Accueil</a>
        <h1 className="art-title">Le Journal</h1>
        <p className="jr-intro">
          Conseils réseaux sociaux, coulisses de projets et visibilité locale : ce que
          j'apprends sur le terrain, partagé sans jargon, depuis la Charente.
        </p>

        <div className="jr-grid">
          {ARTICLES.map((a) => (
            <a className={`jr-card jr-${a.color}`} key={a.slug} href={`/journal/${a.slug}`}>
              <span className="jr-cat">{a.category}</span>
              <h2 className="jr-title">{a.title}</h2>
              <p className="jr-excerpt">{a.excerpt}</p>
              <span className="jr-meta">
                <time dateTime={a.date}>{formatDate(a.date)}</time>
                <span className="jr-read">Lire <span className="arw">→</span></span>
              </span>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
