// Barème des duels (jeux « Duel de dinosaures » et « Le roi de la tour »).
//
// Rédigé, vérifié par un contradicteur puis calibré dinosaure par dinosaure, avec des sources
// (en commentaire). La puissance est calculée dans affrontements.mjs.
//
//   attaque (0 à 15)  : arme principale, à taille égale. 15 = morsure du T-rex.
//   defense (0 à 12)  : protection. 12 = armure complète de l'Ankylosaurus.
//   arme, protection  : insérés dans « … grâce à {arme}. » et « Malgré {arme}, … » :
//                       possessif au début (sa, son, ses), pas de point final. protection peut être null.
//   atout             : une phrase vraie pour l'explication du duel.
//
// Changer une note peut créer une égalité de puissance : le build la signale.

export const bareme = [
  // La note d'attaque est au maximum parce que sa morsure, estimée à environ 35 000 N, est la plus forte calculée
  // pour un animal terrestre (Gignac et Erickson 2017), et que son crâne était bâti pour mordre fort (Rowe et
  // Rayfield 2025). Il n'a pas d'armure, mais son corps massif le place en haut de la tranche 1-3, comme
  // Giganotosaurus et Spinosaurus.
  //   https://doaj.org/article/63a788a5446a41508a8273ab1925cc94
  //   https://news.fsu.edu/multimedia/video/2017/05/18/researchers-find-t-rex-crush-8000-pounds
  //   https://www.npr.org/sections/thetwo-way/2017/05/17/528677883/tyrannosaurus-rexs-bite-force-measured-8-000-pounds-scientists-say
  //   https://bristol.ac.uk/news/2025/august/dinosaur-bite-strength.html
  {
    slug: "tyrannosaurus", attaque: 15, defense: 3,
    arme: "sa morsure capable de broyer les os",
    protection: null,
    atout: "Tyrannosaurus rex a la morsure la plus puissante connue chez un animal terrestre.",
  },
  // Ses dents aplaties sur les côtés et crantées, faites pour trancher, en font un grand théropode typique (12).
  // Sa morsure était plus faible que celle du T-rex (Therrien 2005 ; Rowe et Rayfield 2025), donc il reste sous
  // 15. Il n'a pas d'armure mais un corps massif (3).
  //   https://en.wikipedia.org/wiki/Giganotosaurus
  //   https://bristol.ac.uk/news/2025/august/dinosaur-bite-strength.html
  //   https://www.popsci.com/science/giganotosaurus-vs-t-rex/
  {
    slug: "giganotosaurus", attaque: 12, defense: 3,
    arme: "ses dents plates et tranchantes comme des lames",
    protection: null,
    atout: "Giganotosaurus est l’un des plus grands dinosaures carnivores connus, long d’environ 12 à 13 mètres.",
  },
  // Ses dents coniques sans crans servaient à attraper des poissons glissants et les spinosaures mordaient
  // faiblement (Rowe et Rayfield 2025) : 8. À taille égale, il est au même niveau que Baryonyx (8), son cousin :
  // même mâchoire de spinosaure à la morsure faible, et la grande griffe de pouce de Baryonyx est une griffe de
  // main (4 à 6 sur l'échelle), qui ne le fait pas passer au-dessus. Il n'a pas de protection, mais il a un corps
  // massif comme le T-rex et Giganotosaurus (3). Ses pattes courtes ne sont pas comptées en défense, puisque sa
  // vitesse est déjà dans l'agilité.
  //   https://en.wikipedia.org/wiki/Spinosaurus
  //   https://bristol.ac.uk/news/2025/august/dinosaur-bite-strength.html
  //   https://www.nationalgeographic.com/science/article/case-for-river-monster-spinosaurus-strengthened-by-new-fossil-teeth
  {
    slug: "spinosaurus", attaque: 8, defense: 3,
    arme: "ses longues mâchoires aux dents coniques",
    protection: null,
    atout: "Spinosaurus est l’un des plus grands dinosaures carnivores connus, long de 14 à 15 mètres.",
  },
  // Il a des dizaines de dents crantées et trois grandes griffes recourbées à chaque main (12). Sa morsure était
  // faible, mais son crâne solide supportait les chocs, d'où l'attaque en hache (Rayfield 2001), une hypothèse
  // encore discutée. Ses petites cornes au-dessus des yeux ne le protégeaient pas, et sa taille est moyenne (2).
  //   https://en.wikipedia.org/wiki/Allosaurus
  //   https://www.scientificamerican.com/article/dissecting-a-dinosaurs-bi/
  //   https://bristol.ac.uk/news/2025/august/dinosaur-bite-strength.html
  {
    slug: "allosaurus", attaque: 12, defense: 2,
    arme: "ses dents crantées et ses grandes griffes",
    protection: null,
    atout: "Allosaurus attaque sans doute gueule grande ouverte, en abattant sa tête comme une hache.",
  },
  // D'après Mazzetta et al. (2009), sa morsure était faible (environ 3 300 N) mais plus rapide que celle
  // d'Allosaurus. Ses dents étaient longues, ses bras inutiles, et son crâne ne supportait pas de violents coups
  // de tête, donc ses cornes ne comptent pas. Il obtient 8, comme les autres théropodes à morsure moyenne ; avec
  // 7, il serait à égalité de puissance avec Kentrosaurus (45,8). Ses écailles en relief ne protégeaient guère
  // contre des dents (Hendrickx et Bell 2021) (2).
  //   https://doi.org/10.1671/039.029.0313
  //   https://en.wikipedia.org/wiki/Carnotaurus
  //   https://sciencedaily.com/releases/2011/10/111014212405.htm
  //   https://www.une.edu.au/about-une/news-and-events/news/2021/09/scientists-reveal-the-fossilised-skin-of-a-bull-like-carnivorous-dinosaur
  {
    slug: "carnotaurus", attaque: 8, defense: 2,
    arme: "sa morsure très rapide",
    protection: null,
    atout: "Carnotaurus est sans doute l’un des grands carnivores les plus rapides, grâce à sa queue très musclée.",
  },
  // Son arme principale est sa mâchoire de crocodile aux dents finement crantées, mais sa morsure de spinosaure
  // était sans doute faible (Rowe et Rayfield 2025), comme celle de Spinosaurus (8). Sa griffe de pouce d'environ
  // 31 cm, mesurée le long de la courbe, est spectaculaire, mais l'échelle range les griffes de mains entre 4 et 6
  // : elle ne le fait pas passer au-dessus de 8. Ce point en moins (9 avant calibrage) supprime aussi l'égalité de
  // puissance avec Kentrosaurus (45,8). Il n'a aucune protection particulière (2).
  //   https://www.nhm.ac.uk/discover/dino-directory/baryonyx.html
  //   https://en.wikipedia.org/wiki/Baryonyx
  //   https://bristol.ac.uk/news/2025/august/dinosaur-bite-strength.html
  {
    slug: "baryonyx", attaque: 8, defense: 2,
    arme: "sa griffe de pouce longue de 31 centimètres",
    protection: null,
    atout: "Baryonyx ne mange pas que du poisson : son ventre fossilisé contient aussi des os d’un jeune Iguanodon.",
  },
  // Ses dents du haut, en lame, sont très longues pour son crâne : jusqu'à 9,3 cm, autant que la hauteur minimale
  // de sa mâchoire du bas. Seul Genyodectes en a d'aussi longues, mais sa force de morsure n'a pas été mesurée
  // (11). Il est le seul théropode connu à porter des ostéodermes, une rangée de petits os irréguliers sous la
  // peau, qui servaient peut-être à parader. C'est bien moins qu'un crâne-casque ou une armure, d'où le haut de la
  // tranche 1-3 (3).
  //   https://en.wikipedia.org/wiki/Ceratosaurus
  //   https://nhmu.utah.edu/ceratosaurus-nasicornis
  {
    slug: "ceratosaurus", attaque: 11, defense: 3,
    arme: "ses longues dents en forme de lame",
    protection: "sa rangée de petites plaques osseuses sur le dos",
    atout: "Ceratosaurus a des dents du haut longues jusqu’à 9 centimètres, énormes pour un carnivore de sa taille.",
  },
  // Marsh et Rowe (2020) montrent que ses mâchoires étaient bien plus robustes qu'on ne le pensait et portaient de
  // puissants muscles, avec de longues dents recourbées. C'est le seul théropode moyen du groupe avec cette
  // preuve, d'où un point de plus que Cryolophosaurus (9). Ses crêtes étaient trop fragiles pour se battre et il
  // n'a aucune autre protection (1).
  //   https://en.wikipedia.org/wiki/Dilophosaurus
  //   https://news.utexas.edu/2020/07/07/famous-jurassic-park-dinosaur-is-less-lizard-more-bird
  //   https://www.nhm.ac.uk/discover/dino-directory/dilophosaurus.html
  //   https://www.sci.news/paleontology/dilophosaurus-wetherilli-08620.html
  {
    slug: "dilophosaurus", attaque: 9, defense: 1,
    arme: "ses mâchoires solides aux dents recourbées",
    protection: null,
    atout: "Dilophosaurus est le plus grand chasseur connu d’Amérique du Nord au début du Jurassique.",
  },
  // Ce théropode de taille moyenne a de nombreuses dents pointues, sans arme spéciale connue ni étude de sa
  // morsure. Il est donc un point sous Dilophosaurus, dont les mâchoires robustes sont prouvées (8). Sa crête fine
  // et plissée servait sans doute à parader et ne pouvait pas servir d'arme ni de protection (1).
  //   https://en.wikipedia.org/wiki/Cryolophosaurus
  //   https://www.nhm.ac.uk/discover/dino-directory/cryolophosaurus.html
  {
    slug: "cryolophosaurus", attaque: 8, defense: 1,
    arme: "ses nombreuses dents pointues de chasseur",
    protection: null,
    atout: "Cryolophosaurus est l’un des plus grands carnivores connus du début du Jurassique.",
  },
  // Grandes dents dentelées de carnivore, articulation de la mâchoire inférieure qui coulisse pour une morsure qui
  // agrippe, et trois doigts à griffes courbes et pointues pour saisir : 10, juste sous les grands théropodes.
  // Aucune protection particulière (un crâne porte une blessure attribuée à une morsure) : défense 1, comme ses
  // contemporains Eoraptor et Coelophysis et comme Dilophosaurus et Cryolophosaurus, qui n'ont rien non plus. Avec
  // 2 (avant calibrage), sa puissance était exactement celle de Dilophosaurus (39,0). Cohérent avec la fiche
  // (superPouvoir « Mâchoire coulissante »).
  //   https://en.wikipedia.org/wiki/Herrerasaurus
  //   https://www.ebsco.com/research-starters/zoology/herrerasaurus/
  {
    slug: "herrerasaurus", attaque: 10, defense: 1,
    arme: "ses grandes dents dentelées et ses griffes crochues",
    protection: null,
    atout: "Herrerasaurus a une mâchoire qui coulisse pour mieux serrer sa proie, comme une pince.",
  },
  // Dents en lame, recourbées et finement dentelées des deux côtés, mais petites, adaptées à des proies bien plus
  // petites que lui ; bras faits pour saisir, trois doigts fonctionnels : 6. Aucune armure, il compte seulement
  // sur sa vitesse : défense 1, comme Compsognathus et Eoraptor qui ont la même justification.
  //   https://en.wikipedia.org/wiki/Coelophysis
  //   https://ebsco.com/research-starters/earth-and-atmospheric-sciences/coelophysis
  {
    slug: "coelophysis", attaque: 6, defense: 1,
    arme: "ses dents fines et dentelées comme des lames",
    protection: null,
    atout: "Coelophysis est un coureur rapide et agile qui saisit ses proies avec ses mains.",
  },
  // Ses trois plus longs doigts portaient de grandes griffes pour saisir ses proies, mais ses dents sont petites,
  // en partie en forme de feuille (omnivore) : 4. Rien pour se protéger à part la fuite (« sprinteur rapide ») :
  // défense 1.
  //   https://en.wikipedia.org/wiki/Eoraptor
  //   https://kids.britannica.com/students/article/Eoraptor/390681
  {
    slug: "eoraptor", attaque: 4, defense: 1,
    arme: "ses mains aux grandes griffes et ses petites dents",
    protection: null,
    atout: "Eoraptor est l’un des tout premiers dinosaures : petit, léger et rapide sur ses deux pattes.",
  },
  // Petites dents pointues (lisses à l'avant, finement dentelées à l'arrière) et main à deux grands doigts griffus
  // plus un troisième réduit ; un lézard rapide (Bavarisaurus) a été retrouvé dans son corps : 3. Aucune
  // protection, sa seule défense est la vitesse : 1.
  //   https://en.wikipedia.org/wiki/Compsognathus
  //   https://kids.britannica.com/students/article/Compsognathus/310796
  //   https://www.ebsco.com/research-starters/zoology/compsognathus/
  {
    slug: "compsognathus", attaque: 3, defense: 1,
    arme: "ses petites dents pointues et ses doigts griffus",
    protection: null,
    atout: "Compsognathus est petit mais assez vif pour attraper des lézards rapides.",
  },
  // Vraies dents et trois doigts griffus sur chaque aile, mais tout est petit : 2. La forme des os de ses ailes
  // ressemble à celle d'oiseaux qui volent par courtes poussées (faisans) pour fuir : défense 2.
  //   https://ucmp.berkeley.edu/diapsids/birds/archaeopteryx.html
  //   https://www.britannica.com/EBchecked/topic/32599/Archaeopteryx
  //   https://www.uu.se/en/news/2018/2018-03-20-archaeopteryx-was-an-active-flyer
  //   Voeten et al. 2018, « Wing bone geometry reveals active flight in Archaeopteryx », Nature Communications 9:923
  {
    slug: "archaeopteryx", attaque: 2, defense: 2,
    arme: "ses petites dents et ses ailes à griffes",
    protection: "ses ailes pour s’échapper en voletant",
    atout: "Archaeopteryx vole sans doute mal, sur de courtes distances, un peu comme un faisan.",
  },
  // Griffe en faucille de plus de 6,5 cm au deuxième orteil (7 cm sur la fiche) et dents dentelées, plus fortement
  // à l'arrière : 7, au milieu de l'échelle des griffes en faucille. Couvert de plumes mais sans armure : défense
  // 2.
  //   https://en.wikipedia.org/wiki/Velociraptor
  //   https://discovermagazine.com/planet-earth/deinonychus-and-velociraptor-used-their-killing-claws-to-pin-prey-like-eagles-and-hawks
  {
    slug: "velociraptor", attaque: 7, defense: 2,
    arme: "ses griffes en faucille et ses dents dentelées",
    protection: null,
    atout: "Velociraptor est célèbre pour un fossile où sa griffe semble plantée dans la gorge d’un Protoceratops.",
  },
  // Griffe en faucille reconstituée à plus de 12 cm (sans compter l'étui de corne) et environ soixante-dix dents
  // recourbées en lame : 8, le haut de l'échelle des griffes en faucille. La force de sa morsure est discutée
  // (estimation forte de 2010 contestée, étude de 2022 bien plus faible), on ne s'appuie donc pas dessus. Aucune
  // protection : défense 2.
  //   https://en.wikipedia.org/wiki/Deinonychus
  //   Fowler, Freedman, Scannella & Kambic 2011, « The Predatory Ecology of Deinonychus and the Origin of Flapping in Birds », PLoS ONE 6(12): e28964 — https://pmc.ncbi.nlm.nih.gov/articles/PMC3237572
  //   https://discovermagazine.com/planet-earth/deinonychus-and-velociraptor-used-their-killing-claws-to-pin-prey-like-eagles-and-hawks
  {
    slug: "deinonychus", attaque: 8, defense: 2,
    arme: "sa griffe en faucille de 12 centimètres",
    protection: null,
    atout: "Deinonychus plaque peut-être sa proie au sol avec son poids et ses griffes, comme un aigle.",
  },
  // Dromaeosauridé aux griffes de pieds proches de celles d'un rapace comme l'épervier, mais aux dents petites,
  // lisses ou à peine dentelées : 5, sous Velociraptor. Ses quatre ailes lui permettaient de fuir en planant,
  // voire en volant (débattu) : défense 2. Menu prouvé par des restes de poisson, d'oiseau, de lézard et de
  // mammifère trouvés dans son corps.
  //   https://en.wikipedia.org/wiki/Microraptor
  //   Hone, Dececchi, Sullivan, Xu & Larsson 2022, « Generalist diet of Microraptor zhaoianus included mammals », Journal of Vertebrate Paleontology, doi:10.1080/02724634.2022.2144337
  //   https://www.smithsonianmag.com/smart-news/this-120-million-year-old-dinosaur-fossil-had-a-mammal-hiding-in-its-stomach-180981352/
  {
    slug: "microraptor", attaque: 5, defense: 2,
    arme: "ses petites dents pointues et ses griffes recourbées",
    protection: "ses quatre ailes pour s’enfuir dans les airs",
    atout: "Microraptor a un menu très varié : poissons, lézards, oiseaux et même petits mammifères.",
  },
  // Pas de dents mais un bec robuste au pincement fort, comparé à celui des perroquets, sur un crâne plus
  // résistant que celui des autres théropodes herbivores ; trois doigts fins à griffes recourbées : 3, le haut de
  // l'échelle du bec (4 créerait une égalité de puissance avec Velociraptor). Aucune protection connue : défense
  // 2.
  //   https://en.wikipedia.org/wiki/Oviraptor
  //   Meade, Pittman, Balanoff & Lautenschlager 2024, « Cranial functional specialisation for strength precedes morphological evolution in Oviraptorosauria », Communications Biology 7:436 — https://link.springer.com/article/10.1038/s42003-024-06137-1
  {
    slug: "oviraptor", attaque: 3, defense: 2,
    arme: "son bec robuste et ses mains griffues",
    protection: null,
    atout: "Oviraptor a un crâne court et solide, et un bec puissant comme celui d’un perroquet.",
  },
  // Bec sans dents et mains qui ne peuvent pas saisir ; il se défendait peut-être à coups de bec et de pattes
  // (hypothèse de G. Paul, 1988) : 3. Sa défense principale est la fuite (42 à 56 km/h estimés par Thulborn, 1982)
  // : 3, le haut de la catégorie « fuite ».
  //   https://en.wikipedia.org/wiki/Gallimimus
  {
    slug: "gallimimus", attaque: 3, defense: 3,
    arme: "ses coups de pattes et de bec",
    protection: "ses longues pattes taillées pour la course",
    atout: "Gallimimus court peut-être jusqu’à 55 km/h : sa meilleure défense, c’est la fuite.",
  },
  // Griffes de mains immenses (os de plus de 50 cm, sans doute bien plus avec l'étui de corne), mais aucune preuve
  // qu'elles servaient à se battre : Lautenschlager (2014) et Qin et al. (2023) les jugent trop fragiles, sans
  // doute faites pour impressionner. On reste donc dans l'échelle des griffes de mains : 5. Sa grande taille
  // décourage les prédateurs : défense 5.
  //   https://en.wikipedia.org/wiki/Therizinosaurus
  //   Qin, Liao, Benton & Rayfield 2023, « Functional space analyses reveal the function and evolution of the most bizarre theropod manual unguals », Communications Biology 6:181 — https://pmc.ncbi.nlm.nih.gov/articles/PMC9935540
  //   Lautenschlager 2014, « Morphological and functional diversity in therizinosaur claws and the implications for theropod claw evolution », Proc. R. Soc. B 281:20140497 — https://pmc.ncbi.nlm.nih.gov/articles/PMC4024305
  {
    slug: "therizinosaurus", attaque: 5, defense: 5,
    arme: "ses immenses griffes de plus de 50 centimètres",
    protection: "sa taille géante, haute comme une girafe",
    atout: "Therizinosaurus est si haut qu’un grand Tarbosaurus n’atteint peut-être que ses cuisses ou son ventre.",
  },
  // Ses deux cornes d'environ 1 m ont servi aux combats entre Triceratops (Farke 2009), mais aucun fossile ne
  // montre un coup de corne sur un prédateur, alors que la pointe du Stegosaurus a laissé un trou dans un os
  // d'Allosaurus : 9, comme la massue d'Ankylosaurus et la queue de Stegosaurus. Sa collerette est en os plein,
  // mais on la pense aujourd'hui surtout faite pour parader, et elle ne protège que la tête et le cou, pas le
  // corps : 8, le bas de la plage, comme Styracosaurus (collerette ajourée mais hérissée de pointes). Le poids de
  // la fiche (12 t) dépasse déjà les estimations courantes (6 à 10 t), ce qui justifie de ne pas mettre en plus
  // les deux notes au maximum (10 et 9 avant calibrage). Des os de Triceratops portent des marques de dents de
  // T-rex, et une corne mordue a guéri (Happ 2008).
  //   https://www.nhm.ac.uk/discover/dino-directory/triceratops.html
  //   Farke, Wolff & Tanke 2009, « Evidence of Combat in Triceratops », PLoS ONE 4(1): e4252 — https://doi.org/10.1371/journal.pone.0004252
  //   https://www.sciencenews.org/article/healed-scars-tag-t-rex-predator
  //   https://www.floridamuseum.ufl.edu/fossilproject/blog/featured-fossil-triceratops-vs-tyrannosaurus
  //   https://en.wikipedia.org/wiki/Triceratops
  {
    slug: "triceratops", attaque: 9, defense: 8,
    arme: "ses deux grandes cornes d’environ un mètre",
    protection: "sa grande collerette en os massif",
    atout: "Triceratops peut survivre à un T-rex : un fossile montre une corne cassée par une morsure, puis guérie.",
  },
  // Il n'a qu'une grande corne, sur le nez. Lambe l'estimait à 57 cm, mais la pointe manque, et elle était peut-
  // être deux fois plus courte. On met donc 8 en attaque, en dessous du Triceratops et du Stegosaurus. Sa
  // collerette porte au moins 4 pointes de 50 à 55 cm, mais elle est percée de grandes ouvertures : 8 en défense,
  // le bas de la plage. Les pointes servaient surtout à parader, et leur rôle contre les prédateurs reste une
  // hypothèse.
  //   https://en.wikipedia.org/wiki/Styracosaurus
  //   https://www.nhm.ac.uk/discover/dino-directory/styracosaurus.html
  {
    slug: "styracosaurus", attaque: 8, defense: 8,
    arme: "sa grande corne plantée sur le nez",
    protection: "sa collerette hérissée de longues pointes",
    atout: "Styracosaurus porte une couronne de pointes d’environ 50 cm qui impressionne sûrement ses rivaux, et peut-être les prédateurs.",
  },
  // Défense de référence (12) : des plaques d'os incrustées dans la peau couvrent le cou, le dos et les hanches,
  // et il a des cornes à l'arrière du crâne. D'après Arbour (2009), les massues d'adultes pouvaient casser des os,
  // d'où 9 en attaque. Une étude de 2022 (Zuul) suggère qu'elles servaient peut-être surtout aux combats entre
  // ankylosaures, sans exclure la défense. Les grandes pointes sur les flancs ne sont pas connues chez
  // Ankylosaurus lui-même.
  //   https://www.nhm.ac.uk/discover/dino-directory/ankylosaurus.html
  //   Arbour 2009, « Estimating Impact Forces of Tail Club Strikes by Ankylosaurid Dinosaurs », PLoS ONE 4(8): e6738 — https://doi.org/10.1371/journal.pone.0006738
  //   Arbour & Mallon 2017, « Unusual cranial and postcranial anatomy in the archetypal ankylosaur Ankylosaurus magniventris », FACETS — https://doi.org/10.1139/facets-2017-0063
  //   https://www.nhm.ac.uk/discover/news/2022/december/ankylosaurs-may-have-used-tail-clubs-fight-each-other-not-predators.html
  //   https://en.wikipedia.org/wiki/Ankylosaurus
  {
    slug: "ankylosaurus", attaque: 9, defense: 12,
    arme: "sa lourde massue d’os au bout de la queue",
    protection: "son armure de plaques d’os incrustées dans la peau",
    atout: "Ankylosaurus balance sa grosse massue de côté, sans doute assez fort pour casser un os.",
  },
  // Il a quatre pointes de queue de 60 à 90 cm. Une vertèbre de queue d'Allosaurus porte un trou à moitié guéri de
  // la forme d'une de ses pointes, et environ 10 % des pointes retrouvées ont le bout cassé, puis guéri. Cela
  // donne 9 en attaque. Ses plaques servaient surtout à parader et ne forment pas une vraie armure, et sa gorge
  // n'était protégée que par de petits os : défense moyenne de 6.
  //   https://en.wikipedia.org/wiki/Thagomizer
  //   https://www.smithsonianmag.com/science-nature/watch-out-for-that-thagomizer-98891562/
  //   Carpenter, Sanders, McWhinney & Wood 2005, « Evidence for predator-prey relationships: examples for Allosaurus and Stegosaurus », in The Carnivorous Dinosaurs (Indiana Univ. Press)
  //   https://www.nhm.ac.uk/discover/dino-directory/stegosaurus.html
  //   https://en.wikipedia.org/wiki/Stegosaurus
  {
    slug: "stegosaurus", attaque: 9, defense: 6,
    arme: "sa queue armée de quatre longues pointes",
    protection: "ses plaques et sa gorge couverte de petits os",
    atout: "Stegosaurus se défend bien : un os d’Allosaurus porte un trou qui correspond à une de ses pointes.",
  },
  // D'après Mallison (2011), sa queue pouvait balayer le demi-cercle situé derrière lui, assez vite pour blesser
  // gravement un grand prédateur. C'est une arme dangereuse, mais seulement d'après un modèle, sans trace de coup
  // sur un fossile comme chez le Stegosaurus, d'où 8 en attaque. Il a des plaques à l'avant du dos, des piques à
  // l'arrière et une grande pique à l'épaule (ou à la hanche), donc une défense de 7, un peu au-dessus du
  // Stegosaurus.
  //   Mallison 2011, « Defense capabilities of Kentrosaurus aethiopicus Hennig, 1915 », Palaeontologia Electronica 14(2) — https://palaeo-electronica.org/2011_2/255/index.html
  //   https://palaeo-electronica.org/2011_2/255/summary.htm
  //   https://www.smithsonianmag.com/science-nature/kentrosaurus-had-a-formidable-swing-27182743/
  //   https://en.wikipedia.org/wiki/Kentrosaurus
  {
    slug: "kentrosaurus", attaque: 8, defense: 7,
    arme: "sa queue hérissée de longues pointes",
    protection: "ses piques sur le dos et les flancs",
    atout: "Kentrosaurus balaie avec sa queue presque un demi-cercle derrière lui, sans doute assez vite pour blesser un prédateur.",
  },
  // Les coups de tête valent 4 à 6 sur l'échelle. Peterson et al. (2013) ont trouvé des lésions sur 22 % des dômes
  // de sa famille, ce qui appuie l'idée de ces chocs : 5 en attaque. Le casque ne protège que la tête et pas le
  // corps, donc 4 en défense (bas de la plage « crâne-casque »).
  //   Peterson, Dischler & Longrich 2013, « Distributions of Cranial Pathologies Provide Evidence for Head-Butting in Dome-Headed Dinosaurs », PLoS ONE 8(7): e68620 — https://pmc.ncbi.nlm.nih.gov/articles/PMC3712952/
  //   https://www.nhm.ac.uk/discover/dino-directory/pachycephalosaurus.html
  //   https://en.wikipedia.org/wiki/Pachycephalosaurus
  {
    slug: "pachycephalosaurus", attaque: 5, defense: 4,
    arme: "ses coups de tête avec son dôme osseux",
    protection: "son crâne épais comme un casque",
    atout: "Pachycephalosaurus porte un dôme d’os épais jusqu’à 25 cm, parfois marqué de traces de blessures.",
  },
  // Son pouce conique compte comme une arme de main (4 à 6). Le NHM écrit qu'il servait « probablement » contre
  // les prédateurs, mais il a pu servir aussi à ouvrir des fruits ou des graines, et aucun fossile ne montre un
  // coup porté : 4, le bas de la plage. Plateosaurus a 5 parce qu'il ajoute à sa griffe une queue très souple
  // (Filek et al. 2025). Avec 5 (avant calibrage), Iguanodon serait à égalité de puissance avec Baryonyx (44,8) ;
  // avec 6, avec Kentrosaurus (45,8). Il n'a ni armure ni cornes, d'où 2 en défense.
  //   https://www.nhm.ac.uk/discover/dino-directory/iguanodon.html
  //   https://www.smithsonianmag.com/legacy_blog/a-mysterious-thumb/
  //   https://en.wikipedia.org/wiki/Iguanodon
  {
    slug: "iguanodon", attaque: 4, defense: 2,
    arme: "son pouce en forme de poignard",
    protection: null,
    atout: "Iguanodon porte au pouce une pointe d’os, sans doute pour repousser ses ennemis.",
  },
  // On ne lui connaît pas d'arme : il a un bec et des dents pour mâcher les plantes, et l'idée d'une crête servant
  // d'arme a été abandonnée. Il ne reste que des coups de sa lourde queue, d'où 2 en attaque. Le NHM écrit que
  // personne ne sait s'il avait une façon particulière de se défendre, à part sa taille et la vie en groupe : 2 en
  // défense. Le rôle de la crête reste lui aussi discuté (« nobody knows for sure »), d'où le « sans doute ».
  //   https://www.nhm.ac.uk/discover/dino-directory/parasaurolophus.html
  //   https://kids.nationalgeographic.com/animals/prehistoric/facts/parasaurolophus
  //   https://en.wikipedia.org/wiki/Parasaurolophus
  {
    slug: "parasaurolophus", attaque: 2, defense: 2,
    arme: "sa longue queue lourde et musclée",
    protection: null,
    atout: "Parasaurolophus utilise sans doute sa crête creuse comme une trompette, pour lancer un appel grave aux siens.",
  },
  // Il n'a pas d'arme évidente. Il pouvait sans doute donner des coups de pattes et de queue, mais il fuyait
  // surtout le danger : 2 en attaque. Il n'a pas d'armure, et sa protection venait du groupe : nids en colonie et
  // gisements d'os qui montrent de grands groupes. Le chiffre populaire de 10 000 bêtes n'a pas été vérifié.
  // Défense : 2.
  //   https://en.wikipedia.org/wiki/Maiasaura
  //   https://www.nps.gov/articles/mesozoic-egg-mountain-dawson-2014.htm
  {
    slug: "maiasaura", attaque: 2, defense: 2,
    arme: "ses coups de pattes et de queue",
    protection: null,
    atout: "Maiasaura vit en grands troupeaux, où chacun est sûrement plus à l’abri des prédateurs.",
  },
  // On ne lui connaît aucune arme : il n'est connu que par quelques os, et sa masse compte déjà dans le log10 du
  // poids, d'où une attaque de 2. Sa défense est de 6, le haut de l'échelle des sauropodes, parce que c'est le
  // plus grand du groupe. Sa taille n'est qu'estimée (65 à 80 t, 30 à 40 m selon les auteurs), d'où le « environ
  // », et on dit « l'un des plus gros » comme le NHM.
  //   https://www.nhm.ac.uk/discover/dino-directory/argentinosaurus.html
  //   https://en.wikipedia.org/wiki/Argentinosaurus
  {
    slug: "argentinosaurus", attaque: 2, defense: 6,
    arme: "son poids écrasant d’environ 70 tonnes",
    protection: "sa taille gigantesque d’environ 35 mètres de long",
    atout: "Argentinosaurus est l’un des plus gros animaux ayant jamais marché sur la terre ferme.",
  },
  // On ne lui connaît pas d'arme : aucune main n'est connue chez B. altithorax. Il ne lui reste que son poids,
  // d'où une attaque de 2. Sa défense est de 5, juste sous Argentinosaurus, parce que sa taille décourage les
  // attaquants. Les estimations vont de 28 à 47 t (le NHM donne 46,9 t) et de 9,4 m ou 12 à 13 m de haut, ce qui
  // couvre « plusieurs dizaines de tonnes » et « haute comme un immeuble ».
  //   https://www.nhm.ac.uk/discover/dino-directory/brachiosaurus.html
  //   https://en.wikipedia.org/wiki/Brachiosaurus
  {
    slug: "brachiosaurus", attaque: 2, defense: 5,
    arme: "son poids colossal de plusieurs dizaines de tonnes",
    protection: "sa taille de géant, haute comme un immeuble",
    atout: "Brachiosaurus est si grand et si lourd qu’un adulte n’a sans doute presque aucun ennemi.",
  },
  // Sa queue se termine en fouet (Gilmore 1936). D'après Conti et al. (2022), le bout de la queue allait à environ
  // 100 km/h, bien moins vite que le son, et servir d'arme reste « plausible ». Son cou, plus robuste que celui
  // des autres diplodocidés, a peut-être servi au combat (préprint de Taylor et al. 2015). Attaque de 5 pour le
  // coup de queue-fouet, défense de 5 pour sa masse (16 à 38 t selon les estimations, 25 t dans la fiche).
  //   https://en.wikipedia.org/wiki/Apatosaurus
  //   https://peerj.com/preprints/1347
  //   https://pmc.ncbi.nlm.nih.gov/articles/PMC9732322
  {
    slug: "apatosaurus", attaque: 5, defense: 5,
    arme: "sa queue en fouet et son cou très massif",
    protection: "son corps colossal d’environ 25 tonnes",
    atout: "Apatosaurus a un cou plus épais et plus solide que celui de Diplodocus, peut-être pour se battre.",
  },
  // Le NHM dit que sa queue en fouet lui servait à se défendre, et Conti et al. (2022) jugent cet usage plausible.
  // Attaque de 5 pour le coup de queue-fouet. Il a aussi une grande griffe au pouce (d'après les descriptions
  // anatomiques, pas le NHM), mais on ignore à quoi elle servait. Défense de 4 : il est très long mais plus léger
  // que ses cousins (15 t). La queue « supersonique » de la fiche est réfutée (environ 30 m/s), donc on ne la
  // reprend pas.
  //   https://www.nhm.ac.uk/discover/dino-directory/diplodocus.html
  //   https://pmc.ncbi.nlm.nih.gov/articles/PMC9732322
  //   https://en.wikipedia.org/wiki/Diplodocus
  {
    slug: "diplodocus", attaque: 5, defense: 4,
    arme: "sa longue queue en forme de fouet",
    protection: "sa taille immense de 26 mètres de long",
    atout: "Diplodocus a une très longue queue, fine au bout comme un fouet, sûrement utile pour se défendre.",
  },
  // Le NHM confirme une grande griffe de pouce, qui servait peut-être à se défendre ou à attraper la nourriture,
  // comme le dit la fiche. Filek et al. (2025) montrent que sa queue était très souple et qu'un coup de fouet
  // aurait peut-être pu repousser de petits ou moyens théropodes, mais ils présentent cela comme une hypothèse.
  // Attaque de 5 pour les griffes de mains. Défense de 2 et protection null : il n'a pas d'armure et il est bien
  // plus petit que les vrais sauropodes.
  //   https://www.nhm.ac.uk/discover/dino-directory/plateosaurus.html
  //   https://pmc.ncbi.nlm.nih.gov/articles/PMC12092109/
  {
    slug: "plateosaurus", attaque: 5, defense: 2,
    arme: "ses grosses griffes de pouce en forme de crochet",
    protection: null,
    atout: "Plateosaurus a une queue très souple, peut-être utile pour fouetter les petits prédateurs.",
  },
];
