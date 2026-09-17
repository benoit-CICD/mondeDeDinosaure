export const site = {
  nom: "Le Monde des Dinosaures",
  slogan: "L’encyclopédie des dinosaures pour les explorateurs curieux",
  description:
    "Découvre les dinosaures en t’amusant : fiches illustrées, frise du temps, quiz, puzzles et mini-jeux. Un site éducatif gratuit pour les enfants de 7 à 12 ans.",
  lang: "fr",
  auteur: "[À COMPLÉTER : nom de l’éditeur]",
  email: "[À COMPLÉTER : adresse e-mail de contact]",

  // Hébergeur, à faire figurer dans les mentions légales (obligation LCEN).
  // Vérifier l'adresse sur https://github.com/contact au moment de la publication.
  hebergeur: "GitHub, Inc.",
  hebergeurAdresse: "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis",
  hebergeurContact: "https://support.github.com",

  // Adresse publique du site. Sert au sitemap et à robots.txt.
  url: "https://benoit-cicd.github.io/mondeDeDinosaure",

  // Chemin de base du site sur le serveur.
  //   "/mondeDeDinosaure/" → GitHub Pages dans un sous-dossier (cas actuel)
  //   "/"                  → site à la racine d'un domaine
  // Utilisé uniquement par la page 404 : celle-ci peut être servie depuis
  // n'importe quelle URL inexistante, y compris un sous-dossier, donc ses
  // chemins (feuille de style, scripts, liens) doivent être absolus.
  racine: "/mondeDeDinosaure/",

  anneeCreation: 2026,
};

export const periodes = [
  {
    slug: "trias",
    nom: "Trias",
    debut: 252, fin: 201,
    emoji: "🌋",
    couleur: "#c86b3c",
    resume: "La Terre sort de la plus grande catastrophe de son histoire. Les premiers dinosaures apparaissent, encore petits et discrets.",
    paragraphes: [
      "Il y a 252 millions d’années, une extinction gigantesque a fait disparaître presque toute la vie sur Terre. Les survivants se partagent une planète vide : c’est le début du Trias.",
      "À cette époque, tous les continents sont collés ensemble en un seul supercontinent appelé la Pangée. Au centre s’étend un désert brûlant où presque rien ne pousse.",
      "Les premiers dinosaures apparaissent il y a environ 230 millions d’années. Ils sont petits, légers, et marchent sur deux pattes. Ils ne sont pas encore les maîtres du monde : ce sont d’autres reptiles qui dominent.",
      "À la fin du Trias, une nouvelle extinction élimine beaucoup de leurs concurrents. La voie est libre pour les dinosaures !",
    ],
    climat: "Chaud et très sec, avec un immense désert au centre de la Pangée.",
    plantes: "Fougères, prêles, conifères. Aucune fleur n’existe encore.",
    fait: "Il n’y avait qu’un seul continent : la Pangée. On pouvait traverser la Terre à pied !",
  },
  {
    slug: "jurassique",
    nom: "Jurassique",
    debut: 201, fin: 145,
    emoji: "🌿",
    couleur: "#3f8f6c",
    resume: "L’âge des géants. Les sauropodes atteignent des tailles folles et les premiers oiseaux prennent leur envol.",
    paragraphes: [
      "La Pangée se fissure et commence à se séparer. La mer s’engouffre dans les brèches, le climat devient humide et des forêts luxuriantes recouvrent la planète.",
      "Avec autant de nourriture, les herbivores grandissent énormément. C’est l’âge d’or des sauropodes : Diplodocus, Brachiosaurus, Apatosaurus…",
      "Pour chasser des proies aussi grosses, les carnivores grandissent aussi. Allosaurus devient le prédateur numéro un des plaines américaines.",
      "Un événement discret change tout : de petits dinosaures à plumes apprennent à planer. Archaeopteryx annonce la naissance des oiseaux.",
    ],
    climat: "Chaud et humide, comme une serre tropicale géante.",
    plantes: "Immenses forêts de conifères, ginkgos, cycas et fougères arborescentes.",
    fait: "Les oiseaux sont nés au Jurassique : ce sont les seuls dinosaures encore vivants aujourd’hui.",
  },
  {
    slug: "cretace",
    nom: "Crétacé",
    debut: 145, fin: 66,
    emoji: "🌸",
    couleur: "#9e4f8f",
    resume: "Les fleurs apparaissent, les dinosaures se diversifient comme jamais… puis une météorite met fin à leur règne.",
    paragraphes: [
      "Les continents ressemblent de plus en plus à ceux d’aujourd’hui. Séparés par les océans, les dinosaures évoluent différemment sur chaque terre : c’est la période où ils sont les plus variés.",
      "Grande nouveauté : les plantes à fleurs apparaissent ! Avec elles arrivent les abeilles et une multitude d’insectes. Les paysages se colorent enfin.",
      "C’est l’époque des superstars : Tyrannosaurus rex, Triceratops, Vélociraptor, Spinosaurus, Ankylosaurus…",
      "Il y a 66 millions d’années, un astéroïde de 10 kilomètres percute le Mexique. En quelques mois, le ciel s’assombrit, les plantes meurent, et avec elles trois espèces sur quatre. Seuls les oiseaux survivent.",
    ],
    climat: "Doux et chaud, avec des saisons marquées. Pas de glace aux pôles.",
    plantes: "Premières fleurs, magnolias, figuiers, puis les premiers arbres à feuilles larges.",
    fait: "L’astéroïde a laissé un cratère de 180 km de large au Mexique : le cratère de Chicxulub.",
  },
];

