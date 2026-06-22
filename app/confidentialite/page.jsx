import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Confidentialité & cookies — EpC, Emma Pouget Communication",
  description: "Politique de confidentialité et gestion des cookies du site ep-communication.fr, conforme au RGPD.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/confidentialite" },
};

export default function Confidentialite() {
  return (
    <>
      <Nav />
      <main className="wrap legalpage" style={{ paddingTop: 180, paddingBottom: 120, maxWidth: 820 }}>
        <a className="back" href="/">← Accueil</a>
        <h1 className="art-title" style={{ fontSize: "clamp(36px,6vw,68px)" }}>Confidentialité &amp; cookies</h1>
        <p className="legal-upd">Dernière mise à jour&nbsp;: juin 2026.</p>

        <div className="prose" style={{ marginTop: 30 }}>
          <p>
            La présente politique décrit la manière dont sont collectées et traitées vos données personnelles sur le
            site <strong>ep-communication.fr</strong>, conformément au Règlement (UE) 2016/679 du 27 avril 2016 (RGPD)
            et à la loi n° 78-17 du 6 janvier 1978 modifiée dite « Informatique et Libertés ».
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>
            Le responsable du traitement est <strong>Emma Pouget</strong> (EpC — Emma Pouget Communication),
            10 rue du Commerce, 17800 Montils, France.<br />
            Contact&nbsp;: <a href="mailto:emma.pouget@ep-communication.fr">emma.pouget@ep-communication.fr</a>.
          </p>

          <h2>2. Données collectées</h2>
          <p>Seules les données que vous transmettez volontairement sont collectées&nbsp;:</p>
          <ul>
            <li><strong>Formulaire de prise de rendez-vous</strong>&nbsp;: type de prestation, prénom, nom, adresse e-mail, société (facultatif) et localisation.</li>
            <li><strong>Échanges</strong>&nbsp;: les informations contenues dans les messages que vous nous adressez (par formulaire ou e-mail).</li>
            <li><strong>Estimation budgétaire</strong>&nbsp;: les options sélectionnées dans le simulateur, transmises avec votre demande de rendez-vous (le cas échéant).</li>
            <li><strong>Données techniques</strong>&nbsp;: données de connexion strictement nécessaires au bon fonctionnement et à la sécurité du site.</li>
          </ul>
          <p>Aucune vente en ligne n'est réalisée sur ce site. Aucune donnée sensible n'est collectée.</p>

          <h2>3. Finalités &amp; bases légales</h2>
          <ul>
            <li>Répondre à vos demandes et organiser un rendez-vous&nbsp;: exécution de mesures précontractuelles prises à votre demande (art. 6.1.b du RGPD).</li>
            <li>Gérer la relation et établir un devis&nbsp;: intérêt légitime / mesures précontractuelles (art. 6.1.b et 6.1.f).</li>
            <li>Assurer la sécurité et le fonctionnement du site&nbsp;: intérêt légitime (art. 6.1.f).</li>
            <li>Respecter nos obligations légales et comptables&nbsp;: obligation légale (art. 6.1.c).</li>
          </ul>

          <h2>4. Destinataires &amp; sous-traitants</h2>
          <p>
            Vos données sont destinées à Emma Pouget uniquement et ne sont jamais cédées ni revendues. Elles peuvent
            être traitées par des prestataires techniques agissant en qualité de sous-traitants&nbsp;:
          </p>
          <ul>
            <li><strong>OVH SAS</strong> (hébergement / messagerie) — données hébergées dans l'Union européenne.</li>
            <li><strong>Calendly LLC</strong> (prise de rendez-vous en ligne), le cas échéant — voir transferts ci-dessous.</li>
          </ul>

          <h2>5. Transferts hors Union européenne</h2>
          <p>
            L'outil de prise de rendez-vous Calendly est édité par une société établie aux États-Unis. Lorsqu'il est
            utilisé, un transfert de données hors UE peut avoir lieu&nbsp;; il est encadré par des garanties
            appropriées (clauses contractuelles types de la Commission européenne et/ou adhésion au
            <em> Data Privacy Framework</em>). À défaut d'utilisation de Calendly, vos demandes sont traitées par
            e-mail au sein de l'UE.
          </p>

          <h2>6. Durée de conservation</h2>
          <ul>
            <li>Demandes de contact / rendez-vous sans suite&nbsp;: jusqu'à 3 ans à compter du dernier contact.</li>
            <li>Données liées à une relation contractuelle&nbsp;: durée de la prestation, puis archivage selon les obligations légales (notamment comptables&nbsp;: 10 ans).</li>
            <li>Données techniques / journaux&nbsp;: durée strictement nécessaire à la sécurité.</li>
          </ul>

          <h2>7. Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez des droits d'accès, de rectification, d'effacement, de limitation,
            d'opposition et de portabilité de vos données, ainsi que du droit de définir des directives relatives à
            leur sort après votre décès. Pour les exercer, écrivez à
            <a href="mailto:emma.pouget@ep-communication.fr"> emma.pouget@ep-communication.fr</a> (une preuve
            d'identité pourra être demandée).
          </p>
          <p>
            Vous pouvez également introduire une réclamation auprès de la CNIL&nbsp;: Commission Nationale de
            l'Informatique et des Libertés, 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer"> www.cnil.fr</a>.
          </p>

          <h2>8. Cookies &amp; traceurs</h2>
          <p>
            Ce site ne dépose <strong>aucun cookie publicitaire ni traceur de mesure d'audience</strong> (pas de
            Google Analytics, pas de pixel publicitaire, pas de réseau social embarqué). Il n'utilise que les
            cookies et traceurs strictement nécessaires à son fonctionnement et à sa sécurité, qui ne requièrent pas
            de consentement préalable au titre de l'article 82 de la loi Informatique et Libertés.
          </p>
          <p>
            L'agenda de prise de rendez-vous <strong>Calendly</strong> n'est chargé que si vous le sollicitez
            explicitement, en ouvrant l'étape «&nbsp;Choisir un créneau&nbsp;» du module de prise de rendez-vous. À
            ce moment seulement, Calendly peut déposer des cookies fonctionnels nécessaires à l'affichage et au bon
            fonctionnement de son agenda. Tant que vous n'ouvrez pas cet agenda, aucun cookie tiers n'est déposé.
          </p>
          <p>
            Un bandeau d'information vous est présenté lors de votre première visite&nbsp;; il rappelle ces éléments
            et renvoie vers la présente politique. Vous pouvez à tout moment configurer votre navigateur pour gérer
            ou supprimer les cookies déjà enregistrés.
          </p>

          <h2>9. Sécurité</h2>
          <p>
            Des mesures techniques et organisationnelles appropriées sont mises en œuvre pour protéger vos données
            contre tout accès, altération ou divulgation non autorisés.
          </p>

          <h2>10. Modifications</h2>
          <p>
            La présente politique peut être mise à jour à tout moment. La date de dernière mise à jour figure en
            haut de page.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
