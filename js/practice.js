(() => {
  const ruleBody = (source, selector) => {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = new RegExp(`(?:^|})\\s*${escaped}\\s*\\{([^}]*)\\}`, "i").exec(source);
    return match?.[1] || "";
  };
  const hasCss = (source, selector, property) => new RegExp(`(?:^|;)\\s*${property}\\s*:\\s*[^;]+`, "i").test(ruleBody(source, selector));
  const hasPython = (source, expression) => expression.test(source.replace(/#.*$/gm, ""));
  const hasJavaScript = (source, expression) => expression.test(source);
  const kaliExerciseError = (source, expected) => {
    if (/^(?:nmap|ping|ssh|curl|wget|apt(?:-get)?|sudo|chmod|rm)\b/i.test(source.trim())) {
      return "Cette commande n’est pas utilisée dans le parcours. Le terminal est fictif et ne contacte aucun système ni réseau.";
    }
    return expected;
  };

  const courses = {
    css: {
      label: "CSS",
      title: "Apprendre le CSS en pratiquant",
      description: "Écris des règles de style, vérifie leur structure et observe le résultat sur une carte de profil.",
      symbol: "{ }",
      storageKey: "learnhub-css-practice",
      projectType: "css",
      steps: [
        {
          id: "selector-color",
          title: "Choisir un élément",
          lesson: "Un sélecteur indique à quels éléments appliquer un style. .profil sélectionne les éléments qui portent la classe profil.",
          exercise: "Écris une règle .profil qui change la couleur du texte avec la propriété color.",
          hint: "Une règle CSS a la forme .profil { color: une-couleur; }.",
          solution: ".profil {\n  color: #333;\n}",
          explanation: "Le sélecteur .profil cible la classe et color définit la couleur du texte.",
          validate(code) {
            if (!ruleBody(code, ".profil")) return "Ajoute une règle CSS pour le sélecteur .profil.";
            if (!hasCss(code, ".profil", "color")) return "Ajoute une déclaration color dans la règle .profil.";
            return null;
          }
        },
        {
          id: "typography",
          title: "Soigner les titres",
          lesson: "On peut cibler un élément à l’intérieur d’une classe, par exemple .profil h1. font-size règle la taille du texte.",
          exercise: "Écris une règle .profil h1 contenant font-size et color.",
          hint: "Place les deux propriétés dans le même bloc .profil h1 { ... }.",
          solution: ".profil h1 {\n  font-size: 2rem;\n  color: #c2410c;\n}",
          explanation: "La règle ne touche que les titres h1 de la classe profil et leur applique deux styles.",
          validate(code) {
            if (!ruleBody(code, ".profil h1")) return "Ajoute une règle .profil h1 pour cibler le titre.";
            if (!hasCss(code, ".profil h1", "font-size")) return "Ajoute font-size dans la règle du titre.";
            if (!hasCss(code, ".profil h1", "color")) return "Ajoute color dans la règle du titre.";
            return null;
          }
        },
        {
          id: "box-model",
          title: "Ajouter de l’espace",
          lesson: "padding ajoute de l’espace à l’intérieur d’un bloc. margin ajoute de l’espace à l’extérieur. border dessine une bordure.",
          exercise: "Crée une règle .carte avec padding, margin et border.",
          hint: "Écris les trois propriétés dans le bloc .carte. Une valeur comme 16px convient pour padding et margin.",
          solution: ".carte {\n  padding: 24px;\n  margin: 20px;\n  border: 1px solid #ddd;\n}",
          explanation: "Ces trois propriétés donnent de l’espace autour du contenu et dessinent le contour de la carte.",
          validate(code) {
            if (!ruleBody(code, ".carte")) return "Ajoute une règle pour .carte.";
            for (const property of ["padding", "margin", "border"]) {
              if (!hasCss(code, ".carte", property)) return `Ajoute la propriété ${property} dans la règle .carte.`;
            }
            return null;
          }
        },
        {
          id: "flex-layout",
          title: "Aligner avec Flexbox",
          lesson: "display: flex aligne les éléments enfants sur une ligne ou une colonne. gap règle l’espace entre eux.",
          exercise: "Écris une règle .interets qui utilise display: flex et gap.",
          hint: "La règle commence par .interets { display: flex; ... }.",
          solution: ".interets {\n  display: flex;\n  gap: 12px;\n}",
          explanation: "Flexbox aligne les éléments de la liste et gap espace chaque élément.",
          validate(code) {
            if (!ruleBody(code, ".interets")) return "Ajoute une règle pour .interets.";
            if (!/display\s*:\s*flex/i.test(ruleBody(code, ".interets"))) return "Ajoute display: flex dans cette règle.";
            if (!hasCss(code, ".interets", "gap")) return "Ajoute gap pour espacer les éléments.";
            return null;
          }
        },
        {
          id: "responsive",
          title: "Adapter aux petits écrans",
          lesson: "@media permet d’appliquer des styles selon la taille de l’écran. max-width cible les écrans plus étroits qu’une largeur donnée.",
          exercise: "Ajoute une règle @media (max-width: 600px) contenant .carte et une propriété padding.",
          hint: "Place .carte { padding: ...; } entre les accolades de @media (max-width: 600px).",
          solution: "@media (max-width: 600px) {\n  .carte {\n    padding: 16px;\n  }\n}",
          explanation: "La règle de la carte ne s’applique ici que lorsque la fenêtre fait 600 px ou moins.",
          validate(code) {
            const media = /@media\s*\(\s*max-width\s*:\s*600px\s*\)\s*\{([\s\S]*)\}/i.exec(code);
            if (!media) return "Ajoute une règle @media (max-width: 600px).";
            if (!ruleBody(media[1], ".carte")) return "Place une règle .carte à l’intérieur de @media.";
            if (!hasCss(media[1], ".carte", "padding")) return "Ajoute padding dans la règle .carte de la media query.";
            return null;
          }
        },
        {
          id: "profile-card",
          title: "Styliser ma carte de profil",
          lesson: "Combine les règles CSS apprises pour personnaliser une carte. Le contenu HTML de l’aperçu est déjà fourni : écris les styles.",
          exercise: "Stylise .carte avec un fond, du padding et des coins arrondis. Colore le titre .carte h1 et aligne .interets avec Flexbox.",
          hint: "Utilise les sélecteurs .carte, .carte h1 et .interets. L’aperçu se met à jour pendant que tu écris.",
          solution: ".carte {\n  padding: 24px;\n  background: #fff7ed;\n  border-radius: 16px;\n}\n.carte h1 {\n  color: #c2410c;\n}\n.interets {\n  display: flex;\n  gap: 10px;\n  padding: 0;\n  list-style: none;\n}",
          explanation: "Le fond, les espacements et les sélecteurs créent une carte de profil lisible, avec des intérêts alignés.",
          isProject: true,
          validate(code) {
            if (!ruleBody(code, ".carte")) return "Ajoute une règle .carte pour styliser le bloc principal.";
            if (!hasCss(code, ".carte", "padding") || !hasCss(code, ".carte", "border-radius")) return "Ajoute padding et border-radius à la carte.";
            if (!hasCss(code, ".carte", "background") && !hasCss(code, ".carte", "background-color")) return "Ajoute une couleur de fond à la carte.";
            if (!ruleBody(code, ".carte h1") || !hasCss(code, ".carte h1", "color")) return "Ajoute une couleur au titre avec .carte h1.";
            if (!/display\s*:\s*flex/i.test(ruleBody(code, ".interets"))) return "Utilise display: flex dans la règle .interets.";
            return null;
          }
        }
      ]
    },
    javascript: {
      label: "JavaScript",
      title: "Apprendre JavaScript en pratiquant",
      description: "Écris du JavaScript, reçois des corrections et teste le projet final dans une console isolée.",
      symbol: "JS",
      storageKey: "learnhub-javascript-practice",
      projectType: "javascript",
      steps: [
        {
          id: "variables-output",
          title: "Variables et affichage",
          lesson: "const déclare une valeur qui ne sera pas réassignée. console.log affiche une valeur dans la console.",
          exercise: "Déclare une constante nom avec une chaîne de texte et affiche-la avec console.log.",
          hint: 'Commence par const nom = "Ada"; puis écris console.log(nom);.',
          solution: 'const nom = "Ada";\nconsole.log(nom);',
          explanation: "La constante conserve le texte et console.log affiche sa valeur.",
          validate(code) {
            if (!hasJavaScript(code, /\b(?:const|let)\s+\w+\s*=/)) return "Déclare une variable avec const ou let.";
            if (!hasJavaScript(code, /console\s*\.\s*log\s*\(/)) return "Affiche la variable avec console.log(...).";
            return null;
          }
        },
        {
          id: "conditions",
          title: "Prendre une décision",
          lesson: "if exécute un bloc si une condition est vraie. else fournit le bloc de repli quand elle est fausse.",
          exercise: "Écris une condition if / else et affiche un message dans les deux cas.",
          hint: "Utilise if (condition) { ... } else { ... }, avec console.log dans chaque bloc.",
          solution: 'const heure = 10;\nif (heure < 12) {\n  console.log("Bonjour");\n} else {\n  console.log("Bon après-midi");\n}',
          explanation: "Le programme choisit un seul des deux blocs selon le résultat de la condition.",
          validate(code) {
            if (!/\bif\s*\([^)]*\)\s*\{/.test(code)) return "Ajoute une condition if avec des parenthèses et un bloc.";
            if (!/\belse\s*\{/.test(code)) return "Ajoute un bloc else pour l’autre cas.";
            if ((code.match(/console\s*\.\s*log\s*\(/g) || []).length < 2) return "Ajoute console.log dans chacun des deux blocs.";
            return null;
          }
        },
        {
          id: "functions",
          title: "Créer une fonction",
          lesson: "Une fonction rassemble des instructions réutilisables. return renvoie son résultat à l’endroit où elle est appelée.",
          exercise: "Déclare une fonction qui utilise return, puis appelle cette fonction.",
          hint: "Écris function saluer() { return ...; }, puis saluer();.",
          solution: 'function saluer() {\n  return "Bonjour !";\n}\nconsole.log(saluer());',
          explanation: "La fonction prépare une valeur avec return et son appel exécute son contenu.",
          validate(code) {
            const declaration = /\bfunction\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{([\s\S]*?)\}/.exec(code);
            if (!declaration) return "Déclare une fonction avec le mot-clé function.";
            if (!/\breturn\b/.test(declaration[2])) return "Ajoute return à l’intérieur de la fonction.";
            if (!new RegExp(`\\b${declaration[1]}\\s*\\(`).test(code.slice(declaration[0].length))) return "Appelle la fonction après l’avoir déclarée.";
            return null;
          }
        },
        {
          id: "arrays-loops",
          title: "Parcourir une liste",
          lesson: "Un tableau stocke plusieurs valeurs dans l’ordre. for...of parcourt les valeurs une par une.",
          exercise: "Déclare un tableau de langages, parcours-le avec for...of et affiche chaque valeur.",
          hint: "Utilise const langages = [...]; puis for (const langage of langages) { console.log(langage); }.",
          solution: 'const langages = ["HTML", "CSS", "JavaScript"];\nfor (const langage of langages) {\n  console.log(langage);\n}',
          explanation: "La boucle prend chaque valeur du tableau et l’affiche à tour de rôle.",
          validate(code) {
            if (!/\b(?:const|let)\s+\w+\s*=\s*\[[\s\S]*?\]/.test(code)) return "Déclare un tableau avec des crochets [ ... ].";
            if (!/\bfor\s*\(\s*(?:const|let)\s+\w+\s+of\s+\w+\s*\)/.test(code)) return "Parcours le tableau avec une boucle for...of.";
            if (!/console\s*\.\s*log\s*\(/.test(code)) return "Affiche chaque valeur avec console.log.";
            return null;
          }
        },
        {
          id: "dom-events",
          title: "Réagir à un clic",
          lesson: "document.querySelector sélectionne un élément de la page. addEventListener associe une action à un événement.",
          exercise: "Écris un code qui sélectionne un bouton, écoute l’événement click et change textContent de l’élément.",
          hint: "La structure ressemble à bouton.addEventListener(\"click\", () => { ... });.",
          solution: 'const bouton = document.querySelector("button");\nbouton.addEventListener("click", () => {\n  bouton.textContent = "Merci !";\n});',
          explanation: "Le navigateur sélectionne le bouton, puis exécute la fonction de rappel lorsqu’on clique dessus.",
          validate(code) {
            if (!/document\s*\.\s*querySelector\s*\(/.test(code)) return "Sélectionne un élément avec document.querySelector(...).";
            if (!/addEventListener\s*\(\s*["']click["']/.test(code)) return "Ajoute un écouteur pour l’événement click.";
            if (!/\.textContent\s*=/.test(code)) return "Change le texte avec la propriété textContent.";
            return null;
          }
        },
        {
          id: "quiz-project",
          title: "Créer un mini-quiz",
          lesson: "Rassemble les variables, les tableaux, les conditions, les boucles et console.log pour calculer un score.",
          exercise: "Écris un petit programme qui parcourt des réponses, compte les bonnes réponses avec if et affiche un score avec console.log.",
          hint: "Crée un tableau, initialise un score, parcours les questions, incrémente le score si la réponse est bonne, puis affiche le résultat.",
          solution: 'const questions = [\n  { texte: "2 + 2", bonne: true },\n  { texte: "Le soleil est une planète", bonne: false }\n];\nlet score = 0;\nfor (const question of questions) {\n  if (question.bonne) score++;\n}\nconsole.log(`Score : ${score}/${questions.length}`);',
          explanation: "Le programme parcourt les questions, ajoute un point pour chaque réponse correcte et affiche le score.",
          isProject: true,
          validate(code) {
            if (!/\b(?:const|let)\s+\w+\s*=\s*\[[\s\S]*?\]/.test(code)) return "Ajoute un tableau de questions.";
            if (!/\bfor\s*\(|\.forEach\s*\(/.test(code)) return "Parcours les questions avec une boucle ou forEach.";
            if (!/\bif\s*\(/.test(code)) return "Utilise if pour compter les bonnes réponses.";
            if (!/console\s*\.\s*log\s*\(/.test(code)) return "Affiche le score avec console.log.";
            return null;
          }
        }
      ]
    },
    python: {
      label: "Python",
      title: "Apprendre Python en pratiquant",
      description: "Progresse pas à pas, vérifie la syntaxe Python et exécute ton mini-projet dans Python Lab.",
      symbol: "Py",
      storageKey: "learnhub-python-practice",
      projectType: "python",
      steps: [
        {
          id: "first-print",
          title: "Afficher un message",
          lesson: "print(...) affiche du texte ou une valeur. Les chaînes de texte sont entourées de guillemets.",
          exercise: "Écris un programme qui affiche le message Bonjour le monde avec print.",
          hint: 'Écris print("Bonjour le monde").',
          solution: 'print("Bonjour le monde")',
          explanation: "print envoie le texte entre parenthèses vers la sortie du programme.",
          validate(code) {
            if (!/print\s*\(/.test(code)) return "Utilise print(...) pour afficher un message.";
            const language = window.LearnHubGuidedI18n?.language() || "fr";
            const message = language === "en" ? "Hello world" : language === "ar" ? "مرحباً بالعالم" : "Bonjour le monde";
            if (!hasPython(code, new RegExp(`["']${message}["']`))) return `Le message affiché doit contenir « ${message} ».`;
            return null;
          }
        },
        {
          id: "variables",
          title: "Enregistrer une valeur",
          lesson: "Une variable associe un nom à une valeur. Tu peux ensuite utiliser ce nom dans print.",
          exercise: "Stocke le prénom Ada dans une variable nom puis affiche cette variable.",
          hint: 'Écris nom = "Ada" puis print(nom).',
          solution: 'nom = "Ada"\nprint(nom)',
          explanation: "La variable nom garde le texte et print(nom) affiche sa valeur.",
          validate(code) {
            const name = window.LearnHubGuidedI18n?.language() === "fr" ? "nom" : "name";
            if (!hasPython(code, new RegExp(`\\b${name}\\s*=\\s*["'][^"']+["']`))) return `Crée une variable ${name} avec une chaîne de texte.`;
            if (!hasPython(code, new RegExp(`\\bprint\\s*\\(\\s*${name}\\s*\\)`))) return `Affiche la variable avec print(${name}).`;
            return null;
          }
        },
        {
          id: "calculations",
          title: "Faire un calcul",
          lesson: "Python sait faire des opérations comme +, -, * et /. Le résultat peut être enregistré dans une variable.",
          exercise: "Calcule 6 multiplié par 7 dans une variable total, puis affiche le résultat.",
          hint: "Utilise total = 6 * 7, puis print(total).",
          solution: "total = 6 * 7\nprint(total)",
          explanation: "L’opérateur * multiplie les nombres et print affiche la valeur enregistrée dans total.",
          validate(code) {
            if (!hasPython(code, /\btotal\s*=\s*6\s*\*\s*7/)) return "Enregistre le calcul 6 * 7 dans total.";
            if (!hasPython(code, /\bprint\s*\(\s*total\s*\)/)) return "Affiche le résultat avec print(total).";
            return null;
          }
        },
        {
          id: "conditions",
          title: "Faire un choix",
          lesson: "if teste une condition. else contient les instructions à utiliser quand la condition est fausse. Les deux-points et l’indentation comptent.",
          exercise: "Écris une condition qui compare age à 18, puis affiche un message dans les blocs if et else.",
          hint: "La forme est if age >= 18: suivie de lignes indentées, puis else:.",
          solution: 'age = 20\nif age >= 18:\n    print("Majeur")\nelse:\n    print("Mineur")',
          explanation: "Python teste age >= 18 et n’exécute qu’un des deux blocs indentés.",
          validate(code) {
            if (!hasPython(code, /\bif\s+.+:\s*$/m)) return "Ajoute une condition if qui se termine par deux-points.";
            if ((code.match(/^\s+print\s*\(/gm) || []).length < 2) return "Ajoute un print indenté dans chacun des blocs if et else.";
            if (!hasPython(code, /^\s*else\s*:\s*$/m)) return "Ajoute un bloc else:.";
            return null;
          }
        },
        {
          id: "loops",
          title: "Répéter avec une liste",
          lesson: "Une liste regroupe plusieurs valeurs. for parcourt chaque valeur et exécute le bloc indenté.",
          exercise: "Crée une liste fruits avec deux valeurs, parcours-la avec for et affiche chaque fruit.",
          hint: 'Écris fruits = ["pomme", "poire"] puis for fruit in fruits: et indente print(fruit).',
          solution: 'fruits = ["pomme", "poire"]\nfor fruit in fruits:\n    print(fruit)',
          explanation: "La boucle attribue chaque valeur à fruit et exécute print une fois par élément.",
          validate(code) {
            if (!hasPython(code, /\bfruits\s*=\s*\[[\s\S]*\]/)) return "Crée la liste fruits entre crochets.";
            if (!hasPython(code, /^\s*for\s+\w+\s+in\s+fruits\s*:\s*$/m)) return "Ajoute une boucle for qui parcourt fruits et se termine par deux-points.";
            if (!hasPython(code, /^\s+print\s*\(/m)) return "Affiche chaque élément avec un print indenté dans la boucle.";
            return null;
          }
        },
        {
          id: "score-project",
          title: "Créer un quiz de score",
          lesson: "Un mini-quiz combine une fonction, une boucle, une condition et un résultat affiché.",
          exercise: "Écris une fonction qui compte les bonnes réponses d’une liste, renvoie le score et l’affiche.",
          hint: "Crée une fonction, initialise score, parcours les réponses avec for, ajoute un point dans if, puis return score.",
          solution: 'def calculer_score(reponses):\n    score = 0\n    for reponse in reponses:\n        if reponse:\n            score += 1\n    return score\n\nreponses = [True, False, True]\nprint(f"Score : {calculer_score(reponses)}")',
          explanation: "La fonction parcourt les réponses, compte les valeurs vraies puis renvoie et affiche le total.",
          isProject: true,
          validate(code) {
            if (!hasPython(code, /^\s*def\s+\w+\s*\([^)]*\)\s*:\s*$/m)) return "Déclare une fonction Python avec def et deux-points.";
            if (!hasPython(code, /^\s+for\s+\w+\s+in\s+\w+\s*:\s*$/m)) return "Ajoute une boucle for indentée dans la fonction.";
            if (!hasPython(code, /^\s+if\s+.+:\s*$/m)) return "Ajoute une condition if indentée.";
            if (!hasPython(code, /^\s+return\s+\w+/m)) return "Renvoie le score avec return.";
            if (!hasPython(code, /\bprint\s*\(/)) return "Affiche le résultat avec print(...).";
            return null;
          }
        }
      ]
    },
    kali: {
      label: "Kali Linux",
      title: "Découvrir Kali Linux en toute sécurité",
      description: "Apprends des commandes Linux de base dans un terminal fictif, sans accès au système ni au réseau.",
      symbol: "$_",
      storageKey: "learnhub-kali-practice",
      projectType: "kali",
      steps: [
        {
          id: "current-directory",
          title: "Connaître son dossier",
          lesson: "pwd affiche le chemin du dossier courant. Dans cette simulation, le départ est /home/kali.",
          exercise: "Tape la commande pwd pour afficher le dossier courant simulé.",
          hint: "La commande attendue tient en trois lettres : pwd.",
          solution: "pwd",
          explanation: "Le terminal simulé répond /home/kali. Aucun dossier réel n’est consulté.",
          validate(code) {
            if (code.trim() !== "pwd") return kaliExerciseError(code, "Tape uniquement pwd pour afficher le dossier courant simulé.");
            return { output: "/home/kali" };
          }
        },
        {
          id: "list-files",
          title: "Lister les fichiers",
          lesson: "ls affiche les fichiers et dossiers présents à un emplacement. Ici, la liste est fictive et reste dans l’exercice.",
          exercise: "Utilise ls pour voir le contenu du dossier de départ.",
          hint: "La commande qui liste un dossier est ls.",
          solution: "ls",
          explanation: "La simulation affiche des exemples de dossiers Documents, Downloads et Desktop.",
          validate(code) {
            if (!/^ls(?:\s+-la)?$/.test(code.trim())) return kaliExerciseError(code, "Utilise ls ou ls -la pour afficher la liste simulée.");
            return { output: "Desktop  Documents  Downloads  notes.txt" };
          }
        },
        {
          id: "change-directory",
          title: "Se déplacer dans Documents",
          lesson: "cd change de dossier. On peut enchaîner des commandes pour se déplacer puis vérifier le nouveau chemin avec pwd.",
          exercise: "Écris cd Documents puis, sur la ligne suivante, pwd.",
          hint: "Écris deux commandes sur deux lignes. Pas besoin de point-virgule ni d’autre commande.",
          solution: "cd Documents\npwd",
          explanation: "La simulation se déplace dans /home/kali/Documents, puis pwd affiche ce chemin.",
          validate(code) {
            if (!/^cd Documents\s+pwd$/i.test(code.trim())) return kaliExerciseError(code, "Écris cd Documents puis pwd, sur deux lignes.");
            return { output: "/home/kali/Documents" };
          }
        },
        {
          id: "read-notes",
          title: "Lire un fichier",
          lesson: "cat affiche le contenu d’un fichier texte. L’exercice ne lit qu’un fichier fictif fourni pour l’apprentissage.",
          exercise: "Affiche le fichier /home/kali/Documents/todo.md avec cat.",
          hint: "Ajoute le chemin du fichier après la commande cat.",
          solution: "cat /home/kali/Documents/todo.md",
          explanation: "cat affiche les notes fictives du laboratoire local à cet exercice.",
          validate(code) {
            if (code.trim() !== "cat /home/kali/Documents/todo.md") return kaliExerciseError(code, "Utilise cat avec le chemin /home/kali/Documents/todo.md.");
            return { output: "À apprendre :\n- HTML et CSS\n- Python\n- Rester dans un laboratoire autorisé" };
          }
        },
        {
          id: "search-notes",
          title: "Rechercher dans les notes",
          lesson: "grep cherche un mot dans un fichier. Ici, la recherche se fait dans le texte fictif de l’exercice.",
          exercise: "Cherche le mot Python dans le fichier de notes avec grep.",
          hint: "La commande prend d’abord le mot recherché, puis le chemin du fichier.",
          solution: "grep Python /home/kali/Documents/todo.md",
          explanation: "grep renvoie uniquement la ligne fictive qui contient Python.",
          validate(code) {
            if (code.trim() !== "grep Python /home/kali/Documents/todo.md") return kaliExerciseError(code, "Utilise grep Python suivi du chemin du fichier de notes.");
            return { output: "- Python" };
          }
        },
        {
          id: "safe-folder-project",
          title: "Créer un dossier de notes",
          lesson: "Mets les commandes dans l’ordre : créer un dossier, créer un fichier dedans, puis lister ce dossier. Elles sont simulées dans une arborescence temporaire.",
          exercise: "Crée un dossier nommé mon-projet, crée mon-projet/notes.txt, puis affiche son contenu avec ls mon-projet. Écris une commande par ligne.",
          hint: "Les trois commandes autorisées ici sont mkdir, touch et ls. La simulation refuse toute autre commande.",
          solution: "mkdir mon-projet\ntouch mon-projet/notes.txt\nls mon-projet",
          explanation: "Le terminal fictif crée un dossier et un fichier en mémoire, puis confirme le résultat. Rien n’est écrit sur l’ordinateur.",
          isProject: true,
          validate: simulateKaliProject
        }
      ]
    }
  };

  function simulateKaliProject(source) {
    const lines = source.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const directories = new Set();
    const files = new Set();
    const output = [];
    for (const line of lines) {
      let match = /^mkdir ([a-z][a-z0-9-]{0,30})$/i.exec(line);
      if (match) {
        if (directories.has(match[1])) return { error: "Ce dossier existe déjà dans la simulation." };
        directories.add(match[1]);
        output.push(`Dossier créé : ${match[1]}`);
        continue;
      }
      match = /^touch ([a-z][a-z0-9-]{0,30})\/notes\.txt$/i.exec(line);
      if (match) {
        if (!directories.has(match[1])) return { error: "Crée le dossier avant d’y ajouter notes.txt." };
        files.add(match[1]);
        output.push(`Fichier créé : ${match[1]}/notes.txt`);
        continue;
      }
      match = /^ls ([a-z][a-z0-9-]{0,30})$/i.exec(line);
      if (match) {
        if (!directories.has(match[1])) return { error: "Ce dossier n’existe pas encore dans la simulation." };
        if (!files.has(match[1])) return { error: "Le dossier est vide. Crée notes.txt avant de le lister." };
        output.push("notes.txt");
        continue;
      }
      return { error: "Commande refusée : seuls mkdir, touch et ls sont disponibles dans cet exercice simulé." };
    }
    if (output.length !== 3 || !output[2].includes("notes.txt")) {
      return { error: "Termine les trois étapes : mkdir, touch, puis ls, une commande par ligne." };
    }
    return { output: output.join("\n") };
  }

  const path = new URLSearchParams(location.search).get("path");
  const course = courses[path];
  const i18n = window.LearnHubGuidedI18n;
  const text = (key, values) => i18n?.common(key, values) || key;
  const localizedCourse = (key) => i18n?.course(path, key, course?.[key]) || course?.[key] || "";
  const localizedStep = (step, key) => i18n?.step(path, step.id, key, step[key]) || step[key];
  const listElement = document.querySelector("#step-list");
  const content = document.querySelector("#lesson-content");
  const progressCount = document.querySelector("#progress-count");
  const progressResume = document.querySelector("#progress-resume");
  const progressPercent = document.querySelector("#progress-percent");
  const progressTrack = document.querySelector(".guided-progress-track");
  const escapeHTML = window.LearnHubUtils?.escapeHTML || ((value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]));
  const storage = window.LearnHubStorage || {
    get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); return true; } catch { return false; } }
  };

  if (!course) {
    document.title = `${text("missingPath")} — ${text("title")}`;
    content.innerHTML = `<section class="guided-finish"><h2>${text("missingPath")}</h2><p>${text("missingPathCopy")}</p><a class="guided-path-link" href="index.html">${text("home")}</a></section>`;
    listElement.closest(".guided-step-nav").hidden = true;
    document.querySelector(".guided-progress").hidden = true;
    return;
  }

  document.title = `${localizedCourse("title")} — ${text("title")}`;
  document.querySelector("#path-eyebrow").textContent = localizedCourse("eyebrow");
  document.querySelector("#path-title").textContent = localizedCourse("title");
  document.querySelector("#path-description").textContent = localizedCourse("description");
  document.querySelector("#path-symbol").textContent = course.symbol;
  document.querySelector(".guided-progress-track").setAttribute("aria-label", `${text("stepsHeading")}: ${course.label}`);
  const activeNav = path === "python" ? 'a[href="python.html"]' : path === "kali" ? 'a[href="kali.html"]' : 'a[href="web.html"]';
  document.querySelector(activeNav)?.setAttribute("aria-current", "page");
  document.querySelector(activeNav)?.classList.add("active");

  const readState = () => {
    try {
      const saved = JSON.parse(storage.get(course.storageKey) || "{}");
      const completed = Array.isArray(saved.completed)
        ? [...new Set(saved.completed.filter((id) => course.steps.some((step) => step.id === id)))]
        : [];
      const drafts = saved.drafts && typeof saved.drafts === "object" && !Array.isArray(saved.drafts) ? saved.drafts : {};
      const index = Number.isInteger(saved.index) ? Math.min(Math.max(saved.index, 0), course.steps.length) : 0;
      const finished = saved.finished === true && index === course.steps.length;
      return { index: finished ? course.steps.length : Math.min(index, course.steps.length - 1), completed, drafts, finished };
    } catch {
      return { index: 0, completed: [], drafts: {}, finished: false };
    }
  };
  const state = readState();

  const updateProgress = () => {
    const done = state.completed.length;
    const percent = Math.round(done / course.steps.length * 100);
    progressCount.textContent = text("stepCount", { done, total: course.steps.length });
    progressPercent.textContent = `${percent} %`;
    progressTrack.setAttribute("aria-valuenow", String(percent));
    progressTrack.setAttribute("aria-label", `${text("stepsHeading")}: ${course.label}`);
    progressTrack.querySelector("span").style.width = `${percent}%`;
    progressResume.textContent = state.finished
      ? text("finishedProgress")
      : text("savedProgress");
  };
  const persist = () => {
    storage.set(course.storageKey, JSON.stringify(state));
    updateProgress();
  };
  const renderNavigation = () => {
    listElement.innerHTML = course.steps.map((step, index) => {
      const completed = state.completed.includes(step.id);
      const available = index <= state.index || completed;
      const current = index === state.index && !state.finished;
      const label = completed ? text("completed") : current ? text("current") : text("upcoming");
      return `<li><button class="guided-step-button${current ? " is-current" : ""}${completed ? " is-complete" : ""}" type="button" data-step-index="${index}"${available ? "" : " disabled"}${current ? ' aria-current="step"' : ""}><span class="guided-step-number">${completed ? "✓" : index + 1}</span><span class="guided-step-label"><strong>${escapeHTML(localizedStep(step, "title"))}</strong><small>${label}</small></span></button></li>`;
    }).join("");
  };

  const cssPreview = (source) => {
    const safeCSS = source.replace(/</g, "\\3C ");
    const [profile, greeting, intro, interests, drawing, music, nature] = i18n?.course("css", "previewLabels", null) ||
      ["MON PROFIL", "Bonjour, Alex !", "J’apprends à créer des sites web et j’aime le dessin, la musique et les balades.", "Mes centres d’intérêt", "Dessin", "Musique", "Nature"];
    const lang = i18n?.language() || "fr";
    return `<!doctype html><html lang="${lang}" dir="${lang === "ar" ? "rtl" : "ltr"}"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:24px;background:#f8f9fa;font:15px Arial,sans-serif;color:#20242a}.carte{max-width:540px;margin:12px auto;padding:24px;background:#fff;border-radius:12px}.carte h1{margin-top:0}.interets{display:flex;gap:8px;list-style:none;padding:0}.interets li{padding:6px 10px;border-radius:99px;background:#eee}</style><style>${safeCSS}</style></head><body><main class="profil"><article class="carte"><p>${profile}</p><h1>${greeting}</h1><p>${intro}</p><h2>${interests}</h2><ul class="interets"><li>${drawing}</li><li>${music}</li><li>${nature}</li></ul></article></main></body></html>`;
  };

  const jsWorkerCode = () => `const blocked = () => { throw new Error(${JSON.stringify(text("blockedJavaScript"))}); };
for (const key of ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "importScripts", "Worker"]) {
  try { Object.defineProperty(globalThis, key, { value: blocked, configurable: false, writable: false }); } catch {}
  try { Object.defineProperty(WorkerGlobalScope.prototype, key, { value: blocked, configurable: false, writable: false }); } catch {}
}
const messages = [];
const format = (value) => typeof value === "string" ? value : (() => { try { return JSON.stringify(value); } catch { return String(value); } })();
const write = (...values) => { if (messages.join("\\n").length < 12000) messages.push(values.map(format).join(" ")); };
globalThis.console = Object.freeze({ log: write, info: write, warn: write, error: write });
self.onmessage = ({ data }) => {
  try {
    const result = new Function(data.code)();
    Promise.resolve(result).then(() => self.postMessage({ output: messages.join("\\n") })).catch((error) => self.postMessage({ error: String(error && error.message || error) }));
  } catch (error) { self.postMessage({ error: String(error && error.message || error) }); }
};`;

  const runJavaScript = (source, output) => new Promise((resolve) => {
    if (/\b(?:import|export)\b/.test(source)) {
      resolve(text("blockedJavaScript"));
      return;
    }
    const url = URL.createObjectURL(new Blob([jsWorkerCode()], { type: "text/javascript" }));
    const worker = new Worker(url);
    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(url);
      output.textContent = result.error
        ? `${text("javaScriptError")}: ${result.error}`
        : result.output || text("noJavaScriptOutput");
      resolve(result.error || null);
    };
    worker.onmessage = (event) => finish(event.data || {});
    worker.onerror = (event) => {
      event.preventDefault();
      finish({ error: event.message || text("executionError") });
    };
    const timeout = window.setTimeout(() => finish({ error: text("javaScriptTimeout") }), 1000);
    worker.postMessage({ code: source });
  });

  const renderProject = (source) => {
    if (course.projectType === "css") {
      return `<div class="guided-preview-wrap"><div class="guided-preview-heading"><h3>${text("cssPreview")}</h3><span>${text("cssPreviewHelp")}</span></div><iframe class="guided-preview" title="${text("cssPreview")}" sandbox=""></iframe></div>`;
    }
    if (course.projectType === "javascript") {
      return `<div class="guided-preview-wrap"><div class="guided-preview-heading"><h3>${text("jsConsole")}</h3><span>${text("jsConsoleHelp")}</span></div><button class="guided-secondary-button" type="button" data-run-js>${text("runJavaScript")}</button><pre class="guided-run-output" data-run-output aria-live="polite">${text("jsOutputPlaceholder")}</pre></div>`;
    }
    if (course.projectType === "python") {
      return `<div class="guided-preview-wrap"><div class="guided-preview-heading"><h3>${text("pythonLab")}</h3><span>${text("pythonLabHelp")}</span></div><button class="guided-secondary-button" type="button" data-run-python>${text("openPythonLab")}</button></div>`;
    }
    return `<div class="guided-preview-wrap"><div class="guided-preview-heading"><h3>${text("kaliTerminal")}</h3><span>${text("kaliTerminalHelp")}</span></div><pre class="guided-run-output" data-kali-output>${escapeHTML(source ? simulateKaliProject(source).output || "Vérifie tes commandes pour voir le résultat." : "Le résultat simulé apparaîtra ici.")}</pre></div>`;
  };

  const renderFinished = () => {
    const project = course.steps[course.steps.length - 1];
    const source = state.drafts[project.id] || "";
    const result = renderProject(source);
    content.innerHTML = `<section class="guided-finish"><p class="eyebrow">${text("pathFinished")}</p><h2>${text("finishedTitle", { course: course.label })}</h2><p>${text("finishedCopy")}</p><button class="guided-secondary-button" type="button" data-review-project>${text("reviewProject")}</button>${result}<details class="guided-project-code"><summary>${text("showProjectCode")}</summary><pre><code>${escapeHTML(source)}</code></pre></details></section>`;
    bindProjectActions(source);
    if (course.projectType === "css") content.querySelector(".guided-preview").srcdoc = cssPreview(source);
  };

  const bindProjectActions = (source) => {
    const runJavaScriptButton = content.querySelector("[data-run-js]");
    runJavaScriptButton?.addEventListener("click", async () => {
      const output = content.querySelector("[data-run-output]");
      runJavaScriptButton.disabled = true;
      output.textContent = text("running");
      const currentCode = content.querySelector("#practice-answer")?.value ?? source;
      const error = await runJavaScript(currentCode, output);
      runJavaScriptButton.disabled = false;
      if (error) output.dataset.error = "true";
    });
    content.querySelector("[data-run-python]")?.addEventListener("click", () => {
      const currentCode = content.querySelector("#practice-answer")?.value ?? source;
      window.LearnHubPyodide?.open(currentCode);
    });
  };

  const renderStep = () => {
    const step = course.steps[state.index];
    const completed = state.completed.includes(step.id);
    const savedCode = state.drafts[step.id] || "";
    const stepNumber = text("stepMeta", { current: state.index + 1, total: course.steps.length });
    content.innerHTML = `<article class="guided-lesson">
      <div class="guided-lesson-meta"><span>${stepNumber}</span><span class="guided-level">${text("beginner")}</span></div>
      <h2>${escapeHTML(localizedStep(step, "title"))}</h2>
      <section class="guided-explanation"><h3>${text("lesson")}</h3><p>${escapeHTML(localizedStep(step, "lesson"))}</p></section>
      <section class="guided-task"><h3>${text("exercise")}</h3><p>${escapeHTML(localizedStep(step, "exercise"))}</p></section>
      <label class="guided-editor-label" for="practice-answer">${course.projectType === "kali" ? text("kaliCodeLabel") : text(`${course.projectType}CodeLabel`)}</label>
      <textarea class="guided-editor" id="practice-answer" rows="${step.isProject ? 12 : 7}" maxlength="20000" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-describedby="editor-help">${escapeHTML(savedCode)}</textarea>
      <p class="guided-editor-help" id="editor-help">${course.projectType === "kali" ? text("kaliEditorHelp") : text("editorHelp")}</p>
      ${step.isProject ? renderProject(savedCode) : ""}
      <div class="guided-actions">
        <button class="guided-primary-button" type="button" data-check>${text("check")}</button>
        <button class="guided-secondary-button" type="button" data-hint aria-expanded="false">${text("hint")}</button>
        <button class="guided-secondary-button" type="button" data-solution aria-expanded="false">${text("solution")}</button>
      </div>
      <p class="guided-hint" data-hint-content hidden>${escapeHTML(localizedStep(step, "hint"))}</p>
      <section class="guided-solution" data-solution-content hidden><h3>${text("possibleSolution")}</h3><pre><code>${escapeHTML(localizedStep(step, "solution"))}</code></pre><p>${escapeHTML(localizedStep(step, "explanation"))}</p></section>
      <div class="guided-feedback" data-feedback role="status" aria-live="polite" hidden></div>
      <div class="guided-continue-row"><button class="guided-primary-button" type="button" data-next${completed ? "" : " disabled"}>${state.index === course.steps.length - 1 ? text("finish") : text("next")} <span aria-hidden="true">→</span></button></div>
    </article>`;

    const editor = content.querySelector("#practice-answer");
    const checkButton = content.querySelector("[data-check]");
    const feedback = content.querySelector("[data-feedback]");
    const nextButton = content.querySelector("[data-next]");
    const hintButton = content.querySelector("[data-hint]");
    const solutionButton = content.querySelector("[data-solution]");
    let validatedSource = completed ? savedCode : null;
    if (step.isProject && course.projectType === "css") content.querySelector(".guided-preview").srcdoc = cssPreview(savedCode);

    editor.addEventListener("input", () => {
      state.drafts[step.id] = editor.value;
      persist();
      if (step.isProject && course.projectType === "css") content.querySelector(".guided-preview").srcdoc = cssPreview(editor.value);
      if (step.isProject && course.projectType === "kali") {
        const simulated = simulateKaliProject(editor.value);
        content.querySelector("[data-kali-output]").textContent = simulated.output || "Vérifie tes commandes pour voir le résultat.";
      }
      if (editor.value !== validatedSource) {
        nextButton.disabled = true;
        feedback.hidden = true;
      }
    });

    hintButton.addEventListener("click", () => {
      const hint = content.querySelector("[data-hint-content]");
      hint.hidden = !hint.hidden;
      hintButton.setAttribute("aria-expanded", String(!hint.hidden));
      hintButton.textContent = hint.hidden ? text("hint") : text("hideHint");
    });
    solutionButton.addEventListener("click", () => {
      const solution = content.querySelector("[data-solution-content]");
      solution.hidden = !solution.hidden;
      solutionButton.setAttribute("aria-expanded", String(!solution.hidden));
      solutionButton.textContent = solution.hidden ? text("solution") : text("hideSolution");
    });

    checkButton.addEventListener("click", async () => {
      checkButton.disabled = true;
      checkButton.textContent = course.projectType === "python" ? text("checkingSyntax") : text("checking");
      feedback.hidden = true;
      try {
        let validation = step.validate(editor.value);
        let syntaxValidation = false;
        if (typeof validation === "string") validation = { error: validation };
        if (!validation?.error && course.projectType === "javascript") {
          try { new Function(editor.value); }
          catch (error) {
            syntaxValidation = true;
            validation = { error: `${text("javaScriptSyntax")}: ${error.message}` };
          }
        }
        if (!validation?.error && course.projectType === "python") {
          const syntaxError = await window.LearnHubPyodide.validateSyntax(editor.value);
          if (syntaxError) {
            syntaxValidation = true;
            validation = { error: `${text("pythonSyntax")}: ${syntaxError}` };
          }
        }
        if (validation?.error) {
          feedback.className = "guided-feedback is-error";
          const explanation = syntaxValidation
            ? validation.error
            : i18n?.validationError(path, step.id, validation.error) || validation.error;
          feedback.innerHTML = `<strong>${text("notYet")}</strong> ${escapeHTML(explanation)} ${text("retry")}`;
          feedback.hidden = false;
          return;
        }

        if (course.projectType === "kali" && validation?.output) {
          const result = content.querySelector("[data-kali-output]");
          if (result) result.textContent = validation.output;
        }
        state.completed = [...new Set([...state.completed, step.id])];
        state.drafts[step.id] = editor.value;
        validatedSource = editor.value;
        persist();
        renderNavigation();
        feedback.className = "guided-feedback is-success";
        feedback.innerHTML = `<strong>${text("correct")}</strong> ${escapeHTML(localizedStep(step, "explanation"))}${completed ? "" : text("stepValidated")}`;
        feedback.hidden = false;
        nextButton.disabled = false;
      } catch (error) {
        feedback.className = "guided-feedback is-error";
        feedback.innerHTML = `<strong>${text("impossible")}</strong> ${escapeHTML(error?.message || String(error))} ${text("retryConnection")}`;
        feedback.hidden = false;
      } finally {
        checkButton.disabled = false;
        checkButton.textContent = text("check");
      }
    });

    bindProjectActions(savedCode);
    nextButton.addEventListener("click", () => {
      if (!state.completed.includes(step.id)) return;
      if (state.index === course.steps.length - 1) {
        state.index = course.steps.length;
        state.finished = true;
      } else {
        state.index += 1;
      }
      persist();
      render();
      document.querySelector(".guided-lesson, .guided-finish")?.scrollIntoView({ block: "start" });
    });
  };

  const render = () => {
    renderNavigation();
    updateProgress();
    if (state.finished) renderFinished();
    else renderStep();
  };
  listElement.addEventListener("click", (event) => {
    const button = event.target.closest("[data-step-index]");
    if (!button || button.disabled) return;
    state.index = Number(button.dataset.stepIndex);
    state.finished = false;
    persist();
    render();
  });
  content.addEventListener("click", (event) => {
    if (!event.target.closest("[data-review-project]")) return;
    state.index = course.steps.length - 1;
    state.finished = false;
    persist();
    render();
  });

  window.addEventListener("learnhublanguagechange", render);
  render();
})();
