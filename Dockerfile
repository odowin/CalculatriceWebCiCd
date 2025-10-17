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