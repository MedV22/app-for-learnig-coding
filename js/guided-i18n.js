(() => {
  const messages = {
    fr: {
      common: {
        stepsHeading: "LES ÉTAPES",
        stepCount: "{done} / {total} étapes terminées",
        savedProgress: "Ta progression et ton code sont sauvegardés dans ce navigateur.",
        finishedProgress: "Bravo, tu peux revoir ton projet ou reprendre une étape.",
        current: "En cours",
        upcoming: "À venir",
        completed: "Terminée",
        stepMeta: "ÉTAPE {current} SUR {total}",
        beginner: "DÉBUTANT",
        lesson: "La leçon",
        exercise: "À toi de pratiquer",
        check: "Vérifier ma réponse",
        checking: "Vérification…",
        checkingSyntax: "Vérification de la syntaxe…",
        running: "Exécution…",
        editorHelp: "Ton brouillon est enregistré automatiquement dans ce navigateur.",
        htmlCodeLabel: "Ton code HTML",
        cssCodeLabel: "Ton code CSS",
        javascriptCodeLabel: "Ton code JavaScript",
        pythonCodeLabel: "Ton code Python",
        kaliCodeLabel: "Commandes à essayer",
        kaliEditorHelp: "Terminal entièrement simulé : seuls les exercices prévus sont acceptés.",
        kaliTerminal: "Terminal fictif",
        kaliTerminalHelp: "Ces commandes n’agissent que sur l’arborescence de l’exercice.",
        htmlEditorHelp: "Astuce : respecte l’ouverture et la fermeture de chaque balise.",
        livePreviewHeading: "Aperçu en direct",
        livePreviewHelp: "Le HTML est affiché dans un aperçu isolé.",
        pagePreview: "Aperçu de ta page",
        hint: "Afficher un indice",
        hideHint: "Masquer l’indice",
        solution: "Voir la solution expliquée",
        hideSolution: "Masquer la solution",
        possibleSolution: "Une solution possible",
        retry: "Relis la leçon ou utilise l’indice, puis réessaie.",
        notYet: "Pas encore.",
        correct: "Bonne réponse !",
        stepValidated: " Étape validée, bravo !",
        next: "Passer à l’étape suivante",
        finish: "Terminer le parcours",
        impossible: "Vérification impossible.",
        retryConnection: "Vérifie ta connexion puis réessaie.",
        pathFinished: "PARCOURS TERMINÉ",
        finishedTitle: "Bravo, tu as terminé le parcours {course} !",
        finishedCopy: "Tu peux revoir ton projet, le modifier ou reprendre une étape.",
        reviewProject: "Revoir mon projet",
        showProjectCode: "Afficher le code du projet",
        cssPreview: "Aperçu de la carte",
        cssPreviewHelp: "Le style s’actualise pendant que tu écris.",
        jsConsole: "Console de ton mini-projet",
        jsConsoleHelp: "Le code est exécuté dans un Worker sans accès au DOM, avec une limite de temps.",
        runJavaScript: "Exécuter le JavaScript",
        jsOutputPlaceholder: "Le résultat apparaîtra ici.",
        pythonLab: "Tester le programme",
        pythonLabHelp: "Python Lab utilise le moteur Pyodide déjà présent dans l’application.",
        openPythonLab: "Ouvrir mon code dans Python Lab",
        missingPath: "Parcours introuvable",
        missingPathCopy: "Choisis un parcours depuis la page de cours correspondante.",
        home: "Retour à l’accueil",
        title: "CodeVally",
        feedbackSuccess: "Étape terminée !",
        codeUnavailable: "Cette fonctionnalité est indisponible pour le moment.",
        blockedJavaScript: "Les accès réseau et les imports ne sont pas disponibles dans cet exercice.",
        noJavaScriptOutput: "(Aucune sortie : essaie console.log(...).)",
        javaScriptError: "Erreur JavaScript",
        executionError: "Erreur d’exécution.",
        javaScriptTimeout: "Temps dépassé : vérifie que ton code ne contient pas de boucle infinie.",
        pythonSyntax: "Erreur de syntaxe Python",
        javaScriptSyntax: "Erreur de syntaxe JavaScript"
      },
      css: {
        eyebrow: "PARCOURS PRATIQUE · CSS",
        title: "Apprendre le CSS en pratiquant",
        description: "Écris des règles de style, vérifie leur structure et observe le résultat sur une carte de profil."
      },
      javascript: {
        eyebrow: "PARCOURS PRATIQUE · JAVASCRIPT",
        title: "Apprendre JavaScript en pratiquant",
        description: "Écris du JavaScript, reçois des corrections et teste le projet final dans une console isolée."
      },
      python: {
        eyebrow: "PARCOURS PRATIQUE · PYTHON",
        title: "Apprendre Python en pratiquant",
        description: "Progresse pas à pas, vérifie la syntaxe Python et exécute ton mini-projet dans Python Lab."
      },
      kali: {
        eyebrow: "PARCOURS PRATIQUE · KALI LINUX",
        title: "Découvrir Kali Linux en toute sécurité",
        description: "Apprends des commandes Linux de base dans un terminal fictif, sans accès au système ni au réseau."
      }
    },
    en: {
      common: {
        stepsHeading: "STEPS",
        stepCount: "{done} / {total} steps completed",
        savedProgress: "Your progress and code are saved in this browser.",
        finishedProgress: "Well done! You can review your project or revisit a step.",
        current: "In progress",
        upcoming: "Up next",
        completed: "Completed",
        stepMeta: "STEP {current} OF {total}",
        beginner: "BEGINNER",
        lesson: "The lesson",
        exercise: "Try it yourself",
        check: "Check my answer",
        checking: "Checking…",
        checkingSyntax: "Checking syntax…",
        running: "Running…",
        editorHelp: "Your draft is saved automatically in this browser.",
        htmlCodeLabel: "Your HTML code",
        cssCodeLabel: "Your CSS code",
        javascriptCodeLabel: "Your JavaScript code",
        pythonCodeLabel: "Your Python code",
        kaliCodeLabel: "Commands to try",
        kaliEditorHelp: "Fully simulated terminal: only the commands in this exercise are accepted.",
        kaliTerminal: "Simulated terminal",
        kaliTerminalHelp: "These commands only affect this exercise’s folder tree.",
        htmlEditorHelp: "Tip: match every opening tag with its closing tag.",
        livePreviewHeading: "Live preview",
        livePreviewHelp: "Your HTML is shown in an isolated preview.",
        pagePreview: "Your page preview",
        hint: "Show a hint",
        hideHint: "Hide hint",
        solution: "Show explained solution",
        hideSolution: "Hide solution",
        possibleSolution: "One possible solution",
        retry: "Review the lesson or use the hint, then try again.",
        notYet: "Not yet.",
        correct: "Correct!",
        stepValidated: " Step completed—well done!",
        next: "Continue to the next step",
        finish: "Finish the path",
        impossible: "Could not check your answer.",
        retryConnection: "Check your connection and try again.",
        pathFinished: "PATH COMPLETE",
        finishedTitle: "Great work—you completed the {course} path!",
        finishedCopy: "You can review your project, edit it, or revisit a step.",
        reviewProject: "Review my project",
        showProjectCode: "Show project code",
        cssPreview: "Card preview",
        cssPreviewHelp: "The style updates as you type.",
        jsConsole: "Mini-project console",
        jsConsoleHelp: "Code runs in a time-limited Worker without access to the page.",
        runJavaScript: "Run JavaScript",
        jsOutputPlaceholder: "Your output will appear here.",
        pythonLab: "Test your program",
        pythonLabHelp: "Python Lab uses the Pyodide runtime already included in the app.",
        openPythonLab: "Open my code in Python Lab",
        missingPath: "Learning path not found",
        missingPathCopy: "Choose a path from the corresponding course page.",
        home: "Back to home",
        title: "CodeVally",
        feedbackSuccess: "You completed this step!",
        codeUnavailable: "This feature is unavailable right now.",
        blockedJavaScript: "Network access and imports are unavailable in this exercise.",
        noJavaScriptOutput: "(No output: try console.log(...).)",
        javaScriptError: "JavaScript error",
        executionError: "Runtime error.",
        javaScriptTimeout: "Time limit exceeded: check for an infinite loop.",
        pythonSyntax: "Python syntax error",
        javaScriptSyntax: "JavaScript syntax error"
      },
      validationErrors: {
        html: {
          "heading-and-paragraph": "Add a main heading with <h1> and a paragraph with <p>.",
          "page-sections": "Add <main>, put a <section> inside it, then add a text heading with <h2>.",
          lists: "Add a <ul> list containing at least two text items with <li>.",
          links: "Add a link with visible text and a non-empty href attribute.",
          images: "Add an <img> with non-empty src and alt attributes.",
          "personal-page": "Your page needs a text heading, a paragraph, an image with src and alt, and a link with href."
        },
        css: {
          "selector-color": "Add a .profil rule with a color declaration.",
          typography: "Add a .profil h1 rule with both font-size and color.",
          "box-model": "Add a .carte rule with padding, margin, and border.",
          "flex-layout": "Add a .interets rule with display: flex and gap.",
          responsive: "Add a @media (max-width: 600px) rule with .carte and padding inside it.",
          "profile-card": "Style .carte with padding, rounded corners, and a background; color .carte h1 and align .interets with flex."
        },
        javascript: {
          "variables-output": "Declare a variable with const or let, then display it with console.log(...).",
          conditions: "Add an if block and an else block, with console.log in both.",
          functions: "Declare a function that uses return, then call it.",
          "arrays-loops": "Create an array, loop over it with for...of, and display each value.",
          "dom-events": "Select an element, listen for a click, and change its textContent.",
          "quiz-project": "Create an array, loop over it, use if to count correct answers, and display the score."
        },
        python: {
          "first-print": "Use print(...) to display the exact message “Hello world”.",
          variables: "Store a text value in the name variable, then display it with print(name).",
          calculations: "Store 6 * 7 in total, then display it with print(total).",
          conditions: "Add an if and an else block, each with an indented print statement.",
          loops: "Create a fruits list, loop over it with for, and indent print inside the loop.",
          "score-project": "Define a function with a loop, an if condition, and return; then display its result."
        },
        kali: {
          "current-directory": "Use only pwd for this exercise. The terminal is a simulation, not your computer.",
          "list-files": "Use ls or ls -la to list the simulated files.",
          "change-directory": "Enter cd Documents and then pwd on the next line.",
          "read-notes": "Use cat with the exact path /home/kali/Documents/todo.md.",
          "search-notes": "Use grep Python followed by the notes file path.",
          "safe-folder-project": "Use mkdir, touch, then ls on separate lines, in that order. This remains a safe simulation."
        }
      },
      html: {
        eyebrow: "PRACTICE PATH · BEGINNER",
        title: "Learn <span>HTML</span> by practicing",
        description: "Read a short lesson, write a few lines, and check what you have learned. No installation or account required.",
        steps: {
          "heading-and-paragraph": {
            title: "A heading and a paragraph",
            lesson: "Tags describe the role of content. <h1> is the page’s main heading, and <p> contains a paragraph.",
            exercise: "Write a main heading with <h1> and a sentence inside a <p> paragraph.",
            hint: "Open a tag with <h1> and close it with </h1>. Do the same with <p>.",
            explanation: "<h1> marks the most important page heading. <p> groups a sentence or paragraph."
          },
          "page-sections": {
            title: "Organize the page",
            lesson: "<main> contains the main content. Inside it, <section> groups related content and can start with an <h2> heading.",
            exercise: "Create a <main> containing a <section>, then add an <h2> heading inside that section.",
            hint: "Nest the tags: put <h2> inside <section>, and <section> inside <main>.",
            explanation: "<main> marks the main content. <section> and its <h2> give the page a clear structure."
          },
          lists: {
            title: "Create a list",
            lesson: "<ul> creates a bulleted list. Put each list item inside an <li> tag.",
            exercise: "Write a <ul> list containing at least two <li> items.",
            hint: "Place both <li> tags between <ul> and </ul>.",
            explanation: "<ul> opens the list, and each <li> represents one of its items."
          },
          links: {
            title: "Add a link",
            lesson: "The <a> tag creates a link. Its href attribute says where it goes, and its text describes what it opens.",
            exercise: "Add an <a> link with an href attribute and visible text.",
            hint: "For example, write href=\"https://example.com\" inside <a ...> and add text before </a>.",
            explanation: "The href attribute contains the destination, and the text between the tags is clickable."
          },
          images: {
            title: "Display an image",
            lesson: "<img> displays an image. The src attribute gives its address, and alt describes it if the image cannot be seen.",
            exercise: "Add an <img> image with a src address and an alt description.",
            hint: "Write both attributes on the same tag, for example src=\"image.jpg\" alt=\"A landscape\".",
            explanation: "src tells the browser where the image is. alt describes it to people who cannot see it."
          },
          "personal-page": {
            title: "My personal page",
            lesson: "Now combine the tags you learned to create a small page of your own. The preview updates as you type.",
            exercise: "Create a page with an <h1> heading, a <p> paragraph, an <img> with src and alt, and an <a> link with href and visible text.",
            hint: "Start with <main>, add each type of element, then check that the image has src and alt and the link has href.",
            explanation: "The heading and paragraph introduce your page. The image has an alt description, and the link has an href destination."
          }
        }
      },
      css: {
        eyebrow: "PRACTICE PATH · CSS",
        title: "Learn CSS by practicing",
        description: "Write style rules, check their structure, and see the result on a profile card.",
        previewLabels: ["MY PROFILE", "Hello, Alex!", "I’m learning to build websites and enjoy drawing, music, and walking.", "My interests", "Drawing", "Music", "Nature"],
        steps: {
          "selector-color": {
            title: "Select an element",
            lesson: "A selector chooses which elements receive a style. .profil selects elements with the profil class.",
            exercise: "Write a .profil rule that changes text color with the color property.",
            hint: "A CSS rule looks like .profil { color: a-color; }.",
            explanation: "The .profil selector targets the class, and color sets the text color."
          },
          typography: {
            title: "Style headings",
            lesson: "You can target an element inside a class, such as .profil h1. font-size sets the text size.",
            exercise: "Write a .profil h1 rule containing font-size and color.",
            hint: "Put both properties in the same .profil h1 { ... } block.",
            explanation: "This rule styles only h1 headings inside .profil."
          },
          "box-model": {
            title: "Add spacing",
            lesson: "padding adds space inside a block. margin adds space outside it. border draws an outline.",
            exercise: "Create a .carte rule with padding, margin, and border.",
            hint: "Put all three properties inside .carte. Values such as 16px work for padding and margin.",
            explanation: "These properties space the content and draw the card’s outline."
          },
          "flex-layout": {
            title: "Align items with Flexbox",
            lesson: "display: flex aligns child elements in a row or column. gap sets the space between them.",
            exercise: "Write a .interets rule using display: flex and gap.",
            hint: "Start with .interets { display: flex; ... }.",
            explanation: "Flexbox aligns the list items, and gap spaces them out."
          },
          responsive: {
            title: "Adapt to small screens",
            lesson: "@media applies styles based on screen size. max-width targets screens narrower than a chosen width.",
            exercise: "Add an @media (max-width: 600px) rule containing .carte and a padding property.",
            hint: "Put .carte { padding: ...; } inside @media (max-width: 600px).",
            explanation: "This card rule applies only when the screen is 600px wide or less."
          },
          "profile-card": {
            title: "Style my profile card",
            lesson: "Combine the CSS rules you learned to personalize a card. The preview already includes its HTML.",
            exercise: "Give .carte a background, padding, and rounded corners. Color .carte h1 and align .interets with Flexbox.",
            hint: "Use the selectors .carte, .carte h1, and .interets. The preview updates as you type.",
            explanation: "The background, spacing, and selectors create a readable profile card with aligned interests."
          }
        }
      },
      javascript: {
        eyebrow: "PRACTICE PATH · JAVASCRIPT",
        title: "Learn JavaScript by practicing",
        description: "Write JavaScript, get helpful feedback, and test the final project in an isolated console.",
        steps: {
          "variables-output": {
            title: "Variables and output",
            lesson: "const declares a value that will not be reassigned. console.log displays a value in the console.",
            exercise: "Declare a name constant containing text, then display it with console.log.",
            hint: "Start with const name = \"Ada\"; then write console.log(name);.",
            explanation: "The constant stores the text, and console.log displays its value."
          },
          conditions: {
            title: "Make a decision",
            lesson: "if runs a block when a condition is true. else provides the fallback block when it is false.",
            exercise: "Write an if / else condition and display a message in both cases.",
            hint: "Use if (condition) { ... } else { ... }, with console.log in each block.",
            explanation: "The program chooses one of the two blocks based on the condition."
          },
          functions: {
            title: "Create a function",
            lesson: "A function groups reusable instructions. return sends its result back to where the function was called.",
            exercise: "Declare a function that uses return, then call that function.",
            hint: "Write function greet() { return ...; }, then call greet();.",
            explanation: "The function prepares a value with return, and calling it runs its instructions."
          },
          "arrays-loops": {
            title: "Loop through a list",
            lesson: "An array stores several values in order. for...of visits the values one at a time.",
            exercise: "Declare an array of languages, loop over it with for...of, and display each value.",
            hint: "Use const languages = [...]; then for (const language of languages) { console.log(language); }.",
            explanation: "The loop takes each value from the array and displays it in turn."
          },
          "dom-events": {
            title: "Respond to a click",
            lesson: "document.querySelector selects a page element. addEventListener connects an action to an event.",
            exercise: "Select a button, listen for a click event, and change the element’s textContent.",
            hint: "The structure looks like button.addEventListener(\"click\", () => { ... });.",
            explanation: "The browser selects the button, then runs the callback when it is clicked."
          },
          "quiz-project": {
            title: "Build a mini quiz",
            lesson: "Combine variables, arrays, conditions, loops, and console.log to calculate a score.",
            exercise: "Write a small program that loops over answers, counts correct ones with if, and displays a score with console.log.",
            hint: "Create an array and a score, loop through the questions, increase the score for correct answers, then display it.",
            explanation: "The program loops through the questions, adds a point for each correct answer, and displays the score."
          }
        }
      },
      python: {
        eyebrow: "PRACTICE PATH · PYTHON",
        title: "Learn Python by practicing",
        description: "Progress step by step, check Python syntax, and run your project in Python Lab.",
        steps: {
          "first-print": {
            title: "Display a message",
            lesson: "print(...) displays text or a value. Text strings go between quotation marks.",
            exercise: "Write a program that displays the message Hello world with print.",
            hint: 'Write print("Hello world").',
            solution: 'print("Hello world")',
            explanation: "print sends the text inside the parentheses to the program output."
          },
          variables: {
            title: "Store a value",
            lesson: "A variable connects a name to a value. You can then use that name in print.",
            exercise: "Store the name Ada in a variable called name, then display that variable.",
            hint: 'Write name = "Ada" followed by print(name).',
            solution: 'name = "Ada"\nprint(name)',
            explanation: "The name variable stores the text, and print(name) displays its value."
          },
          calculations: {
            title: "Do a calculation",
            lesson: "Python can perform operations such as +, -, *, and /. You can store the result in a variable.",
            exercise: "Calculate 6 times 7 in a variable called total, then display the result.",
            hint: "Use total = 6 * 7, then print(total).",
            explanation: "The * operator multiplies the numbers, and print displays the value stored in total."
          },
          conditions: {
            title: "Make a choice",
            lesson: "if checks a condition. else contains instructions for when the condition is false. Colons and indentation matter.",
            exercise: "Compare age with 18, then display a message in both the if and else blocks.",
            hint: "Use if age >= 18: followed by indented lines, then else:.",
            explanation: "Python checks age >= 18 and runs one of the two indented blocks."
          },
          loops: {
            title: "Repeat with a list",
            lesson: "A list groups several values. for visits each value and runs its indented block.",
            exercise: "Create a fruits list with two values, loop over it with for, and display each fruit.",
            hint: 'Write fruits = ["apple", "pear"], then for fruit in fruits: and indent print(fruit).',
            explanation: "The loop assigns each value to fruit and runs print once for each item."
          },
          "score-project": {
            title: "Build a score quiz",
            lesson: "A mini quiz combines a function, a loop, a condition, and displayed output.",
            exercise: "Write a function that counts correct answers in a list, returns the score, and displays it.",
            hint: "Create a function, initialize score, loop over answers with for, add a point in if, then return score.",
            explanation: "The function loops over answers, counts the true values, and returns and displays the total."
          }
        }
      },
      kali: {
        eyebrow: "PRACTICE PATH · KALI LINUX",
        title: "Explore Kali Linux safely",
        description: "Learn basic Linux commands in a fictional terminal with no access to your computer or the network.",
        steps: {
          "current-directory": {
            title: "Check the current folder",
            lesson: "pwd displays the current folder path. In this simulation, the starting point is /home/kali.",
            exercise: "Type pwd to display the simulated current folder.",
            hint: "The command is just three letters: pwd.",
            explanation: "The simulated terminal responds with /home/kali. No real folder is accessed."
          },
          "list-files": {
            title: "List files",
            lesson: "ls displays the files and folders at a location. This list is fictional and only used for the exercise.",
            exercise: "Use ls to view the contents of the starting folder.",
            hint: "Use ls to list the simulated folder.",
            explanation: "The simulation shows example folders named Documents, Downloads, and Desktop."
          },
          "change-directory": {
            title: "Go to Documents",
            lesson: "cd changes folders. You can run another command afterward to check the new path with pwd.",
            exercise: "Write cd Documents, then pwd on the next line.",
            hint: "Write two commands on two lines. You do not need a semicolon or any other command.",
            explanation: "The simulation moves to /home/kali/Documents, then pwd displays that path."
          },
          "read-notes": {
            title: "Read a file",
            lesson: "cat displays the contents of a text file. This exercise reads only a fictional file.",
            exercise: "Display /home/kali/Documents/todo.md with cat.",
            hint: "Add the file path after the cat command.",
            explanation: "cat displays the fictional notes provided for this exercise."
          },
          "search-notes": {
            title: "Search the notes",
            lesson: "grep searches for a word in a file. Here it searches fictional exercise text.",
            exercise: "Use grep to search for Python in the notes file.",
            hint: "The command takes the search word first, then the file path.",
            explanation: "grep returns only the fictional line that contains Python."
          },
          "safe-folder-project": {
            title: "Create a notes folder",
            lesson: "Use the commands in order: create a folder, create a file inside it, then list the folder. They run in a temporary simulation.",
            exercise: "Create a folder named mon-projet, create mon-projet/notes.txt, then list it with ls mon-projet. Use one command per line.",
            hint: "Only mkdir, touch, and ls are allowed here. The simulation rejects all other commands.",
            explanation: "The fictional terminal creates a folder and file in memory, then confirms the result. Nothing is written to your computer."
          }
        }
      }
    },
    ar: {
      common: {
        stepsHeading: "الخطوات",
        stepCount: "اكتملت {done} من {total} خطوات",
        savedProgress: "يُحفظ تقدمك ورمزك في هذا المتصفح.",
        finishedProgress: "أحسنت! يمكنك مراجعة مشروعك أو العودة إلى أي خطوة.",
        current: "قيد التعلّم",
        upcoming: "التالي",
        completed: "مكتملة",
        stepMeta: "الخطوة {current} من {total}",
        beginner: "مبتدئ",
        lesson: "الدرس",
        exercise: "جرّب بنفسك",
        check: "تحقق من إجابتي",
        checking: "جارٍ التحقق…",
        checkingSyntax: "جارٍ التحقق من الصياغة…",
        running: "جارٍ التشغيل…",
        editorHelp: "يُحفظ مسودتك تلقائياً في هذا المتصفح.",
        htmlCodeLabel: "رمز HTML الخاص بك",
        cssCodeLabel: "رمز CSS الخاص بك",
        javascriptCodeLabel: "رمز JavaScript الخاص بك",
        pythonCodeLabel: "رمز Python الخاص بك",
        kaliCodeLabel: "الأوامر للتجربة",
        kaliEditorHelp: "الطرفية محاكاة بالكامل ولا تقبل إلا أوامر هذا التمرين.",
        kaliTerminal: "طرفية وهمية",
        kaliTerminalHelp: "تؤثر هذه الأوامر في شجرة مجلدات التمرين فقط.",
        htmlEditorHelp: "تأكد من إغلاق كل وسم فتحته.",
        livePreviewHeading: "معاينة مباشرة",
        livePreviewHelp: "يظهر HTML في معاينة معزولة.",
        pagePreview: "معاينة صفحتك",
        hint: "عرض تلميح",
        hideHint: "إخفاء التلميح",
        solution: "عرض الحل مع الشرح",
        hideSolution: "إخفاء الحل",
        possibleSolution: "أحد الحلول الممكنة",
        retry: "راجع الدرس أو استخدم التلميح ثم حاول مجدداً.",
        notYet: "ليس بعد.",
        correct: "إجابة صحيحة!",
        stepValidated: " اكتملت الخطوة، أحسنت!",
        next: "الانتقال إلى الخطوة التالية",
        finish: "إنهاء المسار",
        impossible: "تعذر التحقق من إجابتك.",
        retryConnection: "تحقق من اتصالك ثم حاول مجدداً.",
        pathFinished: "اكتمل المسار",
        finishedTitle: "أحسنت! أكملت مسار {course}.",
        finishedCopy: "يمكنك مراجعة مشروعك أو تعديله أو العودة إلى إحدى الخطوات.",
        reviewProject: "مراجعة مشروعي",
        showProjectCode: "عرض رمز المشروع",
        cssPreview: "معاينة البطاقة",
        cssPreviewHelp: "يتحدث التنسيق أثناء الكتابة.",
        jsConsole: "وحدة تحكم المشروع",
        jsConsoleHelp: "يعمل الرمز في عامل محدود الوقت ولا يمكنه الوصول إلى الصفحة.",
        runJavaScript: "تشغيل JavaScript",
        jsOutputPlaceholder: "ستظهر النتيجة هنا.",
        pythonLab: "اختبر البرنامج",
        pythonLabHelp: "يستخدم Python Lab محرك Pyodide الموجود في التطبيق.",
        openPythonLab: "فتح الرمز في Python Lab",
        missingPath: "المسار التعليمي غير موجود",
        missingPathCopy: "اختر مساراً من صفحة الدورة المناسبة.",
        home: "العودة إلى الرئيسية",
        title: "CodeVally",
        feedbackSuccess: "اكتملت هذه الخطوة!",
        codeUnavailable: "هذه الميزة غير متاحة حالياً.",
        blockedJavaScript: "الوصول إلى الشبكة والاستيراد غير متاحين في هذا التمرين.",
        noJavaScriptOutput: "(لا يوجد إخراج: جرّب console.log(...).)",
        javaScriptError: "خطأ في JavaScript",
        executionError: "خطأ أثناء التشغيل.",
        javaScriptTimeout: "انتهى الوقت: تحقق من عدم وجود حلقة لا نهائية.",
        pythonSyntax: "خطأ في صياغة Python",
        javaScriptSyntax: "خطأ في صياغة JavaScript"
      },
      validationErrors: {
        html: {
          "heading-and-paragraph": "أضف عنواناً رئيسياً باستخدام <h1> وفقرة باستخدام <p>.",
          "page-sections": "أضف <main> وضع بداخله <section> ثم عنواناً نصياً باستخدام <h2>.",
          lists: "أضف قائمة <ul> تحتوي على عنصرين نصيين على الأقل باستخدام <li>.",
          links: "أضف رابطاً بنص ظاهر وسمة href غير فارغة.",
          images: "أضف <img> مع سمتي src وalt غير فارغتين.",
          "personal-page": "تحتاج صفحتك إلى عنوان وفقرة وصورة بسمتي src وalt ورابط بسمة href."
        },
        css: {
          "selector-color": "أضف قاعدة .profil تحتوي على تصريح color.",
          typography: "أضف قاعدة .profil h1 تحتوي على font-size وcolor.",
          "box-model": "أضف قاعدة .carte تحتوي على padding وmargin وborder.",
          "flex-layout": "أضف قاعدة .interets تحتوي على display: flex وgap.",
          responsive: "أضف قاعدة @media (max-width: 600px) وضع بداخلها .carte مع padding.",
          "profile-card": "نسّق .carte باستخدام padding وزوايا مستديرة وخلفية، ولوّن .carte h1 ورتّب .interets باستخدام flex."
        },
        javascript: {
          "variables-output": "أنشئ متغيراً باستخدام const أو let ثم اعرضه باستخدام console.log(...).",
          conditions: "أضف كتلة if وكتلة else وضع console.log في كلتيهما.",
          functions: "عرّف دالة تستخدم return ثم استدعها.",
          "arrays-loops": "أنشئ مصفوفة ومرّ على عناصرها باستخدام for...of واعرض كل قيمة.",
          "dom-events": "اختر عنصراً واستمع إلى النقر ثم غيّر textContent.",
          "quiz-project": "أنشئ مصفوفة ومرّ على عناصرها واستخدم if لعد الإجابات الصحيحة ثم اعرض النتيجة."
        },
        python: {
          "first-print": "استخدم print(...) لعرض الرسالة «مرحباً بالعالم» كما هي.",
          variables: "خزّن نصاً في المتغير name ثم اعرضه باستخدام print(name).",
          calculations: "خزّن 6 * 7 في total ثم اعرضها باستخدام print(total).",
          conditions: "أضف كتلتي if وelse، مع تعليمة print ذات مسافة بادئة في كل منهما.",
          loops: "أنشئ قائمة fruits ومرّ عليها باستخدام for وضع print داخل الحلقة.",
          "score-project": "عرّف دالة تحتوي على حلقة وشرط if وreturn، ثم اعرض نتيجتها."
        },
        kali: {
          "current-directory": "استخدم pwd فقط في هذا التمرين. الطرفية محاكاة ولا تتصل بجهازك.",
          "list-files": "استخدم ls أو ls -la لعرض الملفات الوهمية.",
          "change-directory": "اكتب cd Documents ثم pwd في السطر التالي.",
          "read-notes": "استخدم cat مع المسار /home/kali/Documents/todo.md كما هو.",
          "search-notes": "استخدم grep Python ثم مسار ملف الملاحظات.",
          "safe-folder-project": "استخدم mkdir ثم touch ثم ls، كل أمر في سطر وبالترتيب. هذه محاكاة آمنة فقط."
        }
      },
      html: {
        eyebrow: "مسار تدريبي · مبتدئ",
        title: "تعلّم <span>HTML</span> بالتطبيق العملي",
        description: "اقرأ درساً قصيراً واكتب بضعة أسطر ثم تحقق مما تعلمته. لا حاجة إلى تثبيت أو حساب.",
        steps: {
          "heading-and-paragraph": {
            title: "عنوان وفقرة",
            lesson: "توضح الوسوم دور المحتوى. يمثل <h1> العنوان الرئيسي للصفحة، وتحتوي <p> على فقرة.",
            exercise: "اكتب عنواناً رئيسياً باستخدام <h1> وجملة داخل فقرة <p>.",
            hint: "ابدأ الوسم بـ <h1> وأغلقه بـ </h1>. افعل الشيء نفسه مع <p>.",
            explanation: "يمثل <h1> أهم عنوان في الصفحة، وتجمع <p> جملة أو فقرة."
          },
          "page-sections": {
            title: "تنظيم الصفحة",
            lesson: "تحتوي <main> على المحتوى الرئيسي. وداخلها تجمع <section> المحتوى المرتبط ويمكن أن تبدأ بعنوان <h2>.",
            exercise: "أنشئ <main> تحتوي على <section>، ثم أضف عنوان <h2> داخل القسم.",
            hint: "ضع <h2> داخل <section>، وضع <section> داخل <main>.",
            explanation: "تحدد <main> المحتوى الرئيسي، وتمنح <section> مع <h2> الصفحة بنية واضحة."
          },
          lists: {
            title: "إنشاء قائمة",
            lesson: "تنشئ <ul> قائمة نقطية. ضع كل عنصر في القائمة داخل وسم <li>.",
            exercise: "اكتب قائمة <ul> تحتوي على عنصرين <li> على الأقل.",
            hint: "ضع وسمي <li> بين <ul> و</ul>.",
            explanation: "يفتح <ul> القائمة ويمثل كل <li> عنصراً فيها."
          },
          links: {
            title: "إضافة رابط",
            lesson: "ينشئ الوسم <a> رابطاً. تحدد الخاصية href وجهته ويشرح نص الرابط ما الذي سيفتحه.",
            exercise: "أضف رابط <a> يحتوي على الخاصية href ونص ظاهر.",
            hint: "مثلاً اكتب href=\"https://example.com\" داخل <a ...> وأضف نصاً قبل </a>.",
            explanation: "تحتوي href على الوجهة، والنص بين الوسمين هو ما يمكن النقر عليه."
          },
          images: {
            title: "عرض صورة",
            lesson: "يعرض <img> صورة. تحدد src عنوانها وتقدم alt وصفاً مفيداً إذا تعذر عرض الصورة.",
            exercise: "أدرج صورة <img> مع عنوان src ووصف alt.",
            hint: "اكتب الخاصيتين في الوسم نفسه، مثل src=\"image.jpg\" alt=\"منظر طبيعي\".",
            explanation: "تخبر src المتصفح بمكان الصورة، ويصف alt الصورة لمن لا يستطيع رؤيتها."
          },
          "personal-page": {
            title: "صفحتي الشخصية",
            lesson: "اجمع الوسوم التي تعلمتها لإنشاء صفحة صغيرة خاصة بك. تتحدث المعاينة أثناء الكتابة.",
            exercise: "أنشئ صفحة فيها عنوان <h1> وفقرة <p> وصورة <img> مع src وalt ورابط <a> مع href ونص ظاهر.",
            hint: "ابدأ بـ <main> وأضف كل نوع من العناصر. تأكد أن للصورة src وalt وللرابط href.",
            explanation: "يقدم العنوان والفقرة صفحتك، وتحتوي الصورة على وصف alt والرابط على وجهة href."
          }
        }
      },
      css: {
        eyebrow: "مسار تدريبي · CSS",
        title: "تعلّم CSS بالتدريب",
        description: "اكتب قواعد التنسيق وتحقق من بنيتها وشاهد تأثيرها على بطاقة الملف الشخصي.",
        previewLabels: ["ملفي الشخصي", "مرحباً يا أليكس!", "أتعلم إنشاء مواقع الويب وأحب الرسم والموسيقى والتنزه.", "اهتماماتي", "الرسم", "الموسيقى", "الطبيعة"],
        steps: {
          "selector-color": {
            title: "اختيار عنصر",
            lesson: "يحدد المحدد العناصر التي سيطبق عليها التنسيق. يختار .profil العناصر التي تحمل الفئة profil.",
            exercise: "اكتب قاعدة .profil لتغيير لون النص باستخدام الخاصية color.",
            hint: "تأخذ قاعدة CSS الشكل .profil { color: لون; }.",
            explanation: "يحدد .profil الفئة المطلوبة وتضبط color لون النص."
          },
          typography: {
            title: "تنسيق العناوين",
            lesson: "يمكنك تحديد عنصر داخل فئة مثل .profil h1. وتضبط font-size حجم النص.",
            exercise: "اكتب قاعدة .profil h1 تحتوي على font-size وcolor.",
            hint: "ضع الخاصيتين في الكتلة نفسها .profil h1 { ... }.",
            explanation: "تنسيق هذه القاعدة عناوين h1 الموجودة داخل .profil فقط."
          },
          "box-model": {
            title: "إضافة مسافات",
            lesson: "تضيف padding مساحة داخل العنصر، وتضيف margin مساحة خارجه، بينما يرسم border حافة حوله.",
            exercise: "أنشئ قاعدة .carte تحتوي على padding وmargin وborder.",
            hint: "ضع الخصائص الثلاث داخل .carte. تصلح قيمة مثل 16px للمسافات.",
            explanation: "تضيف هذه الخصائص مسافة حول المحتوى وترسم إطار البطاقة."
          },
          "flex-layout": {
            title: "المحاذاة باستخدام Flexbox",
            lesson: "تحاذي display: flex العناصر الفرعية أفقياً أو عمودياً، وتحدد gap المسافة بينها.",
            exercise: "اكتب قاعدة .interets تستخدم display: flex وgap.",
            hint: "ابدأ بـ .interets { display: flex; ... }.",
            explanation: "تحاذي Flexbox عناصر القائمة وتفصل بينها gap."
          },
          responsive: {
            title: "التوافق مع الشاشات الصغيرة",
            lesson: "تطبق @media التنسيقات بحسب حجم الشاشة. تستهدف max-width الشاشات الأصغر من عرض محدد.",
            exercise: "أضف قاعدة @media (max-width: 600px) تحتوي على .carte وخاصية padding.",
            hint: "ضع .carte { padding: ...; } داخل @media (max-width: 600px).",
            explanation: "تطبق قاعدة البطاقة هذه عندما يكون عرض الشاشة 600px أو أقل."
          },
          "profile-card": {
            title: "تنسيق بطاقة ملفي الشخصي",
            lesson: "اجمع قواعد CSS التي تعلمتها لتخصيص بطاقة. تحتوي المعاينة مسبقاً على HTML الخاص بها.",
            exercise: "أضف خلفية ومسافة وزوايا مستديرة إلى .carte. لوّن .carte h1 وحاذِ .interets باستخدام Flexbox.",
            hint: "استخدم المحددات .carte و.carte h1 و.interets. تتحدث المعاينة أثناء الكتابة.",
            explanation: "تنشئ الخلفية والمسافات والمحددات بطاقة ملف شخصي واضحة بعناصر اهتمام مصطفة."
          }
        }
      },
      javascript: {
        eyebrow: "مسار تدريبي · JAVASCRIPT",
        title: "تعلّم JavaScript بالتدريب",
        description: "اكتب JavaScript واحصل على تصحيح واضح واختبر المشروع النهائي في وحدة تحكم معزولة.",
        steps: {
          "variables-output": {
            title: "المتغيرات والإخراج",
            lesson: "يعرّف const قيمة لن يعاد إسنادها. وتعرض console.log القيمة في وحدة التحكم.",
            exercise: "عرّف ثابتاً باسم name يحتوي على نص ثم اعرضه باستخدام console.log.",
            hint: "ابدأ بـ const name = \"Ada\"; ثم اكتب console.log(name);.",
            explanation: "يخزن الثابت النص وتعرض console.log قيمته."
          },
          conditions: {
            title: "اتخاذ قرار",
            lesson: "تنفذ if كتلة عندما يكون الشرط صحيحاً، وتحدد else ما يحدث عندما يكون خاطئاً.",
            exercise: "اكتب شرط if / else واعرض رسالة في كلتا الحالتين.",
            hint: "استخدم if (condition) { ... } else { ... } وضع console.log في كل كتلة.",
            explanation: "يختار البرنامج إحدى الكتلتين وفق نتيجة الشرط."
          },
          functions: {
            title: "إنشاء دالة",
            lesson: "تجمع الدالة تعليمات قابلة لإعادة الاستخدام. وتعيد return النتيجة إلى موضع استدعاء الدالة.",
            exercise: "عرّف دالة تستخدم return ثم استدعها.",
            hint: "اكتب function greet() { return ...; } ثم استدعِ greet();.",
            explanation: "تجهز الدالة قيمة باستخدام return ثم ينفذ الاستدعاء تعليماتها."
          },
          "arrays-loops": {
            title: "التكرار على قائمة",
            lesson: "تخزن المصفوفة عدة قيم بترتيب. وتمر حلقة for...of على القيم واحدة تلو الأخرى.",
            exercise: "عرّف مصفوفة لغات ومرّ عليها باستخدام for...of واعرض كل قيمة.",
            hint: "استخدم const languages = [...]; ثم for (const language of languages) { console.log(language); }.",
            explanation: "تأخذ الحلقة كل قيمة من المصفوفة وتعرضها بالتتابع."
          },
          "dom-events": {
            title: "الاستجابة للنقر",
            lesson: "تحدد document.querySelector عنصراً في الصفحة. وتربط addEventListener إجراءً بحدث.",
            exercise: "حدد زراً واستمع لحدث click ثم غيّر textContent للعنصر.",
            hint: "يشبه التركيب button.addEventListener(\"click\", () => { ... });.",
            explanation: "يحدد المتصفح الزر ثم ينفذ الدالة عند النقر عليه."
          },
          "quiz-project": {
            title: "إنشاء اختبار قصير",
            lesson: "اجمع المتغيرات والمصفوفات والشروط والحلقات وconsole.log لحساب نتيجة.",
            exercise: "اكتب برنامجاً يمر على الإجابات ويعد الإجابات الصحيحة باستخدام if ثم يعرض النتيجة عبر console.log.",
            hint: "أنشئ مصفوفة ومتغيراً للنتيجة، ومر على الأسئلة، وزد النتيجة عند الإجابة الصحيحة، ثم اعرضها.",
            explanation: "يمر البرنامج على الأسئلة ويضيف نقطة لكل إجابة صحيحة ثم يعرض النتيجة."
          }
        }
      },
      python: {
        eyebrow: "مسار تدريبي · PYTHON",
        title: "تعلّم Python بالتدريب",
        description: "تدرّج خطوة بخطوة وتحقق من صياغة Python وشغّل مشروعك في Python Lab.",
        steps: {
          "first-print": {
            title: "عرض رسالة",
            lesson: "تعرض print(...) نصاً أو قيمة. وتكتب السلاسل النصية بين علامتي اقتباس.",
            exercise: "اكتب برنامجاً يعرض الرسالة «مرحباً بالعالم» باستخدام print.",
            hint: 'اكتب print("مرحباً بالعالم").',
            solution: 'print("مرحباً بالعالم")',
            explanation: "ترسل print النص الموجود بين القوسين إلى مخرجات البرنامج."
          },
          variables: {
            title: "تخزين قيمة",
            lesson: "يربط المتغير اسماً بقيمة ويمكنك استخدام الاسم لاحقاً داخل print.",
            exercise: "خزّن الاسم Ada في متغير اسمه name ثم اعرض المتغير.",
            hint: 'اكتب name = "Ada" ثم print(name).',
            solution: 'name = "Ada"\nprint(name)',
            explanation: "يخزن المتغير name النص وتعرض print(name) قيمته."
          },
          calculations: {
            title: "إجراء عملية حسابية",
            lesson: "تستطيع Python إجراء عمليات مثل + و- و* و/. ويمكن تخزين النتيجة في متغير.",
            exercise: "احسب 6 مضروبة في 7 داخل متغير total ثم اعرض النتيجة.",
            hint: "استخدم total = 6 * 7 ثم print(total).",
            explanation: "يضرب العامل * العددين وتعرض print القيمة المخزنة في total."
          },
          conditions: {
            title: "اتخاذ قرار",
            lesson: "تختبر if شرطاً، وتحتوي else على التعليمات عند عدم تحقق الشرط. النقطتان والمسافات البادئة مهمتان.",
            exercise: "قارن age بالعدد 18 ثم اعرض رسالة داخل كتلتي if وelse.",
            hint: "استخدم if age >= 18: ثم أسطر مزاحة، وبعدها else:.",
            explanation: "تختبر Python الشرط age >= 18 وتنفذ إحدى الكتلتين المزاحتين."
          },
          loops: {
            title: "التكرار على قائمة",
            lesson: "تجمع القائمة عدة قيم. وتمر for على كل قيمة وتنفذ الكتلة المزاحة.",
            exercise: "أنشئ قائمة fruits بقيمتين، ومر عليها باستخدام for ثم اعرض كل ثمرة.",
            hint: 'اكتب fruits = ["apple", "pear"] ثم for fruit in fruits: وأزح print(fruit).',
            explanation: "تضع الحلقة كل قيمة في fruit وتنفذ print مرة لكل عنصر."
          },
          "score-project": {
            title: "إنشاء اختبار لحساب النتيجة",
            lesson: "يجمع الاختبار القصير بين دالة وحلقة وشرط وإظهار النتيجة.",
            exercise: "اكتب دالة تعد الإجابات الصحيحة في قائمة وتعيد النتيجة ثم تعرضها.",
            hint: "أنشئ دالة وابدأ score، ومر على الإجابات بحلقة for، وزد النتيجة داخل if ثم أعدها باستخدام return.",
            explanation: "تمر الدالة على الإجابات وتعد القيم الصحيحة ثم تعيد المجموع وتعرضه."
          }
        }
      },
      kali: {
        eyebrow: "مسار تدريبي · KALI LINUX",
        title: "استكشف Kali Linux بأمان",
        description: "تعلّم أوامر Linux الأساسية في طرفية وهمية دون الوصول إلى جهازك أو الشبكة.",
        steps: {
          "current-directory": {
            title: "معرفة المجلد الحالي",
            lesson: "تعرض pwd مسار المجلد الحالي. نقطة البداية في هذه المحاكاة هي /home/kali.",
            exercise: "اكتب pwd لعرض المجلد الحالي في المحاكاة.",
            hint: "الأمر مكوّن من ثلاثة أحرف فقط: pwd.",
            explanation: "تعرض الطرفية المحاكية /home/kali ولا تصل إلى أي مجلد حقيقي."
          },
          "list-files": {
            title: "عرض الملفات",
            lesson: "تعرض ls الملفات والمجلدات في موقع ما. هذه القائمة وهمية ومخصصة للتمرين.",
            exercise: "استخدم ls لعرض محتويات مجلد البداية.",
            hint: "استخدم ls لعرض المجلد المحاكى.",
            explanation: "تعرض المحاكاة مجلدات نموذجية باسم Documents وDownloads وDesktop."
          },
          "change-directory": {
            title: "الانتقال إلى Documents",
            lesson: "يغيّر cd المجلد. يمكنك تشغيل أمر آخر بعده للتحقق من المسار الجديد باستخدام pwd.",
            exercise: "اكتب cd Documents ثم pwd في السطر التالي.",
            hint: "اكتب أمرين في سطرين. لا تحتاج إلى فاصلة منقوطة أو أمر آخر.",
            explanation: "تنتقل المحاكاة إلى /home/kali/Documents ثم تعرض pwd هذا المسار."
          },
          "read-notes": {
            title: "قراءة ملف",
            lesson: "تعرض cat محتوى ملف نصي. يقرأ هذا التمرين ملفاً وهمياً فقط.",
            exercise: "اعرض الملف /home/kali/Documents/todo.md باستخدام cat.",
            hint: "أضف مسار الملف بعد الأمر cat.",
            explanation: "يعرض cat الملاحظات الوهمية المخصصة لهذا التمرين."
          },
          "search-notes": {
            title: "البحث في الملاحظات",
            lesson: "يبحث grep عن كلمة داخل ملف. ويبحث هنا في نص وهمي خاص بالتمرين.",
            exercise: "استخدم grep للبحث عن Python في ملف الملاحظات.",
            hint: "يأخذ الأمر كلمة البحث أولاً ثم مسار الملف.",
            explanation: "يعرض grep السطر الوهمي الذي يحتوي على Python فقط."
          },
          "safe-folder-project": {
            title: "إنشاء مجلد للملاحظات",
            lesson: "نفذ الأوامر بالترتيب: أنشئ مجلداً، ثم ملفاً داخله، ثم اعرض محتواه. تعمل الأوامر في محاكاة مؤقتة.",
            exercise: "أنشئ مجلداً باسم mon-projet، ثم أنشئ mon-projet/notes.txt واعرضه باستخدام ls mon-projet. اكتب أمراً واحداً في كل سطر.",
            hint: "الأوامر الوحيدة المتاحة هنا هي mkdir وtouch وls. ترفض المحاكاة أي أمر آخر.",
            explanation: "تنشئ الطرفية الوهمية مجلداً وملفاً في الذاكرة ثم تعرض النتيجة. لا يُكتب شيء على جهازك."
          }
        }
      }
    }
  };

  const language = () => window.LearnHubI18n?.language?.() || "fr";
  const common = (key, values = {}) => {
    const lang = language();
    let text = messages[lang]?.common?.[key] || messages.fr.common[key] || messages.en.common[key] || key;
    for (const [name, value] of Object.entries(values)) text = text.replaceAll(`{${name}}`, String(value));
    return text;
  };
  const course = (path, key, fallback) => messages[language()]?.[path]?.[key] || fallback;
  const step = (path, stepId, key, fallback) => messages[language()]?.[path]?.steps?.[stepId]?.[key] || fallback;
  const validationError = (path, stepId, fallback) =>
    messages[language()]?.validationErrors?.[path]?.[stepId] || fallback;

  const applyChrome = () => {
    const lang = language();
    const arabic = lang === "ar";
    document.querySelectorAll(".guided-step-nav").forEach((nav) => nav.setAttribute("aria-label", arabic ? "خطوات المسار" : lang === "en" ? "Path steps" : "Étapes du parcours"));
    document.querySelectorAll(".guided-nav-title").forEach((title) => title.textContent = common("stepsHeading"));
    document.querySelectorAll(".guided-progress").forEach((progress) => progress.setAttribute("aria-label", arabic ? "تقدم المسار" : lang === "en" ? "Path progress" : "Progression du parcours"));
    const htmlPage = document.body.dataset.page === "html-practice";
    if (htmlPage) {
      const eyebrow = document.querySelector(".guided-hero .eyebrow");
      const title = document.querySelector(".guided-hero h1");
      const description = document.querySelector(".guided-hero > div > p:last-child");
      if (eyebrow) eyebrow.textContent = course("html", "eyebrow", "PARCOURS PRATIQUE · DÉBUTANT");
      if (title) title.innerHTML = course("html", "title", "Apprendre le <span>HTML</span> en pratiquant");
      if (description) description.textContent = course("html", "description", "");
      document.title = `${course("html", "pageTitle", lang === "en" ? "Learn HTML by practicing" : lang === "ar" ? "تعلّم HTML بالتدريب" : "Apprendre le HTML en pratiquant")} — ${common("title")}`;
    } else if (document.body.dataset.page === "guided-practice") {
      const path = new URLSearchParams(location.search).get("path");
      if (path && messages[lang]?.[path]) {
        const eyebrow = document.querySelector("#path-eyebrow");
        const title = document.querySelector("#path-title");
        const description = document.querySelector("#path-description");
        if (eyebrow) eyebrow.textContent = course(path, "eyebrow", eyebrow.textContent);
        if (title) title.textContent = course(path, "title", title.textContent);
        if (description) description.textContent = course(path, "description", description.textContent);
        document.title = `${course(path, "title", "Practice path")} — ${common("title")}`;
      }
    }
  };

  window.LearnHubGuidedI18n = { language, common, course, step, validationError, applyChrome };
  window.addEventListener("learnhublanguagechange", applyChrome);
  applyChrome();
})();
