export default function Footer() {
  return (
    <footer className="sitefoot">
      <div className="wrap">
        <span>© {new Date().getFullYear()} EpC — Emma Pouget Communication · Charente ↔ Paris</span>
        <span>
          <a href="/mentions-legales">Mentions légales</a> &nbsp;·&nbsp; <a href="/confidentialite">Confidentialité &amp; cookies</a>
        </span>
      </div>
    </footer>
  );
}
