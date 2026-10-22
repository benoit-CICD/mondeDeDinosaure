/* Le roi de la tour : le vainqueur de chaque duel monte d'un étage et affronte
   un challenger plus fort. 10 étages, 3 vies : chaque mauvais pronostic en coûte une. */
(function () {
  "use strict";

  var zone = document.getElementById("tour");
  if (!zone || !window.Affrontement || !window.AFFRONTEMENTS) return;
  var A = window.Affrontement;

  var ETAGES = 10, VIES = 3;

  var paliers = [], utilises = {}, champion = null, etage = 0, vies = VIES, score = 0, duelEnCours = null;
  var partie = 0; /* numéro de la partie : une animation qui finit après un « Rejouer » ne doit plus rien changer */

  var elJeu = document.getElementById("tour-jeu");
  var elFin = document.getElementById("tour-fin");
  var elTour = document.getElementById("tour-tour");
  var elEtages = document.getElementById("tour-etages");
  var elPion = document.getElementById("tour-pion");
  var elFlash = document.getElementById("tour-flash");
  var elEtat = document.getElementById("tour-etat");
  var elQuestion = document.getElementById("tour-question");
  var elArene = document.getElementById("tour-arene");
  var elRetour = document.getElementById("tour-retour");
  var elSuivant = document.getElementById("tour-suivant");
  var elNumero = document.getElementById("tour-numero");
  var elVies = document.getElementById("tour-vies");
  var elScore = document.getElementById("tour-score");
  var elProgression = document.getElementById("tour-progression");
  var elAnnonce = document.getElementById("tour-annonce");

  /* ---------- Les paliers de difficulté ----------
     Le classement de puissance est découpé en 10 paliers : l'étage 1 oppose de
     petits dinosaures, le sommet réserve les géants. Chaque palier contient
     plusieurs candidats, et on s'autorise un palier d'écart : les parties changent. */
  function construirePaliers() {
    var tri = A.tous().sort(function (a, b) { return a.puissance - b.puissance; });
    var p = [];
    for (var i = 0; i < ETAGES; i++) p.push([]);
    tri.forEach(function (d, i) { p[Math.floor((i * ETAGES) / tri.length)].push(d); });
    return p;
  }

  function tirer(niveau) {
    var decalages = Jeu.melanger([0, 0, 1, -1]).concat([1, -1, 2, -2, 3, -3, 4, -4, 5, -5, 6, -6, 7, -7, 8, -8, 9, -9]);
    for (var i = 0; i < decalages.length; i++) {
      var n = niveau + decalages[i];
      if (n < 0 || n >= ETAGES) continue;
      var libres = paliers[n].filter(function (d) { return !utilises[d.slug]; });
      if (libres.length) {
        var d = libres[Math.floor(Math.random() * libres.length)];
        utilises[d.slug] = true;
        return d;
      }
    }
    return null;
  }

  /* ---------- La tour dessinée ---------- */
  function construireTour() {
    elEtages.innerHTML = "";
    for (var e = 1; e <= ETAGES; e++) {
      var li = document.createElement("li");
      li.className = "tour__etage";
      li.dataset.etage = e;
      li.innerHTML = '<span class="tour__numero">' + e + "</span>" + (e === ETAGES ? '<span class="tour__sommet" aria-hidden="true">👑</span>' : "");
      elEtages.appendChild(li);
    }
  }

  function placerPion(n, saut) {
    elTour.style.setProperty("--etage", n);
    elPion.hidden = !champion;
    if (champion) {
      var img = elPion.querySelector("img");
      img.src = Jeu.base() + champion.photo;
      img.alt = champion.nom;
    }
    if (saut && !A.reduit) {
      elPion.classList.remove("tour__pion--saute");
      void elPion.offsetWidth;
      elPion.classList.add("tour__pion--saute");
    }
    Array.prototype.forEach.call(elEtages.children, function (li) {
      var e = Number(li.dataset.etage);
      li.classList.toggle("tour__etage--conquis", e <= n);
      li.classList.toggle("tour__etage--enjeu", e === n + 1 && vies > 0 && n < ETAGES);
    });
  }

  function flash(texte) {
    elFlash.textContent = texte;
    elFlash.classList.remove("tour__flash--visible");
    void elFlash.offsetWidth;
    elFlash.classList.add("tour__flash--visible");
  }

  function majEntete() {
    elNumero.textContent = "Étage " + Math.min(etage + 1, ETAGES) + " / " + ETAGES;
    elScore.textContent = "⭐ " + score;
    var coeurs = "";
    for (var i = 0; i < VIES; i++) coeurs += i < vies ? "❤️" : "🖤";
    elVies.textContent = coeurs;
    elVies.setAttribute("aria-label", vies + (vies > 1 ? " vies" : " vie"));
    elProgression.style.width = Math.round((etage / ETAGES) * 100) + "%";
  }

  /* ---------- Une partie ---------- */
  function demarrer() {
    paliers = construirePaliers();
    partie++;
    utilises = {}; champion = null; etage = 0; vies = VIES; score = 0;
    elPion.classList.remove("tour__pion--nouveau", "tour__pion--tombe");
    elFin.hidden = true;
    elFin.innerHTML = "";
    elJeu.hidden = false;
    construireTour();
    placerPion(0, false);
    duelSuivant();
  }

  function duelSuivant() {
    var prochain = etage + 1;
    var a, b;
    if (!champion) {
      a = tirer(0); b = tirer(0);
      elEtat.textContent = "Au pied de la tour, deux dinosaures s’affrontent pour le premier étage.";
    } else {
      a = champion; b = tirer(prochain - 1);
      elEtat.textContent = "Étage " + prochain + " : " + champion.nom + " défend sa place face à un nouveau challenger !";
    }
    duelEnCours = [a, b];
    elQuestion.textContent = "Qui monte à l’étage " + prochain + " ?";
    elRetour.hidden = true;
    elSuivant.hidden = true;
    majEntete();
    placerPion(etage, false);

    var ar = A.arene(elArene, a, b, function (choix) { repondre(choix, ar); });
    var etiquettes = champion ? ["🏰 Champion", "⚡ Challenger"] : ["⚔️ Combattant", "⚔️ Combattant"];
    ar.cartes.forEach(function (c, i) {
      var t = document.createElement("span");
      t.className = "combattant__role";
      t.textContent = etiquettes[i];
      c.insertBefore(t, c.firstChild);
    });
    elQuestion.focus();
  }

  function repondre(choix, ar) {
    var d = duelEnCours;
    var g = A.vainqueur(d[0], d[1]);
    var juste = g === choix;
    if (juste) score++; else vies--;

    A.combattre(ar).then(function () {
      var ancien = champion;
      champion = g;
      etage++;
      var ex = A.explication(d[0], d[1]);

      elRetour.className = "retour " + (juste ? "retour--juste" : "retour--faux");
      elRetour.innerHTML = "";
      ajouter(elRetour, "p", "retour__titre",
        (juste ? "✅ Bien vu ! " : "❌ Raté ! Tu perds une vie. ") + ex.titre);
      ajouter(elRetour, "p", "", ex.texte);
      ajouter(elRetour, "p", "retour__rencontre", A.rencontre(d[0], d[1]));
      elRetour.hidden = false;

      majEntete();
      if (!juste && !A.reduit) {
        elVies.classList.remove("tour-vies--perdue");
        void elVies.offsetWidth;
        elVies.classList.add("tour-vies--perdue");
      }

      /* Ce que le lecteur d'écran doit entendre : le résultat, l'explication et les vies restantes. */
      var resume = (juste ? "Bonne réponse. " : "Mauvaise réponse, tu perds une vie. ") + ex.titre.replace(/^🏆\s*/, "") + " ";
      var restant = "Il te reste " + vies + (vies > 1 ? " vies." : " vie.");

      if (vies <= 0) {
        /* Le pion, l'en-tête et l'écran de fin montrent le même étage : celui du duel perdu. */
        placerPion(etage, true);
        elNumero.textContent = "Étage " + etage + " / " + ETAGES;
        Jeu.annoncer(elAnnonce, resume + "Plus de vies : tu tombes de la tour.");
        elSuivant.textContent = "💥 Voir la chute";
        elSuivant.onclick = chute;
      } else {
        /* Le vainqueur grimpe : on voit le pion monter d'un étage. */
        placerPion(etage, true);
        elPion.classList.remove("tour__pion--nouveau");
        if (ancien && ancien !== champion) {
          void elPion.offsetWidth;
          elPion.classList.add("tour__pion--nouveau");
        }
        flash(etage === ETAGES ? "👑 Sommet !" : "⬆️ Étage " + etage);
        Jeu.annoncer(elAnnonce, resume + champion.nom + (etage >= ETAGES ? " atteint le sommet de la tour ! " : " monte à l’étage " + etage + ". ") + restant);
        if (etage >= ETAGES) {
          elSuivant.textContent = "👑 Le couronnement !";
          elSuivant.onclick = couronnement;
        } else {
          elSuivant.textContent = "⬆️ Étage " + (etage + 1) + " →";
          elSuivant.onclick = duelSuivant;
        }
      }
      elSuivant.hidden = false;
      elSuivant.focus();
    });
  }

  function ajouter(parent, balise, classe, texte) {
    var el = document.createElement(balise);
    if (classe) el.className = classe;
    el.textContent = texte;
    parent.appendChild(el);
    return el;
  }

  /* ---------- Fins de partie ---------- */
  function chute() {
    /* Un seul clic compte : le bouton disparaît tout de suite. */
    elSuivant.hidden = true;
    elSuivant.onclick = null;
    var numero = partie;
    if (!A.reduit) {
      elPion.classList.add("tour__pion--tombe");
      setTimeout(function () {
        if (numero !== partie) return;
        elPion.classList.remove("tour__pion--tombe");
        afficherChute();
      }, 900);
    } else {
      afficherChute();
    }
  }

  function afficherChute() {
    elJeu.hidden = true;
    elFin.hidden = false;
    elFin.innerHTML =
      '<div class="resultat" data-bonbons="non"><div class="resultat__medaille" aria-hidden="true">💥</div>' +
      '<h2 tabindex="-1">Aïe, tu es tombé de la tour !</h2>' +
      '<p class="resultat__note">Étage ' + etage + " / " + ETAGES + "</p>" +
      "<p></p>" +
      '<p><button type="button" class="bouton" data-rejouer>🔄 Retenter l’ascension</button> ' +
      '<a class="bouton bouton--secondaire" href="' + Jeu.base() + 'jeux/affrontement-de-dinos.html">⚔️ Affrontement de dinos</a></p></div>';
    elFin.querySelector("p:nth-of-type(2)").textContent =
      "Tes trois vies sont épuisées. Le champion en place était " + A.avecArticle(champion.nom) +
      ". Tu as fait " + score + " bon" + (score > 1 ? "s" : "") + " pronostic" + (score > 1 ? "s" : "") + ".";
    elFin.querySelector("[data-rejouer]").addEventListener("click", demarrer);
    elFin.querySelector("h2").focus();
  }

  function couronnement() {
    var roi = champion;
    var b = Jeu.bilan(score, ETAGES);
    elJeu.hidden = true;
    elFin.hidden = false;
    elFin.innerHTML =
      '<div class="resultat couronnement">' +
      '<div class="couronnement__scene" aria-hidden="true">' +
      '<span class="couronnement__rayons"></span>' +
      '<img src="' + Jeu.base() + roi.photo + '" alt="" width="300" height="210">' +
      '<span class="couronnement__couronne">👑</span></div>' +
      '<h2 tabindex="-1"></h2>' +
      '<p class="couronnement__atout"></p>' +
      '<p class="resultat__note">' + score + " / " + ETAGES + "</p>" +
      "<p></p>" +
      '<p><button type="button" class="bouton" data-rejouer>🔄 Nouveau tournoi</button> ' +
      '<a class="bouton bouton--secondaire" href="' + Jeu.base() + 'jeux/duel-de-dinosaures.html">⚔️ Duel de dinosaures</a></p></div>';
    elFin.querySelector("h2").textContent = "👑 " + A.majuscule(A.avecArticle(roi.nom)) + " est le roi de la tour !";
    elFin.querySelector(".couronnement__atout").textContent = roi.atout;
    elFin.querySelector("p:nth-of-type(3)").textContent =
      b.titre + " Tu as fait " + score + " bon" + (score > 1 ? "s" : "") + " pronostic" + (score > 1 ? "s" : "") +
      " sur " + ETAGES + ", et il te reste " + vies + (vies > 1 ? " vies." : " vie.");
    elFin.querySelector("[data-rejouer]").addEventListener("click", demarrer);
    Jeu.annoncer(elAnnonce, roi.nom + " est le roi de la tour !");
    A.confettis(50);
    elFin.querySelector("h2").focus();
  }

  demarrer();
})();
