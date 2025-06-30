import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { CommonEngine } from '@angular/ssr/node';
import { APP_BASE_HREF } from '@angular/common';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const server = express();
  const serverDist = dirname(fileURLToPath(import.meta.url));
  const browserDist = resolve(serverDist, '../browser');
  const indexHtml = join(serverDist, 'index.server.html');
  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDist);

  server.get('*.*', express.static(browserDist, { maxAge: '1y' }));

  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine.render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDist,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then(html => res.send(html))
    .catch(err => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;
  const server = app();
  server.listen(port, () => console.log(`Serveur démarré sur http://localhost:${port}`));
}

run();
