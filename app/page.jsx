"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import Loader from "@/components/Loader";
import HeroLogo from "@/components/HeroLogo";
import Booking from "@/components/Booking";
import ServiceModal from "@/components/ServiceModal";

/* ===== MANIFESTE — 3 mots, chacun une couleur du logo ===== */
const manifesto = [
  { side: "l", word: "Communication", color: "#B85C4A" }, // terracotta
  { side: "r", word: "Digitale", color: "#5F7E6A" },      // sauge profonde
  { side: "l", word: "Studio Créatif", color: "#8E78B8" },// lilas profond
];

/* ===== RÉALISATIONS (placeholders — vidéos/chiffres réels à fournir) =====
   side : côté de la vidéo (right = 1 & 3, left = 2, animation miroir). */
const reels = [
  {
    side: "right", client: "Events by Nicolas", vid: "/reels/events-nicolas.mp4", grad: "linear-gradient(135deg,#EF7BA9,#E2C9A6)",
    blurb: "Accompagnement d'Events by Nicolas en stratégie digitale, community management, création de contenus et couverture d'événements professionnels, notamment lors du Meeting National de l'Air organisé par la FOSA à Cognac.",
    stats: [{ to: 3, label: "réseaux sociaux" }, { to: 12, label: "réels créés par mois" }],
  },
  {
    side: "left", client: "Les Abattoirs\nCognac", vid: "/reels/les-abattoirs.mp4", grad: "linear-gradient(135deg,#92B29C,#E9A92E)",
    blurb: "Accompagnement des Abattoirs à Cognac en stratégie digitale, community management, création de contenus et campagnes Meta, avec une présence régulière lors des concerts, résidences artistiques et événements du lieu.",
    stats: [{ to: 319, suffix: "k", label: "vues cumulées en 1 mois" }, { to: 80, prefix: "+", label: "vidéos réalisées" }, { to: 30, prefix: "+", label: "événements couverts" }],
  },
  {
    side: "right", client: "La Base", vid: "/reels/la-base.mp4", grad: "linear-gradient(135deg,#BCA9DE,#EF7BA9)",
    blurb: "Accompagnement de La Base, guinguette située à la Base Plein Air de Cognac, en stratégie digitale, community management et création de contenus sur le mois de lancement.",
    stats: [{ to: 236599, label: "impressions cumulées" }, { to: 1541, label: "abonnés en +" }, { to: 54, prefix: "+", suffix: "k", label: "vues sur une vidéo Facebook" }],
  },
];

/* Logos clients (dans public/clients/) */
const clients = [
  { src: "/clients/events-by-nicolas.png", alt: "Events by Nicolas", big: true },
  { src: "/clients/les-abattoirs.png", alt: "Les Abattoirs de Cognac" },
  { src: "/clients/le-vert-en-lair.png", alt: "Le Lac de la Gimone" },
  { src: "/clients/gin-2934.png", alt: "29.34 Gin" },
  { src: "/clients/jukebox.png", alt: "Jukebox Brasserie" },
  { src: "/clients/la-gimone.png", alt: "La Gimone" },
  { src: "/clients/paima-beaute.png", alt: "Païma Beauté" },
  { src: "/clients/parinat.png", alt: "Parinat" },
  { src: "/clients/pellenc.png", alt: "Pellenc" },
  { src: "/clients/mediaschool.png", alt: "MediaSchool" },
  { src: "/clients/mymosa.png", alt: "Mymosa", big: true },
  { src: "/clients/pres-des-reines.png", alt: "Près des Reines" },
  { src: "/clients/rafete-curls.png", alt: "Rafête Curls" },
  { src: "/clients/rock-school.png", alt: "Rock School" },
  { src: "/clients/terre-doc.png", alt: "Terre d'Oc" },
  { src: "/clients/toques-compagnie.png", alt: "Toques & Compagnie", big: true },
];

