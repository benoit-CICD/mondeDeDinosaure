// Dessins des œufs et des empreintes fossiles, pour les jeux et les dossiers.
// Même principe que svg.mjs : des SVG autonomes, générés au build, sans script.

/** Générateur pseudo-aléatoire déterministe : le même œuf est toujours dessiné pareil. */
function hasard(graine) {
  let x = 0;
  for (const c of graine) x = (x * 31 + c.charCodeAt(0)) >>> 0;
  return () => {
    x = (x * 1664525 + 1013904223) >>> 0;
    return x / 4294967296;
  };
}

const r1 = (n) => Math.round(n * 10) / 10;

/* ─────────────────────────────── ŒUFS ─────────────────────────────── */

const OEUF = { w: 120, h: 150 };

/**
 * Contour d'un œuf, échantillonné en polygone fin.
 * `pointe` (0 → 1) rétrécit le haut de l'œuf ; 0 donne une sphère parfaite.
 */
function contourOeuf(cx, cy, rx, ry, pointe) {
  const pts = [];
  const n = 72;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const x = cx + rx * Math.sin(t) * (1 - pointe * 0.22 * Math.cos(t));
    const y = cy - ry * Math.cos(t);
    pts.push(`${r1(x)} ${r1(y)}`);
  }
  return "M" + pts.join(" L") + " Z";
}

/** Texture de la coquille, découpée à la forme de l'œuf. */
function motifOeuf(motif, { cx, cy, rx, ry, ligne }, alea) {
  let out = "";
  if (motif === "grains" || motif === "rugueux" || motif === "bosses") {
    const pas = motif === "rugueux" ? 7 : motif === "grains" ? 9 : 13;
    const rayon = motif === "rugueux" ? 1.5 : motif === "grains" ? 2 : 3.2;
    for (let y = cy - ry; y < cy + ry; y += pas) {
      for (let x = cx - rx; x < cx + rx; x += pas) {
        const jx = x + (alea() - 0.5) * pas * 0.8, jy = y + (alea() - 0.5) * pas * 0.8;
        out += `<circle cx="${r1(jx)}" cy="${r1(jy)}" r="${r1(rayon * (0.7 + alea() * 0.6))}" fill="${ligne}" opacity=".22"/>`;
      }
    }
  } else if (motif === "stries") {
    for (let i = -3; i <= 3; i++) {
      const x = cx + i * rx * 0.27;
      out += `<path d="M${r1(x)} ${r1(cy - ry)} Q${r1(x + i * 3)} ${r1(cy)} ${r1(x)} ${r1(cy + ry)}" fill="none" stroke="${ligne}" stroke-width="1.6" opacity=".3"/>`;
    }
  } else if (motif === "rides") {
    for (let i = -3; i <= 3; i++) {
      const y = cy + i * ry * 0.26;
      out += `<path d="M${r1(cx - rx)} ${r1(y)} q${r1(rx * 0.5)} ${r1(-5 - alea() * 4)} ${r1(rx)} 0 t${r1(rx)} 0" fill="none" stroke="${ligne}" stroke-width="1.8" opacity=".3" stroke-linecap="round"/>`;
    }
  } else if (motif === "taches") {
    for (let i = 0; i < 16; i++) {
      const x = cx + (alea() - 0.5) * rx * 1.8, y = cy + (alea() - 0.5) * ry * 1.8;
      const t = 2 + alea() * 4.5;
      out += `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r1(t)}" ry="${r1(t * (0.6 + alea() * 0.5))}" fill="#7a4a26" opacity=".55" transform="rotate(${Math.round(alea() * 180)} ${r1(x)} ${r1(y)})"/>`;
    }
  }
  return out;
}

/**
 * SVG d'un œuf. `dessin` vient de data/oeufs.mjs :
 * forme (pointe), allonge (hauteur / largeur), taille (cm), couleur, ligne, motif.
 * La taille réelle influence le dessin, sans écraser les petits œufs.
 */
