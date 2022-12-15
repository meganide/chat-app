import { app } from './app.js';
import https from 'https';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
const PORT = process.env.PORT || 8000;
const KEYS = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};
const server = https.createServer(KEYS, app);
server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}...`);
});
