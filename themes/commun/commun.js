/* Socle commun aux thèmes saisonniers : bandeau, bouton « Enlever le
   déguisement », mémoire et fenêtre des nouveautés. Chargé seulement quand un
   thème est choisi (`theme` dans tools/data/site.mjs), juste avant le script du thème.

   Le gabarit écrit dans la page :
     <html class="theme-actif <id>">  et  window.THEME = { id, message, … }
   (les réglages de themes/<id>/theme.mjs). Le script du thème se branche
   ensuite sur window.Theme.

   La mémoire reste toujours sur l'appareil et n'est jamais envoyée :
   - la mémoire de la visite (sessionStorage), effacée à la fermeture de
     l'onglet : le choix « thème éteint » et ce que le thème retient le temps
     de la visite ;
   - la mémoire durable (localStorage), gardée d'une visite à l'autre,
     seulement pour un thème qui la déclare dans theme.mjs (memoireDurable) :
     la page Confidentialité la décrit alors. Sans cette déclaration,
     lireDurable et ecrireDurable retombent sur la mémoire de la visite. */
window.Theme = (function () {
  "use strict";

  var config = window.THEME;
  var entete = document.querySelector(".entete");
  if (!config || !entete) return null;

  var racine = document.documentElement;
  var auditeurs = [];
  var prefixe = "theme:" + config.id + ":";

  function actif() { return racine.classList.contains("theme-actif"); }

  /* L'accueil : index.html à la racine du site, pas celui d'une rubrique (jeux/index.html…). */
  function surAccueil() {
    return (window.BASE || "") === "" && /\/(index\.html)?$/.test(location.pathname);
  }

  /* ---------- Mémoire ----------
     Les clés sont rangées par thème : éteindre Halloween n'éteindra pas l'hiver. */
  function memoire(durable) {
    try { return durable && config.durable ? window.localStorage : window.sessionStorage; } catch (e) { return null; }
  }
  function lireDans(durable, cle) {
    try { return memoire(durable).getItem(prefixe + cle); } catch (e) { return null; }
  }
  function ecrireDans(durable, cle, valeur) {
    try { memoire(durable).setItem(prefixe + cle, valeur); } catch (e) { /* navigation privée, mémoire pleine */ }
  }
  function effacerDans(durable, cle) {
    try { memoire(durable).removeItem(prefixe + cle); } catch (e) { /* rien à effacer */ }
  }

  /* ---------- Le bandeau sous le menu ---------- */
  var bandeau = document.createElement("div");
  bandeau.className = "bandeau-theme";
  bandeau.setAttribute("role", "region");
  bandeau.setAttribute("aria-label", config.nom);
  bandeau.innerHTML =
    '<div class="bandeau-theme__contenu"><p class="bandeau-theme__zone">' +
    '<span class="bandeau-theme__message"></span></p>' +
    '<button type="button" class="bandeau-theme__interrupteur"></button>' +
    '<span class="visuellement-cache" role="status" aria-live="polite"></span></div>';
  entete.insertAdjacentElement("afterend", bandeau);

  var zone = bandeau.querySelector(".bandeau-theme__zone");
  var interrupteur = bandeau.querySelector(".bandeau-theme__interrupteur");
  var elAnnonce = bandeau.querySelector('[role="status"]');

  var message = bandeau.querySelector(".bandeau-theme__message");
  message.textContent = config.message;
  if (config.detail) {
    var detail = document.createElement("span");
    detail.className = "bandeau-theme__long";
    detail.textContent = " " + config.detail;
    message.appendChild(detail);
  }

  function annoncer(texte) {
    elAnnonce.textContent = "";
    setTimeout(function () { elAnnonce.textContent = texte; }, 60);
  }

  function majInterrupteur() {
    interrupteur.textContent = actif()
      ? "🦕 Enlever le déguisement"
      : config.emoji + " Remettre le déguisement " + config.deNom;
  }

  interrupteur.addEventListener("click", function () {
    var allumer = !actif();
    racine.classList.toggle("theme-actif", allumer);
    racine.classList.toggle(config.id, allumer);
    ecrireDans(false, "eteint", allumer ? "0" : "1");
    majInterrupteur();
    annoncer(allumer ? "Le thème " + config.deNom + " est de retour !" : "Le thème " + config.deNom + " est rangé.");
    auditeurs.forEach(function (f) { f(allumer); });
  });
  majInterrupteur();

  /* ---------- L'annonce des nouveautés ----------
     Réglée dans theme.mjs (annonce : cle, emoji, titre, texte, bouton, et au
     choix une liste, ou des rubriques {titre, liste} suivies d'un pied).
     Une seule fois, sur l'accueil : la fermer (bouton, croix, Échap ou clic à
     côté) ou suivre un de ses liens la range dans la mémoire, durable si le
     thème en a une. Pour annoncer de nouvelles nouveautés, changer la clé
     dans theme.mjs. */
  function listeAnnonce(liste, classe) {
    return '<ul class="dialogue-theme__liste' + (classe || "") + '">' +
      liste.map(function (l) { return "<li>" + l + "</li>"; }).join("") + "</ul>";
  }
  function annoncerNouveautes() {
    var a = config.annonce;
    if (!a || !actif() || !surAccueil() || lireDans(true, a.cle) === "vue") return;
    var longue = !!(a.rubriques && a.rubriques.length);
    var d = document.createElement("dialog");
    d.className = "dialogue-theme" + (longue ? " dialogue-theme--rubriques" : "");
    d.setAttribute("aria-labelledby", "annonce-titre");
    d.innerHTML =
      '<button type="button" class="dialogue-theme__fermer" aria-label="Fermer l’annonce" data-fermer>✕</button>' +
      '<p class="dialogue-theme__emoji" aria-hidden="true">' + a.emoji + "</p>" +
      '<h2 id="annonce-titre" tabindex="-1">' + a.titre + "</h2>" +
      "<p>" + a.texte + "</p>" +
      (a.liste && a.liste.length ? listeAnnonce(a.liste) : "") +
      (longue
        ? '<div class="dialogue-theme__rubriques">' + a.rubriques.map(function (r) {
            return '<section><h3 class="dialogue-theme__rubrique">' + r.titre + "</h3>" +
              listeAnnonce(r.liste, " dialogue-theme__liste--rubrique") + "</section>";
          }).join("") + "</div>"
        : "") +
      (a.pied ? '<p class="dialogue-theme__pied">' + a.pied + "</p>" : "") +
      '<p class="dialogue-theme__actions"><button type="button" class="bouton" data-fermer>' + a.bouton + "</button></p>";
    document.body.appendChild(d);
    var fermer = function () {
      ecrireDans(true, a.cle, "vue");
      if (d.open) d.close();
      d.remove();
    };
    Array.prototype.forEach.call(d.querySelectorAll("[data-fermer]"), function (b) { b.addEventListener("click", fermer); });
    Array.prototype.forEach.call(d.querySelectorAll("a[href]"), function (lien) {
      lien.addEventListener("click", function () { ecrireDans(true, a.cle, "vue"); });
    });
    d.addEventListener("cancel", function (e) { e.preventDefault(); fermer(); });
    /* Clic sur le fond sombre, autour de la fenêtre : on ferme aussi. */
    d.addEventListener("click", function (e) {
      if (e.target !== d) return;
      var r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) fermer();
    });
    setTimeout(function () {
      if (!actif()) { d.remove(); return; }
      if (typeof d.showModal === "function") d.showModal();
      else d.setAttribute("open", "");
      /* Une longue annonce se lit depuis le haut : le titre prend le focus. */
      if (longue) {
        d.querySelector("h2").focus({ preventScroll: true });
        d.scrollTop = 0;
      } else d.querySelector(".bouton").focus();
    }, 700);
  }
  annoncerNouveautes();

  /* ---------- Les bulles ----------
     Une petite bulle de texte au-dessus d'un élément (ou en dessous, près du
     haut de l'écran), lue aussi par les lecteurs d'écran. Une seule à la fois.
     Elle défile avec la page, sauf pour un élément fixé à l'écran (le manchot
     de l'hiver…), qu'elle accompagne sans bouger. */
  var bulleActive = null, minuterieBulle = 0;
  function estFixe(element) {
    for (var el = element; el && el !== document.body; el = el.parentElement) {
      if (getComputedStyle(el).position === "fixed") return true;
    }
    return false;
  }
  function bulle(element, texte, duree) {
    fermerBulle();
    var fixe = estFixe(element);
    var b = document.createElement("div");
    b.className = "bulle-theme" + (fixe ? " bulle-theme--fixe" : "");
    b.setAttribute("aria-hidden", "true");
    b.textContent = texte;
    document.body.appendChild(b);
    var r = element.getBoundingClientRect();
    var x = Math.max(10, Math.min(r.left + r.width / 2 - b.offsetWidth / 2, document.documentElement.clientWidth - b.offsetWidth - 10));
    var y = r.top - b.offsetHeight - 10;
    if (y < 80) y = r.bottom + 10;
    b.style.left = x + (fixe ? 0 : window.scrollX) + "px";
    b.style.top = y + (fixe ? 0 : window.scrollY) + "px";
    bulleActive = b;
    annoncer(texte);
    minuterieBulle = setTimeout(fermerBulle, duree || 7000);
  }
  function fermerBulle() {
    clearTimeout(minuterieBulle);
    if (bulleActive) { bulleActive.remove(); bulleActive = null; }
  }
  auditeurs.push(function (allume) { if (!allume) fermerBulle(); });

  return {
    id: config.id,
    actif: actif,
    surAccueil: surAccueil,
    /** Les réglages propres au thème (`reglages` dans theme.mjs). */
    reglages: config.reglages || {},
    /** Mémoire de la visite. */
    lire: function (cle) { return lireDans(false, cle); },
    ecrire: function (cle, valeur) { ecrireDans(false, cle, valeur); },
    /** Mémoire durable, si le thème la déclare (sinon : mémoire de la visite). */
    lireDurable: function (cle) { return lireDans(true, cle); },
    ecrireDurable: function (cle, valeur) { ecrireDans(true, cle, valeur); },
    effacerDurable: function (cle) { effacerDans(true, cle); },
    annoncer: annoncer,
    /** Une bulle de texte près d'un élément : bulle(element, texte, duréeEnMs). */
    bulle: bulle,
    fermerBulle: fermerBulle,
    /** Le paragraphe du bandeau, où le thème peut ajouter ses boutons et compteurs. */
    zone: zone,
    bandeau: bandeau,
    /** Appelle f(true|false) quand le visiteur allume ou éteint le thème. */
    surBascule: function (f) { auditeurs.push(f); },
  };
})();
