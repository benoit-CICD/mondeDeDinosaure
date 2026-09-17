// Catalogue, familles, périodes et frise chronologique.

import { dinos } from "../data/dinos.mjs";
import { periodes, familles, regimes } from "../data/site.mjs";
import { page, esc, carteDino, periodeDe, familleDe, fmtLongueur, imageDoc } from "../templates.mjs";

/* ---------------- Catalogue filtrable ---------------- */
export function pageCatalogue() {
  const puce = (type, valeur, libelle) =>
    `<button type="button" class="puce" data-filtre="${type}" data-valeur="${valeur}" aria-pressed="false">${libelle}</button>`;

  const corps = `
<div class="conteneur section" style="padding-bottom:0">
  <h1>🦕 Tous les dinosaures</h1>
  <p style="max-width:65ch">Voici les ${dinos.length} créatures du site, des plus minuscules aux plus gigantesques.
  Utilise la recherche ou les filtres pour trouver celle qui t’intéresse.</p>
</div>

<div class="filtres">
  <div class="conteneur">
    <div class="filtres__recherche">
      <label class="visuellement-cache" for="recherche-dino">Rechercher un dinosaure</label>
      <input type="search" id="recherche-dino" placeholder="Cherche un nom : tyrannosaure, raptor, cornes…" autocomplete="off">
    </div>
    <div class="filtres__groupe" style="margin-bottom:.5rem">
      <span class="filtres__etiquette">Période</span>
      ${periodes.map((p) => puce("periode", p.slug, `${p.emoji} ${p.nom}`)).join("\n      ")}
    </div>
    <div class="filtres__groupe" style="margin-bottom:.5rem">
      <span class="filtres__etiquette">Régime</span>
      ${regimes.map((r) => puce("regime", r.slug, `${r.emoji} ${r.nom}`)).join("\n      ")}
    </div>
    <div class="filtres__groupe">
      <span class="filtres__etiquette">Famille</span>
      ${familles.map((f) => puce("famille", f.slug, `${f.emoji} ${f.nom}`)).join("\n      ")}
    </div>
  </div>
</div>

<div class="conteneur" style="padding-bottom:3rem">
  <p class="compteur-resultats" id="compteur-resultats" role="status">${dinos.length} dinosaures trouvés</p>
  <div class="grille" id="grille-dinos" style="margin-top:1rem">
    ${dinos.map((d, i) => carteDino(d, "", { delai: i })).join("\n    ")}
  </div>
  <div id="aucun-resultat" hidden class="encadre" style="text-align:center">
    <h2 class="encadre__titre" style="justify-content:center">🔍 Aucun dinosaure ne correspond</h2>
    <p>Essaie un autre mot ou enlève un filtre. Par exemple : « raptor », « cornes » ou « Jurassique ».</p>
  </div>
</div>`;

  return {
    chemin: "dinosaures.html",
    html: page({
      titre: "Tous les dinosaures",
      description: `Le catalogue complet des ${dinos.length} dinosaures du site, filtrable par période, par famille et par régime alimentaire. Fiches illustrées pour les enfants.`,
      actif: "dinosaures",
      corps,
      scripts: ["assets/js/catalogue.js"],
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Tous les dinosaures" }],
    }),
  };
}

