// Décor d'Halloween de la scène d'accueil (tools/pages/accueil.mjs) : ciel de nuit, lune,
// citrouilles à dents de dinosaure et chauves-souris, et trois boutons invisibles posés
// sur la lune, le volcan et le dinosaure (leurs surprises sont dans halloween.js).
// Masqué par halloween.css quand le visiteur éteint le thème.

/* Derrière le paysage : le ciel de nuit et les étoiles. */
export const fond = `
  <g class="halloween-deco" aria-hidden="true">
    <defs>
      <linearGradient id="ciel-nuit" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1b1035"/><stop offset="55%" stop-color="#4a2a6e"/><stop offset="100%" stop-color="#f08a4b"/>
      </linearGradient>
    </defs>
    <rect width="520" height="380" rx="28" fill="url(#ciel-nuit)"/>
    <g class="etoiles" fill="#fff8dc">
      <circle cx="40" cy="40" r="2"/><circle cx="150" cy="24" r="1.6"/><circle cx="230" cy="70" r="2.2"/>
      <circle cx="300" cy="120" r="1.4"/><circle cx="480" cy="170" r="1.8"/><circle cx="190" cy="140" r="1.3"/>
      <circle cx="350" cy="30" r="1.7"/><circle cx="80" cy="110" r="1.5"/>
    </g>
  </g>`;

/* Devant le paysage : la lune, les citrouilles et les chauves-souris. */
export const devant = `
  <g class="halloween-deco" aria-hidden="true">
    <g fill="#d9d2b0" opacity=".8"><circle cx="394" cy="74" r="8"/><circle cx="421" cy="99" r="6"/><circle cx="420" cy="68" r="4"/><circle cx="398" cy="104" r="3.5"/></g>
    <g transform="translate(118 322) scale(1)">
      <ellipse rx="30" ry="24" fill="#f28c28"/>
      <ellipse cx="-14" rx="14" ry="23" fill="#e87a17"/>
      <ellipse cx="14" rx="14" ry="23" fill="#e87a17"/>
      <ellipse rx="10" ry="24" fill="#f7a03c"/>
      <path d="M-1 -22q1 -9 8 -12" stroke="#4a7a2c" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g class="citrouille-lueur" fill="#ffd54a">
        <path d="M-18 -6l7 -10 5 10z"/><path d="M18 -6l-7 -10 -5 10z"/>
        <path d="M-19 5l5 5 4 -5 4 6 4 -6 4 6 4 -6 4 5 5 -5q-2 13 -19 13t-19 -13z"/>
      </g>
    </g>
    <g transform="translate(446 334) scale(0.75)">
      <ellipse rx="30" ry="24" fill="#f28c28"/>
      <ellipse cx="-14" rx="14" ry="23" fill="#e87a17"/>
      <ellipse cx="14" rx="14" ry="23" fill="#e87a17"/>
      <ellipse rx="10" ry="24" fill="#f7a03c"/>
      <path d="M-1 -22q1 -9 8 -12" stroke="#4a7a2c" stroke-width="5" fill="none" stroke-linecap="round"/>
      <g class="citrouille-lueur" fill="#ffd54a">
        <path d="M-18 -6l7 -10 5 10z"/><path d="M18 -6l-7 -10 -5 10z"/>
        <path d="M-19 5l5 5 4 -5 4 6 4 -6 4 6 4 -6 4 5 5 -5q-2 13 -19 13t-19 -13z"/>
      </g>
    </g>
    <g class="chauve-souris chauve-souris--1"><path d="M0 -3C3 -7 6 -6 7 -3C10 -9 15 -9 18 -4C14 -4 12 -1 11 2C9 0 7 0 5 2C3 0 1 1 0 3C-1 1 -3 0 -5 2C-7 0 -9 0 -11 2C-12 -1 -14 -4 -18 -4C-15 -9 -10 -9 -7 -3C-6 -6 -3 -7 0 -3ZM-2 -4l-1 -4 2 2 2 -2 -1 4Z" fill="#22122e"/></g>
    <g class="chauve-souris chauve-souris--2"><path d="M0 -3C3 -7 6 -6 7 -3C10 -9 15 -9 18 -4C14 -4 12 -1 11 2C9 0 7 0 5 2C3 0 1 1 0 3C-1 1 -3 0 -5 2C-7 0 -9 0 -11 2C-12 -1 -14 -4 -18 -4C-15 -9 -10 -9 -7 -3C-6 -6 -3 -7 0 -3ZM-2 -4l-1 -4 2 2 2 -2 -1 4Z" fill="#22122e"/></g>
  </g>`;

/* Après le dessin, dans .heros__scene. */
export const boutons = `<button type="button" class="lune-bouton" aria-label="Touche la lune… qui sait ce qui va s’envoler ?"></button>
      <button type="button" class="volcan-bouton" aria-label="Le volcan endormi"></button>
      <button type="button" class="dino-bouton" aria-label="Le dinosaure chatouilleux"></button>`;
