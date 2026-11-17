# 🦕 Le Monde des Dinosaures

Site **statique** (HTML / CSS / JavaScript) à vocation éducative, destiné aux enfants de 7 à 12 ans.
Conçu **mobile-first** : la lecture sur tablette et smartphone est le cas d’usage principal.

👉 Pour voir le site : ouvrir `index.html` dans un navigateur, ou servir le dossier avec n’importe quel serveur statique.

---

## Ce que contient le site

| Rubrique | Détail |
|---|---|
| **38 fiches** de créatures | Illustration, carte d’identité, textes, anecdotes, comparaison de taille |
| **3 périodes** | Trias, Jurassique, Crétacé |
| **10 familles** | Théropodes, sauropodes, cératopsiens… dont 2 groupes de *cousins* (ptérosaures, reptiles marins) |
| **1 frise du temps** | 186 millions d’années, chaque créature placée à son époque |
| **4 dossiers** | La grande extinction · Le métier de paléontologue · Œufs et bébés dinosaures · L’ère glaciaire |
| **1 rubrique Cinéma** | Un siècle de dinosaures à l’écran · Les effets spéciaux · Film ou réalité ? (les erreurs des films) |
| **12 mini-jeux** | Quiz · Vrai ou faux · Qui suis-je ? · Memory · Puzzle · Retrouve la maman · Plus grand ou plus petit ? · La machine à remonter le temps · Détective des empreintes · Le quiz du cinéma (niveau facile ou difficile) · Duel de dinosaures · Le roi de la tour |
| **1 rubrique Affrontement de dinos** | Les deux jeux de duels, et comment le jeu décide du vainqueur |
| **Pages légales** | Mentions légales, confidentialité, accessibilité, plan du site |

**87 pages HTML** au total (88 avec le thème d’Halloween, qui ajoute son diplôme hors plan du site), plus 12 petites pages qui redirigent les anciennes adresses.

Les idées pour les prochaines mises à jour (dont le jeu de la fouille) sont notées dans [`IDEES.md`](IDEES.md).

---

## Principes techniques

- **Aucune dépendance au moment de l’exécution.** Pas de framework, pas de CDN, pas de police Google.
  Tout est servi depuis le même domaine — c’est ce qui permet d’annoncer « aucune donnée transmise à un tiers ».
- **Aucun cookie, aucun traceur, aucune publicité.** Les scores des jeux vivent en mémoire, le temps de la partie.
- **Deux jeux d'images complémentaires** :
  - les pages documentaires (catalogue, fiches, familles, périodes, frise) affichent des
    **reconstitutions scientifiques et photographies** issues de Wikimedia Commons, sous licence libre ;
  - la page d'accueil et les mini-jeux (sauf « Affrontement de dinos », qui affiche les photos des fiches, crédits
    sous chaque carte) utilisent des **illustrations vectorielles originales**,
    générées par code (`tools/svg.mjs`), animées en CSS et respectant `prefers-reduced-motion`.
- **Attribution des images** affichée sous chaque photo et récapitulée sur `credits.html`,
  comme l'exigent les licences CC BY et CC BY-SA.
- **Thème sombre automatique** selon le réglage du système.
- Le contenu documentaire reste **lisible sans JavaScript** ; seuls les jeux et le filtrage en ont besoin.

---

## Structure

