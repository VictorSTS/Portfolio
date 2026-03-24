const assetBase = import.meta.env.BASE_URL;

const withAssetBase = (path) => `${assetBase}${path}`;

export const projects = [
  {
    "slug": "projet-unesco",
    "title": {
      "fr": "Projet UNESCO",
      "en": "UNESCO Project"
    },
    "tagline": {
      "fr": "Site web HTML/CSS/JS en partenariat avec l'UNESCO pour la ville de Fontainebleau.",
      "en": "HTML/CSS/JS website in partnership with UNESCO for the city of Fontainebleau."
    },
    "cover": withAssetBase("assets/images/fontainebleau-square.jpg"),
    "repo": "https://github.com/EpsiDEV/SAE-Unesco",
    "stack": "HTML, CSS, JavaScript, PHP, PostgreSQL",
    "type": {
      "fr": "Projet académique",
      "en": "Academic Project"
    },
    "team": {
      "fr": "Équipe",
      "en": "Team"
    },
    "context": {
      "fr": "Réalisation d'un site vitrine avec intégration front-end et traduction de contenus, dans un cadre projet réel à l'IUT de Marne-la-Vallée.",
      "en": "Creation of a showcase site with front-end integration and content translation, within a real project framework at the IUT of Marne-la-Vallée."
    },
    "skills": [
      {
        "key": "realiser",
        "label": {
          "fr": "Réaliser",
          "en": "Develop"
        },
        "detail": {
          "fr": "Conception et développement des pages du site web.",
          "en": "Design and development of website pages."
        }
      },
      {
        "key": "collaborer",
        "label": {
          "fr": "Collaborer",
          "en": "Collaborate"
        },
        "detail": {
          "fr": "Travail en équipe sur la structure, l'intégration et les contenus.",
          "en": "Teamwork on structure, integration, and content."
        }
      },
      {
        "key": "administrer",
        "label": {
          "fr": "Administrer",
          "en": "Administer"
        },
        "detail": {
          "fr": "Traduction et gestion des contenus via PHP et PostgreSQL.",
          "en": "Translation and content management via PHP and PostgreSQL."
        }
      }
    ]
  },
  {
    "slug": "codex-naturalis",
    "title": {
      "fr": "Projet Java - Codex Naturalis",
      "en": "Java Project - Codex Naturalis"
    },
    "tagline": {
      "fr": "Recréation d'un jeu de plateau complexe en Java avec interface graphique.",
      "en": "Recreation of a complex board game in Java with a graphical interface."
    },
    "cover": withAssetBase("assets/images/codex-naturalis.jpg"),
    "repo": "https://github.com/JulienS-Code/CodexNaturalis/",
    "stack": "Java, Zen5, Git",
    "type": {
      "fr": "Projet académique",
      "en": "Academic Project"
    },
    "team": {
      "fr": "Équipe",
      "en": "Team"
    },
    "context": {
      "fr": "Projet académique orienté POO et conception logicielle. Objectif: reproduire les mécaniques du jeu et proposer une interface fluide.",
      "en": "OOP and software design-oriented academic project. Objective: reproduce game mechanics and provide a fluid interface."
    },
    "skills": [
      {
        "key": "realiser",
        "label": {
          "fr": "Réaliser",
          "en": "Develop"
        },
        "detail": {
          "fr": "Implémentation des règles métier et de l'interface Java.",
          "en": "Implementation of business rules and Java interface."
        }
      },
      {
        "key": "gerer",
        "label": {
          "fr": "Gérer",
          "en": "Manage"
        },
        "detail": {
          "fr": "Découpage des tâches, suivi de progression et livraison incrémentale.",
          "en": "Task breakdown, progress tracking, and incremental delivery."
        }
      },
      {
        "key": "optimiser",
        "label": {
          "fr": "Optimiser",
          "en": "Optimize"
        },
        "detail": {
          "fr": "Réduction de la complexité de certaines vérifications de règles.",
          "en": "Reduced complexity of some rule checks."
        }
      },
      {
        "key": "conduire",
        "label": {
          "fr": "Conduire",
          "en": "Manage Project"
        },
        "detail": {
          "fr": "Choix techniques argumentés et documentation des décisions d'architecture.",
          "en": "Reasoned technical choices and documentation of architectural decisions."
        }
      }
    ]
  },
  {
    "slug": "startrip",
    "title": {
      "fr": "StarTrip",
      "en": "StarTrip"
    },
    "tagline": {
      "fr": "Plateforme de réservation de voyages interplanétaires inspirée de Star Wars.",
      "en": "Platform for interplanetary travel reservations inspired by Star Wars."
    },
    "cover": withAssetBase("assets/images/startrip-logo.jpeg"),
    "repo": "https://github.com/KirushieldDev/StarTrip",
    "stack": "Web stack, Git",
    "type": {
      "fr": "Projet académique",
      "en": "Academic Project"
    },
    "team": {
      "fr": "Équipe",
      "en": "Team"
    },
    "context": {
      "fr": "Plateforme permettant de planifier et réserver des voyages entre différentes planètes, avec un parcours utilisateur complet.",
      "en": "Platform to plan and book trips between different planets, featuring a complete user journey."
    },
    "skills": [
      {
        "key": "realiser",
        "label": {
          "fr": "Réaliser",
          "en": "Develop"
        },
        "detail": {
          "fr": "Développement des fonctionnalités principales de réservation.",
          "en": "Development of core booking functionalities."
        }
      },
      {
        "key": "gerer",
        "label": {
          "fr": "Gérer",
          "en": "Manage"
        },
        "detail": {
          "fr": "Organisation des tâches et suivi de l'avancement en équipe.",
          "en": "Organization of tasks and team progress tracking."
        }
      },
      {
        "key": "administrer",
        "label": {
          "fr": "Administrer",
          "en": "Administer"
        },
        "detail": {
          "fr": "Structuration des données et gestion de la logique applicative.",
          "en": "Structuring data and managing application logic."
        }
      }
    ]
  },
  {
    "slug": "silverlove",
    "title": {
      "fr": "SilverLove",
      "en": "SilverLove"
    },
    "tagline": {
      "fr": "Application de rencontres pensée pour les personnes âgées.",
      "en": "Dating application designed for the elderly."
    },
    "cover": withAssetBase("assets/images/silverlove.png"),
    "repo": "https://github.com/JulienS-Code/SilverLove",
    "stack": "Web stack, UX, Git",
    "type": {
      "fr": "Projet académique",
      "en": "Academic Project"
    },
    "team": {
      "fr": "Équipe",
      "en": "Team"
    },
    "context": {
      "fr": "Application orientée accessibilité avec une interface intuitive et des fonctionnalités adaptées pour simplifier la mise en relation.",
      "en": "Accessibility-oriented application with an intuitive interface and adapted features to simplify connections."
    },
    "skills": [
      {
        "key": "realiser",
        "label": {
          "fr": "Réaliser",
          "en": "Develop"
        },
        "detail": {
          "fr": "Conception et développement des écrans et parcours utilisateurs.",
          "en": "Design and development of screens and user journeys."
        }
      },
      {
        "key": "gerer",
        "label": {
          "fr": "Gérer",
          "en": "Manage"
        },
        "detail": {
          "fr": "Priorisation des fonctionnalités et découpage des livraisons.",
          "en": "Prioritization of features and breakdown of deliveries."
        }
      },
      {
        "key": "collaborer",
        "label": {
          "fr": "Collaborer",
          "en": "Collaborate"
        },
        "detail": {
          "fr": "Travail d'équipe sur le design, les tests et les retours d'usage.",
          "en": "Teamwork on design, testing, and user feedback."
        }
      }
    ]
  },
  {
    "slug": "wikilinks",
    "title": {
      "fr": "WikiLinks",
      "en": "WikiLinks"
    },
    "tagline": {
      "fr": "Jeu multijoueur compétitif de navigation via les hyperliens Wikipédia.",
      "en": "Competitive multiplayer navigation game via Wikipedia hyperlinks."
    },
    "cover": withAssetBase("assets/images/wikipedia-logo.svg"),
    "repo": "https://github.com/Wedja10/SAE_S4/",
    "stack": "Web stack, Git",
    "type": {
      "fr": "Projet académique",
      "en": "Academic Project"
    },
    "team": {
      "fr": "Équipe",
      "en": "Team"
    },
    "context": {
      "fr": "Jeu où les joueurs s'affrontent dans une course à travers Wikipédia en naviguant uniquement via les hyperliens pour atteindre une destination cible.",
      "en": "A game where players race through Wikipedia using only hyperlinks to reach a target destination."
    },
    "skills": [
      {
        "key": "realiser",
        "label": {
          "fr": "Réaliser",
          "en": "Develop"
        },
        "detail": {
          "fr": "Développement des mécaniques de jeu et de navigation.",
          "en": "Development of game mechanics and navigation."
        }
      },
      {
        "key": "collaborer",
        "label": {
          "fr": "Collaborer",
          "en": "Collaborate"
        },
        "detail": {
          "fr": "Coordination en équipe sur l'interface, la logique et les tests.",
          "en": "Team coordination on interface, logic, and tests."
        }
      },
      {
        "key": "optimiser",
        "label": {
          "fr": "Optimiser",
          "en": "Optimize"
        },
        "detail": {
          "fr": "Amélioration des performances de requêtage.",
          "en": "Improvement of query performance."
        }
      }
    ]
  },
  {
    "slug": "ary-feedback",
    "title": {
      "fr": "Ary-Feedback",
      "en": "Ary-Feedback"
    },
    "tagline": {
      "fr": "Système complet de gestion de formulaires de feedback avec éditeur visuel, logique conditionnelle et analytics.",
      "en": "A comprehensive feedback form management system with visual editor, conditional logic, and analytics."
    },
    "cover": withAssetBase("assets/images/ary-feedback-icon.png"),
    "repo": "https://github.com/HayroMaki/Ary-Feedback",
    "stack": "SvelteKit, Svelte Flow, TypeScript",
    "type": {
      "fr": "Projet d'équipe",
      "en": "Team Project"
    },
    "team": {
      "fr": "En équipe",
      "en": "Team"
    },
    "context": {
      "fr": "Plateforme de création, gestion et déploiement de formulaires complexes avec branching, questions conditionnelles, éditeur node-based et tableau de bord analytique personnalisable.",
      "en": "Platform to create, manage, and deploy complex survey flows with branching logic, conditional questions, a node-based editor, and a customizable analytics dashboard."
    },
    "skills": [
      {
        "key": "realiser",
        "label": {
          "fr": "Réaliser",
          "en": "Develop"
        },
        "detail": {
          "fr": "Développement des parcours de formulaires dynamiques avec logique conditionnelle.",
          "en": "Development of dynamic form flows with conditional logic."
        }
      },
      {
        "key": "gerer",
        "label": {
          "fr": "Gérer",
          "en": "Manage"
        },
        "detail": {
          "fr": "Structuration des données de réponses et suivi analytique des soumissions.",
          "en": "Structuring response data and analytics tracking for submissions."
        }
      },
      {
        "key": "collaborer",
        "label": {
          "fr": "Collaborer",
          "en": "Collaborate"
        },
        "detail": {
          "fr": "Travail en équipe sur l'éditeur visuel et le dashboard personnalisable.",
          "en": "Team collaboration on the visual editor and customizable dashboard."
        }
      }
    ]
  }
];