import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ARTICLES, getArticle, formatDate } from "@/lib/journal";

const SITE_URL = "https://ep-communication.fr";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const a = getArticle(params.slug);
  if (!a) return {};
  return {
    title: a.metaTitle || a.title,
    description: a.description,
    alternates: { canonical: `/journal/${a.slug}` },
    openGraph: {
      title: a.metaTitle || a.title,
      description: a.description,
      url: `${SITE_URL}/journal/${a.slug}`,
      type: "article",
      publishedTime: a.date,
      authors: ["Emma Pouget"],
    },
  };
}

export default function Article({ params }) {
  const a = getArticle(params.slug);
  if (!a) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/journal/${a.slug}#article`,
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: "fr-FR",
    mainEntityOfPage: `${SITE_URL}/journal/${a.slug}`,
    author: {
      "@type": "Person",
      name: "Emma Pouget",
      url: SITE_URL,
      sameAs: [
        "https://www.instagram.com/emmapouget.communication/",
        "https://www.linkedin.com/in/emmapougetcommunication/",
      ],
    },
    publisher: { "@id": `${SITE_URL}/#business` },
    articleSection: a.category,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="wrap jr-page jr-article">
        <a className="back" href="/journal">← Le Journal</a>
        <span className={`jr-cat jr-cat-solo jr-${a.color}`}>{a.category}</span>
        <h1 className="art-title" style={{ fontSize: "clamp(36px,5vw,72px)" }}>{a.title}</h1>
        <p className="legal-upd">
          Par Emma Pouget · <time dateTime={a.date}>{formatDate(a.date)}</time>
        </p>

        <div className="prose" style={{ marginTop: 36 }}>
          {a.body.map((b, i) => {
            if (b.t === "h2") return <h2 key={i}>{b.c}</h2>;
            if (b.t === "quote") return <blockquote key={i}>{b.c}</blockquote>;
            if (b.t === "ul") return <ul key={i}>{b.c.map((li, j) => <li key={j}>{li}</li>)}</ul>;
            return <p key={i}>{b.c}</p>;
          })}
        </div>

        <div className="jr-cta">
          <p>Un projet, une question ? Parlons-en autour d'un premier échange, gratuit et sans engagement.</p>
          <a className="pill" href="/#contact">Parlons de votre projet <span className="arw">→</span></a>
        </div>
      </main>
      <Footer />
    </>
  );
}
