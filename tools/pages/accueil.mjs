// Page d'accueil.

import { dinos } from "../data/dinos.mjs";
import { periodes, familles, site } from "../data/site.mjs";
import { quiz } from "../data/jeux.mjs";
import { page, esc, carteDino } from "../templates.mjs";

const SCENE = `<svg viewBox="0 0 520 380" role="img" aria-label="Paysage préhistorique avec un volcan, des fougères et un dinosaure" class="heros__scene-svg">
  <defs>
    <linearGradient id="ciel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#ffd89b"/><stop offset="100%" stop-color="#fdf3e0"/>
    </linearGradient>
  </defs>
  <circle class="soleil" cx="408" cy="86" r="46" fill="#ffc861"/>
  <circle cx="408" cy="86" r="62" fill="#ffc861" opacity=".22"/>

  <g class="nuage" opacity=".75">
    <ellipse cx="96" cy="66" rx="40" ry="17" fill="#fff"/>
    <ellipse cx="122" cy="58" rx="27" ry="19" fill="#fff"/>
  </g>
  <g class="nuage nuage--2" opacity=".6">
    <ellipse cx="300" cy="40" rx="34" ry="13" fill="#fff"/>
    <ellipse cx="322" cy="34" rx="22" ry="15" fill="#fff"/>
  </g>

  <path d="M0 250 L118 122 L176 186 L232 132 L340 250 Z" fill="#8a9a8f"/>
  <path d="M118 122 L86 162 L150 162 Z" fill="#fdf8ee" opacity=".85"/>
  <path d="M232 132 L206 168 L258 168 Z" fill="#fdf8ee" opacity=".85"/>

  <path d="M360 250 L430 120 L500 250 Z" fill="#7a6a5e"/>
  <path d="M430 120 L408 152 Q430 166 452 152 Z" fill="#c0392b"/>
  <ellipse cx="430" cy="118" rx="26" ry="11" fill="#e06b47" opacity=".7" class="soleil"/>

  <path d="M0 250 Q130 228 260 248 T520 244 L520 380 L0 380 Z" fill="#3f8f6c"/>
  <path d="M0 282 Q140 264 280 282 T520 278 L520 380 L0 380 Z" fill="#2f6f56"/>

  <g class="heros__dino">
    <g transform="translate(46 150) scale(0.76)">
      <path d="M34 158 Q104 150 156 136 Q192 126 208 110 Q228 90 258 84 Q280 80 294 66
               Q306 54 330 52 L372 54 Q384 58 383 72 Q382 84 370 90 L340 92 Q318 94 308 108
               Q298 124 272 136 Q240 150 206 156 Q166 164 122 162 Q76 160 34 158 Z"
            fill="#3f7d5c" stroke="#1f4634" stroke-width="6" stroke-linejoin="round"/>
      <path d="M50 158 Q120 152 176 140 Q206 132 224 152 Q186 162 128 162 Q84 162 50 158 Z" fill="#8fd4a8" opacity=".55"/>
      <path d="M212 146 q-24 36 -10 64 q6 12 -12 16 l-28 4" fill="none" stroke="#1f4634" stroke-width="29" stroke-linecap="round"/>
      <path d="M212 146 q-24 36 -10 64 q6 12 -12 16 l-28 4" fill="none" stroke="#3f7d5c" stroke-width="22" stroke-linecap="round"/>
      <path d="M336 78 L340 87 L344 78 M346 78 L350 87 L354 78 M356 77 L360 86 L364 77" fill="#fffdf6"/>
      <circle cx="348" cy="66" r="9" fill="#fffdf6" stroke="#1f4634" stroke-width="2.5"/>
      <circle cx="350" cy="66" r="4.7" fill="#2a1f1a"/>
      <circle cx="352" cy="62" r="2" fill="#fff"/>
      <ellipse cx="330" cy="78" rx="8" ry="5" fill="#ff8f9c" opacity=".45"/>
    </g>
  </g>

  <g fill="#245a44">
    <path d="M26 300 q-16 -44 4 -70 q10 30 20 40 q4 -30 16 -44 q10 32 6 74 Z"/>
    <path d="M470 306 q-18 -40 0 -66 q12 26 22 34 q2 -26 14 -40 q10 30 6 72 Z"/>
  </g>
</svg>`;

