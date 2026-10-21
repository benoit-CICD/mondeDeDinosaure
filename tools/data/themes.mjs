// Thèmes saisonniers (Halloween, et plus tard Noël…).
//
// Le thème affiché est choisi par `theme` dans site.mjs (null : aucun thème).
// Chaque thème a deux fichiers écrits à la main, sur le modèle d'Halloween :
//   assets/css/themes/<id>.css  couleurs et décor, rangés sous html.<id>
//   assets/js/themes/<id>.js    animations et surprises, branchées sur window.Theme
// Le bandeau, le bouton « Enlever le déguisement » et la mémoire de la visite
// sont communs à tous les thèmes (assets/css/themes/commun.css et assets/js/themes/commun.js).

export const themes = {
  halloween: {
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
    // La récompense des 10 citrouilles (tools/pages/halloween.mjs).
    diplome: { prenom: "Noah", fichier: "diplome-citrouilles.html" },
  },
};

/** Le thème choisi dans site.mjs, ou null. */
export function themeActif(site) {
  if (!site.theme) return null;
  const t = themes[site.theme];
  return t ? { id: site.theme, ...t } : { id: site.theme, inconnu: true };
}
