/* Le quiz du cinéma : on choisit son niveau, puis 20 questions de ce niveau. */
(function () {
  "use strict";

  var zone = document.getElementById("qc");
  if (!zone || !window.QUIZ_CINEMA) return;

  var TOTAL = 20;
  var NOMS = { facile: "🍿 Niveau facile", difficile: "🎬 Niveau difficile" };
  var niveau = "facile", questions = [], index = 0, score = 0, repondu = false;

  var elNiveaux = document.getElementById("qc-niveaux");
  var elJeu = document.getElementById("qc-jeu");
  var elFin = document.getElementById("qc-fin");
  var elNiveau = document.getElementById("qc-niveau");
  var elQuestion = document.getElementById("qc-question");
  var elReponses = document.getElementById("qc-reponses");
  var elRetour = document.getElementById("qc-retour");
  var elScore = document.getElementById("qc-score");
  var elNumero = document.getElementById("qc-numero");
  var elProgression = document.getElementById("qc-progression");
  var elSuivant = document.getElementById("qc-suivant");
  var elAnnonce = document.getElementById("qc-annonce");

  function points(n) { return "⭐ " + n + " point" + (n > 1 ? "s" : ""); }

  function demarrer(n) {
    niveau = n;
    questions = Jeu.melanger(window.QUIZ_CINEMA[niveau]).slice(0, TOTAL);
    index = 0; score = 0;
    elNiveau.textContent = NOMS[niveau];
    elNiveaux.hidden = true;
    elFin.hidden = true;
    elJeu.hidden = false;
    afficher();
  }

  function afficher() {
    repondu = false;
    var q = questions[index];
    var lettres = ["A", "B", "C", "D"];

    elNumero.textContent = "Question " + (index + 1) + " / " + questions.length;
    elScore.textContent = points(score);
    elProgression.style.width = Math.round((index / questions.length) * 100) + "%";
    elQuestion.textContent = q.q;
    elRetour.hidden = true;
    elRetour.textContent = "";
    elSuivant.hidden = true;
    elReponses.innerHTML = "";

    /* La bonne réponse est en position 0 dans les données : on mélange. */
    var propositions = Jeu.melanger(q.r.map(function (texte, i) {
      return { texte: texte, juste: i === 0 };
    }));

    propositions.forEach(function (p, i) {
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "reponse";
      bouton.innerHTML = '<span class="reponse__lettre" aria-hidden="true">' + lettres[i] + "</span><span></span>";
      bouton.querySelector("span:last-child").textContent = p.texte;
      bouton.dataset.juste = p.juste ? "oui" : "non";
      bouton.addEventListener("click", function () { repondre(bouton, p.juste, q); });
      elReponses.appendChild(bouton);
    });

    elQuestion.focus();
  }

  function repondre(bouton, juste, q) {
    if (repondu) return;
    repondu = true;

    var boutons = elReponses.querySelectorAll(".reponse");
    Array.prototype.forEach.call(boutons, function (b) { b.disabled = true; });

    if (juste) {
      score++;
      bouton.classList.add("reponse--juste");
      elRetour.className = "retour retour--juste";
      elRetour.innerHTML = "<strong>✅ Bravo !</strong> ";
    } else {
      bouton.classList.add("reponse--faux");
      elRetour.className = "retour retour--faux";
      elRetour.innerHTML = "<strong>❌ Raté !</strong> ";
      elRetour.appendChild(document.createTextNode("La bonne réponse était « " + q.r[0] + " ». "));
      Array.prototype.forEach.call(boutons, function (b) {
        if (b.dataset.juste === "oui") b.classList.add("reponse--juste");
      });
    }

    elRetour.appendChild(document.createTextNode(q.e));
    elRetour.hidden = false;
    elScore.textContent = points(score);
    Jeu.annoncer(elAnnonce, juste ? "Bonne réponse." : "Mauvaise réponse.");

    elSuivant.hidden = false;
    elSuivant.textContent = index + 1 >= questions.length ? "Voir mon résultat 🎉" : "Question suivante →";
    elSuivant.focus();
  }

  function terminer() {
    elProgression.style.width = "100%";
    var b = Jeu.bilan(score, questions.length);
    var autre = niveau === "facile" ? "difficile" : "facile";
    var conseil = niveau === "facile" && score >= 16
      ? "Bravo, tu connais tes classiques ! Prêt à tenter le niveau difficile ?"
      : b.texte;

    elJeu.hidden = true;
    elFin.hidden = false;
    elFin.innerHTML =
      '<div class="resultat">' +
      '<div class="resultat__medaille" aria-hidden="true">' + b.medaille + "</div>" +
      '<h2 tabindex="-1">' + b.titre + "</h2>" +
      '<p class="resultat__note">' + score + " / " + questions.length + "</p>" +
      "<p>" + NOMS[niveau] + " · " + conseil + "</p>" +
      '<p><button type="button" class="bouton" data-action="rejouer">🔄 Rejouer</button> ' +
      '<button type="button" class="bouton bouton--ambre" data-action="autre">' + NOMS[autre] + "</button> " +
      '<a class="bouton bouton--secondaire" href="' + Jeu.base() + 'cinema.html">🎬 Revoir la rubrique</a></p>' +
      "</div>";
    elFin.querySelector('[data-action="rejouer"]').addEventListener("click", function () { demarrer(niveau); });
    elFin.querySelector('[data-action="autre"]').addEventListener("click", function () { demarrer(autre); });
    elFin.querySelector("h2").focus();
  }

  Array.prototype.forEach.call(elNiveaux.querySelectorAll("[data-niveau]"), function (b) {
    b.addEventListener("click", function () { demarrer(b.dataset.niveau); });
  });

  elSuivant.addEventListener("click", function () {
    index++;
    if (index >= questions.length) terminer();
    else afficher();
  });
})();
