import http from 'http';
import https from 'https';
import dotenv from 'dotenv';
import fs from 'fs';

import { app } from './app.js';

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
  server = http.createServer(app);
}

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}...`);
});
