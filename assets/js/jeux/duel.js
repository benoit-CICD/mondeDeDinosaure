/* Duel de dinosaures : 5 face-à-face tirés au hasard, devine qui gagne. */
(function () {
  "use strict";

  var zone = document.getElementById("duel");
  if (!zone || !window.Affrontement || !window.AFFRONTEMENTS) return;
  var A = window.Affrontement;

  var MANCHES = 5;
  /* Pas de duel trop facile (un géant contre un poussin) ; les duels serrés sont les bienvenus. */
  var ECART_MIN = 0, ECART_MAX = 16;

  var duels = [], index = 0, score = 0;

  var elJeu = document.getElementById("duel-jeu");
  var elFin = document.getElementById("duel-fin");
  var elArene = document.getElementById("duel-arene");
  var elQuestion = document.getElementById("duel-question");
  var elNumero = document.getElementById("duel-numero");
  var elScore = document.getElementById("duel-score");
  var elProgression = document.getElementById("duel-progression");
  var elRetour = document.getElementById("duel-retour");
  var elSuivant = document.getElementById("duel-suivant");
  var elAnnonce = document.getElementById("duel-annonce");

  function points(n) { return "⭐ " + n + " point" + (n > 1 ? "s" : ""); }

  /** Cinq duels, sans jamais revoir le même dinosaure dans une partie. */
  function tirerDuels() {
    var tires = [], pris = {};
    var pool = Jeu.melanger(A.tous());
    for (var i = 0; i < pool.length && tires.length < MANCHES; i++) {
      var a = pool[i];
      if (pris[a.slug]) continue;
      var adversaires = pool.filter(function (b) {
        var ecart = Math.abs(a.puissance - b.puissance);
        return b !== a && !pris[b.slug] && ecart >= ECART_MIN && ecart <= ECART_MAX;
      });
      if (!adversaires.length) continue;
      var b = adversaires[Math.floor(Math.random() * adversaires.length)];
      pris[a.slug] = pris[b.slug] = true;
      tires.push(Math.random() < 0.5 ? [a, b] : [b, a]);
    }
    return tires;
  }

  function demarrer() {
    duels = tirerDuels();
    index = 0; score = 0;
    elFin.hidden = true;
    elJeu.hidden = false;
    afficher();
  }

  function afficher() {
    var d = duels[index];
    elNumero.textContent = "Manche " + (index + 1) + " / " + duels.length;
    elScore.textContent = points(score);
    elProgression.style.width = Math.round((index / duels.length) * 100) + "%";
    elQuestion.textContent = "Qui gagne ce duel ?";
    elRetour.hidden = true;
    elSuivant.hidden = true;
    A.arene(elArene, d[0], d[1], function (choix) { repondre(choix, d); });
    elQuestion.focus();
  }

  function repondre(choix, d) {
    var ar = { zone: elArene, cartes: elArene.querySelectorAll(".combattant"), vs: elArene.querySelector(".arene__vs"), dinos: d };
    var juste = A.vainqueur(d[0], d[1]) === choix;
    if (juste) score++;
    Jeu.annoncer(elAnnonce, "Combat !");

    A.combattre(ar).then(function () {
      var ex = A.explication(d[0], d[1]);
      elRetour.className = "retour " + (juste ? "retour--juste" : "retour--faux");
      elRetour.innerHTML = "";
      var titre = document.createElement("p");
      titre.className = "retour__titre";
      titre.textContent = (juste ? "✅ Bien vu ! " : "❌ Raté ! ") + ex.titre;
      var texte = document.createElement("p");
      texte.textContent = ex.texte;
      var rencontre = document.createElement("p");
      rencontre.className = "retour__rencontre";
      rencontre.textContent = A.rencontre(d[0], d[1]);
      elRetour.appendChild(titre);
      elRetour.appendChild(texte);
      elRetour.appendChild(rencontre);
      elRetour.hidden = false;
      elScore.textContent = points(score);
      Jeu.annoncer(elAnnonce, (juste ? "Bonne réponse. " : "Mauvaise réponse. ") + ex.titre);

      elSuivant.hidden = false;
      elSuivant.textContent = index + 1 >= duels.length ? "Voir mon résultat 🎉" : "Duel suivant →";
      elSuivant.focus();
    });
  }

  elSuivant.addEventListener("click", function () {
    index++;
    if (index >= duels.length) terminer();
    else afficher();
  });

  function terminer() {
    elProgression.style.width = "100%";
    elJeu.hidden = true;
    Jeu.resultat(elFin, score, duels.length, {
      rejouer: demarrer,
      lien: '<a class="bouton bouton--secondaire" href="' + Jeu.base() + 'jeux/le-roi-de-la-tour.html">🏰 Le roi de la tour</a>',
    });
  }

  demarrer();
})();
