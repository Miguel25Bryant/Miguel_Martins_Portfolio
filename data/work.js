/* ═══════════════════════════════════════════════════════════════
   WORK: every project on the site, in order, plus where it sits
   on the home page. Edit this file to change the composition or
   the text under each piece.

   name        Project name as shown on the site
   slug        Short name used in the address (#project/kaya) and in assets/pages
   homeName    Optional shorter name for the home (and List), e.g. Inova
   folder      Folder in "Selected Work" with the Behance presentation pages
               (3200 × 2000 PNGs, in order). Files with "cover" in the name and no
               page number in front are cover options only, never shown as pages. After changing a page,
               run: node tools/build-images.mjs
   discipline  Shown in italics under the piece and as the category in the
               project viewer (translated in DISCIPLINES at the bottom)
   text        The paragraph on the project page: the project's own 05-about
               text with places taken out, in every site language
   about       One short sentence per project, in every site language.
               Hidden for now: set SHOW_SENTENCES below to true to show it
               under each piece again.
   year        Year, as printed on the project's own 05-about sheet
   context     'academic' marks school work in the viewer
   video       Optional cover video (mp4) shown instead of the cover image.
               It plays muted, loops, and only while on screen.

   at          Desktop position, in % of the page width (so it scales):
                 x  left edge      y  top edge      w  width
               The height follows the cover's own proportions (cover.jpg in the
               project folder), with the name and discipline below it.
   m           Phone layout (one column): [width in %, 'left' | 'right']
═══════════════════════════════════════════════════════════════ */
window.SHOW_SENTENCES = false;   // true: the sentence appears between name and discipline

