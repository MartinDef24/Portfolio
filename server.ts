import express, { Request, Response } from 'express';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const server = express();

const __dirname = dirname(fileURLToPath(import.meta.url));

const distFolder = resolve(__dirname, 'dist/portfolio');

server.use(express.static(distFolder));

server.get('*', (req: Request, res: Response) => {
  res.sendFile(join(distFolder, 'index.html'));
});


const port = Number(process.env['PORT']) || 3000;

const host = '0.0.0.0'; 

server.listen(port, host, () => {
  console.log(`Serveur Express démarré sur http://${host}:${port}`);
  console.log(`Serveur servant les fichiers depuis: ${distFolder}`);
});