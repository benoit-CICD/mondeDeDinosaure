/* Puzzle : remettre les morceaux de l'illustration dans l'ordre.
   On échange deux pièces en les touchant l'une après l'autre : simple au doigt. */
(function () {
  "use strict";

  var plateau = document.getElementById("puzzle");
  if (!plateau || !window.DINOS) return;

  var taille = 3, dino = null, ordre = [], choisie = null, coups = 0;

  var elCoups = document.getElementById("puzzle-coups");
  var elNom = document.getElementById("puzzle-nom");
  var elFin = document.getElementById("puzzle-fin");
  var elAnnonce = document.getElementById("puzzle-annonce");
  var elApercu = document.getElementById("puzzle-apercu");
  var boutonsTaille = document.querySelectorAll("[data-taille]");
  var boutonNouveau = document.getElementById("puzzle-nouveau");

  function demarrer(nouveauDino) {
    dino = nouveauDino || Jeu.melanger(Jeu.dinos())[0];
    coups = 0; choisie = null;
    elCoups.textContent = "0";
    elFin.hidden = true;
    elNom.textContent = dino.nom;
    if (elApercu) elApercu.innerHTML = '<img src="' + Jeu.base() + (dino.imgPuzzle || dino.img) + '" alt="Image complète du puzzle : ' + dino.nom + '" width="200" height="140">';

    var n = taille * taille;
    ordre = [];
    for (var i = 0; i < n; i++) ordre.push(i);

    /* On mélange, en s'assurant que la grille ne tombe pas déjà résolue. */
    do { ordre = Jeu.melanger(ordre); } while (estResolu());

    dessiner();
  }

  function estResolu() {
    return ordre.every(function (v, i) { return v === i; });
  }

  function dessiner() {
    plateau.style.gridTemplateColumns = "repeat(" + taille + ", 1fr)";
    plateau.innerHTML = "";

    ordre.forEach(function (piece, position) {
      var ligne = Math.floor(piece / taille), colonne = piece % taille;
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "puzzle__piece";
      bouton.setAttribute("aria-label", "Pièce " + (piece + 1) + ", case " + (position + 1));
      if (piece === position) bouton.dataset.place = "true";

      var interieur = document.createElement("div");
      interieur.style.backgroundImage = 'url("' + Jeu.base() + (dino.imgPuzzle || dino.img) + '")';
      interieur.style.backgroundSize = taille * 100 + "% " + taille * 100 + "%";
      interieur.style.backgroundPosition =
        (taille > 1 ? (colonne / (taille - 1)) * 100 : 0) + "% " +
        (taille > 1 ? (ligne / (taille - 1)) * 100 : 0) + "%";
      bouton.appendChild(interieur);

      bouton.addEventListener("click", function () { toucher(position, bouton); });
      plateau.appendChild(bouton);
    });
  }

  function toucher(position, bouton) {
    if (choisie === null) {
      choisie = position;
      bouton.dataset.choisi = "true";
      return;
    }
    if (choisie === position) {
      choisie = null;
      bouton.removeAttribute("data-choisi");
      return;
    }

    var tmp = ordre[choisie];
    ordre[choisie] = ordre[position];
    ordre[position] = tmp;
    choisie = null;
    coups++;
    elCoups.textContent = String(coups);
    dessiner();

    if (estResolu()) terminer();
  }

  function terminer() {
    Jeu.annoncer(elAnnonce, "Puzzle terminé !");
    elFin.hidden = false;
    elFin.innerHTML =
      '<div class="resultat"><div class="resultat__medaille" aria-hidden="true">🎉</div>' +
      "<h2>Puzzle résolu !</h2>" +
      "<p>Tu as reconstitué <strong>" + dino.nom + "</strong> en <strong>" + coups + " échanges</strong>.</p>" +
      '<p><a class="bouton bouton--secondaire" href="' + Jeu.base() + dino.url + '">📖 Lire sa fiche</a> ' +
      '<button type="button" class="bouton" id="puzzle-encore">🔄 Un autre dinosaure</button></p></div>';
    document.getElementById("puzzle-encore").addEventListener("click", function () { demarrer(); });
    elFin.querySelector("h2").focus();
  }

  Array.prototype.forEach.call(boutonsTaille, function (b) {
    b.addEventListener("click", function () {
      taille = parseInt(b.dataset.taille, 10);
      Array.prototype.forEach.call(boutonsTaille, function (x) {
        x.setAttribute("aria-pressed", String(x === b));
      });
      demarrer(dino);
    });
  });

  if (boutonNouveau) boutonNouveau.addEventListener("click", function () { demarrer(); });

  demarrer();
})();
