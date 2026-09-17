#!/usr/bin/env node
// Récupère sur Wikimedia Commons une photographie ou une restauration pour chaque créature.
//
//   node tools/photos.mjs            # complète ce qui manque
//   node tools/photos.mjs --force    # retélécharge tout
//
// Ce script est SÉPARÉ du build : il a besoin du réseau, le build non.
// Il écrit les images dans assets/img/photos/ et les crédits dans tools/data/photos.mjs.
// Seules les licences libres sont retenues (domaine public, CC0, CC BY, CC BY-SA) ;
// les mentions « non commercial » et « pas de modification » sont rejetées.

import { writeFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { dinos } from "./data/dinos.mjs";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOSSIER = join(RACINE, "assets/img/photos");
const FORCE = process.argv.includes("--force");
const UA = { "User-Agent": "MondeDesDinosaures/1.0 (site educatif francais pour enfants)" };

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(hote, params, essai = 0) {
  const u = `https://${hote}/w/api.php?format=json&` +
    Object.entries(params).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&");
  const r = await fetch(u, { headers: UA });
  const txt = await r.text();
  if (!txt.startsWith("{")) {
    if (essai < 5) { await pause(4000 * (essai + 1)); return api(hote, params, essai + 1); }
    throw new Error("API indisponible : " + txt.slice(0, 80));
  }
  await pause(1200);
  return JSON.parse(txt);
}

/* Le titre de l'article anglais diffère parfois du nom affiché sur le site. */
const ARTICLES = {
  tyrannosaurus: "Tyrannosaurus",
  velociraptor: "Velociraptor",
  pterodactylus: "Pterodactylus",
  ichthyosaurus: "Ichthyosaurus",
  mosasaurus: "Mosasaurus",
  archaeopteryx: "Archaeopteryx",
};

/* Un fichier doit ressembler à une restauration d'animal vivant, pas à un os isolé. */
const BON = /restoration|reconstruction|\blife\b|\bNT\b|nobu|tamura|durbed|bogdanov|paleoart|dinosaur/i;
const MAUVAIS = new RegExp(
  [
    "skelet", "skull", "fossil", "mount", "bone", "tooth", "teeth", "claw", "footprint",
    "track", "nest", "egg", "\\bmap\\b", "scale", "chart", "diagram", "comparison",
    "phylogen", "cladogram", "holotype", "specimen", "quarry", "vertebra", "femur",
    "jaw", "locality", "stratigra", "distribution", "silhouette", "\\bsize\\b", "skin",
    "kong", "movie", "film", "\\btoy\\b", "lego", "statue", "sculpture", "\\bmodel\\b",
    "\\bpark\\b", "logo", "stamp", "coin", "input device", "coprolite", "trackway",
    "\\bhand\\b", "\\bfoot\\b", "pelvis", "rib", "\\bsite\\b", "outcrop", "excavat",
  ].join("|"),
  "i"
);

const LICENCE_OK = /^(cc0|cc by|cc-by|public domain|pd-|no restrictions|attribution)/i;
const LICENCE_KO = /(non[- ]?commercial|noncommercial|\bnc\b|no derivative|\bnd\b|fair use|copyright)/i;

const propre = (v) => (v ? String(v.value).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() : "");

/** Cherche le meilleur fichier illustrant ce genre. */
async function trouverFichier(genre, article) {
  const rx = new RegExp(genre.replace(/[^a-z]/gi, ""), "i");

  const j = await api("en.wikipedia.org", {
    action: "query", prop: "images", titles: article, imlimit: "100",
  });
  const page = Object.values(j.query.pages)[0];
  const candidats = (page.images || [])
    .map((i) => i.title)
    .filter((t) => /\.(jpe?g|png)$/i.test(t) && rx.test(t.replace(/[^a-z]/gi, "")))
    .map((t) => ({ t, s: (BON.test(t) ? 3 : 0) - (MAUVAIS.test(t) ? 5 : 0) }))
    .sort((a, b) => b.s - a.s);

  if (candidats.length) return candidats.map((c) => c.t);
  return [];
}

/** Métadonnées + URL de la miniature, si la licence est libre. */
async function metadonnees(fichier, largeur) {
  const j = await api("commons.wikimedia.org", {
    action: "query", prop: "imageinfo",
    iiprop: "url|extmetadata|mime|size|user",
    iiurlwidth: String(largeur),
    titles: fichier,
  });
  const p = Object.values(j.query.pages)[0];
  const ii = p.imageinfo && p.imageinfo[0];
  if (!ii) return null;

  const m = ii.extmetadata || {};
  const licence = propre(m.LicenseShortName) || propre(m.License);
  const conditions = propre(m.UsageTerms);

  if (LICENCE_KO.test(licence + " " + conditions)) return { refus: "licence restrictive : " + licence };
  if (!LICENCE_OK.test(licence)) return { refus: "licence non reconnue : " + (licence || "inconnue") };
  if (ii.width < 500) return { refus: "image trop petite" };

  return {
    fichier: fichier.replace(/^File:/, ""),
    url: ii.thumburl || ii.url,
    page: ii.descriptionurl,
    auteur: propre(m.Artist) || ii.user || "Auteur inconnu",
    licence,
    licenceUrl: propre(m.LicenseUrl),
    largeur: ii.thumbwidth || ii.width,
    hauteur: ii.thumbheight || ii.height,
  };
}

/* ------------------------------------------------------------------ */

mkdirSync(DOSSIER, { recursive: true });

const fichierCredits = join(RACINE, "tools/data/photos.mjs");
let credits = {};
if (existsSync(fichierCredits) && !FORCE) {
  credits = (await import("./data/photos.mjs")).photos;
}

const manuel = JSON.parse(
  existsSync(join(RACINE, "tools/data/photos-manuel.json"))
    ? readFileSync(join(RACINE, "tools/data/photos-manuel.json"), "utf-8")
    : "{}"
);

let ok = 0, echecs = [];

for (const d of dinos) {
  const cible = join(DOSSIER, `${d.slug}.webp`);
  if (credits[d.slug] && existsSync(cible) && !FORCE) { ok++; continue; }

  const genre = d.nom.split(" ")[0];
  const article = ARTICLES[d.slug] || genre;

  try {
    let liste = manuel[d.slug] ? ["File:" + manuel[d.slug]] : await trouverFichier(genre, article);
    if (!liste.length) { echecs.push(`${d.slug} : aucun candidat`); continue; }

    let meta = null, raison = "";
    for (const f of liste.slice(0, 6)) {
      const m = await metadonnees(f, 900);
      if (m && !m.refus) { meta = m; break; }
      if (m) raison = m.refus;
    }
    if (!meta) { echecs.push(`${d.slug} : ${raison || "aucune licence libre"}`); continue; }

    /* Téléchargement puis conversion en WebP (plus léger, bien supporté). */
    const brut = join(DOSSIER, `_${d.slug}.tmp`);
    const reponse = await fetch(meta.url, { headers: UA });
    if (!reponse.ok) { echecs.push(`${d.slug} : téléchargement ${reponse.status}`); continue; }
    writeFileSync(brut, Buffer.from(await reponse.arrayBuffer()));

    execFileSync("cwebp", ["-quiet", "-q", "78", "-resize", "900", "0", brut, "-o", cible]);
    execFileSync("rm", ["-f", brut]);

    credits[d.slug] = {
      fichier: meta.fichier,
      auteur: meta.auteur,
      licence: meta.licence,
      licenceUrl: meta.licenceUrl,
      page: meta.page,
    };
    ok++;
    console.log(`  ✓ ${d.slug.padEnd(22)} ${meta.licence.padEnd(14)} ${meta.fichier.slice(0, 48)}`);
  } catch (e) {
    echecs.push(`${d.slug} : ${e.message}`);
  }
}

/* Tri par slug pour un diff git stable. */
const triees = Object.fromEntries(Object.keys(credits).sort().map((k) => [k, credits[k]]));

writeFileSync(
  fichierCredits,
  `// Crédits des photographies — GÉNÉRÉ par tools/photos.mjs, ne pas modifier à la main.
// Toutes les images proviennent de Wikimedia Commons sous licence libre.
export const photos = ${JSON.stringify(triees, null, 2)};
`,
  "utf-8"
);

console.log(`\n  ${ok} image(s) disponible(s) sur ${dinos.length}`);
if (echecs.length) {
  console.log(`  ${echecs.length} à traiter à la main :`);
  echecs.forEach((e) => console.log("     • " + e));
  console.log("\n  Ajouter le nom du fichier Commons dans tools/data/photos-manuel.json :");
  console.log('     { "slug": "Nom Du Fichier.jpg" }');
}
