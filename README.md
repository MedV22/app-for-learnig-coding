# 🐍🐉 Learn Hub – Apprendre Python & Kali Linux

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

Le site peut mettre ses pages en cache après une première visite en ligne. L’éditeur Python charge Pyodide depuis un CDN et nécessite une connexion la première fois ; son runtime n’est pas inclus dans le cache hors ligne.

---

## 📁 Structure du projet

```
learn-hub/
├── index.html        → Page d'accueil
├── python.html       → Section Python
├── kali.html         → Section Kali Linux
├── web.html          → Section HTML/CSS/JS
├── css/
│   └── style.css     → Styles et thèmes
├── js/
│   ├── main.js       → Navigation, recherche, thème, rendu des cartes
│   ├── modal.js      → Fenêtre "À quoi ça sert"
│   ├── app.js        → Logique des cours, progression, favoris, quiz
│   ├── data.js       → Tout le contenu (Python + Kali + Web)
│   ├── i18n.js       → Traductions (fr, en, ar)
│   └── terminal.js   → Terminal Linux simulé
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

## 🗺️ À améliorer ensuite

- [ ] Ajouter des exercices avec correction et des parcours guidés.
- [ ] Compléter les essais sur les navigateurs et téléphones réels.
- [ ] Étudier un mode hors ligne pour l’éditeur Python (Pyodide).

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

## 👤 Auteur

Fait avec ❤️ par **TON-NOM**
GitHub : [@TON-NOM](https://github.com/TON-NOM)
