#!/usr/bin/env node
// Génère l'intégralité du site statique dans le dossier racine du dépôt.
//
//   node tools/build.mjs
//
// Aucune dépendance externe. Les fichiers produits sont versionnés :
// le site fonctionne ensuite sans Node, en ouvrant simplement index.html.

import { writeFileSync, mkdirSync, rmSync, existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { dinos } from "./data/dinos.mjs";
import { photos } from "./data/photos.mjs";
import { site, periodes, familles } from "./data/site.mjs";
import { illustration } from "./svg.mjs";
import { pageAccueil } from "./pages/accueil.mjs";
import { pageCatalogue, pagesFamilles, pagesPeriodes, pageFrise } from "./pages/listes.mjs";
import { pagesFiches } from "./pages/fiche.mjs";
import { pagesJeux, fichierDonnees } from "./pages/jeux.mjs";
import { pagesInfos, pagePlan, page404 } from "./pages/infos.mjs";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");

let compteFichiers = 0;
function ecrire(chemin, contenu) {
  const complet = join(RACINE, chemin);
  mkdirSync(dirname(complet), { recursive: true });
  writeFileSync(complet, contenu, "utf-8");
  compteFichiers++;
}

/* ---------- 1. Illustrations ---------- */
const dossierImages = join(RACINE, "assets/img/dinos");
if (existsSync(dossierImages)) rmSync(dossierImages, { recursive: true, force: true });
dinos.forEach((d) => ecrire(`assets/img/dinos/${d.slug}.svg`, illustration(d)));

/* Variantes plein cadre, avec décor : le puzzle serait injouable avec des pièces vides. */
const dossierPuzzle = join(RACINE, "assets/img/puzzle");
if (existsSync(dossierPuzzle)) rmSync(dossierPuzzle, { recursive: true, force: true });
dinos.forEach((d) => ecrire(`assets/img/puzzle/${d.slug}.svg`, illustration(d, { pleinCadre: true })));

/* Favicon : une empreinte de dinosaure. */
ecrire(
  "assets/img/favicon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <rect width="40" height="40" rx="9" fill="#fdf8ee"/>
  <ellipse cx="20" cy="26" rx="8.5" ry="10" fill="#1e4d3c"/>
  <ellipse cx="10.5" cy="15" rx="3.7" ry="5" fill="#1e4d3c" transform="rotate(-18 10.5 15)"/>
  <ellipse cx="20" cy="11" rx="3.7" ry="5" fill="#1e4d3c"/>
  <ellipse cx="29.5" cy="15" rx="3.7" ry="5" fill="#1e4d3c" transform="rotate(18 29.5 15)"/>
</svg>`
);

/* ---------- 2. Données des jeux ---------- */
ecrire("assets/js/donnees.js", fichierDonnees());

/* ---------- 3. Pages ---------- */
const pages = [
  pageAccueil(),
  pageCatalogue(),
  ...pagesFiches(),
  ...pagesFamilles(),
  ...pagesPeriodes(),
  pageFrise(),
  ...pagesJeux(),
  ...pagesInfos(),
  pagePlan(),
  page404(),
];

pages.forEach((p) => ecrire(p.chemin, p.html));

/* ---------- 4. Fichiers pour les moteurs de recherche ---------- */
const BASE_URL = "https://exemple.fr"; // à remplacer par l'adresse réelle du site
const aujourdhui = new Date().toISOString().slice(0, 10);

ecrire(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => p.chemin !== "404.html")
  .map(
    (p) => `  <url>
    <loc>${BASE_URL}/${p.chemin}</loc>
    <lastmod>${aujourdhui}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${p.chemin === "index.html" ? "1.0" : p.chemin.includes("/") ? "0.6" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`
);

ecrire(
  "robots.txt",
  `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`
);

/* ---------- 5. Contrôles ---------- */
const erreurs = [];

/* Chaque lien interne doit pointer vers un fichier réellement généré. */
const fichiersGeneres = new Set(pages.map((p) => p.chemin));
const cheminsAssets = new Set([
  "assets/css/style.css",
  "assets/js/site.js",
  "assets/js/catalogue.js",
  "assets/js/donnees.js",
  "assets/js/jeux/commun.js",
  "assets/js/jeux/quiz.js",
  "assets/js/jeux/vrai-faux.js",
  "assets/js/jeux/memory.js",
  "assets/js/jeux/puzzle.js",
  "assets/js/jeux/qui-suis-je.js",
  "assets/img/favicon.svg",
  ...dinos.map((d) => `assets/img/dinos/${d.slug}.svg`),
  ...dinos.map((d) => `assets/img/puzzle/${d.slug}.svg`),
  ...Object.keys(photos).map((slug) => `assets/img/photos/${slug}.webp`),
]);

pages.forEach((p) => {
  const dossier = p.chemin.includes("/") ? p.chemin.split("/")[0] + "/" : "";
  const liens = [...p.html.matchAll(/(?:href|src)="([^"#][^"]*)"/g)].map((m) => m[1]);

  liens.forEach((lien) => {
    if (/^(https?:|mailto:|data:|#|\/)/.test(lien)) return;
    const cible = lien.startsWith("../")
      ? lien.slice(3)
      : dossier + lien;
    const propre = cible.split("?")[0];
    if (!fichiersGeneres.has(propre) && !cheminsAssets.has(propre)) {
      erreurs.push(`${p.chemin} → lien cassé : ${lien} (résolu en ${propre})`);
    }
  });
});

/* Une seule balise h1 par page. */
pages.forEach((p) => {
  const n = (p.html.match(/<h1[ >]/g) || []).length;
  if (n !== 1) erreurs.push(`${p.chemin} → ${n} balise(s) h1 (il en faut exactement une)`);
});

/* Aucune photographie ne doit être publiée sans son crédit : les licences
   CC BY et CC BY-SA imposent de nommer l'auteur. */
const dossierPhotos = join(RACINE, "assets/img/photos");
if (existsSync(dossierPhotos)) {
  const surDisque = readdirSync(dossierPhotos).filter((f) => f.endsWith(".webp")).map((f) => f.replace(/\.webp$/, ""));
  surDisque.forEach((slug) => {
    if (!photos[slug]) erreurs.push(`assets/img/photos/${slug}.webp → aucun crédit dans data/photos.mjs`);
  });
  Object.keys(photos).forEach((slug) => {
    if (!surDisque.includes(slug)) erreurs.push(`crédit sans image : ${slug}`);
    else {
      const p = photos[slug];
      if (!p.auteur || !p.licence) erreurs.push(`crédit incomplet pour ${slug} (auteur ou licence manquant)`);
    }
  });
}

/* Toutes les images doivent avoir un attribut alt. */
pages.forEach((p) => {
  [...p.html.matchAll(/<img\b[^>]*>/g)].forEach((m) => {
    if (!/\salt=/.test(m[0])) erreurs.push(`${p.chemin} → image sans attribut alt : ${m[0].slice(0, 70)}…`);
  });
});

/* ---------- 6. Rapport ---------- */
console.log("");
console.log("  🦕  " + site.nom);
console.log("  " + "─".repeat(46));
console.log(`  ${dinos.length} créatures · ${periodes.length} périodes · ${familles.length} familles`);
console.log(`  ${pages.length} pages HTML générées`);
console.log(`  ${compteFichiers} fichiers écrits au total`);

if (erreurs.length) {
  console.log("");
  console.log("  ❌ " + erreurs.length + " problème(s) détecté(s) :");
  erreurs.slice(0, 25).forEach((e) => console.log("     • " + e));
  if (erreurs.length > 25) console.log(`     … et ${erreurs.length - 25} autre(s)`);
  process.exit(1);
}

console.log("  ✅ Contrôles : liens internes, titres h1, textes alternatifs, crédits des images");
console.log("");
