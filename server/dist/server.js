import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT ? process.env.PORT : 8000;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}...`);
});