```
Toutes les pages sont générées (et à versionner). Chaque rubrique a son dossier,
dont la page d'entrée s'appelle index.html :

index.html                                   l'accueil
404.html, a-propos.html, mentions-legales.html, confidentialite.html,
accessibilite.html, credits.html, plan-du-site.html
                                             pages pratiques, restées à la racine
dinosaures/index.html, dinosaures/<slug>.html   le catalogue et les 38 fiches
familles/index.html, familles/<slug>.html
periodes/index.html, periodes/<slug>.html, periodes/frise.html
jeux/index.html, jeux/<slug>.html            la salle de jeux et les mini-jeux
cinema/index.html, cinema/<slug>.html        la rubrique cinéma
comprendre/<slug>.html                       glossaire, questions et dossiers
                                             (extinction, œufs, ère glaciaire, métier)
dinosaures.html, jeux.html, oeufs.html, …    redirections vers les nouvelles adresses
                                             (liste dans tools/build.mjs, hors plan du site)

assets/
  css/style.css          feuille de style principale
  js/site.js             navigation, animations
  js/catalogue.js        filtres et recherche
  js/donnees.js          données des jeux (GÉNÉRÉ — ne pas modifier)
  js/jeux/commun.js      outils partagés par les jeux
  js/jeux/*.js           un script par mini-jeu
  img/dinos/*.svg        illustrations maison (GÉNÉRÉES)
  img/puzzle/*.svg       variantes plein cadre pour le puzzle (GÉNÉRÉES)
  img/oeufs/*.svg        œufs du jeu « Retrouve la maman » (GÉNÉRÉS)
  img/empreintes/*.svg   empreintes du « Détective des empreintes » (GÉNÉRÉES)
  img/photos/*.webp      reconstitutions Wikimedia Commons (TÉLÉCHARGÉES)

themes/                  les thèmes saisonniers, un dossier par thème (voir plus bas)
  themes.mjs             la liste des thèmes
  commun/                bandeau, bouton « Enlever le déguisement », mémoire de la visite
  halloween/             tout le thème d’Halloween : réglages, CSS, JS, décor, diplôme

tools/                   le générateur (Node, zéro dépendance)
  build.mjs              point d’entrée
  svg.mjs                dessin des illustrations
  svg-traces.mjs         dessin des œufs et des empreintes
  templates.mjs          en-tête, pied de page, gabarit de page
  empreintes.mjs         suffixe ?v= pour le cache
  data/                  contenu éditorial (dinosaures, périodes, quiz…)
    jeux.mjs             questions, repères du temps, et listeJeux (la liste des mini-jeux)
    oeufs.mjs            œufs par famille, et les intrus qui ne pondaient pas
    empreintes.mjs       empreintes et suspects
    cinema.mjs           films, effets spéciaux, erreurs des films et questions du quiz du cinéma
    affrontements.mjs    calcul de la puissance des combattants (duels et tour)
    bareme-affrontements.mjs  armes, protections et atouts vérifiés de chaque dinosaure
    photos.mjs           crédits des images (GÉNÉRÉ par photos.mjs)
    photos-manuel.json   fichiers Commons choisis à la main
  pages/                 un module par type de page (dossiers.mjs : les dossiers thématiques,
                         cinema.mjs : la rubrique cinéma)
```

Les fichiers marqués **GÉNÉRÉ** sont écrasés à chaque build : modifier les sources dans `tools/`.

---

## Les images des fiches

Elles sont récupérées séparément du build, car cette étape nécessite le réseau :

```bash
node tools/photos.mjs          # complète ce qui manque
node tools/photos.mjs --force  # retélécharge tout
```

Le script interroge Wikipédia et Wikimedia Commons, **écarte automatiquement les licences non libres**
(non commercial, pas de modification), privilégie les reconstitutions d'animaux vivants plutôt que les os
isolés, redimensionne à 900 px et convertit en WebP. Il écrit les crédits dans `tools/data/photos.mjs`.

La sélection automatique se trompe parfois (un fémur, un schéma anatomique, une statue de parc).
Dans ce cas, imposer le bon fichier dans `tools/data/photos-manuel.json` :

```json
{ "stegosaurus": "Stegosaurus stenops Life Reconstruction.png" }
```

puis supprimer `assets/img/photos/<slug>.webp` et relancer le script.

> **Attention** : ces images appartiennent à leurs auteurs. Si vous en changez une, l'attribution suit
> automatiquement — mais ne remplacez jamais un fichier à la main sans mettre à jour `photos.mjs`,
> sinon le crédit affiché deviendrait faux.

## Régénérer le site

Node.js 18 ou plus récent est nécessaire (uniquement pour la génération, pas pour la consultation).

```bash
node tools/build.mjs
```

Le build vérifie automatiquement :

- que **tous les liens internes** pointent vers un fichier existant ;
- qu’il y a **exactement un `<h1>`** par page ;
- que **toutes les images ont un attribut `alt`**.

Il s’arrête avec un code d’erreur si un contrôle échoue.

### Prévisualiser

```bash
python3 -m http.server 4173
```

---

## Ajouter un dinosaure

1. Ajouter un objet dans l’un des fichiers `tools/data/dinos-*.mjs` (copier un voisin comme modèle).
2. Choisir un `archetype` parmi ceux de `tools/svg.mjs` — par exemple `theropode-grand`,
   `sauropode`, `ceratopsien`, `raptor`, `ankylosaure`…
3. Choisir trois `couleurs` : `[corps, ventre clair, contour foncé]`.
4. Relancer `node tools/build.mjs`.

