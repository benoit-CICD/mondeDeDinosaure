import { dinos as p1 } from "./dinos-1.mjs";
import { dinos as p2 } from "./dinos-2.mjs";
import { dinos as p3 } from "./dinos-3.mjs";
import { dinos as p4 } from "./dinos-4.mjs";

export const dinos = [...p1, ...p2, ...p3, ...p4];

// Contrôles d'intégrité : un slug en double casserait la génération des pages.
const vus = new Set();
for (const d of dinos) {
  if (vus.has(d.slug)) throw new Error("Slug en double : " + d.slug);
  vus.add(d.slug);
  for (const champ of ["nom", "periode", "famille", "regime", "archetype", "accroche"]) {
    if (!d[champ]) throw new Error(`Champ « ${champ} » manquant pour ${d.slug}`);
  }
}

export const parSlug = Object.fromEntries(dinos.map((d) => [d.slug, d]));
