// Décor d'hiver de la scène d'accueil (tools/pages/accueil.mjs), dans le repère
// du dessin (520 × 380) : ciel d'hiver, neige sur le volcan et les fougères,
// bonhomme de neige et écharpe du dinosaure. En décembre (html.noel), un sapin
// décoré, des cadeaux et un bonnet de Noël s'y ajoutent.
// Le sol, les montagnes et le soleil sont recolorés par hiver.css.
// Tout est masqué quand le visiteur éteint le thème.

/* Le dinosaure de la scène flotte (classe heros__dino) : son écharpe et son
   bonnet sont dessinés dans le même repère et flottent avec lui. */
const REPERE_DINO = `transform="translate(46 150) scale(0.76)"`;

/* Derrière le paysage : le ciel d'hiver. */
export const fond = `
  <g class="hiver-deco" aria-hidden="true">
    <defs>
      <linearGradient id="ciel-hiver" x1="0" y1="0" x2="0" y2="1">
        <stop class="ciel-hiver-1" offset="0%" stop-color="#b9d8f2"/><stop class="ciel-hiver-2" offset="65%" stop-color="#e6f1fb"/><stop class="ciel-hiver-3" offset="100%" stop-color="#f6fbff"/>
      </linearGradient>
    </defs>
    <rect width="520" height="380" rx="28" fill="url(#ciel-hiver)"/>
  </g>`;

/* Devant le paysage. */
export const devant = `
  <g class="hiver-deco" aria-hidden="true">
    <path class="neige-volcan" d="M407.4 162 Q430 170 452.6 162 L470.4 195 Q461 188 452 196 Q441 187 430 197 Q419 187 409 196 Q399 188 389.6 195 Z" fill="#f6fbff"/>
    <g fill="#f6fbff">
      <ellipse cx="30" cy="231" rx="7" ry="4"/><ellipse cx="66" cy="227" rx="7" ry="4"/><ellipse cx="50" cy="271" rx="6" ry="3.5"/>
      <ellipse cx="470" cy="241" rx="7" ry="4"/><ellipse cx="506" cy="235" rx="7" ry="4"/><ellipse cx="492" cy="275" rx="6" ry="3.5"/>
    </g>
    <g class="bonhomme-de-neige">
      <ellipse cx="372" cy="338" rx="30" ry="6" fill="#c9dbec" opacity=".8"/>
      <circle cx="372" cy="316" r="23" fill="#fbfdff" stroke="#b9cde0" stroke-width="2"/>
      <circle cx="372" cy="284" r="16" fill="#fbfdff" stroke="#b9cde0" stroke-width="2"/>
      <circle cx="372" cy="260" r="11" fill="#fbfdff" stroke="#b9cde0" stroke-width="2"/>
      <path d="M357 282 l-20 -12 M354 275 l-6 -2 M387 282 l20 -14 M401 272 l3 -6" stroke="#6b4a2e" stroke-width="2.5" stroke-linecap="round" fill="none"/>
      <circle cx="368" cy="257" r="1.8" fill="#2a2a33"/><circle cx="376" cy="257" r="1.8" fill="#2a2a33"/>
      <path d="M372 261 l9 2.5 -9 1.5 z" fill="#f08a24"/>
      <circle cx="372" cy="280" r="1.8" fill="#2a2a33"/><circle cx="372" cy="288" r="1.8" fill="#2a2a33"/>
      <path d="M359 269 q13 6 26 0 l0 5 q-13 6 -26 0 z" fill="#2f6fa8"/>
      <path d="M379 273 l3 13 6 -1 -3 -13 z" fill="#2f6fa8"/>
    </g>
    <g class="heros__dino" aria-hidden="true">
      <g ${REPERE_DINO}>
        <path d="M268 80 Q282 98 294 122" stroke="#d6333d" stroke-width="17" stroke-linecap="round" fill="none"/>
        <path d="M268 80 Q282 98 294 122" stroke="#fff" stroke-width="17" stroke-dasharray="5 9" fill="none" opacity=".85"/>
        <path d="M290 114 Q302 136 297 162" stroke="#d6333d" stroke-width="12" stroke-linecap="round" fill="none"/>
        <path d="M291 160 l-3 9 M297 162 l0 9 M303 160 l3 9" stroke="#d6333d" stroke-width="3" stroke-linecap="round"/>
      </g>
    </g>
  </g>
  <g class="hiver-deco hiver-noel" aria-hidden="true">
    <g class="sapin">
      <rect x="434" y="292" width="12" height="16" rx="2" fill="#6b4a2e"/>
      <path d="M440 200 L416 238 L464 238 Z M440 222 L408 264 L472 264 Z M440 246 L400 298 L480 298 Z" fill="#236b40"/>
      <path d="M440 200 L428 219 L440 216 Z M440 222 L424 243 L440 240 Z M440 246 L420 272 L440 268 Z" fill="#2e8550"/>
      <path d="M416 238 q12 -5 24 -2 q12 -3 24 2 M408 264 q16 -6 32 -2 q16 -4 32 2 M400 298 q20 -7 40 -2 q20 -5 40 2" stroke="#f6fbff" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M422 232 Q440 240 458 228 M414 258 Q440 268 466 252 M406 290 Q440 300 474 284" stroke="#e9c46a" stroke-width="1.6" fill="none"/>
      <g class="sapin__boules">
        <circle cx="430" cy="232" r="3.6" fill="#d6333d"/><circle cx="452" cy="230" r="3.6" fill="#2f6fa8"/>
        <circle cx="420" cy="258" r="3.8" fill="#e9c46a"/><circle cx="446" cy="262" r="3.8" fill="#d6333d"/><circle cx="462" cy="254" r="3.6" fill="#f6fbff"/>
        <circle cx="412" cy="288" r="4" fill="#2f6fa8"/><circle cx="434" cy="294" r="4" fill="#e9c46a"/><circle cx="458" cy="290" r="4" fill="#d6333d"/><circle cx="474" cy="285" r="3.6" fill="#f6fbff"/>
      </g>
      <path class="sapin__etoile" d="M440 186 l3.2 6.6 7.3 1 -5.3 5.1 1.3 7.2 -6.5 -3.4 -6.5 3.4 1.3 -7.2 -5.3 -5.1 7.3 -1 z" fill="#f4c542" stroke="#c9952a" stroke-width="1"/>
    </g>
    <g class="cadeaux">
      <rect x="402" y="302" width="22" height="18" rx="2" fill="#d6333d"/><rect x="411" y="302" width="4" height="18" fill="#f4c542"/><rect x="402" y="308" width="22" height="4" fill="#f4c542"/>
      <rect x="452" y="306" width="26" height="15" rx="2" fill="#2f6fa8"/><rect x="463" y="306" width="4" height="15" fill="#f6fbff"/>
      <path d="M465 306 q-7 -8 -10 -2 q3 4 10 2 q7 -8 10 -2 q-3 4 -10 2" fill="none" stroke="#f6fbff" stroke-width="2"/>
    </g>
    <g class="heros__dino" aria-hidden="true">
      <g ${REPERE_DINO}>
        <path d="M320 48 Q324 18 302 6 Q332 6 352 24 Q364 34 370 46 Z" fill="#d6333d"/>
        <rect x="312" y="40" width="64" height="13" rx="6.5" fill="#fbfdff"/>
        <circle cx="300" cy="9" r="8.5" fill="#fbfdff"/>
      </g>
    </g>
  </g>`;