window.WORK = [
  { name: 'Kaya', slug: 'kaya', folder: 'KAYA', discipline: 'Brand Identity', year: 2026,
    text: {
      en: "Kaya is a sports goods brand built on a simple belief: move well, look after yourself, and you will last longer, with a better quality of life along the way. “Defy the clock” turns longevity into the brand’s challenge, and the fluid, stretched letterforms carry that energy into every touchpoint.",
      pt: "Kaya é uma marca de artigos de desporto construída sobre uma ideia simples: quem se mexe bem e cuida de si dura mais, e com mais qualidade de vida pelo caminho. “Defy the clock” transforma a longevidade no desafio da marca, e as letras fluidas e esticadas levam essa energia a cada ponto de contacto.",
      es: "Kaya es una marca de artículos deportivos construida sobre una idea sencilla: muévete bien, cuídate y durarás más, con mejor calidad de vida por el camino. “Defy the clock” convierte la longevidad en el reto de la marca, y las letras fluidas y estiradas llevan esa energía a cada punto de contacto.",
      fr: "Kaya est une marque d’articles de sport fondée sur une idée simple : bien bouger, prendre soin de soi, et durer plus longtemps, avec une meilleure qualité de vie en chemin. « Defy the clock » fait de la longévité le défi de la marque, et les lettres fluides et étirées portent cette énergie à chaque point de contact.",
      de: "Kaya ist eine Sportartikelmarke mit einer einfachen Überzeugung: Beweg dich gut, achte auf dich, und du hältst länger durch, mit mehr Lebensqualität auf dem Weg. „Defy the clock“ macht Langlebigkeit zur Herausforderung der Marke, und die fließenden, gestreckten Buchstaben tragen diese Energie an jeden Kontaktpunkt.",
    },
    about: {
      en: 'Identity for a sports brand that dares you to defy the clock.',
      pt: 'Identidade para uma marca de desporto que te desafia a vencer o relógio.',
      es: 'Identidad para una marca deportiva que te reta a desafiar al reloj.',
      fr: 'Identité pour une marque de sport qui vous invite à défier le temps.',
      de: 'Identität für eine Sportmarke, die dich herausfordert, der Uhr zu trotzen.',
    },
    at: { x: 8, y: 8, w: 24 }, m: [74, 'left'] },

  { name: 'Terra Sã', slug: 'terra-sa', folder: 'Terra Sã', discipline: 'Brand Identity & Packaging', year: 2026,
    text: {
      en: "Terra Sã is an organic extra virgin olive oil. The hand drawn symbol brings together the olive tree, the terraced land and the water of the valley, signed with hand written lettering. Around it, a clean system with plenty of space and colours taken from the land gives a product with a long history a modern presence on the shelf.",
      pt: "Terra Sã é um azeite virgem extra biológico. O símbolo desenhado à mão junta a oliveira, os socalcos e a água do vale, assinado com letras escritas à mão. À volta, um sistema limpo, com muito espaço e cores tiradas da terra, dá a um produto com uma longa história uma presença moderna na prateleira.",
      es: "Terra Sã es un aceite de oliva virgen extra ecológico. El símbolo dibujado a mano reúne el olivo, las terrazas y el agua del valle, firmado con letras escritas a mano. A su alrededor, un sistema limpio, con mucho espacio y colores sacados de la tierra, da a un producto con una larga historia una presencia moderna en el lineal.",
      fr: "Terra Sã est une huile d’olive vierge extra bio. Le symbole dessiné à la main réunit l’olivier, les terrasses et l’eau de la vallée, signé d’une écriture manuscrite. Autour, un système épuré, avec beaucoup d’espace et des couleurs tirées de la terre, donne à un produit à la longue histoire une présence moderne en rayon.",
      de: "Terra Sã ist ein biologisches natives Olivenöl extra. Das handgezeichnete Symbol vereint Olivenbaum, Terrassen und das Wasser des Tals, signiert mit handgeschriebenen Buchstaben. Ein klares System mit viel Raum und Farben aus der Landschaft gibt einem Produkt mit langer Geschichte einen modernen Auftritt im Regal.",
    },
    about: {
      en: 'Identity for an organic olive oil, with a hand drawn symbol of its valley.',
      pt: 'Identidade para um azeite biológico, com um símbolo desenhado à mão do seu vale.',
      es: 'Identidad para un aceite de oliva ecológico, con un símbolo dibujado a mano de su valle.',
      fr: 'Identité pour une huile d’olive bio, avec un symbole dessiné à la main de sa vallée.',
      de: 'Identität für ein biologisches Olivenöl, mit einem handgezeichneten Symbol seines Tals.',
    },
    at: { x: 52, y: 57, w: 15 }, m: [56, 'right'] },

  { name: 'Swell', slug: 'swell', folder: 'Swell', discipline: 'Brand Identity', year: 2026,
    text: {
      en: "Swell is the dream of a psychologist who fell in love with the sea on family holidays, then trained as a yoga and pilates instructor. The identity captures the slow rhythm of the ocean: a hand drawn wordmark, a wave symbol and a palette of sea and sand.",
      pt: "Swell nasceu de uma paixão pelo mar descoberta em férias de família, que levou a uma mudança de vida da psicologia para o ensino de yoga e pilates. A identidade capta o ritmo lento do oceano: um logótipo desenhado à mão, um símbolo de onda e uma paleta de mar e areia.",
      es: "Swell nació de una pasión por el mar descubierta en vacaciones familiares, que llevó a un cambio de vida de la psicología a la enseñanza de yoga y pilates. La identidad capta el ritmo lento del océano: un logotipo dibujado a mano, un símbolo de ola y una paleta de mar y arena.",
      fr: "Swell est né d’une passion pour la mer découverte en vacances en famille, qui a mené de la psychologie à l’enseignement du yoga et du pilates. L’identité capte le rythme lent de l’océan : un logotype dessiné à la main, un symbole de vague et une palette de mer et de sable.",
      de: "Swell entstand aus einer Liebe zum Meer, entdeckt in Familienurlauben, die von der Psychologie zum Unterrichten von Yoga und Pilates führte. Die Identität fängt den langsamen Rhythmus des Ozeans ein: ein handgezeichneter Schriftzug, ein Wellensymbol und eine Palette aus Meer und Sand.",
    },
    about: {
      en: 'Identity for a yoga and pilates teacher who fell in love with the sea.',
      pt: 'Identidade para um projeto de yoga e pilates nascido do amor pelo mar.',
      es: 'Identidad para un proyecto de yoga y pilates nacido del amor por el mar.',
      fr: 'Identité pour un projet de yoga et de pilates né d’un amour pour la mer.',
      de: 'Identität für Yoga und Pilates, entstanden aus der Liebe zum Meer.',
    },
    at: { x: 79, y: 8, w: 12 }, m: [48, 'left'] },

  { name: 'Distortion', slug: 'distortion', folder: 'Distortion', discipline: 'Editorial Design', year: 2025, context: 'academic',
    text: {
      en: "Distortion is a rock magazine built around one question. The issue answers it with two interviews: Slash, the legend who has carried rock for four decades, and Damiano David, the voice of Måneskin. Both say the same thing: rock never died, it just stopped being mainstream. Black and white photography, loud condensed headlines and a single red.",
      pt: "Distortion é uma revista de rock construída à volta de uma pergunta. A edição responde com duas entrevistas: Slash, a lenda que carrega o rock há quatro décadas, e Damiano David, a voz dos Måneskin. Ambos dizem o mesmo: o rock nunca morreu, só deixou de ser mainstream. Fotografia a preto e branco, títulos condensados e fortes e um único vermelho.",
      es: "Distortion es una revista de rock construida en torno a una pregunta. El número responde con dos entrevistas: Slash, la leyenda que lleva cuatro décadas sosteniendo el rock, y Damiano David, la voz de Måneskin. Los dos dicen lo mismo: el rock nunca murió, solo dejó de ser mainstream. Fotografía en blanco y negro, titulares condensados y potentes y un único rojo.",
      fr: "Distortion est un magazine rock construit autour d’une question. Le numéro y répond avec deux interviews : Slash, la légende qui porte le rock depuis quatre décennies, et Damiano David, la voix de Måneskin. Tous deux disent la même chose : le rock n’est jamais mort, il a seulement cessé d’être grand public. Photographie en noir et blanc, titres condensés et puissants, et un seul rouge.",
      de: "Distortion ist ein Rockmagazin, das um eine Frage gebaut ist. Die Ausgabe antwortet mit zwei Interviews: Slash, die Legende, die den Rock seit vier Jahrzehnten trägt, und Damiano David, die Stimme von Måneskin. Beide sagen dasselbe: Rock ist nie gestorben, er ist nur kein Mainstream mehr. Schwarzweißfotografie, laute schmale Headlines und ein einziges Rot.",
    },
    about: {
      en: 'A rock magazine that asks if rock is dead, and answers in two interviews.',
      pt: 'Uma revista de rock que pergunta se o rock morreu e responde com duas entrevistas.',
      es: 'Una revista de rock que pregunta si el rock ha muerto y responde con dos entrevistas.',
      fr: 'Un magazine rock qui demande si le rock est mort, et répond en deux interviews.',
      de: 'Ein Rockmagazin, das fragt, ob Rock tot ist, und mit zwei Interviews antwortet.',
    },
    at: { x: 42, y: 22, w: 26 }, m: [86, 'right'] },

  // the folder named Grafpub '26 holds the 2027 catalogue
  { name: 'Grafpub 2027', slug: 'grafpub-2027', folder: "Grafpub '26", discipline: 'Editorial Design', year: 2026,
    text: {
      en: "Every year Grafpub publishes a catalogue of promotional products for its clients. For the 2027 edition the cover shows one image: a plain tote bag thrown into a clear sky, about to be caught, with the year printed on it as if it were the first product in the catalogue. The back cover lists everything Grafpub does.",
      pt: "Todos os anos a Grafpub publica um catálogo de brindes para os seus clientes. Na edição de 2027 a capa mostra uma só imagem: um simples saco de pano atirado a um céu limpo, prestes a ser apanhado, com o ano impresso como se fosse o primeiro produto do catálogo. A contracapa lista tudo o que a Grafpub faz.",
      es: "Cada año Grafpub publica un catálogo de productos promocionales para sus clientes. En la edición de 2027 la portada muestra una sola imagen: una bolsa de tela lanzada a un cielo despejado, a punto de ser atrapada, con el año impreso como si fuera el primer producto del catálogo. La contraportada recoge todo lo que hace Grafpub.",
      fr: "Chaque année, Grafpub publie un catalogue d’objets publicitaires pour ses clients. Pour l’édition 2027, la couverture montre une seule image : un simple tote bag lancé dans un ciel clair, sur le point d’être rattrapé, avec l’année imprimée dessus comme s’il était le premier produit du catalogue. La quatrième de couverture liste tout ce que fait Grafpub.",
      de: "Jedes Jahr veröffentlicht Grafpub einen Katalog mit Werbeartikeln für seine Kunden. Für die Ausgabe 2027 zeigt das Cover ein einziges Bild: eine schlichte Stofftasche, in einen klaren Himmel geworfen, kurz bevor sie gefangen wird, mit der Jahreszahl darauf, als wäre sie das erste Produkt im Katalog. Die Rückseite listet alles, was Grafpub macht.",
    },
    about: {
      en: 'Catalogue cover where a plain tote bag, thrown into the sky, becomes the first product.',
      pt: 'Capa de catálogo onde um simples saco de pano, atirado ao céu, é o primeiro produto.',
      es: 'Portada de catálogo donde una bolsa de tela, lanzada al cielo, es el primer producto.',
      fr: 'Couverture de catalogue où un simple tote bag, lancé dans le ciel, devient le premier produit.',
      de: 'Katalogcover, auf dem eine schlichte Stofftasche, in den Himmel geworfen, zum ersten Produkt wird.',
    },
    at: { x: 18, y: 47, w: 17 }, m: [62, 'left'] },

  { name: 'Hotel Navegadores', slug: 'hotel-navegadores', folder: 'Hotel Navegadores', discipline: 'Digital Campaign', year: 2026,
    text: {
      en: "Hotel Navegadores hosts a golf tournament every year. For the fifth edition the campaign ran mainly on the Benfica members’ website as a partner offer. The images tell you straight away what it is about, and big condensed type carries the name and dates.",
      pt: "O Hotel Navegadores organiza todos os anos um torneio de golfe. Na quinta edição, a campanha correu sobretudo no site de sócios do Benfica, como oferta de parceiro. As imagens dizem logo do que se trata, e tipografia grande e condensada leva o nome e as datas.",
      es: "El Hotel Navegadores organiza cada año un torneo de golf. En la quinta edición, la campaña se difundió sobre todo en la web de socios del Benfica como oferta de colaborador. Las imágenes dicen enseguida de qué se trata, y una tipografía grande y condensada lleva el nombre y las fechas.",
      fr: "L’Hôtel Navegadores organise chaque année un tournoi de golf. Pour la cinquième édition, la campagne a surtout circulé sur le site des membres du Benfica, comme offre partenaire. Les images disent tout de suite de quoi il s’agit, et une grande typographie condensée porte le nom et les dates.",
      de: "Das Hotel Navegadores richtet jedes Jahr ein Golfturnier aus. Für die fünfte Ausgabe lief die Kampagne vor allem auf der Mitgliederseite von Benfica als Partnerangebot. Die Bilder zeigen sofort, worum es geht, und große, schmale Schrift trägt Namen und Daten.",
    },
    about: {
      en: 'Online campaign for a hotel golf tournament, with images that say it all at once.',
      pt: 'Campanha digital para o torneio de golfe de um hotel, com imagens que dizem tudo de imediato.',
      es: 'Campaña digital para el torneo de golf de un hotel, con imágenes que lo dicen todo al instante.',
      fr: 'Campagne digitale pour le tournoi de golf d’un hôtel, avec des images qui disent tout d’emblée.',
      de: 'Digitale Kampagne für das Golfturnier eines Hotels, mit Bildern, die sofort alles sagen.',
    },
    at: { x: 8, y: 82, w: 17 }, m: [54, 'right'] },

  { name: 'Stay Home', slug: 'stay-home', folder: 'Stay Home', discipline: 'Brand Identity & Campaign', year: 2025,
    text: {
      en: "Stay Home is a new real estate agency. The identity places a home inside the name, turning the “H” into a building that rises above the line. The launch campaign introduces a newcomer in a competitive market and builds awareness and trust from day one.",
      pt: "Stay Home é uma nova agência imobiliária. A identidade coloca uma casa dentro do nome, transformando o “H” num edifício que se ergue acima da linha. A campanha de lançamento apresenta uma nova marca num mercado competitivo e cria notoriedade e confiança desde o primeiro dia.",
      es: "Stay Home es una nueva agencia inmobiliaria. La identidad coloca una casa dentro del nombre, convirtiendo la “H” en un edificio que se eleva sobre la línea. La campaña de lanzamiento presenta a una recién llegada en un mercado competitivo y genera notoriedad y confianza desde el primer día.",
      fr: "Stay Home est une nouvelle agence immobilière. L’identité place une maison dans le nom, en transformant le « H » en un bâtiment qui dépasse la ligne. La campagne de lancement présente un nouveau venu sur un marché concurrentiel et crée notoriété et confiance dès le premier jour.",
      de: "Stay Home ist ein neuer Immobilienmakler. Die Identität setzt ein Haus in den Namen und macht das „H“ zu einem Gebäude, das über die Linie hinausragt. Die Launchkampagne stellt einen Neuling in einem umkämpften Markt vor und schafft vom ersten Tag an Bekanntheit und Vertrauen.",
    },
    about: {
      en: 'Identity and launch campaign for an estate agency, with a house built into the H.',
      pt: 'Identidade e campanha de lançamento para uma imobiliária, com uma casa construída no H.',
      es: 'Identidad y campaña de lanzamiento para una inmobiliaria, con una casa construida en la H.',
      fr: 'Identité et campagne de lancement pour une agence immobilière, avec une maison bâtie dans le H.',
      de: 'Identität und Launchkampagne für einen Immobilienmakler, mit einem Haus im H.',
    },
    at: { x: 64, y: 86, w: 30 }, m: [100, 'left'] },

  { name: 'Sol & Sombra', slug: 'sol-sombra', folder: 'Sol & Sombra', discipline: 'Brand Identity', year: 2025,
    text: {
      en: "Sol & Sombra is a café and snack bar with a sun drenched terrace. The name already existed; the identity gives it a face that feels as warm as the place itself. A sun rises beside the lettering, and the palette splits the name in two: warm gold for “Sol”, a deeper, shaded brown for “Sombra”.",
      pt: "Sol & Sombra é um café e snack bar com uma esplanada cheia de sol. O nome já existia; a identidade dá ao espaço um rosto tão acolhedor como o próprio lugar. Um sol nasce ao lado das letras, e a paleta divide o nome em dois: dourado quente para “Sol”, um castanho mais profundo e sombreado para “Sombra”.",
      es: "Sol & Sombra es un café y snack bar con una terraza llena de sol. El nombre ya existía; la identidad le da una cara tan cálida como el propio lugar. Un sol nace junto a las letras, y la paleta divide el nombre en dos: dorado cálido para “Sol”, un marrón más profundo y sombreado para “Sombra”.",
      fr: "Sol & Sombra est un café snack avec une terrasse baignée de soleil. Le nom existait déjà ; l’identité lui donne un visage aussi chaleureux que l’endroit. Un soleil se lève à côté des lettres, et la palette coupe le nom en deux : un or chaud pour « Sol », un brun plus profond et ombré pour « Sombra ».",
      de: "Sol & Sombra ist ein Café und Snackbar mit einer sonnigen Terrasse. Den Namen gab es schon; die Identität gibt ihm ein Gesicht, das so warm wirkt wie der Ort selbst. Neben dem Schriftzug geht eine Sonne auf, und die Palette teilt den Namen in zwei: warmes Gold für „Sol“, ein tieferes, schattiges Braun für „Sombra“.",
    },
    about: {
      en: 'A warm identity for a café with a sunny terrace, split into sun and shade.',
      pt: 'Uma identidade quente para um café com esplanada ao sol, dividida entre sol e sombra.',
      es: 'Una identidad cálida para un café con terraza al sol, dividida entre sol y sombra.',
      fr: 'Une identité chaleureuse pour un café avec terrasse ensoleillée, partagée entre soleil et ombre.',
      de: 'Eine warme Identität für ein Café mit Sonnenterrasse, geteilt in Sonne und Schatten.',
    },
    at: { x: 38, y: 100, w: 15 }, m: [58, 'right'] },

  { name: 'SOS Renovações', slug: 'sos-renovacoes', folder: 'SOS Renovações', discipline: 'Brand Identity', year: 2025,
    text: {
      en: "SOS Renovações is an interior and exterior renovation company. The identity is built around one honest object: the hex nut, the small part that holds everything else in place. Every “O” in the custom lettering becomes a nut, giving a brand that feels solid on vans, workwear, site hoardings and a phone screen alike.",
      pt: "SOS Renovações é uma empresa de remodelações de interiores e exteriores. A identidade parte de um objeto honesto: a porca sextavada, a pequena peça que segura tudo o resto no lugar. Cada “O” do lettering personalizado passa a ser uma porca, e a marca parece sólida em carrinhas, fardamento, tapumes de obra e no ecrã do telemóvel.",
      es: "SOS Renovações es una empresa de reformas de interiores y exteriores. La identidad parte de un objeto honesto: la tuerca hexagonal, la pequeña pieza que mantiene todo lo demás en su sitio. Cada “O” de las letras a medida se convierte en una tuerca, y la marca resulta sólida en furgonetas, ropa de trabajo, vallas de obra y en la pantalla del móvil.",
      fr: "SOS Renovações est une entreprise de rénovation intérieure et extérieure. L’identité part d’un objet honnête : l’écrou hexagonal, la petite pièce qui tient tout le reste en place. Chaque « O » du lettrage sur mesure devient un écrou, pour une marque solide sur les camionnettes, les tenues de travail, les palissades de chantier et l’écran d’un téléphone.",
      de: "SOS Renovações ist ein Unternehmen für Renovierungen innen und außen. Die Identität baut auf einem ehrlichen Objekt auf: der Sechskantmutter, dem kleinen Teil, das alles andere an seinem Platz hält. Jedes „O“ im eigenen Schriftzug wird zur Mutter, und die Marke wirkt auf Transportern, Arbeitskleidung, Bauzäunen und dem Handybildschirm gleich solide.",
    },
    about: {
      en: 'Identity for a renovation company, built around the hex nut that holds everything together.',
      pt: 'Identidade para uma empresa de remodelações, construída à volta da porca que segura tudo.',
      es: 'Identidad para una empresa de reformas, construida alrededor de la tuerca que lo sujeta todo.',
      fr: 'Identité pour une entreprise de rénovation, construite autour de l’écrou qui tient tout ensemble.',
      de: 'Identität für ein Renovierungsunternehmen, aufgebaut um die Sechskantmutter, die alles zusammenhält.',
    },
    at: { x: 46, y: 124, w: 28 }, m: [84, 'left'] },

  // the folder named Grafpub '27 holds the 2026 catalogue
  { name: 'Grafpub 2026', slug: 'grafpub-2026', folder: "Grafpub '27", discipline: 'Editorial Design', year: 2025,
    text: {
      en: "The 2026 edition of Grafpub’s promotional products catalogue shows just one product on the cover, the simplest one there is: a pen with the word “Brindes” printed on it, held to red lips. The year is set huge in white and cut off at the edge, so it feels closer to a fashion magazine than a product list.",
      pt: "A edição de 2026 do catálogo de brindes da Grafpub mostra um só produto na capa, o mais simples de todos: uma caneta com a palavra “Brindes”, encostada a uns lábios vermelhos. O ano surge enorme, a branco, cortado na margem, e o resultado parece mais uma revista de moda do que uma lista de produtos.",
      es: "La edición de 2026 del catálogo de productos promocionales de Grafpub muestra un solo producto en la portada, el más sencillo de todos: un bolígrafo con la palabra “Brindes”, junto a unos labios rojos. El año aparece enorme en blanco y cortado en el borde, más cerca de una revista de moda que de una lista de productos.",
      fr: "L’édition 2026 du catalogue d’objets publicitaires de Grafpub ne montre qu’un produit en couverture, le plus simple qui soit : un stylo portant le mot « Brindes », posé contre des lèvres rouges. L’année est composée en très grand, en blanc, coupée au bord, plus proche d’un magazine de mode que d’une liste de produits.",
      de: "Die Ausgabe 2026 des Werbeartikelkatalogs von Grafpub zeigt nur ein Produkt auf dem Cover, das einfachste überhaupt: einen Stift mit dem Wort „Brindes“, an rote Lippen gehalten. Die Jahreszahl steht riesig in Weiß und angeschnitten am Rand, näher an einem Modemagazin als an einer Produktliste.",
    },
    about: {
      en: 'Catalogue cover with one pen and red lips, closer to fashion than a product list.',
      pt: 'Capa de catálogo com uma caneta e lábios vermelhos, mais perto da moda do que de uma lista de produtos.',
      es: 'Portada de catálogo con un bolígrafo y labios rojos, más cerca de la moda que de una lista de productos.',
      fr: 'Couverture de catalogue avec un stylo et des lèvres rouges, plus proche de la mode que d’une liste de produits.',
      de: 'Katalogcover mit einem Stift und roten Lippen, näher an Mode als an einer Produktliste.',
    },
    at: { x: 12, y: 120, w: 14 }, m: [50, 'right'] },

  { name: 'Inova Contabilidade', homeName: 'Inova', slug: 'inova', folder: 'Inova', discipline: 'Brand Identity', year: 2026,
    text: {
      en: "inova is an accounting firm led by Fátima Fernandes. The “o” of inova becomes a calculator, the everyday tool of any accountant, redrawn with soft shapes and rounded corners. A blue to green gradient carries the brand from doubt to peace of mind: accounts in order, growth and trust.",
      pt: "A inova é um gabinete de contabilidade liderado por Fátima Fernandes. O “o” de inova passa a ser uma calculadora, a ferramenta de todos os dias de qualquer contabilista, redesenhada com formas suaves e cantos arredondados. Um gradiente de azul para verde leva a marca da dúvida à tranquilidade: contas em ordem, crescimento e confiança.",
      es: "inova es una gestoría contable dirigida por Fátima Fernandes. La “o” de inova se convierte en una calculadora, la herramienta diaria de cualquier contable, redibujada con formas suaves y esquinas redondeadas. Un degradado de azul a verde lleva la marca de la duda a la tranquilidad: cuentas en orden, crecimiento y confianza.",
      fr: "inova est un cabinet comptable dirigé par Fátima Fernandes. Le « o » d’inova devient une calculatrice, l’outil quotidien de tout comptable, redessinée avec des formes douces et des coins arrondis. Un dégradé du bleu au vert mène la marque du doute à la sérénité : des comptes en ordre, de la croissance et de la confiance.",
      de: "inova ist ein Buchhaltungsbüro unter der Leitung von Fátima Fernandes. Das „o“ von inova wird zum Taschenrechner, dem Alltagswerkzeug in jeder Buchhaltung, neu gezeichnet mit weichen Formen und runden Ecken. Ein Verlauf von Blau zu Grün führt die Marke vom Zweifel zur Gelassenheit: geordnete Zahlen, Wachstum und Vertrauen.",
    },
    about: {
      en: 'Identity for an accounting firm, where the “o” in inova becomes a friendly calculator.',
      pt: 'Identidade para um gabinete de contabilidade, onde o “o” de inova se torna uma calculadora simpática.',
      es: 'Identidad para una gestoría contable, donde la “o” de inova se convierte en una calculadora amable.',
      fr: 'Identité pour un cabinet comptable, où le « o » d’inova devient une calculatrice sympathique.',
      de: 'Identität für ein Buchhaltungsbüro, in dem das „o“ von inova zum freundlichen Taschenrechner wird.',
    },
    at: { x: 80, y: 112, w: 12 }, m: [46, 'left'] },

  { name: 'Posters', slug: 'posters', folder: 'Posters 2025', discipline: 'Poster Design', year: 2025,
    text: {
      en: "A yearly collection of posters made around the things I love outside of work: music, games, film and the causes that matter. Echo Sound, a festival by the sea; Marathon, built around the Thief runner; TALK!, a talk on sexual violence; and Cayde-6: A Hunter’s Tale.",
      pt: "Uma coleção anual de cartazes sobre o que gosto fora do trabalho: música, jogos, cinema e as causas que importam. Echo Sound, um festival junto ao mar; Marathon, à volta do corredor Thief; TALK!, uma conversa sobre violência sexual; e Cayde-6: A Hunter’s Tale.",
      es: "Una colección anual de carteles sobre lo que me gusta fuera del trabajo: música, juegos, cine y las causas que importan. Echo Sound, un festival junto al mar; Marathon, en torno al corredor Thief; TALK!, una charla sobre violencia sexual; y Cayde-6: A Hunter’s Tale.",
      fr: "Une collection annuelle d’affiches autour de ce que j’aime en dehors du travail : musique, jeux, cinéma et les causes qui comptent. Echo Sound, un festival en bord de mer ; Marathon, autour du coureur Thief ; TALK!, une conférence sur les violences sexuelles ; et Cayde-6: A Hunter’s Tale.",
      de: "Eine jährliche Plakatsammlung über das, was ich außerhalb der Arbeit liebe: Musik, Games, Film und Anliegen, die zählen. Echo Sound, ein Festival am Meer; Marathon, rund um den Läufer Thief; TALK!, ein Vortrag über sexualisierte Gewalt; und Cayde-6: A Hunter’s Tale.",
    },
    about: {
      en: 'A yearly set of posters about what I love outside work: music, games, film.',
      pt: 'Uma série anual de cartazes sobre o que gosto fora do trabalho: música, jogos, cinema.',
      es: 'Una serie anual de carteles sobre lo que me gusta fuera del trabajo: música, juegos, cine.',
      fr: 'Une série annuelle d’affiches sur ce que j’aime en dehors du travail : musique, jeux, cinéma.',
      de: 'Eine jährliche Plakatserie über das, was ich außerhalb der Arbeit liebe: Musik, Games, Film.',
    },
    at: { x: 54, y: 150, w: 17 }, m: [64, 'right'] },
];