/* ===== PRESTATIONS — face de carte épurée + 4 pages dépliables + simulateur ===== */
const PG2 = "Ce que cela comprend";
const PG3 = "Les options possibles";
const PG4 = "La Méthode";
const services = [
  {
    c: "c1", title: "Community management", bookLabel: "Community management", fromPrice: 475,
    body: "Je fais vivre vos réseaux au quotidien : ligne éditoriale, publications, modération et vrai lien avec votre communauté.",
    pages: [
      { title: "Community management", body: [
        "Le community management consiste à faire vivre votre présence en ligne avec régularité, cohérence et intention. L'objectif est de construire une communication claire, identifiable et adaptée à votre audience, tout en valorisant votre activité, vos offres, vos actualités et votre univers de marque.",
        "J'accompagne les entreprises, marques, indépendants et acteurs locaux dans la gestion de leurs réseaux sociaux, que ce soit sur Instagram, Facebook, LinkedIn, TikTok, X ou YouTube. Chaque accompagnement est construit selon vos objectifs, vos canaux prioritaires, votre rythme de publication et les ressources déjà disponibles.",
      ] },
      { title: PG2, list: ["La mise en place d'un espace de suivi partagé", "La définition ou l'ajustement de votre ligne éditoriale", "La création d'un calendrier éditorial", "La rédaction des contenus", "La création de templates pour les carrousels et les stories", "La mise en page des contenus", "La publication ou la programmation des posts", "La modération de premier niveau", "La veille sur votre secteur, vos concurrents et les tendances social media", "La gestion et l'animation de vos plateformes digitales"] },
      { title: PG3, list: ["La création de contenus photo et vidéo", "Le reporting mensuel des performances", "La mise en place et le suivi de campagnes publicitaires", "La gestion de groupes privés Facebook ou de canaux de diffusion Instagram", "La création et la gestion de jeux concours", "La mise en place d'une stratégie d'influence", "L'accompagnement sur des contenus UGC, influence ou presse"] },
      { title: PG4, body: [
        "Chaque collaboration commence par une phase de cadrage pour comprendre votre activité, vos objectifs, votre audience et vos besoins réels. Pour les accompagnements de deux mois minimum, un audit de votre présence digitale et une remise à plat de la stratégie peuvent être inclus afin de poser des bases solides avant de produire du contenu.",
        "Le calendrier éditorial est ensuite construit avec une avance minimale de deux semaines, sous réserve de la transmission des informations nécessaires et des validations dans les délais prévus. L'objectif est de garder une communication régulière, claire et maîtrisée, sans fonctionner dans l'urgence.",
        "Tout au long de la mission, un espace de suivi partagé permet de centraliser les contenus, les idées, les dates de publication et les validations. Un point de suivi est également prévu chaque semaine ou toutes les deux semaines, selon le rythme défini ensemble.",
        "Un canal d'échange dédié peut être mis en place pour faciliter les retours, les validations rapides et le partage des informations importantes liées à la mission.",
      ] },
    ],
  },
  {
    c: "c2", title: "Stratégie digitale", bookLabel: "Stratégie digitale", fromPrice: 600,
    body: "On pose le cap avant de publier : positionnement, audiences, messages clés et un plan d'action concret et mesurable.",
    pages: [
      { title: "Stratégie digitale", body: [
        "La stratégie de communication digitale permet de définir une direction claire avant de produire et de diffuser des contenus. L'objectif est de construire une communication cohérente avec votre activité, votre positionnement, vos cibles et vos objectifs, afin de concentrer vos efforts sur les actions réellement pertinentes.",
        "J'accompagne les entreprises, marques, indépendants et acteurs locaux dans la définition ou la refonte de leur stratégie digitale. Chaque accompagnement est construit selon votre situation, vos enjeux, les canaux utilisés et le niveau de développement de votre communication.",
      ] },
      { title: PG2, list: ["L'analyse de votre communication existante", "L'étude de votre positionnement et de votre environnement", "L'identification de vos objectifs de communication", "La définition de vos cibles et personas", "L'analyse de vos concurrents et acteurs de référence", "La définition de vos messages clés", "La construction de votre ligne éditoriale", "La définition de vos piliers de contenus", "La sélection des canaux et formats prioritaires", "La création d'un plan d'action adapté à vos ressources"] },
      { title: PG3, list: ["La réalisation d'un audit digital approfondi", "La création d'une stratégie de lancement", "La construction d'un calendrier éditorial", "La définition d'une stratégie publicitaire", "La mise en place d'une stratégie d'influence", "La création de recommandations UGC ou presse", "L'accompagnement dans sa mise en œuvre", "Le suivi et l'ajustement des actions déployées"] },
      { title: PG4, body: [
        "Chaque accompagnement débute par un échange de cadrage et l'analyse de votre communication existante. Les recommandations sont ensuite regroupées dans un document stratégique accompagné d'un plan d'action concret et hiérarchisé.",
        "Une présentation permet de revenir sur les choix proposés et de répondre à vos questions. Un suivi complémentaire peut également être mis en place pour accompagner le déploiement et ajuster les actions.",
      ] },
    ],
  },
  {
    c: "c3", title: "Formation", bookLabel: "Formation", fromPrice: 150,
    body: "J'interviens en écoles supérieures et je forme vos équipes aux réseaux, au contenu et à la stratégie de marque.",
    pages: [
      { title: "Formation", body: [
        "La formation permet de développer vos compétences en communication digitale et de gagner en autonomie dans la gestion de vos outils et de vos réseaux sociaux. L'objectif est de vous transmettre des méthodes concrètes, directement applicables à votre activité.",
        "J'accompagne les entreprises, associations, indépendants et équipes sur des sujets liés au community management, à la stratégie digitale, à la création de contenus et aux différentes plateformes sociales. Chaque formation est adaptée au niveau des participants, à leurs objectifs et aux problématiques rencontrées.",
      ] },
      { title: PG2, list: ["L'analyse de vos besoins", "La définition des objectifs pédagogiques", "La création d'un programme adapté", "La préparation des supports de formation", "L'apport de méthodes et de notions théoriques", "La présentation d'exemples concrets", "La réalisation d'exercices pratiques", "L'application des notions à votre propre activité", "Un temps dédié aux questions des participants", "La création d'exercices personnalisés", "La transmission de ressources complémentaires"] },
      { title: PG3, list: ["Le coaching individuel", "La formation d'une équipe", "Les formats en présentiel ou à distance", "L'audit de vos supports avant la formation", "Le suivi après la formation", "L'accompagnement dans la mise en pratique"] },
      { title: PG4, body: [
        "Chaque formation débute par un échange permettant de définir les besoins, le niveau des participants et les compétences à développer. Le programme, les exercices et les exemples sont ensuite adaptés à votre activité.",
        "La formation alterne apports méthodologiques, cas concrets et mise en pratique. Un suivi complémentaire peut être proposé pour accompagner l'application des connaissances acquises.",
      ] },
    ],
  },
  {
    c: "c4", title: "Création de sites web", bookLabel: "Création de sites web", fromPrice: 1900,
    body: "Des sites codés sur-mesure, clairs, rapides et à votre image, conçus pour convertir.",
    pages: [
      { title: "Création de sites web", body: [
        "La création d'un site internet permet de présenter votre activité, vos offres et votre identité à travers un espace clair, professionnel et adapté à vos objectifs. L'enjeu est de construire un site agréable à parcourir, facile à comprendre et pensé pour guider efficacement vos visiteurs.",
        "J'accompagne les entreprises, marques, indépendants et associations dans la création ou la refonte de leur site internet. Chaque projet est codé sur-mesure (sans template ni CMS imposé) selon l'arborescence, les contenus disponibles, le niveau de personnalisation, les fonctionnalités attendues et le niveau de sur-mesure souhaité.",
      ] },
      { title: PG2, list: ["Le cadrage du projet et des besoins", "La définition de l'arborescence", "La structuration des pages et des contenus", "La conception sur-mesure de l'interface", "L'adaptation à votre identité visuelle", "L'intégration des textes, photos et vidéos fournis", "L'adaptation du site aux ordinateurs, tablettes et mobiles", "La mise en place des formulaires prévus", "L'optimisation SEO de base", "Les vérifications techniques avant la mise en ligne", "La mise en ligne du site"] },
      { title: PG3, list: ["La création de pages supplémentaires", "La rédaction ou la réécriture des textes", "La création d'un blog ou d'un espace actualités", "La mise en place de formulaires avancés", "L'intégration d'un module de réservation", "L'intégration d'un système de paiement ou de click and collect", "La création d'un site e-commerce", "L'ajout d'animations avancées", "L'optimisation SEO approfondie", "La formation à la prise en main", "La maintenance et les évolutions du site"] },
      { title: PG4, body: [
        "Chaque projet débute par un échange de cadrage pour définir la structure du site, les contenus, les fonctionnalités et la solution technique adaptée. L'arborescence et la direction visuelle sont validées avant le développement.",
        "Le site est ensuite construit, testé et ajusté avant sa mise en ligne. Une formation et un accompagnement de maintenance peuvent être proposés selon vos besoins.",
      ] },
    ],
  },
  {
    c: "c5", wide: true, title: "Event Content Creator", bookLabel: "Event Content Creator", fromPrice: 350,
    body: "Présente le jour J pour capter l'instant : photo, vidéo, reels et stories pensés pour vos événements, mariages et temps forts.",
    pages: [
      { title: "Event Content Creator", body: [
        "L'Event Content Creator couvre votre événement pour en capturer les temps forts, les coulisses et l'ambiance à travers des contenus pensés pour les réseaux sociaux. L'objectif est de produire des images spontanées et rapidement exploitables pour faire vivre l'événement pendant et après sa tenue.",
        "J'accompagne les entreprises, marques, lieux culturels, organisateurs et particuliers lors de leurs événements professionnels, culturels ou privés. Chaque couverture est adaptée à la durée de présence, au déroulement de l'événement, aux contenus attendus et aux plateformes concernées.",
      ] },
      { title: PG2, list: ["La captation de photos et de vidéos", "La couverture des coulisses et de l'ambiance", "La mise en valeur du lieu, des équipes et des participants", "La création de stories pendant l'événement", "La réalisation de vidéos verticales", "Le montage de Reels récapitulatifs", "La sélection et le traitement des photos", "L'adaptation des contenus aux réseaux sociaux"] },
      { title: PG3, list: ["La réalisation de Reels supplémentaires", "La livraison express sous 48 heures", "La couverture d'un événement sur plusieurs jours", "La couverture d'un mariage ou d'un festival", "Les déplacements nécessitant un hébergement"] },
      { title: PG4, body: [
        "Chaque couverture débute par un échange permettant de définir le déroulement de l'événement, les moments prioritaires et les contenus attendus. La durée de présence et les modalités de diffusion sont fixées avant l'intervention.",
        "Les contenus sont ensuite captés sur place, sélectionnés et montés selon la formule choisie.",
      ] },
    ],
  },
];

