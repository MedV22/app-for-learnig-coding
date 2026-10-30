# PRD — LearnHub

**Produit :** LearnHub, site pour apprendre à coder (HTML, CSS, JavaScript, Python, Kali Linux)
**Site actuel :** https://medv22.github.io/app-for-learnig-coding/
**Langues :** Français, العربية, English
**Version du document :** 1.0
**Date :** 29 octobre 2026

---

## 1. Résumé

LearnHub est un site d'apprentissage de la programmation pour débutants. Il propose déjà des parcours (Web, Python, Kali Linux), trois langues, un mode sombre, une recherche, un filtre de niveau et une barre de progression.

Cette version du PRD décrit les fonctions à ajouter pour passer d'un site de **lecture** à une vraie plateforme où l'on **pratique** : éditeur de code, exercices, parcours guidé, projets et application installable.

## 2. Problème

- Les débutants lisent des fiches mais ne pratiquent pas, donc ils retiennent peu.
- Beaucoup de sites de qualité sont uniquement en anglais.
- Sans parcours clair, un débutant ne sait pas par où commencer.
- La progression actuelle affiche « 0 / 0 notions » : elle n'est pas encore reliée à de vraies actions.

## 3. Objectifs

| # | Objectif | Mesure de succès |
|---|----------|------------------|
| 1 | Faire pratiquer l'élève dans la page | Au moins 70 % des fiches ont un éditeur ou un exercice |
| 2 | Donner un chemin clair | Chaque parcours a des étapes numérotées |
| 3 | Motiver à revenir | La progression est sauvegardée et visible |
| 4 | Être utilisable sur téléphone, même hors-ligne | Installation PWA possible, fiches principales disponibles hors-ligne |
| 5 | Rester multilingue | 100 % des nouveaux textes en FR, AR et EN |

## 4. Public cible

- Collégiens, lycéens et étudiants francophones et arabophones.
- Adultes en autoformation ou reconversion.
- Débutants complets, sans compte ni carte bancaire.

## 5. Hors périmètre (pour cette version)

- Comptes utilisateurs avec serveur et base de données.
- Paiement ou abonnement.
- Forum ou chat entre élèves.
- Correction de code par un humain.

---

## 6. Fonctionnalités

### P0 — Indispensables

#### 6.1 Éditeur de code dans la page
**Description :** chaque fiche peut contenir une zone de code modifiable avec résultat immédiat.

- HTML / CSS / JS : éditeur + `<iframe>` d'aperçu en direct.
- Python : exécution dans le navigateur avec **Pyodide**, sans serveur.
- Boutons : **Exécuter**, **Réinitialiser**, **Copier le code**.
- L'exemple de départ est fourni, l'élève le modifie.

**Critères d'acceptation :**
- [ ] L'élève modifie le code et voit le résultat en moins de 2 secondes (HTML/CSS/JS).
- [ ] Les erreurs Python s'affichent clairement dans une zone de sortie.
- [ ] Le code de l'élève ne peut pas modifier le reste du site (iframe isolée avec `sandbox`).
- [ ] Fonctionne sur téléphone (clavier et écran étroit).

#### 6.2 Exercices et quiz
**Description :** à la fin de chaque fiche, 3 à 5 questions (QCM) ou un petit défi de code.

- Correction automatique avec explication de la bonne réponse.
- Pour les défis de code : vérification simple (résultat attendu ou test sur le contenu).
- Une réussite marque la notion comme « apprise » et met à jour la progression.

**Critères d'acceptation :**
- [ ] Chaque fiche du parcours Web et Python a au moins un quiz.
- [ ] Le retour est immédiat (juste / faux + explication).
- [ ] La barre « X / Y notions apprises » reflète les réussites réelles.

#### 6.3 Sauvegarde de la progression
**Description :** la progression est gardée dans le navigateur avec `localStorage`.

- Sauvegarde : notions apprises, dernière fiche visitée, langue et thème choisis, code de l'élève par exercice.
- Bouton **Réinitialiser ma progression**.
- Gestion des cas où `localStorage` est vide ou bloqué (le site fonctionne quand même).

**Critères d'acceptation :**
- [ ] Après fermeture et réouverture, la progression est retrouvée.
- [ ] Aucune donnée personnelle n'est envoyée à un serveur.

### P1 — Importantes

#### 6.4 Parcours guidé
**Description :** chaque parcours est découpé en étapes ordonnées.

- Exemple Web : Étape 1 HTML → Étape 2 CSS → Étape 3 JavaScript.
- Niveaux visibles : Débutant, Intermédiaire, Avancé.
- Bouton **Continuer** qui ramène à la prochaine fiche non terminée.
- Les fiches avancées sont suggérées seulement après les bases.

**Critères d'acceptation :**
- [ ] Un nouvel élève voit en un coup d'œil par où commencer.
- [ ] Le filtre de niveau et la recherche continuent de fonctionner.

#### 6.5 Mini-projets
**Description :** projets guidés pour appliquer ce qui est appris.

