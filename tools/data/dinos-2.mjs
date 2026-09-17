// Jurassique — les géants et les blindés.
export const dinos = [
{
  slug: "stegosaurus",
  nom: "Stegosaurus",
  prononciation: "sté-go-so-russ",
  sens: "« le lézard à toit »",
  periode: "jurassique",
  epoque: "Jurassique supérieur",
  ageDebut: 155, ageFin: 145,
  famille: "thyreophores",
  archetype: "stegosaure",
  regime: "herbivore",
  longueur: 9, hauteur: 4, poids: 5000, vitesse: 7,
  lieux: ["Amérique du Nord", "Europe"],
  decouverte: { annee: 1877, par: "Othniel Charles Marsh", lieu: "Colorado, États-Unis" },
  vraiDino: true,
  couleurs: ["#4f8f7a", "#9fd9c4", "#2a5347"],
  accroche: "Des plaques sur le dos et quatre pointes au bout de la queue !",
  comparaison: "aussi long qu’un bus, avec une tête minuscule",
  cri: "Bouuuuum !",
  paragraphes: [
    "Stegosaurus portait sur le dos deux rangées de grandes plaques osseuses, en quinconce comme les tuiles d’un toit. Elles étaient parcourues de vaisseaux sanguins : elles servaient sûrement à se réchauffer au soleil, à se refroidir, et à impressionner.",
    "Au bout de sa queue se dressaient quatre longues pointes. Les paléontologues les ont surnommées le « thagomizer ». D’un coup de queue, il pouvait percer le flanc d’un Allosaurus !",
    "Sa tête était minuscule par rapport à son corps, et son cerveau était à peine plus gros qu’une prune. Pourtant, il a vécu très longtemps sur Terre : pas besoin d’être savant pour brouter des fougères."
  ],
  superPouvoir: { titre: "Le thagomizer", texte: "Quatre pointes d’un demi-mètre au bout d’une queue puissante : l’arme défensive la plus célèbre du Jurassique." },
  saviezVous: [
    "Le mot « thagomizer » vient d’une bande dessinée humoristique… et les scientifiques l’ont vraiment adopté !",
    "Ses plaques pouvaient peut-être changer de couleur quand il s’énervait, en se remplissant de sang.",
    "Son cerveau pesait environ 80 grammes, pour un corps de 5 tonnes."
  ]
},
{
  slug: "kentrosaurus",
  nom: "Kentrosaurus",
  prononciation: "ken-tro-so-russ",
  sens: "« le lézard à pointes »",
  periode: "jurassique",
  epoque: "Jurassique supérieur",
  ageDebut: 154, ageFin: 151,
  famille: "thyreophores",
  archetype: "stegosaure-pointes",
  regime: "herbivore",
  longueur: 4.5, hauteur: 1.5, poids: 1000, vitesse: 8,
  lieux: ["Afrique"],
  decouverte: { annee: 1909, par: "Edwin Hennig", lieu: "Tendaguru, Tanzanie" },
  vraiDino: true,
  couleurs: ["#c87f3e", "#f3c188", "#6b3f17"],
  accroche: "Le cousin africain du Stégosaure, hérissé de piques de la tête à la queue.",
  comparaison: "aussi long qu’une petite voiture",
  cri: "Tchak-tchak !",
  paragraphes: [
    "Kentrosaurus est un cousin plus petit du Stegosaurus. Sur l’avant du dos, il portait des plaques ; sur l’arrière et la queue, de longues pointes acérées.",
    "Une pointe supplémentaire dépassait de chaque épaule (ou peut-être de la hanche). Un prédateur devait réfléchir à deux fois avant de s’approcher !",
    "Ses fossiles viennent de Tanzanie, en Afrique de l’Est, d’un site extraordinaire appelé Tendaguru où l’on a déterré des centaines de tonnes d’os."
  ],
  superPouvoir: { titre: "Queue-fouet", texte: "Il pouvait balayer sa queue hérissée sur presque un demi-cercle autour de lui." },
  saviezVous: [
    "Beaucoup de ses os ont été détruits pendant la Seconde Guerre mondiale, à Berlin.",
    "Il pesait 5 fois moins qu’un Stégosaure.",
    "Son nom grec « kentron » signifie « aiguillon »."
  ]
},
{
  slug: "diplodocus",
  nom: "Diplodocus",
  prononciation: "di-plo-do-kuss",
  sens: "« la double poutre »",
  periode: "jurassique",
  epoque: "Jurassique supérieur",
  ageDebut: 154, ageFin: 148,
  famille: "sauropodes",
  archetype: "sauropode",
  regime: "herbivore",
  longueur: 26, hauteur: 5, poids: 15000, vitesse: 10,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 1878, par: "Samuel Wendell Williston", lieu: "Colorado, États-Unis" },
  vraiDino: true,
  couleurs: ["#6b8fc4", "#b9d3f0", "#33507a"],
  accroche: "Un cou immense devant, un fouet géant derrière : 26 mètres de long !",
  comparaison: "aussi long que deux bus mis bout à bout",
  cri: "Vrooooom !",
  paragraphes: [
    "Diplodocus est l’un des plus longs animaux ayant jamais marché sur Terre. Son cou mesurait 8 mètres et sa queue encore plus !",
    "Il tenait son cou à l’horizontale et balayait le sol de gauche à droite pour brouter, comme un aspirateur végétal. Ses dents en forme de crayons servaient à peigner les feuilles des branches.",
    "Sa queue très fine à l’extrémité claquait peut-être dans l’air comme un fouet, avec un bruit de tonnerre pour effrayer les prédateurs."
  ],
  superPouvoir: { titre: "Le fouet supersonique", texte: "Certains scientifiques pensent que le bout de sa queue pouvait dépasser la vitesse du son et faire « CLAC ! »" },
  saviezVous: [
    "Un moulage de son squelette, surnommé « Dippy », a été offert à des musées du monde entier.",
    "Il ne mâchait pas : il avalait tout rond et laissait son estomac faire le travail.",
    "Ses narines étaient placées très haut sur le crâne, entre les yeux."
  ]
},
{
  slug: "apatosaurus",
  nom: "Apatosaurus",
  prononciation: "a-pa-to-so-russ",
  sens: "« le lézard trompeur »",
  periode: "jurassique",
  epoque: "Jurassique supérieur",
  ageDebut: 152, ageFin: 151,
  famille: "sauropodes",
  archetype: "sauropode",
  regime: "herbivore",
  longueur: 22, hauteur: 6, poids: 25000, vitesse: 12,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 1877, par: "Othniel Charles Marsh", lieu: "Colorado, États-Unis" },
  vraiDino: true,
  couleurs: ["#87694f", "#c8a887", "#4b3628"],
  accroche: "Le colosse au cou épais, longtemps appelé « Brontosaure ».",
  comparaison: "aussi lourd que 5 éléphants",
  cri: "Bwoooonk !",
  paragraphes: [
    "Apatosaurus était plus trapu et plus lourd que son cousin Diplodocus. Son cou, très épais, était renforcé par de gros os en forme de V sous les vertèbres.",
    "Pendant très longtemps, on l’a appelé « Brontosaure », le « lézard du tonnerre ». Les deux noms ont beaucoup fait débat entre scientifiques ; aujourd’hui, on considère à nouveau que Brontosaurus existe bel et bien, mais comme un animal voisin.",
    "Ses pattes ressemblaient à des colonnes d’éléphant. Chaque pas faisait probablement trembler le sol."
  ],
  superPouvoir: { titre: "Cou blindé", texte: "Son cou massif pouvait servir de massue pour se battre entre mâles." },
  saviezVous: [
    "Il devait manger plusieurs centaines de kilos de plantes chaque jour.",
    "Ses os contenaient des cavités remplies d’air, comme ceux des oiseaux, pour alléger son squelette.",
    "Son nom signifie « trompeur » parce que ses os ressemblaient à ceux d’un animal marin."
  ]
},
{
  slug: "brachiosaurus",
  nom: "Brachiosaurus",
  prononciation: "bra-ki-o-so-russ",
  sens: "« le lézard à bras »",
  periode: "jurassique",
  epoque: "Jurassique supérieur",
  ageDebut: 154, ageFin: 150,
  famille: "sauropodes",
  archetype: "sauropode-girafe",
  regime: "herbivore",
  longueur: 22, hauteur: 13, poids: 40000, vitesse: 12,
  lieux: ["Amérique du Nord", "Afrique"],
  decouverte: { annee: 1903, par: "Elmer Riggs", lieu: "Colorado, États-Unis" },
  vraiDino: true,
  couleurs: ["#9b8bc4", "#d6cdf2", "#54497a"],
  accroche: "La girafe des dinosaures : sa tête montait à 13 mètres de haut !",
  comparaison: "aussi haut qu’un immeuble de 4 étages",
  cri: "Hooooooonk !",
  paragraphes: [
    "Contrairement à la plupart des sauropodes, Brachiosaurus avait les pattes avant plus longues que les pattes arrière. Son corps montait donc en pente vers l’avant, et son cou se dressait presque à la verticale.",
    "Il pouvait ainsi brouter la cime des arbres, là où aucun autre herbivore ne pouvait atteindre. Pas besoin de se disputer le repas !",
    "Son cœur devait être énorme pour pomper le sang jusqu’à sa tête, à 13 mètres au-dessus du sol."
  ],
  superPouvoir: { titre: "Le mangeur de nuages", texte: "Il atteignait des feuilles situées à 13 mètres de haut : aucun concurrent à cette altitude." },
  saviezVous: [
    "Une seule de ses vertèbres pouvait mesurer plus d’un mètre.",
    "Un squelette monté à Berlin (de son cousin Giraffatitan) est le plus grand du monde exposé dans un musée.",
    "On pense qu’il tenait la tête haute en permanence, comme une girafe."
  ]
},
{
  slug: "compsognathus",
  nom: "Compsognathus",
  prononciation: "komp-so-gna-tuss",
  sens: "« la mâchoire élégante »",
  periode: "jurassique",
  epoque: "Jurassique supérieur",
  ageDebut: 150, ageFin: 145,
  famille: "theropodes",
  archetype: "theropode-petit",
  regime: "carnivore",
  longueur: 1, hauteur: 0.3, poids: 3, vitesse: 40,
  lieux: ["Europe"],
  decouverte: { annee: 1859, par: "Joseph Oberndorfer", lieu: "Bavière, Allemagne" },
  vraiDino: true,
  couleurs: ["#d9a23c", "#f7dd9e", "#7a5615"],
  accroche: "Grand comme une poule, mais rapide comme l’éclair !",
  comparaison: "aussi grand qu’une poule",
  cri: "Pip-pip-pip !",
  paragraphes: [
    "Compsognathus fait partie des plus petits dinosaures connus. Il mesurait 1 mètre de long, mais la moitié était de la queue !",
    "Dans l’estomac d’un fossile, on a retrouvé le squelette entier d’un petit lézard rapide. Il l’avait avalé tout rond juste avant de mourir : voilà son dernier repas conservé 150 millions d’années.",
    "Il vivait sur des îles tropicales à l’emplacement de l’Allemagne et de la France actuelles."
  ],
  superPouvoir: { titre: "Vitesse de poche", texte: "Ses pattes très fines lui permettaient de courir après les lézards les plus rapides." },
  saviezVous: [
    "Un fossile a été trouvé en France, près de Canjuers dans le Var.",
    "Il pesait à peine 3 kilos, comme un petit chat.",
    "Pendant longtemps, c’était le plus petit dinosaure connu."
  ]
},
{
  slug: "archaeopteryx",
  nom: "Archaeopteryx",
  prononciation: "ar-ké-op-té-rix",
  sens: "« l’aile ancienne »",
  periode: "jurassique",
  epoque: "Jurassique supérieur",
  ageDebut: 150, ageFin: 148,
  famille: "theropodes",
  archetype: "oiseau-primitif",
  regime: "carnivore",
  longueur: 0.5, hauteur: 0.25, poids: 1, vitesse: 25,
  lieux: ["Europe"],
  decouverte: { annee: 1861, par: "Christian Erich Hermann von Meyer", lieu: "Solnhofen, Allemagne" },
  vraiDino: true,
  couleurs: ["#2f7f96", "#8ad4e3", "#194754"],
  accroche: "Le chaînon entre les dinosaures et les oiseaux : il avait des plumes ET des dents !",
  comparaison: "aussi grand qu’un corbeau",
  cri: "Kraaa !",
  paragraphes: [
    "Archaeopteryx est l’un des fossiles les plus célèbres du monde. Il possède des plumes et des ailes comme un oiseau, mais aussi des dents, des griffes au bout des ailes et une longue queue osseuse comme un dinosaure.",
    "Il a prouvé aux scientifiques que les oiseaux descendent bien des dinosaures. Autrement dit : la mésange de ton jardin est une cousine du T-rex !",
    "Il volait sûrement mal, par petits bonds planés d’arbre en arbre, plutôt que sur de longues distances."
  ],
  superPouvoir: { titre: "Moitié dino, moitié oiseau", texte: "Il montre en un seul squelette comment les dinosaures se sont transformés en oiseaux." },
  saviezVous: [
    "Ses plumes sont si bien conservées qu’on distingue chaque barbule dans la pierre.",
    "Une analyse chimique suggère que ses plumes étaient noires.",
    "Il n’existe qu’une douzaine de spécimens dans le monde entier."
  ]
},
{
  slug: "pterodactylus",
  nom: "Pterodactylus",
  prononciation: "pté-ro-dak-ti-luss",
  sens: "« le doigt ailé »",
  periode: "jurassique",
  epoque: "Jurassique supérieur",
  ageDebut: 151, ageFin: 148,
  famille: "pterosaures",
  archetype: "pterosaure",
  regime: "carnivore",
  longueur: 1, hauteur: 0.4, poids: 2, vitesse: 45,
  lieux: ["Europe"],
  decouverte: { annee: 1784, par: "Cosimo Alessandro Collini", lieu: "Bavière, Allemagne" },
  vraiDino: false,
  couleurs: ["#e08a3c", "#fbd39a", "#7d4413"],
  accroche: "Un reptile volant… mais surtout : ce n’est PAS un dinosaure !",
  comparaison: "aussi large qu’une grande mouette",
  cri: "Kriii-kriii !",
  paragraphes: [
    "Pterodactylus volait grâce à une membrane de peau tendue entre son corps et un doigt démesurément long : son quatrième doigt. C’est de là que vient son nom, « le doigt ailé ».",
    "Attention, piège classique ! Les ptérosaures ne sont pas des dinosaures. Ce sont des cousins qui ont évolué séparément. Un dinosaure ne vole pas… sauf les oiseaux, qui sont de vrais dinosaures.",
    "Il pêchait de petits poissons et des insectes au-dessus des lagons peu profonds de l’Europe jurassique."
  ],
  superPouvoir: { titre: "Le premier vol", texte: "Les ptérosaures ont été les premiers vertébrés de l’histoire à voler vraiment, bien avant les oiseaux." },
  saviezVous: [
    "C’est le tout premier ptérosaure jamais décrit par la science, en 1784.",
    "Ses os étaient creux et fins comme du papier pour l’alléger.",
    "Certains ptérosaures marchaient à quatre pattes, en repliant leurs ailes."
  ]
},
{
  slug: "ichthyosaurus",
  nom: "Ichthyosaurus",
  prononciation: "ik-ti-o-so-russ",
  sens: "« le lézard-poisson »",
  periode: "jurassique",
  epoque: "Jurassique inférieur",
  ageDebut: 199, ageFin: 190,
  famille: "reptiles-marins",
  archetype: "reptile-marin",
  regime: "carnivore",
  longueur: 3, hauteur: 0.8, poids: 200, vitesse: 40,
  lieux: ["Europe"],
  decouverte: { annee: 1811, par: "Mary Anning", lieu: "Lyme Regis, Angleterre" },
  vraiDino: false,
  couleurs: ["#2e8aa8", "#93dcee", "#164c5e"],
  accroche: "Un reptile marin en forme de dauphin — et pas un dinosaure non plus !",
  comparaison: "aussi long qu’un dauphin",
  cri: "Blouuub !",
  paragraphes: [
    "Ichthyosaurus ressemblait beaucoup à un dauphin, avec un museau pointu, une nageoire dorsale et une queue en croissant. Pourtant, ce n’est ni un poisson ni un mammifère : c’est un reptile qui est retourné vivre dans la mer.",
    "Ses yeux étaient énormes, parfaits pour repérer les calmars dans les eaux sombres. Il plongeait profond et nageait très vite.",
    "Il ne pondait pas d’œufs : il donnait naissance à des bébés vivants, directement dans l’eau. On a même retrouvé des fossiles de femelles en train d’accoucher !"
  ],
  superPouvoir: { titre: "Les yeux géants", texte: "Certains ichthyosaures avaient les plus grands yeux de tout le règne animal : jusqu’à 25 cm de diamètre." },
  saviezVous: [
    "Mary Anning, une jeune fille anglaise de 12 ans, a découvert le premier crâne complet en 1811.",
    "Il devait remonter respirer à la surface, comme une baleine.",
    "Ses bébés naissaient la queue en premier pour ne pas se noyer."
  ]
}
];