La fiche, l’illustration, les entrées du catalogue, de la frise, du plan du site
et des jeux sont créées automatiquement.

---

## Ajouter un mini-jeu

1. Ajouter une entrée dans `listeJeux` (`tools/data/jeux.mjs`) : slug, nom, emoji, script…
   Le menu, le pied de page, l’accueil, la salle de jeux et le plan du site en dépendent : ils se mettent à jour seuls.
2. Ajouter sa page dans `pagesJeux()` (`tools/pages/jeux.mjs`), avec la fonction `pageJeu()`.
3. Écrire son script dans `assets/js/jeux/` ; `commun.js` fournit le mélange, les formats et l’écran de fin.
4. Relancer le build : il signale un script manquant.

### Affrontement de dinos : qui gagne le duel ?

Deux jeux partagent le même moteur (`assets/js/jeux/affrontement.js`) :

- **Duel de dinosaures** (`duel.js`) : 5 face-à-face tirés au hasard ; on touche celui qui gagne, puis le jeu montre
  le combat, la jauge de puissance et l’explication.
- **Le roi de la tour** (`tour.js`) : 10 étages, 3 vies. Le vrai vainqueur de chaque duel monte d’un étage et affronte
  un challenger plus fort (le classement est découpé en 10 paliers, avec un palier d’écart possible pour varier les parties).

Le vainqueur est celui qui a la plus grande **puissance**, calculée au build dans `tools/data/affrontements.mjs` :

```
puissance = 10 × log10(poids en kg) + attaque (0 à 15) + défense (0 à 12) + vitesse / 10 (5 au plus)
```

Les notes d’attaque et de défense, et les textes des explications, sont dans `tools/data/bareme-affrontements.mjs`.
Ils ont été vérifiés un par un (sources en commentaire). Les textes `arme` et `protection` s’insèrent dans des phrases
toutes faites : ils commencent par *sa*, *son* ou *ses*, sans point final. Le build le vérifie, et refuse deux puissances
égales. Les duels sont présentés comme **imaginaires** : le jeu signale quand deux dinosaures ont vraiment pu se croiser,
et annonce un « duel serré » quand l’écart est faible. Les ptérosaures et reptiles marins ne participent pas.

Les jeux affichent les **photos** des fiches : chaque carte porte le crédit de son image (auteur et licence).

### Le quiz du cinéma : deux niveaux

Les questions sont dans `quizCinema` (`tools/data/cinema.mjs`), rangées en `facile` et `difficile`.
Le joueur choisit son niveau au départ, puis répond à **20 questions** tirées au hasard dans ce niveau :
chaque niveau doit donc en compter au moins 20 (le build ne le vérifie pas). Comme pour le grand quiz,
la bonne réponse est toujours écrite en premier ; le jeu mélange les propositions.

### Œufs et empreintes : une question d’honnêteté

Pour la plupart des dinosaures, **on ne sait pas à quoi ressemblaient leurs œufs** : pour attribuer un œuf,
il faut un embryon à l’intérieur ou un adulte retrouvé sur le nid. Le jeu *Retrouve la maman* raisonne donc
par **famille**, et ne dessine en couleur que les œufs dont la couleur a été retrouvée grâce aux pigments
fossilisés. Il en va de même pour les empreintes : on les attribue à un groupe d’animaux, rarement à une espèce.
Garder cette règle si vous ajoutez des œufs ou des empreintes.

---

## 🎃 Les thèmes saisonniers

Le site peut se « déguiser » pour une période de l’année. Le thème affiché se choisit avec **`theme`**
dans `tools/data/site.mjs` :

```js
theme: null,          // "halloween", "hiver" (le nom d’un dossier de themes/), ou null pour aucun thème
```

Changer la valeur, puis relancer le build. Avec `null`, le site généré redevient exactement celui sans thème :
aucune feuille de style, aucun script, aucun bandeau ni paragraphe en plus, et les pages propres aux thèmes
(comme le diplôme d’Halloween) sont effacées. Un nom inconnu arrête le build.

### Le dossier `themes/`

Tout ce qui appartient à un thème est rangé dans **son dossier**, `themes/<id>/` : le site normal (`tools/`, `assets/`)
ne contient aucune ligne propre à un thème.

