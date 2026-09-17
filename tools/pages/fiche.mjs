// Page individuelle d'un dinosaure.

import { dinos } from "../data/dinos.mjs";
import { site } from "../data/site.mjs";
import {
  page, esc, carteDino, periodeDe, familleDe, regimeDe,
  fmtLongueur, fmtPoids, pastillePeriode, pastilleRegime,
  imageDoc, aUnePhoto, credit,
} from "../templates.mjs";

const PLUS_LONG = Math.max(...dinos.map((d) => d.longueur));

/** Silhouette d'enfant pour l'échelle de comparaison. */
function comparaisonTaille(d) {
  const hauteurEnfant = 1.3; // mètres
  const ref = Math.max(d.longueur, d.hauteur, hauteurEnfant * 1.6);
  const echelle = 150 / ref;
  const hEnfant = hauteurEnfant * echelle;
  const lDino = Math.min(d.longueur * echelle, 300);
  const hDino = Math.max(d.hauteur * echelle, 16);

  return `<div class="encadre">
  <h3 class="encadre__titre">📏 Comparaison de taille</h3>
  <p>Voici ${esc(d.nom)} à côté d’un enfant de 1,30 m.</p>
  <svg viewBox="0 0 360 180" role="img" aria-label="Comparaison : ${esc(d.nom)} mesure ${fmtLongueur(d.longueur)} de long et ${String(d.hauteur).replace(".", ",")} mètres de haut, contre 1,30 m pour un enfant." style="width:100%;max-width:480px">
    <line x1="0" y1="165" x2="360" y2="165" stroke="var(--bordure)" stroke-width="2"/>
    <g transform="translate(12 ${165 - hEnfant})">
      <circle cx="10" cy="${hEnfant * 0.12}" r="${hEnfant * 0.11}" fill="#5d5145"/>
      <rect x="4" y="${hEnfant * 0.24}" width="12" height="${hEnfant * 0.44}" rx="5" fill="#5d5145"/>
      <rect x="5" y="${hEnfant * 0.66}" width="4" height="${hEnfant * 0.34}" rx="2" fill="#5d5145"/>
      <rect x="12" y="${hEnfant * 0.66}" width="4" height="${hEnfant * 0.34}" rx="2" fill="#5d5145"/>
    </g>
    <g transform="translate(50 ${165 - hDino})">
      <rect x="0" y="0" width="${lDino}" height="${hDino}" rx="${Math.min(hDino / 2, 26)}" fill="${d.couleurs[0]}" opacity=".85"/>
      <text x="${lDino / 2}" y="${hDino / 2 + 5}" text-anchor="middle" fill="#fff" font-size="14" font-weight="800">${fmtLongueur(d.longueur)}</text>
    </g>
    <text x="12" y="178" font-size="11" fill="var(--texte-doux)">1,30 m</text>
  </svg>
</div>`;
}

