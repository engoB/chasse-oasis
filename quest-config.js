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
        1: "📖 <strong>Piste Cuivre (OSINT) :</strong> Décodez la trame Hexadécimale : <code>46 69 67 68 74 20 43 6C 75 62</code>. Localisez ce film de 1999 (139 min, réalisé par David Fincher) tiré du roman de 1996 de Chuck Palahniuk.",
        2: "📖 <strong>Piste Jade (Chronos) :</strong> Décodez le Morse : <code>-- .- - .-. .. -..-</code>. Localisez le 1er volet exact de la saga (1999, 136 min, réalisé par les Wachowski).",
        3: "📖 <strong>Piste Cristal (Astrophysique) :</strong> Coordonnées GPS du laboratoire de lancement : <code>33.9425° N, 118.4081° W</code>. Localisez l'épopée spatiale de Christopher Nolan (2014, 169 min).",
        4: "🥚 <strong>Piste Ultime :</strong> Les 3 clés sont réunies ! L'Œuf d'Or s'est matérialisé dans le synopsis du film 'Inception' (2010)."
    },

    // Énigmes de Clé (Accessibles UNIQUEMENT sur la fiche du bon film cible)
    riddles: {
        1: "🔑 <strong>Énigme de Cuivre :</strong> Combinez en MAJUSCULES : [PRENOM NOM DU PERSONNAGE DE BRAD PITT] + [ANNEE DU FILM]. <br><em>Format requis : TYLER DURDEN 1999</em>",
        2: "🗝️ <strong>Énigme de Jade :</strong> Combinez en MAJUSCULES : [OBJET DE MORPHEUS EN 2 MOTS] + [HEXADÉCIMAL DU MOT NEO]. <br><em>Format requis : PILULE ROUGE 4E 45 4F</em>",
        3: "💎 <strong>Énigme de Cristal :</strong> Combinez en MAJUSCULES : [NOM DU DR EXPLORATEUR DE LA PLANÈTE DE GLACE] + [DILATATION TEMPORELLE : 1 HEURE = X ANNEES]. <br><em>Format requis : MILLER 7 ANNEES</em>"
    },

    // Empreintes cryptographiques SHA-256 strictes des réponses
    hashes: {
        1: "d5c9c3e60be1c8b3684a44f475510688dd61f0ef53cf68b1c4e7fb2fb1f10738", // TYLER DURDEN 1999
        2: "03f905cbf5d487299a9a08e121e7d23d8c11e7e40854d19aa4e16d414e86a1cf", // PILULE ROUGE 4E 45 4F
        3: "b845a72f2e5bb2720b0bd324d081b37b420ee9b19e918451838d7bb6d7a4cb40"  // MILLER 7 ANNEES
    }
};