export const familles = [
  { slug: "theropodes", nom: "Théropodes", emoji: "🦖", couleur: "#c0392b",
    resume: "Les carnivores à deux pattes, du minuscule Compsognathus au terrible T-rex.",
    detail: "Les théropodes marchent sur deux pattes et possèdent des os creux, comme les oiseaux. La plupart mangent de la viande, mais certains sont devenus herbivores. Et surtout : les oiseaux d’aujourd’hui sont des théropodes !" },
  { slug: "raptors", nom: "Raptors", emoji: "🪶", couleur: "#d1762f",
    resume: "Des chasseurs agiles, couverts de plumes, avec une griffe en faucille au pied.",
    detail: "On les appelle aussi dromaeosauridés. Tous portaient des plumes et une grande griffe rétractable au deuxième doigt du pied. Ce sont les plus proches cousins des oiseaux." },
  { slug: "sauropodes", nom: "Sauropodes", emoji: "🦕", couleur: "#3f7d9e",
    resume: "Les géants au long cou qui broutaient la cime des arbres.",
    detail: "Quatre pattes en colonnes, un cou immense, une petite tête et une longue queue. Ce sont les plus grands animaux terrestres de tous les temps. Ils avalaient les plantes sans mâcher." },
  { slug: "sauropodomorphes", nom: "Sauropodomorphes primitifs", emoji: "🌱", couleur: "#5f8f57",
    resume: "Les ancêtres des sauropodes, encore capables de marcher sur deux pattes.",
    detail: "Avant les géants sont venus les « presque géants » du Trias, comme Plateosaurus. Long cou déjà, mais corps plus léger et démarche bipède." },
  { slug: "thyreophores", nom: "Dinosaures blindés", emoji: "🛡️", couleur: "#7d8f3f",
    resume: "Plaques, pointes et massues : les tanks du monde des dinosaures.",
    detail: "Stégosaures et ankylosaures forment ce groupe. Tous portent des os supplémentaires dans la peau, appelés ostéodermes, qui forment une armure naturelle." },
  { slug: "ceratopsiens", nom: "Cératopsiens", emoji: "🐃", couleur: "#c95a3c",
    resume: "Cornes sur le nez, collerette derrière la tête et bec de perroquet.",
    detail: "Ces herbivores à quatre pattes vivaient en troupeaux. Leur collerette osseuse et leurs cornes servaient à se défendre, mais surtout à se reconnaître et à parader." },
  { slug: "hadrosaures", nom: "Hadrosaures", emoji: "🎺", couleur: "#e08a2f",
    resume: "Les « dinosaures à bec de canard », champions de la mastication.",
    detail: "Leur bouche contenait des centaines de dents empilées pour broyer les plantes les plus dures. Beaucoup portaient des crêtes creuses servant à produire des sons." },
  { slug: "pachycephalosaures", nom: "Pachycéphalosaures", emoji: "⛑️", couleur: "#b07a3c",
    resume: "Un crâne en dôme épais comme un casque de chantier.",
    detail: "Ces herbivores bipèdes se servaient de leur tête blindée pour se pousser et s’affronter, probablement pour choisir le chef du groupe." },
  { slug: "pterosaures", nom: "Ptérosaures", emoji: "🪁", couleur: "#e08a3c",
    resume: "Les reptiles volants. Attention : ce ne sont PAS des dinosaures !",
    detail: "Leurs ailes sont faites de peau tendue sur un doigt géant. Ils sont cousins des dinosaures, mais forment un groupe à part. Ce sont les premiers vertébrés à avoir volé.",
    cousin: true },
  { slug: "reptiles-marins", nom: "Reptiles marins", emoji: "🌊", couleur: "#2e8aa8",
    resume: "Les monstres des océans. Eux non plus ne sont pas des dinosaures !",
    detail: "Ichthyosaures, plésiosaures et mosasaures sont des reptiles retournés vivre dans la mer. Aucun dinosaure n’a jamais vécu dans l’océan.",
    cousin: true },
];

