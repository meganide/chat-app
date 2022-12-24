import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieSession from 'cookie-session';

import { api } from './routes/api.js';
import { config } from './config.js';
import { requireAuth } from './middlewares/auth.js';
import { initializeGoogleAuth } from './routes/googleAuth/googleAuth.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json({ limit: '10mb' }));

app.use(
  cookieSession({
    name: 'authSession',
    maxAge: 24 * 60 * 60 * 1000, // 24h
    keys: [
      config.COOKIE_KEY_1 || 'PueNV4kuvv8dhhXZy6m1',
      config.COOKIE_KEY_2 || 'iCCpo3GUvAXMfewB7UV4',
    ],
  })
);

initializeGoogleAuth(app);

app.get('/', requireAuth);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', api);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

export { app };
