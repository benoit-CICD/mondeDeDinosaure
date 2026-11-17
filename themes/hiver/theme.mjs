// Le thème d'hiver : la neige tombe et s'entasse en bas de l'écran, une pelle
// pour déneiger, un décor enneigé… et une touche de Noël en décembre.
//
// Ce dossier contient tout le thème :
//   theme.mjs     ces réglages, lus par le générateur (tools/build.mjs)
//   hiver.css     couleurs et décor (html.hiver), touche de Noël (html.hiver.noel)
//   hiver.js      la touche de Noël en décembre
//   neige.js      la neige qui tombe et s'entasse, et la pelle
//   accueil.mjs   décor de la scène de l'accueil (bonhomme de neige, sapin…)

import { fond, devant } from "./accueil.mjs";

export default {
  nom: "l’hiver",                  // « Pendant l’hiver, … » (pages Confidentialité et Accessibilité)
  deNom: "d’hiver",                // « le thème d’hiver », « le déguisement d’hiver »
  emoji: "❄️",
  message: "Il neige sur le monde des dinosaures !",
  detail: "Le site a mis son manteau d’hiver.", // masqué sur téléphone pour garder un bandeau court
  // Ce que le thème garde le temps de la visite, en plus du choix « thème éteint »
  // (affiché sur la page Confidentialité).
  memoire: ["la hauteur de la neige tombée sur l’écran"],
  // Ce que le thème garde d'une visite à l'autre, sur l'appareil (localStorage).
  memoireDurable: ["le fait d’avoir déjà lu l’annonce des nouveautés"],
  // Ce qui se manipule au clavier (affiché sur la page Accessibilité).
  clavier: "La neige se déblaie aussi au clavier : le bouton « Prendre la pelle » déneige alors tout l’écran d’un coup.",

  // Feuilles de style et scripts de ce dossier, chargés après ceux de themes/commun/.
  css: ["hiver.css"],
  js: ["hiver.js", "neige.js"],

  // Décor ajouté à la scène de l'accueil.
  accueil: { fond, devant },

  // La fenêtre des nouveautés, une seule fois sur l'accueil (gardée d'une visite à l'autre).
  // Pour une prochaine annonce : changer la clé et le texte.
  annonce: {
    cle: "annonce-hiver",
    emoji: "❄️",
    titre: "Il neige sur le site !",
    texte: "La neige tombe sur le monde des dinosaures… et elle <strong>s’entasse en bas de l’écran</strong> !",
    liste: [
      "🧤 Appuie sur <strong>Prendre la pelle</strong>, en bas à droite, puis passe la pelle sur la neige pour déneiger.",
      "🦕 « Enlever le déguisement », sous le menu, range la neige et tout le décor.",
    ],
    bouton: "❄️ C’est parti !",
  },

  // Réglages lus par les scripts du thème (window.THEME.reglages).
  reglages: {
    // La neige qui tombe et s'entasse (neige.js).
    neige: {
      hauteurMax: 1 / 3,     // part de la hauteur de l'écran que la neige peut couvrir
      hauteurMaxJeux: 0.1,   // sur les pages de jeux (jeux/…), pour ne pas gêner la partie
      duree: 120,            // secondes pour atteindre la hauteur maximale
    },
    // La touche de Noël, en décembre (hiver.js). Pour l'essayer un autre mois :
    // ajouter #noel au bout de l'adresse.
    noel: {
      message: "Joyeux Noël !",
      detail: "Il neige sur le monde des dinosaures.",
    },
  },
};
