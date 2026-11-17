// Les thèmes saisonniers du site : un dossier par thème (Halloween, et bientôt l'hiver…).
//
// Le thème affiché se choisit avec `theme` dans tools/data/site.mjs (null : aucun thème).
// Chaque thème a son dossier themes/<id>/, qui contient tout ce qui lui est propre :
// ses réglages dans theme.mjs (sur le modèle de themes/halloween/theme.mjs), ses feuilles
// de style, ses scripts, son décor et ses pages. Le dossier themes/commun/ fournit à tous
// les thèmes le bandeau, le bouton « Enlever le déguisement » et la mémoire de la visite.
//
// Pour ajouter un thème : créer son dossier, puis le déclarer ci-dessous.

import halloween from "./halloween/theme.mjs";

export const themes = { halloween };

/** Le thème choisi dans site.mjs, ou null. */
export function themeActif(site) {
  if (!site.theme) return null;
  const t = themes[site.theme];
  return t ? { id: site.theme, ...t } : { id: site.theme, inconnu: true };
}

/** Les feuilles de style et les scripts d'un thème, depuis la racine du site :
    ceux de themes/commun/ d'abord, puis ceux du dossier du thème. */
export function fichiersDuTheme(theme) {
  if (!theme || theme.inconnu) return { css: [], js: [] };
  return {
    css: ["themes/commun/commun.css", ...theme.css.map((f) => `themes/${theme.id}/${f}`)],
    js: ["themes/commun/commun.js", ...theme.js.map((f) => `themes/${theme.id}/${f}`)],
  };
}
