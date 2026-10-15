// Les dinosaures au cinéma : la frise des films, les erreurs des films
// et les questions du « Quiz du cinéma ».
//
// Faits vérifiés avant écriture (voir README, « Sources et exactitude »).
// Quand les sources divergent (poids du T-rex robot, minutes d'images de
// synthèse), on garde le chiffre le plus cité et on écrit « environ ».

/* Les pages de la rubrique, dans l'ordre du menu. Le menu de l'en-tête,
   le plan du site et la navigation interne en dépendent. */
export const pagesRubriqueCinema = [
  { chemin: "cinema.html", emoji: "🎬", nom: "Les dinosaures au cinéma", court: "La rubrique" },
  { chemin: "cinema/histoire.html", emoji: "🎞️", nom: "Un siècle de dinosaures à l’écran", court: "L’histoire" },
  { chemin: "cinema/effets-speciaux.html", emoji: "🤖", nom: "Comment fait-on bouger un dinosaure ?", court: "Les effets spéciaux" },
  { chemin: "cinema/film-ou-realite.html", emoji: "🔬", nom: "Film ou réalité ?", court: "Les erreurs des films" },
];


/* ---------- Un siècle de dinosaures à l'écran ---------- */
export const films = [
  { annee: 1914, emoji: "✏️", titre: "Gertie le dinosaure", genre: "Dessin animé",
    texte: "Winsor McCay dessine à la main, image après image, un sauropode farceur qui salue le public. C’est l’un des tout premiers dessins animés avec un personnage qui a du caractère." },
  { annee: 1925, emoji: "🗺️", titre: "Le Monde perdu", genre: "Film muet",
    texte: "D’après le roman d’Arthur Conan Doyle, le père de Sherlock Holmes. Willis O’Brien anime des figurines de dinosaures image par image : c’est la première fois dans un long métrage." },
  { annee: 1933, emoji: "🦍", titre: "King Kong", genre: "Film",
    texte: "Sur l’île du grand singe vivent aussi des dinosaures. Willis O’Brien perfectionne sa technique : le combat entre Kong et un tyrannosaure impressionne encore aujourd’hui." },
  { annee: 1940, emoji: "🎻", titre: "Fantasia", genre: "Dessin animé Disney",
    texte: "Sur une musique de Stravinsky, Disney raconte la vie sur Terre jusqu’à la fin des dinosaures. Des paléontologues ont été consultés… mais le combat entre le T-rex et le Stégosaure est impossible !" },
  { annee: 1954, emoji: "🇯🇵", titre: "Godzilla", genre: "Film japonais",
    texte: "Un monstre géant sort de la mer. Il ressemble à un dinosaure, mais c’est une créature inventée, jouée par un acteur dans un costume au milieu de maquettes de villes." },
  { annee: 1966, emoji: "🪨", titre: "Un million d’années avant J.-C.", genre: "Film",
    texte: "Ray Harryhausen, le grand maître de l’animation image par image, fait combattre des hommes préhistoriques et des dinosaures. Spectaculaire, mais complètement faux : ils ne se sont jamais croisés." },
  { annee: 1988, emoji: "🌿", titre: "Le Petit Dinosaure et la Vallée des merveilles", genre: "Dessin animé",
    texte: "Petit-Pied, un jeune « Long-cou », cherche la Vallée des merveilles avec ses amis. Le film a eu tellement de succès qu’il a eu plus d’une dizaine de suites." },
  { annee: 1993, emoji: "🦖", titre: "Jurassic Park", genre: "Film de Steven Spielberg",
    texte: "Des robots géants et les premières images de synthèse vraiment réalistes : pour beaucoup de spectateurs, les dinosaures semblaient vivants. Le film gagne trois Oscars." },
  { annee: 1995, emoji: "🧸", titre: "Toy Story", genre: "Dessin animé Pixar",
    texte: "Premier long métrage entièrement fait par ordinateur. Parmi les jouets d’Andy, Rex, un tyrannosaure en plastique… qui a peur de tout !" },
  { annee: 1999, emoji: "📺", titre: "Sur la terre des dinosaures", genre: "Documentaire de la BBC",
    texte: "Pour la première fois, des dinosaures sont filmés comme des animaux sauvages dans un documentaire animalier, avec des scientifiques pour vérifier chaque détail." },
  { annee: 2009, emoji: "🧊", titre: "L’Âge de glace 3", genre: "Dessin animé",
    texte: "Sid le paresseux adopte trois bébés T-rex et les mammouths découvrent un monde de dinosaures sous la glace. Très drôle… mais 65 millions d’années séparent les deux !" },
  { annee: 2015, emoji: "☄️", titre: "Le Voyage d’Arlo et Jurassic World", genre: "Deux films",
    texte: "Chez Pixar, l’astéroïde rate la Terre et Arlo, un jeune apatosaure, se lie d’amitié avec un petit humain. Au cinéma, Jurassic World ouvre un nouveau parc avec un dinosaure inventé : l’Indominus rex." },
  { annee: 2019, emoji: "🇫🇷", titre: "Gigantosaurus", genre: "Série d’animation",
    texte: "Un studio français adapte les livres de Jonny Duddle : quatre petits dinosaures partent à la recherche du terrible Giganto." },
  { annee: 2022, emoji: "🪶", titre: "Planète préhistorique", genre: "Documentaire",
    texte: "Raconté en anglais par David Attenborough, il montre des dinosaures à plumes, des parades et des nids, en suivant les dernières découvertes. La même année, Jurassic World : Le Monde d’après ajoute enfin des plumes à quelques dinosaures." },
];

