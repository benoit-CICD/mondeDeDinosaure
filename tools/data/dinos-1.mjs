// Base de données des créatures préhistoriques du site « Le Monde des Dinosaures ».
// Textes rédigés pour un lectorat de 7 à 12 ans : phrases courtes, vocabulaire simple,
// une idée par phrase. Les chiffres sont des estimations scientifiques arrondies.

export const dinos = [

/* ============================== TRIAS ============================== */
{
  slug: "eoraptor",
  nom: "Eoraptor",
  prononciation: "é-o-rap-tor",
  sens: "« le voleur de l’aube »",
  periode: "trias",
  epoque: "Trias supérieur",
  ageDebut: 231, ageFin: 228,
  famille: "theropodes",
  archetype: "theropode-petit",
  regime: "omnivore",
  longueur: 1, hauteur: 0.4, poids: 10, vitesse: 30,
  lieux: ["Amérique du Sud"],
  decouverte: { annee: 1991, par: "Ricardo Martínez", lieu: "Vallée de la Lune, Argentine" },
  vraiDino: true,
  couleurs: ["#c86b3c", "#f2b872", "#6b3a1f"],
  accroche: "L’un des tout premiers dinosaures de l’histoire de la Terre !",
  comparaison: "aussi grand qu’un gros chat",
  cri: "Kikiii !",
  paragraphes: [
    "Eoraptor vivait il y a environ 230 millions d’années, tout au début de l’histoire des dinosaures. À cette époque, les dinosaures étaient encore petits et rares : ils ne dominaient pas du tout la planète.",
    "Il marchait sur ses deux pattes arrière et se servait de ses petites mains pour attraper sa nourriture. Léger comme une plume, il pouvait détaler très vite pour échapper aux grands reptiles qui régnaient alors.",
    "Ses dents racontent un secret : à l’avant elles sont plates comme celles des mangeurs de plantes, et à l’arrière pointues comme celles des mangeurs de viande. Eoraptor mangeait donc un peu de tout !"
  ],
  superPouvoir: { titre: "Le pionnier", texte: "Il fait partie des plus anciens dinosaures connus : c’est un arrière-arrière-grand-cousin du T-rex !" },
  saviezVous: [
    "Son squelette a été trouvé presque complet, ce qui est très rare pour un animal aussi vieux.",
    "Il tenait dans les bras d’un enfant : à peine 1 mètre de long, la queue comprise.",
    "Son nom veut dire « voleur de l’aube » car il vivait à l’aube du règne des dinosaures."
  ]
},
{
  slug: "herrerasaurus",
  nom: "Herrerasaurus",
  prononciation: "é-ré-ra-so-russ",
  sens: "« le lézard de Herrera »",
  periode: "trias",
  epoque: "Trias supérieur",
  ageDebut: 231, ageFin: 229,
  famille: "theropodes",
  archetype: "theropode-grand",
  regime: "carnivore",
  longueur: 5, hauteur: 1.3, poids: 250, vitesse: 30,
  lieux: ["Amérique du Sud"],
  decouverte: { annee: 1959, par: "Victorino Herrera", lieu: "Province de San Juan, Argentine" },
  vraiDino: true,
  couleurs: ["#8f5a2e", "#d59b5e", "#4a2a13"],
  accroche: "Le premier grand chasseur à deux pattes du monde des dinosaures.",
  comparaison: "aussi long qu’une petite voiture",
  cri: "Rrraaakk !",
  paragraphes: [
    "Herrerasaurus était le plus redoutable des premiers dinosaures. Avec ses 5 mètres de long, il chassait les petits reptiles et les jeunes animaux de la forêt triasique.",
    "Ses mains possédaient trois longs doigts armés de griffes crochues, parfaites pour agripper une proie qui gigote. Sa mâchoire pouvait coulisser légèrement pour mieux la retenir.",
    "C’est un berger argentin qui a repéré ses os en 1959 : il s’appelait Victorino Herrera, et le dinosaure porte son nom depuis."
  ],
  superPouvoir: { titre: "Mâchoire coulissante", texte: "Une articulation spéciale lui permettait de resserrer sa prise, comme une pince qui se referme." },
  saviezVous: [
    "Ce n’est pas un berger de moutons qui l’a trouvé… mais bien un éleveur nommé Herrera !",
    "À son époque, les dinosaures représentaient moins d’un animal sur dix.",
    "Il courait probablement plus vite qu’un humain adulte."
  ]
},
{
  slug: "plateosaurus",
  nom: "Plateosaurus",
  prononciation: "pla-té-o-so-russ",
  sens: "« le lézard plat »",
  periode: "trias",
  epoque: "Trias supérieur",
  ageDebut: 214, ageFin: 204,
  famille: "sauropodomorphes",
  archetype: "sauropode",
  regime: "herbivore",
  longueur: 8, hauteur: 3, poids: 4000, vitesse: 15,
  lieux: ["Europe", "Groenland"],
  decouverte: { annee: 1837, par: "Hermann von Meyer", lieu: "Bavière, Allemagne" },
  vraiDino: true,
  couleurs: ["#5f8f57", "#a8cf8e", "#33532f"],
  accroche: "Le géant du Trias, ancêtre lointain des immenses sauropodes.",
  comparaison: "aussi long qu’un minibus",
  cri: "Mouuuuh !",
  paragraphes: [
    "Plateosaurus était l’un des plus gros animaux de son temps. Il broutait les feuilles des fougères et des conifères en se dressant sur ses pattes arrière pour atteindre les branches hautes.",
    "Son long cou et sa petite tête annoncent déjà les futurs sauropodes comme le Diplodocus. Mais contrairement à eux, il marchait surtout sur deux pattes.",
    "On a retrouvé des dizaines de squelettes ensemble en Allemagne et en Suisse. Ces troupeaux entiers se sont peut-être enlisés dans la boue il y a 210 millions d’années."
  ],
  superPouvoir: { titre: "Le pouce piquant", texte: "Chaque main portait une grosse griffe en forme de crochet, utile pour tirer les branches… ou se défendre." },
  saviezVous: [
    "C’est le premier dinosaure découvert en Allemagne, en 1837.",
    "Il avalait des cailloux pour broyer les plantes dans son estomac : on les appelle des gastrolithes.",
    "Certains individus grandissaient plus vite que d’autres, un peu comme chez les humains."
  ]
},
{
  slug: "coelophysis",
  nom: "Coelophysis",
  prononciation: "sé-lo-fi-siss",
  sens: "« la forme creuse »",
  periode: "trias",
  epoque: "Trias supérieur",
  ageDebut: 216, ageFin: 196,
  famille: "theropodes",
  archetype: "theropode-petit",
  regime: "carnivore",
  longueur: 3, hauteur: 0.8, poids: 25, vitesse: 40,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 1889, par: "Edward Drinker Cope", lieu: "Nouveau-Mexique, États-Unis" },
  vraiDino: true,
  couleurs: ["#c9a23f", "#f0dc9a", "#6e5216"],
  accroche: "Un chasseur fin comme un lévrier, qui vivait en bandes.",
  comparaison: "aussi long qu’un canapé",
  cri: "Tchik-tchik !",
  paragraphes: [
    "Coelophysis était léger, rapide et vif. Ses os étaient creux, comme ceux des oiseaux d’aujourd’hui : c’est ce qui lui donne son nom, « la forme creuse ».",
    "Il chassait les insectes, les lézards et les petits poissons au bord des rivières. Son cou souple lui permettait de frapper très vite, comme un héron.",
    "Au Nouveau-Mexique, on a découvert un site incroyable appelé Ghost Ranch : des centaines de Coelophysis fossilisés au même endroit ! Ils ont sans doute été surpris tous ensemble par une crue."
  ],
  superPouvoir: { titre: "Course éclair", texte: "Avec ses pattes fines et ses os légers, il comptait parmi les dinosaures les plus rapides de son temps." },
  saviezVous: [
    "C’est le fossile officiel de l’État du Nouveau-Mexique.",
    "Un Coelophysis est parti dans l’espace en 1998 à bord de la navette Endeavour !",
    "Il pesait à peine plus lourd qu’un gros chien."
  ]
},

