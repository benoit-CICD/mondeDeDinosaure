// Générateur d'illustrations vectorielles.
// Chaque dinosaure est dessiné à partir d'un « archétype » (forme du corps)
// décliné avec la palette de couleurs de l'espèce.
// Les SVG produits sont autonomes : animations CSS internes, aucun script.

const VB = { w: 400, h: 280, sol: 248 };

const P = (...parts) => parts.join(" ");

/** Membre dessiné en trait épais arrondi : un trait de contour + un trait de couleur. */
function limb(d, w, fill, ligne, cls = "") {
  return `<path class="${cls}" d="${d}" fill="none" stroke="${ligne}" stroke-width="${w + 7}" stroke-linecap="round" stroke-linejoin="round"/>` +
         `<path class="${cls}" d="${d}" fill="none" stroke="${fill}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/** Œil rond avec pupille, reflet et paupière qui cligne. */
function oeil(cx, cy, r, ligne) {
  return `<g class="oeil">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fffdf6" stroke="${ligne}" stroke-width="2.5"/>
      <circle class="pupille" cx="${cx + r * 0.18}" cy="${cy}" r="${r * 0.52}" fill="#2a1f1a"/>
      <circle cx="${cx + r * 0.5}" cy="${cy - r * 0.42}" r="${r * 0.22}" fill="#fff"/>
      <ellipse class="paupiere" cx="${cx}" cy="${cy}" rx="${r + 1.6}" ry="${r + 1.6}" fill="transparent"/>
    </g>`;
}

const joue = (cx, cy, r = 9) => `<ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.62}" fill="#ff8f9c" opacity=".45"/>`;

/** Rangée de petites dents blanches le long d'une mâchoire. */
function dents(x1, y1, x2, y2, n, h) {
  let out = "";
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n;
    const x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t;
    out += `<path d="M${x - 3} ${y} L${x} ${y + h} L${x + 3} ${y} Z" fill="#fffdf6"/>`;
  }
  return out;
}

/* ─────────────────────────── ARCHÉTYPES ─────────────────────────── */

function theropode(p, o = {}) {
  const { c1, c2, c3 } = p;
  const petit = o.petit;
  const s = petit ? 0.72 : 1;
  const ty = petit ? 60 : 0;

  const corps = P(
    "M34 158", "Q104 150 156 136", "Q192 126 208 110", "Q228 90 258 84",
    "Q280 80 294 66", "Q306 54 330 52", "L372 54", "Q384 58 383 72",
    "Q382 84 370 90", "L340 92", "Q318 94 308 108", "Q298 124 272 136",
    "Q240 150 206 156", "Q166 164 122 162", "Q76 160 34 158", "Z"
  );

  const museau = o.museauBec
    ? `<path d="M330 52 L378 58 Q388 64 380 72 L340 80 Z" fill="${c1}" stroke="${c3}" stroke-width="5" stroke-linejoin="round"/>`
    : "";

  const cornes = o.cornes
    ? `<path d="M336 52 l-8 -16 l16 8 Z" fill="${c2}" stroke="${c3}" stroke-width="4" stroke-linejoin="round"/>
       <path d="M356 52 l-6 -17 l15 9 Z" fill="${c2}" stroke="${c3}" stroke-width="4" stroke-linejoin="round"/>`
    : "";

  const creteDouble = o.creteDouble
    ? `<path d="M330 50 q10 -26 26 -22 q-6 12 -6 22 Z" fill="${c2}" stroke="${c3}" stroke-width="4" stroke-linejoin="round"/>
       <path d="M348 50 q12 -28 28 -20 q-9 12 -10 22 Z" fill="${c2}" stroke="${c3}" stroke-width="4" stroke-linejoin="round"/>`
    : "";

  const creteTravers = o.creteTravers
    ? `<path d="M332 50 q16 -22 40 -14 q-4 10 -2 18 Z" fill="${c2}" stroke="${c3}" stroke-width="4" stroke-linejoin="round"/>`
    : "";

  return `<g transform="translate(0 ${ty}) scale(${s}) ${petit ? "translate(56 24)" : ""}">
    ${limb("M196 148 q-26 34 -14 62 q4 12 -14 16 l-26 4", 18, c3, c3, "patte-arriere")}
    ${limb("M212 146 q-24 36 -10 64 q6 12 -12 16 l-28 4", 22, c1, c3, "")}
    <g class="queue-g">
      <path class="corps" d="${corps}" fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M50 158 Q120 152 176 140 Q206 132 224 152 Q186 162 128 162 Q84 162 50 158 Z" fill="${c2}" opacity=".55"/>
      ${museau}${cornes}${creteDouble}${creteTravers}
      ${o.museauBec ? "" : dents(336, 78, 372, 74, 5, 9)}
      ${oeil(348, 66, 9, c3)}
      ${joue(330, 78, 8)}
      ${limb("M286 116 q16 14 10 26", 11, c1, c3, "bras")}
    </g>
    ${limb("M224 146 q-22 36 -8 64 q6 12 -12 16 l-28 4", 24, c1, c3, "")}
  </g>`;
}

