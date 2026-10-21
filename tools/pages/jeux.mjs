// Salle de jeux et pages des mini-jeux.

import { dinos } from "../data/dinos.mjs";
import { quiz, vraiFaux, reperes, listeJeux } from "../data/jeux.mjs";
import { oeufs, sansOeuf } from "../data/oeufs.mjs";
import { empreintes, traceurs } from "../data/empreintes.mjs";
import { quizCinema } from "../data/cinema.mjs";
import { combattants, JEUX_AFFRONTEMENT } from "../data/affrontements.mjs";
import { page, esc, enLettres, majuscule } from "../templates.mjs";

const entetePartie = (id, libelleGauche) => `
  <div class="jeu__entete">
    <p id="${id}-numero" style="margin:0;font-weight:800">${libelleGauche}</p>
    <p class="jeu__score" style="margin:0"><span id="${id}-score">⭐ 0 point</span></p>
  </div>
  <div class="jeu__progression"><span id="${id}-progression"></span></div>
  <p id="${id}-annonce" class="visuellement-cache" role="status" aria-live="polite"></p>`;

/* parent : rubrique intermédiaire dans le fil d'Ariane (ex. « Affrontement de dinos »).
   scriptsEnPlus : scripts partagés, chargés avant celui du jeu. */
function pageJeu({ slug, titre, emoji, intro, corpsJeu, script, description, parent = null, scriptsEnPlus = [] }) {
  const corps = `
<div class="conteneur section">
  <h1>${emoji} ${esc(titre)}</h1>
  <p style="max-width:66ch">${intro}</p>
  ${corpsJeu}
  <p style="margin-top:2rem">${parent ? `<a class="bouton bouton--secondaire" href="../${parent.href}">← ${esc(parent.nom)}</a> ` : ""}<a class="bouton bouton--secondaire" href="../jeux.html">← Tous les jeux</a></p>
</div>`;

  return {
    chemin: `jeux/${slug}.html`,
    html: page({
      titre,
      description,
      base: "../",
      actif: "jeux",
      corps,
      scripts: ["assets/js/donnees.js", "assets/js/jeux/commun.js", ...scriptsEnPlus.map((s) => `assets/js/jeux/${s}`), `assets/js/jeux/${script}`],
      filAriane: [
        { nom: "Accueil", href: "index.html" },
        { nom: "Les jeux", href: "jeux.html" },
        ...(parent ? [parent] : []),
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
      description: `${majuscule(enLettres(listeJeux.length))} mini-jeux gratuits sur les dinosaures : quiz, vrai ou faux, devinettes, memory, puzzle, œufs, tailles, frise du temps, empreintes et cinéma. Aucun compte, aucune donnée enregistrée.`,
      actif: "jeux",
      corps: `
<div class="conteneur section">
  <h1>🎮 La salle de jeux</h1>
  <p style="max-width:68ch">${majuscule(enLettres(listeJeux.length))} jeux pour t’amuser tout en apprenant. Rien n’est enregistré et il n’y a pas de compte à créer :
  tu peux rejouer autant de fois que tu veux, les questions changent à chaque partie !</p>

  <div class="grille grille--large" style="margin-top:2rem">
    ${listeJeux.map(
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

  <a class="carte bandeau-rubrique" href="jeux/affrontement-de-dinos.html" style="margin-top:2rem">
    <span class="bandeau-rubrique__emoji" aria-hidden="true">⚔️</span>
    <span class="carte__corps">
      <span class="carte__titre" style="font-weight:800;font-size:1.2rem">Affrontement de dinos</span>
      <span class="carte__texte">Qui gagnerait un face-à-face ? Deux jeux de duels : le Duel de dinosaures et Le roi de la tour.</span>
    </span>
  </a>

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

  /* --- Retrouve la maman --- */
  pages.push(
    pageJeu({
      slug: "retrouve-la-maman",
      titre: "Retrouve la maman",
      emoji: "🥚",
      description: "Jeu éducatif gratuit : rends chaque œuf de dinosaure à ses parents grâce aux indices. Forme, taille, coquille, nid… et attention aux intrus !",
      intro: `Des œufs ont été retrouvés dans un nid, mais à qui sont-ils ? Touche un œuf pour l’examiner, puis touche ses parents.
      Attention : un intrus qui ne pondait pas d’œufs se cache parmi eux ! Besoin d’aide ? Lis le dossier
      <a href="../oeufs.html">Œufs et bébés dinosaures</a>.`,
      script: "oeufs.js",
      corpsJeu: `
  <div class="jeu" id="oeufs">
    <div id="oeufs-jeu">
      ${entetePartie("oeufs", "Manche 1 / 2")}
      <h2 class="question">🪺 Le nid : touche un œuf</h2>
      <div class="nid" id="oeufs-nid"></div>
      <div class="fiche-oeuf" id="oeufs-fiche"><p style="margin:0">Touche un œuf du nid pour l’examiner.</p></div>
      <h2 class="question">👪 À qui est cet œuf ?</h2>
      <div class="choix-grille" id="oeufs-parents"></div>
      <div class="retour" id="oeufs-retour" hidden role="status"></div>
      <p style="margin:1.2rem 0 0"><button type="button" class="bouton" id="oeufs-suivant" hidden>Manche suivante →</button></p>
    </div>
    <div id="oeufs-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner. Tu peux quand même lire le dossier <a href="../oeufs.html">Œufs et bébés dinosaures</a> !</p></noscript>
  </div>`,
    })
  );

  /* --- Plus grand ou plus petit ? --- */
  pages.push(
    pageJeu({
      slug: "plus-grand-ou-plus-petit",
      titre: "Plus grand ou plus petit ?",
      emoji: "📏",
      description: "Jeu gratuit pour les enfants : deux dinosaures face à face, lequel était le plus long, le plus lourd ou le plus rapide ? Dix duels pour comparer les géants.",
      intro: `Deux créatures s’affrontent. Laquelle était la plus longue, la plus lourde ou la plus rapide ? Touche la bonne carte !
      Les chiffres viennent des fiches : ce sont des estimations de scientifiques.`,
      script: "plus-grand.js",
      corpsJeu: `
  <div class="jeu" id="pg">
    <div id="pg-jeu">
      ${entetePartie("pg", "Duel 1 / 10")}
      <h2 class="question" id="pg-question" tabindex="-1">Chargement…</h2>
      <div class="duel" id="pg-duel"></div>
      <div class="retour" id="pg-retour" hidden role="status"></div>
      <p style="margin:1.2rem 0 0"><button type="button" class="bouton" id="pg-suivant" hidden>Duel suivant →</button></p>
    </div>
    <div id="pg-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner.</p></noscript>
  </div>`,
    })
  );

  /* --- La machine à remonter le temps --- */
  pages.push(
    pageJeu({
      slug: "machine-a-remonter-le-temps",
      titre: "La machine à remonter le temps",
      emoji: "⏳",
      description: "Jeu éducatif gratuit : range les dinosaures du plus ancien au plus récent, avec quelques intrus comme le mammouth ou l’astéroïde. Pour comprendre la frise du temps.",
      intro: `Oups, la machine à remonter le temps a tout mélangé ! Range les cartes de la plus ancienne à la plus récente.
      Des intrus se glissent parfois dans le voyage : une glaciation, un astéroïde, un mammouth…
      Pour réviser, jette un œil à la <a href="../frise.html">frise du temps</a>.`,
      script: "machine-temps.js",
      corpsJeu: `
  <div class="jeu" id="mt">
    <div id="mt-jeu">
      ${entetePartie("mt", "Voyage 1 / 6")}
      <h2 class="question" id="mt-question" tabindex="-1">Du plus ancien au plus récent</h2>
      <p class="consigne">Touche les cartes dans l’ordre, en commençant par la plus ancienne. Touche une case remplie pour la vider.</p>
      <ol class="cases" id="mt-cases"></ol>
      <div class="choix-grille cartes-temps" id="mt-cartes"></div>
      <p style="margin:1.2rem 0 0"><button type="button" class="bouton" id="mt-verifier" disabled>⏳ Vérifier</button></p>
      <div class="retour" id="mt-retour" hidden role="status"></div>
      <p style="margin:1.2rem 0 0"><button type="button" class="bouton" id="mt-suivant" hidden>Voyage suivant →</button></p>
    </div>
    <div id="mt-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner. Tu peux quand même explorer la <a href="../frise.html">frise du temps</a> !</p></noscript>
  </div>`,
    })
  );

  /* --- Détective des empreintes --- */
  pages.push(
    pageJeu({
      slug: "detective-des-empreintes",
      titre: "Détective des empreintes",
      emoji: "🐾",
      description: "Jeu éducatif gratuit : une empreinte fossile dans la roche, qui l’a laissée ? Compte les doigts, observe les griffes et la taille pour trouver le coupable.",
      intro: `Des paléontologues ont découvert une empreinte dans la roche. Compte les doigts, regarde s’ils ont des griffes,
      vérifie la taille de la trace… puis désigne le suspect !`,
      script: "empreintes.js",
      corpsJeu: `
  <div class="jeu" id="emp">
    <div id="emp-jeu">
      ${entetePartie("emp", "Empreinte 1 / ${empreintes.length}")}
      <div class="empreinte-scene">
        <img id="emp-image" alt="Empreinte fossile à identifier" width="240" height="240">
        <p id="emp-taille"></p>
      </div>
      <h2 class="question" id="emp-question" tabindex="-1">Qui a laissé cette empreinte ?</h2>
      <p><button type="button" class="bouton bouton--ambre bouton--petit" id="emp-indice">💡 Un indice</button></p>
      <p class="indice-texte" id="emp-indice-texte" hidden></p>
      <div class="choix-grille" id="emp-choix"></div>
      <div class="retour" id="emp-retour" hidden role="status"></div>
      <p style="margin:1.2rem 0 0"><button type="button" class="bouton" id="emp-suivant" hidden>Empreinte suivante →</button></p>
    </div>
    <div id="emp-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner.</p></noscript>
  </div>`,
    })
  );

  /* --- Le quiz du cinéma --- */
  pages.push(
    pageJeu({
      slug: "quiz-du-cinema",
      titre: "Le quiz du cinéma",
      emoji: "🍿",
      description: `Quiz gratuit sur les dinosaures au cinéma et dans les dessins animés : Jurassic Park, Toy Story, Le Petit Dinosaure… 20 questions, en mode facile ou difficile.`,
      intro: `Jurassic Park, Toy Story, Le Petit Dinosaure, King Kong… Connais-tu les dinosaures des films ?
      Choisis ton niveau, puis réponds à 20 questions. Les réponses se trouvent dans la rubrique
      <a href="../cinema.html">Les dinosaures au cinéma</a>.`,
      script: "quiz-cinema.js",
      corpsJeu: `
  <div class="jeu" id="qc">
    <div id="qc-niveaux" class="niveaux">
      <h2 class="question" id="qc-choix-titre" tabindex="-1">Choisis ton niveau</h2>
      <div class="niveaux__choix">
        <button type="button" class="niveau" data-niveau="facile">
          <span class="niveau__emoji" aria-hidden="true">🍿</span>
          <span class="niveau__nom">Facile</span>
          <span class="niveau__texte">Dessins animés, Jurassic Park et les grandes erreurs des films. Pour commencer en douceur.</span>
          <span class="pastille">${quizCinema.facile.length} questions possibles</span>
        </button>
        <button type="button" class="niveau niveau--difficile" data-niveau="difficile">
          <span class="niveau__emoji" aria-hidden="true">🎬</span>
          <span class="niveau__nom">Difficile</span>
          <span class="niveau__texte">Vieux films, effets spéciaux, secrets de tournage et science. Pour les experts !</span>
          <span class="pastille">${quizCinema.difficile.length} questions possibles</span>
        </button>
      </div>
    </div>
    <div id="qc-jeu" hidden>
      ${entetePartie("qc", "Question 1 / 20")}
      <p id="qc-niveau" class="consigne" style="margin:.6rem 0 0"></p>
      <h2 class="question" id="qc-question" tabindex="-1">Chargement…</h2>
      <div class="reponses" id="qc-reponses"></div>
      <div class="retour" id="qc-retour" hidden role="status"></div>
      <p style="margin:1.2rem 0 0"><button type="button" class="bouton" id="qc-suivant" hidden>Suivant →</button></p>
    </div>
    <div id="qc-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner. Tu peux quand même lire la rubrique <a href="../cinema.html">Les dinosaures au cinéma</a> !</p></noscript>
  </div>`,
    })
  );

  /* --- Affrontement de dinos : la rubrique et ses deux jeux --- */
  const rubrique = { nom: "Affrontement de dinos", href: "jeux/affrontement-de-dinos.html" };
  const [jeuDuel, jeuTour] = JEUX_AFFRONTEMENT.map((slug) => listeJeux.find((j) => j.slug === slug));
  const classement = [...combattants].sort((a, b) => b.puissance - a.puissance);

  pages.push({
    chemin: rubrique.href,
    html: page({
      titre: "Affrontement de dinos",
      description: "Qui gagnerait un face-à-face entre deux dinosaures ? Deux jeux gratuits pour les enfants : le Duel de dinosaures et Le roi de la tour, avec des explications scientifiques.",
      base: "../",
      actif: "jeux",
      corps: `
<div class="conteneur section">
  <h1>⚔️ Affrontement de dinos</h1>
  <p class="fiche__accroche" style="max-width:66ch">Et si deux dinosaures se retrouvaient face à face… lequel l’emporterait ?
  Fais tes pronostics, regarde le combat, puis découvre pourquoi le vainqueur a gagné.</p>

  <div class="grille grille--deux" style="margin-top:2rem">
    ${[jeuDuel, jeuTour]
      .map(
        (j, i) => `<a class="carte carte-affrontement" href="${j.slug}.html" data-anim data-delai="${i}">
      <span class="carte__media carte-affrontement__media" aria-hidden="true">${j.emoji}</span>
      <span class="carte__corps">
        <span class="carte__titre" style="font-weight:800;font-size:1.3rem">${esc(j.nom)}</span>
        <span class="carte__texte">${esc(j.court)}</span>
        <span class="carte__pastilles"><span class="pastille">⏱️ environ ${j.duree}</span></span>
      </span>
    </a>`
      )
      .join("\n    ")}
  </div>

  <div class="grille grille--deux" style="align-items:start;margin-top:2.5rem">
    <div class="prose">
      <h2>Comment sait-on qui gagne ?</h2>
      <p>Personne n’a jamais vu deux dinosaures se battre ! Et beaucoup d’entre eux ne se sont jamais rencontrés : ils ont vécu
      à des millions d’années d’écart, ou sur des continents différents. Ces duels sont donc <strong>imaginaires</strong>.</p>
      <p>Pour désigner le vainqueur, le jeu compare ce que les fossiles nous apprennent :</p>
      <ul>
        <li><strong>le poids</strong>, le plus important : un géant a souvent l’avantage ;</li>
        <li><strong>les armes</strong> : dents, griffes, cornes, massue de queue… ;</li>
        <li><strong>les protections</strong> : armure, collerette osseuse, crâne épais… ;</li>
        <li><strong>la vitesse</strong>, un petit bonus pour les plus rapides.</li>
      </ul>
      <p>Tout cela donne une note de <strong>puissance</strong>. Quand deux dinosaures sont très proches, le jeu annonce un
      « duel serré » : là, même les paléontologues ne seraient pas d’accord entre eux !</p>
    </div>
    <div>
      <div class="encadre encadre--attention">
        <h2 class="encadre__titre">🦕 Seulement des dinosaures</h2>
        <p style="margin-bottom:0">Les ptérosaures et les reptiles marins, comme le Mosasaure, ne participent pas :
        ce ne sont pas des dinosaures, et ils vivaient dans les airs ou dans la mer, où le jeu ne saurait pas les comparer aux autres.</p>
      </div>
      <details class="accordeon">
        <summary>📊 Voir le classement de puissance</summary>
        <div>
          <p style="margin-top:0">Attention, ça donne beaucoup de réponses !</p>
          <table class="tableau-info classement-puissance">
            <thead><tr><th scope="col">#</th><th scope="col">Dinosaure</th><th scope="col">Puissance</th></tr></thead>
            <tbody>
              ${classement
                .map(
                  (d, i) => `<tr><td>${i + 1}</td><td><a href="../dinosaures/${d.slug}.html">${esc(d.nom)}</a></td><td>${String(d.puissance).replace(".", ",")}</td></tr>`
                )
                .join("\n              ")}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Les jeux", href: "jeux.html" }, { nom: rubrique.nom }],
    }),
  });

  pages.push(
    pageJeu({
      slug: jeuDuel.slug,
      titre: jeuDuel.nom,
      emoji: jeuDuel.emoji,
      parent: rubrique,
      scriptsEnPlus: ["affrontement.js"],
      script: jeuDuel.script,
      description: "Jeu gratuit pour les enfants : deux dinosaures face à face, lequel gagne ? Cinq duels avec des explications sur leurs armes, leur poids et leurs protections.",
      intro: `Cinq duels, deux dinosaures à chaque fois. Touche celui qui, selon toi, gagnera le combat !
      Ensuite, découvre sa puissance et pourquoi il l’emporte. Les combattants changent à chaque partie.`,
      corpsJeu: `
  <div class="jeu" id="duel">
    <div id="duel-jeu">
      ${entetePartie("duel", "Manche 1 / 5")}
      <h2 class="question" id="duel-question" tabindex="-1">Qui gagne ce duel ?</h2>
      <div id="duel-arene" class="arene"></div>
      <div class="retour" id="duel-retour" hidden role="status"></div>
      <p style="margin:1.2rem 0 0"><button type="button" class="bouton" id="duel-suivant" hidden>Duel suivant →</button></p>
    </div>
    <div id="duel-fin" hidden></div>
    <noscript><p class="retour">Ce jeu a besoin de JavaScript pour fonctionner.</p></noscript>
  </div>`,
    })
  );

  pages.push(
    pageJeu({
      slug: jeuTour.slug,
      titre: jeuTour.nom,
      emoji: jeuTour.emoji,
      parent: rubrique,
      scriptsEnPlus: ["affrontement.js"],
      script: jeuTour.script,
      description: "Jeu gratuit pour les enfants : un tournoi de dinosaures sur 10 étages. Devine le vainqueur de chaque duel et découvre le roi de la tour !",
      intro: `Au pied de la tour, deux dinosaures s’affrontent. Le vainqueur monte d’un étage… où l’attend un challenger encore plus fort !`,
      corpsJeu: `
  <ol class="regles-tour">
    <li>⚔️ Touche le dinosaure qui, selon toi, va gagner le duel.</li>
    <li>⬆️ Le vrai vainqueur monte d’un étage et affronte un nouveau challenger.</li>
    <li>❤️ Tu as 3 vies : chaque erreur t’en fait perdre une.</li>
    <li>👑 Atteins le 10ᵉ étage pour découvrir le roi de la tour !</li>
  </ol>
  <div class="jeu" id="tour">
    <div id="tour-jeu">
      <div class="jeu__entete">
        <p id="tour-numero" style="margin:0;font-weight:800">Étage 1 / 10</p>
        <p class="jeu__score" style="margin:0"><span id="tour-vies" class="tour-vies" role="img" aria-label="3 vies">❤️❤️❤️</span> <span id="tour-score">⭐ 0</span></p>
      </div>
      <div class="jeu__progression"><span id="tour-progression"></span></div>
      <p id="tour-annonce" class="visuellement-cache" role="status" aria-live="polite"></p>
      <div class="tour-plateau">
        <div class="tour" id="tour-tour" aria-hidden="true">
          <ol class="tour__etages" id="tour-etages"></ol>
          <div class="tour__sol">Départ</div>
          <div class="tour__pion" id="tour-pion" hidden><img src="" alt="" width="60" height="60"></div>
          <p class="tour__flash" id="tour-flash"></p>
        </div>
        <div class="tour-combat">
          <p class="tour-etat" id="tour-etat"></p>
          <h2 class="question" id="tour-question" tabindex="-1">Qui monte à l’étage 1 ?</h2>
          <div id="tour-arene" class="arene"></div>
          <div class="retour" id="tour-retour" hidden role="status"></div>
          <p style="margin:1.2rem 0 0"><button type="button" class="bouton" id="tour-suivant" hidden>Étage suivant →</button></p>
        </div>
      </div>
    </div>
    <div id="tour-fin" hidden></div>
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
    poids: d.poids,
    vitesse: d.vitesse,
    ageDebut: d.ageDebut,
    ageFin: d.ageFin,
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
window.OEUFS = ${JSON.stringify(oeufs.map(({ id, parent, indices, aide, explication }) => ({ id, parent, indices, aide, explication })))};
window.SANS_OEUF = ${JSON.stringify(sansOeuf)};
window.EMPREINTES = ${JSON.stringify(empreintes.map(({ id, auteur, taille, indice, explication }) => ({ id, auteur, taille, indice, explication })))};
window.TRACEURS = ${JSON.stringify(traceurs)};
window.REPERES = ${JSON.stringify(reperes)};
window.QUIZ_CINEMA = ${JSON.stringify(quizCinema)};
window.AFFRONTEMENTS = ${JSON.stringify(combattants)};
`;
}
