/* Filtrage et recherche du catalogue des dinosaures. */
(function () {
  "use strict";

  var grille = document.getElementById("grille-dinos");
  if (!grille) return;

  var cartes = Array.prototype.slice.call(grille.querySelectorAll("[data-slug]"));
  var recherche = document.getElementById("recherche-dino");
  var puces = Array.prototype.slice.call(document.querySelectorAll(".puce[data-filtre]"));
  var compteur = document.getElementById("compteur-resultats");
  var vide = document.getElementById("aucun-resultat");

  var etat = { periode: "", famille: "", regime: "", texte: "" };

  /* Retire les accents pour que « théropode » se trouve en tapant « theropode ». */
  function sansAccent(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function appliquer() {
    var visibles = 0;
    var mots = sansAccent(etat.texte).split(/\s+/).filter(Boolean);

    cartes.forEach(function (carte) {
      var ok =
        (!etat.periode || carte.dataset.periode === etat.periode) &&
        (!etat.famille || carte.dataset.famille === etat.famille) &&
        (!etat.regime || carte.dataset.regime === etat.regime) &&
        mots.every(function (m) { return carte.dataset.recherche.indexOf(m) !== -1; });

      carte.hidden = !ok;
      if (ok) visibles++;
    });

    if (compteur) {
      compteur.textContent =
        visibles === 0 ? "Aucun dinosaure trouvé"
        : visibles === 1 ? "1 dinosaure trouvé"
        : visibles + " dinosaures trouvés";
    }
    if (vide) vide.hidden = visibles !== 0;

    /* L'URL garde le filtre pour pouvoir partager la page. */
    var params = new URLSearchParams();
    ["periode", "famille", "regime"].forEach(function (k) { if (etat[k]) params.set(k, etat[k]); });
    if (etat.texte) params.set("q", etat.texte);
    var url = params.toString() ? "?" + params.toString() : location.pathname;
    history.replaceState(null, "", url);
  }

  puces.forEach(function (puce) {
    puce.addEventListener("click", function () {
      var type = puce.dataset.filtre;
      var valeur = puce.dataset.valeur;
      etat[type] = etat[type] === valeur ? "" : valeur;

      puces.filter(function (p) { return p.dataset.filtre === type; })
           .forEach(function (p) {
             p.setAttribute("aria-pressed", String(p.dataset.valeur === etat[type] && etat[type] !== ""));
           });
      appliquer();
    });
  });

  if (recherche) {
    var minuteur;
    recherche.addEventListener("input", function () {
      clearTimeout(minuteur);
      minuteur = setTimeout(function () {
        etat.texte = recherche.value.trim();
        appliquer();
      }, 160);
    });
  }

  /* État initial depuis l'URL (?periode=cretace, ?q=tyran…) */
  var init = new URLSearchParams(location.search);
  ["periode", "famille", "regime"].forEach(function (k) {
    var v = init.get(k);
    if (!v) return;
    etat[k] = v;
    puces.filter(function (p) { return p.dataset.filtre === k && p.dataset.valeur === v; })
         .forEach(function (p) { p.setAttribute("aria-pressed", "true"); });
  });
  if (init.get("q") && recherche) {
    etat.texte = init.get("q");
    recherche.value = etat.texte;
  }
  appliquer();
})();
