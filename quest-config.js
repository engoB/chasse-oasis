// ============================================================================
// CONFIGURATION DES ÉNIGMES DE LA SAISON (Fichier Dédié)
// Modifiez ce fichier pour mettre à jour les énigmes sans toucher au code principal !
// ============================================================================

window.QUEST_CONFIG = {
    seasonTitle: "Arc 1 : L'Héritage d'Halliday",
    
    // TMDB IDs des films cibles
    targetFilms: {
        1: 550,    // Fight Club (1999)
        2: 603,    // The Matrix (1999)
        3: 157336, // Interstellar (2014)
        4: 27205   // Inception (2010)
    },

    // Pistes du Carnet d'Enquête (Étape 1 : Trouver la bonne fiche)
    preRiddles: {
        1: "📖 <strong>Piste Cuivre (OSINT) :</strong> Identifiez le film de 1999 (139 min, réalisé par David Fincher) adapté du roman de 1996 de Chuck Palahniuk. Le protagoniste insomniaque y fabrique du savon artisanal.",
        2: "📖 <strong>Piste Jade (Chronos) :</strong> Identifiez le 1er volet exact de la trilogie Cyberpunk de 1999 (136 min, réalisé par les Wachowski, avec Keanu Reeves) introduisant le 'Bullet Time'.",
        3: "📖 <strong>Piste Cristal (Astrophysique) :</strong> Identifiez l'épopée spatiale de Christopher Nolan (2014, 169 min) où la relativité déforme le temps à proximité du trou noir Gargantua.",
        4: "🥚 <strong>Piste Ultime :</strong> Les 3 clés sont réunies ! L'Œuf d'Or s'est matérialisé sous la forme d'un glyphe interactif dans le synopsis du film 'Inception' (2010)."
    },

    // Énigmes de Clé (Étape 2 : Une fois sur la bonne fiche)
    riddles: {
        1: "🔑 <strong>Énigme de Cuivre (Haut Niveau) :</strong> Entrez la combinaison exacte : [PRENOM NOM DU PERSONNAGE DE BRAD PITT EN MAJUSCULES] + [ANNEE DU FILM]. <br><em>Format requis : TYLER DURDEN 1999</em>",
        2: "🗝️ <strong>Énigme de Jade (Haut Niveau) :</strong> Entrez la combinaison : [OBJET DE MORPHEUS EN 2 MOTS MAJUSCULES] + [HEXADÉCIMAL DU MOT NEO]. <br><em>Format requis : PILULE ROUGE 4E 45 4F</em>",
        3: "💎 <strong>Énigme de Cristal (Haut Niveau) :</strong> Entrez la combinaison : [NOM DU DR EXPLORATEUR DE LA PLANETE OCÉANIQUE EN MAJUSCULES] + [DILATATION TEMPORELLE : 1 HEURE = X ANNEES]. <br><em>Format requis : MILLER 7 ANNEES</em>"
    },

    // Empreintes cryptographiques SHA-256 strictes des réponses
    hashes: {
        1: "d5c9c3e60be1c8b3684a44f475510688dd61f0ef53cf68b1c4e7fb2fb1f10738", // TYLER DURDEN 1999
        2: "03f905cbf5d487299a9a08e121e7d23d8c11e7e40854d19aa4e16d414e86a1cf", // PILULE ROUGE 4E 45 4F
        3: "b845a72f2e5bb2720b0bd324d081b37b420ee9b19e918451838d7bb6d7a4cb40"  // MILLER 7 ANNEES
    }
};