/* ---------------- Familles ---------------- */
export function pagesFamilles() {
  const pages = [];

  const corpsIndex = `
<div class="conteneur section">
  <h1>🧬 Les familles de dinosaures</h1>
  <p style="max-width:68ch">Les scientifiques rangent les dinosaures en groupes, un peu comme des familles.
  Les membres d’une même famille se ressemblent parce qu’ils ont un ancêtre commun.
  Attention : deux groupes de ce site ne sont pas des dinosaures, mais des cousins !</p>

  <div class="grille grille--large" style="margin-top:2rem">
    ${familles
      .map((f, i) => {
        const n = dinos.filter((d) => d.famille === f.slug).length;
        return `<a class="carte" href="familles/${f.slug}.html" data-anim data-delai="${i % 6}">
      <span class="carte__media" style="--carte-teinte:${f.couleur}33;padding:1.5rem;text-align:center;font-size:2.8rem" aria-hidden="true">${f.emoji}</span>
      <span class="carte__corps">
        <span class="carte__titre" style="font-weight:800;font-size:1.2rem">${esc(f.nom)}</span>
        <span class="carte__texte">${esc(f.resume)}</span>
        <span class="carte__pastilles">
          <span class="pastille">${n} ${n > 1 ? "créatures" : "créature"}</span>
          ${f.cousin ? '<span class="pastille pastille--alerte">⚠️ Pas des dinosaures</span>' : ""}
        </span>
      </span>
    </a>`;
      })
      .join("\n    ")}
  </div>
</div>`;

  pages.push({
    chemin: "familles.html",
    html: page({
      titre: "Les familles de dinosaures",
      description: "Théropodes, sauropodes, cératopsiens, raptors, dinosaures blindés… Découvre comment les scientifiques classent les dinosaures en familles.",
      actif: "dinosaures",
      corps: corpsIndex,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Les familles" }],
    }),
  });

  familles.forEach((f) => {
    const membres = dinos.filter((d) => d.famille === f.slug);
    const corps = `
<div class="conteneur section">
  <p class="pastille" style="background:${f.couleur}22;border-color:${f.couleur}">${f.emoji} Famille</p>
  <h1>${esc(f.nom)}</h1>
  <p class="fiche__accroche" style="max-width:66ch">${esc(f.resume)}</p>
  <div class="encadre${f.cousin ? " encadre--attention" : ""}">
    <h2 class="encadre__titre">${f.cousin ? "⚠️ Ce ne sont pas des dinosaures" : "🔎 Ce qui les caractérise"}</h2>
    <p style="margin-bottom:0">${esc(f.detail)}</p>
  </div>

  <h2>Les ${membres.length} membres de ce groupe</h2>
  <div class="grille">
    ${membres.map((d, i) => carteDino(d, "../", { delai: i })).join("\n    ")}
  </div>

  <h2 style="margin-top:2.5rem">Les autres familles</h2>
  <div class="filtres__groupe">
    ${familles
      .filter((x) => x.slug !== f.slug)
      .map((x) => `<a class="puce" href="${x.slug}.html">${x.emoji} ${esc(x.nom)}</a>`)
      .join("\n    ")}
  </div>
</div>`;

    pages.push({
      chemin: `familles/${f.slug}.html`,
      html: page({
        titre: f.nom,
        description: `${f.nom} : ${f.resume} Découvre les ${membres.length} membres de ce groupe, expliqués simplement aux enfants.`,
        base: "../",
        actif: "dinosaures",
        corps,
        filAriane: [
          { nom: "Accueil", href: "index.html" },
          { nom: "Les familles", href: "familles.html" },
          { nom: f.nom },
        ],
      }),
    });
  });

  return pages;
}

