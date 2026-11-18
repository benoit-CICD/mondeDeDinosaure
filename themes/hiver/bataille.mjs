// La page du jeu « La bataille de boules de neige », qui n'existe que pendant le
// thème d'hiver (voir `jeux` et `pages` dans theme.mjs). Le jeu est dans bataille.js.
// Les outils du générateur arrivent en paramètre : ce dossier n'importe rien de tools/.

export const jeuBataille = {
  slug: "bataille-de-boules-de-neige",
  script: "themes/hiver/bataille.js",
  emoji: "☃️",
  nom: "La bataille de boules de neige",
  court: "Des dinosaures surgissent des tas de neige : vise seulement ceux que demande la consigne !",
  duree: "3 min",
  saison: "❄️ Seulement l’hiver",
};

export function pageBataille({ pageJeu, entetePartie }) {
  const j = jeuBataille;
  return pageJeu({
    slug: j.slug,
    titre: j.nom,
    emoji: j.emoji,
    script: j.script,
    description: "Un jeu d’hiver pour les enfants : des dinosaures surgissent des tas de neige, et il faut viser seulement les herbivores, les carnivores ou ceux du Crétacé.",
    intro: `Des dinosaures surgissent de derrière les tas de neige. Lis bien la consigne : touche seulement ceux qu’elle demande
      pour leur lancer une boule de neige ! Un mauvais lancer coûte un point.`,
    corpsJeu: `
  <div class="jeu" id="bataille">
    <div id="bataille-jeu">
      ${entetePartie("bataille", "Manche 1 / 4")}
      <p class="bataille__consigne" id="bataille-consigne" tabindex="-1">Prêt pour la bataille ?</p>
      <p class="bataille__temps" id="bataille-temps"></p>
      <div class="bataille__terrain" id="bataille-terrain"></div>
      <p class="bataille__message" id="bataille-message" aria-hidden="true"></p>
      <p class="bataille__options">
        <label><input type="checkbox" id="bataille-tranquille"> 🐢 Mode tranquille : les dinosaures restent plus longtemps</label>
      </p>
      <p style="text-align:center;margin:1rem 0 0"><button type="button" class="bouton" id="bataille-commencer">❄️ C’est parti !</button></p>
    </div>
    <div id="bataille-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner.</p></noscript>
  </div>`,
  });
}
