# PHASE 1: Build the Angular application
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (for npm ci)
COPY package.json package-lock.json ./

# Install dependencies (npm ci is faster than npm install)
RUN npm ci

# Copy the rest of the application files
COPY . .

# Run the Angular build command
# --base-href / est crucial pour le routage dans le conteneur
RUN node_modules/.bin/ng build --base-href /

# PHASE 2: Serve the application using NGINX (Lightweight production server)
FROM nginx:alpine

# Copy the compiled production files from the builder stage
# Remplacez "portfolio" par le nom du sous-dossier de votre projet s'il est différent.
COPY --from=builder /app/dist/portfolio/browser /usr/share/nginx/html

# Copy NGINX configuration (optional but recommended for SPAs)
# Si vous n'avez pas de fichier nginx.conf, laissez cette ligne en commentaire.
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# NGINX sert les fichiers par défaut sur le port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]