export default function Home() {
  const [active, setActive] = useState(null); // prestation ouverte
  const [startSim, setStartSim] = useState(false); // ouvrir directement sur le simulateur
  const [budgetOpen, setBudgetOpen] = useState(false); // sélecteur « Estimez votre budget » (À propos)

  const openSim = (s) => { setStartSim(true); setActive(s); setBudgetOpen(false); };
  const openCard = (s) => { setStartSim(false); setActive(s); };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (history.scrollRestoration) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = gsap.utils.toArray(".reveal");
    const pops = gsap.utils.toArray(".pop");
    const clampU = gsap.utils.clamp;

    if (reduce) {
      [...reveals, ...pops].forEach((el) => gsap.set(el, { opacity: 1, y: 0, scale: 1 }));
      gsap.utils.toArray(".mani-txt").forEach((el) => gsap.set(el, { xPercent: 0, opacity: 1, rotation: 0 }));
      gsap.utils.toArray(".rr-video").forEach((v) => gsap.set(v, { height: "64vh" }));
      gsap.utils.toArray(".rr-name").forEach((n) => gsap.set(n, { opacity: 1 }));
      gsap.utils.toArray(".fade-both").forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
      document.querySelectorAll(".stat-num").forEach((n) => { n.textContent = (n.dataset.prefix || "") + (+n.dataset.to).toLocaleString("fr-FR") + (n.dataset.suffix || ""); });
      return;
    }

    const ctx = gsap.context(() => {
      try {
        reveals.forEach((el) => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }));

        gsap.set(pops, { y: 60, scale: 0.94 });
        ScrollTrigger.batch(pops, {
          start: "top 88%",
          onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, scale: 1, duration: 0.85, ease: "back.out(1.5)", stagger: 0.12, overwrite: true }),
        });

        /* ===== MANIFESTE — les mots surgissent des côtés, PENCHÉS vers leur
           direction de déplacement, puis se redressent. Réversible au scroll
           (à la remontée, ils se penchent vers où ils repartent). ===== */
        gsap.utils.toArray(".mani-line").forEach((line) => {
          const isR = line.classList.contains("r");
          const txt = line.querySelector(".mani-txt");
          const startX = isR ? 80 : -80;
          gsap.fromTo(
            txt,
            { xPercent: startX, opacity: 0, rotation: (isR ? -1 : 1) * 5 },
            {
              xPercent: 0, opacity: 1, rotation: 0, ease: "none",
              scrollTrigger: { trigger: line, start: "top 90%", end: "top 60%", scrub: 0.5 },
            }
          );
        });

        /* ===== RÉALISATIONS — reels 1 & 3 à droite, 2 à gauche (anim miroir).
           Le reel actif (au centre du viewport) s'agrandit, le nom du client
           surgit du côté opposé à la vidéo. Le descriptif + les compteurs en
           dessous apparaissent puis disparaissent au scroll. ===== */
        const isMobile = window.innerWidth <= 860;
        const easeIO = gsap.parseEase("power2.inOut");
        gsap.utils.toArray(".reel").forEach((reel) => {
          const isLeft = reel.classList.contains("left");
          const video = reel.querySelector(".rr-video");
          const name = reel.querySelector(".rr-name");
          const nameIn = reel.querySelector(".rr-name-in");
          const fromX = isLeft ? 52 : -52;                 // surgit du côté opposé à la vidéo
          ScrollTrigger.create({
            trigger: reel, start: "top bottom", end: "bottom top", scrub: true,
            onUpdate: (self) => {
              const p = self.progress;
              const center = 1 - Math.abs(p - 0.5) * 2;     // 0 aux bords, 1 au centre
              const e = easeIO(clampU(0, 1, center));
              if (!isMobile) gsap.set(video, { height: (46 + 40 * e) + "vh", borderRadius: (22 - 8 * e) + "px" });
              const np = clampU(0, 1, (center - 0.30) / 0.5);
              gsap.set(name, { opacity: np });
              const vel = clampU(0, 1, Math.abs(self.getVelocity()) / 1400);
              gsap.set(nameIn, { xPercent: fromX * (1 - np), rotation: (isLeft ? 7 : -7) * (1 - np) * vel });
            },
          });
        });

        /* Descriptif + stats : apparition/disparition au scroll + compteurs qui
           se déclenchent DÈS que le reel entre dans le viewport (pas au centre). */
        const fmt = (v, n) => (n.dataset.prefix || "") + Math.round(v).toLocaleString("fr-FR") + (n.dataset.suffix || "");
        gsap.utils.toArray(".reel").forEach((reel) => {
          const text = reel.querySelector(".rr-text");
          const statsEl = reel.querySelector(".reel-stats");
          const items = reel.querySelectorAll(".fade-both");
          const nums = reel.querySelectorAll(".stat-num");
          gsap.set(items, { opacity: 0, y: 24 });
          let counted = false;
          const runCounters = () => {
            if (counted) return; counted = true;
            nums.forEach((n, k) => {
              const o = { v: 0 };
              gsap.to(o, { v: +n.dataset.to, duration: 1.7, ease: "power2.out", delay: k * 0.12, onUpdate: () => { n.textContent = fmt(o.v, n); } });
            });
          };
          const show = () => gsap.to(items, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.05, overwrite: true });
          const hide = () => gsap.to(items, { opacity: 0, y: 24, duration: 0.35, overwrite: true });
          // apparition du texte + chiffres dès l'entrée du bloc
          ScrollTrigger.create({
            trigger: text, start: "top 82%", end: "bottom 18%",
            onEnter: show, onEnterBack: show, onLeave: hide, onLeaveBack: hide,
          });
          // les compteurs démarrent dès que les chiffres entrent dans l'écran
          // (le bloc des stats apparaît par le bas) → ça défile « dès qu'on les voit »
          ScrollTrigger.create({
            trigger: statsEl || text, start: "top 95%", once: true,
            onEnter: runCounters,
          });
        });
      } catch (e) {
        [...reveals, ...pops].forEach((el) => gsap.set(el, { opacity: 1, y: 0, scale: 1 }));
        gsap.utils.toArray(".mani-txt").forEach((el) => gsap.set(el, { xPercent: 0, opacity: 1, rotation: 0 }));
        gsap.utils.toArray(".fade-both").forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
        gsap.utils.toArray(".rr-name").forEach((n) => gsap.set(n, { opacity: 1 }));
        document.querySelectorAll(".stat-num").forEach((n) => { n.textContent = (n.dataset.prefix || "") + (+n.dataset.to).toLocaleString("fr-FR") + (n.dataset.suffix || ""); });
      }
    });

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => { clearTimeout(refresh); ctx.revert(); };
  }, []);

  /* Effet « liquid glass » : le reflet spéculaire suit le curseur sur les cartes. */
  useEffect(() => {
    if (window.matchMedia("(pointer:coarse)").matches) return;
    const cards = Array.from(document.querySelectorAll(".glass"));
    const onMove = (e) => {
      const c = e.currentTarget;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      c.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    };
    cards.forEach((c) => c.addEventListener("mousemove", onMove));
    return () => cards.forEach((c) => c.removeEventListener("mousemove", onMove));
  }, []);

  /* Vidéos reels : lecture auto (muette) quand la vidéo est visible, pause sinon
     → une seule vidéo joue à la fois, et elles ne se chargent pas toutes d'un coup. */
  useEffect(() => {
    const vids = Array.from(document.querySelectorAll(".rr-vid"));
    if (!vids.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) { v.muted = true; v.play?.().catch(() => {}); }
        else v.pause?.();
      });
    }, { threshold: 0.35 });
    vids.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Loader />
      <Nav />

      <main>
      {/* ===== HERO — logo réel ===== */}
      <section className="hero" id="top">
        <h1 className="sr-only">Emma Pouget Communication — freelance en communication &amp; community manager en Charente : réseaux sociaux, création de contenus photo et vidéo, sites internet sur-mesure, formation et couverture d'événements à Cognac, Saintes, Angoulême, Bordeaux et dans le Gers (Auch).</h1>
        <HeroLogo />
      </section>

      {/* ===== MANIFESTE — Communication · Digitale · Studio Créatif ===== */}
      <section className="manifesto" id="manifesto">
        <div className="wrap">
          {manifesto.map((m, i) => (
            <div className={`mani-line ${m.side}`} key={i} style={{ "--mc": m.color }}>
              <div className="mani-txt"><span className="mani-word">{m.word}</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== À PROPOS ===== */}
      <section className="about" id="apropos">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-col about-media reveal">
              <figure className="about-photo">
                <img
                  src="/emma.jpg"
                  alt="Emma Pouget, freelance en communication et community manager en Charente"
                  onError={(e) => e.currentTarget.parentElement.classList.add("empty")}
                />
                <figcaption><span className="ap-ico">＋</span>Votre photo ici — déposez <code>public/emma.jpg</code></figcaption>
              </figure>
            </div>
            <div className="about-col reveal">
              <h2>Emma Pouget</h2>
              <p className="about-quote">« Tout ce qui nous touche commence par des mots. »</p>
              <p className="about-lead">Freelance en communication, je crois que chaque projet mérite une intention. Mon objectif n'est pas seulement de créer des campagnes efficaces, mais de construire des histoires qui résonnent, avec justesse, sens et impact.</p>
              <p>Avec plus de 5 ans d'expérience en communication digitale, et un parcours construit entre agence, annonceur et auto-entrepreneuriat, j'accompagne aujourd'hui des acteurs locaux et des marques engagées dans leur communication sur différents leviers : stratégie, community management, création de contenus photo et vidéo, couverture d'événements privés ou professionnels, campagnes publicitaires, création ou refonte de sites web, formation et coaching.</p>
              <p>Basée en Charente, entre Cognac et Saintes, je me déplace en Nouvelle-Aquitaine, en région parisienne ainsi que dans le Gers <span className="about-heart">(gersoise de ♥)</span>.</p>
              <div className="about-budget">
                <button className={`pill pill-glass terra-glass about-budget-btn${budgetOpen ? " open" : ""}`} onClick={() => setBudgetOpen((o) => !o)} aria-expanded={budgetOpen}>
                  <span>Estimez votre budget</span><span className="arw">{budgetOpen ? "↑" : "→"}</span>
                </button>
                <div className={`about-choices${budgetOpen ? " open" : ""}`}>
                  <span className="about-choices-h">Quelle prestation&nbsp;?</span>
                  <div className="about-choices-grid">
                    {services.map((s) => (
                      <button className={`about-choice ${s.c}`} key={s.c} onClick={() => openSim(s)}>{s.title}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ILS M'ONT FAIT CONFIANCE — bandeau de logos défilant ===== */}
      <section className="clients" id="clients">
        <h2 className="clients-title reveal">Ils m'ont fait confiance</h2>
        <div className="marquee">
          <div className="marquee-track">
            {[...clients, ...clients].map((c, i) => (
              <img className={`client-logo${c.big ? " big" : ""}`} key={i} src={c.src} alt={c.alt} loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* ===== RÉALISATIONS — reels alternés G/D, texte à côté + descriptif & compteurs ===== */}
      <section className="reels" id="realisations">
        {reels.map((r, i) => (
          <div className={`reel ${r.side}`} key={i}>
            <div className="reel-row">
              <div className="rr-text">
                <span className="rr-name"><span className="rr-name-in">{r.client}</span></span>
                <p className="reel-blurb fade-both">{r.blurb}</p>
                <div className="reel-stats">
                  {r.stats.map((s, j) => (
                    <div className="stat fade-both" key={j}>
                      <b className="stat-num" data-to={s.to} data-prefix={s.prefix} data-suffix={s.suffix}>0</b>
                      <span className="stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rr-video">
                {r.vid ? (
                  <video className="rr-vid" src={r.vid} muted loop playsInline preload="none" />
                ) : (
                  <div className="rr-grad" style={{ backgroundImage: r.grad }} />
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ===== PRESTATIONS — cartes cliquables ===== */}
      <section className="services" id="services">
        <div className="wrap">
          <div className="services-head reveal">
            <h2>Prestations</h2>
          </div>
          <div className="svc-grid">
            {services.map((s) => (
              <div
                className={`svc-card pop ${s.c}${s.wide ? " wide" : ""}`}
                key={s.title}
                role="button" tabIndex={0}
                aria-label={`Découvrir la prestation ${s.title}`}
                onClick={() => openCard(s)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCard(s); } }}
              >
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <span className="svc-open">Découvrir<span className="arw">→</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== END BAND — contact + La Lettre + mentions légales ===== */}
      <section className="endband" id="contact">
        <div className="wrap">
          <div className="eb-top">
            <div className="reveal">
              <h2 className="eb-h">Parlons de votre <em>projet</em>.</h2>
              <a className="eb-mail" href="mailto:emma.pouget@ep-communication.fr">emma.pouget@ep-communication.fr</a>
              <div className="eb-meta">
                <span>Nouvelle-Aquitaine&nbsp;·&nbsp;Île-de-France&nbsp;·&nbsp;Gers</span>
              </div>
              <div className="eb-socials">
                <a className="eb-social" href="https://www.instagram.com/emmapouget.communication/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
                <a className="eb-social" href="https://www.linkedin.com/in/emmapougetcommunication/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              </div>
            </div>
          </div>

          <div className="eb-wm" aria-hidden="true">EpC</div>

          <div className="eb-legal">
            <span>© {new Date().getFullYear()} EpC — Emma Pouget Communication</span>
            <nav>
              <a href="/mentions-legales">Mentions légales</a>
              <a href="/confidentialite">Confidentialité &amp; cookies</a>
            </nav>
          </div>
        </div>
      </section>

      </main>

      {/* ===== Modules globaux ===== */}
      <Booking />
      <ServiceModal service={active} startSim={startSim} onClose={() => setActive(null)} />
    </>
  );
}
