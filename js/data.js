/* Les fiches de cours sont déclarées ici pour faciliter l'ajout de notions. */
const makeItem = (nom, niveau, utilite, syntaxe, exemple, attention = "Adapte cet exemple à ton propre environnement et vérifie le résultat.") => ({ nom, niveau, utilite, syntaxe, exemple, attention });
const group = (categorie, items) => ({ categorie, items });

const data = {
  python: [
    group("Bases", [
      makeItem("print()", "Débutant", "Affiche une valeur ou un message dans la console.", 'print("Bonjour !")', "Affiche le texte Bonjour !."),
      makeItem("input()", "Débutant", "Demande une saisie à la personne qui utilise le programme et renvoie du texte.", 'nom = input("Ton nom : ")\nprint(nom)', "La saisie est stockée dans nom, puis affichée.", "Pour obtenir un nombre, convertis la saisie avec int() ou float()."),
      makeItem("Commentaires #", "Débutant", "Ajoute une note pour expliquer le code. Python ignore le texte après # sur la ligne.", "# Ceci est un commentaire\nprint(2 + 2)", "La première ligne documente le programme."),
      makeItem("Variables", "Débutant", "Associe un nom à une valeur que le programme peut réutiliser.", 'prenom = "Lina"\nage = 18', "Les noms prenom et age désignent deux valeurs."),
      makeItem("int", "Débutant", "Représente un nombre entier, positif ou négatif.", "quantite = 4", "La variable quantite contient un entier."),
      makeItem("float", "Débutant", "Représente un nombre avec une partie décimale.", "temperature = 21.5", "Le point sépare la partie entière et les décimales."),
      makeItem("str", "Débutant", "Représente du texte, écrit entre guillemets.", 'langage = "Python"', "La variable contient une chaîne de caractères."),
      makeItem("bool", "Débutant", "Représente une valeur vraie ou fausse : True ou False.", "est_pret = True", "Cette valeur peut servir dans une condition.")
    ]),
    group("Opérateurs", [
      makeItem("+ - * /", "Débutant", "Effectue une addition, soustraction, multiplication ou division.", "total = 8 + 2\nmoitie = total / 2", "total vaut 10 et moitie vaut 5.0."),
      makeItem("// % **", "Débutant", "Calcule le quotient entier, le reste d'une division ou une puissance.", "quotient = 9 // 2\nreste = 9 % 2\ncarre = 3 ** 2", "Le quotient vaut 4, le reste 1 et le carré 9."),
      makeItem("Comparaisons", "Débutant", "Compare deux valeurs avec ==, !=, <, >, <= ou >= et renvoie un booléen.", "age = 20\nprint(age >= 18)", "La comparaison affiche True."),
      makeItem("Logique and or not", "Débutant", "Combine ou inverse des conditions logiques.", "age = 20\na_le_permis = True\nprint(age >= 18 and a_le_permis)", "and est vrai si les deux conditions le sont.")
    ]),
    group("Conditions", [
      makeItem("if", "Débutant", "Exécute un bloc seulement si une condition est vraie.", "if temperature > 25:\n    print(\"Il fait chaud\")", "Le message apparaît si temperature dépasse 25.", "Le bloc conditionnel doit être indenté."),
      makeItem("elif", "Débutant", "Teste une autre condition lorsque les conditions précédentes sont fausses.", "if note >= 16:\n    mention = \"très bien\"\nelif note >= 10:\n    mention = \"validé\"", "Python vérifie les conditions dans l'ordre."),
      makeItem("else", "Débutant", "Définit le cas qui reste quand aucun if ou elif n'est vrai.", "if actif:\n    print(\"En ligne\")\nelse:\n    print(\"Hors ligne\")", "Un seul des deux messages est affiché.")
    ]),
    group("Boucles", [
      makeItem("for", "Débutant", "Répète une action pour chaque élément d'une séquence.", "for fruit in [\"pomme\", \"poire\"]:\n    print(fruit)", "Affiche chaque fruit à tour de rôle.", "Garde une indentation cohérente dans le bloc."),
      makeItem("while", "Débutant", "Répète un bloc tant qu'une condition reste vraie.", "compteur = 0\nwhile compteur < 3:\n    print(compteur)\n    compteur += 1", "Affiche 0, 1 et 2 puis s'arrête.", "Fais évoluer la condition pour éviter une boucle infinie."),
      makeItem("break", "Intermédiaire", "Interrompt immédiatement la boucle la plus proche.", "for nombre in range(10):\n    if nombre == 3:\n        break", "La boucle s'arrête quand nombre vaut 3."),
      makeItem("continue", "Intermédiaire", "Passe directement au tour suivant d'une boucle.", "for nombre in range(4):\n    if nombre == 2:\n        continue\n    print(nombre)", "Le nombre 2 n'est pas affiché."),
      makeItem("range()", "Débutant", "Produit une suite d'entiers, souvent utilisée avec for.", "for i in range(1, 4):\n    print(i)", "Affiche 1, 2 et 3 ; la borne finale est exclue.")
    ]),
    group("Structures de données", [
      makeItem("Liste", "Débutant", "Stocke une suite ordonnée et modifiable de valeurs.", 'fruits = ["pomme", "poire"]\nfruits.append("kiwi")', "append ajoute un élément à la fin."),
      makeItem("Tuple", "Débutant", "Stocke une suite ordonnée que l'on ne modifie généralement pas.", 'coordonnees = (48.8, 2.3)', "Les parenthèses regroupent les deux coordonnées."),
      makeItem("Dictionnaire", "Intermédiaire", "Associe des clés à des valeurs pour retrouver une information par son nom.", 'profil = {"nom": "Lina", "age": 18}\nprint(profil["nom"])', "La clé nom permet de lire Lina.", "Une clé demandée doit exister ; get() permet une valeur par défaut."),
      makeItem("Ensemble set", "Intermédiaire", "Stocke des valeurs uniques, pratique pour supprimer des doublons.", "couleurs = set([\"bleu\", \"vert\", \"bleu\"])\nprint(couleurs)", "L'ensemble ne garde qu'une occurrence de bleu.")
    ]),
    group("Fonctions", [
      makeItem("def", "Débutant", "Définit une fonction, un bloc réutilisable qui porte un nom.", "def dire_bonjour():\n    print(\"Bonjour !\")\ndire_bonjour()", "L'appel exécute le corps de la fonction."),
      makeItem("Paramètres", "Débutant", "Transmet des informations à une fonction au moment de son appel.", "def saluer(prenom):\n    print(f\"Bonjour {prenom}\")\nsaluer(\"Lina\")", "prenom reçoit la valeur Lina."),
      makeItem("return", "Débutant", "Renvoie un résultat depuis une fonction à l'endroit où elle est appelée.", "def doubler(nombre):\n    return nombre * 2\nresultat = doubler(4)", "resultat reçoit 8."),
      makeItem("lambda", "Intermédiaire", "Crée une petite fonction anonyme composée d'une expression.", "triple = lambda nombre: nombre * 3\nprint(triple(4))", "Affiche 12.", "Pour une logique plus longue, préfère def avec un nom explicite.")
    ]),
    group("Chaînes de texte", [
      makeItem("f-strings", "Débutant", "Insère des valeurs dans du texte de façon lisible.", 'nom = "Mina"\nprint(f"Bonjour {nom} !")', "Affiche Bonjour Mina !."),
      makeItem(".split()", "Débutant", "Découpe une chaîne en une liste de morceaux selon un séparateur.", 'mots = "un deux trois".split()', "mots contient trois chaînes."),
      makeItem(".join()", "Intermédiaire", "Assemble les éléments d'une séquence de texte avec un séparateur.", 'phrase = " ".join(["bonjour", "à", "tous"])', "Les mots sont reliés par des espaces."),
      makeItem(".replace()", "Débutant", "Crée une chaîne où les occurrences d'un texte sont remplacées.", 'nouveau = "salut Lina".replace("Lina", "Noé")', "La chaîne obtenue contient Noé."),
      makeItem("Slicing", "Intermédiaire", "Extrait une partie d'une séquence avec la notation début:fin.", 'mot = "Python"\nprint(mot[0:3])', "Affiche Pyt ; l'indice de fin est exclu.")
    ]),
    group("Fichiers", [
      makeItem("open()", "Intermédiaire", "Ouvre un fichier pour le lire ou l'écrire.", 'fichier = open("notes.txt", "r", encoding="utf-8")', "Le mode r ouvre le fichier en lecture.", "Ferme le fichier après usage, idéalement avec with."),
      makeItem("Lire un fichier", "Intermédiaire", "Récupère le contenu d'un fichier texte.", 'with open("notes.txt", encoding="utf-8") as f:\n    contenu = f.read()', "read() renvoie le contenu complet."),
      makeItem("Écrire un fichier", "Intermédiaire", "Enregistre du texte dans un fichier.", 'with open("notes.txt", "w", encoding="utf-8") as f:\n    f.write("Bonjour")', "Le mode w écrit le texte et crée le fichier si besoin.", "Le mode w remplace le contenu existant ; le mode a ajoute à la fin."),
      makeItem("with", "Intermédiaire", "Gère une ressource et la ferme automatiquement à la fin du bloc.", 'with open("notes.txt", encoding="utf-8") as fichier:\n    print(fichier.read())', "Le fichier est fermé même si une erreur survient.")
    ]),
    group("Erreurs", [
      makeItem("try", "Intermédiaire", "Encadre du code qui peut provoquer une erreur pour la traiter proprement.", "try:\n    nombre = int(texte)\nexcept ValueError:\n    print(\"Saisie invalide\")", "La conversion est tentée avant de traiter une saisie incorrecte."),
      makeItem("except", "Intermédiaire", "Indique quoi faire lorsqu'un type d'erreur précis survient.", "try:\n    resultat = 10 / diviseur\nexcept ZeroDivisionError:\n    resultat = 0", "Le cas du diviseur nul est pris en charge."),
      makeItem("finally", "Intermédiaire", "Exécute un bloc de nettoyage qu'une erreur soit survenue ou non.", "try:\n    print(\"Traitement\")\nfinally:\n    print(\"Fin\")", "Le bloc finally est exécuté dans les deux cas."),
      makeItem("raise", "Intermédiaire", "Déclenche volontairement une exception pour signaler une situation invalide.", 'if age < 0:\n    raise ValueError("L’âge doit être positif")', "Une valeur hors limites produit une erreur explicite.")
    ]),
    group("Modules", [
      makeItem("import", "Débutant", "Rend disponibles les fonctions et valeurs d'un module.", "import math\nprint(math.sqrt(16))", "On appelle sqrt depuis math."),
      makeItem("os", "Intermédiaire", "Fournit des outils pour interagir avec le système et les chemins de fichiers.", 'import os\nprint(os.getcwd())', "Affiche le dossier de travail courant.", "Vérifie les chemins et permissions avant toute opération sur les fichiers."),
      makeItem("sys", "Intermédiaire", "Donne accès à des informations sur l'interpréteur et ses arguments.", "import sys\nprint(sys.version)", "Affiche la version de Python."),
      makeItem("math", "Débutant", "Propose des fonctions mathématiques comme sqrt et pi.", "import math\nprint(math.sqrt(25))", "Affiche 5.0."),
      makeItem("random", "Débutant", "Génère des choix ou nombres pseudo-aléatoires.", "import random\nprint(random.randint(1, 6))", "Simule le résultat d'un dé à six faces."),
      makeItem("datetime", "Intermédiaire", "Crée et manipule des dates et des heures.", "from datetime import date\nprint(date.today())", "Affiche la date du jour.")
    ]),
    group("POO", [
      makeItem("Classe", "Intermédiaire", "Décrit un type d'objet avec des données et des comportements associés.", "class Chien:\n    pass", "Cette classe définit un nouveau type nommé Chien."),
      makeItem("Objet", "Intermédiaire", "Est une instance concrète créée à partir d'une classe.", "class Chien:\n    pass\n\ncompagnon = Chien()", "compagnon est un objet de la classe Chien."),
      makeItem("__init__", "Intermédiaire", "Initialise les attributs d'un nouvel objet lors de sa création.", "class Compte:\n    def __init__(self, titulaire):\n        self.titulaire = titulaire", "Le nom du titulaire est stocké sur l'instance."),
      makeItem("Héritage", "Avancé", "Permet à une classe de reprendre et spécialiser le comportement d'une autre.", "class Animal:\n    def parler(self):\n        return \"…\"\n\nclass Chat(Animal):\n    pass", "Chat hérite de la méthode parler.")
    ]),
    group("Outils", [
      makeItem("pip", "Débutant", "Installe et gère des paquets Python depuis le terminal.", "python -m pip install requests", "Installe le paquet requests pour l'interpréteur ciblé.", "Installe seulement les paquets de sources fiables, idéalement dans un environnement virtuel."),
      makeItem("Environnement virtuel venv", "Intermédiaire", "Isole les dépendances d'un projet des autres projets Python.", "python -m venv .venv\n.venv\\Scripts\\activate", "Crée puis active un environnement sur Windows.", "La commande d'activation dépend du système d'exploitation."),
      makeItem("requests", "Intermédiaire", "Simplifie les requêtes HTTP vers des services web.", 'import requests\nreponse = requests.get("https://example.com", timeout=5)\nprint(reponse.status_code)', "La requête récupère le statut HTTP du site d'exemple.", "Définis un délai d'attente et ne transmets pas de secrets à un service non fiable.")
    ]),
    group("Python pour la sécurité", [
      makeItem("socket", "Avancé", "Permet des échanges réseau de bas niveau entre programmes.", 'import socket\nprint(socket.gethostname())', "Affiche le nom de la machine locale.", "Teste uniquement sur tes propres systèmes ou dans un laboratoire autorisé."),
      makeItem("subprocess", "Avancé", "Lance et contrôle un programme externe depuis Python.", 'import subprocess\nresultat = subprocess.run(["python", "--version"], capture_output=True, text=True)\nprint(resultat.stdout or resultat.stderr)', "Lance une commande fixe et récupère sa sortie.", "Évite shell=True avec des entrées utilisateur pour prévenir l'injection de commandes."),
      makeItem("Scan de ports en labo", "Avancé", "Montre, à des fins pédagogiques, comment vérifier un port précis sur ta propre machine.", 'import socket\nwith socket.socket() as s:\n    s.settimeout(1)\n    resultat = s.connect_ex(("127.0.0.1", 8000))\n    print("Ouvert" if resultat == 0 else "Fermé")', "Vérifie uniquement le port 8000 de la machine locale.", "Ne scanne que localhost, ton laboratoire ou une cible expressément autorisée."),
      makeItem("hashlib", "Intermédiaire", "Calcule des empreintes cryptographiques pour comparer des données.", 'import hashlib\nempreinte = hashlib.sha256(b"exemple").hexdigest()\nprint(empreinte)', "Produit l'empreinte SHA-256 du texte exemple.", "Un hash simple ne convient pas au stockage des mots de passe ; utilise un algorithme spécialisé comme Argon2.")
    ]),
    group("Mini-projets", [
      makeItem("Calculatrice", "Débutant", "Met en pratique les entrées, conversions et opérations arithmétiques.", 'a = float(input("Premier nombre : "))\nb = float(input("Deuxième nombre : "))\nprint(a + b)', "Cette première version additionne deux nombres saisis."),
      makeItem("Devine le nombre", "Débutant", "Fait pratiquer les boucles, les conditions et le module random.", 'import random\ncible = random.randint(1, 10)\nchoix = int(input("Devine : "))\nprint(choix == cible)', "Compare une proposition à un nombre secret."),
      makeItem("Générateur de mot de passe", "Intermédiaire", "Fait découvrir la génération aléatoire et le traitement de chaînes.", 'import secrets\nimport string\nalphabet = string.ascii_letters + string.digits\nmot_de_passe = "".join(secrets.choice(alphabet) for _ in range(16))', "Crée un mot de passe aléatoire de 16 caractères.", "Pour un usage réel, utilise un gestionnaire de mots de passe et protège les secrets générés."),
      makeItem("To-do list", "Intermédiaire", "Permet de pratiquer listes, fonctions et persistance dans un fichier.", 'taches = []\ntaches.append("Réviser Python")\nprint(taches)', "Commence par ajouter et afficher des tâches.")
    ])
  ],
  kali: [
    group("Introduction", [
      makeItem("Kali Linux", "Débutant", "Est une distribution Linux conçue pour l'audit de sécurité et l'apprentissage en cybersécurité.", "Kali Linux dans une machine virtuelle isolée", "Une machine virtuelle permet d'expérimenter sans remplacer le système principal.", "Télécharge Kali depuis son site officiel et respecte les règles de ton laboratoire."),
      makeItem("Installation en machine virtuelle", "Débutant", "Fait tourner Kali dans une fenêtre isolée avec VirtualBox ou VMware.", "Nouvelle VM → image ISO Kali → réseau NAT", "Le mode NAT limite l'exposition directe du système invité.", "Fais un instantané avant les manipulations et évite le mode pont sur un réseau tiers."),
      makeItem("Dual boot", "Avancé", "Permet de choisir entre Kali et un autre système au démarrage.", "Sauvegarde → partitionnement → installation du chargeur", "Une installation séparée demande de préparer les partitions.", "Une erreur de partitionnement peut effacer des données ; sauvegarde avant toute installation."),
      makeItem("apt update", "Débutant", "Actualise la liste locale des paquets disponibles dans les dépôts configurés.", "sudo apt update", "La commande récupère les dernières métadonnées des dépôts."),
      makeItem("Mise à jour Kali", "Débutant", "Installe les mises à jour des paquets déjà présents.", "sudo apt upgrade", "Le gestionnaire présente les changements avant de les appliquer.", "Lis la liste des changements et garde une sauvegarde de tes données importantes.")
    ]),
    group("Commandes Linux de base", [
      makeItem("ls", "Débutant", "Liste les fichiers et dossiers du répertoire courant.", "ls -la", "-la affiche aussi les fichiers cachés et les détails."),
      makeItem("cd", "Débutant", "Change le répertoire de travail du terminal.", "cd Documents", "Le terminal se place dans Documents."),
      makeItem("pwd", "Débutant", "Affiche le chemin du répertoire de travail actuel.", "pwd", "Utile pour vérifier où tu te trouves."),
      makeItem("mkdir", "Débutant", "Crée un nouveau répertoire.", "mkdir exercices", "Crée un dossier nommé exercices."),
      makeItem("rm", "Intermédiaire", "Supprime un fichier ou, avec des options, des répertoires.", "rm ancien-fichier.txt", "Supprime le fichier indiqué.", "La suppression peut être définitive. Vérifie soigneusement le chemin avant la commande."),
      makeItem("cp", "Débutant", "Copie des fichiers ou des répertoires.", "cp notes.txt copie-notes.txt", "Crée une copie du fichier."),
      makeItem("mv", "Débutant", "Déplace ou renomme un fichier.", "mv brouillon.txt notes.txt", "Renomme le fichier brouillon.txt."),
      makeItem("cat", "Débutant", "Affiche le contenu d'un petit fichier texte.", "cat notes.txt", "Le contenu s'affiche dans le terminal."),
      makeItem("nano", "Débutant", "Ouvre un éditeur de texte simple dans le terminal.", "nano notes.txt", "Ctrl+O enregistre et Ctrl+X ferme nano."),
      makeItem("touch", "Débutant", "Crée un fichier vide ou actualise sa date de modification.", "touch notes.txt", "Crée notes.txt s'il n'existe pas."),
      makeItem("man", "Débutant", "Affiche le manuel d'une commande Linux.", "man ls", "La page de manuel décrit les options de ls."),
      makeItem("clear", "Débutant", "Nettoie l'affichage visible du terminal.", "clear", "Efface l'affichage, sans supprimer l'historique des commandes.")
    ]),
    group("Permissions & utilisateurs", [
      makeItem("chmod", "Intermédiaire", "Modifie les permissions de lecture, écriture et exécution d'un fichier.", "chmod u+x script.sh", "Ajoute le droit d'exécution au propriétaire du fichier.", "Évite les permissions trop larges comme 777."),
      makeItem("chown", "Avancé", "Change le propriétaire ou le groupe associé à un fichier.", "sudo chown utilisateur:utilisateur fichier.txt", "Attribue le fichier à l'utilisateur indiqué.", "Vérifie le chemin et le propriétaire souhaité avant d'utiliser sudo."),
      makeItem("sudo", "Intermédiaire", "Exécute une commande avec les privilèges d'administration après autorisation.", "sudo apt update", "La commande met à jour les index de paquets.", "N'accorde ces privilèges qu'aux commandes comprises et nécessaires."),
      makeItem("su", "Intermédiaire", "Ouvre une session sous un autre compte utilisateur.", "su - utilisateur", "Ouvre un shell de connexion pour ce compte."),
      makeItem("whoami", "Débutant", "Affiche le nom du compte actuellement utilisé.", "whoami", "Permet de vérifier son identité dans le terminal."),
      makeItem("adduser", "Intermédiaire", "Crée un compte utilisateur local de façon interactive.", "sudo adduser etudiant", "Le système demande un mot de passe et quelques détails.", "À utiliser seulement sur une machine que tu administres.")
    ]),
    group("Gestion des paquets", [
      makeItem("apt update", "Débutant", "Rafraîchit la liste des paquets disponibles.", "sudo apt update", "Ne met pas à niveau les paquets installés à lui seul."),
      makeItem("apt upgrade", "Débutant", "Met à niveau les paquets installés selon les dépôts configurés.", "sudo apt upgrade", "Lis la confirmation avant d'appliquer les mises à jour."),
      makeItem("apt install", "Débutant", "Installe un paquet depuis les dépôts configurés.", "sudo apt install nom-du-paquet", "Remplace le nom d'exemple par un paquet connu et nécessaire.", "Vérifie l'origine du paquet et la liste des dépendances."),
      makeItem("dpkg", "Intermédiaire", "Gère les paquets Debian locaux au niveau inférieur à apt.", "dpkg -l", "Liste les paquets installés.", "Pour résoudre les dépendances, apt est généralement plus adapté.")
    ]),
    group("Réseau", [
      makeItem("ip a", "Débutant", "Affiche les interfaces et adresses réseau de la machine.", "ip a", "Permet de repérer les interfaces locales."),
      makeItem("ifconfig", "Débutant", "Affiche ou configure des interfaces réseau, sur les systèmes où l'outil est installé.", "ifconfig", "ip a est la commande moderne souvent disponible."),
      makeItem("ping", "Débutant", "Teste la connectivité en envoyant des paquets ICMP à une destination.", "ping -c 4 127.0.0.1", "Teste la pile réseau locale quatre fois.", "Limite le test à une machine que tu possèdes ou es autorisé à vérifier."),
      makeItem("netstat", "Intermédiaire", "Affiche des informations sur les connexions et statistiques réseau.", "netstat -tuln", "Liste les ports TCP et UDP en écoute."),
      makeItem("ss", "Intermédiaire", "Inspecte les sockets et connexions réseau sur Linux.", "ss -tuln", "Affiche les ports TCP et UDP en écoute."),
      makeItem("traceroute", "Intermédiaire", "Montre les étapes réseau estimées vers une destination.", "traceroute 127.0.0.1", "Un test local évite de sonder un hôte externe."),
      makeItem("nslookup", "Débutant", "Interroge le DNS pour retrouver des informations sur un nom de domaine.", "nslookup example.com", "Affiche les réponses DNS disponibles."),
      makeItem("dig", "Intermédiaire", "Interroge précisément le DNS et affiche les enregistrements retournés.", "dig example.com", "Montre la réponse DNS pour le domaine d'exemple.")
    ]),
    group("Recherche & texte", [
      makeItem("grep", "Débutant", "Recherche un motif dans des lignes de texte.", 'grep "erreur" journal.txt', "Affiche les lignes contenant le mot erreur."),
      makeItem("find", "Intermédiaire", "Recherche des fichiers selon leur emplacement et des critères.", "find . -name \"*.txt\"", "Recherche les fichiers texte dans le dossier courant."),
      makeItem("locate", "Débutant", "Retrouve rapidement des chemins à partir d'une base indexée.", "locate notes.txt", "Les résultats dépendent de la date du dernier index."),
      makeItem("awk", "Avancé", "Traite du texte structuré champ par champ.", "awk '{print $1}' fichier.txt", "Affiche le premier champ de chaque ligne."),
      makeItem("sed", "Avancé", "Transforme ou filtre du texte en flux.", "sed 's/ancien/nouveau/' fichier.txt", "Affiche les lignes avec la première occurrence remplacée."),
      makeItem("head", "Débutant", "Affiche le début d'un fichier texte.", "head -n 5 journal.txt", "Affiche les cinq premières lignes."),
      makeItem("tail", "Débutant", "Affiche la fin d'un fichier texte, utile pour suivre un journal.", "tail -n 5 journal.txt", "Affiche les cinq dernières lignes."),
      makeItem("Pipes |", "Intermédiaire", "Transmet la sortie d'une commande à l'entrée d'une autre.", "cat journal.txt | grep erreur", "La recherche s'applique au contenu affiché par cat.")
    ]),
    group("Reconnaissance", [
      makeItem("nmap", "Intermédiaire", "Cartographie des ports et services réseau pour un audit autorisé.", "nmap -sV 127.0.0.1", "Vérifie les services exposés par la machine locale.", "À utiliser uniquement sur une machine ou un laboratoire autorisé ; un scan peut générer du trafic détectable."),
      makeItem("whois", "Débutant", "Consulte des informations publiques d'enregistrement d'un domaine.", "whois example.com", "Affiche les données disponibles pour le domaine d'exemple.", "Les données peuvent être masquées ou incomplètes ; respecte les règles locales."),
      makeItem("theHarvester", "Intermédiaire", "Rassemble des informations publiques sur un domaine dans un exercice autorisé.", "theHarvester -d example.com -b duckduckgo", "Recherche des informations indexées sur un domaine d'exemple.", "Utilise uniquement un domaine dont tu es propriétaire ou que tu as l'autorisation d'étudier."),
      makeItem("Maltego", "Intermédiaire", "Visualise des relations entre entités à partir de sources de données accessibles.", "Créer un graphe d'entités dans Maltego", "Un graphe peut relier des domaines et des adresses publiques.", "N'enquête pas sur des personnes sans base légale et autorisation appropriée.")
    ]),
    group("Analyse de vulnérabilités", [
      makeItem("nikto", "Intermédiaire", "Recherche des configurations web risquées sur un serveur autorisé.", "nikto -h http://127.0.0.1:8000", "Cible uniquement un service local de laboratoire.", "Les tests peuvent générer de nombreuses requêtes ; utilise un serveur de labo avec autorisation."),
      makeItem("OpenVAS", "Avancé", "Gère des évaluations de vulnérabilités avec des tests configurés.", "Scanner une cible de laboratoire autorisée", "Un rapport aide à prioriser les correctifs.", "Configure une cible locale ou explicitement autorisée et examine les résultats avant toute action."),
      makeItem("searchsploit", "Intermédiaire", "Recherche dans une base locale des avis et références de vulnérabilités publiés.", "searchsploit nom-du-logiciel", "La recherche aide à identifier des références à vérifier.", "Une référence ne prouve pas à elle seule qu'un système est vulnérable ; ne lance aucun exploit hors labo.")
    ]),
    group("Attaques web (labo)", [
      makeItem("Burp Suite", "Intermédiaire", "Observe et teste les requêtes web dans un proxy configuré pour un laboratoire.", "Navigateur de labo → proxy local Burp", "Tu peux examiner une requête envoyée à une application d'entraînement.", "Ne configure pas le proxy pour intercepter le trafic d'autrui."),
      makeItem("sqlmap", "Avancé", "Aide à évaluer les injections SQL sur une application vulnérable de laboratoire.", "sqlmap -u 'http://127.0.0.1:8000/item?id=1' --batch", "L'exemple cible uniquement une application locale de labo.", "Outil intrusif : exclusivement sur une application volontairement vulnérable que tu es autorisé à tester."),
      makeItem("dirb", "Intermédiaire", "Vérifie des chemins web courants sur un serveur de test autorisé.", "dirb http://127.0.0.1:8000", "La cible reste un service local de laboratoire.", "Les requêtes de découverte peuvent être considérées comme intrusives hors laboratoire."),
      makeItem("gobuster", "Intermédiaire", "Recherche des chemins ou sous-domaines dans un périmètre d'audit autorisé.", "gobuster dir -u http://127.0.0.1:8000 -w wordlist.txt", "L'exemple inspecte une application locale et une liste de labo.", "Définis un périmètre écrit et utilise une cible locale."),
      makeItem("OWASP ZAP", "Intermédiaire", "Aide à examiner la sécurité d'applications web avec un proxy et des outils d'analyse.", "Lancer ZAP contre une application de formation locale", "DVWA peut servir de cible d'entraînement isolée.", "Ne lance pas de scan actif sur un site tiers sans autorisation écrite.")
    ]),
    group("Mots de passe", [
      makeItem("hashcat", "Avancé", "Évalue la robustesse de mots de passe hachés dans un audit autorisé.", "hashcat --help", "Commence par comprendre les formats et options sans fournir de hash tiers.", "N'utilise que des empreintes de test ou explicitement autorisées."),
      makeItem("John the Ripper", "Avancé", "Audite des mots de passe à partir de données de test autorisées.", "john --test", "Le test intégré évalue les performances sans viser un compte réel.", "Toute tentative sur des comptes ou hashes tiers est interdite."),
      makeItem("Hydra", "Avancé", "Teste la robustesse d'authentification dans un environnement de laboratoire contrôlé.", "hydra -h", "L'aide présente les options sans lancer de tentative contre une cible.", "Les tentatives répétées peuvent verrouiller des comptes ; pas de cible sans autorisation."),
      makeItem("Crunch", "Intermédiaire", "Crée des listes de chaînes synthétiques pour des exercices locaux.", "crunch 4 4 0123", "Génère des suites de quatre caractères avec les symboles donnés.", "Les listes grossissent vite ; limite la taille et garde-les dans ton labo.")
    ]),
    group("Wi-Fi (labo / réseau propre)", [
      makeItem("aircrack-ng", "Avancé", "Suite d'outils d'audit Wi-Fi pour analyser un réseau de laboratoire autorisé.", "aircrack-ng --help", "L'aide décrit les options sans cibler de réseau.", "Utilise uniquement ton propre point d'accès de test et des clients consentants."),
      makeItem("airodump-ng", "Avancé", "Observe des trames Wi-Fi à des fins de diagnostic dans un labo autorisé.", "airodump-ng --help", "Consulte l'aide avant de configurer une capture de laboratoire.", "La capture de communications d'autrui porte atteinte à la vie privée et peut être illégale."),
      makeItem("Wifite", "Avancé", "Automatise certains audits Wi-Fi dans un cadre de test contrôlé.", "wifite --help", "L'aide permet de découvrir les modes disponibles sans lancer d'audit.", "Ne lance jamais d'audit sur un réseau voisin ou public sans autorisation écrite.")
    ]),
    group("Analyse réseau", [
      makeItem("Wireshark", "Intermédiaire", "Capture et analyse des paquets réseau pour diagnostiquer un réseau autorisé.", "Capturer sur l'interface de la machine de labo", "Un filtre comme dns aide à isoler les requêtes DNS de son propre labo.", "Capture uniquement le trafic que tu es autorisé à consulter."),
      makeItem("tcpdump", "Intermédiaire", "Capture des paquets réseau depuis le terminal.", "sudo tcpdump -i lo -c 10", "Observe un petit nombre de paquets sur l'interface locale loopback.", "La capture peut contenir des données sensibles ; limite-la à ton environnement et protège les fichiers.")
    ]),
    group("Exploitation", [
      makeItem("Metasploit msfconsole", "Avancé", "Framework de validation de vulnérabilités dans un laboratoire isolé.", "msfconsole", "La console peut explorer les modules disponibles sans lancer d'attaque.", "N'exécute un module que contre une machine de labo que tu contrôles."),
      makeItem("msfvenom", "Avancé", "Génère des fichiers de test pour des exercices de sécurité contrôlés.", "msfvenom --help", "L'aide décrit les formats sans générer de charge active.", "Les charges peuvent être dangereuses ; ne les déploie jamais hors d'une VM isolée.")
    ]),
    group("Forensic", [
      makeItem("Autopsy", "Intermédiaire", "Analyse des supports et images disque dans le cadre d'une investigation numérique.", "Créer un dossier de cas et ajouter une image disque de test", "Une image d'entraînement permet d'explorer les artefacts sans toucher au disque original.", "Travaille sur une copie et préserve la chaîne de conservation des preuves."),
      makeItem("Binwalk", "Intermédiaire", "Repère des fichiers et signatures embarqués dans une image binaire.", "binwalk fichier-firmware-test.bin", "Analyse un fichier de firmware de démonstration.", "Analyse seulement des fichiers obtenus légalement et dans un environnement isolé."),
      makeItem("Foremost", "Intermédiaire", "Récupère des fichiers selon leur signature dans une image de test.", "foremost -i image-test.img -o resultat", "Écrit les résultats dans le dossier indiqué.", "Utilise une image de copie et conserve l'original intact.")
    ]),
    group("Anonymat & sécurité", [
      makeItem("proxychains", "Intermédiaire", "Fait passer une application compatible par un proxy configuré.", "proxychains4 curl https://example.com", "L'exemple consulte un domaine de démonstration via la configuration locale.", "Un proxy ne garantit ni anonymat total ni autorisation ; respecte les règles du service."),
      makeItem("Tor", "Intermédiaire", "Achemine certaines connexions via le réseau Tor pour réduire leur traçabilité réseau.", "tor --version", "Vérifie la version installée sans établir de cible particulière.", "Tor ne rend pas toutes les activités anonymes et ne protège pas contre les erreurs de comportement."),
      makeItem("VPN", "Débutant", "Crée un tunnel chiffré entre un appareil et un serveur VPN.", "Se connecter au VPN de confiance de son choix", "Le tunnel protège certains échanges sur le trajet réseau.", "Un VPN ne rend pas illégalement autorisées des actions et déplace la confiance vers son fournisseur.")
    ]),
    group("Labs pour s'entraîner", [
      makeItem("TryHackMe", "Débutant", "Propose des parcours guidés de cybersécurité en machines d'entraînement prévues à cet effet.", "Choisir une salle débutant et suivre ses règles", "Les exercices fournissent une cible explicitement dédiée à la pratique."),
      makeItem("Hack The Box", "Intermédiaire", "Fournit des laboratoires et défis pratiques de sécurité dans un cadre défini.", "Lire les règles de la plateforme avant de rejoindre un labo", "Les machines accessibles sont destinées aux exercices autorisés."),
      makeItem("DVWA", "Débutant", "Application web volontairement vulnérable pour apprendre à reconnaître des défauts courants.", "Déployer DVWA en réseau local isolé", "L'application sert de cible locale pour tester des protections."),
      makeItem("Metasploitable", "Intermédiaire", "Machine virtuelle volontairement vulnérable, conçue pour l'entraînement hors réseau public.", "Démarrer Metasploitable sur un réseau virtuel isolé", "Une VM dédiée permet des exercices reproductibles.", "Ne connecte jamais une machine volontairement vulnérable à un réseau public."),
      makeItem("OverTheWire", "Débutant", "Propose des jeux progressifs pour apprendre Linux, les commandes et la sécurité.", "Commencer par les premiers niveaux de Bandit", "Chaque niveau donne un objectif guidé.")
    ])
  ],
  html: [
    group("Structure d'une page", [
      makeItem("DOCTYPE", "Débutant", "Indique au navigateur que le document utilise la version moderne de HTML.", "<!doctype html>", "Place cette déclaration tout au début du fichier."),
      makeItem("html", "Débutant", "Contient tout le document et précise sa langue avec l'attribut lang.", '<html lang="fr">…</html>', "La langue française aide les lecteurs d'écran et les moteurs de recherche."),
      makeItem("head", "Débutant", "Regroupe les informations de la page qui ne sont pas son contenu visible principal.", "<head>\n  <meta charset=\"utf-8\">\n  <title>Ma page</title>\n</head>", "Le titre apparaît dans l'onglet du navigateur."),
      makeItem("body", "Débutant", "Contient le contenu affiché dans la fenêtre du navigateur.", "<body>\n  <h1>Bonjour !</h1>\n</body>", "Les titres et paragraphes visibles vont généralement dans body."),
      makeItem("Balises et attributs", "Débutant", "Les balises structurent le contenu ; les attributs précisent des informations sur un élément.", '<p class="intro">Bienvenue</p>', "class est un attribut qui pourra être ciblé en CSS.")
    ]),
    group("Texte et structure", [
      makeItem("Titres h1 à h6", "Débutant", "Organisent les titres selon leur niveau, du titre principal h1 aux sous-titres h6.", "<h1>Mon site</h1>\n<h2>À propos</h2>", "Choisis le niveau selon la structure du document, pas selon la taille voulue."),
      makeItem("Paragraphe p", "Débutant", "Représente un paragraphe de texte.", "<p>Je découvre le HTML.</p>", "Le navigateur place le paragraphe sur son propre bloc."),
      makeItem("Listes ul et ol", "Débutant", "Présentent des éléments sous forme de liste à puces ou numérotée.", "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>", "Chaque élément de liste est contenu dans li."),
      makeItem("Emphase strong et em", "Débutant", "Signale un texte important avec strong ou une emphase avec em.", "<p><strong>Important</strong> : lis la consigne.</p>", "Ces balises portent un sens, au-delà de leur apparence visuelle."),
      makeItem("Commentaires", "Débutant", "Ajoute une note dans le code source qui n'apparaît pas sur la page.", "<!-- Note pour les développeurs -->", "Les commentaires restent visibles dans le code de la page.")
    ]),
    group("Liens et médias", [
      makeItem("Lien a", "Débutant", "Crée un lien vers une autre page ou une section.", '<a href="contact.html">Nous contacter</a>', "Le texte du lien doit expliquer sa destination."),
      makeItem("Image img", "Débutant", "Affiche une image ; l'attribut alt décrit son contenu lorsque nécessaire.", '<img src="chat.jpg" alt="Un chat assis près d’une fenêtre">', "Une image décorative peut utiliser alt vide ; donne une description utile aux autres images."),
      makeItem("Audio et vidéo", "Intermédiaire", "Intègre un média avec des contrôles natifs du navigateur.", '<video controls src="demo.mp4">Votre navigateur ne lit pas la vidéo.</video>', "Prévois des sous-titres ou une transcription pour rendre le média accessible."),
      makeItem("Chemins relatifs", "Débutant", "Indiquent l'emplacement d'un fichier par rapport à la page actuelle.", '<img src="images/logo.png" alt="Logo">', "Un chemin relatif facilite le déplacement du projet complet.")
    ]),
    group("HTML sémantique", [
      makeItem("header", "Débutant", "Identifie l'en-tête d'une page ou d'une section.", "<header>\n  <a href=\"index.html\">Mon site</a>\n</header>", "Cette balise donne du sens à la structure du document."),
      makeItem("nav", "Débutant", "Regroupe les liens de navigation principaux.", "<nav aria-label=\"Navigation principale\">…</nav>", "Un libellé accessible aide à distinguer plusieurs navigations."),
      makeItem("main", "Débutant", "Contient le contenu principal unique de la page.", "<main>\n  <h1>Accueil</h1>\n</main>", "Une page devrait généralement avoir un seul élément main."),
      makeItem("section et article", "Intermédiaire", "Section regroupe un thème ; article forme un contenu autonome et réutilisable.", "<section>\n  <h2>Actualités</h2>\n  <article>Un article…</article>\n</section>", "Choisis une structure qui décrit réellement le contenu."),
      makeItem("footer", "Débutant", "Marque le pied d'une page ou d'une section.", "<footer>© 2026 Mon site</footer>", "Peut contenir les crédits ou liens secondaires.")
    ]),
    group("Formulaires", [
      makeItem("form", "Débutant", "Regroupe les champs d'un formulaire et définit comment les données sont envoyées.", '<form action="/contact" method="post">…</form>', "Un vrai traitement des données nécessite un service côté serveur."),
      makeItem("label et input", "Débutant", "Associe un libellé compréhensible à un champ de saisie.", '<label for="email">Adresse e-mail</label>\n<input id="email" type="email">', "La valeur de for doit correspondre à l'id du champ."),
      makeItem("Types de champs", "Débutant", "Le type d'input adapte la saisie et le clavier selon la donnée attendue.", '<input type="email" required>\n<input type="password">', "La validation HTML améliore l'expérience, mais ne remplace pas une validation serveur."),
      makeItem("button", "Débutant", "Crée un bouton d'action ; son type indique s'il envoie un formulaire ou non.", '<button type="submit">Envoyer</button>', "Utilise type=button pour un bouton qui ne doit pas envoyer le formulaire.")
    ])
  ],
  css: [
    group("Premiers styles", [
      makeItem("Règle CSS", "Débutant", "Associe un sélecteur à des déclarations de style.", "p {\n  color: navy;\n}", "Cette règle colore le texte des paragraphes."),
      makeItem("Sélecteurs", "Débutant", "Ciblent les éléments HTML que tu souhaites mettre en forme.", "h1 { color: teal; }\n.note { font-weight: bold; }\n#intro { margin: 1rem; }", "Un point cible une classe et un dièse cible un identifiant."),
      makeItem("Classes et identifiants", "Débutant", "Une classe peut être réutilisée ; un identifiant désigne un élément unique dans la page.", '<p class="note">À retenir</p>', "La classe note se cible avec .note en CSS."),
      makeItem("Couleurs et unités", "Débutant", "Définit les couleurs et dimensions avec des formats comme hex, rem, %, vw ou px.", "body { color: #26324a; }\n.card { padding: 1rem; }", "rem suit la taille de texte racine et s'adapte mieux aux préférences de lecture.")
    ]),
    group("Texte et apparence", [
      makeItem("Polices", "Débutant", "Règle la police, sa taille, son épaisseur et son interligne.", "p {\n  font-family: Arial, sans-serif;\n  line-height: 1.6;\n}", "Prévois une police de secours si la première n'est pas installée."),
      makeItem("Marges et espacements", "Débutant", "Contrôle l'espace extérieur avec margin et l'espace intérieur avec padding.", ".carte {\n  margin: 1rem;\n  padding: 1.5rem;\n}", "La marge sépare les blocs ; le padding éloigne le contenu du bord."),
      makeItem("Bordures et ombres", "Débutant", "Ajoute des contours, des coins arrondis et une ombre aux éléments.", ".carte {\n  border: 1px solid #ddd;\n  border-radius: 12px;\n}", "Un contraste subtil aide à garder une interface lisible."),
      makeItem(":hover et transitions", "Intermédiaire", "Adapte le style au survol et anime doucement un changement d'état.", "button { transition: background-color .2s; }\nbutton:hover { background-color: #ddd; }", "Garde un retour visuel équivalent pour le clavier avec :focus-visible.")
    ]),
    group("Disposition", [
      makeItem("Box model", "Débutant", "Décrit la boîte d'un élément : contenu, padding, bordure et marge.", "* { box-sizing: border-box; }", "border-box inclut le padding et la bordure dans la largeur définie."),
      makeItem("Flexbox", "Intermédiaire", "Aligne et distribue les éléments sur une ligne ou une colonne.", ".menu {\n  display: flex;\n  gap: 1rem;\n  align-items: center;\n}", "Flexbox est pratique pour une rangée de navigation."),
      makeItem("CSS Grid", "Intermédiaire", "Organise une page ou une zone en lignes et colonnes.", ".grille {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}", "Grid convient bien aux grilles de cartes."),
      makeItem("Position", "Intermédiaire", "Contrôle le placement avec les valeurs static, relative, absolute, fixed ou sticky.", ".barre {\n  position: sticky;\n  top: 0;\n}", "Les éléments absolute se positionnent par rapport à un ancêtre positionné.")
    ]),
    group("Responsive et accessibilité", [
      makeItem("Media queries", "Intermédiaire", "Applique des styles selon la largeur ou les capacités de l'écran.", "@media (max-width: 600px) {\n  .grille { grid-template-columns: 1fr; }\n}", "Teste la mise en page sur une largeur mobile et sur grand écran."),
      makeItem("Unités fluides", "Intermédiaire", "Utilise min(), max(), clamp() et des unités relatives pour adapter les dimensions.", "h1 { font-size: clamp(2rem, 5vw, 4rem); }", "clamp() définit une taille minimale, préférée et maximale."),
      makeItem(":focus-visible", "Intermédiaire", "Rend visible l'élément actif lors de la navigation au clavier.", ":focus-visible {\n  outline: 3px solid royalblue;\n  outline-offset: 3px;\n}", "Un indicateur de focus visible est essentiel pour naviguer sans souris."),
      makeItem("Variables CSS", "Intermédiaire", "Stocke des valeurs réutilisables, comme les couleurs du thème.", ":root { --accent: #5265df; }\na { color: var(--accent); }", "Une variable peut être redéfinie pour créer un thème sombre.")
    ])
  ],
  javascript: [
    group("Bases du langage", [
      makeItem("console.log()", "Débutant", "Affiche une information dans la console du navigateur, pratique pour apprendre et déboguer.", 'console.log("Bonjour !");', "Ouvre les outils développeur du navigateur pour voir le message."),
      makeItem("const et let", "Débutant", "Déclare des variables : const pour une référence stable, let si la valeur sera réaffectée.", "const prenom = \"Lina\";\nlet score = 0;\nscore = score + 1;", "Préfère const lorsque tu n'as pas besoin de réaffecter la variable."),
      makeItem("Types de données", "Débutant", "JavaScript utilise notamment les nombres, chaînes, booléens, tableaux, objets et null.", 'const nom = "Sam";\nconst actif = true;\nconst age = 16;', "typeof age renvoie \"number\"."),
      makeItem("Opérateurs", "Débutant", "Calcule des valeurs, compare des données et combine des conditions.", "const total = 3 + 4;\nconst majeur = total >= 18;", "Utilise === pour comparer sans conversion de type implicite."),
      makeItem("Conditions", "Débutant", "Choisit quel bloc exécuter en fonction d'une expression vraie ou fausse.", 'if (score >= 10) {\n  console.log("Réussi");\n} else {\n  console.log("À réviser");\n}', "Les accolades délimitent le bloc de chaque branche.")
    ]),
    group("Boucles et fonctions", [
      makeItem("Boucle for", "Débutant", "Répète une action un nombre connu de fois ou pour chaque valeur d'une séquence.", "for (let i = 0; i < 3; i++) {\n  console.log(i);\n}", "Affiche 0, 1 et 2."),
      makeItem("Boucle for…of", "Débutant", "Parcourt directement les valeurs d'un tableau ou d'une autre collection itérable.", 'for (const fruit of ["pomme", "poire"]) {\n  console.log(fruit);\n}', "Chaque tour associe fruit à un élément."),
      makeItem("Fonction", "Débutant", "Regroupe des instructions réutilisables et peut recevoir des paramètres.", "function saluer(nom) {\n  return `Bonjour ${nom}`;\n}\nconsole.log(saluer(\"Mina\"));", "return renvoie le résultat à l'endroit où la fonction est appelée."),
      makeItem("Fonction fléchée", "Intermédiaire", "Écrit une fonction avec une syntaxe compacte, courante dans les callbacks.", "const doubler = (n) => n * 2;\nconsole.log(doubler(4));", "Cette fonction renvoie 8."),
      makeItem("Portée des variables", "Intermédiaire", "Détermine où une variable déclarée avec let ou const est accessible.", "if (true) {\n  const message = \"Bonjour\";\n  console.log(message);\n}", "message n'est disponible qu'à l'intérieur du bloc.")
    ]),
    group("Tableaux et objets", [
      makeItem("Tableaux", "Débutant", "Stocke plusieurs valeurs ordonnées dans une seule variable.", 'const couleurs = ["bleu", "vert"];\ncouleurs.push("rouge");', "push ajoute une valeur à la fin du tableau."),
      makeItem("map()", "Intermédiaire", "Transforme chaque élément d'un tableau pour produire un nouveau tableau.", "const nombres = [1, 2, 3];\nconst doubles = nombres.map((n) => n * 2);", "doubles vaut [2, 4, 6] et le tableau initial reste inchangé."),
      makeItem("filter()", "Intermédiaire", "Crée un tableau contenant uniquement les éléments qui satisfont une condition.", "const nombres = [1, 2, 3, 4];\nconst pairs = nombres.filter((n) => n % 2 === 0);", "pairs contient 2 et 4."),
      makeItem("Objets", "Débutant", "Regroupe des propriétés nommées et leurs valeurs.", 'const livre = { titre: "Le Petit Prince", pages: 96 };\nconsole.log(livre.titre);', "La notation point lit la propriété titre."),
      makeItem("Destructuration", "Intermédiaire", "Récupère des propriétés ou des éléments dans des variables séparées.", 'const utilisateur = { nom: "Mina", age: 20 };\nconst { nom, age } = utilisateur;', "nom et age reçoivent les valeurs correspondantes.")
    ]),
    group("HTML et DOM", [
      makeItem("querySelector()", "Débutant", "Sélectionne le premier élément HTML qui correspond à un sélecteur CSS.", 'const titre = document.querySelector("h1");\nconsole.log(titre.textContent);', "Vérifie que l'élément existe avant de modifier ses propriétés."),
      makeItem("textContent", "Débutant", "Lit ou change le texte d'un élément sans interpréter la valeur comme du HTML.", 'const message = document.querySelector("#message");\nmessage.textContent = "Bonjour !";', "textContent est préférable à innerHTML pour afficher du texte fourni par l'utilisateur."),
      makeItem("classList", "Intermédiaire", "Ajoute, retire ou bascule une classe CSS sur un élément.", 'const carte = document.querySelector(".carte");\ncarte.classList.toggle("active");', "La classe active peut contrôler l'apparence dans une feuille CSS."),
      makeItem("Événement click", "Débutant", "Exécute une fonction lorsque l'utilisateur clique sur un élément.", 'const bouton = document.querySelector("button");\nbouton.addEventListener("click", () => {\n  console.log("Clic !");\n});', "addEventListener sépare le comportement du HTML.")
    ]),
    group("Asynchrone et stockage", [
      makeItem("Formulaire submit", "Intermédiaire", "Réagit à l'envoi d'un formulaire et peut empêcher un rechargement de page.", 'form.addEventListener("submit", (event) => {\n  event.preventDefault();\n  console.log("Formulaire traité");\n});', "Le navigateur vérifie quand même les champs HTML requis avant l'événement."),
      makeItem("JSON", "Intermédiaire", "Convertit des données entre objets JavaScript et texte JSON.", 'const texte = JSON.stringify({ nom: "Ali" });\nconst objet = JSON.parse(texte);', "Le JSON ne contient que des données, pas des fonctions."),
      makeItem("localStorage", "Intermédiaire", "Mémorise de petites valeurs dans le navigateur entre les visites.", 'localStorage.setItem("theme", "sombre");\nconst theme = localStorage.getItem("theme");', "Ne stocke pas de mot de passe ou d'information sensible dans localStorage."),
      makeItem("fetch()", "Intermédiaire", "Envoie une requête HTTP depuis le navigateur et récupère une réponse de service web.", 'fetch("https://example.com/data.json")\n  .then((reponse) => reponse.json())\n  .then((donnees) => console.log(donnees));', "Les appels réseau peuvent être bloqués selon CORS et nécessitent une connexion."),
      makeItem("async et await", "Intermédiaire", "Écrit plus lisiblement du code qui attend le résultat d'une opération asynchrone.", 'async function charger() {\n  const reponse = await fetch("https://example.com/data.json");\n  return await reponse.json();\n}', "Utilise try/catch pour gérer les erreurs de réseau.")
    ])
  ]
};