Idées de départ :
1. Ma page perso (HTML + CSS)
2. Calculatrice (JavaScript)
3. Jeu « devine le nombre » (JavaScript ou Python)
4. Liste de tâches (HTML + CSS + JS)
5. Quiz en Python (Python)

Chaque projet : objectif, étapes, code de départ, solution à révéler à la fin.

**Critères d'acceptation :**
- [ ] Au moins 3 projets disponibles dans la première version.
- [ ] Chaque projet utilise l'éditeur intégré.

#### 6.6 Application installable (PWA)
**Description :** le site peut s'installer sur téléphone et ordinateur et fonctionne hors-ligne.

- Fichier `manifest.json` (nom, icônes, couleurs, `display: standalone`).
- Service worker `sw.js` qui met en cache les pages, styles, scripts et fiches.
- Icônes 192×192 et 512×512.
- Message discret « Installer l'application ».

**Critères d'acceptation :**
- [ ] Le site passe l'audit PWA de Lighthouse.
- [ ] Les fiches déjà visitées s'ouvrent sans connexion.
- [ ] L'éditeur de code HTML/CSS/JS fonctionne hors-ligne (Pyodide : au mieux, selon la taille du cache).

### P2 — Plus

#### 6.7 Motivation
- Badges (première notion, 10 notions, parcours terminé).
- Série de jours consécutifs.
- Points par quiz réussi.

#### 6.8 Confort de lecture
- Bouton **Copier le code** sur tous les exemples.
- Glossaire des mots difficiles, avec info-bulles.
- Taille du texte réglable.
- Navigation « Fiche précédente / suivante ».

#### 6.9 Sécurité et éthique (parcours Kali Linux)
- Bandeau clair : les outils s'utilisent uniquement sur ses propres machines ou sur des plateformes légales (par ex. TryHackMe, Hack The Box, laboratoires locaux).
- Aucun contenu qui aide à attaquer des systèmes sans autorisation.
- Exercices dans des environnements d'entraînement uniquement.

---

## 7. Exigences non fonctionnelles

| Domaine | Exigence |
|---------|----------|
| Performance | Première page utilisable en moins de 3 s sur une connexion moyenne |
| Mobile | Interface pensée d'abord pour le téléphone |
| Langues | FR, AR (écriture de droite à gauche, `dir="rtl"`) et EN |
| Accessibilité | Contrastes suffisants, navigation au clavier, textes alternatifs |
| Vie privée | Pas de compte, pas de suivi, données seulement en local |
| Hébergement | Site statique sur GitHub Pages, sans serveur |
| Compatibilité | Dernières versions de Chrome, Firefox, Safari, Edge |

## 8. Architecture technique (proposition)

- **Front-end :** HTML, CSS et JavaScript simples, sans framework obligatoire.
- **Contenu :** fiches stockées en fichiers JSON ou JS, un par langue.
- **Éditeur :** `<textarea>` ou CodeMirror (chargé en script) + `<iframe sandbox>` pour l'aperçu.
- **Python :** Pyodide chargé à la demande (seulement sur les pages Python).
- **Stockage :** `localStorage` (progression, préférences, code de l'élève).
- **PWA :** `manifest.json` + `sw.js`.

## 9. Plan de livraison

| Phase | Contenu | Priorité |
|-------|---------|----------|
| 1 | Éditeur de code (HTML/CSS/JS) + sauvegarde de la progression | P0 |
| 2 | Quiz et exercices sur les fiches existantes | P0 |
| 3 | Éditeur Python (Pyodide) | P0 |
| 4 | Parcours guidé + bouton Continuer | P1 |
| 5 | Mini-projets (3 au minimum) | P1 |
| 6 | PWA (installation + hors-ligne) | P1 |
| 7 | Badges, glossaire, confort de lecture | P2 |

## 10. Risques

| Risque | Impact | Réponse |
|--------|--------|---------|
| Pyodide est lourd à charger | Lenteur sur mobile | Chargement à la demande, message d'attente |
| Traduire tout le contenu en 3 langues | Beaucoup de travail | Commencer par FR, ajouter AR et EN par parcours |
| Code de l'élève dangereux dans l'aperçu | Sécurité | `iframe` avec `sandbox`, pas d'accès au site parent |
| Contenu Kali mal utilisé | Éthique | Bandeau légal, exercices en environnements d'entraînement |
| Perte de progression si le navigateur est vidé | Frustration | Bouton exporter / importer la progression (fichier JSON) |

## 11. Indicateurs de réussite

- Nombre de notions apprises par élève en moyenne.
- Part des élèves qui terminent au moins un quiz.
- Part des élèves qui reviennent le lendemain.
- Nombre d'installations de la PWA.

## 12. Questions ouvertes

- Faut-il un éditeur simple (`textarea`) ou CodeMirror (plus agréable, un peu plus lourd) ?
- Quel ordre pour la traduction : arabe d'abord ou anglais d'abord ?
- Veux-tu un export de la progression (fichier) pour passer d'un appareil à l'autre ?
- Quelle licence pour le contenu (libre, Creative Commons, tous droits réservés) ?
