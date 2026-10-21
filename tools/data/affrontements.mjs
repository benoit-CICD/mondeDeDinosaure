// Les combattants des jeux « Duel de dinosaures » et « Le roi de la tour ».
//
// Puissance = 10 × log10(poids en kg) + attaque + défense + agilité
//   - le poids compte le plus : un dinosaure 10 fois plus lourd gagne 10 points ;
//   - attaque (0 à 15) et défense (0 à 12) viennent du barème (bareme-affrontements.mjs) ;
//   - agilité = vitesse / 10, plafonnée à 5 points.
// Les duels sont imaginaires : le barème ne dit pas ce qui s'est passé, il compare
// ce que les fossiles nous apprennent. Les ptérosaures et les reptiles marins sont exclus.

import { dinos } from "./dinos.mjs";
import { photos } from "./photos.mjs";
import { bareme } from "./bareme-affrontements.mjs";

/** Les deux jeux de la rubrique « Affrontement de dinos » (slugs de listeJeux). */
export const JEUX_AFFRONTEMENT = ["duel-de-dinosaures", "le-roi-de-la-tour"];

export function puissance(d, b) {
  const agilite = Math.min(5, d.vitesse / 10);
  return Math.round((10 * Math.log10(d.poids) + b.attaque + b.defense + agilite) * 10) / 10;
}

export const combattants = bareme.map((b) => {
  const d = dinos.find((x) => x.slug === b.slug);
  const p = photos[b.slug];
  return {
    slug: d.slug,
    nom: d.nom,
    poids: d.poids,
    vitesse: d.vitesse,
    ageDebut: d.ageDebut,
    ageFin: d.ageFin,
    lieux: d.lieux,
    attaque: b.attaque,
    defense: b.defense,
    arme: b.arme,
    protection: b.protection,
    atout: b.atout,
    puissance: puissance(d, b),
    photo: `assets/img/photos/${d.slug}.webp`,
    credit: p ? { auteur: p.auteur, licence: p.licence, licenceUrl: p.licenceUrl || "" } : null,
  };
});

/** Contrôles du build : chaque vrai dinosaure a une entrée correcte, sans égalité de puissance. */
export function verifierBareme() {
  const erreurs = [];
  const attendus = dinos.filter((d) => d.vraiDino).map((d) => d.slug);
  attendus.forEach((s) => { if (!bareme.some((b) => b.slug === s)) erreurs.push(`barème : ${s} manquant`); });
  bareme.forEach((b) => {
    const d = dinos.find((x) => x.slug === b.slug);
    if (!d) return erreurs.push(`barème : ${b.slug} inconnu`);
    if (!d.vraiDino) erreurs.push(`barème : ${b.slug} n’est pas un dinosaure`);
    if (!photos[b.slug]) erreurs.push(`barème : ${b.slug} n’a pas de photo`);
    if (!(b.attaque >= 0 && b.attaque <= 15) || !(b.defense >= 0 && b.defense <= 12)) erreurs.push(`barème : notes hors échelle pour ${b.slug}`);
    /* Les textes sont insérés dans « grâce à … » et « Malgré … » : possessif obligatoire, pas de point final. */
    [b.arme, b.protection].filter(Boolean).forEach((t) => {
      if (!/^(sa|son|ses) /.test(t) || /[.!]$/.test(t)) erreurs.push(`barème : forme incorrecte pour ${b.slug} : « ${t} »`);
    });
    if (!b.atout || !/[.!]$/.test(b.atout)) erreurs.push(`barème : atout manquant ou sans point final pour ${b.slug}`);
  });
  const vues = new Map();
  combattants.forEach((c) => {
    if (vues.has(c.puissance)) erreurs.push(`barème : égalité de puissance entre ${vues.get(c.puissance)} et ${c.slug}`);
    vues.set(c.puissance, c.slug);
  });
  return erreurs;
}