```
themes/
  themes.mjs             la liste des thèmes (à compléter quand on en ajoute un)
  commun/
    commun.css           le bandeau sous le menu, les fenêtres (annonce des nouveautés…)
    commun.js            le bandeau, le bouton, la mémoire, l’annonce des nouveautés (window.Theme)
  hiver/
    theme.mjs            les réglages : messages, annonce, hauteur et vitesse de la neige…
    hiver.css            couleurs et décor (html.hiver), touche de Noël (html.hiver.noel)
    hiver.js             la touche de Noël, en décembre
    neige.js             la neige qui tombe et s’entasse, et la pelle
    accueil.mjs          décor de la scène de l’accueil (bonhomme de neige, sapin…)
  halloween/
    theme.mjs            les réglages : nom, message du bandeau, fichiers, décor, diplôme…
    halloween.css        couleurs et décor, rangés sous html.halloween
    halloween.js         animations, citrouilles cachées et autres surprises
    accueil.mjs          décor de la scène de l’accueil (ciel de nuit, citrouilles…)
    diplome.mjs          la page du diplôme
    diplome-citrouilles.html   cette page (GÉNÉRÉE seulement quand le thème est actif)
```

### Ce qui est commun à tous les thèmes

`themes/commun/commun.css` et `themes/commun/commun.js` fournissent :

- le **bandeau** sous le menu, avec le bouton **« Enlever le déguisement »** pour les enfants que ça impressionne ;
- la **mémoire de la visite** (`sessionStorage`, une clé par thème : `theme:<id>:…`), jamais envoyée,
  effacée à la fermeture de l’onglet ;
- la **mémoire durable** (`localStorage`), gardée d’une visite à l’autre sur l’appareil, jamais envoyée :
  seulement pour un thème qui la déclare (`memoireDurable` dans `theme.mjs`), sinon elle retombe sur la mémoire
  de la visite. La page Confidentialité dit ainsi toujours la vérité ;
- l’**annonce des nouveautés** (`annonce` dans `theme.mjs`) : une fenêtre sur la page d’accueil, montrée une seule fois.
  Elle se ferme avec le bouton, la croix, Échap ou un clic à côté, et ne revient plus : de la visite, ou pour de bon
  si le thème a une mémoire durable. Pour une prochaine annonce, changer sa clé (`cle`) et son texte ;
- `window.Theme`, sur lequel se branche le script du thème : `actif()`, `surAccueil()`, `reglages` (les `reglages`
  de `theme.mjs`), `lire()` / `ecrire()` (mémoire de la visite), `lireDurable()` / `ecrireDurable()` /
  `effacerDurable()` (mémoire durable), `annoncer()` (pour les lecteurs d’écran), `zone` (le paragraphe du bandeau,
  pour y ajouter un compteur ou un bouton) et `surBascule()`.

Les pages Confidentialité et Accessibilité s’adaptent toutes seules au thème choisi.

### Ajouter un thème

1. Créer le dossier `themes/<id>/` et y écrire `theme.mjs`, sur le modèle de `themes/halloween/theme.mjs` ou
   `themes/hiver/theme.mjs` : nom, message du bandeau, ce qu’il garde en mémoire (`memoire`, `memoireDurable`),
   feuilles de style et scripts (`css`, `js`), et si besoin le décor de l’accueil (`accueil`), l’annonce des
   nouveautés (`annonce`), des réglages pour ses scripts (`reglages`), un diplôme (`diplome`) et des pages en plus (`pages`).
2. Écrire sa feuille de style : couleurs et décor, rangés sous `html.<id>` ; les couleurs du bandeau
   passent par `--theme-bandeau-fond`, `--theme-bandeau-texte` et `--theme-accent`, le cadre des fenêtres par
   `--theme-cadre`, et le voile derrière elles par `.dialogue-theme::backdrop`.
3. Écrire son script : animations et surprises, en s’appuyant sur `window.Theme`.
4. Le déclarer dans `themes/themes.mjs`.
5. Mettre `theme: "<id>"` dans `site.mjs` et relancer le build : il signale un fichier manquant.

Les pages d’un thème reçoivent du générateur les outils `page`, `esc` et `site` : un dossier de thème
n’importe rien de `tools/`.

Garder les règles d’Halloween : couper les animations avec « réduire les animations », masquer le décor
à l’impression, et tout rendre utilisable au clavier.

### Le thème d’Halloween

- **Couleurs** orange et violet (clair et sombre), guirlande de fanions sous le menu, toiles dans le coin des encadrés,
  cimetière « R.I.P. T-REX » au-dessus du pied de page, scène de nuit sur l’accueil (lune, chauves-souris, citrouilles).
