/* « Détective des empreintes » : retrouver qui a laissé une trace dans la roche. */
(function () {
  "use strict";

  var zone = document.getElementById("emp");
  if (!zone || !window.EMPREINTES) return;

  var SUSPECTS = 4;
  var serie = [], index = 0, score = 0, repondu = false;

  var elImage = document.getElementById("emp-image");
  var elTaille = document.getElementById("emp-taille");
  var elQuestion = document.getElementById("emp-question");
  var elIndice = document.getElementById("emp-indice");
  var elIndiceTexte = document.getElementById("emp-indice-texte");
  var elChoix = document.getElementById("emp-choix");
  var elRetour = document.getElementById("emp-retour");
  var elScore = document.getElementById("emp-score");
  var elNumero = document.getElementById("emp-numero");
  var elProgression = document.getElementById("emp-progression");
  var elSuivant = document.getElementById("emp-suivant");
  var elFin = document.getElementById("emp-fin");
  var elJeu = document.getElementById("emp-jeu");
  var elAnnonce = document.getElementById("emp-annonce");

  function demarrer() {
    serie = Jeu.melanger(window.EMPREINTES);
    index = 0; score = 0;
    elFin.hidden = true;
    elJeu.hidden = false;
    afficher();
  }

  function afficher() {
    repondu = false;
    var e = serie[index];
    elNumero.textContent = "Empreinte " + (index + 1) + " / " + serie.length;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    elProgression.style.width = Math.round((index / serie.length) * 100) + "%";
    elImage.src = Jeu.base() + "assets/img/empreintes/" + e.id + ".svg";
    elTaille.textContent = "📏 " + e.taille;
    elIndice.hidden = false;
    elIndiceTexte.hidden = true;
    elRetour.hidden = true;
    elSuivant.hidden = true;

    /* Le vrai coupable et trois autres suspects, tirés au hasard. */
    var autres = Jeu.melanger(Object.keys(window.TRACEURS).filter(function (cle) { return cle !== e.auteur; }));
    var suspects = Jeu.melanger([e.auteur].concat(autres.slice(0, SUSPECTS - 1)));

    elChoix.innerHTML = "";
    suspects.forEach(function (cle) {
      var t = window.TRACEURS[cle];
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "choix";
      bouton.dataset.cle = cle;
      bouton.innerHTML = Jeu.visuel(t) + "<span>" + t.nom + '</span><span class="choix__detail">' + t.detail + "</span>";
      bouton.addEventListener("click", function () { repondre(bouton, cle); });
      elChoix.appendChild(bouton);
    });

    elQuestion.focus();
  }

  elIndice.addEventListener("click", function () {
    elIndiceTexte.textContent = "💡 " + serie[index].indice;
    elIndiceTexte.hidden = false;
    elIndice.hidden = true;
    Jeu.annoncer(elAnnonce, serie[index].indice);
  });

  function repondre(bouton, cle) {
    if (repondu) return;
    repondu = true;

    var e = serie[index];
    var juste = cle === e.auteur;
    if (juste) score++;

    Array.prototype.forEach.call(elChoix.querySelectorAll(".choix"), function (b) {
      b.disabled = true;
      if (b.dataset.cle === e.auteur) b.classList.add("choix--juste");
    });
    if (!juste) bouton.classList.add("choix--faux");
    elIndice.hidden = true;

    elRetour.className = "retour " + (juste ? "retour--juste" : "retour--faux");
    elRetour.innerHTML = (juste ? "<strong>✅ Bien vu, détective !</strong> " : "<strong>❌ Fausse piste !</strong> ") + e.explication;
    elRetour.hidden = false;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    Jeu.annoncer(elAnnonce, juste ? "Bonne réponse." : "Mauvaise réponse.");

    elSuivant.hidden = false;
    elSuivant.textContent = index + 1 >= serie.length ? "Voir mon résultat 🎉" : "Empreinte suivante →";
    elSuivant.focus();
  }

  elSuivant.addEventListener("click", function () {
    index++;
    if (index >= serie.length) terminer();
    else afficher();
  });

  function terminer() {
    elProgression.style.width = "100%";
    elJeu.hidden = true;
    Jeu.resultat(elFin, score, serie.length, {
      rejouer: demarrer,
      lien: '<a class="bouton bouton--secondaire" href="' + Jeu.base() + 'metier.html">⛏️ Le métier de paléontologue</a>',
    });
  }

  demarrer();
})();
