# TP DevOps – Collaboration et Automatisation CI/CD : Calculatrice Web (HTML/CSS/JS + Docker + GitHub Actions)

## 🎯 Objectifs du TP

Ce TP a pour but de vous faire découvrir les pratiques DevOps à travers un petit projet collaboratif versionné sur GitHub.
Vous apprendrez à :

- Travailler en équipe avec Git Flow (main/dev/feature branches)
- Mettre en place une Intégration Continue (CI) avec GitHub Actions :
  - Linter le code + exécuter les tests unitaires automatiquement
  - Mettre en place un Déploiement Continu (CD) :
  - Construire une image Docker et la redéployer localement après chaque merge

- Comprendre le cycle complet Dev → Test → Build → Run

- Le tout sur un projet simple : une calculatrice web en HTML/CSS/JS.

## 🧑‍💻 Outils nécessaires

- Système : Windows / Linux / macOS

- Environnement : VSCode

- Terminal intégré VSCode uniquement (pas d’interface graphique Git)

- Compte GitHub

- Docker Desktop installé et fonctionnel

- Node.js (≥ 18) installé pour exécuter les tests en local

## 📦 Étape 0 : Mise en place du projet et du dépôt

### 1. Création du dépôt GitHub

L’**initiateur** crée un dépôt public nommé calculatrice-web

Il invite ses deux coéquipiers comme collaborateurs

Chaque membre clone le dépôt avec ```git clone```

📁 A titre indicatif, voici l'arborescence finale attendue dans votre répo github :
```
calculatrice-web/
│
├── index.html
├── style.css
├── script.js
├── tests/
│   └── calc.test.js
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── Dockerfile
├── package.json
├── README.md
└── README_<votre_nom>.md
```

## ⚙️ Étape 1 : Initialisation du projet
### 1. Création de la branche d’initialisation

Comme pour le TP précédent, l'initialisateur crée une branche pour poser les bases du projet :
```git checkout -b feature/setup```

### 2. Ajout du fichier HTML
Puis, il créé ```index.html``` et y ajoute le code suivant :
```
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Calculatrice Web</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>🧮 Calculatrice</h1>
  <div id="calc">
    <input id="display" readonly />
    <div id="buttons"></div>
  </div>
  <script type="module" src="script.js"></script>
</body>
</html>
```

### 3. Ajout du fichier CSS

Il créé ensuite ```style.css```, et y ajoute le code suivant :
```
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #fafafa;
  padding-top: 50px;
}

#calc {
  display: inline-block;
  border: 2px solid #333;
  padding: 10px;
  border-radius: 10px;
  background: white;
}

#buttons button {
  width: 50px;
  height: 50px;
  margin: 5px;
  font-size: 20px;
}
```

### 4. Ajout du JS de base :
Il créé ensuite ```script.js```, et y ajoute le code suivant :
```
document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.getElementById("buttons");

  const symbols = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "0", "C", "=", "/"];
  symbols.forEach(sym => {
    const btn = document.createElement("button");
    btn.textContent = sym;
    buttons.appendChild(btn);
  });

  console.log("Calculatrice initialisée !");
});
```

Puis, il add, commit, et push pour synchroniser les changements avec le répo distant

### 5. Pull Request Time !

Puis, le réparateur créé une PR sur Github de la branche ```feature/setup``` vers la branche ```main```
Les membres de l'équipe peuvent ensuite review la PR, et la merge pour appliquer les changements sur ```main```


## 🧭 Étape 2 : Mise en place du GitFlow

### 1. Création de la branche dev
Comme pour le TP précédent, on crée une branche ```dev``` qui part de main pour isoler nos changements.

L'assureur tire les changements en local, puis s'occupe de créer la branche :

```
git checkout main
git pull
git checkout -b dev
git push origin dev
```

Puis, l'**initiateur** et le réparateur tirent les changements en local, et se déplacent sur la branche ```dev```.

### 2. Création des branches par fonctionnalité
- L'**initiateur** créé une branche ```feature/addition``` (partant de ```dev```) pour implémenter l'addition
- L'assureur créé une branche ```feature/substraction``` (partant de ```dev```) pour implémenter la soustraction
- Le réparateur créé une branche ```feature/multiplication``` (partant de ```dev```) pour implémenter la multiplication
- Jouez à pierre feuille ciseaux pour déterminer qui créera la branche ```feature/division``` pour implémenter la division
- Celui ou celle qui fait un puits perd d'office et doit implémenter la division.
- **initiateur** VS Réparateur, puis le/la gagnant(e) contre l'assureur. 

## 🧩 Étape 3 : Implémentation des fonctions
Exemple pour ```feature/addition```

Dans script.js, ajoutez :
```
export function add(a, b) {
  return a + b;
}
```

