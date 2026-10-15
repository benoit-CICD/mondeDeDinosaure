// La rubrique « Cinéma » : une page d'accueil et trois dossiers.

import { films, techniques, mythes, quizCinema, pagesRubriqueCinema } from "../data/cinema.mjs";
import { page, esc } from "../templates.mjs";

const VERDICTS = {
  faux: { classe: "alerte", texte: "❌ Erreur du film" },
  vrai: { classe: "herbivore", texte: "✅ Le film a raison" },
  doute: { classe: "piscivore", texte: "❓ On ne sait pas" },
};

/** Onglets pour passer d'une page de la rubrique à l'autre. */
function ongletsCinema(base, cheminActif) {
  return `<nav class="onglets" aria-label="Rubrique cinéma">
    ${pagesRubriqueCinema
      .map((p) =>
        p.chemin === cheminActif
          ? `<span class="onglet" aria-current="page">${p.emoji} ${esc(p.court)}</span>`
          : `<a class="onglet" href="${base}${p.chemin}">${p.emoji} ${esc(p.court)}</a>`
      )
      .join("\n    ")}
    <a class="onglet onglet--jeu" href="${base}jeux/quiz-du-cinema.html">🍿 Le quiz</a>
  </nav>`;
}

/** Encadré d'appel au jeu, en bas de chaque dossier. */
function encadreQuiz(base) {
  return `<div class="encadre encadre--pouvoir" style="margin-top:2.5rem">
    <h2 class="encadre__titre">🍿 Le quiz du cinéma</h2>
    <p>${quizCinema.facile.length + quizCinema.difficile.length} questions sur les dinosaures des films et des dessins animés,
    en deux niveaux : <strong>facile</strong> ou <strong>difficile</strong>. Tout ce qu’il faut savoir est dans cette rubrique !</p>
    <p><a class="bouton bouton--petit" href="${base}jeux/quiz-du-cinema.html">🎬 Jouer au quiz du cinéma</a></p>
  </div>`;
}

const filAriane = (titre) =>
  titre
    ? [{ nom: "Accueil", href: "index.html" }, { nom: "Cinéma", href: "cinema.html" }, { nom: titre }]
    : [{ nom: "Accueil", href: "index.html" }, { nom: "Les dinosaures au cinéma" }];

