/* Outils communs aux jeux d'affrontement : « Duel de dinosaures » et « Le roi de la tour ».

   Le vainqueur d'un duel est celui qui a la plus grande puissance. Elle est
   calculée au build (tools/data/affrontements.mjs) à partir du poids, des armes,
   des protections et de la vitesse, et livrée dans window.AFFRONTEMENTS. */
window.Affrontement = (function () {
  "use strict";

  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /** Écart de puissance en dessous duquel le duel est annoncé « serré ». */
  var SERRE = 3;

  function tous() { return (window.AFFRONTEMENTS || []).slice(); }

  /* ---------- Mots ---------- */
  function avecArticle(nom) { return (/^[aeiouyéèêh]/i.test(nom) ? "l’" : "le ") + nom; }
  /** « au Tricératops », « à l’Ankylosaurus » */
  function aArticle(nom) { return (/^[aeiouyéèêh]/i.test(nom) ? "à l’" : "au ") + nom; }
  function majuscule(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
  function virgule(n) { return String(n).replace(".", ","); }

  /** 2,5 fois · 3 fois · 14 fois */
  function fois(rapport) {
    var r = rapport >= 10 ? Math.round(rapport) : Math.round(rapport * 10) / 10;
    return virgule(r) + " fois";
  }

  /** 60,3 : une décimale, pour départager les duels serrés. */
  function puissanceTexte(d) { return virgule(Math.round(d.puissance * 10) / 10); }

  /* ---------- Règles ---------- */
  function vainqueur(a, b) {
    if (a.puissance !== b.puissance) return a.puissance > b.puissance ? a : b;
    return a.poids >= b.poids ? a : b;
  }
  function perdant(a, b) { return vainqueur(a, b) === a ? b : a; }
  function serre(a, b) { return Math.abs(a.puissance - b.puissance) < SERRE; }

  function agilite(d) { return Math.min(5, d.vitesse / 10); }

  /**
   * Ce qui fait vraiment la différence, à poids comparable : l'avantage le plus net
   * du vainqueur sur le perdant (arme, protection ou vitesse), tel que le barème le compte.
   * Renvoie null si aucun des trois n'est meilleur : seul le poids décide alors.
   */
  function meilleurAtout(g, p) {
    var options = [
      { ecart: g.attaque - p.attaque, texte: g.arme },
      { ecart: g.protection ? g.defense - p.defense : 0, texte: g.protection },
      { ecart: agilite(g) - agilite(p), texte: "sa vitesse" },
    ];
    var meilleur = null;
    options.forEach(function (o) { if (o.ecart > 0 && (!meilleur || o.ecart > meilleur.ecart)) meilleur = o; });
    return meilleur ? meilleur.texte : null;
  }

  /** L'explication du duel, en quelques phrases simples. */
  function explication(a, b) {
    var g = vainqueur(a, b), p = perdant(a, b);
    var G = majuscule(avecArticle(g.nom)), P = avecArticle(p.nom);
    var rapport = g.poids / p.poids;
    var atout = meilleurAtout(g, p);
    var phrases = [];

    if (serre(a, b)) {
      phrases.push("Duel serré ! Notre barème donne un tout petit avantage " + aArticle(g.nom) +
        ", mais les paléontologues en discuteraient sûrement.");
    }
    if (rapport >= 2) {
      phrases.push(G + " est " + fois(rapport) + " plus lourd que " + P + " (" + Jeu.fmtPoids(g.poids) + " contre " +
        Jeu.fmtPoids(p.poids) + ").");
    } else if (rapport >= 1.25) {
      phrases.push(G + " est plus lourd (" + Jeu.fmtPoids(g.poids) + " contre " + Jeu.fmtPoids(p.poids) + ")" +
        (atout ? " et compte sur " + atout : "") + ".");
    } else if (rapport > 0.8) {
      phrases.push(atout
        ? "Ils pèsent à peu près le même poids, mais " + avecArticle(g.nom) + " a l’avantage grâce à " + atout + "."
        : "Ils pèsent à peu près le même poids, et c’est de justesse que " + avecArticle(g.nom) + " l’emporte.");
    } else {
      phrases.push("Même plus léger (" + Jeu.fmtPoids(g.poids) + " contre " + Jeu.fmtPoids(p.poids) + "), " +
        avecArticle(g.nom) + " l’emporte " + (atout ? "grâce à " + atout : ": ses atouts compensent la différence de poids") + ".");
    }
    phrases.push(g.atout);
    /* « Ne fait pas le poids » seulement quand l'écart est net : un duel serré se perd de peu. */
    phrases.push("Malgré " + p.arme + ", " + P + (rapport >= 2 && !serre(a, b) ? " ne fait pas le poids." : " doit s’incliner."));

    return { titre: "🏆 " + G + " l’emporte !", texte: phrases.join(" ") };
  }

  /** Se sont-ils vraiment croisés ? */
  function rencontre(a, b) {
    var ensemble = a.ageDebut >= b.ageFin && b.ageDebut >= a.ageFin;
    if (ensemble) {
      var memeContinent = a.lieux.some(function (l) { return b.lieux.indexOf(l) !== -1; });
      if (memeContinent) return "🤝 Ils ont vraiment pu se croiser : même époque, même continent !";
      /* Avant environ 180 millions d'années, les continents formaient encore presque un seul bloc : la Pangée. */
      if (Math.max(a.ageFin, b.ageFin) >= 180) {
        return "🌍 Ils vivaient à la même époque, quand les continents étaient encore presque tous réunis en un seul bloc, " +
          "la Pangée : ils ont peut-être pu se croiser !";
      }
      return "🌍 Ils vivaient à la même époque, mais sur des continents différents : duel imaginaire !";
    }
    var ecart = a.ageFin > b.ageDebut ? a.ageFin - b.ageDebut : b.ageFin - a.ageDebut;
    return "⏳ Duel imaginaire : " + ecart + (ecart > 1 ? " millions d’années les séparent !" : " million d’années les sépare !");
  }

  /* ---------- Cartes des combattants ---------- */
  function carte(d) {
    var el = document.createElement("div");
    el.className = "combattant";
    el.dataset.slug = d.slug;
    var credit = d.credit
      ? '<p class="combattant__credit">' + echapper(d.credit.auteur) + " · " +
        (d.credit.licenceUrl
          ? '<a href="' + echapper(d.credit.licenceUrl) + '" rel="license nofollow noopener" target="_blank">' + echapper(d.credit.licence) + "</a>"
          : echapper(d.credit.licence)) + "</p>"
      : "";
    el.innerHTML =
      '<button type="button" class="combattant__choix">' +
      '<span class="combattant__photo"><img src="' + Jeu.base() + d.photo + '" alt="" width="300" height="210" decoding="async"></span>' +
      '<span class="combattant__nom"></span></button>' +
      '<div class="combattant__infos" hidden></div>' + credit;
    el.querySelector(".combattant__nom").textContent = d.nom;
    el.querySelector(".combattant__choix").setAttribute("aria-label", "Je pense que " + d.nom + " gagne");
    return el;
  }

  function echapper(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /** Après le duel : poids, arme et jauge de puissance sous chaque carte. */
  function reveler(el, d, max) {
    var infos = el.querySelector(".combattant__infos");
    infos.innerHTML =
      '<p class="combattant__poids">⚖️ ' + Jeu.fmtPoids(d.poids) + "</p>" +
      '<p class="combattant__jauge"><span class="visuellement-cache">Puissance : </span>' +
      '<span class="jauge-puissance"><span class="jauge-puissance__barre"></span></span>' +
      '<span class="jauge-puissance__valeur">' + puissanceTexte(d) + "</span></p>";
    infos.hidden = false;
    var barre = infos.querySelector(".jauge-puissance__barre");
    var largeur = Math.max(6, Math.round((d.puissance / max) * 100)) + "%";
    if (reduit) barre.style.width = largeur;
    else requestAnimationFrame(function () { requestAnimationFrame(function () { barre.style.width = largeur; }); });
  }

  /* ---------- L'arène ---------- */
  /** Crée l'arène : deux cartes et le « VS » entre elles. onChoix(dino) est appelé au premier choix. */
  function arene(zone, a, b, onChoix) {
    zone.innerHTML = "";
    zone.className = "arene";
    var ca = carte(a), cb = carte(b);
    var vs = document.createElement("span");
    vs.className = "arene__vs";
    vs.setAttribute("aria-hidden", "true");
    vs.textContent = "VS";
    ca.classList.add("combattant--gauche");
    cb.classList.add("combattant--droite");
    zone.appendChild(ca); zone.appendChild(vs); zone.appendChild(cb);

    var choisi = false;
    [[ca, a], [cb, b]].forEach(function (paire) {
      paire[0].querySelector(".combattant__choix").addEventListener("click", function () {
        if (choisi) return;
        choisi = true;
        zone.querySelectorAll(".combattant__choix").forEach(function (bt) { bt.disabled = true; });
        paire[0].classList.add("combattant--pronostic");
        onChoix(paire[1]);
      });
    });
    return { zone: zone, cartes: [ca, cb], vs: vs, dinos: [a, b] };
  }

  /**
   * Le combat : les deux dinosaures se chargent, choc, puis le vainqueur
   * brille et le perdant vacille. Renvoie une promesse résolue à la fin.
   */
  function combattre(ar) {
    var a = ar.dinos[0], b = ar.dinos[1];
    var g = vainqueur(a, b);
    var cg = g === a ? ar.cartes[0] : ar.cartes[1];
    var cp = g === a ? ar.cartes[1] : ar.cartes[0];
    var max = Math.max(a.puissance, b.puissance, 1) * 1.08;

    var finir = function () {
      ar.zone.classList.remove("arene--charge");
      ar.zone.classList.add("arene--fini");
      ar.vs.textContent = "💥";
      cg.classList.add("combattant--gagne");
      cp.classList.add("combattant--perd");
      var couronne = document.createElement("span");
      couronne.className = "combattant__couronne";
      couronne.setAttribute("aria-hidden", "true");
      couronne.textContent = "👑";
      cg.appendChild(couronne);
      reveler(ar.cartes[0], a, max);
      reveler(ar.cartes[1], b, max);
    };

    if (reduit) { finir(); return Promise.resolve(g); }
    ar.zone.classList.add("arene--charge");
    return new Promise(function (resoudre) {
      setTimeout(function () { finir(); setTimeout(function () { resoudre(g); }, 650); }, 650);
    });
  }

  /* ---------- Fête finale ---------- */
  function confettis(n) {
    if (reduit || !document.body.animate) return;
    var sortes = ["🎉", "✨", "👑", "⭐", "🦖", "🎊"];
    var w = window.innerWidth, h = window.innerHeight;
    for (var i = 0; i < (n || 40); i++) {
      var c = document.createElement("span");
      c.className = "confetti";
      c.setAttribute("aria-hidden", "true");
      c.textContent = sortes[i % sortes.length];
      c.style.left = Math.random() * (w - 30) + "px";
      document.body.appendChild(c);
      c.animate([
        { transform: "translate(0, -60px) rotate(0)" },
        { transform: "translate(" + (Math.random() * 120 - 60) + "px," + (h + 60) + "px) rotate(" + (Math.random() * 720 - 360) + "deg)" },
      ], { duration: 2400 + Math.random() * 1600, delay: Math.random() * 700, easing: "cubic-bezier(.3,.1,.7,1)", fill: "backwards" })
        .onfinish = (function (el) { return function () { el.remove(); }; })(c);
    }
  }

  return {
    reduit: reduit,
    tous: tous,
    vainqueur: vainqueur,
    perdant: perdant,
    serre: serre,
    explication: explication,
    rencontre: rencontre,
    arene: arene,
    combattre: combattre,
    confettis: confettis,
    avecArticle: avecArticle,
    majuscule: majuscule,
  };
})();