function spinosaure(p) {
  const { c1, c2, c3 } = p;
  return `<g>
    ${limb("M198 152 q-24 34 -12 60 q4 12 -14 16 l-24 4", 18, c3, c3)}
    <path class="voile" d="M112 152 Q140 58 208 44 Q276 34 296 112 Q262 96 212 104 Q160 112 112 152 Z"
          fill="${c2}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M150 128 Q186 74 226 66 M186 112 Q216 68 252 70 M222 104 Q252 76 276 92"
          fill="none" stroke="${c3}" stroke-width="3.5" opacity=".45" stroke-linecap="round"/>
    <g class="queue-g">
      <path class="corps" d="M24 190 Q86 186 140 164 Q186 146 214 126 Q244 106 278 106 Q300 106 316 92
            Q332 78 356 80 L390 86 Q398 92 392 102 L352 110 Q326 114 316 126 Q304 142 278 152
            Q244 166 208 170 Q140 178 84 186 Q50 190 24 190 Z"
            fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M40 188 Q104 182 156 160 Q196 142 220 150 Q184 166 132 174 Q80 184 40 188 Z" fill="${c2}" opacity=".5"/>
      ${dents(330, 100, 378, 98, 6, 8)}
      ${oeil(340, 88, 8, c3)}
      ${joue(324, 100, 7)}
      ${limb("M288 132 q16 14 12 26", 11, c1, c3, "bras")}
    </g>
    ${limb("M226 150 q-22 36 -8 62 q6 12 -12 16 l-26 4", 24, c1, c3)}
  </g>`;
}

function raptor(p, o = {}) {
  const { c1, c2, c3 } = p;
  const plumesBras = `<path d="M262 130 q-52 10 -76 40 q34 6 64 -8 q22 -10 26 -22 Z" fill="${c2}" stroke="${c3}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M238 142 q-18 12 -30 24 M254 138 q-16 14 -26 28" fill="none" stroke="${c3}" stroke-width="3" opacity=".4"/>`;
  const plumesJambes = o.quatreAiles
    ? `<path d="M196 178 q-46 14 -62 40 q32 4 58 -12 q16 -10 18 -22 Z" fill="${c2}" stroke="${c3}" stroke-width="5" stroke-linejoin="round"/>`
    : "";
  return `<g>
    ${limb("M188 150 q-20 32 -8 58 q4 12 -14 14 l-24 4", 16, c3, c3)}
    ${plumesJambes}
    <g class="queue-g">
      <path class="corps" d="M20 178 Q96 172 150 154 Q186 142 206 122 Q228 100 260 96 Q286 92 302 78
            Q318 64 342 64 L384 68 Q394 74 386 84 L344 90 Q318 94 308 108 Q296 126 266 140
            Q228 156 196 162 Q120 176 20 178 Z"
            fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M36 176 Q108 170 158 152 Q192 140 210 148 Q176 164 128 170 Q74 176 36 176 Z" fill="${c2}" opacity=".5"/>
      <path d="M40 176 q26 -22 56 -16 M92 166 q26 -24 56 -18 M144 152 q24 -22 52 -14"
            fill="none" stroke="${c3}" stroke-width="3" opacity=".35" stroke-linecap="round"/>
      ${plumesBras}
      ${dents(340, 84, 376, 82, 5, 7)}
      ${oeil(350, 76, 8, c3)}
      ${joue(334, 86, 7)}
      <path d="M312 66 q16 -16 34 -10 q-14 6 -20 16 Z" fill="${c2}" stroke="${c3}" stroke-width="3.5" stroke-linejoin="round"/>
    </g>
    ${limb("M212 148 q-20 34 -6 60 q6 12 -12 14 l-26 4", 22, c1, c3)}
  </g>`;
}

