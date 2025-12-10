import express from 'express';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const server = express();

// Chemin vers le dossier dist/portfolio
const __dirname = dirname(fileURLToPath(import.meta.url));
const distFolder = resolve(__dirname, 'dist/portfolio');

// Servir les fichiers statiques
server.use(express.static(distFolder));

// Toutes les autres routes renvoient index.html
server.get('*', (req, res) => {
  res.sendFile(join(distFolder, 'index.html'));
});

// Démarrer le serveur
const port = Number(process.env['PORT']) || 4000;
server.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
