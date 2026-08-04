// ============================================================================
// CONFIGURATION DES ÉNIGMES DE LA SAISON (Fichier Dédié)
// Modifiez ce fichier pour mettre à jour les énigmes sans toucher au code principal !
// ============================================================================

window.QUEST_CONFIG = {
    seasonTitle: "Arc 1 : L'Héritage d'Halliday",
    
    // TMDB IDs des films cibles
    targetFilms: {
        1: 550,    // Fight Club (1999)
        2: 603,    // Matrix 1 (1999 - Vol. 1)
        3: 157336, // Interstellar (2014)
        4: 27205   // Inception (2010)
    },

    // Pistes du Carnet d'Enquête (Dévoilées UNIQUEMENT lorsque l'étape est active !)
    preRiddles: {
        1: "📖 <strong>Piste Cuivre (Signal Hex) :</strong> Décodez la trame Hexadécimale : <code>46 69 67 68 74 20 43 6C 75 62</code>. Localisez ce film de 1999 (139 min, réalisé par David Fincher) tiré du roman de 1996 de Chuck Palahniuk.",
        2: "📖 <strong>Piste Jade (Signal Morse) :</strong> Décodez le Morse : <code>-- .- - .-. .. -..-</code>. Localisez le 1er volet exact de la saga (1999, 136 min, réalisé par les Wachowski).",
        3: "📖 <strong>Piste Cristal (OSINT / Coordonnées) :</strong> Coordonnées GPS du laboratoire de lancement : <code>33.9425° N, 118.4081° W</code>. Localisez l'épopée spatiale de Christopher Nolan (2014, 169 min).",
        4: "🥚 <strong>Piste Ultime :</strong> Les 3 clés sont réunies ! L'Œuf d'Or s'est matérialisé dans le synopsis du film 'Inception' (2010)."
    },

    // Énigmes de Clé (Accessibles UNIQUEMENT sur la fiche du bon film cible)
    riddles: {
        1: "🔑 <strong>Énigme de Cuivre :</strong> Combinez en MAJUSCULES : [PRENOM NOM DU PERSONNAGE DE BRAD PITT] + [NOM DE L'ENTREPRISE FICTIVE DU SAVON]. <br><em>Format requis : TYLER DURDEN PAPER STREET</em>",
        2: "🗝️ <strong>Énigme de Jade :</strong> Combinez en MAJUSCULES : [PILULE CHOISIE PAR NEO EN 2 MOTS] + [NOM DE LA DERNIÈRE CITÉ HUMAINE]. <br><em>Format requis : PILULE ROUGE ZION</em>",
        3: "💎 <strong>Énigme de Cristal :</strong> Combinez en MAJUSCULES : [NOM DU TROU NOIR GEANT] + [NOM DU DR EXPLORATEUR DE LA PLANÈTE DE GLACE]. <br><em>Format requis : GARGANTUA MANN</em>"
    },

    // Empreintes cryptographiques SHA-256 strictes des réponses
    hashes: {
        1: "a4d701e88e31ff73a9e6d0a75f850e0503f191b988f615462dddf5e12f62776c", // TYLER DURDEN PAPER STREET
        2: "85cbfbf5d70b3b9b4f63c89ffb53f6631eefc5e317c2f06bd0fbb10e3d0db99b", // PILULE ROUGE ZION
        3: "e439211c1eeb6b3c2025ad87a87ea312014ea8ec76bb6cb1c49bcf20d41e737c"  // GARGANTUA MANN
    }
};
