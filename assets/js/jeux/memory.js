/* Jeu de mémoire : retrouver les paires de dinosaures. */
(function () {
  "use strict";

  var plateau = document.getElementById("memory");
  if (!plateau || !window.DINOS) return;

  var PAIRES = 8;
  var premiere = null, blocage = false, coups = 0, trouvees = 0, debut = null, chrono = null;

  var elCoups = document.getElementById("memory-coups");
  var elPaires = document.getElementById("memory-paires");
  var elTemps = document.getElementById("memory-temps");
  var elFin = document.getElementById("memory-fin");
  var elRejouer = document.getElementById("memory-rejouer");
  var elAnnonce = document.getElementById("memory-annonce");

  function demarrer() {
    plateau.innerHTML = "";
    elFin.hidden = true;
    premiere = null; blocage = false; coups = 0; trouvees = 0;
    elCoups.textContent = "0";
    elPaires.textContent = "0 / " + PAIRES;
    elTemps.textContent = "0 s";

    clearInterval(chrono);
    debut = Date.now();
    chrono = setInterval(function () {
      elTemps.textContent = Math.floor((Date.now() - debut) / 1000) + " s";
    }, 1000);

    var choisis = Jeu.melanger(Jeu.dinos()).slice(0, PAIRES);
    var cartes = Jeu.melanger(choisis.concat(choisis));

    cartes.forEach(function (d, i) {
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "memory__carte";
      bouton.dataset.slug = d.slug;
      bouton.dataset.face = "false";
      bouton.setAttribute("aria-label", "Carte " + (i + 1) + ", face cachée");
      bouton.innerHTML =
        '<span class="memory__inner">' +
        '<span class="memory__face memory__face--dos" aria-hidden="true">🦴</span>' +
        '<span class="memory__face memory__face--avant">' +
        '<img src="' + Jeu.base() + d.img + '" alt="" loading="lazy" width="200" height="140">' +
        "</span></span>";
      bouton.addEventListener("click", function () { retourner(bouton, d); });
      plateau.appendChild(bouton);
    });
  }

  function retourner(carte, dino) {
    if (blocage || carte.dataset.face === "true" || carte.dataset.trouve === "true") return;

    carte.dataset.face = "true";
    carte.setAttribute("aria-label", dino.nom);

    if (!premiere) { premiere = { carte: carte, dino: dino }; return; }

    coups++;
    elCoups.textContent = String(coups);

    if (premiere.dino.slug === dino.slug) {
      premiere.carte.dataset.trouve = "true";
      carte.dataset.trouve = "true";
      premiere = null;
      trouvees++;
      elPaires.textContent = trouvees + " / " + PAIRES;
      Jeu.annoncer(elAnnonce, "Paire trouvée : " + dino.nom);
      if (trouvees === PAIRES) terminer();
    } else {
      blocage = true;
      var autre = premiere;
      premiere = null;
      setTimeout(function () {
        autre.carte.dataset.face = "false";
        carte.dataset.face = "false";
        autre.carte.setAttribute("aria-label", "Carte face cachée");
        carte.setAttribute("aria-label", "Carte face cachée");
        blocage = false;
      }, 850);
    }
  }

  function terminer() {
    clearInterval(chrono);
    var secondes = Math.floor((Date.now() - debut) / 1000);
    var appreciation = coups <= 12 ? "Mémoire de paléontologue !"
      : coups <= 18 ? "Très belle partie !"
      : "Bien joué, tu les as toutes trouvées !";
    elFin.hidden = false;
    elFin.innerHTML =
      '<div class="resultat"><div class="resultat__medaille" aria-hidden="true">🏆</div>' +
      "<h2>" + appreciation + "</h2>" +
      "<p>Tu as terminé en <strong>" + coups + " coups</strong> et <strong>" + secondes + " secondes</strong>.</p>" +
      '<p><button type="button" class="bouton" id="memory-encore">🔄 Nouvelle partie</button></p></div>';
    document.getElementById("memory-encore").addEventListener("click", demarrer);
    elFin.querySelector("h2").focus();
  }

  if (elRejouer) elRejouer.addEventListener("click", demarrer);
  demarrer();
})();