export function pageAccueil() {
  const vedettes = dinos.filter((d) => d.vedette);
  const cousins = dinos.filter((d) => !d.vraiDino);
  const plusGrand = dinos.reduce((a, b) => (a.longueur > b.longueur ? a : b));
  const plusPetit = dinos.reduce((a, b) => (a.longueur < b.longueur ? a : b));
  const plusRapide = dinos.reduce((a, b) => (a.vitesse > b.vitesse ? a : b));

  const corps = `
<section class="heros">
  <div class="conteneur heros__contenu">
    <div>
      <h1 class="heros__titre">Bienvenue dans <em>le monde des dinosaures !</em></h1>
      <p class="heros__accroche">Explore ${dinos.length} créatures géantes, remonte le temps sur ${Math.round(periodes[0].debut - periodes[2].fin)} millions d’années et amuse-toi avec 5 jeux pour devenir un vrai paléontologue.</p>
      <div class="heros__actions">
        <a class="bouton" href="dinosaures.html">🔍 Explorer les dinosaures</a>
        <a class="bouton bouton--ambre" href="jeux.html">🎮 Jouer maintenant</a>
      </div>
    </div>
    <div class="heros__scene">${SCENE}</div>
  </div>
</section>

<section class="section">
  <div class="conteneur">
    <div class="chiffres">
      <div class="chiffre" data-anim><span class="chiffre__valeur" data-compteur="${dinos.length}">0</span><span class="chiffre__libelle">fiches illustrées</span></div>
      <div class="chiffre" data-anim data-delai="1"><span class="chiffre__valeur" data-compteur="186">0</span><span class="chiffre__libelle">millions d’années</span></div>
      <div class="chiffre" data-anim data-delai="2"><span class="chiffre__valeur" data-compteur="${quiz.length}">0</span><span class="chiffre__libelle">questions de quiz</span></div>
      <div class="chiffre" data-anim data-delai="3"><span class="chiffre__valeur" data-compteur="5">0</span><span class="chiffre__libelle">mini-jeux</span></div>
    </div>
  </div>
</section>

<section class="section section--doux">
  <div class="conteneur">
    <h2 class="centre" data-anim>⭐ Les stars du Mésozoïque</h2>
    <p class="centre" data-anim style="max-width:60ch;margin-inline:auto">Les dinosaures les plus célèbres, ceux que tout le monde connaît. Clique sur une carte pour découvrir sa fiche complète.</p>
    <div class="grille" style="margin-top:2rem">
      ${vedettes.map((d, i) => carteDino(d, "", { delai: i, illustration: true })).join("\n      ")}
    </div>
    <p class="centre" style="margin-top:2rem"><a class="bouton" href="dinosaures.html">Voir les ${dinos.length} dinosaures →</a></p>
  </div>
</section>

<section class="section">
  <div class="conteneur">
    <h2 class="centre" data-anim>⏳ Voyage dans le temps</h2>
    <p class="centre" data-anim style="max-width:62ch;margin-inline:auto">Les dinosaures n’ont pas tous vécu en même temps ! Il s’est écoulé plus de temps entre le Stégosaure et le T-rex qu’entre le T-rex et toi.</p>
    <div class="grille grille--large" style="margin-top:2rem">
      ${periodes
        .map(
          (p, i) => `<a class="carte" href="periodes/${p.slug}.html" data-anim data-delai="${i}">
        <span class="carte__media" style="--carte-teinte:${p.couleur}33;padding:1.6rem;text-align:center;font-size:3rem" aria-hidden="true">${p.emoji}</span>
        <span class="carte__corps">
          <span class="carte__titre" style="font-weight:800;font-size:1.3rem">${esc(p.nom)}</span>
          <span class="pastille pastille--${p.slug}">${p.debut} à ${p.fin} millions d’années</span>
          <span class="carte__texte">${esc(p.resume)}</span>
          <span class="carte__pastilles"><span class="pastille">${dinos.filter((d) => d.periode === p.slug).length} créatures</span></span>
        </span>
      </a>`
        )
        .join("\n      ")}
    </div>
    <p class="centre" style="margin-top:2rem"><a class="bouton bouton--secondaire" href="frise.html">📏 Voir la frise du temps</a></p>
  </div>
</section>

<section class="section section--doux">
  <div class="conteneur">
    <h2 class="centre" data-anim>🎮 Joue et apprends</h2>
    <p class="centre" data-anim style="max-width:60ch;margin-inline:auto">Cinq jeux pour tester ce que tu as appris. Aucun score n’est enregistré : joue autant de fois que tu veux !</p>
    <div class="grille" style="margin-top:2rem">
      ${[
        ["quiz", "❓", "Le grand quiz", "10 questions tirées au hasard parmi " + quiz.length + ". Trois niveaux de difficulté."],
        ["vrai-ou-faux", "⚖️", "Vrai ou faux", "Démêle le vrai du faux sur les dinosaures. Attention aux pièges !"],
        ["qui-suis-je", "🔍", "Qui suis-je ?", "Devine le dinosaure caché grâce à des indices. Moins tu en demandes, plus tu marques de points."],
        ["memory", "🧠", "Memory", "Retrouve les 8 paires de dinosaures le plus vite possible."],
        ["puzzle", "🧩", "Puzzle", "Reconstitue l’illustration d’un dinosaure, en 9 ou 16 morceaux."],
      ]
        .map(
          ([slug, emoji, nom, texte], i) => `<a class="carte" href="jeux/${slug}.html" data-anim data-delai="${i}">
        <span class="carte__media" style="padding:1.4rem;text-align:center;font-size:2.6rem" aria-hidden="true">${emoji}</span>
        <span class="carte__corps">
          <span class="carte__titre" style="font-weight:800;font-size:1.16rem">${nom}</span>
          <span class="carte__texte">${texte}</span>
        </span>
      </a>`
        )
        .join("\n      ")}
    </div>
  </div>
</section>

<section class="section">
  <div class="conteneur">
    <h2 class="centre" data-anim>🏆 Les records</h2>
    <div class="grille grille--large" style="margin-top:2rem">
      <a class="carte" href="dinosaures/${plusGrand.slug}.html" data-anim>
        <span class="carte__media" style="--carte-teinte:${plusGrand.couleurs[1]}"><img src="assets/img/dinos/${plusGrand.slug}.svg" alt="" width="400" height="280" loading="lazy"></span>
        <span class="carte__corps"><span class="pastille">🥇 Le plus grand</span><span class="carte__titre" style="font-weight:800;font-size:1.16rem">${esc(plusGrand.nom)}</span><span class="carte__texte">${plusGrand.longueur} mètres de long, soit ${esc(plusGrand.comparaison)}.</span></span>
      </a>
      <a class="carte" href="dinosaures/${plusPetit.slug}.html" data-anim data-delai="1">
        <span class="carte__media" style="--carte-teinte:${plusPetit.couleurs[1]}"><img src="assets/img/dinos/${plusPetit.slug}.svg" alt="" width="400" height="280" loading="lazy"></span>
        <span class="carte__corps"><span class="pastille">🐁 Le plus petit</span><span class="carte__titre" style="font-weight:800;font-size:1.16rem">${esc(plusPetit.nom)}</span><span class="carte__texte">${esc(plusPetit.comparaison)} : à peine ${plusPetit.poids} kilo${plusPetit.poids > 1 ? "s" : ""} !</span></span>
      </a>
      <a class="carte" href="dinosaures/${plusRapide.slug}.html" data-anim data-delai="2">
        <span class="carte__media" style="--carte-teinte:${plusRapide.couleurs[1]}"><img src="assets/img/dinos/${plusRapide.slug}.svg" alt="" width="400" height="280" loading="lazy"></span>
        <span class="carte__corps"><span class="pastille">💨 Le plus rapide</span><span class="carte__titre" style="font-weight:800;font-size:1.16rem">${esc(plusRapide.nom)}</span><span class="carte__texte">Jusqu’à ${plusRapide.vitesse} km/h en pointe.</span></span>
      </a>
    </div>
  </div>
</section>

<section class="section section--doux">
  <div class="conteneur">
    <div class="encadre encadre--attention" data-anim style="max-width:70ch;margin-inline:auto">
      <h2 class="encadre__titre">⚠️ Le piège le plus courant</h2>
      <p>Le Ptérodactyle et le Mosasaure ne sont <strong>pas</strong> des dinosaures ! Ce sont des cousins : un reptile volant et un reptile marin. Sur ce site, ${cousins.length} créatures portent l’étiquette « Pas un dinosaure » pour t’aider à ne plus te tromper.</p>
      <p style="margin-bottom:0"><a class="bouton bouton--petit" href="familles.html">🧬 Comprendre les familles</a></p>
    </div>
  </div>
</section>

<section class="section">
  <div class="conteneur centre">
    <h2 data-anim>Prêt à devenir paléontologue ?</h2>
    <p data-anim style="max-width:56ch;margin-inline:auto">Commence par le glossaire pour apprendre les mots des scientifiques, puis lance-toi dans le grand quiz.</p>
    <p data-anim>
      <a class="bouton" href="jeux/quiz.html">❓ Commencer le quiz</a>
      <a class="bouton bouton--secondaire" href="glossaire.html">🔤 Voir le glossaire</a>
    </p>
  </div>
</section>`;

  return {
    chemin: "index.html",
    html: page({
      titre: "Accueil",
      description: site.description,
      base: "",
      actif: "accueil",
      corps,
    }),
  };
}
