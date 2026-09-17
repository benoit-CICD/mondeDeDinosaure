// Crétacé — herbivores, blindés et cousins marins ou volants.
export const dinos = [
{
  slug: "ankylosaurus",
  nom: "Ankylosaurus",
  prononciation: "an-ki-lo-so-russ",
  sens: "« le lézard soudé »",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 68, ageFin: 66,
  famille: "thyreophores",
  archetype: "ankylosaure",
  regime: "herbivore",
  longueur: 8, hauteur: 1.7, poids: 6000, vitesse: 10,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 1908, par: "Barnum Brown", lieu: "Montana, États-Unis" },
  vraiDino: true,
  vedette: true,
  couleurs: ["#7d8f3f", "#c8dc8c", "#42501c"],
  accroche: "Un char d’assaut vivant, avec une massue au bout de la queue.",
  comparaison: "aussi large qu’une voiture, mais bien plus lourd",
  cri: "BONK !",
  paragraphes: [
    "Ankylosaurus était entièrement recouvert de plaques osseuses soudées à sa peau, avec des pointes sur les flancs. Même ses paupières étaient blindées !",
    "Au bout de sa queue, une énorme massue d’os pesait plusieurs dizaines de kilos. D’un coup, il pouvait briser la cheville d’un T-rex — et un prédateur à la patte cassée est un prédateur condamné.",
    "Son ventre, lui, n’était pas protégé. Mais avec son corps large et bas posé sur quatre pattes trapues, impossible de le retourner.",
    "Il broutait les plantes basses avec son bec large, un peu comme une tondeuse à gazon préhistorique."
  ],
  superPouvoir: { titre: "La massue de queue", texte: "Une boule d’os qui pouvait frapper avec assez de force pour casser un os de prédateur." },
  saviezVous: [
    "Sa massue était faite de vertèbres soudées entre elles, d’où son nom « lézard soudé ».",
    "Ses côtes étaient fusionnées à son armure : un vrai exosquelette.",
    "Son gros intestin fermentait les plantes… il devait produire beaucoup de gaz !"
  ]
},
{
  slug: "parasaurolophus",
  nom: "Parasaurolophus",
  prononciation: "pa-ra-so-ro-lo-fuss",
  sens: "« près du lézard à crête »",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 76, ageFin: 73,
  famille: "hadrosaures",
  archetype: "hadrosaure-crete",
  regime: "herbivore",
  longueur: 10, hauteur: 5, poids: 3500, vitesse: 25,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 1922, par: "William Parks", lieu: "Alberta, Canada" },
  vraiDino: true,
  vedette: true,
  couleurs: ["#e08a2f", "#fbcb8f", "#7b4310"],
  accroche: "Le trombone des dinosaures : sa crête servait de trompette !",
  comparaison: "aussi long qu’un autocar",
  cri: "TOUUUUUUT !",
  paragraphes: [
    "La longue crête creuse de Parasaurolophus mesurait jusqu’à 1,80 mètre. À l’intérieur, ses narines formaient de longs tubes repliés, exactement comme dans un trombone.",
    "En soufflant, il produisait un son grave qui portait très loin dans la forêt. Des scientifiques ont reconstruit la crête en 3D et joué le son : on dirait une corne de brume !",
    "Chaque espèce avait une crête différente : c’était sa signature sonore et visuelle, pour se reconnaître de loin dans le troupeau.",
    "Il pouvait marcher à quatre pattes pour brouter, puis se redresser sur deux pattes pour courir ou surveiller les alentours."
  ],
  superPouvoir: { titre: "La trompette naturelle", texte: "Un instrument de musique intégré au crâne, capable d’émettre un appel audible à des kilomètres." },
  saviezVous: [
    "On a pu recréer son cri grâce à des scanners médicaux de sa crête.",
    "Il possédait plus de 500 dents empilées dans sa bouche.",
    "Les jeunes avaient une toute petite crête qui grandissait avec l’âge."
  ]
},
{
  slug: "iguanodon",
  nom: "Iguanodon",
  prononciation: "i-gwa-no-don",
  sens: "« la dent d’iguane »",
  periode: "cretace",
  epoque: "Crétacé inférieur",
  ageDebut: 126, ageFin: 122,
  famille: "hadrosaures",
  archetype: "hadrosaure",
  regime: "herbivore",
  longueur: 10, hauteur: 4, poids: 3500, vitesse: 24,
  lieux: ["Europe"],
  decouverte: { annee: 1822, par: "Mary Ann et Gideon Mantell", lieu: "Sussex, Angleterre" },
  vraiDino: true,
  couleurs: ["#4f9e8a", "#a5e0d0", "#2a5b4f"],
  accroche: "L’un des tout premiers dinosaures découverts… avec un pouce en forme de poignard.",
  comparaison: "aussi long qu’un autocar",
  cri: "Hoooounk !",
  paragraphes: [
    "Iguanodon est le deuxième dinosaure jamais nommé par la science, en 1825. À l’époque, on ne savait pas du tout à quoi ressemblait un dinosaure : les premiers savants l’ont dessiné comme un gros lézard à quatre pattes, avec sa griffe du pouce plantée… sur le nez !",
    "On sait aujourd’hui que ce pic osseux était en fait son pouce. Il s’en servait pour se défendre ou pour ouvrir des fruits durs.",
    "En 1878, des mineurs belges ont découvert par hasard 38 squelettes complets dans une mine de charbon à Bernissart. C’est l’une des plus belles découvertes de l’histoire de la paléontologie.",
    "Il marchait à quatre pattes en broutant, et se redressait sur deux pattes pour aller plus vite."
  ],
  superPouvoir: { titre: "Le pouce-poignard", texte: "Une pointe osseuse conique à la place du pouce, comme un poignard intégré à la main." },
  saviezVous: [
    "Ses dents ressemblaient à celles d’un iguane vivant : d’où son nom.",
    "Les 38 squelettes de Bernissart sont exposés à Bruxelles.",
    "Son cinquième doigt était préhensile, capable d’attraper des branches."
  ]
},
{
  slug: "pachycephalosaurus",
  nom: "Pachycephalosaurus",
  prononciation: "pa-ki-sé-fa-lo-so-russ",
  sens: "« le lézard à tête épaisse »",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 70, ageFin: 66,
  famille: "pachycephalosaures",
  archetype: "pachycephalosaure",
  regime: "herbivore",
  longueur: 4.5, hauteur: 1.8, poids: 450, vitesse: 30,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 1943, par: "Barnum Brown et Erich Schlaikjer", lieu: "Montana, États-Unis" },
  vraiDino: true,
  couleurs: ["#b07a3c", "#efc68e", "#5e3c14"],
  accroche: "Un casque en os de 25 cm d’épaisseur sur le crâne !",
  comparaison: "aussi long qu’une petite voiture",
  cri: "TOC ! TOC !",
  paragraphes: [
    "Le dôme osseux qui couronne la tête de Pachycephalosaurus mesure jusqu’à 25 centimètres d’épaisseur. C’est comme porter un casque de moto en os massif.",
    "Longtemps, on a imaginé qu’ils se percutaient la tête à pleine vitesse, comme les mouflons. Aujourd’hui on pense plutôt qu’ils se cognaient les flancs, ou se poussaient tête contre tête.",
    "Des dômes fossilisés portent de véritables traces de blessures guéries : ces coups de tête existaient bel et bien !",
    "Autour du dôme, une couronne de petites pointes osseuses complétait sa parure."
  ],
  superPouvoir: { titre: "Le casque intégral", texte: "25 cm d’os plein au sommet du crâne, pour encaisser des chocs qui assommeraient n’importe quel animal." },
  saviezVous: [
    "Les jeunes avaient une tête plate qui bombait en grandissant.",
    "Son nom est l’un des plus longs et des plus difficiles à prononcer du monde des dinosaures.",
    "Il courait vite sur ses deux pattes arrière."
  ]
},
{
  slug: "styracosaurus",
  nom: "Styracosaurus",
  prononciation: "sti-ra-ko-so-russ",
  sens: "« le lézard à pointes »",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 75, ageFin: 74,
  famille: "ceratopsiens",
  archetype: "ceratopsien-couronne",
  regime: "herbivore",
  longueur: 5.5, hauteur: 2, poids: 2700, vitesse: 25,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 1913, par: "Lawrence Lambe", lieu: "Alberta, Canada" },
  vraiDino: true,
  couleurs: ["#d4693c", "#f8b58c", "#722c14"],
  accroche: "Une couronne de six grandes pointes autour de la tête : un vrai soleil vivant.",
  comparaison: "aussi long qu’un grand van",
  cri: "Bwaaaa !",
  paragraphes: [
    "Styracosaurus portait une corne nasale de 60 centimètres et six longues pointes rayonnant autour de sa collerette, comme les rayons d’un soleil.",
    "Ces pointes étaient impressionnantes mais assez fragiles : elles servaient surtout à en imposer et à séduire, un peu comme la queue du paon.",
    "On a retrouvé des dizaines d’individus ensemble, morts lors d’une inondation : la preuve qu’ils vivaient en grands troupeaux."
  ],
  superPouvoir: { titre: "La couronne d’épines", texte: "Six pointes dressées qui doublaient la silhouette de sa tête pour effrayer les prédateurs." },
  saviezVous: [
    "Chaque individu avait une disposition de pointes légèrement différente.",
    "Il est très proche cousin du Triceratops.",
    "Son bec pouvait couper des branches aussi dures qu’un sécateur."
  ]
},
{
  slug: "therizinosaurus",
  nom: "Therizinosaurus",
  prononciation: "té-ri-zi-no-so-russ",
  sens: "« le lézard faucheur »",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 70, ageFin: 68,
  famille: "theropodes",
  archetype: "therizinosaure",
  regime: "herbivore",
  longueur: 10, hauteur: 5, poids: 5000, vitesse: 15,
  lieux: ["Asie"],
  decouverte: { annee: 1954, par: "Evgeny Maleev", lieu: "Désert de Gobi, Mongolie" },
  vraiDino: true,
  couleurs: ["#9e8f3f", "#e0d48c", "#544a17" ],
  accroche: "Les plus longues griffes de toute l’histoire : un mètre de long !",
  comparaison: "aussi haut qu’une girafe",
  cri: "Shhhink !",
  paragraphes: [
    "Therizinosaurus possède les plus longues griffes connues de tout le règne animal : jusqu’à 1 mètre, aussi longues qu’une épée de chevalier.",
    "Surprise : malgré ces armes terrifiantes, c’était un herbivore ! Il s’en servait pour attraper les branches et les rabattre vers sa bouche, comme un paresseux géant.",
    "Il appartient pourtant au groupe des théropodes, la famille des carnivores comme le T-rex. Certains de ses membres sont devenus végétariens au fil de l’évolution.",
    "Avec son gros ventre, son long cou, son petit bec et son duvet de plumes, il ressemblait à une immense autruche poilue."
  ],
  superPouvoir: { titre: "Les griffes-faux", texte: "Trois griffes d’un mètre à chaque main : rien d’équivalent chez aucun animal, passé ou présent." },
  saviezVous: [
    "Pendant 20 ans, on n’a connu que ses griffes : on croyait qu’il s’agissait d’une tortue géante !",
    "Il était couvert de plumes duveteuses.",
    "Il mangeait des feuilles, malgré des allures de monstre de film."
  ]
},
{
  slug: "gallimimus",
  nom: "Gallimimus",
  prononciation: "ga-li-mi-muss",
  sens: "« l’imitateur de poule »",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 70, ageFin: 68,
  famille: "theropodes",
  archetype: "theropode-autruche",
  regime: "omnivore",
  longueur: 6, hauteur: 1.9, poids: 440, vitesse: 55,
  lieux: ["Asie"],
  decouverte: { annee: 1972, par: "Rinchen Barsbold", lieu: "Désert de Gobi, Mongolie" },
  vraiDino: true,
  couleurs: ["#c4a05c", "#f2dcae", "#6b5326"],
  accroche: "L’autruche préhistorique : le sprinteur du monde des dinosaures.",
  comparaison: "aussi long qu’une grande voiture",
  cri: "Kot-kot-kot !",
  paragraphes: [
    "Gallimimus ressemblait beaucoup à une autruche géante : long cou, petit crâne, bec sans dents et pattes immenses.",
    "Il comptait parmi les dinosaures les plus rapides, capable d’atteindre 55 km/h. Sa seule défense était la fuite !",
    "Son bec possédait de petites lamelles, un peu comme un filtre. Il attrapait peut-être de minuscules animaux dans l’eau et la boue, comme le font les canards."
  ],
  superPouvoir: { titre: "Le champion de course", texte: "Jusqu’à 55 km/h : plus rapide qu’un cheval et que la plupart des prédateurs de son époque." },
  saviezVous: [
    "Son nom veut dire « imitateur de poule ».",
    "C’est lui qu’on voit courir en troupeau dans la scène célèbre de Jurassic Park.",
    "Ses yeux étaient placés sur les côtés de la tête pour surveiller tout autour."
  ]
},
{
  slug: "argentinosaurus",
  nom: "Argentinosaurus",
  prononciation: "ar-jen-ti-no-so-russ",
  sens: "« le lézard d’Argentine »",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 96, ageFin: 92,
  famille: "sauropodes",
  archetype: "sauropode",
  regime: "herbivore",
  longueur: 35, hauteur: 10, poids: 70000, vitesse: 8,
  lieux: ["Amérique du Sud"],
  decouverte: { annee: 1987, par: "Guillermo Heredia", lieu: "Neuquén, Argentine" },
  vraiDino: true,
  vedette: true,
  couleurs: ["#5f9e7a", "#aee0c4", "#2f5745"],
  accroche: "Le plus grand animal terrestre de tous les temps : 35 mètres et 70 tonnes !",
  comparaison: "aussi long qu’un terrain de basket",
  cri: "VRRRRRROOOM !",
  paragraphes: [
    "Argentinosaurus est le plus grand animal ayant jamais marché sur la Terre ferme. Il mesurait environ 35 mètres de long et pesait autant que 14 éléphants.",
    "Une seule de ses vertèbres atteint 1,60 mètre de hauteur : plus grand que la plupart des adultes humains ! Son tibia mesurait 1,55 mètre.",
    "Il grandissait à une vitesse incroyable. Un bébé sortait d’un œuf de la taille d’un ballon de foot et devenait un géant de 70 tonnes en quelques dizaines d’années.",
    "Pour se nourrir, il devait avaler des centaines de kilos de plantes chaque jour, sans jamais mâcher."
  ],
  superPouvoir: { titre: "Le record absolu", texte: "Aucun animal terrestre connu n’a jamais dépassé sa masse : environ 70 tonnes." },
  saviezVous: [
    "Un fermier argentin a cru trouver un tronc d’arbre pétrifié : c’était en réalité son tibia !",
    "Son cœur devait peser plus de 300 kilos.",
    "Il pondait des œufs à peine plus gros qu’un ballon, malgré sa taille adulte gigantesque."
  ]
},
{
  slug: "quetzalcoatlus",
  nom: "Quetzalcoatlus",
  prononciation: "ket-zal-ko-at-luss",
  sens: "« le serpent à plumes », d’après un dieu aztèque",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 68, ageFin: 66,
  famille: "pterosaures",
  archetype: "pterosaure-geant",
  regime: "carnivore",
  longueur: 11, hauteur: 5, poids: 250, vitesse: 90,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 1971, par: "Douglas Lawson", lieu: "Texas, États-Unis" },
  vraiDino: false,
  couleurs: ["#c85f6f", "#f5a8b4", "#6b2530"],
  accroche: "Une envergure de 11 mètres : le plus grand animal volant de tous les temps. (Pas un dinosaure !)",
  comparaison: "aussi large qu’un petit avion",
  cri: "Kraaaa-ouu !",
  paragraphes: [
    "Quetzalcoatlus est le plus grand animal volant ayant jamais existé. Ses ailes déployées mesuraient 11 mètres d’un bout à l’autre, comme un petit avion.",
    "Debout au sol, il atteignait la hauteur d’une girafe. Il marchait à quatre pattes en repliant ses ailes, et chassait à pied des petits animaux, un peu comme une cigogne géante.",
    "Pour décoller, il se propulsait d’un coup avec ses quatre membres, comme un sauteur à la perche, puis déployait ses ailes.",
    "Ce n’est pas un dinosaure mais un ptérosaure : un cousin des dinosaures, pas un membre de la famille."
  ],
  superPouvoir: { titre: "Le géant du ciel", texte: "11 mètres d’envergure pour seulement 250 kilos : un planeur vivant hors norme." },
  saviezVous: [
    "Il porte le nom de Quetzalcóatl, le dieu-serpent à plumes des Aztèques.",
    "Il pouvait planer des centaines de kilomètres sans battre des ailes.",
    "Son cou à lui seul mesurait près de 3 mètres."
  ]
},
{
  slug: "mosasaurus",
  nom: "Mosasaurus",
  prononciation: "mo-za-so-russ",
  sens: "« le lézard de la Meuse »",
  periode: "cretace",
  epoque: "Crétacé supérieur",
  ageDebut: 70, ageFin: 66,
  famille: "reptiles-marins",
  archetype: "reptile-marin",
  regime: "carnivore",
  longueur: 17, hauteur: 2.5, poids: 14000, vitesse: 48,
  lieux: ["Europe", "Amérique du Nord"],
  decouverte: { annee: 1764, par: "Carrier de Maastricht", lieu: "Maastricht, Pays-Bas" },
  vraiDino: false,
  couleurs: ["#2f6f8f", "#8fc9e0", "#164252"],
  accroche: "Le monstre des mers du Crétacé. (Et non, ce n’est pas un dinosaure !)",
  comparaison: "aussi long qu’un autobus et demi",
  cri: "SPLAAASH !",
  paragraphes: [
    "Mosasaurus régnait sur les océans à la toute fin du Crétacé. Long de 17 mètres, il dévorait poissons, tortues, ammonites et même d’autres mosasaures.",
    "Ce n’est pas un dinosaure : c’est un lézard marin géant, cousin des varans et des serpents actuels. Sa langue était sûrement fourchue !",
    "Il avait une double rangée de dents au palais pour empêcher ses proies de s’échapper, et ses quatre pattes s’étaient transformées en nageoires.",
    "Son crâne, trouvé en 1764 dans une carrière près de Maastricht, est l’un des premiers grands fossiles à avoir fait comprendre aux humains que des espèces pouvaient disparaître."
  ],
  superPouvoir: { titre: "Le palais denté", texte: "Une seconde rangée de dents sur le palais : une proie attrapée ne repartait jamais." },
  saviezVous: [
    "Son crâne a été volé pendant la Révolution française et emmené à Paris !",
    "Il donnait naissance à des petits vivants, en pleine mer.",
    "Il est le cousin lointain du varan de Komodo."
  ]
}
];