Puis créez le test correspondant dans ```tests/calc.test.js``` :

```
import { add } from "../script.js";

test("addition simple", () => {
  expect(add(2, 3)).toBe(5);
});
```

Répétez pour les autres opérations (subtract, multiply, divide).

Une fois vos fonctionnalités implémentées, commit et push sur leurs branches respectives, vous mettrez en place une pipeline CI/CD via Github Actions afin de vous assister dans l'intégration de ces dernières au produit principal (```dev```, puis ```main```)


## 🧪 Étape 4 : Intégration Continue (CI)
L’**initiateur** se déplace sur ```dev```, et créé une branche dédiée à la mise en place de la pipeline CI/CD appelée (par exemple) ```infra/ci_cd_setup```.
Puis, il se déplace dessus et ajoute un fichier package.json avec le contenu suivant :
```
{
  "name": "calculatrice-web",
  "version": "1.0.0",
  "scripts": {
    "test": "jest",
    "lint": "eslint ."
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  },
  "type": "module"
}
```

Il add, commit et push ces changements.

L'assureur tire les modifications en local, puis se déplace sur la branche ```infra/ci_cd_setup```, et ajoute un fichier ```ci-cd.yml``` dans un dossier ```.github/workflows/``` créé pour l'occasion.
Il y copie ensuite le code suivant :

```
name: CI/CD Pipeline

on:
  pull_request:
    branches: [dev, main]
  push:
    branches: [main]

concurrency:
  group: ci-${{ github.ref }}
  cancel-in-progress: true

jobs:
  ci:
    name: Intégration Continue (Lint + Tests)
    runs-on: ubuntu-latest

    steps:
      - name: 🧾 Checkout du code
        uses: actions/checkout@v4

      - name: ⚙️ Installation de Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: 📦 Installation des dépendances
        run: npm ci

      - name: 🧹 Lint du code
        run: npm run lint

      - name: 🧪 Tests unitaires
        run: npm test

  cd:
    name: Déploiement Continu (Docker)
    needs: ci
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: 🧾 Checkout du code
        uses: actions/checkout@v4

      - name: 🐳 Construction de l'image Docker
        run: docker build -t calculatrice-web .

      - name: 🚀 Lancement du conteneur Docker
        run: docker run -d -p 8080:80 calculatrice-web
```


Il add, commit et push ces changements.

## 🐳 Étape 5 : Dockerisation

Le réparateur tire les modifications en local, puis se déplace sur la branche ```infra/ci_cd_setup```, et ajoute un fichier nommé ```Dockerfile``` en y copiant le code suivant :
```
# Étape 1 : image de base légère
FROM node:18-alpine

# Étape 2 : installation du serveur statique "serve"
RUN npm install -g serve

# Étape 3 : définition du répertoire de travail
WORKDIR /app

# Étape 4 : copie des fichiers du projet dans le conteneur
COPY . .

# Étape 5 : exposer le port 80 pour le serveur web
EXPOSE 80

# Étape 6 : commande de lancement du serveur
CMD ["serve", "-s", ".", "-l", "80"]
```

Il add, commit et push ces changements.


## 🧪 Étape 6 : Installation du CI/CD

L'**initiateur** ouvre une PR depuis ```infra/ci_cd_setup``` vers ```dev```

Les trois membres du groupe review la PR avant de la valider pour merge ```infra/ci_cd_setup``` sur ```dev``` pour y ajouter les fichiers de configuration de la future pipeline CI/CD

Par la suite, tous les membres se rendent sur la branche ```dev```, et tirent les modifications en local.

Ils installent les dépendances JS avec npm en utilisant les deux commandes suivantes :
```
npm install
npx eslint --init
```

Puis, ils procèdent à un test de déploiement du container docker avec les commandes suivantes :

```
docker build -t calculatrice-web .
docker run -d -p 8080:80 calculatrice-web
```

Ce qui leur permettra de vérifier si la page web est correctement servie, en visitant l'URL ```http://localhost:8080``` via leurs navigateurs.


## 🚀 Étape 7 : CI/CD en action

- Ouvrez une Pull Request pour chaque branche feature/* → dev

- Vérifiez que les tests et le lint passent dans l'onglet "Actions" de votre projet Github

- Les PR ne peuvent être mergée qu’après validation de tous les membres de la team.

- Une fois les 4 opérations implémentées, merge, et testées ensemble sur ```dev``` (même procédure qu'à la fin de l'étape 6), créez une PR de dev → main

- Sur main, la pipeline CD se déclenche de la même manière.

Une fois que ```dev``` est merge sur ```main```, vous pouvez vous rendre sur dev et tester de nouveau que tout fonctionne bien en lancant votre container docker.