/* ---------------- Périodes ---------------- */
export function pagesPeriodes() {
  const pages = [];
  const total = periodes[0].debut - periodes[periodes.length - 1].fin;

  const regle = `<div class="regle-temps">
  <div class="regle-temps__piste">
    ${periodes
      .map(
        (p) => `<div class="regle-temps__bloc" style="background:${p.couleur};flex:${p.debut - p.fin}">
      <span style="font-size:1.6rem" aria-hidden="true">${p.emoji}</span>
      <strong>${esc(p.nom)}</strong>
      <small>${p.debut} à ${p.fin} Ma</small>
    </div>`
      )
      .join("\n    ")}
  </div>
</div>`;

  const corpsIndex = `
<div class="conteneur section">
  <h1>⏳ Les trois périodes des dinosaures</h1>
  <p style="max-width:68ch">Les dinosaures ont régné pendant ${total} millions d’années. C’est tellement long que les
  scientifiques ont découpé cette durée en trois grandes périodes. Ensemble, elles forment une ère appelée le
  <strong>Mésozoïque</strong>.</p>

  ${regle}

  <div class="grille grille--large" style="margin-top:2rem">
    ${periodes
      .map(
        (p, i) => `<a class="carte" href="periodes/${p.slug}.html" data-anim data-delai="${i}">
      <span class="carte__media" style="--carte-teinte:${p.couleur}33;padding:1.8rem;text-align:center;font-size:3rem" aria-hidden="true">${p.emoji}</span>
      <span class="carte__corps">
        <span class="carte__titre" style="font-weight:800;font-size:1.3rem">${esc(p.nom)}</span>
        <span class="pastille pastille--${p.slug}">${p.debut} à ${p.fin} millions d’années</span>
        <span class="carte__texte">${esc(p.resume)}</span>
        <span class="carte__pastilles"><span class="pastille">${dinos.filter((d) => d.periode === p.slug).length} créatures</span></span>
      </span>
    </a>`
      )
      .join("\n    ")}
  </div>

  <div class="encadre" style="margin-top:2.5rem">
    <h2 class="encadre__titre">🤯 Une durée difficile à imaginer</h2>
    <p>Le Stégosaure a disparu environ 80 millions d’années avant l’apparition du T-rex.
    Il s’est donc écoulé plus de temps entre ces deux dinosaures qu’entre le T-rex et nous !</p>
    <p style="margin-bottom:0"><a class="bouton bouton--petit" href="frise.html">📏 Voir la frise du temps</a></p>
  </div>
</div>`;

  pages.push({
    chemin: "periodes.html",
    html: page({
      titre: "Les périodes",
      description: "Trias, Jurassique, Crétacé : découvre les trois périodes de l’ère des dinosaures, leur climat, leurs paysages et leurs habitants.",
      actif: "periodes",
      corps: corpsIndex,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Les périodes" }],
    }),
  });

  periodes.forEach((p, idx) => {
    const habitants = dinos.filter((d) => d.periode === p.slug).sort((a, b) => b.ageDebut - a.ageDebut);
    const precedent = periodes[idx - 1];
    const suivant = periodes[idx + 1];

    const corps = `
<div class="conteneur section">
  <p class="pastille pastille--${p.slug}">${p.emoji} Période</p>
  <h1>Le ${esc(p.nom)}</h1>
  <p class="fiche__accroche" style="max-width:66ch">De −${p.debut} à −${p.fin} millions d’années. ${esc(p.resume)}</p>

  <div class="stats">
    <div class="stat"><div class="stat__icone" aria-hidden="true">⏱️</div><span class="stat__valeur">${p.debut - p.fin} Ma</span><span class="stat__libelle">Durée</span></div>
    <div class="stat"><div class="stat__icone" aria-hidden="true">🦕</div><span class="stat__valeur">${habitants.length}</span><span class="stat__libelle">Créatures du site</span></div>
    <div class="stat"><div class="stat__icone" aria-hidden="true">🌡️</div><span class="stat__valeur" style="font-size:.95rem">${esc(p.climat.split(",")[0])}</span><span class="stat__libelle">Climat</span></div>
  </div>

  <div class="grille grille--deux" style="align-items:start;margin-top:2rem">
    <div class="prose">
      <h2>Que se passait-il ?</h2>
      ${p.paragraphes.map((t) => `<p>${esc(t)}</p>`).join("\n      ")}
    </div>
    <div>
      <div class="encadre">
        <h2 class="encadre__titre">🌍 Le monde à cette époque</h2>
        <table class="tableau-info"><tbody>
          <tr><th scope="row">Climat</th><td>${esc(p.climat)}</td></tr>
          <tr><th scope="row">Végétation</th><td>${esc(p.plantes)}</td></tr>
          <tr><th scope="row">Durée</th><td>${p.debut - p.fin} millions d’années</td></tr>
        </tbody></table>
      </div>
      <div class="encadre encadre--pouvoir">
        <h2 class="encadre__titre">💡 Le fait marquant</h2>
        <p style="margin-bottom:0">${esc(p.fait)}</p>
      </div>
    </div>
  </div>

  <h2 style="margin-top:2rem">Les créatures du ${esc(p.nom)}</h2>
  <div class="grille">
    ${habitants.map((d, i) => carteDino(d, "../", { delai: i })).join("\n    ")}
  </div>

  <nav class="pagination-fiche" aria-label="Période précédente et suivante">
    ${precedent ? `<a class="bouton bouton--secondaire" href="${precedent.slug}.html">← Le ${esc(precedent.nom)}</a>` : "<span></span>"}
    ${suivant ? `<a class="bouton bouton--secondaire" href="${suivant.slug}.html">Le ${esc(suivant.nom)} →</a>` : "<span></span>"}
  </nav>
</div>`;

    pages.push({
      chemin: `periodes/${p.slug}.html`,
      html: page({
        titre: `Le ${p.nom}`,
        description: `Le ${p.nom} (−${p.debut} à −${p.fin} millions d’années) : climat, paysages, plantes et dinosaures de cette période, expliqués aux enfants.`,
        base: "../",
        actif: "periodes",
        corps,
        filAriane: [
          { nom: "Accueil", href: "index.html" },
          { nom: "Les périodes", href: "periodes.html" },
          { nom: p.nom },
        ],
      }),
    });
  });

  return pages;
}