/* ---------- Les techniques pour faire bouger un dinosaure ---------- */
export const techniques = [
  { emoji: "✏️", nom: "Le dessin animé", exemple: "Gertie le dinosaure, Le Petit Dinosaure",
    texte: "On dessine chaque mouvement sur une feuille différente, en changeant un tout petit peu la position. Projetées très vite, environ 24 images par seconde, les images donnent l’illusion du mouvement." },
  { emoji: "📷", nom: "L’animation image par image", exemple: "Le Monde perdu, King Kong",
    texte: "On photographie une figurine, on la bouge d’un millimètre, on reprend une photo… et on recommence des milliers de fois. Une seule seconde de film demande une vingtaine de photos !" },
  { emoji: "🦎", nom: "De vrais lézards déguisés", exemple: "Tumak, fils de la jungle (1940)",
    texte: "On colle des cornes et des crêtes sur des lézards et des petits crocodiles, puis on les filme en gros plan devant des maquettes. Les animaux souffraient beaucoup : on ne fait plus jamais ça aujourd’hui." },
  { emoji: "🎭", nom: "L’acteur en costume", exemple: "Godzilla",
    texte: "Un acteur enfile un costume très lourd et marche au milieu de maquettes de villes. Filmées de près, les maquettes semblent immenses." },
  { emoji: "🤖", nom: "L’animatronique", exemple: "Jurassic Park",
    texte: "Un robot recouvert de fausse peau, mû par des moteurs et des pistons. Le T-rex de Jurassic Park mesurait 12 mètres et pesait environ 4 tonnes, autant qu’un éléphant !" },
  { emoji: "💻", nom: "Les images de synthèse", exemple: "Jurassic World, Planète préhistorique",
    texte: "Le dinosaure est fabriqué dans un ordinateur : squelette, muscles, peau, plumes. Des animateurs le font bouger en s’inspirant des animaux d’aujourd’hui, puis on l’ajoute aux images filmées." },
];

/* ---------- Le cinéma s'est-il trompé ? ----------
   verdict : "faux" (erreur du film), "vrai" (le film a raison), "doute" (on ne sait pas). */
