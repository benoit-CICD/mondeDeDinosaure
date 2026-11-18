/* La bataille de boules de neige (jeu du thème d'hiver, page générée par bataille.mjs).

   Quatre manches de 15 secondes. À chaque manche, une consigne : « Vise les
   herbivores ! », « Vise les dinosaures du Crétacé ! »… Des dinosaures surgissent
   de six tas de neige ; on touche ceux que demande la consigne (clic, doigt, ou
   Tab puis Entrée) pour leur lancer une boule de neige : +1 point, et -1 pour un
   mauvais lancer (jamais en dessous de 0). Le mode tranquille laisse les
   dinosaures plus longtemps à découvert. */
(function () {
  "use strict";

  var zone = document.getElementById("bataille");
  if (!zone || !window.DINOS) return;

  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var MANCHES = 4, DUREE = 15000, TAS = 6;
  var CONSIGNES = [
    { texte: "Vise les herbivores !", test: function (d) { return d.regime === "herbivore"; } },
    { texte: "Vise les carnivores !", test: function (d) { return d.regime === "carnivore"; } },
    { texte: "Vise les dinosaures du Crétacé !", test: function (d) { return d.periode === "cretace"; } },
    { texte: "Vise les dinosaures du Jurassique !", test: function (d) { return d.periode === "jurassique"; } },
    { texte: "Vise les animaux qui ne sont PAS des dinosaures !", test: function (d) { return !d.vraiDino; } },
  ];

  var elJeu = document.getElementById("bataille-jeu");
  var elFin = document.getElementById("bataille-fin");
  var elNumero = document.getElementById("bataille-numero");
  var elScore = document.getElementById("bataille-score");
  var elProgression = document.getElementById("bataille-progression");
  var elAnnonce = document.getElementById("bataille-annonce");
  var elConsigne = document.getElementById("bataille-consigne");
  var elTemps = document.getElementById("bataille-temps");
  var elTerrain = document.getElementById("bataille-terrain");
  var elMessage = document.getElementById("bataille-message");
  var elTranquille = document.getElementById("bataille-tranquille");
  var elCommencer = document.getElementById("bataille-commencer");

  var tas = [], consignes = [], manche = 0, score = 0, cibles = 0, enCours = false;
  var minuteries = [];

  function attendre(f, ms) { var id = setTimeout(f, ms); minuteries.push(id); return id; }
  function toutArreter() { minuteries.forEach(clearTimeout); minuteries = []; }
  function lent() { return elTranquille.checked ? 1.8 : 1; }

  /* ---------- Le terrain : six tas de neige ---------- */
  for (var i = 0; i < TAS; i++) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "bataille__tas";
    b.innerHTML = '<img class="bataille__dino" alt="" width="200" height="140">';
    b.setAttribute("aria-label", "Tas de neige " + (i + 1) + " : personne");
    b.addEventListener("click", lancer);
    elTerrain.appendChild(b);
    tas.push({ bouton: b, image: b.firstChild, dino: null, cache: 0, numero: i + 1 });
  }

  function majScore() {
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
  }

  function demarrer() {
    toutArreter();
    consignes = Jeu.melanger(CONSIGNES).slice(0, MANCHES);
    manche = 0; score = 0; cibles = 0;
    elFin.hidden = true;
    elJeu.hidden = false;
    elCommencer.hidden = true;
    majScore();
    nouvelleManche();
  }

  function nouvelleManche() {
    var c = consignes[manche];
    elNumero.textContent = "Manche " + (manche + 1) + " / " + MANCHES;
    elProgression.style.width = Math.round((manche / MANCHES) * 100) + "%";
    elConsigne.textContent = c.texte;
    elMessage.textContent = "";
    elTemps.textContent = "Prépare-toi…";
    Jeu.annoncer(elAnnonce, "Manche " + (manche + 1) + ". " + c.texte);
    elConsigne.focus();
    attendre(function () {
      enCours = true;
      var fin = Date.now() + DUREE * lent();
      decompte(fin);
      faireSurgir();
      attendre(finDeManche, DUREE * lent());
    }, 1800);
  }

  function decompte(fin) {
    var reste = Math.max(0, Math.ceil((fin - Date.now()) / 1000));
    elTemps.textContent = "⏱️ " + reste + " s";
    if (reste > 0) attendre(function () { decompte(fin); }, 250);
  }

  /* Un dinosaure surgit d'un tas libre : un peu plus d'une fois sur deux, un de ceux qu'on vise. */
  function faireSurgir() {
    if (!enCours) return;
    var libres = tas.filter(function (t) { return !t.dino; });
    if (libres.length) {
      var t = libres[Math.floor(Math.random() * libres.length)];
      var c = consignes[manche];
      var bons = Jeu.dinos().filter(c.test), autres = Jeu.dinos().filter(function (d) { return !c.test(d); });
      var vise = Math.random() < 0.55 && bons.length;
      var liste = vise ? bons : autres;
      var d = liste[Math.floor(Math.random() * liste.length)];
      montrer(t, d, vise);
    }
    attendre(faireSurgir, (650 + Math.random() * 450) * lent());
  }

  function montrer(t, d, vise) {
    t.dino = d;
    t.vise = vise;
    if (vise) cibles++;
    t.image.src = Jeu.base() + d.img;
    t.bouton.classList.remove("bataille__tas--touche");
    t.bouton.classList.add("bataille__tas--sorti");
    t.bouton.setAttribute("aria-label", "Tas de neige " + t.numero + " : " + d.nom + " ! Lance une boule de neige");
    t.cache = attendre(function () { cacher(t); }, (1500 + Math.random() * 500) * lent());
  }

  function cacher(t) {
    clearTimeout(t.cache);
    t.dino = null;
    t.bouton.classList.remove("bataille__tas--sorti");
    t.bouton.setAttribute("aria-label", "Tas de neige " + t.numero + " : personne");
  }

  /* ---------- Lancer une boule de neige ---------- */
  function lancer(e) {
    var t = tas.filter(function (x) { return x.bouton === e.currentTarget; })[0];
    if (!enCours || !t || !t.dino) return;
    var d = t.dino;
    boule(t.bouton);
    if (t.vise) {
      score++;
      elMessage.textContent = "❄️ Touché ! " + d.nom;
      Jeu.annoncer(elAnnonce, "Touché ! " + d.nom + ".");
    } else {
      score = Math.max(0, score - 1);
      elMessage.textContent = "Oups ! " + d.nom + " n’était pas à viser.";
      Jeu.annoncer(elAnnonce, "Oups, " + d.nom + " n’était pas à viser.");
    }
    majScore();
    t.bouton.classList.add("bataille__tas--touche");
    t.dino = null;
    clearTimeout(t.cache);
    t.cache = attendre(function () { cacher(t); }, 350);
  }

  function boule(cible) {
    if (reduit || !document.body.animate) return;
    var r = cible.getBoundingClientRect(), terrain = elTerrain.getBoundingClientRect();
    var b = document.createElement("span");
    b.className = "boule-de-neige";
    b.setAttribute("aria-hidden", "true");
    var x0 = terrain.left + terrain.width / 2 - 17, y0 = terrain.bottom + 10;
    var x1 = r.left + r.width / 2 - 17, y1 = r.top + r.height * 0.35;
    b.style.left = x0 + "px";
    b.style.top = y0 + "px";
    document.body.appendChild(b);
    b.animate([
      { transform: "translate(0, 0) scale(1.2)" },
      { transform: "translate(" + (x1 - x0) / 2 + "px, " + ((y1 - y0) / 2 - 60) + "px) scale(1)" },
      { transform: "translate(" + (x1 - x0) + "px, " + (y1 - y0) + "px) scale(.8)" },
    ], { duration: 260, easing: "ease-out" }).onfinish = function () { b.remove(); };
  }

  function finDeManche() {
    enCours = false;
    tas.forEach(cacher);
    manche++;
    if (manche < MANCHES) {
      elTemps.textContent = "Fin de la manche !";
      attendre(nouvelleManche, 1400);
      return;
    }
    elProgression.style.width = "100%";
    elJeu.hidden = true;
    elCommencer.hidden = false;
    Jeu.resultat(elFin, score, Math.max(cibles, 1), {
      rejouer: demarrer,
      texte: "Tu as gagné " + score + " point" + (score > 1 ? "s" : "") + ", pour " + cibles + " dinosaure" + (cibles > 1 ? "s" : "") + " à viser. Bravo, champion des boules de neige !",
    });
  }

  elCommencer.addEventListener("click", demarrer);
})();