export const regimes = [
  { slug: "carnivore", nom: "Carnivore", emoji: "🥩", couleur: "#c0392b", texte: "Il mange de la viande : d’autres dinosaures, des reptiles, des mammifères." },
  { slug: "herbivore", nom: "Herbivore", emoji: "🌿", couleur: "#3f8f6c", texte: "Il ne mange que des plantes : feuilles, fougères, aiguilles de conifères." },
  { slug: "omnivore", nom: "Omnivore", emoji: "🍽️", couleur: "#d59b2f", texte: "Il mange un peu de tout : plantes, insectes, petits animaux." },
  { slug: "piscivore", nom: "Piscivore", emoji: "🐟", couleur: "#2f6fa8", texte: "Il mange surtout des poissons, qu’il pêche dans les rivières et les lacs." },
];

export const glossaire = [
  { mot: "Paléontologue", def: "Scientifique qui étudie les fossiles pour comprendre la vie du passé." },
  { mot: "Fossile", def: "Reste d’un être vivant (os, dent, coquille, empreinte) conservé dans la roche pendant des millions d’années." },
  { mot: "Extinction", def: "Disparition définitive d’une espèce ou d’un groupe d’espèces." },
  { mot: "Pangée", def: "Le supercontinent unique qui regroupait toutes les terres au Trias." },
  { mot: "Prédateur", def: "Animal qui chasse d’autres animaux pour se nourrir." },
  { mot: "Proie", def: "Animal chassé et mangé par un prédateur." },
  { mot: "Herbivore", def: "Animal qui se nourrit uniquement de plantes." },
  { mot: "Carnivore", def: "Animal qui se nourrit de viande." },
  { mot: "Charognard", def: "Animal qui mange des animaux déjà morts, sans les avoir chassés." },
  { mot: "Gastrolithe", def: "Caillou avalé volontairement par un animal pour broyer la nourriture dans son estomac." },
  { mot: "Ostéoderme", def: "Plaque d’os située dans la peau, qui forme une armure naturelle." },
  { mot: "Théropode", def: "Groupe de dinosaures bipèdes aux os creux, dont font partie les oiseaux." },
  { mot: "Sauropode", def: "Groupe de dinosaures herbivores géants au très long cou." },
  { mot: "Ptérosaure", def: "Reptile volant de l’ère des dinosaures. Ce n’est pas un dinosaure." },
  { mot: "Astéroïde", def: "Gros rocher qui voyage dans l’espace. Celui de Chicxulub a mis fin au règne des dinosaures." },
  { mot: "Mésozoïque", def: "L’ère des dinosaures, de −252 à −66 millions d’années. Elle contient le Trias, le Jurassique et le Crétacé." },
  { mot: "Espèce", def: "Groupe d’êtres vivants qui se ressemblent et peuvent avoir des petits ensemble." },
  { mot: "Coprolithe", def: "Crotte fossilisée ! Elle renseigne sur ce que l’animal mangeait." },
];

export const faq = [
  { q: "Est-ce que les dinosaures ont vraiment existé ?", r: "Oui, absolument ! On a retrouvé des milliers de squelettes, d’empreintes de pas, d’œufs et même de crottes fossilisées partout dans le monde." },
  { q: "Pourquoi ont-ils disparu ?", r: "Il y a 66 millions d’années, un astéroïde de 10 km de large a frappé le Mexique. La poussière a caché le Soleil pendant des mois, les plantes sont mortes, puis les herbivores, puis les carnivores." },
  { q: "Les dinosaures ont-ils vraiment tous disparu ?", r: "Non ! Les oiseaux sont des dinosaures. Quand tu vois un moineau, tu regardes un dinosaure vivant." },
  { q: "Les humains ont-ils connu les dinosaures ?", r: "Jamais. 66 millions d’années séparent le dernier T-rex du premier humain. C’est une durée presque impossible à imaginer." },
  { q: "Les dinosaures avaient-ils des plumes ?", r: "Beaucoup en avaient, surtout les petits carnivores et les raptors. Les plumes servaient à tenir chaud et à parader bien avant de servir à voler." },
  { q: "Quelle couleur avaient les dinosaures ?", r: "On ne le sait que pour quelques-uns, comme Microraptor (noir irisé), grâce aux traces microscopiques de pigments dans leurs plumes fossilisées." },
  { q: "Peut-on recréer un dinosaure comme dans les films ?", r: "Non. L’ADN se détruit complètement en moins d’un million d’années, bien trop vite pour qu’il en reste après 66 millions d’années." },
  { q: "Le T-rex était-il le plus grand carnivore ?", r: "Non : Spinosaurus était plus long (15 m contre 12 m). Mais le T-rex restait le plus massif et le plus puissant mordeur." },
];
