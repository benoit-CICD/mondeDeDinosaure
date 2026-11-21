/* La fouille : un dinosaure est caché sous des cases de terre (de neige quand le
   thème d'hiver est allumé). On dégage les cases une à une, puis on devine qui
   c'est parmi quatre noms. Moins on dégage de cases, plus on gagne de points :
   3, 2 ou 1 par fouille, sur 5 fouilles. Les cases sont des boutons : le jeu se
   joue aussi au clavier, et un bouton dégage une case au hasard. */
(function () {
  "use strict";

  var zone = document.getElementById("fouille");
  if (!zone || !window.DINOS) return;

  var COLONNES = 6, LIGNES = 4, CASES = COLONNES * LIGNES, TOURS = 5;
  var LETTRES = ["A", "B", "C", "D"];

  var elJeu = document.getElementById("fouille-jeu");
  var elFin = document.getElementById("fouille-fin");
  var elNumero = document.getElementById("fouille-numero");
  var elScore = document.getElementById("fouille-score");
  var elProgression = document.getElementById("fouille-progression");
  var elAnnonce = document.getElementById("fouille-annonce");
  var elConsigne = document.getElementById("fouille-consigne");
  var elPlateau = document.getElementById("fouille-plateau");
  var elImage = document.getElementById("fouille-image");
  var elCases = document.getElementById("fouille-cases");
  var elHasard = document.getElementById("fouille-hasard");
  var elCompte = document.getElementById("fouille-compte");
  var elReponses = document.getElementById("fouille-reponses");
  var elRetour = document.getElementById("fouille-retour");
  var elSuivant = document.getElementById("fouille-suivant");

  var liste = [], tour = 0, score = 0, cible = null, degagees = 0, trouve = false;

  /* En hiver, on déneige ; le reste de l'année, on creuse. */
  function mots() {
    return document.documentElement.classList.contains("hiver")
      ? { verbe: "déneige", infinitif: "déneiger", matiere: "neige" }
      : { verbe: "creuse", infinitif: "creuser", matiere: "terre" };
  }
  function points() {
    var couvertes = CASES - degagees;
    return couvertes >= 18 ? 3 : couvertes >= 12 ? 2 : 1;
  }

  function demarrer() {
    liste = Jeu.melanger(Jeu.dinos()).slice(0, TOURS);
    tour = 0; score = 0;
    elFin.hidden = true;
    elJeu.hidden = false;
    manche();
  }

  function manche() {
    cible = liste[tour];
    degagees = 0;
    trouve = false;
    var m = mots();
    elNumero.textContent = "Fouille " + (tour + 1) + " / " + TOURS;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    elProgression.style.width = Math.round((tour / TOURS) * 100) + "%";
    elConsigne.textContent = "Clique sur les cases pour " + m.infinitif + " le fossile, puis devine qui c’est. Moins tu dégages de cases, plus tu gagnes de points !";
    elPlateau.classList.remove("fouille__plateau--revele");
    elImage.src = Jeu.base() + cible.imgPuzzle;

    elCases.innerHTML = "";
    for (var i = 0; i < CASES; i++) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "fouille__case";
      b.setAttribute("aria-label", "Case de " + m.matiere + " " + (i + 1) + " sur " + CASES);
      b.addEventListener("click", degagerCase);
      elCases.appendChild(b);
    }

    var autres = Jeu.melanger(Jeu.dinos().filter(function (d) { return d.slug !== cible.slug; })).slice(0, 3);
    elReponses.innerHTML = "";
    Jeu.melanger([cible].concat(autres)).forEach(function (d, k) {
      var r = document.createElement("button");
      r.type = "button";
      r.className = "reponse";
      r.innerHTML = '<span class="reponse__lettre" aria-hidden="true">' + LETTRES[k] + "</span><span></span>";
      r.lastChild.textContent = d.nom;
      r.addEventListener("click", function () { deviner(d, r); });
      elReponses.appendChild(r);
    });

    elRetour.hidden = true;
    elSuivant.hidden = true;
    elHasard.disabled = false;
    majCompte();
  }

  function majCompte() {
    var p = points();
    elCompte.textContent = degagees + " case" + (degagees > 1 ? "s" : "") + " dégagée" + (degagees > 1 ? "s" : "") +
      " sur " + CASES + " · si tu trouves maintenant : " + p + " point" + (p > 1 ? "s" : "");
  }

  function degager(b) {
    if (trouve || b.disabled) return;
    b.disabled = true;
    b.classList.add("fouille__case--degagee");
    degagees++;
    majCompte();
    Jeu.annoncer(elAnnonce, "Case dégagée. On voit maintenant " + Math.round((degagees / CASES) * 100) + " % du fossile.");
    if (degagees >= CASES) elHasard.disabled = true;
  }
  function degagerCase(e) { degager(e.currentTarget); }

  elHasard.addEventListener("click", function () {
    var restantes = elCases.querySelectorAll(".fouille__case:not(:disabled)");
    if (restantes.length) degager(restantes[Math.floor(Math.random() * restantes.length)]);
  });

  function deviner(d, bouton) {
    if (trouve || bouton.disabled) return;
    if (d.slug !== cible.slug) {
      bouton.disabled = true;
      bouton.classList.add("reponse--faux");
      elRetour.hidden = false;
      elRetour.className = "retour retour--faux";
      elRetour.innerHTML = "<strong>Ce n’est pas lui…</strong> Continue à " + mots().infinitif + " pour mieux voir !";
      Jeu.annoncer(elAnnonce, "Ce n’est pas " + d.nom + ".");
      return;
    }
    trouve = true;
    var p = points();
    score += p;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    bouton.classList.add("reponse--juste");
    Array.prototype.forEach.call(elReponses.children, function (r) { r.disabled = true; });
    Array.prototype.forEach.call(elCases.children, function (c) { c.disabled = true; });
    elHasard.disabled = true;
    elPlateau.classList.add("fouille__plateau--revele");
    elRetour.hidden = false;
    elRetour.className = "retour retour--juste";
    elRetour.innerHTML = "<strong>✅ Bravo ! C’est " + cible.nom + ".</strong> " +
      "Tu as dégagé " + degagees + " case" + (degagees > 1 ? "s" : "") + " sur " + CASES + " : " + p + " point" + (p > 1 ? "s" : "") + ". " +
      '<a href="' + Jeu.base() + cible.url + '">Lire sa fiche</a>';
    Jeu.annoncer(elAnnonce, "Bravo, c’est " + cible.nom + " ! " + p + " point" + (p > 1 ? "s" : "") + ".");
    elSuivant.textContent = tour + 1 < TOURS ? "Fouille suivante →" : "Voir mon résultat →";
    elSuivant.hidden = false;
    elSuivant.focus();
  }

  elSuivant.addEventListener("click", function () {
    tour++;
    if (tour < TOURS) { manche(); elConsigne.focus(); return; }
    elJeu.hidden = true;
    elProgression.style.width = "100%";
    Jeu.resultat(elFin, score, TOURS * 3, {
      rejouer: demarrer,
      texte: "Tu as gagné " + score + " point" + (score > 1 ? "s" : "") + " sur " + TOURS * 3 + ". Un vrai paléontologue dégage le moins de cases possible !",
      lien: '<a class="bouton bouton--secondaire" href="' + Jeu.base() + 'dinosaures/index.html">📚 Revoir les fiches</a>',
    });
  });

  demarrer();
})();
