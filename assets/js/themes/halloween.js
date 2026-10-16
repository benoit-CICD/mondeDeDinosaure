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

  /* ---- Les cachettes des citrouilles ---- */
  var CACHETTES = [
    { id: "accueil", page: /\/(index\.html)?$/, cible: ".chiffres", style: "right:-4px;bottom:-34px",
      indice: "Psst… une citrouille a roulé sous les grands chiffres de la page d’accueil." },
    { id: "trex", page: /\/dinosaures\/tyrannosaurus\.html$/, cible: ".fiche__illustration", style: "left:14px;top:14px",
      indice: "Le roi des lézards tyrans cache une citrouille sur sa fiche… tout près de son portrait !" },
    { id: "frise", page: /\/frise\.html$/, cible: ".frise > .frise__jalon:last-of-type .frise__periode", style: "right:8px;top:8px",
      indice: "Remonte la frise du temps jusqu’à l’astéroïde : une citrouille t’y attend." },
    { id: "glossaire", page: /\/glossaire\.html$/, cible: ".glossaire__terme:nth-child(12)", style: "right:4px;top:4px",
      indice: "Une citrouille s’est glissée entre les mots du glossaire." },
    { id: "jeux", page: /\/jeux\.html$/, cible: ".encadre", style: "right:10px;bottom:10px",
      indice: "Dans la salle de jeux, une citrouille écoute le conseil…" },
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
  ];

  /* ---------- Dans le bandeau : le fantôme et le compteur de citrouilles ---------- */
  var elCompteur;

  function majCompteur() {
    var n = trouvees().length;
    elCompteur.innerHTML = n >= TOTAL
      ? "🎉 " + TOTAL + " / " + TOTAL + '<span class="bandeau-theme__long"> : bravo, tout est trouvé !</span>'
      : '🎃 <span class="bandeau-theme__long">Citrouilles cachées : </span>' + n + " / " + TOTAL;
    elCompteur.classList.toggle("compteur-citrouilles--bravo", n >= TOTAL);
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

  /* « bouh » tapé au clavier, en dehors des champs de saisie */
  var tape = "";
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
    if (e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
    tape = (tape + e.key.toLowerCase()).slice(-4);
    if (tape === "bouh") { tape = ""; fantome(); }
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
    if (elCompteur) elCompteur.focus({ preventScroll: true });
    if (liste.length >= TOTAL) {
      annoncer("Bravo ! Tu as trouvé les " + TOTAL + " citrouilles cachées !");
      fantome();
      pluieDeBonbons();
    } else {
      var reste = TOTAL - liste.length;
      annoncer("Citrouille trouvée ! Encore " + reste + " à dénicher.");
    }
  }

  function cacherCitrouilles() {
    var deja = trouvees();
    CACHETTES.forEach(function (c) {
      if (!c.page.test(location.pathname) || deja.indexOf(c.id) !== -1) return;
      var cible = document.querySelector(c.cible);
      if (!cible) return;
      if (getComputedStyle(cible).position === "static") cible.style.position = "relative";
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "citrouille-cachee";
      bouton.style.cssText = c.style;
      bouton.setAttribute("aria-label", "Une citrouille cachée ! Ramasse-la.");
      bouton.innerHTML = SVG_CITROUILLE;
      bouton.addEventListener("click", function () { ramasser(c, bouton); });
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

  completerBandeau();
  creerAraignee();
  cacherCitrouilles();
})();
