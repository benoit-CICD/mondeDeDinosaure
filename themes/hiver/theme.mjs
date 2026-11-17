// Le thème d'hiver : la neige tombe et s'entasse en bas de l'écran, une pelle
// pour déneiger, 10 flocons d'or à trouver avec l'aide d'un manchot, un diplôme…
// et une touche de Noël en décembre, avec un cadeau le 25.
//
// Ce dossier contient tout le thème :
//   theme.mjs       ces réglages, lus par le générateur (tools/build.mjs)
//   hiver.css       couleurs et décor (html.hiver), touche de Noël (html.hiver.noel)
//   hiver.js        la touche de Noël en décembre, et le cadeau du 25
//   neige.js        la neige qui tombe et s'entasse, et la pelle
//   chasse.js       la chasse aux 10 flocons d'or, le manchot qui guide, le diplôme
//   surprises.js    les autres surprises (dinosaure frileux, volcan, boules de neige…)
//   accueil.mjs     décor de la scène de l'accueil (bonhomme de neige, sapin…)
//   diplome.mjs     la page du diplôme
//   diplome-flocons.html   cette page (GÉNÉRÉE quand le thème est actif, effacée sinon)

import { fond, devant, boutons } from "./accueil.mjs";
import { pageDiplome } from "./diplome.mjs";

// Le prénom du diplôme et du cadeau de Noël.
const PRENOM = "Noah";

// La récompense des 10 flocons d'or. Le chemin part de la racine du site ;
// chasse.js le reçoit dans window.THEME.diplome.
const diplome = { prenom: PRENOM, chemin: "themes/hiver/diplome-flocons.html" };

export default {
  nom: "l’hiver",                  // « Pendant l’hiver, … » (pages Confidentialité et Accessibilité)
  deNom: "d’hiver",                // « le thème d’hiver », « le déguisement d’hiver »
  emoji: "❄️",
  message: "Il neige sur le monde des dinosaures !",
  detail: "Le site a mis son manteau d’hiver.", // masqué sur téléphone pour garder un bandeau court
  // Ce que le thème garde le temps de la visite, en plus du choix « thème éteint »
  // (affiché sur la page Confidentialité).
  memoire: ["la hauteur de la neige tombée sur l’écran", "le fait d’avoir déjà vu le cadeau de Noël"],
  // Ce que le thème garde d'une visite à l'autre, sur l'appareil (localStorage)…
  memoireDurable: ["la liste des flocons d’or déjà trouvés", "le fait d’avoir déjà lu l’annonce des nouveautés"],
  // … et le bouton qui l'efface (page Confidentialité).
  effacerAvec: "le bouton « Recommencer la chasse », sous le menu",
  // Ce qui se manipule au clavier (affiché sur la page Accessibilité).
  clavier: "La neige se déblaie aussi au clavier : le bouton « Prendre la pelle » déneige alors tout l’écran d’un coup. "
    + "Le manchot et les flocons d’or se manipulent aussi au clavier.",

  // Feuilles de style et scripts de ce dossier, chargés après ceux de themes/commun/.
  // neige.js avant chasse.js : le manchot et le flocon enfoui ont besoin de la neige.
  css: ["hiver.css"],
  js: ["hiver.js", "neige.js", "chasse.js", "surprises.js"],

  // Décor ajouté à la scène de l'accueil.
  accueil: { fond, devant, boutons },

  // La fenêtre des nouveautés, une seule fois sur l'accueil (gardée d'une visite à l'autre).
  // Pour une prochaine annonce : changer la clé et le texte. 10 = les cachettes de chasse.js.
  annonce: {
    cle: "annonce-hiver-chasse",
    emoji: "❄️",
    titre: "Il neige sur le site !",
    texte: "La neige s’entasse en bas de l’écran… et <strong>10 flocons d’or</strong> sont cachés sur le site ! Trouve-les tous pour gagner ton <strong>diplôme</strong>.",
    liste: [
      "🐧 Le manchot, en bas à gauche, te donne des devinettes.",
      "🧤 La pelle, en bas à droite, déneige l’écran… et peut-être un trésor.",
      "🦕 « Enlever le déguisement », sous le menu, range la neige et tout le décor.",
    ],
    bouton: "❄️ C’est parti !",
  },

  diplome,

  // Pages propres au thème, hors plan du site. `outils` : { page, esc, site } (tools/templates.mjs).
  pages: (outils) => [pageDiplome(outils, diplome)],

  // Réglages lus par les scripts du thème (window.THEME.reglages).
  reglages: {
    // La neige qui tombe et s'entasse (neige.js).
    neige: {
      hauteurMax: 1 / 3,     // part de la hauteur de l'écran que la neige peut couvrir
      hauteurMaxJeux: 0.1,   // sur les pages de jeux (jeux/…), pour ne pas gêner la partie
      duree: 120,            // secondes pour atteindre la hauteur maximale
    },
    // La touche de Noël, en décembre (hiver.js). Pour l'essayer un autre mois :
    // ajouter #noel au bout de l'adresse ; pour le cadeau du 25 : #25-decembre.
    noel: {
      message: "Joyeux Noël !",
      detail: "Il neige sur le monde des dinosaures.",
      cadeau: {
        message: `Joyeux Noël, ${PRENOM} !`, // espace insécable : le « ! » reste avec le prénom
        sousTitre: "Le monde des dinosaures te souhaite de très belles fêtes.",
      },
    },
  },
};