export const mythes = [
  { film: "Le Vélociraptor est aussi grand qu’un humain et n’a pas de plumes.", verdict: "faux", lien: "dinosaures/velociraptor.html",
    vrai: "Le vrai Vélociraptor avait la taille d’une grosse dinde et était couvert de plumes. Les « raptors » des films ressemblent plutôt à son cousin américain, le Deinonychus." },
  { film: "Le Dilophosaurus est petit, déploie une collerette et crache du venin.", verdict: "faux", lien: "dinosaures/dilophosaurus.html",
    vrai: "Le vrai mesurait environ 7 mètres. Aucun fossile ne montre de collerette, et rien ne prouve qu’il crachait du venin : c’est une invention pour le spectacle." },
  { film: "Le T-rex ne voit pas ce qui ne bouge pas.", verdict: "faux", lien: "dinosaures/tyrannosaurus.html",
    vrai: "Un chercheur a étudié la forme de son crâne : ses yeux regardaient vers l’avant et il voyait en relief, sans doute mieux qu’un faucon. Rester immobile ne t’aurait pas sauvé !" },
  { film: "On peut recréer des dinosaures avec l’ADN trouvé dans un moustique pris dans l’ambre.", verdict: "faux",
    vrai: "L’ADN se détruit complètement en moins d’un million d’années. Après 66 millions d’années, il n’en reste plus rien, même dans l’ambre." },
  { film: "Des hommes préhistoriques chassent les dinosaures.", verdict: "faux", lien: "frise.html",
    vrai: "Environ 66 millions d’années séparent les derniers dinosaures (sauf les oiseaux) des premiers humains. Ils ne se sont jamais rencontrés." },
  { film: "Les mammouths et les dinosaures vivent ensemble.", verdict: "faux", lien: "glaciations.html",
    vrai: "Le mammouth laineux est apparu plus de 65 millions d’années après la disparition des dinosaures." },
  { film: "Le T-rex se bat contre un Stégosaure (Fantasia) ou contre un Spinosaurus (Jurassic Park III).", verdict: "faux",
    vrai: "Le Stégosaure a disparu plus de 75 millions d’années avant l’arrivée du T-rex. Et le Spinosaurus vivait en Afrique, environ 25 millions d’années avant lui." },
  { film: "Un reptile volant attrape un humain et l’emporte dans les airs.", verdict: "faux", lien: "familles/pterosaures.html",
    vrai: "Les ptérosaures ne pouvaient pas saisir de proies avec leurs pattes, comme le font les aigles. Et attention : ce ne sont pas des dinosaures, mais des cousins." },
  { film: "Le Mosasaure est un dinosaure marin géant.", verdict: "faux", lien: "dinosaures/mosasaurus.html",
    vrai: "C’est un reptile marin, cousin des varans, pas un dinosaure. Il mesurait jusqu’à 17 mètres environ : un géant des mers, oui… mais pas un dinosaure !" },
  { film: "Le Brachiosaure mâche les feuilles comme une vache.", verdict: "faux", lien: "dinosaures/brachiosaurus.html",
    vrai: "Les sauropodes ne mâchaient pas : ils arrachaient les feuilles et les avalaient tout rond. Leur estomac faisait le reste du travail." },
  { film: "Les dinosaures rugissent comme des lions.", verdict: "doute",
    vrai: "Les sons ne se fossilisent pas : personne ne connaît leur cri. Certains scientifiques pensent qu’ils grondaient bouche fermée, un peu comme les crocodiles ou les autruches." },
  { film: "Le T-rex est énorme, lourd et a de toutes petites mains.", verdict: "vrai", lien: "dinosaures/tyrannosaurus.html",
    vrai: "Là, le cinéma a raison ! 12 mètres de long, environ 8 tonnes et des bras courts mais très musclés." },
  { film: "Les oiseaux sont les descendants des dinosaures.", verdict: "vrai", lien: "extinction.html",
    vrai: "Le héros de Jurassic Park l’explique déjà en 1993, et c’est exact : les oiseaux sont des dinosaures, les seuls à avoir survécu à l’astéroïde." },
];

