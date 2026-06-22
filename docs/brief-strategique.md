# Brief stratégique — Site EpC (Emma Pouget Communication)

*Document de cadrage. Complète l'identité de marque (Papier Vivant) et l'arborescence. À ajuster avec tes vrais chiffres et objectifs.*

---

## 1. Positionnement

**« Ancrée en Charente, connectée à Paris. »**
Freelance en communication qui réunit quatre savoir-faire — community management, stratégie digitale, création de contenus, création de sites web — avec une légitimité supplémentaire d'**intervenante en écoles supérieures**.

Le territoire libre (ce que personne ne tient à la fois) : **rigueur stratégique + chaleur humaine + preuve par le résultat + posture de formatrice.**

Promesse : *Une présence digitale qui vous ressemble.*
Signature : *Tout ce qui nous touche commence par des mots.*

---

## 2. Objectifs & KPIs (6 premiers mois)

| Objectif | Indicateur | Cible de départ (à ajuster) |
|---|---|---|
| Générer des contacts qualifiés | Demandes via formulaire / mois | 4–6 |
| Construire l'audience email | Inscrits à La Lettre | +30 / mois |
| Se référencer localement | Mots-clés en page 1 (Charente) | 5–10 |
| Asseoir la crédibilité | Interventions écoles / conférences | maintenir + afficher |
| Preuve sociale | Études de cas publiées | 1 / mois |

> Règle stats du site : **tes chiffres d'abord** (crédibilité + résultats), chiffres du métier au compte-gouttes.

---

## 3. Personas (3 cibles)

**1. La TPE / PME locale** *(Nouvelle-Aquitaine)*
Artisan, commerçant, vigneron, restaurateur. Veut déléguer ses réseaux à quelqu'un de **proche et humain**. Cherche à être rassuré, pas noyé sous le jargon. → Lui parler simple, montrer la proximité et des résultats concrets.

**2. La marque / l'agence** *(Paris & ailleurs)*
Cherche une freelance **fiable et créative** en renfort ponctuel ou récurrent. Veut de la **preuve** : portfolio, cas clients, chiffres. → Lui montrer le niveau d'exigence et les réalisations.

**3. L'école / l'organisme de formation**
Cherche une **intervenante experte et légitime** sur la com digitale. Veut le parcours, les sujets, un media kit. → Volet « Interventions & Formations » + CV des interventions + bouton de sollicitation.

---

## 4. Parcours de conversion

Deux appels à l'action, partout :
- **Lien faible → La Lettre** (newsletter) : capte ceux qui ne sont pas prêts à acheter.
- **Lien fort → On se parle ?** (contact) : pour les prospects chauds.

Chaque section pose une **preuve** (stats, logos, résultats, témoignage) *avant* de demander quoi que ce soit.

---

## 5. Stratégie SEO

### Architecture d'URL
```
/                      accueil
/services              (détail des 4 piliers)
/realisations          galerie
/realisations/[slug]   étude de cas
/journal               blog
/journal/[slug]        article
/a-propos              + interventions/formations
/contact               + zone d'intervention
```

### SEO local — le levier n°1 à court terme
Mots-clés peu concurrentiels et très qualifiés, par ville :

| Ville / zone | Requêtes cibles |
|---|---|
| Angoulême (16) | « community manager Angoulême », « création site web Angoulême » |
| Cognac (16) | « stratégie digitale Cognac », « community manager Cognac » |
| Saintes / Royan (17) | « freelance communication Saintes », « CM La Rochelle » |
| La Rochelle (17) | « community manager La Rochelle », « agence réseaux sociaux La Rochelle » |
| Auch / Gers (32) | « communication digitale Gers », « création site web Auch » |
| Nouvelle-Aquitaine | « freelance communication Nouvelle-Aquitaine » |
| Paris / à distance | « freelance community manager », « consultante réseaux sociaux » |

### On-page (déjà câblé dans le code)
- `title` + `meta description` par page, Open Graph (beaux partages LinkedIn).
- Structure Hn rigoureuse, URLs propres.
- À ajouter en prod : `sitemap.xml`, `robots.txt`, données structurées `LocalBusiness` (NAP : nom, adresse, zone), fiche Google Business.

---

## 6. Plan éditorial — Le Journal

**Rythme réaliste** : 2 à 4 articles / mois. Mieux vaut régulier que parfait.

**4 catégories** :
- *News réseaux* — l'actu décryptée (régularité = bon pour le SEO).
- *Retour client* — coulisses d'une mission (preuve + humain).
- *Conseils* — tips pratiques (mots-clés longue traîne).
- *Coulisses* — ton quotidien de freelance (lien, personnalité).

**10 premiers sujets (déjà 4 rédigés comme placeholders) :**
1. Le nouvel algo Instagram et les TPE *(fait)*
2. Coulisses : refonte d'une maison de cognac *(fait)*
3. 5 erreurs de com locale *(fait)*
4. La newsletter, arme secrète des indépendants *(fait)*
5. Réussir sa com locale à Cognac (SEO local)
6. Faut-il être sur TikTok quand on est une TPE de province ?
7. Avant/après : 3 feeds Instagram transformés
8. Comment je construis une stratégie de contenu en 4 étapes
9. Enseigner la com en école : ce que ça m'apprend sur le métier
10. Le calendrier éditorial qui tient toute l'année

> Production : actuellement les articles vivent dans `lib/journal.js`. **En prod, migrer vers MDX** (fichiers `.mdx` versionnés) ou un **CMS léger** (ex. Sanity, Contentful, Notion) pour qu'Emma écrive sans toucher au code.

---

## 7. RGPD / newsletter
- **Double opt-in** obligatoire + case de consentement explicite.
- Page de confirmation + lien de désinscription dans chaque envoi.
- Mentions légales + politique de confidentialité.

---

## 8. Roadmap technique (état au build)

- [x] Identité Papier Vivant + système de logo
- [x] Proto motion validé
- [x] Site Next.js scaffoldé + **page d'accueil**
- [x] **Le Journal** (liste + article) avec SEO
- [ ] Pages Réalisations + Études de cas (galerie filtrable, avant/après détaillés)
- [ ] Page À propos + Interventions/Formations
- [ ] Page Contact + carte zone d'intervention
- [ ] Responsive mobile peaufiné + accessibilité (WCAG AA)
- [ ] Intégration du **logo TAN master** (remplace le placeholder Fraunces de la nav)
- [ ] Vrais contenus (cas clients, logos marques, photos) + CMS Journal
- [ ] SEO prod (sitemap, robots, données structurées, Google Business)
