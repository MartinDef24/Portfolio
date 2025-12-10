# ... (PHASE 1: Build)
# ... (votre ligne RUN node_modules/.bin/ng build --base-href / ici)

# PHASE 2: Serve the application using NGINX
FROM node:20-alpine AS builder

# 1. Copie le fichier de configuration NGINX personnalisé
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 2. Copie les fichiers compilés (votre chemin exact)
COPY --from=builder /app/dist/portfolio/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]