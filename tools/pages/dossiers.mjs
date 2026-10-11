// Les dossiers thématiques : extinction, métier, œufs et bébés, ère glaciaire.

import { parSlug } from "../data/dinos.mjs";
import { oeufs } from "../data/oeufs.mjs";
import { page, carteDino } from "../templates.mjs";

export function pagesDossiers() {
  const pages = [];

  /* ---------- Dossier : l'extinction ---------- */
  pages.push({
    chemin: "extinction.html",
    html: page({
      titre: "La grande extinction",
      description: "Il y a 66 millions d’années, un astéroïde a mis fin au règne des dinosaures. Voici ce qui s’est passé, expliqué simplement aux enfants.",
      corps: `
<div class="conteneur section">
  <h1>☄️ La grande extinction</h1>
  <p class="fiche__accroche" style="max-width:66ch">Il y a 66 millions d’années, en une seule journée, le monde des dinosaures a basculé.</p>

  <div class="grille grille--deux" style="align-items:start;margin-top:2rem">
    <div class="prose">
      <h2>Le jour où tout a changé</h2>
      <p>Un astéroïde d’environ 10 kilomètres de large — la hauteur du mont Everest — a percuté la Terre à l’endroit
      où se trouve aujourd’hui la péninsule du Yucatán, au Mexique. Il filait à plus de 70 000 km/h.</p>
      <p>L’impact a creusé un cratère de 180 kilomètres de large, appelé <strong>cratère de Chicxulub</strong>.
      On peut encore le repérer aujourd’hui grâce à des mesures scientifiques, même s’il est enfoui sous la roche et la mer.</p>

      <h2>Ce qui s’est passé ensuite</h2>
      <p>Le choc a projeté dans le ciel une quantité énorme de poussière et de roches brûlantes. Pendant des mois,
      la lumière du Soleil n’a presque plus atteint le sol.</p>
      <p>Sans lumière, les plantes ne pouvaient plus pousser. Les herbivores, privés de nourriture, ont disparu les premiers.
      Puis ce fut au tour des carnivores, qui n’avaient plus rien à chasser. C’est ce qu’on appelle une réaction en chaîne.</p>
      <p>En quelques milliers d’années, environ <strong>trois espèces sur quatre</strong> ont disparu de la Terre :
      les dinosaures, mais aussi les ptérosaures, les grands reptiles marins et d’innombrables plantes et insectes.</p>

      <h2>Les survivants</h2>
      <p>Tout n’a pas disparu. Les petits animaux capables de se cacher, de manger un peu de tout et de survivre avec peu
      s’en sont mieux sortis : de petits mammifères, des crocodiles, des tortues, des grenouilles…</p>
      <p>Et surtout : un groupe de petits dinosaures à plumes a survécu. Ce sont eux qui sont devenus
      <strong>les oiseaux</strong>. Chaque fois que tu vois une mésange ou un pigeon, tu regardes un descendant direct
      des dinosaures !</p>

      <h2>Et après ?</h2>
      <p>Une fois les dinosaures disparus, la place était libre. Les mammifères, jusque-là tout petits, se sont
      diversifiés et ont grandi. Des millions d’années plus tard, c’est de cette lignée que sont nés les humains.</p>
      <p>Autrement dit : sans cet astéroïde, tu ne serais probablement pas là pour lire cette page.</p>
    </div>

    <div>
      <div class="encadre encadre--pouvoir">
        <h2 class="encadre__titre">📊 L’extinction en chiffres</h2>
        <table class="tableau-info"><tbody>
          <tr><th scope="row">Date</th><td>Il y a 66 millions d’années</td></tr>
          <tr><th scope="row">Taille de l’astéroïde</th><td>Environ 10 km de large</td></tr>
          <tr><th scope="row">Lieu de l’impact</th><td>Chicxulub, Mexique</td></tr>
          <tr><th scope="row">Cratère</th><td>180 km de diamètre</td></tr>
          <tr><th scope="row">Espèces disparues</th><td>Environ 75 %</td></tr>
          <tr><th scope="row">Survivants célèbres</th><td>Les oiseaux, les crocodiles, les tortues</td></tr>
        </tbody></table>
      </div>
      <div class="encadre encadre--attention">
        <h2 class="encadre__titre">🐦 11 000 espèces vivantes</h2>
        <p style="margin-bottom:0">C’est le nombre d’espèces d’oiseaux qui existent aujourd’hui sur Terre.
        Les dinosaures ne sont donc pas complètement éteints : ils chantent dans ton jardin !</p>
      </div>
      <div class="encadre">
        <h2 class="encadre__titre">🎮 Et si on jouait ?</h2>
        <p style="margin-bottom:0"><a class="bouton bouton--petit" href="jeux/vrai-ou-faux.html">⚖️ Vrai ou faux</a></p>
      </div>
    </div>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "La grande extinction" }],
    }),
  });

  /* ---------- Dossier : le métier ---------- */
  pages.push({
    chemin: "metier.html",
    html: page({
      titre: "Le métier de paléontologue",
      description: "Comment fait-on pour découvrir un dinosaure ? Fouilles, dégagement, moulage, étude : le métier de paléontologue expliqué aux enfants.",
      corps: `
<div class="conteneur section">
  <h1>⛏️ Comment découvre-t-on un dinosaure ?</h1>
  <p class="fiche__accroche" style="max-width:66ch">Un squelette de dinosaure ne sort pas tout monté de la terre.
  Voici les six étapes du travail des paléontologues.</p>

  <div class="frise" style="margin-top:2.5rem">
    ${[
      ["🗺️", "Choisir un endroit", "Les paléontologues étudient des cartes géologiques pour repérer des roches du bon âge. Inutile de creuser dans une roche trop jeune ou trop vieille : il n’y aura rien."],
      ["👀", "Chercher à pied", "On marche lentement, les yeux rivés au sol, à la recherche d’un éclat d’os qui dépasse. Beaucoup de grandes découvertes ont commencé par un simple caillou remarqué par hasard."],
      ["🖌️", "Dégager avec patience", "On travaille au marteau, au burin, puis au pinceau. Dégager un seul os peut prendre plusieurs semaines. Il faut noter la position exacte de chaque pièce."],
      ["🧊", "Protéger et transporter", "Les os fragiles sont enveloppés dans du plâtre, comme un bras cassé. Ces coques protègent les fossiles pendant le voyage jusqu’au laboratoire."],
      ["🔬", "Étudier au laboratoire", "On nettoie, on mesure, on scanne. Les scanners permettent de voir l’intérieur des os et même la forme du cerveau, sans rien abîmer."],
      ["🏛️", "Partager la découverte", "Les résultats sont publiés dans des revues scientifiques, puis le squelette est monté et exposé dans un musée pour que tout le monde puisse le voir."],
    ]
      .map(
        ([emoji, titre, texte], i) => `<div class="frise__jalon" data-anim style="--jalon-couleur:${["#c86b3c", "#3f8f6c", "#2f6fa8", "#9e4f8f", "#e09a2c", "#c0392b"][i]}">
      <span class="frise__point" aria-hidden="true"></span>
      <div class="frise__periode">
        <p class="frise__ages">Étape ${i + 1}</p>
        <h2 style="margin-bottom:.3rem">${emoji} ${titre}</h2>
        <p style="margin-bottom:0">${texte}</p>
      </div>
    </div>`
      )
      .join("\n    ")}
  </div>

  <div class="grille grille--deux" style="margin-top:2.5rem;align-items:start">
    <div class="encadre">
      <h2 class="encadre__titre">🧠 Comment sait-on tout ça ?</h2>
      <p>Les paléontologues ne devinent pas : ils comparent. En observant les animaux d’aujourd’hui — oiseaux,
      crocodiles, lézards — ils comprennent à quoi servaient les os et les muscles des dinosaures.</p>
      <p style="margin-bottom:0">Certaines choses restent inconnues, comme la couleur de la plupart des espèces.
      Quand les scientifiques ne savent pas, ils le disent : c’est ça, la démarche scientifique.</p>
    </div>
    <div class="encadre encadre--pouvoir">
      <h2 class="encadre__titre">🌟 Une découverte célèbre</h2>
      <p>En 1811, à Lyme Regis en Angleterre, une jeune fille de 12 ans nommée <strong>Mary Anning</strong> découvre
      le premier crâne complet d’Ichthyosaure.</p>
      <p style="margin-bottom:0">Elle deviendra l’une des plus grandes chasseuses de fossiles de l’histoire,
      alors qu’à son époque les femmes n’avaient pas le droit d’entrer dans les sociétés savantes.</p>
    </div>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Le métier de paléontologue" }],
    }),
  });

  /* ---------- Dossier : les œufs et les bébés ---------- */
  /* Trois œufs seulement, légendés par leur forme : de vrais indices pour le
     jeu « Retrouve la maman », sans en donner toutes les réponses. */
  const exemples = [
    ["sauropode", "Rond comme une balle"],
    ["oviraptor", "Allongé et coloré"],
    ["ceratopsien", "Mou comme du cuir"],
  ].map(([id, legende]) => ({ oeuf: oeufs.find((o) => o.id === id), legende }));

  pages.push({
    chemin: "oeufs.html",
    html: page({
      titre: "Œufs et bébés dinosaures",
      description: "Comment les dinosaures pondaient-ils ? Œufs ronds ou allongés, durs ou mous, nids enterrés ou couvés, bébés et parents : le dossier expliqué aux enfants.",
      corps: `
<div class="conteneur section">
  <h1>🥚 Œufs et bébés dinosaures</h1>
  <p class="fiche__accroche" style="max-width:66ch">Tous les dinosaures sortaient d’un œuf. Mais pas n’importe lequel :
  rond ou allongé, dur ou mou, enterré ou couvé… Mène l’enquête !</p>

  <div class="grille grille--deux" style="align-items:start;margin-top:2rem">
    <div class="prose">
      <h2>Tous les dinosaures pondaient des œufs</h2>
      <p>Comme les oiseaux, les crocodiles et les tortues, tous les dinosaures pondaient des œufs. Même les plus grands !
      Le géant <a href="dinosaures/argentinosaurus.html">Argentinosaurus</a>, qui pesait 70 tonnes, sortait d’un œuf
      à peine plus gros qu’un pamplemousse.</p>
      <p>Pourquoi si petit ? Le bébé respire à travers sa coquille. Un œuf géant aurait eu une coquille si épaisse
      que l’air n’aurait presque plus pu passer.</p>

      <h2>Des œufs de toutes les formes</h2>
      <ul class="oeufs-exemples" role="list">
        ${exemples
          .map(
            ({ oeuf, legende }) => `<li><img src="assets/img/oeufs/${oeuf.id}.svg" alt="" width="120" height="150" loading="lazy"><span>${legende}</span></li>`
          )
          .join("\n        ")}
      </ul>
      <p>Certains œufs étaient bien ronds, comme ceux des sauropodes et des thérizinosaures. D’autres étaient allongés,
      comme ceux de la famille d’Oviraptor.</p>
      <p>La plupart avaient une coquille dure, comme les œufs d’oiseaux. Mais en 2020, des scientifiques ont découvert
      que certains dinosaures, comme le Protoceratops, pondaient des œufs à coquille <strong>molle</strong>, comme les tortues.
      Les tout premiers dinosaures pondaient sans doute tous des œufs mous !</p>
      <p>Et la couleur ? Le plus souvent, on ne la connaît pas. Mais dans quelques coquilles fossilisées, on a retrouvé
      des traces de pigments : les œufs de certains cousins d’Oviraptor étaient <strong>bleu-vert</strong>, et ceux du
      Deinonychus <strong>bleus avec des taches brunes</strong>, comme des œufs d’oiseaux d’aujourd’hui.</p>

      <h2>Des nids très différents</h2>
      <ul>
        <li><strong>Enterrés puis abandonnés.</strong> Les sauropodes étaient bien trop lourds pour couver. Ils creusaient
        un trou, y pondaient des dizaines d’œufs, les recouvraient de terre et de plantes, puis s’en allaient.
        La chaleur du sol faisait le reste.</li>
        <li><strong>Couvés comme par une poule.</strong> Les oviraptors pondaient leurs œufs deux par deux, en cercle,
        puis s’asseyaient au milieu et les couvraient de leurs bras emplumés. Chez certaines espèces, c’était peut-être
        même le papa qui couvait !</li>
        <li><strong>En colonie.</strong> Les Maiasaura et les thérizinosaures installaient leurs nids les uns à côté des
        autres, comme les oiseaux de mer aujourd’hui. À plusieurs, on surveille mieux les œufs !</li>
      </ul>

      <h2>Des parents attentionnés ?</h2>
      <p>Pendant longtemps, on a imaginé les dinosaures comme de mauvais parents, qui pondaient puis disparaissaient.
      Deux découvertes ont tout changé.</p>
      <p>En 1978, dans le Montana, on découvre des nids de <a href="dinosaures/maiasaura.html">Maiasaura</a> remplis de
      bébés de plusieurs tailles : les petits restaient au nid, et leurs parents les nourrissaient sûrement.
      Puis, en 1993, on comprend que l’<a href="dinosaures/oviraptor.html">Oviraptor</a>, accusé de voler des œufs,
      couvait en réalité les siens.</p>
      <p>Mais tous les dinosaures n’étaient pas aussi attentionnés : beaucoup de bébés devaient se débrouiller seuls
      dès leur sortie de l’œuf.</p>

      <h2>Les bébés dinosaures</h2>
      <p>Les bébés étaient minuscules à côté de leurs parents, mais ils grandissaient très vite. Un bébé Maiasaura
      mesurait 40 centimètres à la naissance… et près d’un mètre et demi un an plus tard.</p>
      <p>Parfois, on retrouve même des bébés encore dans leur œuf : on les appelle des <strong>embryons</strong>.
      En Argentine, des embryons de sauropodes ont été découverts avec des morceaux de peau fossilisée,
      couverte de minuscules écailles !</p>
      <p>En Chine, des œufs de ptérosaures ont révélé un autre secret : à la naissance, leurs bébés savaient déjà marcher,
      mais leurs ailes n’étaient pas encore assez solides pour voler.</p>

      <h2>À qui est cet œuf ? Une vraie enquête</h2>
      <p>Trouver un œuf fossile, c’est déjà difficile. Savoir qui l’a pondu, c’est encore plus compliqué !
      Pour en être sûr, il faut retrouver un bébé à l’intérieur, ou un adulte assis sur son nid.</p>
      <p>C’est pour ça qu’on ne connaît toujours pas les œufs du T-rex, du Tricératops ou du Stégosaure.
      Les scientifiques classent donc les œufs par <strong>familles</strong>, d’après leur forme, leur taille et leur coquille.</p>

      <h2>Des œufs en France</h2>
      <p>La France est un pays d’œufs de dinosaures ! Au pied de la montagne Sainte-Victoire, près d’Aix-en-Provence,
      une réserve naturelle cache l’un des plus grands gisements d’Europe. On y trouve surtout des œufs de titanosaures,
      des sauropodes, vieux d’environ 70 millions d’années.</p>
      <p>C’est aussi en France, dans les Pyrénées, qu’un prêtre passionné de fossiles, Jean-Jacques Pouech, a décrit
      en 1859 les premiers morceaux de coquilles d’œufs de dinosaures. Il pensait alors qu’ils venaient d’un oiseau géant !</p>
      <p>Ces sites sont protégés : il est interdit d’y ramasser des fossiles.</p>
    </div>

    <div>
      <div class="encadre encadre--pouvoir">
        <h2 class="encadre__titre">📊 Les œufs en chiffres</h2>
        <table class="tableau-info"><tbody>
          <tr><th scope="row">Œufs dans un nid de Maiasaura</th><td>30 à 40</td></tr>
          <tr><th scope="row">Œufs de ptérosaures trouvés au même endroit, en Chine</th><td>215</td></tr>
          <tr><th scope="row">Bébés éclos dans une colonie de thérizinosaures</th><td>Plus de la moitié</td></tr>
          <tr><th scope="row">Premières coquilles décrites</th><td>En 1859, en France</td></tr>
          <tr><th scope="row">Œufs de T-rex connus</th><td>Aucun, pour l’instant !</td></tr>
        </tbody></table>
      </div>
      <div class="encadre" id="indices">
        <h2 class="encadre__titre">🔍 Indices pour le jeu</h2>
        <p>Dans « Retrouve la maman », tu dois rendre chaque œuf à ses parents. Quelques conseils de détective :</p>
        <ul class="indices-jeu">
          <li>Regarde d’abord la forme : ronde ou allongée ?</li>
          <li>Les géants ne pouvaient pas s’asseoir sur leurs œufs : ils les enterraient.</li>
          <li>Une coquille colorée ? Pense aux dinosaures à plumes, les cousins des oiseaux.</li>
          <li>Une coquille molle comme du cuir ? Son propriétaire enterrait ses œufs dans le sable, comme une tortue.</li>
          <li>N’oublie pas que les oiseaux sont des dinosaures…</li>
        </ul>
        <p><a class="bouton bouton--petit" href="jeux/retrouve-la-maman.html">🥚 Jouer à Retrouve la maman</a></p>
      </div>
      <div class="encadre encadre--attention">
        <h2 class="encadre__titre">⚠️ Attention aux intrus</h2>
        <p>Tous les animaux de l’époque ne pondaient pas ! Les ichthyosaures et les mosasaures, qui vivaient en pleine mer,
        donnaient naissance à des bébés vivants, directement dans l’eau.</p>
      </div>
    </div>
  </div>

  <h2 style="margin-top:2.5rem">Les héros de ce dossier</h2>
  <div class="grille">
    ${["maiasaura", "oviraptor", "argentinosaurus"].map((slug, i) => carteDino(parSlug[slug], "", { delai: i })).join("\n    ")}
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Œufs et bébés dinosaures" }],
    }),
  });

  /* ---------- Dossier : l'ère glaciaire ---------- */
  pages.push({
    chemin: "glaciations.html",
    html: page({
      titre: "Les dinosaures ont-ils connu l’ère glaciaire ?",
      description: "Les dinosaures ont-ils vécu avec les mammouths et la glace ? Les grandes glaciations d’avant et d’après les dinosaures, expliquées aux enfants.",
      corps: `
<div class="conteneur section">
  <h1>🧊 Les dinosaures ont-ils connu l’ère glaciaire ?</h1>
  <p class="fiche__accroche" style="max-width:66ch">Dans certains dessins animés, dinosaures et mammouths glissent sur
  la même banquise. Mais qu’en dit la science ?</p>

  <div class="encadre encadre--attention" style="max-width:70ch">
    <h2 class="encadre__titre">💡 La réponse courte</h2>
    <p><strong>Non !</strong> Pendant les 165 millions d’années de leur règne, la Terre était plutôt chaude, sans grandes
    calottes de glace. Il y a eu une grande période glaciaire <strong>bien avant</strong> les dinosaures… et d’autres
    <strong>bien après</strong> leur disparition.</p>
  </div>

  <figure style="margin:2rem 0">
    ${friseGlaciations()}
    <figcaption style="font-size:.88rem;color:var(--texte-doux);margin-top:.4rem">La frise, vue de très loin : 400 millions
    d’années d’histoire de la Terre. Fais-la glisser sur un petit écran.</figcaption>
  </figure>

  <div class="grille grille--deux" style="align-items:start">
    <div class="prose">
      <h2>C’est quoi, une ère glaciaire ?</h2>
      <p>C’est une très longue période, des millions d’années, pendant laquelle d’immenses calottes de glace recouvrent
      une partie des continents. Pendant une ère glaciaire, le climat alterne entre des moments très froids,
      les <strong>glaciations</strong>, et des moments plus doux.</p>
      <p>Surprise : aujourd’hui, il y a encore de la glace au pôle Sud et au Groenland. Pour les scientifiques,
      nous vivons donc… dans une ère glaciaire, pendant un moment plus doux !</p>

      <h2>Avant les dinosaures : la grande glaciation</h2>
      <p>Il y a environ 360 millions d’années commence une immense période glaciaire. Elle dure près de 100 millions
      d’années ! D’énormes glaciers recouvrent le sud de la planète.</p>
      <p>Elle se termine il y a environ 260 millions d’années… soit 30 millions d’années avant l’apparition des tout
      premiers dinosaures. Ils ne l’ont donc jamais connue.</p>
      <p>Et bien avant encore, il y a environ 700 millions d’années, la Terre aurait même été presque entièrement gelée,
      comme une gigantesque boule de neige. La vie se résumait alors à des êtres vivants minuscules.</p>

      <h2>Pendant les dinosaures : chaud… mais pas partout</h2>
      <p>Du Trias à la fin du Crétacé, la Terre était bien plus chaude qu’aujourd’hui. Il n’y avait pas de grande calotte
      de glace aux pôles, et des forêts poussaient jusque près du pôle Nord et du pôle Sud. Le
      <a href="dinosaures/cryolophosaurus.html">Cryolophosaurus</a> vivait ainsi dans une forêt… en Antarctique !</p>
      <p>Mais près des pôles, l’hiver restait rude. Le Soleil disparaissait pendant des semaines, parfois des mois,
      et il pouvait geler ou neiger. Des dinosaures vivaient pourtant là toute l’année : on les appelle les
      <strong>dinosaures polaires</strong>.</p>
      <ul>
        <li>Dans le nord de l’Alaska, on a retrouvé des dents et des os de bébés dinosaures tout juste sortis de l’œuf.
        Ils naissaient donc là-bas, malgré l’hiver sombre et enneigé. (Pour en savoir plus sur les bébés, lis le dossier
        <a href="oeufs.html">Œufs et bébés dinosaures</a>.)</li>
        <li>En Australie, alors proche du pôle Sud, vivait Leaellynasaura, un petit herbivore aux grands yeux. On a
        longtemps pensé que ses yeux l’aidaient à voir pendant la longue nuit d’hiver… mais c’étaient peut-être
        simplement les grands yeux d’un jeune.</li>
        <li>Au Trias, dans le nord de la Chine, les lacs gelaient l’hiver. Des chercheurs pensent que les dinosaures,
        déjà couverts de plumes ou de duvet, supportaient bien ce froid. Cela les aurait aidés à survivre quand d’autres
        grands reptiles ont disparu, à la fin du Trias.</li>
      </ul>
      <p>Il y a aussi eu quelques coups de froid, avec peut-être un peu de glace en hiver près des pôles.
      Mais jamais de grandes calottes comme aujourd’hui.</p>

      <h2>Après les dinosaures : le retour de la glace</h2>
      <p>Après la chute de l’astéroïde, il y a 66 millions d’années, la Terre se refroidit très lentement.
      Il y a environ 34 millions d’années, une calotte de glace commence à recouvrir l’Antarctique.
      Elle est toujours là aujourd’hui.</p>
      <p>Il y a environ 2,6 millions d’années commence l’époque des grandes glaciations : celle des mammouths laineux,
      des rhinocéros laineux… et des premiers humains. Les périodes très froides et les périodes plus douces se succèdent.</p>
      <p>Lors de la dernière grande glaciation, il y a environ 20 000 ans, tant d’eau était gelée que la mer était
      120 mètres plus basse qu’aujourd’hui : on pouvait aller à pied de la France à l’Angleterre !</p>

      <h2>Le piège des dessins animés</h2>
      <p>Dans certains films, mammouths et dinosaures se croisent sur la glace. C’est drôle, mais impossible :
      le mammouth laineux est apparu il y a seulement quelques centaines de milliers d’années, plus de 65 millions
      d’années après la disparition des dinosaures.</p>
      <p>Les seuls dinosaures à avoir connu les glaciations, ce sont… les <strong>oiseaux</strong> ! Des manchots de
      l’Antarctique aux lagopèdes des montagnes, certains adorent même le froid.</p>
    </div>

    <div>
      <div class="encadre encadre--pouvoir">
        <h2 class="encadre__titre">📊 En chiffres</h2>
        <table class="tableau-info"><tbody>
          <tr><th scope="row">Grande glaciation d’avant les dinosaures</th><td>De −360 à −260 millions d’années</td></tr>
          <tr><th scope="row">Premiers dinosaures</th><td>Vers −230 millions d’années</td></tr>
          <tr><th scope="row">Disparition des dinosaures (sauf les oiseaux)</th><td>−66 millions d’années</td></tr>
          <tr><th scope="row">Glace en Antarctique</th><td>Depuis −34 millions d’années</td></tr>
          <tr><th scope="row">Époque des mammouths</th><td>Depuis −2,6 millions d’années</td></tr>
          <tr><th scope="row">Dernière grande glaciation</th><td>Il y a environ 20 000 ans</td></tr>
        </tbody></table>
      </div>
      <div class="encadre">
        <h2 class="encadre__titre">🎮 Et si on jouait ?</h2>
        <p>Glaciation, astéroïde, mammouth et dinosaures : sauras-tu tout remettre dans l’ordre ?</p>
        <p><a class="bouton bouton--petit" href="jeux/machine-a-remonter-le-temps.html">⏳ La machine à remonter le temps</a></p>
      </div>
      <div class="encadre encadre--attention">
        <h2 class="encadre__titre">🌍 Le saviez-tu ?</h2>
        <p>Le mot « glaciation » vient de « glace ». Pendant une glaciation, les glaciers des montagnes descendent
        jusque dans les vallées, puis reculent quand le climat se réchauffe.</p>
      </div>
    </div>
  </div>
</div>`,
      filAriane: [{ nom: "Accueil", href: "index.html" }, { nom: "Les dinosaures et l’ère glaciaire" }],
    }),
  });

  return pages;
}

/**
 * Frise « vue de loin » : 400 millions d'années, à l'échelle.
 * On y voit d'un coup d'œil que les dinosaures n'ont connu aucune grande glaciation.
 */
function friseGlaciations() {
  const X0 = 24, X1 = 616, AGE_MAX = 400;
  const x = (age) => Math.round((X0 + ((AGE_MAX - age) / AGE_MAX) * (X1 - X0)) * 10) / 10;

  const bande = (debut, fin, y, h, couleur) =>
    `<rect x="${x(debut)}" y="${y}" width="${Math.max(x(fin) - x(debut), 2)}" height="${h}" rx="6" fill="${couleur}"/>`;

  /* Pas de graduation à −100 : la place sert à l'astéroïde (−66), juste à côté. */
  const graduations = [400, 300, 200, 0]
    .map(
      (a) => `<line x1="${x(a)}" y1="118" x2="${x(a)}" y2="126" stroke="currentColor" stroke-width="2"/>
    <text x="${a === 0 ? x(a) + 8 : a === AGE_MAX ? x(a) - 6 : x(a)}" y="142" text-anchor="${a === 0 ? "end" : a === AGE_MAX ? "start" : "middle"}" font-size="13" font-weight="700" fill="currentColor">${a === 0 ? "Aujourd’hui" : "−" + a + " Ma"}</text>`
    )
    .join("\n    ");

  return `<div class="regle-temps">
  <svg viewBox="0 0 640 160" class="frise-glace" role="img" aria-label="Frise de −400 millions d’années à aujourd’hui : la grande glaciation de −360 à −260 millions d’années ; les dinosaures de −230 à −66 millions d’années ; la glace en Antarctique depuis −34 millions d’années ; l’époque des mammouths depuis −2,6 millions d’années. Les dinosaures n’ont connu aucune grande glaciation." style="min-width:640px;width:100%;color:var(--texte)">
    <line x1="${X0}" y1="118" x2="${X1}" y2="118" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    ${bande(360, 260, 74, 36, "#8fc6ea")}
    <text x="${x(310)}" y="97" text-anchor="middle" font-size="13" font-weight="800" fill="#123a55">🧊 Grande glaciation</text>
    ${bande(230, 66, 74, 36, "#3f8f6c")}
    <text x="${x(148)}" y="97" text-anchor="middle" font-size="13" font-weight="800" fill="#ffffff">🦕 Les dinosaures</text>
    ${bande(34, 0, 74, 36, "#8fc6ea")}
    <text x="${x(0) - 10}" y="66" text-anchor="end" font-size="12" font-weight="800" fill="currentColor">🏔️ Glace au pôle Sud</text>
    ${bande(2.6, 0, 40, 34, "#2f6fa8")}
    <line x1="${x(1)}" y1="38" x2="${x(1)}" y2="26" stroke="currentColor" stroke-width="1.5"/>
    <text x="${x(1)}" y="20" text-anchor="end" font-size="12" font-weight="800" fill="currentColor">🦣 Mammouths</text>
    <line x1="${x(66)}" y1="108" x2="${x(66)}" y2="127" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/>
    <text x="${x(66) - 8}" y="142" text-anchor="middle" font-size="13" font-weight="800" fill="currentColor">☄️ −66 Ma</text>
    ${graduations}
  </svg>
</div>`;
}
