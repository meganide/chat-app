import { config } from '../config.js';
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: config.DB_PASSWORD,
  database: 'chatify',
});


export {db}