function sauropode(p, o = {}) {
  const { c1, c2, c3 } = p;
  const girafe = o.girafe;

  const corps = girafe
    ? P("M14 186", "Q64 184 106 178", "Q152 170 186 150", "Q222 128 262 126", "Q302 124 318 148",
        "Q330 172 310 188", "Q270 206 216 206", "Q148 204 94 197", "Q50 192 14 186", "Z")
    : P("M10 150", "Q60 148 100 144", "Q150 136 190 120", "Q230 106 268 112", "Q302 118 312 144",
        "Q320 170 298 186", "Q258 202 208 200", "Q148 196 98 178", "Q52 162 10 150", "Z");

  const cou = girafe
    ? P("M286 134", "Q296 96 306 62", "Q312 36 330 26", "L350 18", "Q363 22 358 36",
        "L343 44", "Q333 54 329 74", "Q321 110 317 142", "Z")
    : P("M292 122", "Q316 96 344 78", "Q362 66 380 62", "L392 60", "Q401 66 392 77",
        "L378 81", "Q360 89 346 105", "Q330 123 318 142", "Z");

  const tete = girafe
    ? `<ellipse cx="349" cy="26" rx="17" ry="12" transform="rotate(-24 349 26)" fill="${c1}" stroke="${c3}" stroke-width="5"/>
       ${oeil(348, 22, 6.5, c3)}${joue(340, 34, 5.5)}`
    : `<ellipse cx="386" cy="68" rx="17" ry="12" transform="rotate(-16 386 68)" fill="${c1}" stroke="${c3}" stroke-width="5"/>
       ${oeil(388, 64, 6.5, c3)}${joue(378, 76, 5.5)}`;

  const pattes = girafe
    ? [["M148 196 l-5 46", 22], ["M262 186 l7 56", 22], ["M176 198 l-7 48", 26], ["M288 184 l10 60", 26]]
    : [["M144 186 l-5 58", 22], ["M258 182 l7 62", 22], ["M172 192 l-7 54", 26], ["M284 184 l10 60", 26]];

  return `<g>
    ${limb(pattes[0][0], pattes[0][1], c3, c3)}
    ${limb(pattes[1][0], pattes[1][1], c3, c3)}
    <g class="queue-g">
      <path class="cou" d="${cou}" fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      ${tete}
      <path class="corps" d="${corps}" fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="${girafe
        ? "M70 188 Q140 196 210 198 Q268 198 306 184 Q262 210 196 208 Q122 204 70 188 Z"
        : "M70 166 Q140 186 208 192 Q262 196 300 182 Q256 208 190 204 Q120 196 70 166 Z"}" fill="${c2}" opacity=".5"/>
    </g>
    ${limb(pattes[2][0], pattes[2][1], c1, c3)}
    ${limb(pattes[3][0], pattes[3][1], c1, c3)}
  </g>`;
}

function stegosaure(p, o = {}) {
  const { c1, c2, c3 } = p;
  const plaques = [];
  const pts = [[120, 146], [154, 134], [190, 128], [226, 127], [260, 134]];
  pts.forEach(([x, y], i) => {
    if (o.pointes) {
      plaques.push(`<path d="M${x} ${y + 16} l${-7} ${-36} l16 ${5} Z" fill="${c2}" stroke="${c3}" stroke-width="4.5" stroke-linejoin="round"/>`);
    } else {
      const r = 27 - Math.abs(i - 2) * 5;
      plaques.push(`<path d="M${x - r * 0.7} ${y + 16} Q${x - r * 0.5} ${y - r} ${x} ${y - r * 1.15} Q${x + r * 0.55} ${y - r} ${x + r * 0.75} ${y + 16} Z"
        fill="${c2}" stroke="${c3}" stroke-width="4.5" stroke-linejoin="round"/>`);
    }
  });
  return `<g>
    ${limb("M156 168 l-6 52", 20, c3, c3)}
    ${limb("M252 162 l8 58", 20, c3, c3)}
    <g class="queue-g">
      <path class="corps" d="M18 178 Q78 176 122 160 Q158 146 196 142 Q238 138 272 150 Q302 160 322 150
            Q344 138 366 140 L388 144 Q396 152 386 160 L366 162 Q346 164 334 174 Q316 188 280 190
            Q234 194 186 188 Q100 180 18 178 Z"
            fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M40 178 Q104 176 148 162 Q192 148 240 152 Q282 156 300 168 Q250 182 190 182 Q110 182 40 178 Z" fill="${c2}" opacity=".5"/>
      ${plaques.join("")}
      <path d="M34 178 l-12 -20 M28 180 l-16 -8 M36 186 l-16 10 M44 190 l-8 18" stroke="${c3}" stroke-width="6" stroke-linecap="round" fill="none"/>
      ${oeil(366, 152, 7, c3)}
      ${joue(352, 162, 6)}
    </g>
    ${limb("M182 162 l-8 58", 24, c1, c3)}
    ${limb("M278 158 l12 62", 24, c1, c3)}
  </g>`;
}

