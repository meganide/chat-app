import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cookieSession from 'cookie-session';
import { api } from './routes/api.js';
import { initializeGoogleAuth } from './routes/googleAuth/googleAuth.controller.js';
import { config } from './config.js';
import { requireAuth } from './middlewares/auth.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('filename', __filename)
console.log('dirname', __dirname)
const app = express();
app.use(express.json());
app.use(cookieSession({
    name: 'authSession',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [
        config.COOKIE_KEY_1 || 'PueNV4kuvv8dhhXZy6m1',
        config.COOKIE_KEY_2 || 'iCCpo3GUvAXMfewB7UV4',
    ],
}));
initializeGoogleAuth(app);
app.get('/', requireAuth);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api', api);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
export { app };
