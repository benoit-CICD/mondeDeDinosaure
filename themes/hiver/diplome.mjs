// La page du diplôme des chasseurs de flocons d'or, générée seulement quand
// `theme: "hiver"` dans tools/data/site.mjs (voir theme.mjs).
// Les outils du générateur arrivent en paramètre : ce dossier n'importe rien de tools/.

/* Le sceau : un flocon d'or à six branches. */
const FLOCON = (() => {
  const point = (r, a) => `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;
  let d = "";
  for (let k = 0; k < 6; k++) {
    const a = (k * Math.PI) / 3 - Math.PI / 2;
    d += `M0 0L${point(17, a)}`;
    for (const [r, l] of [[9, 5.5], [13.5, 3.8]]) {
      for (const sens of [-1, 1]) {
        const aa = a + (sens * Math.PI) / 4;
        d += `M${point(r, a)}L${(r * Math.cos(a) + l * Math.cos(aa)).toFixed(1)} ${(r * Math.sin(a) + l * Math.sin(aa)).toFixed(1)}`;
      }
    }
  }
  return `<svg viewBox="-20 -20 40 40" aria-hidden="true" focusable="false">
  <path d="${d}" stroke="#9a6a08" stroke-width="4.4" stroke-linecap="round" fill="none"/>
  <path d="${d}" stroke="#f7c948" stroke-width="2.4" stroke-linecap="round" fill="none"/>
  <circle r="3.2" fill="#fff3c4" stroke="#9a6a08" stroke-width="1.2"/>
</svg>`;
})();

export function pageDiplome({ page, esc, site }, { prenom, chemin }) {
  /* Le diplôme est rangé dans themes/hiver/ : deux dossiers sous la racine. */
  const base = "../../";

  /* La page n'est liée nulle part : on l'ouvre depuis la récompense des 10 flocons d'or.
     Le diplôme reste sous clé tant que la chasse n'est pas terminée (chasse.js). */
  return {
    chemin,
    horsPlan: true,
    html: page({
      base,
      titre: "Diplôme de chasseur de flocons d’or",
      description: `La récompense des chasseurs de flocons d’or du site ${site.nom}.`,
      indexer: false,
      corps: `
<style>
  /* Seul le diplôme s'imprime, sur une page A4 à l'italienne. */
  @page { size: A4 landscape; margin: 10mm; }
  @media print {
    .entete, .pied, .fil-ariane, .bandeau-theme, .manchot, .pelle-bouton, .neige, .neige-zone,
    .diplome-page__titre, .diplome__actions, .lien-evitement { display: none !important; }
    main, .section { padding: 0 !important; margin: 0 !important; }
    .diplome { box-shadow: none; break-inside: avoid; }
  }
</style>
<div class="conteneur section diplome-page">
  <h1 class="diplome-page__titre">🎓 La récompense des chasseurs de flocons d’or</h1>

  <div id="diplome-verrou" class="encadre encadre--attention diplome-verrou">
    <h2 class="encadre__titre">🔒 Ce diplôme est encore sous clé</h2>
    <p>Trouve d’abord les 10 flocons d’or cachés sur le site. Le manchot, en bas à gauche de l’écran,
    te donnera des devinettes pour t’aider !</p>
    <p><a class="bouton" href="${base}index.html">❄️ Partir à la chasse</a></p>
  </div>

  <div id="diplome" hidden>
    <div class="diplome">
      <p class="diplome__surtitre">${esc(site.nom)}</p>
      <p class="diplome__titre">Diplôme de chasseur de flocons d’or</p>
      <p class="diplome__texte">Ce diplôme est fièrement décerné à</p>
      <p class="diplome__nom">${esc(prenom)}</p>
      <p class="diplome__texte">pour avoir déniché les <strong>10 flocons d’or</strong> cachés sur le site,<br>
      jusque sous la neige, la pelle à la main !</p>
      <div class="diplome__bas">
        <p class="diplome__signe"><span class="diplome__signature">Le Manchot</span>Guide des glaces</p>
        <div class="diplome__sceau">${FLOCON}</div>
        <p class="diplome__signe"><span class="diplome__signature">Le Bonhomme de neige</span>Gardien de l’accueil</p>
      </div>
      <p class="diplome__date">Fait le <span id="diplome-date"></span>, pendant l’hiver.</p>
    </div>
    <p class="diplome__actions">
      <button type="button" class="bouton" id="diplome-imprimer">🖨️ Imprimer mon diplôme</button>
      <a class="bouton bouton--secondaire" href="${base}index.html">🏠 Retour au site</a>
    </p>
  </div>
  <noscript><p class="encadre">Pour voir ton diplôme, il faut activer JavaScript.</p></noscript>
</div>`,
    }),
  };
}