/* ---------- Le quiz du cinéma ----------
   Même format que le grand quiz : la bonne réponse est toujours à l'index 0,
   le jeu mélange les propositions. Chaque partie pose 20 questions. */
export const quizCinema = {
  facile: [
    { q: "Dans Toy Story, comment s’appelle le dinosaure en plastique qui a peur de tout ?", r: ["Rex", "Woody", "Buzz", "Arlo"], e: "Rex est un tyrannosaure en jouet. Il est grand, il a des dents… et il est le plus peureux de la bande !" },
    { q: "Dans Peppa Pig, comment s’appelle le dinosaure en peluche de George ?", r: ["Monsieur Dinosaure", "Monsieur Lapin", "Petit Rex", "Dino Vert"], e: "George ne le quitte jamais. Il lui a été offert par Papi et Mamie Pig quand il était bébé." },
    { q: "Dans Jurassic Park, où les scientifiques trouvent-ils l’ADN des dinosaures ?", r: ["Dans un moustique piégé dans l’ambre", "Dans une dent de T-rex", "Dans un œuf congelé", "Dans une plume"], e: "Le moustique aurait piqué un dinosaure avant d’être piégé dans la résine. Belle idée… mais impossible en vrai : l’ADN ne dure pas aussi longtemps." },
    { q: "Comment s’appelle le héros du dessin animé Le Petit Dinosaure et la Vallée des merveilles ?", r: ["Petit-Pied", "Grand-Cou", "Arlo", "Rex"], e: "Petit-Pied est un « Long-cou », c’est-à-dire un sauropode, comme le Diplodocus." },
    { q: "Dans Le Petit Dinosaure, Cera est une « Trois-cornes ». Quel vrai dinosaure est-ce ?", r: ["Un Tricératops", "Un Stégosaure", "Un Diplodocus", "Un Vélociraptor"], e: "Tricératops veut dire « tête à trois cornes » : deux grandes au-dessus des yeux et une petite sur le nez." },
    { q: "Dans Le Voyage d’Arlo, qu’arrive-t-il à l’astéroïde ?", r: ["Il rate la Terre", "Il tombe sur la Lune", "Il est détruit par une fusée", "Il tombe dans la mer"], e: "Le film imagine un monde où les dinosaures n’ont jamais disparu. En vrai, l’astéroïde a frappé le Mexique il y a 66 millions d’années." },
    { q: "Arlo, le héros du Voyage d’Arlo, est un dinosaure…", r: ["à long cou, un apatosaure", "carnivore, un T-rex", "à trois cornes", "volant"], e: "L’Apatosaure est un grand sauropode du Jurassique, cousin du Diplodocus. Il mangeait des plantes." },
    { q: "Dans L’Âge de glace 3, Sid le paresseux adopte…", r: ["trois bébés T-rex", "trois bébés mammouths", "un bébé ptérodactyle", "un œuf de poule"], e: "C’est très drôle, mais impossible : 65 millions d’années séparent les mammouths des derniers dinosaures." },
    { q: "Dans les dessins animés, on voit des dinosaures et des mammouths ensemble. Est-ce possible ?", r: ["Non, ils ne se sont jamais croisés", "Oui, ils étaient amis", "Oui, mais seulement au pôle Nord", "Oui, les mammouths mangeaient les dinosaures"], e: "Les mammouths laineux sont apparus il y a quelques centaines de milliers d’années seulement, bien après les dinosaures." },
    { q: "Les humains et les dinosaures ont-ils vécu à la même époque, comme dans certains films ?", r: ["Non, jamais", "Oui, ils les chassaient", "Oui, ils les domestiquaient", "Seulement au Moyen Âge"], e: "Il s’est écoulé environ 66 millions d’années entre les derniers dinosaures et les premiers humains. Sauf les oiseaux, bien sûr !" },
    { q: "Dans La Nuit au musée, que fait le squelette de T-rex quand il se réveille ?", r: ["Il joue à rapporter un os, comme un chien", "Il chante une chanson", "Il garde la porte du musée", "Il reste endormi"], e: "Un énorme squelette qui joue comme un chiot : c’est l’une des scènes les plus drôles du film." },
    { q: "Comment s’appelle le parc de dinosaures imaginé par Steven Spielberg en 1993 ?", r: ["Jurassic Park", "Dino Land", "Crétacé Parc", "Raptor World"], e: "Le nom vient du Jurassique, la deuxième des trois périodes des dinosaures." },
    { q: "Dans Jurassic Park, quel dinosaure poursuit la jeep ?", r: ["Le T-rex", "Le Tricératops", "Le Brachiosaure", "Le Stégosaure"], e: "Une scène célèbre ! En vrai, le T-rex courait sans doute à 20 ou 25 km/h : une jeep l’aurait facilement semé." },
    { q: "Dans Jurassic Park, qu’est-ce qui tremble quand le T-rex approche ?", r: ["Un verre d’eau", "Une cloche", "Un lustre", "La télévision"], e: "Des petits cercles apparaissent dans l’eau à chaque pas : on sent le danger avant même de voir le dinosaure." },
    { q: "Quel métier fait Alan Grant, le héros de Jurassic Park ?", r: ["Paléontologue", "Vétérinaire", "Pilote d’hélicoptère", "Cuisinier"], e: "Comme les scientifiques de la page « Le métier de paléontologue », il fouille la terre pour trouver des fossiles." },
    { q: "Dans les films, le Vélociraptor est aussi grand qu’un humain. En vrai, il était grand comme…", r: ["une grosse dinde", "un cheval", "un éléphant", "une souris"], e: "Environ 2 mètres de long, dont la moitié de queue, et 15 kilos. Les films l’ont beaucoup agrandi !" },
    { q: "Dans Jurassic Park, les Vélociraptors ont la peau nue. Et en vrai ?", r: ["Ils avaient des plumes", "Ils avaient des poils", "Ils avaient une carapace", "Ils avaient la peau nue aussi"], e: "On a trouvé sur ses os les petites bosses où s’accrochaient les plumes, comme chez les oiseaux." },
    { q: "Dans Jurassic World, comment s’appelle le Vélociraptor dressé par Owen ?", r: ["Blue", "Rexy", "Petit-Pied", "Gertie"], e: "Blue est la plus intelligente de la meute. Dresser un vrai raptor ? Personne ne peut le savoir !" },
    { q: "Dans Jurassic World, d’où vient l’Indominus rex ?", r: ["Il a été inventé et fabriqué en laboratoire", "On l’a découvert en Argentine", "C’est le père du T-rex", "Il a vraiment existé au Trias"], e: "C’est un monstre imaginaire : il n’a jamais existé. Tu ne le trouveras dans aucun musée !" },
    { q: "Dans Jurassic World, le Mosasaure saute hors de l’eau pour attraper un requin. Est-ce un dinosaure ?", r: ["Non, c’est un reptile marin", "Oui, un dinosaure nageur", "Non, c’est une baleine", "Non, c’est un poisson"], e: "Aucun dinosaure ne vivait dans la mer. Le Mosasaure est un cousin des varans et des lézards." },
    { q: "Dans les films, des reptiles volants attaquent les héros. Sont-ils des dinosaures ?", r: ["Non, ce sont des ptérosaures", "Oui, des dinosaures volants", "Non, ce sont des chauves-souris", "Oui, des oiseaux géants"], e: "Les ptérosaures sont des cousins des dinosaures qui volaient avec des ailes de peau. Ils forment un groupe à part." },
    { q: "Dans le dessin animé Gigantosaurus, qui les quatre petits dinosaures cherchent-ils ?", r: ["Giganto, le plus grand dinosaure", "Leur maman", "Un trésor caché", "Le Père Noël"], e: "Le vrai s’écrit Giganotosaurus. Il vivait en Argentine et était aussi long que le T-rex !" },
    { q: "Godzilla est-il un vrai dinosaure ?", r: ["Non, c’est un monstre inventé", "Oui, il vivait au Japon", "Oui, c’est un T-rex géant", "Oui, il vivait dans la mer"], e: "Godzilla ressemble un peu à un dinosaure, mais c’est une créature imaginaire née au cinéma japonais en 1954." },
    { q: "Un robot géant recouvert de fausse peau, qui bouge grâce à des moteurs, c’est…", r: ["un animatronique", "un hologramme", "une marionnette à doigt", "un dessin animé"], e: "Le T-rex de Jurassic Park était un animatronique de 12 mètres. Il était si lourd qu’il fallait des pistons hydrauliques pour le bouger !" },
    { q: "Comment appelle-t-on la technique où l’on photographie une figurine, la bouge un peu, puis reprend une photo ?", r: ["L’animation image par image", "Le dessin animé", "Le direct", "La radio"], e: "Il faut une vingtaine de photos pour faire une seule seconde de film. Quelle patience !" },
    { q: "Connaît-on le vrai cri des dinosaures ?", r: ["Non, les sons ne se fossilisent pas", "Oui, grâce à des enregistrements", "Oui, il est écrit dans les livres anciens", "Oui, les oiseaux l’imitent parfaitement"], e: "Au cinéma, les bruiteurs mélangent des cris d’animaux d’aujourd’hui pour inventer les rugissements." },
    { q: "Dans les documentaires comme Planète préhistorique, les dinosaures sont…", r: ["fabriqués à l’ordinateur, d’après les fossiles", "filmés avec des caméras cachées", "joués par des acteurs déguisés", "de vrais animaux d’un zoo secret"], e: "Les animateurs travaillent avec des paléontologues pour que chaque plume et chaque mouvement soient le plus juste possible." },
  ],

  difficile: [
    { q: "Quel est l’un des tout premiers dessins animés avec un dinosaure, sorti en 1914 ?", r: ["Gertie le dinosaure", "Fantasia", "Le Monde perdu", "King Kong"], e: "Winsor McCay a dessiné Gertie à la main, image après image. Sur scène, il faisait semblant de lui parler pendant la projection !" },
    { q: "Qui a écrit le roman Le Monde perdu (1912), où des explorateurs découvrent des dinosaures vivants ?", r: ["Arthur Conan Doyle", "Jules Verne", "Michael Crichton", "Victor Hugo"], e: "C’est aussi l’inventeur de Sherlock Holmes. Son héros, le professeur Challenger, part en Amérique du Sud." },
    { q: "Dans quel roman de Jules Verne voit-on deux reptiles marins géants se battre ?", r: ["Voyage au centre de la Terre", "Vingt mille lieues sous les mers", "Le Tour du monde en 80 jours", "De la Terre à la Lune"], e: "En 1864, les héros assistent au combat d’un ichthyosaure et d’un plésiosaure sur une mer souterraine." },
    { q: "Avec quelle technique Willis O’Brien a-t-il animé les dinosaures du Monde perdu (1925) et de King Kong (1933) ?", r: ["L’animation image par image de figurines", "Les images de synthèse", "Des acteurs en costume", "Des lézards déguisés"], e: "Des figurines articulées déplacées d’un millimètre entre chaque photo. Des mois de travail pour quelques minutes de film !" },
    { q: "Dans Tumak, fils de la jungle (1940), les « dinosaures » étaient en réalité…", r: ["de vrais lézards déguisés, filmés en gros plan", "des robots", "des dessins collés sur l’image", "des figurines en pâte à modeler"], e: "On leur collait des crêtes et des cornes. Les animaux souffraient : aujourd’hui, ce serait interdit." },
    { q: "Dans Fantasia (1940), un T-rex combat un Stégosaure. Quelle est l’erreur ?", r: ["Ils ont vécu à plus de 75 millions d’années d’écart", "Le Stégosaure était carnivore", "Le T-rex vivait dans l’eau", "Il n’y a aucune erreur"], e: "Le Stégosaure a disparu il y a environ 145 millions d’années, le T-rex est apparu vers −68 millions d’années." },
    { q: "Quel maître de l’animation image par image a créé les dinosaures d’Un million d’années avant J.-C. (1966) ?", r: ["Ray Harryhausen", "Walt Disney", "Steven Spielberg", "Hayao Miyazaki"], e: "Ses créatures ont inspiré des générations de cinéastes, dont les créateurs des dinosaures de Jurassic Park." },
    { q: "De quel pays vient le film Godzilla (1954) ?", r: ["Du Japon", "Des États-Unis", "De France", "D’Australie"], e: "Le studio japonais Toho a créé Godzilla. Il était joué par un acteur dans un costume au milieu de maquettes." },
    { q: "Qui a écrit le roman Jurassic Park, publié en 1990 ?", r: ["Michael Crichton", "Steven Spielberg", "Arthur Conan Doyle", "J. K. Rowling"], e: "Steven Spielberg a adapté son livre au cinéma trois ans plus tard." },
    { q: "Quel paléontologue a conseillé l’équipe de Jurassic Park ?", r: ["Jack Horner", "Mary Anning", "Charles Darwin", "Richard Owen"], e: "C’est lui qui a découvert les nids de Maiasaura dans le Montana. Il a poussé l’équipe à faire bouger les raptors comme des oiseaux." },
    { q: "Les « Vélociraptors » de Jurassic Park ressemblent surtout à quel dinosaure ?", r: ["Le Deinonychus", "Le Compsognathus", "Le Gallimimus", "L’Archaeopteryx"], e: "Le Deinonychus, un raptor américain d’environ 3 mètres, est bien plus grand que le vrai Vélociraptor." },
    { q: "Quel raptor géant, décrit en 1993, avait à peu près la taille des raptors du film ?", r: ["L’Utahraptor", "Le Microraptor", "L’Oviraptor", "Le Coelophysis"], e: "Il a été décrit l’année de la sortie du film. L’équipe du film s’amusait d’avoir « inventé » ce grand raptor avant même qu’on le découvre !" },
    { q: "Le Dilophosaurus de Jurassic Park crache du venin et a une collerette. Et en vrai ?", r: ["Rien ne le prouve, et il mesurait environ 7 mètres", "C’est vrai, on l’a prouvé en 2020", "Il crachait du feu", "Il n’existait pas du tout"], e: "Le film l’a rendu plus petit pour ne pas le confondre avec les raptors, et lui a inventé une collerette de lézard." },
    { q: "« Le T-rex ne voit pas ce qui ne bouge pas », dit-on dans Jurassic Park. Qu’ont montré les scientifiques ?", r: ["Il voyait très bien, et même en relief", "C’est exact", "Il était complètement aveugle", "Il ne voyait que la nuit"], e: "Ses yeux regardaient vers l’avant. Un chercheur a calculé qu’il voyait en relief sur un champ plus large qu’un faucon." },
    { q: "Avec quel cri d’animal a-t-on fabriqué le rugissement du T-rex de Jurassic Park ?", r: ["Un cri de bébé éléphant, mélangé à d’autres", "Un lion, tout seul", "La voix d’un acteur", "Un moteur de camion"], e: "Le bruiteur a aussi utilisé un alligator, un tigre et même son petit chien. Le souffle du T-rex vient d’une baleine !" },
    { q: "Les « aboiements » des raptors de Jurassic Park ont été enregistrés avec…", r: ["des tortues", "des chiens", "des chats", "des perroquets"], e: "Le bruiteur a enregistré des tortues dans un parc animalier. Il a aussi mélangé des oies, des dauphins et un cheval." },
    { q: "Comment a-t-on fait apparaître les cercles dans le verre d’eau de Jurassic Park ?", r: ["En pinçant une corde de guitare sous le verre", "En tapant sur le sol avec un marteau", "Avec un haut-parleur géant", "En soufflant sur l’eau"], e: "Le responsable des effets spéciaux a cherché pendant des semaines avant de trouver cette astuce toute simple." },
    { q: "Combien pesait environ le T-rex robot de Jurassic Park ?", r: ["Environ 4 tonnes, autant qu’un éléphant", "Environ 40 kilos", "Environ 400 kilos", "Plus de 100 tonnes"], e: "Il mesurait 12 mètres et bougeait grâce à des pistons hydrauliques. Il ne pouvait pas marcher : il était fixé sur une plateforme." },
    { q: "Dans Jurassic Park (1993), combien de temps voit-on des dinosaures en images de synthèse ?", r: ["Environ 6 minutes", "Environ 1 heure", "Environ 30 minutes", "Pendant tout le film"], e: "On voit les dinosaures environ 15 minutes en tout : 9 minutes de robots et 6 minutes d’images de synthèse." },
    { q: "Combien d’Oscars Jurassic Park a-t-il remportés ?", r: ["Trois", "Aucun", "Un seul", "Dix"], e: "Meilleurs effets visuels, meilleur son et meilleur montage sonore. Les dinosaures avaient bien mérité leurs statuettes !" },
    { q: "Dans Jurassic Park III (2001), quel dinosaure bat le T-rex ?", r: ["Le Spinosaurus", "Le Tricératops", "L’Ankylosaure", "Le Giganotosaurus"], e: "Un combat impossible : le Spinosaurus vivait en Afrique, environ 25 millions d’années avant le T-rex." },
    { q: "Quelle taille atteignait le vrai Mosasaure, la star aquatique de Jurassic World ?", r: ["Jusqu’à 17 mètres environ", "Environ 3 mètres", "Plus de 50 mètres", "Plus de 100 mètres"], e: "C’était l’un des plus grands prédateurs des mers du Crétacé. Mais ce n’est pas un dinosaure : c’est un reptile marin." },
    { q: "Dans le film Dinosaure de Disney (2000), le héros Aladar est un…", r: ["Iguanodon", "Tyrannosaure", "Vélociraptor", "Stégosaure"], e: "L’Iguanodon est l’un des tout premiers dinosaures découverts, en Angleterre, au début du XIXe siècle." },
    { q: "Dans Le Petit Dinosaure (1988), Petit-Pied est un « Long-cou ». À quelle famille appartient-il ?", r: ["Les sauropodes", "Les théropodes", "Les cératopsiens", "Les ptérosaures"], e: "Les sauropodes sont les géants à long cou et longue queue, comme le Diplodocus ou le Brachiosaure." },
    { q: "Dans quelle série documentaire de 1999 la BBC a-t-elle montré les dinosaures comme des animaux sauvages ?", r: ["Sur la terre des dinosaures", "Planète préhistorique", "Le Monde perdu", "Jurassic World"], e: "Une révolution : on filmait les dinosaures comme des lions dans la savane, avec une voix de narrateur." },
    { q: "Quel célèbre naturaliste raconte en anglais le documentaire Planète préhistorique (2022) ?", r: ["David Attenborough", "Jack Horner", "Steven Spielberg", "Jacques-Yves Cousteau"], e: "Ce Britannique raconte la vie des animaux à la télévision depuis plus de 70 ans." },
    { q: "Quel film de la saga Jurassic montre enfin des dinosaures à plumes, comme le Pyroraptor ?", r: ["Jurassic World : Le Monde d’après (2022)", "Jurassic Park (1993)", "Le Monde perdu : Jurassic Park (1997)", "Jurassic Park III (2001)"], e: "Près de 30 ans après le premier film, la saga suit enfin un peu mieux les découvertes des paléontologues." },
    { q: "Le Pyroraptor de Jurassic World : Le Monde d’après a vraiment existé. Où a-t-on trouvé ses fossiles ?", r: ["En France, en Provence", "En Chine", "Au Canada", "En Antarctique"], e: "Son nom veut dire « voleur de feu » : ses os ont été découverts après un incendie de forêt, en Provence." },
  ],
};
