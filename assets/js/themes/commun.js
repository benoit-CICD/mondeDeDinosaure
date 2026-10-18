/* Socle commun aux thèmes saisonniers : bandeau, bouton « Enlever le
   déguisement » et mémoire de la visite. Chargé seulement quand un thème est
   choisi (`theme` dans tools/data/site.mjs), juste avant le script du thème.

   Le gabarit écrit dans la page :
     <html class="theme-actif <id>">  et  window.THEME = { id, message, … }
   Le script du thème se branche ensuite sur window.Theme.

   Seules informations gardées : le choix « thème éteint » et ce que le thème
   décide de retenir, dans sessionStorage (sur l'appareil, jamais envoyé,
   effacé à la fermeture de l'onglet). */
window.Theme = (function () {
  "use strict";

  var config = window.THEME;
  var entete = document.querySelector(".entete");
  if (!config || !entete) return null;

  var racine = document.documentElement;
  var auditeurs = [];

  function actif() { return racine.classList.contains("theme-actif"); }

  /* Les clés sont rangées par thème : éteindre Halloween n'éteindra pas Noël. */
  function lire(cle) {
    try { return sessionStorage.getItem("theme:" + config.id + ":" + cle); } catch (e) { return null; }
  }
  function ecrire(cle, valeur) {
    try { sessionStorage.setItem("theme:" + config.id + ":" + cle, valeur); } catch (e) { /* navigation privée */ }
  }

  var bandeau = document.createElement("div");
  bandeau.className = "bandeau-theme";
  bandeau.setAttribute("role", "region");
  bandeau.setAttribute("aria-label", config.nom);
  bandeau.innerHTML =
    '<div class="bandeau-theme__contenu"><p class="bandeau-theme__zone">' +
    '<span class="bandeau-theme__message"></span></p>' +
    '<button type="button" class="bandeau-theme__interrupteur"></button>' +
    '<span class="visuellement-cache" role="status" aria-live="polite"></span></div>';
  entete.insertAdjacentElement("afterend", bandeau);

  var zone = bandeau.querySelector(".bandeau-theme__zone");
  var interrupteur = bandeau.querySelector(".bandeau-theme__interrupteur");
  var elAnnonce = bandeau.querySelector('[role="status"]');

  var message = bandeau.querySelector(".bandeau-theme__message");
  message.textContent = config.message;
  if (config.detail) {
    var detail = document.createElement("span");
    detail.className = "bandeau-theme__long";
    detail.textContent = " " + config.detail;
    message.appendChild(detail);
  }

  function annoncer(texte) {
    elAnnonce.textContent = "";
    setTimeout(function () { elAnnonce.textContent = texte; }, 60);
  }

  function majInterrupteur() {
    interrupteur.textContent = actif()
      ? "🦕 Enlever le déguisement"
      : config.emoji + " Remettre le déguisement " + config.deNom;
  }

  interrupteur.addEventListener("click", function () {
    var allumer = !actif();
    racine.classList.toggle("theme-actif", allumer);
    racine.classList.toggle(config.id, allumer);
    ecrire("eteint", allumer ? "0" : "1");
    majInterrupteur();
    annoncer(allumer ? "Le thème " + config.deNom + " est de retour !" : "Le thème " + config.deNom + " est rangé.");
    auditeurs.forEach(function (f) { f(allumer); });
  });
  majInterrupteur();

  return {
    id: config.id,
    actif: actif,
    lire: lire,
    ecrire: ecrire,
    annoncer: annoncer,
    /** Le paragraphe du bandeau, où le thème peut ajouter ses boutons et compteurs. */
    zone: zone,
    bandeau: bandeau,
    /** Appelle f(true|false) quand le visiteur allume ou éteint le thème. */
    surBascule: function (f) { auditeurs.push(f); },
  };
})();