export function pagesCinema() {
  const pages = [];

  /* ---------- Page d'accueil de la rubrique ---------- */
  pages.push({
    chemin: "cinema.html",
    html: page({
      titre: "Les dinosaures au cinéma",
      description: "Des premiers dessins animés à Jurassic World : l’histoire des dinosaures au cinéma, les effets spéciaux, les erreurs des films et un quiz en deux niveaux, pour les enfants.",
      actif: "cinema",
      corps: `
<div class="conteneur section">
  <h1>🎬 Les dinosaures au cinéma</h1>
  <p class="fiche__accroche" style="max-width:66ch">Depuis plus de cent ans, les dinosaures sont des stars de l’écran.
  Mais les films disent-ils la vérité ? Installe-toi, la séance commence !</p>
  ${ongletsCinema("", "cinema.html")}

  <div class="grille grille--large" style="margin-top:2rem">
    ${pagesRubriqueCinema
      .slice(1)
      .map(
        (p, i) => `<a class="carte" href="${p.chemin}" data-anim data-delai="${i}">
      <span class="carte__media" style="padding:1.6rem;text-align:center;font-size:3rem" aria-hidden="true">${p.emoji}</span>
      <span class="carte__corps">
        <span class="carte__titre" style="font-weight:800;font-size:1.2rem">${esc(p.nom)}</span>
        <span class="carte__texte">${esc(
          {
            "cinema/histoire.html": "De Gertie en 1914 à Planète préhistorique : les films qui ont fait connaître les dinosaures.",
            "cinema/effets-speciaux.html": "Dessins, figurines, robots géants, ordinateurs… et des tortues pour les cris des raptors !",
            "cinema/film-ou-realite.html": "Vélociraptor géant, T-rex qui ne voit pas, mammouths et dinosaures ensemble : démêle le vrai du faux.",
          }[p.chemin]
        )}</span>
      </span>
    </a>`
      )
      .join("\n    ")}
    <a class="carte" href="jeux/quiz-du-cinema.html" data-anim data-delai="3">
      <span class="carte__media" style="padding:1.6rem;text-align:center;font-size:3rem" aria-hidden="true">🍿</span>
      <span class="carte__corps">
        <span class="carte__titre" style="font-weight:800;font-size:1.2rem">Le quiz du cinéma</span>
        <span class="carte__texte">20 questions par partie, en mode facile ou difficile. Es-tu incollable sur les dinosaures des films ?</span>
      </span>
    </a>
  </div>

  <div class="grille grille--deux" style="align-items:start;margin-top:2.5rem">
    <div class="prose">
      <h2>Pourquoi les dinosaures sont-ils des stars ?</h2>
      <p>Des animaux immenses, avec des dents, des cornes et des griffes, qui ont vraiment existé… mais que personne
      n’a jamais vus vivants : c’est le rêve de tout cinéaste ! Le cinéma peut leur redonner vie, au moins le temps d’un film.</p>
      <p>Les dinosaures sont arrivés à l’écran très tôt, dès 1914, à l’époque des films muets en noir et blanc.
      Depuis, chaque génération d’enfants a eu ses dinosaures préférés : Gertie, le Petit Dinosaure, Rex de Toy Story,
      le T-rex de Jurassic Park ou Giganto.</p>

      <h2>Le cinéma et la science</h2>
      <p>Les films ne sont pas des cours de sciences : leur but est de nous émerveiller ou de nous faire peur.
      Alors ils exagèrent souvent. Ils agrandissent les dinosaures, leur inventent du venin ou les font vivre avec les humains.</p>
      <p>Mais le cinéma a aussi aidé la science ! Jurassic Park a donné envie à des milliers d’enfants de devenir
      paléontologues, et les documentaires récents travaillent main dans la main avec les chercheurs.</p>
      <p>Et parfois, c’est la science qui rattrape le cinéma : un grand raptor de la taille de ceux du film a été décrit
      l’année même de la sortie de Jurassic Park !</p>
    </div>

    <div>
      <div class="encadre encadre--attention">
        <h2 class="encadre__titre">⚠️ Avant de regarder un film</h2>
        <p style="margin-bottom:0">Certains films de dinosaures, comme Jurassic Park ou Jurassic World, font vraiment peur.
        Demande à un adulte s’ils sont adaptés à ton âge. Les dessins animés et les documentaires sont un bon début !</p>
      </div>
      <div class="encadre">
        <h2 class="encadre__titre">🇫🇷 Le saviez-tu ?</h2>
        <p style="margin-bottom:0">Le Pyroraptor, un raptor à plumes de Jurassic World : Le Monde d’après, a vraiment existé…
        en France ! Ses os ont été découverts en Provence, après un incendie de forêt. Son nom veut dire « voleur de feu ».</p>
      </div>
      <div class="encadre encadre--pouvoir">
        <h2 class="encadre__titre">🍿 Teste-toi</h2>
        <p>Deux niveaux au choix, ${quizCinema.facile.length + quizCinema.difficile.length} questions en tout.</p>
        <p><a class="bouton bouton--petit" href="jeux/quiz-du-cinema.html">🎬 Le quiz du cinéma</a></p>
      </div>
    </div>
  </div>
</div>`,
      filAriane: filAriane(),
    }),
  });

  /* ---------- L'histoire ---------- */
  const couleurs = ["#c86b3c", "#3f8f6c", "#2f6fa8", "#9e4f8f", "#e09a2c", "#c0392b"];
  pages.push({
    chemin: "cinema/histoire.html",
    html: page({
      titre: "Un siècle de dinosaures à l’écran",
      description: "Gertie le dinosaure, King Kong, Fantasia, Le Petit Dinosaure, Jurassic Park, Toy Story, L’Âge de glace… Plus de cent ans de dinosaures au cinéma, racontés aux enfants.",
      base: "../",
      actif: "cinema",
      corps: `
<div class="conteneur section">
  <h1>🎞️ Un siècle de dinosaures à l’écran</h1>
  <p class="fiche__accroche" style="max-width:66ch">Des dessins à la main aux images d’ordinateur : voici les films
  qui ont fait rugir les dinosaures, du plus ancien au plus récent.</p>
  ${ongletsCinema("../", "cinema/histoire.html")}

  <div class="frise frise--cinema" style="margin-top:2.5rem">
    ${films
      .map(
        (f, i) => `<div class="frise__jalon" data-anim style="--jalon-couleur:${couleurs[i % couleurs.length]}">
      <span class="frise__point" aria-hidden="true"></span>
      <div class="frise__periode">
        <p class="frise__ages">${f.annee} · ${esc(f.genre)}</p>
        <h2 style="margin-bottom:.3rem">${f.emoji} ${esc(f.titre)}</h2>
        <p style="margin-bottom:0">${esc(f.texte)}</p>
      </div>
    </div>`
      )
      .join("\n    ")}
  </div>

  <div class="grille grille--deux" style="margin-top:2rem;align-items:start">
    <div class="encadre">
      <h2 class="encadre__titre">📚 Avant le cinéma : les livres</h2>
      <p>Les dinosaures sont entrés dans les histoires avant d’entrer au cinéma. En 1864, dans
      <em>Voyage au centre de la Terre</em>, Jules Verne fait combattre un ichthyosaure et un plésiosaure sur une mer souterraine.</p>
      <p style="margin-bottom:0">En 1912, Arthur Conan Doyle imagine dans <em>Le Monde perdu</em> un plateau d’Amérique du Sud
      où les dinosaures auraient survécu. Et en 1990, Michael Crichton écrit le roman <em>Jurassic Park</em>.</p>
    </div>
    <div class="encadre encadre--pouvoir">
      <h2 class="encadre__titre">🏆 Jurassic Park, un tournant</h2>
      <p>En 1993, le film de Steven Spielberg change tout. Pour la première fois, des dinosaures fabriqués par ordinateur
      ont l’air aussi vrais que des animaux filmés. Il remporte trois Oscars, dont celui des meilleurs effets visuels.</p>
      <p style="margin-bottom:0">Le paléontologue Jack Horner, qui a découvert les nids de
      <a href="../dinosaures/maiasaura.html">Maiasaura</a>, conseillait l’équipe du film.</p>
    </div>
  </div>
  ${encadreQuiz("../")}
</div>`,
      filAriane: filAriane("Un siècle de dinosaures à l’écran"),
    }),
  });

  /* ---------- Les effets spéciaux ---------- */
  pages.push({
    chemin: "cinema/effets-speciaux.html",
    html: page({
      titre: "Comment fait-on bouger un dinosaure ?",
      description: "Dessin animé, animation image par image, robots animatroniques, images de synthèse et bruitages : comment le cinéma fait revivre les dinosaures, expliqué aux enfants.",
      base: "../",
      actif: "cinema",
      corps: `
<div class="conteneur section">
  <h1>🤖 Comment fait-on bouger un dinosaure ?</h1>
  <p class="fiche__accroche" style="max-width:66ch">Aucun dinosaure n’a jamais été filmé pour de vrai. Pour leur redonner vie,
  les cinéastes ont inventé des trucs incroyables. Les voici, du plus ancien au plus moderne.</p>
  ${ongletsCinema("../", "cinema/effets-speciaux.html")}

  <div class="grille grille--large" style="margin-top:2rem">
    ${techniques
      .map(
        (t, i) => `<div class="encadre technique" data-anim data-delai="${i % 6}">
      <p class="technique__emoji" aria-hidden="true">${t.emoji}</p>
      <h2 class="encadre__titre">${esc(t.nom)}</h2>
      <p>${esc(t.texte)}</p>
      <p class="technique__exemple">🎬 ${esc(t.exemple)}</p>
    </div>`
      )
      .join("\n    ")}
  </div>

  <div class="grille grille--deux" style="align-items:start;margin-top:2.5rem">
    <div class="prose">
      <h2>🔊 Et les cris ?</h2>
      <p>Les sons ne se fossilisent pas : personne ne sait quel cri poussaient les dinosaures. Ce sont les
      <strong>bruiteurs</strong> qui les inventent, en mélangeant des cris d’animaux d’aujourd’hui.</p>
      <p>Pour le rugissement du T-rex de Jurassic Park, le bruiteur a enregistré un bébé éléphant, puis il a ajouté
      un alligator, un tigre et même son petit chien. Le souffle du T-rex ? Celui d’une baleine !</p>
      <p>Et les « aboiements » des raptors viennent… de tortues, enregistrées dans un parc animalier,
      mélangées à des oies, des dauphins et un cheval.</p>

      <h2>💧 Le verre d’eau qui tremble</h2>
      <p>Dans Jurassic Park, on devine l’arrivée du T-rex grâce aux cercles qui se forment dans un verre d’eau.
      Les spécialistes des effets spéciaux ont cherché longtemps comment obtenir ces cercles parfaits.
      La solution : une corde de guitare, cachée sous le verre, que l’on pince à chaque pas du dinosaure !</p>

      <h2>🧠 Des robots et des ordinateurs</h2>
      <p>Dans Jurassic Park, on voit les dinosaures environ 15 minutes. Environ 9 minutes sont des robots
      grandeur nature, et 6 minutes seulement des images de synthèse. Aujourd’hui, les ordinateurs font presque tout,
      mais certains films utilisent encore des robots : les acteurs jouent mieux face à un vrai monstre !</p>
    </div>

    <div>
      <div class="encadre encadre--pouvoir">
        <h2 class="encadre__titre">📱 Fabrique ton film de dinosaures</h2>
        <p>Toi aussi, tu peux faire de l’animation image par image, comme Willis O’Brien en 1925 !</p>
        <ol>
          <li>Prends une figurine de dinosaure ou fabrique-la en pâte à modeler.</li>
          <li>Pose une tablette ou un téléphone bien immobile, avec une application d’animation image par image.</li>
          <li>Prends une photo, puis bouge ton dinosaure d’un tout petit peu.</li>
          <li>Recommence encore et encore… Avec 12 photos, tu obtiens environ une seconde de film.</li>
        </ol>
        <p style="margin-bottom:0">Demande d’abord à un adulte s’il est d’accord pour t’aider !</p>
      </div>
      <div class="encadre">
        <h2 class="encadre__titre">🐾 Comment savoir comment ils bougeaient ?</h2>
        <p style="margin-bottom:0">Les animateurs travaillent avec des paléontologues. Ils étudient les squelettes,
        les <a href="../jeux/detective-des-empreintes.html">empreintes fossiles</a> et les animaux d’aujourd’hui :
        les autruches, les éléphants, les crocodiles… et les oiseaux, qui sont des dinosaures !</p>
      </div>
    </div>
  </div>
  ${encadreQuiz("../")}
</div>`,
      filAriane: filAriane("Comment fait-on bouger un dinosaure ?"),
    }),
  });

  /* ---------- Film ou réalité ---------- */
  pages.push({
    chemin: "cinema/film-ou-realite.html",
    html: page({
      titre: "Film ou réalité ?",
      description: "Vélociraptor géant, Dilophosaurus qui crache du venin, T-rex qui ne voit pas ce qui ne bouge pas : les erreurs des films de dinosaures, corrigées par la science.",
      base: "../",
      actif: "cinema",
      corps: `
<div class="conteneur section">
  <h1>🔬 Film ou réalité ?</h1>
  <p class="fiche__accroche" style="max-width:66ch">Les films de dinosaures sont pleins d’erreurs… et de quelques vérités.
  Pour chaque scène, découvre ce qu’en disent les paléontologues.</p>
  ${ongletsCinema("../", "cinema/film-ou-realite.html")}

  <ul class="mythes" role="list">
    ${mythes
      .map((m) => {
        const v = VERDICTS[m.verdict];
        return `<li class="mythe mythe--${m.verdict}" data-anim>
      <p class="mythe__film"><span class="mythe__etiquette">🎬 Dans le film</span> ${esc(m.film)}</p>
      <p class="mythe__vrai"><span class="mythe__etiquette">🔬 En vrai</span> ${esc(m.vrai)}</p>
      <p class="mythe__pied"><span class="pastille pastille--${v.classe}">${v.texte}</span>${
        m.lien ? ` <a href="../${m.lien}">En savoir plus →</a>` : ""
      }</p>
    </li>`;
      })
      .join("\n    ")}
  </ul>

  <div class="encadre" style="margin-top:2rem;max-width:70ch">
    <h2 class="encadre__titre">🧠 Pourquoi les films se trompent-ils ?</h2>
    <p>Parfois, c’est voulu : un Vélociraptor de la taille d’une dinde ferait moins peur ! Parfois, la science a avancé
    depuis la sortie du film : en 1993, on commençait tout juste à comprendre que beaucoup de dinosaures avaient des plumes.</p>
    <p style="margin-bottom:0">Le bon réflexe ? Profiter du film… puis vérifier dans les <a href="../dinosaures.html">fiches</a>
    ce qu’en disent les scientifiques.</p>
  </div>
  ${encadreQuiz("../")}
</div>`,
      filAriane: filAriane("Film ou réalité ?"),
    }),
  });

  return pages;
}