function ankylosaure(p) {
  const { c1, c2, c3 } = p;
  let pointes = "";
  for (let i = 0; i < 6; i++) {
    const x = 118 + i * 34, y = 152 - Math.sin((i / 5) * Math.PI) * 26;
    pointes += `<path d="M${x} ${y + 10} l-7 -22 l15 3 Z" fill="${c2}" stroke="${c3}" stroke-width="4" stroke-linejoin="round"/>`;
  }
  return `<g>
    ${limb("M168 186 l-4 38", 22, c3, c3)}
    ${limb("M262 182 l6 42", 22, c3, c3)}
    <g class="queue-g">
      <circle class="massue" cx="44" cy="180" r="30" fill="${c2}" stroke="${c3}" stroke-width="6"/>
      <path d="M30 164 l-8 -14 M60 162 l10 -14 M26 198 l-12 10 M62 200 l12 10" stroke="${c3}" stroke-width="6" stroke-linecap="round"/>
      <path class="corps" d="M62 180 Q104 172 130 162 Q166 146 214 144 Q264 142 300 158 Q326 170 348 168
            Q372 166 384 176 Q392 184 382 192 L350 198 Q318 202 286 200 Q230 198 180 196 Q116 194 62 180 Z"
            fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M96 180 Q150 170 206 168 Q266 166 306 180 Q258 192 190 192 Q134 190 96 180 Z" fill="${c2}" opacity=".5"/>
      ${pointes}
      <path d="M350 168 q18 -4 30 6 q10 8 2 16 l-32 6 Z" fill="${c1}" stroke="${c3}" stroke-width="5" stroke-linejoin="round"/>
      ${oeil(358, 178, 7, c3)}
      ${joue(348, 190, 6)}
    </g>
    ${limb("M196 184 l-6 40", 26, c1, c3)}
    ${limb("M292 182 l10 42", 26, c1, c3)}
  </g>`;
}

function ceratopsien(p, o = {}) {
  const { c1, c2, c3 } = p;
  let couronne = "";
  if (o.couronne) {
    const angles = [-158, -130, -102, -74, -46];
    angles.forEach((a) => {
      const r = (a * Math.PI) / 180;
      const cx = 328, cy = 154;
      const x1 = cx + Math.cos(r) * 34, y1 = cy + Math.sin(r) * 36;
      const x2 = cx + Math.cos(r) * 74, y2 = cy + Math.sin(r) * 80;
      couronne += `<path d="M${x1 - 7} ${y1 + 5} L${x2} ${y2} L${x1 + 7} ${y1 - 5} Z" fill="${c2}" stroke="${c3}" stroke-width="4.5" stroke-linejoin="round"/>`;
    });
  }
  const cornes = o.couronne
    ? `<path d="M352 150 q22 -6 30 6 q-16 8 -30 6 Z" fill="${c2}" stroke="${c3}" stroke-width="4.5" stroke-linejoin="round"/>`
    : `<path d="M332 140 q22 -46 48 -56 q-2 24 -22 64 Z" fill="${c2}" stroke="${c3}" stroke-width="4.5" stroke-linejoin="round"/>
       <path d="M352 146 q26 -42 54 -48 q-8 24 -30 62 Z" fill="${c2}" stroke="${c3}" stroke-width="4.5" stroke-linejoin="round"/>
       <path d="M374 168 q18 -20 32 -14 q-8 16 -22 26 Z" fill="${c2}" stroke="${c3}" stroke-width="4.5" stroke-linejoin="round"/>`;
  return `<g>
    ${limb("M160 174 l-6 48", 20, c3, c3)}
    ${limb("M258 172 l8 50", 20, c3, c3)}
    ${couronne}
    <g class="queue-g">
      <path class="corps" d="M22 168 Q84 170 128 160 Q174 148 226 150 Q272 152 296 166
            Q318 178 300 190 Q252 200 190 198 Q110 194 22 168 Z"
            fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M62 172 Q126 174 176 170 Q232 166 284 178 Q232 192 166 190 Q104 186 62 172 Z" fill="${c2}" opacity=".5"/>
      <path class="collerette" d="M294 126 Q326 96 358 116 Q384 136 362 174 Q336 204 298 190 Q274 158 294 126 Z"
            fill="${c2}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M340 168 Q378 160 392 172 Q384 190 356 192 Q336 188 330 178 Z"
            fill="${c1}" stroke="${c3}" stroke-width="5.5" stroke-linejoin="round"/>
      ${cornes}
      ${oeil(344, 158, 7.5, c3)}
      ${joue(340, 176, 6)}
    </g>
    ${limb("M188 170 l-8 52", 25, c1, c3)}
    ${limb("M282 170 l10 52", 25, c1, c3)}
  </g>`;
}

