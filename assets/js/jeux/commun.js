/* Outils partagés par les mini-jeux. */
window.Jeu = (function () {
  "use strict";

  function melanger(tableau) {
    var t = tableau.slice();
    for (var i = t.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = t[i]; t[i] = t[j]; t[j] = tmp;
    }
    return t;
  }

  function base() { return window.BASE || ""; }

  /** Message + médaille en fonction du pourcentage de réussite. */
  function bilan(score, total) {
    var p = total ? Math.round((score / total) * 100) : 0;
    if (p === 100) return { medaille: "🏆", titre: "Sans faute !", texte: "Incroyable ! Tu connais les dinosaures sur le bout des griffes." };
    if (p >= 80) return { medaille: "🥇", titre: "Excellent !", texte: "Tu es un vrai paléontologue en herbe." };
    if (p >= 60) return { medaille: "🥈", titre: "Bien joué !", texte: "Beau score. Encore un petit effort pour la perfection." };
    if (p >= 40) return { medaille: "🥉", titre: "Pas mal !", texte: "Tu progresses. Relis quelques fiches et retente ta chance." };
    return { medaille: "🦕", titre: "Continue à explorer !", texte: "Va lire les fiches des dinosaures, puis reviens jouer : tu vas beaucoup mieux faire." };
  }

  /** Message court annoncé aux lecteurs d'écran. */
  function annoncer(zone, message) {
    if (zone) zone.textContent = message;
  }

  function dinos() { return (window.DINOS || []).slice(); }

  /* Mêmes conventions d'affichage que les fiches (tools/templates.mjs). */
  function virgule(n) { return String(n).replace(".", ","); }
  function fmtLongueur(m) { return m < 1 ? Math.round(m * 100) + " cm" : virgule(m) + " m"; }
  function fmtPoids(kg) {
    if (kg >= 1000) return virgule(+(kg / 1000).toFixed(kg >= 10000 ? 0 : 1)) + " t";
    return kg + " kg";
  }
  /** 12500 → « 12 500 », avec une espace insécable. */
  function milliers(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0"); }

  /** Illustration maison d'une créature, ou emoji si la carte n'en a pas. */
  function visuel(carte) {
    if (carte.img) return '<img src="' + base() + "assets/img/dinos/" + carte.img + '.svg" alt="" width="200" height="140">';
    return '<span class="choix__emoji" aria-hidden="true">' + (carte.emoji || "❔") + "</span>";
  }

  /** Écran de fin commun aux jeux : médaille, note, message et boutons. */
  function resultat(zone, score, total, options) {
    var b = bilan(score, total);
    var o = options || {};
    zone.hidden = false;
    zone.innerHTML =
      '<div class="resultat"><div class="resultat__medaille" aria-hidden="true">' + b.medaille + "</div>" +
      '<h2 tabindex="-1">' + b.titre + "</h2>" +
      '<p class="resultat__note">' + score + " / " + total + "</p><p>" + (o.texte || b.texte) + "</p>" +
      '<p><button type="button" class="bouton" data-rejouer>🔄 Rejouer</button> ' + (o.lien || "") + "</p></div>";
    zone.querySelector("[data-rejouer]").addEventListener("click", o.rejouer);
    zone.querySelector("h2").focus();
  }

  return {
    melanger: melanger, base: base, bilan: bilan, annoncer: annoncer, dinos: dinos,
    fmtLongueur: fmtLongueur, fmtPoids: fmtPoids, milliers: milliers, visuel: visuel, resultat: resultat,
  };
})();
