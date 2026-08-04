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
    "format": "PRENOM NOM NOMBRE",
    "hints": [
      {
        "t": "Le nom complet : prénom et nom, pas seulement le prénom."
      },
      {
        "t": "La durée est affichée en haut de cette fiche, dans les pastilles grises."
      },
      {
        "t": "Trois blocs séparés par des espaces. La ponctuation et la casse sont ignorées."
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
        "notes": "Un seul nom de ce générique existe au catalogue public — les autres n’ont jamais tourné.\n      Ouvrez sa fiche. <strong>Six ans après cette bande</strong>, il signe un film de <strong>139 minutes</strong>,\n      adapté d’un roman paru en 1996. C’est le titre que vous cherchez.",
        "credits": [
          {
            "name": "David Fincher",
            "role": "Réalisation (non créditée)",
            "pid": 7467
          },
          {
            "name": "M. Orloff",
            "role": "Chef opérateur"
          },
          {
            "name": "A. Vanel",
            "role": "Rôle principal"
          },
          {
            "name": "Studio Perlman",
            "role": "Production"
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
