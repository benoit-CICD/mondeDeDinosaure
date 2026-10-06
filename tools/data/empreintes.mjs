// Le jeu « Détective des empreintes ».
//
// Comme pour les œufs, les paléontologues attribuent une empreinte à un GROUPE
// d'animaux d'après sa forme (nombre de doigts, griffes, taille), rarement à
// une espèce précise : aucun animal n'est jamais retrouvé debout dans sa trace.

/* Les suspects proposés au joueur. */
export const traceurs = {
  theropode: { nom: "Un théropode", detail: "Carnivore à deux pattes", img: "allosaurus" },
  raptor: { nom: "Un raptor", detail: "Chasseur à plumes", img: "velociraptor" },
  sauropode: { nom: "Un sauropode", detail: "Géant au long cou", img: "brachiosaurus" },
  ornithopode: { nom: "Un iguanodon", detail: "Herbivore à bec", img: "iguanodon" },
  pterosaure: { nom: "Un ptérosaure", detail: "Reptile volant", img: "pterodactylus" },
  oiseau: { nom: "Un oiseau", detail: "Un dinosaure d’aujourd’hui", emoji: "🐦" },
};

export const empreintes = [
  {
    id: "petit-theropode",
    dessin: "theropode",
    auteur: "theropode",
    taille: "Environ 15 cm de long, à peu près comme ta main",
    indice: "Regarde le bout des doigts : est-il rond ou pointu ?",
    explication: "Trois doigts fins terminés par des griffes pointues : c’est un petit théropode, un carnivore à deux pattes. En Lozère, à Saint-Laurent-de-Trèves, on peut voir des empreintes comme celle-ci, vieilles d’environ 200 millions d’années.",
  },
  {
    id: "grand-theropode",
    dessin: "theropode",
    auteur: "theropode",
    taille: "86 cm de long : plus long que ton bras !",
    indice: "Trois doigts griffus… et une taille gigantesque.",
    explication: "Trois énormes doigts griffus : c’est la trace d’un très grand théropode. Celle-ci, découverte au Nouveau-Mexique, aux États-Unis, est attribuée au Tyrannosaurus rex !",
  },
  {
    id: "raptor",
    dessin: "raptor",
    auteur: "raptor",
    taille: "10 à 25 cm de long selon les espèces",
    indice: "Combien de doigts touchent vraiment le sol ?",
    explication: "Seulement deux doigts touchent le sol ! Les raptors gardaient leur grande griffe en forme de faucille relevée, pour ne pas l’user en marchant. Ce genre de traces a été retrouvé en Chine, par exemple.",
  },
  {
    id: "sauropode",
    dessin: "sauropode",
    auteur: "sauropode",
    taille: "Environ 1 mètre de large : tu pourrais t’asseoir dedans !",
    indice: "Une grande trace ronde, et une plus petite juste devant : cet animal marchait à quatre pattes.",
    explication: "Une grande empreinte ronde pour le pied et une plus petite, en croissant, pour la main : c’est un sauropode. À Plagne, dans l’Ain, un sauropode a laissé une piste de 155 mètres, la plus longue connue au monde !",
  },
  {
    id: "ornithopode",
    dessin: "ornithopode",
    auteur: "ornithopode",
    taille: "Environ 50 cm de long",
    indice: "Ces doigts sont larges et arrondis : ce ne sont pas des griffes de chasseur.",
    explication: "Trois doigts larges et arrondis, avec de petits sabots au lieu de griffes : c’est un herbivore à bec, comme l’Iguanodon ou les dinosaures à bec de canard. Sa trace ressemble à une feuille de trèfle géante.",
  },
  {
    id: "pterosaure",
    dessin: "pterosaure",
    auteur: "pterosaure",
    taille: "Quelques centimètres seulement",
    indice: "Il y a deux traces différentes : une main et un pied. Cet animal marchait à quatre pattes en repliant… ses ailes.",
    explication: "Une petite main à trois doigts et un pied allongé, comme un pied humain miniature : c’est un ptérosaure qui marchait à quatre pattes, les ailes repliées. Dans le Lot, la « plage aux ptérosaures » de Crayssac garde même la trace d’un atterrissage !",
  },
  {
    id: "oiseau",
    dessin: "oiseau",
    auteur: "oiseau",
    taille: "Environ 5 cm, la taille d’un bouchon",
    indice: "Un des doigts est tourné vers l’arrière, comme chez les animaux qui se perchent.",
    explication: "Trois doigts fins vers l’avant et un doigt tourné vers l’arrière pour s’agripper aux branches : c’est un oiseau ! Et les oiseaux sont des dinosaures… Après la pluie, cherche leurs traces dans la boue.",
  },
];
