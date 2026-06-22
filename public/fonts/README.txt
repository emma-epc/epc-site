POLICE DES TITRES — GULFS DISPLAY
==================================

Le site utilise « Gulfs Display » pour tous les titres (h1, h2, h3, mots du
manifeste, etc.). Cette police n'est PAS disponible sur Google Fonts : il faut
déposer le fichier ici manuellement.

À FAIRE
-------
1. Récupérer le fichier de la police Gulfs Display (format .woff2 de préférence,
   sinon .otf / .ttf).
2. Le renommer en :
      gulfs-display.woff2      (idéal)
   ou gulfs-display.otf
3. Le déposer dans ce dossier : /public/fonts/

C'est tout — le @font-face est déjà branché dans app/globals.css.
Tant que le fichier n'est pas là, les titres s'affichent dans un serif de
secours (Georgia) pour que le site reste lisible.

Pour convertir une .otf/.ttf en .woff2 : https://cloudconvert.com/ttf-to-woff2
