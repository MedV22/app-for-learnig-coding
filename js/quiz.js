/* Quiz QCM par catégorie – Learn Hub */
(() => {
  const quizzes = {
    python: {
      "Bases": [
        { q: "Quel affichage produit print(2 + 2) ?", options: ["4", "22", "2+2", "Erreur"], answer: 0 },
        { q: "Quel type a la valeur True ?", options: ["int", "str", "bool", "float"], answer: 2 },
        { q: "Comment déclare-t-on une variable en Python ?", options: ["var x = 5", "x = 5", "let x = 5", "int x = 5"], answer: 1 }
      ],
      "Opérateurs": [
        { q: "Quel est le résultat de 9 // 2 ?", options: ["4.5", "4", "1", "5"], answer: 1 },
        { q: "Quel opérateur calcule le reste d'une division ?", options: ["/", "//", "%", "**"], answer: 2 }
      ],
      "Conditions": [
        { q: "Quel mot-clé teste une condition alternative après if ?", options: ["else", "elif", "then", "unless"], answer: 1 },
        { q: "Que doit-on respecter après un if : ?", options: ["Les accolades", "L'indentation", "Un point-virgule", "Rien"], answer: 1 }
      ],
      "Boucles": [
        { q: "Quelle boucle répète pour chaque élément d'une séquence ?", options: ["while", "for", "if", "def"], answer: 1 },
        { q: "Quel mot-clé interrompt une boucle immédiatement ?", options: ["continue", "break", "return", "exit"], answer: 1 }
      ],
      "Structures de données": [
        { q: "Quelle structure permet d'associer des clés à des valeurs ?", options: ["Liste", "Tuple", "Dictionnaire", "Ensemble"], answer: 2 },
        { q: "Quelle structure ne garde que des valeurs uniques ?", options: ["Liste", "Dictionnaire", "Set", "Tuple"], answer: 2 }
      ],
      "Fonctions": [
        { q: "Quel mot-clé définit une fonction ?", options: ["func", "def", "function", "define"], answer: 1 },
        { q: "Qu'est-ce qu'une fonction lambda ?", options: ["Une fonction nommée", "Une petite fonction anonyme", "Une classe", "Un module"], answer: 1 }
      ],
      "Chaînes de texte": [
        { q: "Quelle méthode découpe une chaîne en liste ?", options: [".join()", ".split()", ".replace()", ".slice()"], answer: 1 },
        { q: "Quelle notation permet d'extraire une partie d'une chaîne ?", options: ["Slicing", "Indexing", "Splitting", "Joining"], answer: 0 }
      ],
      "Fichiers": [
        { q: "Quel mot-clé ferme automatiquement un fichier après usage ?", options: ["open", "read", "with", "close"], answer: 2 },
        { q: "Quel mode écrase le contenu existant d'un fichier ?", options: ["r", "a", "w", "x"], answer: 2 }
      ],
      "Erreurs": [
        { q: "Quel mot-clé encadre du code susceptible de lever une erreur ?", options: ["except", "try", "finally", "raise"], answer: 1 },
        { q: "Quel mot-clé déclenche volontairement une exception ?", options: ["try", "raise", "except", "throw"], answer: 1 }
      ],
      "Modules": [
        { q: "Quel module fournit sqrt et pi ?", options: ["os", "sys", "math", "random"], answer: 2 },
        { q: "Quel mot-clé rend disponibles les fonctions d'un module ?", options: ["include", "import", "require", "use"], answer: 1 }
      ],
      "POO": [
        { q: "Quel mot-clé définit une classe ?", options: ["obj", "class", "type", "struct"], answer: 1 },
        { q: "Quelle méthode initialise un nouvel objet ?", options: ["__init__", "__main__", "__str__", "__call__"], answer: 0 }
      ],
      "Outils": [
        { q: "Quel outil installe des paquets Python ?", options: ["conda", "pip", "npm", "apt"], answer: 1 },
        { q: "Qu'est-ce qu'un environnement virtuel venv ?", options: ["Un éditeur de code", "Une isolation des dépendances", "Un serveur web", "Une base de données"], answer: 1 }
      ],
      "Python pour la sécurité": [
        { q: "Quel module permet des échanges réseau de bas niveau ?", options: ["socket", "os", "math", "hashlib"], answer: 0 },
        { q: "Quel module calcule des empreintes cryptographiques ?", options: ["random", "hashlib", "socket", "subprocess"], answer: 1 }
      ],
      "Mini-projets": [
        { q: "Quel module génère des nombres aléatoires ?", options: ["math", "random", "secrets", "datetime"], answer: 1 }
      ]
    },
    kali: {
      "Commandes Linux de base": [
        { q: "Quelle commande liste les fichiers d'un dossier ?", options: ["cd", "ls", "pwd", "mkdir"], answer: 1 },
        { q: "Quelle commande affiche le chemin actuel ?", options: ["ls", "cd", "pwd", "cat"], answer: 2 },
        { q: "Quelle commande change de répertoire ?", options: ["ls", "cd", "pwd", "touch"], answer: 1 }
      ],
      "Permissions & utilisateurs": [
        { q: "Quelle commande modifie les permissions d'un fichier ?", options: ["chown", "chmod", "sudo", "whoami"], answer: 1 },
        { q: "Quelle commande exécute avec les privilèges admin ?", options: ["su", "sudo", "chmod", "adduser"], answer: 1 }
      ],
      "Réseau": [
        { q: "Quelle commande affiche les interfaces réseau ?", options: ["ping", "ip a", "netstat", "nslookup"], answer: 1 },
        { q: "Quelle commande teste la connectivité ?", options: ["ls", "ping", "cat", "mkdir"], answer: 1 }
      ],
      "Reconnaissance": [
        { q: "Quel outil cartographie les ports et services ?", options: ["whois", "nmap", "dig", "grep"], answer: 1 },
        { q: "Quel outil consulte les informations DNS d'un domaine ?", options: ["nmap", "whois", "ping", "ls"], answer: 1 }
      ],
      "Mots de passe": [
        { q: "Quel outil évalue la robustesse de mots de passe hachés ?", options: ["nmap", "hashcat", "ping", "ls"], answer: 1 },
        { q: "Quel outil génère des listes de chaînes pour des exercices ?", options: ["Crunch", "Nmap", "Ping", "Cat"], answer: 0 }
      ],
      "Labs pour s'entraîner": [
        { q: "Quelle plateforme propose des parcours guidés de cybersécurité ?", options: ["TryHackMe", "Google", "Wikipedia", "YouTube"], answer: 0 },
        { q: "Quelle application est volontairement vulnérable pour l'apprentissage ?", options: ["DVWA", "Windows", "macOS", "Chrome"], answer: 0 }
      ]
    },
    html: {
      "Structure d'une page": [
        { q: "Quelle déclaration indique au navigateur qu'il s'agit de HTML moderne ?", options: ["<html>", "<!doctype html>", "<head>", "<body>"], answer: 1 },
        { q: "Quelle balise contient tout le document ?", options: ["<head>", "<body>", "<html>", "<title>"], answer: 2 }
      ],
      "Texte et structure": [
        { q: "Quelle balise représente un paragraphe ?", options: ["<h1>", "<p>", "<div>", "<span>"], answer: 1 },
        { q: "Quelle balise crée une liste à puces ?", options: ["<ol>", "<ul>", "<li>", "<dl>"], answer: 1 }
      ],
      "Liens et médias": [
        { q: "Quelle balise crée un lien hypertexte ?", options: ["<img>", "<a>", "<video>", "<audio>"], answer: 1 },
        { q: "Quel attribut décrit une image pour l'accessibilité ?", options: ["src", "href", "alt", "title"], answer: 2 }
      ],
      "HTML sémantique": [
        { q: "Quelle balise regroupe les liens de navigation ?", options: ["<header>", "<nav>", "<main>", "<footer>"], answer: 1 },
        { q: "Quelle balise contient le contenu principal unique ?", options: ["<section>", "<main>", "<article>", "<aside>"], answer: 1 }
      ],
      "Formulaires": [
        { q: "Quelle balise regroupe les champs d'un formulaire ?", options: ["<input>", "<form>", "<button>", "<label>"], answer: 1 },
        { q: "Quel attribut lie un label à un input ?", options: ["href", "src", "for", "id"], answer: 2 }
      ]
    },
    css: {
      "Premiers styles": [
        { q: "Qu'est-ce qu'un sélecteur CSS ?", options: ["Une règle JS", "Un motif qui cible des éléments HTML", "Une couleur", "Une police"], answer: 1 },
        { q: "Quel symbole cible une classe en CSS ?", options: ["#", ".", "*", "&"], answer: 1 }
      ],
      "Texte et apparence": [
        { q: "Quelle propriété contrôle la taille de police ?", options: ["text-size", "font-size", "text-font", "size"], answer: 1 },
        { q: "Quelle propriété contrôle l'espace intérieur d'un élément ?", options: ["margin", "padding", "border", "spacing"], answer: 1 }
      ],
      "Disposition": [
        { q: "Quelle propriété permet d'aligner des éléments sur une ligne ?", options: ["grid", "flex", "block", "inline"], answer: 1 },
        { q: "Quelle valeur de position place un élément par rapport à la fenêtre ?", options: ["static", "relative", "fixed", "sticky"], answer: 2 }
      ],
      "Responsive et accessibilité": [
        { q: "Quelle règle CSS applique des styles selon la largeur d'écran ?", options: ["@style", "@media", "@query", "@screen"], answer: 1 },
        { q: "Quelle pseudo-classe rend visible l'élément actif au clavier ?", options: [":hover", ":focus-visible", ":active", ":target"], answer: 1 }
      ]
    },
    javascript: {
      "Bases du langage": [
        { q: "Quel mot-clé déclare une variable immuable ?", options: ["let", "var", "const", "function"], answer: 2 },
        { q: "Quelle fonction affiche dans la console du navigateur ?", options: ["print()", "console.log()", "echo()", "write()"], answer: 1 }
      ],
      "Boucles et fonctions": [
        { q: "Quelle boucle parcourt directement les valeurs d'un tableau ?", options: ["for", "for…of", "while", "do…while"], answer: 1 },
        { q: "Quelle syntaxe écrit une fonction de façon compacte ?", options: ["function", "flèche", "lambda", "proc"], answer: 1 }
      ],
      "Tableaux et objets": [
        { q: "Quelle méthode ajoute un élément à la fin d'un tableau ?", options: ["pop()", "push()", "shift()", "unshift()"], answer: 1 },
        { q: "Quelle méthode transforme chaque élément d'un tableau ?", options: ["filter()", "map()", "reduce()", "sort()"], answer: 1 }
      ],
      "HTML et DOM": [
        { q: "Quelle méthode sélectionne le premier élément correspondant ?", options: ["getElementById()", "querySelector()", "getElementsByClassName()", "querySelectorAll()"], answer: 1 },
        { q: "Quelle propriété lit ou change le texte d'un élément ?", options: ["innerHTML", "textContent", "value", "className"], answer: 1 }
      ],
      "Asynchrone et stockage": [
        { q: "Quelle méthode convertit un objet en texte JSON ?", options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toText()"], answer: 1 },
        { q: "Quelle API mémorise des valeurs dans le navigateur ?", options: ["sessionStorage", "localStorage", "cookieStorage", "memoryStorage"], answer: 1 }
      ]
    }
  };

  function esc(value) { return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }

  function open(key, category, language) {
    const quizKeys = key === "web" ? ["html", "css", "javascript"] : [key];
    const questionPool = quizKeys.flatMap((quizKey) => Object.values(quizzes[quizKey] || {}).flat());
    const categoryQuestions = category ? (quizzes[key] && quizzes[key][category]) || [] : null;
    const questions = categoryQuestions || [...questionPool];
    if (!categoryQuestions) {
      for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
      }
      questions.length = Math.min(questions.length, 10);
    }
    if (!questions.length || (!categoryQuestions && questions.length < 10)) {
      alert(language === "ar" ? "لا توجد أسئلة لهذا القسم." : language === "en" ? "No questions for this section." : "Aucune question pour cette section.");
      return;
    }

    const labels = {
      ar: { title: "اختبار شامل", question: "سؤال", options: "اختر الإجابة الصحيحة:", submit: "إظهار النتيجة", score: "نتيجتك: {score} / {total}", retry: "إعادة المحاولة", close: "إغلاق", next: "التالي", correct: "إجابة صحيحة!", wrong: "إجابة خاطئة." },
      en: { title: "General quiz", question: "Question", options: "Choose the correct answer:", submit: "Show result", score: "Your score: {score} / {total}", retry: "Retry", close: "Close", next: "Next", correct: "Correct!", wrong: "Incorrect." },
      fr: { title: "Quiz général", question: "Question", options: "Choisissez la bonne réponse :", submit: "Voir le résultat", score: "Votre score : {score} / {total}", retry: "Recommencer", close: "Fermer", next: "Suivante", correct: "Correct !", wrong: "Incorrect." }
    };
    const l = labels[language] || labels.fr;

    let current = 0;
    let score = 0;
    let answered = false;

    const container = document.createElement("div");
    container.className = "quiz-modal";
    container.innerHTML = `
      <div class="quiz-backdrop">
        <section class="quiz-dialog" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
          <button class="quiz-close" type="button" aria-label="${l.close}">×</button>
          <h3 id="quiz-title">${category ? `${l.title} – ${category}` : l.title}</h3>
          <div class="quiz-progress"><span>Question ${current + 1} / ${questions.length}</span></div>
          <div class="quiz-content">
            <p class="quiz-question">${l.question} 1 : ${questions[0].q}</p>
            <ul class="quiz-options" role="radiogroup" aria-label="${l.options}">
              ${questions[0].options.map((opt, i) => `<li><button type="button" class="quiz-option" data-index="${i}">${esc(opt)}</button></li>`).join("")}
            </ul>
            <p class="quiz-feedback"></p>
            <div class="quiz-actions" style="display:flex">
              <button class="quiz-next" type="button" style="display:none">${l.next}</button>
              <button class="quiz-retry" type="button" style="display:none">${l.retry}</button>
              <button class="quiz-close-btn" type="button">${l.close}</button>
            </div>
            <div class="quiz-result" style="display:none"></div>
          </div>
        </section>
      </div>`;

    const closeModal = () => container.remove();
    container.querySelector(".quiz-close").addEventListener("click", closeModal);
    container.querySelector(".quiz-close-btn").addEventListener("click", closeModal);
    container.querySelector(".quiz-backdrop").addEventListener("click", (e) => { if (e.target === container.querySelector(".quiz-backdrop")) closeModal(); });

    function getOptions() { return container.querySelectorAll(".quiz-option"); }
    function getFeedback() { return container.querySelector(".quiz-feedback"); }
    function getNextBtn() { return container.querySelector(".quiz-next"); }
    function getRetryBtn() { return container.querySelector(".quiz-retry"); }
    function getResultDiv() { return container.querySelector(".quiz-result"); }
    function getActionsDiv() { return container.querySelector(".quiz-actions"); }
    function getProgressSpan() { return container.querySelector(".quiz-progress span"); }
    function getQuestionP() { return container.querySelector(".quiz-question"); }
    function getOptionsList() { return container.querySelector(".quiz-options"); }

    function renderQuestion() {
      answered = false;
      getFeedback().textContent = "";
      getFeedback().style.color = "";
      getOptions().forEach((o) => { o.disabled = false; o.style.background = ""; o.style.color = ""; });
      getNextBtn().style.display = "none";
      getRetryBtn().style.display = "none";
      getResultDiv().style.display = "none";
      getActionsDiv().style.display = "flex";
      getProgressSpan().textContent = `Question ${current + 1} / ${questions.length}`;
      getQuestionP().textContent = `${l.question} ${current + 1} : ${questions[current].q}`;
      getOptionsList().innerHTML = questions[current].options.map((opt, i) => `<li><button type="button" class="quiz-option" data-index="${i}">${esc(opt)}</button></li>`).join("");
      getOptions().forEach((o) => o.addEventListener("click", handleAnswer));
    }

    function handleAnswer(e) {
      if (answered) return;
      answered = true;
      const idx = Number(e.currentTarget.dataset.index);
      const correct = questions[current].answer;
      const opts = getOptions();
      opts.forEach((o) => o.disabled = true);
      if (idx === correct) {
        score++;
        e.currentTarget.style.background = "#d4edda";
        e.currentTarget.style.color = "#155724";
        getFeedback().textContent = l.correct;
        getFeedback().style.color = "#155724";
      } else {
        e.currentTarget.style.background = "#f8d7da";
        e.currentTarget.style.color = "#721c24";
        opts[correct].style.background = "#d4edda";
        opts[correct].style.color = "#155724";
        getFeedback().textContent = l.wrong;
        getFeedback().style.color = "#721c24";
      }
      if (current < questions.length - 1) {
        getNextBtn().textContent = l.next;
        getNextBtn().style.display = "inline-block";
      } else {
        getResultDiv().innerHTML = `<strong>${l.score.replace("{score}", score).replace("{total}", questions.length)}</strong>`;
        getResultDiv().style.display = "block";
        getRetryBtn().style.display = "inline-block";
        getNextBtn().style.display = "none";
      }
    }

    getNextBtn().addEventListener("click", () => {
      if (current < questions.length - 1) {
        current++;
        renderQuestion();
      } else {
        getResultDiv().innerHTML = `<strong>${l.score.replace("{score}", score).replace("{total}", questions.length)}</strong>`;
        getResultDiv().style.display = "block";
        getRetryBtn().style.display = "inline-block";
        getNextBtn().style.display = "none";
      }
    });

    getRetryBtn().addEventListener("click", () => {
      current = 0;
      score = 0;
      renderQuestion();
    });

    renderQuestion();
    document.body.append(container);
    container.querySelector(".quiz-dialog").focus();
  }

  window.LearnHubQuiz = { open };
})();
