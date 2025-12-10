import express from 'express';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

const app = express();
const port = Number(process.env['PORT']) || 4000;

// Dossier où Angular a mis le build SPA
const browserDist = resolve(__dirname, '../browser');

// Servir les fichiers statiques (JS, CSS, assets…)
app.use(express.static(browserDist));

// Toutes les routes renvoient index.html pour Angular SPA
app.get('*', (req, res) => {
  res.sendFile(join(browserDist, 'index.html'));
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
