// La page du jeu « La bataille de boules de neige », qui n'existe que pendant le
// thème d'hiver (voir `jeux` et `pages` dans theme.mjs). Le jeu est dans bataille.js.
// Les outils du générateur arrivent en paramètre : ce dossier n'importe rien de tools/.

export const jeuBataille = {
  slug: "bataille-de-boules-de-neige",
  script: "themes/hiver/bataille.js",
  emoji: "☃️",
  nom: "La bataille de boules de neige",
  court: "Des dinosaures surgissent des tas de neige : vise-les avec tes boules de neige ! Trois niveaux, du plus simple au plus malin.",
  duree: "1 à 2 min",
  saison: "❄️ Seulement l’hiver",
};

export function pageBataille({ pageJeu, entetePartie }) {
  const j = jeuBataille;
  return pageJeu({
    slug: j.slug,
    titre: j.nom,
    emoji: j.emoji,
    script: j.script,
    description: "Un jeu d’hiver pour les enfants : des dinosaures surgissent des tas de neige, il faut les toucher avec des boules de neige. Trois niveaux : tous les dinosaures, seulement les raptors, ou selon la consigne.",
    intro: `Des dinosaures surgissent de derrière les tas de neige : touche-les pour leur lancer une boule de neige !
      Choisis ton niveau : au plus difficile, il faut bien regarder qui sort avant de viser.`,
    corpsJeu: `
  <div class="jeu" id="bataille">
    <div id="bataille-niveaux" class="niveaux">
      <h2 class="question" id="bataille-choix-titre" tabindex="-1">Choisis ton niveau</h2>
      <div class="niveaux__choix">
        <button type="button" class="niveau" data-niveau="facile">
          <span class="niveau__emoji" aria-hidden="true">⛄</span>
          <span class="niveau__nom">Facile</span>
          <span class="niveau__texte">Touche le plus de dinosaures possible en 60 secondes. Ils comptent tous !</span>
          <span class="pastille">1 manche · 60 secondes</span>
        </button>
        <button type="button" class="niveau niveau--moyen" data-niveau="moyen">
          <span class="niveau__emoji" aria-hidden="true">🪶</span>
          <span class="niveau__nom">Moyen</span>
          <span class="niveau__texte">Vise seulement les raptors. Attention aux pièges : certains ont « raptor » dans leur nom sans en être !</span>
          <span class="pastille">2 manches · 20 secondes</span>
        </button>
        <button type="button" class="niveau niveau--difficile" data-niveau="difficile">
          <span class="niveau__emoji" aria-hidden="true">🎯</span>
          <span class="niveau__nom">Difficile</span>
          <span class="niveau__texte">À chaque manche, une nouvelle consigne : herbivores, carnivores, Crétacé… Un mauvais lancer coûte un point.</span>
          <span class="pastille">4 manches · 15 secondes</span>
        </button>
      </div>
    </div>
    <div id="bataille-jeu" hidden>
      ${entetePartie("bataille", "Manche 1 / 4")}
      <p class="bataille__consigne" id="bataille-consigne" tabindex="-1"></p>
      <p class="bataille__regle" id="bataille-regle"></p>
      <ul class="bataille__modeles" id="bataille-modeles" hidden></ul>
      <div class="bataille__chrono" id="bataille-chrono" aria-hidden="true">
        <span class="bataille__chrono-barre"><span id="bataille-chrono-barre"></span></span>
        <span class="bataille__chrono-texte" id="bataille-temps"></span>
      </div>
      <div class="bataille__terrain" id="bataille-terrain">
        <p class="bataille__decompte" id="bataille-decompte" aria-hidden="true" hidden></p>
      </div>
      <p class="bataille__message" id="bataille-message" aria-hidden="true"></p>
    </div>
    <div id="bataille-fin" hidden></div>
    <p class="bataille__options">
      <label><input type="checkbox" id="bataille-tranquille"> 🐢 Mode tranquille : les dinosaures restent plus longtemps</label>
    </p>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner.</p></noscript>
  </div>`,
  });
}
