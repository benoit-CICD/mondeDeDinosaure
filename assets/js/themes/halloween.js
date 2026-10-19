/* Thème d'Halloween : araignée, citrouilles cachées et easter eggs.
   Chargé quand `theme: "halloween"` dans tools/data/site.mjs, après
   themes/commun.js qui fournit le bandeau, l'interrupteur et la mémoire
   de la visite (window.Theme). Ce thème retient en plus les citrouilles
   trouvées (voir la page Confidentialité). */
(function () {
  "use strict";

  var Theme = window.Theme;
  if (!Theme) return;

  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var BASE = window.BASE || "";
  var actif = Theme.actif, annoncer = Theme.annoncer;

  function borne(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function hasard(min, max) { return min + Math.random() * (max - min); }

  function trouvees() {
    try { return JSON.parse(Theme.lire("citrouilles")) || []; } catch (e) { return []; }
  }

  /* ---- Dessins ---- */
  var SVG_CITROUILLE =
    '<svg viewBox="-32 -37 64 64" aria-hidden="true" focusable="false">' +
    '<ellipse rx="30" ry="24" fill="#f28c28"/><ellipse cx="-14" rx="14" ry="23" fill="#e87a17"/>' +
    '<ellipse cx="14" rx="14" ry="23" fill="#e87a17"/><ellipse rx="10" ry="24" fill="#f7a03c"/>' +
    '<path d="M-1 -22q1 -9 8 -12" stroke="#4a7a2c" stroke-width="5" fill="none" stroke-linecap="round"/>' +
    '<g fill="#5a2a05"><path d="M-18 -6l7 -10 5 10z"/><path d="M18 -6l-7 -10 -5 10z"/>' +
    '<path d="M-19 5l5 5 4 -5 4 6 4 -6 4 6 4 -6 4 5 5 -5q-2 13 -19 13t-19 -13z"/></g></svg>';

  var CHEMIN_CHAUVE_SOURIS =
    "M0 -3C3 -7 6 -6 7 -3C10 -9 15 -9 18 -4C14 -4 12 -1 11 2C9 0 7 0 5 2C3 0 1 1 0 3C-1 1 -3 0 -5 2" +
    "C-7 0 -9 0 -11 2C-12 -1 -14 -4 -18 -4C-15 -9 -10 -9 -7 -3C-6 -6 -3 -7 0 -3ZM-2 -4l-1 -4 2 2 2 -2 -1 4Z";

  /* Araignée vue de face, la tête en bas : le fil s'accroche en haut (0, -15). */
  var SVG_ARAIGNEE =
    '<svg viewBox="-24 -24 48 48" aria-hidden="true" focusable="false">' +
    '<g stroke="#2b1f36" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
    '<path class="araignee__patte" d="M-7 -6Q-16 -16 -21 -9"/><path class="araignee__patte" d="M-8 -1Q-19 -6 -23 2"/>' +
    '<path class="araignee__patte" d="M-8 4Q-18 4 -21 13"/><path class="araignee__patte" d="M-6 8Q-13 14 -14 21"/>' +
    '<path class="araignee__patte" d="M7 -6Q16 -16 21 -9"/><path class="araignee__patte" d="M8 -1Q19 -6 23 2"/>' +
    '<path class="araignee__patte" d="M8 4Q18 4 21 13"/><path class="araignee__patte" d="M6 8Q13 14 14 21"/></g>' +
    '<circle cy="-5" r="10.5" fill="#2b1f36"/><path d="M-3 -10h6l-3 4 3 4h-6l3 -4z" fill="#f28c28"/>' +
    '<circle cy="8" r="7.5" fill="#3a2a48"/>' +
    '<circle cx="-3.2" cy="7" r="3" fill="#fff"/><circle cx="3.2" cy="7" r="3" fill="#fff"/>' +
    '<circle cx="-2.8" cy="7.6" r="1.5" fill="#1a1020"/><circle cx="3.6" cy="7.6" r="1.5" fill="#1a1020"/>' +
    '<path d="M-2.4 11.4q2.4 2 4.8 0" stroke="#fff" stroke-width="1.2" fill="none" stroke-linecap="round"/></svg>';

  /** Toile tendue dans le coin en haut à droite (110 × 110). */
  function toile() {
    var rayons = [0, 22.5, 45, 67.5, 90], d = "";
    var point = function (r, deg) {
      var t = deg * Math.PI / 180;
      return (110 - r * Math.cos(t)).toFixed(1) + " " + (r * Math.sin(t)).toFixed(1);
    };
    rayons.forEach(function (deg) { d += "M110 0L" + point(110, deg); });
    [24, 48, 72, 96].forEach(function (r) {
      rayons.forEach(function (deg, i) {
        d += (i === 0 ? "M" : "Q" + point(r * 0.86, deg - 11.25) + " ") + point(r, deg);
      });
    });
    return '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>';
  }

  /* ---- Les cachettes des citrouilles ----
     Chaque citrouille n'apparaît que sur sa page, et jamais en entier :
       haut    seul le haut dépasse du bord d'un encadré, comme si elle était derrière ;
       mini    toute petite et pâle, presque fondue dans le décor ;
       dedans  dans un volet qu'il faut d'abord déplier ;
       filtre  n'apparaît qu'avec certains filtres du catalogue ;
       tombe   coincée entre deux tombes du cimetière, en bas de page.
     L'araignée ne donne pas d'adresse, seulement des devinettes. */
  function parTexte(selecteur, texte) {
    return function () {
      var liste = document.querySelectorAll(selecteur);
      for (var i = 0; i < liste.length; i++) {
        if (liste[i].textContent.indexOf(texte) !== -1) return liste[i];
      }
      return null;
    };
  }

  var CACHETTES = [
    { id: "accueil", page: /\/(index\.html)?$/, cible: ".encadre--attention", variante: "haut", style: "right:16%",
      indice: "Sur la page d’accueil, une citrouille est tombée dans « le piège le plus courant »…" },
    { id: "trex", page: /\/dinosaures\/tyrannosaurus\.html$/, cible: ".fiche__illustration", variante: "mini", style: "right:20px;top:18px",
      indice: "Le roi des lézards tyrans garde une toute petite citrouille dans son portrait. Ouvre grand les yeux !" },
    { id: "maiasaura", page: /\/dinosaures\/maiasaura\.html$/, cible: ".savais-tu > li:first-child", variante: "haut", style: "left:28px",
      indice: "Rends visite à la dinosaure qui était une « bonne mère » : une citrouille lit par-dessus son épaule." },
    { id: "frise", page: /\/frise\.html$/, cible: ".frise > .frise__jalon:last-of-type .frise__periode", variante: "haut", style: "right:26px",
      indice: "Remonte la frise du temps jusqu’au jour où le ciel est tombé sur la Terre." },
    { id: "glossaire", page: /\/glossaire\.html$/, cible: parTexte(".glossaire__terme", "Coprolithe"), variante: "mini", style: "right:6px;bottom:2px",
      indice: "Dans le glossaire, une citrouille se cache près du mot qui veut dire « crotte fossilisée ». Beurk !" },
    { id: "jeux", page: /\/jeux\.html$/, cible: ".encadre", variante: "haut", style: "left:40%",
      indice: "Dans la salle de jeux, une citrouille espionne le conseil, cachée juste derrière." },
    { id: "questions", page: /\/questions\.html$/, cible: parTexte("details.accordeon", "Quelle couleur"), variante: "dedans", style: "right:10px;bottom:8px",
      indice: "Une citrouille connaît la réponse à la question des couleurs, dans les Questions fréquentes. Encore faut-il l’ouvrir !" },
    { id: "puzzle", page: /\/jeux\/puzzle\.html$/, cible: parTexte("details.accordeon", "image compl"), variante: "dedans", style: "right:10px;bottom:8px",
      indice: "Au puzzle, une citrouille attend qu’on regarde l’image complète." },
    { id: "catalogue", page: /\/dinosaures\.html$/, cible: "#compteur-resultats", variante: "filtre",
      indice: "Dans le catalogue de tous les dinosaures, une citrouille se glisse parmi les herbivores du Crétacé." },
    { id: "extinction", page: /\/extinction\.html$/, cible: ".cimetiere__rang", variante: "tombe",
      indice: "Sur la page de la grande extinction, une citrouille se recueille au cimetière, tout en bas." },
  ];
  var TOTAL = CACHETTES.length;

  /* ---- Ce que raconte l'araignée ---- */
  var FAITS = [
    "Coucou ! Je ne suis pas un insecte : j’ai huit pattes, je suis une arachnide.",
    "Ma famille est plus vieille que les dinosaures : on connaît des araignées fossiles de plus de 300 millions d’années !",
    "En Angleterre, on a trouvé une toile d’araignée prise dans l’ambre il y a environ 140 millions d’années. Des dinosaures passaient tout près !",
    "Au Jurassique, en Chine, vivait une grande tisseuse de toiles, Mongolarachne. Ses pattes avant mesuraient plus de 5 centimètres.",
    "À poids égal, mon fil de soie est plus solide que l’acier. Et il s’étire beaucoup avant de casser !",
    "Je fabrique ma soie dans mon ventre. Elle sort par de tout petits tubes : les filières.",
  ];
  var ASTUCES = [
    "Psst… tape « bouh » au clavier, ou touche 5 fois le petit fantôme 👻 du bandeau !",
    "Sur la page d’accueil, touche la lune… 🌕",
    "Fais un sans-faute à un jeu : il pleuvra des bonbons !",
    "Le volcan de la page d’accueil fait la sieste. Et si tu le réveillais ? 🌋",
    "Le dinosaure de la page d’accueil est très chatouilleux… surtout trois fois de suite !",
    "Tout en bas des pages, les tombes du cimetière ont des histoires à raconter. 🪦",
    "La petite chauve-souris à côté des titres adore qu’on la touche. 🦇",
    "Dans la recherche du catalogue, essaie d’écrire « citrouille », « fantôme » ou « araignée »…",
    "Sur une fiche de dinosaure, reste appuyé longtemps sur l’image. Ou tape « radio » au clavier ! 🩻",
    "Le 31 octobre, le site te réserve une surprise… 🎃",
  ];

  /* ---------- Dans le bandeau : le fantôme et le compteur de citrouilles ---------- */
  var elCompteur;

  function majCompteur() {
    var n = trouvees().length;
    elCompteur.innerHTML = n >= TOTAL
      ? "🎉 " + TOTAL + " / " + TOTAL + '<span class="bandeau-theme__long"> : bravo, tout est trouvé !</span>'
      : '🎃 <span class="bandeau-theme__long">Citrouilles cachées : </span>' + n + " / " + TOTAL;
    elCompteur.classList.toggle("compteur-citrouilles--bravo", n >= TOTAL);
    /* Chasse terminée : le compteur laisse sa place au bouton du diplôme. */
    if (n >= TOTAL && !Theme.zone.querySelector(".bouton-diplome")) {
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "bouton-diplome";
      bouton.setAttribute("aria-label", "Mon diplôme de chasseur de citrouilles");
      bouton.innerHTML = '🎓 <span class="bandeau-theme__long">Mon </span>diplôme<span class="bandeau-theme__long"> : ' + TOTAL + " / " + TOTAL + " !</span>";
      bouton.addEventListener("click", ouvrirDiplome);
      Theme.zone.appendChild(bouton);
      elCompteur.hidden = true;
    }
  }

  function completerBandeau() {
    /* Cinq petites tapes sur le fantôme : le T-rex fantôme apparaît. */
    var fantomeBouton = document.createElement("button");
    fantomeBouton.type = "button";
    fantomeBouton.className = "bouton-fantome";
    fantomeBouton.setAttribute("aria-label", "Petit fantôme");
    fantomeBouton.textContent = "👻";
    Theme.zone.insertBefore(fantomeBouton, Theme.zone.firstChild);

    var tapes = 0, minuterieTapes = 0;
    fantomeBouton.addEventListener("click", function () {
      fantomeBouton.classList.remove("frisson");
      void fantomeBouton.offsetWidth;
      fantomeBouton.classList.add("frisson");
      tapes++;
      clearTimeout(minuterieTapes);
      minuterieTapes = setTimeout(function () { tapes = 0; }, 1600);
      if (tapes >= 5) { tapes = 0; fantome(); }
    });

    elCompteur = document.createElement("span");
    elCompteur.className = "compteur-citrouilles";
    elCompteur.tabIndex = -1;
    Theme.zone.appendChild(elCompteur);
    majCompteur();

    Theme.surBascule(function (allume) { if (!allume) taire(); });
  }

  /* ---------- Le T-rex fantôme ---------- */
  var fantomeEnCours = false;
  function fantome() {
    if (!actif() || fantomeEnCours) return;
    fantomeEnCours = true;
    var f = document.createElement("div");
    f.className = "fantome-dino";
    f.setAttribute("aria-hidden", "true");
    f.innerHTML = '<span class="fantome-dino__bouh">Bouh !</span><img src="' + BASE + 'assets/img/dinos/tyrannosaurus.svg" alt="" width="260" height="182">';
    document.body.appendChild(f);
    annoncer("Un T-rex fantôme traverse l’écran : bouh !");
    var fin = function () { f.remove(); fantomeEnCours = false; };

    if (reduit || !f.animate) {
      f.style.left = "50%";
      f.style.transform = "translateX(-50%)";
      setTimeout(fin, 2200);
      return;
    }
    var w = window.innerWidth;
    f.animate([
      { transform: "translate(-110%, 0) rotate(-4deg)", opacity: 0 },
      { transform: "translate(" + w * 0.15 + "px, -30px) rotate(3deg)", opacity: 1, offset: 0.2 },
      { transform: "translate(" + w * 0.4 + "px, 20px) rotate(-3deg)", opacity: 1, offset: 0.5 },
      { transform: "translate(" + w * 0.65 + "px, -25px) rotate(3deg)", opacity: 1, offset: 0.8 },
      { transform: "translate(" + (w + 40) + "px, 0) rotate(0)", opacity: 0 },
    ], { duration: 5200, easing: "linear" }).onfinish = fin;
  }

  /* Mots tapés au clavier, en dehors des champs de saisie :
     « bouh » (T-rex fantôme) et « radio » (rayons X sur une fiche). */
  var tape = "";
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
    if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
    tape = (tape + e.key.toLowerCase()).slice(-5);
    if (/bouh$/.test(tape)) { tape = ""; fantome(); }
    else if (/radio$/.test(tape)) {
      tape = "";
      var figure = document.querySelector(".fiche__illustration");
      if (figure) rayonsX(figure);
    }
  });

  /* ---------- Pluie de bonbons ---------- */
  function pluieDeBonbons() {
    if (!actif() || reduit || !document.body.animate) return;
    var sortes = ["🍬", "🍭", "🍫", "🎃", "🍬", "🍭"];
    var h = window.innerHeight, w = window.innerWidth;
    for (var i = 0; i < 36; i++) {
      var b = document.createElement("span");
      b.className = "bonbon";
      b.setAttribute("aria-hidden", "true");
      b.textContent = sortes[i % sortes.length];
      b.style.left = hasard(0, w - 30) + "px";
      document.body.appendChild(b);
      b.animate([
        { transform: "translate(0, -60px) rotate(0)" },
        { transform: "translate(" + hasard(-50, 50) + "px, " + (h + 60) + "px) rotate(" + hasard(-360, 360) + "deg)" },
      ], { duration: hasard(2200, 3800), delay: hasard(0, 900), easing: "cubic-bezier(.3,.1,.7,1)", fill: "backwards" })
        .onfinish = (function (el) { return function () { el.remove(); }; })(b);
    }
  }

  /* Un sans-faute (ou un memory / puzzle terminé) : bonbons ! */
  function verifierResultat(resultat) {
    if (!actif() || resultat.dataset.bonbons) return;
    var note = resultat.querySelector(".resultat__note");
    var parfait = true;
    if (note) {
      var m = note.textContent.match(/(\d+)\s*\/\s*(\d+)/);
      parfait = Boolean(m) && m[1] === m[2] && Number(m[2]) > 0;
    }
    if (!parfait) return;
    resultat.dataset.bonbons = "oui";
    var friandises = document.createElement("p");
    friandises.setAttribute("aria-hidden", "true");
    friandises.style.fontSize = "1.8rem";
    friandises.textContent = "🍬 🍭 🎃 🍫 🍬";
    var medaille = resultat.querySelector(".resultat__medaille");
    if (medaille) medaille.insertAdjacentElement("afterend", friandises);
    pluieDeBonbons();
  }

  var principal = document.getElementById("contenu");
  if (principal && "MutationObserver" in window) {
    new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        Array.prototype.forEach.call(m.addedNodes, function (n) {
          if (n.nodeType !== 1) return;
          var r = n.classList.contains("resultat") ? n : n.querySelector(".resultat");
          if (r) verifierResultat(r);
        });
      });
    }).observe(principal, { childList: true, subtree: true });
  }

  /* ---------- Les chauves-souris de la lune (accueil) ---------- */
  function voleeDeChauvesSouris(depuis) {
    if (!actif()) return;
    annoncer("Une nuée de chauves-souris s’envole de la lune !");
    if (!document.body.animate) return;
    var r = depuis.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (var i = 0; i < 14; i++) {
      var el = document.createElement("div");
      el.className = "volee-chauve-souris";
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = '<svg viewBox="-19 -10 38 22"><path d="' + CHEMIN_CHAUVE_SOURIS + '" fill="#22122e"/></svg>';
      el.style.left = cx - 19 + "px";
      el.style.top = cy - 11 + "px";
      document.body.appendChild(el);
      var angle = hasard(-Math.PI * 0.95, -Math.PI * 0.05), dist = hasard(180, 520);
      var dx = Math.cos(angle) * dist, dy = Math.sin(angle) * dist;
      var images = reduit
        /* Sans mouvement : les chauves-souris apparaissent autour de la lune, puis s'effacent. */
        ? [{ opacity: 0, transform: "translate(" + dx * 0.25 + "px," + dy * 0.25 + "px)" },
           { opacity: 1, transform: "translate(" + dx * 0.25 + "px," + dy * 0.25 + "px)" },
           { opacity: 0, transform: "translate(" + dx * 0.25 + "px," + dy * 0.25 + "px)" }]
        : [{ opacity: 0, transform: "translate(0, 0) scale(.3)" },
           { opacity: 1, transform: "translate(" + dx * 0.3 + "px," + dy * 0.3 + "px) scale(1)", offset: 0.25 },
           { opacity: 0, transform: "translate(" + dx + "px," + dy + "px) scale(.8)" }];
      el.animate(images, { duration: hasard(1700, 2600), delay: i * 60, easing: "ease-out", fill: "backwards" })
        .onfinish = (function (b) { return function () { b.remove(); }; })(el);
    }
  }

  var lune = document.querySelector(".lune-bouton");
  if (lune) lune.addEventListener("click", function () { voleeDeChauvesSouris(lune); });

  /* ---------- Les citrouilles cachées ---------- */
  function ramasser(cachette, bouton) {
    var liste = trouvees();
    if (liste.indexOf(cachette.id) === -1) liste.push(cachette.id);
    Theme.ecrire("citrouilles", JSON.stringify(liste));
    bouton.disabled = true;
    bouton.classList.add("citrouille-cachee--trouvee");
    setTimeout(function () { bouton.remove(); }, 650);
    majCompteur();
    (Theme.zone.querySelector(".bouton-diplome") || elCompteur).focus({ preventScroll: true });
    if (liste.length >= TOTAL) {
      annoncer("Bravo ! Tu as trouvé les " + TOTAL + " citrouilles cachées !");
      fantome();
      pluieDeBonbons();
      setTimeout(proposerRecompense, reduit ? 300 : 1800);
    } else {
      var reste = TOTAL - liste.length;
      annoncer("Citrouille trouvée ! Encore " + reste + " à dénicher.");
    }
  }

  function cacherCitrouilles() {
    var deja = trouvees();
    CACHETTES.forEach(function (c) {
      if (!c.page.test(location.pathname) || deja.indexOf(c.id) !== -1) return;
      var cible = typeof c.cible === "function" ? c.cible() : document.querySelector(c.cible);
      if (!cible) return;
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "citrouille-cachee citrouille-cachee--" + c.variante;
      if (c.style) bouton.style.cssText = c.style;
      bouton.setAttribute("aria-label", "Une citrouille cachée ! Ramasse-la.");
      bouton.innerHTML = SVG_CITROUILLE;
      bouton.addEventListener("click", function () { ramasser(c, bouton); });

      if (c.variante === "filtre") {
        /* Visible seulement avec les filtres « Crétacé » et « Herbivore ». */
        cible.insertAdjacentElement("afterend", bouton);
        var verifier = function () {
          var cretace = document.querySelector('.puce[data-valeur="cretace"][aria-pressed="true"]');
          var herbivore = document.querySelector('.puce[data-valeur="herbivore"][aria-pressed="true"]');
          bouton.hidden = !(cretace && herbivore);
        };
        new MutationObserver(verifier).observe(document.querySelector(".filtres") || document.body,
          { subtree: true, attributes: true, attributeFilter: ["aria-pressed"] });
        verifier();
        return;
      }
      if (c.variante === "tombe") {
        /* Entre la deuxième et la troisième tombe, qui la cachent en partie. */
        cible.insertBefore(bouton, cible.children[2] || null);
        return;
      }
      if (getComputedStyle(cible).position === "static") cible.style.position = "relative";
      cible.appendChild(bouton);
    });
  }

  /* ---------- L'araignée ---------- */
  var araignee, fil, corps, bulle;
  var REPOS = 34;                       /* longueur du fil au repos, en pixels */
  var longueur = REPOS, decalage = 0;   /* position de l'araignée sous son point d'attache */
  var vitesse = 0, vitesseX = 0;
  var anim = 0, minuterie = 0, minuterieBulle = 0, prise = null, tour = 0;

  function longueurMax() { return Math.max(120, window.innerHeight - 220); }

  function dessiner() {
    var angle = Math.atan2(decalage, longueur);
    fil.style.height = Math.sqrt(decalage * decalage + longueur * longueur) + "px";
    fil.style.transform = "rotate(" + -angle + "rad)";
    corps.style.transform = "translate(" + (decalage - 24) + "px," + (longueur - 9) + "px) rotate(" + -angle + "rad)";
    if (!bulle.hidden) placerBulle();
  }

  /* La bulle se place à gauche de l'araignée, sans sortir de l'écran. */
  function placerBulle() {
    var origine = araignee.getBoundingClientRect().left + 66;
    var gauche = Math.max(10 - origine, decalage - 34 - bulle.offsetWidth);
    bulle.style.left = gauche + "px";
    bulle.style.top = longueur - 4 + "px";
  }

  function arreter() {
    cancelAnimationFrame(anim);
    clearTimeout(minuterie);
    clearTimeout(minuterieBulle);
  }

  function auRepos() {
    araignee.classList.remove("araignee--grimpe");
    araignee.classList.add("araignee--repos");
  }

  function message() {
    tour++;
    if (tour % 2 === 1) return FAITS[((tour - 1) / 2) % FAITS.length];
    var deja = trouvees();
    var astuces = CACHETTES
      .filter(function (c) { return deja.indexOf(c.id) === -1; })
      .map(function (c) { return c.indice; })
      .concat(ASTUCES);
    return astuces[Math.floor(Math.random() * astuces.length)];
  }

  function parler() {
    clearTimeout(minuterieBulle);
    if (!bulle.hidden) return;
    var texte = message();
    bulle.textContent = texte;
    bulle.hidden = false;
    placerBulle();
    annoncer("L’araignée dit : " + texte);
  }

  function taire() { if (bulle) bulle.hidden = true; }

  /* Relâchée, l'araignée remonte le long de son fil, avec un petit rebond. */
  function relacher() {
    arreter();
    minuterieBulle = setTimeout(taire, 2600);
    if (reduit) { longueur = REPOS; decalage = 0; dessiner(); auRepos(); return; }
    araignee.classList.add("araignee--grimpe");
    vitesse = 0; vitesseX = 0;
    var precedent = performance.now();
    var pas = function (t) {
      /* Pas fixes de 1/60 s : même vitesse quel que soit l'écran. */
      var n = borne(Math.round((t - precedent) / 16.7), 1, 4);
      precedent = t;
      for (var i = 0; i < n; i++) {
        vitesse += -0.02 * (longueur - REPOS) - 0.17 * vitesse;
        vitesseX += -0.02 * decalage - 0.17 * vitesseX;
        longueur += vitesse;
        decalage += vitesseX;
        if (longueur < 12) { longueur = 12; vitesse = -vitesse * 0.4; }
      }
      dessiner();
      if (Math.abs(longueur - REPOS) < 0.4 && Math.abs(vitesse) < 0.15 && Math.abs(decalage) < 0.4 && Math.abs(vitesseX) < 0.15) {
        longueur = REPOS; decalage = 0; dessiner(); auRepos();
        return;
      }
      anim = requestAnimationFrame(pas);
    };
    anim = requestAnimationFrame(pas);
  }

  /* Un appui (doigt, souris ou clavier) : elle descend, parle, puis remonte. */
  function descendre() {
    arreter();
    araignee.classList.remove("araignee--repos");
    var cible = Math.min(170, longueurMax());
    var finDescente = function () { parler(); minuterie = setTimeout(relacher, 3400); };
    if (reduit) { longueur = cible; decalage = 0; dessiner(); finDescente(); return; }
    var depart = longueur, departX = decalage, t0 = performance.now();
    var pas = function (t) {
      var p = Math.min((t - t0) / 700, 1), e = 1 - Math.pow(1 - p, 3);
      longueur = depart + (cible - depart) * e;
      decalage = departX * (1 - e);
      dessiner();
      if (p < 1) anim = requestAnimationFrame(pas);
      else finDescente();
    };
    anim = requestAnimationFrame(pas);
  }

  function creerAraignee() {
    araignee = document.createElement("div");
    araignee.className = "araignee araignee--repos";
    araignee.innerHTML =
      '<svg class="araignee__toile" viewBox="0 0 110 110" aria-hidden="true" focusable="false">' + toile() + "</svg>" +
      '<div class="araignee__pendule"><span class="araignee__fil"></span>' +
      '<button type="button" class="araignee__corps" aria-label="Une araignée pendue à son fil. Tire-la vers le bas, ou appuie pour qu’elle descende te parler.">' +
      SVG_ARAIGNEE + "</button>" +
      '<p class="araignee__bulle" aria-hidden="true" hidden></p></div>';
    document.body.appendChild(araignee);

    fil = araignee.querySelector(".araignee__fil");
    corps = araignee.querySelector(".araignee__corps");
    bulle = araignee.querySelector(".araignee__bulle");
    dessiner();

    corps.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      arreter();
      araignee.classList.remove("araignee--repos", "araignee--grimpe");
      prise = { id: e.pointerId, y: e.clientY, x: e.clientX, longueur: longueur, decalage: decalage, bouge: false };
      try { corps.setPointerCapture(e.pointerId); } catch (err) { /* ancien navigateur */ }
    });

    corps.addEventListener("pointermove", function (e) {
      if (!prise || e.pointerId !== prise.id) return;
      var dy = e.clientY - prise.y, dx = e.clientX - prise.x;
      if (Math.abs(dx) + Math.abs(dy) > 6) prise.bouge = true;
      longueur = borne(prise.longueur + dy, 14, longueurMax());
      decalage = borne(prise.decalage + dx * 0.6, -90, 30);
      dessiner();
      if (longueur > 140) parler();
    });

    var lacher = function (e) {
      if (!prise || e.pointerId !== prise.id) return;
      var aBouge = prise.bouge;
      prise = null;
      if (aBouge) relacher();
      else descendre();
    };
    corps.addEventListener("pointerup", lacher);
    corps.addEventListener("pointercancel", lacher);

    /* Entrée ou Espace au clavier (un clic de souris passe par pointerup). */
    corps.addEventListener("click", function (e) { if (e.detail === 0) descendre(); });
  }

  /* ---------- Bulle des surprises ----------
     Une petite bulle qui s'affiche près de ce qu'on vient de toucher. */
  var bulleActive = null, minuterieSurprise = 0;
  function bulleSurprise(element, texte, duree) {
    if (bulleActive) bulleActive.remove();
    clearTimeout(minuterieSurprise);
    var b = document.createElement("div");
    b.className = "bulle-surprise";
    b.setAttribute("aria-hidden", "true");
    b.textContent = texte;
    document.body.appendChild(b);
    var r = element.getBoundingClientRect();
    var x = borne(r.left + r.width / 2 - b.offsetWidth / 2, 10, window.innerWidth - b.offsetWidth - 10);
    var y = r.top - b.offsetHeight - 10;
    if (y < 80) y = r.bottom + 10;
    b.style.left = x + window.scrollX + "px";
    b.style.top = y + window.scrollY + "px";
    bulleActive = b;
    annoncer(texte);
    minuterieSurprise = setTimeout(function () {
      if (bulleActive === b) { b.remove(); bulleActive = null; }
    }, duree || 7000);
  }

  /** Compte les tapes rapprochées : f() est appelée à la n-ième. */
  function apresTapes(n, f) {
    var compte = 0, minuterieTapes = 0;
    return function () {
      compte++;
      clearTimeout(minuterieTapes);
      minuterieTapes = setTimeout(function () { compte = 0; }, 1600);
      if (compte >= n) { compte = 0; f(); }
    };
  }

  function secouer(element, classe) {
    element.classList.remove(classe);
    void element.getBoundingClientRect();
    element.classList.add(classe);
  }

  /* ---------- Le cimetière du pied de page ---------- */
  var TOMBES = [
    { nom: "T-REX", rip: true, largeur: 40, etiquette: "Tombe du T-rex",
      fait: "Le T-rex a vécu jusqu’à la toute fin du Crétacé. Il a disparu il y a 66 millions d’années." },
    { nom: "TRICÉ", rip: true, largeur: 38, etiquette: "Tombe du Tricératops",
      fait: "Le Tricératops et le T-rex vivaient à la même époque : ils ont disparu en même temps." },
    { nom: "−66 Ma", rip: false, largeur: 34, etiquette: "Tombe de l’extinction",
      fait: "Il y a 66 millions d’années, un astéroïde de 10 km est tombé au Mexique. Environ trois espèces sur quatre ont disparu… mais pas les oiseaux !" },
  ];

  function svgTombe(t) {
    var w = t.largeur, h = 50, r = w / 2 - 2;
    return '<svg viewBox="0 0 ' + w + " " + h + '" width="' + w + '" height="' + h + '" aria-hidden="true" focusable="false">' +
      '<path d="M2 ' + h + "V" + (r + 2) + "a" + r + " " + r + " 0 0 1 " + 2 * r + " 0V" + h + 'z" class="cimetiere__pierre"/>' +
      '<g class="cimetiere__gravure" text-anchor="middle" font-weight="800" font-family="system-ui, sans-serif">' +
      (t.rip ? '<text x="' + w / 2 + '" y="' + (r + 6) + '" font-size="7">R.I.P.</text>' : "") +
      '<text x="' + w / 2 + '" y="' + (r + (t.rip ? 17 : 12)) + '" font-size="6.5">' + t.nom + "</text></g></svg>";
  }

  function fantomeSort(depuis) {
    if (reduit || !document.body.animate) return;
    var r = depuis.getBoundingClientRect();
    var f = document.createElement("div");
    f.className = "petit-fantome";
    f.setAttribute("aria-hidden", "true");
    f.innerHTML = '<svg viewBox="0 0 30 34"><path d="M3 32V14a12 12 0 0 1 24 0v18l-4-3-4 3-4-3-4 3-4-3z" fill="#fdf5ec" fill-opacity=".9"/>' +
      '<circle cx="11" cy="14" r="2.2" fill="#2a1d33"/><circle cx="19" cy="14" r="2.2" fill="#2a1d33"/></svg>';
    f.style.left = r.left + r.width / 2 - 15 + window.scrollX + "px";
    f.style.top = r.top + window.scrollY + "px";
    document.body.appendChild(f);
    f.animate([
      { transform: "translate(0, 10px)", opacity: 0 },
      { transform: "translate(-8px, -30px)", opacity: 1, offset: 0.35 },
      { transform: "translate(8px, -60px)", opacity: 1, offset: 0.7 },
      { transform: "translate(0, -90px)", opacity: 0 },
    ], { duration: 2200, easing: "ease-out" }).onfinish = function () { f.remove(); };
  }

  function creerCimetiere() {
    var pied = document.querySelector(".pied");
    if (!pied) return;
    var cimetiere = document.createElement("div");
    cimetiere.className = "cimetiere";
    var rang = document.createElement("div");
    rang.className = "cimetiere__rang";
    TOMBES.forEach(function (t) {
      var tombe = document.createElement("button");
      tombe.type = "button";
      tombe.className = "cimetiere__tombe";
      tombe.setAttribute("aria-label", t.etiquette);
      tombe.innerHTML = svgTombe(t);
      tombe.addEventListener("click", function () {
        if (!actif()) return;
        secouer(tombe, "frisson");
        fantomeSort(tombe);
        bulleSurprise(tombe, "👻 " + t.fait);
      });
      rang.appendChild(tombe);
    });
    cimetiere.appendChild(rang);
    pied.insertBefore(cimetiere, pied.firstChild);
  }

  /* ---------- Accueil : le dinosaure chatouilleux et le volcan ---------- */
  function brancherAccueil() {
    var scene = document.querySelector(".heros__scene");
    var dino = document.querySelector(".heros__dino");
    var boutonDino = document.querySelector(".dino-bouton");
    if (boutonDino && dino) {
      boutonDino.addEventListener("click", apresTapes(3, function () {
        if (!actif()) return;
        secouer(dino, "rugit");
        bulleSurprise(boutonDino, "ROAAAR ! En vrai, personne ne connaît le cri des dinosaures : les sons ne se fossilisent pas. " +
          "Certains grondaient peut-être bouche fermée, comme les crocodiles.");
      }));
    }
    var volcan = document.querySelector(".volcan-bouton");
    if (volcan && scene) {
      volcan.addEventListener("click", function () {
        if (!actif()) return;
        eruption(scene.querySelector("svg"));
        bulleSurprise(volcan, "🌋 Boum ! À la fin du Crétacé, d’énormes volcans crachaient de la lave en Inde. " +
          "Les scientifiques cherchent encore s’ils ont aidé l’astéroïde à faire disparaître les dinosaures.");
      });
    }
  }

  function eruption(svg) {
    if (!svg || reduit || !document.body.animate) return;
    var r = svg.getBoundingClientRect();
    /* Le cratère est en (430, 118) dans le dessin de 520 × 380. */
    var cx = r.left + (430 / 520) * r.width, cy = r.top + (118 / 380) * r.height;
    var couleurs = ["#ff6a1a", "#ffb347", "#e8361c", "#ffd54a"];
    for (var i = 0; i < 26; i++) {
      var g = document.createElement("span");
      g.className = "lave";
      g.setAttribute("aria-hidden", "true");
      g.style.background = couleurs[i % couleurs.length];
      g.style.left = cx - 5 + window.scrollX + "px";
      g.style.top = cy - 5 + window.scrollY + "px";
      document.body.appendChild(g);
      var dx = hasard(-110, 110), haut = hasard(70, 170), chute = hasard(40, 120);
      g.animate([
        { transform: "translate(0, 0) scale(.6)", opacity: 1 },
        { transform: "translate(" + dx * 0.5 + "px," + -haut + "px) scale(1)", opacity: 1, offset: 0.45 },
        { transform: "translate(" + dx + "px," + chute + "px) scale(.5)", opacity: 0 },
      ], { duration: hasard(1100, 1700), delay: i * 25, easing: "cubic-bezier(.2,.6,.4,1)", fill: "backwards" })
        .onfinish = (function (el) { return function () { el.remove(); }; })(g);
    }
  }

  /* ---------- La chauve-souris des titres ---------- */
  function brancherChauveSouris() {
    var titre = document.querySelector(".heros__titre em") || document.querySelector("main h1");
    if (!titre) return;
    var bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "chauve-souris-titre";
    bouton.setAttribute("aria-label", "Une chauve-souris : touche-la !");
    bouton.textContent = "🦇";
    titre.appendChild(bouton);
    var enVol = false;
    bouton.addEventListener("click", function () {
      if (!actif() || enVol) return;
      bulleSurprise(bouton, "🦇 Les plus anciennes chauves-souris fossiles ont environ 55 millions d’années : " +
        "elles n’ont jamais croisé de dinosaure… à part les oiseaux !");
      if (reduit || !document.body.animate) return;
      enVol = true;
      var r = bouton.getBoundingClientRect();
      var vol = document.createElement("div");
      vol.className = "volee-chauve-souris";
      vol.setAttribute("aria-hidden", "true");
      vol.innerHTML = '<svg viewBox="-19 -10 38 22"><path d="' + CHEMIN_CHAUVE_SOURIS + '" fill="#22122e"/></svg>';
      vol.style.left = r.left + r.width / 2 - 19 + "px";
      vol.style.top = r.top + r.height / 2 - 11 + "px";
      document.body.appendChild(vol);
      bouton.style.visibility = "hidden";
      var w = window.innerWidth, h = window.innerHeight;
      var depart = { x: r.left, y: r.top };
      var point = function (fx, fy) {
        return "translate(" + (fx * w - depart.x) + "px," + (fy * h - depart.y) + "px)";
      };
      vol.animate([
        { transform: "translate(0, 0) scale(.8)" },
        { transform: point(0.75, 0.2) + " scale(1.2)", offset: 0.25 },
        { transform: point(0.85, 0.65) + " scale(1.2)", offset: 0.45 },
        { transform: point(0.25, 0.75) + " scale(1.2) scaleX(-1)", offset: 0.7 },
        { transform: "translate(0, 0) scale(.8)" },
      ], { duration: 4200, easing: "ease-in-out" }).onfinish = function () {
        vol.remove();
        bouton.style.visibility = "";
        enVol = false;
      };
    });
  }

  /* ---------- Les mots magiques de la recherche du catalogue ---------- */
  function sansAccent(t) { return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }

  function brancherRecherche() {
    var recherche = document.getElementById("recherche-dino");
    var vide = document.getElementById("aucun-resultat");
    if (!recherche || !vide) return;
    var message = document.createElement("div");
    message.className = "encadre encadre--attention message-surprise";
    message.hidden = true;
    vide.parentNode.insertBefore(message, vide);

    var montrer = function (titre, texte) {
      message.innerHTML = '<h2 class="encadre__titre"></h2><p></p>';
      message.querySelector("h2").textContent = titre;
      message.querySelector("p").textContent = texte;
      message.hidden = false;
      annoncer(titre + " " + texte);
    };

    var dernier = "";
    var verifier = function () {
      var mot = sansAccent(recherche.value);
      if (mot === dernier) return;
      dernier = mot;
      message.hidden = true;
      if (!actif()) return;
      if (/^(citrouilles?|potirons?)$/.test(mot)) {
        var reste = CACHETTES.filter(function (c) { return trouvees().indexOf(c.id) === -1; });
        montrer("🎃 Une citrouille ? Pas un dinosaure !",
          reste.length ? "Petite devinette pour t’aider : " + reste[Math.floor(Math.random() * reste.length)].indice
                       : "Tu as déjà trouvé toutes les citrouilles. Bravo, champion !");
      } else if (/^(fantomes?|bouh|halloween)$/.test(mot)) {
        montrer("👻 Bouh !", "Aucun dinosaure ne s’appelle comme ça… mais un T-rex fantôme vient de passer !");
        fantome();
      } else if (/^araignees?$/.test(mot)) {
        montrer("🕷️ Tu m’as appelée ?", "Regarde en haut à droite de l’écran : je descends te dire bonjour !");
        descendre();
      } else if (/^chauves?[- ]?souris$/.test(mot)) {
        montrer("🦇 Pas de chauve-souris ici",
          "Les chauves-souris sont des mammifères. Elles sont apparues environ 10 millions d’années après la disparition des dinosaures.");
      }
    };
    recherche.addEventListener("input", function () { setTimeout(verifier, 200); });
    verifier();
  }

  /* ---------- Les rayons X des fiches ---------- */
  var minuterieRadio = 0;
  function rayonsX(figure) {
    if (!actif()) return;
    var allume = !figure.classList.contains("rayons-x");
    figure.classList.toggle("rayons-x", allume);
    clearTimeout(minuterieRadio);
    if (!allume) return;
    bulleSurprise(figure, "🩻 Rayons X… pour de faux ! En vrai, les paléontologues passent les fossiles au scanner " +
      "pour voir l’intérieur des os sans les abîmer.");
    minuterieRadio = setTimeout(function () { figure.classList.remove("rayons-x"); }, 9000);
  }

  function brancherRadio() {
    var figure = document.querySelector(".fiche__illustration");
    var image = figure && figure.querySelector("img");
    if (!image) return;
    /* Appui long au doigt ou à la souris, ou double-clic. */
    var minuterieAppui = 0, appui = null, declenche = false;
    var annuler = function () { clearTimeout(minuterieAppui); appui = null; };
    image.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      declenche = false;
      appui = { x: e.clientX, y: e.clientY };
      minuterieAppui = setTimeout(function () { declenche = true; rayonsX(figure); }, 650);
    });
    image.addEventListener("pointermove", function (e) {
      if (appui && Math.abs(e.clientX - appui.x) + Math.abs(e.clientY - appui.y) > 12) annuler();
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(function (type) { image.addEventListener(type, annuler); });
    /* Le menu « enregistrer l'image » ne doit pas gâcher la surprise. */
    image.addEventListener("contextmenu", function (e) { if (appui || declenche) e.preventDefault(); });
    image.addEventListener("dblclick", function () { rayonsX(figure); });
  }

  /* ---------- Le soir du 31 octobre ----------
     Pour voir la surprise un autre jour : ajouter #31-octobre à l'adresse. */
  function soirHalloween() {
    var d = new Date();
    if (!(d.getMonth() === 9 && d.getDate() === 31) && location.hash !== "#31-octobre") return;
    document.documentElement.classList.add("soir-halloween");
    var message = Theme.zone.querySelector(".bandeau-theme__message");
    if (message) {
      message.innerHTML = 'C’est le soir d’Halloween !<span class="bandeau-theme__long"> Des feux follets se promènent sur le site…</span>';
    }
    if (reduit) return;
    var feux = document.createElement("div");
    feux.className = "feux-follets";
    feux.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 9; i++) {
      var f = document.createElement("span");
      f.style.left = hasard(5, 92) + "%";
      f.style.top = hasard(15, 90) + "%";
      f.style.animationDuration = hasard(9, 16) + "s, " + hasard(2, 4) + "s";
      f.style.animationDelay = -hasard(0, 10) + "s, " + -hasard(0, 3) + "s";
      feux.appendChild(f);
    }
    document.body.appendChild(feux);
  }

  /* ---------- La récompense : le diplôme ---------- */
  var ADRESSE_DIPLOME = "diplome-citrouilles.html";

  function ouvrirDiplome() {
    /* Le nouvel onglet reçoit en principe une copie de la mémoire de la visite ;
       la marque #bravo sert de secours aux navigateurs qui ne la transmettent pas. */
    var adresse = BASE + ADRESSE_DIPLOME + "#bravo";
    var onglet = window.open(adresse, "_blank");
    if (!onglet) location.href = adresse;
  }

  function proposerRecompense() {
    if (!actif()) return;
    var d = document.createElement("dialog");
    d.className = "dialogue-diplome";
    d.setAttribute("aria-labelledby", "dialogue-diplome-titre");
    d.innerHTML =
      '<p class="dialogue-diplome__emoji" aria-hidden="true">🏆</p>' +
      '<h2 id="dialogue-diplome-titre">Les ' + TOTAL + " citrouilles sont trouvées !</h2>" +
      "<p>Quelle chasse ! Une récompense t’attend : ton diplôme de chasseur de citrouilles.</p>" +
      '<p class="dialogue-diplome__actions"><button type="button" class="bouton" data-diplome>🎓 Voir mon diplôme</button> ' +
      '<button type="button" class="bouton bouton--secondaire" data-fermer>Plus tard</button></p>';
    document.body.appendChild(d);
    var fermer = function () { if (d.open) d.close(); d.remove(); };
    d.querySelector("[data-diplome]").addEventListener("click", function () { ouvrirDiplome(); fermer(); });
    d.querySelector("[data-fermer]").addEventListener("click", fermer);
    d.addEventListener("cancel", function () { setTimeout(fermer, 0); });
    if (typeof d.showModal === "function") d.showModal();
    else d.setAttribute("open", "");
  }

  /* Sur la page du diplôme : le diplôme ne se montre qu'aux vrais chasseurs. */
  function afficherDiplome() {
    var diplome = document.getElementById("diplome");
    var verrou = document.getElementById("diplome-verrou");
    if (!diplome || !verrou) return;
    var merite = trouvees().length >= TOTAL || location.hash === "#bravo";
    diplome.hidden = !merite;
    verrou.hidden = merite;
    var date = document.getElementById("diplome-date");
    if (date) date.textContent = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    var imprimer = document.getElementById("diplome-imprimer");
    if (imprimer) imprimer.addEventListener("click", function () { window.print(); });
  }

  completerBandeau();
  creerAraignee();
  creerCimetiere();
  cacherCitrouilles();
  brancherAccueil();
  brancherChauveSouris();
  brancherRecherche();
  brancherRadio();
  soirHalloween();
  afficherDiplome();
})();
