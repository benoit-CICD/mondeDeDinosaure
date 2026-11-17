/* Thème d'hiver : la touche de Noël, en décembre.
   Chargé quand `theme: "hiver"` dans tools/data/site.mjs, après
   themes/commun/commun.js (bandeau, interrupteur, mémoire : window.Theme).
   La neige et la pelle sont dans neige.js.

   En décembre, html reçoit la classe « noel » : hiver.css affiche alors la
   guirlande, le sapin, les cadeaux et le bonnet du dinosaure, et le bandeau
   prend le message de Noël (reglages.noel dans theme.mjs).
   Pour essayer un autre mois : ajouter #noel au bout de l'adresse. */
(function () {
  "use strict";

  var Theme = window.Theme;
  if (!Theme) return;

  var noel = new Date().getMonth() === 11 || location.hash === "#noel";
  if (!noel) return;
  document.documentElement.classList.add("noel");

  var reglages = Theme.reglages.noel || {};
  var message = Theme.zone.querySelector(".bandeau-theme__message");
  if (message && reglages.message) {
    message.textContent = reglages.message;
    if (reglages.detail) {
      var detail = document.createElement("span");
      detail.className = "bandeau-theme__long";
      detail.textContent = " " + reglages.detail;
      message.appendChild(detail);
    }
  }
})();
