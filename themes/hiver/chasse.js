/* La chasse aux 10 flocons d'or du thème d'hiver, et le manchot qui guide.
   Chargé après neige.js (la neige, la pelle et window.Neige).

   Chaque flocon n'apparaît que sur sa page, jamais en évidence :
     haut       seul le haut dépasse du bord d'un encadré ;
     mini       tout petit et pâle, presque fondu dans le décor ;
     bonhomme   sort du bonhomme de neige de l'accueil quand on le touche ;
     recherche  apparaît quand on écrit le bon mot dans la recherche du catalogue ;
     neige      enfoui sous la neige, en bas de l'écran : il faut déneiger avec la pelle
                (au clavier, « Prendre la pelle » déneige tout l'écran d'un coup) ;
     memory     attend à la fin d'une partie de memory terminée.
   Les flocons trouvés sont gardés d'une visite à l'autre (mémoire durable),
   jusqu'à « Recommencer la chasse ».

   Le manchot, en bas à gauche, se tient sur la neige : il donne des devinettes
   (pas d'adresses) et des anecdotes vraies. Au bout des 10 flocons : le diplôme
   de chasseur de flocons d'or (themes/hiver/diplome.mjs). */
(function () {
  "use strict";

  var Theme = window.Theme;
  if (!Theme) return;

  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var BASE = window.BASE || "";
  var actif = Theme.actif, annoncer = Theme.annoncer;

  function sur(regex) { return { test: function () { return regex.test(location.pathname); } }; }
  var ACCUEIL = { test: function () { return Theme.surAccueil(); } };

  function parTexte(selecteur, texte) {
    return function () {
      var liste = document.querySelectorAll(selecteur);
      for (var i = 0; i < liste.length; i++) {
        if (liste[i].textContent.indexOf(texte) !== -1) return liste[i];
      }
      return null;
    };
  }
  function sansAccent(t) { return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }

  function trouves() {
    try { return JSON.parse(Theme.lireDurable("flocons")) || []; } catch (e) { return []; }
  }

  /* ---------- Le flocon d'or : six branches, comme les vrais ---------- */
  function point(r, angle) { return (r * Math.cos(angle)).toFixed(1) + " " + (r * Math.sin(angle)).toFixed(1); }
  var SVG_FLOCON = (function () {
    var d = "";
    for (var k = 0; k < 6; k++) {
      var a = k * Math.PI / 3 - Math.PI / 2;
      d += "M0 0L" + point(17, a);
      [[9, 5.5], [13.5, 3.8]].forEach(function (b) {
        var bx = b[0] * Math.cos(a), by = b[0] * Math.sin(a);
        [-1, 1].forEach(function (sens) {
          var aa = a + sens * Math.PI / 4;
          d += "M" + point(b[0], a) + "L" + (bx + b[1] * Math.cos(aa)).toFixed(1) + " " + (by + b[1] * Math.sin(aa)).toFixed(1);
        });
      });
    }
    return '<svg viewBox="-20 -20 40 40" aria-hidden="true" focusable="false">' +
      '<path d="' + d + '" stroke="#9a6a08" stroke-width="4.4" stroke-linecap="round" fill="none"/>' +
      '<path d="' + d + '" stroke="#f7c948" stroke-width="2.4" stroke-linecap="round" fill="none"/>' +
      '<circle r="3.2" fill="#fff3c4" stroke="#9a6a08" stroke-width="1.2"/></svg>';
  })();

  /* ---------- Les cachettes ---------- */
  var CACHETTES = [
    { id: "bonhomme", page: ACCUEIL, variante: "bonhomme",
      indice: "Sur la page d’accueil, quelqu’un de tout blanc, avec une carotte en guise de nez, garde un trésor. Va lui dire bonjour !" },
    { id: "jeux", page: sur(/\/jeux\/(index\.html)?$/), cible: parTexte(".encadre", "Un conseil"), variante: "haut", style: "left:58%",
      indice: "Dans la salle de jeux, un flocon d’or espionne le conseil, caché juste derrière." },
    { id: "glaciations", page: sur(/\/glaciations\.html$/), cible: ".regle-temps", variante: "mini", style: "right:1%;top:-16px",
      indice: "Sur la page de l’ère glaciaire, un flocon d’or s’est posé tout près des mammouths." },
    { id: "cryolophosaurus", page: sur(/\/dinosaures\/cryolophosaurus\.html$/), cible: ".savais-tu > li:first-child", variante: "haut", style: "right:28px",
      indice: "Rends visite au seul grand carnivore découvert sur le continent de glace : un flocon d’or lit ses anecdotes par-dessus son épaule." },
    { id: "frise", page: sur(/\/frise\.html$/), cible: parTexte(".frise__periode p", "Pas de glace aux pôles"), variante: "mini", style: "right:-6px;bottom:-14px",
      indice: "Sur la frise du temps, un flocon d’or s’est posé à l’époque où il n’y avait pas de glace aux pôles. Drôle d’endroit pour un flocon !" },
    { id: "glossaire", page: sur(/\/glossaire\.html$/), cible: parTexte(".glossaire__terme", "Calotte glaciaire"), variante: "mini", style: "right:6px;bottom:2px",
      indice: "Dans le glossaire, un tout petit flocon d’or s’est posé sur l’immense couche de glace qui recouvre l’Antarctique." },
    { id: "catalogue", page: sur(/\/dinosaures\/(index\.html)?$/), variante: "recherche",
      indice: "Dans la recherche du catalogue des dinosaures, écris le nom de ce qui tombe du ciel quand il neige, avec ses six branches." },
    { id: "microraptor", page: sur(/\/dinosaures\/microraptor\.html$/), cible: ".fiche__illustration", variante: "mini", style: "left:16%;top:20%",
      indice: "Le dinosaure à quatre ailes cache un flocon d’or dans ses plumes. Regarde bien son portrait !" },
    { id: "familles", page: sur(/\/familles\/(index\.html)?$/), variante: "neige",
      indice: "Sur la page des familles de dinosaures, un flocon d’or dort tout au fond de la neige, en bas de l’écran. Prends la pelle !" },
    { id: "memory", page: sur(/\/jeux\/memory\.html$/), variante: "memory",
      indice: "Termine une partie de memory : un flocon d’or attend les champions à la fin." },
  ];
  var TOTAL = CACHETTES.length;

  /* ---------- Ce que raconte le manchot (faits vérifiés) ---------- */
  var FAITS = [
    "Je suis un manchot, donc un oiseau… et les oiseaux sont des dinosaures ! Le T-rex est un très lointain cousin.",
    "Je ne vole pas dans le ciel, mais je « vole » sous l’eau : mes ailes sont devenues des nageoires.",
    "Le manchot empereur peut plonger à plus de 500 mètres de profondeur pour attraper ses poissons !",
    "Il y a près de 60 millions d’années, en Nouvelle-Zélande, vivait un manchot géant : Kumimanu. Il pesait environ 150 kilos, autant qu’un gorille !",
    "Attention, je ne suis pas un pingouin ! Le petit pingouin vit dans le Nord et il sait voler. Nous, les manchots, vivons surtout dans le Sud et nous ne volons pas.",
    "Il y a environ 70 millions d’années, des dinosaures vivaient en Alaska, tout près du pôle Nord. L’hiver, il y faisait nuit pendant près de quatre mois !",
    "En Alaska, on a trouvé des os de bébés dinosaures : ils naissaient là-bas, près du pôle Nord, malgré la neige de l’hiver.",
    "Un cousin du T-rex vivait dans le froid de l’Alaska : Nanuqsaurus. Son nom veut dire « lézard ours polaire » !",
    "Le Cryolophosaurus a été découvert en Antarctique. À son époque, il n’y avait pas de glace : des forêts poussaient là-bas.",
    "Le Microraptor avait des plumes sur les bras et sur les jambes. Les plumes aidaient sans doute les petits dinosaures à garder leur chaleur, comme une doudoune !",
  ];
  var ASTUCES = [
    "Les flocons d’or sont petits et brillent à peine. Ouvre grand les yeux !",
    "Certains flocons se cachent derrière les encadrés : seul leur haut dépasse.",
    "La pelle, en bas à droite de l’écran, sert à déneiger… et peut-être à trouver un trésor !",
  ];

  /* ---------- Ramasser un flocon ---------- */
  function nouveauFlocon(c, variante) {
    var bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "flocon-cache flocon-cache--" + (variante || c.variante);
    if (c.style) bouton.style.cssText = c.style;
    bouton.setAttribute("aria-label", "Un flocon d’or caché ! Ramasse-le.");
    bouton.innerHTML = SVG_FLOCON;
    bouton.addEventListener("click", function () { ramasser(c, bouton); });
    return bouton;
  }

  function ramasser(c, bouton) {
    var liste = trouves();
    if (liste.indexOf(c.id) === -1) liste.push(c.id);
    Theme.ecrireDurable("flocons", JSON.stringify(liste));
    bouton.disabled = true;
    bouton.classList.add("flocon-cache--trouve");
    setTimeout(function () { bouton.remove(); }, reduit ? 0 : 650);
    majCompteur();
    (Theme.zone.querySelector(".bouton-diplome") || elCompteur).focus({ preventScroll: true });
    if (liste.length >= TOTAL) {
      annoncer("Bravo ! Tu as trouvé les " + TOTAL + " flocons d’or !");
      setTimeout(proposerRecompense, reduit ? 300 : 900);
    } else {
      var reste = TOTAL - liste.length;
      annoncer("Flocon d’or trouvé ! Encore " + reste + (reste > 1 ? " à dénicher." : " à dénicher, le dernier !"));
    }
  }

  /* ---------- Cacher les flocons de la page ---------- */
  function cacherFlocons() {
    var deja = trouves();
    CACHETTES.forEach(function (c) {
      if (!c.page.test() || deja.indexOf(c.id) !== -1) return;
      if (c.variante === "bonhomme") return brancherBonhomme(c);
      if (c.variante === "recherche") return brancherRecherche(c);
      if (c.variante === "neige") return enfouir(c);
      if (c.variante === "memory") return attendreFinMemory(c);
      var cible = typeof c.cible === "function" ? c.cible() : document.querySelector(c.cible);
      if (!cible) return;
      if (getComputedStyle(cible).position === "static") cible.style.position = "relative";
      cible.appendChild(nouveauFlocon(c));
    });
  }

  /* Le bonhomme de neige de l'accueil : touché, il frissonne et laisse sortir son flocon. */
  function brancherBonhomme(c) {
    var bouton = document.querySelector(".bonhomme-bouton");
    var scene = document.querySelector(".heros__scene");
    if (!bouton || !scene) return;
    var sorti = false;
    bouton.addEventListener("click", function () {
      var dessin = document.querySelector(".bonhomme-de-neige");
      if (dessin && !reduit) {
        dessin.classList.remove("frissonne");
        void dessin.getBoundingClientRect();
        dessin.classList.add("frissonne");
      }
      if (trouves().indexOf(c.id) !== -1) {
        Theme.bulle(bouton, "Brrr ! Merci d’être passé me voir. Mon flocon d’or est bien rangé dans ta collection.");
        return;
      }
      if (sorti) { Theme.bulle(bouton, "Mon flocon d’or est juste là, à côté de moi. Ramasse-le !"); return; }
      sorti = true;
      var flocon = nouveauFlocon(c, "bonhomme");
      scene.appendChild(flocon);
      Theme.bulle(bouton, "Oh ! Un flocon d’or était caché dans mon écharpe. Il est pour toi !");
      setTimeout(function () { flocon.focus({ preventScroll: true }); }, 200);
    });
  }

  /* La recherche du catalogue : « flocon » fait apparaître le flocon d'or. */
  var MOTS_FLOCON = ["flocon", "flocons", "flocon de neige", "flocons de neige"];
  function brancherRecherche(c) {
    var champ = document.getElementById("recherche-dino");
    if (!champ) return;
    var place = champ.closest(".filtres__recherche") || champ.parentNode;
    var flocon = null;
    champ.addEventListener("input", function () {
      if (flocon || !actif() || MOTS_FLOCON.indexOf(sansAccent(champ.value)) === -1) return;
      if (trouves().indexOf(c.id) !== -1) return;
      flocon = nouveauFlocon(c);
      place.appendChild(flocon);
      Theme.bulle(champ, "Un flocon d’or est tombé dans la recherche ! Ramasse-le, juste à côté.");
    });
  }

  /* Le flocon enfoui sous la neige : il n'apparaît que lorsqu'on a déneigé au-dessus. */
  function enfouir(c) {
    var flocon = nouveauFlocon(c);
    flocon.hidden = true;
    document.body.appendChild(flocon);
    if (!window.Neige) {
      /* Pas de neige (« réduire les animations ») : il attend tout en bas de la page. */
      flocon.classList.add("flocon-cache--sans-neige");
      flocon.hidden = false;
      return;
    }
    function centre() { var r = flocon.getBoundingClientRect(); return r.left + r.width / 2; }
    window.Neige.surDeneige(function (xMin, xMax) {
      if (!flocon.hidden || !actif()) return;
      flocon.hidden = false; // pour mesurer sa place
      var x = centre();
      var dessous = x >= xMin && x <= xMax && window.Neige.hauteur(x) < 24;
      flocon.hidden = !dessous;
      if (dessous) annoncer("Sous la neige, quelque chose brille : un flocon d’or !");
    });
  }

  /* Le memory : le flocon attend à la fin de la partie. */
  function attendreFinMemory(c) {
    var principal = document.getElementById("contenu");
    if (!principal || !("MutationObserver" in window)) return;
    var obs = new MutationObserver(function (mutations) {
      mutations.forEach(function (m) {
        Array.prototype.forEach.call(m.addedNodes, function (n) {
          if (n.nodeType !== 1 || !actif() || trouves().indexOf(c.id) !== -1) return;
          var r = n.classList.contains("resultat") ? n : n.querySelector(".resultat");
          if (!r || r.querySelector(".flocon-cache")) return;
          var p = document.createElement("p");
          p.className = "resultat__flocon";
          p.textContent = "Un flocon d’or pour les champions du memory : ";
          p.appendChild(nouveauFlocon(c));
          var medaille = r.querySelector(".resultat__medaille");
          if (medaille) medaille.insertAdjacentElement("afterend", p); else r.appendChild(p);
        });
      });
    });
    obs.observe(principal, { childList: true, subtree: true });
  }

  /* ---------- Le bandeau : compteur, diplôme, « Recommencer la chasse » ---------- */
  var elCompteur, boutonRecommencer;

  function majCompteur() {
    var n = trouves().length;
    elCompteur.innerHTML = n >= TOTAL
      ? "🎉 " + TOTAL + " / " + TOTAL + '<span class="bandeau-theme__long"> : bravo, tout est trouvé !</span>'
      : '<span aria-hidden="true">✨</span><span class="bandeau-theme__long"> Flocons d’or :</span> ' + n + " / " + TOTAL;
    elCompteur.classList.toggle("compteur-flocons--bravo", n >= TOTAL);
    boutonRecommencer.hidden = n === 0;
    /* Chasse terminée : le compteur laisse sa place au bouton du diplôme. */
    if (n >= TOTAL && !Theme.zone.querySelector(".bouton-diplome")) {
      var bouton = document.createElement("button");
      bouton.type = "button";
      bouton.className = "bouton-diplome";
      bouton.setAttribute("aria-label", "Mon diplôme de chasseur de flocons d’or");
      bouton.innerHTML = '🎓 <span class="bandeau-theme__long">Mon </span>diplôme<span class="bandeau-theme__long"> : ' + TOTAL + " / " + TOTAL + " !</span>";
      bouton.addEventListener("click", ouvrirDiplome);
      Theme.zone.insertBefore(bouton, boutonRecommencer);
      elCompteur.hidden = true;
    }
  }

  function completerBandeau() {
    elCompteur = document.createElement("span");
    elCompteur.className = "compteur-flocons";
    elCompteur.tabIndex = -1;
    boutonRecommencer = document.createElement("button");
    boutonRecommencer.type = "button";
    boutonRecommencer.className = "bouton-recommencer";
    boutonRecommencer.setAttribute("aria-label", "Recommencer la chasse aux flocons d’or");
    boutonRecommencer.title = "Recommencer la chasse";
    boutonRecommencer.innerHTML = '<span aria-hidden="true">↺</span>';
    boutonRecommencer.addEventListener("click", demanderRecommencer);
    Theme.zone.appendChild(elCompteur);
    Theme.zone.appendChild(boutonRecommencer);
    majCompteur();
  }

  /* Une fenêtre aux couleurs du thème, ouverte tout de suite. */
  function fenetre(html, idTitre) {
    var d = document.createElement("dialog");
    d.className = "dialogue-theme";
    d.setAttribute("aria-labelledby", idTitre);
    d.innerHTML = html;
    document.body.appendChild(d);
    d.fermer = function () { if (d.open) d.close(); d.remove(); };
    d.addEventListener("cancel", function () { setTimeout(d.fermer, 0); });
    Array.prototype.forEach.call(d.querySelectorAll("[data-fermer]"), function (b) { b.addEventListener("click", d.fermer); });
    if (typeof d.showModal === "function") d.showModal();
    else d.setAttribute("open", "");
    return d;
  }

  function demanderRecommencer() {
    var d = fenetre(
      '<p class="dialogue-theme__emoji" aria-hidden="true">❄️</p>' +
      '<h2 id="recommencer-titre">Recommencer la chasse ?</h2>' +
      "<p>Les flocons d’or déjà trouvés retourneront dans leurs cachettes, et l’annonce des nouveautés reviendra sur l’accueil.</p>" +
      '<p class="dialogue-theme__actions"><button type="button" class="bouton" data-oui>Oui, recommencer</button> ' +
      '<button type="button" class="bouton bouton--secondaire" data-fermer>Non</button></p>',
      "recommencer-titre");
    d.querySelector("[data-oui]").addEventListener("click", function () {
      Theme.effacerDurable("flocons");
      Theme.oublierAnnonce(); // tout ce que le thème garde est effacé (voir la page Confidentialité)
      location.reload();
    });
    d.querySelector("[data-fermer]").focus();
  }

  /* ---------- La récompense : le diplôme ---------- */
  var ADRESSE_DIPLOME = window.THEME.diplome; // réglé dans theme.mjs, depuis la racine du site

  function ouvrirDiplome() {
    /* Le nouvel onglet retrouve la mémoire durable ; #bravo sert de secours. */
    var adresse = BASE + ADRESSE_DIPLOME + "#bravo";
    var onglet = window.open(adresse, "_blank");
    if (!onglet) location.href = adresse;
  }

  function proposerRecompense() {
    if (!actif()) return;
    var d = fenetre(
      '<p class="dialogue-theme__emoji" aria-hidden="true">🏆</p>' +
      '<h2 id="recompense-titre">Les ' + TOTAL + " flocons d’or sont trouvés !</h2>" +
      "<p>Quelle chasse ! Une récompense t’attend : ton diplôme de chasseur de flocons d’or.</p>" +
      '<p class="dialogue-theme__actions"><button type="button" class="bouton" data-diplome>🎓 Voir mon diplôme</button> ' +
      '<button type="button" class="bouton bouton--secondaire" data-fermer>Plus tard</button></p>',
      "recompense-titre");
    d.querySelector("[data-diplome]").addEventListener("click", function () { ouvrirDiplome(); d.fermer(); });
  }

  /* Sur la page du diplôme : il ne se montre qu'aux vrais chasseurs. */
  function afficherDiplome() {
    var diplome = document.getElementById("diplome");
    var verrou = document.getElementById("diplome-verrou");
    if (!diplome || !verrou) return;
    var merite = trouves().length >= TOTAL || location.hash === "#bravo";
    diplome.hidden = !merite;
    verrou.hidden = merite;
    var date = document.getElementById("diplome-date");
    if (date) date.textContent = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    var imprimer = document.getElementById("diplome-imprimer");
    if (imprimer) imprimer.addEventListener("click", function () { window.print(); });
  }

  /* ---------- Le manchot ---------- */
  var SVG_MANCHOT =
    '<svg viewBox="0 0 60 72" aria-hidden="true" focusable="false">' +
    '<ellipse cx="30" cy="69" rx="17" ry="2.6" fill="rgba(20,40,60,.18)"/>' +
    '<path d="M30 4C14 4 8 22 9 40C10 58 18 67 30 67C42 67 50 58 51 40C52 22 46 4 30 4Z" fill="#1f2a37"/>' +
    '<path d="M30 19C21 19 16 30 17 44C18 57 23 63 30 63C37 63 42 57 43 44C44 30 39 19 30 19Z" fill="#fbfdff"/>' +
    '<path d="M10 33C2 41 2 52 6 57C10 51 12 44 13 38Z M50 33C58 41 58 52 54 57C50 51 48 44 47 38Z" fill="#1f2a37"/>' +
    '<circle cx="24" cy="15" r="3.6" fill="#fff"/><circle cx="25" cy="15.6" r="1.9" fill="#111"/>' +
    '<circle cx="36" cy="15" r="3.6" fill="#fff"/><circle cx="35" cy="15.6" r="1.9" fill="#111"/>' +
    '<path d="M25.5 20.5L34.5 20.5L30 27Z" fill="#f5a623"/>' +
    '<path d="M16 29Q30 37 44 29L44 34Q30 42 16 34Z" fill="#d6333d"/>' +
    '<path d="M37 34L40 47L45.5 46L42 33Z" fill="#d6333d"/>' +
    '<ellipse cx="23" cy="67" rx="5.5" ry="2.4" fill="#f5a623"/><ellipse cx="37" cy="67" rx="5.5" ry="2.4" fill="#f5a623"/>' +
    "</svg>";

  var manchot = null, tour = 0;

  function message() {
    tour++;
    if (tour === 1) return "Coucou, je suis le manchot ! Je connais toutes les cachettes des flocons d’or. Touche-moi encore pour une devinette.";
    if (tour % 2 === 1) return FAITS[((tour - 3) / 2) % FAITS.length];
    var deja = trouves();
    if (deja.length >= TOTAL) return "Bravo, tu as trouvé tous les flocons d’or ! Ton diplôme t’attend dans le bandeau, sous le menu.";
    var astuces = CACHETTES
      .filter(function (c) { return deja.indexOf(c.id) === -1; })
      .map(function (c) { return c.indice; })
      .concat(ASTUCES);
    return astuces[Math.floor(Math.random() * astuces.length)];
  }

  function parler() {
    if (!reduit) {
      manchot.classList.remove("saute");
      void manchot.getBoundingClientRect();
      manchot.classList.add("saute");
      /* Ensuite, il se remet à se dandiner. */
      manchot.addEventListener("animationend", function () { manchot.classList.remove("saute"); }, { once: true });
    }
    Theme.bulle(manchot, message(), 9000);
  }

  /* Le manchot se tient sur la neige : il monte avec elle et redescend quand on déneige. */
  function placerManchot() {
    if (!window.Neige || !actif()) return;
    var r = manchot.getBoundingClientRect(), h = 0;
    for (var x = r.left + 10; x <= r.right - 10; x += 4) h = Math.max(h, window.Neige.hauteur(x));
    manchot.style.bottom = Math.max(6, Math.round(h) - 4) + "px";
  }

  function creerManchot() {
    manchot = document.createElement("button");
    manchot.type = "button";
    manchot.className = "manchot";
    manchot.setAttribute("aria-label", "Le manchot, ton guide : touche-le pour une devinette ou une anecdote");
    manchot.innerHTML = SVG_MANCHOT;
    manchot.addEventListener("click", parler);
    document.body.appendChild(manchot);
    if (window.Neige) {
      placerManchot();
      setInterval(placerManchot, 250);
    }
  }

  completerBandeau();
  cacherFlocons();
  creerManchot();
  afficherDiplome();
})();
