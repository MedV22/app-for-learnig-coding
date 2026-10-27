# PRD – Site d'apprentissage Python & Kali Linux

**Version :** 1.0
**Technologies :** HTML5, CSS3, JavaScript (vanilla, sans framework)
**Langue du site :** Français

---

## 1. Vision

Créer un site web simple et clair où un débutant trouve **tout au même endroit** pour apprendre :

1. **Python** (de zéro jusqu'au niveau intermédiaire)
2. **Kali Linux** (système, commandes, outils de cybersécurité, en cadre légal)

Principe clé : **chaque élément est cliquable**. Quand l'utilisateur clique sur une commande, un outil ou une notion, une fenêtre / un panneau s'ouvre et explique **à quoi ça sert**, avec un exemple.

---

## 2. Objectifs

- Regrouper tous les concepts importants de Python et de Kali Linux dans un seul site.
- Expliquer chaque notion en langage simple (niveau débutant).
- Permettre une navigation rapide (menu, recherche, filtres).
- Fonctionner sans serveur ni base de données (site statique, ouvrable avec `index.html`).
- Être utilisable sur téléphone et ordinateur.

### Hors périmètre (version 1)
- Comptes utilisateurs, connexion
- Backend / base de données
- Exécution de code Python en ligne (option pour la V2)

---

## 3. Public cible

- Débutants qui veulent apprendre Python.
- Débutants qui veulent découvrir Kali Linux et la cybersécurité.
- Étudiants en informatique / réseaux / sécurité.

---

## 4. Structure du site (pages)

```
/
├── index.html          → Accueil
├── python.html         → Section Python
├── kali.html           → Section Kali Linux
├── css/
│   └── style.css
├── js/
│   ├── main.js         → Navigation, recherche, thème
│   ├── modal.js        → Fenêtre "à quoi ça sert"
│   └── data.js         → Toutes les données (Python + Kali)
└── PRD.md
```

### 4.1 Page d'accueil (`index.html`)
- Titre + courte description du site
- Deux grandes cartes : **Apprendre Python** / **Apprendre Kali Linux**
- Barre de recherche globale
- Bouton mode sombre / clair
- Pied de page

### 4.2 Page Python (`python.html`)
Menu latéral ou onglets avec les catégories ci-dessous. Chaque élément est une **carte cliquable**.

| Catégorie | Contenu (cartes cliquables) |
|---|---|
| **Bases** | `print()`, `input()`, commentaires `#`, variables, types (int, float, str, bool) |
| **Opérateurs** | `+ - * / // % **`, comparaison (`== != < >`), logique (`and or not`) |
| **Conditions** | `if`, `elif`, `else` |
| **Boucles** | `for`, `while`, `break`, `continue`, `range()` |
| **Structures de données** | liste, tuple, dictionnaire, ensemble (set) |
| **Fonctions** | `def`, paramètres, `return`, `lambda` |
| **Chaînes de texte** | f-strings, `.split()`, `.join()`, `.replace()`, slicing |
| **Fichiers** | `open()`, lire, écrire, `with` |
| **Erreurs** | `try`, `except`, `finally`, `raise` |
| **Modules** | `import`, `os`, `sys`, `math`, `random`, `datetime` |
| **POO** | classe, objet, `__init__`, héritage |
| **Outils** | `pip`, environnement virtuel (`venv`), `requests` |
| **Python pour la sécurité** | `socket`, `subprocess`, scan de ports simple (en labo), hashing (`hashlib`) |
| **Mini-projets** | calculatrice, jeu "devine le nombre", générateur de mot de passe, to-do list |

### 4.3 Page Kali Linux (`kali.html`)

| Catégorie | Contenu (cartes cliquables) |
|---|---|
| **Introduction** | c'est quoi Kali, installation (VM VirtualBox / VMware, dual boot), mise à jour |
| **Commandes Linux de base** | `ls`, `cd`, `pwd`, `mkdir`, `rm`, `cp`, `mv`, `cat`, `nano`, `touch`, `man`, `clear` |
| **Permissions & utilisateurs** | `chmod`, `chown`, `sudo`, `su`, `whoami`, `adduser` |
| **Gestion des paquets** | `apt update`, `apt upgrade`, `apt install`, `dpkg` |
| **Réseau** | `ip a`, `ifconfig`, `ping`, `netstat`, `ss`, `traceroute`, `nslookup`, `dig` |
| **Recherche & texte** | `grep`, `find`, `locate`, `awk`, `sed`, `head`, `tail`, pipes `\|` |
| **Reconnaissance** | `nmap`, `whois`, `theHarvester`, `Maltego` |
| **Analyse de vulnérabilités** | `nikto`, `OpenVAS`, `searchsploit` |
| **Attaques web (labo)** | `Burp Suite`, `sqlmap`, `dirb`, `gobuster`, `OWASP ZAP` |
| **Mots de passe** | `hashcat`, `john`, `hydra`, `crunch` |
| **Wi-Fi (labo/propre réseau)** | `aircrack-ng`, `airodump-ng`, `wifite` |
| **Analyse réseau** | `Wireshark`, `tcpdump` |
| **Exploitation** | `Metasploit` (`msfconsole`), `msfvenom` |
| **Forensic** | `autopsy`, `binwalk`, `foremost` |
| **Anonymat & sécurité** | `proxychains`, `tor`, VPN |
| **Labs pour s'entraîner** | TryHackMe, Hack The Box, DVWA, Metasploitable, OverTheWire |

> ⚠️ **Avertissement légal obligatoire** affiché en haut de la page Kali :
> *Les outils présentés doivent être utilisés uniquement sur vos propres machines, dans un laboratoire, ou avec l'autorisation écrite du propriétaire. Toute utilisation illégale est interdite et de la responsabilité de l'utilisateur.*

---

## 5. Fonctionnalité principale : « À quoi ça sert ? »

### 5.1 Comportement
Quand l'utilisateur **clique sur une carte** (commande, outil, notion) :

1. Une **fenêtre modale** (ou un panneau latéral) s'ouvre.
2. Elle affiche :
   - **Nom** (ex. `nmap`)
   - **À quoi ça sert** (1 à 3 phrases simples)
   - **Syntaxe** (ex. `nmap -sV 192.168.1.1`)
   - **Exemple concret** avec explication ligne par ligne
   - **Niveau** : Débutant / Intermédiaire / Avancé
   - **Attention / bon à savoir** (ex. risques, légalité)
   - Bouton **Copier** le code / la commande
3. Fermeture par bouton ✕, touche `Échap`, ou clic en dehors.

### 5.2 Format des données (`data.js`)

```js
const data = {
  python: [
    {
      categorie: "Boucles",
      items: [
        {
          nom: "for",
          niveau: "Débutant",
          utilite: "Répète une action pour chaque élément d'une liste ou d'une suite de nombres.",
          syntaxe: "for i in range(5):\n    print(i)",
          exemple: "Affiche les nombres de 0 à 4.",
          attention: "N'oublie pas l'indentation (4 espaces)."
        }
      ]
    }
  ],
  kali: [
    {
      categorie: "Reconnaissance",
      items: [
        {
          nom: "nmap",
          niveau: "Intermédiaire",
          utilite: "Scanne un réseau ou une machine pour trouver les ports ouverts et les services actifs.",
          syntaxe: "nmap -sV 192.168.1.1",
          exemple: "-sV détecte la version des services sur la machine cible.",
          attention: "À utiliser uniquement sur des machines que tu possèdes ou que tu es autorisé à tester."
        }
      ]
    }
  ]
};
```

Le contenu est **généré dynamiquement en JavaScript** à partir de ces données : ajouter une notion = ajouter un objet, sans toucher au HTML.

---

## 6. Autres fonctionnalités

| # | Fonctionnalité | Priorité |
|---|---|---|
| 1 | Menu de navigation (Accueil / Python / Kali) | Haute |
| 2 | Cartes cliquables + modale « À quoi ça sert » | Haute |
| 3 | Barre de recherche (filtre en direct sur nom + description) | Haute |
| 4 | Filtre par niveau (Débutant / Intermédiaire / Avancé) | Moyenne |
| 5 | Bouton « Copier » sur les blocs de code | Moyenne |
| 6 | Mode sombre / clair (mémorisé avec `localStorage`) | Moyenne |
| 7 | Barre de progression : marquer une notion comme « apprise » (`localStorage`) | Moyenne |
| 8 | Coloration syntaxique du code (Prism.js ou Highlight.js) | Basse |
| 9 | Quiz de fin de catégorie (QCM en JS) | Basse (V2) |
| 10 | Éditeur Python en ligne (Pyodide) | Basse (V2) |

---

## 7. Design / UX

- **Style :** moderne, minimaliste, esprit « terminal / hacker » pour Kali (fond sombre, vert/cyan), plus lumineux pour Python (bleu/jaune).
- **Police :** une police monospace pour le code (ex. `Fira Code`, `JetBrains Mono`), une police lisible pour le texte.
- **Responsive :** mobile first, grille CSS (`display: grid`) avec cartes qui s'adaptent.
- **Accessibilité :** contrastes suffisants, navigation clavier, balises sémantiques (`header`, `nav`, `main`, `section`), attributs `aria-*` sur la modale.
- **Animations :** légères (survol des cartes, ouverture de la modale).

### Maquette textuelle (page Python)

```
┌──────────────────────────────────────────────┐
│  🐍 Learn Hub     [Accueil][Python][Kali] 🌙 │
├──────────────────────────────────────────────┤
│  🔍 Rechercher...        Niveau: [Tous ▼]    │
├───────────┬──────────────────────────────────┤
│ Bases     │  ┌────────┐ ┌────────┐ ┌───────┐ │
│ Boucles   │  │ print()│ │ input()│ │ var   │ │
│ Fonctions │  └────────┘ └────────┘ └───────┘ │
│ POO       │  ┌────────┐ ┌────────┐           │
│ ...       │  │ if     │ │ for    │           │
│           │  └────────┘ └────────┘           │
└───────────┴──────────────────────────────────┘
        (clic sur une carte → modale "À quoi ça sert")
```

---

## 8. Exigences techniques

- **HTML5** sémantique, 3 pages.
- **CSS3** : variables CSS (`--couleur`), flexbox, grid, media queries, thème sombre/clair.
- **JavaScript ES6+** : `fetch` inutile (données dans `data.js`), manipulation du DOM, événements, `localStorage`, `navigator.clipboard`.
- Aucun framework, aucune dépendance obligatoire (Prism.js en option via CDN).
- Compatible : Chrome, Firefox, Edge, Safari (versions récentes).
- Performance : chargement < 2 s, poids total < 1 Mo.

---

## 9. Critères d'acceptation

- [ ] Le site s'ouvre en double-cliquant sur `index.html`.
- [ ] Les sections Python et Kali contiennent toutes les catégories listées.
- [ ] Cliquer sur n'importe quelle carte ouvre la modale avec « À quoi ça sert ».
- [ ] La recherche filtre les cartes en temps réel.
- [ ] Le site est utilisable sur mobile (écran 360 px).
- [ ] Le mode sombre / clair fonctionne et est mémorisé.
- [ ] L'avertissement légal est visible sur la page Kali.
- [ ] Ajouter une nouvelle notion se fait uniquement dans `data.js`.

---

## 10. Plan de réalisation

| Étape | Tâche | Durée estimée |
|---|---|---|
| 1 | Structure des fichiers + HTML des 3 pages | 0,5 jour |
| 2 | CSS : thème, grille, cartes, responsive | 1 jour |
| 3 | `data.js` : contenu Python | 1 à 2 jours |
| 4 | `data.js` : contenu Kali | 1 à 2 jours |
| 5 | JS : génération des cartes + modale | 1 jour |
| 6 | Recherche, filtres, copier, mode sombre | 1 jour |
| 7 | Progression + tests mobile/navigateurs | 0,5 jour |
| 8 | Corrections + mise en ligne (GitHub Pages / Netlify) | 0,5 jour |

---

## 11. Évolutions futures (V2)

- Quiz interactifs et badges
- Éditeur Python en ligne (Pyodide)
- Terminal Linux simulé dans le navigateur
- Parcours guidés (« Python en 30 jours », « Kali pour débutant »)
- Traduction anglais / arabe
- Contributions de la communauté (ajout de notions via GitHub)

---

## 12. Risques

| Risque | Solution |
|---|---|
| Mauvaise utilisation des outils Kali | Avertissement légal clair + exemples uniquement en labo |
| Contenu trop long / difficile | Niveaux + explications courtes et simples |
| Site lourd à maintenir | Données séparées dans `data.js` |
