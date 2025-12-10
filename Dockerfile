# PHASE 1: Build the Angular application
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (for npm ci)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Run the Angular build command, forçant le base-href à la racine du serveur
# C'est la correction critique : on appelle ng build directement.
RUN node_modules/.bin/ng build --base-href /

# PHASE 2: Serve the application using NGINX (Lightweight production server)
FROM nginx:alpine

# Copy the compiled production files from the builder stage
# On utilise le chemin exact que vous avez vérifié : dist/portfolio/browser
COPY --from=builder /app/dist/portfolio/browser /usr/share/nginx/html

# Expose le port par défaut du serveur web
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]