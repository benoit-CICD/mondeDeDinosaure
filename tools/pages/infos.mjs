// Pages éditoriales : glossaire, questions, dossiers, à propos, pages légales.

import { dinos } from "../data/dinos.mjs";
import { site, glossaire, faq, periodes, familles } from "../data/site.mjs";
import { page, esc } from "../templates.mjs";

/** Met en évidence les informations que l'éditeur doit renseigner. */
const aCompleter = (valeur) =>
  String(valeur).startsWith("[À COMPLÉTER")
    ? `<mark style="background:#ffe9a8;padding:.15em .4em;border-radius:6px;font-weight:700">${esc(valeur)}</mark>`
    : esc(valeur);

export function pagesInfos() {
  const pages = [];

  /* ---------- Glossaire ---------- */
  pages.push({
    chemin: "glossaire.html",
    html: page({
      titre: "Glossaire",
      description: "Tous les mots compliqués des dinosaures expliqués simplement : fossile, paléontologue, théropode, gastrolithe, coprolithe…",
      corps: `
<div class="conteneur section">
  <h1>🔤 Le glossaire</h1>
  <p style="max-width:66ch">Les scientifiques utilisent parfois des mots compliqués. Les voici expliqués avec des mots simples.</p>
  <dl class="glossaire" style="margin-top:2rem">
    ${glossaire
      .slice()
      .sort((a, b) => a.mot.localeCompare(b.mot, "fr"))
      .map(
        (g, i) => `<div class="glossaire__terme" data-anim data-delai="${i % 6}">
      <dt>${esc(g.mot)}</dt>
      <dd>${esc(g.def)}</dd>
    </div>`
      )
      .join("\n    ")}
  </dl>
  <p style="margin-top:2rem"><a class="bouton" href="jeux/quiz.html">❓ Tester mes connaissances</a></p>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Glossaire" }],
    }),
  });

  /* ---------- Questions fréquentes ---------- */
  pages.push({
    chemin: "questions.html",
    html: page({
      titre: "Questions fréquentes",
      description: "Pourquoi les dinosaures ont-ils disparu ? Avaient-ils des plumes ? Peut-on les recréer ? Les réponses aux questions que se posent les enfants.",
      corps: `
<div class="conteneur section">
  <h1>💬 Les questions que tout le monde se pose</h1>
  <p style="max-width:66ch">Voici les questions les plus fréquentes sur les dinosaures, avec des réponses courtes et claires.</p>
  <div style="margin-top:2rem;max-width:74ch">
    ${faq
      .map(
        (f, i) => `<details class="accordeon"${i === 0 ? " open" : ""}>
      <summary>${esc(f.q)}</summary>
      <div><p style="margin-bottom:0">${esc(f.r)}</p></div>
    </details>`
      )
      .join("\n    ")}
  </div>
  <div class="encadre" style="margin-top:2rem">
    <h2 class="encadre__titre">🔎 Tu as une autre question ?</h2>
    <p style="margin-bottom:0">Cherche dans le <a href="glossaire.html">glossaire</a>, explore les
    <a href="dinosaures.html">fiches des dinosaures</a> ou lis le dossier sur
    <a href="extinction.html">la grande extinction</a>.</p>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Questions fréquentes" }],
    }),
  });

  /* ---------- Dossier : l'extinction ---------- */
  pages.push({
    chemin: "extinction.html",
    html: page({
      titre: "La grande extinction",
      description: "Il y a 66 millions d’années, un astéroïde a mis fin au règne des dinosaures. Voici ce qui s’est passé, expliqué simplement aux enfants.",
      corps: `
<div class="conteneur section">
  <h1>☄️ La grande extinction</h1>
  <p class="fiche__accroche" style="max-width:66ch">Il y a 66 millions d’années, en une seule journée, le monde des dinosaures a basculé.</p>

  <div class="grille grille--deux" style="align-items:start;margin-top:2rem">
    <div class="prose">
      <h2>Le jour où tout a changé</h2>
      <p>Un astéroïde d’environ 10 kilomètres de large — la hauteur du mont Everest — a percuté la Terre à l’endroit
      où se trouve aujourd’hui la péninsule du Yucatán, au Mexique. Il filait à plus de 70 000 km/h.</p>
      <p>L’impact a creusé un cratère de 180 kilomètres de large, appelé <strong>cratère de Chicxulub</strong>.
      On peut encore le repérer aujourd’hui grâce à des mesures scientifiques, même s’il est enfoui sous la roche et la mer.</p>

      <h2>Ce qui s’est passé ensuite</h2>
      <p>Le choc a projeté dans le ciel une quantité énorme de poussière et de roches brûlantes. Pendant des mois,
      la lumière du Soleil n’a presque plus atteint le sol.</p>
      <p>Sans lumière, les plantes ne pouvaient plus pousser. Les herbivores, privés de nourriture, ont disparu les premiers.
      Puis ce fut au tour des carnivores, qui n’avaient plus rien à chasser. C’est ce qu’on appelle une réaction en chaîne.</p>
      <p>En quelques milliers d’années, environ <strong>trois espèces sur quatre</strong> ont disparu de la Terre :
      les dinosaures, mais aussi les ptérosaures, les grands reptiles marins et d’innombrables plantes et insectes.</p>

      <h2>Les survivants</h2>
      <p>Tout n’a pas disparu. Les petits animaux capables de se cacher, de manger un peu de tout et de survivre avec peu
      s’en sont mieux sortis : de petits mammifères, des crocodiles, des tortues, des grenouilles…</p>
      <p>Et surtout : un groupe de petits dinosaures à plumes a survécu. Ce sont eux qui sont devenus
      <strong>les oiseaux</strong>. Chaque fois que tu vois une mésange ou un pigeon, tu regardes un descendant direct
      des dinosaures !</p>

      <h2>Et après ?</h2>
      <p>Une fois les dinosaures disparus, la place était libre. Les mammifères, jusque-là tout petits, se sont
      diversifiés et ont grandi. Des millions d’années plus tard, c’est de cette lignée que sont nés les humains.</p>
      <p>Autrement dit : sans cet astéroïde, tu ne serais probablement pas là pour lire cette page.</p>
    </div>

    <div>
      <div class="encadre encadre--pouvoir">
        <h2 class="encadre__titre">📊 L’extinction en chiffres</h2>
        <table class="tableau-info"><tbody>
          <tr><th scope="row">Date</th><td>Il y a 66 millions d’années</td></tr>
          <tr><th scope="row">Taille de l’astéroïde</th><td>Environ 10 km de large</td></tr>
          <tr><th scope="row">Lieu de l’impact</th><td>Chicxulub, Mexique</td></tr>
          <tr><th scope="row">Cratère</th><td>180 km de diamètre</td></tr>
          <tr><th scope="row">Espèces disparues</th><td>Environ 75 %</td></tr>
          <tr><th scope="row">Survivants célèbres</th><td>Les oiseaux, les crocodiles, les tortues</td></tr>
        </tbody></table>
      </div>
      <div class="encadre encadre--attention">
        <h2 class="encadre__titre">🐦 11 000 espèces vivantes</h2>
        <p style="margin-bottom:0">C’est le nombre d’espèces d’oiseaux qui existent aujourd’hui sur Terre.
        Les dinosaures ne sont donc pas complètement éteints : ils chantent dans ton jardin !</p>
      </div>
      <div class="encadre">
        <h2 class="encadre__titre">🎮 Et si on jouait ?</h2>
        <p style="margin-bottom:0"><a class="bouton bouton--petit" href="jeux/vrai-ou-faux.html">⚖️ Vrai ou faux</a></p>
      </div>
    </div>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "La grande extinction" }],
    }),
  });

  /* ---------- Dossier : le métier ---------- */
  pages.push({
    chemin: "metier.html",
    html: page({
      titre: "Le métier de paléontologue",
      description: "Comment fait-on pour découvrir un dinosaure ? Fouilles, dégagement, moulage, étude : le métier de paléontologue expliqué aux enfants.",
      corps: `
<div class="conteneur section">
  <h1>⛏️ Comment découvre-t-on un dinosaure ?</h1>
  <p class="fiche__accroche" style="max-width:66ch">Un squelette de dinosaure ne sort pas tout monté de la terre.
  Voici les six étapes du travail des paléontologues.</p>

  <div class="frise" style="margin-top:2.5rem">
    ${[
      ["🗺️", "Choisir un endroit", "Les paléontologues étudient des cartes géologiques pour repérer des roches du bon âge. Inutile de creuser dans une roche trop jeune ou trop vieille : il n’y aura rien."],
      ["👀", "Chercher à pied", "On marche lentement, les yeux rivés au sol, à la recherche d’un éclat d’os qui dépasse. Beaucoup de grandes découvertes ont commencé par un simple caillou remarqué par hasard."],
      ["🖌️", "Dégager avec patience", "On travaille au marteau, au burin, puis au pinceau. Dégager un seul os peut prendre plusieurs semaines. Il faut noter la position exacte de chaque pièce."],
      ["🧊", "Protéger et transporter", "Les os fragiles sont enveloppés dans du plâtre, comme un bras cassé. Ces coques protègent les fossiles pendant le voyage jusqu’au laboratoire."],
      ["🔬", "Étudier au laboratoire", "On nettoie, on mesure, on scanne. Les scanners permettent de voir l’intérieur des os et même la forme du cerveau, sans rien abîmer."],
      ["🏛️", "Partager la découverte", "Les résultats sont publiés dans des revues scientifiques, puis le squelette est monté et exposé dans un musée pour que tout le monde puisse le voir."],
    ]
      .map(
        ([emoji, titre, texte], i) => `<div class="frise__jalon" data-anim style="--jalon-couleur:${["#c86b3c", "#3f8f6c", "#2f6fa8", "#9e4f8f", "#e09a2c", "#c0392b"][i]}">
      <span class="frise__point" aria-hidden="true"></span>
      <div class="frise__periode">
        <p class="frise__ages">Étape ${i + 1}</p>
        <h2 style="margin-bottom:.3rem">${emoji} ${titre}</h2>
        <p style="margin-bottom:0">${texte}</p>
      </div>
    </div>`
      )
      .join("\n    ")}
  </div>

  <div class="grille grille--deux" style="margin-top:2.5rem;align-items:start">
    <div class="encadre">
      <h2 class="encadre__titre">🧠 Comment sait-on tout ça ?</h2>
      <p>Les paléontologues ne devinent pas : ils comparent. En observant les animaux d’aujourd’hui — oiseaux,
      crocodiles, lézards — ils comprennent à quoi servaient les os et les muscles des dinosaures.</p>
      <p style="margin-bottom:0">Certaines choses restent inconnues, comme la couleur de la plupart des espèces.
      Quand les scientifiques ne savent pas, ils le disent : c’est ça, la démarche scientifique.</p>
    </div>
    <div class="encadre encadre--pouvoir">
      <h2 class="encadre__titre">🌟 Une découverte célèbre</h2>
      <p>En 1811, à Lyme Regis en Angleterre, une jeune fille de 12 ans nommée <strong>Mary Anning</strong> découvre
      le premier crâne complet d’Ichthyosaure.</p>
      <p style="margin-bottom:0">Elle deviendra l’une des plus grandes chasseuses de fossiles de l’histoire,
      alors qu’à son époque les femmes n’avaient pas le droit d’entrer dans les sociétés savantes.</p>
    </div>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Le métier de paléontologue" }],
    }),
  });

  /* ---------- À propos ---------- */
  pages.push({
    chemin: "a-propos.html",
    html: page({
      titre: "À propos",
      description: "À qui s’adresse ce site, comment il a été conçu, quelles sources ont été utilisées et pourquoi il ne contient ni publicité ni traceur.",
      corps: `
<div class="conteneur section">
  <h1>ℹ️ À propos de ce site</h1>
  <div class="prose">
    <h2>Pour qui ?</h2>
    <p>Ce site s’adresse aux enfants curieux, de 7 à 12 ans environ, ainsi qu’aux parents et aux enseignants
    qui cherchent une ressource claire et fiable sur les dinosaures.</p>
    <p>Les textes sont volontairement courts, avec une idée par phrase et un vocabulaire simple.
    Les mots difficiles sont expliqués dans le <a href="glossaire.html">glossaire</a>.</p>

    <h2>Ce que contient le site</h2>
    <ul>
      <li><strong>${dinos.length} fiches illustrées</strong> de créatures préhistoriques ;</li>
      <li><strong>${periodes.length} pages de période</strong> : Trias, Jurassique et Crétacé ;</li>
      <li><strong>${familles.length} pages de famille</strong>, des théropodes aux reptiles marins ;</li>
      <li>une <a href="frise.html">frise chronologique</a> sur 186 millions d’années ;</li>
      <li>des dossiers sur <a href="extinction.html">la grande extinction</a> et
      <a href="metier.html">le métier de paléontologue</a> ;</li>
      <li><strong>5 mini-jeux</strong> pour réviser en s’amusant.</li>
    </ul>

    <h2>Et les créatures qui ne sont pas des dinosaures ?</h2>
    <p>Certaines fiches portent une étiquette « ⚠️ Pas un dinosaure ». C’est le cas des ptérosaures (reptiles volants)
    et des reptiles marins. Ils vivaient à la même époque et sont des cousins des dinosaures, mais ils n’en font pas partie.
    Cette confusion est tellement fréquente qu’il nous a semblé important de les présenter, justement pour l’éviter.</p>

    <h2>Les illustrations</h2>
    <p>Toutes les illustrations du site sont des dessins vectoriels originaux, créés spécialement pour ce projet.
    Ce sont des représentations stylisées, pensées pour être jolies et reconnaissables : elles ne prétendent pas
    être des reconstitutions scientifiques exactes.</p>
    <p>Elles peuvent être réutilisées librement dans un cadre pédagogique (école, exposé, atelier).</p>

    <h2>Les sources</h2>
    <p>Les informations proviennent d’ouvrages de vulgarisation et de ressources de musées d’histoire naturelle.
    Les tailles et les poids sont des <strong>estimations</strong> : selon les scientifiques et les spécimens étudiés,
    les chiffres peuvent varier. La paléontologie est une science vivante, où les connaissances évoluent régulièrement.</p>

    <h2>Vie privée</h2>
    <p>Ce site ne dépose <strong>aucun cookie</strong>, n’utilise <strong>aucun traceur</strong>, ne contient
    <strong>aucune publicité</strong> et ne demande la création d’aucun compte. Les scores des jeux ne sont pas
    enregistrés : ils disparaissent dès que la page est fermée.</p>
    <p>Aucune ressource externe (police, script, image) n’est chargée depuis un autre serveur.
    Voir la <a href="confidentialite.html">politique de confidentialité</a>.</p>

    <h2>Une erreur ? Une suggestion ?</h2>
    <p>Les remarques sont les bienvenues à l’adresse suivante : ${aCompleter(site.email)}.</p>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "À propos" }],
    }),
  });

  /* ---------- Mentions légales ---------- */
  pages.push({
    chemin: "mentions-legales.html",
    html: page({
      titre: "Mentions légales",
      description: "Mentions légales du site Le Monde des Dinosaures : éditeur, hébergeur, propriété intellectuelle et conditions d’utilisation.",
      corps: `
<div class="conteneur section">
  <h1>Mentions légales</h1>
  <div class="encadre encadre--attention">
    <h2 class="encadre__titre">📝 À compléter avant la mise en ligne</h2>
    <p style="margin-bottom:0">Les informations surlignées en jaune doivent être remplacées par les informations réelles
    de l’éditeur. En France, l’article 6 de la loi pour la confiance dans l’économie numérique (LCEN) impose la
    publication de ces mentions sur tout site accessible au public.</p>
  </div>

  <div class="prose">
    <h2>1. Éditeur du site</h2>
    <p>
      <strong>Nom de l’éditeur :</strong> ${aCompleter(site.auteur)}<br>
      <strong>Adresse :</strong> ${aCompleter("[À COMPLÉTER : adresse postale de l’éditeur]")}<br>
      <strong>Adresse électronique :</strong> ${aCompleter(site.email)}<br>
      <strong>Directeur de la publication :</strong> ${aCompleter("[À COMPLÉTER : nom du directeur de la publication]")}
    </p>
    <p>Pour un éditeur non professionnel, seuls le nom du directeur de la publication et les coordonnées de l’hébergeur
    doivent être rendus publics ; les coordonnées personnelles peuvent rester confidentielles auprès de l’hébergeur.</p>

    <h2>2. Hébergement</h2>
    <p>
      <strong>Hébergeur :</strong> ${aCompleter(site.hebergeur)}<br>
      <strong>Adresse :</strong> ${aCompleter("[À COMPLÉTER : adresse de l’hébergeur]")}<br>
      <strong>Téléphone :</strong> ${aCompleter("[À COMPLÉTER : téléphone de l’hébergeur]")}
    </p>

    <h2>3. Propriété intellectuelle</h2>
    <p>L’ensemble des textes et des illustrations de ce site est une création originale. Les illustrations vectorielles
    ont été réalisées spécifiquement pour ce projet.</p>
    <p>Les contenus de ce site peuvent être reproduits et réutilisés librement dans un <strong>cadre pédagogique
    non commercial</strong> (école, exposé, atelier, médiathèque), à condition de citer le site comme source.</p>
    <p>Toute réutilisation à des fins commerciales nécessite une autorisation écrite préalable de l’éditeur.</p>

    <h2>4. Contenu scientifique</h2>
    <p>Les informations publiées sont fournies à titre pédagogique et sont volontairement simplifiées pour un jeune public.
    Les mesures (tailles, poids, vitesses) sont des estimations scientifiques susceptibles d’évoluer avec les découvertes.
    L’éditeur ne saurait garantir l’exactitude absolue ni l’exhaustivité de ces informations.</p>

    <h2>5. Liens externes</h2>
    <p>Ce site ne contient aucun lien vers des sites tiers, ni aucune ressource chargée depuis un serveur externe.</p>

    <h2>6. Responsabilité</h2>
    <p>L’éditeur s’efforce d’assurer l’exactitude des informations diffusées et la disponibilité du site,
    sans pouvoir en garantir la continuité. Sa responsabilité ne saurait être engagée en cas d’interruption du service
    ou d’erreur dans les contenus.</p>

    <h2>7. Droit applicable</h2>
    <p>Le présent site est soumis au droit français. En cas de litige, et à défaut de résolution amiable,
    les tribunaux français sont seuls compétents.</p>

    <h2>8. Contact</h2>
    <p>Pour toute question relative au site : ${aCompleter(site.email)}</p>

    <p style="font-size:.9rem;color:var(--texte-doux)">Dernière mise à jour : ${aCompleter("[À COMPLÉTER : date de mise en ligne]")}</p>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Mentions légales" }],
    }),
  });

  /* ---------- Confidentialité ---------- */
  pages.push({
    chemin: "confidentialite.html",
    html: page({
      titre: "Politique de confidentialité",
      description: "Ce site ne dépose aucun cookie, n’utilise aucun traceur et ne collecte aucune donnée personnelle. Détail de notre politique de confidentialité.",
      corps: `
<div class="conteneur section">
  <h1>Politique de confidentialité</h1>
  <div class="encadre encadre--pouvoir">
    <h2 class="encadre__titre">🔒 En une phrase</h2>
    <p style="margin-bottom:0">Ce site <strong>ne collecte aucune donnée personnelle</strong>, ne dépose
    <strong>aucun cookie</strong> et ne charge <strong>aucune ressource externe</strong>. Il n’y a donc rien à accepter,
    rien à refuser, et aucune bannière à cliquer.</p>
  </div>

  <div class="prose">
    <h2>1. Aucune donnée collectée</h2>
    <p>Le site est entièrement statique : il se compose de pages HTML, de feuilles de style et de scripts exécutés
    uniquement dans votre navigateur. Aucun formulaire d’inscription, aucun compte utilisateur, aucun envoi de données
    vers un serveur n’est prévu.</p>

    <h2>2. Aucun cookie, aucun traceur</h2>
    <p>Le site ne dépose aucun cookie, ni technique ni publicitaire. Il n’utilise aucun outil de mesure d’audience
    (Google Analytics, Matomo ou équivalent), aucun bouton de réseau social et aucune régie publicitaire.</p>
    <p>Conformément à l’article 82 de la loi Informatique et Libertés, aucun bandeau de consentement n’est nécessaire
    puisque aucune information n’est lue ou écrite dans votre terminal.</p>

    <h2>3. Les scores des jeux</h2>
    <p>Les scores obtenus dans les mini-jeux existent uniquement dans la mémoire vive de votre navigateur, le temps de la partie.
    Ils ne sont enregistrés nulle part, ni sur votre appareil, ni sur un serveur. Ils disparaissent dès que la page est
    rechargée ou fermée.</p>

    <h2>4. Aucune ressource tierce</h2>
    <p>Toutes les ressources du site (feuilles de style, scripts, illustrations, polices) sont hébergées sur le même
    serveur que les pages. Aucune police ni bibliothèque n’est appelée depuis un service externe, ce qui signifie
    qu’aucune adresse IP n’est transmise à un tiers pendant la navigation.</p>

    <h2>5. Journaux du serveur</h2>
    <p>Comme tout site web, l’hébergeur peut conserver des journaux techniques de connexion (adresse IP, date, page demandée)
    à des fins de sécurité et de bon fonctionnement. Ces journaux relèvent de la responsabilité de l’hébergeur,
    dont les coordonnées figurent dans les <a href="mentions-legales.html">mentions légales</a>.</p>

    <h2>6. Protection des mineurs</h2>
    <p>Ce site s’adresse notamment à un jeune public. Il ne demande aucune information personnelle à ses visiteurs,
    n’affiche aucune publicité, ne propose aucun espace de discussion et ne comporte aucun lien vers des sites externes.</p>

    <h2>7. Vos droits</h2>
    <p>Aucune donnée personnelle n’étant collectée, il n’existe aucun traitement susceptible de faire l’objet d’un droit
    d’accès, de rectification ou d’effacement. Pour toute question, vous pouvez néanmoins écrire à ${aCompleter(site.email)}.</p>

    <p style="font-size:.9rem;color:var(--texte-doux)">Dernière mise à jour : ${aCompleter("[À COMPLÉTER : date de mise en ligne]")}</p>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Confidentialité" }],
    }),
  });

  /* ---------- Accessibilité ---------- */
  pages.push({
    chemin: "accessibilite.html",
    html: page({
      titre: "Accessibilité",
      description: "Les choix d’accessibilité du site : contrastes, navigation au clavier, textes alternatifs, respect des préférences de mouvement réduit.",
      corps: `
<div class="conteneur section">
  <h1>Accessibilité</h1>
  <div class="prose">
    <p>Ce site a été conçu pour être utilisable par le plus grand nombre, y compris par les personnes en situation de handicap
    et par les enfants qui découvrent la lecture.</p>

    <h2>Ce qui a été mis en place</h2>
    <ul>
      <li>Un lien « Aller au contenu » en début de page, pour sauter la navigation.</li>
      <li>Une navigation entièrement utilisable au clavier, avec un indicateur de focus bien visible.</li>
      <li>Des zones tactiles d’au moins 44 × 44 pixels, adaptées aux doigts des enfants sur tablette.</li>
      <li>Des textes alternatifs sur toutes les illustrations informatives.</li>
      <li>Une structure de titres cohérente (un seul <code>h1</code> par page, puis h2 et h3).</li>
      <li>Des contrastes de couleurs conformes au niveau AA des règles WCAG 2.1.</li>
      <li>Le respect du réglage système « réduire les animations » : toutes les animations sont alors désactivées.</li>
      <li>Un thème sombre automatique si votre appareil est réglé ainsi.</li>
      <li>Des textes redimensionnables jusqu’à 200 % sans perte d’information.</li>
      <li>Des messages annoncés aux lecteurs d’écran dans les jeux (bonne ou mauvaise réponse).</li>
    </ul>

    <h2>Limites connues</h2>
    <ul>
      <li>Les cinq mini-jeux nécessitent JavaScript. Un message l’indique si celui-ci est désactivé ;
      l’ensemble du contenu documentaire reste accessible sans JavaScript.</li>
      <li>Le jeu de puzzle repose sur une manipulation visuelle des images : il est difficilement utilisable
      avec un lecteur d’écran.</li>
      <li>Le filtrage du catalogue nécessite également JavaScript ; sans lui, toutes les fiches restent affichées et accessibles.</li>
    </ul>

    <h2>Votre retour</h2>
    <p>Si vous rencontrez une difficulté d’accès à un contenu, vous pouvez le signaler à l’adresse
    ${aCompleter(site.email)}. Les signalements sont pris en compte pour améliorer le site.</p>

    <p style="font-size:.9rem;color:var(--texte-doux)">Cette déclaration est établie à titre informatif.
    Elle ne constitue pas une déclaration de conformité au RGAA au sens réglementaire.</p>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Accessibilité" }],
    }),
  });

  return pages;
}

