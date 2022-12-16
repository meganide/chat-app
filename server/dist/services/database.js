import { config } from '../config.js';
import mysql from 'mysql2';
let dbOptions;
if (process.env.NODE_ENV === 'DEVELOPMENT') {
    dbOptions = {
        host: 'localhost',
        user: 'root',
        password: config.DB_PASSWORD,
        database: 'chatify',
    };
}
else {
    dbOptions = {
        host: config.DB_AWS_HOST,
        user: 'admin',
        password: config.DB_AWS_PASSWORD,
        database: 'chatify',
    };
}
const db = mysql.createConnection(dbOptions);
export { db };
