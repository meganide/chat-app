import { app } from './app.js';
import https from 'https';
import http from 'http';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const PORT = process.env.PORT || 8000;

let server;

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  const KEYS: any = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  };
  server = https.createServer(KEYS, app);
} else {
  server = https.createServer(app);
}

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}...`);
});