function hadrosaure(p, o = {}) {
  const { c1, c2, c3 } = p;
  const crete = o.crete
    ? `<path d="M320 72 Q292 44 250 34 Q222 28 214 44 Q234 52 262 66 Q292 82 306 92 Z"
         fill="${c2}" stroke="${c3}" stroke-width="5.5" stroke-linejoin="round"/>`
    : "";
  return `<g>
    ${limb("M190 154 q-22 34 -10 60 q4 12 -14 14 l-24 4", 18, c3, c3)}
    <g class="queue-g">
      <path class="corps" d="M16 160 Q88 156 142 140 Q182 128 204 110 Q226 92 258 86
            Q282 82 300 72 Q318 62 342 66 L376 74 Q386 82 376 92 L346 96 Q322 100 312 114
            Q300 132 272 144 Q234 158 200 164 Q112 174 16 160 Z"
            fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M40 160 Q108 158 158 144 Q196 132 216 140 Q180 158 130 166 Q78 170 40 160 Z" fill="${c2}" opacity=".5"/>
      ${crete}
      <path d="M344 66 L380 76 Q390 84 378 92 L344 94 Z" fill="${c1}" stroke="${c3}" stroke-width="5" stroke-linejoin="round"/>
      ${oeil(336, 80, 8, c3)}
      ${joue(326, 92, 7)}
      ${limb("M288 120 q14 16 8 28", 11, c1, c3, "bras")}
    </g>
    ${limb("M216 152 q-22 36 -8 62 q6 12 -12 14 l-26 4", 24, c1, c3)}
  </g>`;
}

function pachycephalosaure(p) {
  const { c1, c2, c3 } = p;
  return `<g>
    ${limb("M186 156 q-22 34 -10 60 q4 12 -14 14 l-24 4", 18, c3, c3)}
    <g class="queue-g">
      <path class="corps" d="M20 164 Q92 160 146 144 Q186 132 208 114 Q230 94 262 90
            Q286 86 302 78 Q318 70 340 76 L368 88 Q376 98 364 104 L340 106 Q320 108 312 120
            Q300 138 272 148 Q234 162 200 168 Q116 178 20 164 Z"
            fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M44 164 Q112 162 162 148 Q200 136 220 144 Q184 162 134 170 Q82 174 44 164 Z" fill="${c2}" opacity=".5"/>
      <path class="dome" d="M300 80 Q306 44 338 44 Q372 44 374 78 Q352 66 300 80 Z"
            fill="${c2}" stroke="${c3}" stroke-width="5.5" stroke-linejoin="round"/>
      <path d="M302 82 l-12 2 M308 70 l-11 -5 M370 82 l13 3 M372 68 l12 -4" stroke="${c3}" stroke-width="5" stroke-linecap="round"/>
      ${oeil(332, 92, 8, c3)}
      ${joue(320, 102, 7)}
      ${limb("M284 124 q14 14 8 26", 11, c1, c3, "bras")}
    </g>
    ${limb("M212 154 q-22 36 -8 62 q6 12 -12 14 l-26 4", 24, c1, c3)}
  </g>`;
}

