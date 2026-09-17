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

  return { melanger: melanger, base: base, bilan: bilan, annoncer: annoncer, dinos: dinos };
})();
