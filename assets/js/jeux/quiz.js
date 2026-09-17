/* Quiz à choix multiples : 10 questions tirées au hasard. */
(function () {
  "use strict";

  var zone = document.getElementById("quiz");
  if (!zone || !window.QUIZ) return;

  var TOTAL = 10;
  var questions = [], index = 0, score = 0, repondu = false;

  var elQuestion = document.getElementById("quiz-question");
  var elReponses = document.getElementById("quiz-reponses");
  var elRetour = document.getElementById("quiz-retour");
  var elScore = document.getElementById("quiz-score");
  var elNumero = document.getElementById("quiz-numero");
  var elProgression = document.getElementById("quiz-progression");
  var elSuivant = document.getElementById("quiz-suivant");
  var elFin = document.getElementById("quiz-fin");
  var elJeu = document.getElementById("quiz-jeu");
  var elAnnonce = document.getElementById("quiz-annonce");

  function demarrer() {
    /* On équilibre les niveaux : 4 faciles, 4 moyennes, 2 difficiles. */
    var parNiveau = { 1: [], 2: [], 3: [] };
    window.QUIZ.forEach(function (q) { parNiveau[q.n].push(q); });
    questions = []
      .concat(Jeu.melanger(parNiveau[1]).slice(0, 4))
      .concat(Jeu.melanger(parNiveau[2]).slice(0, 4))
      .concat(Jeu.melanger(parNiveau[3]).slice(0, 2));
    questions = Jeu.melanger(questions).slice(0, TOTAL);

    index = 0; score = 0;
    elFin.hidden = true;
    elJeu.hidden = false;
    afficher();
  }

  function afficher() {
    repondu = false;
    var q = questions[index];
    var lettres = ["A", "B", "C", "D"];

    elNumero.textContent = "Question " + (index + 1) + " / " + questions.length;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
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
      elRetour.innerHTML = "<strong>❌ Raté !</strong> La bonne réponse était « " + q.r[0] + " ». ";
      Array.prototype.forEach.call(boutons, function (b) {
        if (b.textContent.indexOf(q.r[0]) !== -1) b.classList.add("reponse--juste");
      });
    }

    elRetour.appendChild(document.createTextNode(q.e));
    elRetour.hidden = false;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    Jeu.annoncer(elAnnonce, juste ? "Bonne réponse." : "Mauvaise réponse.");

    elSuivant.hidden = false;
    elSuivant.textContent = index + 1 >= questions.length ? "Voir mon résultat 🎉" : "Question suivante →";
    elSuivant.focus();
  }

  elSuivant.addEventListener("click", function () {
    index++;
    if (index >= questions.length) terminer();
    else afficher();
  });

  function terminer() {
    elProgression.style.width = "100%";
    var b = Jeu.bilan(score, questions.length);
    elJeu.hidden = true;
    elFin.hidden = false;
    elFin.innerHTML =
      '<div class="resultat">' +
      '<div class="resultat__medaille" aria-hidden="true">' + b.medaille + "</div>" +
      "<h2>" + b.titre + "</h2>" +
      '<p class="resultat__note">' + score + " / " + questions.length + "</p>" +
      "<p>" + b.texte + "</p>" +
      '<p><button type="button" class="bouton" id="quiz-rejouer">🔄 Rejouer</button> ' +
      '<a class="bouton bouton--secondaire" href="' + Jeu.base() + 'dinosaures.html">📚 Réviser les fiches</a></p>' +
      "</div>";
    document.getElementById("quiz-rejouer").addEventListener("click", demarrer);
    elFin.querySelector("h2").focus();
  }

  demarrer();
})();