function therizinosaure(p) {
  const { c1, c2, c3 } = p;
  const griffes = `<path d="M252 140 q-34 26 -52 62" fill="none" stroke="${c3}" stroke-width="11" stroke-linecap="round"/>
    <path d="M252 140 q-34 26 -52 62" fill="none" stroke="#fffdf6" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M258 144 q-26 32 -38 66" fill="none" stroke="${c3}" stroke-width="11" stroke-linecap="round"/>
    <path d="M258 144 q-26 32 -38 66" fill="none" stroke="#fffdf6" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M266 146 q-18 34 -22 68" fill="none" stroke="${c3}" stroke-width="11" stroke-linecap="round"/>
    <path d="M266 146 q-18 34 -22 68" fill="none" stroke="#fffdf6" stroke-width="5.5" stroke-linecap="round"/>`;
  return `<g>
    ${limb("M186 172 q-18 30 -6 54 q4 10 -14 12 l-22 4", 20, c3, c3)}
    <g class="queue-g">
      <path class="corps" d="M28 196 Q92 194 138 180 Q174 168 194 146 Q210 124 214 100
            Q218 72 240 58 Q256 48 278 50 L306 56 Q316 64 306 74 L286 78 Q266 84 260 104
            Q252 136 234 158 Q212 184 168 196 Q100 208 28 196 Z"
            fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M52 196 Q112 194 152 180 Q186 166 202 172 Q172 192 126 200 Q78 204 52 196 Z" fill="${c2}" opacity=".5"/>
      <path d="M60 192 q22 -20 48 -14 M112 184 q22 -22 48 -14 M162 168 q18 -22 42 -16"
            fill="none" stroke="${c3}" stroke-width="3" opacity=".35" stroke-linecap="round"/>
      <path d="M286 52 L318 58 Q328 66 316 74 L288 76 Z" fill="${c1}" stroke="${c3}" stroke-width="5" stroke-linejoin="round"/>
      ${oeil(280, 64, 7.5, c3)}
      ${joue(268, 74, 6)}
      ${limb("M228 112 q22 18 26 32", 13, c1, c3, "bras")}
      ${griffes}
    </g>
    ${limb("M212 170 q-18 32 -4 56 q6 10 -12 12 l-24 4", 25, c1, c3)}
  </g>`;
}

function oiseauPrimitif(p) {
  const { c1, c2, c3 } = p;
  return `<g transform="translate(20 20) scale(0.92)">
    ${limb("M196 168 q-12 28 2 46 q4 10 -12 12 l-20 2", 12, c3, c3)}
    <g class="queue-g">
      <path class="aile" d="M212 126 Q140 110 74 140 Q128 168 192 158 Q218 152 226 140 Z"
            fill="${c2}" stroke="${c3}" stroke-width="5.5" stroke-linejoin="round"/>
      <path class="corps" d="M28 206 Q96 188 148 170 Q186 156 206 134 Q222 114 250 106
            Q272 100 288 86 Q302 74 322 78 L352 86 Q360 94 350 102 L326 104 Q308 106 300 118
            Q290 136 266 148 Q234 162 206 168 Q120 188 28 206 Z"
            fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M40 200 q28 -18 54 -12 M92 184 q26 -20 52 -12 M144 166 q22 -20 46 -14"
            fill="none" stroke="${c3}" stroke-width="3" opacity=".35" stroke-linecap="round"/>
      <path d="M322 78 L358 88 Q366 96 356 102 L326 104 Z" fill="${c1}" stroke="${c3}" stroke-width="5" stroke-linejoin="round"/>
      ${oeil(318, 92, 7.5, c3)}
      ${joue(306, 102, 6)}
      <path class="aile2" d="M228 134 Q170 132 118 158 Q166 178 216 164 Q238 156 242 146 Z"
            fill="${c1}" stroke="${c3}" stroke-width="5.5" stroke-linejoin="round" opacity=".92"/>
    </g>
    ${limb("M214 162 q-12 30 4 48 q4 10 -12 12 l-22 2", 15, c1, c3)}
  </g>`;
}