export function pagesFiches() {
  return dinos.map((d, i) => {
    const p = periodeDe(d.periode);
    const f = familleDe(d.famille);
    const r = regimeDe(d.regime);
    const precedent = dinos[(i - 1 + dinos.length) % dinos.length];
    const suivant = dinos[(i + 1) % dinos.length];

    const voisins = dinos
      .filter((x) => x.slug !== d.slug && (x.famille === d.famille || x.periode === d.periode))
      .sort((a, b) => (a.famille === d.famille ? -1 : 1) - (b.famille === d.famille ? -1 : 1))
      .slice(0, 3);

    const avertissement = d.vraiDino
      ? ""
      : `<div class="encadre encadre--attention">
  <h3 class="encadre__titre">⚠️ Attention, ce n’est pas un dinosaure !</h3>
  <p>${esc(d.nom)} appartient au groupe des <strong>${esc(f.nom.toLowerCase())}</strong>. Ces animaux ont vécu à la même époque que les dinosaures et sont leurs cousins, mais ils ne font pas partie de la famille des dinosaures. ${esc(f.detail)}</p>
</div>`;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${d.nom} — fiche dinosaure pour les enfants`,
      about: { "@type": "Thing", name: d.nom },
      inLanguage: "fr",
      isFamilyFriendly: true,
      publisher: { "@type": "Organization", name: site.nom },
      description: d.accroche,
    };

    const corps = `
<div class="conteneur section">
  <div class="fiche__entete">
    <div data-anim>
      <div class="fiche__pastilles">
        ${pastillePeriode(d.periode)}
        ${pastilleRegime(d.regime)}
        <span class="pastille">${f.emoji} ${esc(f.nom)}</span>
        ${d.vraiDino ? "" : '<span class="pastille pastille--alerte">⚠️ Pas un dinosaure</span>'}
      </div>
      <h1>${esc(d.nom)}</h1>
      ${d.surnom ? `<p class="fiche__prononciation">Surnommé « ${esc(d.surnom)} »</p>` : ""}
      <p class="fiche__prononciation">🗣️ On prononce : <strong>${esc(d.prononciation)}</strong> — ${esc(d.sens)}</p>
      <p class="fiche__accroche">${esc(d.accroche)}</p>
      <p><button class="bouton bouton--ambre bouton--petit" type="button" onclick="this.nextElementSibling.hidden=!this.nextElementSibling.hidden">🔊 Son cri ?</button>
      <span hidden style="font-weight:900;font-size:1.2rem;color:${d.couleurs[2]}"> ${esc(d.cri)}</span></p>
    </div>
    <figure class="fiche__illustration" data-anim data-delai="1" style="margin:0">
      <img src="${imageDoc(d, "../").src}" alt="${aUnePhoto(d.slug) ? `Reconstitution de ${esc(d.nom)}` : `Illustration de ${esc(d.nom)}`}" width="400" height="280">
      <figcaption class="fiche__credit">${aUnePhoto(d.slug) ? credit(d.slug) : "Illustration originale du site."}</figcaption>
    </figure>
  </div>

  <div class="stats" data-anim>
    <div class="stat"><div class="stat__icone" aria-hidden="true">📏</div><span class="stat__valeur">${fmtLongueur(d.longueur)}</span><span class="stat__libelle">Longueur</span></div>
    <div class="stat"><div class="stat__icone" aria-hidden="true">📐</div><span class="stat__valeur">${String(d.hauteur).replace(".", ",")} m</span><span class="stat__libelle">Hauteur</span></div>
    <div class="stat"><div class="stat__icone" aria-hidden="true">⚖️</div><span class="stat__valeur">${fmtPoids(d.poids)}</span><span class="stat__libelle">Poids</span></div>
    <div class="stat"><div class="stat__icone" aria-hidden="true">💨</div><span class="stat__valeur">${d.vitesse} km/h</span><span class="stat__libelle">Vitesse</span></div>
  </div>

  <div class="barre-taille" data-anim>
    <div class="barre-taille__piste">
      <div class="barre-taille__jauge" data-valeur="${Math.round((d.longueur / PLUS_LONG) * 100)}"></div>
    </div>
    <div class="barre-taille__legende">
      <span>Sa taille sur le site : <strong>${fmtLongueur(d.longueur)}</strong> (${esc(d.comparaison)})</span>
      <span>Record : ${fmtLongueur(PLUS_LONG)}</span>
    </div>
  </div>

  ${avertissement}

  <div class="grille grille--deux" style="align-items:start">
    <div class="prose" data-anim>
      <h2>Qui était ${esc(d.nom)} ?</h2>
      ${d.paragraphes.map((t) => `<p>${esc(t)}</p>`).join("\n      ")}

      <div class="encadre encadre--pouvoir">
        <h3 class="encadre__titre">⚡ Son super-pouvoir : ${esc(d.superPouvoir.titre)}</h3>
        <p>${esc(d.superPouvoir.texte)}</p>
      </div>

      <h2>Le savais-tu ?</h2>
      <ul class="savais-tu">
        ${d.saviezVous.map((s) => `<li><span>${esc(s)}</span></li>`).join("\n        ")}
      </ul>
    </div>

    <div data-anim data-delai="1">
      <div class="encadre">
        <h3 class="encadre__titre">🪪 Carte d’identité</h3>
        <table class="tableau-info">
          <tbody>
            <tr><th scope="row">Nom complet</th><td>${esc(d.nom)}</td></tr>
            <tr><th scope="row">Signification</th><td>${esc(d.sens)}</td></tr>
            <tr><th scope="row">Prononciation</th><td>${esc(d.prononciation)}</td></tr>
            <tr><th scope="row">Période</th><td><a href="../periodes/${p.slug}.html">${p.emoji} ${esc(p.nom)}</a></td></tr>
            <tr><th scope="row">Époque précise</th><td>${esc(d.epoque)}</td></tr>
            <tr><th scope="row">A vécu il y a</th><td>${d.ageDebut} à ${d.ageFin} millions d’années</td></tr>
            <tr><th scope="row">Famille</th><td><a href="../familles/${f.slug}.html">${f.emoji} ${esc(f.nom)}</a></td></tr>
            <tr><th scope="row">Régime</th><td>${r.emoji} ${esc(r.nom)} — ${esc(r.texte)}</td></tr>
            <tr><th scope="row">Où vivait-il ?</th><td>${d.lieux.map(esc).join(", ")}</td></tr>
            <tr><th scope="row">Découvert en</th><td>${d.decouverte.annee}, à ${esc(d.decouverte.lieu)}</td></tr>
            <tr><th scope="row">Découvert par</th><td>${esc(d.decouverte.par)}</td></tr>
          </tbody>
        </table>
      </div>
      ${comparaisonTaille(d)}
      <div class="encadre">
        <h3 class="encadre__titre">🎮 Envie de jouer ?</h3>
        <p>Teste tes connaissances sur ${esc(d.nom)} et les autres dinosaures !</p>
        <p><a class="bouton bouton--petit" href="../jeux/quiz.html">❓ Le grand quiz</a>
           <a class="bouton bouton--petit bouton--secondaire" href="../jeux/qui-suis-je.html">🔍 Qui suis-je ?</a></p>
      </div>
    </div>
  </div>

  <h2 style="margin-top:2.5rem">À découvrir aussi</h2>
  <div class="grille">
    ${voisins.map((v, j) => carteDino(v, "../", { delai: j })).join("\n    ")}
  </div>

  <nav class="pagination-fiche" aria-label="Fiche précédente et suivante">
    <a class="bouton bouton--secondaire" href="${precedent.slug}.html">← ${esc(precedent.nom)}</a>
    <a class="bouton bouton--secondaire" href="${suivant.slug}.html">${esc(suivant.nom)} →</a>
  </nav>
</div>
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

    return {
      chemin: `dinosaures/${d.slug}.html`,
      html: page({
        titre: d.nom,
        description: `${d.nom} : ${d.accroche} Taille, poids, époque, régime alimentaire et anecdotes, expliqués simplement aux enfants.`,
        base: "../",
        actif: "dinosaures",
        corps,
        filAriane: [
          { nom: "Accueil", href: "index.html" },
          { nom: "Dinosaures", href: "dinosaures.html" },
          { nom: d.nom },
        ],
      }),
    };
  });
}
