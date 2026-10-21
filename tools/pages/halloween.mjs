// Pages propres au thème d'Halloween : le diplôme des chasseurs de citrouilles.
// Générées seulement quand `theme: "halloween"` dans site.mjs.

import { site } from "../data/site.mjs";
import { themes } from "../data/themes.mjs";
import { page, esc } from "../templates.mjs";

const CITROUILLE = `<svg viewBox="-32 -37 64 64" aria-hidden="true" focusable="false">
  <ellipse rx="30" ry="24" fill="#f28c28"/><ellipse cx="-14" rx="14" ry="23" fill="#e87a17"/>
  <ellipse cx="14" rx="14" ry="23" fill="#e87a17"/><ellipse rx="10" ry="24" fill="#f7a03c"/>
  <path d="M-1 -22q1 -9 8 -12" stroke="#4a7a2c" stroke-width="5" fill="none" stroke-linecap="round"/>
  <g fill="#5a2a05"><path d="M-18 -6l7 -10 5 10z"/><path d="M18 -6l-7 -10 -5 10z"/>
  <path d="M-19 5l5 5 4 -5 4 6 4 -6 4 6 4 -6 4 5 5 -5q-2 13 -19 13t-19 -13z"/></g>
</svg>`;

export function pagesHalloween() {
  const { prenom, fichier } = themes.halloween.diplome;

  /* La page n'est liée nulle part : on l'ouvre depuis la récompense des 10 citrouilles.
     Le diplôme reste sous clé tant que la chasse n'est pas terminée (assets/js/themes/halloween.js). */
  return [
    {
      chemin: fichier,
      horsPlan: true,
      html: page({
        titre: "Diplôme de chasseur de citrouilles",
        description: `La récompense des chasseurs de citrouilles du site ${site.nom}.`,
        indexer: false,
        corps: `
<style>
  /* Seul le diplôme s'imprime, sur une page A4 à l'italienne. */
  @page { size: A4 landscape; margin: 10mm; }
  @media print {
    .entete, .pied, .fil-ariane, .bandeau-theme, .araignee, .cimetiere, .diplome-page__titre,
    .diplome__actions, .lien-evitement { display: none !important; }
    main, .section { padding: 0 !important; margin: 0 !important; }
    .diplome { box-shadow: none; break-inside: avoid; }
  }
</style>
<div class="conteneur section diplome-page">
  <h1 class="diplome-page__titre">🎓 La récompense des chasseurs de citrouilles</h1>

  <div id="diplome-verrou" class="encadre encadre--attention diplome-verrou">
    <h2 class="encadre__titre">🔒 Ce diplôme est encore sous clé</h2>
    <p>Trouve d’abord les 10 nouvelles citrouilles cachées sur le site. L’araignée, en haut à droite de chaque page,
    te donnera des devinettes pour t’aider !</p>
    <p><a class="bouton" href="index.html">🎃 Partir à la chasse</a></p>
  </div>

  <div id="diplome" hidden>
    <div class="diplome">
      <p class="diplome__surtitre">${esc(site.nom)}</p>
      <p class="diplome__titre">Diplôme de chasseur de citrouilles</p>
      <p class="diplome__texte">Ce diplôme est fièrement décerné à</p>
      <p class="diplome__nom">${esc(prenom)}</p>
      <p class="diplome__texte">pour avoir déniché les <strong>10 citrouilles cachées</strong> du site,<br>
      sans avoir peur ni de l’araignée, ni du T-rex fantôme !</p>
      <div class="diplome__bas">
        <p class="diplome__signe"><span class="diplome__signature">L’Araignée</span>Gardienne de la toile</p>
        <div class="diplome__sceau">${CITROUILLE}</div>
        <p class="diplome__signe"><span class="diplome__signature">T-rex fantôme</span>Gardien du cimetière</p>
      </div>
      <p class="diplome__date">Fait le <span id="diplome-date"></span>, pour Halloween.</p>
    </div>
    <p class="diplome__actions">
      <button type="button" class="bouton" id="diplome-imprimer">🖨️ Imprimer mon diplôme</button>
      <a class="bouton bouton--secondaire" href="index.html">🏠 Retour au site</a>
    </p>
  </div>
  <noscript><p class="encadre">Pour voir ton diplôme, il faut activer JavaScript.</p></noscript>
</div>`,
      }),
    },
  ];
}
