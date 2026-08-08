/* Génère daily-db.js : une énigme par jour, scellée jour par jour. */
import { webcrypto as crypto } from 'node:crypto';
import { writeFileSync, readFileSync } from 'node:fs';
import { TRIVIA } from './trivia.mjs';
import { GAMES } from './pool-games.mjs';
import { HEROES, OTHERS } from './pool-heroes.mjs';
import { SCREEN } from './pool-screen.mjs';

const CAT = { movie: 'Film', tv: 'Série', game: 'Jeu vidéo', char: 'Personnage',
              studio: 'Studio', author: 'Auteur', music: 'Compositeur' };
const te = new TextEncoder();
const hex = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
const b64 = b => Buffer.from(new Uint8Array(b)).toString('base64');
const rand = n => hex(crypto.getRandomValues(new Uint8Array(n)));

/* [kind, titres (| = alias), année, genres, personnes, studio, durée|saisons, [5 indices]] */
const POOL = [
['movie','Fight Club',1999,'Drame|Thriller','David Fincher|Brad Pitt|Edward Norton','Fox 2000',139,[
 'Film américain de la toute fin des années 1990, drame à la lisière du thriller.',
 'Un narrateur insomniaque, des groupes de parole, puis des caves où l’on se cogne dessus.',
 'Réalisé par le cinéaste qui avait signé Seven quatre ans plus tôt.',
 'Brad Pitt et Edward Norton se partagent l’affiche — et bien plus que ça.',
 'Une fabrique de savon artisanale sert de couverture à une armée en pyjama noir.']],
['movie','Matrix|The Matrix',1999,'Action|Science-Fiction','Lana Wachowski|Lilly Wachowski|Keanu Reeves','Warner Bros.',136,[
 'Science-fiction américano-australienne sortie en 1999.',
 'Le monde qu’on croit habiter n’est qu’une simulation entretenue par des machines.',
 'Signé par deux réalisateurs de la même fratrie.',
 'Keanu Reeves en informaticien qui mène une double vie.',
 'Un choix entre deux gélules décide de tout le reste.']],
['movie','Interstellar',2014,'Aventure|Drame|Science-Fiction','Christopher Nolan|Matthew McConaughey|Anne Hathaway','Legendary Pictures',169,[
 'Grande science-fiction de 2014, presque trois heures.',
 'La Terre s’asphyxie sous la poussière ; il faut aller chercher ailleurs.',
 'Musique d’orgue signée Hans Zimmer, réalisation d’un cinéaste britannique obsédé par le temps.',
 'Un ancien pilote devenu fermier laisse sa fille derrière lui.',
 'Une heure passée sur une planète coûte des années à ceux restés en orbite.']],
['movie','Inception',2010,'Action|Aventure|Science-Fiction','Christopher Nolan|Leonardo DiCaprio|Marion Cotillard','Legendary Pictures',148,[
 'Blockbuster de 2010 qui emboîte les niveaux de récit.',
 'On s’introduit dans le sommeil des gens pour y voler — ou y déposer — une idée.',
 'Même réalisateur que la trilogie Batman de la même décennie.',
 'Leonardo DiCaprio dirige une équipe de spécialistes, dont une architecte débutante.',
 'Une toupie tourne, et le film s’arrête avant de dire si elle tombe.']],
['movie','Blade Runner',1982,'Science-Fiction|Thriller','Ridley Scott|Harrison Ford|Rutger Hauer','Warner Bros.',117,[
 'Science-fiction du début des années 1980, longtemps boudée puis devenue culte.',
 'Los Angeles en 2019, pluie permanente et publicités géantes.',
 'Réalisé par le cinéaste britannique qui venait de faire Alien.',
 'Harrison Ford traque des androïdes indiscernables des humains.',
 'Un monologue sur des larmes perdues dans la pluie clôt l’affrontement final.']],
['movie','Le Parrain|The Godfather',1972,'Crime|Drame','Francis Ford Coppola|Marlon Brando|Al Pacino','Paramount',175,[
 'Fresque criminelle américaine de 1972.',
 'Une famille sicilienne de New York gère ses affaires après-guerre.',
 'Adapté d’un roman à succès, réalisé par un jeune cinéaste italo-américain.',
 'Marlon Brando joue le patriarche, Al Pacino le fils qui ne voulait pas en être.',
 'Une tête de cheval retrouvée dans un lit règle une négociation.']],
['movie','Pulp Fiction',1994,'Crime|Thriller','Quentin Tarantino|John Travolta|Samuel L. Jackson','Miramax',154,[
 'Film américain de 1994, récit éclaté en chapitres désordonnés.',
 'Deux tueurs bavards, un boxeur qui devait perdre, une mallette qui brille.',
 'Palme d’or à Cannes pour un cinéaste vidéo-clubiste.',
 'John Travolta et Samuel L. Jackson en costumes noirs.',
 'Un concours de twist dans un restaurant à thème sert de respiration au milieu du sang.']],
['movie','Les Évadés|The Shawshank Redemption',1994,'Drame|Crime','Frank Darabont|Tim Robbins|Morgan Freeman','Castle Rock',142,[
 'Drame carcéral américain de 1994.',
 'Un banquier condamné à perpétuité pour un double meurtre qu’il nie.',
 'Adapté d’une nouvelle de Stephen King, ce qui surprend souvent.',
 'Morgan Freeman raconte l’histoire en voix off, du dedans.',
 'Une affiche de cinéma cache dix-neuf ans de patience.']],
['movie','Seven|Se7en',1995,'Crime|Thriller|Mystère','David Fincher|Brad Pitt|Morgan Freeman','New Line Cinema',127,[
 'Thriller américain de 1995, très sombre, très pluvieux.',
 'Un tueur met en scène ses crimes selon une liste ancienne de fautes.',
 'Deuxième long métrage d’un réalisateur venu du clip.',
 'Un inspecteur proche de la retraite forme son remplaçant impulsif.',
 'Le dernier acte se joue dans un désert, autour d’un carton livré à l’heure.']],
['movie','Alien|Alien, le huitième passager',1979,'Horreur|Science-Fiction','Ridley Scott|Sigourney Weaver','20th Century Fox',117,[
 'Film de 1979 qui a marié la science-fiction et l’épouvante.',
 'Un remorqueur spatial répond à un signal de détresse et ramène quelque chose à bord.',
 'Créature conçue d’après les dessins d’un artiste suisse.',
 'Sigourney Weaver, officier de bord, devient l’héroïne par élimination.',
 'Un dîner d’équipage tourne mal, et un chat prénommé Jones survit à tout.']],
['movie','Retour vers le futur|Back to the Future',1985,'Aventure|Comédie|Science-Fiction','Robert Zemeckis|Michael J. Fox|Christopher Lloyd','Universal',116,[
 'Comédie de science-fiction américaine de 1985.',
 'Un lycéen se retrouve coincé trente ans plus tôt et compromet sa propre naissance.',
 'Produit par Steven Spielberg, réalisé par son protégé.',
 'Michael J. Fox et un savant aux cheveux blancs électriques.',
 'Une voiture à portes papillon ne voyage qu’à 88 miles à l’heure.']],
['movie','Le Silence des agneaux|The Silence of the Lambs',1991,'Crime|Drame|Thriller','Jonathan Demme|Jodie Foster|Anthony Hopkins','Orion Pictures',119,[
 'Thriller américain de 1991, cinq Oscars majeurs.',
 'Une stagiaire du FBI consulte un détenu brillant pour en attraper un autre.',
 'Adapté d’un roman de Thomas Harris.',
 'Jodie Foster face à Anthony Hopkins, moins de vingt minutes à l’écran pour lui.',
 'Un papillon de nuit glissé dans la gorge des victimes sert de signature.']],
['movie','Jurassic Park',1993,'Aventure|Science-Fiction','Steven Spielberg|Sam Neill|Jeff Goldblum','Universal',127,[
 'Blockbuster américain de 1993, révolution des effets numériques.',
 'Un parc d’attractions sur une île du Costa Rica ouvre trop tôt.',
 'Réalisé par le cinéaste des Dents de la mer, d’après un roman de Michael Crichton.',
 'Un mathématicien en cuir noir prévient que ça va mal tourner.',
 'Un verre d’eau tremble avant l’arrivée du plus gros pensionnaire.']],
['movie','Titanic',1997,'Drame|Romance','James Cameron|Leonardo DiCaprio|Kate Winslet','20th Century Fox',194,[
 'Film américain de 1997, plus de trois heures, onze Oscars.',
 'Une romance de classes opposées à bord d’un paquebot en 1912.',
 'Réalisé par le cinéaste canadien de Terminator et Abyss.',
 'DiCaprio et Winslet, quinze ans avant leurs seconds rôles graves.',
 'Un collier bleu jeté à la mer referme le récit d’une vieille dame.']],
['movie','Le Seigneur des anneaux : La Communauté de l’anneau|The Fellowship of the Ring',2001,'Aventure|Fantastique','Peter Jackson|Elijah Wood|Ian McKellen','New Line Cinema',178,[
 'Premier volet d’une trilogie de fantasy sortie au début des années 2000.',
 'Neuf compagnons partent détruire un bijou dans un volcan.',
 'Tourné intégralement en Nouvelle-Zélande.',
 'Ian McKellen en magicien gris, Elijah Wood en porteur malgré lui.',
 'Un pont étroit dans une mine naine sépare la troupe de son guide.']],
['movie','Le Fabuleux Destin d’Amélie Poulain|Amélie',2001,'Comédie|Romance','Jean-Pierre Jeunet|Audrey Tautou','UGC',122,[
 'Comédie française de 2001, palette verte et rouge très reconnaissable.',
 'Une serveuse timide décide d’arranger la vie des autres en secret.',
 'Réalisée par le cinéaste de Delicatessen.',
 'Audrey Tautou, révélée par ce rôle.',
 'Un nain de jardin part faire le tour du monde en photos.']],
['movie','Parasite',2019,'Comédie|Drame|Thriller','Bong Joon-ho|Song Kang-ho','CJ Entertainment',133,[
 'Film sud-coréen de 2019, Palme d’or puis Oscar du meilleur film.',
 'Une famille pauvre s’installe méthodiquement chez une famille riche.',
 'Réalisé par le cinéaste de Memories of Murder et Snowpiercer.',
 'Song Kang-ho joue le père, chauffeur improvisé.',
 'Un sous-sol dissimulé sous la maison change la nature du film à mi-parcours.']],
['movie','Mad Max: Fury Road',2015,'Action|Aventure|Science-Fiction','George Miller|Charlize Theron|Tom Hardy','Warner Bros.',120,[
 'Film d’action australien de 2015, presque une seule poursuite.',
 'Un désert post-apocalyptique où l’eau est confisquée par un tyran masqué.',
 'Réalisé par le créateur de la saga originale, trente ans après.',
 'Charlize Theron, crâne rasé et bras mécanique, éclipse le personnage-titre.',
 'Un guitariste enchaîné à un camion joue pendant la bataille.']],
['movie','Le Voyage de Chihiro|Spirited Away',2001,'Animation|Aventure|Fantastique','Hayao Miyazaki|Studio Ghibli','Studio Ghibli',125,[
 'Animation japonaise de 2001, Ours d’or et Oscar.',
 'Une fillette voit ses parents transformés après un repas volé.',
 'Produit par le studio fondé à Tokyo en 1985.',
 'Réalisé par le maître de Princesse Mononoké.',
 'Un établissement de bains accueille les divinités fatiguées.']],
['movie','Whiplash',2014,'Drame|Musique','Damien Chazelle|Miles Teller|J.K. Simmons','Blumhouse',107,[
 'Drame américain de 2014, moins de deux heures, très tendu.',
 'Un conservatoire de musique de New York et un professeur qui humilie.',
 'Réalisé par un cinéaste qui enchaînera avec une comédie musicale.',
 'J.K. Simmons a décroché l’Oscar du second rôle.',
 'Une chaise lancée à travers la salle ouvre la relation entre les deux hommes.']],
['movie','Gladiator',2000,'Action|Aventure|Drame','Ridley Scott|Russell Crowe|Joaquin Phoenix','DreamWorks',155,[
 'Péplum américain de l’an 2000, Oscar du meilleur film.',
 'Un général romain trahi finit esclave dans l’arène.',
 'Réalisé par le cinéaste britannique d’Alien et Blade Runner.',
 'Russell Crowe face à Joaquin Phoenix en empereur fragile.',
 'Le héros passe la main sur des épis de blé avant chaque combat.']],
['movie','Heat',1995,'Action|Crime|Drame','Michael Mann|Al Pacino|Robert De Niro','Warner Bros.',170,[
 'Polar américain de 1995, près de trois heures.',
 'Los Angeles nocturne, une équipe de braqueurs méthodiques et un flic obsessionnel.',
 'Réalisé par le cinéaste de Collateral et Miami Vice.',
 'Pacino et De Niro partagent enfin une scène, autour d’un café.',
 'Une fusillade en plein centre-ville, sans musique, reste la référence du genre.']],
['movie','Les Affranchis|Goodfellas',1990,'Crime|Drame','Martin Scorsese|Ray Liotta|Joe Pesci','Warner Bros.',145,[
 'Film de gangsters américain de 1990.',
 'Trente ans de carrière mafieuse racontés de l’intérieur, jusqu’à la chute.',
 'Réalisé par le cinéaste new-yorkais de Taxi Driver.',
 'Joe Pesci, Oscar du second rôle, y est terrifiant de bonne humeur.',
 'Un plan-séquence traverse les cuisines d’un cabaret pour impressionner une conquête.']],
['movie','Shining|The Shining',1980,'Horreur|Thriller','Stanley Kubrick|Jack Nicholson','Warner Bros.',144,[
 'Film d’horreur de 1980, désavoué par l’auteur du roman.',
 'Un hôtel de montagne fermé pour l’hiver, un gardien et sa famille.',
 'Réalisé par le cinéaste de 2001 et Orange mécanique.',
 'Jack Nicholson sombre lentement devant sa machine à écrire.',
 'Deux petites filles se tiennent au bout d’un couloir moquetté.']],
['movie','2001, l’Odyssée de l’espace|2001: A Space Odyssey',1968,'Science-Fiction|Aventure','Stanley Kubrick|Keir Dullea','MGM',149,[
 'Science-fiction de 1968, quasi muette par endroits.',
 'De la préhistoire à Jupiter, en un raccord.',
 'Coécrit avec l’écrivain britannique Arthur C. Clarke.',
 'Une valse de Strauss accompagne l’amarrage d’une navette.',
 'Un ordinateur de bord à l’œil rouge refuse d’ouvrir une porte.']],
['movie','Terminator 2 : Le Jugement dernier|Terminator 2',1991,'Action|Science-Fiction','James Cameron|Arnold Schwarzenegger|Linda Hamilton','TriStar',137,[
 'Suite américaine de 1991, budget record pour l’époque.',
 'Deux machines venues du futur se disputent la protection d’un adolescent.',
 'Réalisé par le cinéaste canadien qui fera Titanic six ans plus tard.',
 'Schwarzenegger passe du méchant au protecteur.',
 'Un antagoniste en métal liquide traverse les grilles et imite les visages.']],
['movie','Léon',1994,'Action|Crime|Drame','Luc Besson|Jean Reno|Natalie Portman','Gaumont',110,[
 'Film français tourné à New York, sorti en 1994.',
 'Un tueur à gages solitaire recueille une gamine dont la famille vient d’être massacrée.',
 'Réalisé par le cinéaste français du Grand Bleu.',
 'Natalie Portman, douze ans, fait ses débuts au cinéma.',
 'Une plante verte en pot suit le personnage principal partout.']],
['movie','La Haine',1995,'Drame|Crime','Mathieu Kassovitz|Vincent Cassel','Canal+',98,[
 'Film français de 1995, noir et blanc, prix de la mise en scène à Cannes.',
 'Vingt-quatre heures dans une banlieue après une bavure policière.',
 'Réalisé par un acteur passé derrière la caméra.',
 'Vincent Cassel, Hubert Koundé et Saïd Taghmaoui forment le trio.',
 'Une histoire de chute depuis un immeuble sert de refrain au récit.']],
['movie','Intouchables',2011,'Comédie|Drame','Olivier Nakache|Éric Toledano|Omar Sy|François Cluzet','Gaumont',112,[
 'Comédie dramatique française de 2011, immense succès public.',
 'Un aristocrate tétraplégique engage un aide de vie sorti de prison.',
 'Inspirée d’une histoire vraie racontée dans un documentaire.',
 'Omar Sy a obtenu le César du meilleur acteur pour ce rôle.',
 'Un morceau de soul fait basculer un anniversaire trop guindé.']],
['movie','Premier Contact|Arrival',2016,'Drame|Science-Fiction|Mystère','Denis Villeneuve|Amy Adams|Jeremy Renner','Paramount',116,[
 'Science-fiction de 2016, contemplative plutôt que spectaculaire.',
 'Douze vaisseaux se posent, et personne ne sait comment leur parler.',
 'Réalisée par le cinéaste québécois qui enchaînera sur Dune.',
 'Amy Adams joue une linguiste recrutée par l’armée.',
 'Le langage des visiteurs s’écrit en cercles et modifie la perception du temps.']],
['movie','Dune',2021,'Aventure|Science-Fiction','Denis Villeneuve|Timothée Chalamet|Rebecca Ferguson','Legendary Pictures',155,[
 'Première partie d’une adaptation sortie en 2021.',
 'Une planète désertique, seule source d’une épice indispensable au voyage.',
 'Roman de 1965 déjà porté à l’écran en 1984.',
 'Timothée Chalamet en héritier d’une maison noble.',
 'Des vers géants remontent le sable quand on marche en rythme.']],
['movie','Joker',2019,'Crime|Drame|Thriller','Todd Phillips|Joaquin Phoenix','Warner Bros.',122,[
 'Drame américain de 2019, Lion d’or à Venise.',
 'Un clown pour anniversaires d’enfants glisse vers la violence dans une ville pourrissante.',
 'Réalisé par le cinéaste de la trilogie Very Bad Trip.',
 'Joaquin Phoenix a perdu plus de vingt kilos pour le rôle.',
 'Une danse dans un escalier extérieur peint en marches devient l’image du film.']],
['movie','Get Out',2017,'Horreur|Mystère|Thriller','Jordan Peele|Daniel Kaluuya','Blumhouse',104,[
 'Thriller américain de 2017, produit pour un budget minuscule.',
 'Un jeune homme noir rencontre la famille très accueillante de sa compagne blanche.',
 'Premier long métrage d’un humoriste de télévision.',
 'Daniel Kaluuya y obtient sa première nomination à l’Oscar.',
 'Une cuillère tournant dans une tasse de thé déclenche l’hypnose.']],
['movie','La La Land',2016,'Comédie|Drame|Romance|Musique','Damien Chazelle|Ryan Gosling|Emma Stone','Summit Entertainment',128,[
 'Comédie musicale américaine de 2016.',
 'Une actrice qui rate ses auditions et un pianiste qui veut sauver un genre en voie de disparition.',
 'Même réalisateur que Whiplash, deux ans plus tard.',
 'Emma Stone a obtenu l’Oscar de la meilleure actrice.',
 'Le générique s’ouvre sur un embouteillage chanté au-dessus de Los Angeles.']],
['movie','Le Roi Lion|The Lion King',1994,'Animation|Aventure|Familial','Walt Disney Animation|Hans Zimmer','Walt Disney Pictures',89,[
 'Animation américaine de 1994, l’un des plus gros succès du studio.',
 'Un jeune héritier fuit après la mort de son père, persuadé d’en être responsable.',
 'Chansons d’Elton John, musique de Hans Zimmer.',
 'Aucune présence humaine à l’écran, du début à la fin.',
 'Un phacochère et un suricate enseignent une philosophie sans souci.']],
['movie','Toy Story',1995,'Animation|Aventure|Familial|Comédie','Pixar|John Lasseter|Tom Hanks','Pixar',81,[
 'Animation américaine de 1995, premier long métrage entièrement en images de synthèse.',
 'Les jouets d’une chambre d’enfant s’animent dès qu’on a le dos tourné.',
 'Produit par un studio californien racheté plus tard par Disney.',
 'Tom Hanks prête sa voix au cow-boy en version originale.',
 'Un jouet spatial refuse d’admettre qu’il n’est qu’un jouet.']],
['movie','WALL·E',2008,'Animation|Familial|Science-Fiction','Pixar|Andrew Stanton','Pixar',98,[
 'Animation américaine de 2008, presque sans dialogue pendant quarante minutes.',
 'Une Terre couverte de déchets, abandonnée par les humains.',
 'Réalisé par le cinéaste du Monde de Nemo.',
 'Le héros collectionne les objets qu’il compacte, dont une cassette vidéo.',
 'Une plante verte dans une botte décide du retour de l’humanité.']],
['movie','Old Boy',2003,'Action|Drame|Mystère|Thriller','Park Chan-wook|Choi Min-sik','Show East',120,[
 'Thriller sud-coréen de 2003, Grand Prix à Cannes.',
 'Un homme est séquestré quinze ans sans explication, puis relâché.',
 'Deuxième volet d’une trilogie sur la vengeance.',
 'Choi Min-sik y livre une performance physique extrême.',
 'Un couloir traversé au marteau, filmé de profil en un seul plan.']],
['movie','Le Prestige|The Prestige',2006,'Drame|Mystère|Science-Fiction','Christopher Nolan|Christian Bale|Hugh Jackman','Touchstone',130,[
 'Film américano-britannique de 2006 sur la rivalité de deux hommes.',
 'Londres victorien, deux illusionnistes se détruisent pour un tour de scène.',
 'Réalisé entre deux films de chauve-souris par le même cinéaste.',
 'David Bowie y interprète Nikola Tesla.',
 'Une machine construite dans le Colorado duplique ce qu’on y place.']],
['movie','Memento',2000,'Mystère|Thriller','Christopher Nolan|Guy Pearce','Newmarket Films',113,[
 'Thriller américain de l’an 2000, construit à rebours.',
 'Un homme incapable de fabriquer de nouveaux souvenirs cherche l’assassin de sa femme.',
 'Deuxième film d’un réalisateur alors inconnu.',
 'Guy Pearce porte tout le récit.',
 'Des tatouages et des photos annotées remplacent la mémoire.']],
['movie','Trainspotting',1996,'Drame|Crime','Danny Boyle|Ewan McGregor','Channel Four Films',94,[
 'Film britannique de 1996, énergie punk et bande-son fameuse.',
 'Un groupe d’amis héroïnomanes à Édimbourg.',
 'Réalisé par le cinéaste qui obtiendra l’Oscar avec Slumdog Millionaire.',
 'Ewan McGregor y trouve son premier grand rôle.',
 'Le film s’ouvre sur une liste ironique de tout ce qu’il faudrait choisir dans la vie.']],
['movie','Forrest Gump',1994,'Comédie|Drame|Romance','Robert Zemeckis|Tom Hanks','Paramount',142,[
 'Film américain de 1994, six Oscars.',
 'Un homme simple traverse quarante ans d’histoire américaine sans le vouloir.',
 'Réalisé par le cinéaste de Retour vers le futur.',
 'Tom Hanks obtient son deuxième Oscar consécutif.',
 'Un banc d’arrêt de bus et une boîte de chocolats encadrent le récit.']],
['movie','Il faut sauver le soldat Ryan|Saving Private Ryan',1998,'Drame|Guerre','Steven Spielberg|Tom Hanks|Matt Damon','DreamWorks',169,[
 'Film de guerre américain de 1998.',
 'Une escouade part chercher un seul homme derrière les lignes allemandes.',
 'Réalisé par le cinéaste de La Liste de Schindler.',
 'Tom Hanks commande la section ; Matt Damon est l’objet de la mission.',
 'Les vingt premières minutes reconstituent un débarquement sur une plage normande.']],
['movie','Le Cinquième Élément|The Fifth Element',1997,'Action|Aventure|Science-Fiction','Luc Besson|Bruce Willis|Milla Jovovich','Gaumont',126,[
 'Science-fiction française de 1997, tournée en anglais.',
 'New York au XXIIIᵉ siècle, taxis volants et menace cosmique.',
 'Costumes dessinés par Jean-Paul Gaultier.',
 'Bruce Willis en chauffeur de taxi, Milla Jovovich en créature parfaite.',
 'Une cantatrice bleue enchaîne un air d’opéra puis un morceau électro.']],
['movie','Portrait de la jeune fille en feu',2019,'Drame|Romance','Céline Sciamma|Noémie Merlant|Adèle Haenel','Lilies Films',122,[
 'Film français de 2019, prix du scénario à Cannes.',
 'Une peintre est engagée pour faire le portrait d’une promise, à son insu.',
 'Réalisé par la cinéaste de Bande de filles et Petite Maman.',
 'Adèle Haenel et Noémie Merlant se donnent la réplique en Bretagne du XVIIIᵉ siècle.',
 'Un chœur de femmes autour d’un feu donne son titre au film.']],
['tv','Breaking Bad',2008,'Drame|Crime','Vince Gilligan|Bryan Cranston|Aaron Paul','AMC',5,[
 'Série américaine lancée en 2008, cinq saisons.',
 'Un professeur de chimie apprend qu’il est condamné et change de métier.',
 'Diffusée sur une chaîne câblée américaine, tournée au Nouveau-Mexique.',
 'Bryan Cranston, jusque-là connu pour une sitcom familiale.',
 'Un pseudonyme emprunté à un physicien allemand sert de signature au produit.']],
['tv','Game of Thrones|Le Trône de fer',2011,'Sci-Fi & Fantasy|Drame|Action & Adventure','HBO|David Benioff|D.B. Weiss','HBO',8,[
 'Série de fantasy lancée en 2011, huit saisons.',
 'Plusieurs familles se disputent un siège inconfortable pendant qu’une menace monte au nord.',
 'Produite par la chaîne câblée américaine du Trône… et des Soprano.',
 'Adaptée des romans de George R. R. Martin.',
 'Une noce du neuvième épisode de la troisième saison a traumatisé une génération.']],
['tv','The Wire|Sur écoute',2002,'Drame|Crime','David Simon|Dominic West|Idris Elba','HBO',5,[
 'Série américaine de 2002, souvent citée comme la meilleure jamais produite.',
 'Baltimore vue à la fois par les dealers, les flics, le port, l’école et la presse.',
 'Créée par un ancien journaliste de la ville.',
 'Idris Elba s’y est fait connaître internationalement.',
 'Chaque saison change d’institution plutôt que d’intrigue.']],
['tv','Les Soprano|The Sopranos',1999,'Drame|Crime','David Chase|James Gandolfini','HBO',6,[
 'Série américaine lancée en 1999, six saisons.',
 'Un chef mafieux du New Jersey consulte une psychiatre.',
 'Considérée comme l’acte de naissance de la télévision d’auteur.',
 'James Gandolfini tient le rôle-titre.',
 'Le dernier plan coupe au noir en plein milieu d’un dîner de famille.']],
['tv','Stranger Things',2016,'Sci-Fi & Fantasy|Mystère|Drame','Duffer Brothers|Winona Ryder|Millie Bobby Brown','Netflix',4,[
 'Série américaine lancée en 2016 sur une plateforme de streaming.',
 'Une petite ville de l’Indiana des années 1980 et la disparition d’un garçon.',
 'Créée par deux frères jumeaux.',
 'Winona Ryder joue la mère qui refuse qu’on la croie folle.',
 'Une guirlande de Noël accrochée au mur sert d’alphabet.']],
['tv','Chernobyl',2019,'Drame|Histoire','Craig Mazin|Jared Harris|Emily Watson','HBO',1,[
 'Mini-série de 2019, cinq épisodes.',
 'La nuit d’avril 1986 où un réacteur soviétique explose, puis les mois suivants.',
 'Coproduction américano-britannique, tournée en Lituanie.',
 'Jared Harris joue le scientifique chargé du rapport.',
 'La couleur d’une lueur au-dessus du réacteur fascine les habitants du pont.']],
['tv','Dark',2017,'Sci-Fi & Fantasy|Mystère|Drame','Baran bo Odar|Jantje Friese','Netflix',3,[
 'Série allemande lancée en 2017, trois saisons.',
 'Une petite ville, une centrale nucléaire, des enfants qui disparaissent.',
 'Première série originale en langue allemande de sa plateforme.',
 'Quatre familles dont les arbres généalogiques finissent par se croiser.',
 'Une grotte relie trois époques séparées de trente-trois ans.']],
['tv','Le Bureau des légendes',2015,'Drame','Éric Rochant|Mathieu Kassovitz|Sara Giraudeau','Canal+',5,[
 'Série française lancée en 2015, cinq saisons.',
 'Le service qui gère les agents clandestins français à l’étranger.',
 'Diffusée sur une chaîne cryptée française.',
 'Mathieu Kassovitz joue un agent revenu de Damas qui n’a pas tout dit.',
 'Le titre désigne le bureau où l’on fabrique les fausses identités.']],
['tv','Peaky Blinders',2013,'Drame|Crime','Steven Knight|Cillian Murphy','BBC',6,[
 'Série britannique lancée en 2013, six saisons.',
 'Birmingham juste après la Première Guerre mondiale, une famille tsigane qui monte.',
 'Diffusée par le service public britannique.',
 'Cillian Murphy en chef de clan au regard fixe.',
 'Des lames cousues dans les casquettes donnent son nom au gang.']],
['tv','Black Mirror',2011,'Sci-Fi & Fantasy|Drame|Mystère','Charlie Brooker','Channel 4',6,[
 'Anthologie britannique lancée en 2011.',
 'Chaque épisode invente une technologie et en montre le pire usage.',
 'Créée par un chroniqueur télé britannique.',
 'Le premier épisode a fait scandale à cause d’un Premier ministre et d’un cochon.',
 'Un épisode noté par tout le monde en permanence a donné son adjectif au réel.']],
['tv','True Detective',2014,'Drame|Crime|Mystère','Nic Pizzolatto|Matthew McConaughey|Woody Harrelson','HBO',4,[
 'Série américaine à distribution renouvelée à chaque saison, lancée en 2014.',
 'Deux inspecteurs de Louisiane racontent, dix-sept ans plus tard, une enquête inachevée.',
 'Produite par la même chaîne câblée que Les Soprano.',
 'La première saison réunit Matthew McConaughey et Woody Harrelson.',
 'Un plan-séquence de six minutes dans une cité traverse le quatrième épisode.']],
['tv','Squid Game',2021,'Action & Adventure|Mystère|Drame','Hwang Dong-hyuk|Lee Jung-jae','Netflix',2,[
 'Série sud-coréenne de 2021, succès mondial immédiat.',
 'Des surendettés acceptent une compétition dont ils ignorent les règles.',
 'Le scénario avait été écrit plus de dix ans avant sa production.',
 'Des combinaisons vertes et des gardes masqués aux formes géométriques.',
 'Une poupée géante arbitre une partie de « un, deux, trois, soleil ».']]
];