- **L’araignée**, en haut à droite de chaque page : on la tire au doigt ou à la souris, le fil s’allonge, et elle remonte
  quand on la lâche. Un simple appui (ou Entrée au clavier) la fait descendre. Elle donne des anecdotes vraies sur les
  araignées fossiles et des indices pour les easter eggs.
- **La chasse aux 10 citrouilles**, listées dans `CACHETTES` (`themes/halloween/halloween.js`). Elles ne se montrent
  jamais en entier : derrière un encadré (seul le haut dépasse), minuscules et pâles, dans un volet à déplier,
  avec certains filtres du catalogue, ou coincées entre deux tombes. L’araignée donne des **devinettes**, pas des adresses.
  - Cachettes : accueil, fiche du T-rex, fiche du Maiasaura, frise, glossaire, salle de jeux, Questions fréquentes,
    puzzle, catalogue (Crétacé + Herbivore), cimetière de la page sur l’extinction.
  - **La récompense** : à la 10ᵉ, une fenêtre propose le **diplôme de chasseur de citrouilles**, qui s’ouvre dans un nouvel
    onglet (`themes/halloween/diplome-citrouilles.html`, à imprimer). Le prénom se règle dans
    `themes/halloween/theme.mjs` (`diplome.prenom`).
    La page n’est liée nulle part, absente du sitemap et marquée `noindex` ; sans les 10 citrouilles, elle reste « sous clé ».
- **L’annonce des nouveautés** : une petite fenêtre sur la page d’accueil annonce les 10 citrouilles et les nouvelles
  surprises. Elle ne revient plus de la visite. Son texte et sa clé se règlent dans `themes/halloween/theme.mjs` (`annonce`).
- **Les autres easter eggs** :
  - taper **« bouh »** au clavier, ou toucher **5 fois le fantôme 👻** du bandeau : un T-rex fantôme traverse l’écran ;
  - toucher **la lune** de l’accueil : une nuée de chauves-souris s’envole ;
  - toucher **le volcan** de l’accueil : éruption, et une anecdote sur les volcans de la fin du Crétacé ;
  - toucher **3 fois le dinosaure** de l’accueil : il rugit (en silence) et explique qu’on ne connaît pas le cri des dinosaures ;
  - toucher **une tombe** du cimetière, en bas des pages : un petit fantôme en sort avec une anecdote sur l’extinction ;
  - toucher **la chauve-souris** à côté des titres : elle s’envole à travers la page ;
  - écrire **« citrouille »**, **« fantôme »**, **« araignée »** ou **« chauve-souris »** dans la recherche du catalogue ;
  - **appui long** (ou double-clic, ou « radio » au clavier) sur l’image d’une fiche : effet « rayons X » ;
  - un **sans-faute** à un jeu (ou un memory / puzzle terminé) : pluie de bonbons ;
  - le **31 octobre**, des feux follets se promènent sur le site (pour tester un autre jour : ajouter `#31-octobre` à l’adresse).
- Le décor de nuit de l’accueil est écrit dans `themes/halloween/accueil.mjs` (affiché seulement avec `theme: "halloween"`).

### Le thème d’hiver

- **Couleurs** bleu glacier (clair et sombre), liseré de givre sous le menu, et sur l’accueil un paysage enneigé :
  sol et sommets blancs, neige sur le volcan et les fougères, bonhomme de neige, écharpe rayée pour le dinosaure.
- **La neige** (`themes/hiver/neige.js`) tombe dès l’arrivée et **s’entasse en bas de l’écran**, jusqu’à
  **un tiers** de sa hauteur en **deux minutes** ; sur les pages de jeux (`jeux/…`), elle s’arrête à **10 %** pour ne pas
  gêner la partie. Ces trois valeurs se règlent dans `themes/hiver/theme.mjs` (`reglages.neige`).
  - C’est un calque posé devant la page, qui laisse passer les clics. La forme de la neige est gardée dans la mémoire
    de la visite : on la retrouve d’une page à l’autre. Sur une page de jeu, elle est seulement affichée moins haut
    (on retrouve toute la couche en sortant du jeu, sauf si on y a déneigé).
  - **La pelle** : le bouton **« Prendre la pelle »**, en bas à droite, apparaît dès que la neige tient. La pelle suit
    la souris ou le doigt et déblaie la neige sur son passage, avec de petites gerbes ; elle ne travaille qu’en bas
    de l’écran, le reste de la page reste utilisable. Échap ou « Poser la pelle » la repose.
    **Au clavier**, le même bouton déneige tout l’écran d’un coup.
  - Rien ne reste caché pour de bon : la page gagne en bas une marge de la hauteur de la neige, et un élément atteint
    avec la touche Tab remonte au-dessus de la neige.
  - Avec « réduire les animations », il ne neige pas. Pour essayer sans attendre : ajouter `#neige-rapide` à
    l’adresse (la neige monte dix fois plus vite).