/* ---------- Plan du site ---------- */
export function pagePlan() {
  const lien = (href, libelle) => `<li><a href="${href}">${esc(libelle)}</a></li>`;

  const corps = `
<div class="conteneur section">
  <h1>🗺️ Plan du site</h1>
  <p>Toutes les pages du site, rangées par rubrique.</p>

  <div class="grille grille--deux" style="align-items:start;margin-top:2rem">
    <div>
      <h2>Découvrir</h2>
      <ul>
        ${lien("index.html", "Accueil")}
        ${lien("dinosaures.html", `Tous les dinosaures (${dinos.length})`)}
        ${lien("familles.html", "Les familles")}
        ${lien("periodes.html", "Les périodes")}
        ${lien("frise.html", "La frise du temps")}
        ${lien("extinction.html", "La grande extinction")}
        ${lien("metier.html", "Le métier de paléontologue")}
        ${lien("glossaire.html", "Glossaire")}
        ${lien("questions.html", "Questions fréquentes")}
      </ul>

      <h2>Jouer</h2>
      <ul>
        ${lien("jeux.html", "Tous les jeux")}
        ${lien("jeux/quiz.html", "Le grand quiz")}
        ${lien("jeux/vrai-ou-faux.html", "Vrai ou faux")}
        ${lien("jeux/qui-suis-je.html", "Qui suis-je ?")}
        ${lien("jeux/memory.html", "Memory")}
        ${lien("jeux/puzzle.html", "Puzzle")}
      </ul>

      <h2>Informations</h2>
      <ul>
        ${lien("a-propos.html", "À propos")}
        ${lien("mentions-legales.html", "Mentions légales")}
        ${lien("confidentialite.html", "Politique de confidentialité")}
        ${lien("accessibilite.html", "Accessibilité")}
        ${lien("plan-du-site.html", "Plan du site")}
      </ul>
    </div>

    <div>
      <h2>Les périodes</h2>
      <ul>${periodes.map((p) => lien(`periodes/${p.slug}.html`, `Le ${p.nom}`)).join("\n        ")}</ul>

      <h2>Les familles</h2>
      <ul>${familles.map((f) => lien(`familles/${f.slug}.html`, f.nom)).join("\n        ")}</ul>

      <h2>Les ${dinos.length} fiches</h2>
      <ul style="columns:2;column-gap:1.4rem">
        ${dinos
          .slice()
          .sort((a, b) => a.nom.localeCompare(b.nom, "fr"))
          .map((d) => lien(`dinosaures/${d.slug}.html`, d.nom))
          .join("\n        ")}
      </ul>
    </div>
  </div>
</div>`;

  return {
    chemin: "plan-du-site.html",
    html: page({
      titre: "Plan du site",
      description: "Toutes les pages du site Le Monde des Dinosaures, rangées par rubrique.",
      corps,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Plan du site" }],
    }),
  };
}

/* ---------- Page 404 ---------- */
export function page404() {
  return {
    chemin: "404.html",
    html: page({
      titre: "Page introuvable",
      description: "Cette page n’existe pas ou a disparu, comme les dinosaures il y a 66 millions d’années.",
      corps: `
<div class="conteneur section centre">
  <p style="font-size:5rem;margin:0" aria-hidden="true">🦴</p>
  <h1>Oups… cette page a disparu !</h1>
  <p style="max-width:52ch;margin-inline:auto">Elle a sans doute été emportée par l’astéroïde, il y a 66 millions d’années.
  Mais rassure-toi : il reste ${dinos.length} créatures à explorer.</p>
  <p>
    <a class="bouton" href="/index.html">🏠 Retour à l’accueil</a>
    <a class="bouton bouton--secondaire" href="/dinosaures.html">🦕 Voir les dinosaures</a>
  </p>
</div>`,
    }),
  };
}
