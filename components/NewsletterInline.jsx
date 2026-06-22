"use client";

export default function NewsletterInline({ title, sub }) {
  return (
    <div className="lettre">
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="votre@email.fr" aria-label="Votre email" required />
        <button type="submit" className="magnetic">Je m&apos;abonne</button>
      </form>
    </div>
  );
}
