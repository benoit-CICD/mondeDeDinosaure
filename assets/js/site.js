/* Comportements communs à toutes les pages : navigation, animations, petits détails. */
(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  /* ---- Menu mobile ---- */
  var bouton = document.querySelector(".nav-bouton");
  var nav = document.getElementById("navigation-principale");

  if (bouton && nav) {
    var basculer = function (ouvrir) {
      bouton.setAttribute("aria-expanded", String(ouvrir));
      nav.setAttribute("data-ouvert", String(ouvrir));
      document.body.style.overflow = ouvrir && window.innerWidth < 992 ? "hidden" : "";
    };

    bouton.addEventListener("click", function () {
      basculer(bouton.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && window.innerWidth < 992) basculer(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var sousMenu = document.querySelector(".nav__groupe[open]");
      if (sousMenu) {
        sousMenu.open = false;
        sousMenu.querySelector("summary").focus();
        return;
      }
      if (bouton.getAttribute("aria-expanded") === "true") {
        basculer(false);
        bouton.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 992) {
        document.body.style.overflow = "";
        nav.setAttribute("data-ouvert", "false");
        bouton.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- Sous-menus : un seul ouvert à la fois sur grand écran ---- */
  var groupes = Array.prototype.slice.call(document.querySelectorAll(".nav__groupe"));
  groupes.forEach(function (g) {
    g.addEventListener("toggle", function () {
      if (g.open && window.innerWidth >= 992) {
        groupes.forEach(function (autre) { if (autre !== g) autre.open = false; });
      }
    });
  });
  document.addEventListener("click", function (e) {
    if (window.innerWidth < 992) return;
    if (!e.target.closest(".nav__groupe")) groupes.forEach(function (g) { g.open = false; });
  });

  /* ---- Apparition progressive au défilement ---- */
  var animes = document.querySelectorAll("[data-anim]");
  if (animes.length) {
    if ("IntersectionObserver" in window) {
      var observateur = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (entree) {
          if (entree.isIntersecting) {
            entree.target.classList.add("vu");
            observateur.unobserve(entree.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      animes.forEach(function (el) { observateur.observe(el); });
    } else {
      animes.forEach(function (el) { el.classList.add("vu"); });
    }
  }

  /* ---- Barres de taille (fiches dinosaures) ---- */
  var jauges = document.querySelectorAll(".barre-taille__jauge");
  if (jauges.length) {
    var remplir = function (j) { j.style.width = (j.dataset.valeur || "0") + "%"; };
    if ("IntersectionObserver" in window) {
      var obsJauge = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (e) {
          if (e.isIntersecting) { remplir(e.target); obsJauge.unobserve(e.target); }
        });
      }, { threshold: 0.4 });
      jauges.forEach(function (j) { obsJauge.observe(j); });
    } else {
      jauges.forEach(remplir);
    }
  }

  /* ---- Compteurs animés ---- */
  var compteurs = document.querySelectorAll("[data-compteur]");
  var reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (compteurs.length && "IntersectionObserver" in window) {
    var obsC = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        obsC.unobserve(e.target);
        var cible = parseInt(e.target.dataset.compteur, 10) || 0;
        if (reduit) { e.target.textContent = cible.toLocaleString("fr-FR"); return; }
        var debut = performance.now(), duree = 1100;
        var pas = function (t) {
          var p = Math.min((t - debut) / duree, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          e.target.textContent = Math.round(cible * eased).toLocaleString("fr-FR");
          if (p < 1) requestAnimationFrame(pas);
        };
        requestAnimationFrame(pas);
      });
    }, { threshold: 0.5 });
    compteurs.forEach(function (c) { obsC.observe(c); });
  }

  /* ---- Année courante dans le pied de page ---- */
  var annee = document.querySelector("[data-annee]");
  if (annee) annee.textContent = String(new Date().getFullYear());

  /* ---- Bouton « haut de page » ---- */
  var haut = document.querySelector("[data-haut]");
  if (haut) {
    haut.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduit ? "auto" : "smooth" });
      var cible = document.querySelector("main");
      if (cible) cible.focus({ preventScroll: true });
    });
  }
})();
