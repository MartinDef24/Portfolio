# PHASE 1: Build the Angular application
# -------------------------------------
# Ligne 2 : Définition de l'alias
FROM node:20-alpine AS angular_builder 

# ... (toutes les lignes de build Node.js)

# PHASE 2: Serve the application using NGINX
# -----------------------------------------
FROM nginx:alpine

# ... (votre ligne COPY nginx.conf)

# Ligne de copie (COPY)
COPY --from=angular_builder /app/dist/portfolio/browser /usr/share/nginx/html

# ... (reste du Dockerfile)