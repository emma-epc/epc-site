/* ============================================================
   RÉGLAGES À PERSONNALISER PAR EMMA
   ============================================================ */

/* Lien Calendly (planning de prise de rendez-vous).
   1. Créer un compte sur https://calendly.com (gratuit) avec
      emma.pouget@ep-communication.fr → les rendez-vous arriveront sur ce mail.
   2. Créer un type d'événement « Premier échange » (15–30 min).
   3. Copier le lien public (ex. https://calendly.com/emma-pouget/premier-echange)
      et le coller ci-dessous à la place du placeholder.
   Tant que ce lien n'est pas remplacé, le bouton « Réserver » bascule
   automatiquement sur un e-mail pré-rempli (fallback) — rien n'est cassé. */
export const CALENDLY_URL = "https://calendly.com/emma-pouget-ep-communication/premier-echange-epc";

export const CONTACT_EMAIL = "emma.pouget@ep-communication.fr";

/* true si CALENDLY_URL a bien été renseigné (≠ placeholder). */
export const HAS_CALENDLY = !CALENDLY_URL.includes("VOTRE-LIEN");