- **La touche de Noël**, en **décembre** seulement (`themes/hiver/hiver.js`) : bandeau rouge « Joyeux Noël ! »,
  guirlande lumineuse sous le menu, empreinte du logo en rouge, et sur l’accueil un sapin décoré, des cadeaux et un
  bonnet de Noël pour le dinosaure. Pour l’essayer un autre mois : ajouter `#noel` à l’adresse de l’accueil.
- **L’annonce des nouveautés** présente la neige et la pelle ; elle n’apparaît **qu’une seule fois**, même d’une visite
  à l’autre (mémoire durable).

## ⚠️ Avant la mise en ligne

Les pages **Mentions légales**, **Confidentialité** et **Accessibilité** contiennent des
mentions `[À COMPLÉTER]` surlignées en jaune. Elles se renseignent dans `tools/data/site.mjs` :

```js
auteur:    "…",  // nom de l’éditeur
email:     "…",  // adresse de contact
hebergeur: "…",  // nom et adresse de l’hébergeur
```

Certains libellés (adresse postale, directeur de la publication, dates) sont écrits directement
dans `tools/pages/infos.mjs`.

L'hébergeur est déjà renseigné (GitHub, Inc.) : vérifier son adresse sur <https://github.com/contact>
au moment de la publication, ces informations peuvent changer.

L'adresse publique du site se règle avec `url` et `racine` dans le même fichier — voir
*Déploiement sur GitHub Pages* plus bas.

---

## Déploiement sur GitHub Pages

Le site étant entièrement statique et les pages HTML versionnées, GitHub Pages n'a rien à construire :
il sert les fichiers tels quels.

1. **Settings → Pages**
2. *Source* : **Deploy from a branch**
3. *Branch* : `main`, dossier `/ (root)` → **Save**

Environ une minute plus tard, le site est en ligne. Chaque `git push` sur `main` le republie.

### Configuration liée à l'adresse

Trois valeurs dans `tools/data/site.mjs` dépendent de l'endroit où le site est publié :

```js
url:    "https://benoit-cicd.github.io/mondeDeDinosaure",  // sitemap.xml, robots.txt
racine: "/mondeDeDinosaure/",                              // chemins de la page 404
```

`racine` mérite une explication : GitHub Pages affiche `404.html` pour **n'importe quelle** URL
inexistante, y compris dans un sous-dossier (`/dinosaures/xxx.html`). Des chemins relatifs y
pointeraient à côté et la page s'afficherait sans feuille de style. Ses liens et ses ressources sont
donc absolus, construits à partir de `racine`.

En cas de changement d'adresse (domaine personnalisé, autre hébergeur), mettre `racine` à `"/"` et
ajuster `url`, puis relancer le build. Le build vérifie que tous les chemins absolus partent bien de
`racine` et visent un fichier existant.

### Tester le sous-dossier en local

Servir le dossier **parent** reproduit la structure de GitHub Pages :

```bash
cd .. && python3 -m http.server 4173
```

puis ouvrir `http://localhost:4173/mondeDeDinosaure/404.html`.

### Le fichier .nojekyll

Sa présence à la racine désactive le traitement Jekyll de GitHub, qui ignorerait sinon certains
fichiers et ralentirait le déploiement. Ne pas le supprimer.

## Sources et exactitude

Les informations proviennent d’ouvrages de vulgarisation et de ressources de musées d’histoire
naturelle. Les tailles et les poids sont des **estimations** : elles varient selon les spécimens
et les publications. Les illustrations sont des représentations **stylisées**, pas des
reconstitutions scientifiques.

## Licence

- **Textes et illustrations vectorielles** (créations originales) : réutilisation libre dans un cadre
  **pédagogique non commercial**, avec mention de la source.
- **Photographies et reconstitutions** : propriété de leurs auteurs respectifs, sous licences libres
  (domaine public, CC0, CC BY, CC BY-SA). Voir `credits.html` pour le détail par image. Leur réutilisation
  est soumise aux conditions de leur licence d'origine.
