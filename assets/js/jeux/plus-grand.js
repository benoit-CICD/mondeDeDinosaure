/* « Plus grand ou plus petit ? » : dix duels entre deux créatures. */
(function () {
  "use strict";

  var zone = document.getElementById("pg");
  if (!zone || !window.DINOS) return;

  var DUELS = 10;
  /* Les tailles et les poids sont des estimations : on n'oppose que des
     créatures nettement différentes, pour que la bonne réponse soit sûre. */
  var ECART_MIN = 1.4;

  var CRITERES = [
    {
      question: "Qui était le plus long ?", cle: "longueur", verbe: "mesurait", fmt: Jeu.fmtLongueur,
      /* Pour les ptérosaures, la « longueur » des fiches est l'envergure des ailes. */
      valide: function (d) { return d.famille !== "pterosaures"; },
    },
    {
      question: "Qui était le plus lourd ?", cle: "poids", verbe: "pesait", fmt: Jeu.fmtPoids,
      valide: function () { return true; },
    },
    {
      question: "Qui courait le plus vite ?", cle: "vitesse", verbe: "courait à", fmt: function (v) { return v + " km/h"; },
      /* Les reptiles volants et marins ne couraient pas : ils sont exclus. */
      valide: function (d) { return d.vraiDino; },
    },
  ];

  var duels = [], index = 0, score = 0, repondu = false;

  var elQuestion = document.getElementById("pg-question");
  var elDuel = document.getElementById("pg-duel");
  var elRetour = document.getElementById("pg-retour");
  var elScore = document.getElementById("pg-score");
  var elNumero = document.getElementById("pg-numero");
  var elProgression = document.getElementById("pg-progression");
  var elSuivant = document.getElementById("pg-suivant");
  var elFin = document.getElementById("pg-fin");
  var elJeu = document.getElementById("pg-jeu");
  var elAnnonce = document.getElementById("pg-annonce");

  /** Prépare les dix duels, sans jamais répéter une paire ni trop souvent la même créature. */
  function preparer() {
    var ordre = Jeu.melanger(CRITERES);
    var vus = {}, paires = {};
    duels = [];
    for (var i = 0; i < DUELS; i++) {
      var critere = ordre[i % ordre.length];
      var pool = Jeu.dinos().filter(critere.valide);
      for (var essai = 0; essai < 300; essai++) {
        var duo = Jeu.melanger(pool).slice(0, 2);
        var a = duo[0], b = duo[1];
        var grand = Math.max(a[critere.cle], b[critere.cle]), petit = Math.min(a[critere.cle], b[critere.cle]);
        var cle = [a.slug, b.slug].sort().join("|");
        if (petit <= 0 || grand / petit < ECART_MIN || paires[cle]) continue;
        if ((vus[a.slug] || 0) >= 2 || (vus[b.slug] || 0) >= 2) continue;
        paires[cle] = true;
        vus[a.slug] = (vus[a.slug] || 0) + 1;
        vus[b.slug] = (vus[b.slug] || 0) + 1;
        duels.push({ critere: critere, a: a, b: b });
        break;
      }
    }
  }

  function demarrer() {
    preparer();
    index = 0; score = 0;
    elFin.hidden = true;
    elJeu.hidden = false;
    afficher();
  }

  function carte(d) {
    var bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "choix";
    bouton.innerHTML = Jeu.visuel({ img: d.slug }) + "<span>" + d.nom + '</span><span class="choix__valeur" hidden></span>';
    return bouton;
  }

  function afficher() {
    repondu = false;
    var duel = duels[index];
    elNumero.textContent = "Duel " + (index + 1) + " / " + duels.length;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    elProgression.style.width = Math.round((index / duels.length) * 100) + "%";
    elQuestion.textContent = duel.critere.question;
    elRetour.hidden = true;
    elSuivant.hidden = true;

    elDuel.innerHTML = "";
    var boutonA = carte(duel.a), boutonB = carte(duel.b);
    boutonA.addEventListener("click", function () { repondre(duel.a); });
    boutonB.addEventListener("click", function () { repondre(duel.b); });
    elDuel.appendChild(boutonA);
    elDuel.insertAdjacentHTML("beforeend", '<span class="duel__vs" aria-hidden="true">VS</span>');
    elDuel.appendChild(boutonB);
    duel.boutons = [boutonA, boutonB];

    elQuestion.focus();
  }

  /** « environ 12 fois plus », « presque deux fois plus »… */
  function rapport(r) {
    if (r >= 2.5) return "C’est environ " + Jeu.milliers(Math.round(r)) + " fois plus !";
    if (r >= 1.85) return "C’est environ deux fois plus !";
    if (r >= 1.65) return "C’est presque deux fois plus !";
    return "C’est environ une fois et demie plus.";
  }

  function repondre(choix) {
    if (repondu) return;
    repondu = true;

    var duel = duels[index], c = duel.critere;
    var gagnant = duel.a[c.cle] > duel.b[c.cle] ? duel.a : duel.b;
    var perdant = gagnant === duel.a ? duel.b : duel.a;
    var juste = choix === gagnant;
    if (juste) score++;

    [duel.a, duel.b].forEach(function (d, i) {
      var b = duel.boutons[i];
      b.disabled = true;
      var valeur = b.querySelector(".choix__valeur");
      valeur.textContent = c.fmt(d[c.cle]);
      valeur.hidden = false;
      if (d === gagnant) b.classList.add("choix--juste");
      else if (d === choix) b.classList.add("choix--faux");
    });

    var max = gagnant[c.cle];
    var barres = [gagnant, perdant].map(function (d) {
      var largeur = Math.max(2, Math.round((d[c.cle] / max) * 100));
      return '<div class="barre"><span>' + d.nom + '</span><span class="barre__piste"><span class="barre__jauge" style="width:' +
        largeur + '%"></span></span></div>';
    }).join("");

    elRetour.className = "retour " + (juste ? "retour--juste" : "retour--faux");
    elRetour.innerHTML = (juste ? "<strong>✅ Bravo !</strong> " : "<strong>❌ Raté !</strong> ") +
      gagnant.nom + " " + c.verbe + " " + c.fmt(gagnant[c.cle]) + ", contre " + c.fmt(perdant[c.cle]) +
      " pour " + perdant.nom + ". " + rapport(gagnant[c.cle] / perdant[c.cle]) +
      '<div class="barres" aria-hidden="true">' + barres + "</div>";
    elRetour.hidden = false;
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    Jeu.annoncer(elAnnonce, juste ? "Bonne réponse." : "Mauvaise réponse.");

    elSuivant.hidden = false;
    elSuivant.textContent = index + 1 >= duels.length ? "Voir mon résultat 🎉" : "Duel suivant →";
    elSuivant.focus();
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
      lien: '<a class="bouton bouton--secondaire" href="' + Jeu.base() + 'dinosaures.html">📚 Comparer les fiches</a>',
    });
  }

  demarrer();
})();
