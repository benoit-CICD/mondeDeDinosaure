/* Thème d'hiver : la touche de Noël, en décembre, et le cadeau du 25.
   Chargé quand `theme: "hiver"` dans tools/data/site.mjs, après
   themes/commun/commun.js (bandeau, interrupteur, mémoire : window.Theme).
   La neige et la pelle sont dans neige.js, la chasse aux flocons d'or dans
   chasse.js, les autres surprises dans surprises.js.

   En décembre, html reçoit la classe « noel » : hiver.css affiche alors la
   guirlande, le sapin, les cadeaux et le bonnet du dinosaure, et le bandeau
   prend le message de Noël (reglages.noel dans theme.mjs).

   Le 25 décembre, un cadeau apparaît une fois par visite : on l'ouvre (bouton
   ou Entrée), le nœud se défait et tombe, le couvercle s'envole, et un message
   souhaite un joyeux Noël (reglages.noel.cadeau dans theme.mjs).

   Pour essayer un autre jour : #noel (la touche de Noël) ou #25-decembre (le
   cadeau) au bout de l'adresse. */
(function () {
  "use strict";

  var Theme = window.Theme;
  if (!Theme) return;

  var aujourdhui = new Date();
  var jourDeNoel = (aujourdhui.getMonth() === 11 && aujourdhui.getDate() === 25) || location.hash === "#25-decembre";
  var noel = aujourdhui.getMonth() === 11 || location.hash === "#noel" || jourDeNoel;
  if (!noel) return;
  document.documentElement.classList.add("noel");

  var reglages = Theme.reglages.noel || {};
  var message = Theme.zone.querySelector(".bandeau-theme__message");
  if (message && reglages.message) {
    message.textContent = reglages.message;
    if (reglages.detail) {
      var detail = document.createElement("span");
      detail.className = "bandeau-theme__long";
      detail.textContent = " " + reglages.detail;
      message.appendChild(detail);
    }
  }

  if (jourDeNoel) attendrePourLeCadeau();

  /* ---------- Le cadeau du 25 décembre ---------- */
  var SVG_CADEAU =
    '<svg viewBox="0 0 200 200" class="cadeau__svg" focusable="false">' +
    '<ellipse class="cadeau__lumiere" cx="100" cy="97" rx="58" ry="16" fill="#fff4c2"/>' +
    '<g class="cadeau__corps">' +
    '<rect x="40" y="96" width="120" height="86" rx="6" fill="#c62828"/>' +
    '<rect x="40" y="96" width="120" height="9" fill="#a51f1f"/>' +
    '<rect x="92" y="96" width="16" height="86" fill="#f4c542"/>' +
    "</g>" +
    '<g class="cadeau__couvercle">' +
    '<rect x="32" y="72" width="136" height="28" rx="6" fill="#e0444d"/>' +
    '<rect x="92" y="72" width="16" height="28" fill="#f4c542"/>' +
    "</g>" +
    '<g class="cadeau__noeud">' +
    '<path d="M100 74Q86 90 80 99M100 74Q114 90 120 99" stroke="#f4c542" stroke-width="7" stroke-linecap="round" fill="none"/>' +
    '<ellipse cx="80" cy="60" rx="21" ry="11" transform="rotate(-28 80 60)" fill="#f4c542" stroke="#c9952a" stroke-width="2"/>' +
    '<ellipse cx="120" cy="60" rx="21" ry="11" transform="rotate(28 120 60)" fill="#f4c542" stroke="#c9952a" stroke-width="2"/>' +
    '<circle cx="100" cy="70" r="9" fill="#f7d26a" stroke="#c9952a" stroke-width="2"/>' +
    "</g></svg>";

  /* Le cadeau attend que l'annonce des nouveautés soit fermée. */
  function attendrePourLeCadeau() {
    if (Theme.lire("cadeau") === "vu") return;
    var essais = 0;
    var minuterie = setInterval(function () {
      essais++;
      if (essais > 600) { clearInterval(minuterie); return; } // au bout de 4 minutes, tant pis
      if (!Theme.actif() || document.querySelector("dialog[open]")) return;
      clearInterval(minuterie);
      offrirCadeau();
    }, 400);
  }

  function offrirCadeau() {
    var c = reglages.cadeau || {};
    var texte = c.message || "Joyeux Noël !";
    var d = document.createElement("dialog");
    d.className = "dialogue-theme cadeau";
    d.setAttribute("aria-labelledby", "cadeau-titre");
    d.innerHTML =
      '<h2 id="cadeau-titre" class="cadeau__titre">Un cadeau pour toi !</h2>' +
      '<div class="cadeau__scene" aria-hidden="true">' + SVG_CADEAU + '<div class="cadeau__etincelles"></div></div>' +
      '<div class="cadeau__mots" aria-live="polite">' +
      '<p class="cadeau__message" hidden></p>' +
      '<p class="cadeau__sous-titre" hidden></p></div>' +
      '<p class="dialogue-theme__actions">' +
      '<button type="button" class="bouton" data-ouvrir>🎁 Ouvre-le !</button>' +
      '<button type="button" class="bouton" data-fermer hidden>Merci !</button></p>';
    document.body.appendChild(d);
    Theme.ecrire("cadeau", "vu");

    var fermer = function () { if (d.open) d.close(); d.remove(); };
    d.querySelector("[data-fermer]").addEventListener("click", fermer);
    d.addEventListener("cancel", function () { setTimeout(fermer, 0); });

    var ouvrir = d.querySelector("[data-ouvrir]");
    ouvrir.addEventListener("click", function () {
      ouvrir.hidden = true;
      var merci = d.querySelector("[data-fermer]");
      merci.hidden = false;
      merci.focus();

      /* 1. Le nœud se défait et tombe ; 2. le couvercle s'envole ; 3. le message. */
      d.classList.add("cadeau--denoue");
      setTimeout(function () { d.classList.add("cadeau--ouvert"); }, 550);
      setTimeout(function () {
        var p = d.querySelector(".cadeau__message");
        /* Le texte entier pour les lecteurs d'écran, des lettres qui sautent pour les yeux.
           Les lettres sont groupées par mot, pour que la ligne ne se coupe qu'entre deux mots. */
        var rang = 0;
        p.innerHTML = '<span class="visuellement-cache">' + texte + "</span>" +
          '<span aria-hidden="true">' + texte.split(" ").map(function (mot) {
            return '<span class="cadeau__mot">' + mot.split("").map(function (lettre) {
              return '<span class="cadeau__lettre" style="animation-delay:' + (rang++) * 55 + 'ms">' +
                (lettre === " " ? "&nbsp;" : lettre) + "</span>";
            }).join("") + "</span>";
          }).join(" ") + "</span>";
        p.hidden = false;
        var sous = d.querySelector(".cadeau__sous-titre");
        if (c.sousTitre) { sous.textContent = c.sousTitre; sous.hidden = false; }
        etincelles(d.querySelector(".cadeau__etincelles"));
      }, 1100);
    });

    if (typeof d.showModal === "function") d.showModal();
    else d.setAttribute("open", "");
    ouvrir.focus();
  }

  /* Des étoiles qui jaillissent de la boîte ouverte. */
  function etincelles(boite) {
    var symboles = ["✨", "⭐", "❄️", "🌟"];
    for (var k = 0; k < 14; k++) {
      var e = document.createElement("span");
      e.className = "cadeau__etincelle";
      e.textContent = symboles[k % symboles.length];
      var angle = -Math.PI / 2 + (k / 13 - 0.5) * Math.PI * 1.3;
      var distance = 70 + Math.random() * 50;
      e.style.setProperty("--dx", Math.round(Math.cos(angle) * distance) + "px");
      e.style.setProperty("--dy", Math.round(Math.sin(angle) * distance) + "px");
      e.style.animationDelay = Math.round(Math.random() * 250) + "ms";
      boite.appendChild(e);
    }
  }
})();
