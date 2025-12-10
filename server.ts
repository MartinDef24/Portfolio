import express from 'express';
import { join } from 'path';

const app = express();
const PORT = Number(process.env['PORT']) || 4000;

// Servir les fichiers statiques générés par Angular
app.use(express.static(join(__dirname, 'portfolio')));

// Rediriger toutes les autres routes vers index.html (pour le router Angular)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'portfolio', 'index.html'));
});

app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));