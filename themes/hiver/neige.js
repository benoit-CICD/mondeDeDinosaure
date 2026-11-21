/* La neige du thème d'hiver.

   Des flocons tombent sur la page et s'entassent en bas de l'écran, jusqu'à un
   tiers de sa hauteur en cinq minutes, moins haut sur les pages de jeux pour ne
   pas gêner la partie (reglages.neige dans theme.mjs).
   La neige est dessinée sur un <canvas> posé devant la page, qui laisse passer
   les clics. Sa forme est gardée dans la mémoire de la visite : on la retrouve
   en changeant de page, et elle disparaît quand on ferme l'onglet. Sur une page
   de jeu, elle est seulement affichée moins haut : la couche gardée en mémoire
   n'est pas rabotée (on la retrouve en sortant du jeu), sauf si on y déneige.

   La pelle : le bouton « Prendre la pelle », en bas à droite, transforme le
   pointeur en pelle ; on la passe sur la neige, à la souris ou au doigt, pour
   déneiger. Au clavier, le même bouton déneige tout l'écran d'un coup.
   Échap, ou un nouvel appui sur le bouton, repose la pelle.

   Pour que la neige ne cache jamais rien pour de bon, la page gagne en bas une
   marge de la hauteur de la neige (--neige-hauteur, dans hiver.css) : on peut
   toujours faire défiler le texte au-dessus. Un élément atteint au clavier
   (touche Tab) est aussi remonté au-dessus de la neige.

   Rien ne tombe avec le réglage « réduire les animations », ni quand le thème
   est éteint. Pour essayer sans attendre : ajouter #neige-rapide au bout de
   l'adresse (la neige monte dix fois plus vite). */
