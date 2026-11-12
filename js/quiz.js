/* Quiz QCM par catégorie & Quiz Global — Learn Hub */
(() => {
  const quizzes = {
    python: {
      "Bases": [
        { q: "Quel affichage produit print(2 + 2) ?", options: ["4", "22", "2+2", "Erreur"], answer: 0, explain: "En Python, 2 + 2 additionne deux entiers pour donner 4." },
        { q: "Quel type a la valeur True en Python ?", options: ["int", "str", "bool", "float"], answer: 2, explain: "True et False sont des valeurs booléennes de type bool." },
        { q: "Comment déclare-t-on une variable x avec la valeur 5 ?", options: ["var x = 5", "x = 5", "let x = 5", "int x = 5"], answer: 1, explain: "En Python, l'affectation directe 'x = 5' suffit." }
      ],
      "Opérateurs": [
        { q: "Quel est le résultat de 9 // 2 en Python ?", options: ["4.5", "4", "1", "5"], answer: 1, explain: "// est l'opérateur de division entière (quotient entier)." },
        { q: "Quel opérateur calcule le reste d'une division (modulo) ?", options: ["/", "//", "%", "**"], answer: 2, explain: "% est l'opérateur modulo, qui renvoie le reste de la division." },
        { q: "Quel opérateur calcule une puissance (ex: 2 au cube) ?", options: ["^", "**", "pow", "//"], answer: 1, explain: "2 ** 3 vaut 8 en Python." }
      ],
      "Conditions": [
        { q: "Quel mot-clé teste une condition alternative après un 'if' ?", options: ["else", "elif", "then", "unless"], answer: 1, explain: "'elif' est la contraction de 'else if' en Python." },
        { q: "Que doit-on obligatoirement respecter après 'if condition:' ?", options: ["Les accolades", "L'indentation (espaces)", "Un point-virgule", "Rien"], answer: 1, explain: "Python délimite ses blocs de code grâce à l'indentation." }
      ],
      "Boucles": [
        { q: "Quelle boucle répète pour chaque élément d'une séquence ?", options: ["while", "for", "if", "def"], answer: 1, explain: "La boucle 'for item in sequence' parcourt chaque élément." },
        { q: "Quel mot-clé interrompt une boucle immédiatement ?", options: ["continue", "break", "return", "pass"], answer: 1, explain: "'break' sort immédiatement de la boucle en cours." },
        { q: "Que produit range(1, 4) ?", options: ["[1, 2, 3, 4]", "1, 2, 3", "0, 1, 2, 3", "1, 4"], answer: 1, explain: "range(1, 4) commence à 1 et s'arrête avant 4 (donc 1, 2, 3)." }
      ],
      "Structures de données": [
        { q: "Quelle structure permet d'associer des clés à des valeurs ?", options: ["Liste", "Tuple", "Dictionnaire", "Ensemble"], answer: 2, explain: "Un dictionnaire (dict) stocke des paires clé: valeur." },
        { q: "Quelle structure ne conserve que des valeurs uniques sans doublon ?", options: ["Liste", "Dictionnaire", "Set (Ensemble)", "Tuple"], answer: 2, explain: "Un set élimine automatiquement les doublons." },
        { q: "Comment ajoute-t-on un élément à la fin d'une liste ?", options: [".push()", ".append()", ".add()", ".insert()"], answer: 1, explain: "En Python, on utilise ma_liste.append(element)." }
      ],
      "Fonctions": [
        { q: "Quel mot-clé définit une fonction en Python ?", options: ["func", "def", "function", "define"], answer: 1, explain: "Le mot-clé 'def' est utilisé pour déclarer une fonction." },
        { q: "Qu'est-ce qu'une fonction lambda en Python ?", options: ["Une fonction nommée", "Une petite fonction anonyme sur une ligne", "Une classe", "Un décorateur"], answer: 1, explain: "lambda arguments: expression crée une fonction anonyme." },
        { q: "Quel mot-clé renvoie la valeur calculée par une fonction ?", options: ["send", "output", "return", "result"], answer: 2, explain: "'return' renvoie un résultat à l'appelant." }
      ],
      "Chaînes de texte": [
        { q: "Quelle méthode découpe une chaîne en liste de mots ?", options: [".join()", ".split()", ".slice()", ".cut()"], answer: 1, explain: "'un deux'.split() donne ['un', 'deux']." },
        { q: "Quelle notation permet d'insérer directement une variable dans une chaîne ?", options: ["f-string: f\"Bonjour {nom}\"", "string.format() uniquement", "$nom", "%s obligatoire"], answer: 0, explain: "Les f-strings préfixées par 'f' évaluent les expressions entre accolades." },
        { q: "Que vaut 'Python'[0:2] ?", options: ["'Py'", "'Pyt'", "'y'", "'Python'"], answer: 0, explain: "Le slicing [0:2] prend les indices 0 et 1 ('Py')." }
      ],
      "Fichiers": [
        { q: "Quel mot-clé ferme automatiquement un fichier après usage ?", options: ["open", "with", "close", "auto"], answer: 1, explain: "'with open(...) as f:' garantit la fermeture automatique du fichier." },
        { q: "Quel mode dans open() écrase le contenu existant d'un fichier ?", options: ["'r'", "'a'", "'w'", "'x'"], answer: 2, explain: "'w' (write) écrase le fichier ou le crée s'il n'existe pas." }
      ],
      "Erreurs": [
        { q: "Quel mot-clé encadre du code susceptible de lever une exception ?", options: ["catch", "try", "except", "error"], answer: 1, explain: "Le bloc 'try' contient le code à tester." },
        { q: "Quel mot-clé déclenche volontairement une exception ?", options: ["throw", "raise", "error", "except"], answer: 1, explain: "En Python, 'raise Exception(\"erreur\")' lève une exception." }
      ],
      "Modules": [
        { q: "Quel module standard fournit sqrt(), pi et les fonctions trigonométriques ?", options: ["os", "sys", "math", "random"], answer: 2, explain: "Le module 'math' regroupe les fonctions mathématiques usuelles." },
        { q: "Quel mot-clé importe un module externe ou standard ?", options: ["include", "import", "require", "using"], answer: 1, explain: "'import' charge le module pour utilisation." }
      ],
      "POO": [
        { q: "Quel mot-clé définit une classe en Python ?", options: ["obj", "class", "type", "struct"], answer: 1, explain: "Le mot-clé 'class NomClasse:' définit une classe." },
        { q: "Quelle méthode spéciale initialise les attributs d'un nouvel objet ?", options: ["__init__", "__main__", "__new__", "__start__"], answer: 0, explain: "def __init__(self, ...) est le constructeur d'une classe Python." },
        { q: "Que représente le premier paramètre 'self' dans une méthode d'instance ?", options: ["La classe parente", "L'instance courante de l'objet", "Une variable globale", "Rien"], answer: 1, explain: "'self' fait référence à l'objet sur lequel la méthode est appelée." }
      ],
      "Outils": [
        { q: "Quel outil en ligne de commande installe des paquets Python (PyPI) ?", options: ["conda", "pip", "npm", "apt"], answer: 1, explain: "'pip install paquet' est le gestionnaire de paquets standard de Python." },
        { q: "À quoi sert un environnement virtuel 'venv' ?", options: ["À accélérer le processeur", "À isoler les dépendances d'un projet", "À compiler en binaire", "À héberger un serveur web"], answer: 1, explain: "venv isole les bibliothèques d'un projet pour éviter les conflits." }
      ],
      "Python pour la sécurité": [
        { q: "Quel module Python permet des échanges réseau de bas niveau (TCP/UDP) ?", options: ["socket", "os", "math", "hashlib"], answer: 0, explain: "Le module 'socket' permet d'ouvrir des connexions réseau TCP/UDP." },
        { q: "Quel module calcule des empreintes cryptographiques (SHA-256, MD5) ?", options: ["random", "hashlib", "secrets", "crypto"], answer: 1, explain: "'hashlib' contient les algorithmes de hachage standard." },
        { q: "Quel module lance des programmes ou commandes système externes ?", options: ["subprocess", "system", "cmd", "exec"], answer: 0, explain: "'subprocess.run()' est recommandé pour exécuter des commandes externes." }
      ],
      "Mini-projets": [
        { q: "Quelle fonction génère un entier aléatoire entre 1 et 10 inclus ?", options: ["math.rand(1, 10)", "random.randint(1, 10)", "random.choice(1, 10)", "random.range(1, 10)"], answer: 1, explain: "random.randint(a, b) inclut les deux bornes a et b." },
        { q: "Comment convertir une saisie utilisateur string en nombre entier ?", options: ["to_int(s)", "int(s)", "parse(s)", "Integer(s)"], answer: 1, explain: "int(\"42\") convertit la chaîne en entier 42." }
      ]
    },
    kali: {
      "Introduction": [
        { q: "Qu'est-ce que Kali Linux ?", options: ["Un antivirus pour Windows", "Une distribution Linux orientée cybersécurité et audits", "Un langage de programmation", "Un routeur matériel"], answer: 1, explain: "Kali Linux est conçue pour les tests d'intrusion et la sécurité informatique." },
        { q: "Pourquoi recommande-t-on d'utiliser Kali dans une Machine Virtuelle (VM) ?", options: ["Pour aller plus vite sur Internet", "Pour isoler les tests et éviter d'endommager son système principal", "C'est obligatoire pour installer Kali", "Pour miner des cryptomonnaies"], answer: 1, explain: "Une VM offre un environnement de bac à sable sécurisé et facilement réinitialisable." },
        { q: "Quelle commande met à jour la liste des paquets disponibles sous Kali ?", options: ["sudo apt update", "sudo apt upgrade", "sudo apt get", "kali-update"], answer: 0, explain: "'apt update' télécharge les listes de paquets à jour depuis les dépôts." }
      ],
      "Commandes Linux de base": [
        { q: "Quelle commande liste les fichiers du dossier actuel ?", options: ["cd", "ls", "pwd", "mkdir"], answer: 1, explain: "'ls' (list) affiche les fichiers et dossiers." },
        { q: "Quelle commande affiche le chemin absolu du dossier courant ?", options: ["dir", "pwd", "path", "where"], answer: 1, explain: "'pwd' signifie Print Working Directory." },
        { q: "Quelle commande change de répertoire de travail ?", options: ["mv", "cd", "cp", "goto"], answer: 1, explain: "'cd' (Change Directory) permet de naviguer dans les dossiers." },
        { q: "Quelle commande crée un nouveau dossier ?", options: ["touch", "mkdir", "newdir", "md"], answer: 1, explain: "'mkdir mon_dossier' crée un dossier." }
      ],
      "Permissions & utilisateurs": [
        { q: "Quelle commande modifie les permissions d'un fichier (rwx) ?", options: ["chown", "chmod", "sudo", "perm"], answer: 1, explain: "'chmod' (Change Mode) modifie les droits de lecture, écriture et exécution." },
        { q: "Quelle commande exécute une commande avec les privilèges administrateur ?", options: ["su", "sudo", "admin", "root"], answer: 1, explain: "'sudo' (SuperUser DO) élève temporairement les privilèges." },
        { q: "Quelle commande affiche le nom de l'utilisateur actuellement connecté ?", options: ["whoami", "id", "user", "logname"], answer: 0, explain: "'whoami' renvoie le nom du compte courant (ex: kali)." }
      ],
      "Gestion des paquets": [
        { q: "Quelle commande installe un nouveau paquet sous Kali ?", options: ["apt get paquet", "sudo apt install paquet", "dpkg paquet", "pacman paquet"], answer: 1, explain: "'sudo apt install <nom>' installe un paquet depuis les dépôts officiels." },
        { q: "Que fait la commande 'sudo apt upgrade' ?", options: ["Met à jour la liste des paquets", "Met à jour tous les paquets déjà installés", "Redémarre l'ordinateur", "Supprime les fichiers temporaires"], answer: 1, explain: "'apt upgrade' installe les nouvelles versions des logiciels installés." }
      ],
      "Réseau": [
        { q: "Quelle commande moderne affiche les interfaces réseau et leurs adresses IP ?", options: ["ping", "ip a", "route", "netstat"], answer: 1, explain: "'ip a' (ou 'ip address') liste les interfaces et adresses IP." },
        { q: "Quelle commande vérifie la connectivité vers un hôte avec des paquets ICMP ?", options: ["curl", "ping", "traceroute", "netstat"], answer: 1, explain: "'ping adresse' teste si une machine répond sur le réseau." },
        { q: "Quelle commande permet d'observer les sauts (routeurs) vers une destination ?", options: ["traceroute", "ping", "nslookup", "route"], answer: 0, explain: "'traceroute' trace le chemin réseau paquet par paquet." }
      ],
      "Recherche & texte": [
        { q: "Quelle commande filtre les lignes de texte correspondant à un motif ?", options: ["find", "grep", "locate", "sed"], answer: 1, explain: "'grep' recherche des motifs (expressions régulières) dans du texte." },
        { q: "Que permet l'opérateur pipe '|' dans le terminal ?", options: ["Arrêter la commande", "Envoyer la sortie d'une commande à l'entrée d'une autre", "Créer un fichier", "Exécuter en tâche de fond"], answer: 1, explain: "'cmd1 | cmd2' redirige le flux de sortie vers cmd2." },
        { q: "Quelle commande affiche la fin d'un fichier (ex: logs) en direct ?", options: ["head", "cat", "tail -f", "nano"], answer: 2, explain: "'tail -f fichier.log' suit l'écriture dans un fichier en direct." }
      ],
      "Reconnaissance": [
        { q: "Quel outil est la référence pour cartographier les ports et services d'un réseau ?", options: ["whois", "nmap", "dig", "traceroute"], answer: 1, explain: "Nmap (Network Mapper) est l'outil phare de scan réseau." },
        { q: "Quel outil permet de consulter les informations administratives d'un nom de domaine ?", options: ["nmap", "whois", "ping", "cat"], answer: 1, explain: "'whois domaine.com' interroge les registres de noms de domaine." }
      ],
      "Analyse de vulnérabilités": [
        { q: "Quel outil en ligne de commande teste les vulnérabilités courantes d'un serveur web ?", options: ["Nikto", "Nmap", "Wireshark", "Ping"], answer: 0, explain: "Nikto effectue des tests ciblés sur les configurations serveurs web." },
        { q: "Quel outil local permet de chercher des exploits connus dans la base Exploit-DB ?", options: ["searchsploit", "findsploit", "exploit-find", "grep-db"], answer: 0, explain: "'searchsploit' interroge hors ligne la base de données Exploit-DB." }
      ],
      "Attaques web (labo)": [
        { q: "Quel proxy interactif permet d'intercepter et modifier les requêtes HTTP/S en labo ?", options: ["Burp Suite", "Wireshark", "Curl", "Nmap"], answer: 0, explain: "Burp Suite est le proxy d'interception de référence pour l'audit web." },
        { q: "Quel outil automatise la détection et l'exploitation des failles SQL Injection ?", options: ["sqlmap", "nikto", "john", "gobuster"], answer: 0, explain: "sqlmap est l'outil spécialisé pour tester les vulnérabilités SQLi." },
        { q: "À quoi sert l'outil Gobuster ou Dirb ?", options: ["Casser des mots de passe", "Découvrir des fichiers et répertoires cachés sur un serveur web", "Scanner les ports Wi-Fi", "Créer un VPN"], answer: 1, explain: "Gobuster énumère les chemins web par force brute avec un dictionnaire." }
      ],
      "Mots de passe": [
        { q: "Quel outil ultra-rapide utilise la puissance des GPU pour tester des hachages ?", options: ["nmap", "hashcat", "ping", "hydra"], answer: 1, explain: "Hashcat tire parti des cartes graphiques pour l'audit de hachages." },
        { q: "Quel outil teste les formulaires d'authentification réseau (SSH, FTP, HTTP) par dictionnaire ?", options: ["Hydra", "John", "Crunch", "Wireshark"], answer: 0, explain: "THC Hydra teste les services d'authentification réseau." }
      ],
      "Wi-Fi (labo / réseau propre)": [
        { q: "Quelle suite d'outils est incontournable pour auditer la sécurité des réseaux 802.11 ?", options: ["Aircrack-ng", "Wireshark", "Nmap", "Metasploit"], answer: 0, explain: "Aircrack-ng est la suite complète pour tester la sécurité Wi-Fi." },
        { q: "Dans quel cadre strict est-il autorisé d'auditer un réseau sans fil ?", options: ["Sur n'importe quel Wi-Fi public", "Uniquement sur son propre réseau ou avec autorisation écrite explicite", "Tant qu'on ne télécharge rien", "Partout le week-end"], answer: 1, explain: "L'audit non autorisé est illégal et pénalement sanctionné." }
      ],
      "Analyse réseau": [
        { q: "Quel logiciel graphique capture et analyse en profondeur les paquets réseau ?", options: ["Wireshark", "Nmap", "Burp Suite", "Netcat"], answer: 0, explain: "Wireshark est l'analyseur de protocoles réseau le plus utilisé au monde." },
        { q: "Quel outil en ligne de commande équivaut à un renifleur de paquets léger sous Linux ?", options: ["tcpdump", "ping", "traceroute", "netstat"], answer: 0, explain: "tcpdump capture et filtre les paquets directement dans le terminal." }
      ],
      "Exploitation": [
        { q: "Quel framework puissant permet de tester la validation d'exploits en environnement contrôlé ?", options: ["Metasploit (msfconsole)", "Wireshark", "John the Ripper", "Autopsy"], answer: 0, explain: "Metasploit Framework est le standard pour tester des failles en laboratoire." },
        { q: "Quel utilitaire de la suite Metasploit génère des payloads de test personnalisés ?", options: ["msfvenom", "msfupdate", "msfscan", "msfcli"], answer: 0, explain: "msfvenom combine génération de charges utiles et encodage." }
      ],
      "Forensic": [
        { q: "À quoi sert l'investigation numérique (Digital Forensics) ?", options: ["Attaquer des cibles distantes", "Analyser des preuves numériques et traces après un incident", "Chiffrer un disque dur", "Installer un OS"], answer: 1, explain: "Le Forensic analyse les disques, mémoires et logs pour comprendre une intrusion." },
        { q: "Quel outil extrait les fichiers intégrés ou cachés dans une image binaire ou firmware ?", options: ["binwalk", "grep", "cat", "tar"], answer: 0, explain: "Binwalk analyse et décompresse les architectures de firmwares et images." }
      ],
      "Anonymat & sécurité": [
        { q: "Quel outil permet de router les requêtes d'une commande via une chaîne de serveurs mandataires (proxies) ?", options: ["proxychains", "curl", "openvpn", "ssh"], answer: 0, explain: "proxychains force les connexions TCP à transiter par des proxies SOCKS/HTTP." },
        { q: "Quel principe protège le trafic dans le réseau Tor ?", options: ["Le routage en oignon (chiffrement multicouche)", "Un mot de passe unique", "Un proxy centralisé", "Un pare-feu"], answer: 0, explain: "Tor chiffre les paquets en couches successives (comme un oignon)." }
      ],
      "Labs pour s'entraîner": [
        { q: "Quelle plateforme propose des parcours guidés pour apprendre la cybersécurité pas à pas ?", options: ["TryHackMe", "Wikipedia", "StackOverflow", "Reddit"], answer: 0, explain: "TryHackMe offre des machines virtuelles et des salles d'apprentissage guidées." },
        { q: "Quelle application web volontairement vulnérable est idéale pour s'entraîner en local ?", options: ["DVWA (Damn Vulnerable Web App)", "Apache2", "Nginx", "WordPress"], answer: 0, explain: "DVWA permet de tester légalement XSS, SQLi, CSRF sur sa propre machine." }
      ]
    },
    html: {
      "Structure d'une page": [
        { q: "Quelle déclaration indique au navigateur qu'il s'agit de HTML5 ?", options: ["<html>", "<!doctype html>", "<head>", "<?xml>"], answer: 1, explain: "<!doctype html> en tête de document active le rendu standard HTML5." },
        { q: "Quelle balise contient les métadonnées (titre, encodage, styles) non visibles directement ?", options: ["<body>", "<head>", "<meta>", "<title>"], answer: 1, explain: "<head> contient la configuration et les liens vers les ressources." }
      ],
      "Texte et structure": [
        { q: "Quelle balise définit un paragraphe de texte ?", options: ["<p>", "<div>", "<span>", "<text>"], answer: 0, explain: "<p> représente un paragraphe sémantique." },
        { q: "Quelle balise crée une liste à puces non ordonnée ?", options: ["<ol>", "<ul>", "<li>", "<list>"], answer: 1, explain: "<ul> (Unordered List) contient des éléments <li>." }
      ],
      "Liens et médias": [
        { q: "Quelle balise crée un lien hypertexte vers une autre page ?", options: ["<link>", "<a href=\"...\">", "<url>", "<href>"], answer: 1, explain: "<a href=\"...\"> (Anchor) est la balise de lien hypertexte." },
        { q: "Quel attribut est indispensable sur <img> pour l'accessibilité ?", options: ["title", "alt", "src", "desc"], answer: 1, explain: "'alt' fournit une description textuelle aux lecteurs d'écran." }
      ],
      "HTML sémantique": [
        { q: "Quelle balise regroupe les liens de navigation principaux du site ?", options: ["<header>", "<nav>", "<menu>", "<links>"], answer: 1, explain: "<nav> indique aux moteurs et lecteurs la zone de navigation." },
        { q: "Quelle balise contient le contenu principal et unique de la page ?", options: ["<section>", "<main>", "<article>", "<body>"], answer: 1, explain: "<main> doit être unique par document et contenir le sujet central." }
      ],
      "Formulaires": [
        { q: "Quelle balise associe une légende accessible à un champ de saisie ?", options: ["<p>", "<label for=\"...\">", "<legend>", "<span>"], answer: 1, explain: "<label for=\"id\"> lie le libellé au champ correspondant." },
        { q: "Quel type d'input masque les caractères saisis ?", options: ["type=\"secret\"", "type=\"password\"", "type=\"hidden\"", "type=\"protect\""], answer: 1, explain: "<input type=\"password\"> masque visuellement la saisie." }
      ]
    },
    css: {
      "Premiers styles": [
        { q: "Quel symbole préfixe un sélecteur de classe en CSS ?", options: ["#", ".", "*", "&"], answer: 1, explain: ".nom-classe cible tous les éléments portant cette classe." },
        { q: "Quel symbole préfixe un sélecteur d'identifiant unique (ID) ?", options: ["#", ".", "@", "$"], answer: 0, explain: "#identifiant cible l'élément unique ayant cet ID." }
      ],
      "Texte et apparence": [
        { q: "Quelle propriété contrôle la taille de la police de texte ?", options: ["text-size", "font-size", "size", "font-weight"], answer: 1, explain: "font-size (ex: 16px, 1.2rem) définit la taille de typographie." },
        { q: "Quelle est la différence entre margin et padding ?", options: ["Margin est l'espace intérieur, padding l'espace extérieur", "Padding est l'espace intérieur, margin l'espace extérieur", "Il n'y en a aucune", "Margin ne fonctionne que sur le texte"], answer: 1, explain: "Padding se trouve à l'intérieur de la bordure, margin autour à l'extérieur." }
      ],
      "Disposition": [
        { q: "Quelle valeur de display organise des éléments enfants en ligne ou colonne flexible ?", options: ["block", "flex", "grid", "inline"], answer: 1, explain: "display: flex active le modèle Flexbox unidimensionnel." },
        { q: "Quelle valeur de position fixe un élément par rapport à la fenêtre du navigateur ?", options: ["absolute", "relative", "fixed", "sticky"], answer: 2, explain: "position: fixed maintient l'élément à l'écran même au défilement." }
      ],
      "Responsive et accessibilité": [
        { q: "Quelle règle CSS applique des styles conditionnels selon la largeur d'écran ?", options: ["@responsive", "@media", "@screen", "@query"], answer: 1, explain: "@media (max-width: 768px) { ... } gère l'affichage responsive." },
        { q: "Quelle pseudo-classe stylise le contour quand l'utilisateur navigue au clavier ?", options: [":hover", ":active", ":focus-visible", ":visited"], answer: 2, explain: ":focus-visible permet un contour d'accessibilité propre sans gêner les clics." }
      ]
    },
    javascript: {
      "Bases du langage": [
        { q: "Quel mot-clé déclare une variable qui ne sera pas réassignée ?", options: ["let", "var", "const", "fixed"], answer: 2, explain: "'const' empêche la réassignation d'une variable." },
        { q: "Quelle instruction affiche un message dans la console de développement ?", options: ["print()", "console.log()", "echo()", "System.out.println()"], answer: 1, explain: "console.log(...) est la méthode universelle d'affichage JS." }
      ],
      "Boucles et fonctions": [
        { q: "Quelle boucle moderne parcourt directement les valeurs d'un tableau itérable ?", options: ["for...in", "for...of", "while", "loop"], answer: 1, explain: "'for (const item of array)' lit chaque valeur directement." },
        { q: "Quelle est la syntaxe d'une fonction fléchée compacte ?", options: ["(x) => x * 2", "function(x) { x * 2 }", "def(x) => x * 2", "arrow x: x*2"], answer: 0, explain: "(x) => x * 2 est une fonction fléchée avec retour implicite." }
      ],
      "Tableaux et objets": [
        { q: "Quelle méthode transforme chaque élément d'un tableau pour produire un nouveau tableau ?", options: ["filter()", "map()", "forEach()", "reduce()"], answer: 1, explain: "arr.map(fn) renvoie un nouveau tableau transformé de même longueur." },
        { q: "Quelle méthode ne garde que les éléments validant une condition booléenne ?", options: ["map()", "filter()", "find()", "slice()"], answer: 1, explain: "arr.filter(fn) extrait un sous-ensemble d'éléments." }
      ],
      "HTML et DOM": [
        { q: "Quelle méthode sélectionne le premier élément correspondant à un sélecteur CSS ?", options: ["document.select()", "document.querySelector()", "document.getElement()", "document.find()"], answer: 1, explain: "querySelector('selecteur') utilise les mêmes sélecteurs que le CSS." },
        { q: "Quelle méthode écoute les clics de l'utilisateur sur un bouton ?", options: ["btn.onclick()", "btn.addEventListener('click', fn)", "btn.listen('click')", "btn.attachEvent()"], answer: 1, explain: "addEventListener('click', handler) est la méthode standard et modulaire." }
      ],
      "Asynchrone et stockage": [
        { q: "Quelle API du navigateur permet de sauvegarder des données simples entre deux visites ?", options: ["sessionMemory", "localStorage", "cookieRAM", "tempStorage"], answer: 1, explain: "localStorage persiste les données même après fermeture du navigateur." },
        { q: "Comment convertir un objet JavaScript en chaîne de texte JSON ?", options: ["JSON.parse(obj)", "JSON.stringify(obj)", "obj.toJSON()", "String(obj)"], answer: 1, explain: "JSON.stringify() sérialise en texte JSON." }
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
        question: "سؤال",
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

    const modalTitle = category ? `${l.title} · ${category}` : l.generalTitle;

    const container = document.createElement("div");
    container.className = "quiz-modal";
    container.innerHTML = `
      <div class="quiz-backdrop">
        <section class="quiz-dialog" role="dialog" aria-modal="true" aria-labelledby="quiz-title" tabindex="-1">
          <div class="quiz-header">
            <div>
              <span class="quiz-badge">QCM Interactif</span>
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
            <h4 class="quiz-question"></h4>
            <div class="quiz-options" role="radiogroup"></div>
            <div class="quiz-feedback" style="display:none">
              <div class="quiz-feedback-title"></div>
              <div class="quiz-feedback-text"></div>
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
      if (event.key === "Escape") {
        event.stopPropagation();
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
      stepLabel.textContent = `Question ${current + 1} / ${questions.length}`;
      scoreBadge.textContent = `Score : ${score}`;

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
        scoreBadge.textContent = `Score : ${score}`;
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
