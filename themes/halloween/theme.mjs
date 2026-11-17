// Le thème d'Halloween : citrouilles cachées, araignée, T-rex fantôme, diplôme…
//
// Ce dossier contient tout le thème :
//   theme.mjs                  ces réglages, lus par le générateur (tools/build.mjs)
//   halloween.css              couleurs et décor, rangés sous html.halloween
//   halloween.js               animations et surprises, branchées sur window.Theme
//   accueil.mjs                décor de la scène de l'accueil
//   diplome.mjs                page du diplôme des chasseurs de citrouilles
//   diplome-citrouilles.html   cette page (GÉNÉRÉE quand le thème est actif, effacée sinon)

import { fond, devant, boutons } from "./accueil.mjs";
import { pageDiplome } from "./diplome.mjs";

// La récompense des 10 citrouilles. Le chemin part de la racine du site ;
// halloween.js le reçoit dans window.THEME.diplome.
const diplome = { prenom: "Noah", chemin: "themes/halloween/diplome-citrouilles.html" };

export default {
  nom: "Halloween",
  deNom: "d’Halloween",            // « le thème d’Halloween », « le déguisement d’Halloween »
  emoji: "🎃",
  message: "Joyeux Halloween !",
  detail: "Le site s’est déguisé.", // masqué sur téléphone pour garder un bandeau court
  // Ce que le thème garde le temps de la visite, en plus du choix « thème éteint »
  // (fin d'énumération, avec son « et », affichée sur la page Confidentialité).
  memoire: "la liste des citrouilles cachées déjà trouvées, et le fait d’avoir déjà lu l’annonce des nouveautés",
  // Ce qui se manipule au clavier (affiché sur la page Accessibilité).
  clavier: "L’araignée et les citrouilles cachées se manipulent aussi au clavier.",

  // Feuilles de style et scripts de ce dossier, chargés après ceux de themes/commun/.
  css: ["halloween.css"],
  js: ["halloween.js"],

  // Décor ajouté à la scène de l'accueil.
  accueil: { fond, devant, boutons },

  diplome,

  // Pages propres au thème, hors plan du site. `outils` : { page, esc, site } (tools/templates.mjs).
  pages: (outils) => [pageDiplome(outils, diplome)],
};
