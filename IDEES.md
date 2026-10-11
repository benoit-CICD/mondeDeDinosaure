# 💡 Idées pour les prochaines mises à jour

Une liste d'idées validées ou à creuser. Rien ici n'est encore développé.

---

## Mini-jeux

### ⛏️ La fouille — *prévue pour une prochaine mise à jour*

Le joueur dégage un fossile enfoui, puis l'identifie.

- **Principe** : une grille de cases de terre recouvre un squelette. Chaque coup de pinceau dégage une case.
  Quand assez d'os apparaissent, on devine de quelle créature il s'agit.
- **Score** : moins on utilise de coups de pinceau, plus on marque de points.
- **Variante** : un outil « plâtre » pour protéger les os fragiles avant de les transporter.
- **Lien pédagogique** : prolonge le dossier *Le métier de paléontologue* (`metier.html`), qui décrit déjà
  les étapes de la fouille.
- **Pistes techniques** :
  - une grille de boutons plutôt qu'un `<canvas>`, pour que le jeu reste jouable au clavier et au lecteur d'écran ;
  - réutiliser les illustrations plein cadre du puzzle (`assets/img/puzzle/`) ou dessiner des squelettes
    simplifiés dans `tools/svg.mjs`.

### 🥩 Herbivore ou carnivore ?

Un tri rapide pensé pour les plus jeunes (7–8 ans).

- Une créature s'affiche, deux gros boutons : « Il mange des plantes » / « Il mange de la viande ».
- Les données existent déjà (champ `regime` des fiches). Attention aux omnivores et aux piscivores :
  soit on les exclut, soit on ajoute un troisième bouton.
- Variante plus difficile : deviner le régime en regardant uniquement les dents.

### 🐾 Suivre une piste

Une suite au *Détective des empreintes* : une piste de plusieurs pas permet de deviner si l'animal marchait
ou courait, et s'il était seul ou en groupe.

---

## Contenus

- **Dossier « Les empreintes fossiles »** : le jeu *Détective des empreintes* n'a pas encore son dossier
  d'indices, contrairement à *Retrouve la maman*. Sites français à citer : Plagne (Ain),
  Crayssac (Lot), Saint-Laurent-de-Trèves (Lozère).
- **Fiche Protoceratops** : c'est l'animal des œufs à coquille molle ; aujourd'hui le jeu le représente
  par la famille du Tricératops.
- **Fiche Leaellynasaura** : un dinosaure polaire d'Australie, déjà évoqué dans le dossier sur l'ère glaciaire.
