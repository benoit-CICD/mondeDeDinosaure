// Gabarits HTML communs à toutes les pages.

import { site, periodes, familles, regimes } from "./data/site.mjs";
import { empreinte } from "./empreintes.mjs";

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------- Mise en forme des mesures ---------- */
export function fmtLongueur(m) {
  return m < 1 ? Math.round(m * 100) + " cm" : String(m).replace(".", ",") + " m";
}
export function fmtPoids(kg) {
  if (kg >= 1000) return String(+(kg / 1000).toFixed(kg >= 10000 ? 0 : 1)).replace(".", ",") + " t";
  return kg + " kg";
}
export const fmtAge = (ma) => "−" + ma + " Ma";

export const periodeDe = (slug) => periodes.find((p) => p.slug === slug);
export const familleDe = (slug) => familles.find((f) => f.slug === slug);
export const regimeDe = (slug) => regimes.find((r) => r.slug === slug);

/* ---------- Éléments réutilisables ---------- */
export function pastillePeriode(slug) {
  const p = periodeDe(slug);
  return `<span class="pastille pastille--${p.slug}">${p.emoji} ${p.nom}</span>`;
}
export function pastilleRegime(slug) {
  const r = regimeDe(slug);
  return `<span class="pastille pastille--${r.slug}">${r.emoji} ${r.nom}</span>`;
}

const LOGO = `<svg class="logo__empreinte" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
  <ellipse cx="20" cy="25" rx="9" ry="11" fill="#1e4d3c"/>
  <ellipse cx="10" cy="13" rx="4" ry="5.5" fill="#1e4d3c" transform="rotate(-18 10 13)"/>
  <ellipse cx="20" cy="9" rx="4" ry="5.5" fill="#1e4d3c"/>
  <ellipse cx="30" cy="13" rx="4" ry="5.5" fill="#1e4d3c" transform="rotate(18 30 13)"/>
</svg>`;

function entete(base, actif) {
  const lien = (href, libelle, cle) =>
    `<li><a class="nav__lien" href="${base}${href}"${actif === cle ? ' aria-current="page"' : ""}>${libelle}</a></li>`;

  const sousFamilles = familles
    .map((f) => `<li><a href="${base}familles/${f.slug}.html">${f.emoji} ${esc(f.nom)}</a></li>`)
    .join("");
  const sousPeriodes = periodes
    .map((p) => `<li><a href="${base}periodes/${p.slug}.html">${p.emoji} ${esc(p.nom)} <small>(${p.debut} à ${p.fin} Ma)</small></a></li>`)
    .join("");

  return `<a class="lien-evitement" href="#contenu">Aller au contenu</a>
<header class="entete">
  <div class="entete__barre">
    <a class="logo" href="${base}index.html">${LOGO}<span>Le Monde des<br>Dinosaures</span></a>
    <button class="nav-bouton" type="button" aria-expanded="false" aria-controls="navigation-principale" aria-label="Menu">
      <span class="nav-bouton__trait" aria-hidden="true"></span>
      <span class="nav-bouton__trait" aria-hidden="true"></span>
      <span class="nav-bouton__trait" aria-hidden="true"></span>
    </button>
    <nav class="nav" id="navigation-principale" data-ouvert="false" aria-label="Navigation principale">
      <ul class="nav__liste">
        ${lien("index.html", "🏠 Accueil", "accueil")}
        <li><details class="nav__groupe">
          <summary>🦕 Dinosaures</summary>
          <ul class="nav__sous nav__sous--large">
            <li><a href="${base}dinosaures.html"><strong>📚 Tous les dinosaures</strong></a></li>
            <li><a href="${base}familles.html"><strong>🧬 Toutes les familles</strong></a></li>
            <li class="nav__trait"></li>
            <li><ul class="nav__familles">${sousFamilles}</ul></li>
          </ul>
        </details></li>
        <li><details class="nav__groupe">
          <summary>⏳ Périodes</summary>
          <ul class="nav__sous">
            <li><a href="${base}periodes.html"><strong>🌍 Les trois périodes</strong></a></li>
            ${sousPeriodes}
            <li><a href="${base}frise.html">📏 La frise du temps</a></li>
          </ul>
        </details></li>
        ${lien("frise.html", "📏 Frise", "frise")}
        <li><details class="nav__groupe">
          <summary>🎮 Jeux</summary>
          <ul class="nav__sous">
            <li><a href="${base}jeux.html"><strong>🎯 Tous les jeux</strong></a></li>
            <li><a href="${base}jeux/quiz.html">❓ Le grand quiz</a></li>
            <li><a href="${base}jeux/vrai-ou-faux.html">⚖️ Vrai ou faux</a></li>
            <li><a href="${base}jeux/qui-suis-je.html">🔍 Qui suis-je ?</a></li>
            <li><a href="${base}jeux/memory.html">🧠 Memory</a></li>
            <li><a href="${base}jeux/puzzle.html">🧩 Puzzle</a></li>
          </ul>
        </details></li>
        <li><details class="nav__groupe">
          <summary>📖 Comprendre</summary>
          <ul class="nav__sous">
            <li><a href="${base}glossaire.html">🔤 Glossaire</a></li>
            <li><a href="${base}questions.html">💬 Questions fréquentes</a></li>
            <li><a href="${base}extinction.html">☄️ La grande extinction</a></li>
            <li><a href="${base}metier.html">⛏️ Le métier de paléontologue</a></li>
            <li><a href="${base}a-propos.html">ℹ️ À propos du site</a></li>
          </ul>
        </details></li>
      </ul>
    </nav>
  </div>
</header>`;
}

