import http from 'http';
import https from 'https';
import dotenv from 'dotenv';
import fs from 'fs';
import { Server } from 'socket.io';

import { app } from './app.js';
import { startSocket } from './socket.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

let server: any;

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  const KEYS: any = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
  };
  server = https.createServer(KEYS, app);
} else {
  server = http.createServer(app);
}

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://chatify-k8cb.onrender.com"],
    methods: ["GET", "POST"]
  }
})

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}...`);
});

startSocket()

export { io };
