// Les œufs du jeu « Retrouve la maman » et du dossier « Œufs et bébés dinosaures ».
//
// On raisonne par FAMILLE et non par espèce : pour la plupart des dinosaures
// (T-rex, Tricératops, Stégosaure…), on ne sait pas à quoi ressemblaient
// leurs œufs. Pour attribuer un œuf, il faut un embryon dedans ou un adulte
// retrouvé sur le nid. Chaque entrée ne garde donc que ce qui est connu.
//
// La couleur n'est dessinée que lorsqu'elle a été retrouvée grâce aux pigments
// fossilisés (Oviraptor, Deinonychus) ou qu'elle est évidente (poule).
// Les autres œufs gardent une teinte de fossile, sans prétendre à plus.

export const oeufs = [
  {
    id: "sauropode",
    parent: { nom: "Un sauropode", famille: "Famille des géants au long cou", img: "argentinosaurus" },
    dessin: { forme: 0.02, allonge: 1, taille: 15, couleur: "#e3d8c2", ligne: "#7d705a", motif: "grains" },
    indices: {
      forme: "Bien rond, comme une balle",
      taille: "12 à 15 cm, comme un pamplemousse",
      coquille: "Dure, épaisse, couverte de petits grains",
      nid: "Un trou creusé dans le sol, puis recouvert : les parents s’en vont",
    },
    aide: "Ses parents pesaient des dizaines de tonnes : impossible de s’asseoir sur les œufs sans les écraser !",
    explication: "Ce sont des œufs de titanosaure, la famille de l’Argentinosaurus. On en a trouvé des milliers en Argentine… et en France, au pied de la montagne Sainte-Victoire, près d’Aix-en-Provence !",
  },
  {
    id: "hadrosaure",
    parent: { nom: "Maiasaura", famille: "Famille des hadrosaures", img: "maiasaura" },
    dessin: { forme: 0.25, allonge: 1.12, taille: 15, couleur: "#d8c4a3", ligne: "#735d40", motif: "bosses" },
    indices: {
      forme: "Presque rond",
      taille: "À peu près comme un œuf d’autruche",
      coquille: "Dure et un peu bosselée",
      nid: "Un cratère de terre, au milieu d’une colonie de nids voisins",
    },
    aide: "Ses bébés restaient au nid après la naissance, et leurs parents leur apportaient à manger.",
    explication: "C’est un œuf de Maiasaura, « le lézard bonne mère ». Chaque nid contenait 30 à 40 œufs, et les parents s’occupaient de leurs petits.",
  },
  {
    id: "oviraptor",
    parent: { nom: "Oviraptor", famille: "Famille des théropodes", img: "oviraptor" },
    dessin: { forme: 0.3, allonge: 2.05, taille: 17, couleur: "#86c3b4", ligne: "#2c6a5e", motif: "stries" },
    indices: {
      forme: "Allongé",
      taille: "15 à 18 cm de long",
      coquille: "Dure, avec de fines rayures… et bleu-vert !",
      nid: "Pondus deux par deux, en cercle, avec un espace vide au milieu",
    },
    aide: "Le parent s’asseyait dans l’espace vide, au milieu du cercle, et couvrait les œufs de ses bras emplumés.",
    explication: "C’est un œuf d’Oviraptor ! On l’a accusé pendant 70 ans de voler ces œufs… alors que c’étaient les siens.",
  },
  {
    id: "ceratopsien",
    parent: { nom: "Un cératopsien", famille: "Famille du Tricératops", img: "triceratops" },
    dessin: { forme: 0.15, allonge: 1.5, taille: 12, couleur: "#e6dac6", ligne: "#857459", motif: "rides" },
    indices: {
      forme: "Allongé",
      taille: "Moyen",
      coquille: "Molle, souple comme du cuir",
      nid: "Enterrés dans le sable, comme des œufs de tortue",
    },
    aide: "Sa maman avait un bec de perroquet et une collerette osseuse derrière la tête.",
    explication: "C’est un œuf de Protoceratops, un petit cousin du Tricératops. Sa coquille molle se conservait très mal : il a fallu attendre 2020 pour comprendre qu’elle n’était pas dure !",
  },
  {
    id: "pterosaure",
    parent: { nom: "Un ptérosaure", famille: "Reptile volant, pas un dinosaure", img: "pterodactylus" },
    dessin: { forme: 0.1, allonge: 1.35, taille: 7, couleur: "#efe5d3", ligne: "#8b7e68", motif: "rides" },
    indices: {
      forme: "Ovale",
      taille: "Petit : à peine plus gros qu’un œuf de poule",
      coquille: "Souple comme du papier épais",
      nid: "Enterrés dans le sable au bord d’un lac, par centaines",
    },
    aide: "À la naissance, le bébé savait déjà marcher… mais pas encore voler !",
    explication: "C’est un œuf de ptérosaure, un reptile volant. En Chine, on en a trouvé 215 au même endroit, dont 16 avec un bébé fossilisé à l’intérieur !",
  },
  {
    id: "therizinosaure",
    parent: { nom: "Un thérizinosaure", famille: "Famille des théropodes", img: "therizinosaurus" },
    dessin: { forme: 0.04, allonge: 1.03, taille: 12, couleur: "#d4c3a8", ligne: "#6b583f", motif: "rugueux" },
    indices: {
      forme: "Rond",
      taille: "10 à 15 cm",
      coquille: "Épaisse et rugueuse",
      nid: "Enterrés dans le sol, dans une grande colonie de nids",
    },
    aide: "Sa maman avait des griffes longues d’un mètre… et pourtant, elle mangeait des plantes !",
    explication: "C’est un œuf de thérizinosaure. En Mongolie, on a découvert une colonie d’au moins 15 nids : plus de la moitié des bébés avaient réussi à éclore.",
  },
  {
    id: "raptor",
    parent: { nom: "Deinonychus", famille: "Famille des raptors", img: "deinonychus" },
    dessin: { forme: 0.35, allonge: 1.4, taille: 11, couleur: "#8fb8dc", ligne: "#2f5579", motif: "taches" },
    indices: {
      forme: "Ovale",
      taille: "Moyen",
      coquille: "Bleue, avec des taches brunes",
      nid: "Des morceaux de coquille retrouvés juste sous un squelette d’adulte",
    },
    aide: "Sa maman était une chasseuse à plumes, avec une grande griffe en forme de faucille à chaque pied.",
    explication: "C’est un œuf de Deinonychus, un raptor. Sa couleur a été retrouvée en 2018 grâce à des traces de pigments dans la coquille fossilisée : bleu, comme un œuf d’émeu !",
  },
  {
    id: "poule",
    parent: { nom: "Une poule", famille: "Un dinosaure d’aujourd’hui !", emoji: "🐔" },
    dessin: { forme: 0.45, allonge: 1.3, taille: 6, couleur: "#f1dcc3", ligne: "#9b7c58", motif: "lisse" },
    indices: {
      forme: "Ovale, avec un bout plus pointu",
      taille: "Environ 6 cm",
      coquille: "Dure, lisse, blanche ou rousse",
      nid: "Dans la paille d’un poulailler",
    },
    aide: "Tu en as peut-être mangé un au petit déjeuner…",
    explication: "Eh oui : la poule est un dinosaure ! Les oiseaux descendent des dinosaures à plumes. Un œuf de poule est donc un vrai œuf de dinosaure… d’aujourd’hui.",
  },
];

/* Les intrus : ces parents ne pondaient pas d'œufs du tout. */
export const sansOeuf = [
  {
    id: "ichthyosaure",
    parent: { nom: "Ichthyosaurus", famille: "Reptile marin, pas un dinosaure", img: "ichthyosaurus" },
    explication: "Piège ! L’Ichthyosaurus ne pondait pas d’œufs : il donnait naissance à des bébés vivants, directement dans la mer.",
  },
  {
    id: "mosasaure",
    parent: { nom: "Mosasaurus", famille: "Reptile marin, pas un dinosaure", img: "mosasaurus" },
    explication: "Piège ! Le Mosasaurus ne pondait pas d’œufs : ses petits naissaient vivants, en pleine mer.",
  },
];
