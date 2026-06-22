import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Mentions légales — EpC, Emma Pouget Communication",
  description: "Mentions légales du site ep-communication.fr — éditeur, hébergeur, propriété intellectuelle et responsabilité.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <>
      <Nav />
      <main className="wrap legalpage" style={{ paddingTop: 180, paddingBottom: 120, maxWidth: 820 }}>
        <a className="back" href="/">← Accueil</a>
        <h1 className="art-title" style={{ fontSize: "clamp(36px,6vw,68px)" }}>Mentions légales</h1>
        <p className="legal-upd">Dernière mise à jour&nbsp;: juin 2026.</p>

        <div className="prose" style={{ marginTop: 30 }}>
          <p>
            Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans
            l'économie numérique (LCEN), il est porté à la connaissance des utilisateurs et visiteurs du site
            <strong> ep-communication.fr</strong> les présentes mentions légales.
          </p>

          <h2>1. Éditeur du site</h2>
          <p>
            Le site est édité par <strong>Emma Pouget</strong>, entrepreneure individuelle exerçant sous l'enseigne
            <strong> EpC — Emma Pouget Communication</strong>.<br />
            Adresse&nbsp;: 10 rue du Commerce, 17800 Montils, France.<br />
            E-mail&nbsp;: <a href="mailto:emma.pouget@ep-communication.fr">emma.pouget@ep-communication.fr</a><br />
            SIREN&nbsp;: 934&nbsp;312&nbsp;893 — SIRET&nbsp;: 934&nbsp;312&nbsp;893&nbsp;00019<br />
            Entreprise individuelle immatriculée au Registre National des Entreprises (RNE).<br />
            Code APE / NAF&nbsp;: <strong>70.21Z</strong> — « Conseil en relations publiques et communication ».<br />
            TVA&nbsp;: TVA non applicable, article 293&nbsp;B du Code général des impôts (franchise en base de TVA).
            Emma Pouget n'est pas assujettie à la TVA&nbsp;; ses factures ne mentionnent donc pas de TVA.
          </p>

          <h2>2. Directrice de la publication</h2>
          <p>La directrice de la publication est <strong>Emma Pouget</strong>, en sa qualité d'éditrice du site.</p>

          <h2>3. Hébergeur</h2>
          <p>
            Le site est hébergé par <strong>Netlify, Inc.</strong>, 512 2nd Street, Suite 200, San Francisco,
            CA 94107, États-Unis — <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">www.netlify.com</a>.
          </p>
          <p>
            Le nom de domaine <strong>ep-communication.fr</strong> est réservé auprès d'<strong>OVH SAS</strong>,
            2 rue Kellermann, 59100 Roubaix, France.
          </p>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            L'ensemble des éléments composant le site (structure, textes, visuels, photographies, vidéos, logo
            « EpC », identité graphique, animations et code) est la propriété exclusive d'Emma Pouget ou de ses
            partenaires, et est protégé par le Code de la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie de ces
            éléments, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite
            préalable d'Emma Pouget. Toute exploitation non autorisée est susceptible de constituer une contrefaçon
            au sens des articles L.335-2 et suivants du Code de la propriété intellectuelle.
          </p>
          <p>
            Les marques, logos et contenus appartenant aux clients ou partenaires cités (réalisations, références)
            demeurent la propriété de leurs détenteurs respectifs et sont affichés avec leur accord.
          </p>

          <h2>5. Responsabilité</h2>
          <p>
            Emma Pouget s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le site,
            sans toutefois pouvoir en garantir l'exhaustivité. Les informations fournies le sont à titre indicatif
            et ne sauraient engager sa responsabilité.
          </p>
          <p>
            Les estimations tarifaires proposées par le simulateur de prix sont <strong>strictement indicatives</strong> et
            ne constituent ni un devis, ni une offre contractuelle. Seul un devis personnalisé, daté et accepté, a
            valeur d'engagement.
          </p>
          <p>
            Le site peut contenir des liens vers des sites tiers&nbsp;; Emma Pouget n'exerce aucun contrôle sur ces
            sites et décline toute responsabilité quant à leur contenu.
          </p>

          <h2>6. Données personnelles</h2>
          <p>
            Le traitement des données collectées via les formulaires de contact et de prise de rendez-vous est
            détaillé dans la <a href="/confidentialite">politique de confidentialité</a>, conformément au Règlement
            général sur la protection des données (RGPD) et à la loi « Informatique et Libertés ».
          </p>

          <h2>7. Cookies</h2>
          <p>
            Les modalités d'utilisation des cookies et traceurs sont décrites dans la
            <a href="/confidentialite"> politique de confidentialité</a>.
          </p>

          <h2>8. Médiation de la consommation</h2>
          <p>
            Les prestations proposées par EpC — Emma Pouget Communication s'adressent à une clientèle
            professionnelle (entreprises, marques, associations, indépendants) dans le cadre de leur activité.
            Le dispositif de médiation de la consommation prévu aux articles L.611-1 et suivants du Code de la
            consommation, réservé aux litiges entre un professionnel et un consommateur, n'est donc pas applicable
            et aucun médiateur de la consommation n'est désigné.
          </p>

          <h2>9. Droit applicable</h2>
          <p>
            Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut de
            résolution amiable, les tribunaux français seront seuls compétents.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
