# 🦕 Le Monde des Dinosaures

Site **statique** (HTML / CSS / JavaScript) à vocation éducative, destiné aux enfants de 7 à 12 ans.
Conçu **mobile-first** : la lecture sur tablette et smartphone est le cas d’usage principal.

👉 Pour voir le site : ouvrir `index.html` dans un navigateur, ou servir le dossier avec n’importe quel serveur statique.

---

## Ce que contient le site

| Rubrique | Détail |
|---|---|
| **36 fiches** de créatures | Illustration, carte d’identité, textes, anecdotes, comparaison de taille |
| **3 périodes** | Trias, Jurassique, Crétacé |
| **10 familles** | Théropodes, sauropodes, cératopsiens… dont 2 groupes de *cousins* (ptérosaures, reptiles marins) |
| **1 frise du temps** | 186 millions d’années, chaque créature placée à son époque |
| **2 dossiers** | La grande extinction · Le métier de paléontologue |
| **5 mini-jeux** | Quiz · Vrai ou faux · Qui suis-je ? · Memory · Puzzle |
| **Pages légales** | Mentions légales, confidentialité, accessibilité, plan du site |

**70 pages HTML** au total.

---

## Principes techniques

- **Aucune dépendance au moment de l’exécution.** Pas de framework, pas de CDN, pas de police Google.
  Tout est servi depuis le même domaine — c’est ce qui permet d’annoncer « aucune donnée transmise à un tiers ».
- **Aucun cookie, aucun traceur, aucune publicité.** Les scores des jeux vivent en mémoire, le temps de la partie.
- **Deux jeux d'images complémentaires** :
  - les pages documentaires (catalogue, fiches, familles, périodes, frise) affichent des
    **reconstitutions scientifiques et photographies** issues de Wikimedia Commons, sous licence libre ;
  - la page d'accueil et les mini-jeux utilisent des **illustrations vectorielles originales**,
    générées par code (`tools/svg.mjs`), animées en CSS et respectant `prefers-reduced-motion`.
- **Attribution des images** affichée sous chaque photo et récapitulée sur `credits.html`,
  comme l'exigent les licences CC BY et CC BY-SA.
- **Thème sombre automatique** selon le réglage du système.
- Le contenu documentaire reste **lisible sans JavaScript** ; seuls les jeux et le filtrage en ont besoin.

---

## Structure

```
index.html, dinosaures.html, frise.html, …   pages générées (à versionner)
dinosaures/<slug>.html                       les 36 fiches
periodes/<slug>.html, familles/<slug>.html
jeux/<slug>.html

assets/
  css/style.css          feuille de style unique
  js/site.js             navigation, animations
  js/catalogue.js        filtres et recherche
  js/donnees.js          données des jeux (GÉNÉRÉ — ne pas modifier)
  js/jeux/*.js           les cinq mini-jeux
  img/dinos/*.svg        illustrations maison (GÉNÉRÉES)
  img/puzzle/*.svg       variantes plein cadre pour le puzzle (GÉNÉRÉES)
  img/photos/*.webp      reconstitutions Wikimedia Commons (TÉLÉCHARGÉES)

tools/                   le générateur (Node, zéro dépendance)
  build.mjs              point d’entrée
  svg.mjs                dessin des illustrations
  templates.mjs          en-tête, pied de page, gabarit de page
  empreintes.mjs         suffixe ?v= pour le cache
  data/                  contenu éditorial (dinosaures, périodes, quiz…)
    photos.mjs           crédits des images (GÉNÉRÉ par photos.mjs)
    photos-manuel.json   fichiers Commons choisis à la main
  pages/                 un module par type de page
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
