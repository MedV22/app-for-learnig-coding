# 🐍🐉 CodeVally – Apprendre Python & Kali Linux

Un site web simple et gratuit pour apprendre **Python** et **Kali Linux** au même endroit. Clique sur n'importe quelle carte (commande, outil, notion) et une fenêtre t'explique **à quoi ça sert**, avec la syntaxe et un exemple.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Licence](https://img.shields.io/badge/licence-MIT-green)

---

## ✨ Fonctionnalités

- 📚 **Section Python** : bases, conditions, boucles, fonctions, POO, fichiers, modules, mini-projets
- 🐉 **Section Kali Linux** : commandes Linux, réseau, reconnaissance, outils de sécurité, labs d'entraînement
- 🌐 **Section Web** : HTML, CSS et JavaScript
- 🧑‍💻 **Parcours pratiques HTML, CSS, JavaScript et Python** : leçons progressives, exercices corrigés, indices et solutions expliquées
- 🐧 **Parcours Kali Linux simulé** : commandes de base sur des fichiers fictifs, sans accès au système ni au réseau
- 🖥️ **Vrai terminal Kali local** : shell dans Kali WSL avec une simulation pédagogique toujours disponible
- 🌍 **Interface en français, anglais et arabe** : les parcours suivent la langue choisie ; les exemples de code, commentaires et le terminal Kali restent inchangés
- 🧠 **Quiz** : questions d’origine en anglais, traduites en français lorsque l’interface est en français
- 💡 **Fenêtre « À quoi ça sert ? »** : explication simple, syntaxe, exemple et points d'attention
- 🔍 **Recherche** en temps réel
- 🎚️ **Filtre par niveau** : Débutant / Intermédiaire / Avancé
- 📋 **Bouton Copier** sur les commandes et le code
- 🌙 **Mode sombre / clair**
- ✅ **Suivi de progression** (sauvegardé dans le navigateur)
- ⭐ **Favoris** pour retrouver tes notions préférées
- 🏆 **Badges** de complétion par catégorie
- 🧠 **Quiz QCM** pour valider tes acquis
- 🐧 **Terminal Linux simulé** pour pratiquer sans installer
- 🐍 **Éditeur Python en ligne** pour tester du code immédiatement
- 📱 **Responsive** : fonctionne sur téléphone et ordinateur

---

## 🚀 Utilisation

Aucune installation de dépendances n’est nécessaire. Lance le site avec un serveur local (nécessaire pour le service worker et l’installation PWA) :

```bash
python -m http.server 8000
```

Puis ouvre `http://localhost:8000` dans ton navigateur. Le site est aussi disponible sur GitHub Pages en HTTPS.

### Utiliser le vrai terminal Kali

Le terminal réel se connecte à la distribution **Kali Linux WSL** installée sur le PC et utilise Node.js pour le relais local. Dans PowerShell, depuis la racine du projet, lance :

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\start-kali-terminal.ps1
```

La première utilisation installe ttyd depuis sa version officielle, vérifie son empreinte SHA-256, puis crée un compte Kali `codevally-terminal` sans droits root. Ouvre `http://127.0.0.1:8080`, puis clique sur **Terminal → Kali réel (WSL)**. Garde la fenêtre PowerShell ouverte pendant l’utilisation. Pour arrêter le service Kali, lance `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\stop-kali-terminal.ps1` dans une autre fenêtre PowerShell, puis ferme la première avec Ctrl+C.

Le site et le relais WebSocket écoutent uniquement sur `127.0.0.1`. Le shell tourne avec un compte sans privilèges root, mais il utilise le réseau normal de Kali WSL et peut accéder aux lecteurs Windows que WSL monte (par exemple `/mnt/c`). Utilise-le seulement pour des commandes que tu comprends, sur tes systèmes ou dans un labo autorisé. Le mode simulateur fonctionne sans WSL ni installation, y compris sur GitHub Pages.

Le service worker met les pages et les fichiers de l’application en cache après une première visite en ligne. La progression reste dans le navigateur utilisé et ne se synchronise pas entre appareils. L’éditeur Python exécute le code dans un Worker isolé, mais charge Pyodide depuis un CDN et nécessite une connexion pour son premier démarrage ; le runtime Python n’est pas inclus dans le cache hors ligne.

---

## 📁 Structure du projet

```
learn-hub/
├── index.html        → Page d'accueil
├── python.html       → Section Python
├── kali.html         → Section Kali Linux
├── web.html          → Section HTML/CSS/JS
├── html-practice.html → Parcours pratique guidé pour apprendre le HTML
├── practice.html     → Parcours pratique CSS, JavaScript, Python et Kali Linux
├── mainf.html        → Redirection vers la page d’accueil
├── favicon.svg       → Icône du site
├── manifest.json     → Métadonnées d’installation PWA
├── sw.js             → Cache hors ligne et mises à jour PWA
├── server.js           → Serveur local et relais WebSocket vers Kali WSL
├── setup-kali-terminal.ps1 → Installation initiale du terminal WSL
├── start-kali-terminal.ps1 → Démarrage du site et du vrai terminal
├── stop-kali-terminal.ps1 → Arrêt du terminal WSL
├── scripts/install-kali-terminal.sh → Installation vérifiée de ttyd
├── css/
│   └── style.css     → Styles et thèmes
├── js/
│   ├── main.js       → Navigation, recherche, thème, rendu des cartes
│   ├── modal.js      → Fenêtre "À quoi ça sert"
│   ├── app.js        → Notions, progression et favoris
│   ├── quiz.js       → Affichage et logique des quiz
│   ├── data.js       → Tout le contenu (Python + Kali + Web)
│   ├── i18n.js       → Traductions (fr, en, ar)
│   ├── quiz-i18n.js  → Traductions françaises des quiz
│   ├── guided-i18n.js   → Traductions des parcours pratiques
│   ├── terminal.js   → Interface du simulateur et du terminal Kali réel
│   ├── html-practice.js → Exercices, corrections et progression HTML
│   ├── practice.js   → Parcours CSS, JavaScript, Python et Kali Linux
│   ├── pypod.js      → Interface de l’éditeur Python
│   └── python-worker.js → Exécution isolée du code Python
├── PRD.md            → Cahier des charges du projet
└── README.md
```

---

## ➕ Ajouter une notion

Tout le contenu est dans `js/data.js`. Pour ajouter une commande ou une notion, ajoute simplement un objet :

```js
{
  nom: "nmap",
  niveau: "Intermédiaire",
  utilite: "Scanne un réseau pour trouver les ports ouverts et les services actifs.",
  syntaxe: "nmap -sV 192.168.1.1",
  exemple: "-sV détecte la version des services sur la machine cible.",
  attention: "À utiliser uniquement sur des machines que tu possèdes ou que tu es autorisé à tester."
}
```

Pas besoin de modifier le HTML : les cartes sont générées automatiquement.

---

## ⚠️ Avertissement légal

Les outils de la section Kali Linux sont présentés **à but éducatif uniquement**. Utilise-les seulement :

- sur **tes propres machines**,
- dans un **laboratoire** (VM, TryHackMe, Hack The Box, DVWA, Metasploitable…),
- ou avec **l'autorisation écrite** du propriétaire du système.

Toute utilisation illégale est interdite et relève de la seule responsabilité de l'utilisateur. L'auteur du projet n'est pas responsable de l'usage qui en est fait.

---

## ℹ️ Limites connues

- Les questions des quiz sont en anglais par défaut et traduites en français. Le texte des questions de quiz n’est pas encore traduit en arabe.
- Les acquis sont sauvegardés uniquement dans le navigateur utilisé ; il n’y a pas de compte ni de synchronisation entre appareils.
- L’éditeur Python ne fonctionne pas hors ligne tant que Pyodide n’a pas été chargé depuis le CDN.

---

## 🤝 Contribuer

Les contributions sont les bienvenues !

1. Fais un **fork** du projet
2. Crée une branche : `git checkout -b ma-nouvelle-notion`
3. Ajoute ta notion dans `js/data.js`
4. Commit : `git commit -m "Ajout de la notion X"`
5. Push : `git push origin ma-nouvelle-notion`
6. Ouvre une **Pull Request**

---

## 📄 Licence

Ce projet est sous licence **MIT**. Tu peux l'utiliser, le modifier et le partager librement.

---

## 👤 Projet

Maintenu par [@MedV22](https://github.com/MedV22)
