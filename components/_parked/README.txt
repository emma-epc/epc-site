COMPOSANTS MIS DE CÔTÉ (non utilisés actuellement)
==================================================

FlowerMascot3D.jsx
  Le personnage 3D (designer-toy) qui sortait du Hero au chargement.
  Retiré du site à la demande d'Emma (juin 2026), conservé ici pour pouvoir
  le retravailler plus tard. Pour le réactiver : le réimporter dans
  app/page.jsx (import dynamique ssr:false) et le replacer dans le Hero,
  + restaurer .hero-corner dans globals.css.

Cursor.jsx
  L'ancien curseur personnalisé (rond qui suivait la souris + halo au survol).
  Remplacé par le halo de scroll (components/ScrollHalo.jsx). Conservé au cas où.