/* ============================ JURASSIQUE ============================ */
{
  slug: "dilophosaurus",
  nom: "Dilophosaurus",
  prononciation: "di-lo-fo-so-russ",
  sens: "« le lézard à deux crêtes »",
  periode: "jurassique",
  epoque: "Jurassique inférieur",
  ageDebut: 193, ageFin: 183,
  famille: "theropodes",
  archetype: "theropode-crete",
  regime: "carnivore",
  longueur: 7, hauteur: 2, poids: 400, vitesse: 30,
  lieux: ["Amérique du Nord"],
  decouverte: { annee: 1942, par: "Samuel Welles", lieu: "Arizona, États-Unis" },
  vraiDino: true,
  couleurs: ["#3f7fa8", "#8fd0e8", "#22465e"],
  accroche: "Le dinosaure au casque double, star incomprise du cinéma.",
  comparaison: "aussi long qu’un grand van",
  cri: "Hrooo-oup !",
  paragraphes: [
    "Dilophosaurus portait deux crêtes osseuses sur le dessus du crâne, comme deux petites assiettes posées debout. Elles étaient trop fragiles pour se battre : elles servaient sûrement à se faire reconnaître, un peu comme la crête d’un coq.",
    "C’était le plus grand prédateur d’Amérique du Nord au début du Jurassique. Il chassait des poissons et des petits dinosaures près des rivières.",
    "Attention aux films ! Dans le cinéma, on le montre petit, avec une collerette et du venin. En vrai, il mesurait 7 mètres et rien ne prouve qu’il crachait quoi que ce soit."
  ],
  superPouvoir: { titre: "Le double casque", texte: "Ses deux crêtes colorées servaient probablement à séduire et à impressionner ses rivaux." },
  saviezVous: [
    "Ses empreintes de pas ont été retrouvées avant son squelette.",
    "Le vrai Dilophosaurus était 3 fois plus grand que celui du film Jurassic Park.",
    "Son museau portait une encoche, comme celui des crocodiles."
  ]
},
{
  slug: "cryolophosaurus",
  nom: "Cryolophosaurus",
  prononciation: "kri-o-lo-fo-so-russ",
  sens: "« le lézard à crête glacée »",
  periode: "jurassique",
  epoque: "Jurassique inférieur",
  ageDebut: 194, ageFin: 188,
  famille: "theropodes",
  archetype: "theropode-crete-travers",
  regime: "carnivore",
  longueur: 6.5, hauteur: 2, poids: 450, vitesse: 28,
  lieux: ["Antarctique"],
  decouverte: { annee: 1991, par: "William Hammer", lieu: "Mont Kirkpatrick, Antarctique" },
  vraiDino: true,
  couleurs: ["#7a6fb0", "#c4bcf0", "#3e3668"],
  accroche: "Le seul grand carnivore découvert sur le continent de glace !",
  comparaison: "aussi long qu’un grand van",
  cri: "Frooosh !",
  paragraphes: [
    "Cryolophosaurus a été déterré en Antarctique, à 4 000 mètres d’altitude, dans un froid glacial. Mais attention : de son vivant, l’Antarctique était une forêt tempérée et verdoyante !",
    "Sa crête ne se dresse pas dans la longueur du crâne, mais en travers, juste au-dessus des yeux. Les paléontologues l’ont d’abord surnommé « Elvisaurus » car elle ressemblait à la banane du chanteur Elvis Presley.",
    "Il était le plus grand prédateur de son écosystème et chassait probablement les premiers sauropodes du Jurassique."
  ],
  superPouvoir: { titre: "Coiffure unique", texte: "Aucun autre dinosaure connu ne porte une crête en travers du crâne comme la sienne." },
  saviezVous: [
    "Il a fallu utiliser des marteaux-piqueurs pour extraire ses os de la roche gelée.",
    "À son époque, l’Antarctique était couvert de forêts et de fougères.",
    "Son surnom officieux est « Elvisaurus »."
  ]
},
{
  slug: "allosaurus",
  nom: "Allosaurus",
  prononciation: "a-lo-so-russ",
  sens: "« le lézard différent »",
  periode: "jurassique",
  epoque: "Jurassique supérieur",
  ageDebut: 155, ageFin: 145,
  famille: "theropodes",
  archetype: "theropode-grand",
  regime: "carnivore",
  longueur: 9, hauteur: 3, poids: 2000, vitesse: 33,
  lieux: ["Amérique du Nord", "Europe"],
  decouverte: { annee: 1877, par: "Othniel Charles Marsh", lieu: "Colorado, États-Unis" },
  vraiDino: true,
  couleurs: ["#b5452f", "#ee9a6d", "#5e1f14"],
  accroche: "Le lion du Jurassique : rapide, puissant et très nombreux.",
  comparaison: "aussi long qu’un camion de pompiers",
  cri: "Graaaaw !",
  paragraphes: [
    "Allosaurus était LE grand prédateur du Jurassique, bien avant que le T-rex n’existe. Il chassait les Stégosaures et les jeunes sauropodes dans les plaines d’Amérique du Nord.",
    "Il attaquait en ouvrant très grand la gueule, puis abattait sa tête comme une hache. Ses dents en lame de couteau tranchaient la chair sans effort.",
    "Un squelette célèbre, surnommé « Big Al », porte 19 blessures guéries : côtes cassées, orteil infecté… La vie d’un chasseur n’était pas facile tous les jours."
  ],
  superPouvoir: { titre: "La tête-hachoir", texte: "Il frappait avec le crâne entier, comme un coup de pioche, pour ouvrir de grandes plaies." },
  saviezVous: [
    "Plus de 60 squelettes d’Allosaurus ont été retrouvés : c’est l’un des dinosaures les mieux connus.",
    "Une vertèbre de Stégosaure a été retrouvée percée par une pointe de queue… et une dent d’Allosaurus plantée dedans !",
    "Il possédait deux petites cornes au-dessus des yeux."
  ]
},
{
  slug: "ceratosaurus",
  nom: "Ceratosaurus",
  prononciation: "sé-ra-to-so-russ",
  sens: "« le lézard à corne »",
  periode: "jurassique",
  epoque: "Jurassique supérieur",
  ageDebut: 153, ageFin: 148,
  famille: "theropodes",
  archetype: "theropode-cornu",
  regime: "carnivore",
  longueur: 6, hauteur: 2.2, poids: 900, vitesse: 28,
  lieux: ["Amérique du Nord", "Afrique", "Europe"],
  decouverte: { annee: 1884, par: "Othniel Charles Marsh", lieu: "Colorado, États-Unis" },
  vraiDino: true,
  couleurs: ["#7d4f9e", "#c9a4e0", "#42265a"],
  accroche: "Une corne sur le nez et une rangée d’écailles sur le dos.",
  comparaison: "aussi long qu’un grand 4x4",
  cri: "Rrrouuuh !",
  paragraphes: [
    "Ceratosaurus se reconnaît tout de suite grâce à la corne plantée sur son museau et aux deux petites cornes au-dessus de ses yeux.",
    "Le long de son dos couraient des plaques osseuses appelées ostéodermes, comme une rangée de petits boucliers sous la peau.",
    "Il vivait au même endroit qu’Allosaurus, mais il chassait sans doute près de l’eau : ses longues dents et sa queue puissante conviennent bien à la pêche."
  ],
  superPouvoir: { titre: "Les plus longues dents", texte: "Par rapport à la taille de son crâne, ses dents étaient les plus longues de tous les carnivores du Jurassique." },
  saviezVous: [
    "Sa corne était trop fragile pour se battre : elle servait surtout à parader.",
    "Sa queue était aplatie sur les côtés, comme celle d’un crocodile nageur.",
    "Il avait 4 doigts à chaque main, alors que l’Allosaurus n’en avait que 3."
  ]
}
];