/* ---------------- Frise chronologique ---------------- */
export function pageFrise() {
  const jalons = periodes.map((p) => {
    const habitants = dinos.filter((d) => d.periode === p.slug).sort((a, b) => b.ageDebut - a.ageDebut);
    return `<div class="frise__jalon" data-anim style="--jalon-couleur:${p.couleur}">
    <span class="frise__point" aria-hidden="true"></span>
    <div class="frise__periode">
      <p class="frise__ages">${p.emoji} de −${p.debut} à −${p.fin} millions d’années</p>
      <h2 style="margin-bottom:.3rem"><a href="periodes/${p.slug}.html" style="color:inherit">Le ${esc(p.nom)}</a></h2>
      <p>${esc(p.resume)}</p>
      <p style="font-size:.93rem;color:var(--texte-doux);margin-bottom:0"><strong>Climat :</strong> ${esc(p.climat)}</p>
      <div class="frise__vignettes">
        ${habitants
          .map(
            (d) => `<a class="vignette" href="dinosaures/${d.slug}.html">
          <img src="${imageDoc(d, "").src}" alt="" loading="lazy" width="38" height="27">
          <span>${esc(d.surnom || d.nom)} <small style="color:var(--texte-doux);font-weight:600">−${d.ageDebut} Ma</small></span>
        </a>`
          )
          .join("\n        ")}
      </div>
    </div>
  </div>`;
  });

  const corps = `
<div class="conteneur section">
  <h1>📏 La frise du temps</h1>
  <p style="max-width:68ch">Remonte le temps sur 186 millions d’années ! Chaque créature est placée à l’époque où elle vivait.
  Tu verras : certains dinosaures que l’on imagine ensemble ne se sont jamais rencontrés.</p>

  <div class="regle-temps" style="margin:2rem 0">
    <div class="regle-temps__piste">
      ${periodes
        .map(
          (p) => `<div class="regle-temps__bloc" style="background:${p.couleur};flex:${p.debut - p.fin}">
        <span style="font-size:1.6rem" aria-hidden="true">${p.emoji}</span>
        <strong>${esc(p.nom)}</strong><small>${p.debut} à ${p.fin} Ma</small>
      </div>`
        )
        .join("\n      ")}
    </div>
  </div>

  <div class="encadre encadre--attention">
    <h2 class="encadre__titre">🤯 Le grand écart</h2>
    <p style="margin-bottom:0">Le <a href="dinosaures/stegosaurus.html">Stégosaure</a> a disparu il y a 145 millions d’années.
    Le <a href="dinosaures/tyrannosaurus.html">T-rex</a> est apparu il y a 68 millions d’années.
    Entre les deux : <strong>77 millions d’années</strong>. C’est plus que le temps qui nous sépare du T-rex (66 millions d’années) !</p>
  </div>

  <div class="frise" style="margin-top:2.5rem">
    ${jalons.join("\n    ")}
    <div class="frise__jalon" data-anim style="--jalon-couleur:#c0392b">
      <span class="frise__point" aria-hidden="true"></span>
      <div class="frise__periode">
        <p class="frise__ages">☄️ il y a 66 millions d’années</p>
        <h2 style="margin-bottom:.3rem">La grande extinction</h2>
        <p>Un astéroïde de 10 kilomètres frappe le Mexique. Trois espèces sur quatre disparaissent, dont tous les
        dinosaures… sauf les oiseaux, qui vivent encore parmi nous aujourd’hui.</p>
        <p style="margin-bottom:0"><a class="bouton bouton--petit" href="extinction.html">En savoir plus →</a></p>
      </div>
    </div>
  </div>
</div>`;

  return {
    chemin: "frise.html",
    html: page({
      titre: "La frise du temps",
      description: "Une frise chronologique interactive des dinosaures : Trias, Jurassique, Crétacé et la grande extinction, avec chaque créature placée à son époque.",
      actif: "frise",
      corps,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "La frise du temps" }],
    }),
  };
}