function pterosaure(p, o = {}) {
  const { c1, c2, c3 } = p;
  const crete = o.geant
    ? `<path d="M314 62 Q330 28 366 26 Q356 48 352 66 Z" fill="${c2}" stroke="${c3}" stroke-width="5" stroke-linejoin="round"/>`
    : `<path d="M318 64 q18 -16 34 -12 q-14 8 -18 18 Z" fill="${c2}" stroke="${c3}" stroke-width="4" stroke-linejoin="round"/>`;
  return `<g>
    <path class="aile-gauche" d="M196 116 Q120 96 34 128 Q96 158 168 150 Q196 146 208 132 Z"
          fill="${c2}" stroke="${c3}" stroke-width="5.5" stroke-linejoin="round"/>
    <path d="M60 128 Q116 126 176 138 M88 142 Q134 138 182 146" fill="none" stroke="${c3}" stroke-width="3" opacity=".4"/>
    <g class="queue-g">
      <path class="corps" d="M186 118 Q214 104 244 100 Q272 96 292 80 Q308 68 330 70 L374 76
            Q386 84 374 94 L336 98 Q312 102 300 116 Q284 134 250 142 Q212 148 188 140 Q176 128 186 118 Z"
            fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      ${crete}
      ${oeil(330, 84, 8, c3)}
      ${joue(318, 96, 6)}
      ${limb("M214 140 q-4 26 -16 40", 12, c1, c3)}
      ${limb("M240 140 q6 26 -2 42", 12, c1, c3)}
    </g>
    <path class="aile-droite" d="M214 120 Q268 132 320 170 Q262 184 214 160 Q196 148 198 132 Z"
          fill="${c1}" stroke="${c3}" stroke-width="5.5" stroke-linejoin="round" opacity=".95"/>
    <path d="M232 134 Q266 148 300 168" fill="none" stroke="${c3}" stroke-width="3" opacity=".4"/>
  </g>`;
}

function reptileMarin(p) {
  const { c1, c2, c3 } = p;
  return `<g>
    <path class="nageoire-arriere" d="M64 130 Q34 92 20 70 Q56 92 78 118 Z" fill="${c2}" stroke="${c3}" stroke-width="5.5" stroke-linejoin="round"/>
    <path d="M62 136 Q30 160 14 186 Q52 168 80 146 Z" fill="${c2}" stroke="${c3}" stroke-width="5.5" stroke-linejoin="round"/>
    <g class="queue-g">
      <path class="corps" d="M70 134 Q118 96 186 92 Q252 88 300 106 Q336 120 366 122
            Q388 124 394 132 Q388 142 366 144 Q336 146 300 160 Q252 178 186 174 Q118 170 70 134 Z"
            fill="${c1}" stroke="${c3}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M110 148 Q170 174 246 172 Q302 170 344 150 Q300 176 226 180 Q152 180 110 148 Z" fill="${c2}" opacity=".55"/>
      <path class="aileron" d="M198 92 Q206 58 230 52 Q236 74 234 94 Z" fill="${c1}" stroke="${c3}" stroke-width="5.5" stroke-linejoin="round"/>
      ${dents(330, 138, 380, 136, 6, 7)}
      ${oeil(324, 122, 8.5, c3)}
      ${joue(312, 136, 6)}
      <path class="nageoire-avant" d="M216 160 Q232 194 268 200 Q258 172 246 158 Z" fill="${c1}" stroke="${c3}" stroke-width="5.5" stroke-linejoin="round"/>
    </g>
  </g>`;
}

const ARCHETYPES = {
  "theropode-grand": (p) => theropode(p),
  "theropode-petit": (p) => theropode(p, { petit: true }),
  "theropode-cornu": (p) => theropode(p, { cornes: true }),
  "theropode-autruche": (p) => theropode(p, { museauBec: true }),
  "theropode-crete": (p) => theropode(p, { creteDouble: true }),
  "theropode-crete-travers": (p) => theropode(p, { creteTravers: true }),
  "spinosaure": (p) => spinosaure(p),
  "raptor": (p) => raptor(p),
  "raptor-plume": (p) => raptor(p, { quatreAiles: true }),
  "sauropode": (p) => sauropode(p),
  "sauropode-girafe": (p) => sauropode(p, { girafe: true }),
  "stegosaure": (p) => stegosaure(p),
  "stegosaure-pointes": (p) => stegosaure(p, { pointes: true }),
  "ankylosaure": (p) => ankylosaure(p),
  "ceratopsien": (p) => ceratopsien(p),
  "ceratopsien-couronne": (p) => ceratopsien(p, { couronne: true }),
  "hadrosaure": (p) => hadrosaure(p),
  "hadrosaure-crete": (p) => hadrosaure(p, { crete: true }),
  "pachycephalosaure": (p) => pachycephalosaure(p),
  "therizinosaure": (p) => therizinosaure(p),
  "oiseau-primitif": (p) => oiseauPrimitif(p),
  "pterosaure": (p) => pterosaure(p),
  "pterosaure-geant": (p) => pterosaure(p, { geant: true }),
  "reptile-marin": (p) => reptileMarin(p),
};

