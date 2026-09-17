/* Vrai ou faux : 10 affirmations tirées au hasard. */
(function () {
  "use strict";

  var zone = document.getElementById("vf");
  if (!zone || !window.VRAIFAUX) return;

  var TOTAL = 10;
  var liste = [], index = 0, score = 0, repondu = false;

  var elAffirmation = document.getElementById("vf-affirmation");
  var elRetour = document.getElementById("vf-retour");
  var elScore = document.getElementById("vf-score");
  var elNumero = document.getElementById("vf-numero");
  var elProgression = document.getElementById("vf-progression");
  var elSuivant = document.getElementById("vf-suivant");
  var elFin = document.getElementById("vf-fin");
  var elJeu = document.getElementById("vf-jeu");
  var boutons = zone.querySelectorAll("[data-reponse]");
  var elAnnonce = document.getElementById("vf-annonce");

  function demarrer() {
    liste = Jeu.melanger(window.VRAIFAUX).slice(0, TOTAL);
    index = 0; score = 0;
    elFin.hidden = true;
    elJeu.hidden = false;
    afficher();
  }

  function afficher() {
    repondu = false;
    var a = liste[index];
    elNumero.textContent = "Affirmation " + (index + 1) + " / " + liste.length;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    elProgression.style.width = Math.round((index / liste.length) * 100) + "%";
    elAffirmation.textContent = "« " + a.a + " »";
    elRetour.hidden = true;
    elSuivant.hidden = true;
    Array.prototype.forEach.call(boutons, function (b) {
      b.disabled = false;
      b.classList.remove("reponse--juste", "reponse--faux");
    });
    elAffirmation.focus();
  }

  Array.prototype.forEach.call(boutons, function (b) {
    b.addEventListener("click", function () {
      if (repondu) return;
      repondu = true;
      var a = liste[index];
      var choix = b.dataset.reponse === "vrai";
      var juste = choix === a.v;

      Array.prototype.forEach.call(boutons, function (x) {
        x.disabled = true;
        /* On souligne toujours la bonne réponse, même quand le joueur s'est trompé. */
        if ((x.dataset.reponse === "vrai") === a.v) x.classList.add("reponse--juste");
      });
      if (!juste) b.classList.add("reponse--faux");
      if (juste) score++;

      elRetour.className = "retour " + (juste ? "retour--juste" : "retour--faux");
      elRetour.innerHTML = "<strong>" + (juste ? "✅ Exact !" : "❌ Eh non !") +
        "</strong> C’est <strong>" + (a.v ? "vrai" : "faux") + "</strong>. ";
      elRetour.appendChild(document.createTextNode(a.e));
      elRetour.hidden = false;
      elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
      Jeu.annoncer(elAnnonce, juste ? "Bonne réponse." : "Mauvaise réponse.");

      elSuivant.hidden = false;
      elSuivant.textContent = index + 1 >= liste.length ? "Voir mon résultat 🎉" : "Suivant →";
      elSuivant.focus();
    });
  });

  elSuivant.addEventListener("click", function () {
    index++;
    if (index >= liste.length) terminer();
    else afficher();
  });

  function terminer() {
    elProgression.style.width = "100%";
    var b = Jeu.bilan(score, liste.length);
    elJeu.hidden = true;
    elFin.hidden = false;
    elFin.innerHTML =
      '<div class="resultat"><div class="resultat__medaille" aria-hidden="true">' + b.medaille + "</div>" +
      "<h2>" + b.titre + "</h2>" +
      '<p class="resultat__note">' + score + " / " + liste.length + "</p><p>" + b.texte + "</p>" +
      '<p><button type="button" class="bouton" id="vf-rejouer">🔄 Rejouer</button></p></div>';
    document.getElementById("vf-rejouer").addEventListener("click", demarrer);
    elFin.querySelector("h2").focus();
  }

  demarrer();
})();