/* Disciplines in every site language (the English name is the key used above) */
window.DISCIPLINES = {
  'Brand Identity':             { pt: 'Identidade de Marca',             es: 'Identidad de Marca',             fr: 'Identité de Marque',             de: 'Markenidentität' },
  'Brand Identity & Packaging': { pt: 'Identidade de Marca & Embalagem', es: 'Identidad de Marca & Packaging', fr: 'Identité de Marque & Packaging', de: 'Markenidentität & Verpackung' },
  'Brand Identity & Campaign':  { pt: 'Identidade de Marca & Campanha',  es: 'Identidad de Marca & Campaña',   fr: 'Identité de Marque & Campagne',  de: 'Markenidentität & Kampagne' },
  'Editorial Design':           { pt: 'Design Editorial',                es: 'Diseño Editorial',               fr: 'Design Éditorial',               de: 'Editorial Design' },
  'Digital Campaign':           { pt: 'Campanha Digital',                es: 'Campaña Digital',                fr: 'Campagne Digitale',              de: 'Digitale Kampagne' },
  'Poster Design':              { pt: 'Design de Cartazes',              es: 'Diseño de Carteles',             fr: 'Design d’Affiches',              de: 'Plakatgestaltung' },
};

/* ═══════════════════════════════════════════════════════════════
   INTRO: the project logos that flash across the grid on arrival.
   Each is a dark PNG with a transparent background in assets/logos
   (made from the Behance boards by tools/extract-logos.mjs).
   The intro sizes them to the same visual weight automatically.
═══════════════════════════════════════════════════════════════ */
window.INTRO_LOGOS = [
  'kaya', 'terra-sa', 'swell', 'swell-symbol', 'sol-sombra',
  'sos', 'sos-symbol', 'stay-home', 'inova',
].map(id => `assets/logos/${id}.png`);