const STYLE = `
  .corps, .queue-g { transform-box: fill-box; transform-origin: 70% 60%; }
  .queue-g { animation: respire 4.4s ease-in-out infinite; }
  .paupiere { animation: cligne 6s ease-in-out infinite; }
  .bras { transform-box: fill-box; transform-origin: 0% 0%; animation: salue 3.6s ease-in-out infinite; }
  .aile-gauche, .aile-droite, .aile, .aile2 { transform-box: fill-box; transform-origin: 90% 50%; animation: bat 2.6s ease-in-out infinite; }
  .aile-droite, .aile2 { transform-origin: 10% 50%; animation-delay: -.2s; }
  .massue { transform-box: fill-box; transform-origin: 50% 50%; animation: balance 3.2s ease-in-out infinite; }
  @keyframes respire { 0%,100% { transform: scale(1,1); } 50% { transform: scale(1.012,1.022); } }
  @keyframes cligne { 0%,92%,100% { fill: transparent; } 95% { fill: var(--peau); } }
  @keyframes salue { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-11deg); } }
  @keyframes bat { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(-7deg); } }
  @keyframes balance { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
`;

/** Décor plein cadre : utilisé par le puzzle, où une image vide serait injouable. */
function scene(c1, c2, c3, slug) {
  const id = "d-" + slug;
  return `<defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c2}"/>
      <stop offset="70%" stop-color="#fdf3e0"/>
    </linearGradient>
  </defs>
  <rect width="${VB.w}" height="${VB.h}" fill="url(#${id})"/>
  <circle cx="330" cy="54" r="30" fill="#ffc861"/>
  <circle cx="330" cy="54" r="42" fill="#ffc861" opacity=".28"/>
  <ellipse cx="86" cy="46" rx="36" ry="14" fill="#fff" opacity=".8"/>
  <ellipse cx="112" cy="38" rx="24" ry="16" fill="#fff" opacity=".8"/>
  <ellipse cx="236" cy="30" rx="28" ry="11" fill="#fff" opacity=".55"/>
  <path d="M0 176 L74 108 L120 158 L168 112 L248 176 Z" fill="${c3}" opacity=".35"/>
  <path d="M256 176 L318 100 L380 176 Z" fill="${c3}" opacity=".5"/>
  <path d="M0 ${VB.sol - 14} Q90 ${VB.sol - 32} 190 ${VB.sol - 16} T400 ${VB.sol - 22} L400 ${VB.h} L0 ${VB.h} Z" fill="${c3}" opacity=".22"/>
  <path d="M0 ${VB.sol + 8} Q110 ${VB.sol - 6} 220 ${VB.sol + 6} T400 ${VB.sol} L400 ${VB.h} L0 ${VB.h} Z" fill="${c3}" opacity=".38"/>
  <g fill="${c3}" opacity=".6">
    <path d="M22 ${VB.h - 6} q-12 -32 3 -52 q7 22 15 30 q3 -22 12 -33 q7 24 4 55 Z"/>
    <path d="M362 ${VB.h - 6} q-13 -30 0 -49 q9 19 16 25 q2 -19 10 -30 q8 22 5 54 Z"/>
  </g>`;
}

/** SVG complet et autonome pour un dinosaure. */
export function illustration(dino, { decor = true, pleinCadre = false } = {}) {
  const [c1, c2, c3] = dino.couleurs;
  const fn = ARCHETYPES[dino.archetype];
  if (!fn) throw new Error("Archétype inconnu : " + dino.archetype + " (" + dino.slug + ")");
  const corps = fn({ c1, c2, c3 });
  const ombre = `<ellipse cx="205" cy="${VB.sol + 8}" rx="150" ry="13" fill="${c3}" opacity=".16"/>`;
  const fond = pleinCadre
    ? scene(c1, c2, c3, dino.slug)
    : decor
      ? `<path d="M0 ${VB.sol + 4} Q60 ${VB.sol - 6} 130 ${VB.sol + 2} T270 ${VB.sol + 2} T400 ${VB.sol - 2} L400 ${VB.h} L0 ${VB.h} Z" fill="${c3}" opacity=".10"/>`
      : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB.w} ${VB.h}" role="img" aria-label="Illustration de ${dino.nom}" style="--peau:${c1}">
<title>${dino.nom}</title>
<style>${STYLE}</style>
${fond}${ombre}${corps}
</svg>`;
}

export const archetypesConnus = Object.keys(ARCHETYPES);
