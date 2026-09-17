// Empreinte de contenu ajoutée aux feuilles de style et aux scripts.
// Le suffixe ne change que si le fichier change : les navigateurs récupèrent
// la nouvelle version après une mise à jour, sans invalider tout le cache.

import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RACINE = join(dirname(fileURLToPath(import.meta.url)), "..");
const cache = new Map();

export function empreinte(chemin) {
  if (!cache.has(chemin)) {
    let valeur = "";
    try {
      valeur = "?v=" + createHash("sha1").update(readFileSync(join(RACINE, chemin))).digest("hex").slice(0, 8);
    } catch {
      valeur = ""; // fichier pas encore écrit : on n'ajoute rien
    }
    cache.set(chemin, valeur);
  }
  return cache.get(chemin);
}
