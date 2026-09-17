/* « Qui suis-je ? » : des indices se dévoilent un à un, la silhouette se colore à la fin. */
(function () {
  "use strict";

  var zone = document.getElementById("qsj");
  if (!zone || !window.DINOS) return;

  var MANCHES = 6;
  var manche = 0, score = 0, cible = null, indices = [], indiceAffiche = 0, repondu = false;

  var elSilhouette = document.getElementById("qsj-silhouette");
  var elIndices = document.getElementById("qsj-indices");
  var elChoix = document.getElementById("qsj-choix");
  var elRetour = document.getElementById("qsj-retour");
  var elScore = document.getElementById("qsj-score");
  var elNumero = document.getElementById("qsj-numero");
  var elIndice = document.getElementById("qsj-indice");
  var elSuivant = document.getElementById("qsj-suivant");
  var elFin = document.getElementById("qsj-fin");
  var elJeu = document.getElementById("qsj-jeu");
  var elAnnonce = document.getElementById("qsj-annonce");

  var NOMS_PERIODE = { trias: "au Trias", jurassique: "au Jurassique", cretace: "au Crétacé" };
  var NOMS_REGIME = {
    carnivore: "Je mange de la viande.",
    herbivore: "Je ne mange que des plantes.",
    omnivore: "Je mange un peu de tout.",
    piscivore: "Je me nourris surtout de poissons.",
  };

  function construireIndices(d) {
    var liste = [];
    liste.push("J’ai vécu " + NOMS_PERIODE[d.periode] + ", il y a environ " + d.ageDebut + " millions d’années.");
    liste.push(NOMS_REGIME[d.regime] || "Mon régime est particulier.");
    liste.push("On a retrouvé mes fossiles ici : " + d.lieux.join(", ") + ".");
    liste.push("Je mesure environ " + d.longueur.toString().replace(".", ",") + " mètre" + (d.longueur > 1 ? "s" : "") + " de long — " + d.comparaison + ".");
    if (d.saviezVous && d.saviezVous[0]) liste.push(d.saviezVous[0]);
    return liste;
  }

  function demarrer() {
    manche = 0; score = 0;
    elFin.hidden = true;
    elJeu.hidden = false;
    nouvelleManche();
  }

  function nouvelleManche() {
    repondu = false;
    indiceAffiche = 0;

    var tous = Jeu.melanger(Jeu.dinos());
    cible = tous[0];
    indices = construireIndices(cible);

    var leurres = tous.filter(function (d) { return d.slug !== cible.slug; }).slice(0, 3);
    var propositions = Jeu.melanger(leurres.concat([cible]));

    elNumero.textContent = "Manche " + (manche + 1) + " / " + MANCHES;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    elSilhouette.innerHTML = '<img src="' + Jeu.base() + cible.img + '" alt="Silhouette mystère à identifier" width="400" height="280">';
    elSilhouette.dataset.revele = "false";
    elIndices.innerHTML = "";
    elRetour.hidden = true;
    elSuivant.hidden = true;
    elIndice.hidden = false;
    elIndice.textContent = "🔍 Donne-moi un indice (" + indices.length + " disponibles)";

    elChoix.innerHTML = "";
    propositions.forEach(function (d) {
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "reponse";
      bouton.textContent = d.nom;
      bouton.addEventListener("click", function () { repondre(bouton, d); });
      elChoix.appendChild(bouton);
    });

    ajouterIndice();
  }

  function ajouterIndice() {
    if (indiceAffiche >= indices.length) { elIndice.hidden = true; return; }
    var li = document.createElement("li");
    li.textContent = indices[indiceAffiche];
    elIndices.appendChild(li);
    indiceAffiche++;
    elIndice.textContent = indiceAffiche >= indices.length
      ? "Plus d’indice disponible"
      : "🔍 Un indice de plus (" + (indices.length - indiceAffiche) + " restants)";
    elIndice.disabled = indiceAffiche >= indices.length;
  }

  elIndice.addEventListener("click", ajouterIndice);

  function repondre(bouton, choix) {
    if (repondu) return;
    repondu = true;

    var juste = choix.slug === cible.slug;
    /* Moins on a demandé d'indices, plus la manche rapporte. */
    var points = juste ? Math.max(1, 4 - (indiceAffiche - 1)) : 0;
    score += points;

    Array.prototype.forEach.call(elChoix.querySelectorAll(".reponse"), function (b) {
      b.disabled = true;
      if (b.textContent === cible.nom) b.classList.add("reponse--juste");
    });
    if (!juste) bouton.classList.add("reponse--faux");

    elSilhouette.dataset.revele = "true";
    elIndice.hidden = true;

    elRetour.className = "retour " + (juste ? "retour--juste" : "retour--faux");
    elRetour.innerHTML = juste
      ? "<strong>✅ Bravo !</strong> C’était bien le <strong>" + cible.nom + "</strong> (+" + points + " point" + (points > 1 ? "s" : "") + "). " + cible.accroche
      : "<strong>❌ Perdu !</strong> C’était le <strong>" + cible.nom + "</strong>. " + cible.accroche;
    elRetour.hidden = false;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    Jeu.annoncer(elAnnonce, juste ? "Bonne réponse." : "Mauvaise réponse.");

    elSuivant.hidden = false;
    elSuivant.textContent = manche + 1 >= MANCHES ? "Voir mon résultat 🎉" : "Manche suivante →";
    elSuivant.focus();
  }

  elSuivant.addEventListener("click", function () {
    manche++;
    if (manche >= MANCHES) terminer();
    else nouvelleManche();
  });

  function terminer() {
    var max = MANCHES * 4;
    var b = Jeu.bilan(score, max);
    elJeu.hidden = true;
    elFin.hidden = false;
    elFin.innerHTML =
      '<div class="resultat"><div class="resultat__medaille" aria-hidden="true">' + b.medaille + "</div>" +
      "<h2>" + b.titre + "</h2>" +
      '<p class="resultat__note">' + score + " / " + max + "</p><p>" + b.texte + "</p>" +
      '<p><button type="button" class="bouton" id="qsj-rejouer">🔄 Rejouer</button></p></div>';
    document.getElementById("qsj-rejouer").addEventListener("click", demarrer);
    elFin.querySelector("h2").focus();
  }

  demarrer();
})();
