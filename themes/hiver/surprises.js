/* Les surprises du thème d'hiver. Elles ne comptent pas pour la chasse aux
   flocons d'or (chasse.js) :
   - toucher le dinosaure de l'accueil : il éternue de la neige ;
   - toucher le volcan de l'accueil : il crache des flocons, avec une anecdote vraie ;
   - taper « neige » au clavier : une bataille de boules de neige traverse l'écran ;
   - quelques mots dans la recherche du catalogue : « neige », « manchot »,
     « pingouin », « bonhomme de neige », « père noël ».
   Avec « réduire les animations », les messages restent, sans les animations. */
(function () {
  "use strict";

  var Theme = window.Theme;
  if (!Theme) return;

  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var actif = Theme.actif;
  function sansAccent(t) { return t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }
  function hasard(min, max) { return min + Math.random() * (max - min); }

  /* De petits flocons qui partent d'un point de l'écran (x, y) dans une direction donnée. */
  function poudrer(x, y, nombre, versX, versY) {
    if (reduit || !document.body.animate) return;
    for (var k = 0; k < nombre; k++) {
      var p = document.createElement("span");
      p.className = "poudre-neige";
      p.setAttribute("aria-hidden", "true");
      var taille = hasard(4, 10);
      p.style.width = p.style.height = taille + "px";
      p.style.left = x + "px";
      p.style.top = y + "px";
      document.body.appendChild(p);
      var dx = versX + hasard(-50, 50), dy = versY + hasard(-40, 40);
      p.animate([
        { transform: "translate(0, 0)", opacity: 1 },
        { transform: "translate(" + dx * 0.7 + "px, " + dy * 0.7 + "px)", opacity: 0.9, offset: 0.6 },
        { transform: "translate(" + dx + "px, " + (dy + 60) + "px)", opacity: 0 },
      ], { duration: hasard(900, 1500), easing: "ease-out" }).onfinish = (function (el) {
        return function () { el.remove(); };
      })(p);
    }
  }

  /* ---------- Accueil : le dinosaure frileux et le volcan ---------- */
  function brancherAccueil() {
    var svg = document.querySelector(".heros__scene-svg");
    var dino = document.querySelector(".dino-bouton");
    var volcan = document.querySelector(".volcan-bouton");
    if (!svg) return;
    function dansLeDessin(px, py) {
      var r = svg.getBoundingClientRect();
      return { x: r.left + r.width * px / 520, y: r.top + r.height * py / 380 };
    }
    if (dino) dino.addEventListener("click", function () {
      if (!actif()) return;
      var corps = document.querySelectorAll(".heros__dino");
      if (!reduit) {
        Array.prototype.forEach.call(corps, function (g) {
          g.classList.remove("atchoum");
          void g.getBoundingClientRect();
          g.classList.add("atchoum");
          /* Ensuite, le dinosaure se remet à flotter. */
          g.addEventListener("animationend", function () { g.classList.remove("atchoum"); }, { once: true });
        });
      }
      var nez = dansLeDessin(338, 205);
      poudrer(nez.x, nez.y, 16, 90, -30);
      Theme.bulle(dino, "Atchoum ! Brrr… vivement le printemps !", 5000);
    });
    if (volcan) volcan.addEventListener("click", function () {
      if (!actif()) return;
      var cratere = dansLeDessin(430, 118);
      poudrer(cratere.x, cratere.y, 24, 0, -110);
      Theme.bulle(volcan, "Un volcan dans la neige ? Ça existe ! En Antarctique, le mont Erebus est un volcan actif, avec un lac de lave au sommet… au milieu de la glace.", 9000);
    });
  }

  /* ---------- « neige » au clavier : la bataille de boules de neige ---------- */
  function bataille() {
    Theme.annoncer("Bataille de boules de neige !");
    if (reduit || !document.body.animate) return;
    var L = document.documentElement.clientWidth, H = window.innerHeight;
    for (var k = 0; k < 8; k++) {
      (function (k) {
        setTimeout(function () {
          var gauche = k % 2 === 0;
          var b = document.createElement("span");
          b.className = "boule-de-neige";
          b.setAttribute("aria-hidden", "true");
          var y0 = hasard(H * 0.25, H * 0.75), y1 = hasard(H * 0.2, H * 0.7);
          var x0 = gauche ? -40 : L + 10, x1 = hasard(L * 0.3, L * 0.7);
          b.style.left = x0 + "px";
          b.style.top = y0 + "px";
          document.body.appendChild(b);
          var dx = x1 - x0, dy = y1 - y0;
          var vol = b.animate([
            { transform: "translate(0, 0) scale(1)" },
            { transform: "translate(" + dx / 2 + "px, " + (dy / 2 - 90) + "px) scale(1.1)" },
            { transform: "translate(" + dx + "px, " + dy + "px) scale(1)" },
          ], { duration: 700, easing: "linear" });
          vol.onfinish = function () {
            b.style.transform = "translate(" + dx + "px, " + dy + "px)";
            b.classList.add("boule-de-neige--splat");
            b.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 900, delay: 400 }).onfinish = function () { b.remove(); };
          };
        }, k * 260);
      })(k);
    }
  }
  var frappe = "";
  document.addEventListener("keydown", function (e) {
    if (!actif() || e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
    var cible = e.target;
    if (cible && (cible.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(cible.tagName))) return;
    frappe = (frappe + e.key.toLowerCase()).slice(-5);
    if (frappe === "neige") { frappe = ""; bataille(); }
  });

  /* ---------- Les mots de la recherche du catalogue ---------- */
  var MOTS = {
    "neige": "Tout près ! Ce qui tombe quand il neige porte un autre nom… et chaque morceau a six branches.",
    "manchot": "Le manchot n’est pas dans le catalogue… mais c’est bien un dinosaure : tous les oiseaux en sont !",
    "manchots": "Les manchots ne sont pas dans le catalogue… mais ce sont bien des dinosaures : tous les oiseaux en sont !",
    "pingouin": "Attention, piège ! Le petit pingouin vit dans le Nord et sait voler. Le manchot, lui, vit surtout dans le Sud et ne vole pas.",
    "bonhomme de neige": "Le bonhomme de neige t’attend sur la page d’accueil. Va lui dire bonjour !",
    "pere noel": "Le Père Noël n’est pas dans ce catalogue… mais pour les dinosaures, tu es au bon endroit !",
  };
  function brancherRecherche() {
    var champ = document.getElementById("recherche-dino");
    if (!champ) return;
    var dernier = "";
    champ.addEventListener("input", function () {
      var mot = sansAccent(champ.value);
      if (!actif() || mot === dernier || !MOTS[mot]) return;
      dernier = mot;
      Theme.bulle(champ, MOTS[mot], 8000);
    });
  }

  brancherAccueil();
  brancherRecherche();
})();
