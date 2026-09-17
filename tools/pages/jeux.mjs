// Hub des jeux et les cinq mini-jeux.

import { dinos } from "../data/dinos.mjs";
import { quiz, vraiFaux } from "../data/jeux.mjs";
import { page, esc } from "../templates.mjs";

const LISTE = [
  { slug: "quiz", emoji: "❓", nom: "Le grand quiz", court: `10 questions tirées au hasard parmi ${quiz.length}, réparties sur trois niveaux.`, duree: "5 min" },
  { slug: "vrai-ou-faux", emoji: "⚖️", nom: "Vrai ou faux", court: `${vraiFaux.length} affirmations sur les dinosaures. Sauras-tu démêler le vrai du faux ?`, duree: "4 min" },
  { slug: "qui-suis-je", emoji: "🔍", nom: "Qui suis-je ?", court: "Une silhouette mystère et des indices. Moins tu en demandes, plus tu marques de points.", duree: "6 min" },
  { slug: "memory", emoji: "🧠", nom: "Memory", court: "Retrouve les 8 paires de dinosaures en un minimum de coups.", duree: "3 min" },
  { slug: "puzzle", emoji: "🧩", nom: "Puzzle", court: "Reconstitue l’illustration d’un dinosaure, en 9 ou 16 morceaux.", duree: "5 min" },
];

const entetePartie = (id, libelleGauche) => `
  <div class="jeu__entete">
    <p id="${id}-numero" style="margin:0;font-weight:800">${libelleGauche}</p>
    <p class="jeu__score" style="margin:0"><span id="${id}-score">⭐ 0 point</span></p>
  </div>
  <div class="jeu__progression"><span id="${id}-progression"></span></div>
  <p id="${id}-annonce" class="visuellement-cache" role="status" aria-live="polite"></p>`;

function pageJeu({ slug, titre, emoji, intro, corpsJeu, script, description }) {
  const corps = `
<div class="conteneur section">
  <h1>${emoji} ${esc(titre)}</h1>
  <p style="max-width:66ch">${intro}</p>
  ${corpsJeu}
  <p style="margin-top:2rem"><a class="bouton bouton--secondaire" href="../jeux.html">← Tous les jeux</a></p>
</div>`;

  return {
    chemin: `jeux/${slug}.html`,
    html: page({
      titre,
      description,
      base: "../",
      actif: "jeux",
      corps,
      scripts: ["assets/js/donnees.js", "assets/js/jeux/commun.js", `assets/js/jeux/${script}`],
      filAriane: [
        { nom: "Accueil", href: "index.html" },
        { nom: "Les jeux", href: "jeux.html" },
        { nom: titre },
      ],
    }),
  };
}