const SALT = (() => { try {
  const old = Function('const window={};' + readFileSync('daily-db.js', 'utf8') + ';return window.DAILY_DB')();
  console.log('sel quotidien repris'); return old.salt;
} catch { return rand(16); } })();

async function keyFor(i) {
  const raw = await crypto.subtle.digest('SHA-256', te.encode(`${SALT}|day|${i}`));
  return crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['encrypt', 'decrypt']);
}
async function seal(obj, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, te.encode(JSON.stringify(obj)));
  const out = new Uint8Array(12 + ct.byteLength); out.set(iv); out.set(new Uint8Array(ct), 12);
  return b64(out);
}

/* Les 57 journées d'origine gardent leur place (parties déjà entamées).
   Les nouvelles sont entrelacées pour que les catégories alternent. */
function interleave(buckets) {
  const b = buckets.map(x => x.slice()), n0 = b.map(x => x.length), out = [];
  let last = -1;
  while (b.some(x => x.length)) {
    let pick = -1, best = -1;                    /* on sert le panier le plus « en retard » */
    for (let i = 0; i < b.length; i++) {
      if (!b[i].length || (i === last && b.filter(x => x.length).length > 1)) continue;
      const r = b[i].length / n0[i];
      if (r > best) { best = r; pick = i; }
    }
    if (pick < 0) pick = b.findIndex(x => x.length);
    out.push(b[pick].shift()); last = pick;
  }
  return out;
}
const ORDER = [...POOL, ...interleave([SCREEN.filter(x => x[0] === 'movie'), SCREEN.filter(x => x[0] === 'tv'), GAMES, HEROES, OTHERS])];