function pied(base) {
  return `<footer class="pied">
  <div class="conteneur">
    <div class="pied__grille">
      <div>
        <h2>${esc(site.nom)}</h2>
        <p class="pied__mention">${esc(site.slogan)}.<br>
        Un site éducatif gratuit, sans publicité, sans cookie et sans collecte de données.</p>
        <p class="pied__mention">🦖 ${esc(site.description)}</p>
      </div>
      <div>
        <h2>Explorer</h2>
        <ul>
          <li><a href="${base}dinosaures.html">Tous les dinosaures</a></li>
          <li><a href="${base}familles.html">Les familles</a></li>
          <li><a href="${base}periodes.html">Les périodes</a></li>
          <li><a href="${base}frise.html">La frise du temps</a></li>
          <li><a href="${base}extinction.html">La grande extinction</a></li>
        </ul>
      </div>
      <div>
        <h2>S’amuser</h2>
        <ul>
          <li><a href="${base}jeux.html">Tous les jeux</a></li>
          <li><a href="${base}jeux/quiz.html">Le grand quiz</a></li>
          <li><a href="${base}jeux/vrai-ou-faux.html">Vrai ou faux</a></li>
          <li><a href="${base}jeux/qui-suis-je.html">Qui suis-je ?</a></li>
          <li><a href="${base}jeux/memory.html">Memory</a></li>
          <li><a href="${base}jeux/puzzle.html">Puzzle</a></li>
        </ul>
      </div>
      <div>
        <h2>Informations</h2>
        <ul>
          <li><a href="${base}a-propos.html">À propos</a></li>
          <li><a href="${base}glossaire.html">Glossaire</a></li>
          <li><a href="${base}questions.html">Questions fréquentes</a></li>
          <li><a href="${base}mentions-legales.html">Mentions légales</a></li>
          <li><a href="${base}confidentialite.html">Confidentialité</a></li>
          <li><a href="${base}accessibilite.html">Accessibilité</a></li>
          <li><a href="${base}plan-du-site.html">Plan du site</a></li>
        </ul>
      </div>
    </div>
    <div class="pied__bas">
      <p>© <span data-annee>${site.anneeCreation}</span> ${esc(site.nom)} — Illustrations originales, réutilisation libre pour un usage pédagogique.</p>
      <p><a href="#" data-haut>↑ Haut de page</a></p>
    </div>
  </div>
</footer>`;
}

/**
 * Enveloppe une page complète.
 * base : "" à la racine, "../" dans un sous-dossier.
 */
export function page({ titre, description, base = "", corps, actif = "", scripts = [], filAriane = null, classeMain = "" }) {
  const fil = filAriane
    ? `<nav class="fil-ariane conteneur" aria-label="Fil d’Ariane"><ol>${filAriane
        .map((f, i) =>
          i === filAriane.length - 1
            ? `<li><span aria-current="page">${esc(f.nom)}</span></li>`
            : `<li><a href="${base}${f.href}">${esc(f.nom)}</a></li>`
        )
        .join("")}</ol></nav>`
    : "";

  const js = ["assets/js/site.js", ...scripts]
    .map((s) => `<script src="${base}${s}${empreinte(s)}" defer></script>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="fr" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titre)} | ${esc(site.nom)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(site.nom)}">
<meta name="theme-color" content="#1e4d3c">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="${esc(site.nom)}">
<link rel="stylesheet" href="${base}assets/css/style.css${empreinte("assets/css/style.css")}">
<link rel="icon" href="${base}assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${base}assets/img/favicon.svg">
<script>window.BASE = "${base}";</script>
</head>
<body>
${entete(base, actif)}
${fil}
<main id="contenu" tabindex="-1"${classeMain ? ` class="${classeMain}"` : ""}>
${corps}
</main>
${pied(base)}
${js}
</body>
</html>`;
}

/* ---------- Carte de dinosaure pour les listes ---------- */
export function carteDino(d, base, { anim = true, delai = 0 } = {}) {
  const p = periodeDe(d.periode);
  return `<a class="carte" href="${base}dinosaures/${d.slug}.html" data-slug="${d.slug}"
  data-periode="${d.periode}" data-famille="${d.famille}" data-regime="${d.regime}"
  data-recherche="${esc(rechercheDe(d))}"${anim ? ` data-anim data-delai="${delai % 6}"` : ""}>
  <span class="carte__media" style="--carte-teinte:${d.couleurs[1]}">
    <img src="${base}assets/img/dinos/${d.slug}.svg" alt="Illustration de ${esc(d.nom)}" width="400" height="280" loading="lazy" decoding="async">
  </span>
  <span class="carte__corps">
    <span class="carte__titre h3" style="font-weight:800;font-size:1.16rem">${esc(d.nom)}</span>
    <span class="carte__texte">${esc(d.accroche)}</span>
    <span class="carte__pastilles">
      ${pastillePeriode(d.periode)}
      ${pastilleRegime(d.regime)}
      ${d.vraiDino ? "" : '<span class="pastille pastille--alerte">⚠️ Pas un dinosaure</span>'}
    </span>
  </span>
</a>`;
}

/** Chaîne sans accent utilisée par la recherche du catalogue. */
export function rechercheDe(d) {
  const f = familleDe(d.famille), p = periodeDe(d.periode), r = regimeDe(d.regime);
  return [d.nom, d.surnom || "", d.sens, f.nom, p.nom, r.nom, d.epoque, (d.lieux || []).join(" "), d.accroche]
    .join(" ")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}
