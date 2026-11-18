// Les dinosaures du froid : ils vivaient près des pôles, où l'hiver était long et sombre.
// Faits vérifiés en novembre 2026 (sources dans la PR) ; les points débattus sont dits avec prudence.
export const dinos = [
{
  slug: "pachyrhinosaurus",
  nom: "Pachyrhinosaurus",
  prononciation: "pa-ki-ri-no-so-russ",
  sens: "« le lézard au nez épais »",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 73, ageFin: 69,
  famille: "ceratopsiens",
  archetype: "ceratopsien-bosse",
  regime: "herbivore",
  longueur: 6, hauteur: 2, poids: 3000, vitesse: 25,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 1950, par: "Charles M. Sternberg", lieu: "Alberta, Canada" },
  vraiDino: true,
  couleurs: ["#8a6a4a", "#d9c09a", "#4a3422"],
  accroche: "Pas de corne sur le nez : une énorme bosse d’os à la place !",
  comparaison: "aussi long qu’un minibus",
  cri: "HMMMRRR !",
  paragraphes: [
    "Au lieu d’une grande corne sur le nez, comme le Tricératops, Pachyrhinosaurus portait une grosse bosse d’os, plate et rugueuse. Sur le haut de sa collerette, deux petites cornes recourbées pointaient vers l’arrière.",
    "Il vivait en troupeaux. Au Canada, près de Grande Prairie, les paléontologues ont mis au jour plus de mille os de Pachyrhinosaurus au même endroit : des jeunes et des adultes, morts ensemble.",
    "Une espèce vivait en Alaska, tout près du pôle Nord : Pachyrhinosaurus perotorum. Là-bas, l’hiver était sombre et froid, avec de la neige.",
    "Les adultes se servaient sans doute de leur bosse pour se pousser tête contre tête, un peu comme les bœufs musqués d’aujourd’hui."
  ],
  superPouvoir: { titre: "Le nez blindé", texte: "Une bosse d’os massive sur le museau, pour pousser ses rivaux de toutes ses forces." },
  saviezVous: [
    "Chez les jeunes, la bosse était petite : elle grandissait avec l’âge.",
    "En Alaska, il croisait peut-être le petit tyrannosaure Nanuqsaurus : leurs os ont été trouvés au même endroit.",
    "Son nom veut dire « le lézard au nez épais »."
  ]
},
{
  slug: "edmontosaurus",
  nom: "Edmontosaurus",
  prononciation: "èd-mon-to-so-russ",
  sens: "« le lézard d’Edmonton »",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 73, ageFin: 66,
  famille: "hadrosaures",
  archetype: "hadrosaure",
  regime: "herbivore",
  longueur: 12, hauteur: 3.5, poids: 4000, vitesse: 30,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 1917, par: "Lawrence Lambe", lieu: "Alberta, Canada" },
  vraiDino: true,
  couleurs: ["#6f8a5a", "#c9d6a6", "#3a4a2c"],
  accroche: "Un bec de canard et des centaines de dents serrées comme des tuiles !",
  comparaison: "aussi long qu’un bus",
  cri: "HOOOONK !",
  paragraphes: [
    "Edmontosaurus était l’un des plus grands dinosaures à bec de canard : jusqu’à 12 mètres de long, autant qu’un bus.",
    "Dans sa bouche, des centaines de dents serrées les unes contre les autres formaient une râpe géante. Quand une dent s’usait, une nouvelle prenait sa place.",
    "On a retrouvé des Edmontosaurus « momifiés » : leur peau couverte de petites écailles s’est fossilisée avec les os. Un spécimen du Canada portait même une crête de chair sur la tête, comme celle d’un coq.",
    "Des os de dinosaures à bec de canard, que certains paléontologues rangent parmi les Edmontosaurus, ont été trouvés en Alaska, tout près du pôle Nord : ces herbivores y passaient des hivers sombres et enneigés."
  ],
  superPouvoir: { titre: "La râpe à plantes", texte: "Des centaines de dents empilées, toujours remplacées, pour mâcher les plantes les plus dures." },
  saviezVous: [
    "Il marchait le plus souvent à quatre pattes, mais pouvait se dresser sur ses pattes arrière.",
    "On a trouvé une queue d’Edmontosaurus portant une morsure de T-rex… guérie : il avait réussi à s’échapper !",
    "Son nom vient de la ville d’Edmonton, au Canada."
  ]
},
{
  slug: "nanuqsaurus",
  nom: "Nanuqsaurus",
  prononciation: "na-nouk-so-russ",
  sens: "« le lézard ours polaire »",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 70, ageFin: 68,
  famille: "theropodes",
  archetype: "theropode-grand",
  regime: "carnivore",
  longueur: 6, hauteur: 2, poids: 500, vitesse: 30,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 2014, par: "Anthony Fiorillo et Ronald Tykoski", lieu: "Alaska, États-Unis" },
  vraiDino: true,
  couleurs: ["#7d8a96", "#e1e6ea", "#3b444d"],
  accroche: "Un cousin du T-rex qui vivait tout près du pôle Nord !",
  comparaison: "aussi long qu’une grande voiture",
  cri: "GRRRAOU !",
  paragraphes: [
    "Nanuqsaurus appartient à la famille du T-rex, les tyrannosaures. Il a été découvert en Alaska, au bord de la rivière Colville, dans des roches vieilles d’environ 70 millions d’années.",
    "On ne connaît que quelques morceaux de son crâne. D’après eux, les paléontologues pensent qu’il était bien plus petit que le T-rex : environ 6 mètres de long, la moitié de son grand cousin.",
    "Pourquoi si petit ? Une idée : dans le Grand Nord, la nourriture manquait pendant les longs hivers sombres, et un énorme chasseur aurait eu du mal à se nourrir.",
    "Il partageait son territoire avec des herbivores comme Pachyrhinosaurus et des dinosaures à bec de canard."
  ],
  superPouvoir: { titre: "Le chasseur du froid", texte: "Un tyrannosaure qui vivait près du pôle Nord, où il faisait nuit pendant des mois en hiver." },
  saviezVous: [
    "« Nanuq » veut dire « ours polaire » en inupiaq, la langue d’un peuple de l’Alaska.",
    "Son fossile tient en trois morceaux de crâne : de quoi reconnaître un tyrannosaure, mais pas de quoi tout savoir de lui.",
    "Ses os ont été retrouvés dans les falaises qui bordent une rivière glacée d’Alaska."
  ]
},
{
  slug: "leaellynasaura",
  nom: "Leaellynasaura",
  prononciation: "lé-a-lin-a-so-ra",
  sens: "« le lézard de Leaellyn »",
  periode: "cretace",
  epoque: "Crétacé inférieur",
  ageDebut: 113, ageFin: 106,
  famille: "hadrosaures",
  archetype: "ornithopode-petit",
  regime: "herbivore",
  longueur: 1.5, hauteur: 0.5, poids: 10, vitesse: 30,
  lieux: ["Australie"],
  decouverte: { annee: 1989, par: "Tom Rich et Patricia Vickers-Rich", lieu: "Dinosaur Cove, Victoria, Australie" },
  vraiDino: true,
  couleurs: ["#9c7a52", "#e8d3b0", "#4d3a24"],
  accroche: "Un petit dinosaure qui vivait près du pôle Sud, dans la nuit de l’hiver !",
  comparaison: "à peu près aussi long qu’un enfant de 10 ans, queue comprise",
  cri: "PIIIP !",
  paragraphes: [
    "Il y a environ 110 millions d’années, l’Australie était encore collée à l’Antarctique, tout près du pôle Sud. Leaellynasaura vivait là : en hiver, le soleil pouvait ne pas se lever pendant des semaines.",
    "Son crâne montre de grandes orbites, et son cerveau de gros lobes optiques, la partie qui sert à voir : il voyait peut-être bien dans la pénombre.",
    "Il a été découvert à Dinosaur Cove, en Australie, par Tom Rich et Patricia Vickers-Rich. Ils lui ont donné le prénom de leur fille, Leaellyn.",
    "On lui a attribué des squelettes au petit corps et à la queue immense, avec plus de 70 vertèbres. Mais les paléontologues ne sont pas tous sûrs que ces squelettes soient bien les siens."
  ],
  superPouvoir: { titre: "Les yeux de la nuit", texte: "De grands yeux qui l’aidaient sans doute à se repérer pendant les longues nuits de l’hiver polaire." },
  saviezVous: [
    "Il marchait sur ses deux pattes arrière et mangeait des plantes.",
    "À son époque, il faisait bien plus doux qu’aujourd’hui près du pôle Sud, mais l’hiver restait long et sombre.",
    "Depuis, l’Australie s’est détachée de l’Antarctique et a lentement glissé vers le nord."
  ]
},
];
