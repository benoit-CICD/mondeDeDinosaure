// Pages éditoriales : glossaire, questions, à propos, pages légales.
// Les dossiers thématiques sont dans dossiers.mjs.

import { dinos } from "../data/dinos.mjs";
import { site, glossaire, faq, periodes, familles } from "../data/site.mjs";
import { page, esc, aUnePhoto, enLettres } from "../templates.mjs";
import { listeJeux } from "../data/jeux.mjs";
import { photos } from "../data/photos.mjs";

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
    <a href="dinosaures.html">fiches des dinosaures</a> ou lis les dossiers sur
    <a href="extinction.html">la grande extinction</a>, <a href="oeufs.html">les œufs et les bébés</a>
    et <a href="glaciations.html">l’ère glaciaire</a>.</p>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Questions fréquentes" }],
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
      <li>des dossiers sur <a href="extinction.html">la grande extinction</a>,
      <a href="metier.html">le métier de paléontologue</a>, <a href="oeufs.html">les œufs et les bébés dinosaures</a>
      et <a href="glaciations.html">l’ère glaciaire</a> ;</li>
      <li><strong>${listeJeux.length} mini-jeux</strong> pour réviser en s’amusant.</li>
    </ul>

    <h2>Et les créatures qui ne sont pas des dinosaures ?</h2>
    <p>Certaines fiches portent une étiquette « ⚠️ Pas un dinosaure ». C’est le cas des ptérosaures (reptiles volants)
    et des reptiles marins. Ils vivaient à la même époque et sont des cousins des dinosaures, mais ils n’en font pas partie.
    Cette confusion est tellement fréquente qu’il nous a semblé important de les présenter, justement pour l’éviter.</p>

    <h2>Les images</h2>
    <p>Les fiches, le catalogue et les pages de famille sont illustrés par des <strong>reconstitutions
    scientifiques et des photographies</strong> issues de <a href="https://commons.wikimedia.org" rel="nofollow noopener" target="_blank">Wikimedia Commons</a>,
    toutes sous licence libre. Leurs auteurs sont crédités sur la <a href="credits.html">page des crédits</a>
    ainsi que sous chaque image.</p>
    <p>La page d’accueil et les mini-jeux utilisent des <strong>dessins vectoriels originaux</strong>, créés
    spécialement pour ce projet. Ce sont des représentations stylisées, pensées pour être reconnaissables :
    elles ne prétendent pas être des reconstitutions exactes. Elles peuvent être réutilisées librement dans un
    cadre pédagogique (école, exposé, atelier).</p>

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
      <strong>Hébergeur :</strong> ${esc(site.hebergeur)}<br>
      <strong>Adresse :</strong> ${esc(site.hebergeurAdresse)}<br>
      <strong>Contact :</strong> <a href="${esc(site.hebergeurContact)}" rel="nofollow noopener" target="_blank">${esc(site.hebergeurContact)}</a>
    </p>
    <p>Le site est hébergé sur GitHub Pages. Les données de connexion éventuellement conservées par
    l’hébergeur relèvent de sa propre politique de confidentialité.</p>

    <h2>3. Propriété intellectuelle</h2>
    <p>Les <strong>textes</strong> et les <strong>illustrations vectorielles</strong> de ce site sont des créations
    originales réalisées spécifiquement pour ce projet. Ils peuvent être reproduits et réutilisés librement dans un
    <strong>cadre pédagogique non commercial</strong> (école, exposé, atelier, médiathèque), à condition de citer le
    site comme source. Toute réutilisation à des fins commerciales nécessite une autorisation écrite préalable de
    l’éditeur.</p>
    <p>Les <strong>photographies et reconstitutions</strong> qui illustrent les fiches proviennent de Wikimedia Commons
    et restent la propriété de leurs auteurs respectifs. Elles sont diffusées sous licences libres (domaine public,
    CC0, CC BY ou CC BY-SA) et chaque auteur est crédité sous l’image concernée ainsi que sur la page
    <a href="credits.html">Crédits des images</a>. Leur réutilisation est soumise aux conditions de leur licence
    d’origine, et non à celles du présent site.</p>
    <p>Tout auteur souhaitant une correction d’attribution ou le retrait d’une image peut en faire la demande à
    l’adresse de contact indiquée ci-dessous.</p>

    <h2>4. Contenu scientifique</h2>
    <p>Les informations publiées sont fournies à titre pédagogique et sont volontairement simplifiées pour un jeune public.
    Les mesures (tailles, poids, vitesses) sont des estimations scientifiques susceptibles d’évoluer avec les découvertes.
    L’éditeur ne saurait garantir l’exactitude absolue ni l’exhaustivité de ces informations.</p>

    <h2>5. Liens externes</h2>
    <p>Ce site ne charge aucune ressource depuis un serveur externe : les images sont hébergées avec le site.
    Seules les pages de crédits, de mentions légales et « à propos » contiennent des liens sortants vers Wikimedia
    Commons et vers les textes des licences Creative Commons, afin de respecter les obligations d’attribution.
    Ces liens ne s’activent que si le visiteur clique dessus.</p>

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
    <p>Toutes les ressources du site (feuilles de style, scripts, images, polices) sont hébergées sur le même
    serveur que les pages. Les photographies issues de Wikimedia Commons ont été <strong>copiées sur ce serveur</strong>
    et ne sont pas appelées à distance. Aucune police ni bibliothèque n’est chargée depuis un service externe :
    aucune adresse IP n’est donc transmise à un tiers pendant la navigation.</p>
    <p>Les pages légales comportent des liens cliquables vers Wikimedia Commons, exigés par les licences des images.
    Aucune donnée n’est transmise tant que le visiteur ne clique pas sur ces liens.</p>

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
      <li>Les crédits d’image sont du texte sélectionnable, pas une image, et leurs liens sont explicites.</li>
      <li>Une structure de titres cohérente (un seul <code>h1</code> par page, puis h2 et h3).</li>
      <li>Des contrastes de couleurs conformes au niveau AA des règles WCAG 2.1.</li>
      <li>Le respect du réglage système « réduire les animations » : toutes les animations sont alors désactivées.</li>
      <li>Un thème sombre automatique si votre appareil est réglé ainsi.</li>
      <li>Des textes redimensionnables jusqu’à 200 % sans perte d’information.</li>
      <li>Des messages annoncés aux lecteurs d’écran dans les jeux (bonne ou mauvaise réponse).</li>
    </ul>

    <h2>Limites connues</h2>
    <ul>
      <li>Les ${enLettres(listeJeux.length)} mini-jeux nécessitent JavaScript. Un message l’indique si celui-ci est désactivé ;
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

  /* ---------- Crédits des images ---------- */
  const lignes = dinos
    .filter((d) => photos[d.slug])
    .map((d) => {
      const p = photos[d.slug];
      const licence = p.licenceUrl
        ? `<a href="${esc(p.licenceUrl)}" rel="license nofollow noopener" target="_blank">${esc(p.licence)}</a>`
        : esc(p.licence);
      return `<tr>
      <td><a href="dinosaures/${d.slug}.html">${esc(d.nom)}</a></td>
      <td><a href="${esc(p.page)}" rel="nofollow noopener" target="_blank">${esc(p.fichier)}</a></td>
      <td>${esc(p.auteur)}</td>
      <td>${licence}</td>
    </tr>`;
    })
    .join("\n    ");

  const parLicence = {};
  Object.values(photos).forEach((p) => { parLicence[p.licence] = (parLicence[p.licence] || 0) + 1; });

  pages.push({
    chemin: "credits.html",
    html: page({
      titre: "Crédits des images",
      description: "Auteurs, licences et sources de toutes les photographies et reconstitutions utilisées sur le site, conformément aux licences Creative Commons.",
      corps: `
<div class="conteneur section">
  <h1>🖼️ Crédits des images</h1>
  <div class="prose" style="max-width:74ch">
    <p>Les <strong>reconstitutions et photographies</strong> qui illustrent les fiches, le catalogue et
    les pages de famille proviennent de <strong>Wikimedia Commons</strong> et sont publiées sous licence libre.
    Chaque auteur est crédité ci-dessous, comme leurs licences l’exigent.</p>

    <p>Les <strong>illustrations vectorielles</strong> de la page d’accueil et des mini-jeux (memory, puzzle,
    « qui suis-je ? », œufs, empreintes…) sont en revanche des créations originales réalisées pour ce site.</p>

    <div class="encadre">
      <h2 class="encadre__titre">📋 Licences utilisées</h2>
      <ul style="margin-bottom:0">
        ${Object.entries(parLicence).sort((a, b) => b[1] - a[1])
          .map(([l, n]) => `<li><strong>${esc(l)}</strong> — ${n} image${n > 1 ? "s" : ""}</li>`).join("\n        ")}
      </ul>
    </div>

    <p>Les licences <em>CC BY</em> et <em>CC BY-SA</em> autorisent la réutilisation, y compris modifiée,
    à condition de citer l’auteur et d’indiquer la licence. Les images ont été redimensionnées et converties
    au format WebP pour alléger les pages ; aucune autre modification n’a été apportée.</p>

    <p>Si vous êtes l’auteur d’une de ces images et souhaitez une correction d’attribution ou un retrait,
    écrivez à ${aCompleter(site.email)}.</p>
  </div>

  <div style="overflow-x:auto;margin-top:2rem">
    <table class="tableau-info" style="min-width:640px">
      <thead>
        <tr>
          <th scope="col" style="width:auto">Créature</th>
          <th scope="col" style="width:auto">Fichier source</th>
          <th scope="col" style="width:auto">Auteur</th>
          <th scope="col" style="width:auto">Licence</th>
        </tr>
      </thead>
      <tbody>
    ${lignes}
      </tbody>
    </table>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Crédits des images" }],
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
        ${lien("oeufs.html", "Œufs et bébés dinosaures")}
        ${lien("glaciations.html", "Les dinosaures et l’ère glaciaire")}
        ${lien("glossaire.html", "Glossaire")}
        ${lien("questions.html", "Questions fréquentes")}
      </ul>

      <h2>Jouer</h2>
      <ul>
        ${lien("jeux.html", "Tous les jeux")}
        ${listeJeux.map((j) => lien(`jeux/${j.slug}.html`, j.nom)).join("\n        ")}
      </ul>

      <h2>Informations</h2>
      <ul>
        ${lien("a-propos.html", "À propos")}
        ${lien("mentions-legales.html", "Mentions légales")}
        ${lien("confidentialite.html", "Politique de confidentialité")}
        ${lien("accessibilite.html", "Accessibilité")}
        ${lien("credits.html", "Crédits des images")}
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
  /* Cette page est affichée pour n'importe quelle URL inexistante, y compris
     dans un sous-dossier (/dinosaures/xxx.html). Des chemins relatifs y
     pointeraient à côté : feuille de style, scripts et liens sont donc absolus,
     à partir de site.racine. */
  const r = site.racine;
  return {
    chemin: "404.html",
    html: page({
      titre: "Page introuvable",
      description: "Cette page n’existe pas ou a disparu, comme les dinosaures il y a 66 millions d’années.",
      base: r,
      corps: `
<div class="conteneur section centre">
  <p style="font-size:5rem;margin:0" aria-hidden="true">🦴</p>
  <h1>Oups… cette page a disparu !</h1>
  <p style="max-width:52ch;margin-inline:auto">Elle a sans doute été emportée par l’astéroïde, il y a 66 millions d’années.
  Mais rassure-toi : il reste ${dinos.length} créatures à explorer.</p>
  <p>
    <a class="bouton" href="${r}index.html">🏠 Retour à l’accueil</a>
    <a class="bouton bouton--secondaire" href="${r}dinosaures.html">🦕 Voir les dinosaures</a>
    <a class="bouton bouton--secondaire" href="${r}plan-du-site.html">🗺️ Plan du site</a>
  </p>
</div>`,
    }),
  };
}