const days = [], census = {};
for (let i = 0; i < ORDER.length; i++) {
  const [kind, titles, year, genres, people, studio, len, hints, trivia, near] = ORDER[i];
  const t = titles.split('|');
  census[CAT[kind]] = (census[CAT[kind]] || 0) + 1;
  days.push(await seal({
    i, kind, cat: CAT[kind] || 'Autre', mode: (kind === 'movie' || kind === 'tv') ? 'tmdb' : 'free',
    titles: t, year, genres: genres.split('|'), people: people.split('|'), studio, len, hints,
    trivia: trivia || TRIVIA[t[0]] || '', near: near || []
  }, await keyFor(i)));
}
console.log('répartition :', Object.entries(census).map(([k, v]) => `${k} ${v}`).join(' · '));

const out = `/* ══════════════════════════════════════════════════════════════════
   daily-db.js — banque du mode quotidien OASIS
   ${days.length} énigmes uniques (films, séries, jeux vidéo, personnages,
   studios, auteurs, compositeurs), une par jour, en rotation continue.
   Chaque journée porte cinq indices progressifs et une anecdote finale.

   Chaque journée est scellée séparément (AES-GCM, clé dérivée de son
   index) : ouvrir ce fichier ne révèle ni les titres, ni les indices.
   Obfuscation, pas cryptographie : la clé du jour J+1 est calculable.
   Le verrouillage réel reste celui de la chasse (quest-config.js).

   Pour compléter l'année : ouvrez le site, Ctrl+Shift+F, onglet
   « Forge quotidienne », collez une liste « Titre (année) » et compilez.
   ══════════════════════════════════════════════════════════════════ */

window.DAILY_DB = {
  schema: 1,
  salt: ${JSON.stringify(SALT)},
  epoch: "2026-08-05",
  count: ${days.length},
  days: ${JSON.stringify(days, null, 2)}
};
`;
writeFileSync('daily-db.js', out);
console.log(`daily-db.js écrit — ${days.length} jours, ${out.length} caractères`);
