/* « Retrouve la maman » : rendre chaque œuf à ses parents.
   On touche un œuf, puis un parent : simple au doigt comme au clavier. */
(function () {
  "use strict";

  var zone = document.getElementById("oeufs");
  if (!zone || !window.OEUFS) return;

  var PAR_MANCHE = 4;
  var manches = [], manche = 0, score = 0, choisi = null, eclos = 0, rates = {}, aides = {};

  var elNid = document.getElementById("oeufs-nid");
  var elFiche = document.getElementById("oeufs-fiche");
  var elParents = document.getElementById("oeufs-parents");
  var elRetour = document.getElementById("oeufs-retour");
  var elScore = document.getElementById("oeufs-score");
  var elNumero = document.getElementById("oeufs-numero");
  var elProgression = document.getElementById("oeufs-progression");
  var elSuivant = document.getElementById("oeufs-suivant");
  var elFin = document.getElementById("oeufs-fin");
  var elJeu = document.getElementById("oeufs-jeu");
  var elAnnonce = document.getElementById("oeufs-annonce");

  var LIBELLES = { forme: "Forme", taille: "Taille", coquille: "Coquille", nid: "Le nid" };
  var total = window.OEUFS.length;

  function demarrer() {
    var tous = Jeu.melanger(window.OEUFS);
    var intrus = Jeu.melanger(window.SANS_OEUF);
    manches = [];
    for (var i = 0; i * PAR_MANCHE < tous.length; i++) {
      manches.push({ oeufs: tous.slice(i * PAR_MANCHE, (i + 1) * PAR_MANCHE), intrus: intrus[i % intrus.length] });
    }
    manche = 0; score = 0; aides = {};
    elFin.hidden = true;
    elJeu.hidden = false;
    nouvelleManche();
  }

  function majScore() {
    elScore.textContent = "⭐ " + score + " point" + (score > 1 ? "s" : "");
    elProgression.style.width = Math.round(((manche * PAR_MANCHE + eclos) / total) * 100) + "%";
  }

  function nouvelleManche() {
    var m = manches[manche];
    choisi = null; eclos = 0; rates = {};
    elNumero.textContent = "Manche " + (manche + 1) + " / " + manches.length;
    elRetour.hidden = true;
    elSuivant.hidden = true;
    elFiche.innerHTML = '<p style="margin:0">Touche un œuf du nid pour l’examiner.</p>';
    majScore();

    elNid.innerHTML = "";
    m.oeufs.forEach(function (o, i) {
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "oeuf";
      bouton.dataset.id = o.id;
      bouton.setAttribute("aria-pressed", "false");
      bouton.setAttribute("aria-label", "Œuf " + (i + 1));
      bouton.innerHTML = '<img src="' + Jeu.base() + "assets/img/oeufs/" + o.id + '.svg" alt="" width="120" height="150">' +
        "<span>Œuf " + (i + 1) + "</span>";
      bouton.addEventListener("click", function () { choisirOeuf(bouton, o, i + 1); });
      elNid.appendChild(bouton);
    });

    /* Les parents des œufs du nid, plus un intrus qui ne pondait pas. */
    var parents = m.oeufs
      .map(function (o) { return { id: o.id, carte: o.parent }; })
      .concat([{ id: m.intrus.id, carte: m.intrus.parent, intrus: m.intrus }]);

    elParents.innerHTML = "";
    Jeu.melanger(parents).forEach(function (p) {
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "choix";
      bouton.dataset.id = p.id;
      bouton.innerHTML = Jeu.visuel(p.carte) + "<span>" + p.carte.nom + '</span><span class="choix__detail">' + p.carte.famille + "</span>";
      bouton.addEventListener("click", function () { choisirParent(bouton, p); });
      elParents.appendChild(bouton);
    });
  }

  function choisirOeuf(bouton, oeuf, numero) {
    Array.prototype.forEach.call(elNid.querySelectorAll(".oeuf"), function (b) { b.setAttribute("aria-pressed", "false"); });
    bouton.setAttribute("aria-pressed", "true");
    choisi = { bouton: bouton, oeuf: oeuf, numero: numero };
    afficherFiche();
    Jeu.annoncer(elAnnonce, "Œuf " + numero + " sélectionné : " + oeuf.indices.forme + ". Choisis maintenant ses parents.");
  }

  /** Fiche d'identité de l'œuf choisi : les indices du dossier, et une aide sur demande. */
  function afficherFiche() {
    var o = choisi.oeuf;
    var html = "<h3>🔎 Œuf " + choisi.numero + "</h3><dl>";
    Object.keys(LIBELLES).forEach(function (cle) {
      html += "<dt>" + LIBELLES[cle] + "</dt><dd>" + o.indices[cle] + "</dd>";
    });
    html += "</dl>";
    html += aides[o.id]
      ? '<p class="fiche-oeuf__aide" tabindex="-1">💡 ' + o.aide + "</p>"
      : '<button type="button" class="bouton bouton--ambre bouton--petit" data-aide>💡 Un indice ?</button>';
    elFiche.innerHTML = html;

    var bouton = elFiche.querySelector("[data-aide]");
    if (bouton) {
      bouton.addEventListener("click", function () {
        aides[o.id] = true;
        afficherFiche();
        elFiche.querySelector(".fiche-oeuf__aide").focus();
      });
    }
  }

  function montrerRetour(classe, html) {
    elRetour.className = "retour" + (classe ? " retour--" + classe : "");
    elRetour.innerHTML = html;
    elRetour.hidden = false;
  }

  function choisirParent(bouton, parent) {
    if (!choisi) {
      montrerRetour("", "🪺 Choisis d’abord un œuf dans le nid, puis touche ses parents.");
      return;
    }
    var o = choisi.oeuf;

    if (parent.id !== o.id) {
      rates[o.id] = true;
      bouton.classList.remove("choix--faux");
      void bouton.offsetWidth; // relance l'animation
      bouton.classList.add("choix--faux");

      if (parent.intrus) {
        /* L'intrus est démasqué : il reste affiché comme tel. */
        bouton.disabled = true;
        bouton.querySelector(".choix__detail").textContent = "🚫 Pas d’œuf !";
        montrerRetour("faux", "<strong>❌ " + parent.carte.nom + " ?</strong> " + parent.intrus.explication);
      } else {
        setTimeout(function () { bouton.classList.remove("choix--faux"); }, 900);
        montrerRetour("faux", "<strong>❌ Raté !</strong> " + parent.carte.nom + " n’est pas le parent de cet œuf. " +
          (aides[o.id] ? "Relis bien la fiche de l’œuf." : "Relis la fiche de l’œuf, ou demande un indice."));
      }
      Jeu.annoncer(elAnnonce, "Mauvais parent.");
      return;
    }

    /* Bonne réponse : l'œuf éclot. Un point seulement s'il est rendu du premier coup. */
    var premierCoup = !rates[o.id];
    if (premierCoup) score++;
    eclos++;

    bouton.classList.add("choix--juste");
    bouton.disabled = true;
    bouton.querySelector(".choix__detail").textContent = "✅ Œuf " + choisi.numero;

    choisi.bouton.dataset.eclos = "true";
    choisi.bouton.disabled = true;
    choisi.bouton.setAttribute("aria-pressed", "false");
    choisi.bouton.setAttribute("aria-label", "Œuf " + choisi.numero + " : éclos, rendu à " + parent.carte.nom);
    choisi.bouton.querySelector("span").textContent = "Éclos !";
    choisi = null;
    elFiche.innerHTML = '<p style="margin:0">Touche un autre œuf du nid.</p>';
    majScore();

    var m = manches[manche];
    var html = "<strong>✅ Bravo !</strong> " + o.explication + (premierCoup ? "" : " (Pas de point cette fois : il t’a fallu plusieurs essais.)");

    if (eclos === m.oeufs.length) {
      var intrusDemasque = elParents.querySelector('[data-id="' + m.intrus.id + '"]').disabled;
      html += "<br><br><strong>🎉 Tous les œufs ont éclos !</strong>" +
        (intrusDemasque ? "" : " Et l’intrus ? " + m.intrus.explication);
      elSuivant.hidden = false;
      elSuivant.textContent = manche + 1 >= manches.length ? "Voir mon résultat 🎉" : "Manche suivante →";
      montrerRetour("juste", html);
      Jeu.annoncer(elAnnonce, "Bonne réponse. Tous les œufs de la manche ont éclos.");
      elSuivant.focus();
      return;
    }

    montrerRetour("juste", html);
    Jeu.annoncer(elAnnonce, "Bonne réponse, l’œuf éclot !");
  }

  elSuivant.addEventListener("click", function () {
    manche++;
    if (manche >= manches.length) terminer();
    else nouvelleManche();
  });

  function terminer() {
    elProgression.style.width = "100%";
    elJeu.hidden = true;
    Jeu.resultat(elFin, score, total, {
      rejouer: demarrer,
      texte: "Un point par œuf rendu à ses parents du premier coup. " + Jeu.bilan(score, total).texte,
      lien: '<a class="bouton bouton--secondaire" href="' + Jeu.base() + 'oeufs.html">📖 Lire le dossier sur les œufs</a>',
    });
  }

  demarrer();
})();
