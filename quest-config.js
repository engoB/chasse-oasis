/* ══════════════════════════════════════════════════════════════════
   quest-config.js — SAISON « Arc I — L’Héritage d’Halliday »
   Généré le 2026-08-04 par la Forge OASIS.

   Ce fichier ne contient AUCUNE réponse et AUCUN identifiant de film en clair.
   · target.h  : empreinte SHA-256 salée de la cible (irréversible sans l'ID)
   · seal.salt : sel PBKDF2 de l'étape · seal.verify : preuve de la clé dérivée
   · chain[i]  : étape i+2 chiffrée en AES-256-GCM par la réponse de l'étape i+1

   Pour changer de saison : ouvrez le site, tapez Ctrl+Shift+F (Forge),
   décrivez la saison en clair, compilez, remplacez ce fichier. Rien d'autre.
   ══════════════════════════════════════════════════════════════════ */

window.QUEST_CONFIG = {
  "schema": 3,
  "seasonId": "ARC1-HALLIDAY",
  "seasonTitle": "Arc I — L’Héritage d’Halliday",
  "tagline": "Quatre verrous. Une seule règle : <strong>chaque étape est chiffrée par la réponse de la précédente</strong>.\n    Tant que vous n’avez pas trouvé, l’énoncé suivant n’existe en clair nulle part — pas même ici.",
  "tmdbKey": "12ec990be5e1a68af09d09c8ca76fa57",
  "lang": "fr-FR",
  "region": "FR",
  "idSalt": "0bf83377e7366418e9fbd0f52054f0d1",
  "kdf": {
    "iter": 200000,
    "hash": "SHA-256",
    "mode": "PBKDF2 → AES-256-GCM"
  },
  "scoring": {
    "base": 10000,
    "probe": 15,
    "hint": 400,
    "wrongKey": 120,
    "perMinute": 6
  },
  "stageCount": 4,
  "nextSeasonAt": "2026-09-05T18:00:00Z",
  "hideFormat": true,
  "shareUrl": "",
  "stageMeta": [
    {
      "name": "Clé de Cuivre",
      "glyph": "🗝️",
      "hue": "#C36A2D"
    },
    {
      "name": "???",
      "glyph": "🔒",
      "hue": "#8E8E9E"
    },
    {
      "name": "???",
      "glyph": "🔒",
      "hue": "#8E8E9E"
    },
    {
      "name": "???",
      "glyph": "🔒",
      "hue": "#8E8E9E"
    }
  ],
  "stage1": {
    "n": 1,
    "name": "Clé de Cuivre",
    "glyph": "🗝️",
    "hue": "#C36A2D",
    "brief": "Un fichier refuse de mourir dans l’index public. Son titre a été réduit à une trame hexadécimale :\n    <code>4C 41 20 43 48 41 4D 42 52 45 20 44 45 20 46 45 52</code><br><br>\n    Décodez-la, puis <strong>tapez le titre obtenu dans la barre de recherche</strong> : l’archive corrompue répondra.\n    Son générique contient un seul nom vérifiable au catalogue — c’est lui, le pont vers le vrai film.",
    "riddle": "Vous êtes sur la bonne fiche. Le verrou de cuivre demande deux choses, dans cet ordre :\n    le <strong>nom complet du personnage incarné par Brad Pitt</strong>, puis la <strong>durée du film en minutes</strong>.",
    "format": null,
    "hints": [
      {
        "t": "Le personnage recherché n’est pas le narrateur : c’est celui qui fabrique du savon."
      },
      {
        "t": "La durée exacte figure dans les pastilles, en haut de cette fiche."
      },
      {
        "t": "Prénom, nom, puis un nombre à trois chiffres commençant par 1."
      }
    ],
    "target": {
      "h": "a9f8146dca608ddd1d363ead",
      "kind": "movie"
    },
    "fp": {
      "g": [
        "e09590c812",
        "f6c13c3a36",
        "558103e7a5"
      ],
      "k": [
        "0fca8b014a",
        "21cba32c41",
        "d48d4eafa3",
        "0bf8232ffd",
        "2578602b9d",
        "2f6165661a",
        "09fa98111c",
        "65a9523ad2",
        "8693374371",
        "9a22c05930"
      ],
      "p": [
        "690ceee2d9",
        "02356bfff7",
        "e2dec09305",
        "5f3312cea1",
        "86b4f6ee4f",
        "70a75b0391"
      ],
      "c": [
        "b06a301dd1",
        "031d5e7e51",
        "e472475693",
        "7f1242a0d5"
      ],
      "y": 1999,
      "lang": "en"
    },
    "phantoms": [
      {
        "pid": "PH-1993-FER",
        "title": "La Chambre de Fer",
        "year": "1993",
        "runtime": 108,
        "code": "OASIS-DB//1993-0447",
        "glyph": "⛓",
        "hue": "#C36A2D",
        "source": "bobine 16 mm, non cataloguée",
        "tagline": "Ce qui se répare la nuit se casse le jour.",
        "tokens": [
          "la chambre de fer",
          "chambre de fer",
          "chambre fer",
          "iron room"
        ],
        "overview": "Un ouvrier d’usine cesse de dormir. Il commence à réparer, chaque nuit, une machine que personne ne lui a demandé de réparer.\n      Trois bobines sur cinq ont survécu ; la fin manque. Le générique d’ouverture a été partiellement gratté.",
        "notes": "Quatre noms ont survécu au grattage — tous existent, tous ont une fiche.\n      Un seul d’entre eux signe, <strong>six ans après cette bande</strong>, un film de <strong>139 minutes</strong>\n      adapté d’un roman paru en 1996. Ouvrez leurs dossiers, comparez les filmographies année par année.",
        "credits": [
          {
            "name": "David Fincher",
            "role": "Réalisation (non créditée)"
          },
          {
            "name": "Michael Mann",
            "role": "Supervision de production"
          },
          {
            "name": "Kathryn Bigelow",
            "role": "Montage additionnel"
          },
          {
            "name": "Agnès Varda",
            "role": "Fonds d’archives"
          }
        ]
      }
    ],
    "seal": {
      "salt": "ba87f11d71bf0249e8ada618bf40fc13",
      "verify": "e34633c6181470ece2b340be873037cc49c5702bfe6f544bf17baa7d026f3df8"
    }
  },
  "chain": [
    "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"
  ],
  "leaderboard": {
    "mode": "local",
    "endpoint": null,
    "seed": [
      {
        "name": "Aiden_Oasis",
        "ms": 494220,
        "score": 9850,
        "keys": 3,
        "done": true
      },
      {
        "name": "Krypton_99",
        "ms": 705010,
        "score": 9620,
        "keys": 3,
        "done": true
      },
      {
        "name": "Cypher_Zero",
        "ms": 842890,
        "score": 9410,
        "keys": 2,
        "done": false
      },
      {
        "name": "Art3mis",
        "ms": 1180400,
        "score": 9105,
        "keys": 2,
        "done": false
      }
    ]
  }
};