export function pagesJeux() {
  const pages = [];

  /* --- Hub --- */
  pages.push({
    chemin: "jeux.html",
    html: page({
      titre: "Les jeux",
      description: "Cinq mini-jeux gratuits sur les dinosaures : quiz, vrai ou faux, devinettes, memory et puzzle. Aucun compte, aucune donnée enregistrée.",
      actif: "jeux",
      corps: `
<div class="conteneur section">
  <h1>🎮 La salle de jeux</h1>
  <p style="max-width:68ch">Cinq jeux pour t’amuser tout en apprenant. Rien n’est enregistré et il n’y a pas de compte à créer :
  tu peux rejouer autant de fois que tu veux, les questions changent à chaque partie !</p>

  <div class="grille grille--large" style="margin-top:2rem">
    ${LISTE.map(
      (j, i) => `<a class="carte" href="jeux/${j.slug}.html" data-anim data-delai="${i}">
      <span class="carte__media" style="padding:1.8rem;text-align:center;font-size:3rem" aria-hidden="true">${j.emoji}</span>
      <span class="carte__corps">
        <span class="carte__titre" style="font-weight:800;font-size:1.2rem">${esc(j.nom)}</span>
        <span class="carte__texte">${esc(j.court)}</span>
        <span class="carte__pastilles"><span class="pastille">⏱️ environ ${j.duree}</span></span>
      </span>
    </a>`
    ).join("\n    ")}
  </div>

  <div class="encadre" style="margin-top:2.5rem">
    <h2 class="encadre__titre">💡 Un conseil</h2>
    <p style="margin-bottom:0">Avant de jouer, va lire quelques <a href="dinosaures.html">fiches de dinosaures</a> :
    tu y trouveras toutes les réponses ! Et si un mot compliqué te bloque, le <a href="glossaire.html">glossaire</a> est là pour ça.</p>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Les jeux" }],
    }),
  });

  /* --- Quiz --- */
  pages.push(
    pageJeu({
      slug: "quiz",
      titre: "Le grand quiz",
      emoji: "❓",
      description: `Un quiz gratuit de ${quiz.length} questions sur les dinosaures, pour les enfants. Trois niveaux de difficulté, une explication après chaque réponse.`,
      intro: `Dix questions tirées au hasard parmi ${quiz.length}. Après chaque réponse, tu découvres l’explication.
      Les questions changent à chaque partie : tu peux rejouer autant de fois que tu veux !`,
      script: "quiz.js",
      corpsJeu: `
  <div class="jeu" id="quiz">
    <div id="quiz-jeu">
      ${entetePartie("quiz", "Question 1 / 10")}
      <h2 class="question" id="quiz-question" tabindex="-1">Chargement…</h2>
      <div class="reponses" id="quiz-reponses"></div>
      <div class="retour" id="quiz-retour" hidden role="status"></div>
      <p style="margin:1.2rem 0 0"><button type="button" class="bouton" id="quiz-suivant" hidden>Suivant →</button></p>
    </div>
    <div id="quiz-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner. Tu peux quand même lire toutes les <a href="../dinosaures.html">fiches des dinosaures</a> !</p></noscript>
  </div>`,
    })
  );

  /* --- Vrai ou faux --- */
  pages.push(
    pageJeu({
      slug: "vrai-ou-faux",
      titre: "Vrai ou faux",
      emoji: "⚖️",
      description: "Vrai ou faux sur les dinosaures : 10 affirmations pièges et leurs explications, un jeu éducatif gratuit pour les enfants.",
      intro: `Dix affirmations sur les dinosaures. À toi de dire si c’est vrai… ou complètement faux !
      Attention, certaines sont de vrais pièges.`,
      script: "vrai-faux.js",
      corpsJeu: `
  <div class="jeu" id="vf">
    <div id="vf-jeu">
      ${entetePartie("vf", "Affirmation 1 / 10")}
      <h2 class="question" id="vf-affirmation" tabindex="-1">Chargement…</h2>
      <div class="reponses">
        <button type="button" class="reponse" data-reponse="vrai"><span class="reponse__lettre" aria-hidden="true">👍</span> C’est vrai</button>
        <button type="button" class="reponse" data-reponse="faux"><span class="reponse__lettre" aria-hidden="true">👎</span> C’est faux</button>
      </div>
      <div class="retour" id="vf-retour" hidden role="status"></div>
      <p style="margin:1.2rem 0 0"><button type="button" class="bouton" id="vf-suivant" hidden>Suivant →</button></p>
    </div>
    <div id="vf-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner.</p></noscript>
  </div>`,
    })
  );

  /* --- Qui suis-je --- */
  pages.push(
    pageJeu({
      slug: "qui-suis-je",
      titre: "Qui suis-je ?",
      emoji: "🔍",
      description: "Devine le dinosaure caché grâce à des indices progressifs. Un jeu de devinettes éducatif et gratuit pour les enfants.",
      intro: `Une silhouette mystère se cache derrière l’ombre. Demande des indices, puis devine de quelle créature il s’agit.
      Attention : plus tu demandes d’indices, moins la manche rapporte de points !`,
      script: "qui-suis-je.js",
      corpsJeu: `
  <div class="jeu" id="qsj">
    <div id="qsj-jeu">
      ${entetePartie("qsj", "Manche 1 / 6")}
      <div class="silhouette-mystere" id="qsj-silhouette" data-revele="false" style="max-width:340px;margin:1.2rem auto"></div>
      <ul class="indices" id="qsj-indices"></ul>
      <p><button type="button" class="bouton bouton--ambre bouton--petit" id="qsj-indice">🔍 Donne-moi un indice</button></p>
      <h2 class="question" style="font-size:1.1rem">Qui suis-je ?</h2>
      <div class="reponses" id="qsj-choix"></div>
      <div class="retour" id="qsj-retour" hidden role="status"></div>
      <p style="margin:1.2rem 0 0"><button type="button" class="bouton" id="qsj-suivant" hidden>Suivant →</button></p>
    </div>
    <div id="qsj-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner.</p></noscript>
  </div>`,
    })
  );

  /* --- Memory --- */
  pages.push(
    pageJeu({
      slug: "memory",
      titre: "Memory des dinosaures",
      emoji: "🧠",
      description: "Jeu de memory gratuit avec des illustrations de dinosaures : retrouve les 8 paires en un minimum de coups.",
      intro: `Retourne les cartes deux par deux et retrouve les 8 paires de dinosaures.
      Essaie de battre ton record : moins de 12 coups, c’est déjà très fort !`,
      script: "memory.js",
      corpsJeu: `
  <div class="jeu">
    <div class="jeu__entete">
      <p class="jeu__score" style="margin:0">
        <span>🔄 Coups : <span id="memory-coups">0</span></span>
        <span>🎯 Paires : <span id="memory-paires">0 / 8</span></span>
        <span>⏱️ <span id="memory-temps">0 s</span></span>
      </p>
      <button type="button" class="bouton bouton--secondaire bouton--petit" id="memory-rejouer">🔄 Recommencer</button>
    </div>
    <p id="memory-annonce" class="visuellement-cache" role="status" aria-live="polite"></p>
    <div class="memory" id="memory"></div>
    <div id="memory-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner.</p></noscript>
  </div>`,
    })
  );

  /* --- Puzzle --- */
  pages.push(
    pageJeu({
      slug: "puzzle",
      titre: "Puzzle des dinosaures",
      emoji: "🧩",
      description: "Puzzle gratuit en ligne : reconstitue l’illustration d’un dinosaure en 9 ou 16 morceaux, directement au doigt sur tablette.",
      intro: `Les morceaux de l’image ont été mélangés ! Touche une pièce, puis une autre, pour les échanger.
      Quand tout est remis en place, le puzzle est résolu.`,
      script: "puzzle.js",
      corpsJeu: `
  <div class="jeu">
    <div class="jeu__entete">
      <p class="jeu__score" style="margin:0">
        <span>🦕 <span id="puzzle-nom">…</span></span>
        <span>🔄 Échanges : <span id="puzzle-coups">0</span></span>
      </p>
      <span class="filtres__groupe">
        <span class="filtres__etiquette">Difficulté</span>
        <button type="button" class="puce" data-taille="3" aria-pressed="true">9 pièces</button>
        <button type="button" class="puce" data-taille="4" aria-pressed="false">16 pièces</button>
      </span>
      <button type="button" class="bouton bouton--secondaire bouton--petit" id="puzzle-nouveau">🔄 Autre dino</button>
    </div>
    <p id="puzzle-annonce" class="visuellement-cache" role="status" aria-live="polite"></p>
    <details class="accordeon" style="margin-bottom:1rem">
      <summary>👁️ Voir l’image complète</summary>
      <div id="puzzle-apercu" style="max-width:240px"></div>
    </details>
    <div class="puzzle" id="puzzle"></div>
    <div id="puzzle-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner.</p></noscript>
  </div>`,
    })
  );

  return pages;
}

/** Données JS consommées par les jeux (et rien d'autre). */
export function fichierDonnees() {
  const legers = dinos.map((d) => ({
    slug: d.slug,
    nom: d.nom,
    periode: d.periode,
    famille: d.famille,
    regime: d.regime,
    longueur: d.longueur,
    ageDebut: d.ageDebut,
    lieux: d.lieux,
    comparaison: d.comparaison,
    accroche: d.accroche,
    vraiDino: d.vraiDino,
    saviezVous: d.saviezVous,
    img: `assets/img/dinos/${d.slug}.svg`,
    imgPuzzle: `assets/img/puzzle/${d.slug}.svg`,
    url: `dinosaures/${d.slug}.html`,
  }));

  return `/* Données générées automatiquement par tools/build.mjs — ne pas modifier à la main. */
window.DINOS = ${JSON.stringify(legers)};
window.QUIZ = ${JSON.stringify(quiz)};
window.VRAIFAUX = ${JSON.stringify(vraiFaux)};
`;
}