(function () {
  "use strict";

  var Theme = window.Theme;
  var canvas = document.createElement("canvas");
  if (!Theme || !window.requestAnimationFrame || !canvas.getContext) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  /* ---------- Réglages ---------- */
  var R = Theme.reglages.neige || {};
  var surJeux = /\/jeux\//.test(location.pathname);
  var PART_MAX = surJeux ? R.hauteurMaxJeux || 0.1 : R.hauteurMax || 1 / 3;
  var DUREE = (R.duree || 300) / (location.hash === "#neige-rapide" ? 10 : 1); // secondes
  var COLONNE = 4;        // largeur d'une colonne de neige (px)
  var TALUS = 3;          // écart de hauteur toléré entre deux colonnes voisines (px)
  var ECHANTILLONS = 96;  // points gardés en mémoire pour la page suivante
  var PINCEES = 6;        // dépôts de neige à chaque image
  var ETALEMENT = 10;     // un dépôt s'étale sur 10 colonnes de chaque côté
  var sombre = window.matchMedia("(prefers-color-scheme: dark)");

  /* L'icône du bouton : une pelle à neige rouge, lame bordée d'acier, poignée en D. */
  var PELLE_SVG =
    '<svg class="pelle-icone" viewBox="0 0 32 32" aria-hidden="true" focusable="false">' +
    '<g transform="translate(0 -.6) rotate(35 16 16)">' +
    '<path class="pelle-icone__poignee" d="M14.6 7.6Q10.6 6.6 11 2.4H21Q21.4 6.6 17.4 7.6" fill="none" stroke-width="2.2" stroke-linejoin="round"/>' +
    '<rect x="15" y="7" width="2" height="12" rx=".9" fill="#b98049"/>' +
    '<path d="M14.4 17.8h3.2l1.3 3.6h-5.8z" fill="#8f2a1e"/>' +
    '<path d="M10.2 21.6Q16 19.8 21.8 21.6L23.2 29.2Q23.3 30 22.5 30H9.5Q8.7 30 8.8 29.2Z" fill="#e0533f" stroke="#7d2216" stroke-width=".9"/>' +
    '<path d="M8.95 28.1H23.05L23.2 29.2Q23.3 30 22.5 30H9.5Q8.7 30 8.8 29.2Z" fill="#cfd7de"/>' +
    '<path d="M14.6 22.9l-1.4 4.4M16 22.5v4.8M17.4 22.9l1.4 4.4" stroke="#fff" stroke-opacity=".5" stroke-width=".8" stroke-linecap="round"/>' +
    "</g></svg>";

  /* ---------- Éléments ---------- */
  var racine = document.documentElement;
  var ctx = canvas.getContext("2d");
  canvas.className = "neige";
  canvas.setAttribute("aria-hidden", "true");

  var zone = document.createElement("div"); // là où la pelle travaille, en bas de l'écran
  zone.className = "neige-zone";
  zone.hidden = true;

  var bouton = document.createElement("button");
  bouton.type = "button";
  bouton.className = "pelle-bouton";
  bouton.hidden = true;
  bouton.setAttribute("aria-pressed", "false");
  bouton.innerHTML = PELLE_SVG + "<span>Prendre la pelle</span>";
  var libelle = bouton.querySelector("span");

  document.body.appendChild(canvas);
  document.body.appendChild(zone);
  document.body.appendChild(bouton);

  /* ---------- État ---------- */
  var L = 0, H = 0;                   // taille de l'écran (px)
  var n = 0;                          // nombre de colonnes
  var haut = new Float32Array(0);     // hauteur de neige de chaque colonne (px)
  var plafond = new Float32Array(0);  // hauteur maximale de chaque colonne (px)
  var plafondMoyen = 0;
  var flocons = [];
  var gerbes = [];                    // neige projetée par la pelle
  var plusHaut = 0;                  // hauteur de la plus haute colonne (px)
  var margeAffichee = -1;             // valeur actuelle de --neige-hauteur
  var modifiee = false;               // forme à garder en mémoire
  var tenue = false;                  // la pelle est en main
  var pelle = null;                   // position de la pelle {x, y}, ou null
  var balayage = null;                // déneigement automatique (clavier)
  var elan = 0, inclinaison = 0;      // la pelle penche dans le sens où on la pousse
  var temps = 0, avant = 0, idImage = 0, enMarche = false;

  function colonne(x) { return Math.max(0, Math.min(n - 1, Math.round(x / COLONNE))); }
  function demiLame() { return Math.max(20, Math.min(34, L * 0.04)); }

  /* Le dessus de la neige, une fois tout tombé : une ligne doucement ondulée. */
  function vague(x) {
    return 0.5 + 0.22 * Math.sin(x / 97) + 0.16 * Math.sin(x / 41 + 1.3) + 0.12 * Math.sin(x / 23 + 2.1);
  }

  /* ---------- Taille de l'écran ---------- */
  function dimensionner() {
    var r = canvas.getBoundingClientRect();
    var largeur = Math.round(r.width) || document.documentElement.clientWidth;
    var hauteur = Math.round(r.height) || window.innerHeight;
    if (largeur === L && hauteur === H) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(largeur * dpr);
    canvas.height = Math.round(hauteur * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    /* La neige déjà tombée garde sa forme, à la nouvelle taille. */
    var ancienne = haut, ancienN = n, ancienH = H;
    L = largeur; H = hauteur; n = Math.ceil(L / COLONNE) + 1;
    haut = new Float32Array(n);
    plafond = new Float32Array(n);
    var maxPx = H * PART_MAX, somme = 0;
    for (var i = 0; i < n; i++) {
      plafond[i] = maxPx * (0.86 + 0.14 * vague(i * COLONNE));
      somme += plafond[i];
      if (ancienN > 1) haut[i] = Math.min(plafond[i], ancienne[Math.round(i * (ancienN - 1) / (n - 1))] * H / ancienH);
    }
    plafondMoyen = somme / n;

    var voulu = Math.round(Math.max(40, Math.min(220, L * H / 9000)));
    while (flocons.length < voulu) flocons.push(nouveauFlocon(true));
    flocons.length = voulu;
  }

  /* ---------- Mémoire de la visite ---------- */
  function restaurer() {
    var donnees = null;
    try { donnees = JSON.parse(Theme.lire("neige")); } catch (e) { donnees = null; }
    if (!donnees || !donnees.h || donnees.h.length < 2) return;
    var m = donnees.h.length;
    for (var i = 0; i < n; i++) {
      var p = i * (m - 1) / (n - 1), k = Math.floor(p), f = p - k;
      var v = donnees.h[k] * (1 - f) + donnees.h[Math.min(m - 1, k + 1)] * f;
      haut[i] = Math.min(plafond[i], Math.max(0, v) / 1000 * H);
    }
  }
  function garder() {
    if (!modifiee || n < 2) return;
    modifiee = false;
    var h = [];
    for (var k = 0; k < ECHANTILLONS; k++) h.push(Math.round(haut[Math.round(k * (n - 1) / (ECHANTILLONS - 1))] / H * 1000));
    Theme.ecrire("neige", JSON.stringify({ h: h }));
  }

  /* ---------- Les flocons ---------- */
  function nouveauFlocon(partout) {
    var r = 1 + Math.random() * Math.random() * 3; // beaucoup de petits, quelques gros
    return {
      x: Math.random() * L,
      y: partout ? Math.random() * H : -r - Math.random() * 60,
      r: r,
      v: 16 + r * 13 + Math.random() * 14,  // vitesse de chute (px/s)
      phase: Math.random() * 6.3,
      ampl: 5 + Math.random() * 14,         // balancement (px)
      freq: 0.35 + Math.random() * 0.8,
      a: 0.6 + Math.random() * 0.4,         // opacité
    };
  }
  function xFlocon(f) { return f.x + Math.sin(temps * f.freq + f.phase) * f.ampl; }

  /* Les flocons fondent dans la couche en la touchant. */
  function tomber(dt) {
    for (var k = 0; k < flocons.length; k++) {
      var f = flocons[k];
      f.y += f.v * dt;
      if (f.y + f.r >= H - haut[colonne(xFlocon(f))]) flocons[k] = nouveauFlocon(false);
    }
  }

  /* La couche monte au rythme voulu, en fines pincées réparties sur toute la
     largeur : elle reste régulière, avec de petites bosses. */
  function saupoudrer(dt) {
    var volume = plafondMoyen * L / DUREE * dt / PINCEES;
    for (var s = 0; s < PINCEES; s++) deposer(Math.floor(Math.random() * n), volume);
  }

  function deposer(i, volume) {
    for (var d = -ETALEMENT; d <= ETALEMENT; d++) {
      var j = i + d;
      if (j < 0 || j >= n || haut[j] >= plafond[j]) continue;
      var poids = (ETALEMENT + 1 - Math.abs(d)) / ((ETALEMENT + 1) * (ETALEMENT + 1));
      haut[j] = Math.min(plafond[j], haut[j] + volume * poids / COLONNE);
      modifiee = true;
    }
  }

  /* Une pente trop raide s'éboule sur la colonne voisine. */
  function ebouler() {
    for (var passe = 0; passe < 2; passe++) {
      for (var k = 0; k < n - 1; k++) {
        var i = passe === 0 ? k : n - 2 - k;
        var d = haut[i] - haut[i + 1], m;
        if (d > TALUS) {
          m = (d - TALUS) / 2;
          haut[i] -= m;
          haut[i + 1] = Math.min(plafond[i + 1], haut[i + 1] + m);
        } else if (d < -TALUS) {
          m = (-d - TALUS) / 2;
          haut[i + 1] -= m;
          haut[i] = Math.min(plafond[i], haut[i] + m);
        }
      }
    }
  }

  /* ---------- La pelle ---------- */
  /* Retire la neige au-dessus de la lame, le long du trajet de la pelle. */
  function creuser(x0, y0, x1, y1) {
    var d = demiLame(), retiree = 0;
    var pas = Math.max(1, Math.ceil(Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) / 6));
    for (var s = 1; s <= pas; s++) {
      var x = x0 + (x1 - x0) * s / pas, y = y0 + (y1 - y0) * s / pas;
      var niveau = Math.max(0, H - y - 12); // le bas de la lame
      for (var i = colonne(x - d), fin = colonne(x + d); i <= fin; i++) {
        if (haut[i] > niveau) { retiree += (haut[i] - niveau) * COLONNE; haut[i] = niveau; }
      }
    }
    if (retiree > 0) {
      modifiee = true;
      projeter(x1, Math.min(y1, H - 4), retiree);
      deneige(Math.min(x0, x1) - d, Math.max(x0, x1) + d);
    }
  }

  function projeter(x, y, quantite) {
    var nb = Math.min(10, Math.ceil(quantite / 150));
    for (var k = 0; k < nb && gerbes.length < 160; k++) {
      gerbes.push({
        x: x + (Math.random() - 0.5) * 24, y: y,
        vx: (Math.random() - 0.5) * 240, vy: -110 - Math.random() * 220,
        r: 1.5 + Math.random() * 2.5, vie: 0.6 + Math.random() * 0.4, age: 0,
      });
    }
  }
  function bougerGerbes(dt) {
    for (var k = gerbes.length - 1; k >= 0; k--) {
      var g = gerbes[k];
      g.age += dt; g.vy += 650 * dt; g.x += g.vx * dt; g.y += g.vy * dt;
      if (g.age >= g.vie) gerbes.splice(k, 1);
    }
  }

  /* Au clavier : la pelle traverse l'écran et déneige tout. */
  function balayer(dt) {
    var d = demiLame(), y = H - 14, x0 = balayage.x;
    balayage.x += (L + 2 * d) / 1.4 * dt; // tout l'écran en 1,4 s
    creuser(x0, y, balayage.x, y);
    pelle = { x: balayage.x, y: y };
    elan = 14;
    if (balayage.x > L + d) {
      for (var i = 0; i < n; i++) haut[i] = 0;
      modifiee = true;
      deneige(0, L);
      poser("Tout l’écran est déneigé !");
    }
  }

  function prendre() {
    tenue = true;
    bouton.setAttribute("aria-pressed", "true");
    libelle.textContent = "Poser la pelle";
    zone.hidden = false;
    majZone();
    Theme.annoncer("Tu as pris la pelle : passe-la sur la neige, en bas de l’écran. Touche Échap pour la poser.");
  }
  function poser(annonce) {
    tenue = false;
    pelle = null;
    balayage = null;
    bouton.setAttribute("aria-pressed", "false");
    libelle.textContent = "Prendre la pelle";
    zone.hidden = true;
    if (annonce) Theme.annoncer(annonce);
  }

  bouton.addEventListener("click", function (e) {
    if (balayage) return;
    if (tenue) { poser("Pelle posée."); return; }
    if (e.detail === 0) {
      /* Activé au clavier (Entrée, Espace) : on déneige tout d'un coup. */
      tenue = true;
      balayage = { x: -demiLame() };
      bouton.setAttribute("aria-pressed", "true");
      libelle.textContent = "Je déneige…";
      return;
    }
    prendre();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && tenue && !balayage) poser("Pelle posée.");
  });

  /* La zone de la pelle couvre la neige et un peu au-dessus : plus haut, la page
     reste utilisable (défilement, liens) même pelle en main. */
  function majZone() { zone.style.height = Math.round(Math.max(90, plusHaut + 70)) + "px"; }

  zone.addEventListener("pointerdown", function (e) {
    if (e.pointerType !== "mouse") { try { zone.setPointerCapture(e.pointerId); } catch (x) { /* déjà relâché */ } }
    pelle = { x: e.clientX, y: e.clientY };
    creuser(pelle.x, pelle.y, pelle.x, pelle.y);
    e.preventDefault();
  });
  zone.addEventListener("pointermove", function (e) {
    var avantPelle = pelle || { x: e.clientX, y: e.clientY };
    pelle = { x: e.clientX, y: e.clientY };
    elan += pelle.x - avantPelle.x;
    creuser(avantPelle.x, avantPelle.y, pelle.x, pelle.y);
  });
  zone.addEventListener("pointerup", function (e) { if (e.pointerType !== "mouse") pelle = null; });
  zone.addEventListener("pointercancel", function () { pelle = null; });
  zone.addEventListener("pointerleave", function () { pelle = null; });

  /* ---------- Dessin ---------- */
  /* Une pelle à neige : lame rouge creusée de nervures, bordée d'une bande d'acier,
     manche en bois et poignée en D. Le bas de la lame est 12 px sous le pointeur,
     là où creuser() retire la neige. Le dessin est fait pour une lame de 60 unités
     de large, puis mis à l'échelle de demiLame(). */
  function contourLame() {
    ctx.beginPath();
    ctx.moveTo(-25, -35);
    ctx.quadraticCurveTo(0, -44, 25, -35);
    ctx.quadraticCurveTo(27.2, -34.4, 27.4, -32);
    ctx.lineTo(30, -3.5);
    ctx.quadraticCurveTo(30.4, 0, 27, 0);
    ctx.lineTo(-27, 0);
    ctx.quadraticCurveTo(-30.4, 0, -30, -3.5);
    ctx.lineTo(-27.4, -32);
    ctx.quadraticCurveTo(-27.2, -34.4, -25, -35);
    ctx.closePath();
  }
  function trait(couleur, epaisseur, x0, y0, x1, y1) {
    ctx.strokeStyle = couleur;
    ctx.lineWidth = epaisseur;
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  }
  function degrade(x0, y0, x1, y1, couleurs) {
    var g = ctx.createLinearGradient(x0, y0, x1, y1);
    for (var k = 0; k < couleurs.length; k++) g.addColorStop(couleurs[k][0], couleurs[k][1]);
    return g;
  }

  function dessinerPelle(x, y) {
    var s = demiLame() / 30, k;
    elan *= 0.8;
    inclinaison += (Math.max(-0.2, Math.min(0.2, -elan * 0.012)) - inclinaison) * 0.25;

    ctx.save();
    ctx.translate(x, y + 12);
    ctx.scale(s, s);
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    /* Son ombre sur la neige. */
    ctx.fillStyle = "rgba(40, 80, 120, .18)";
    ctx.beginPath();
    ctx.ellipse(0, 1, 34, 4.5, 0, 0, 6.2832);
    ctx.fill();
    ctx.rotate(inclinaison - 0.04);

    /* Le manche, penché vers la droite, qui sort de derrière la lame. */
    ctx.save();
    ctx.translate(0, -36);
    ctx.rotate(0.36);
    ctx.fillStyle = degrade(-3.2, 0, 3.2, 0, [[0, "#e2b47a"], [0.45, "#b9834c"], [1, "#7a4f2c"]]);
    ctx.strokeStyle = "#5e3b1f";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(-3.2, -96, 6.4, 84);
    ctx.fill();
    ctx.stroke();
    trait("rgba(255, 240, 215, .45)", 1, -1.3, -92, -1.3, -16); // la veine du bois

    /* La poignée en D, au bout du manche, avec un liseré clair pour se voir
       aussi sur une page sombre. */
    ctx.fillStyle = "#3a3f45";
    ctx.fillRect(-4, -101, 8, 7);
    for (k = 0; k < 2; k++) {
      ctx.strokeStyle = k ? "#2b2f33" : "rgba(255, 255, 255, .55)";
      ctx.lineWidth = k ? 4.2 : 6.6;
      ctx.beginPath();
      ctx.moveTo(-3, -100);
      ctx.quadraticCurveTo(-13, -104, -11.5, -118);
      ctx.lineTo(11.5, -118);
      ctx.quadraticCurveTo(13, -104, 3, -100);
      ctx.stroke();
      trait(ctx.strokeStyle, k ? 6.5 : 8.9, -10.5, -118, 10.5, -118);
    }
    trait("rgba(255, 255, 255, .28)", 1.4, -8.5, -119.6, 8.5, -119.6);

    /* La douille, qui fixe le manche à la lame. */
    ctx.fillStyle = degrade(-7, 0, 7, 0, [[0, "#c9463a"], [1, "#7d2216"]]);
    ctx.strokeStyle = "#5c170e";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-7.5, 4); ctx.lineTo(7.5, 4); ctx.lineTo(4.2, -18); ctx.lineTo(-4.2, -18);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#d9dee3";
    ctx.beginPath(); ctx.arc(0, -9, 1.5, 0, 6.2832); ctx.fill();
    ctx.restore();

    /* La lame : rouge, creuse (plus claire à gauche, plus sombre à droite). */
    contourLame();
    ctx.fillStyle = degrade(0, -44, 0, 0, [[0, "#f2735c"], [0.5, "#dc4532"], [1, "#b02f20"]]);
    ctx.fill();
    ctx.fillStyle = degrade(-30, 0, 30, 0, [[0, "rgba(255, 255, 255, .22)"], [0.35, "rgba(255, 255, 255, 0)"], [0.7, "rgba(0, 0, 0, 0)"], [1, "rgba(60, 0, 0, .25)"]]);
    ctx.fill();
    for (k = -1; k <= 1; k++) { // les nervures
      trait("rgba(110, 20, 10, .35)", 2.6, k * 4 + 1, -36, k * 15 + 1, -8);
      trait("rgba(255, 210, 200, .45)", 1.5, k * 4, -36.5, k * 15, -8.5);
    }
    ctx.strokeStyle = "#9e2a1b"; // le bord replié, en haut
    ctx.lineWidth = 3.4;
    ctx.beginPath(); ctx.moveTo(-25, -35); ctx.quadraticCurveTo(0, -44, 25, -35); ctx.stroke();
    ctx.strokeStyle = "rgba(255, 220, 210, .55)";
    ctx.lineWidth = 1.1;
    ctx.beginPath(); ctx.moveTo(-23, -32.6); ctx.quadraticCurveTo(0, -40.6, 23, -32.6); ctx.stroke();
    contourLame();
    ctx.strokeStyle = "#6e1d12";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    /* La bande d'acier qui racle le sol, et ses rivets. */
    ctx.beginPath();
    ctx.moveTo(-29.7, -6.5); ctx.lineTo(29.7, -6.5); ctx.lineTo(30, -3.5);
    ctx.quadraticCurveTo(30.4, 0, 27, 0); ctx.lineTo(-27, 0);
    ctx.quadraticCurveTo(-30.4, 0, -30, -3.5);
    ctx.closePath();
    ctx.fillStyle = degrade(0, -6.5, 0, 0, [[0, "#f4f7f9"], [1, "#98a4af"]]);
    ctx.fill();
    ctx.strokeStyle = "#56616b";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = "#56616b";
    for (k = -1; k <= 1; k++) { ctx.beginPath(); ctx.arc(k * 18, -3.3, 1.1, 0, 6.2832); ctx.fill(); }

    ctx.restore();
  }

  /* Le dessus de la neige, adouci pour le dessin (moyenne pondérée sur 5 colonnes). */
  var lisse = new Float32Array(0);
  function lisser() {
    if (lisse.length !== n) lisse = new Float32Array(n);
    for (var i = 0; i < n; i++) {
      var a = haut[Math.max(0, i - 2)], b = haut[Math.max(0, i - 1)];
      var c = haut[Math.min(n - 1, i + 1)], d = haut[Math.min(n - 1, i + 2)];
      lisse[i] = (a + 2 * b + 3 * haut[i] + 2 * c + d) / 9;
    }
  }

  function dessiner() {
    var nuit = sombre.matches, i, k, y;
    ctx.clearRect(0, 0, L, H);

    plusHaut = 0;
    for (i = 0; i < n; i++) if (haut[i] > plusHaut) plusHaut = haut[i];

    if (plusHaut > 0.5) {
      lisser();
      ctx.beginPath();
      ctx.moveTo(0, H);
      for (i = 0; i < n; i++) ctx.lineTo(i * COLONNE, H - lisse[i]);
      ctx.lineTo(L, H);
      ctx.closePath();
      var degrade = ctx.createLinearGradient(0, H - plusHaut, 0, H);
      degrade.addColorStop(0, nuit ? "#eef4fb" : "#ffffff");
      degrade.addColorStop(1, nuit ? "#b9cbe0" : "#d3e3f2");
      ctx.fillStyle = degrade;
      ctx.fill();

      /* Le bord de la neige, pour qu'elle se voie aussi sur une page claire. */
      ctx.beginPath();
      var dedans = false;
      for (i = 0; i < n; i++) {
        if (lisse[i] < 0.5) { dedans = false; continue; }
        y = H - lisse[i];
        if (dedans) ctx.lineTo(i * COLONNE, y);
        else { ctx.moveTo(i * COLONNE, y); dedans = true; }
      }
      ctx.lineWidth = 2;
      ctx.strokeStyle = nuit ? "rgba(255, 255, 255, .85)" : "rgba(120, 160, 200, .75)";
      ctx.stroke();
    }

    /* Les flocons : blancs, cerclés de bleu sur une page claire. */
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "rgba(110, 150, 190, .6)";
    ctx.lineWidth = 0.8;
    for (k = 0; k < flocons.length; k++) {
      var f = flocons[k];
      ctx.globalAlpha = f.a;
      ctx.beginPath();
      ctx.arc(xFlocon(f), f.y, f.r, 0, 6.2832);
      ctx.fill();
      if (!nuit) ctx.stroke();
    }
    for (k = 0; k < gerbes.length; k++) {
      var g = gerbes[k];
      ctx.globalAlpha = Math.max(0, 1 - g.age / g.vie);
      ctx.beginPath();
      ctx.arc(g.x, g.y, g.r, 0, 6.2832);
      ctx.fill();
      if (!nuit) ctx.stroke();
    }
    ctx.globalAlpha = 1;

    if (tenue && pelle) dessinerPelle(pelle.x, pelle.y);
  }

  /* La marge en bas de page suit la neige (par paliers, pour ne pas tout recalculer). */
  function majMarge() {
    var voulue = Math.round(plusHaut / 8) * 8;
    if (voulue === margeAffichee) return;
    margeAffichee = voulue;
    racine.style.setProperty("--neige-hauteur", voulue + "px");
  }

  function majBouton() {
    var visible = tenue || plusHaut >= 14 || document.activeElement === bouton;
    if (bouton.hidden === visible) bouton.hidden = !visible;
    if (tenue) majZone();
  }

  /* ---------- La boucle ---------- */
  function image(t) {
    idImage = requestAnimationFrame(image);
    var dt = avant ? Math.min(0.1, (t - avant) / 1000) : 0;
    avant = t;
    temps += dt;
    tomber(dt);
    saupoudrer(dt);
    if (balayage) balayer(dt);
    ebouler();
    bougerGerbes(dt);
    dessiner();
    majMarge();
    majBouton();
  }

  function demarrer() {
    if (enMarche || !Theme.actif() || document.hidden) return;
    enMarche = true;
    avant = 0;
    idImage = requestAnimationFrame(image);
  }
  function arreter() {
    if (!enMarche) return;
    enMarche = false;
    cancelAnimationFrame(idImage);
    garder();
  }

  /* Thème éteint : plus de neige ni de pelle (la forme reste en mémoire, pour le rallumage). */
  Theme.surBascule(function (allume) {
    if (allume) { demarrer(); return; }
    arreter();
    poser();
    ctx.clearRect(0, 0, L, H);
    bouton.hidden = true;
    margeAffichee = -1;
    racine.style.removeProperty("--neige-hauteur");
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) arreter();
    else demarrer();
  });
  window.addEventListener("pagehide", garder);
  window.addEventListener("resize", dimensionner);
  setInterval(garder, 2000);

  /* Un élément atteint au clavier ne reste pas caché sous la neige. */
  var auClavier = false;
  document.addEventListener("keydown", function (e) { if (e.key === "Tab") auClavier = true; }, true);
  document.addEventListener("pointerdown", function () { auClavier = false; }, true);
  document.addEventListener("focusin", function (e) {
    var el = e.target;
    if (!auClavier || !enMarche || el === bouton || !el.getBoundingClientRect) return;
    var r = el.getBoundingClientRect(), h = 0;
    for (var i = colonne(r.left), fin = colonne(r.right); i <= fin; i++) h = Math.max(h, haut[i]);
    var limite = H - h - 12;
    if (r.bottom > limite && r.top > 90) window.scrollBy(0, Math.min(r.bottom - limite, r.top - 90));
  });

  /* ---------- Pour les autres scripts du thème (chasse.js) ---------- */
  var ecouteurs = [];
  function deneige(xMin, xMax) {
    for (var k = 0; k < ecouteurs.length; k++) ecouteurs[k](xMin, xMax);
  }
  window.Neige = {
    /** Hauteur de la neige (px) à la position x de l'écran. */
    hauteur: function (x) { return n ? haut[colonne(x)] : 0; },
    /** Appelle f(xMin, xMax) quand la pelle vient de déneiger entre ces positions. */
    surDeneige: function (f) { ecouteurs.push(f); },
  };

  dimensionner();
  restaurer();
  demarrer();
})();
