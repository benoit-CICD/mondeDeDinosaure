/* La bataille de boules de neige (jeu du thème d'hiver, page générée par bataille.mjs).

   Des dinosaures surgissent de six tas de neige ; on les touche (clic, doigt, ou
   Tab puis Entrée) pour leur lancer une boule de neige. La boule part, vole, et
   c'est seulement quand elle arrive que le dinosaure est touché et retombe.
   Trois niveaux :
   - facile : une manche de 60 secondes, tous les dinosaures comptent ;
   - moyen : deux manches de 20 secondes, seulement les raptors. À la première,
     un autre dinosaure ne rapporte rien ; à la seconde, il fait perdre un point.
     Des pièges sortent souvent : Oviraptor et Eoraptor ont « raptor » dans leur
     nom, mais ne sont pas de la famille des raptors ;
   - difficile : quatre manches de 15 secondes, une consigne différente à chaque
     fois (herbivores, carnivores, Crétacé…), et un mauvais lancer coûte un point.
   Le mode tranquille laisse les dinosaures plus longtemps à découvert. */
(function () {
  "use strict";

  var zone = document.getElementById("bataille");
  if (!zone || !window.DINOS) return;

  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TAS = 6;
  var VOL = 400; // durée du vol d'une boule de neige (ms)

  function estRaptor(d) { return d.famille === "raptors"; }
  /* « Raptor » veut dire « voleur » en latin : ces deux-là le portent dans leur nom,
     mais ne sont pas de la famille des raptors (les dromaeosauridés). */
  var PIEGES = {
    oviraptor: "Oviraptor a « raptor » dans son nom, mais ce n’est pas un raptor !",
    eoraptor: "Eoraptor a « raptor » dans son nom, mais ce n’est pas un raptor : il a vécu bien avant eux.",
  };

  var CONSIGNES = [
    { texte: "Vise les herbivores !", test: function (d) { return d.regime === "herbivore"; } },
    { texte: "Vise les carnivores !", test: function (d) { return d.regime === "carnivore"; } },
    { texte: "Vise les dinosaures du Crétacé !", test: function (d) { return d.periode === "cretace"; } },
    { texte: "Vise les dinosaures du Jurassique !", test: function (d) { return d.periode === "jurassique"; } },
    { texte: "Vise les animaux qui ne sont PAS des dinosaures !", test: function (d) { return !d.vraiDino; } },
  ];

  /* chance : part des dinosaures qui sortent et qu'il faut viser.
     rythme et sortie : délai entre deux sorties et temps à découvert (minimum + hasard, en ms). */
  var NIVEAUX = {
    facile: {
      nom: "facile", manches: 1, duree: 60000, chance: 1, rythme: [700, 400], sortie: [1900, 700],
      consignes: function () {
        return [{ texte: "Touche tous les dinosaures !", regle: "Ils comptent tous : vise vite, le temps file !", test: function () { return true; }, malus: 0 }];
      },
      bilan: function () {
        return "Tu as touché " + pluriel(score, "dinosaure") + " en 60 secondes, sur " + cibles + " sorti" + (cibles > 1 ? "s" : "") +
          " de la neige. Prêt pour le niveau moyen ?";
      },
    },
    moyen: {
      nom: "moyen", manches: 2, duree: 20000, chance: 0.5, pieges: 0.35, rythme: [650, 450], sortie: [1600, 500], modeles: estRaptor,
      consignes: function () {
        return [
          { texte: "Vise seulement les raptors !", regle: "Les autres dinosaures ne rapportent pas de point.", test: estRaptor, malus: 0 },
          { texte: "Encore les raptors !", regle: "Attention : maintenant, toucher un autre dinosaure fait perdre un point.", test: estRaptor, malus: 1 },
        ];
      },
      bilan: function () {
        return "Tu as gagné " + pluriel(score, "point") + ", pour " + pluriel(cibles, "raptor") + " à viser. " +
          "Les raptors, couverts de plumes, sont de proches cousins des oiseaux.";
      },
    },
    difficile: {
      nom: "difficile", manches: 4, duree: 15000, chance: 0.55, rythme: [650, 450], sortie: [1500, 500],
      consignes: function () {
        return Jeu.melanger(CONSIGNES).slice(0, 4).map(function (c) {
          return { texte: c.texte, regle: "Un mauvais lancer coûte un point.", test: c.test, malus: 1 };
        });
      },
      bilan: function () {
        return "Tu as gagné " + pluriel(score, "point") + ", pour " + pluriel(cibles, "dinosaure") + " à viser. Bravo, champion des boules de neige !";
      },
    },
  };

  function $(id) { return document.getElementById(id); }
  var elNiveaux = $("bataille-niveaux"), elChoixTitre = $("bataille-choix-titre");
  var elJeu = $("bataille-jeu"), elFin = $("bataille-fin");
  var elNumero = $("bataille-numero"), elScore = $("bataille-score");
  var elProgression = $("bataille-progression"), elAnnonce = $("bataille-annonce");
  var elConsigne = $("bataille-consigne"), elRegle = $("bataille-regle"), elModeles = $("bataille-modeles");
  var elChrono = $("bataille-chrono"), elChronoBarre = $("bataille-chrono-barre"), elTemps = $("bataille-temps");
  var elTerrain = $("bataille-terrain"), elDecompte = $("bataille-decompte"), elMessage = $("bataille-message");
  var elTranquille = $("bataille-tranquille");

  var tas = [], niveau = "facile", cfg = NIVEAUX.facile, consignes = [];
  var manche = 0, score = 0, cibles = 0, enCours = false, dixAnnonce = false;
  var minuteries = [];

  function attendre(f, ms) { var id = setTimeout(f, ms); minuteries.push(id); return id; }
  function toutArreter() { minuteries.forEach(clearTimeout); minuteries = []; }
  function lent() { return elTranquille.checked ? 1.8 : 1; }
  function auHasard(liste) { return liste[Math.floor(Math.random() * liste.length)]; }
  function pluriel(n, mot) { return n + " " + mot + (n > 1 ? "s" : ""); }
  function consigne() { return consignes[manche]; }

  /* ---------- Le terrain : six tas de neige ---------- */
  for (var i = 0; i < TAS; i++) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "bataille__tas";
    b.innerHTML = '<img class="bataille__dino" alt="" width="200" height="140">';
    b.setAttribute("aria-label", "Tas de neige " + (i + 1) + " : personne");
    b.addEventListener("click", lancer);
    elTerrain.appendChild(b);
    tas.push({ bouton: b, image: b.firstChild, dino: null, vise: false, touche: false, cache: 0, jeton: 0, numero: i + 1 });
  }

  function majScore() { elScore.textContent = "⭐ " + pluriel(score, "point"); }

  /* ---------- Choix du niveau, début et fin de partie ---------- */
  function montrerNiveaux() {
    toutArreter();
    enCours = false;
    tas.forEach(cacher);
    elJeu.hidden = true;
    elFin.hidden = true;
    elNiveaux.hidden = false;
    elChoixTitre.focus();
  }

  function demarrer(n) {
    toutArreter();
    niveau = n;
    cfg = NIVEAUX[n];
    consignes = cfg.consignes();
    manche = 0; score = 0; cibles = 0;
    tas.forEach(cacher);
    elNiveaux.hidden = true;
    elFin.hidden = true;
    elJeu.hidden = false;

    /* Au niveau moyen, les raptors à viser sont montrés au-dessus du terrain. */
    elModeles.innerHTML = "";
    elModeles.hidden = !cfg.modeles;
    if (cfg.modeles) {
      elModeles.setAttribute("aria-label", "Les raptors à viser");
      Jeu.dinos().filter(cfg.modeles).forEach(function (d) {
        var li = document.createElement("li");
        li.innerHTML = '<img alt="" width="200" height="140"><span></span>';
        li.firstChild.src = Jeu.base() + d.img;
        li.lastChild.textContent = d.nom;
        elModeles.appendChild(li);
      });
    }
    majScore();
    nouvelleManche();
  }

  function nouvelleManche() {
    var c = consigne();
    elNumero.textContent = cfg.manches > 1
      ? "Manche " + (manche + 1) + " / " + cfg.manches + " · niveau " + cfg.nom
      : "Niveau " + cfg.nom + " · " + cfg.duree / 1000 + " secondes";
    elProgression.style.width = Math.round((manche / cfg.manches) * 100) + "%";
    elConsigne.textContent = c.texte;
    elRegle.textContent = c.regle;
    elMessage.textContent = "";
    chrono(cfg.duree);
    dixAnnonce = false;
    Jeu.annoncer(elAnnonce, (cfg.manches > 1 ? "Manche " + (manche + 1) + ". " : "") + c.texte + " " + c.regle);
    elConsigne.focus();
    decompte(["3", "2", "1", "C’est parti !"], function () {
      enCours = true;
      var fin = Date.now() + cfg.duree;
      tic(fin);
      faireSurgir();
      attendre(finDeManche, cfg.duree);
    });
  }

  /* Le grand compte à rebours au milieu du terrain : 3, 2, 1… */
  function afficherGrand(texte) {
    elDecompte.textContent = texte;
    elDecompte.classList.toggle("bataille__decompte--texte", texte.length > 2);
    elDecompte.hidden = false;
    if (!reduit && elDecompte.animate) {
      elDecompte.animate([
        { transform: "scale(.4)", opacity: 0 },
        { transform: "scale(1.12)", opacity: 1, offset: 0.35 },
        { transform: "scale(1)", opacity: 1 },
      ], { duration: 450, easing: "ease-out" });
    }
  }
  function decompte(etapes, suite) {
    var k = 0;
    (function etape() {
      if (k >= etapes.length) { elDecompte.hidden = true; suite(); return; }
      afficherGrand(etapes[k]);
      k++;
      attendre(etape, k === etapes.length ? 600 : 750);
    })();
  }

  /* Le chronomètre : une barre qui se vide et les secondes qui restent. */
  function chrono(reste) {
    var s = Math.ceil(reste / 1000);
    elTemps.textContent = "⏱️ " + s + " s";
    elChronoBarre.style.width = (reste / cfg.duree) * 100 + "%";
    elChrono.classList.toggle("bataille__chrono--fin", reste > 0 && s <= 5);
  }
  function tic(fin) {
    var reste = Math.max(0, fin - Date.now());
    chrono(reste);
    elProgression.style.width = ((manche + 1 - reste / cfg.duree) / cfg.manches) * 100 + "%";
    if (!dixAnnonce && reste <= 10000 && cfg.duree > 10000) {
      dixAnnonce = true;
      Jeu.annoncer(elAnnonce, "Plus que 10 secondes !");
    }
    if (reste > 0) attendre(function () { tic(fin); }, 100);
  }

  function finDeManche() {
    enCours = false;
    tas.forEach(cacher);
    chrono(0);
    manche++;
    var fini = manche >= cfg.manches;
    elProgression.style.width = Math.round((manche / cfg.manches) * 100) + "%";
    afficherGrand(fini ? "⏱️ Terminé !" : "Fin de la manche !");
    Jeu.annoncer(elAnnonce, fini ? "Temps écoulé !" : "Fin de la manche " + manche + ".");
    attendre(function () {
      elDecompte.hidden = true;
      if (fini) terminer();
      else nouvelleManche();
    }, fini ? 1200 : 1500);
  }

  function terminer() {
    majScore();
    elJeu.hidden = true;
    Jeu.resultat(elFin, score, Math.max(cibles, 1), {
      rejouer: function () { demarrer(niveau); },
      texte: cfg.bilan(),
      lien: '<button type="button" class="bouton bouton--secondaire" data-changer>🎚️ Changer de niveau</button>',
    });
    elFin.querySelector("[data-changer]").addEventListener("click", montrerNiveaux);
  }

  /* ---------- Les dinosaures qui surgissent ---------- */
  function faireSurgir() {
    if (!enCours) return;
    var libres = tas.filter(function (t) { return !t.dino; });
    if (libres.length) {
      var c = consigne(), tous = Jeu.dinos();
      var bons = tous.filter(c.test), autres = tous.filter(function (d) { return !c.test(d); });
      var vise = bons.length > 0 && (!autres.length || Math.random() < cfg.chance);
      var d;
      if (vise) d = auHasard(bons);
      else {
        var pieges = cfg.pieges ? autres.filter(function (x) { return PIEGES[x.slug]; }) : [];
        d = pieges.length && Math.random() < cfg.pieges ? auHasard(pieges) : auHasard(autres);
      }
      montrer(auHasard(libres), d, vise);
    }
    attendre(faireSurgir, (cfg.rythme[0] + Math.random() * cfg.rythme[1]) * lent());
  }

  function montrer(t, d, vise) {
    t.jeton++;
    t.dino = d;
    t.vise = vise;
    t.touche = false;
    if (vise) cibles++;
    t.image.src = Jeu.base() + d.img;
    t.bouton.classList.remove("bataille__tas--touche");
    t.bouton.classList.add("bataille__tas--sorti");
    t.bouton.setAttribute("aria-label", "Tas de neige " + t.numero + " : " + d.nom + " ! Lance une boule de neige");
    t.cache = attendre(function () { cacher(t); }, (cfg.sortie[0] + Math.random() * cfg.sortie[1]) * lent());
  }

  function cacher(t) {
    clearTimeout(t.cache);
    t.jeton++;
    t.dino = null;
    t.touche = false;
    t.bouton.classList.remove("bataille__tas--sorti", "bataille__tas--touche");
    t.bouton.setAttribute("aria-label", "Tas de neige " + t.numero + " : personne");
  }

  /* ---------- Lancer une boule de neige ---------- */
  function lancer(e) {
    var t = tas.filter(function (x) { return x.bouton === e.currentTarget; })[0];
    if (!enCours || !t) return;
    if (!t.dino || t.touche) { boule(t.bouton, 0.7); return; } // personne : la boule s'écrase sur le tas

    var d = t.dino, c = consigne(), avant = score;
    t.touche = true;           // plus de deuxième boule pour lui
    clearTimeout(t.cache);     // il reste là jusqu'à l'arrivée de la boule
    /* Le score est compté tout de suite : la manche peut finir pendant le vol. */
    score = t.vise ? score + 1 : Math.max(0, score - c.malus);
    var jeton = t.jeton;
    boule(t.bouton, 0.32, function () {
      majScore();
      if (t.jeton !== jeton) return; // la manche s'est finie pendant le vol
      t.bouton.classList.add("bataille__tas--touche");
      t.cache = attendre(function () { cacher(t); }, 550);
      reagir(d, t.vise, c, avant - score);
    });
  }

  function reagir(d, bon, c, perdu) {
    var texte, annonce;
    if (bon) {
      texte = "❄️ Touché ! " + d.nom;
      annonce = "Touché ! " + d.nom + ".";
    } else {
      texte = PIEGES[d.slug] && c.test === estRaptor ? "Piège ! " + PIEGES[d.slug] : "Oups ! " + d.nom + " n’était pas à viser.";
      texte += c.malus ? (perdu ? " −1 point." : "") : " Pas de point.";
      annonce = texte;
    }
    elMessage.textContent = texte;
    elMessage.className = "bataille__message " + (bon ? "bataille__message--bon" : "bataille__message--faux");
    Jeu.annoncer(elAnnonce, annonce);
  }

  /* La boule part du bas du terrain, fait une courbe, et s'écrase à la hauteur
     demandée (part de la hauteur du tas). suite() est appelée à l'arrivée. */
  function boule(cible, hauteur, suite) {
    var arrivee = false;
    function arriver() {
      if (arrivee) return;
      arrivee = true;
      if (suite) suite();
    }
    if (reduit || !document.body.animate) { arriver(); return; }
    /* Au cas où l'animation serait retardée (onglet passé en arrière-plan…). */
    setTimeout(arriver, VOL + 120);
    var r = cible.getBoundingClientRect(), terrain = elTerrain.getBoundingClientRect();
    var x0 = terrain.left + terrain.width / 2 - 17;
    var y0 = Math.min(terrain.bottom + 10, window.innerHeight - 24);
    var x1 = r.left + r.width / 2 - 17, y1 = r.top + r.height * hauteur - 17;
    var dx = x1 - x0, dy = y1 - y0, courbe = 60 + Math.abs(dx) * 0.15;
    var b = document.createElement("span");
    b.className = "boule-de-neige";
    b.setAttribute("aria-hidden", "true");
    b.style.left = x0 + "px";
    b.style.top = y0 + "px";
    document.body.appendChild(b);

    var images = [];
    for (var k = 0; k <= 6; k++) {
      var p = k / 6;
      images.push({ transform: "translate(" + dx * p + "px, " + (dy * p - 4 * courbe * p * (1 - p)) + "px) scale(" + (1.25 - 0.5 * p) + ")" });
    }
    b.animate(images, { duration: VOL, easing: "linear" }).onfinish = function () {
      b.style.transform = "translate(" + dx + "px, " + dy + "px)";
      b.classList.add("boule-de-neige--splat");
      poudre(x1 + 17, y1 + 17);
      b.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, delay: 200 }).onfinish = function () { b.remove(); };
      arriver();
    };
  }

  /* Un petit nuage de neige à l'impact. */
  function poudre(x, y) {
    for (var k = 0; k < 7; k++) {
      var g = document.createElement("span"), taille = 4 + Math.random() * 5, angle = (k / 7) * 6.283 + Math.random() * 0.5;
      g.className = "poudre-neige";
      g.setAttribute("aria-hidden", "true");
      g.style.width = g.style.height = taille + "px";
      g.style.left = x - taille / 2 + "px";
      g.style.top = y - taille / 2 + "px";
      document.body.appendChild(g);
      var portee = 22 + Math.random() * 18;
      g.animate([
        { transform: "translate(0, 0)", opacity: 1 },
        { transform: "translate(" + Math.cos(angle) * portee + "px, " + (Math.sin(angle) * portee + 10) + "px)", opacity: 0 },
      ], { duration: 420, easing: "ease-out" }).onfinish = (function (g) { return function () { g.remove(); }; })(g);
    }
  }

  Array.prototype.forEach.call(elNiveaux.querySelectorAll("[data-niveau]"), function (bouton) {
    bouton.addEventListener("click", function () { demarrer(bouton.dataset.niveau); });
  });
})();
