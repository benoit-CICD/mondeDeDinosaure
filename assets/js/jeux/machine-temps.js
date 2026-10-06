/* « La machine à remonter le temps » : ranger des cartes du plus ancien au plus récent.
   On touche les cartes dans l'ordre ; toucher une case remplie la vide. */
(function () {
  "use strict";

  var zone = document.getElementById("mt");
  if (!zone || !window.DINOS) return;

  var VOYAGES = 6, CARTES = 4;
  /* Écart minimal entre deux cartes, en millions d'années : les premiers voyages
     mélangent des époques très éloignées, les derniers sont plus serrés. */
  var ECARTS = [30, 30, 15, 15, 8, 8];

  var voyage = 0, score = 0, cartes = [], cases = [], verifie = false, pileReperes = [];

  var elCases = document.getElementById("mt-cases");
  var elCartes = document.getElementById("mt-cartes");
  var elVerifier = document.getElementById("mt-verifier");
  var elRetour = document.getElementById("mt-retour");
  var elScore = document.getElementById("mt-score");
  var elNumero = document.getElementById("mt-numero");
  var elProgression = document.getElementById("mt-progression");
  var elQuestion = document.getElementById("mt-question");
  var elSuivant = document.getElementById("mt-suivant");
  var elFin = document.getElementById("mt-fin");
  var elJeu = document.getElementById("mt-jeu");
  var elAnnonce = document.getElementById("mt-annonce");

  function candidats() {
    return {
      dinos: Jeu.dinos().map(function (d) {
        return { id: d.slug, nom: d.nom, img: d.slug, age: d.ageDebut, ages: "il y a " + d.ageDebut + " à " + d.ageFin + " millions d’années" };
      }),
      reperes: (window.REPERES || []).map(function (r) {
        return { id: r.id, nom: r.nom, emoji: r.emoji, age: r.age, ages: r.ages, note: r.note };
      }),
    };
  }

  /** Tire des cartes assez éloignées dans le temps, avec au plus un repère (glaciation, mammouth…).
      Les repères défilent à tour de rôle : aucun ne revient avant que les autres soient passés. */
  function tirer(ecart) {
    var c = candidats();
    if (!pileReperes.length) pileReperes = Jeu.melanger(c.reperes);
    var repere = Math.random() < 0.6 ? pileReperes[0] : null;
    for (var essai = 0; essai < 200; essai++) {
      var pioche = Jeu.melanger(c.dinos);
      if (repere) pioche.unshift(repere);
      var choisies = [];
      for (var i = 0; i < pioche.length && choisies.length < CARTES; i++) {
        var carte = pioche[i];
        var assezLoin = choisies.every(function (x) { return Math.abs(x.age - carte.age) >= ecart; });
        if (assezLoin) choisies.push(carte);
      }
      if (choisies.length === CARTES) {
        if (repere) pileReperes.shift();
        return Jeu.melanger(choisies);
      }
    }
    return Jeu.melanger(c.dinos).slice(0, CARTES);
  }

  function demarrer() {
    voyage = 0; score = 0; pileReperes = [];
    elFin.hidden = true;
    elJeu.hidden = false;
    nouveauVoyage();
  }

  function nouveauVoyage() {
    verifie = false;
    cartes = tirer(ECARTS[voyage] || 8);
    cases = cartes.map(function () { return null; });
    elNumero.textContent = "Voyage " + (voyage + 1) + " / " + VOYAGES;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    elProgression.style.width = Math.round((voyage / VOYAGES) * 100) + "%";
    elRetour.hidden = true;
    elSuivant.hidden = true;
    elVerifier.hidden = false;
    dessiner();
    elQuestion.focus();
  }

  function etiquette(i) {
    if (i === 0) return "1 · Le plus ancien";
    if (i === CARTES - 1) return CARTES + " · Le plus récent";
    return String(i + 1);
  }

  function ordreJuste() {
    return cartes.slice().sort(function (a, b) { return b.age - a.age; });
  }

  function dessiner() {
    var juste = ordreJuste();
    elCases.innerHTML = "";
    cases.forEach(function (carte, i) {
      var li = document.createElement("li");
      li.className = "case";
      li.innerHTML = '<span class="case__etiquette">' + etiquette(i) + "</span>";
      if (!carte) {
        li.insertAdjacentHTML("beforeend", '<span class="case__vide">Case vide</span>');
      } else {
        var bouton = document.createElement("button");
        bouton.type = "button";
        bouton.className = "choix";
        bouton.innerHTML = Jeu.visuel(carte) + "<span>" + carte.nom +
          (verifie ? '<span class="case__age">' + carte.ages + "</span>" : "") + "</span>";
        if (verifie) {
          bouton.disabled = true;
          bouton.classList.add(carte.id === juste[i].id ? "choix--juste" : "choix--faux");
        } else {
          bouton.setAttribute("aria-label", "Case " + (i + 1) + " : " + carte.nom + ". Toucher pour la retirer.");
          bouton.addEventListener("click", function () { retirer(i); });
        }
        li.appendChild(bouton);
      }
      elCases.appendChild(li);
    });

    elCartes.innerHTML = "";
    if (!verifie) {
      cartes.forEach(function (carte) {
        if (cases.indexOf(carte) !== -1) return;
        var bouton = document.createElement("button");
        bouton.type = "button";
        bouton.className = "choix";
        bouton.innerHTML = Jeu.visuel(carte) + "<span>" + carte.nom + "</span>";
        bouton.addEventListener("click", function () { placer(carte); });
        elCartes.appendChild(bouton);
      });
    }
    elVerifier.disabled = verifie || cases.indexOf(null) !== -1;
  }

  function placer(carte) {
    var libre = cases.indexOf(null);
    if (libre === -1) return;
    cases[libre] = carte;
    dessiner();
    Jeu.annoncer(elAnnonce, carte.nom + " placé en case " + (libre + 1) + ".");
    /* On garde le fil au clavier : carte suivante, ou bouton Vérifier. */
    var suivante = elCartes.querySelector(".choix");
    (suivante || elVerifier).focus();
  }

  function retirer(i) {
    var carte = cases[i];
    cases[i] = null;
    dessiner();
    Jeu.annoncer(elAnnonce, carte.nom + " retiré de la case " + (i + 1) + ".");
    var premiere = elCartes.querySelector(".choix");
    if (premiere) premiere.focus();
  }

  elVerifier.addEventListener("click", function () {
    if (verifie || cases.indexOf(null) !== -1) return;
    verifie = true;

    var juste = ordreJuste();
    var bons = cases.filter(function (c, i) { return c.id === juste[i].id; }).length;
    score += bons;
    dessiner();
    elVerifier.hidden = true;

    var titre = bons === CARTES ? "<strong>✅ Voyage parfait !</strong> "
      : bons >= CARTES / 2 ? "<strong>🟠 Presque !</strong> "
      : "<strong>❌ La machine s’est emballée !</strong> ";
    var html = titre + "Tu as bien placé " + bons + " carte" + (bons > 1 ? "s" : "") + " sur " + CARTES + ". Le bon ordre :<ol>" +
      juste.map(function (c) { return "<li><strong>" + c.nom + "</strong> — " + c.ages + "</li>"; }).join("") + "</ol>";

    /* Un repère glissé dans le voyage apporte son commentaire ; sinon, on mesure l'écart. */
    var repere = juste.filter(function (c) { return c.note; })[0];
    if (repere) {
      html += "🔎 " + repere.note;
    } else {
      var ecart = juste[0].age - juste[juste.length - 1].age;
      html += "🔎 Entre " + juste[0].nom + " et " + juste[juste.length - 1].nom + ", il s’est écoulé environ " + ecart + " millions d’années" +
        (ecart > 66 ? " : plus que le temps qui sépare le dernier T-rex de toi !" : ".");
    }

    elRetour.className = "retour " + (bons === CARTES ? "retour--juste" : "retour--faux");
    elRetour.innerHTML = html;
    elRetour.hidden = false;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    Jeu.annoncer(elAnnonce, bons + " cartes bien placées sur " + CARTES + ".");

    elSuivant.hidden = false;
    elSuivant.textContent = voyage + 1 >= VOYAGES ? "Voir mon résultat 🎉" : "Voyage suivant →";
    elSuivant.focus();
  });

  elSuivant.addEventListener("click", function () {
    voyage++;
    if (voyage >= VOYAGES) terminer();
    else nouveauVoyage();
  });

  function terminer() {
    elProgression.style.width = "100%";
    elJeu.hidden = true;
    Jeu.resultat(elFin, score, VOYAGES * CARTES, {
      rejouer: demarrer,
      texte: "Un point par carte bien placée. " + Jeu.bilan(score, VOYAGES * CARTES).texte,
      lien: '<a class="bouton bouton--secondaire" href="' + Jeu.base() + 'frise.html">📏 Voir la frise du temps</a>',
    });
  }

  demarrer();
})();