export function oeufSvg(oeuf) {
  const { forme, allonge, taille, couleur, ligne, motif } = oeuf.dessin;
  const echelle = 0.5 + 0.5 * Math.min(taille, 18) / 18;
  const ry = 58 * echelle;
  const rx = Math.min(ry / allonge, 50);
  const cx = OEUF.w / 2, cy = OEUF.h - 16 - ry;
  const chemin = contourOeuf(cx, cy, rx, ry, forme);
  const id = "o-" + oeuf.id;
  const alea = hasard(oeuf.id);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${OEUF.w} ${OEUF.h}" role="img" aria-label="Œuf mystère">
<defs>
  <clipPath id="${id}-c"><path d="${chemin}"/></clipPath>
  <radialGradient id="${id}-g" cx="38%" cy="30%" r="75%">
    <stop offset="0%" stop-color="#ffffff" stop-opacity=".55"/>
    <stop offset="55%" stop-color="#ffffff" stop-opacity="0"/>
    <stop offset="100%" stop-color="#000000" stop-opacity=".16"/>
  </radialGradient>
</defs>
<ellipse cx="${cx}" cy="${OEUF.h - 13}" rx="${r1(rx * 0.95)}" ry="6" fill="#3a2a18" opacity=".16"/>
<path d="${chemin}" fill="${couleur}"/>
<g clip-path="url(#${id}-c)">${motifOeuf(motif, { cx, cy, rx, ry, ligne }, alea)}</g>
<path d="${chemin}" fill="url(#${id}-g)" stroke="${ligne}" stroke-width="3" stroke-linejoin="round"/>
</svg>`;
}

/* ───────────────────────────── EMPREINTES ───────────────────────────── */

const EMP = { w: 160, h: 160 };
const SABLE = "#e8d5b0", CREUX = "#9c7a4f", BORD = "#6e5333";

/*
 * Une empreinte est faite de doigts (traits épais arrondis) et de formes pleines
 * (talon, paume). On dessine d'abord TOUS les contours, puis TOUS les creux :
 * les morceaux se fondent ainsi en une seule trace, sans coutures.
 */
const doigt = (x1, y1, x2, y2, e, griffe = true) => ({ type: "doigt", x1, y1, x2, y2, e, griffe });
const forme = (balise) => ({ type: "forme", balise }); // balise : élément SVG sans fill ni stroke

function rendreEmpreinte(morceaux) {
  const contours = morceaux.map((m) =>
    m.type === "doigt"
      ? `<path d="M${m.x1} ${m.y1} L${m.x2} ${m.y2}" stroke="${BORD}" stroke-width="${m.e + 7}" stroke-linecap="round"/>`
      : m.balise.replace("/>", ` fill="${BORD}" stroke="${BORD}" stroke-width="7" stroke-linejoin="round"/>`)
  );
  const creux = morceaux.map((m) =>
    m.type === "doigt"
      ? `<path d="M${m.x1} ${m.y1} L${m.x2} ${m.y2}" stroke="${CREUX}" stroke-width="${m.e}" stroke-linecap="round"/>`
      : m.balise.replace("/>", ` fill="${CREUX}"/>`)
  );
  /* Les griffes pointent dans le prolongement du doigt. */
  const griffes = morceaux
    .filter((m) => m.type === "doigt" && m.griffe)
    .map(({ x1, y1, x2, y2, e }) => {
      const a = Math.atan2(y2 - y1, x2 - x1);
      const px = x2 + Math.cos(a) * e * 1.25, py = y2 + Math.sin(a) * e * 1.25;
      const bx = Math.cos(a + Math.PI / 2) * e * 0.45, by = Math.sin(a + Math.PI / 2) * e * 0.45;
      return `<path d="M${r1(x2 + bx)} ${r1(y2 + by)} L${r1(px)} ${r1(py)} L${r1(x2 - bx)} ${r1(y2 - by)} Z" fill="${BORD}"/>`;
    });
  /* Un léger relief au fond de la trace. */
  const fond = morceaux.map((m) =>
    m.type === "doigt"
      ? `<path d="M${m.x1} ${m.y1} L${m.x2} ${m.y2}" stroke="#7d5f3c" stroke-width="${Math.max(m.e * 0.35, 2)}" stroke-linecap="round" opacity=".35"/>`
      : ""
  );
  return contours.join("") + creux.join("") + fond.join("") + griffes.join("");
}

const DESSINS_EMPREINTE = {
  /* Trois doigts fins et griffus, le doigt du milieu plus long. */
  theropode: () => [
    forme(`<ellipse cx="80" cy="114" rx="17" ry="18"/>`),
    doigt(80, 110, 80, 36, 14), doigt(76, 112, 48, 60, 13), doigt(84, 112, 112, 60, 13),
  ],

  /* Deux doigts seulement : la griffe en faucille reste relevée. */
  raptor: () => [
    forme(`<ellipse cx="84" cy="116" rx="16" ry="16"/>`),
    doigt(80, 112, 76, 40, 14), doigt(88, 112, 106, 50, 13),
    forme(`<circle cx="64" cy="108" r="5"/>`),
  ],

  /* Grand pied rond, petite main en croissant devant. */
  sauropode: () => [
    forme(`<path d="M52 44 Q80 22 108 44 Q96 52 80 48 Q64 52 52 44 Z"/>`),
    forme(`<path d="M82 66 C116 64 130 92 124 116 C118 140 94 148 76 144 C50 138 36 116 40 94 C44 76 60 66 82 66 Z"/>`),
    doigt(58, 78, 54, 72, 6, false), doigt(76, 70, 75, 63, 6, false), doigt(96, 71, 99, 64, 6, false),
  ],

  /* Trois doigts larges et arrondis, comme une feuille de trèfle. */
  ornithopode: () => [
    forme(`<ellipse cx="80" cy="112" rx="28" ry="24"/>`),
    doigt(80, 104, 80, 50, 27, false), doigt(72, 106, 48, 70, 25, false), doigt(88, 106, 112, 70, 25, false),
  ],

  /* Une petite main à trois doigts, un pied allongé à quatre doigts. */
  pterosaure: () => [
    forme(`<ellipse cx="50" cy="66" rx="9" ry="7"/>`),
    doigt(46, 64, 26, 42, 7, false), doigt(50, 62, 52, 38, 7, false), doigt(54, 64, 74, 50, 7, false),
    forme(`<path d="M108 140 C94 140 90 124 92 104 C94 90 98 82 106 80 L126 80 C132 84 132 96 128 110 C124 128 120 140 108 140 Z"/>`),
    doigt(98, 84, 96, 64, 7), doigt(106, 82, 106, 60, 7), doigt(114, 82, 116, 60, 7), doigt(122, 84, 126, 64, 7),
  ],

  /* Trois doigts fins vers l'avant, un doigt vers l'arrière. */
  oiseau: () => [
    forme(`<circle cx="80" cy="100" r="7"/>`),
    doigt(80, 100, 80, 38, 8), doigt(80, 100, 46, 56, 8), doigt(80, 100, 114, 56, 8), doigt(80, 100, 80, 136, 8),
  ],
};

/** SVG d'une empreinte fossile, dans un bloc de roche sableuse. */
export function empreinteSvg(empreinte) {
  const dessin = DESSINS_EMPREINTE[empreinte.dessin];
  if (!dessin) throw new Error("Empreinte inconnue : " + empreinte.dessin + " (" + empreinte.id + ")");
  const alea = hasard(empreinte.id);
  let grains = "";
  for (let i = 0; i < 46; i++) {
    grains += `<circle cx="${r1(alea() * EMP.w)}" cy="${r1(alea() * EMP.h)}" r="${r1(0.8 + alea() * 1.6)}" fill="${BORD}" opacity=".18"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${EMP.w} ${EMP.h}" role="img" aria-label="Empreinte fossile mystère">
<rect width="${EMP.w}" height="${EMP.h}" rx="18" fill="${SABLE}"/>
${grains}
<g fill="none">${rendreEmpreinte(dessin())}</g>
</svg>`;
}
