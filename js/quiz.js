/* Quiz QCM par catégorie & Quiz Global — Learn Hub */
(() => {
  const quizzes = {
    python: {
      "Bases": [
        { q: "What does print(2 + 2) display?", options: ["4", "22", "2+2", "Error"], answer: 0, explain: "In Python, 2 + 2 adds two integers and returns 4." },
        { q: "What is the type of the value True in Python?", options: ["int", "str", "bool", "float"], answer: 2, explain: "True and False are Boolean values of type bool." },
        { q: "How do you declare a variable x with the value 5?", options: ["var x = 5", "x = 5", "let x = 5", "int x = 5"], answer: 1, explain: "In Python, the direct assignment 'x = 5' is enough." }
      ],
      "Opérateurs": [
        { q: "What is the result of 9 // 2 in Python?", options: ["4.5", "4", "1", "5"], answer: 1, explain: "// is the floor-division operator; it returns the integer quotient." },
        { q: "Which operator returns the remainder of a division (modulo)?", options: ["/", "//", "%", "**"], answer: 2, explain: "% is the modulo operator and returns the remainder of a division." },
        { q: "Which operator calculates a power (for example, 2 cubed)?", options: ["^", "**", "pow", "//"], answer: 1, explain: "In Python, 2 ** 3 equals 8." }
      ],
      "Conditions": [
        { q: "Which keyword checks an alternative condition after an 'if'?", options: ["else", "elif", "then", "unless"], answer: 1, explain: "'elif' is Python's abbreviation for 'else if'." },
        { q: "What must you use after 'if condition:'?", options: ["Braces", "Indentation (spaces)", "A semicolon", "Nothing"], answer: 1, explain: "Python uses indentation to define code blocks." }
      ],
      "Boucles": [
        { q: "Which loop repeats an action for each item in a sequence?", options: ["while", "for", "if", "def"], answer: 1, explain: "The loop 'for item in sequence' visits each item." },
        { q: "Which keyword immediately stops a loop?", options: ["continue", "break", "return", "pass"], answer: 1, explain: "'break' immediately exits the current loop." },
        { q: "What values does range(1, 4) produce?", options: ["[1, 2, 3, 4]", "1, 2, 3", "0, 1, 2, 3", "1, 4"], answer: 1, explain: "range(1, 4) starts at 1 and stops before 4, producing 1, 2, 3." }
      ],
      "Structures de données": [
        { q: "Which data structure associates keys with values?", options: ["List", "Tuple", "Dictionary", "Set"], answer: 2, explain: "A dictionary (dict) stores key-value pairs." },
        { q: "Which data structure keeps only unique values without duplicates?", options: ["List", "Dictionary", "Set", "Tuple"], answer: 2, explain: "A set automatically removes duplicate values." },
        { q: "How do you add an item to the end of a list?", options: [".push()", ".append()", ".add()", ".insert()"], answer: 1, explain: "In Python, use my_list.append(item)." }
      ],
      "Fonctions": [
        { q: "Which keyword defines a function in Python?", options: ["func", "def", "function", "define"], answer: 1, explain: "The 'def' keyword is used to declare a function." },
        { q: "What is a lambda function in Python?", options: ["A named function", "A small anonymous function written on one line", "A class", "A decorator"], answer: 1, explain: "lambda arguments: expression creates an anonymous function." },
        { q: "Which keyword returns a value calculated by a function?", options: ["send", "output", "return", "result"], answer: 2, explain: "'return' sends a result back to the caller." }
      ],
      "Chaînes de texte": [
        { q: "Which method splits a string into a list of words?", options: [".join()", ".split()", ".slice()", ".cut()"], answer: 1, explain: "'one two'.split() returns ['one', 'two']." },
        { q: "Which notation inserts a variable directly into a string?", options: ["f-string: f\"Hello {name}\"", "string.format() only", "$name", "%s required"], answer: 0, explain: "An f-string prefixed with 'f' evaluates expressions inside braces." },
        { q: "What is the value of 'Python'[0:2]?", options: ["'Py'", "'Pyt'", "'y'", "'Python'"], answer: 0, explain: "The slice [0:2] takes indexes 0 and 1 ('Py')." }
      ],
      "Fichiers": [
        { q: "Which keyword automatically closes a file after use?", options: ["open", "with", "close", "auto"], answer: 1, explain: "'with open(...) as f:' ensures the file is closed automatically." },
        { q: "Which open() mode overwrites a file's existing contents?", options: ["'r'", "'a'", "'w'", "'x'"], answer: 2, explain: "'w' (write) overwrites the file or creates it if it does not exist." }
      ],
      "Erreurs": [
        { q: "Which keyword wraps code that may raise an exception?", options: ["catch", "try", "except", "error"], answer: 1, explain: "The 'try' block contains the code to test." },
        { q: "Which keyword deliberately raises an exception?", options: ["throw", "raise", "error", "except"], answer: 1, explain: "In Python, 'raise Exception(\"error\")' raises an exception." }
      ],
      "Modules": [
        { q: "Which standard module provides sqrt(), pi, and trigonometric functions?", options: ["os", "sys", "math", "random"], answer: 2, explain: "The 'math' module contains common mathematical functions." },
        { q: "Which keyword imports an external or standard module?", options: ["include", "import", "require", "using"], answer: 1, explain: "'import' loads a module so you can use it." }
      ],
      "POO": [
        { q: "Which keyword defines a class in Python?", options: ["obj", "class", "type", "struct"], answer: 1, explain: "The keyword 'class ClassName:' defines a class." },
        { q: "Which special method initializes a new object's attributes?", options: ["__init__", "__main__", "__new__", "__start__"], answer: 0, explain: "def __init__(self, ...) is a Python class's initializer." },
        { q: "What does the first parameter 'self' represent in an instance method?", options: ["The parent class", "The current object instance", "A global variable", "Nothing"], answer: 1, explain: "'self' refers to the object on which the method is called." }
      ],
      "Outils": [
        { q: "Which command-line tool installs Python packages from PyPI?", options: ["conda", "pip", "npm", "apt"], answer: 1, explain: "'pip install package' is Python's standard package manager." },
        { q: "What is a 'venv' virtual environment used for?", options: ["Speeding up the processor", "Isolating a project's dependencies", "Compiling to a binary", "Hosting a web server"], answer: 1, explain: "venv isolates a project's libraries to avoid conflicts." }
      ],
      "Python pour la sécurité": [
        { q: "Which Python module supports low-level network communication (TCP/UDP)?", options: ["socket", "os", "math", "hashlib"], answer: 0, explain: "The 'socket' module can open TCP/UDP network connections." },
        { q: "Which module calculates cryptographic hashes (SHA-256, MD5)?", options: ["random", "hashlib", "secrets", "crypto"], answer: 1, explain: "'hashlib' contains standard hashing algorithms." },
        { q: "Which module launches external programs or system commands?", options: ["subprocess", "system", "cmd", "exec"], answer: 0, explain: "'subprocess.run()' is the recommended way to run external commands." }
      ],
      "Mini-projets": [
        { q: "Which function generates a random integer from 1 to 10, inclusive?", options: ["math.rand(1, 10)", "random.randint(1, 10)", "random.choice(1, 10)", "random.range(1, 10)"], answer: 1, explain: "random.randint(a, b) includes both endpoints a and b." },
        { q: "How do you convert a user's string input to an integer?", options: ["to_int(s)", "int(s)", "parse(s)", "Integer(s)"], answer: 1, explain: "int(\"42\") converts the string to the integer 42." }
      ]
    },
    kali: {
      "Introduction": [
        { q: "What is Kali Linux?", options: ["An antivirus for Windows", "A Linux distribution for cybersecurity and security audits", "A programming language", "A hardware router"], answer: 1, explain: "Kali Linux is designed for penetration testing and computer security." },
        { q: "Why is Kali commonly recommended for use in a virtual machine (VM)?", options: ["To make the internet faster", "To isolate tests and protect the main system", "It is required to install Kali", "To mine cryptocurrency"], answer: 1, explain: "A VM provides a secure, easily resettable sandbox." },
        { q: "Which command updates the list of available packages on Kali?", options: ["sudo apt update", "sudo apt upgrade", "sudo apt get", "kali-update"], answer: 0, explain: "'apt update' downloads current package lists from the repositories." }
      ],
      "Commandes Linux de base": [
        { q: "Which command lists files in the current directory?", options: ["cd", "ls", "pwd", "mkdir"], answer: 1, explain: "'ls' (list) displays files and directories." },
        { q: "Which command prints the absolute path of the current directory?", options: ["dir", "pwd", "path", "where"], answer: 1, explain: "'pwd' stands for Print Working Directory." },
        { q: "Which command changes the current working directory?", options: ["mv", "cd", "cp", "goto"], answer: 1, explain: "'cd' (Change Directory) lets you navigate between directories." },
        { q: "Which command creates a new directory?", options: ["touch", "mkdir", "newdir", "md"], answer: 1, explain: "'mkdir my_directory' creates a directory." }
      ],
      "Permissions & utilisateurs": [
        { q: "Which command changes a file's permissions (rwx)?", options: ["chown", "chmod", "sudo", "perm"], answer: 1, explain: "'chmod' (Change Mode) changes read, write, and execute permissions." },
        { q: "Which command runs another command with administrator privileges?", options: ["su", "sudo", "admin", "root"], answer: 1, explain: "'sudo' temporarily elevates privileges for a command." },
        { q: "Which command displays the name of the currently logged-in user?", options: ["whoami", "id", "user", "logname"], answer: 0, explain: "'whoami' prints the current account name (for example, kali)." }
      ],
      "Gestion des paquets": [
        { q: "Which command installs a new package on Kali?", options: ["apt get package", "sudo apt install package", "dpkg package", "pacman package"], answer: 1, explain: "'sudo apt install <name>' installs a package from the official repositories." },
        { q: "What does 'sudo apt upgrade' do?", options: ["Updates the package list", "Upgrades installed packages", "Restarts the computer", "Deletes temporary files"], answer: 1, explain: "'apt upgrade' installs newer versions of installed software." }
      ],
      "Réseau": [
        { q: "Which modern command displays network interfaces and their IP addresses?", options: ["ping", "ip a", "route", "netstat"], answer: 1, explain: "'ip a' (or 'ip address') lists interfaces and IP addresses." },
        { q: "Which command checks connectivity to a host using ICMP packets?", options: ["curl", "ping", "traceroute", "netstat"], answer: 1, explain: "'ping address' tests whether a machine responds over the network." },
        { q: "Which command shows the network hops (routers) to a destination?", options: ["traceroute", "ping", "nslookup", "route"], answer: 0, explain: "'traceroute' traces the network path hop by hop." }
      ],
      "Recherche & texte": [
        { q: "Which command filters text lines that match a pattern?", options: ["find", "grep", "locate", "sed"], answer: 1, explain: "'grep' searches text for patterns, including regular expressions." },
        { q: "What does the pipe operator '|' do in a terminal?", options: ["Stops a command", "Sends one command's output to another command's input", "Creates a file", "Runs a command in the background"], answer: 1, explain: "'cmd1 | cmd2' redirects the output stream to cmd2." },
        { q: "Which command follows new lines added to a file (such as a log)?", options: ["head", "cat", "tail -f", "nano"], answer: 2, explain: "'tail -f file.log' follows new content written to a file." }
      ],
      "Reconnaissance": [
        { q: "Which tool is commonly used to map ports and services on a network?", options: ["whois", "nmap", "dig", "traceroute"], answer: 1, explain: "Nmap (Network Mapper) is a widely used network-scanning tool." },
        { q: "Which tool retrieves registration information about a domain name?", options: ["nmap", "whois", "ping", "cat"], answer: 1, explain: "'whois example.com' queries domain-name registries." }
      ],
      "Analyse de vulnérabilités": [
        { q: "Which command-line tool checks a web server for common vulnerabilities?", options: ["Nikto", "Nmap", "Wireshark", "Ping"], answer: 0, explain: "Nikto performs targeted checks for risky web-server configurations." },
        { q: "Which local tool searches Exploit-DB for known exploits?", options: ["searchsploit", "findsploit", "exploit-find", "grep-db"], answer: 0, explain: "'searchsploit' searches a local copy of the Exploit-DB database." }
      ],
      "Attaques web (labo)": [
        { q: "Which interactive proxy can intercept and modify HTTP/S requests in a lab?", options: ["Burp Suite", "Wireshark", "Curl", "Nmap"], answer: 0, explain: "Burp Suite is a widely used intercepting proxy for web testing." },
        { q: "Which tool automates the detection and testing of SQL injection flaws?", options: ["sqlmap", "nikto", "john", "gobuster"], answer: 0, explain: "sqlmap is specialized for testing SQL injection vulnerabilities." },
        { q: "What are Gobuster and Dirb used for?", options: ["Cracking passwords", "Discovering files and directories on a web server", "Scanning Wi-Fi ports", "Creating a VPN"], answer: 1, explain: "Gobuster enumerates web paths using a wordlist." }
      ],
      "Mots de passe": [
        { q: "Which tool uses GPU acceleration to audit password hashes?", options: ["nmap", "hashcat", "ping", "hydra"], answer: 1, explain: "Hashcat uses graphics cards to audit password hashes." },
        { q: "Which tool tests network authentication services (SSH, FTP, HTTP) using a wordlist?", options: ["Hydra", "John", "Crunch", "Wireshark"], answer: 0, explain: "THC Hydra tests network authentication services." }
      ],
      "Wi-Fi (labo / réseau propre)": [
        { q: "Which tool suite is commonly used to audit 802.11 wireless security?", options: ["Aircrack-ng", "Wireshark", "Nmap", "Metasploit"], answer: 0, explain: "Aircrack-ng is a suite for testing Wi-Fi security." },
        { q: "When is it permitted to audit a wireless network?", options: ["On any public Wi-Fi", "Only on your own network or with explicit written permission", "As long as you do not download anything", "Any weekend"], answer: 1, explain: "Unauthorized auditing is illegal and may carry criminal penalties." }
      ],
      "Analyse réseau": [
        { q: "Which graphical application captures and analyzes network packets?", options: ["Wireshark", "Nmap", "Burp Suite", "Netcat"], answer: 0, explain: "Wireshark is a widely used network protocol analyzer." },
        { q: "Which Linux command-line tool can capture packets?", options: ["tcpdump", "ping", "traceroute", "netstat"], answer: 0, explain: "tcpdump captures and filters packets directly in the terminal." }
      ],
      "Exploitation": [
        { q: "Which framework helps validate exploits in a controlled environment?", options: ["Metasploit (msfconsole)", "Wireshark", "John the Ripper", "Autopsy"], answer: 0, explain: "Metasploit Framework is commonly used to test vulnerabilities in a lab." },
        { q: "Which Metasploit utility generates customized test payloads?", options: ["msfvenom", "msfupdate", "msfscan", "msfcli"], answer: 0, explain: "msfvenom combines payload generation and encoding." }
      ],
      "Forensic": [
        { q: "What is digital forensics used for?", options: ["Attacking remote targets", "Analyzing digital evidence and traces after an incident", "Encrypting a hard drive", "Installing an OS"], answer: 1, explain: "Forensics analyzes disks, memory, and logs to understand an incident." },
        { q: "Which tool extracts embedded or hidden files from a binary image or firmware?", options: ["binwalk", "grep", "cat", "tar"], answer: 0, explain: "Binwalk analyzes firmware and disk images and can extract embedded files." }
      ],
      "Anonymat & sécurité": [
        { q: "Which tool routes an application's connections through a chain of proxies?", options: ["proxychains", "curl", "openvpn", "ssh"], answer: 0, explain: "proxychains routes supported TCP connections through SOCKS/HTTP proxies." },
        { q: "Which principle protects traffic on the Tor network?", options: ["Onion routing (layered encryption)", "A single password", "A centralized proxy", "A firewall"], answer: 0, explain: "Tor encrypts packets in successive layers, like an onion." }
      ],
      "Labs pour s'entraîner": [
        { q: "Which platform offers guided paths for learning cybersecurity step by step?", options: ["TryHackMe", "Wikipedia", "Stack Overflow", "Reddit"], answer: 0, explain: "TryHackMe provides virtual machines and guided learning rooms." },
        { q: "Which intentionally vulnerable web application is suitable for local practice?", options: ["DVWA (Damn Vulnerable Web App)", "Apache2", "Nginx", "WordPress"], answer: 0, explain: "DVWA lets you legally practice XSS, SQL injection, and CSRF on your own machine." }
      ]
    },
    html: {
      "Structure d'une page": [
        { q: "Which declaration tells the browser that the document uses HTML5?", options: ["<html>", "<!doctype html>", "<head>", "<?xml>"], answer: 1, explain: "Placing <!doctype html> at the start of the document enables standard HTML5 rendering." },
        { q: "Which element contains metadata (title, encoding, styles) that is not directly visible?", options: ["<body>", "<head>", "<meta>", "<title>"], answer: 1, explain: "<head> contains page configuration and links to resources." }
      ],
      "Texte et structure": [
        { q: "Which HTML element defines a paragraph of text?", options: ["<p>", "<div>", "<span>", "<text>"], answer: 0, explain: "<p> represents a semantic paragraph." },
        { q: "Which element creates an unordered bulleted list?", options: ["<ol>", "<ul>", "<li>", "<list>"], answer: 1, explain: "<ul> (unordered list) contains <li> items." }
      ],
      "Liens et médias": [
        { q: "Which element creates a hyperlink to another page?", options: ["<link>", "<a href=\"...\">", "<url>", "<href>"], answer: 1, explain: "<a href=\"...\"> (anchor) creates a hyperlink." },
        { q: "Which attribute on <img> is essential for accessibility?", options: ["title", "alt", "src", "desc"], answer: 1, explain: "'alt' provides a text description for screen readers." }
      ],
      "HTML sémantique": [
        { q: "Which element groups a site's primary navigation links?", options: ["<header>", "<nav>", "<menu>", "<links>"], answer: 1, explain: "<nav> identifies a page's navigation area to browsers and assistive technologies." },
        { q: "Which element contains the page's unique primary content?", options: ["<section>", "<main>", "<article>", "<body>"], answer: 1, explain: "<main> should appear once per document and contain its central topic." }
      ],
      "Formulaires": [
        { q: "Which element associates an accessible label with an input field?", options: ["<p>", "<label for=\"...\">", "<legend>", "<span>"], answer: 1, explain: "<label for=\"id\"> connects the label to the matching field." },
        { q: "Which input type masks the characters a user enters?", options: ["type=\"secret\"", "type=\"password\"", "type=\"hidden\"", "type=\"protect\""], answer: 1, explain: "<input type=\"password\"> visually masks the entered text." }
      ]
    },
    css: {
      "Premiers styles": [
        { q: "Which symbol prefixes a CSS class selector?", options: ["#", ".", "*", "&"], answer: 1, explain: ".class-name targets all elements with that class." },
        { q: "Which symbol prefixes a unique ID selector?", options: ["#", ".", "@", "$"], answer: 0, explain: "#id targets the unique element with that ID." }
      ],
      "Texte et apparence": [
        { q: "Which property controls the size of text?", options: ["text-size", "font-size", "size", "font-weight"], answer: 1, explain: "font-size (for example, 16px or 1.2rem) sets the text size." },
        { q: "What is the difference between margin and padding?", options: ["Margin is inside space; padding is outside space", "Padding is inside space; margin is outside space", "There is no difference", "Margin only works on text"], answer: 1, explain: "Padding is inside the border; margin is outside it." }
      ],
      "Disposition": [
        { q: "Which display value arranges child elements in a flexible row or column?", options: ["block", "flex", "grid", "inline"], answer: 1, explain: "display: flex enables the one-dimensional Flexbox layout." },
        { q: "Which position value fixes an element relative to the browser window?", options: ["absolute", "relative", "fixed", "sticky"], answer: 2, explain: "position: fixed keeps the element in place while the page scrolls." }
      ],
      "Responsive et accessibilité": [
        { q: "Which CSS rule applies styles based on screen width?", options: ["@responsive", "@media", "@screen", "@query"], answer: 1, explain: "@media (max-width: 768px) { ... } handles responsive layouts." },
        { q: "Which pseudo-class styles an outline when a user navigates with a keyboard?", options: [":hover", ":active", ":focus-visible", ":visited"], answer: 2, explain: ":focus-visible provides a useful keyboard focus outline without affecting mouse clicks." }
      ]
    },
    javascript: {
      "Bases du langage": [
        { q: "Which keyword declares a variable that will not be reassigned?", options: ["let", "var", "const", "fixed"], answer: 2, explain: "'const' prevents a variable from being reassigned." },
        { q: "Which statement prints a message to the developer console?", options: ["print()", "console.log()", "echo()", "System.out.println()"], answer: 1, explain: "console.log(...) is the standard way to print output in JavaScript." }
      ],
      "Boucles et fonctions": [
        { q: "Which modern loop iterates directly over the values of an iterable?", options: ["for...in", "for...of", "while", "loop"], answer: 1, explain: "'for (const item of array)' reads each value directly." },
        { q: "Which is the syntax for a concise arrow function?", options: ["(x) => x * 2", "function(x) { x * 2 }", "def(x) => x * 2", "arrow x: x*2"], answer: 0, explain: "(x) => x * 2 is an arrow function with an implicit return." }
      ],
      "Tableaux et objets": [
        { q: "Which method transforms each array item to produce a new array?", options: ["filter()", "map()", "forEach()", "reduce()"], answer: 1, explain: "arr.map(fn) returns a transformed array with the same length." },
        { q: "Which method keeps only items that satisfy a Boolean condition?", options: ["map()", "filter()", "find()", "slice()"], answer: 1, explain: "arr.filter(fn) returns a subset of the items." }
      ],
      "HTML et DOM": [
        { q: "Which method selects the first element matching a CSS selector?", options: ["document.select()", "document.querySelector()", "document.getElement()", "document.find()"], answer: 1, explain: "querySelector('selector') uses the same selectors as CSS." },
        { q: "Which method listens for user clicks on a button?", options: ["btn.onclick()", "btn.addEventListener('click', fn)", "btn.listen('click')", "btn.attachEvent()"], answer: 1, explain: "addEventListener('click', handler) is the standard, flexible method." }
      ],
      "Asynchrone et stockage": [
        { q: "Which browser API stores simple data between visits?", options: ["sessionMemory", "localStorage", "cookieRAM", "tempStorage"], answer: 1, explain: "localStorage keeps data even after the browser is closed." },
        { q: "How do you convert a JavaScript object to a JSON string?", options: ["JSON.parse(obj)", "JSON.stringify(obj)", "obj.toJSON()", "String(obj)"], answer: 1, explain: "JSON.stringify() serializes a value as JSON text." }
      ]
    }
  };

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  function open(key, category, language = "fr") {
    const quizKeys = key === "web" ? ["html", "css", "javascript"] : [key];
    const categoryQuestions = category && quizzes[key] && quizzes[key][category] ? quizzes[key][category] : null;
    let questions = [];

    if (categoryQuestions && categoryQuestions.length > 0) {
      questions = [...categoryQuestions];
    } else {
      // General quiz across available keys
      const pool = quizKeys.flatMap((k) => Object.values(quizzes[k] || {}).flat());
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      questions = pool.slice(0, 10);
    }

    if (!questions.length) {
      const emptyMsg = language === "ar" ? "لا توجد أسئلة متاحة حالياً لهذا القسم." : language === "en" ? "No questions available for this section." : "Aucune question disponible pour cette section.";
      alert(emptyMsg);
      return;
    }

    const labels = {
      ar: {
        title: "اختبار المفاهيم",
        generalTitle: "اختبار شامل للمسار",
        question: "السؤال",
        scoreLabel: "النتيجة",
        score: "نتيجتك: {score} من {total}",
        scorePercent: "النسبة: {percent}%",
        retry: "إعادة الاختبار",
        close: "إغلاق",
        next: "السؤال التالي",
        correct: "إجابة صحيحة! أحسنت",
        wrong: "إجابة غير صحيحة",
        explanation: "الشرح:",
        excellent: "ممتاز! أداء مبهر 🏆",
        good: "جيد جداً! تتقدم بثبات 👍",
        keepLearning: "بداية جيدة! راجع المفاهيم وحاول مجدداً 💪"
      },
      en: {
        title: "Concept Quiz",
        generalTitle: "Course Challenge Quiz",
        question: "Question",
        scoreLabel: "Score",
        score: "Your score: {score} / {total}",
        scorePercent: "Score: {percent}%",
        retry: "Retake Quiz",
        close: "Close",
        next: "Next Question",
        correct: "Correct! Well done",
        wrong: "Not quite right",
        explanation: "Explanation:",
        excellent: "Mastery achieved! Outstanding 🏆",
        good: "Great job! Keep the momentum going 👍",
        keepLearning: "Good practice! Review the concepts and try again 💪"
      },
      fr: {
        title: "Quiz de validation",
        generalTitle: "Grand Quiz du parcours",
        question: "Question",
        scoreLabel: "Score",
        score: "Ton score : {score} / {total}",
        scorePercent: "Réussite : {percent}%",
        retry: "Recommencer le quiz",
        close: "Fermer",
        next: "Question suivante",
        correct: "Excellente réponse ! ✓",
        wrong: "Ce n'est pas la bonne réponse",
        explanation: "Pourquoi :",
        excellent: "Score parfait ou presque ! Bravo 🏆",
        good: "Très bon travail ! Tu progresses bien 👍",
        keepLearning: "Bel entraînement ! Relis les fiches et réessaie 💪"
      }
    };
    const l = labels[language] || labels.fr;

    let current = 0;
    let score = 0;
    let answered = false;
    const previousFocus = document.activeElement;

    const categoryLabel = category ? window.LearnHubI18n?.category?.(category) || category : "";
    const modalTitle = categoryLabel ? `${l.title} · ${categoryLabel}` : l.generalTitle;

    const container = document.createElement("div");
    container.className = "quiz-modal";
    container.innerHTML = `
      <div class="quiz-backdrop">
        <section class="quiz-dialog" role="dialog" aria-modal="true" aria-labelledby="quiz-title" tabindex="-1">
          <div class="quiz-header">
            <div>
              <span class="quiz-badge">${language === "ar" ? "اختبار تفاعلي" : language === "en" ? "Interactive Quiz" : "QCM interactif"}</span>
              <h3 id="quiz-title">${esc(modalTitle)}</h3>
            </div>
            <button class="quiz-close" type="button" aria-label="${l.close}">×</button>
          </div>
          <div class="quiz-progress-bar"><div class="quiz-progress-fill" style="width: 0%"></div></div>
          <div class="quiz-meta-row">
            <span class="quiz-step-label">Question 1 / ${questions.length}</span>
            <span class="quiz-score-badge">Score : 0</span>
          </div>
          <div class="quiz-content">
            <h4 class="quiz-question" lang="en" dir="ltr"></h4>
            <div class="quiz-options" role="radiogroup" lang="en" dir="ltr"></div>
            <div class="quiz-feedback" style="display:none">
              <div class="quiz-feedback-title"></div>
              <div class="quiz-feedback-text" lang="en" dir="ltr"></div>
            </div>
            <div class="quiz-result" style="display:none"></div>
          </div>
          <div class="quiz-footer">
            <button class="quiz-btn-nav quiz-next" type="button" style="display:none">${l.next} →</button>
            <button class="quiz-btn-nav quiz-retry" type="button" style="display:none">↻ ${l.retry}</button>
            <button class="quiz-btn-nav quiz-close-btn" type="button">${l.close}</button>
          </div>
        </section>
      </div>`;

    const closeModal = () => {
      container.remove();
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };

    function onKeyDown(event) {
      const backdrop = container.querySelector(".quiz-backdrop");
      if (window.LearnHubUtils?.isTopLayer && !window.LearnHubUtils.isTopLayer(backdrop)) return;
      if (event.key === "Escape") {
        event.stopImmediatePropagation();
        closeModal();
        return;
      }
      if (event.key === "Tab") {
        const dialog = container.querySelector(".quiz-dialog");
        const focusable = [...dialog.querySelectorAll("button:not(:disabled), [tabindex]:not([tabindex='-1'])")];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    container.querySelector(".quiz-close").addEventListener("click", closeModal);
    container.querySelector(".quiz-close-btn").addEventListener("click", closeModal);
    container.querySelector(".quiz-backdrop").addEventListener("click", (e) => {
      if (e.target === container.querySelector(".quiz-backdrop")) closeModal();
    });

    const progressFill = container.querySelector(".quiz-progress-fill");
    const stepLabel = container.querySelector(".quiz-step-label");
    const scoreBadge = container.querySelector(".quiz-score-badge");
    const questionEl = container.querySelector(".quiz-question");
    const optionsEl = container.querySelector(".quiz-options");
    const feedbackEl = container.querySelector(".quiz-feedback");
    const feedbackTitle = container.querySelector(".quiz-feedback-title");
    const feedbackText = container.querySelector(".quiz-feedback-text");
    const resultEl = container.querySelector(".quiz-result");
    const nextBtn = container.querySelector(".quiz-next");
    const retryBtn = container.querySelector(".quiz-retry");

    function renderQuestion() {
      answered = false;
      const q = questions[current];
      const progressPercent = Math.round(((current) / questions.length) * 100);
      progressFill.style.width = `${progressPercent}%`;
      stepLabel.textContent = `${l.question} ${current + 1} / ${questions.length}`;
      scoreBadge.textContent = `${l.scoreLabel}: ${score}`;

      questionEl.textContent = q.q;
      feedbackEl.style.display = "none";
      nextBtn.style.display = "none";
      retryBtn.style.display = "none";
      resultEl.style.display = "none";
      optionsEl.style.display = "grid";

      const optionLetters = ["A", "B", "C", "D"];
      optionsEl.innerHTML = q.options.map((opt, i) => `
        <button type="button" class="quiz-option" data-index="${i}">
          <span class="quiz-opt-letter">${optionLetters[i] || i + 1}</span>
          <span class="quiz-opt-text">${esc(opt)}</span>
        </button>
      `).join("");

      optionsEl.querySelectorAll(".quiz-option").forEach((btn) => {
        btn.addEventListener("click", handleAnswer);
      });
    }

    function handleAnswer(e) {
      if (answered) return;
      answered = true;
      const clickedBtn = e.currentTarget;
      const chosenIdx = Number(clickedBtn.dataset.index);
      const q = questions[current];
      const correctIdx = q.answer;

      const allButtons = optionsEl.querySelectorAll(".quiz-option");
      allButtons.forEach((b) => b.disabled = true);

      if (chosenIdx === correctIdx) {
        score++;
        scoreBadge.textContent = `${l.scoreLabel}: ${score}`;
        clickedBtn.classList.add("is-correct");
        feedbackEl.className = "quiz-feedback is-correct";
        feedbackTitle.textContent = l.correct;
      } else {
        clickedBtn.classList.add("is-wrong");
        allButtons[correctIdx]?.classList.add("is-correct");
        feedbackEl.className = "quiz-feedback is-wrong";
        feedbackTitle.textContent = l.wrong;
      }

      feedbackText.textContent = q.explain ? `${l.explanation} ${q.explain}` : "";
      feedbackEl.style.display = "block";

      if (current < questions.length - 1) {
        nextBtn.style.display = "inline-flex";
        nextBtn.focus();
      } else {
        showResult();
      }
    }

    function showResult() {
      progressFill.style.width = "100%";
      const percent = Math.round((score / questions.length) * 100);
      const appreciation = percent >= 80 ? l.excellent : percent >= 50 ? l.good : l.keepLearning;

      resultEl.innerHTML = `
        <div class="quiz-score-card">
          <div class="quiz-score-trophy">${percent >= 80 ? "🏆" : percent >= 50 ? "⭐" : "🎯"}</div>
          <h4>${l.score.replace("{score}", score).replace("{total}", questions.length)}</h4>
          <p class="quiz-score-percent">${l.scorePercent.replace("{percent}", percent)}</p>
          <p class="quiz-score-msg">${esc(appreciation)}</p>
        </div>
      `;
      resultEl.style.display = "block";
      optionsEl.style.display = "none";
      questionEl.textContent = "";
      feedbackEl.style.display = "none";
      retryBtn.style.display = "inline-flex";
      retryBtn.focus();
    }

    nextBtn.addEventListener("click", () => {
      if (current < questions.length - 1) {
        current++;
        renderQuestion();
      }
    });

    retryBtn.addEventListener("click", () => {
      current = 0;
      score = 0;
      renderQuestion();
    });

    renderQuestion();
    document.body.append(container);
    document.addEventListener("keydown", onKeyDown);
    container.querySelector(".quiz-dialog").focus();
  }

  window.LearnHubQuiz = { open };
})();
